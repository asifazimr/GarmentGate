import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DisputeModel = runtime.Types.Result.DefaultSelection<Prisma.$DisputePayload>;
export type AggregateDispute = {
    _count: DisputeCountAggregateOutputType | null;
    _avg: DisputeAvgAggregateOutputType | null;
    _sum: DisputeSumAggregateOutputType | null;
    _min: DisputeMinAggregateOutputType | null;
    _max: DisputeMaxAggregateOutputType | null;
};
export type DisputeAvgAggregateOutputType = {
    refundAmountMinor: number | null;
};
export type DisputeSumAggregateOutputType = {
    refundAmountMinor: bigint | null;
};
export type DisputeMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    openedById: string | null;
    assignedToId: string | null;
    reason: $Enums.DisputeReason | null;
    description: string | null;
    descriptionFiltered: string | null;
    status: $Enums.DisputeStatus | null;
    resolution: string | null;
    refundAmountMinor: bigint | null;
    resolvedAt: Date | null;
    resolvedById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DisputeMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    openedById: string | null;
    assignedToId: string | null;
    reason: $Enums.DisputeReason | null;
    description: string | null;
    descriptionFiltered: string | null;
    status: $Enums.DisputeStatus | null;
    resolution: string | null;
    refundAmountMinor: bigint | null;
    resolvedAt: Date | null;
    resolvedById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DisputeCountAggregateOutputType = {
    id: number;
    orderId: number;
    openedById: number;
    assignedToId: number;
    reason: number;
    description: number;
    descriptionFiltered: number;
    status: number;
    resolution: number;
    refundAmountMinor: number;
    resolvedAt: number;
    resolvedById: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DisputeAvgAggregateInputType = {
    refundAmountMinor?: true;
};
export type DisputeSumAggregateInputType = {
    refundAmountMinor?: true;
};
export type DisputeMinAggregateInputType = {
    id?: true;
    orderId?: true;
    openedById?: true;
    assignedToId?: true;
    reason?: true;
    description?: true;
    descriptionFiltered?: true;
    status?: true;
    resolution?: true;
    refundAmountMinor?: true;
    resolvedAt?: true;
    resolvedById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DisputeMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    openedById?: true;
    assignedToId?: true;
    reason?: true;
    description?: true;
    descriptionFiltered?: true;
    status?: true;
    resolution?: true;
    refundAmountMinor?: true;
    resolvedAt?: true;
    resolvedById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DisputeCountAggregateInputType = {
    id?: true;
    orderId?: true;
    openedById?: true;
    assignedToId?: true;
    reason?: true;
    description?: true;
    descriptionFiltered?: true;
    status?: true;
    resolution?: true;
    refundAmountMinor?: true;
    resolvedAt?: true;
    resolvedById?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DisputeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DisputeWhereInput;
    orderBy?: Prisma.DisputeOrderByWithRelationInput | Prisma.DisputeOrderByWithRelationInput[];
    cursor?: Prisma.DisputeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DisputeCountAggregateInputType;
    _avg?: DisputeAvgAggregateInputType;
    _sum?: DisputeSumAggregateInputType;
    _min?: DisputeMinAggregateInputType;
    _max?: DisputeMaxAggregateInputType;
};
export type GetDisputeAggregateType<T extends DisputeAggregateArgs> = {
    [P in keyof T & keyof AggregateDispute]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDispute[P]> : Prisma.GetScalarType<T[P], AggregateDispute[P]>;
};
export type DisputeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DisputeWhereInput;
    orderBy?: Prisma.DisputeOrderByWithAggregationInput | Prisma.DisputeOrderByWithAggregationInput[];
    by: Prisma.DisputeScalarFieldEnum[] | Prisma.DisputeScalarFieldEnum;
    having?: Prisma.DisputeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DisputeCountAggregateInputType | true;
    _avg?: DisputeAvgAggregateInputType;
    _sum?: DisputeSumAggregateInputType;
    _min?: DisputeMinAggregateInputType;
    _max?: DisputeMaxAggregateInputType;
};
export type DisputeGroupByOutputType = {
    id: string;
    orderId: string;
    openedById: string;
    assignedToId: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status: $Enums.DisputeStatus;
    resolution: string | null;
    refundAmountMinor: bigint | null;
    resolvedAt: Date | null;
    resolvedById: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: DisputeCountAggregateOutputType | null;
    _avg: DisputeAvgAggregateOutputType | null;
    _sum: DisputeSumAggregateOutputType | null;
    _min: DisputeMinAggregateOutputType | null;
    _max: DisputeMaxAggregateOutputType | null;
};
export type GetDisputeGroupByPayload<T extends DisputeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DisputeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DisputeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DisputeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DisputeGroupByOutputType[P]>;
}>>;
export type DisputeWhereInput = {
    AND?: Prisma.DisputeWhereInput | Prisma.DisputeWhereInput[];
    OR?: Prisma.DisputeWhereInput[];
    NOT?: Prisma.DisputeWhereInput | Prisma.DisputeWhereInput[];
    id?: Prisma.UuidFilter<"Dispute"> | string;
    orderId?: Prisma.UuidFilter<"Dispute"> | string;
    openedById?: Prisma.UuidFilter<"Dispute"> | string;
    assignedToId?: Prisma.UuidNullableFilter<"Dispute"> | string | null;
    reason?: Prisma.EnumDisputeReasonFilter<"Dispute"> | $Enums.DisputeReason;
    description?: Prisma.StringFilter<"Dispute"> | string;
    descriptionFiltered?: Prisma.StringFilter<"Dispute"> | string;
    status?: Prisma.EnumDisputeStatusFilter<"Dispute"> | $Enums.DisputeStatus;
    resolution?: Prisma.StringNullableFilter<"Dispute"> | string | null;
    refundAmountMinor?: Prisma.BigIntNullableFilter<"Dispute"> | bigint | number | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Dispute"> | Date | string | null;
    resolvedById?: Prisma.UuidNullableFilter<"Dispute"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Dispute"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Dispute"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    openedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    assignedTo?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    resolvedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    evidence?: Prisma.DisputeEvidenceListRelationFilter;
    threads?: Prisma.ConversationListRelationFilter;
    logisticsClaim?: Prisma.XOR<Prisma.LogisticsClaimNullableScalarRelationFilter, Prisma.LogisticsClaimWhereInput> | null;
};
export type DisputeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    openedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    descriptionFiltered?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolution?: Prisma.SortOrderInput | Prisma.SortOrder;
    refundAmountMinor?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
    openedBy?: Prisma.UserOrderByWithRelationInput;
    assignedTo?: Prisma.UserOrderByWithRelationInput;
    resolvedBy?: Prisma.UserOrderByWithRelationInput;
    evidence?: Prisma.DisputeEvidenceOrderByRelationAggregateInput;
    threads?: Prisma.ConversationOrderByRelationAggregateInput;
    logisticsClaim?: Prisma.LogisticsClaimOrderByWithRelationInput;
};
export type DisputeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DisputeWhereInput | Prisma.DisputeWhereInput[];
    OR?: Prisma.DisputeWhereInput[];
    NOT?: Prisma.DisputeWhereInput | Prisma.DisputeWhereInput[];
    orderId?: Prisma.UuidFilter<"Dispute"> | string;
    openedById?: Prisma.UuidFilter<"Dispute"> | string;
    assignedToId?: Prisma.UuidNullableFilter<"Dispute"> | string | null;
    reason?: Prisma.EnumDisputeReasonFilter<"Dispute"> | $Enums.DisputeReason;
    description?: Prisma.StringFilter<"Dispute"> | string;
    descriptionFiltered?: Prisma.StringFilter<"Dispute"> | string;
    status?: Prisma.EnumDisputeStatusFilter<"Dispute"> | $Enums.DisputeStatus;
    resolution?: Prisma.StringNullableFilter<"Dispute"> | string | null;
    refundAmountMinor?: Prisma.BigIntNullableFilter<"Dispute"> | bigint | number | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Dispute"> | Date | string | null;
    resolvedById?: Prisma.UuidNullableFilter<"Dispute"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Dispute"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Dispute"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    openedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    assignedTo?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    resolvedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    evidence?: Prisma.DisputeEvidenceListRelationFilter;
    threads?: Prisma.ConversationListRelationFilter;
    logisticsClaim?: Prisma.XOR<Prisma.LogisticsClaimNullableScalarRelationFilter, Prisma.LogisticsClaimWhereInput> | null;
}, "id">;
export type DisputeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    openedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    descriptionFiltered?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolution?: Prisma.SortOrderInput | Prisma.SortOrder;
    refundAmountMinor?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    resolvedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DisputeCountOrderByAggregateInput;
    _avg?: Prisma.DisputeAvgOrderByAggregateInput;
    _max?: Prisma.DisputeMaxOrderByAggregateInput;
    _min?: Prisma.DisputeMinOrderByAggregateInput;
    _sum?: Prisma.DisputeSumOrderByAggregateInput;
};
export type DisputeScalarWhereWithAggregatesInput = {
    AND?: Prisma.DisputeScalarWhereWithAggregatesInput | Prisma.DisputeScalarWhereWithAggregatesInput[];
    OR?: Prisma.DisputeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DisputeScalarWhereWithAggregatesInput | Prisma.DisputeScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Dispute"> | string;
    orderId?: Prisma.UuidWithAggregatesFilter<"Dispute"> | string;
    openedById?: Prisma.UuidWithAggregatesFilter<"Dispute"> | string;
    assignedToId?: Prisma.UuidNullableWithAggregatesFilter<"Dispute"> | string | null;
    reason?: Prisma.EnumDisputeReasonWithAggregatesFilter<"Dispute"> | $Enums.DisputeReason;
    description?: Prisma.StringWithAggregatesFilter<"Dispute"> | string;
    descriptionFiltered?: Prisma.StringWithAggregatesFilter<"Dispute"> | string;
    status?: Prisma.EnumDisputeStatusWithAggregatesFilter<"Dispute"> | $Enums.DisputeStatus;
    resolution?: Prisma.StringNullableWithAggregatesFilter<"Dispute"> | string | null;
    refundAmountMinor?: Prisma.BigIntNullableWithAggregatesFilter<"Dispute"> | bigint | number | null;
    resolvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Dispute"> | Date | string | null;
    resolvedById?: Prisma.UuidNullableWithAggregatesFilter<"Dispute"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Dispute"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Dispute"> | Date | string;
};
export type DisputeCreateInput = {
    id?: string;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutDisputesInput;
    openedBy: Prisma.UserCreateNestedOneWithoutDisputesOpenedInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutDisputesAssignedInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutDisputesResolvedInput;
    evidence?: Prisma.DisputeEvidenceCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimCreateNestedOneWithoutDisputeInput;
};
export type DisputeUncheckedCreateInput = {
    id?: string;
    orderId: string;
    openedById: string;
    assignedToId?: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    resolvedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationUncheckedCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedCreateNestedOneWithoutDisputeInput;
};
export type DisputeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutDisputesNestedInput;
    openedBy?: Prisma.UserUpdateOneRequiredWithoutDisputesOpenedNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutDisputesAssignedNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutDisputesResolvedNestedInput;
    evidence?: Prisma.DisputeEvidenceUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUpdateOneWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    openedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUncheckedUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedUpdateOneWithoutDisputeNestedInput;
};
export type DisputeCreateManyInput = {
    id?: string;
    orderId: string;
    openedById: string;
    assignedToId?: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    resolvedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DisputeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    openedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeListRelationFilter = {
    every?: Prisma.DisputeWhereInput;
    some?: Prisma.DisputeWhereInput;
    none?: Prisma.DisputeWhereInput;
};
export type DisputeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DisputeNullableScalarRelationFilter = {
    is?: Prisma.DisputeWhereInput | null;
    isNot?: Prisma.DisputeWhereInput | null;
};
export type DisputeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    openedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    descriptionFiltered?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolution?: Prisma.SortOrder;
    refundAmountMinor?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    resolvedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DisputeAvgOrderByAggregateInput = {
    refundAmountMinor?: Prisma.SortOrder;
};
export type DisputeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    openedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    descriptionFiltered?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolution?: Prisma.SortOrder;
    refundAmountMinor?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    resolvedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DisputeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    openedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    descriptionFiltered?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resolution?: Prisma.SortOrder;
    refundAmountMinor?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
    resolvedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DisputeSumOrderByAggregateInput = {
    refundAmountMinor?: Prisma.SortOrder;
};
export type DisputeScalarRelationFilter = {
    is?: Prisma.DisputeWhereInput;
    isNot?: Prisma.DisputeWhereInput;
};
export type DisputeCreateNestedManyWithoutOpenedByInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutOpenedByInput, Prisma.DisputeUncheckedCreateWithoutOpenedByInput> | Prisma.DisputeCreateWithoutOpenedByInput[] | Prisma.DisputeUncheckedCreateWithoutOpenedByInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutOpenedByInput | Prisma.DisputeCreateOrConnectWithoutOpenedByInput[];
    createMany?: Prisma.DisputeCreateManyOpenedByInputEnvelope;
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
};
export type DisputeCreateNestedManyWithoutResolvedByInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutResolvedByInput, Prisma.DisputeUncheckedCreateWithoutResolvedByInput> | Prisma.DisputeCreateWithoutResolvedByInput[] | Prisma.DisputeUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutResolvedByInput | Prisma.DisputeCreateOrConnectWithoutResolvedByInput[];
    createMany?: Prisma.DisputeCreateManyResolvedByInputEnvelope;
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
};
export type DisputeCreateNestedManyWithoutAssignedToInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutAssignedToInput, Prisma.DisputeUncheckedCreateWithoutAssignedToInput> | Prisma.DisputeCreateWithoutAssignedToInput[] | Prisma.DisputeUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutAssignedToInput | Prisma.DisputeCreateOrConnectWithoutAssignedToInput[];
    createMany?: Prisma.DisputeCreateManyAssignedToInputEnvelope;
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
};
export type DisputeUncheckedCreateNestedManyWithoutOpenedByInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutOpenedByInput, Prisma.DisputeUncheckedCreateWithoutOpenedByInput> | Prisma.DisputeCreateWithoutOpenedByInput[] | Prisma.DisputeUncheckedCreateWithoutOpenedByInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutOpenedByInput | Prisma.DisputeCreateOrConnectWithoutOpenedByInput[];
    createMany?: Prisma.DisputeCreateManyOpenedByInputEnvelope;
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
};
export type DisputeUncheckedCreateNestedManyWithoutResolvedByInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutResolvedByInput, Prisma.DisputeUncheckedCreateWithoutResolvedByInput> | Prisma.DisputeCreateWithoutResolvedByInput[] | Prisma.DisputeUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutResolvedByInput | Prisma.DisputeCreateOrConnectWithoutResolvedByInput[];
    createMany?: Prisma.DisputeCreateManyResolvedByInputEnvelope;
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
};
export type DisputeUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutAssignedToInput, Prisma.DisputeUncheckedCreateWithoutAssignedToInput> | Prisma.DisputeCreateWithoutAssignedToInput[] | Prisma.DisputeUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutAssignedToInput | Prisma.DisputeCreateOrConnectWithoutAssignedToInput[];
    createMany?: Prisma.DisputeCreateManyAssignedToInputEnvelope;
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
};
export type DisputeUpdateManyWithoutOpenedByNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutOpenedByInput, Prisma.DisputeUncheckedCreateWithoutOpenedByInput> | Prisma.DisputeCreateWithoutOpenedByInput[] | Prisma.DisputeUncheckedCreateWithoutOpenedByInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutOpenedByInput | Prisma.DisputeCreateOrConnectWithoutOpenedByInput[];
    upsert?: Prisma.DisputeUpsertWithWhereUniqueWithoutOpenedByInput | Prisma.DisputeUpsertWithWhereUniqueWithoutOpenedByInput[];
    createMany?: Prisma.DisputeCreateManyOpenedByInputEnvelope;
    set?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    disconnect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    delete?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    update?: Prisma.DisputeUpdateWithWhereUniqueWithoutOpenedByInput | Prisma.DisputeUpdateWithWhereUniqueWithoutOpenedByInput[];
    updateMany?: Prisma.DisputeUpdateManyWithWhereWithoutOpenedByInput | Prisma.DisputeUpdateManyWithWhereWithoutOpenedByInput[];
    deleteMany?: Prisma.DisputeScalarWhereInput | Prisma.DisputeScalarWhereInput[];
};
export type DisputeUpdateManyWithoutResolvedByNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutResolvedByInput, Prisma.DisputeUncheckedCreateWithoutResolvedByInput> | Prisma.DisputeCreateWithoutResolvedByInput[] | Prisma.DisputeUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutResolvedByInput | Prisma.DisputeCreateOrConnectWithoutResolvedByInput[];
    upsert?: Prisma.DisputeUpsertWithWhereUniqueWithoutResolvedByInput | Prisma.DisputeUpsertWithWhereUniqueWithoutResolvedByInput[];
    createMany?: Prisma.DisputeCreateManyResolvedByInputEnvelope;
    set?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    disconnect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    delete?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    update?: Prisma.DisputeUpdateWithWhereUniqueWithoutResolvedByInput | Prisma.DisputeUpdateWithWhereUniqueWithoutResolvedByInput[];
    updateMany?: Prisma.DisputeUpdateManyWithWhereWithoutResolvedByInput | Prisma.DisputeUpdateManyWithWhereWithoutResolvedByInput[];
    deleteMany?: Prisma.DisputeScalarWhereInput | Prisma.DisputeScalarWhereInput[];
};
export type DisputeUpdateManyWithoutAssignedToNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutAssignedToInput, Prisma.DisputeUncheckedCreateWithoutAssignedToInput> | Prisma.DisputeCreateWithoutAssignedToInput[] | Prisma.DisputeUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutAssignedToInput | Prisma.DisputeCreateOrConnectWithoutAssignedToInput[];
    upsert?: Prisma.DisputeUpsertWithWhereUniqueWithoutAssignedToInput | Prisma.DisputeUpsertWithWhereUniqueWithoutAssignedToInput[];
    createMany?: Prisma.DisputeCreateManyAssignedToInputEnvelope;
    set?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    disconnect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    delete?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    update?: Prisma.DisputeUpdateWithWhereUniqueWithoutAssignedToInput | Prisma.DisputeUpdateWithWhereUniqueWithoutAssignedToInput[];
    updateMany?: Prisma.DisputeUpdateManyWithWhereWithoutAssignedToInput | Prisma.DisputeUpdateManyWithWhereWithoutAssignedToInput[];
    deleteMany?: Prisma.DisputeScalarWhereInput | Prisma.DisputeScalarWhereInput[];
};
export type DisputeUncheckedUpdateManyWithoutOpenedByNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutOpenedByInput, Prisma.DisputeUncheckedCreateWithoutOpenedByInput> | Prisma.DisputeCreateWithoutOpenedByInput[] | Prisma.DisputeUncheckedCreateWithoutOpenedByInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutOpenedByInput | Prisma.DisputeCreateOrConnectWithoutOpenedByInput[];
    upsert?: Prisma.DisputeUpsertWithWhereUniqueWithoutOpenedByInput | Prisma.DisputeUpsertWithWhereUniqueWithoutOpenedByInput[];
    createMany?: Prisma.DisputeCreateManyOpenedByInputEnvelope;
    set?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    disconnect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    delete?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    update?: Prisma.DisputeUpdateWithWhereUniqueWithoutOpenedByInput | Prisma.DisputeUpdateWithWhereUniqueWithoutOpenedByInput[];
    updateMany?: Prisma.DisputeUpdateManyWithWhereWithoutOpenedByInput | Prisma.DisputeUpdateManyWithWhereWithoutOpenedByInput[];
    deleteMany?: Prisma.DisputeScalarWhereInput | Prisma.DisputeScalarWhereInput[];
};
export type DisputeUncheckedUpdateManyWithoutResolvedByNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutResolvedByInput, Prisma.DisputeUncheckedCreateWithoutResolvedByInput> | Prisma.DisputeCreateWithoutResolvedByInput[] | Prisma.DisputeUncheckedCreateWithoutResolvedByInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutResolvedByInput | Prisma.DisputeCreateOrConnectWithoutResolvedByInput[];
    upsert?: Prisma.DisputeUpsertWithWhereUniqueWithoutResolvedByInput | Prisma.DisputeUpsertWithWhereUniqueWithoutResolvedByInput[];
    createMany?: Prisma.DisputeCreateManyResolvedByInputEnvelope;
    set?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    disconnect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    delete?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    update?: Prisma.DisputeUpdateWithWhereUniqueWithoutResolvedByInput | Prisma.DisputeUpdateWithWhereUniqueWithoutResolvedByInput[];
    updateMany?: Prisma.DisputeUpdateManyWithWhereWithoutResolvedByInput | Prisma.DisputeUpdateManyWithWhereWithoutResolvedByInput[];
    deleteMany?: Prisma.DisputeScalarWhereInput | Prisma.DisputeScalarWhereInput[];
};
export type DisputeUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutAssignedToInput, Prisma.DisputeUncheckedCreateWithoutAssignedToInput> | Prisma.DisputeCreateWithoutAssignedToInput[] | Prisma.DisputeUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutAssignedToInput | Prisma.DisputeCreateOrConnectWithoutAssignedToInput[];
    upsert?: Prisma.DisputeUpsertWithWhereUniqueWithoutAssignedToInput | Prisma.DisputeUpsertWithWhereUniqueWithoutAssignedToInput[];
    createMany?: Prisma.DisputeCreateManyAssignedToInputEnvelope;
    set?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    disconnect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    delete?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    update?: Prisma.DisputeUpdateWithWhereUniqueWithoutAssignedToInput | Prisma.DisputeUpdateWithWhereUniqueWithoutAssignedToInput[];
    updateMany?: Prisma.DisputeUpdateManyWithWhereWithoutAssignedToInput | Prisma.DisputeUpdateManyWithWhereWithoutAssignedToInput[];
    deleteMany?: Prisma.DisputeScalarWhereInput | Prisma.DisputeScalarWhereInput[];
};
export type DisputeCreateNestedOneWithoutThreadsInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutThreadsInput, Prisma.DisputeUncheckedCreateWithoutThreadsInput>;
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutThreadsInput;
    connect?: Prisma.DisputeWhereUniqueInput;
};
export type DisputeUpdateOneWithoutThreadsNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutThreadsInput, Prisma.DisputeUncheckedCreateWithoutThreadsInput>;
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutThreadsInput;
    upsert?: Prisma.DisputeUpsertWithoutThreadsInput;
    disconnect?: Prisma.DisputeWhereInput | boolean;
    delete?: Prisma.DisputeWhereInput | boolean;
    connect?: Prisma.DisputeWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DisputeUpdateToOneWithWhereWithoutThreadsInput, Prisma.DisputeUpdateWithoutThreadsInput>, Prisma.DisputeUncheckedUpdateWithoutThreadsInput>;
};
export type DisputeCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutOrderInput, Prisma.DisputeUncheckedCreateWithoutOrderInput> | Prisma.DisputeCreateWithoutOrderInput[] | Prisma.DisputeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutOrderInput | Prisma.DisputeCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.DisputeCreateManyOrderInputEnvelope;
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
};
export type DisputeUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutOrderInput, Prisma.DisputeUncheckedCreateWithoutOrderInput> | Prisma.DisputeCreateWithoutOrderInput[] | Prisma.DisputeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutOrderInput | Prisma.DisputeCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.DisputeCreateManyOrderInputEnvelope;
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
};
export type DisputeUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutOrderInput, Prisma.DisputeUncheckedCreateWithoutOrderInput> | Prisma.DisputeCreateWithoutOrderInput[] | Prisma.DisputeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutOrderInput | Prisma.DisputeCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.DisputeUpsertWithWhereUniqueWithoutOrderInput | Prisma.DisputeUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.DisputeCreateManyOrderInputEnvelope;
    set?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    disconnect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    delete?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    update?: Prisma.DisputeUpdateWithWhereUniqueWithoutOrderInput | Prisma.DisputeUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.DisputeUpdateManyWithWhereWithoutOrderInput | Prisma.DisputeUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.DisputeScalarWhereInput | Prisma.DisputeScalarWhereInput[];
};
export type DisputeUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutOrderInput, Prisma.DisputeUncheckedCreateWithoutOrderInput> | Prisma.DisputeCreateWithoutOrderInput[] | Prisma.DisputeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutOrderInput | Prisma.DisputeCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.DisputeUpsertWithWhereUniqueWithoutOrderInput | Prisma.DisputeUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.DisputeCreateManyOrderInputEnvelope;
    set?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    disconnect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    delete?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    connect?: Prisma.DisputeWhereUniqueInput | Prisma.DisputeWhereUniqueInput[];
    update?: Prisma.DisputeUpdateWithWhereUniqueWithoutOrderInput | Prisma.DisputeUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.DisputeUpdateManyWithWhereWithoutOrderInput | Prisma.DisputeUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.DisputeScalarWhereInput | Prisma.DisputeScalarWhereInput[];
};
export type EnumDisputeReasonFieldUpdateOperationsInput = {
    set?: $Enums.DisputeReason;
};
export type EnumDisputeStatusFieldUpdateOperationsInput = {
    set?: $Enums.DisputeStatus;
};
export type DisputeCreateNestedOneWithoutEvidenceInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutEvidenceInput, Prisma.DisputeUncheckedCreateWithoutEvidenceInput>;
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutEvidenceInput;
    connect?: Prisma.DisputeWhereUniqueInput;
};
export type DisputeUpdateOneRequiredWithoutEvidenceNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutEvidenceInput, Prisma.DisputeUncheckedCreateWithoutEvidenceInput>;
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutEvidenceInput;
    upsert?: Prisma.DisputeUpsertWithoutEvidenceInput;
    connect?: Prisma.DisputeWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DisputeUpdateToOneWithWhereWithoutEvidenceInput, Prisma.DisputeUpdateWithoutEvidenceInput>, Prisma.DisputeUncheckedUpdateWithoutEvidenceInput>;
};
export type DisputeCreateNestedOneWithoutLogisticsClaimInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutLogisticsClaimInput, Prisma.DisputeUncheckedCreateWithoutLogisticsClaimInput>;
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutLogisticsClaimInput;
    connect?: Prisma.DisputeWhereUniqueInput;
};
export type DisputeUpdateOneWithoutLogisticsClaimNestedInput = {
    create?: Prisma.XOR<Prisma.DisputeCreateWithoutLogisticsClaimInput, Prisma.DisputeUncheckedCreateWithoutLogisticsClaimInput>;
    connectOrCreate?: Prisma.DisputeCreateOrConnectWithoutLogisticsClaimInput;
    upsert?: Prisma.DisputeUpsertWithoutLogisticsClaimInput;
    disconnect?: Prisma.DisputeWhereInput | boolean;
    delete?: Prisma.DisputeWhereInput | boolean;
    connect?: Prisma.DisputeWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DisputeUpdateToOneWithWhereWithoutLogisticsClaimInput, Prisma.DisputeUpdateWithoutLogisticsClaimInput>, Prisma.DisputeUncheckedUpdateWithoutLogisticsClaimInput>;
};
export type DisputeCreateWithoutOpenedByInput = {
    id?: string;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutDisputesInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutDisputesAssignedInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutDisputesResolvedInput;
    evidence?: Prisma.DisputeEvidenceCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimCreateNestedOneWithoutDisputeInput;
};
export type DisputeUncheckedCreateWithoutOpenedByInput = {
    id?: string;
    orderId: string;
    assignedToId?: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    resolvedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationUncheckedCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedCreateNestedOneWithoutDisputeInput;
};
export type DisputeCreateOrConnectWithoutOpenedByInput = {
    where: Prisma.DisputeWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutOpenedByInput, Prisma.DisputeUncheckedCreateWithoutOpenedByInput>;
};
export type DisputeCreateManyOpenedByInputEnvelope = {
    data: Prisma.DisputeCreateManyOpenedByInput | Prisma.DisputeCreateManyOpenedByInput[];
    skipDuplicates?: boolean;
};
export type DisputeCreateWithoutResolvedByInput = {
    id?: string;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutDisputesInput;
    openedBy: Prisma.UserCreateNestedOneWithoutDisputesOpenedInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutDisputesAssignedInput;
    evidence?: Prisma.DisputeEvidenceCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimCreateNestedOneWithoutDisputeInput;
};
export type DisputeUncheckedCreateWithoutResolvedByInput = {
    id?: string;
    orderId: string;
    openedById: string;
    assignedToId?: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationUncheckedCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedCreateNestedOneWithoutDisputeInput;
};
export type DisputeCreateOrConnectWithoutResolvedByInput = {
    where: Prisma.DisputeWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutResolvedByInput, Prisma.DisputeUncheckedCreateWithoutResolvedByInput>;
};
export type DisputeCreateManyResolvedByInputEnvelope = {
    data: Prisma.DisputeCreateManyResolvedByInput | Prisma.DisputeCreateManyResolvedByInput[];
    skipDuplicates?: boolean;
};
export type DisputeCreateWithoutAssignedToInput = {
    id?: string;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutDisputesInput;
    openedBy: Prisma.UserCreateNestedOneWithoutDisputesOpenedInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutDisputesResolvedInput;
    evidence?: Prisma.DisputeEvidenceCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimCreateNestedOneWithoutDisputeInput;
};
export type DisputeUncheckedCreateWithoutAssignedToInput = {
    id?: string;
    orderId: string;
    openedById: string;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    resolvedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationUncheckedCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedCreateNestedOneWithoutDisputeInput;
};
export type DisputeCreateOrConnectWithoutAssignedToInput = {
    where: Prisma.DisputeWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutAssignedToInput, Prisma.DisputeUncheckedCreateWithoutAssignedToInput>;
};
export type DisputeCreateManyAssignedToInputEnvelope = {
    data: Prisma.DisputeCreateManyAssignedToInput | Prisma.DisputeCreateManyAssignedToInput[];
    skipDuplicates?: boolean;
};
export type DisputeUpsertWithWhereUniqueWithoutOpenedByInput = {
    where: Prisma.DisputeWhereUniqueInput;
    update: Prisma.XOR<Prisma.DisputeUpdateWithoutOpenedByInput, Prisma.DisputeUncheckedUpdateWithoutOpenedByInput>;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutOpenedByInput, Prisma.DisputeUncheckedCreateWithoutOpenedByInput>;
};
export type DisputeUpdateWithWhereUniqueWithoutOpenedByInput = {
    where: Prisma.DisputeWhereUniqueInput;
    data: Prisma.XOR<Prisma.DisputeUpdateWithoutOpenedByInput, Prisma.DisputeUncheckedUpdateWithoutOpenedByInput>;
};
export type DisputeUpdateManyWithWhereWithoutOpenedByInput = {
    where: Prisma.DisputeScalarWhereInput;
    data: Prisma.XOR<Prisma.DisputeUpdateManyMutationInput, Prisma.DisputeUncheckedUpdateManyWithoutOpenedByInput>;
};
export type DisputeScalarWhereInput = {
    AND?: Prisma.DisputeScalarWhereInput | Prisma.DisputeScalarWhereInput[];
    OR?: Prisma.DisputeScalarWhereInput[];
    NOT?: Prisma.DisputeScalarWhereInput | Prisma.DisputeScalarWhereInput[];
    id?: Prisma.UuidFilter<"Dispute"> | string;
    orderId?: Prisma.UuidFilter<"Dispute"> | string;
    openedById?: Prisma.UuidFilter<"Dispute"> | string;
    assignedToId?: Prisma.UuidNullableFilter<"Dispute"> | string | null;
    reason?: Prisma.EnumDisputeReasonFilter<"Dispute"> | $Enums.DisputeReason;
    description?: Prisma.StringFilter<"Dispute"> | string;
    descriptionFiltered?: Prisma.StringFilter<"Dispute"> | string;
    status?: Prisma.EnumDisputeStatusFilter<"Dispute"> | $Enums.DisputeStatus;
    resolution?: Prisma.StringNullableFilter<"Dispute"> | string | null;
    refundAmountMinor?: Prisma.BigIntNullableFilter<"Dispute"> | bigint | number | null;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Dispute"> | Date | string | null;
    resolvedById?: Prisma.UuidNullableFilter<"Dispute"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Dispute"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Dispute"> | Date | string;
};
export type DisputeUpsertWithWhereUniqueWithoutResolvedByInput = {
    where: Prisma.DisputeWhereUniqueInput;
    update: Prisma.XOR<Prisma.DisputeUpdateWithoutResolvedByInput, Prisma.DisputeUncheckedUpdateWithoutResolvedByInput>;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutResolvedByInput, Prisma.DisputeUncheckedCreateWithoutResolvedByInput>;
};
export type DisputeUpdateWithWhereUniqueWithoutResolvedByInput = {
    where: Prisma.DisputeWhereUniqueInput;
    data: Prisma.XOR<Prisma.DisputeUpdateWithoutResolvedByInput, Prisma.DisputeUncheckedUpdateWithoutResolvedByInput>;
};
export type DisputeUpdateManyWithWhereWithoutResolvedByInput = {
    where: Prisma.DisputeScalarWhereInput;
    data: Prisma.XOR<Prisma.DisputeUpdateManyMutationInput, Prisma.DisputeUncheckedUpdateManyWithoutResolvedByInput>;
};
export type DisputeUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: Prisma.DisputeWhereUniqueInput;
    update: Prisma.XOR<Prisma.DisputeUpdateWithoutAssignedToInput, Prisma.DisputeUncheckedUpdateWithoutAssignedToInput>;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutAssignedToInput, Prisma.DisputeUncheckedCreateWithoutAssignedToInput>;
};
export type DisputeUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: Prisma.DisputeWhereUniqueInput;
    data: Prisma.XOR<Prisma.DisputeUpdateWithoutAssignedToInput, Prisma.DisputeUncheckedUpdateWithoutAssignedToInput>;
};
export type DisputeUpdateManyWithWhereWithoutAssignedToInput = {
    where: Prisma.DisputeScalarWhereInput;
    data: Prisma.XOR<Prisma.DisputeUpdateManyMutationInput, Prisma.DisputeUncheckedUpdateManyWithoutAssignedToInput>;
};
export type DisputeCreateWithoutThreadsInput = {
    id?: string;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutDisputesInput;
    openedBy: Prisma.UserCreateNestedOneWithoutDisputesOpenedInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutDisputesAssignedInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutDisputesResolvedInput;
    evidence?: Prisma.DisputeEvidenceCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimCreateNestedOneWithoutDisputeInput;
};
export type DisputeUncheckedCreateWithoutThreadsInput = {
    id?: string;
    orderId: string;
    openedById: string;
    assignedToId?: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    resolvedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedCreateNestedOneWithoutDisputeInput;
};
export type DisputeCreateOrConnectWithoutThreadsInput = {
    where: Prisma.DisputeWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutThreadsInput, Prisma.DisputeUncheckedCreateWithoutThreadsInput>;
};
export type DisputeUpsertWithoutThreadsInput = {
    update: Prisma.XOR<Prisma.DisputeUpdateWithoutThreadsInput, Prisma.DisputeUncheckedUpdateWithoutThreadsInput>;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutThreadsInput, Prisma.DisputeUncheckedCreateWithoutThreadsInput>;
    where?: Prisma.DisputeWhereInput;
};
export type DisputeUpdateToOneWithWhereWithoutThreadsInput = {
    where?: Prisma.DisputeWhereInput;
    data: Prisma.XOR<Prisma.DisputeUpdateWithoutThreadsInput, Prisma.DisputeUncheckedUpdateWithoutThreadsInput>;
};
export type DisputeUpdateWithoutThreadsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutDisputesNestedInput;
    openedBy?: Prisma.UserUpdateOneRequiredWithoutDisputesOpenedNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutDisputesAssignedNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutDisputesResolvedNestedInput;
    evidence?: Prisma.DisputeEvidenceUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUpdateOneWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateWithoutThreadsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    openedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedUpdateOneWithoutDisputeNestedInput;
};
export type DisputeCreateWithoutOrderInput = {
    id?: string;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    openedBy: Prisma.UserCreateNestedOneWithoutDisputesOpenedInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutDisputesAssignedInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutDisputesResolvedInput;
    evidence?: Prisma.DisputeEvidenceCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimCreateNestedOneWithoutDisputeInput;
};
export type DisputeUncheckedCreateWithoutOrderInput = {
    id?: string;
    openedById: string;
    assignedToId?: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    resolvedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationUncheckedCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedCreateNestedOneWithoutDisputeInput;
};
export type DisputeCreateOrConnectWithoutOrderInput = {
    where: Prisma.DisputeWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutOrderInput, Prisma.DisputeUncheckedCreateWithoutOrderInput>;
};
export type DisputeCreateManyOrderInputEnvelope = {
    data: Prisma.DisputeCreateManyOrderInput | Prisma.DisputeCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type DisputeUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.DisputeWhereUniqueInput;
    update: Prisma.XOR<Prisma.DisputeUpdateWithoutOrderInput, Prisma.DisputeUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutOrderInput, Prisma.DisputeUncheckedCreateWithoutOrderInput>;
};
export type DisputeUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.DisputeWhereUniqueInput;
    data: Prisma.XOR<Prisma.DisputeUpdateWithoutOrderInput, Prisma.DisputeUncheckedUpdateWithoutOrderInput>;
};
export type DisputeUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.DisputeScalarWhereInput;
    data: Prisma.XOR<Prisma.DisputeUpdateManyMutationInput, Prisma.DisputeUncheckedUpdateManyWithoutOrderInput>;
};
export type DisputeCreateWithoutEvidenceInput = {
    id?: string;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutDisputesInput;
    openedBy: Prisma.UserCreateNestedOneWithoutDisputesOpenedInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutDisputesAssignedInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutDisputesResolvedInput;
    threads?: Prisma.ConversationCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimCreateNestedOneWithoutDisputeInput;
};
export type DisputeUncheckedCreateWithoutEvidenceInput = {
    id?: string;
    orderId: string;
    openedById: string;
    assignedToId?: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    resolvedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    threads?: Prisma.ConversationUncheckedCreateNestedManyWithoutDisputeInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedCreateNestedOneWithoutDisputeInput;
};
export type DisputeCreateOrConnectWithoutEvidenceInput = {
    where: Prisma.DisputeWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutEvidenceInput, Prisma.DisputeUncheckedCreateWithoutEvidenceInput>;
};
export type DisputeUpsertWithoutEvidenceInput = {
    update: Prisma.XOR<Prisma.DisputeUpdateWithoutEvidenceInput, Prisma.DisputeUncheckedUpdateWithoutEvidenceInput>;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutEvidenceInput, Prisma.DisputeUncheckedCreateWithoutEvidenceInput>;
    where?: Prisma.DisputeWhereInput;
};
export type DisputeUpdateToOneWithWhereWithoutEvidenceInput = {
    where?: Prisma.DisputeWhereInput;
    data: Prisma.XOR<Prisma.DisputeUpdateWithoutEvidenceInput, Prisma.DisputeUncheckedUpdateWithoutEvidenceInput>;
};
export type DisputeUpdateWithoutEvidenceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutDisputesNestedInput;
    openedBy?: Prisma.UserUpdateOneRequiredWithoutDisputesOpenedNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutDisputesAssignedNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutDisputesResolvedNestedInput;
    threads?: Prisma.ConversationUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUpdateOneWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateWithoutEvidenceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    openedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    threads?: Prisma.ConversationUncheckedUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedUpdateOneWithoutDisputeNestedInput;
};
export type DisputeCreateWithoutLogisticsClaimInput = {
    id?: string;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutDisputesInput;
    openedBy: Prisma.UserCreateNestedOneWithoutDisputesOpenedInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutDisputesAssignedInput;
    resolvedBy?: Prisma.UserCreateNestedOneWithoutDisputesResolvedInput;
    evidence?: Prisma.DisputeEvidenceCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationCreateNestedManyWithoutDisputeInput;
};
export type DisputeUncheckedCreateWithoutLogisticsClaimInput = {
    id?: string;
    orderId: string;
    openedById: string;
    assignedToId?: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    resolvedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedCreateNestedManyWithoutDisputeInput;
    threads?: Prisma.ConversationUncheckedCreateNestedManyWithoutDisputeInput;
};
export type DisputeCreateOrConnectWithoutLogisticsClaimInput = {
    where: Prisma.DisputeWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutLogisticsClaimInput, Prisma.DisputeUncheckedCreateWithoutLogisticsClaimInput>;
};
export type DisputeUpsertWithoutLogisticsClaimInput = {
    update: Prisma.XOR<Prisma.DisputeUpdateWithoutLogisticsClaimInput, Prisma.DisputeUncheckedUpdateWithoutLogisticsClaimInput>;
    create: Prisma.XOR<Prisma.DisputeCreateWithoutLogisticsClaimInput, Prisma.DisputeUncheckedCreateWithoutLogisticsClaimInput>;
    where?: Prisma.DisputeWhereInput;
};
export type DisputeUpdateToOneWithWhereWithoutLogisticsClaimInput = {
    where?: Prisma.DisputeWhereInput;
    data: Prisma.XOR<Prisma.DisputeUpdateWithoutLogisticsClaimInput, Prisma.DisputeUncheckedUpdateWithoutLogisticsClaimInput>;
};
export type DisputeUpdateWithoutLogisticsClaimInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutDisputesNestedInput;
    openedBy?: Prisma.UserUpdateOneRequiredWithoutDisputesOpenedNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutDisputesAssignedNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutDisputesResolvedNestedInput;
    evidence?: Prisma.DisputeEvidenceUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUpdateManyWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateWithoutLogisticsClaimInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    openedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUncheckedUpdateManyWithoutDisputeNestedInput;
};
export type DisputeCreateManyOpenedByInput = {
    id?: string;
    orderId: string;
    assignedToId?: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    resolvedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DisputeCreateManyResolvedByInput = {
    id?: string;
    orderId: string;
    openedById: string;
    assignedToId?: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DisputeCreateManyAssignedToInput = {
    id?: string;
    orderId: string;
    openedById: string;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    resolvedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DisputeUpdateWithoutOpenedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutDisputesNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutDisputesAssignedNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutDisputesResolvedNestedInput;
    evidence?: Prisma.DisputeEvidenceUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUpdateOneWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateWithoutOpenedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUncheckedUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedUpdateOneWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateManyWithoutOpenedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeUpdateWithoutResolvedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutDisputesNestedInput;
    openedBy?: Prisma.UserUpdateOneRequiredWithoutDisputesOpenedNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutDisputesAssignedNestedInput;
    evidence?: Prisma.DisputeEvidenceUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUpdateOneWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateWithoutResolvedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    openedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUncheckedUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedUpdateOneWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateManyWithoutResolvedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    openedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeUpdateWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutDisputesNestedInput;
    openedBy?: Prisma.UserUpdateOneRequiredWithoutDisputesOpenedNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutDisputesResolvedNestedInput;
    evidence?: Prisma.DisputeEvidenceUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUpdateOneWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    openedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUncheckedUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedUpdateOneWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateManyWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    openedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeCreateManyOrderInput = {
    id?: string;
    openedById: string;
    assignedToId?: string | null;
    reason: $Enums.DisputeReason;
    description: string;
    descriptionFiltered: string;
    status?: $Enums.DisputeStatus;
    resolution?: string | null;
    refundAmountMinor?: bigint | number | null;
    resolvedAt?: Date | string | null;
    resolvedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DisputeUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    openedBy?: Prisma.UserUpdateOneRequiredWithoutDisputesOpenedNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutDisputesAssignedNestedInput;
    resolvedBy?: Prisma.UserUpdateOneWithoutDisputesResolvedNestedInput;
    evidence?: Prisma.DisputeEvidenceUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUpdateOneWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    openedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    evidence?: Prisma.DisputeEvidenceUncheckedUpdateManyWithoutDisputeNestedInput;
    threads?: Prisma.ConversationUncheckedUpdateManyWithoutDisputeNestedInput;
    logisticsClaim?: Prisma.LogisticsClaimUncheckedUpdateOneWithoutDisputeNestedInput;
};
export type DisputeUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    openedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumDisputeReasonFieldUpdateOperationsInput | $Enums.DisputeReason;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionFiltered?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus;
    resolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    refundAmountMinor?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    resolvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DisputeCountOutputType = {
    evidence: number;
    threads: number;
};
export type DisputeCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    evidence?: boolean | DisputeCountOutputTypeCountEvidenceArgs;
    threads?: boolean | DisputeCountOutputTypeCountThreadsArgs;
};
export type DisputeCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeCountOutputTypeSelect<ExtArgs> | null;
};
export type DisputeCountOutputTypeCountEvidenceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DisputeEvidenceWhereInput;
};
export type DisputeCountOutputTypeCountThreadsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
};
export type DisputeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    openedById?: boolean;
    assignedToId?: boolean;
    reason?: boolean;
    description?: boolean;
    descriptionFiltered?: boolean;
    status?: boolean;
    resolution?: boolean;
    refundAmountMinor?: boolean;
    resolvedAt?: boolean;
    resolvedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    openedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.Dispute$assignedToArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.Dispute$resolvedByArgs<ExtArgs>;
    evidence?: boolean | Prisma.Dispute$evidenceArgs<ExtArgs>;
    threads?: boolean | Prisma.Dispute$threadsArgs<ExtArgs>;
    logisticsClaim?: boolean | Prisma.Dispute$logisticsClaimArgs<ExtArgs>;
    _count?: boolean | Prisma.DisputeCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["dispute"]>;
export type DisputeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    openedById?: boolean;
    assignedToId?: boolean;
    reason?: boolean;
    description?: boolean;
    descriptionFiltered?: boolean;
    status?: boolean;
    resolution?: boolean;
    refundAmountMinor?: boolean;
    resolvedAt?: boolean;
    resolvedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    openedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.Dispute$assignedToArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.Dispute$resolvedByArgs<ExtArgs>;
}, ExtArgs["result"]["dispute"]>;
export type DisputeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    openedById?: boolean;
    assignedToId?: boolean;
    reason?: boolean;
    description?: boolean;
    descriptionFiltered?: boolean;
    status?: boolean;
    resolution?: boolean;
    refundAmountMinor?: boolean;
    resolvedAt?: boolean;
    resolvedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    openedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.Dispute$assignedToArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.Dispute$resolvedByArgs<ExtArgs>;
}, ExtArgs["result"]["dispute"]>;
export type DisputeSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    openedById?: boolean;
    assignedToId?: boolean;
    reason?: boolean;
    description?: boolean;
    descriptionFiltered?: boolean;
    status?: boolean;
    resolution?: boolean;
    refundAmountMinor?: boolean;
    resolvedAt?: boolean;
    resolvedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DisputeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "openedById" | "assignedToId" | "reason" | "description" | "descriptionFiltered" | "status" | "resolution" | "refundAmountMinor" | "resolvedAt" | "resolvedById" | "createdAt" | "updatedAt", ExtArgs["result"]["dispute"]>;
export type DisputeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    openedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.Dispute$assignedToArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.Dispute$resolvedByArgs<ExtArgs>;
    evidence?: boolean | Prisma.Dispute$evidenceArgs<ExtArgs>;
    threads?: boolean | Prisma.Dispute$threadsArgs<ExtArgs>;
    logisticsClaim?: boolean | Prisma.Dispute$logisticsClaimArgs<ExtArgs>;
    _count?: boolean | Prisma.DisputeCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DisputeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    openedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.Dispute$assignedToArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.Dispute$resolvedByArgs<ExtArgs>;
};
export type DisputeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    openedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.Dispute$assignedToArgs<ExtArgs>;
    resolvedBy?: boolean | Prisma.Dispute$resolvedByArgs<ExtArgs>;
};
export type $DisputePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Dispute";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
        openedBy: Prisma.$UserPayload<ExtArgs>;
        assignedTo: Prisma.$UserPayload<ExtArgs> | null;
        resolvedBy: Prisma.$UserPayload<ExtArgs> | null;
        evidence: Prisma.$DisputeEvidencePayload<ExtArgs>[];
        threads: Prisma.$ConversationPayload<ExtArgs>[];
        logisticsClaim: Prisma.$LogisticsClaimPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        openedById: string;
        assignedToId: string | null;
        reason: $Enums.DisputeReason;
        description: string;
        descriptionFiltered: string;
        status: $Enums.DisputeStatus;
        resolution: string | null;
        refundAmountMinor: bigint | null;
        resolvedAt: Date | null;
        resolvedById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["dispute"]>;
    composites: {};
};
export type DisputeGetPayload<S extends boolean | null | undefined | DisputeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DisputePayload, S>;
export type DisputeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DisputeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DisputeCountAggregateInputType | true;
};
export interface DisputeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Dispute'];
        meta: {
            name: 'Dispute';
        };
    };
    findUnique<T extends DisputeFindUniqueArgs>(args: Prisma.SelectSubset<T, DisputeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DisputeClient<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DisputeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DisputeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DisputeClient<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DisputeFindFirstArgs>(args?: Prisma.SelectSubset<T, DisputeFindFirstArgs<ExtArgs>>): Prisma.Prisma__DisputeClient<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DisputeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DisputeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DisputeClient<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DisputeFindManyArgs>(args?: Prisma.SelectSubset<T, DisputeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DisputeCreateArgs>(args: Prisma.SelectSubset<T, DisputeCreateArgs<ExtArgs>>): Prisma.Prisma__DisputeClient<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DisputeCreateManyArgs>(args?: Prisma.SelectSubset<T, DisputeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DisputeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DisputeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DisputeDeleteArgs>(args: Prisma.SelectSubset<T, DisputeDeleteArgs<ExtArgs>>): Prisma.Prisma__DisputeClient<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DisputeUpdateArgs>(args: Prisma.SelectSubset<T, DisputeUpdateArgs<ExtArgs>>): Prisma.Prisma__DisputeClient<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DisputeDeleteManyArgs>(args?: Prisma.SelectSubset<T, DisputeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DisputeUpdateManyArgs>(args: Prisma.SelectSubset<T, DisputeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DisputeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DisputeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DisputeUpsertArgs>(args: Prisma.SelectSubset<T, DisputeUpsertArgs<ExtArgs>>): Prisma.Prisma__DisputeClient<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DisputeCountArgs>(args?: Prisma.Subset<T, DisputeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DisputeCountAggregateOutputType> : number>;
    aggregate<T extends DisputeAggregateArgs>(args: Prisma.Subset<T, DisputeAggregateArgs>): Prisma.PrismaPromise<GetDisputeAggregateType<T>>;
    groupBy<T extends DisputeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DisputeGroupByArgs['orderBy'];
    } : {
        orderBy?: DisputeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DisputeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisputeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DisputeFieldRefs;
}
export interface Prisma__DisputeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    openedBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assignedTo<T extends Prisma.Dispute$assignedToArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Dispute$assignedToArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    resolvedBy<T extends Prisma.Dispute$resolvedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Dispute$resolvedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    evidence<T extends Prisma.Dispute$evidenceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Dispute$evidenceArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DisputeEvidencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    threads<T extends Prisma.Dispute$threadsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Dispute$threadsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    logisticsClaim<T extends Prisma.Dispute$logisticsClaimArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Dispute$logisticsClaimArgs<ExtArgs>>): Prisma.Prisma__LogisticsClaimClient<runtime.Types.Result.GetResult<Prisma.$LogisticsClaimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DisputeFieldRefs {
    readonly id: Prisma.FieldRef<"Dispute", 'String'>;
    readonly orderId: Prisma.FieldRef<"Dispute", 'String'>;
    readonly openedById: Prisma.FieldRef<"Dispute", 'String'>;
    readonly assignedToId: Prisma.FieldRef<"Dispute", 'String'>;
    readonly reason: Prisma.FieldRef<"Dispute", 'DisputeReason'>;
    readonly description: Prisma.FieldRef<"Dispute", 'String'>;
    readonly descriptionFiltered: Prisma.FieldRef<"Dispute", 'String'>;
    readonly status: Prisma.FieldRef<"Dispute", 'DisputeStatus'>;
    readonly resolution: Prisma.FieldRef<"Dispute", 'String'>;
    readonly refundAmountMinor: Prisma.FieldRef<"Dispute", 'BigInt'>;
    readonly resolvedAt: Prisma.FieldRef<"Dispute", 'DateTime'>;
    readonly resolvedById: Prisma.FieldRef<"Dispute", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Dispute", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Dispute", 'DateTime'>;
}
export type DisputeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelect<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    include?: Prisma.DisputeInclude<ExtArgs> | null;
    where: Prisma.DisputeWhereUniqueInput;
};
export type DisputeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelect<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    include?: Prisma.DisputeInclude<ExtArgs> | null;
    where: Prisma.DisputeWhereUniqueInput;
};
export type DisputeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelect<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    include?: Prisma.DisputeInclude<ExtArgs> | null;
    where?: Prisma.DisputeWhereInput;
    orderBy?: Prisma.DisputeOrderByWithRelationInput | Prisma.DisputeOrderByWithRelationInput[];
    cursor?: Prisma.DisputeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DisputeScalarFieldEnum | Prisma.DisputeScalarFieldEnum[];
};
export type DisputeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelect<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    include?: Prisma.DisputeInclude<ExtArgs> | null;
    where?: Prisma.DisputeWhereInput;
    orderBy?: Prisma.DisputeOrderByWithRelationInput | Prisma.DisputeOrderByWithRelationInput[];
    cursor?: Prisma.DisputeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DisputeScalarFieldEnum | Prisma.DisputeScalarFieldEnum[];
};
export type DisputeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelect<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    include?: Prisma.DisputeInclude<ExtArgs> | null;
    where?: Prisma.DisputeWhereInput;
    orderBy?: Prisma.DisputeOrderByWithRelationInput | Prisma.DisputeOrderByWithRelationInput[];
    cursor?: Prisma.DisputeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DisputeScalarFieldEnum | Prisma.DisputeScalarFieldEnum[];
};
export type DisputeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelect<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    include?: Prisma.DisputeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DisputeCreateInput, Prisma.DisputeUncheckedCreateInput>;
};
export type DisputeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DisputeCreateManyInput | Prisma.DisputeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DisputeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    data: Prisma.DisputeCreateManyInput | Prisma.DisputeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DisputeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DisputeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelect<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    include?: Prisma.DisputeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DisputeUpdateInput, Prisma.DisputeUncheckedUpdateInput>;
    where: Prisma.DisputeWhereUniqueInput;
};
export type DisputeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DisputeUpdateManyMutationInput, Prisma.DisputeUncheckedUpdateManyInput>;
    where?: Prisma.DisputeWhereInput;
    limit?: number;
};
export type DisputeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DisputeUpdateManyMutationInput, Prisma.DisputeUncheckedUpdateManyInput>;
    where?: Prisma.DisputeWhereInput;
    limit?: number;
    include?: Prisma.DisputeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DisputeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelect<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    include?: Prisma.DisputeInclude<ExtArgs> | null;
    where: Prisma.DisputeWhereUniqueInput;
    create: Prisma.XOR<Prisma.DisputeCreateInput, Prisma.DisputeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DisputeUpdateInput, Prisma.DisputeUncheckedUpdateInput>;
};
export type DisputeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelect<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    include?: Prisma.DisputeInclude<ExtArgs> | null;
    where: Prisma.DisputeWhereUniqueInput;
};
export type DisputeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DisputeWhereInput;
    limit?: number;
};
export type Dispute$assignedToArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type Dispute$resolvedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type Dispute$evidenceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeEvidenceSelect<ExtArgs> | null;
    omit?: Prisma.DisputeEvidenceOmit<ExtArgs> | null;
    include?: Prisma.DisputeEvidenceInclude<ExtArgs> | null;
    where?: Prisma.DisputeEvidenceWhereInput;
    orderBy?: Prisma.DisputeEvidenceOrderByWithRelationInput | Prisma.DisputeEvidenceOrderByWithRelationInput[];
    cursor?: Prisma.DisputeEvidenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DisputeEvidenceScalarFieldEnum | Prisma.DisputeEvidenceScalarFieldEnum[];
};
export type Dispute$threadsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
export type Dispute$logisticsClaimArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsClaimSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsClaimOmit<ExtArgs> | null;
    include?: Prisma.LogisticsClaimInclude<ExtArgs> | null;
    where?: Prisma.LogisticsClaimWhereInput;
};
export type DisputeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelect<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    include?: Prisma.DisputeInclude<ExtArgs> | null;
};
