/**
 * Resets the database and loads deterministic demo data.
 * Run with `pnpm db:seed` (or automatically after `prisma migrate reset`).
 */
import { existsSync } from 'node:fs';
import { hash } from '@node-rs/argon2';
import { filterContactDetails } from '@garmentgate/shared';
import { createPrismaClient } from '../../src/prisma/create-prisma-client.js';
import type { Currency, Prisma } from '../../src/generated/prisma/client.js';
import { ADMIN, BUYERS, CATEGORIES, DEMO_PASSWORD, MANUFACTURERS } from './data.js';
import { seedImage } from './media.js';

if (existsSync('.env')) process.loadEnvFile('.env');
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is not set');

const prisma = createPrismaClient(databaseUrl);

const d = (iso: string) => new Date(`${iso}T00:00:00Z`);
const daysFromNow = (days: number) => new Date(Date.now() + days * 86_400_000);

async function resetDatabase(): Promise<void> {
  const tables = await prisma.$queryRaw<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'`;
  const list = tables.map((t) => `"public"."${t.tablename}"`).join(', ');
  // TRUNCATE bypasses the append-only row trigger on the ledger, which is what we want here.
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${list} RESTART IDENTITY CASCADE`);
}

async function main(): Promise<void> {
  console.warn('Seeding GarmentGate demo data…');
  await resetDatabase();

  const passwordHash = await hash(DEMO_PASSWORD);
  const now = new Date();

  // ── Categories ────────────────────────────────────────────────────────────
  const categoryId = new Map<string, string>();
  for (const [i, parent] of CATEGORIES.entries()) {
    const p = await prisma.category.create({
      data: { slug: parent.slug, name: parent.name, sortOrder: i },
    });
    categoryId.set(parent.slug, p.id);
    for (const [j, child] of parent.children.entries()) {
      const c = await prisma.category.create({
        data: { slug: child.slug, name: child.name, parentId: p.id, sortOrder: j },
      });
      categoryId.set(child.slug, c.id);
    }
  }
  const cat = (slug: string) => {
    const id = categoryId.get(slug);
    if (!id) throw new Error(`Unknown category ${slug}`);
    return id;
  };

  // ── Admin ─────────────────────────────────────────────────────────────────
  const admin = await prisma.user.create({
    data: { ...ADMIN, passwordHash, role: 'ADMIN', emailVerifiedAt: now },
  });

  // ── Manufacturers ─────────────────────────────────────────────────────────
  const mfr = new Map<string, { companyId: string; profileId: string; userId: string }>();
  for (const m of MANUFACTURERS) {
    const verified = m.kyc === 'VERIFIED';
    const about = filterContactDetails(m.profile.about);
    const company = await prisma.company.create({
      data: {
        type: 'MANUFACTURER',
        ...m.company,
        onboardingStep: 'SUBMITTED',
        kycStatus: m.kyc,
        kycSubmittedAt: daysFromNow(verified ? -120 : -2),
        ...(verified && { kycReviewedAt: daysFromNow(-118), kycReviewedById: admin.id }),
        users: {
          create: {
            ...m.owner,
            passwordHash,
            role: 'MANUFACTURER',
            companyRole: 'OWNER',
            emailVerifiedAt: daysFromNow(-121),
          },
        },
        manufacturerProfile: {
          create: {
            publicCode: m.publicCode,
            headline: m.profile.headline,
            about: m.profile.about,
            aboutFiltered: about.filtered,
            monthlyCapacityPcs: m.profile.monthlyCapacityPcs,
            moqPcs: m.profile.moqPcs,
            sampleLeadTimeDays: m.profile.sampleLeadTimeDays,
            productionLeadTimeMinDays: m.profile.productionLeadTimeMinDays,
            productionLeadTimeMaxDays: m.profile.productionLeadTimeMaxDays,
            machinery: m.profile.machinery,
            workforceSize: m.profile.workforceSize,
            factorySizeSqm: m.profile.factorySizeSqm,
            exportMarkets: m.profile.exportMarkets,
            performanceScore: m.profile.performanceScore,
            onTimeDeliveryBps: m.profile.onTimeDeliveryBps || null,
            isListed: verified,
            categories: { connect: m.profile.categories.map((slug) => ({ id: cat(slug) })) },
          },
        },
      },
      include: { users: true, manufacturerProfile: true },
    });
    const [owner] = company.users;
    const profile = company.manufacturerProfile;
    if (!owner || !profile) throw new Error('Manufacturer seed failed');
    mfr.set(m.key, { companyId: company.id, profileId: profile.id, userId: owner.id });

    // KYC documents + certifications, each backed by a FileAsset record.
    const docTypes = ['BUSINESS_LICENSE', 'EXPORT_REGISTRATION'] as const;
    for (const type of docTypes) {
      const file = await createFile(
        company.id,
        owner.id,
        'KYC_DOCUMENT',
        `${type.toLowerCase()}.pdf`,
      );
      await prisma.companyDocument.create({
        data: {
          companyId: company.id,
          type,
          fileId: file.id,
          status: verified ? 'VERIFIED' : 'PENDING',
          ...(verified && { reviewedAt: daysFromNow(-118) }),
        },
      });
    }
    for (const c of m.certifications) {
      const file = await createFile(
        company.id,
        owner.id,
        'CERTIFICATION',
        `${c.type.toLowerCase()}.pdf`,
      );
      await prisma.certification.create({
        data: {
          manufacturerProfileId: profile.id,
          type: c.type as Prisma.CertificationCreateInput['type'],
          certificateNumber: c.number,
          issuedAt: d(c.issued),
          expiresAt: d(c.expires),
          fileId: file.id,
          status: verified ? 'VERIFIED' : 'PENDING',
          ...(verified && { verifiedAt: daysFromNow(-118) }),
        },
      });
    }

    for (const p of m.products) {
      await prisma.product.create({
        data: {
          manufacturerProfileId: profile.id,
          categoryId: cat(p.category),
          title: p.title,
          fabric: p.fabric,
          composition: p.composition,
          gsm: p.gsm,
          moqPcs: p.moqPcs,
          leadTimeDays: p.leadTimeDays,
          currency: 'USD',
          status: verified ? 'PUBLISHED' : 'DRAFT',
          priceTiers: {
            create: p.tiers.map(([minQty, manufacturerUnitPriceMinor, buyerUnitPriceMinor]) => ({
              minQty,
              manufacturerUnitPriceMinor,
              buyerUnitPriceMinor,
            })),
          },
        },
      });
    }
  }

  // ── Buyers ────────────────────────────────────────────────────────────────
  const buyer = new Map<string, { companyId: string; userId: string }>();
  for (const b of BUYERS) {
    const verified = b.kyc === 'VERIFIED';
    const needs = filterContactDetails(b.profile.sourcingNeeds);
    const company = await prisma.company.create({
      data: {
        type: 'BUYER',
        ...b.company,
        onboardingStep: 'SUBMITTED',
        kycStatus: b.kyc,
        kycSubmittedAt: daysFromNow(verified ? -90 : -1),
        ...(verified && { kycReviewedAt: daysFromNow(-89), kycReviewedById: admin.id }),
        users: {
          create: {
            ...b.owner,
            passwordHash,
            role: 'BUYER',
            companyRole: 'OWNER',
            emailVerifiedAt: daysFromNow(-91),
          },
        },
        buyerProfile: {
          create: {
            publicCode: b.publicCode,
            businessType: b.profile.businessType,
            annualVolumePcs: b.profile.annualVolumePcs,
            typicalOrderQuantityPcs: b.profile.typicalOrderQuantityPcs,
            targetMarkets: b.profile.targetMarkets,
            sourcingNeeds: b.profile.sourcingNeeds,
            sourcingNeedsFiltered: needs.filtered,
            categories: { connect: b.profile.categories.map((slug) => ({ id: cat(slug) })) },
          },
        },
      },
      include: { users: true },
    });
    const [owner] = company.users;
    if (!owner) throw new Error('Buyer seed failed');
    buyer.set(b.key, { companyId: company.id, userId: owner.id });

    const file = await createFile(company.id, owner.id, 'KYC_DOCUMENT', 'business_license.pdf');
    await prisma.companyDocument.create({
      data: {
        companyId: company.id,
        type: 'BUSINESS_LICENSE',
        fileId: file.id,
        status: verified ? 'VERIFIED' : 'PENDING',
      },
    });
  }

  const need = <T>(value: T | undefined, what: string): T => {
    if (value === undefined) throw new Error(`Missing seed entity: ${what}`);
    return value;
  };
  const meghna = need(mfr.get('dhakaKnit'), 'dhakaKnit');
  const songHong = need(mfr.get('saigonActive'), 'saigonActive');
  const noyyal = need(mfr.get('tiruppurOrganic'), 'tiruppurOrganic');
  const northbound = need(buyer.get('northbound'), 'northbound');
  const gruenfeld = need(buyer.get('gruenfeld'), 'gruenfeld');

  // ── Margin rules ──────────────────────────────────────────────────────────
  const defaultRule = await prisma.marginRule.create({
    data: { name: 'Default markup', markupBps: 1500 },
  });
  await prisma.marginRule.create({
    data: { name: 'Activewear', markupBps: 1800, categoryId: cat('activewear') },
  });
  const northboundRule = await prisma.marginRule.create({
    data: { name: 'Northbound negotiated rate', markupBps: 1200, companyId: northbound.companyId },
  });

  // ── Open RFQ with three quotes in different states ────────────────────────
  const rfqDescription =
    'Organic cotton pullover hoodie, 340 GSM brushed-back fleece, GOTS certified. Kangaroo pocket, ' +
    'ribbed cuffs and hem, self-fabric hood lining. 3 colours (Oat, Forest, Charcoal), sizes XS–XXL. ' +
    'Tech pack attached. Delivery DDP Hamburg.';
  const rfq = await prisma.rfq.create({
    data: {
      code: 'RFQ-2026-00042',
      buyerCompanyId: gruenfeld.companyId,
      createdById: gruenfeld.userId,
      categoryId: cat('hoodies-sweatshirts'),
      title: 'Organic cotton pullover hoodie, 340 GSM',
      description: rfqDescription,
      descriptionFiltered: filterContactDetails(rfqDescription).filtered,
      quantity: 6000,
      targetUnitPriceMinor: 1150,
      currency: 'EUR',
      deadline: daysFromNow(9),
      requiredDeliveryDate: daysFromNow(110),
      incoterm: 'DDP',
      destinationCountry: 'DE',
      status: 'OPEN',
      publishedAt: daysFromNow(-6),
      invitations: {
        create: [
          {
            manufacturerProfileId: meghna.profileId,
            status: 'QUOTED',
            respondedAt: daysFromNow(-4),
          },
          {
            manufacturerProfileId: noyyal.profileId,
            status: 'QUOTED',
            respondedAt: daysFromNow(-1),
          },
          {
            manufacturerProfileId: songHong.profileId,
            status: 'QUOTED',
            respondedAt: daysFromNow(-3),
          },
        ],
      },
    },
  });
  const techPack = await createFile(
    gruenfeld.companyId,
    gruenfeld.userId,
    'TECH_PACK',
    'hoodie_techpack_v3.pdf',
  );
  await prisma.rfqAttachment.create({
    data: { rfqId: rfq.id, fileId: techPack.id, kind: 'TECH_PACK' },
  });

  const markup = (price: number, bps: number) => Math.round((price * (10_000 + bps)) / 10_000);
  await prisma.quote.create({
    data: {
      rfqId: rfq.id,
      manufacturerProfileId: meghna.profileId,
      manufacturerUnitPriceMinor: 980,
      buyerUnitPriceMinor: markup(980, 1500),
      currency: 'EUR',
      leadTimeDays: 55,
      moqPcs: 1000,
      validUntil: daysFromNow(25),
      notes: 'GOTS scope certificate covers fleece. Price includes garment wash and DDP Hamburg.',
      notesFiltered:
        'GOTS scope certificate covers fleece. Price includes garment wash and DDP Hamburg.',
      status: 'OFFERED',
      marginRuleId: defaultRule.id,
      pricedById: admin.id,
      pricedAt: daysFromNow(-3),
      offeredAt: daysFromNow(-3),
    },
  });
  await prisma.quote.create({
    data: {
      rfqId: rfq.id,
      manufacturerProfileId: noyyal.profileId,
      manufacturerUnitPriceMinor: 1040,
      buyerUnitPriceMinor: markup(1040, 1500),
      currency: 'EUR',
      leadTimeDays: 48,
      moqPcs: 500,
      validUntil: daysFromNow(30),
      notes: 'Fair Trade cotton option available at +EUR 0.40/pc.',
      notesFiltered: 'Fair Trade cotton option available at +EUR 0.40/pc.',
      status: 'UNDER_REVIEW',
      marginRuleId: defaultRule.id,
    },
  });
  await prisma.quote.create({
    data: {
      rfqId: rfq.id,
      manufacturerProfileId: songHong.profileId,
      manufacturerUnitPriceMinor: 1120,
      buyerUnitPriceMinor: markup(1120, 1500),
      currency: 'EUR',
      leadTimeDays: 70,
      validUntil: daysFromNow(20),
      notes: 'Fleece would be sourced externally; lead time reflects fabric booking.',
      notesFiltered: 'Fleece would be sourced externally; lead time reflects fabric booking.',
      status: 'REJECTED',
      marginRuleId: defaultRule.id,
      decidedAt: daysFromNow(-2),
    },
  });

  // ── Awarded RFQ → order in production ─────────────────────────────────────
  const awardedRfq = await prisma.rfq.create({
    data: {
      code: 'RFQ-2026-00031',
      buyerCompanyId: northbound.companyId,
      createdById: northbound.userId,
      categoryId: cat('t-shirts'),
      title: 'Heavyweight boxy tee, 240 GSM, garment dyed',
      description:
        'Boxy fit heavyweight tee, 240 GSM combed cotton, garment dyed, 1x1 rib neck, 3 colours.',
      descriptionFiltered:
        'Boxy fit heavyweight tee, 240 GSM combed cotton, garment dyed, 1x1 rib neck, 3 colours.',
      quantity: 12_000,
      targetUnitPriceMinor: 360,
      currency: 'USD',
      deadline: daysFromNow(-40),
      requiredDeliveryDate: daysFromNow(35),
      incoterm: 'FOB',
      destinationCountry: 'US',
      status: 'AWARDED',
      publishedAt: daysFromNow(-55),
      invitations: {
        create: [
          {
            manufacturerProfileId: meghna.profileId,
            status: 'QUOTED',
            respondedAt: daysFromNow(-50),
          },
        ],
      },
    },
  });
  const manufacturerUnit = 290;
  const buyerUnit = markup(manufacturerUnit, 1200); // Northbound negotiated 12%
  const acceptedQuote = await prisma.quote.create({
    data: {
      rfqId: awardedRfq.id,
      manufacturerProfileId: meghna.profileId,
      manufacturerUnitPriceMinor: manufacturerUnit,
      buyerUnitPriceMinor: buyerUnit,
      currency: 'USD',
      leadTimeDays: 50,
      moqPcs: 1000,
      validUntil: daysFromNow(-20),
      notes: 'Garment dye in-house. FOB Chattogram.',
      notesFiltered: 'Garment dye in-house. FOB Chattogram.',
      status: 'ACCEPTED',
      marginRuleId: northboundRule.id,
      pricedById: admin.id,
      pricedAt: daysFromNow(-48),
      offeredAt: daysFromNow(-48),
      decidedAt: daysFromNow(-45),
    },
  });

  const quantity = 12_000;
  const buyerTotal = BigInt(buyerUnit * quantity);
  const manufacturerTotal = BigInt(manufacturerUnit * quantity);
  const order = await prisma.order.create({
    data: {
      code: 'ORD-2026-00017',
      buyerCompanyId: northbound.companyId,
      manufacturerProfileId: meghna.profileId,
      rfqId: awardedRfq.id,
      quoteId: acceptedQuote.id,
      title: 'Heavyweight boxy tee, 240 GSM, garment dyed',
      specification:
        'Per approved PP sample. 1x1 rib neck, double-needle hems, custom woven neck label.',
      quantity,
      buyerUnitPriceMinor: buyerUnit,
      manufacturerUnitPriceMinor: manufacturerUnit,
      buyerTotalMinor: buyerTotal,
      manufacturerTotalMinor: manufacturerTotal,
      currency: 'USD',
      incoterm: 'FOB',
      destinationCountry: 'US',
      destinationPort: 'Los Angeles',
      depositBps: 3000,
      requestedShipDate: daysFromNow(21),
      status: 'IN_PRODUCTION',
      confirmedAt: daysFromNow(-42),
      items: {
        create: ['Black', 'Bone', 'Washed Navy'].flatMap((color) =>
          (
            [
              ['S', 600],
              ['M', 1200],
              ['L', 1200],
              ['XL', 700],
              ['XXL', 300],
            ] as const
          ).map(([size, qty]) => ({
            color,
            size,
            quantity: qty,
            sku: `NB-TEE240-${color.slice(0, 3).toUpperCase()}-${size}`,
          })),
        ),
      },
      milestones: {
        create: [
          {
            stage: 'ORDER_CONFIRMED',
            status: 'COMPLETED',
            plannedAt: daysFromNow(-42),
            completedAt: daysFromNow(-42),
          },
          {
            stage: 'FABRIC_SOURCING',
            status: 'COMPLETED',
            plannedAt: daysFromNow(-30),
            completedAt: daysFromNow(-28),
            note: 'Fabric knitted and dyed, shrinkage within 3%.',
            noteFiltered: 'Fabric knitted and dyed, shrinkage within 3%.',
          },
          {
            stage: 'CUTTING',
            status: 'COMPLETED',
            plannedAt: daysFromNow(-18),
            completedAt: daysFromNow(-17),
          },
          {
            stage: 'SEWING',
            status: 'IN_PROGRESS',
            plannedAt: daysFromNow(-12),
            note: '62% sewn as of today.',
            noteFiltered: '62% sewn as of today.',
          },
          { stage: 'FINISHING', status: 'PENDING', plannedAt: daysFromNow(6) },
          { stage: 'PACKING', status: 'PENDING', plannedAt: daysFromNow(12) },
          { stage: 'READY_FOR_INSPECTION', status: 'PENDING', plannedAt: daysFromNow(15) },
          { stage: 'SHIPPED', status: 'PENDING', plannedAt: daysFromNow(21) },
        ],
      },
      samples: {
        create: [
          {
            type: 'FIT',
            status: 'APPROVED',
            quantity: 2,
            courier: 'DHL Express',
            trackingNumber: '4920018833',
            shippedAt: daysFromNow(-60),
            receivedAt: daysFromNow(-56),
            buyerFeedback: 'Fit approved; drop shoulder 1 cm lower.',
            buyerFeedbackFiltered: 'Fit approved; drop shoulder 1 cm lower.',
            decidedAt: daysFromNow(-54),
          },
          {
            type: 'PRE_PRODUCTION',
            status: 'APPROVED',
            quantity: 3,
            courier: 'DHL Express',
            trackingNumber: '4920021904',
            shippedAt: daysFromNow(-38),
            receivedAt: daysFromNow(-34),
            buyerFeedback: 'PP approved for all three colours.',
            buyerFeedbackFiltered: 'PP approved for all three colours.',
            decidedAt: daysFromNow(-33),
          },
        ],
      },
      inspections: {
        create: [
          {
            type: 'DURING_PRODUCTION',
            agency: 'Third-party QC (to be assigned)',
            scheduledAt: daysFromNow(3),
            aqlLevel: 'II',
            aqlMajor: '2.5',
            aqlMinor: '4.0',
            result: 'PENDING',
          },
        ],
      },
    },
  });

  // ── Money: deposit received, fabric advance paid out ──────────────────────
  const currency: Currency = 'USD';
  const accounts = {
    cash: await prisma.ledgerAccount.create({ data: { type: 'PLATFORM_CASH', currency } }),
    revenue: await prisma.ledgerAccount.create({ data: { type: 'PLATFORM_REVENUE', currency } }),
    escrow: await prisma.ledgerAccount.create({
      data: { type: 'BUYER_ESCROW', companyId: northbound.companyId, currency },
    }),
    payable: await prisma.ledgerAccount.create({
      data: { type: 'MANUFACTURER_PAYABLE', companyId: meghna.companyId, currency },
    }),
  };
  const deposit = (buyerTotal * 3000n) / 10_000n;
  const fabricAdvance = (manufacturerTotal * 3000n) / 10_000n;

  const depositPayment = await prisma.payment.create({
    data: {
      orderId: order.id,
      direction: 'INBOUND',
      purpose: 'DEPOSIT',
      amountMinor: deposit,
      currency,
      method: 'BANK_TRANSFER',
      provider: 'manual',
      providerRef: 'WIRE-NB-2026-0917',
      status: 'SUCCEEDED',
      paidAt: daysFromNow(-41),
    },
  });
  const payout = await prisma.payment.create({
    data: {
      orderId: order.id,
      direction: 'OUTBOUND',
      purpose: 'PAYOUT',
      amountMinor: fabricAdvance,
      currency,
      method: 'BANK_TRANSFER',
      provider: 'manual',
      providerRef: 'PAYOUT-MK-2026-0311',
      status: 'SUCCEEDED',
      paidAt: daysFromNow(-35),
    },
  });

  const post = (
    kind: Prisma.LedgerTransactionCreateInput['kind'],
    key: string,
    description: string,
    paymentId: string | null,
    postedAt: Date,
    debit: string,
    credit: string,
    amount: bigint,
  ) =>
    prisma.ledgerTransaction.create({
      data: {
        kind,
        currency,
        description,
        idempotencyKey: key,
        postedAt,
        orderId: order.id,
        paymentId,
        entries: {
          create: [
            { accountId: debit, direction: 'DEBIT', amountMinor: amount },
            { accountId: credit, direction: 'CREDIT', amountMinor: amount },
          ],
        },
      },
    });
  await post(
    'DEPOSIT',
    `${order.code}:deposit`,
    '30% deposit received from buyer',
    depositPayment.id,
    daysFromNow(-41),
    accounts.cash.id,
    accounts.escrow.id,
    deposit,
  );
  await post(
    'RELEASE',
    `${order.code}:release:fabric`,
    'Fabric advance released from escrow',
    null,
    daysFromNow(-36),
    accounts.escrow.id,
    accounts.payable.id,
    fabricAdvance,
  );
  await post(
    'PAYOUT',
    `${order.code}:payout:fabric`,
    'Fabric advance paid to manufacturer',
    payout.id,
    daysFromNow(-35),
    accounts.payable.id,
    accounts.cash.id,
    fabricAdvance,
  );

  // ── Relayed conversations (buyer↔GarmentGate, manufacturer↔GarmentGate) ──
  const buyerThread = await prisma.conversation.create({
    data: {
      type: 'BUYER_PLATFORM',
      companyId: northbound.companyId,
      orderId: order.id,
      subject: `${order.code} · Production updates`,
      participants: { create: [{ userId: northbound.userId }, { userId: admin.id }] },
    },
  });
  const factoryThread = await prisma.conversation.create({
    data: {
      type: 'MANUFACTURER_PLATFORM',
      companyId: meghna.companyId,
      orderId: order.id,
      subject: `${order.code} · Production`,
      participants: { create: [{ userId: meghna.userId }, { userId: admin.id }] },
    },
  });
  await prisma.conversation.create({
    data: {
      type: 'BUYER_PLATFORM',
      companyId: gruenfeld.companyId,
      rfqId: rfq.id,
      subject: `${rfq.code} · Quotes`,
      participants: { create: [{ userId: gruenfeld.userId }, { userId: admin.id }] },
      messages: {
        create: [
          message(
            gruenfeld.userId,
            'Could you check whether the offered price can include recycled polybags?',
            -2,
          ),
          message(
            admin.id,
            'Checking with the factory now. We will update the offer within 24 hours.',
            -2,
          ),
        ],
      },
    },
  });

  const messages: [string, string, string, number][] = [
    [
      buyerThread.id,
      northbound.userId,
      'How is sewing progressing? We need to confirm the LA warehouse slot.',
      -3,
    ],
    [
      buyerThread.id,
      admin.id,
      'Sewing is 62% complete and on track for the planned ship date. Inline QC is booked for later this week.',
      -3,
    ],
    [
      factoryThread.id,
      admin.id,
      'Please share sewing progress and confirm the inline inspection date.',
      -4,
    ],
    [
      factoryThread.id,
      meghna.userId,
      'Sewing 62% done, inspection ready on schedule. For faster updates WhatsApp me at +880 1711-234567.',
      -3,
    ],
    [
      factoryThread.id,
      admin.id,
      'Thanks! Please keep all communication on GarmentGate so we can track it for the buyer.',
      -3,
    ],
  ];
  let lastAt = new Date(0);
  for (const [conversationId, senderId, text, days] of messages) {
    const m = message(senderId, text, days);
    await prisma.message.create({ data: { conversationId, ...m } });
    lastAt = m.createdAt;
  }
  await prisma.conversation.updateMany({ data: { lastMessageAt: lastAt } });

  // ── Notifications and audit trail ─────────────────────────────────────────
  await prisma.notification.createMany({
    data: [
      {
        userId: gruenfeld.userId,
        type: 'QUOTE_OFFERED',
        title: 'New quote for RFQ-2026-00042',
        body: 'MFR-BD-0421 offered EUR 11.27/pc, 55 days lead time.',
        data: { rfqId: rfq.id },
      },
      {
        userId: northbound.userId,
        type: 'ORDER_UPDATE',
        title: `${order.code}: sewing in progress`,
        body: 'Sewing is 62% complete.',
        data: { orderId: order.id },
      },
      {
        userId: admin.id,
        type: 'KYC_SUBMITTED',
        title: 'Verification pending: MFR-TR-0078',
        body: 'A manufacturer submitted documents for review.',
      },
      {
        userId: admin.id,
        type: 'KYC_SUBMITTED',
        title: 'Verification pending: BYR-GB-0019',
        body: 'A buyer submitted documents for review.',
      },
      {
        userId: admin.id,
        type: 'MESSAGE_RECEIVED',
        title: 'Flagged message on ORD-2026-00017',
        body: 'Contact details were removed from a manufacturer message.',
        data: { conversationId: factoryThread.id },
      },
    ],
  });
  await prisma.auditLog.createMany({
    data: [
      {
        actorUserId: admin.id,
        action: 'kyc.approved',
        entityType: 'Company',
        entityId: meghna.companyId,
        createdAt: daysFromNow(-118),
      },
      {
        actorUserId: admin.id,
        action: 'kyc.approved',
        entityType: 'Company',
        entityId: northbound.companyId,
        createdAt: daysFromNow(-89),
      },
      {
        actorUserId: admin.id,
        action: 'quote.offered',
        entityType: 'Quote',
        entityId: acceptedQuote.id,
        createdAt: daysFromNow(-48),
      },
      {
        actorUserId: northbound.userId,
        action: 'quote.accepted',
        entityType: 'Quote',
        entityId: acceptedQuote.id,
        createdAt: daysFromNow(-45),
      },
      {
        actorUserId: admin.id,
        action: 'ledger.posted',
        entityType: 'Order',
        entityId: order.id,
        metadata: { kind: 'DEPOSIT', amountMinor: deposit.toString() },
        createdAt: daysFromNow(-41),
      },
    ],
  });

  // ── Code sequences continue after the seeded codes ────────────────────────
  const sequences: Record<string, number> = { 'RFQ-2026': 42, 'ORD-2026': 17 };
  for (const code of [
    ...MANUFACTURERS.map((m) => m.publicCode),
    ...BUYERS.map((b) => b.publicCode),
  ]) {
    const prefix = code.slice(0, code.lastIndexOf('-'));
    const value = Number(code.slice(code.lastIndexOf('-') + 1));
    sequences[prefix] = Math.max(sequences[prefix] ?? 0, value);
  }
  await prisma.codeSequence.createMany({
    data: Object.entries(sequences).map(([prefix, lastValue]) => ({ prefix, lastValue })),
  });

  await seedMedia();
  await prisma.capacityMonth.createMany({
    data: [
      {
        manufacturerProfileId: meghna.profileId,
        month: monthStartOffset(1),
        externalBookedPcs: 180_000,
        note: 'Winter programme for an existing customer',
      },
      {
        manufacturerProfileId: meghna.profileId,
        month: monthStartOffset(3),
        availablePcs: 320_000,
        externalBookedPcs: 60_000,
        note: 'Eid holidays: reduced lines',
      },
      {
        manufacturerProfileId: meghna.profileId,
        month: monthStartOffset(4),
        externalBookedPcs: 400_000,
        note: 'Peak season',
      },
    ],
  });

  printLogins();
}

function monthStartOffset(offset: number): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + offset, 1));
}

/** Approved factory photos and product images for every verified factory. */
async function seedMedia(): Promise<void> {
  if (process.env.SEED_SKIP_MEDIA === '1') return;
  const profiles = await prisma.manufacturerProfile.findMany({
    where: { isListed: true },
    include: { company: { include: { users: true } }, products: true },
  });
  for (const [i, profile] of profiles.entries()) {
    const owner = profile.company.users[0];
    if (!owner) continue;
    const base = { companyId: profile.companyId, userId: owner.id };
    for (let n = 0; n < 3; n++) {
      const fileId = await seedImage(prisma, {
        ...base,
        purpose: 'FACTORY_PHOTO',
        hue: (i * 67 + n * 23) % 360,
      });
      await prisma.factoryPhoto.create({
        data: {
          manufacturerProfileId: profile.id,
          fileId,
          sortOrder: n,
          reviewStatus: 'APPROVED',
          reviewedAt: new Date(),
        },
      });
    }
    for (const [j, product] of profile.products.entries()) {
      const fileId = await seedImage(prisma, {
        ...base,
        purpose: 'PRODUCT_IMAGE',
        hue: (i * 67 + j * 41 + 180) % 360,
      });
      await prisma.productImage.create({
        data: { productId: product.id, fileId, reviewStatus: 'APPROVED', reviewedAt: new Date() },
      });
    }
  }
  console.warn('Seeded factory photos and product images (processed renditions in MinIO).');
}

function message(senderId: string, text: string, days: number) {
  const result = filterContactDetails(text);
  return {
    senderId,
    originalContent: text,
    filteredContent: result.filtered,
    flagged: result.flagged,
    flagReasons: result.reasons,
    moderationStatus: result.flagged ? ('FLAGGED' as const) : ('CLEAN' as const),
    createdAt: daysFromNow(days),
  };
}

let fileCounter = 0;
async function createFile(
  companyId: string,
  userId: string,
  purpose: Prisma.FileAssetCreateInput['purpose'],
  name: string,
) {
  fileCounter += 1;
  return prisma.fileAsset.create({
    data: {
      bucket: process.env.S3_BUCKET ?? 'garmentgate',
      storageKey: `seed/${companyId}/${String(fileCounter).padStart(4, '0')}.pdf`,
      originalFilename: name,
      mimeType: 'application/pdf',
      sizeBytes: 180_000 + fileCounter * 1_337,
      purpose,
      status: 'UPLOADED',
      scanStatus: 'CLEAN',
      uploadedById: userId,
      ownerCompanyId: companyId,
      uploadedAt: new Date(),
    },
  });
}

function printLogins(): void {
  const rows = [
    ['ADMIN', ADMIN.email, '—'],
    ...MANUFACTURERS.map((m) => ['MANUFACTURER', m.owner.email, `${m.publicCode} (${m.kyc})`]),
    ...BUYERS.map((b) => ['BUYER', b.owner.email, `${b.publicCode} (${b.kyc})`]),
  ];
  console.warn(`\nDemo logins (password for all: ${DEMO_PASSWORD})`);
  // eslint-disable-next-line no-console -- CLI output for developers
  console.table(rows.map(([role, email, code]) => ({ role, email, code })));
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
