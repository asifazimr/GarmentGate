import type { Meilisearch } from 'meilisearch';
import type { Prisma, PrismaClient } from '../../generated/prisma/client.js';
import {
  listedManufacturer,
  publicManufacturerInclude,
  publicProductInclude,
} from '../catalog/catalog.queries.js';
import { toPublicManufacturer, toPublicProduct } from '../catalog/public.serializer.js';
import {
  MANUFACTURER_INDEX_SETTINGS,
  MANUFACTURERS_INDEX,
  type ManufacturerDocument,
  manufacturerDocument,
  PRODUCT_INDEX_SETTINGS,
  type ProductDocument,
  productDocument,
  PRODUCTS_INDEX,
} from './search-documents.js';

/** Products buyers may find: published, not deleted, from a listed and verified factory. */
const visibleProduct = {
  status: 'PUBLISHED',
  deletedAt: null,
  manufacturerProfile: listedManufacturer,
} satisfies Prisma.ProductWhereInput;

const productIndexInclude = {
  ...publicProductInclude,
  category: { select: { slug: true, name: true, parent: { select: { slug: true } } } },
  manufacturerProfile: {
    select: {
      publicCode: true,
      performanceScore: true,
      searchBoost: true,
      company: publicProductInclude.manufacturerProfile.select.company,
      certifications: { where: { status: 'VERIFIED' }, select: { type: true } },
    },
  },
} satisfies Prisma.ProductInclude;

const manufacturerIndexInclude = {
  ...publicManufacturerInclude,
  categories: {
    select: { slug: true, name: true, parent: { select: { slug: true } } },
    orderBy: { sortOrder: 'asc' },
  },
} satisfies Prisma.ManufacturerProfileInclude;

type Client = PrismaClient | Prisma.TransactionClient;

/**
 * Keeps Meilisearch in step with the database. Documents come from the public serializers, so
 * the index never holds anything a buyer couldn't see. Used by the API worker and the seed.
 */
export class SearchIndexer {
  constructor(
    private readonly prisma: Client,
    private readonly meili: Meilisearch,
    /** Lets tests use their own indexes on a shared Meilisearch. */
    prefix = '',
  ) {
    this.productsIndex = `${prefix}${PRODUCTS_INDEX}`;
    this.manufacturersIndex = `${prefix}${MANUFACTURERS_INDEX}`;
  }

  readonly productsIndex: string;
  readonly manufacturersIndex: string;

  async ensureIndexes(): Promise<void> {
    for (const [uid, settings] of [
      [this.productsIndex, PRODUCT_INDEX_SETTINGS],
      [this.manufacturersIndex, MANUFACTURER_INDEX_SETTINGS],
    ] as const) {
      await this.meili.createIndex(uid, { primaryKey: 'id' }).waitTask();
      await this.meili.index(uid).updateSettings(settings).waitTask();
    }
  }

  async reindexAll(): Promise<{ products: number; manufacturers: number }> {
    const [products, manufacturers] = await Promise.all([
      this.prisma.product.findMany({ where: visibleProduct, include: productIndexInclude }),
      this.prisma.manufacturerProfile.findMany({
        where: listedManufacturer,
        include: manufacturerIndexInclude,
      }),
    ]);
    const productDocs = products.map((p) => this.productDoc(p));
    const manufacturerDocs = manufacturers.map((m) => this.manufacturerDoc(m));
    await this.meili.index(this.productsIndex).deleteAllDocuments().waitTask();
    await this.meili.index(this.manufacturersIndex).deleteAllDocuments().waitTask();
    if (productDocs.length > 0)
      await this.meili
        .index<ProductDocument>(this.productsIndex)
        .addDocuments(productDocs)
        .waitTask();
    if (manufacturerDocs.length > 0) {
      await this.meili
        .index<ManufacturerDocument>(this.manufacturersIndex)
        .addDocuments(manufacturerDocs)
        .waitTask();
    }
    return { products: productDocs.length, manufacturers: manufacturerDocs.length };
  }

  /** Upserts or removes one product, depending on whether buyers may see it. */
  async syncProduct(productId: string): Promise<void> {
    const product = await this.prisma.product.findFirst({
      where: { id: productId, ...visibleProduct },
      include: productIndexInclude,
    });
    const index = this.meili.index<ProductDocument>(this.productsIndex);
    if (product) await index.addDocuments([this.productDoc(product)]).waitTask();
    else await index.deleteDocument(productId).waitTask();
  }

  /** A factory change (listing, certificates, profile) affects its own doc and all its products. */
  async syncManufacturer(profileId: string): Promise<void> {
    const profile = await this.prisma.manufacturerProfile.findUnique({
      where: { id: profileId },
      include: {
        ...manufacturerIndexInclude,
        company: {
          select: { ...publicManufacturerInclude.company.select, kycStatus: true, deletedAt: true },
        },
      },
    });
    if (!profile) return;
    const listed =
      profile.isListed &&
      profile.company.kycStatus === 'VERIFIED' &&
      profile.company.deletedAt === null;
    const index = this.meili.index<ManufacturerDocument>(this.manufacturersIndex);
    if (listed) await index.addDocuments([this.manufacturerDoc(profile)]).waitTask();
    else await index.deleteDocument(profile.publicCode).waitTask();

    const products = await this.prisma.product.findMany({
      where: { manufacturerProfileId: profileId },
      select: { id: true },
    });
    for (const p of products) await this.syncProduct(p.id);
  }

  private productDoc(
    p: Prisma.ProductGetPayload<{ include: typeof productIndexInclude }>,
  ): ProductDocument {
    const publicProduct = toPublicProduct(p, new Map());
    return productDocument(publicProduct, {
      categorySlugs: [p.category.slug, ...(p.category.parent ? [p.category.parent.slug] : [])],
      certifications: p.manufacturerProfile.certifications.map((c) => c.type),
      performanceScore: p.manufacturerProfile.performanceScore,
      searchBoost: p.manufacturerProfile.searchBoost,
      createdAt: p.createdAt,
    });
  }

  private manufacturerDoc(
    m: Prisma.ManufacturerProfileGetPayload<{ include: typeof manufacturerIndexInclude }>,
  ): ManufacturerDocument {
    const parents = m.categories.flatMap((c) => (c.parent ? [c.parent.slug] : []));
    return manufacturerDocument(toPublicManufacturer(m, new Map()), parents, m.searchBoost);
  }
}
