import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type AddShipmentDocumentDto,
  type BookShipmentDto,
  filterContactDetails,
  type GeneratedDocumentType,
  type PresignShipmentDocumentDto,
  type PresignUploadResponse,
  type PublishShipmentDocumentDto,
  SHIPMENT_DOCUMENT_MAX_BYTES,
} from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { MediaService } from '../media/media.service.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { documentName, orderInclude, type OrderRow } from '../orders/order-views.js';
import { actorOf, OrdersService } from '../orders/orders.service.js';
import { postalAddress } from '../orders/purchase-order.js';
import { FilesService } from '../storage/files.service.js';
import { renderShippingDocument, shippingDocNumber } from './shipping-documents.js';

/** Where a shipment can be booked or changed. */
const BOOKABLE = ['READY_TO_SHIP', 'SHIPPED'];
/** Where papers can be added (they often arrive after departure). */
const DOCUMENTS_OPEN = ['READY_TO_SHIP', 'SHIPPED', 'DELIVERED'];

/**
 * Shipping. The factory (or staff) books the shipment once the final inspection has passed:
 * forwarder, carrier, references, ports, ETD/ETA; free text is contact-filtered and the buyer
 * reads it scrubbed of the factory's names. Papers the factory uploads are sanitized and stay
 * hidden from the buyer until staff publish them. The buyer's own papers (commercial invoice,
 * packing list, B/L summary, certificate of origin) are generated under GarmentGate's name.
 */
@Injectable()
export class ShippingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orders: OrdersService,
    private readonly files: FilesService,
    private readonly media: MediaService,
    private readonly audit: AuditService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async book(actor: ChatActor, code: string, dto: BookShipmentDto): Promise<void> {
    const order = await this.orders.load(actor, code);
    this.shipperOnly(actor);
    if (!BOOKABLE.includes(order.status))
      throw new ConflictException('The shipment is booked once the final inspection has passed');
    const flagged: string[] = [];
    const clean = (value: string): string => {
      const result = filterContactDetails(value);
      if (result.flagged) flagged.push(...result.reasons);
      return result.filtered;
    };
    const data = {
      mode: dto.mode,
      incoterm: dto.incoterm ?? order.incoterm,
      forwarder: clean(dto.forwarder),
      carrier: clean(dto.carrier),
      trackingNumber: dto.trackingNumber ?? null,
      containerNumber: dto.containerNumber ?? null,
      transportDocNo: dto.transportDocNo ?? null,
      originPort: clean(dto.originPort),
      destinationPort: dto.destinationPort ? clean(dto.destinationPort) : order.destinationPort,
      cartons: dto.cartons ?? null,
      grossWeightKg: dto.grossWeightKg ?? null,
      etd: dto.etd,
      eta: dto.eta,
    };
    const existing = order.shipments[0];
    if (existing) await this.prisma.shipment.update({ where: { id: existing.id }, data });
    else {
      try {
        await this.prisma.shipment.create({
          data: { orderId: order.id, status: 'BOOKED', ...data },
        });
      } catch (error) {
        // One shipment per order (unique index): someone else just booked it.
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
          throw new ConflictException('The shipment was just booked: reload and try again');
        throw error;
      }
    }
    await this.audit.log({
      actorUserId: actor.userId,
      action: flagged.length > 0 ? 'moderation.contact_filtered' : 'shipping.booked',
      entityType: 'Order',
      entityId: order.id,
      metadata: { reasons: flagged, eta: dto.eta.toISOString() },
    });
    const eta = dto.eta.toISOString().slice(0, 10);
    if (!existing) {
      await this.orders.notifyParty(
        order,
        'BUYER',
        'ORDER_UPDATE',
        `${order.code}: shipment booked`,
        `Departs ${dto.etd.toISOString().slice(0, 10)}, arrives around ${eta}.`,
      );
    } else if (existing.eta?.toISOString().slice(0, 10) !== eta) {
      await this.orders.notifyParty(
        order,
        'BUYER',
        'ORDER_UPDATE',
        `${order.code}: new arrival date`,
        `The shipment now arrives around ${eta}.`,
      );
    }
  }

  async presign(
    actor: ChatActor,
    code: string,
    dto: PresignShipmentDocumentDto,
  ): Promise<PresignUploadResponse> {
    const order = await this.orders.load(actor, code);
    this.shipperOnly(actor);
    this.documentsOpen(order);
    return this.files.reserveUpload({
      userId: actor.userId,
      companyId: actor.isAdmin ? null : order.manufacturerProfile.company.id,
      purpose: 'SHIPMENT_DOCUMENT',
      folder: 'originals',
      fileName: dto.fileName,
      contentType: dto.contentType,
      sizeBytes: dto.sizeBytes,
      maxBytes: SHIPMENT_DOCUMENT_MAX_BYTES,
    });
  }

  /** Factory papers name the factory: staff check and publish them (sanitized) for the buyer. */
  async addDocument(actor: ChatActor, code: string, dto: AddShipmentDocumentDto): Promise<void> {
    const order = await this.orders.load(actor, code);
    this.shipperOnly(actor);
    this.documentsOpen(order);
    const shipment = order.shipments[0];
    if (!shipment) throw new ConflictException('Book the shipment first');
    const file = await this.files.confirmUpload(
      dto.fileId,
      actor.isAdmin ? { userId: actor.userId } : order.manufacturerProfile.company.id,
      'SHIPMENT_DOCUMENT',
      SHIPMENT_DOCUMENT_MAX_BYTES,
    );
    await this.prisma.shipmentDocument.create({
      data: { shipmentId: shipment.id, fileId: file.id, type: dto.type, buyerVisible: false },
    });
    await this.media.enqueue(file.id);
    if (!actor.isAdmin) {
      await this.orders.notifyParty(
        order,
        'ADMIN',
        'ORDER_UPDATE',
        `${order.code}: shipping document uploaded`,
        `${dto.type.replace(/_/g, ' ').toLowerCase()}: check it and publish it to the buyer.`,
      );
    }
  }

  async publish(
    adminId: string,
    code: string,
    documentId: string,
    dto: PublishShipmentDocumentDto,
  ): Promise<void> {
    const document = await this.prisma.shipmentDocument.findFirst({
      where: { id: documentId, shipment: { order: { code } } },
      include: { file: { select: { processingStatus: true } } },
    });
    if (!document) throw new NotFoundException('Document not found');
    if (dto.buyerVisible && document.file.processingStatus !== 'READY')
      throw new ConflictException('The document is still being sanitized');
    await this.prisma.shipmentDocument.update({
      where: { id: document.id },
      data: { buyerVisible: dto.buyerVisible },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: dto.buyerVisible ? 'shipping.document_published' : 'shipping.document_hidden',
      entityType: 'ShipmentDocument',
      entityId: document.id,
    });
    if (dto.buyerVisible) {
      const order = await this.prisma.order.findUniqueOrThrow({
        where: { code },
        include: orderInclude,
      });
      await this.orders.notifyParty(
        order,
        'BUYER',
        'ORDER_UPDATE',
        `${code}: new shipping document`,
        `The ${document.type.replace(/_/g, ' ').toLowerCase()} is on your order.`,
      );
    }
  }

  /** GarmentGate's own papers for the buyer: GarmentGate ships and sells, the factory is unnamed. */
  async generated(
    actor: ChatActor,
    code: string,
    type: GeneratedDocumentType,
  ): Promise<{ file: Buffer; name: string }> {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) === 'MANUFACTURER')
      throw new ForbiddenException('These documents are issued to the buyer');
    const shipment = order.shipments[0];
    if (!shipment) throw new ConflictException('The shipment isn’t booked yet');
    const buyer = order.buyerCompany;
    const platform = {
      name: this.config.get('PLATFORM_LEGAL_NAME', { infer: true }),
      address: this.config.get('PLATFORM_ADDRESS', { infer: true }),
      email: this.config.get('PLATFORM_EMAIL', { infer: true }),
    };
    const file = await renderShippingDocument({
      type,
      number: shippingDocNumber(type, order.code),
      orderCode: order.code,
      issuedAt: shipment.shippedAt ?? shipment.updatedAt,
      shipper: {
        role: 'Seller / Exporter / Shipper',
        name: platform.name,
        lines: [platform.address, platform.email],
      },
      consignee: {
        role: 'Buyer / Consignee',
        name: buyer.legalName,
        lines: [...postalAddress(buyer), ...(buyer.taxId ? [`Tax ID ${buyer.taxId}`] : [])],
      },
      originCountry: order.manufacturerProfile.company.country,
      destinationCountry: order.destinationCountry,
      shipment: {
        mode: shipment.mode,
        incoterm: `${shipment.incoterm ?? order.incoterm}${order.destinationPort ? ` ${order.destinationPort}` : ''}`,
        // Written by the factory: the buyer's copy must not carry its names.
        forwarder: this.forBuyer(order, shipment.forwarder),
        carrier: this.forBuyer(order, shipment.carrier),
        trackingNumber: shipment.trackingNumber,
        containerNumber: shipment.containerNumber,
        transportDocNo: shipment.transportDocNo,
        originPort: this.forBuyer(order, shipment.originPort),
        destinationPort: shipment.destinationPort ?? order.destinationPort,
        cartons: shipment.cartons,
        grossWeightKg: shipment.grossWeightKg,
        etd: shipment.etd,
        eta: shipment.eta,
      },
      description: order.title,
      quantity: order.quantity,
      unitPriceMinor: order.buyerUnitPriceMinor,
      currency: order.currency,
      items: order.items.map((i) => ({ color: i.color, size: i.size, quantity: i.quantity })),
      paymentTerms: `${String(order.depositBps / 100)}% deposit on confirmation, balance before shipment, paid to ${platform.name}.`,
      footer: `Issued by ${platform.name} as seller and exporter of record for order ${order.code}. All communication about this order goes through GarmentGate.`,
    });
    return { file, name: documentName(order.code, type) };
  }

  private forBuyer(order: OrderRow, text: string | null): string | null {
    return scrubText(text, identityPatterns(identityOf(order.manufacturerProfile.company)));
  }

  private shipperOnly(actor: ChatActor): void {
    if (actorOf(actor) === 'BUYER') throw new ForbiddenException('The factory books the shipment');
  }

  private documentsOpen(order: OrderRow): void {
    if (!DOCUMENTS_OPEN.includes(order.status))
      throw new ConflictException('Shipping documents are added once the order is ready to ship');
  }
}
