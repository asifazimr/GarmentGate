import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductionLineModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductionLinePayload>;
export type AggregateProductionLine = {
    _count: ProductionLineCountAggregateOutputType | null;
    _avg: ProductionLineAvgAggregateOutputType | null;
    _sum: ProductionLineSumAggregateOutputType | null;
    _min: ProductionLineMinAggregateOutputType | null;
    _max: ProductionLineMaxAggregateOutputType | null;
};
export type ProductionLineAvgAggregateOutputType = {
    dailySamMinutes: number | null;
    workingDays: number | null;
    cmRateMinorPer100Min: number | null;
};
export type ProductionLineSumAggregateOutputType = {
    dailySamMinutes: number | null;
    workingDays: number[];
    cmRateMinorPer100Min: number | null;
};
export type ProductionLineMinAggregateOutputType = {
    id: string | null;
    manufacturerProfileId: string | null;
    code: string | null;
    name: string | null;
    dailySamMinutes: number | null;
    cmRateMinorPer100Min: number | null;
    currency: $Enums.Currency | null;
    status: $Enums.ProductionLineStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductionLineMaxAggregateOutputType = {
    id: string | null;
    manufacturerProfileId: string | null;
    code: string | null;
    name: string | null;
    dailySamMinutes: number | null;
    cmRateMinorPer100Min: number | null;
    currency: $Enums.Currency | null;
    status: $Enums.ProductionLineStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductionLineCountAggregateOutputType = {
    id: number;
    manufacturerProfileId: number;
    code: number;
    name: number;
    dailySamMinutes: number;
    workingDays: number;
    cmRateMinorPer100Min: number;
    currency: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProductionLineAvgAggregateInputType = {
    dailySamMinutes?: true;
    workingDays?: true;
    cmRateMinorPer100Min?: true;
};
export type ProductionLineSumAggregateInputType = {
    dailySamMinutes?: true;
    workingDays?: true;
    cmRateMinorPer100Min?: true;
};
export type ProductionLineMinAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    code?: true;
    name?: true;
    dailySamMinutes?: true;
    cmRateMinorPer100Min?: true;
    currency?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductionLineMaxAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    code?: true;
    name?: true;
    dailySamMinutes?: true;
    cmRateMinorPer100Min?: true;
    currency?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductionLineCountAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    code?: true;
    name?: true;
    dailySamMinutes?: true;
    workingDays?: true;
    cmRateMinorPer100Min?: true;
    currency?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProductionLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionLineWhereInput;
    orderBy?: Prisma.ProductionLineOrderByWithRelationInput | Prisma.ProductionLineOrderByWithRelationInput[];
    cursor?: Prisma.ProductionLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductionLineCountAggregateInputType;
    _avg?: ProductionLineAvgAggregateInputType;
    _sum?: ProductionLineSumAggregateInputType;
    _min?: ProductionLineMinAggregateInputType;
    _max?: ProductionLineMaxAggregateInputType;
};
export type GetProductionLineAggregateType<T extends ProductionLineAggregateArgs> = {
    [P in keyof T & keyof AggregateProductionLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductionLine[P]> : Prisma.GetScalarType<T[P], AggregateProductionLine[P]>;
};
export type ProductionLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionLineWhereInput;
    orderBy?: Prisma.ProductionLineOrderByWithAggregationInput | Prisma.ProductionLineOrderByWithAggregationInput[];
    by: Prisma.ProductionLineScalarFieldEnum[] | Prisma.ProductionLineScalarFieldEnum;
    having?: Prisma.ProductionLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductionLineCountAggregateInputType | true;
    _avg?: ProductionLineAvgAggregateInputType;
    _sum?: ProductionLineSumAggregateInputType;
    _min?: ProductionLineMinAggregateInputType;
    _max?: ProductionLineMaxAggregateInputType;
};
export type ProductionLineGroupByOutputType = {
    id: string;
    manufacturerProfileId: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays: number[];
    cmRateMinorPer100Min: number;
    currency: $Enums.Currency;
    status: $Enums.ProductionLineStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductionLineCountAggregateOutputType | null;
    _avg: ProductionLineAvgAggregateOutputType | null;
    _sum: ProductionLineSumAggregateOutputType | null;
    _min: ProductionLineMinAggregateOutputType | null;
    _max: ProductionLineMaxAggregateOutputType | null;
};
export type GetProductionLineGroupByPayload<T extends ProductionLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductionLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductionLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductionLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductionLineGroupByOutputType[P]>;
}>>;
export type ProductionLineWhereInput = {
    AND?: Prisma.ProductionLineWhereInput | Prisma.ProductionLineWhereInput[];
    OR?: Prisma.ProductionLineWhereInput[];
    NOT?: Prisma.ProductionLineWhereInput | Prisma.ProductionLineWhereInput[];
    id?: Prisma.UuidFilter<"ProductionLine"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"ProductionLine"> | string;
    code?: Prisma.StringFilter<"ProductionLine"> | string;
    name?: Prisma.StringFilter<"ProductionLine"> | string;
    dailySamMinutes?: Prisma.IntFilter<"ProductionLine"> | number;
    workingDays?: Prisma.IntNullableListFilter<"ProductionLine">;
    cmRateMinorPer100Min?: Prisma.IntFilter<"ProductionLine"> | number;
    currency?: Prisma.EnumCurrencyFilter<"ProductionLine"> | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFilter<"ProductionLine"> | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFilter<"ProductionLine"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductionLine"> | Date | string;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
    categories?: Prisma.CategoryListRelationFilter;
    slots?: Prisma.CapacitySlotListRelationFilter;
    bookings?: Prisma.CapacityBookingListRelationFilter;
    partnerships?: Prisma.CapacityPartnershipListRelationFilter;
};
export type ProductionLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    dailySamMinutes?: Prisma.SortOrder;
    workingDays?: Prisma.SortOrder;
    cmRateMinorPer100Min?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    manufacturerProfile?: Prisma.ManufacturerProfileOrderByWithRelationInput;
    categories?: Prisma.CategoryOrderByRelationAggregateInput;
    slots?: Prisma.CapacitySlotOrderByRelationAggregateInput;
    bookings?: Prisma.CapacityBookingOrderByRelationAggregateInput;
    partnerships?: Prisma.CapacityPartnershipOrderByRelationAggregateInput;
};
export type ProductionLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    manufacturerProfileId_code?: Prisma.ProductionLineManufacturerProfileIdCodeCompoundUniqueInput;
    AND?: Prisma.ProductionLineWhereInput | Prisma.ProductionLineWhereInput[];
    OR?: Prisma.ProductionLineWhereInput[];
    NOT?: Prisma.ProductionLineWhereInput | Prisma.ProductionLineWhereInput[];
    manufacturerProfileId?: Prisma.UuidFilter<"ProductionLine"> | string;
    code?: Prisma.StringFilter<"ProductionLine"> | string;
    name?: Prisma.StringFilter<"ProductionLine"> | string;
    dailySamMinutes?: Prisma.IntFilter<"ProductionLine"> | number;
    workingDays?: Prisma.IntNullableListFilter<"ProductionLine">;
    cmRateMinorPer100Min?: Prisma.IntFilter<"ProductionLine"> | number;
    currency?: Prisma.EnumCurrencyFilter<"ProductionLine"> | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFilter<"ProductionLine"> | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFilter<"ProductionLine"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductionLine"> | Date | string;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
    categories?: Prisma.CategoryListRelationFilter;
    slots?: Prisma.CapacitySlotListRelationFilter;
    bookings?: Prisma.CapacityBookingListRelationFilter;
    partnerships?: Prisma.CapacityPartnershipListRelationFilter;
}, "id" | "manufacturerProfileId_code">;
export type ProductionLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    dailySamMinutes?: Prisma.SortOrder;
    workingDays?: Prisma.SortOrder;
    cmRateMinorPer100Min?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProductionLineCountOrderByAggregateInput;
    _avg?: Prisma.ProductionLineAvgOrderByAggregateInput;
    _max?: Prisma.ProductionLineMaxOrderByAggregateInput;
    _min?: Prisma.ProductionLineMinOrderByAggregateInput;
    _sum?: Prisma.ProductionLineSumOrderByAggregateInput;
};
export type ProductionLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductionLineScalarWhereWithAggregatesInput | Prisma.ProductionLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductionLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductionLineScalarWhereWithAggregatesInput | Prisma.ProductionLineScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ProductionLine"> | string;
    manufacturerProfileId?: Prisma.UuidWithAggregatesFilter<"ProductionLine"> | string;
    code?: Prisma.StringWithAggregatesFilter<"ProductionLine"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ProductionLine"> | string;
    dailySamMinutes?: Prisma.IntWithAggregatesFilter<"ProductionLine"> | number;
    workingDays?: Prisma.IntNullableListFilter<"ProductionLine">;
    cmRateMinorPer100Min?: Prisma.IntWithAggregatesFilter<"ProductionLine"> | number;
    currency?: Prisma.EnumCurrencyWithAggregatesFilter<"ProductionLine"> | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusWithAggregatesFilter<"ProductionLine"> | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProductionLine"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ProductionLine"> | Date | string;
};
export type ProductionLineCreateInput = {
    id?: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutProductionLinesInput;
    categories?: Prisma.CategoryCreateNestedManyWithoutProductionLinesInput;
    slots?: Prisma.CapacitySlotCreateNestedManyWithoutLineInput;
    bookings?: Prisma.CapacityBookingCreateNestedManyWithoutLineInput;
    partnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutLineInput;
};
export type ProductionLineUncheckedCreateInput = {
    id?: string;
    manufacturerProfileId: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryUncheckedCreateNestedManyWithoutProductionLinesInput;
    slots?: Prisma.CapacitySlotUncheckedCreateNestedManyWithoutLineInput;
    bookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutLineInput;
    partnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutLineInput;
};
export type ProductionLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutProductionLinesNestedInput;
    categories?: Prisma.CategoryUpdateManyWithoutProductionLinesNestedInput;
    slots?: Prisma.CapacitySlotUpdateManyWithoutLineNestedInput;
    bookings?: Prisma.CapacityBookingUpdateManyWithoutLineNestedInput;
    partnerships?: Prisma.CapacityPartnershipUpdateManyWithoutLineNestedInput;
};
export type ProductionLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUncheckedUpdateManyWithoutProductionLinesNestedInput;
    slots?: Prisma.CapacitySlotUncheckedUpdateManyWithoutLineNestedInput;
    bookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutLineNestedInput;
    partnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutLineNestedInput;
};
export type ProductionLineCreateManyInput = {
    id?: string;
    manufacturerProfileId: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductionLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductionLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductionLineListRelationFilter = {
    every?: Prisma.ProductionLineWhereInput;
    some?: Prisma.ProductionLineWhereInput;
    none?: Prisma.ProductionLineWhereInput;
};
export type ProductionLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    has?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    hasEvery?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    hasSome?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type ProductionLineManufacturerProfileIdCodeCompoundUniqueInput = {
    manufacturerProfileId: string;
    code: string;
};
export type ProductionLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    dailySamMinutes?: Prisma.SortOrder;
    workingDays?: Prisma.SortOrder;
    cmRateMinorPer100Min?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductionLineAvgOrderByAggregateInput = {
    dailySamMinutes?: Prisma.SortOrder;
    workingDays?: Prisma.SortOrder;
    cmRateMinorPer100Min?: Prisma.SortOrder;
};
export type ProductionLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    dailySamMinutes?: Prisma.SortOrder;
    cmRateMinorPer100Min?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductionLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    dailySamMinutes?: Prisma.SortOrder;
    cmRateMinorPer100Min?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductionLineSumOrderByAggregateInput = {
    dailySamMinutes?: Prisma.SortOrder;
    workingDays?: Prisma.SortOrder;
    cmRateMinorPer100Min?: Prisma.SortOrder;
};
export type ProductionLineScalarRelationFilter = {
    is?: Prisma.ProductionLineWhereInput;
    isNot?: Prisma.ProductionLineWhereInput;
};
export type ProductionLineCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutManufacturerProfileInput, Prisma.ProductionLineUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ProductionLineCreateWithoutManufacturerProfileInput[] | Prisma.ProductionLineUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutManufacturerProfileInput | Prisma.ProductionLineCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.ProductionLineCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
};
export type ProductionLineUncheckedCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutManufacturerProfileInput, Prisma.ProductionLineUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ProductionLineCreateWithoutManufacturerProfileInput[] | Prisma.ProductionLineUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutManufacturerProfileInput | Prisma.ProductionLineCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.ProductionLineCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
};
export type ProductionLineUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutManufacturerProfileInput, Prisma.ProductionLineUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ProductionLineCreateWithoutManufacturerProfileInput[] | Prisma.ProductionLineUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutManufacturerProfileInput | Prisma.ProductionLineCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.ProductionLineUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ProductionLineUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.ProductionLineCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    disconnect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    delete?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    connect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    update?: Prisma.ProductionLineUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ProductionLineUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.ProductionLineUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.ProductionLineUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.ProductionLineScalarWhereInput | Prisma.ProductionLineScalarWhereInput[];
};
export type ProductionLineUncheckedUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutManufacturerProfileInput, Prisma.ProductionLineUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ProductionLineCreateWithoutManufacturerProfileInput[] | Prisma.ProductionLineUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutManufacturerProfileInput | Prisma.ProductionLineCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.ProductionLineUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ProductionLineUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.ProductionLineCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    disconnect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    delete?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    connect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    update?: Prisma.ProductionLineUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ProductionLineUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.ProductionLineUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.ProductionLineUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.ProductionLineScalarWhereInput | Prisma.ProductionLineScalarWhereInput[];
};
export type ProductionLineCreateNestedManyWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutCategoriesInput, Prisma.ProductionLineUncheckedCreateWithoutCategoriesInput> | Prisma.ProductionLineCreateWithoutCategoriesInput[] | Prisma.ProductionLineUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutCategoriesInput | Prisma.ProductionLineCreateOrConnectWithoutCategoriesInput[];
    connect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
};
export type ProductionLineUncheckedCreateNestedManyWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutCategoriesInput, Prisma.ProductionLineUncheckedCreateWithoutCategoriesInput> | Prisma.ProductionLineCreateWithoutCategoriesInput[] | Prisma.ProductionLineUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutCategoriesInput | Prisma.ProductionLineCreateOrConnectWithoutCategoriesInput[];
    connect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
};
export type ProductionLineUpdateManyWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutCategoriesInput, Prisma.ProductionLineUncheckedCreateWithoutCategoriesInput> | Prisma.ProductionLineCreateWithoutCategoriesInput[] | Prisma.ProductionLineUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutCategoriesInput | Prisma.ProductionLineCreateOrConnectWithoutCategoriesInput[];
    upsert?: Prisma.ProductionLineUpsertWithWhereUniqueWithoutCategoriesInput | Prisma.ProductionLineUpsertWithWhereUniqueWithoutCategoriesInput[];
    set?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    disconnect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    delete?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    connect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    update?: Prisma.ProductionLineUpdateWithWhereUniqueWithoutCategoriesInput | Prisma.ProductionLineUpdateWithWhereUniqueWithoutCategoriesInput[];
    updateMany?: Prisma.ProductionLineUpdateManyWithWhereWithoutCategoriesInput | Prisma.ProductionLineUpdateManyWithWhereWithoutCategoriesInput[];
    deleteMany?: Prisma.ProductionLineScalarWhereInput | Prisma.ProductionLineScalarWhereInput[];
};
export type ProductionLineUncheckedUpdateManyWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutCategoriesInput, Prisma.ProductionLineUncheckedCreateWithoutCategoriesInput> | Prisma.ProductionLineCreateWithoutCategoriesInput[] | Prisma.ProductionLineUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutCategoriesInput | Prisma.ProductionLineCreateOrConnectWithoutCategoriesInput[];
    upsert?: Prisma.ProductionLineUpsertWithWhereUniqueWithoutCategoriesInput | Prisma.ProductionLineUpsertWithWhereUniqueWithoutCategoriesInput[];
    set?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    disconnect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    delete?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    connect?: Prisma.ProductionLineWhereUniqueInput | Prisma.ProductionLineWhereUniqueInput[];
    update?: Prisma.ProductionLineUpdateWithWhereUniqueWithoutCategoriesInput | Prisma.ProductionLineUpdateWithWhereUniqueWithoutCategoriesInput[];
    updateMany?: Prisma.ProductionLineUpdateManyWithWhereWithoutCategoriesInput | Prisma.ProductionLineUpdateManyWithWhereWithoutCategoriesInput[];
    deleteMany?: Prisma.ProductionLineScalarWhereInput | Prisma.ProductionLineScalarWhereInput[];
};
export type ProductionLineCreateworkingDaysInput = {
    set: number[];
};
export type ProductionLineUpdateworkingDaysInput = {
    set?: number[];
    push?: number | number[];
};
export type EnumProductionLineStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProductionLineStatus;
};
export type ProductionLineCreateNestedOneWithoutSlotsInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutSlotsInput, Prisma.ProductionLineUncheckedCreateWithoutSlotsInput>;
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutSlotsInput;
    connect?: Prisma.ProductionLineWhereUniqueInput;
};
export type ProductionLineUpdateOneRequiredWithoutSlotsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutSlotsInput, Prisma.ProductionLineUncheckedCreateWithoutSlotsInput>;
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutSlotsInput;
    upsert?: Prisma.ProductionLineUpsertWithoutSlotsInput;
    connect?: Prisma.ProductionLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductionLineUpdateToOneWithWhereWithoutSlotsInput, Prisma.ProductionLineUpdateWithoutSlotsInput>, Prisma.ProductionLineUncheckedUpdateWithoutSlotsInput>;
};
export type ProductionLineCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutBookingsInput, Prisma.ProductionLineUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.ProductionLineWhereUniqueInput;
};
export type ProductionLineUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutBookingsInput, Prisma.ProductionLineUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.ProductionLineUpsertWithoutBookingsInput;
    connect?: Prisma.ProductionLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductionLineUpdateToOneWithWhereWithoutBookingsInput, Prisma.ProductionLineUpdateWithoutBookingsInput>, Prisma.ProductionLineUncheckedUpdateWithoutBookingsInput>;
};
export type ProductionLineCreateNestedOneWithoutPartnershipsInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutPartnershipsInput, Prisma.ProductionLineUncheckedCreateWithoutPartnershipsInput>;
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutPartnershipsInput;
    connect?: Prisma.ProductionLineWhereUniqueInput;
};
export type ProductionLineUpdateOneRequiredWithoutPartnershipsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionLineCreateWithoutPartnershipsInput, Prisma.ProductionLineUncheckedCreateWithoutPartnershipsInput>;
    connectOrCreate?: Prisma.ProductionLineCreateOrConnectWithoutPartnershipsInput;
    upsert?: Prisma.ProductionLineUpsertWithoutPartnershipsInput;
    connect?: Prisma.ProductionLineWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductionLineUpdateToOneWithWhereWithoutPartnershipsInput, Prisma.ProductionLineUpdateWithoutPartnershipsInput>, Prisma.ProductionLineUncheckedUpdateWithoutPartnershipsInput>;
};
export type ProductionLineCreateWithoutManufacturerProfileInput = {
    id?: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryCreateNestedManyWithoutProductionLinesInput;
    slots?: Prisma.CapacitySlotCreateNestedManyWithoutLineInput;
    bookings?: Prisma.CapacityBookingCreateNestedManyWithoutLineInput;
    partnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutLineInput;
};
export type ProductionLineUncheckedCreateWithoutManufacturerProfileInput = {
    id?: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryUncheckedCreateNestedManyWithoutProductionLinesInput;
    slots?: Prisma.CapacitySlotUncheckedCreateNestedManyWithoutLineInput;
    bookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutLineInput;
    partnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutLineInput;
};
export type ProductionLineCreateOrConnectWithoutManufacturerProfileInput = {
    where: Prisma.ProductionLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionLineCreateWithoutManufacturerProfileInput, Prisma.ProductionLineUncheckedCreateWithoutManufacturerProfileInput>;
};
export type ProductionLineCreateManyManufacturerProfileInputEnvelope = {
    data: Prisma.ProductionLineCreateManyManufacturerProfileInput | Prisma.ProductionLineCreateManyManufacturerProfileInput[];
    skipDuplicates?: boolean;
};
export type ProductionLineUpsertWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.ProductionLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductionLineUpdateWithoutManufacturerProfileInput, Prisma.ProductionLineUncheckedUpdateWithoutManufacturerProfileInput>;
    create: Prisma.XOR<Prisma.ProductionLineCreateWithoutManufacturerProfileInput, Prisma.ProductionLineUncheckedCreateWithoutManufacturerProfileInput>;
};
export type ProductionLineUpdateWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.ProductionLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductionLineUpdateWithoutManufacturerProfileInput, Prisma.ProductionLineUncheckedUpdateWithoutManufacturerProfileInput>;
};
export type ProductionLineUpdateManyWithWhereWithoutManufacturerProfileInput = {
    where: Prisma.ProductionLineScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductionLineUpdateManyMutationInput, Prisma.ProductionLineUncheckedUpdateManyWithoutManufacturerProfileInput>;
};
export type ProductionLineScalarWhereInput = {
    AND?: Prisma.ProductionLineScalarWhereInput | Prisma.ProductionLineScalarWhereInput[];
    OR?: Prisma.ProductionLineScalarWhereInput[];
    NOT?: Prisma.ProductionLineScalarWhereInput | Prisma.ProductionLineScalarWhereInput[];
    id?: Prisma.UuidFilter<"ProductionLine"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"ProductionLine"> | string;
    code?: Prisma.StringFilter<"ProductionLine"> | string;
    name?: Prisma.StringFilter<"ProductionLine"> | string;
    dailySamMinutes?: Prisma.IntFilter<"ProductionLine"> | number;
    workingDays?: Prisma.IntNullableListFilter<"ProductionLine">;
    cmRateMinorPer100Min?: Prisma.IntFilter<"ProductionLine"> | number;
    currency?: Prisma.EnumCurrencyFilter<"ProductionLine"> | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFilter<"ProductionLine"> | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFilter<"ProductionLine"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ProductionLine"> | Date | string;
};
export type ProductionLineCreateWithoutCategoriesInput = {
    id?: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutProductionLinesInput;
    slots?: Prisma.CapacitySlotCreateNestedManyWithoutLineInput;
    bookings?: Prisma.CapacityBookingCreateNestedManyWithoutLineInput;
    partnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutLineInput;
};
export type ProductionLineUncheckedCreateWithoutCategoriesInput = {
    id?: string;
    manufacturerProfileId: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    slots?: Prisma.CapacitySlotUncheckedCreateNestedManyWithoutLineInput;
    bookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutLineInput;
    partnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutLineInput;
};
export type ProductionLineCreateOrConnectWithoutCategoriesInput = {
    where: Prisma.ProductionLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionLineCreateWithoutCategoriesInput, Prisma.ProductionLineUncheckedCreateWithoutCategoriesInput>;
};
export type ProductionLineUpsertWithWhereUniqueWithoutCategoriesInput = {
    where: Prisma.ProductionLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductionLineUpdateWithoutCategoriesInput, Prisma.ProductionLineUncheckedUpdateWithoutCategoriesInput>;
    create: Prisma.XOR<Prisma.ProductionLineCreateWithoutCategoriesInput, Prisma.ProductionLineUncheckedCreateWithoutCategoriesInput>;
};
export type ProductionLineUpdateWithWhereUniqueWithoutCategoriesInput = {
    where: Prisma.ProductionLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductionLineUpdateWithoutCategoriesInput, Prisma.ProductionLineUncheckedUpdateWithoutCategoriesInput>;
};
export type ProductionLineUpdateManyWithWhereWithoutCategoriesInput = {
    where: Prisma.ProductionLineScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductionLineUpdateManyMutationInput, Prisma.ProductionLineUncheckedUpdateManyWithoutCategoriesInput>;
};
export type ProductionLineCreateWithoutSlotsInput = {
    id?: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutProductionLinesInput;
    categories?: Prisma.CategoryCreateNestedManyWithoutProductionLinesInput;
    bookings?: Prisma.CapacityBookingCreateNestedManyWithoutLineInput;
    partnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutLineInput;
};
export type ProductionLineUncheckedCreateWithoutSlotsInput = {
    id?: string;
    manufacturerProfileId: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryUncheckedCreateNestedManyWithoutProductionLinesInput;
    bookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutLineInput;
    partnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutLineInput;
};
export type ProductionLineCreateOrConnectWithoutSlotsInput = {
    where: Prisma.ProductionLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionLineCreateWithoutSlotsInput, Prisma.ProductionLineUncheckedCreateWithoutSlotsInput>;
};
export type ProductionLineUpsertWithoutSlotsInput = {
    update: Prisma.XOR<Prisma.ProductionLineUpdateWithoutSlotsInput, Prisma.ProductionLineUncheckedUpdateWithoutSlotsInput>;
    create: Prisma.XOR<Prisma.ProductionLineCreateWithoutSlotsInput, Prisma.ProductionLineUncheckedCreateWithoutSlotsInput>;
    where?: Prisma.ProductionLineWhereInput;
};
export type ProductionLineUpdateToOneWithWhereWithoutSlotsInput = {
    where?: Prisma.ProductionLineWhereInput;
    data: Prisma.XOR<Prisma.ProductionLineUpdateWithoutSlotsInput, Prisma.ProductionLineUncheckedUpdateWithoutSlotsInput>;
};
export type ProductionLineUpdateWithoutSlotsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutProductionLinesNestedInput;
    categories?: Prisma.CategoryUpdateManyWithoutProductionLinesNestedInput;
    bookings?: Prisma.CapacityBookingUpdateManyWithoutLineNestedInput;
    partnerships?: Prisma.CapacityPartnershipUpdateManyWithoutLineNestedInput;
};
export type ProductionLineUncheckedUpdateWithoutSlotsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUncheckedUpdateManyWithoutProductionLinesNestedInput;
    bookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutLineNestedInput;
    partnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutLineNestedInput;
};
export type ProductionLineCreateWithoutBookingsInput = {
    id?: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutProductionLinesInput;
    categories?: Prisma.CategoryCreateNestedManyWithoutProductionLinesInput;
    slots?: Prisma.CapacitySlotCreateNestedManyWithoutLineInput;
    partnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutLineInput;
};
export type ProductionLineUncheckedCreateWithoutBookingsInput = {
    id?: string;
    manufacturerProfileId: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryUncheckedCreateNestedManyWithoutProductionLinesInput;
    slots?: Prisma.CapacitySlotUncheckedCreateNestedManyWithoutLineInput;
    partnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutLineInput;
};
export type ProductionLineCreateOrConnectWithoutBookingsInput = {
    where: Prisma.ProductionLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionLineCreateWithoutBookingsInput, Prisma.ProductionLineUncheckedCreateWithoutBookingsInput>;
};
export type ProductionLineUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.ProductionLineUpdateWithoutBookingsInput, Prisma.ProductionLineUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.ProductionLineCreateWithoutBookingsInput, Prisma.ProductionLineUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.ProductionLineWhereInput;
};
export type ProductionLineUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.ProductionLineWhereInput;
    data: Prisma.XOR<Prisma.ProductionLineUpdateWithoutBookingsInput, Prisma.ProductionLineUncheckedUpdateWithoutBookingsInput>;
};
export type ProductionLineUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutProductionLinesNestedInput;
    categories?: Prisma.CategoryUpdateManyWithoutProductionLinesNestedInput;
    slots?: Prisma.CapacitySlotUpdateManyWithoutLineNestedInput;
    partnerships?: Prisma.CapacityPartnershipUpdateManyWithoutLineNestedInput;
};
export type ProductionLineUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUncheckedUpdateManyWithoutProductionLinesNestedInput;
    slots?: Prisma.CapacitySlotUncheckedUpdateManyWithoutLineNestedInput;
    partnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutLineNestedInput;
};
export type ProductionLineCreateWithoutPartnershipsInput = {
    id?: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutProductionLinesInput;
    categories?: Prisma.CategoryCreateNestedManyWithoutProductionLinesInput;
    slots?: Prisma.CapacitySlotCreateNestedManyWithoutLineInput;
    bookings?: Prisma.CapacityBookingCreateNestedManyWithoutLineInput;
};
export type ProductionLineUncheckedCreateWithoutPartnershipsInput = {
    id?: string;
    manufacturerProfileId: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryUncheckedCreateNestedManyWithoutProductionLinesInput;
    slots?: Prisma.CapacitySlotUncheckedCreateNestedManyWithoutLineInput;
    bookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutLineInput;
};
export type ProductionLineCreateOrConnectWithoutPartnershipsInput = {
    where: Prisma.ProductionLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionLineCreateWithoutPartnershipsInput, Prisma.ProductionLineUncheckedCreateWithoutPartnershipsInput>;
};
export type ProductionLineUpsertWithoutPartnershipsInput = {
    update: Prisma.XOR<Prisma.ProductionLineUpdateWithoutPartnershipsInput, Prisma.ProductionLineUncheckedUpdateWithoutPartnershipsInput>;
    create: Prisma.XOR<Prisma.ProductionLineCreateWithoutPartnershipsInput, Prisma.ProductionLineUncheckedCreateWithoutPartnershipsInput>;
    where?: Prisma.ProductionLineWhereInput;
};
export type ProductionLineUpdateToOneWithWhereWithoutPartnershipsInput = {
    where?: Prisma.ProductionLineWhereInput;
    data: Prisma.XOR<Prisma.ProductionLineUpdateWithoutPartnershipsInput, Prisma.ProductionLineUncheckedUpdateWithoutPartnershipsInput>;
};
export type ProductionLineUpdateWithoutPartnershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutProductionLinesNestedInput;
    categories?: Prisma.CategoryUpdateManyWithoutProductionLinesNestedInput;
    slots?: Prisma.CapacitySlotUpdateManyWithoutLineNestedInput;
    bookings?: Prisma.CapacityBookingUpdateManyWithoutLineNestedInput;
};
export type ProductionLineUncheckedUpdateWithoutPartnershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUncheckedUpdateManyWithoutProductionLinesNestedInput;
    slots?: Prisma.CapacitySlotUncheckedUpdateManyWithoutLineNestedInput;
    bookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutLineNestedInput;
};
export type ProductionLineCreateManyManufacturerProfileInput = {
    id?: string;
    code: string;
    name: string;
    dailySamMinutes: number;
    workingDays?: Prisma.ProductionLineCreateworkingDaysInput | number[];
    cmRateMinorPer100Min: number;
    currency?: $Enums.Currency;
    status?: $Enums.ProductionLineStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductionLineUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUpdateManyWithoutProductionLinesNestedInput;
    slots?: Prisma.CapacitySlotUpdateManyWithoutLineNestedInput;
    bookings?: Prisma.CapacityBookingUpdateManyWithoutLineNestedInput;
    partnerships?: Prisma.CapacityPartnershipUpdateManyWithoutLineNestedInput;
};
export type ProductionLineUncheckedUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUncheckedUpdateManyWithoutProductionLinesNestedInput;
    slots?: Prisma.CapacitySlotUncheckedUpdateManyWithoutLineNestedInput;
    bookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutLineNestedInput;
    partnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutLineNestedInput;
};
export type ProductionLineUncheckedUpdateManyWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductionLineUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutProductionLinesNestedInput;
    slots?: Prisma.CapacitySlotUpdateManyWithoutLineNestedInput;
    bookings?: Prisma.CapacityBookingUpdateManyWithoutLineNestedInput;
    partnerships?: Prisma.CapacityPartnershipUpdateManyWithoutLineNestedInput;
};
export type ProductionLineUncheckedUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    slots?: Prisma.CapacitySlotUncheckedUpdateManyWithoutLineNestedInput;
    bookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutLineNestedInput;
    partnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutLineNestedInput;
};
export type ProductionLineUncheckedUpdateManyWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    dailySamMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    workingDays?: Prisma.ProductionLineUpdateworkingDaysInput | number[];
    cmRateMinorPer100Min?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    status?: Prisma.EnumProductionLineStatusFieldUpdateOperationsInput | $Enums.ProductionLineStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductionLineCountOutputType = {
    categories: number;
    slots: number;
    bookings: number;
    partnerships: number;
};
export type ProductionLineCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | ProductionLineCountOutputTypeCountCategoriesArgs;
    slots?: boolean | ProductionLineCountOutputTypeCountSlotsArgs;
    bookings?: boolean | ProductionLineCountOutputTypeCountBookingsArgs;
    partnerships?: boolean | ProductionLineCountOutputTypeCountPartnershipsArgs;
};
export type ProductionLineCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineCountOutputTypeSelect<ExtArgs> | null;
};
export type ProductionLineCountOutputTypeCountCategoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
};
export type ProductionLineCountOutputTypeCountSlotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacitySlotWhereInput;
};
export type ProductionLineCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacityBookingWhereInput;
};
export type ProductionLineCountOutputTypeCountPartnershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacityPartnershipWhereInput;
};
export type ProductionLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    code?: boolean;
    name?: boolean;
    dailySamMinutes?: boolean;
    workingDays?: boolean;
    cmRateMinorPer100Min?: boolean;
    currency?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    categories?: boolean | Prisma.ProductionLine$categoriesArgs<ExtArgs>;
    slots?: boolean | Prisma.ProductionLine$slotsArgs<ExtArgs>;
    bookings?: boolean | Prisma.ProductionLine$bookingsArgs<ExtArgs>;
    partnerships?: boolean | Prisma.ProductionLine$partnershipsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductionLineCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productionLine"]>;
export type ProductionLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    code?: boolean;
    name?: boolean;
    dailySamMinutes?: boolean;
    workingDays?: boolean;
    cmRateMinorPer100Min?: boolean;
    currency?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productionLine"]>;
export type ProductionLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    code?: boolean;
    name?: boolean;
    dailySamMinutes?: boolean;
    workingDays?: boolean;
    cmRateMinorPer100Min?: boolean;
    currency?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productionLine"]>;
export type ProductionLineSelectScalar = {
    id?: boolean;
    manufacturerProfileId?: boolean;
    code?: boolean;
    name?: boolean;
    dailySamMinutes?: boolean;
    workingDays?: boolean;
    cmRateMinorPer100Min?: boolean;
    currency?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProductionLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "manufacturerProfileId" | "code" | "name" | "dailySamMinutes" | "workingDays" | "cmRateMinorPer100Min" | "currency" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["productionLine"]>;
export type ProductionLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    categories?: boolean | Prisma.ProductionLine$categoriesArgs<ExtArgs>;
    slots?: boolean | Prisma.ProductionLine$slotsArgs<ExtArgs>;
    bookings?: boolean | Prisma.ProductionLine$bookingsArgs<ExtArgs>;
    partnerships?: boolean | Prisma.ProductionLine$partnershipsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductionLineCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductionLineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
};
export type ProductionLineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
};
export type $ProductionLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductionLine";
    objects: {
        manufacturerProfile: Prisma.$ManufacturerProfilePayload<ExtArgs>;
        categories: Prisma.$CategoryPayload<ExtArgs>[];
        slots: Prisma.$CapacitySlotPayload<ExtArgs>[];
        bookings: Prisma.$CapacityBookingPayload<ExtArgs>[];
        partnerships: Prisma.$CapacityPartnershipPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        manufacturerProfileId: string;
        code: string;
        name: string;
        dailySamMinutes: number;
        workingDays: number[];
        cmRateMinorPer100Min: number;
        currency: $Enums.Currency;
        status: $Enums.ProductionLineStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["productionLine"]>;
    composites: {};
};
export type ProductionLineGetPayload<S extends boolean | null | undefined | ProductionLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload, S>;
export type ProductionLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductionLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductionLineCountAggregateInputType | true;
};
export interface ProductionLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductionLine'];
        meta: {
            name: 'ProductionLine';
        };
    };
    findUnique<T extends ProductionLineFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductionLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductionLineClient<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductionLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductionLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductionLineClient<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductionLineFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductionLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductionLineClient<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductionLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductionLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductionLineClient<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductionLineFindManyArgs>(args?: Prisma.SelectSubset<T, ProductionLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductionLineCreateArgs>(args: Prisma.SelectSubset<T, ProductionLineCreateArgs<ExtArgs>>): Prisma.Prisma__ProductionLineClient<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductionLineCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductionLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductionLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductionLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductionLineDeleteArgs>(args: Prisma.SelectSubset<T, ProductionLineDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductionLineClient<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductionLineUpdateArgs>(args: Prisma.SelectSubset<T, ProductionLineUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductionLineClient<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductionLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductionLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductionLineUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductionLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductionLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductionLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductionLineUpsertArgs>(args: Prisma.SelectSubset<T, ProductionLineUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductionLineClient<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductionLineCountArgs>(args?: Prisma.Subset<T, ProductionLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductionLineCountAggregateOutputType> : number>;
    aggregate<T extends ProductionLineAggregateArgs>(args: Prisma.Subset<T, ProductionLineAggregateArgs>): Prisma.PrismaPromise<GetProductionLineAggregateType<T>>;
    groupBy<T extends ProductionLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductionLineGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductionLineGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductionLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductionLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductionLineFieldRefs;
}
export interface Prisma__ProductionLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    manufacturerProfile<T extends Prisma.ManufacturerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ManufacturerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__ManufacturerProfileClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    categories<T extends Prisma.ProductionLine$categoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionLine$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    slots<T extends Prisma.ProductionLine$slotsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionLine$slotsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bookings<T extends Prisma.ProductionLine$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionLine$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacityBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    partnerships<T extends Prisma.ProductionLine$partnershipsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionLine$partnershipsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacityPartnershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductionLineFieldRefs {
    readonly id: Prisma.FieldRef<"ProductionLine", 'String'>;
    readonly manufacturerProfileId: Prisma.FieldRef<"ProductionLine", 'String'>;
    readonly code: Prisma.FieldRef<"ProductionLine", 'String'>;
    readonly name: Prisma.FieldRef<"ProductionLine", 'String'>;
    readonly dailySamMinutes: Prisma.FieldRef<"ProductionLine", 'Int'>;
    readonly workingDays: Prisma.FieldRef<"ProductionLine", 'Int[]'>;
    readonly cmRateMinorPer100Min: Prisma.FieldRef<"ProductionLine", 'Int'>;
    readonly currency: Prisma.FieldRef<"ProductionLine", 'Currency'>;
    readonly status: Prisma.FieldRef<"ProductionLine", 'ProductionLineStatus'>;
    readonly createdAt: Prisma.FieldRef<"ProductionLine", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ProductionLine", 'DateTime'>;
}
export type ProductionLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    include?: Prisma.ProductionLineInclude<ExtArgs> | null;
    where: Prisma.ProductionLineWhereUniqueInput;
};
export type ProductionLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    include?: Prisma.ProductionLineInclude<ExtArgs> | null;
    where: Prisma.ProductionLineWhereUniqueInput;
};
export type ProductionLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    include?: Prisma.ProductionLineInclude<ExtArgs> | null;
    where?: Prisma.ProductionLineWhereInput;
    orderBy?: Prisma.ProductionLineOrderByWithRelationInput | Prisma.ProductionLineOrderByWithRelationInput[];
    cursor?: Prisma.ProductionLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductionLineScalarFieldEnum | Prisma.ProductionLineScalarFieldEnum[];
};
export type ProductionLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    include?: Prisma.ProductionLineInclude<ExtArgs> | null;
    where?: Prisma.ProductionLineWhereInput;
    orderBy?: Prisma.ProductionLineOrderByWithRelationInput | Prisma.ProductionLineOrderByWithRelationInput[];
    cursor?: Prisma.ProductionLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductionLineScalarFieldEnum | Prisma.ProductionLineScalarFieldEnum[];
};
export type ProductionLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    include?: Prisma.ProductionLineInclude<ExtArgs> | null;
    where?: Prisma.ProductionLineWhereInput;
    orderBy?: Prisma.ProductionLineOrderByWithRelationInput | Prisma.ProductionLineOrderByWithRelationInput[];
    cursor?: Prisma.ProductionLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductionLineScalarFieldEnum | Prisma.ProductionLineScalarFieldEnum[];
};
export type ProductionLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    include?: Prisma.ProductionLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductionLineCreateInput, Prisma.ProductionLineUncheckedCreateInput>;
};
export type ProductionLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductionLineCreateManyInput | Prisma.ProductionLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductionLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    data: Prisma.ProductionLineCreateManyInput | Prisma.ProductionLineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductionLineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductionLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    include?: Prisma.ProductionLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductionLineUpdateInput, Prisma.ProductionLineUncheckedUpdateInput>;
    where: Prisma.ProductionLineWhereUniqueInput;
};
export type ProductionLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductionLineUpdateManyMutationInput, Prisma.ProductionLineUncheckedUpdateManyInput>;
    where?: Prisma.ProductionLineWhereInput;
    limit?: number;
};
export type ProductionLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductionLineUpdateManyMutationInput, Prisma.ProductionLineUncheckedUpdateManyInput>;
    where?: Prisma.ProductionLineWhereInput;
    limit?: number;
    include?: Prisma.ProductionLineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductionLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    include?: Prisma.ProductionLineInclude<ExtArgs> | null;
    where: Prisma.ProductionLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionLineCreateInput, Prisma.ProductionLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductionLineUpdateInput, Prisma.ProductionLineUncheckedUpdateInput>;
};
export type ProductionLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    include?: Prisma.ProductionLineInclude<ExtArgs> | null;
    where: Prisma.ProductionLineWhereUniqueInput;
};
export type ProductionLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionLineWhereInput;
    limit?: number;
};
export type ProductionLine$categoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[];
};
export type ProductionLine$slotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelect<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    include?: Prisma.CapacitySlotInclude<ExtArgs> | null;
    where?: Prisma.CapacitySlotWhereInput;
    orderBy?: Prisma.CapacitySlotOrderByWithRelationInput | Prisma.CapacitySlotOrderByWithRelationInput[];
    cursor?: Prisma.CapacitySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacitySlotScalarFieldEnum | Prisma.CapacitySlotScalarFieldEnum[];
};
export type ProductionLine$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingInclude<ExtArgs> | null;
    where?: Prisma.CapacityBookingWhereInput;
    orderBy?: Prisma.CapacityBookingOrderByWithRelationInput | Prisma.CapacityBookingOrderByWithRelationInput[];
    cursor?: Prisma.CapacityBookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacityBookingScalarFieldEnum | Prisma.CapacityBookingScalarFieldEnum[];
};
export type ProductionLine$partnershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityPartnershipSelect<ExtArgs> | null;
    omit?: Prisma.CapacityPartnershipOmit<ExtArgs> | null;
    include?: Prisma.CapacityPartnershipInclude<ExtArgs> | null;
    where?: Prisma.CapacityPartnershipWhereInput;
    orderBy?: Prisma.CapacityPartnershipOrderByWithRelationInput | Prisma.CapacityPartnershipOrderByWithRelationInput[];
    cursor?: Prisma.CapacityPartnershipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacityPartnershipScalarFieldEnum | Prisma.CapacityPartnershipScalarFieldEnum[];
};
export type ProductionLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    include?: Prisma.ProductionLineInclude<ExtArgs> | null;
};
