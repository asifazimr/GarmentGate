import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OrderEventModel = runtime.Types.Result.DefaultSelection<Prisma.$OrderEventPayload>;
export type AggregateOrderEvent = {
    _count: OrderEventCountAggregateOutputType | null;
    _min: OrderEventMinAggregateOutputType | null;
    _max: OrderEventMaxAggregateOutputType | null;
};
export type OrderEventMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    fromStatus: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus | null;
    actorUserId: string | null;
    note: string | null;
    createdAt: Date | null;
};
export type OrderEventMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    fromStatus: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus | null;
    actorUserId: string | null;
    note: string | null;
    createdAt: Date | null;
};
export type OrderEventCountAggregateOutputType = {
    id: number;
    orderId: number;
    fromStatus: number;
    toStatus: number;
    actorUserId: number;
    note: number;
    createdAt: number;
    _all: number;
};
export type OrderEventMinAggregateInputType = {
    id?: true;
    orderId?: true;
    fromStatus?: true;
    toStatus?: true;
    actorUserId?: true;
    note?: true;
    createdAt?: true;
};
export type OrderEventMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    fromStatus?: true;
    toStatus?: true;
    actorUserId?: true;
    note?: true;
    createdAt?: true;
};
export type OrderEventCountAggregateInputType = {
    id?: true;
    orderId?: true;
    fromStatus?: true;
    toStatus?: true;
    actorUserId?: true;
    note?: true;
    createdAt?: true;
    _all?: true;
};
export type OrderEventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderEventWhereInput;
    orderBy?: Prisma.OrderEventOrderByWithRelationInput | Prisma.OrderEventOrderByWithRelationInput[];
    cursor?: Prisma.OrderEventWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OrderEventCountAggregateInputType;
    _min?: OrderEventMinAggregateInputType;
    _max?: OrderEventMaxAggregateInputType;
};
export type GetOrderEventAggregateType<T extends OrderEventAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrderEvent[P]> : Prisma.GetScalarType<T[P], AggregateOrderEvent[P]>;
};
export type OrderEventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderEventWhereInput;
    orderBy?: Prisma.OrderEventOrderByWithAggregationInput | Prisma.OrderEventOrderByWithAggregationInput[];
    by: Prisma.OrderEventScalarFieldEnum[] | Prisma.OrderEventScalarFieldEnum;
    having?: Prisma.OrderEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderEventCountAggregateInputType | true;
    _min?: OrderEventMinAggregateInputType;
    _max?: OrderEventMaxAggregateInputType;
};
export type OrderEventGroupByOutputType = {
    id: string;
    orderId: string;
    fromStatus: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus;
    actorUserId: string | null;
    note: string | null;
    createdAt: Date;
    _count: OrderEventCountAggregateOutputType | null;
    _min: OrderEventMinAggregateOutputType | null;
    _max: OrderEventMaxAggregateOutputType | null;
};
export type GetOrderEventGroupByPayload<T extends OrderEventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrderEventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrderEventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrderEventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrderEventGroupByOutputType[P]>;
}>>;
export type OrderEventWhereInput = {
    AND?: Prisma.OrderEventWhereInput | Prisma.OrderEventWhereInput[];
    OR?: Prisma.OrderEventWhereInput[];
    NOT?: Prisma.OrderEventWhereInput | Prisma.OrderEventWhereInput[];
    id?: Prisma.UuidFilter<"OrderEvent"> | string;
    orderId?: Prisma.UuidFilter<"OrderEvent"> | string;
    fromStatus?: Prisma.EnumOrderStatusNullableFilter<"OrderEvent"> | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFilter<"OrderEvent"> | $Enums.OrderStatus;
    actorUserId?: Prisma.UuidNullableFilter<"OrderEvent"> | string | null;
    note?: Prisma.StringNullableFilter<"OrderEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderEvent"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    actor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type OrderEventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    fromStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    toStatus?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
    actor?: Prisma.UserOrderByWithRelationInput;
};
export type OrderEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OrderEventWhereInput | Prisma.OrderEventWhereInput[];
    OR?: Prisma.OrderEventWhereInput[];
    NOT?: Prisma.OrderEventWhereInput | Prisma.OrderEventWhereInput[];
    orderId?: Prisma.UuidFilter<"OrderEvent"> | string;
    fromStatus?: Prisma.EnumOrderStatusNullableFilter<"OrderEvent"> | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFilter<"OrderEvent"> | $Enums.OrderStatus;
    actorUserId?: Prisma.UuidNullableFilter<"OrderEvent"> | string | null;
    note?: Prisma.StringNullableFilter<"OrderEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderEvent"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    actor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type OrderEventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    fromStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    toStatus?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.OrderEventCountOrderByAggregateInput;
    _max?: Prisma.OrderEventMaxOrderByAggregateInput;
    _min?: Prisma.OrderEventMinOrderByAggregateInput;
};
export type OrderEventScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrderEventScalarWhereWithAggregatesInput | Prisma.OrderEventScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrderEventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrderEventScalarWhereWithAggregatesInput | Prisma.OrderEventScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"OrderEvent"> | string;
    orderId?: Prisma.UuidWithAggregatesFilter<"OrderEvent"> | string;
    fromStatus?: Prisma.EnumOrderStatusNullableWithAggregatesFilter<"OrderEvent"> | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusWithAggregatesFilter<"OrderEvent"> | $Enums.OrderStatus;
    actorUserId?: Prisma.UuidNullableWithAggregatesFilter<"OrderEvent"> | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"OrderEvent"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OrderEvent"> | Date | string;
};
export type OrderEventCreateInput = {
    id?: string;
    fromStatus?: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus;
    note?: string | null;
    createdAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutEventsInput;
    actor?: Prisma.UserCreateNestedOneWithoutOrderEventsInput;
};
export type OrderEventUncheckedCreateInput = {
    id?: string;
    orderId: string;
    fromStatus?: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus;
    actorUserId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type OrderEventUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fromStatus?: Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutEventsNestedInput;
    actor?: Prisma.UserUpdateOneWithoutOrderEventsNestedInput;
};
export type OrderEventUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromStatus?: Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    actorUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderEventCreateManyInput = {
    id?: string;
    orderId: string;
    fromStatus?: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus;
    actorUserId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type OrderEventUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fromStatus?: Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderEventUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromStatus?: Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    actorUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderEventListRelationFilter = {
    every?: Prisma.OrderEventWhereInput;
    some?: Prisma.OrderEventWhereInput;
    none?: Prisma.OrderEventWhereInput;
};
export type OrderEventOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrderEventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    fromStatus?: Prisma.SortOrder;
    toStatus?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderEventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    fromStatus?: Prisma.SortOrder;
    toStatus?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderEventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    fromStatus?: Prisma.SortOrder;
    toStatus?: Prisma.SortOrder;
    actorUserId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderEventCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.OrderEventCreateWithoutActorInput, Prisma.OrderEventUncheckedCreateWithoutActorInput> | Prisma.OrderEventCreateWithoutActorInput[] | Prisma.OrderEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.OrderEventCreateOrConnectWithoutActorInput | Prisma.OrderEventCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.OrderEventCreateManyActorInputEnvelope;
    connect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
};
export type OrderEventUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.OrderEventCreateWithoutActorInput, Prisma.OrderEventUncheckedCreateWithoutActorInput> | Prisma.OrderEventCreateWithoutActorInput[] | Prisma.OrderEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.OrderEventCreateOrConnectWithoutActorInput | Prisma.OrderEventCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.OrderEventCreateManyActorInputEnvelope;
    connect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
};
export type OrderEventUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.OrderEventCreateWithoutActorInput, Prisma.OrderEventUncheckedCreateWithoutActorInput> | Prisma.OrderEventCreateWithoutActorInput[] | Prisma.OrderEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.OrderEventCreateOrConnectWithoutActorInput | Prisma.OrderEventCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.OrderEventUpsertWithWhereUniqueWithoutActorInput | Prisma.OrderEventUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.OrderEventCreateManyActorInputEnvelope;
    set?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    disconnect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    delete?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    connect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    update?: Prisma.OrderEventUpdateWithWhereUniqueWithoutActorInput | Prisma.OrderEventUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.OrderEventUpdateManyWithWhereWithoutActorInput | Prisma.OrderEventUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.OrderEventScalarWhereInput | Prisma.OrderEventScalarWhereInput[];
};
export type OrderEventUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.OrderEventCreateWithoutActorInput, Prisma.OrderEventUncheckedCreateWithoutActorInput> | Prisma.OrderEventCreateWithoutActorInput[] | Prisma.OrderEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.OrderEventCreateOrConnectWithoutActorInput | Prisma.OrderEventCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.OrderEventUpsertWithWhereUniqueWithoutActorInput | Prisma.OrderEventUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.OrderEventCreateManyActorInputEnvelope;
    set?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    disconnect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    delete?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    connect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    update?: Prisma.OrderEventUpdateWithWhereUniqueWithoutActorInput | Prisma.OrderEventUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.OrderEventUpdateManyWithWhereWithoutActorInput | Prisma.OrderEventUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.OrderEventScalarWhereInput | Prisma.OrderEventScalarWhereInput[];
};
export type OrderEventCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderEventCreateWithoutOrderInput, Prisma.OrderEventUncheckedCreateWithoutOrderInput> | Prisma.OrderEventCreateWithoutOrderInput[] | Prisma.OrderEventUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderEventCreateOrConnectWithoutOrderInput | Prisma.OrderEventCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderEventCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
};
export type OrderEventUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderEventCreateWithoutOrderInput, Prisma.OrderEventUncheckedCreateWithoutOrderInput> | Prisma.OrderEventCreateWithoutOrderInput[] | Prisma.OrderEventUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderEventCreateOrConnectWithoutOrderInput | Prisma.OrderEventCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderEventCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
};
export type OrderEventUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderEventCreateWithoutOrderInput, Prisma.OrderEventUncheckedCreateWithoutOrderInput> | Prisma.OrderEventCreateWithoutOrderInput[] | Prisma.OrderEventUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderEventCreateOrConnectWithoutOrderInput | Prisma.OrderEventCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderEventUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderEventUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderEventCreateManyOrderInputEnvelope;
    set?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    disconnect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    delete?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    connect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    update?: Prisma.OrderEventUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderEventUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderEventUpdateManyWithWhereWithoutOrderInput | Prisma.OrderEventUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderEventScalarWhereInput | Prisma.OrderEventScalarWhereInput[];
};
export type OrderEventUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderEventCreateWithoutOrderInput, Prisma.OrderEventUncheckedCreateWithoutOrderInput> | Prisma.OrderEventCreateWithoutOrderInput[] | Prisma.OrderEventUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderEventCreateOrConnectWithoutOrderInput | Prisma.OrderEventCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderEventUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderEventUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderEventCreateManyOrderInputEnvelope;
    set?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    disconnect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    delete?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    connect?: Prisma.OrderEventWhereUniqueInput | Prisma.OrderEventWhereUniqueInput[];
    update?: Prisma.OrderEventUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderEventUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderEventUpdateManyWithWhereWithoutOrderInput | Prisma.OrderEventUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderEventScalarWhereInput | Prisma.OrderEventScalarWhereInput[];
};
export type OrderEventCreateWithoutActorInput = {
    id?: string;
    fromStatus?: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus;
    note?: string | null;
    createdAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutEventsInput;
};
export type OrderEventUncheckedCreateWithoutActorInput = {
    id?: string;
    orderId: string;
    fromStatus?: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus;
    note?: string | null;
    createdAt?: Date | string;
};
export type OrderEventCreateOrConnectWithoutActorInput = {
    where: Prisma.OrderEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderEventCreateWithoutActorInput, Prisma.OrderEventUncheckedCreateWithoutActorInput>;
};
export type OrderEventCreateManyActorInputEnvelope = {
    data: Prisma.OrderEventCreateManyActorInput | Prisma.OrderEventCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type OrderEventUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.OrderEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderEventUpdateWithoutActorInput, Prisma.OrderEventUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.OrderEventCreateWithoutActorInput, Prisma.OrderEventUncheckedCreateWithoutActorInput>;
};
export type OrderEventUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.OrderEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderEventUpdateWithoutActorInput, Prisma.OrderEventUncheckedUpdateWithoutActorInput>;
};
export type OrderEventUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.OrderEventScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderEventUpdateManyMutationInput, Prisma.OrderEventUncheckedUpdateManyWithoutActorInput>;
};
export type OrderEventScalarWhereInput = {
    AND?: Prisma.OrderEventScalarWhereInput | Prisma.OrderEventScalarWhereInput[];
    OR?: Prisma.OrderEventScalarWhereInput[];
    NOT?: Prisma.OrderEventScalarWhereInput | Prisma.OrderEventScalarWhereInput[];
    id?: Prisma.UuidFilter<"OrderEvent"> | string;
    orderId?: Prisma.UuidFilter<"OrderEvent"> | string;
    fromStatus?: Prisma.EnumOrderStatusNullableFilter<"OrderEvent"> | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFilter<"OrderEvent"> | $Enums.OrderStatus;
    actorUserId?: Prisma.UuidNullableFilter<"OrderEvent"> | string | null;
    note?: Prisma.StringNullableFilter<"OrderEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderEvent"> | Date | string;
};
export type OrderEventCreateWithoutOrderInput = {
    id?: string;
    fromStatus?: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus;
    note?: string | null;
    createdAt?: Date | string;
    actor?: Prisma.UserCreateNestedOneWithoutOrderEventsInput;
};
export type OrderEventUncheckedCreateWithoutOrderInput = {
    id?: string;
    fromStatus?: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus;
    actorUserId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type OrderEventCreateOrConnectWithoutOrderInput = {
    where: Prisma.OrderEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderEventCreateWithoutOrderInput, Prisma.OrderEventUncheckedCreateWithoutOrderInput>;
};
export type OrderEventCreateManyOrderInputEnvelope = {
    data: Prisma.OrderEventCreateManyOrderInput | Prisma.OrderEventCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type OrderEventUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderEventUpdateWithoutOrderInput, Prisma.OrderEventUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.OrderEventCreateWithoutOrderInput, Prisma.OrderEventUncheckedCreateWithoutOrderInput>;
};
export type OrderEventUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderEventUpdateWithoutOrderInput, Prisma.OrderEventUncheckedUpdateWithoutOrderInput>;
};
export type OrderEventUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.OrderEventScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderEventUpdateManyMutationInput, Prisma.OrderEventUncheckedUpdateManyWithoutOrderInput>;
};
export type OrderEventCreateManyActorInput = {
    id?: string;
    orderId: string;
    fromStatus?: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus;
    note?: string | null;
    createdAt?: Date | string;
};
export type OrderEventUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fromStatus?: Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutEventsNestedInput;
};
export type OrderEventUncheckedUpdateWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromStatus?: Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderEventUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromStatus?: Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderEventCreateManyOrderInput = {
    id?: string;
    fromStatus?: $Enums.OrderStatus | null;
    toStatus: $Enums.OrderStatus;
    actorUserId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type OrderEventUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fromStatus?: Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actor?: Prisma.UserUpdateOneWithoutOrderEventsNestedInput;
};
export type OrderEventUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fromStatus?: Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    actorUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderEventUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fromStatus?: Prisma.NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null;
    toStatus?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    actorUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderEventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    fromStatus?: boolean;
    toStatus?: boolean;
    actorUserId?: boolean;
    note?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.OrderEvent$actorArgs<ExtArgs>;
}, ExtArgs["result"]["orderEvent"]>;
export type OrderEventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    fromStatus?: boolean;
    toStatus?: boolean;
    actorUserId?: boolean;
    note?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.OrderEvent$actorArgs<ExtArgs>;
}, ExtArgs["result"]["orderEvent"]>;
export type OrderEventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    fromStatus?: boolean;
    toStatus?: boolean;
    actorUserId?: boolean;
    note?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.OrderEvent$actorArgs<ExtArgs>;
}, ExtArgs["result"]["orderEvent"]>;
export type OrderEventSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    fromStatus?: boolean;
    toStatus?: boolean;
    actorUserId?: boolean;
    note?: boolean;
    createdAt?: boolean;
};
export type OrderEventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "fromStatus" | "toStatus" | "actorUserId" | "note" | "createdAt", ExtArgs["result"]["orderEvent"]>;
export type OrderEventInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.OrderEvent$actorArgs<ExtArgs>;
};
export type OrderEventIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.OrderEvent$actorArgs<ExtArgs>;
};
export type OrderEventIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.OrderEvent$actorArgs<ExtArgs>;
};
export type $OrderEventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OrderEvent";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
        actor: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        fromStatus: $Enums.OrderStatus | null;
        toStatus: $Enums.OrderStatus;
        actorUserId: string | null;
        note: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["orderEvent"]>;
    composites: {};
};
export type OrderEventGetPayload<S extends boolean | null | undefined | OrderEventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrderEventPayload, S>;
export type OrderEventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrderEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderEventCountAggregateInputType | true;
};
export interface OrderEventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OrderEvent'];
        meta: {
            name: 'OrderEvent';
        };
    };
    findUnique<T extends OrderEventFindUniqueArgs>(args: Prisma.SelectSubset<T, OrderEventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrderEventClient<runtime.Types.Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OrderEventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrderEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderEventClient<runtime.Types.Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OrderEventFindFirstArgs>(args?: Prisma.SelectSubset<T, OrderEventFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrderEventClient<runtime.Types.Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OrderEventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrderEventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderEventClient<runtime.Types.Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OrderEventFindManyArgs>(args?: Prisma.SelectSubset<T, OrderEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OrderEventCreateArgs>(args: Prisma.SelectSubset<T, OrderEventCreateArgs<ExtArgs>>): Prisma.Prisma__OrderEventClient<runtime.Types.Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OrderEventCreateManyArgs>(args?: Prisma.SelectSubset<T, OrderEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OrderEventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrderEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OrderEventDeleteArgs>(args: Prisma.SelectSubset<T, OrderEventDeleteArgs<ExtArgs>>): Prisma.Prisma__OrderEventClient<runtime.Types.Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OrderEventUpdateArgs>(args: Prisma.SelectSubset<T, OrderEventUpdateArgs<ExtArgs>>): Prisma.Prisma__OrderEventClient<runtime.Types.Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OrderEventDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrderEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OrderEventUpdateManyArgs>(args: Prisma.SelectSubset<T, OrderEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OrderEventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrderEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OrderEventUpsertArgs>(args: Prisma.SelectSubset<T, OrderEventUpsertArgs<ExtArgs>>): Prisma.Prisma__OrderEventClient<runtime.Types.Result.GetResult<Prisma.$OrderEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OrderEventCountArgs>(args?: Prisma.Subset<T, OrderEventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrderEventCountAggregateOutputType> : number>;
    aggregate<T extends OrderEventAggregateArgs>(args: Prisma.Subset<T, OrderEventAggregateArgs>): Prisma.PrismaPromise<GetOrderEventAggregateType<T>>;
    groupBy<T extends OrderEventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrderEventGroupByArgs['orderBy'];
    } : {
        orderBy?: OrderEventGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrderEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OrderEventFieldRefs;
}
export interface Prisma__OrderEventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.OrderEvent$actorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderEvent$actorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OrderEventFieldRefs {
    readonly id: Prisma.FieldRef<"OrderEvent", 'String'>;
    readonly orderId: Prisma.FieldRef<"OrderEvent", 'String'>;
    readonly fromStatus: Prisma.FieldRef<"OrderEvent", 'OrderStatus'>;
    readonly toStatus: Prisma.FieldRef<"OrderEvent", 'OrderStatus'>;
    readonly actorUserId: Prisma.FieldRef<"OrderEvent", 'String'>;
    readonly note: Prisma.FieldRef<"OrderEvent", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OrderEvent", 'DateTime'>;
}
export type OrderEventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelect<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    include?: Prisma.OrderEventInclude<ExtArgs> | null;
    where: Prisma.OrderEventWhereUniqueInput;
};
export type OrderEventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelect<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    include?: Prisma.OrderEventInclude<ExtArgs> | null;
    where: Prisma.OrderEventWhereUniqueInput;
};
export type OrderEventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelect<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    include?: Prisma.OrderEventInclude<ExtArgs> | null;
    where?: Prisma.OrderEventWhereInput;
    orderBy?: Prisma.OrderEventOrderByWithRelationInput | Prisma.OrderEventOrderByWithRelationInput[];
    cursor?: Prisma.OrderEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderEventScalarFieldEnum | Prisma.OrderEventScalarFieldEnum[];
};
export type OrderEventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelect<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    include?: Prisma.OrderEventInclude<ExtArgs> | null;
    where?: Prisma.OrderEventWhereInput;
    orderBy?: Prisma.OrderEventOrderByWithRelationInput | Prisma.OrderEventOrderByWithRelationInput[];
    cursor?: Prisma.OrderEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderEventScalarFieldEnum | Prisma.OrderEventScalarFieldEnum[];
};
export type OrderEventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelect<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    include?: Prisma.OrderEventInclude<ExtArgs> | null;
    where?: Prisma.OrderEventWhereInput;
    orderBy?: Prisma.OrderEventOrderByWithRelationInput | Prisma.OrderEventOrderByWithRelationInput[];
    cursor?: Prisma.OrderEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderEventScalarFieldEnum | Prisma.OrderEventScalarFieldEnum[];
};
export type OrderEventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelect<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    include?: Prisma.OrderEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderEventCreateInput, Prisma.OrderEventUncheckedCreateInput>;
};
export type OrderEventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OrderEventCreateManyInput | Prisma.OrderEventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OrderEventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    data: Prisma.OrderEventCreateManyInput | Prisma.OrderEventCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OrderEventIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OrderEventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelect<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    include?: Prisma.OrderEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderEventUpdateInput, Prisma.OrderEventUncheckedUpdateInput>;
    where: Prisma.OrderEventWhereUniqueInput;
};
export type OrderEventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OrderEventUpdateManyMutationInput, Prisma.OrderEventUncheckedUpdateManyInput>;
    where?: Prisma.OrderEventWhereInput;
    limit?: number;
};
export type OrderEventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderEventUpdateManyMutationInput, Prisma.OrderEventUncheckedUpdateManyInput>;
    where?: Prisma.OrderEventWhereInput;
    limit?: number;
    include?: Prisma.OrderEventIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OrderEventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelect<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    include?: Prisma.OrderEventInclude<ExtArgs> | null;
    where: Prisma.OrderEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderEventCreateInput, Prisma.OrderEventUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OrderEventUpdateInput, Prisma.OrderEventUncheckedUpdateInput>;
};
export type OrderEventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelect<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    include?: Prisma.OrderEventInclude<ExtArgs> | null;
    where: Prisma.OrderEventWhereUniqueInput;
};
export type OrderEventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderEventWhereInput;
    limit?: number;
};
export type OrderEvent$actorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type OrderEventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderEventSelect<ExtArgs> | null;
    omit?: Prisma.OrderEventOmit<ExtArgs> | null;
    include?: Prisma.OrderEventInclude<ExtArgs> | null;
};
