import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OrderMilestoneModel = runtime.Types.Result.DefaultSelection<Prisma.$OrderMilestonePayload>;
export type AggregateOrderMilestone = {
    _count: OrderMilestoneCountAggregateOutputType | null;
    _min: OrderMilestoneMinAggregateOutputType | null;
    _max: OrderMilestoneMaxAggregateOutputType | null;
};
export type OrderMilestoneMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    stage: $Enums.MilestoneStage | null;
    status: $Enums.MilestoneStatus | null;
    plannedAt: Date | null;
    completedAt: Date | null;
    note: string | null;
    noteFiltered: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OrderMilestoneMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    stage: $Enums.MilestoneStage | null;
    status: $Enums.MilestoneStatus | null;
    plannedAt: Date | null;
    completedAt: Date | null;
    note: string | null;
    noteFiltered: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OrderMilestoneCountAggregateOutputType = {
    id: number;
    orderId: number;
    stage: number;
    status: number;
    plannedAt: number;
    completedAt: number;
    note: number;
    noteFiltered: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OrderMilestoneMinAggregateInputType = {
    id?: true;
    orderId?: true;
    stage?: true;
    status?: true;
    plannedAt?: true;
    completedAt?: true;
    note?: true;
    noteFiltered?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OrderMilestoneMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    stage?: true;
    status?: true;
    plannedAt?: true;
    completedAt?: true;
    note?: true;
    noteFiltered?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OrderMilestoneCountAggregateInputType = {
    id?: true;
    orderId?: true;
    stage?: true;
    status?: true;
    plannedAt?: true;
    completedAt?: true;
    note?: true;
    noteFiltered?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OrderMilestoneAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderMilestoneWhereInput;
    orderBy?: Prisma.OrderMilestoneOrderByWithRelationInput | Prisma.OrderMilestoneOrderByWithRelationInput[];
    cursor?: Prisma.OrderMilestoneWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OrderMilestoneCountAggregateInputType;
    _min?: OrderMilestoneMinAggregateInputType;
    _max?: OrderMilestoneMaxAggregateInputType;
};
export type GetOrderMilestoneAggregateType<T extends OrderMilestoneAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderMilestone]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrderMilestone[P]> : Prisma.GetScalarType<T[P], AggregateOrderMilestone[P]>;
};
export type OrderMilestoneGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderMilestoneWhereInput;
    orderBy?: Prisma.OrderMilestoneOrderByWithAggregationInput | Prisma.OrderMilestoneOrderByWithAggregationInput[];
    by: Prisma.OrderMilestoneScalarFieldEnum[] | Prisma.OrderMilestoneScalarFieldEnum;
    having?: Prisma.OrderMilestoneScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderMilestoneCountAggregateInputType | true;
    _min?: OrderMilestoneMinAggregateInputType;
    _max?: OrderMilestoneMaxAggregateInputType;
};
export type OrderMilestoneGroupByOutputType = {
    id: string;
    orderId: string;
    stage: $Enums.MilestoneStage;
    status: $Enums.MilestoneStatus;
    plannedAt: Date | null;
    completedAt: Date | null;
    note: string | null;
    noteFiltered: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OrderMilestoneCountAggregateOutputType | null;
    _min: OrderMilestoneMinAggregateOutputType | null;
    _max: OrderMilestoneMaxAggregateOutputType | null;
};
export type GetOrderMilestoneGroupByPayload<T extends OrderMilestoneGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrderMilestoneGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrderMilestoneGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrderMilestoneGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrderMilestoneGroupByOutputType[P]>;
}>>;
export type OrderMilestoneWhereInput = {
    AND?: Prisma.OrderMilestoneWhereInput | Prisma.OrderMilestoneWhereInput[];
    OR?: Prisma.OrderMilestoneWhereInput[];
    NOT?: Prisma.OrderMilestoneWhereInput | Prisma.OrderMilestoneWhereInput[];
    id?: Prisma.UuidFilter<"OrderMilestone"> | string;
    orderId?: Prisma.UuidFilter<"OrderMilestone"> | string;
    stage?: Prisma.EnumMilestoneStageFilter<"OrderMilestone"> | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFilter<"OrderMilestone"> | $Enums.MilestoneStatus;
    plannedAt?: Prisma.DateTimeNullableFilter<"OrderMilestone"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"OrderMilestone"> | Date | string | null;
    note?: Prisma.StringNullableFilter<"OrderMilestone"> | string | null;
    noteFiltered?: Prisma.StringNullableFilter<"OrderMilestone"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderMilestone"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OrderMilestone"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    photos?: Prisma.MilestonePhotoListRelationFilter;
};
export type OrderMilestoneOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    stage?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    plannedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    noteFiltered?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
    photos?: Prisma.MilestonePhotoOrderByRelationAggregateInput;
};
export type OrderMilestoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    orderId_stage?: Prisma.OrderMilestoneOrderIdStageCompoundUniqueInput;
    AND?: Prisma.OrderMilestoneWhereInput | Prisma.OrderMilestoneWhereInput[];
    OR?: Prisma.OrderMilestoneWhereInput[];
    NOT?: Prisma.OrderMilestoneWhereInput | Prisma.OrderMilestoneWhereInput[];
    orderId?: Prisma.UuidFilter<"OrderMilestone"> | string;
    stage?: Prisma.EnumMilestoneStageFilter<"OrderMilestone"> | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFilter<"OrderMilestone"> | $Enums.MilestoneStatus;
    plannedAt?: Prisma.DateTimeNullableFilter<"OrderMilestone"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"OrderMilestone"> | Date | string | null;
    note?: Prisma.StringNullableFilter<"OrderMilestone"> | string | null;
    noteFiltered?: Prisma.StringNullableFilter<"OrderMilestone"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderMilestone"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OrderMilestone"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    photos?: Prisma.MilestonePhotoListRelationFilter;
}, "id" | "orderId_stage">;
export type OrderMilestoneOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    stage?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    plannedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    noteFiltered?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OrderMilestoneCountOrderByAggregateInput;
    _max?: Prisma.OrderMilestoneMaxOrderByAggregateInput;
    _min?: Prisma.OrderMilestoneMinOrderByAggregateInput;
};
export type OrderMilestoneScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrderMilestoneScalarWhereWithAggregatesInput | Prisma.OrderMilestoneScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrderMilestoneScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrderMilestoneScalarWhereWithAggregatesInput | Prisma.OrderMilestoneScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"OrderMilestone"> | string;
    orderId?: Prisma.UuidWithAggregatesFilter<"OrderMilestone"> | string;
    stage?: Prisma.EnumMilestoneStageWithAggregatesFilter<"OrderMilestone"> | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusWithAggregatesFilter<"OrderMilestone"> | $Enums.MilestoneStatus;
    plannedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"OrderMilestone"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"OrderMilestone"> | Date | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"OrderMilestone"> | string | null;
    noteFiltered?: Prisma.StringNullableWithAggregatesFilter<"OrderMilestone"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OrderMilestone"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OrderMilestone"> | Date | string;
};
export type OrderMilestoneCreateInput = {
    id?: string;
    stage: $Enums.MilestoneStage;
    status?: $Enums.MilestoneStatus;
    plannedAt?: Date | string | null;
    completedAt?: Date | string | null;
    note?: string | null;
    noteFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutMilestonesInput;
    photos?: Prisma.MilestonePhotoCreateNestedManyWithoutMilestoneInput;
};
export type OrderMilestoneUncheckedCreateInput = {
    id?: string;
    orderId: string;
    stage: $Enums.MilestoneStage;
    status?: $Enums.MilestoneStatus;
    plannedAt?: Date | string | null;
    completedAt?: Date | string | null;
    note?: string | null;
    noteFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    photos?: Prisma.MilestonePhotoUncheckedCreateNestedManyWithoutMilestoneInput;
};
export type OrderMilestoneUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stage?: Prisma.EnumMilestoneStageFieldUpdateOperationsInput | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    plannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutMilestonesNestedInput;
    photos?: Prisma.MilestonePhotoUpdateManyWithoutMilestoneNestedInput;
};
export type OrderMilestoneUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    stage?: Prisma.EnumMilestoneStageFieldUpdateOperationsInput | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    plannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    photos?: Prisma.MilestonePhotoUncheckedUpdateManyWithoutMilestoneNestedInput;
};
export type OrderMilestoneCreateManyInput = {
    id?: string;
    orderId: string;
    stage: $Enums.MilestoneStage;
    status?: $Enums.MilestoneStatus;
    plannedAt?: Date | string | null;
    completedAt?: Date | string | null;
    note?: string | null;
    noteFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderMilestoneUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stage?: Prisma.EnumMilestoneStageFieldUpdateOperationsInput | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    plannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderMilestoneUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    stage?: Prisma.EnumMilestoneStageFieldUpdateOperationsInput | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    plannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderMilestoneListRelationFilter = {
    every?: Prisma.OrderMilestoneWhereInput;
    some?: Prisma.OrderMilestoneWhereInput;
    none?: Prisma.OrderMilestoneWhereInput;
};
export type OrderMilestoneOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrderMilestoneOrderIdStageCompoundUniqueInput = {
    orderId: string;
    stage: $Enums.MilestoneStage;
};
export type OrderMilestoneCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    stage?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    plannedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    noteFiltered?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderMilestoneMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    stage?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    plannedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    noteFiltered?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderMilestoneMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    stage?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    plannedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    noteFiltered?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderMilestoneScalarRelationFilter = {
    is?: Prisma.OrderMilestoneWhereInput;
    isNot?: Prisma.OrderMilestoneWhereInput;
};
export type OrderMilestoneCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderMilestoneCreateWithoutOrderInput, Prisma.OrderMilestoneUncheckedCreateWithoutOrderInput> | Prisma.OrderMilestoneCreateWithoutOrderInput[] | Prisma.OrderMilestoneUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderMilestoneCreateOrConnectWithoutOrderInput | Prisma.OrderMilestoneCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderMilestoneCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderMilestoneWhereUniqueInput | Prisma.OrderMilestoneWhereUniqueInput[];
};
export type OrderMilestoneUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderMilestoneCreateWithoutOrderInput, Prisma.OrderMilestoneUncheckedCreateWithoutOrderInput> | Prisma.OrderMilestoneCreateWithoutOrderInput[] | Prisma.OrderMilestoneUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderMilestoneCreateOrConnectWithoutOrderInput | Prisma.OrderMilestoneCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderMilestoneCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderMilestoneWhereUniqueInput | Prisma.OrderMilestoneWhereUniqueInput[];
};
export type OrderMilestoneUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderMilestoneCreateWithoutOrderInput, Prisma.OrderMilestoneUncheckedCreateWithoutOrderInput> | Prisma.OrderMilestoneCreateWithoutOrderInput[] | Prisma.OrderMilestoneUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderMilestoneCreateOrConnectWithoutOrderInput | Prisma.OrderMilestoneCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderMilestoneUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderMilestoneUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderMilestoneCreateManyOrderInputEnvelope;
    set?: Prisma.OrderMilestoneWhereUniqueInput | Prisma.OrderMilestoneWhereUniqueInput[];
    disconnect?: Prisma.OrderMilestoneWhereUniqueInput | Prisma.OrderMilestoneWhereUniqueInput[];
    delete?: Prisma.OrderMilestoneWhereUniqueInput | Prisma.OrderMilestoneWhereUniqueInput[];
    connect?: Prisma.OrderMilestoneWhereUniqueInput | Prisma.OrderMilestoneWhereUniqueInput[];
    update?: Prisma.OrderMilestoneUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderMilestoneUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderMilestoneUpdateManyWithWhereWithoutOrderInput | Prisma.OrderMilestoneUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderMilestoneScalarWhereInput | Prisma.OrderMilestoneScalarWhereInput[];
};
export type OrderMilestoneUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderMilestoneCreateWithoutOrderInput, Prisma.OrderMilestoneUncheckedCreateWithoutOrderInput> | Prisma.OrderMilestoneCreateWithoutOrderInput[] | Prisma.OrderMilestoneUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderMilestoneCreateOrConnectWithoutOrderInput | Prisma.OrderMilestoneCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderMilestoneUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderMilestoneUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderMilestoneCreateManyOrderInputEnvelope;
    set?: Prisma.OrderMilestoneWhereUniqueInput | Prisma.OrderMilestoneWhereUniqueInput[];
    disconnect?: Prisma.OrderMilestoneWhereUniqueInput | Prisma.OrderMilestoneWhereUniqueInput[];
    delete?: Prisma.OrderMilestoneWhereUniqueInput | Prisma.OrderMilestoneWhereUniqueInput[];
    connect?: Prisma.OrderMilestoneWhereUniqueInput | Prisma.OrderMilestoneWhereUniqueInput[];
    update?: Prisma.OrderMilestoneUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderMilestoneUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderMilestoneUpdateManyWithWhereWithoutOrderInput | Prisma.OrderMilestoneUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderMilestoneScalarWhereInput | Prisma.OrderMilestoneScalarWhereInput[];
};
export type EnumMilestoneStageFieldUpdateOperationsInput = {
    set?: $Enums.MilestoneStage;
};
export type EnumMilestoneStatusFieldUpdateOperationsInput = {
    set?: $Enums.MilestoneStatus;
};
export type OrderMilestoneCreateNestedOneWithoutPhotosInput = {
    create?: Prisma.XOR<Prisma.OrderMilestoneCreateWithoutPhotosInput, Prisma.OrderMilestoneUncheckedCreateWithoutPhotosInput>;
    connectOrCreate?: Prisma.OrderMilestoneCreateOrConnectWithoutPhotosInput;
    connect?: Prisma.OrderMilestoneWhereUniqueInput;
};
export type OrderMilestoneUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: Prisma.XOR<Prisma.OrderMilestoneCreateWithoutPhotosInput, Prisma.OrderMilestoneUncheckedCreateWithoutPhotosInput>;
    connectOrCreate?: Prisma.OrderMilestoneCreateOrConnectWithoutPhotosInput;
    upsert?: Prisma.OrderMilestoneUpsertWithoutPhotosInput;
    connect?: Prisma.OrderMilestoneWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrderMilestoneUpdateToOneWithWhereWithoutPhotosInput, Prisma.OrderMilestoneUpdateWithoutPhotosInput>, Prisma.OrderMilestoneUncheckedUpdateWithoutPhotosInput>;
};
export type OrderMilestoneCreateWithoutOrderInput = {
    id?: string;
    stage: $Enums.MilestoneStage;
    status?: $Enums.MilestoneStatus;
    plannedAt?: Date | string | null;
    completedAt?: Date | string | null;
    note?: string | null;
    noteFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    photos?: Prisma.MilestonePhotoCreateNestedManyWithoutMilestoneInput;
};
export type OrderMilestoneUncheckedCreateWithoutOrderInput = {
    id?: string;
    stage: $Enums.MilestoneStage;
    status?: $Enums.MilestoneStatus;
    plannedAt?: Date | string | null;
    completedAt?: Date | string | null;
    note?: string | null;
    noteFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    photos?: Prisma.MilestonePhotoUncheckedCreateNestedManyWithoutMilestoneInput;
};
export type OrderMilestoneCreateOrConnectWithoutOrderInput = {
    where: Prisma.OrderMilestoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderMilestoneCreateWithoutOrderInput, Prisma.OrderMilestoneUncheckedCreateWithoutOrderInput>;
};
export type OrderMilestoneCreateManyOrderInputEnvelope = {
    data: Prisma.OrderMilestoneCreateManyOrderInput | Prisma.OrderMilestoneCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type OrderMilestoneUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderMilestoneWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderMilestoneUpdateWithoutOrderInput, Prisma.OrderMilestoneUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.OrderMilestoneCreateWithoutOrderInput, Prisma.OrderMilestoneUncheckedCreateWithoutOrderInput>;
};
export type OrderMilestoneUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderMilestoneWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderMilestoneUpdateWithoutOrderInput, Prisma.OrderMilestoneUncheckedUpdateWithoutOrderInput>;
};
export type OrderMilestoneUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.OrderMilestoneScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderMilestoneUpdateManyMutationInput, Prisma.OrderMilestoneUncheckedUpdateManyWithoutOrderInput>;
};
export type OrderMilestoneScalarWhereInput = {
    AND?: Prisma.OrderMilestoneScalarWhereInput | Prisma.OrderMilestoneScalarWhereInput[];
    OR?: Prisma.OrderMilestoneScalarWhereInput[];
    NOT?: Prisma.OrderMilestoneScalarWhereInput | Prisma.OrderMilestoneScalarWhereInput[];
    id?: Prisma.UuidFilter<"OrderMilestone"> | string;
    orderId?: Prisma.UuidFilter<"OrderMilestone"> | string;
    stage?: Prisma.EnumMilestoneStageFilter<"OrderMilestone"> | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFilter<"OrderMilestone"> | $Enums.MilestoneStatus;
    plannedAt?: Prisma.DateTimeNullableFilter<"OrderMilestone"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"OrderMilestone"> | Date | string | null;
    note?: Prisma.StringNullableFilter<"OrderMilestone"> | string | null;
    noteFiltered?: Prisma.StringNullableFilter<"OrderMilestone"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderMilestone"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OrderMilestone"> | Date | string;
};
export type OrderMilestoneCreateWithoutPhotosInput = {
    id?: string;
    stage: $Enums.MilestoneStage;
    status?: $Enums.MilestoneStatus;
    plannedAt?: Date | string | null;
    completedAt?: Date | string | null;
    note?: string | null;
    noteFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutMilestonesInput;
};
export type OrderMilestoneUncheckedCreateWithoutPhotosInput = {
    id?: string;
    orderId: string;
    stage: $Enums.MilestoneStage;
    status?: $Enums.MilestoneStatus;
    plannedAt?: Date | string | null;
    completedAt?: Date | string | null;
    note?: string | null;
    noteFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderMilestoneCreateOrConnectWithoutPhotosInput = {
    where: Prisma.OrderMilestoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderMilestoneCreateWithoutPhotosInput, Prisma.OrderMilestoneUncheckedCreateWithoutPhotosInput>;
};
export type OrderMilestoneUpsertWithoutPhotosInput = {
    update: Prisma.XOR<Prisma.OrderMilestoneUpdateWithoutPhotosInput, Prisma.OrderMilestoneUncheckedUpdateWithoutPhotosInput>;
    create: Prisma.XOR<Prisma.OrderMilestoneCreateWithoutPhotosInput, Prisma.OrderMilestoneUncheckedCreateWithoutPhotosInput>;
    where?: Prisma.OrderMilestoneWhereInput;
};
export type OrderMilestoneUpdateToOneWithWhereWithoutPhotosInput = {
    where?: Prisma.OrderMilestoneWhereInput;
    data: Prisma.XOR<Prisma.OrderMilestoneUpdateWithoutPhotosInput, Prisma.OrderMilestoneUncheckedUpdateWithoutPhotosInput>;
};
export type OrderMilestoneUpdateWithoutPhotosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stage?: Prisma.EnumMilestoneStageFieldUpdateOperationsInput | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    plannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutMilestonesNestedInput;
};
export type OrderMilestoneUncheckedUpdateWithoutPhotosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    stage?: Prisma.EnumMilestoneStageFieldUpdateOperationsInput | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    plannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderMilestoneCreateManyOrderInput = {
    id?: string;
    stage: $Enums.MilestoneStage;
    status?: $Enums.MilestoneStatus;
    plannedAt?: Date | string | null;
    completedAt?: Date | string | null;
    note?: string | null;
    noteFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderMilestoneUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stage?: Prisma.EnumMilestoneStageFieldUpdateOperationsInput | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    plannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    photos?: Prisma.MilestonePhotoUpdateManyWithoutMilestoneNestedInput;
};
export type OrderMilestoneUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stage?: Prisma.EnumMilestoneStageFieldUpdateOperationsInput | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    plannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    photos?: Prisma.MilestonePhotoUncheckedUpdateManyWithoutMilestoneNestedInput;
};
export type OrderMilestoneUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stage?: Prisma.EnumMilestoneStageFieldUpdateOperationsInput | $Enums.MilestoneStage;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    plannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noteFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderMilestoneCountOutputType = {
    photos: number;
};
export type OrderMilestoneCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    photos?: boolean | OrderMilestoneCountOutputTypeCountPhotosArgs;
};
export type OrderMilestoneCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneCountOutputTypeSelect<ExtArgs> | null;
};
export type OrderMilestoneCountOutputTypeCountPhotosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MilestonePhotoWhereInput;
};
export type OrderMilestoneSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    stage?: boolean;
    status?: boolean;
    plannedAt?: boolean;
    completedAt?: boolean;
    note?: boolean;
    noteFiltered?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    photos?: boolean | Prisma.OrderMilestone$photosArgs<ExtArgs>;
    _count?: boolean | Prisma.OrderMilestoneCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderMilestone"]>;
export type OrderMilestoneSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    stage?: boolean;
    status?: boolean;
    plannedAt?: boolean;
    completedAt?: boolean;
    note?: boolean;
    noteFiltered?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderMilestone"]>;
export type OrderMilestoneSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    stage?: boolean;
    status?: boolean;
    plannedAt?: boolean;
    completedAt?: boolean;
    note?: boolean;
    noteFiltered?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderMilestone"]>;
export type OrderMilestoneSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    stage?: boolean;
    status?: boolean;
    plannedAt?: boolean;
    completedAt?: boolean;
    note?: boolean;
    noteFiltered?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OrderMilestoneOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "stage" | "status" | "plannedAt" | "completedAt" | "note" | "noteFiltered" | "createdAt" | "updatedAt", ExtArgs["result"]["orderMilestone"]>;
export type OrderMilestoneInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    photos?: boolean | Prisma.OrderMilestone$photosArgs<ExtArgs>;
    _count?: boolean | Prisma.OrderMilestoneCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OrderMilestoneIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type OrderMilestoneIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $OrderMilestonePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OrderMilestone";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
        photos: Prisma.$MilestonePhotoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        stage: $Enums.MilestoneStage;
        status: $Enums.MilestoneStatus;
        plannedAt: Date | null;
        completedAt: Date | null;
        note: string | null;
        noteFiltered: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["orderMilestone"]>;
    composites: {};
};
export type OrderMilestoneGetPayload<S extends boolean | null | undefined | OrderMilestoneDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload, S>;
export type OrderMilestoneCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrderMilestoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderMilestoneCountAggregateInputType | true;
};
export interface OrderMilestoneDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OrderMilestone'];
        meta: {
            name: 'OrderMilestone';
        };
    };
    findUnique<T extends OrderMilestoneFindUniqueArgs>(args: Prisma.SelectSubset<T, OrderMilestoneFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrderMilestoneClient<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OrderMilestoneFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrderMilestoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderMilestoneClient<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OrderMilestoneFindFirstArgs>(args?: Prisma.SelectSubset<T, OrderMilestoneFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrderMilestoneClient<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OrderMilestoneFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrderMilestoneFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderMilestoneClient<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OrderMilestoneFindManyArgs>(args?: Prisma.SelectSubset<T, OrderMilestoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OrderMilestoneCreateArgs>(args: Prisma.SelectSubset<T, OrderMilestoneCreateArgs<ExtArgs>>): Prisma.Prisma__OrderMilestoneClient<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OrderMilestoneCreateManyArgs>(args?: Prisma.SelectSubset<T, OrderMilestoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OrderMilestoneCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrderMilestoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OrderMilestoneDeleteArgs>(args: Prisma.SelectSubset<T, OrderMilestoneDeleteArgs<ExtArgs>>): Prisma.Prisma__OrderMilestoneClient<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OrderMilestoneUpdateArgs>(args: Prisma.SelectSubset<T, OrderMilestoneUpdateArgs<ExtArgs>>): Prisma.Prisma__OrderMilestoneClient<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OrderMilestoneDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrderMilestoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OrderMilestoneUpdateManyArgs>(args: Prisma.SelectSubset<T, OrderMilestoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OrderMilestoneUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrderMilestoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OrderMilestoneUpsertArgs>(args: Prisma.SelectSubset<T, OrderMilestoneUpsertArgs<ExtArgs>>): Prisma.Prisma__OrderMilestoneClient<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OrderMilestoneCountArgs>(args?: Prisma.Subset<T, OrderMilestoneCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrderMilestoneCountAggregateOutputType> : number>;
    aggregate<T extends OrderMilestoneAggregateArgs>(args: Prisma.Subset<T, OrderMilestoneAggregateArgs>): Prisma.PrismaPromise<GetOrderMilestoneAggregateType<T>>;
    groupBy<T extends OrderMilestoneGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrderMilestoneGroupByArgs['orderBy'];
    } : {
        orderBy?: OrderMilestoneGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrderMilestoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderMilestoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OrderMilestoneFieldRefs;
}
export interface Prisma__OrderMilestoneClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    photos<T extends Prisma.OrderMilestone$photosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderMilestone$photosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OrderMilestoneFieldRefs {
    readonly id: Prisma.FieldRef<"OrderMilestone", 'String'>;
    readonly orderId: Prisma.FieldRef<"OrderMilestone", 'String'>;
    readonly stage: Prisma.FieldRef<"OrderMilestone", 'MilestoneStage'>;
    readonly status: Prisma.FieldRef<"OrderMilestone", 'MilestoneStatus'>;
    readonly plannedAt: Prisma.FieldRef<"OrderMilestone", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"OrderMilestone", 'DateTime'>;
    readonly note: Prisma.FieldRef<"OrderMilestone", 'String'>;
    readonly noteFiltered: Prisma.FieldRef<"OrderMilestone", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OrderMilestone", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OrderMilestone", 'DateTime'>;
}
export type OrderMilestoneFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelect<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    include?: Prisma.OrderMilestoneInclude<ExtArgs> | null;
    where: Prisma.OrderMilestoneWhereUniqueInput;
};
export type OrderMilestoneFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelect<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    include?: Prisma.OrderMilestoneInclude<ExtArgs> | null;
    where: Prisma.OrderMilestoneWhereUniqueInput;
};
export type OrderMilestoneFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelect<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    include?: Prisma.OrderMilestoneInclude<ExtArgs> | null;
    where?: Prisma.OrderMilestoneWhereInput;
    orderBy?: Prisma.OrderMilestoneOrderByWithRelationInput | Prisma.OrderMilestoneOrderByWithRelationInput[];
    cursor?: Prisma.OrderMilestoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderMilestoneScalarFieldEnum | Prisma.OrderMilestoneScalarFieldEnum[];
};
export type OrderMilestoneFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelect<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    include?: Prisma.OrderMilestoneInclude<ExtArgs> | null;
    where?: Prisma.OrderMilestoneWhereInput;
    orderBy?: Prisma.OrderMilestoneOrderByWithRelationInput | Prisma.OrderMilestoneOrderByWithRelationInput[];
    cursor?: Prisma.OrderMilestoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderMilestoneScalarFieldEnum | Prisma.OrderMilestoneScalarFieldEnum[];
};
export type OrderMilestoneFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelect<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    include?: Prisma.OrderMilestoneInclude<ExtArgs> | null;
    where?: Prisma.OrderMilestoneWhereInput;
    orderBy?: Prisma.OrderMilestoneOrderByWithRelationInput | Prisma.OrderMilestoneOrderByWithRelationInput[];
    cursor?: Prisma.OrderMilestoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderMilestoneScalarFieldEnum | Prisma.OrderMilestoneScalarFieldEnum[];
};
export type OrderMilestoneCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelect<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    include?: Prisma.OrderMilestoneInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderMilestoneCreateInput, Prisma.OrderMilestoneUncheckedCreateInput>;
};
export type OrderMilestoneCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OrderMilestoneCreateManyInput | Prisma.OrderMilestoneCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OrderMilestoneCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    data: Prisma.OrderMilestoneCreateManyInput | Prisma.OrderMilestoneCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OrderMilestoneIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OrderMilestoneUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelect<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    include?: Prisma.OrderMilestoneInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderMilestoneUpdateInput, Prisma.OrderMilestoneUncheckedUpdateInput>;
    where: Prisma.OrderMilestoneWhereUniqueInput;
};
export type OrderMilestoneUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OrderMilestoneUpdateManyMutationInput, Prisma.OrderMilestoneUncheckedUpdateManyInput>;
    where?: Prisma.OrderMilestoneWhereInput;
    limit?: number;
};
export type OrderMilestoneUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderMilestoneUpdateManyMutationInput, Prisma.OrderMilestoneUncheckedUpdateManyInput>;
    where?: Prisma.OrderMilestoneWhereInput;
    limit?: number;
    include?: Prisma.OrderMilestoneIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OrderMilestoneUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelect<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    include?: Prisma.OrderMilestoneInclude<ExtArgs> | null;
    where: Prisma.OrderMilestoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderMilestoneCreateInput, Prisma.OrderMilestoneUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OrderMilestoneUpdateInput, Prisma.OrderMilestoneUncheckedUpdateInput>;
};
export type OrderMilestoneDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelect<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    include?: Prisma.OrderMilestoneInclude<ExtArgs> | null;
    where: Prisma.OrderMilestoneWhereUniqueInput;
};
export type OrderMilestoneDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderMilestoneWhereInput;
    limit?: number;
};
export type OrderMilestone$photosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelect<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    include?: Prisma.MilestonePhotoInclude<ExtArgs> | null;
    where?: Prisma.MilestonePhotoWhereInput;
    orderBy?: Prisma.MilestonePhotoOrderByWithRelationInput | Prisma.MilestonePhotoOrderByWithRelationInput[];
    cursor?: Prisma.MilestonePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MilestonePhotoScalarFieldEnum | Prisma.MilestonePhotoScalarFieldEnum[];
};
export type OrderMilestoneDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderMilestoneSelect<ExtArgs> | null;
    omit?: Prisma.OrderMilestoneOmit<ExtArgs> | null;
    include?: Prisma.OrderMilestoneInclude<ExtArgs> | null;
};
