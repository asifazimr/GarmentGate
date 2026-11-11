import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OrderFactoryChangeModel = runtime.Types.Result.DefaultSelection<Prisma.$OrderFactoryChangePayload>;
export type AggregateOrderFactoryChange = {
    _count: OrderFactoryChangeCountAggregateOutputType | null;
    _avg: OrderFactoryChangeAvgAggregateOutputType | null;
    _sum: OrderFactoryChangeSumAggregateOutputType | null;
    _min: OrderFactoryChangeMinAggregateOutputType | null;
    _max: OrderFactoryChangeMaxAggregateOutputType | null;
};
export type OrderFactoryChangeAvgAggregateOutputType = {
    fromUnitPriceMinor: number | null;
    toUnitPriceMinor: number | null;
    fundedMinor: number | null;
};
export type OrderFactoryChangeSumAggregateOutputType = {
    fromUnitPriceMinor: number | null;
    toUnitPriceMinor: number | null;
    fundedMinor: bigint | null;
};
export type OrderFactoryChangeMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    fromProfileId: string | null;
    toProfileId: string | null;
    fromUnitPriceMinor: number | null;
    toUnitPriceMinor: number | null;
    fundedMinor: bigint | null;
    reason: string | null;
    createdById: string | null;
    createdAt: Date | null;
};
export type OrderFactoryChangeMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    fromProfileId: string | null;
    toProfileId: string | null;
    fromUnitPriceMinor: number | null;
    toUnitPriceMinor: number | null;
    fundedMinor: bigint | null;
    reason: string | null;
    createdById: string | null;
    createdAt: Date | null;
};
export type OrderFactoryChangeCountAggregateOutputType = {
    id: number;
    orderId: number;
    fromProfileId: number;
    toProfileId: number;
    fromUnitPriceMinor: number;
    toUnitPriceMinor: number;
    fundedMinor: number;
    reason: number;
    createdById: number;
    createdAt: number;
    _all: number;
};
export type OrderFactoryChangeAvgAggregateInputType = {
    fromUnitPriceMinor?: true;
    toUnitPriceMinor?: true;
    fundedMinor?: true;
};
export type OrderFactoryChangeSumAggregateInputType = {
    fromUnitPriceMinor?: true;
    toUnitPriceMinor?: true;
    fundedMinor?: true;
};
export type OrderFactoryChangeMinAggregateInputType = {
    id?: true;
    orderId?: true;
    fromProfileId?: true;
    toProfileId?: true;
    fromUnitPriceMinor?: true;
    toUnitPriceMinor?: true;
    fundedMinor?: true;
    reason?: true;
    createdById?: true;
    createdAt?: true;
};
export type OrderFactoryChangeMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    fromProfileId?: true;
    toProfileId?: true;
    fromUnitPriceMinor?: true;
    toUnitPriceMinor?: true;
    fundedMinor?: true;
    reason?: true;
    createdById?: true;
    createdAt?: true;
};
export type OrderFactoryChangeCountAggregateInputType = {
    id?: true;
    orderId?: true;
    fromProfileId?: true;
    toProfileId?: true;
    fromUnitPriceMinor?: true;
    toUnitPriceMinor?: true;
    fundedMinor?: true;
    reason?: true;
    createdById?: true;
    createdAt?: true;
    _all?: true;
};
export type OrderFactoryChangeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderFactoryChangeWhereInput;
    orderBy?: Prisma.OrderFactoryChangeOrderByWithRelationInput | Prisma.OrderFactoryChangeOrderByWithRelationInput[];
    cursor?: Prisma.OrderFactoryChangeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OrderFactoryChangeCountAggregateInputType;
    _avg?: OrderFactoryChangeAvgAggregateInputType;
    _sum?: OrderFactoryChangeSumAggregateInputType;
    _min?: OrderFactoryChangeMinAggregateInputType;
    _max?: OrderFactoryChangeMaxAggregateInputType;
};
export type GetOrderFactoryChangeAggregateType<T extends OrderFactoryChangeAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderFactoryChange]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrderFactoryChange[P]> : Prisma.GetScalarType<T[P], AggregateOrderFactoryChange[P]>;
};
export type OrderFactoryChangeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderFactoryChangeWhereInput;
    orderBy?: Prisma.OrderFactoryChangeOrderByWithAggregationInput | Prisma.OrderFactoryChangeOrderByWithAggregationInput[];
    by: Prisma.OrderFactoryChangeScalarFieldEnum[] | Prisma.OrderFactoryChangeScalarFieldEnum;
    having?: Prisma.OrderFactoryChangeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderFactoryChangeCountAggregateInputType | true;
    _avg?: OrderFactoryChangeAvgAggregateInputType;
    _sum?: OrderFactoryChangeSumAggregateInputType;
    _min?: OrderFactoryChangeMinAggregateInputType;
    _max?: OrderFactoryChangeMaxAggregateInputType;
};
export type OrderFactoryChangeGroupByOutputType = {
    id: string;
    orderId: string;
    fromProfileId: string;
    toProfileId: string;
    fromUnitPriceMinor: number;
    toUnitPriceMinor: number;
    fundedMinor: bigint;
    reason: string;
    createdById: string;
    createdAt: Date;
    _count: OrderFactoryChangeCountAggregateOutputType | null;
    _avg: OrderFactoryChangeAvgAggregateOutputType | null;
    _sum: OrderFactoryChangeSumAggregateOutputType | null;
    _min: OrderFactoryChangeMinAggregateOutputType | null;
    _max: OrderFactoryChangeMaxAggregateOutputType | null;
};
export type GetOrderFactoryChangeGroupByPayload<T extends OrderFactoryChangeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrderFactoryChangeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrderFactoryChangeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrderFactoryChangeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrderFactoryChangeGroupByOutputType[P]>;
}>>;
export type OrderFactoryChangeWhereInput = {
    AND?: Prisma.OrderFactoryChangeWhereInput | Prisma.OrderFactoryChangeWhereInput[];
    OR?: Prisma.OrderFactoryChangeWhereInput[];
    NOT?: Prisma.OrderFactoryChangeWhereInput | Prisma.OrderFactoryChangeWhereInput[];
    id?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    orderId?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    fromProfileId?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    toProfileId?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    fromUnitPriceMinor?: Prisma.IntFilter<"OrderFactoryChange"> | number;
    toUnitPriceMinor?: Prisma.IntFilter<"OrderFactoryChange"> | number;
    fundedMinor?: Prisma.BigIntFilter<"OrderFactoryChange"> | bigint | number;
    reason?: Prisma.StringFilter<"OrderFactoryChange"> | string;
    createdById?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    createdAt?: Prisma.DateTimeFilter<"OrderFactoryChange"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
};
export type OrderFactoryChangeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    fromProfileId?: Prisma.SortOrder;
    toProfileId?: Prisma.SortOrder;
    fromUnitPriceMinor?: Prisma.SortOrder;
    toUnitPriceMinor?: Prisma.SortOrder;
    fundedMinor?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
};
export type OrderFactoryChangeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OrderFactoryChangeWhereInput | Prisma.OrderFactoryChangeWhereInput[];
    OR?: Prisma.OrderFactoryChangeWhereInput[];
    NOT?: Prisma.OrderFactoryChangeWhereInput | Prisma.OrderFactoryChangeWhereInput[];
    orderId?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    fromProfileId?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    toProfileId?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    fromUnitPriceMinor?: Prisma.IntFilter<"OrderFactoryChange"> | number;
    toUnitPriceMinor?: Prisma.IntFilter<"OrderFactoryChange"> | number;
    fundedMinor?: Prisma.BigIntFilter<"OrderFactoryChange"> | bigint | number;
    reason?: Prisma.StringFilter<"OrderFactoryChange"> | string;
    createdById?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    createdAt?: Prisma.DateTimeFilter<"OrderFactoryChange"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
}, "id">;
export type OrderFactoryChangeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    fromProfileId?: Prisma.SortOrder;
    toProfileId?: Prisma.SortOrder;
    fromUnitPriceMinor?: Prisma.SortOrder;
    toUnitPriceMinor?: Prisma.SortOrder;
    fundedMinor?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.OrderFactoryChangeCountOrderByAggregateInput;
    _avg?: Prisma.OrderFactoryChangeAvgOrderByAggregateInput;
    _max?: Prisma.OrderFactoryChangeMaxOrderByAggregateInput;
    _min?: Prisma.OrderFactoryChangeMinOrderByAggregateInput;
    _sum?: Prisma.OrderFactoryChangeSumOrderByAggregateInput;
};
export type OrderFactoryChangeScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrderFactoryChangeScalarWhereWithAggregatesInput | Prisma.OrderFactoryChangeScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrderFactoryChangeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrderFactoryChangeScalarWhereWithAggregatesInput | Prisma.OrderFactoryChangeScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"OrderFactoryChange"> | string;
    orderId?: Prisma.UuidWithAggregatesFilter<"OrderFactoryChange"> | string;
    fromProfileId?: Prisma.UuidWithAggregatesFilter<"OrderFactoryChange"> | string;
    toProfileId?: Prisma.UuidWithAggregatesFilter<"OrderFactoryChange"> | string;
    fromUnitPriceMinor?: Prisma.IntWithAggregatesFilter<"OrderFactoryChange"> | number;
    toUnitPriceMinor?: Prisma.IntWithAggregatesFilter<"OrderFactoryChange"> | number;
    fundedMinor?: Prisma.BigIntWithAggregatesFilter<"OrderFactoryChange"> | bigint | number;
    reason?: Prisma.StringWithAggregatesFilter<"OrderFactoryChange"> | string;
    createdById?: Prisma.UuidWithAggregatesFilter<"OrderFactoryChange"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OrderFactoryChange"> | Date | string;
};
export type OrderFactoryChangeCreateInput = {
    id?: string;
    fromProfileId: string;
    toProfileId: string;
    fromUnitPriceMinor: number;
    toUnitPriceMinor: number;
    fundedMinor: bigint | number;
    reason: string;
    createdById: string;
    createdAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutFactoryChangesInput;
};
export type OrderFactoryChangeUncheckedCreateInput = {
    id?: string;
    orderId: string;
    fromProfileId: string;
    toProfileId: string;
    fromUnitPriceMinor: number;
    toUnitPriceMinor: number;
    fundedMinor: bigint | number;
    reason: string;
    createdById: string;
    createdAt?: Date | string;
};
export type OrderFactoryChangeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fromProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    toProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    toUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    fundedMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutFactoryChangesNestedInput;
};
export type OrderFactoryChangeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    toProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    toUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    fundedMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderFactoryChangeCreateManyInput = {
    id?: string;
    orderId: string;
    fromProfileId: string;
    toProfileId: string;
    fromUnitPriceMinor: number;
    toUnitPriceMinor: number;
    fundedMinor: bigint | number;
    reason: string;
    createdById: string;
    createdAt?: Date | string;
};
export type OrderFactoryChangeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fromProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    toProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    toUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    fundedMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderFactoryChangeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    toProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    toUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    fundedMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderFactoryChangeListRelationFilter = {
    every?: Prisma.OrderFactoryChangeWhereInput;
    some?: Prisma.OrderFactoryChangeWhereInput;
    none?: Prisma.OrderFactoryChangeWhereInput;
};
export type OrderFactoryChangeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrderFactoryChangeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    fromProfileId?: Prisma.SortOrder;
    toProfileId?: Prisma.SortOrder;
    fromUnitPriceMinor?: Prisma.SortOrder;
    toUnitPriceMinor?: Prisma.SortOrder;
    fundedMinor?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderFactoryChangeAvgOrderByAggregateInput = {
    fromUnitPriceMinor?: Prisma.SortOrder;
    toUnitPriceMinor?: Prisma.SortOrder;
    fundedMinor?: Prisma.SortOrder;
};
export type OrderFactoryChangeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    fromProfileId?: Prisma.SortOrder;
    toProfileId?: Prisma.SortOrder;
    fromUnitPriceMinor?: Prisma.SortOrder;
    toUnitPriceMinor?: Prisma.SortOrder;
    fundedMinor?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderFactoryChangeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    fromProfileId?: Prisma.SortOrder;
    toProfileId?: Prisma.SortOrder;
    fromUnitPriceMinor?: Prisma.SortOrder;
    toUnitPriceMinor?: Prisma.SortOrder;
    fundedMinor?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderFactoryChangeSumOrderByAggregateInput = {
    fromUnitPriceMinor?: Prisma.SortOrder;
    toUnitPriceMinor?: Prisma.SortOrder;
    fundedMinor?: Prisma.SortOrder;
};
export type OrderFactoryChangeCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderFactoryChangeCreateWithoutOrderInput, Prisma.OrderFactoryChangeUncheckedCreateWithoutOrderInput> | Prisma.OrderFactoryChangeCreateWithoutOrderInput[] | Prisma.OrderFactoryChangeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderFactoryChangeCreateOrConnectWithoutOrderInput | Prisma.OrderFactoryChangeCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderFactoryChangeCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderFactoryChangeWhereUniqueInput | Prisma.OrderFactoryChangeWhereUniqueInput[];
};
export type OrderFactoryChangeUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderFactoryChangeCreateWithoutOrderInput, Prisma.OrderFactoryChangeUncheckedCreateWithoutOrderInput> | Prisma.OrderFactoryChangeCreateWithoutOrderInput[] | Prisma.OrderFactoryChangeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderFactoryChangeCreateOrConnectWithoutOrderInput | Prisma.OrderFactoryChangeCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderFactoryChangeCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderFactoryChangeWhereUniqueInput | Prisma.OrderFactoryChangeWhereUniqueInput[];
};
export type OrderFactoryChangeUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderFactoryChangeCreateWithoutOrderInput, Prisma.OrderFactoryChangeUncheckedCreateWithoutOrderInput> | Prisma.OrderFactoryChangeCreateWithoutOrderInput[] | Prisma.OrderFactoryChangeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderFactoryChangeCreateOrConnectWithoutOrderInput | Prisma.OrderFactoryChangeCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderFactoryChangeUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderFactoryChangeUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderFactoryChangeCreateManyOrderInputEnvelope;
    set?: Prisma.OrderFactoryChangeWhereUniqueInput | Prisma.OrderFactoryChangeWhereUniqueInput[];
    disconnect?: Prisma.OrderFactoryChangeWhereUniqueInput | Prisma.OrderFactoryChangeWhereUniqueInput[];
    delete?: Prisma.OrderFactoryChangeWhereUniqueInput | Prisma.OrderFactoryChangeWhereUniqueInput[];
    connect?: Prisma.OrderFactoryChangeWhereUniqueInput | Prisma.OrderFactoryChangeWhereUniqueInput[];
    update?: Prisma.OrderFactoryChangeUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderFactoryChangeUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderFactoryChangeUpdateManyWithWhereWithoutOrderInput | Prisma.OrderFactoryChangeUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderFactoryChangeScalarWhereInput | Prisma.OrderFactoryChangeScalarWhereInput[];
};
export type OrderFactoryChangeUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderFactoryChangeCreateWithoutOrderInput, Prisma.OrderFactoryChangeUncheckedCreateWithoutOrderInput> | Prisma.OrderFactoryChangeCreateWithoutOrderInput[] | Prisma.OrderFactoryChangeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderFactoryChangeCreateOrConnectWithoutOrderInput | Prisma.OrderFactoryChangeCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderFactoryChangeUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderFactoryChangeUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderFactoryChangeCreateManyOrderInputEnvelope;
    set?: Prisma.OrderFactoryChangeWhereUniqueInput | Prisma.OrderFactoryChangeWhereUniqueInput[];
    disconnect?: Prisma.OrderFactoryChangeWhereUniqueInput | Prisma.OrderFactoryChangeWhereUniqueInput[];
    delete?: Prisma.OrderFactoryChangeWhereUniqueInput | Prisma.OrderFactoryChangeWhereUniqueInput[];
    connect?: Prisma.OrderFactoryChangeWhereUniqueInput | Prisma.OrderFactoryChangeWhereUniqueInput[];
    update?: Prisma.OrderFactoryChangeUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderFactoryChangeUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderFactoryChangeUpdateManyWithWhereWithoutOrderInput | Prisma.OrderFactoryChangeUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderFactoryChangeScalarWhereInput | Prisma.OrderFactoryChangeScalarWhereInput[];
};
export type OrderFactoryChangeCreateWithoutOrderInput = {
    id?: string;
    fromProfileId: string;
    toProfileId: string;
    fromUnitPriceMinor: number;
    toUnitPriceMinor: number;
    fundedMinor: bigint | number;
    reason: string;
    createdById: string;
    createdAt?: Date | string;
};
export type OrderFactoryChangeUncheckedCreateWithoutOrderInput = {
    id?: string;
    fromProfileId: string;
    toProfileId: string;
    fromUnitPriceMinor: number;
    toUnitPriceMinor: number;
    fundedMinor: bigint | number;
    reason: string;
    createdById: string;
    createdAt?: Date | string;
};
export type OrderFactoryChangeCreateOrConnectWithoutOrderInput = {
    where: Prisma.OrderFactoryChangeWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderFactoryChangeCreateWithoutOrderInput, Prisma.OrderFactoryChangeUncheckedCreateWithoutOrderInput>;
};
export type OrderFactoryChangeCreateManyOrderInputEnvelope = {
    data: Prisma.OrderFactoryChangeCreateManyOrderInput | Prisma.OrderFactoryChangeCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type OrderFactoryChangeUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderFactoryChangeWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderFactoryChangeUpdateWithoutOrderInput, Prisma.OrderFactoryChangeUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.OrderFactoryChangeCreateWithoutOrderInput, Prisma.OrderFactoryChangeUncheckedCreateWithoutOrderInput>;
};
export type OrderFactoryChangeUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderFactoryChangeWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderFactoryChangeUpdateWithoutOrderInput, Prisma.OrderFactoryChangeUncheckedUpdateWithoutOrderInput>;
};
export type OrderFactoryChangeUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.OrderFactoryChangeScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderFactoryChangeUpdateManyMutationInput, Prisma.OrderFactoryChangeUncheckedUpdateManyWithoutOrderInput>;
};
export type OrderFactoryChangeScalarWhereInput = {
    AND?: Prisma.OrderFactoryChangeScalarWhereInput | Prisma.OrderFactoryChangeScalarWhereInput[];
    OR?: Prisma.OrderFactoryChangeScalarWhereInput[];
    NOT?: Prisma.OrderFactoryChangeScalarWhereInput | Prisma.OrderFactoryChangeScalarWhereInput[];
    id?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    orderId?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    fromProfileId?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    toProfileId?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    fromUnitPriceMinor?: Prisma.IntFilter<"OrderFactoryChange"> | number;
    toUnitPriceMinor?: Prisma.IntFilter<"OrderFactoryChange"> | number;
    fundedMinor?: Prisma.BigIntFilter<"OrderFactoryChange"> | bigint | number;
    reason?: Prisma.StringFilter<"OrderFactoryChange"> | string;
    createdById?: Prisma.UuidFilter<"OrderFactoryChange"> | string;
    createdAt?: Prisma.DateTimeFilter<"OrderFactoryChange"> | Date | string;
};
export type OrderFactoryChangeCreateManyOrderInput = {
    id?: string;
    fromProfileId: string;
    toProfileId: string;
    fromUnitPriceMinor: number;
    toUnitPriceMinor: number;
    fundedMinor: bigint | number;
    reason: string;
    createdById: string;
    createdAt?: Date | string;
};
export type OrderFactoryChangeUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fromProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    toProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    toUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    fundedMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderFactoryChangeUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fromProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    toProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    toUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    fundedMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderFactoryChangeUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fromProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    toProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    fromUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    toUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    fundedMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderFactoryChangeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    fromProfileId?: boolean;
    toProfileId?: boolean;
    fromUnitPriceMinor?: boolean;
    toUnitPriceMinor?: boolean;
    fundedMinor?: boolean;
    reason?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderFactoryChange"]>;
export type OrderFactoryChangeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    fromProfileId?: boolean;
    toProfileId?: boolean;
    fromUnitPriceMinor?: boolean;
    toUnitPriceMinor?: boolean;
    fundedMinor?: boolean;
    reason?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderFactoryChange"]>;
export type OrderFactoryChangeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    fromProfileId?: boolean;
    toProfileId?: boolean;
    fromUnitPriceMinor?: boolean;
    toUnitPriceMinor?: boolean;
    fundedMinor?: boolean;
    reason?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderFactoryChange"]>;
export type OrderFactoryChangeSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    fromProfileId?: boolean;
    toProfileId?: boolean;
    fromUnitPriceMinor?: boolean;
    toUnitPriceMinor?: boolean;
    fundedMinor?: boolean;
    reason?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
};
export type OrderFactoryChangeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "fromProfileId" | "toProfileId" | "fromUnitPriceMinor" | "toUnitPriceMinor" | "fundedMinor" | "reason" | "createdById" | "createdAt", ExtArgs["result"]["orderFactoryChange"]>;
export type OrderFactoryChangeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type OrderFactoryChangeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type OrderFactoryChangeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $OrderFactoryChangePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OrderFactoryChange";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        fromProfileId: string;
        toProfileId: string;
        fromUnitPriceMinor: number;
        toUnitPriceMinor: number;
        fundedMinor: bigint;
        reason: string;
        createdById: string;
        createdAt: Date;
    }, ExtArgs["result"]["orderFactoryChange"]>;
    composites: {};
};
export type OrderFactoryChangeGetPayload<S extends boolean | null | undefined | OrderFactoryChangeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload, S>;
export type OrderFactoryChangeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrderFactoryChangeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderFactoryChangeCountAggregateInputType | true;
};
export interface OrderFactoryChangeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OrderFactoryChange'];
        meta: {
            name: 'OrderFactoryChange';
        };
    };
    findUnique<T extends OrderFactoryChangeFindUniqueArgs>(args: Prisma.SelectSubset<T, OrderFactoryChangeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrderFactoryChangeClient<runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OrderFactoryChangeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrderFactoryChangeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderFactoryChangeClient<runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OrderFactoryChangeFindFirstArgs>(args?: Prisma.SelectSubset<T, OrderFactoryChangeFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrderFactoryChangeClient<runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OrderFactoryChangeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrderFactoryChangeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderFactoryChangeClient<runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OrderFactoryChangeFindManyArgs>(args?: Prisma.SelectSubset<T, OrderFactoryChangeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OrderFactoryChangeCreateArgs>(args: Prisma.SelectSubset<T, OrderFactoryChangeCreateArgs<ExtArgs>>): Prisma.Prisma__OrderFactoryChangeClient<runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OrderFactoryChangeCreateManyArgs>(args?: Prisma.SelectSubset<T, OrderFactoryChangeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OrderFactoryChangeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrderFactoryChangeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OrderFactoryChangeDeleteArgs>(args: Prisma.SelectSubset<T, OrderFactoryChangeDeleteArgs<ExtArgs>>): Prisma.Prisma__OrderFactoryChangeClient<runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OrderFactoryChangeUpdateArgs>(args: Prisma.SelectSubset<T, OrderFactoryChangeUpdateArgs<ExtArgs>>): Prisma.Prisma__OrderFactoryChangeClient<runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OrderFactoryChangeDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrderFactoryChangeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OrderFactoryChangeUpdateManyArgs>(args: Prisma.SelectSubset<T, OrderFactoryChangeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OrderFactoryChangeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrderFactoryChangeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OrderFactoryChangeUpsertArgs>(args: Prisma.SelectSubset<T, OrderFactoryChangeUpsertArgs<ExtArgs>>): Prisma.Prisma__OrderFactoryChangeClient<runtime.Types.Result.GetResult<Prisma.$OrderFactoryChangePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OrderFactoryChangeCountArgs>(args?: Prisma.Subset<T, OrderFactoryChangeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrderFactoryChangeCountAggregateOutputType> : number>;
    aggregate<T extends OrderFactoryChangeAggregateArgs>(args: Prisma.Subset<T, OrderFactoryChangeAggregateArgs>): Prisma.PrismaPromise<GetOrderFactoryChangeAggregateType<T>>;
    groupBy<T extends OrderFactoryChangeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrderFactoryChangeGroupByArgs['orderBy'];
    } : {
        orderBy?: OrderFactoryChangeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrderFactoryChangeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderFactoryChangeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OrderFactoryChangeFieldRefs;
}
export interface Prisma__OrderFactoryChangeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OrderFactoryChangeFieldRefs {
    readonly id: Prisma.FieldRef<"OrderFactoryChange", 'String'>;
    readonly orderId: Prisma.FieldRef<"OrderFactoryChange", 'String'>;
    readonly fromProfileId: Prisma.FieldRef<"OrderFactoryChange", 'String'>;
    readonly toProfileId: Prisma.FieldRef<"OrderFactoryChange", 'String'>;
    readonly fromUnitPriceMinor: Prisma.FieldRef<"OrderFactoryChange", 'Int'>;
    readonly toUnitPriceMinor: Prisma.FieldRef<"OrderFactoryChange", 'Int'>;
    readonly fundedMinor: Prisma.FieldRef<"OrderFactoryChange", 'BigInt'>;
    readonly reason: Prisma.FieldRef<"OrderFactoryChange", 'String'>;
    readonly createdById: Prisma.FieldRef<"OrderFactoryChange", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OrderFactoryChange", 'DateTime'>;
}
export type OrderFactoryChangeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelect<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    include?: Prisma.OrderFactoryChangeInclude<ExtArgs> | null;
    where: Prisma.OrderFactoryChangeWhereUniqueInput;
};
export type OrderFactoryChangeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelect<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    include?: Prisma.OrderFactoryChangeInclude<ExtArgs> | null;
    where: Prisma.OrderFactoryChangeWhereUniqueInput;
};
export type OrderFactoryChangeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelect<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    include?: Prisma.OrderFactoryChangeInclude<ExtArgs> | null;
    where?: Prisma.OrderFactoryChangeWhereInput;
    orderBy?: Prisma.OrderFactoryChangeOrderByWithRelationInput | Prisma.OrderFactoryChangeOrderByWithRelationInput[];
    cursor?: Prisma.OrderFactoryChangeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderFactoryChangeScalarFieldEnum | Prisma.OrderFactoryChangeScalarFieldEnum[];
};
export type OrderFactoryChangeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelect<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    include?: Prisma.OrderFactoryChangeInclude<ExtArgs> | null;
    where?: Prisma.OrderFactoryChangeWhereInput;
    orderBy?: Prisma.OrderFactoryChangeOrderByWithRelationInput | Prisma.OrderFactoryChangeOrderByWithRelationInput[];
    cursor?: Prisma.OrderFactoryChangeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderFactoryChangeScalarFieldEnum | Prisma.OrderFactoryChangeScalarFieldEnum[];
};
export type OrderFactoryChangeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelect<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    include?: Prisma.OrderFactoryChangeInclude<ExtArgs> | null;
    where?: Prisma.OrderFactoryChangeWhereInput;
    orderBy?: Prisma.OrderFactoryChangeOrderByWithRelationInput | Prisma.OrderFactoryChangeOrderByWithRelationInput[];
    cursor?: Prisma.OrderFactoryChangeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderFactoryChangeScalarFieldEnum | Prisma.OrderFactoryChangeScalarFieldEnum[];
};
export type OrderFactoryChangeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelect<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    include?: Prisma.OrderFactoryChangeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderFactoryChangeCreateInput, Prisma.OrderFactoryChangeUncheckedCreateInput>;
};
export type OrderFactoryChangeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OrderFactoryChangeCreateManyInput | Prisma.OrderFactoryChangeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OrderFactoryChangeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    data: Prisma.OrderFactoryChangeCreateManyInput | Prisma.OrderFactoryChangeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OrderFactoryChangeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OrderFactoryChangeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelect<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    include?: Prisma.OrderFactoryChangeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderFactoryChangeUpdateInput, Prisma.OrderFactoryChangeUncheckedUpdateInput>;
    where: Prisma.OrderFactoryChangeWhereUniqueInput;
};
export type OrderFactoryChangeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OrderFactoryChangeUpdateManyMutationInput, Prisma.OrderFactoryChangeUncheckedUpdateManyInput>;
    where?: Prisma.OrderFactoryChangeWhereInput;
    limit?: number;
};
export type OrderFactoryChangeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderFactoryChangeUpdateManyMutationInput, Prisma.OrderFactoryChangeUncheckedUpdateManyInput>;
    where?: Prisma.OrderFactoryChangeWhereInput;
    limit?: number;
    include?: Prisma.OrderFactoryChangeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OrderFactoryChangeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelect<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    include?: Prisma.OrderFactoryChangeInclude<ExtArgs> | null;
    where: Prisma.OrderFactoryChangeWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderFactoryChangeCreateInput, Prisma.OrderFactoryChangeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OrderFactoryChangeUpdateInput, Prisma.OrderFactoryChangeUncheckedUpdateInput>;
};
export type OrderFactoryChangeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelect<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    include?: Prisma.OrderFactoryChangeInclude<ExtArgs> | null;
    where: Prisma.OrderFactoryChangeWhereUniqueInput;
};
export type OrderFactoryChangeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderFactoryChangeWhereInput;
    limit?: number;
};
export type OrderFactoryChangeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderFactoryChangeSelect<ExtArgs> | null;
    omit?: Prisma.OrderFactoryChangeOmit<ExtArgs> | null;
    include?: Prisma.OrderFactoryChangeInclude<ExtArgs> | null;
};
