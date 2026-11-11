import { listedManufacturer, publicManufacturerInclude, publicProductInclude, } from '../catalog/catalog.queries.js';
import { toPublicManufacturer, toPublicProduct } from '../catalog/public.serializer.js';
import { MANUFACTURER_INDEX_SETTINGS, MANUFACTURERS_INDEX, manufacturerDocument, PRODUCT_INDEX_SETTINGS, productDocument, PRODUCTS_INDEX, } from './search-documents.js';
const visibleProduct = {
    status: 'PUBLISHED',
    deletedAt: null,
    manufacturerProfile: listedManufacturer,
};
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
};
const manufacturerIndexInclude = {
    ...publicManufacturerInclude,
    categories: {
        select: { slug: true, name: true, parent: { select: { slug: true } } },
        orderBy: { sortOrder: 'asc' },
    },
};
export class SearchIndexer {
    prisma;
    meili;
    constructor(prisma, meili, prefix = '') {
        this.prisma = prisma;
        this.meili = meili;
        this.productsIndex = `${prefix}${PRODUCTS_INDEX}`;
        this.manufacturersIndex = `${prefix}${MANUFACTURERS_INDEX}`;
    }
    productsIndex;
    manufacturersIndex;
    async ensureIndexes() {
        for (const [uid, settings] of [
            [this.productsIndex, PRODUCT_INDEX_SETTINGS],
            [this.manufacturersIndex, MANUFACTURER_INDEX_SETTINGS],
        ]) {
            await this.meili.createIndex(uid, { primaryKey: 'id' }).waitTask();
            await this.meili.index(uid).updateSettings(settings).waitTask();
        }
    }
    async reindexAll() {
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
                .index(this.productsIndex)
                .addDocuments(productDocs)
                .waitTask();
        if (manufacturerDocs.length > 0) {
            await this.meili
                .index(this.manufacturersIndex)
                .addDocuments(manufacturerDocs)
                .waitTask();
        }
        return { products: productDocs.length, manufacturers: manufacturerDocs.length };
    }
    async syncProduct(productId) {
        const product = await this.prisma.product.findFirst({
            where: { id: productId, ...visibleProduct },
            include: productIndexInclude,
        });
        const index = this.meili.index(this.productsIndex);
        if (product)
            await index.addDocuments([this.productDoc(product)]).waitTask();
        else
            await index.deleteDocument(productId).waitTask();
    }
    async syncManufacturer(profileId) {
        const profile = await this.prisma.manufacturerProfile.findUnique({
            where: { id: profileId },
            include: {
                ...manufacturerIndexInclude,
                company: {
                    select: { ...publicManufacturerInclude.company.select, kycStatus: true, deletedAt: true },
                },
            },
        });
        if (!profile)
            return;
        const listed = profile.isListed &&
            profile.company.kycStatus === 'VERIFIED' &&
            profile.company.deletedAt === null;
        const index = this.meili.index(this.manufacturersIndex);
        if (listed)
            await index.addDocuments([this.manufacturerDoc(profile)]).waitTask();
        else
            await index.deleteDocument(profile.publicCode).waitTask();
        const products = await this.prisma.product.findMany({
            where: { manufacturerProfileId: profileId },
            select: { id: true },
        });
        for (const p of products)
            await this.syncProduct(p.id);
    }
    productDoc(p) {
        const publicProduct = toPublicProduct(p, new Map());
        return productDocument(publicProduct, {
            categorySlugs: [p.category.slug, ...(p.category.parent ? [p.category.parent.slug] : [])],
            certifications: p.manufacturerProfile.certifications.map((c) => c.type),
            performanceScore: p.manufacturerProfile.performanceScore,
            searchBoost: p.manufacturerProfile.searchBoost,
            createdAt: p.createdAt,
        });
    }
    manufacturerDoc(m) {
        const parents = m.categories.flatMap((c) => (c.parent ? [c.parent.slug] : []));
        return manufacturerDocument(toPublicManufacturer(m, new Map()), parents, m.searchBoost);
    }
}
//# sourceMappingURL=search-indexer.js.map