var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isoDate, PARTNER_DOCUMENTS, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MediaService } from '../media/media.service.js';
import { FilesService } from '../storage/files.service.js';
import { ShipmentsService } from './shipments.service.js';
import { TrackingService } from './tracking.service.js';
const UPLOAD_MAX_BYTES = 15 * 1024 * 1024;
const legInclude = {
    shipment: {
        select: {
            code: true,
            status: true,
            mode: true,
            currency: true,
            destinationCountry: true,
            destinationPort: true,
            cartons: true,
            grossWeightGrams: true,
            volumeLitres: true,
            originHub: true,
        },
    },
    events: { orderBy: { occurredAt: 'desc' } },
    claims: {
        orderBy: { createdAt: 'asc' },
        select: { code: true, type: true, status: true, partnerChargebackMinor: true },
    },
};
let PartnerPortalService = class PartnerPortalService {
    prisma;
    tracking;
    shipments;
    files;
    media;
    config;
    constructor(prisma, tracking, shipments, files, media, config) {
        this.prisma = prisma;
        this.tracking = tracking;
        this.shipments = shipments;
        this.files = files;
        this.media = media;
        this.config = config;
    }
    async partnerOf(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true, logisticsPartner: { select: { id: true, active: true } } },
        });
        if (user?.role !== 'PARTNER' || !user.logisticsPartner?.active)
            throw new ForbiddenException('Your partner account isn’t active');
        return user.logisticsPartner.id;
    }
    async legs(userId) {
        const partnerId = await this.partnerOf(userId);
        const rows = await this.prisma.shipmentLeg.findMany({
            where: { partnerId, shipment: { status: { not: 'CANCELLED' } } },
            orderBy: [{ etd: 'asc' }, { createdAt: 'desc' }],
            take: 300,
            include: legInclude,
        });
        return rows.map((l) => this.view(l));
    }
    async leg(userId, legId) {
        return this.view(await this.ownLeg(await this.partnerOf(userId), legId));
    }
    async accept(userId, legId) {
        const leg = await this.ownLeg(await this.partnerOf(userId), legId);
        const { count } = await this.prisma.shipmentLeg.updateMany({
            where: { id: leg.id, acceptedAt: null, status: { in: ['PENDING', 'BOOKED'] } },
            data: { acceptedAt: new Date(), status: 'BOOKED' },
        });
        if (count !== 1)
            throw new ConflictException('This booking is no longer open');
    }
    async updateRefs(userId, legId, dto) {
        const leg = await this.ownLeg(await this.partnerOf(userId), legId);
        if (!leg.acceptedAt)
            throw new ConflictException('Accept the booking first');
        await this.prisma.shipmentLeg.update({
            where: { id: leg.id },
            data: {
                ...(dto.carrier !== undefined && { carrier: dto.carrier }),
                ...(dto.trackingNumber !== undefined && { trackingNumber: dto.trackingNumber }),
                ...(dto.containerNumber !== undefined && { containerNumber: dto.containerNumber }),
                ...(dto.transportDocNo !== undefined && { transportDocNo: dto.transportDocNo }),
                ...(dto.etd !== undefined && { etd: dto.etd ? new Date(`${dto.etd}T00:00:00Z`) : null }),
                ...(dto.eta !== undefined && { eta: dto.eta ? new Date(`${dto.eta}T00:00:00Z`) : null }),
            },
        });
    }
    async event(userId, legId, dto) {
        const leg = await this.ownLeg(await this.partnerOf(userId), legId);
        if (!leg.acceptedAt)
            throw new ConflictException('Accept the booking first');
        await this.tracking.recordEvent({ userId, source: 'PARTNER' }, leg.shipment.code, leg.id, dto);
    }
    async presign(userId, legId, dto) {
        await this.ownLeg(await this.partnerOf(userId), legId);
        return this.files.reserveUpload({
            userId,
            companyId: null,
            purpose: 'LOGISTICS_DOCUMENT',
            folder: 'originals',
            fileName: dto.fileName,
            contentType: dto.contentType,
            sizeBytes: dto.sizeBytes,
            maxBytes: UPLOAD_MAX_BYTES,
        });
    }
    async attach(userId, legId, dto) {
        const leg = await this.ownLeg(await this.partnerOf(userId), legId);
        const file = await this.files.confirmUpload(dto.fileId, { userId }, 'LOGISTICS_DOCUMENT', UPLOAD_MAX_BYTES);
        await this.prisma.shipmentUpload.create({
            data: {
                shipmentId: leg.shipmentId,
                legId: leg.id,
                fileId: file.id,
                kind: dto.kind,
                uploadedById: userId,
            },
        });
        await this.media.enqueue(file.id);
    }
    async document(userId, legId, type) {
        const leg = await this.ownLeg(await this.partnerOf(userId), legId);
        if (!PARTNER_DOCUMENTS.includes(type))
            throw new ForbiddenException();
        return this.shipments.document(userId, leg.shipment.code, type);
    }
    async ownLeg(partnerId, legId) {
        const leg = await this.prisma.shipmentLeg.findFirst({
            where: { id: legId, partnerId, shipment: { status: { not: 'CANCELLED' } } },
            include: legInclude,
        });
        if (!leg)
            throw new NotFoundException('Booking not found');
        return leg;
    }
    view(l) {
        const hub = l.shipment.originHub;
        const fromHub = hub && l.kind === 'HUB_TO_PORT';
        return {
            id: l.id,
            shipmentCode: l.shipment.code,
            kind: l.kind,
            status: l.status,
            shipmentStatus: l.shipment.status,
            mode: l.shipment.mode,
            fromLabel: l.fromLabel,
            toLabel: l.toLabel,
            pickupHub: fromHub
                ? {
                    code: hub.code,
                    name: hub.name,
                    address: [
                        hub.addressLine1,
                        hub.addressLine2,
                        [hub.postalCode, hub.city].filter(Boolean).join(' '),
                        hub.country,
                    ]
                        .filter(Boolean)
                        .join(', '),
                }
                : null,
            destinationCountry: l.shipment.destinationCountry,
            destinationPort: l.shipment.destinationPort,
            cartons: l.shipment.cartons,
            grossWeightGrams: l.shipment.grossWeightGrams,
            volumeLitres: l.shipment.volumeLitres,
            currency: l.shipment.currency,
            costMinor: l.costMinor === null ? null : Number(l.costMinor),
            accepted: l.acceptedAt !== null,
            paid: l.paidAt !== null,
            carrier: l.carrier,
            trackingNumber: l.trackingNumber,
            containerNumber: l.containerNumber,
            transportDocNo: l.transportDocNo,
            etd: l.etd ? isoDate(l.etd) : null,
            eta: l.eta ? isoDate(l.eta) : null,
            events: l.events.map((e) => ({
                occurredAt: e.occurredAt.toISOString(),
                status: e.status,
                location: e.location,
                note: e.publicNote,
            })),
            documentTypes: [...PARTNER_DOCUMENTS],
            claims: l.claims.map((c) => ({
                code: c.code,
                type: c.type,
                status: c.status,
                chargebackMinor: Number(c.partnerChargebackMinor),
            })),
        };
    }
};
PartnerPortalService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        TrackingService,
        ShipmentsService,
        FilesService,
        MediaService,
        ConfigService])
], PartnerPortalService);
export { PartnerPortalService };
//# sourceMappingURL=partner-portal.service.js.map