import { StreamableFile } from '@nestjs/common';
import { type AddMilestoneMediaDto, type MilestoneUpdateDto, type OrderTransitionDto, type PresignOrderMediaDto, type PresignUploadResponse, type ProductionStage, type ReorderOrderDto, type RequestSampleDto, type SampleDecisionDto, type ShipSampleDto } from '@garmentgate/shared';
import type { Response } from 'express';
import { z } from 'zod';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { OrdersService } from './orders.service.js';
declare const SideSchema: z.ZodObject<{
    side: z.ZodOptional<z.ZodEnum<{
        manufacturer: "manufacturer";
        buyer: "buyer";
    }>>;
}, z.core.$strip>;
export declare class OrdersController {
    private readonly actors;
    private readonly orders;
    constructor(actors: ChatActorService, orders: OrdersService);
    list(user: AuthenticatedUser): Promise<{
        manufacturerCode: string;
        totalMinor: number;
        code: string;
        title: string;
        status: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED";
        quantity: number;
        currency: "USD" | "EUR" | "GBP" | "BDT" | "INR" | "VND" | "TRY" | "PKR" | "CNY";
        requestedShipDate: string | null;
        createdAt: string;
        progressPercent: number;
        currentStage: "SHIPPED" | "ORDER_CONFIRMED" | "FABRIC_SOURCING" | "CUTTING" | "SEWING" | "FINISHING" | "PACKING" | "READY_FOR_INSPECTION" | null;
    }[] | {
        buyerCode: string;
        totalMinor: number;
        code: string;
        title: string;
        status: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED";
        quantity: number;
        currency: "USD" | "EUR" | "GBP" | "BDT" | "INR" | "VND" | "TRY" | "PKR" | "CNY";
        requestedShipDate: string | null;
        createdAt: string;
        progressPercent: number;
        currentStage: "SHIPPED" | "ORDER_CONFIRMED" | "FABRIC_SOURCING" | "CUTTING" | "SEWING" | "FINISHING" | "PACKING" | "READY_FOR_INSPECTION" | null;
    }[] | {
        buyer: {
            code: string;
            name: string;
        };
        manufacturer: {
            code: string;
            name: string;
        };
        buyerTotalMinor: number;
        manufacturerTotalMinor: number;
        commissionMinor: number;
        code: string;
        title: string;
        status: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED";
        quantity: number;
        currency: "USD" | "EUR" | "GBP" | "BDT" | "INR" | "VND" | "TRY" | "PKR" | "CNY";
        requestedShipDate: string | null;
        createdAt: string;
        progressPercent: number;
        currentStage: "SHIPPED" | "ORDER_CONFIRMED" | "FABRIC_SOURCING" | "CUTTING" | "SEWING" | "FINISHING" | "PACKING" | "READY_FOR_INSPECTION" | null;
    }[]>;
    detail(user: AuthenticatedUser, code: string): Promise<{
        manufacturerCode: string;
        unitPriceMinor: number;
        totalMinor: number;
        depositMinor: number;
        code: string;
        title: string;
        specification: string | null;
        status: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED";
        quantity: number;
        currency: "USD" | "EUR" | "GBP" | "BDT" | "INR" | "VND" | "TRY" | "PKR" | "CNY";
        incoterm: "EXW" | "FCA" | "FOB" | "CFR" | "CIF" | "CPT" | "CIP" | "DAP" | "DPU" | "DDP";
        destinationCountry: string;
        destinationPort: string | null;
        depositBps: number;
        requestedShipDate: string | null;
        createdAt: string;
        confirmedAt: string | null;
        completedAt: string | null;
        cancelledAt: string | null;
        rfqCode: string | null;
        reorderOfCode: string | null;
        progressPercent: number;
        samples: {
            id: string;
            round: number;
            status: "REJECTED" | "APPROVED" | "SHIPPED" | "IN_PROGRESS" | "REQUESTED" | "RECEIVED";
            quantity: number;
            requestNotes: string | null;
            courier: string | null;
            trackingNumber: string | null;
            requestedAt: string;
            shippedAt: string | null;
            decidedAt: string | null;
            feedback: string | null;
            photos: {
                id: string;
                kind: "IMAGE" | "VIDEO";
                urls: {
                    thumb: string;
                    medium: string;
                    large: string;
                    width: number;
                    height: number;
                } | null;
                videoUrl: string | null;
                caption: string | null;
                processing: "PENDING" | "PROCESSING" | "READY" | "FAILED";
                review: "REJECTED" | "PENDING" | "APPROVED";
            }[];
        }[];
        milestones: {
            stage: "SHIPPED" | "ORDER_CONFIRMED" | "FABRIC_SOURCING" | "CUTTING" | "SEWING" | "FINISHING" | "PACKING" | "READY_FOR_INSPECTION";
            status: "PENDING" | "COMPLETED" | "IN_PROGRESS" | "DELAYED";
            plannedAt: string | null;
            completedAt: string | null;
            note: string | null;
            media: {
                id: string;
                kind: "IMAGE" | "VIDEO";
                urls: {
                    thumb: string;
                    medium: string;
                    large: string;
                    width: number;
                    height: number;
                } | null;
                videoUrl: string | null;
                caption: string | null;
                processing: "PENDING" | "PROCESSING" | "READY" | "FAILED";
                review: "REJECTED" | "PENDING" | "APPROVED";
            }[];
        }[];
        events: {
            from: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED" | null;
            to: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED";
            at: string;
            actor: string | null;
            note: string | null;
        }[];
        inspections: {
            id: string;
            type: "PRE_PRODUCTION" | "DURING_PRODUCTION" | "PRE_SHIPMENT" | "CONTAINER_LOADING";
            result: "PENDING" | "PASS" | "FAIL" | "ON_HOLD";
            scheduledAt: string | null;
            inspectedAt: string | null;
            bookedBy: "BUYER" | "STAFF" | "PLATFORM";
            inspector: string | null;
            rating: number | null;
            aql: {
                lotSize: number;
                sampleSize: number;
                majorAql: string;
                minorAql: string;
                acceptMajor: number;
                acceptMinor: number;
            } | null;
            defects: {
                critical: number;
                major: number;
                minor: number;
            } | null;
            summary: string | null;
            photos: {
                id: string;
                kind: "IMAGE" | "VIDEO";
                urls: {
                    thumb: string;
                    medium: string;
                    large: string;
                    width: number;
                    height: number;
                } | null;
                videoUrl: string | null;
                caption: string | null;
                processing: "PENDING" | "PROCESSING" | "READY" | "FAILED";
                review: "REJECTED" | "PENDING" | "APPROVED";
            }[];
            reportUrl: string | null;
        }[];
        balancePaid: boolean;
        allowedTransitions: ("COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED")[];
    } | {
        buyerCode: string;
        unitPriceMinor: number;
        totalMinor: number;
        code: string;
        title: string;
        specification: string | null;
        status: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED";
        quantity: number;
        currency: "USD" | "EUR" | "GBP" | "BDT" | "INR" | "VND" | "TRY" | "PKR" | "CNY";
        incoterm: "EXW" | "FCA" | "FOB" | "CFR" | "CIF" | "CPT" | "CIP" | "DAP" | "DPU" | "DDP";
        destinationCountry: string;
        destinationPort: string | null;
        depositBps: number;
        requestedShipDate: string | null;
        createdAt: string;
        confirmedAt: string | null;
        completedAt: string | null;
        cancelledAt: string | null;
        rfqCode: string | null;
        reorderOfCode: string | null;
        progressPercent: number;
        samples: {
            id: string;
            round: number;
            status: "REJECTED" | "APPROVED" | "SHIPPED" | "IN_PROGRESS" | "REQUESTED" | "RECEIVED";
            quantity: number;
            requestNotes: string | null;
            courier: string | null;
            trackingNumber: string | null;
            requestedAt: string;
            shippedAt: string | null;
            decidedAt: string | null;
            feedback: string | null;
            photos: {
                id: string;
                kind: "IMAGE" | "VIDEO";
                urls: {
                    thumb: string;
                    medium: string;
                    large: string;
                    width: number;
                    height: number;
                } | null;
                videoUrl: string | null;
                caption: string | null;
                processing: "PENDING" | "PROCESSING" | "READY" | "FAILED";
                review: "REJECTED" | "PENDING" | "APPROVED";
            }[];
        }[];
        milestones: {
            stage: "SHIPPED" | "ORDER_CONFIRMED" | "FABRIC_SOURCING" | "CUTTING" | "SEWING" | "FINISHING" | "PACKING" | "READY_FOR_INSPECTION";
            status: "PENDING" | "COMPLETED" | "IN_PROGRESS" | "DELAYED";
            plannedAt: string | null;
            completedAt: string | null;
            note: string | null;
            media: {
                id: string;
                kind: "IMAGE" | "VIDEO";
                urls: {
                    thumb: string;
                    medium: string;
                    large: string;
                    width: number;
                    height: number;
                } | null;
                videoUrl: string | null;
                caption: string | null;
                processing: "PENDING" | "PROCESSING" | "READY" | "FAILED";
                review: "REJECTED" | "PENDING" | "APPROVED";
            }[];
        }[];
        events: {
            from: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED" | null;
            to: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED";
            at: string;
            actor: string | null;
            note: string | null;
        }[];
        inspections: {
            id: string;
            type: "PRE_PRODUCTION" | "DURING_PRODUCTION" | "PRE_SHIPMENT" | "CONTAINER_LOADING";
            result: "PENDING" | "PASS" | "FAIL" | "ON_HOLD";
            scheduledAt: string | null;
            inspectedAt: string | null;
            bookedBy: "BUYER" | "STAFF" | "PLATFORM";
            inspector: string | null;
            rating: number | null;
            aql: {
                lotSize: number;
                sampleSize: number;
                majorAql: string;
                minorAql: string;
                acceptMajor: number;
                acceptMinor: number;
            } | null;
            defects: {
                critical: number;
                major: number;
                minor: number;
            } | null;
            summary: string | null;
            photos: {
                id: string;
                kind: "IMAGE" | "VIDEO";
                urls: {
                    thumb: string;
                    medium: string;
                    large: string;
                    width: number;
                    height: number;
                } | null;
                videoUrl: string | null;
                caption: string | null;
                processing: "PENDING" | "PROCESSING" | "READY" | "FAILED";
                review: "REJECTED" | "PENDING" | "APPROVED";
            }[];
            reportUrl: string | null;
        }[];
        balancePaid: boolean;
        allowedTransitions: ("COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED")[];
    } | {
        hsCode: string | null;
        buyer: {
            code: string;
            name: string;
        };
        manufacturer: {
            code: string;
            name: string;
        };
        buyerUnitPriceMinor: number;
        manufacturerUnitPriceMinor: number;
        buyerTotalMinor: number;
        manufacturerTotalMinor: number;
        commissionBps: number;
        commissionMinor: number;
        repeatOrder: boolean;
        code: string;
        title: string;
        specification: string | null;
        status: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED";
        quantity: number;
        currency: "USD" | "EUR" | "GBP" | "BDT" | "INR" | "VND" | "TRY" | "PKR" | "CNY";
        incoterm: "EXW" | "FCA" | "FOB" | "CFR" | "CIF" | "CPT" | "CIP" | "DAP" | "DPU" | "DDP";
        destinationCountry: string;
        destinationPort: string | null;
        depositBps: number;
        requestedShipDate: string | null;
        createdAt: string;
        confirmedAt: string | null;
        completedAt: string | null;
        cancelledAt: string | null;
        rfqCode: string | null;
        reorderOfCode: string | null;
        progressPercent: number;
        samples: {
            id: string;
            round: number;
            status: "REJECTED" | "APPROVED" | "SHIPPED" | "IN_PROGRESS" | "REQUESTED" | "RECEIVED";
            quantity: number;
            requestNotes: string | null;
            courier: string | null;
            trackingNumber: string | null;
            requestedAt: string;
            shippedAt: string | null;
            decidedAt: string | null;
            feedback: string | null;
            photos: {
                id: string;
                kind: "IMAGE" | "VIDEO";
                urls: {
                    thumb: string;
                    medium: string;
                    large: string;
                    width: number;
                    height: number;
                } | null;
                videoUrl: string | null;
                caption: string | null;
                processing: "PENDING" | "PROCESSING" | "READY" | "FAILED";
                review: "REJECTED" | "PENDING" | "APPROVED";
            }[];
        }[];
        milestones: {
            stage: "SHIPPED" | "ORDER_CONFIRMED" | "FABRIC_SOURCING" | "CUTTING" | "SEWING" | "FINISHING" | "PACKING" | "READY_FOR_INSPECTION";
            status: "PENDING" | "COMPLETED" | "IN_PROGRESS" | "DELAYED";
            plannedAt: string | null;
            completedAt: string | null;
            note: string | null;
            media: {
                id: string;
                kind: "IMAGE" | "VIDEO";
                urls: {
                    thumb: string;
                    medium: string;
                    large: string;
                    width: number;
                    height: number;
                } | null;
                videoUrl: string | null;
                caption: string | null;
                processing: "PENDING" | "PROCESSING" | "READY" | "FAILED";
                review: "REJECTED" | "PENDING" | "APPROVED";
            }[];
        }[];
        events: {
            from: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED" | null;
            to: "COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED";
            at: string;
            actor: string | null;
            note: string | null;
        }[];
        inspections: {
            id: string;
            type: "PRE_PRODUCTION" | "DURING_PRODUCTION" | "PRE_SHIPMENT" | "CONTAINER_LOADING";
            result: "PENDING" | "PASS" | "FAIL" | "ON_HOLD";
            scheduledAt: string | null;
            inspectedAt: string | null;
            bookedBy: "BUYER" | "STAFF" | "PLATFORM";
            inspector: string | null;
            rating: number | null;
            aql: {
                lotSize: number;
                sampleSize: number;
                majorAql: string;
                minorAql: string;
                acceptMajor: number;
                acceptMinor: number;
            } | null;
            defects: {
                critical: number;
                major: number;
                minor: number;
            } | null;
            summary: string | null;
            photos: {
                id: string;
                kind: "IMAGE" | "VIDEO";
                urls: {
                    thumb: string;
                    medium: string;
                    large: string;
                    width: number;
                    height: number;
                } | null;
                videoUrl: string | null;
                caption: string | null;
                processing: "PENDING" | "PROCESSING" | "READY" | "FAILED";
                review: "REJECTED" | "PENDING" | "APPROVED";
            }[];
            reportUrl: string | null;
        }[];
        balancePaid: boolean;
        allowedTransitions: ("COMPLETED" | "CANCELLED" | "DRAFT" | "SAMPLING" | "SAMPLE_APPROVED" | "DEPOSIT_PENDING" | "IN_PRODUCTION" | "QC" | "READY_TO_SHIP" | "SHIPPED" | "DELIVERED" | "DISPUTED")[];
    }>;
    transition(user: AuthenticatedUser, code: string, dto: OrderTransitionDto): Promise<void>;
    requestSample(user: AuthenticatedUser, code: string, dto: RequestSampleDto): Promise<void>;
    shipSample(user: AuthenticatedUser, code: string, id: string, dto: ShipSampleDto): Promise<void>;
    decideSample(user: AuthenticatedUser, code: string, id: string, dto: SampleDecisionDto): Promise<void>;
    updateMilestone(user: AuthenticatedUser, code: string, stage: ProductionStage, dto: MilestoneUpdateDto): Promise<void>;
    addMedia(user: AuthenticatedUser, code: string, stage: ProductionStage, dto: AddMilestoneMediaDto): Promise<void>;
    presign(user: AuthenticatedUser, code: string, dto: PresignOrderMediaDto): Promise<PresignUploadResponse>;
    reorder(user: AuthenticatedUser, code: string, dto: ReorderOrderDto): Promise<{
        code: string;
    }>;
    purchaseOrder(user: AuthenticatedUser, code: string, query: z.output<typeof SideSchema>, res: Response): Promise<StreamableFile>;
}
export {};
