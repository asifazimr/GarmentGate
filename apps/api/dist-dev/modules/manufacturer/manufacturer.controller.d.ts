import { type AddCertificationDto, type CapacityCalendar, type Certification, type FactoryPhotoDto, type ManufacturerCapabilitiesDto, type ManufacturerProduct, type PresignMediaDto, type PresignUploadResponse, type ProductDto, type PublicManufacturer, type ReorderDto, type UpdateCapacityMonthDto } from '@garmentgate/shared';
import { z } from 'zod';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { FilesService } from '../storage/files.service.js';
import { CapacityService } from './capacity.service.js';
import { ManufacturerContextService } from './manufacturer-context.service.js';
import { ManufacturerProductsService } from './products.service.js';
import { ManufacturerProfileService } from './profile.service.js';
declare const CalendarQuerySchema: z.ZodObject<{
    from: z.ZodOptional<z.ZodString>;
    months: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare class ManufacturerController {
    private readonly context;
    private readonly profile;
    private readonly products;
    private readonly capacity;
    private readonly files;
    constructor(context: ManufacturerContextService, profile: ManufacturerProfileService, products: ManufacturerProductsService, capacity: CapacityService, files: FilesService);
    presign(user: AuthenticatedUser, dto: PresignMediaDto): Promise<PresignUploadResponse>;
    getProfile(user: AuthenticatedUser): Promise<{
        publicCode: string;
        photos: {
            id: string;
            processing: "PENDING" | "PROCESSING" | "READY" | "FAILED";
            review: "REJECTED" | "PENDING" | "APPROVED";
            reviewNote: string | null;
            urls: {
                thumb: string;
                medium: string;
                large: string;
                width: number;
                height: number;
            } | null;
            caption: string | null;
            sortOrder: number;
        }[];
    } & {
        capabilities: ManufacturerCapabilitiesDto | null;
    }>;
    updateProfile(user: AuthenticatedUser, dto: ManufacturerCapabilitiesDto): Promise<void>;
    preview(user: AuthenticatedUser): Promise<PublicManufacturer>;
    addPhoto(user: AuthenticatedUser, dto: FactoryPhotoDto): Promise<void>;
    reorderPhotos(user: AuthenticatedUser, dto: ReorderDto): Promise<void>;
    removePhoto(user: AuthenticatedUser, id: string): Promise<void>;
    certifications(user: AuthenticatedUser): Promise<Certification[]>;
    addCertification(user: AuthenticatedUser, dto: AddCertificationDto): Promise<void>;
    removeCertification(user: AuthenticatedUser, id: string): Promise<void>;
    listProducts(user: AuthenticatedUser): Promise<ManufacturerProduct[]>;
    createProduct(user: AuthenticatedUser, dto: ProductDto): Promise<ManufacturerProduct>;
    getProduct(user: AuthenticatedUser, id: string): Promise<ManufacturerProduct>;
    updateProduct(user: AuthenticatedUser, id: string, dto: ProductDto): Promise<ManufacturerProduct>;
    removeProduct(user: AuthenticatedUser, id: string): Promise<void>;
    addProductImage(user: AuthenticatedUser, id: string, dto: FactoryPhotoDto): Promise<ManufacturerProduct>;
    reorderProductImages(user: AuthenticatedUser, id: string, dto: ReorderDto): Promise<void>;
    removeProductImage(user: AuthenticatedUser, id: string, imageId: string): Promise<void>;
    calendar(user: AuthenticatedUser, query: z.output<typeof CalendarQuerySchema>): Promise<CapacityCalendar>;
    updateCapacity(user: AuthenticatedUser, month: string, dto: UpdateCapacityMonthDto): Promise<void>;
}
export {};
