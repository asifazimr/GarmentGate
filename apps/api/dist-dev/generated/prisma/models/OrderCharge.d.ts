import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OrderChargeModel = runtime.Types.Result.DefaultSelection<Prisma.$OrderChargePayload>;
export type AggregateOrderCharge = {
    _count: OrderChargeCountAggregateOutputType | null;
    _avg: OrderChargeAvgAggregateOutputType | null;
    _sum: OrderChargeSumAggregateOutputType | null;
    _min: OrderChargeMinAggregateOutputType | null;
    _max: OrderChargeMaxAggregateOutputType | null;
};
export type OrderChargeAvgAggregateOutputType = {
    amountMinor: number | null;
};
export type OrderChargeSumAggregateOutputType = {
    amountMinor: bigint | null;
};
export type OrderChargeMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    kind: $Enums.OrderChargeKind | null;
    amountMinor: bigint | null;
    currency: $Enums.Currency | null;
    waived: boolean | null;
    sampleId: string | null;
    inspectionId: string | null;
    createdAt: Date | null;
};
export type OrderChargeMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    kind: $Enums.OrderChargeKind | null;
    amountMinor: bigint | null;
    currency: $Enums.Currency | null;
    waived: boolean | null;
    sampleId: string | null;
    inspectionId: string | null;
    createdAt: Date | null;
};
export type OrderChargeCountAggregateOutputType = {
    id: number;
    orderId: number;
    kind: number;
    amountMinor: number;
    currency: number;
    waived: number;
    sampleId: number;
    inspectionId: number;
    createdAt: number;
    _all: number;
};
export type OrderChargeAvgAggregateInputType = {
    amountMinor?: true;
};
export type OrderChargeSumAggregateInputType = {
    amountMinor?: true;
};
export type OrderChargeMinAggregateInputType = {
    id?: true;
    orderId?: true;
    kind?: true;
    amountMinor?: true;
    currency?: true;
    waived?: true;
    sampleId?: true;
    inspectionId?: true;
    createdAt?: true;
};
export type OrderChargeMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    kind?: true;
    amountMinor?: true;
    currency?: true;
    waived?: true;
    sampleId?: true;
    inspectionId?: true;
    createdAt?: true;
};
export type OrderChargeCountAggregateInputType = {
    id?: true;
    orderId?: true;
    kind?: true;
    amountMinor?: true;
    currency?: true;
    waived?: true;
    sampleId?: true;
    inspectionId?: true;
    createdAt?: true;
    _all?: true;
};
export type OrderChargeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderChargeWhereInput;
    orderBy?: Prisma.OrderChargeOrderByWithRelationInput | Prisma.OrderChargeOrderByWithRelationInput[];
    cursor?: Prisma.OrderChargeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OrderChargeCountAggregateInputType;
    _avg?: OrderChargeAvgAggregateInputType;
    _sum?: OrderChargeSumAggregateInputType;
    _min?: OrderChargeMinAggregateInputType;
    _max?: OrderChargeMaxAggregateInputType;
};
export type GetOrderChargeAggregateType<T extends OrderChargeAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderCharge]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrderCharge[P]> : Prisma.GetScalarType<T[P], AggregateOrderCharge[P]>;
};
export type OrderChargeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderChargeWhereInput;
    orderBy?: Prisma.OrderChargeOrderByWithAggregationInput | Prisma.OrderChargeOrderByWithAggregationInput[];
    by: Prisma.OrderChargeScalarFieldEnum[] | Prisma.OrderChargeScalarFieldEnum;
    having?: Prisma.OrderChargeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderChargeCountAggregateInputType | true;
    _avg?: OrderChargeAvgAggregateInputType;
    _sum?: OrderChargeSumAggregateInputType;
    _min?: OrderChargeMinAggregateInputType;
    _max?: OrderChargeMaxAggregateInputType;
};
export type OrderChargeGroupByOutputType = {
    id: string;
    orderId: string;
    kind: $Enums.OrderChargeKind;
    amountMinor: bigint;
    currency: $Enums.Currency;
    waived: boolean;
    sampleId: string | null;
    inspectionId: string | null;
    createdAt: Date;
    _count: OrderChargeCountAggregateOutputType | null;
    _avg: OrderChargeAvgAggregateOutputType | null;
    _sum: OrderChargeSumAggregateOutputType | null;
    _min: OrderChargeMinAggregateOutputType | null;
    _max: OrderChargeMaxAggregateOutputType | null;
};
export type GetOrderChargeGroupByPayload<T extends OrderChargeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrderChargeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrderChargeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrderChargeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrderChargeGroupByOutputType[P]>;
}>>;
export type OrderChargeWhereInput = {
    AND?: Prisma.OrderChargeWhereInput | Prisma.OrderChargeWhereInput[];
    OR?: Prisma.OrderChargeWhereInput[];
    NOT?: Prisma.OrderChargeWhereInput | Prisma.OrderChargeWhereInput[];
    id?: Prisma.UuidFilter<"OrderCharge"> | string;
    orderId?: Prisma.UuidFilter<"OrderCharge"> | string;
    kind?: Prisma.EnumOrderChargeKindFilter<"OrderCharge"> | $Enums.OrderChargeKind;
    amountMinor?: Prisma.BigIntFilter<"OrderCharge"> | bigint | number;
    currency?: Prisma.EnumCurrencyFilter<"OrderCharge"> | $Enums.Currency;
    waived?: Prisma.BoolFilter<"OrderCharge"> | boolean;
    sampleId?: Prisma.UuidNullableFilter<"OrderCharge"> | string | null;
    inspectionId?: Prisma.UuidNullableFilter<"OrderCharge"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderCharge"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
};
export type OrderChargeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    waived?: Prisma.SortOrder;
    sampleId?: Prisma.SortOrderInput | Prisma.SortOrder;
    inspectionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
};
export type OrderChargeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    sampleId?: string;
    inspectionId?: string;
    AND?: Prisma.OrderChargeWhereInput | Prisma.OrderChargeWhereInput[];
    OR?: Prisma.OrderChargeWhereInput[];
    NOT?: Prisma.OrderChargeWhereInput | Prisma.OrderChargeWhereInput[];
    orderId?: Prisma.UuidFilter<"OrderCharge"> | string;
    kind?: Prisma.EnumOrderChargeKindFilter<"OrderCharge"> | $Enums.OrderChargeKind;
    amountMinor?: Prisma.BigIntFilter<"OrderCharge"> | bigint | number;
    currency?: Prisma.EnumCurrencyFilter<"OrderCharge"> | $Enums.Currency;
    waived?: Prisma.BoolFilter<"OrderCharge"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"OrderCharge"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
}, "id" | "sampleId" | "inspectionId">;
export type OrderChargeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    waived?: Prisma.SortOrder;
    sampleId?: Prisma.SortOrderInput | Prisma.SortOrder;
    inspectionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.OrderChargeCountOrderByAggregateInput;
    _avg?: Prisma.OrderChargeAvgOrderByAggregateInput;
    _max?: Prisma.OrderChargeMaxOrderByAggregateInput;
    _min?: Prisma.OrderChargeMinOrderByAggregateInput;
    _sum?: Prisma.OrderChargeSumOrderByAggregateInput;
};
export type OrderChargeScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrderChargeScalarWhereWithAggregatesInput | Prisma.OrderChargeScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrderChargeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrderChargeScalarWhereWithAggregatesInput | Prisma.OrderChargeScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"OrderCharge"> | string;
    orderId?: Prisma.UuidWithAggregatesFilter<"OrderCharge"> | string;
    kind?: Prisma.EnumOrderChargeKindWithAggregatesFilter<"OrderCharge"> | $Enums.OrderChargeKind;
    amountMinor?: Prisma.BigIntWithAggregatesFilter<"OrderCharge"> | bigint | number;
    currency?: Prisma.EnumCurrencyWithAggregatesFilter<"OrderCharge"> | $Enums.Currency;
    waived?: Prisma.BoolWithAggregatesFilter<"OrderCharge"> | boolean;
    sampleId?: Prisma.UuidNullableWithAggregatesFilter<"OrderCharge"> | string | null;
    inspectionId?: Prisma.UuidNullableWithAggregatesFilter<"OrderCharge"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OrderCharge"> | Date | string;
};
export type OrderChargeCreateInput = {
    id?: string;
    kind: $Enums.OrderChargeKind;
    amountMinor: bigint | number;
    currency: $Enums.Currency;
    waived?: boolean;
    sampleId?: string | null;
    inspectionId?: string | null;
    createdAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutChargesInput;
};
export type OrderChargeUncheckedCreateInput = {
    id?: string;
    orderId: string;
    kind: $Enums.OrderChargeKind;
    amountMinor: bigint | number;
    currency: $Enums.Currency;
    waived?: boolean;
    sampleId?: string | null;
    inspectionId?: string | null;
    createdAt?: Date | string;
};
export type OrderChargeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumOrderChargeKindFieldUpdateOperationsInput | $Enums.OrderChargeKind;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    waived?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sampleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutChargesNestedInput;
};
export type OrderChargeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumOrderChargeKindFieldUpdateOperationsInput | $Enums.OrderChargeKind;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    waived?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sampleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderChargeCreateManyInput = {
    id?: string;
    orderId: string;
    kind: $Enums.OrderChargeKind;
    amountMinor: bigint | number;
    currency: $Enums.Currency;
    waived?: boolean;
    sampleId?: string | null;
    inspectionId?: string | null;
    createdAt?: Date | string;
};
export type OrderChargeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumOrderChargeKindFieldUpdateOperationsInput | $Enums.OrderChargeKind;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    waived?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sampleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderChargeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumOrderChargeKindFieldUpdateOperationsInput | $Enums.OrderChargeKind;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    waived?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sampleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderChargeListRelationFilter = {
    every?: Prisma.OrderChargeWhereInput;
    some?: Prisma.OrderChargeWhereInput;
    none?: Prisma.OrderChargeWhereInput;
};
export type OrderChargeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrderChargeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    waived?: Prisma.SortOrder;
    sampleId?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderChargeAvgOrderByAggregateInput = {
    amountMinor?: Prisma.SortOrder;
};
export type OrderChargeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    waived?: Prisma.SortOrder;
    sampleId?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderChargeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    waived?: Prisma.SortOrder;
    sampleId?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderChargeSumOrderByAggregateInput = {
    amountMinor?: Prisma.SortOrder;
};
export type OrderChargeCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderChargeCreateWithoutOrderInput, Prisma.OrderChargeUncheckedCreateWithoutOrderInput> | Prisma.OrderChargeCreateWithoutOrderInput[] | Prisma.OrderChargeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderChargeCreateOrConnectWithoutOrderInput | Prisma.OrderChargeCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderChargeCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderChargeWhereUniqueInput | Prisma.OrderChargeWhereUniqueInput[];
};
export type OrderChargeUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderChargeCreateWithoutOrderInput, Prisma.OrderChargeUncheckedCreateWithoutOrderInput> | Prisma.OrderChargeCreateWithoutOrderInput[] | Prisma.OrderChargeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderChargeCreateOrConnectWithoutOrderInput | Prisma.OrderChargeCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderChargeCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderChargeWhereUniqueInput | Prisma.OrderChargeWhereUniqueInput[];
};
export type OrderChargeUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderChargeCreateWithoutOrderInput, Prisma.OrderChargeUncheckedCreateWithoutOrderInput> | Prisma.OrderChargeCreateWithoutOrderInput[] | Prisma.OrderChargeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderChargeCreateOrConnectWithoutOrderInput | Prisma.OrderChargeCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderChargeUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderChargeUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderChargeCreateManyOrderInputEnvelope;
    set?: Prisma.OrderChargeWhereUniqueInput | Prisma.OrderChargeWhereUniqueInput[];
    disconnect?: Prisma.OrderChargeWhereUniqueInput | Prisma.OrderChargeWhereUniqueInput[];
    delete?: Prisma.OrderChargeWhereUniqueInput | Prisma.OrderChargeWhereUniqueInput[];
    connect?: Prisma.OrderChargeWhereUniqueInput | Prisma.OrderChargeWhereUniqueInput[];
    update?: Prisma.OrderChargeUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderChargeUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderChargeUpdateManyWithWhereWithoutOrderInput | Prisma.OrderChargeUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderChargeScalarWhereInput | Prisma.OrderChargeScalarWhereInput[];
};
export type OrderChargeUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderChargeCreateWithoutOrderInput, Prisma.OrderChargeUncheckedCreateWithoutOrderInput> | Prisma.OrderChargeCreateWithoutOrderInput[] | Prisma.OrderChargeUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderChargeCreateOrConnectWithoutOrderInput | Prisma.OrderChargeCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderChargeUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderChargeUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderChargeCreateManyOrderInputEnvelope;
    set?: Prisma.OrderChargeWhereUniqueInput | Prisma.OrderChargeWhereUniqueInput[];
    disconnect?: Prisma.OrderChargeWhereUniqueInput | Prisma.OrderChargeWhereUniqueInput[];
    delete?: Prisma.OrderChargeWhereUniqueInput | Prisma.OrderChargeWhereUniqueInput[];
    connect?: Prisma.OrderChargeWhereUniqueInput | Prisma.OrderChargeWhereUniqueInput[];
    update?: Prisma.OrderChargeUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderChargeUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderChargeUpdateManyWithWhereWithoutOrderInput | Prisma.OrderChargeUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderChargeScalarWhereInput | Prisma.OrderChargeScalarWhereInput[];
};
export type EnumOrderChargeKindFieldUpdateOperationsInput = {
    set?: $Enums.OrderChargeKind;
};
export type OrderChargeCreateWithoutOrderInput = {
    id?: string;
    kind: $Enums.OrderChargeKind;
    amountMinor: bigint | number;
    currency: $Enums.Currency;
    waived?: boolean;
    sampleId?: string | null;
    inspectionId?: string | null;
    createdAt?: Date | string;
};
export type OrderChargeUncheckedCreateWithoutOrderInput = {
    id?: string;
    kind: $Enums.OrderChargeKind;
    amountMinor: bigint | number;
    currency: $Enums.Currency;
    waived?: boolean;
    sampleId?: string | null;
    inspectionId?: string | null;
    createdAt?: Date | string;
};
export type OrderChargeCreateOrConnectWithoutOrderInput = {
    where: Prisma.OrderChargeWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderChargeCreateWithoutOrderInput, Prisma.OrderChargeUncheckedCreateWithoutOrderInput>;
};
export type OrderChargeCreateManyOrderInputEnvelope = {
    data: Prisma.OrderChargeCreateManyOrderInput | Prisma.OrderChargeCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type OrderChargeUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderChargeWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderChargeUpdateWithoutOrderInput, Prisma.OrderChargeUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.OrderChargeCreateWithoutOrderInput, Prisma.OrderChargeUncheckedCreateWithoutOrderInput>;
};
export type OrderChargeUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderChargeWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderChargeUpdateWithoutOrderInput, Prisma.OrderChargeUncheckedUpdateWithoutOrderInput>;
};
export type OrderChargeUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.OrderChargeScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderChargeUpdateManyMutationInput, Prisma.OrderChargeUncheckedUpdateManyWithoutOrderInput>;
};
export type OrderChargeScalarWhereInput = {
    AND?: Prisma.OrderChargeScalarWhereInput | Prisma.OrderChargeScalarWhereInput[];
    OR?: Prisma.OrderChargeScalarWhereInput[];
    NOT?: Prisma.OrderChargeScalarWhereInput | Prisma.OrderChargeScalarWhereInput[];
    id?: Prisma.UuidFilter<"OrderCharge"> | string;
    orderId?: Prisma.UuidFilter<"OrderCharge"> | string;
    kind?: Prisma.EnumOrderChargeKindFilter<"OrderCharge"> | $Enums.OrderChargeKind;
    amountMinor?: Prisma.BigIntFilter<"OrderCharge"> | bigint | number;
    currency?: Prisma.EnumCurrencyFilter<"OrderCharge"> | $Enums.Currency;
    waived?: Prisma.BoolFilter<"OrderCharge"> | boolean;
    sampleId?: Prisma.UuidNullableFilter<"OrderCharge"> | string | null;
    inspectionId?: Prisma.UuidNullableFilter<"OrderCharge"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OrderCharge"> | Date | string;
};
export type OrderChargeCreateManyOrderInput = {
    id?: string;
    kind: $Enums.OrderChargeKind;
    amountMinor: bigint | number;
    currency: $Enums.Currency;
    waived?: boolean;
    sampleId?: string | null;
    inspectionId?: string | null;
    createdAt?: Date | string;
};
export type OrderChargeUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumOrderChargeKindFieldUpdateOperationsInput | $Enums.OrderChargeKind;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    waived?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sampleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderChargeUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumOrderChargeKindFieldUpdateOperationsInput | $Enums.OrderChargeKind;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    waived?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sampleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderChargeUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumOrderChargeKindFieldUpdateOperationsInput | $Enums.OrderChargeKind;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    waived?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sampleId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderChargeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    kind?: boolean;
    amountMinor?: boolean;
    currency?: boolean;
    waived?: boolean;
    sampleId?: boolean;
    inspectionId?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderCharge"]>;
export type OrderChargeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    kind?: boolean;
    amountMinor?: boolean;
    currency?: boolean;
    waived?: boolean;
    sampleId?: boolean;
    inspectionId?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderCharge"]>;
export type OrderChargeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    kind?: boolean;
    amountMinor?: boolean;
    currency?: boolean;
    waived?: boolean;
    sampleId?: boolean;
    inspectionId?: boolean;
    createdAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderCharge"]>;
export type OrderChargeSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    kind?: boolean;
    amountMinor?: boolean;
    currency?: boolean;
    waived?: boolean;
    sampleId?: boolean;
    inspectionId?: boolean;
    createdAt?: boolean;
};
export type OrderChargeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "kind" | "amountMinor" | "currency" | "waived" | "sampleId" | "inspectionId" | "createdAt", ExtArgs["result"]["orderCharge"]>;
export type OrderChargeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type OrderChargeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type OrderChargeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $OrderChargePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OrderCharge";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        kind: $Enums.OrderChargeKind;
        amountMinor: bigint;
        currency: $Enums.Currency;
        waived: boolean;
        sampleId: string | null;
        inspectionId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["orderCharge"]>;
    composites: {};
};
export type OrderChargeGetPayload<S extends boolean | null | undefined | OrderChargeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrderChargePayload, S>;
export type OrderChargeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrderChargeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderChargeCountAggregateInputType | true;
};
export interface OrderChargeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OrderCharge'];
        meta: {
            name: 'OrderCharge';
        };
    };
    findUnique<T extends OrderChargeFindUniqueArgs>(args: Prisma.SelectSubset<T, OrderChargeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrderChargeClient<runtime.Types.Result.GetResult<Prisma.$OrderChargePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OrderChargeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrderChargeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderChargeClient<runtime.Types.Result.GetResult<Prisma.$OrderChargePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OrderChargeFindFirstArgs>(args?: Prisma.SelectSubset<T, OrderChargeFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrderChargeClient<runtime.Types.Result.GetResult<Prisma.$OrderChargePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OrderChargeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrderChargeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderChargeClient<runtime.Types.Result.GetResult<Prisma.$OrderChargePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OrderChargeFindManyArgs>(args?: Prisma.SelectSubset<T, OrderChargeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderChargePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OrderChargeCreateArgs>(args: Prisma.SelectSubset<T, OrderChargeCreateArgs<ExtArgs>>): Prisma.Prisma__OrderChargeClient<runtime.Types.Result.GetResult<Prisma.$OrderChargePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OrderChargeCreateManyArgs>(args?: Prisma.SelectSubset<T, OrderChargeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OrderChargeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrderChargeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderChargePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OrderChargeDeleteArgs>(args: Prisma.SelectSubset<T, OrderChargeDeleteArgs<ExtArgs>>): Prisma.Prisma__OrderChargeClient<runtime.Types.Result.GetResult<Prisma.$OrderChargePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OrderChargeUpdateArgs>(args: Prisma.SelectSubset<T, OrderChargeUpdateArgs<ExtArgs>>): Prisma.Prisma__OrderChargeClient<runtime.Types.Result.GetResult<Prisma.$OrderChargePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OrderChargeDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrderChargeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OrderChargeUpdateManyArgs>(args: Prisma.SelectSubset<T, OrderChargeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OrderChargeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrderChargeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderChargePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OrderChargeUpsertArgs>(args: Prisma.SelectSubset<T, OrderChargeUpsertArgs<ExtArgs>>): Prisma.Prisma__OrderChargeClient<runtime.Types.Result.GetResult<Prisma.$OrderChargePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OrderChargeCountArgs>(args?: Prisma.Subset<T, OrderChargeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrderChargeCountAggregateOutputType> : number>;
    aggregate<T extends OrderChargeAggregateArgs>(args: Prisma.Subset<T, OrderChargeAggregateArgs>): Prisma.PrismaPromise<GetOrderChargeAggregateType<T>>;
    groupBy<T extends OrderChargeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrderChargeGroupByArgs['orderBy'];
    } : {
        orderBy?: OrderChargeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrderChargeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderChargeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OrderChargeFieldRefs;
}
export interface Prisma__OrderChargeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OrderChargeFieldRefs {
    readonly id: Prisma.FieldRef<"OrderCharge", 'String'>;
    readonly orderId: Prisma.FieldRef<"OrderCharge", 'String'>;
    readonly kind: Prisma.FieldRef<"OrderCharge", 'OrderChargeKind'>;
    readonly amountMinor: Prisma.FieldRef<"OrderCharge", 'BigInt'>;
    readonly currency: Prisma.FieldRef<"OrderCharge", 'Currency'>;
    readonly waived: Prisma.FieldRef<"OrderCharge", 'Boolean'>;
    readonly sampleId: Prisma.FieldRef<"OrderCharge", 'String'>;
    readonly inspectionId: Prisma.FieldRef<"OrderCharge", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OrderCharge", 'DateTime'>;
}
export type OrderChargeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelect<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    include?: Prisma.OrderChargeInclude<ExtArgs> | null;
    where: Prisma.OrderChargeWhereUniqueInput;
};
export type OrderChargeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelect<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    include?: Prisma.OrderChargeInclude<ExtArgs> | null;
    where: Prisma.OrderChargeWhereUniqueInput;
};
export type OrderChargeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelect<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    include?: Prisma.OrderChargeInclude<ExtArgs> | null;
    where?: Prisma.OrderChargeWhereInput;
    orderBy?: Prisma.OrderChargeOrderByWithRelationInput | Prisma.OrderChargeOrderByWithRelationInput[];
    cursor?: Prisma.OrderChargeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderChargeScalarFieldEnum | Prisma.OrderChargeScalarFieldEnum[];
};
export type OrderChargeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelect<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    include?: Prisma.OrderChargeInclude<ExtArgs> | null;
    where?: Prisma.OrderChargeWhereInput;
    orderBy?: Prisma.OrderChargeOrderByWithRelationInput | Prisma.OrderChargeOrderByWithRelationInput[];
    cursor?: Prisma.OrderChargeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderChargeScalarFieldEnum | Prisma.OrderChargeScalarFieldEnum[];
};
export type OrderChargeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelect<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    include?: Prisma.OrderChargeInclude<ExtArgs> | null;
    where?: Prisma.OrderChargeWhereInput;
    orderBy?: Prisma.OrderChargeOrderByWithRelationInput | Prisma.OrderChargeOrderByWithRelationInput[];
    cursor?: Prisma.OrderChargeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderChargeScalarFieldEnum | Prisma.OrderChargeScalarFieldEnum[];
};
export type OrderChargeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelect<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    include?: Prisma.OrderChargeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderChargeCreateInput, Prisma.OrderChargeUncheckedCreateInput>;
};
export type OrderChargeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OrderChargeCreateManyInput | Prisma.OrderChargeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OrderChargeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    data: Prisma.OrderChargeCreateManyInput | Prisma.OrderChargeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OrderChargeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OrderChargeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelect<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    include?: Prisma.OrderChargeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderChargeUpdateInput, Prisma.OrderChargeUncheckedUpdateInput>;
    where: Prisma.OrderChargeWhereUniqueInput;
};
export type OrderChargeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OrderChargeUpdateManyMutationInput, Prisma.OrderChargeUncheckedUpdateManyInput>;
    where?: Prisma.OrderChargeWhereInput;
    limit?: number;
};
export type OrderChargeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderChargeUpdateManyMutationInput, Prisma.OrderChargeUncheckedUpdateManyInput>;
    where?: Prisma.OrderChargeWhereInput;
    limit?: number;
    include?: Prisma.OrderChargeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OrderChargeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelect<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    include?: Prisma.OrderChargeInclude<ExtArgs> | null;
    where: Prisma.OrderChargeWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderChargeCreateInput, Prisma.OrderChargeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OrderChargeUpdateInput, Prisma.OrderChargeUncheckedUpdateInput>;
};
export type OrderChargeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelect<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    include?: Prisma.OrderChargeInclude<ExtArgs> | null;
    where: Prisma.OrderChargeWhereUniqueInput;
};
export type OrderChargeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderChargeWhereInput;
    limit?: number;
};
export type OrderChargeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderChargeSelect<ExtArgs> | null;
    omit?: Prisma.OrderChargeOmit<ExtArgs> | null;
    include?: Prisma.OrderChargeInclude<ExtArgs> | null;
};
