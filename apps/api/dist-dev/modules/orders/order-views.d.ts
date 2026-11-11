import { type AdminOrder, type BuyerOrder, type OrderInspection, type ManufacturerOrder, type MilestoneStage, type OrderMedia } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { identityPatterns } from '../catalog/public.serializer.js';
export declare const orderInclude: {
    buyerCompany: {
        select: {
            buyerProfile: {
                select: {
                    publicCode: true;
                };
            };
            addressLine1: true;
            city: true;
            addressLine2: true;
            postalCode: true;
            registrationNumber: true;
            taxId: true;
            country: true;
            legalName: true;
            tradeName: true;
            website: true;
            users: {
                select: {
                    firstName: true;
                    lastName: true;
                };
            };
            id: true;
        };
    };
    manufacturerProfile: {
        select: {
            id: true;
            publicCode: true;
            company: {
                select: {
                    addressLine1: true;
                    city: true;
                    addressLine2: true;
                    postalCode: true;
                    registrationNumber: true;
                    taxId: true;
                    country: true;
                    legalName: true;
                    tradeName: true;
                    website: true;
                    users: {
                        select: {
                            firstName: true;
                            lastName: true;
                        };
                    };
                    id: true;
                };
            };
        };
    };
    rfq: {
        select: {
            code: true;
        };
    };
    reorderOf: {
        select: {
            code: true;
        };
    };
    items: {
        orderBy: ({
            color: "asc";
            size?: undefined;
        } | {
            size: "asc";
            color?: undefined;
        })[];
    };
    samples: {
        orderBy: ({
            round: "asc";
            createdAt?: undefined;
        } | {
            createdAt: "asc";
            round?: undefined;
        })[];
        include: {
            photos: {
                include: {
                    file: {
                        include: {
                            renditions: {
                                orderBy: {
                                    width: "asc";
                                };
                            };
                        };
                    };
                };
                orderBy: {
                    createdAt: "asc";
                };
            };
        };
    };
    milestones: {
        include: {
            photos: {
                include: {
                    file: {
                        include: {
                            renditions: {
                                orderBy: {
                                    width: "asc";
                                };
                            };
                        };
                    };
                };
                orderBy: {
                    createdAt: "asc";
                };
            };
        };
    };
    events: {
        orderBy: {
            createdAt: "asc";
        };
        include: {
            actor: {
                select: {
                    firstName: true;
                    lastName: true;
                    role: true;
                };
            };
        };
    };
    inspections: {
        orderBy: {
            createdAt: "asc";
        };
        include: {
            photos: {
                include: {
                    file: {
                        include: {
                            renditions: {
                                orderBy: {
                                    width: "asc";
                                };
                            };
                        };
                    };
                };
                orderBy: {
                    createdAt: "asc";
                };
            };
            reportFile: {
                select: {
                    id: true;
                    processingStatus: true;
                    sanitizedKey: true;
                };
            };
            inspector: {
                select: {
                    firstName: true;
                    lastName: true;
                };
            };
            bookedBy: {
                select: {
                    role: true;
                };
            };
        };
    };
    payments: {
        where: {
            direction: "INBOUND";
            status: "SUCCEEDED";
            purpose: "BALANCE";
        };
        select: {
            amountMinor: true;
        };
    };
};
export type OrderRow = Prisma.OrderGetPayload<{
    include: typeof orderInclude;
}>;
export type MediaLinks = ReadonlyMap<string, Pick<OrderMedia, 'urls' | 'videoUrl'> & {
    documentUrl?: string | null;
}>;
export declare const documentName: (orderCode: string, type: string, index?: number) => string;
export declare function balancePaid(order: Pick<OrderRow, 'payments' | 'buyerUnitPriceMinor' | 'quantity' | 'depositBps'>): boolean;
export declare function finalInspection(order: Pick<OrderRow, 'inspections'>): ({
    photos: ({
        file: {
            renditions: {
                id: string;
                createdAt: Date;
                format: string;
                width: number;
                storageKey: string;
                sizeBytes: number;
                height: number;
                fileId: string;
            }[];
        } & {
            id: string;
            status: import("../../generated/prisma/enums.js").FileStatus;
            createdAt: Date;
            width: number | null;
            bucket: string;
            storageKey: string;
            sanitizedKey: string | null;
            originalFilename: string;
            mimeType: string;
            sizeBytes: number;
            checksumSha256: string | null;
            purpose: import("../../generated/prisma/enums.js").FilePurpose;
            scanStatus: import("../../generated/prisma/enums.js").ScanStatus;
            uploadedById: string | null;
            ownerCompanyId: string | null;
            uploadedAt: Date | null;
            processingStatus: import("../../generated/prisma/enums.js").ImageProcessingStatus | null;
            processingError: string | null;
            processedAt: Date | null;
            height: number | null;
        };
    } & {
        id: string;
        createdAt: Date;
        fileId: string;
        reviewNote: string | null;
        reviewedAt: Date | null;
        caption: string | null;
        reviewStatus: import("../../generated/prisma/enums.js").MediaReviewStatus;
        inspectionId: string;
    })[];
    reportFile: {
        id: string;
        sanitizedKey: string | null;
        processingStatus: import("../../generated/prisma/enums.js").ImageProcessingStatus | null;
    } | null;
    bookedBy: {
        role: import("../../generated/prisma/enums.js").Role;
    } | null;
    inspector: {
        firstName: string;
        lastName: string;
    } | null;
} & {
    result: import("../../generated/prisma/enums.js").InspectionResult;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: import("../../generated/prisma/enums.js").InspectionType;
    summary: string | null;
    rating: number | null;
    orderId: string;
    paidAt: Date | null;
    agency: string | null;
    scheduledAt: Date | null;
    inspectedAt: Date | null;
    bookedById: string | null;
    inspectorId: string | null;
    assignedAt: Date | null;
    checkedInAt: Date | null;
    checkInDistanceM: number | null;
    payUsdMinor: number | null;
    earnedAt: Date | null;
    payoutReference: string | null;
    auditRequested: boolean;
    lotSize: number | null;
    aqlLevel: string | null;
    aqlMajor: string | null;
    aqlMinor: string | null;
    sampleSize: number | null;
    criticalDefects: number | null;
    majorDefects: number | null;
    minorDefects: number | null;
    reportFileId: string | null;
}) | null;
export type Audience = 'BUYER' | 'MANUFACTURER' | 'ADMIN';
export declare function progressOf(order: Pick<OrderRow, 'status'> & {
    milestones: {
        stage: string;
        status: string;
    }[];
}): number;
export declare function currentStage(order: {
    milestones: {
        stage: MilestoneStage;
        status: string;
    }[];
}): MilestoneStage | null;
type InspectionRow = OrderRow['inspections'][number];
type NamePatterns = ReturnType<typeof identityPatterns>;
export declare function inspectionView(i: InspectionRow, audience: Audience, links: MediaLinks, names: {
    buyerNames: NamePatterns;
    factoryNames: NamePatterns;
}): OrderInspection;
export declare function buyerOrderView(order: OrderRow, links: MediaLinks): BuyerOrder;
export declare function manufacturerOrderView(order: OrderRow, links: MediaLinks): ManufacturerOrder;
export declare function adminOrderView(order: OrderRow, links: MediaLinks): AdminOrder;
export {};
