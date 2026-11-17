import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  type AdminCamera,
  type AssignCamerasDto,
  type BuyerMonitoring,
  type CreateCameraDto,
  DEFAULT_MONITORING_SETTINGS,
  type FactoryCamera,
  type FactoryOrderMonitoring,
  filterContactDetails,
  MONITORED_STATUSES,
  type MonitoringSettings,
  MonitoringSettingsSchema,
  type ReviewCameraDto,
} from '@garmentgate/shared';
import type { Camera, Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { actorOf, OrdersService } from '../orders/orders.service.js';
import { chargeMonitoring, usdIn } from '../payments/charges.js';
import { PaymentsService } from '../payments/payments.service.js';
import { VIDEO_PROVIDER, type VideoProvider } from './video-provider.js';

const KEY = 'monitoring';
const WATCHABLE: readonly string[] = MONITORED_STATUSES;
/** An order can get monitoring until it has left the factory. */
const OPEN_FOR_MONITORING = [
  'DRAFT',
  'SAMPLING',
  'SAMPLE_APPROVED',
  'DEPOSIT_PENDING',
  ...MONITORED_STATUSES,
];

/**
 * Remote video monitoring. Factories register cameras (one provider live input each) and
 * submit them; staff watch and approve only views that can't identify the factory; buyers add
 * monitoring to an order (a fee through the usual order-fees flow) and, once it's paid and the
 * order is being made, watch the approved cameras the factory assigned to it, live and
 * recorded during the order's own production period. Buyers see numbered cameras and areas
 * only; every link is signed and short-lived, and every view is audited.
 */
@Injectable()
export class MonitoringService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orders: OrdersService,
    private readonly payments: PaymentsService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
    @Inject(VIDEO_PROVIDER) private readonly video: VideoProvider,
  ) {}

  // ── Settings ──────────────────────────────────────────────────────────────

  async settings(): Promise<MonitoringSettings> {
    const row = await this.prisma.platformSetting.findUnique({ where: { key: KEY } });
    const parsed = MonitoringSettingsSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : DEFAULT_MONITORING_SETTINGS;
  }

  async setSettings(adminId: string, s: MonitoringSettings): Promise<MonitoringSettings> {
    const value: Prisma.InputJsonValue = { ...s };
    await this.prisma.platformSetting.upsert({
      where: { key: KEY },
      create: { key: KEY, value },
      update: { value },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'monitoring.settings_updated',
      entityType: 'PlatformSetting',
      entityId: KEY,
      metadata: value,
    });
    return s;
  }

  // ── Factory: cameras ──────────────────────────────────────────────────────

  async factoryCameras(ctx: ManufacturerContext): Promise<FactoryCamera[]> {
    const cameras = await this.prisma.camera.findMany({
      where: { manufacturerProfileId: ctx.profileId },
      orderBy: { createdAt: 'asc' },
    });
    return Promise.all(cameras.map((c) => this.factoryView(c)));
  }

  async createCamera(ctx: ManufacturerContext, dto: CreateCameraDto): Promise<FactoryCamera> {
    const count = await this.prisma.camera.count({
      where: { manufacturerProfileId: ctx.profileId },
    });
    if (count >= 30) throw new ConflictException('A factory can connect up to 30 cameras');
    // The provider only gets an opaque name: nothing identifying leaves GarmentGate.
    const input = await this.video.createInput(
      `camera-${ctx.profileId.slice(0, 8)}-${String(count + 1)}`,
    );
    const camera = await this.prisma.camera.create({
      data: {
        manufacturerProfileId: ctx.profileId,
        label: filterContactDetails(dto.label).filtered,
        area: dto.area,
        providerInputId: input.inputId,
        ingestUrl: input.rtmpsUrl,
        streamKey: input.streamKey,
      },
    });
    await this.audit.log({
      actorUserId: ctx.userId,
      action: 'monitoring.camera_created',
      entityType: 'Camera',
      entityId: camera.id,
    });
    return this.factoryView(camera);
  }

  /** The factory has connected it: staff can review the picture. */
  async submitCamera(ctx: ManufacturerContext, id: string): Promise<void> {
    const camera = await this.ownCamera(ctx, id);
    if (camera.status !== 'SETUP' && camera.status !== 'REJECTED')
      throw new ConflictException('This camera is already reviewed or waiting for review');
    if (!(await this.video.isLive(camera.providerInputId)))
      throw new ConflictException('We can’t see a picture yet: start the stream, then submit');
    await this.prisma.camera.update({
      where: { id },
      data: { status: 'PENDING_REVIEW', reviewNote: null },
    });
    await this.notifier.notify({
      to: 'ADMINS',
      type: 'SYSTEM',
      title: 'A camera to review',
      body: 'A factory connected a camera. Check the picture before buyers can watch it.',
    });
  }

  async removeCamera(ctx: ManufacturerContext, id: string): Promise<void> {
    const camera = await this.ownCamera(ctx, id);
    await this.video.deleteInput(camera.providerInputId);
    await this.prisma.camera.delete({ where: { id } });
    await this.audit.log({
      actorUserId: ctx.userId,
      action: 'monitoring.camera_removed',
      entityType: 'Camera',
      entityId: id,
    });
  }

  // ── Staff: review ─────────────────────────────────────────────────────────

  async adminCameras(): Promise<AdminCamera[]> {
    const [cameras, settings] = await Promise.all([
      this.prisma.camera.findMany({
        orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
        take: 500,
        include: {
          manufacturerProfile: {
            select: { publicCode: true, company: { select: { legalName: true } } },
          },
        },
      }),
      this.settings(),
    ]);
    return Promise.all(
      cameras.map(async (c) => ({
        id: c.id,
        manufacturer: {
          code: c.manufacturerProfile.publicCode,
          name: c.manufacturerProfile.company.legalName,
        },
        label: c.label,
        area: c.area,
        status: c.status,
        reviewNote: c.reviewNote,
        live: await this.video.isLive(c.providerInputId),
        playbackUrl:
          c.status === 'DISABLED'
            ? null
            : this.video.playbackUrl(c.providerInputId, settings.playbackMinutes * 60),
        reviewedAt: c.reviewedAt?.toISOString() ?? null,
        createdAt: c.createdAt.toISOString(),
      })),
    );
  }

  async reviewCamera(adminId: string, id: string, dto: ReviewCameraDto): Promise<void> {
    const status = dto.decision === 'APPROVE' ? 'APPROVED' : 'REJECTED';
    const { count } = await this.prisma.camera.updateMany({
      where: { id, status: 'PENDING_REVIEW' },
      data: { status, reviewNote: dto.note ?? null, reviewedById: adminId, reviewedAt: new Date() },
    });
    if (count !== 1) {
      if (!(await this.prisma.camera.findUnique({ where: { id } })))
        throw new NotFoundException('Camera not found');
      throw new ConflictException('This camera isn’t waiting for review');
    }
    const camera = await this.prisma.camera.findUniqueOrThrow({
      where: { id },
      select: { label: true, manufacturerProfile: { select: { companyId: true } } },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: status === 'APPROVED' ? 'monitoring.camera_approved' : 'monitoring.camera_rejected',
      entityType: 'Camera',
      entityId: id,
      metadata: { checklist: dto.checklist, note: dto.note ?? null },
    });
    await this.notifier.notify({
      to: { companyId: camera.manufacturerProfile.companyId },
      type: 'SYSTEM',
      title: status === 'APPROVED' ? 'Camera approved' : 'Camera needs changes',
      body:
        status === 'APPROVED'
          ? `“${camera.label}” is approved: you can show it on orders with monitoring.`
          : `“${camera.label}”: ${dto.note ?? ''}`,
    });
  }

  /** Staff switch a camera off at once (e.g. something identifying came into view). */
  async disableCamera(adminId: string, id: string): Promise<void> {
    const { count } = await this.prisma.camera.updateMany({
      where: { id, status: { not: 'DISABLED' } },
      data: { status: 'DISABLED', reviewedById: adminId, reviewedAt: new Date() },
    });
    if (count !== 1) throw new NotFoundException('Camera not found or already disabled');
    await this.audit.log({
      actorUserId: adminId,
      action: 'monitoring.camera_disabled',
      entityType: 'Camera',
      entityId: id,
    });
  }

  // ── Orders ────────────────────────────────────────────────────────────────

  /** The buyer adds monitoring to an order: one fee, paid like other order fees. */
  async addToOrder(actor: ChatActor, code: string): Promise<void> {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) !== 'BUYER') throw new ForbiddenException('Buyers add monitoring');
    const settings = await this.settings();
    if (!settings.enabled) throw new ConflictException('Video monitoring isn’t offered right now');
    if (!OPEN_FOR_MONITORING.includes(order.status))
      throw new ConflictException(
        'Monitoring can only be added before the goods leave the factory',
      );
    const approved = await this.prisma.camera.count({
      where: { manufacturerProfileId: order.manufacturerProfileId, status: 'APPROVED' },
    });
    if (approved === 0) throw new ConflictException('This factory has no approved cameras yet');
    try {
      await this.prisma.$transaction((tx) => chargeMonitoring(tx, order, settings.feeUsdMinor));
    } catch (err) {
      if (err instanceof Error && 'code' in err && err.code === 'P2002')
        throw new ConflictException('Monitoring is already on this order');
      throw err;
    }
    await this.audit.log({
      actorUserId: actor.userId,
      action: 'monitoring.added',
      entityType: 'Order',
      entityId: order.id,
    });
    await this.notifier.notify({
      to: { manufacturerProfileId: order.manufacturerProfileId },
      type: 'ORDER_UPDATE',
      title: `${order.code}: video monitoring added`,
      body: 'Choose which of your approved cameras show this order’s production.',
      link: { orderCode: order.code },
    });
  }

  /** The buyer's panel (staff see the same, without the payment gate). */
  async buyerView(actor: ChatActor, code: string): Promise<BuyerMonitoring> {
    const order = await this.orders.load(actor, code);
    const role = actorOf(actor);
    if (role !== 'BUYER' && role !== 'ADMIN') throw new ForbiddenException('Buyers and staff only');
    const [settings, charge, fees, approved] = await Promise.all([
      this.settings(),
      this.prisma.orderCharge.findFirst({ where: { orderId: order.id, kind: 'MONITORING_FEE' } }),
      this.payments.fees(order.id),
      this.prisma.camera.count({
        where: { manufacturerProfileId: order.manufacturerProfileId, status: 'APPROVED' },
      }),
    ]);
    const fee = fees.find((f) => f.purpose === 'MONITORING_FEE');
    const paid = !!charge && (charge.waived || fee?.due === 0n);
    const preview = charge
      ? charge.amountMinor
      : await usdIn(this.prisma, settings.feeUsdMinor, order.currency);
    const watchable = (paid || role === 'ADMIN') && WATCHABLE.includes(order.status);
    const cameras =
      paid || role === 'ADMIN'
        ? await this.orderCameras(order.id, order.createdAt, watchable, settings)
        : [];
    if (watchable && cameras.length > 0)
      await this.audit.log({
        actorUserId: actor.userId,
        action: 'monitoring.viewed',
        entityType: 'Order',
        entityId: order.id,
        metadata: { cameras: cameras.length },
      });
    return {
      available: settings.enabled && approved > 0,
      added: !!charge,
      paid,
      feeMinor: preview === null ? null : Number(preview),
      currency: order.currency,
      watchable,
      cameras,
    };
  }

  /** The factory picks which of its approved cameras show an order. */
  async factoryOrderView(actor: ChatActor, code: string): Promise<FactoryOrderMonitoring> {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) !== 'MANUFACTURER') throw new ForbiddenException('Factories only');
    const [charge, cameras, assigned] = await Promise.all([
      this.prisma.orderCharge.findFirst({ where: { orderId: order.id, kind: 'MONITORING_FEE' } }),
      this.prisma.camera.findMany({
        where: { manufacturerProfileId: order.manufacturerProfileId, status: 'APPROVED' },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.orderCamera.findMany({
        where: { orderId: order.id },
        select: { cameraId: true },
      }),
    ]);
    const ids = new Set(assigned.map((a) => a.cameraId));
    return {
      added: !!charge,
      cameras: cameras.map((c) => ({
        id: c.id,
        label: c.label,
        area: c.area,
        assigned: ids.has(c.id),
      })),
    };
  }

  async assignCameras(actor: ChatActor, code: string, dto: AssignCamerasDto): Promise<void> {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) !== 'MANUFACTURER') throw new ForbiddenException('Factories only');
    const ids = [...new Set(dto.cameraIds)];
    const cameras = await this.prisma.camera.findMany({
      where: {
        id: { in: ids },
        manufacturerProfileId: order.manufacturerProfileId,
        status: 'APPROVED',
      },
      select: { id: true },
    });
    if (cameras.length !== ids.length)
      throw new ConflictException('Only your own approved cameras can be shown on an order');
    await this.prisma.$transaction([
      this.prisma.orderCamera.deleteMany({ where: { orderId: order.id } }),
      this.prisma.orderCamera.createMany({
        data: ids.map((cameraId, i) => ({ orderId: order.id, cameraId, position: i + 1 })),
      }),
    ]);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  /**
   * The order's cameras as Camera 1, 2…: live links while the order is being made, and the
   * recordings made since production started (never earlier footage, which could show another
   * buyer's goods).
   */
  private async orderCameras(
    orderId: string,
    orderCreatedAt: Date,
    watchable: boolean,
    settings: MonitoringSettings,
  ): Promise<BuyerMonitoring['cameras']> {
    const [links, started, left] = await Promise.all([
      this.prisma.orderCamera.findMany({
        where: { orderId, camera: { status: 'APPROVED' } },
        include: { camera: true },
        orderBy: { position: 'asc' },
      }),
      this.prisma.orderEvent.findFirst({
        where: { orderId, toStatus: 'IN_PRODUCTION' },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true },
      }),
      this.prisma.orderEvent.findFirst({
        where: { orderId, toStatus: 'SHIPPED' },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true },
      }),
    ]);
    const from = started?.createdAt ?? orderCreatedAt;
    const to = left?.createdAt ?? null;
    const ttl = settings.playbackMinutes * 60;
    return Promise.all(
      links.map(async ({ camera }, i) => {
        const recordings = started
          ? (await this.video.recordings(camera.providerInputId).catch(() => []))
              .filter((r) => r.startedAt >= from && (to === null || r.startedAt <= to))
              .slice(0, 20)
          : [];
        return {
          number: i + 1,
          area: camera.area,
          live: await this.video.isLive(camera.providerInputId),
          playbackUrl: watchable ? this.video.playbackUrl(camera.providerInputId, ttl) : null,
          recordings: recordings.map((r) => ({
            startedAt: r.startedAt.toISOString(),
            durationSeconds: r.durationSeconds,
            playbackUrl: this.video.playbackUrl(r.videoId, ttl),
          })),
        };
      }),
    );
  }

  private async ownCamera(ctx: ManufacturerContext, id: string): Promise<Camera> {
    const camera = await this.prisma.camera.findUnique({ where: { id } });
    if (camera?.manufacturerProfileId !== ctx.profileId)
      throw new NotFoundException('Camera not found');
    return camera;
  }

  private async factoryView(c: Camera): Promise<FactoryCamera> {
    return {
      id: c.id,
      label: c.label,
      area: c.area,
      status: c.status,
      reviewNote: c.reviewNote,
      live: await this.video.isLive(c.providerInputId),
      ingest: c.status === 'DISABLED' ? null : { rtmpsUrl: c.ingestUrl, streamKey: c.streamKey },
      createdAt: c.createdAt.toISOString(),
    };
  }
}
