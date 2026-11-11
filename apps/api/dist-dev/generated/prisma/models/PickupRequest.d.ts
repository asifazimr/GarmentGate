import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PickupRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$PickupRequestPayload>;
export type AggregatePickupRequest = {
    _count: PickupRequestCountAggregateOutputType | null;
    _min: PickupRequestMinAggregateOutputType | null;
    _max: PickupRequestMaxAggregateOutputType | null;
};
export type PickupRequestMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    hubId: string | null;
    pickupDate: Date | null;
    status: $Enums.PickupStatus | null;
    partnerId: string | null;
    note: string | null;
    noteFiltered: string | null;
    scheduledAt: Date | null;
    collectedAt: Date | null;
    createdById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PickupRequestMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    hubId: string | null;
    pickupDate: Date | null;
    status: $Enums.PickupStatus | null;
    partnerId: string | null;
    note: string | null;
    noteFiltered: string | null;
    scheduledAt: Date | null;
    collectedAt: Date | null;
    createdById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PickupRequestCountAggregateOutputType = {
    id: number;
    orderId: number;
    hubId: number;
    pickupDate: number;
    status: number;
    partnerId: number;
    note: number;
    noteFiltered: number;
    scheduledAt: number;
    collectedAt: number;
    createdById: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PickupRequestMinAggregateInputType = {
    id?: true;
    orderId?: true;
    hubId?: true;
    pickupDate?: true;
    status?: true;
    partnerId?: true;
    note?: true;
    noteFiltered?: true;
    scheduledAt?: true;
    collectedAt?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PickupRequestMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    hubId?: true;
    pickupDate?: true;
    status?: true;
    partnerId?: true;
    note?: true;
    noteFiltered?: true;
    scheduledAt?: true;
    collectedAt?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PickupRequestCountAggregateInputType = {
    id?: true;
    orderId?: true;
    hubId?: true;
    pickupDate?: true;
    status?: true;
    partnerId?: true;
    note?: true;
    noteFiltered?: true;
    scheduledAt?: true;
    collectedAt?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PickupRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PickupRequestWhereInput;
    orderBy?: Prisma.PickupRequestOrderByWithRelationInput | Prisma.PickupRequestOrderByWithRelationInput[];
    cursor?: Prisma.PickupRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PickupRequestCountAggregateInputType;
    _min?: PickupRequestMinAggregateInputType;
    _max?: PickupRequestMaxAggregateInputType;
};
export type GetPickupRequestAggregateType<T extends PickupRequestAggregateArgs> = {
    [P in keyof T & keyof AggregatePickupRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePickupRequest[P]> : Prisma.GetScalarType<T[P], AggregatePickupRequest[P]>;
};
export type PickupRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PickupRequestWhereInput;
    orderBy?: Prisma.PickupRequestOrderByWithAggregationInput | Prisma.PickupRequestOrderByWithAggregationInput[];
    by: Prisma.PickupRequestScalarFieldEnum[] | Prisma.PickupRequestScalarFieldEnum;
    having?: Prisma.PickupRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PickupRequestCountAggregateInputType | true;
    _min?: PickupRequestMinAggregateInputType;
    _max?: PickupRequestMaxAggregateInputType;
};
export type PickupRequestGroupByOutputType = {
    id: string;
    orderId: string;
    hubId: string;
    pickupDate: Date;
    status: $Enums.PickupStatus;
    partnerId: string | null;
    note: string | null;
    noteFiltered: string | null;
    scheduledAt: Date | null;
    collectedAt: Date | null;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
    _count: PickupRequestCountAggregateOutputType | null;
    _min: PickupRequestMinAggregateOutputType | null;
    _max: PickupRequestMaxAggregateOutputType | null;
};
export type GetPickupRequestGroupByPayload<T extends PickupRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PickupRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PickupRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PickupRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PickupRequestGroupByOutputType[P]>;
}>>;
export type PickupRequestWhereInput = {
    AND?: Prisma.PickupRequestWhereInput | Prisma.PickupRequestWhereInput[];
    OR?: Prisma.PickupRequestWhereInput[];
    NOT?: Prisma.PickupRequestWhereInput | Prisma.PickupRequestWhereInput[];
    id?: Prisma.UuidFilter<"PickupRequest"> | string;
    orderId?: Prisma.UuidFilter<"PickupRequest"> | string;
    hubId?: Prisma.UuidFilter<"PickupRequest"> | string;
    pickupDate?: Prisma.DateTimeFilter<"PickupRequest"> | Date | string;
    status?: Prisma.EnumPickupStatusFilter<"PickupRequest"> | $Enums.PickupStatus;
    partnerId?: Prisma.UuidNullableFilter<"PickupRequest"> | string | null;
    note?: Prisma.StringNullableFilter<"PickupRequest"> | string | null;
    noteFiltered?: Prisma.StringNullableFilter<"PickupRequest"> | string | null;
    scheduledAt?: Prisma.DateTimeNullableFilter<"PickupRequest"> | Date | string | null;
    collectedAt?: Prisma.DateTimeNullableFilter<"PickupRequest"> | Date | string | null;
    createdById?: Prisma.UuidFilter<"PickupRequest"> | string;
    createdAt?: Prisma.DateTimeFilter<"PickupRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PickupRequest"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    hub?: Prisma.XOR<Prisma.HubScalarRelationFilter, Prisma.HubWhereInput>;
    partner?: Prisma.XOR<Prisma.LogisticsPartnerNullableScalarRelationFilter, Prisma.LogisticsPartnerWhereInput> | null;
    receipts?: Prisma.HubReceiptListRelationFilter;
};
export type PickupRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    hubId?: Prisma.SortOrder;
    pickupDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    partnerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    noteFiltered?: Prisma.SortOrderInput | Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    collectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
    hub?: Prisma.HubOrderByWithRelationInput;
    partner?: Prisma.LogisticsPartnerOrderByWithRelationInput;
    receipts?: Prisma.HubReceiptOrderByRelationAggregateInput;
};
export type PickupRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PickupRequestWhereInput | Prisma.PickupRequestWhereInput[];
    OR?: Prisma.PickupRequestWhereInput[];
    NOT?: Prisma.PickupRequestWhereInput | Prisma.PickupRequestWhereInput[];
    orderId?: Prisma.UuidFilter<"PickupRequest"> | string;
    hubId?: Prisma.UuidFilter<"PickupRequest"> | string;
    pickupDate?: Prisma.DateTimeFilter<"PickupRequest"> | Date | string;
    status?: Prisma.EnumPickupStatusFilter<"PickupRequest"> | $Enums.PickupStatus;
    partnerId?: Prisma.UuidNullableFilter<"PickupRequest"> | string | null;
    note?: Prisma.StringNullableFilter<"PickupRequest"> | string | null;
    noteFiltered?: Prisma.StringNullableFilter<"PickupRequest"> | string | null;
    scheduledAt?: Prisma.DateTimeNullableFilter<"PickupRequest"> | Date | string | null;
    collectedAt?: Prisma.DateTimeNullableFilter<"PickupRequest"> | Date | string | null;
    createdById?: Prisma.UuidFilter<"PickupRequest"> | string;
    createdAt?: Prisma.DateTimeFilter<"PickupRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PickupRequest"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    hub?: Prisma.XOR<Prisma.HubScalarRelationFilter, Prisma.HubWhereInput>;
    partner?: Prisma.XOR<Prisma.LogisticsPartnerNullableScalarRelationFilter, Prisma.LogisticsPartnerWhereInput> | null;
    receipts?: Prisma.HubReceiptListRelationFilter;
}, "id">;
export type PickupRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    hubId?: Prisma.SortOrder;
    pickupDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    partnerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    noteFiltered?: Prisma.SortOrderInput | Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    collectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PickupRequestCountOrderByAggregateInput;
    _max?: Prisma.PickupRequestMaxOrderByAggregateInput;
    _min?: Prisma.PickupRequestMinOrderByAggregateInput;
};
export type PickupRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.PickupRequestScalarWhereWithAggregatesInput | Prisma.PickupRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.PickupRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PickupRequestScalarWhereWithAggregatesInput | Prisma.PickupRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"PickupRequest"> | string;
    orderId?: Prisma.UuidWithAggregatesFilter<"PickupRequest"> | string;
    hubId?: Prisma.UuidWithAggregatesFilter<"PickupRequest"> | string;
    pickupDate?: Prisma.DateTimeWithAggregatesFilter<"PickupRequest"> | Date | string;
    status?: Prisma.EnumPickupStatusWithAggregatesFilter<"PickupRequest"> | $Enums.PickupStatus;
    partnerId?: Prisma.UuidNullableWithAggregatesFilter<"PickupRequest"> | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"PickupRequest"> | string | null;
    noteFiltered?: Prisma.StringNullableWithAggregatesFilter<"PickupRequest"> | string | null;
    scheduledAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PickupRequest"> | Date | string | null;
    collectedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PickupRequest"> | Date | string | null;
    createdById?: Prisma.UuidWithAggregatesFilter<"PickupRequest"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PickupRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PickupRequest"> | Date | string;
};
export type PickupRequestCreateInput = {
    id?: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutPickupsInput;
    hub: Prisma.HubCreateNestedOneWithoutPickupsInput;
    partner?: Prisma.LogisticsPartnerCreateNestedOneWithoutPickupsInput;
    receipts?: Prisma.HubReceiptCreateNestedManyWithoutPickupInput;
};
export type PickupRequestUncheckedCreateInput = {
    id?: string;
    orderId: string;
    hubId: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    partnerId?: string | null;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receipts?: Prisma.HubReceiptUncheckedCreateNestedManyWithoutPickupInput;
};
export type PickupRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutPickupsNestedInput;
    hub?: Prisma.HubUpdateOneRequiredWithoutPickupsNestedInput;
    partner?: Prisma.LogisticsPartnerUpdateOneWithoutPickupsNestedInput;
    receipts?: Prisma.HubReceiptUpdateManyWithoutPickupNestedInput;
};
export type PickupRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipts?: Prisma.HubReceiptUncheckedUpdateManyWithoutPickupNestedInput;
};
export type PickupRequestCreateManyInput = {
    id?: string;
    orderId: string;
    hubId: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    partnerId?: string | null;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PickupRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PickupRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PickupRequestListRelationFilter = {
    every?: Prisma.PickupRequestWhereInput;
    some?: Prisma.PickupRequestWhereInput;
    none?: Prisma.PickupRequestWhereInput;
};
export type PickupRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PickupRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    hubId?: Prisma.SortOrder;
    pickupDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    partnerId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    noteFiltered?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    collectedAt?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PickupRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    hubId?: Prisma.SortOrder;
    pickupDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    partnerId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    noteFiltered?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    collectedAt?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PickupRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    hubId?: Prisma.SortOrder;
    pickupDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    partnerId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    noteFiltered?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    collectedAt?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PickupRequestNullableScalarRelationFilter = {
    is?: Prisma.PickupRequestWhereInput | null;
    isNot?: Prisma.PickupRequestWhereInput | null;
};
export type PickupRequestCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutOrderInput, Prisma.PickupRequestUncheckedCreateWithoutOrderInput> | Prisma.PickupRequestCreateWithoutOrderInput[] | Prisma.PickupRequestUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutOrderInput | Prisma.PickupRequestCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.PickupRequestCreateManyOrderInputEnvelope;
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
};
export type PickupRequestUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutOrderInput, Prisma.PickupRequestUncheckedCreateWithoutOrderInput> | Prisma.PickupRequestCreateWithoutOrderInput[] | Prisma.PickupRequestUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutOrderInput | Prisma.PickupRequestCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.PickupRequestCreateManyOrderInputEnvelope;
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
};
export type PickupRequestUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutOrderInput, Prisma.PickupRequestUncheckedCreateWithoutOrderInput> | Prisma.PickupRequestCreateWithoutOrderInput[] | Prisma.PickupRequestUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutOrderInput | Prisma.PickupRequestCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.PickupRequestUpsertWithWhereUniqueWithoutOrderInput | Prisma.PickupRequestUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.PickupRequestCreateManyOrderInputEnvelope;
    set?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    disconnect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    delete?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    update?: Prisma.PickupRequestUpdateWithWhereUniqueWithoutOrderInput | Prisma.PickupRequestUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.PickupRequestUpdateManyWithWhereWithoutOrderInput | Prisma.PickupRequestUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.PickupRequestScalarWhereInput | Prisma.PickupRequestScalarWhereInput[];
};
export type PickupRequestUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutOrderInput, Prisma.PickupRequestUncheckedCreateWithoutOrderInput> | Prisma.PickupRequestCreateWithoutOrderInput[] | Prisma.PickupRequestUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutOrderInput | Prisma.PickupRequestCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.PickupRequestUpsertWithWhereUniqueWithoutOrderInput | Prisma.PickupRequestUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.PickupRequestCreateManyOrderInputEnvelope;
    set?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    disconnect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    delete?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    update?: Prisma.PickupRequestUpdateWithWhereUniqueWithoutOrderInput | Prisma.PickupRequestUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.PickupRequestUpdateManyWithWhereWithoutOrderInput | Prisma.PickupRequestUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.PickupRequestScalarWhereInput | Prisma.PickupRequestScalarWhereInput[];
};
export type PickupRequestCreateNestedManyWithoutPartnerInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutPartnerInput, Prisma.PickupRequestUncheckedCreateWithoutPartnerInput> | Prisma.PickupRequestCreateWithoutPartnerInput[] | Prisma.PickupRequestUncheckedCreateWithoutPartnerInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutPartnerInput | Prisma.PickupRequestCreateOrConnectWithoutPartnerInput[];
    createMany?: Prisma.PickupRequestCreateManyPartnerInputEnvelope;
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
};
export type PickupRequestUncheckedCreateNestedManyWithoutPartnerInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutPartnerInput, Prisma.PickupRequestUncheckedCreateWithoutPartnerInput> | Prisma.PickupRequestCreateWithoutPartnerInput[] | Prisma.PickupRequestUncheckedCreateWithoutPartnerInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutPartnerInput | Prisma.PickupRequestCreateOrConnectWithoutPartnerInput[];
    createMany?: Prisma.PickupRequestCreateManyPartnerInputEnvelope;
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
};
export type PickupRequestUpdateManyWithoutPartnerNestedInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutPartnerInput, Prisma.PickupRequestUncheckedCreateWithoutPartnerInput> | Prisma.PickupRequestCreateWithoutPartnerInput[] | Prisma.PickupRequestUncheckedCreateWithoutPartnerInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutPartnerInput | Prisma.PickupRequestCreateOrConnectWithoutPartnerInput[];
    upsert?: Prisma.PickupRequestUpsertWithWhereUniqueWithoutPartnerInput | Prisma.PickupRequestUpsertWithWhereUniqueWithoutPartnerInput[];
    createMany?: Prisma.PickupRequestCreateManyPartnerInputEnvelope;
    set?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    disconnect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    delete?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    update?: Prisma.PickupRequestUpdateWithWhereUniqueWithoutPartnerInput | Prisma.PickupRequestUpdateWithWhereUniqueWithoutPartnerInput[];
    updateMany?: Prisma.PickupRequestUpdateManyWithWhereWithoutPartnerInput | Prisma.PickupRequestUpdateManyWithWhereWithoutPartnerInput[];
    deleteMany?: Prisma.PickupRequestScalarWhereInput | Prisma.PickupRequestScalarWhereInput[];
};
export type PickupRequestUncheckedUpdateManyWithoutPartnerNestedInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutPartnerInput, Prisma.PickupRequestUncheckedCreateWithoutPartnerInput> | Prisma.PickupRequestCreateWithoutPartnerInput[] | Prisma.PickupRequestUncheckedCreateWithoutPartnerInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutPartnerInput | Prisma.PickupRequestCreateOrConnectWithoutPartnerInput[];
    upsert?: Prisma.PickupRequestUpsertWithWhereUniqueWithoutPartnerInput | Prisma.PickupRequestUpsertWithWhereUniqueWithoutPartnerInput[];
    createMany?: Prisma.PickupRequestCreateManyPartnerInputEnvelope;
    set?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    disconnect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    delete?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    update?: Prisma.PickupRequestUpdateWithWhereUniqueWithoutPartnerInput | Prisma.PickupRequestUpdateWithWhereUniqueWithoutPartnerInput[];
    updateMany?: Prisma.PickupRequestUpdateManyWithWhereWithoutPartnerInput | Prisma.PickupRequestUpdateManyWithWhereWithoutPartnerInput[];
    deleteMany?: Prisma.PickupRequestScalarWhereInput | Prisma.PickupRequestScalarWhereInput[];
};
export type PickupRequestCreateNestedManyWithoutHubInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutHubInput, Prisma.PickupRequestUncheckedCreateWithoutHubInput> | Prisma.PickupRequestCreateWithoutHubInput[] | Prisma.PickupRequestUncheckedCreateWithoutHubInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutHubInput | Prisma.PickupRequestCreateOrConnectWithoutHubInput[];
    createMany?: Prisma.PickupRequestCreateManyHubInputEnvelope;
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
};
export type PickupRequestUncheckedCreateNestedManyWithoutHubInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutHubInput, Prisma.PickupRequestUncheckedCreateWithoutHubInput> | Prisma.PickupRequestCreateWithoutHubInput[] | Prisma.PickupRequestUncheckedCreateWithoutHubInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutHubInput | Prisma.PickupRequestCreateOrConnectWithoutHubInput[];
    createMany?: Prisma.PickupRequestCreateManyHubInputEnvelope;
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
};
export type PickupRequestUpdateManyWithoutHubNestedInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutHubInput, Prisma.PickupRequestUncheckedCreateWithoutHubInput> | Prisma.PickupRequestCreateWithoutHubInput[] | Prisma.PickupRequestUncheckedCreateWithoutHubInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutHubInput | Prisma.PickupRequestCreateOrConnectWithoutHubInput[];
    upsert?: Prisma.PickupRequestUpsertWithWhereUniqueWithoutHubInput | Prisma.PickupRequestUpsertWithWhereUniqueWithoutHubInput[];
    createMany?: Prisma.PickupRequestCreateManyHubInputEnvelope;
    set?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    disconnect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    delete?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    update?: Prisma.PickupRequestUpdateWithWhereUniqueWithoutHubInput | Prisma.PickupRequestUpdateWithWhereUniqueWithoutHubInput[];
    updateMany?: Prisma.PickupRequestUpdateManyWithWhereWithoutHubInput | Prisma.PickupRequestUpdateManyWithWhereWithoutHubInput[];
    deleteMany?: Prisma.PickupRequestScalarWhereInput | Prisma.PickupRequestScalarWhereInput[];
};
export type PickupRequestUncheckedUpdateManyWithoutHubNestedInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutHubInput, Prisma.PickupRequestUncheckedCreateWithoutHubInput> | Prisma.PickupRequestCreateWithoutHubInput[] | Prisma.PickupRequestUncheckedCreateWithoutHubInput[];
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutHubInput | Prisma.PickupRequestCreateOrConnectWithoutHubInput[];
    upsert?: Prisma.PickupRequestUpsertWithWhereUniqueWithoutHubInput | Prisma.PickupRequestUpsertWithWhereUniqueWithoutHubInput[];
    createMany?: Prisma.PickupRequestCreateManyHubInputEnvelope;
    set?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    disconnect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    delete?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    connect?: Prisma.PickupRequestWhereUniqueInput | Prisma.PickupRequestWhereUniqueInput[];
    update?: Prisma.PickupRequestUpdateWithWhereUniqueWithoutHubInput | Prisma.PickupRequestUpdateWithWhereUniqueWithoutHubInput[];
    updateMany?: Prisma.PickupRequestUpdateManyWithWhereWithoutHubInput | Prisma.PickupRequestUpdateManyWithWhereWithoutHubInput[];
    deleteMany?: Prisma.PickupRequestScalarWhereInput | Prisma.PickupRequestScalarWhereInput[];
};
export type EnumPickupStatusFieldUpdateOperationsInput = {
    set?: $Enums.PickupStatus;
};
export type PickupRequestCreateNestedOneWithoutReceiptsInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutReceiptsInput, Prisma.PickupRequestUncheckedCreateWithoutReceiptsInput>;
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutReceiptsInput;
    connect?: Prisma.PickupRequestWhereUniqueInput;
};
export type PickupRequestUpdateOneWithoutReceiptsNestedInput = {
    create?: Prisma.XOR<Prisma.PickupRequestCreateWithoutReceiptsInput, Prisma.PickupRequestUncheckedCreateWithoutReceiptsInput>;
    connectOrCreate?: Prisma.PickupRequestCreateOrConnectWithoutReceiptsInput;
    upsert?: Prisma.PickupRequestUpsertWithoutReceiptsInput;
    disconnect?: Prisma.PickupRequestWhereInput | boolean;
    delete?: Prisma.PickupRequestWhereInput | boolean;
    connect?: Prisma.PickupRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PickupRequestUpdateToOneWithWhereWithoutReceiptsInput, Prisma.PickupRequestUpdateWithoutReceiptsInput>, Prisma.PickupRequestUncheckedUpdateWithoutReceiptsInput>;
};
export type PickupRequestCreateWithoutOrderInput = {
    id?: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    hub: Prisma.HubCreateNestedOneWithoutPickupsInput;
    partner?: Prisma.LogisticsPartnerCreateNestedOneWithoutPickupsInput;
    receipts?: Prisma.HubReceiptCreateNestedManyWithoutPickupInput;
};
export type PickupRequestUncheckedCreateWithoutOrderInput = {
    id?: string;
    hubId: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    partnerId?: string | null;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receipts?: Prisma.HubReceiptUncheckedCreateNestedManyWithoutPickupInput;
};
export type PickupRequestCreateOrConnectWithoutOrderInput = {
    where: Prisma.PickupRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.PickupRequestCreateWithoutOrderInput, Prisma.PickupRequestUncheckedCreateWithoutOrderInput>;
};
export type PickupRequestCreateManyOrderInputEnvelope = {
    data: Prisma.PickupRequestCreateManyOrderInput | Prisma.PickupRequestCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type PickupRequestUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.PickupRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.PickupRequestUpdateWithoutOrderInput, Prisma.PickupRequestUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.PickupRequestCreateWithoutOrderInput, Prisma.PickupRequestUncheckedCreateWithoutOrderInput>;
};
export type PickupRequestUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.PickupRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.PickupRequestUpdateWithoutOrderInput, Prisma.PickupRequestUncheckedUpdateWithoutOrderInput>;
};
export type PickupRequestUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.PickupRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.PickupRequestUpdateManyMutationInput, Prisma.PickupRequestUncheckedUpdateManyWithoutOrderInput>;
};
export type PickupRequestScalarWhereInput = {
    AND?: Prisma.PickupRequestScalarWhereInput | Prisma.PickupRequestScalarWhereInput[];
    OR?: Prisma.PickupRequestScalarWhereInput[];
    NOT?: Prisma.PickupRequestScalarWhereInput | Prisma.PickupRequestScalarWhereInput[];
    id?: Prisma.UuidFilter<"PickupRequest"> | string;
    orderId?: Prisma.UuidFilter<"PickupRequest"> | string;
    hubId?: Prisma.UuidFilter<"PickupRequest"> | string;
    pickupDate?: Prisma.DateTimeFilter<"PickupRequest"> | Date | string;
    status?: Prisma.EnumPickupStatusFilter<"PickupRequest"> | $Enums.PickupStatus;
    partnerId?: Prisma.UuidNullableFilter<"PickupRequest"> | string | null;
    note?: Prisma.StringNullableFilter<"PickupRequest"> | string | null;
    noteFiltered?: Prisma.StringNullableFilter<"PickupRequest"> | string | null;
    scheduledAt?: Prisma.DateTimeNullableFilter<"PickupRequest"> | Date | string | null;
    collectedAt?: Prisma.DateTimeNullableFilter<"PickupRequest"> | Date | string | null;
    createdById?: Prisma.UuidFilter<"PickupRequest"> | string;
    createdAt?: Prisma.DateTimeFilter<"PickupRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PickupRequest"> | Date | string;
};
export type PickupRequestCreateWithoutPartnerInput = {
    id?: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutPickupsInput;
    hub: Prisma.HubCreateNestedOneWithoutPickupsInput;
    receipts?: Prisma.HubReceiptCreateNestedManyWithoutPickupInput;
};
export type PickupRequestUncheckedCreateWithoutPartnerInput = {
    id?: string;
    orderId: string;
    hubId: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receipts?: Prisma.HubReceiptUncheckedCreateNestedManyWithoutPickupInput;
};
export type PickupRequestCreateOrConnectWithoutPartnerInput = {
    where: Prisma.PickupRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.PickupRequestCreateWithoutPartnerInput, Prisma.PickupRequestUncheckedCreateWithoutPartnerInput>;
};
export type PickupRequestCreateManyPartnerInputEnvelope = {
    data: Prisma.PickupRequestCreateManyPartnerInput | Prisma.PickupRequestCreateManyPartnerInput[];
    skipDuplicates?: boolean;
};
export type PickupRequestUpsertWithWhereUniqueWithoutPartnerInput = {
    where: Prisma.PickupRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.PickupRequestUpdateWithoutPartnerInput, Prisma.PickupRequestUncheckedUpdateWithoutPartnerInput>;
    create: Prisma.XOR<Prisma.PickupRequestCreateWithoutPartnerInput, Prisma.PickupRequestUncheckedCreateWithoutPartnerInput>;
};
export type PickupRequestUpdateWithWhereUniqueWithoutPartnerInput = {
    where: Prisma.PickupRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.PickupRequestUpdateWithoutPartnerInput, Prisma.PickupRequestUncheckedUpdateWithoutPartnerInput>;
};
export type PickupRequestUpdateManyWithWhereWithoutPartnerInput = {
    where: Prisma.PickupRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.PickupRequestUpdateManyMutationInput, Prisma.PickupRequestUncheckedUpdateManyWithoutPartnerInput>;
};
export type PickupRequestCreateWithoutHubInput = {
    id?: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutPickupsInput;
    partner?: Prisma.LogisticsPartnerCreateNestedOneWithoutPickupsInput;
    receipts?: Prisma.HubReceiptCreateNestedManyWithoutPickupInput;
};
export type PickupRequestUncheckedCreateWithoutHubInput = {
    id?: string;
    orderId: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    partnerId?: string | null;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receipts?: Prisma.HubReceiptUncheckedCreateNestedManyWithoutPickupInput;
};
export type PickupRequestCreateOrConnectWithoutHubInput = {
    where: Prisma.PickupRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.PickupRequestCreateWithoutHubInput, Prisma.PickupRequestUncheckedCreateWithoutHubInput>;
};
export type PickupRequestCreateManyHubInputEnvelope = {
    data: Prisma.PickupRequestCreateManyHubInput | Prisma.PickupRequestCreateManyHubInput[];
    skipDuplicates?: boolean;
};
export type PickupRequestUpsertWithWhereUniqueWithoutHubInput = {
    where: Prisma.PickupRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.PickupRequestUpdateWithoutHubInput, Prisma.PickupRequestUncheckedUpdateWithoutHubInput>;
    create: Prisma.XOR<Prisma.PickupRequestCreateWithoutHubInput, Prisma.PickupRequestUncheckedCreateWithoutHubInput>;
};
export type PickupRequestUpdateWithWhereUniqueWithoutHubInput = {
    where: Prisma.PickupRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.PickupRequestUpdateWithoutHubInput, Prisma.PickupRequestUncheckedUpdateWithoutHubInput>;
};
export type PickupRequestUpdateManyWithWhereWithoutHubInput = {
    where: Prisma.PickupRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.PickupRequestUpdateManyMutationInput, Prisma.PickupRequestUncheckedUpdateManyWithoutHubInput>;
};
export type PickupRequestCreateWithoutReceiptsInput = {
    id?: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutPickupsInput;
    hub: Prisma.HubCreateNestedOneWithoutPickupsInput;
    partner?: Prisma.LogisticsPartnerCreateNestedOneWithoutPickupsInput;
};
export type PickupRequestUncheckedCreateWithoutReceiptsInput = {
    id?: string;
    orderId: string;
    hubId: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    partnerId?: string | null;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PickupRequestCreateOrConnectWithoutReceiptsInput = {
    where: Prisma.PickupRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.PickupRequestCreateWithoutReceiptsInput, Prisma.PickupRequestUncheckedCreateWithoutReceiptsInput>;
};
export type PickupRequestUpsertWithoutReceiptsInput = {
    update: Prisma.XOR<Prisma.PickupRequestUpdateWithoutReceiptsInput, Prisma.PickupRequestUncheckedUpdateWithoutReceiptsInput>;
    create: Prisma.XOR<Prisma.PickupRequestCreateWithoutReceiptsInput, Prisma.PickupRequestUncheckedCreateWithoutReceiptsInput>;
    where?: Prisma.PickupRequestWhereInput;
};
export type PickupRequestUpdateToOneWithWhereWithoutReceiptsInput = {
    where?: Prisma.PickupRequestWhereInput;
    data: Prisma.XOR<Prisma.PickupRequestUpdateWithoutReceiptsInput, Prisma.PickupRequestUncheckedUpdateWithoutReceiptsInput>;
};
export type PickupRequestUpdateWithoutReceiptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutPickupsNestedInput;
    hub?: Prisma.HubUpdateOneRequiredWithoutPickupsNestedInput;
    partner?: Prisma.LogisticsPartnerUpdateOneWithoutPickupsNestedInput;
};
export type PickupRequestUncheckedUpdateWithoutReceiptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PickupRequestCreateManyOrderInput = {
    id?: string;
    hubId: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    partnerId?: string | null;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PickupRequestUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hub?: Prisma.HubUpdateOneRequiredWithoutPickupsNestedInput;
    partner?: Prisma.LogisticsPartnerUpdateOneWithoutPickupsNestedInput;
    receipts?: Prisma.HubReceiptUpdateManyWithoutPickupNestedInput;
};
export type PickupRequestUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipts?: Prisma.HubReceiptUncheckedUpdateManyWithoutPickupNestedInput;
};
export type PickupRequestUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PickupRequestCreateManyPartnerInput = {
    id?: string;
    orderId: string;
    hubId: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PickupRequestUpdateWithoutPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutPickupsNestedInput;
    hub?: Prisma.HubUpdateOneRequiredWithoutPickupsNestedInput;
    receipts?: Prisma.HubReceiptUpdateManyWithoutPickupNestedInput;
};
export type PickupRequestUncheckedUpdateWithoutPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipts?: Prisma.HubReceiptUncheckedUpdateManyWithoutPickupNestedInput;
};
export type PickupRequestUncheckedUpdateManyWithoutPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PickupRequestCreateManyHubInput = {
    id?: string;
    orderId: string;
    pickupDate: Date | string;
    status?: $Enums.PickupStatus;
    partnerId?: string | null;
    note?: string | null;
    noteFiltered?: string | null;
    scheduledAt?: Date | string | null;
    collectedAt?: Date | string | null;
    createdById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PickupRequestUpdateWithoutHubInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutPickupsNestedInput;
    partner?: Prisma.LogisticsPartnerUpdateOneWithoutPickupsNestedInput;
    receipts?: Prisma.HubReceiptUpdateManyWithoutPickupNestedInput;
};
export type PickupRequestUncheckedUpdateWithoutHubInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipts?: Prisma.HubReceiptUncheckedUpdateManyWithoutPickupNestedInput;
};
export type PickupRequestUncheckedUpdateManyWithoutHubInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumPickupStatusFieldUpdateOperationsInput | $Enums.PickupStatus;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PickupRequestCountOutputType = {
    receipts: number;
};
export type PickupRequestCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receipts?: boolean | PickupRequestCountOutputTypeCountReceiptsArgs;
};
export type PickupRequestCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestCountOutputTypeSelect<ExtArgs> | null;
};
export type PickupRequestCountOutputTypeCountReceiptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubReceiptWhereInput;
};
export type PickupRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    hubId?: boolean;
    pickupDate?: boolean;
    status?: boolean;
    partnerId?: boolean;
    note?: boolean;
    noteFiltered?: boolean;
    scheduledAt?: boolean;
    collectedAt?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    partner?: boolean | Prisma.PickupRequest$partnerArgs<ExtArgs>;
    receipts?: boolean | Prisma.PickupRequest$receiptsArgs<ExtArgs>;
    _count?: boolean | Prisma.PickupRequestCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pickupRequest"]>;
export type PickupRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    hubId?: boolean;
    pickupDate?: boolean;
    status?: boolean;
    partnerId?: boolean;
    note?: boolean;
    noteFiltered?: boolean;
    scheduledAt?: boolean;
    collectedAt?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    partner?: boolean | Prisma.PickupRequest$partnerArgs<ExtArgs>;
}, ExtArgs["result"]["pickupRequest"]>;
export type PickupRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    hubId?: boolean;
    pickupDate?: boolean;
    status?: boolean;
    partnerId?: boolean;
    note?: boolean;
    noteFiltered?: boolean;
    scheduledAt?: boolean;
    collectedAt?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    partner?: boolean | Prisma.PickupRequest$partnerArgs<ExtArgs>;
}, ExtArgs["result"]["pickupRequest"]>;
export type PickupRequestSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    hubId?: boolean;
    pickupDate?: boolean;
    status?: boolean;
    partnerId?: boolean;
    note?: boolean;
    noteFiltered?: boolean;
    scheduledAt?: boolean;
    collectedAt?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PickupRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "hubId" | "pickupDate" | "status" | "partnerId" | "note" | "noteFiltered" | "scheduledAt" | "collectedAt" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["pickupRequest"]>;
export type PickupRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    partner?: boolean | Prisma.PickupRequest$partnerArgs<ExtArgs>;
    receipts?: boolean | Prisma.PickupRequest$receiptsArgs<ExtArgs>;
    _count?: boolean | Prisma.PickupRequestCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PickupRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    partner?: boolean | Prisma.PickupRequest$partnerArgs<ExtArgs>;
};
export type PickupRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    partner?: boolean | Prisma.PickupRequest$partnerArgs<ExtArgs>;
};
export type $PickupRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PickupRequest";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
        hub: Prisma.$HubPayload<ExtArgs>;
        partner: Prisma.$LogisticsPartnerPayload<ExtArgs> | null;
        receipts: Prisma.$HubReceiptPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        hubId: string;
        pickupDate: Date;
        status: $Enums.PickupStatus;
        partnerId: string | null;
        note: string | null;
        noteFiltered: string | null;
        scheduledAt: Date | null;
        collectedAt: Date | null;
        createdById: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["pickupRequest"]>;
    composites: {};
};
export type PickupRequestGetPayload<S extends boolean | null | undefined | PickupRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload, S>;
export type PickupRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PickupRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PickupRequestCountAggregateInputType | true;
};
export interface PickupRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PickupRequest'];
        meta: {
            name: 'PickupRequest';
        };
    };
    findUnique<T extends PickupRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, PickupRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PickupRequestClient<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PickupRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PickupRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PickupRequestClient<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PickupRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, PickupRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__PickupRequestClient<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PickupRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PickupRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PickupRequestClient<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PickupRequestFindManyArgs>(args?: Prisma.SelectSubset<T, PickupRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PickupRequestCreateArgs>(args: Prisma.SelectSubset<T, PickupRequestCreateArgs<ExtArgs>>): Prisma.Prisma__PickupRequestClient<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PickupRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, PickupRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PickupRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PickupRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PickupRequestDeleteArgs>(args: Prisma.SelectSubset<T, PickupRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__PickupRequestClient<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PickupRequestUpdateArgs>(args: Prisma.SelectSubset<T, PickupRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__PickupRequestClient<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PickupRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, PickupRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PickupRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, PickupRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PickupRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PickupRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PickupRequestUpsertArgs>(args: Prisma.SelectSubset<T, PickupRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__PickupRequestClient<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PickupRequestCountArgs>(args?: Prisma.Subset<T, PickupRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PickupRequestCountAggregateOutputType> : number>;
    aggregate<T extends PickupRequestAggregateArgs>(args: Prisma.Subset<T, PickupRequestAggregateArgs>): Prisma.PrismaPromise<GetPickupRequestAggregateType<T>>;
    groupBy<T extends PickupRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PickupRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: PickupRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PickupRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPickupRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PickupRequestFieldRefs;
}
export interface Prisma__PickupRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    hub<T extends Prisma.HubDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.HubDefaultArgs<ExtArgs>>): Prisma.Prisma__HubClient<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    partner<T extends Prisma.PickupRequest$partnerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PickupRequest$partnerArgs<ExtArgs>>): Prisma.Prisma__LogisticsPartnerClient<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    receipts<T extends Prisma.PickupRequest$receiptsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PickupRequest$receiptsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PickupRequestFieldRefs {
    readonly id: Prisma.FieldRef<"PickupRequest", 'String'>;
    readonly orderId: Prisma.FieldRef<"PickupRequest", 'String'>;
    readonly hubId: Prisma.FieldRef<"PickupRequest", 'String'>;
    readonly pickupDate: Prisma.FieldRef<"PickupRequest", 'DateTime'>;
    readonly status: Prisma.FieldRef<"PickupRequest", 'PickupStatus'>;
    readonly partnerId: Prisma.FieldRef<"PickupRequest", 'String'>;
    readonly note: Prisma.FieldRef<"PickupRequest", 'String'>;
    readonly noteFiltered: Prisma.FieldRef<"PickupRequest", 'String'>;
    readonly scheduledAt: Prisma.FieldRef<"PickupRequest", 'DateTime'>;
    readonly collectedAt: Prisma.FieldRef<"PickupRequest", 'DateTime'>;
    readonly createdById: Prisma.FieldRef<"PickupRequest", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PickupRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PickupRequest", 'DateTime'>;
}
export type PickupRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    where: Prisma.PickupRequestWhereUniqueInput;
};
export type PickupRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    where: Prisma.PickupRequestWhereUniqueInput;
};
export type PickupRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    where?: Prisma.PickupRequestWhereInput;
    orderBy?: Prisma.PickupRequestOrderByWithRelationInput | Prisma.PickupRequestOrderByWithRelationInput[];
    cursor?: Prisma.PickupRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PickupRequestScalarFieldEnum | Prisma.PickupRequestScalarFieldEnum[];
};
export type PickupRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    where?: Prisma.PickupRequestWhereInput;
    orderBy?: Prisma.PickupRequestOrderByWithRelationInput | Prisma.PickupRequestOrderByWithRelationInput[];
    cursor?: Prisma.PickupRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PickupRequestScalarFieldEnum | Prisma.PickupRequestScalarFieldEnum[];
};
export type PickupRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    where?: Prisma.PickupRequestWhereInput;
    orderBy?: Prisma.PickupRequestOrderByWithRelationInput | Prisma.PickupRequestOrderByWithRelationInput[];
    cursor?: Prisma.PickupRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PickupRequestScalarFieldEnum | Prisma.PickupRequestScalarFieldEnum[];
};
export type PickupRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PickupRequestCreateInput, Prisma.PickupRequestUncheckedCreateInput>;
};
export type PickupRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PickupRequestCreateManyInput | Prisma.PickupRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PickupRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    data: Prisma.PickupRequestCreateManyInput | Prisma.PickupRequestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PickupRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PickupRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PickupRequestUpdateInput, Prisma.PickupRequestUncheckedUpdateInput>;
    where: Prisma.PickupRequestWhereUniqueInput;
};
export type PickupRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PickupRequestUpdateManyMutationInput, Prisma.PickupRequestUncheckedUpdateManyInput>;
    where?: Prisma.PickupRequestWhereInput;
    limit?: number;
};
export type PickupRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PickupRequestUpdateManyMutationInput, Prisma.PickupRequestUncheckedUpdateManyInput>;
    where?: Prisma.PickupRequestWhereInput;
    limit?: number;
    include?: Prisma.PickupRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PickupRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    where: Prisma.PickupRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.PickupRequestCreateInput, Prisma.PickupRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PickupRequestUpdateInput, Prisma.PickupRequestUncheckedUpdateInput>;
};
export type PickupRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    where: Prisma.PickupRequestWhereUniqueInput;
};
export type PickupRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PickupRequestWhereInput;
    limit?: number;
};
export type PickupRequest$partnerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    where?: Prisma.LogisticsPartnerWhereInput;
};
export type PickupRequest$receiptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptInclude<ExtArgs> | null;
    where?: Prisma.HubReceiptWhereInput;
    orderBy?: Prisma.HubReceiptOrderByWithRelationInput | Prisma.HubReceiptOrderByWithRelationInput[];
    cursor?: Prisma.HubReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HubReceiptScalarFieldEnum | Prisma.HubReceiptScalarFieldEnum[];
};
export type PickupRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
};
