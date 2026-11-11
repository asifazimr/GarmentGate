import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LogisticsShipmentOrderModel = runtime.Types.Result.DefaultSelection<Prisma.$LogisticsShipmentOrderPayload>;
export type AggregateLogisticsShipmentOrder = {
    _count: LogisticsShipmentOrderCountAggregateOutputType | null;
    _avg: LogisticsShipmentOrderAvgAggregateOutputType | null;
    _sum: LogisticsShipmentOrderSumAggregateOutputType | null;
    _min: LogisticsShipmentOrderMinAggregateOutputType | null;
    _max: LogisticsShipmentOrderMaxAggregateOutputType | null;
};
export type LogisticsShipmentOrderAvgAggregateOutputType = {
    cartons: number | null;
    grossWeightGrams: number | null;
    volumeLitres: number | null;
    buyerShareMinor: number | null;
    costShareMinor: number | null;
};
export type LogisticsShipmentOrderSumAggregateOutputType = {
    cartons: number | null;
    grossWeightGrams: number | null;
    volumeLitres: number | null;
    buyerShareMinor: bigint | null;
    costShareMinor: bigint | null;
};
export type LogisticsShipmentOrderMinAggregateOutputType = {
    shipmentId: string | null;
    orderId: string | null;
    active: boolean | null;
    cartons: number | null;
    grossWeightGrams: number | null;
    volumeLitres: number | null;
    buyerShareMinor: bigint | null;
    costShareMinor: bigint | null;
};
export type LogisticsShipmentOrderMaxAggregateOutputType = {
    shipmentId: string | null;
    orderId: string | null;
    active: boolean | null;
    cartons: number | null;
    grossWeightGrams: number | null;
    volumeLitres: number | null;
    buyerShareMinor: bigint | null;
    costShareMinor: bigint | null;
};
export type LogisticsShipmentOrderCountAggregateOutputType = {
    shipmentId: number;
    orderId: number;
    active: number;
    cartons: number;
    grossWeightGrams: number;
    volumeLitres: number;
    buyerShareMinor: number;
    costShareMinor: number;
    _all: number;
};
export type LogisticsShipmentOrderAvgAggregateInputType = {
    cartons?: true;
    grossWeightGrams?: true;
    volumeLitres?: true;
    buyerShareMinor?: true;
    costShareMinor?: true;
};
export type LogisticsShipmentOrderSumAggregateInputType = {
    cartons?: true;
    grossWeightGrams?: true;
    volumeLitres?: true;
    buyerShareMinor?: true;
    costShareMinor?: true;
};
export type LogisticsShipmentOrderMinAggregateInputType = {
    shipmentId?: true;
    orderId?: true;
    active?: true;
    cartons?: true;
    grossWeightGrams?: true;
    volumeLitres?: true;
    buyerShareMinor?: true;
    costShareMinor?: true;
};
export type LogisticsShipmentOrderMaxAggregateInputType = {
    shipmentId?: true;
    orderId?: true;
    active?: true;
    cartons?: true;
    grossWeightGrams?: true;
    volumeLitres?: true;
    buyerShareMinor?: true;
    costShareMinor?: true;
};
export type LogisticsShipmentOrderCountAggregateInputType = {
    shipmentId?: true;
    orderId?: true;
    active?: true;
    cartons?: true;
    grossWeightGrams?: true;
    volumeLitres?: true;
    buyerShareMinor?: true;
    costShareMinor?: true;
    _all?: true;
};
export type LogisticsShipmentOrderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsShipmentOrderWhereInput;
    orderBy?: Prisma.LogisticsShipmentOrderOrderByWithRelationInput | Prisma.LogisticsShipmentOrderOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsShipmentOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LogisticsShipmentOrderCountAggregateInputType;
    _avg?: LogisticsShipmentOrderAvgAggregateInputType;
    _sum?: LogisticsShipmentOrderSumAggregateInputType;
    _min?: LogisticsShipmentOrderMinAggregateInputType;
    _max?: LogisticsShipmentOrderMaxAggregateInputType;
};
export type GetLogisticsShipmentOrderAggregateType<T extends LogisticsShipmentOrderAggregateArgs> = {
    [P in keyof T & keyof AggregateLogisticsShipmentOrder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLogisticsShipmentOrder[P]> : Prisma.GetScalarType<T[P], AggregateLogisticsShipmentOrder[P]>;
};
export type LogisticsShipmentOrderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsShipmentOrderWhereInput;
    orderBy?: Prisma.LogisticsShipmentOrderOrderByWithAggregationInput | Prisma.LogisticsShipmentOrderOrderByWithAggregationInput[];
    by: Prisma.LogisticsShipmentOrderScalarFieldEnum[] | Prisma.LogisticsShipmentOrderScalarFieldEnum;
    having?: Prisma.LogisticsShipmentOrderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LogisticsShipmentOrderCountAggregateInputType | true;
    _avg?: LogisticsShipmentOrderAvgAggregateInputType;
    _sum?: LogisticsShipmentOrderSumAggregateInputType;
    _min?: LogisticsShipmentOrderMinAggregateInputType;
    _max?: LogisticsShipmentOrderMaxAggregateInputType;
};
export type LogisticsShipmentOrderGroupByOutputType = {
    shipmentId: string;
    orderId: string;
    active: boolean;
    cartons: number;
    grossWeightGrams: number;
    volumeLitres: number;
    buyerShareMinor: bigint;
    costShareMinor: bigint;
    _count: LogisticsShipmentOrderCountAggregateOutputType | null;
    _avg: LogisticsShipmentOrderAvgAggregateOutputType | null;
    _sum: LogisticsShipmentOrderSumAggregateOutputType | null;
    _min: LogisticsShipmentOrderMinAggregateOutputType | null;
    _max: LogisticsShipmentOrderMaxAggregateOutputType | null;
};
export type GetLogisticsShipmentOrderGroupByPayload<T extends LogisticsShipmentOrderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LogisticsShipmentOrderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LogisticsShipmentOrderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LogisticsShipmentOrderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LogisticsShipmentOrderGroupByOutputType[P]>;
}>>;
export type LogisticsShipmentOrderWhereInput = {
    AND?: Prisma.LogisticsShipmentOrderWhereInput | Prisma.LogisticsShipmentOrderWhereInput[];
    OR?: Prisma.LogisticsShipmentOrderWhereInput[];
    NOT?: Prisma.LogisticsShipmentOrderWhereInput | Prisma.LogisticsShipmentOrderWhereInput[];
    shipmentId?: Prisma.UuidFilter<"LogisticsShipmentOrder"> | string;
    orderId?: Prisma.UuidFilter<"LogisticsShipmentOrder"> | string;
    active?: Prisma.BoolFilter<"LogisticsShipmentOrder"> | boolean;
    cartons?: Prisma.IntFilter<"LogisticsShipmentOrder"> | number;
    grossWeightGrams?: Prisma.IntFilter<"LogisticsShipmentOrder"> | number;
    volumeLitres?: Prisma.IntFilter<"LogisticsShipmentOrder"> | number;
    buyerShareMinor?: Prisma.BigIntFilter<"LogisticsShipmentOrder"> | bigint | number;
    costShareMinor?: Prisma.BigIntFilter<"LogisticsShipmentOrder"> | bigint | number;
    shipment?: Prisma.XOR<Prisma.LogisticsShipmentScalarRelationFilter, Prisma.LogisticsShipmentWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
};
export type LogisticsShipmentOrderOrderByWithRelationInput = {
    shipmentId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    cartons?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    buyerShareMinor?: Prisma.SortOrder;
    costShareMinor?: Prisma.SortOrder;
    shipment?: Prisma.LogisticsShipmentOrderByWithRelationInput;
    order?: Prisma.OrderOrderByWithRelationInput;
};
export type LogisticsShipmentOrderWhereUniqueInput = Prisma.AtLeast<{
    shipmentId_orderId?: Prisma.LogisticsShipmentOrderShipmentIdOrderIdCompoundUniqueInput;
    AND?: Prisma.LogisticsShipmentOrderWhereInput | Prisma.LogisticsShipmentOrderWhereInput[];
    OR?: Prisma.LogisticsShipmentOrderWhereInput[];
    NOT?: Prisma.LogisticsShipmentOrderWhereInput | Prisma.LogisticsShipmentOrderWhereInput[];
    shipmentId?: Prisma.UuidFilter<"LogisticsShipmentOrder"> | string;
    orderId?: Prisma.UuidFilter<"LogisticsShipmentOrder"> | string;
    active?: Prisma.BoolFilter<"LogisticsShipmentOrder"> | boolean;
    cartons?: Prisma.IntFilter<"LogisticsShipmentOrder"> | number;
    grossWeightGrams?: Prisma.IntFilter<"LogisticsShipmentOrder"> | number;
    volumeLitres?: Prisma.IntFilter<"LogisticsShipmentOrder"> | number;
    buyerShareMinor?: Prisma.BigIntFilter<"LogisticsShipmentOrder"> | bigint | number;
    costShareMinor?: Prisma.BigIntFilter<"LogisticsShipmentOrder"> | bigint | number;
    shipment?: Prisma.XOR<Prisma.LogisticsShipmentScalarRelationFilter, Prisma.LogisticsShipmentWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
}, "shipmentId_orderId">;
export type LogisticsShipmentOrderOrderByWithAggregationInput = {
    shipmentId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    cartons?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    buyerShareMinor?: Prisma.SortOrder;
    costShareMinor?: Prisma.SortOrder;
    _count?: Prisma.LogisticsShipmentOrderCountOrderByAggregateInput;
    _avg?: Prisma.LogisticsShipmentOrderAvgOrderByAggregateInput;
    _max?: Prisma.LogisticsShipmentOrderMaxOrderByAggregateInput;
    _min?: Prisma.LogisticsShipmentOrderMinOrderByAggregateInput;
    _sum?: Prisma.LogisticsShipmentOrderSumOrderByAggregateInput;
};
export type LogisticsShipmentOrderScalarWhereWithAggregatesInput = {
    AND?: Prisma.LogisticsShipmentOrderScalarWhereWithAggregatesInput | Prisma.LogisticsShipmentOrderScalarWhereWithAggregatesInput[];
    OR?: Prisma.LogisticsShipmentOrderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LogisticsShipmentOrderScalarWhereWithAggregatesInput | Prisma.LogisticsShipmentOrderScalarWhereWithAggregatesInput[];
    shipmentId?: Prisma.UuidWithAggregatesFilter<"LogisticsShipmentOrder"> | string;
    orderId?: Prisma.UuidWithAggregatesFilter<"LogisticsShipmentOrder"> | string;
    active?: Prisma.BoolWithAggregatesFilter<"LogisticsShipmentOrder"> | boolean;
    cartons?: Prisma.IntWithAggregatesFilter<"LogisticsShipmentOrder"> | number;
    grossWeightGrams?: Prisma.IntWithAggregatesFilter<"LogisticsShipmentOrder"> | number;
    volumeLitres?: Prisma.IntWithAggregatesFilter<"LogisticsShipmentOrder"> | number;
    buyerShareMinor?: Prisma.BigIntWithAggregatesFilter<"LogisticsShipmentOrder"> | bigint | number;
    costShareMinor?: Prisma.BigIntWithAggregatesFilter<"LogisticsShipmentOrder"> | bigint | number;
};
export type LogisticsShipmentOrderCreateInput = {
    active?: boolean;
    cartons: number;
    grossWeightGrams: number;
    volumeLitres: number;
    buyerShareMinor: bigint | number;
    costShareMinor: bigint | number;
    shipment: Prisma.LogisticsShipmentCreateNestedOneWithoutOrdersInput;
    order: Prisma.OrderCreateNestedOneWithoutLogisticsShipmentsInput;
};
export type LogisticsShipmentOrderUncheckedCreateInput = {
    shipmentId: string;
    orderId: string;
    active?: boolean;
    cartons: number;
    grossWeightGrams: number;
    volumeLitres: number;
    buyerShareMinor: bigint | number;
    costShareMinor: bigint | number;
};
export type LogisticsShipmentOrderUpdateInput = {
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    costShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    shipment?: Prisma.LogisticsShipmentUpdateOneRequiredWithoutOrdersNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutLogisticsShipmentsNestedInput;
};
export type LogisticsShipmentOrderUncheckedUpdateInput = {
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    costShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LogisticsShipmentOrderCreateManyInput = {
    shipmentId: string;
    orderId: string;
    active?: boolean;
    cartons: number;
    grossWeightGrams: number;
    volumeLitres: number;
    buyerShareMinor: bigint | number;
    costShareMinor: bigint | number;
};
export type LogisticsShipmentOrderUpdateManyMutationInput = {
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    costShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LogisticsShipmentOrderUncheckedUpdateManyInput = {
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    costShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LogisticsShipmentOrderListRelationFilter = {
    every?: Prisma.LogisticsShipmentOrderWhereInput;
    some?: Prisma.LogisticsShipmentOrderWhereInput;
    none?: Prisma.LogisticsShipmentOrderWhereInput;
};
export type LogisticsShipmentOrderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LogisticsShipmentOrderShipmentIdOrderIdCompoundUniqueInput = {
    shipmentId: string;
    orderId: string;
};
export type LogisticsShipmentOrderCountOrderByAggregateInput = {
    shipmentId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    cartons?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    buyerShareMinor?: Prisma.SortOrder;
    costShareMinor?: Prisma.SortOrder;
};
export type LogisticsShipmentOrderAvgOrderByAggregateInput = {
    cartons?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    buyerShareMinor?: Prisma.SortOrder;
    costShareMinor?: Prisma.SortOrder;
};
export type LogisticsShipmentOrderMaxOrderByAggregateInput = {
    shipmentId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    cartons?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    buyerShareMinor?: Prisma.SortOrder;
    costShareMinor?: Prisma.SortOrder;
};
export type LogisticsShipmentOrderMinOrderByAggregateInput = {
    shipmentId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    cartons?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    buyerShareMinor?: Prisma.SortOrder;
    costShareMinor?: Prisma.SortOrder;
};
export type LogisticsShipmentOrderSumOrderByAggregateInput = {
    cartons?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    buyerShareMinor?: Prisma.SortOrder;
    costShareMinor?: Prisma.SortOrder;
};
export type LogisticsShipmentOrderCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutOrderInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutOrderInput> | Prisma.LogisticsShipmentOrderCreateWithoutOrderInput[] | Prisma.LogisticsShipmentOrderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LogisticsShipmentOrderCreateOrConnectWithoutOrderInput | Prisma.LogisticsShipmentOrderCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.LogisticsShipmentOrderCreateManyOrderInputEnvelope;
    connect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
};
export type LogisticsShipmentOrderUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutOrderInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutOrderInput> | Prisma.LogisticsShipmentOrderCreateWithoutOrderInput[] | Prisma.LogisticsShipmentOrderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LogisticsShipmentOrderCreateOrConnectWithoutOrderInput | Prisma.LogisticsShipmentOrderCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.LogisticsShipmentOrderCreateManyOrderInputEnvelope;
    connect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
};
export type LogisticsShipmentOrderUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutOrderInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutOrderInput> | Prisma.LogisticsShipmentOrderCreateWithoutOrderInput[] | Prisma.LogisticsShipmentOrderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LogisticsShipmentOrderCreateOrConnectWithoutOrderInput | Prisma.LogisticsShipmentOrderCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.LogisticsShipmentOrderUpsertWithWhereUniqueWithoutOrderInput | Prisma.LogisticsShipmentOrderUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.LogisticsShipmentOrderCreateManyOrderInputEnvelope;
    set?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    disconnect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    delete?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    connect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    update?: Prisma.LogisticsShipmentOrderUpdateWithWhereUniqueWithoutOrderInput | Prisma.LogisticsShipmentOrderUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.LogisticsShipmentOrderUpdateManyWithWhereWithoutOrderInput | Prisma.LogisticsShipmentOrderUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.LogisticsShipmentOrderScalarWhereInput | Prisma.LogisticsShipmentOrderScalarWhereInput[];
};
export type LogisticsShipmentOrderUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutOrderInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutOrderInput> | Prisma.LogisticsShipmentOrderCreateWithoutOrderInput[] | Prisma.LogisticsShipmentOrderUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LogisticsShipmentOrderCreateOrConnectWithoutOrderInput | Prisma.LogisticsShipmentOrderCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.LogisticsShipmentOrderUpsertWithWhereUniqueWithoutOrderInput | Prisma.LogisticsShipmentOrderUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.LogisticsShipmentOrderCreateManyOrderInputEnvelope;
    set?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    disconnect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    delete?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    connect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    update?: Prisma.LogisticsShipmentOrderUpdateWithWhereUniqueWithoutOrderInput | Prisma.LogisticsShipmentOrderUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.LogisticsShipmentOrderUpdateManyWithWhereWithoutOrderInput | Prisma.LogisticsShipmentOrderUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.LogisticsShipmentOrderScalarWhereInput | Prisma.LogisticsShipmentOrderScalarWhereInput[];
};
export type LogisticsShipmentOrderCreateNestedManyWithoutShipmentInput = {
    create?: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutShipmentInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutShipmentInput> | Prisma.LogisticsShipmentOrderCreateWithoutShipmentInput[] | Prisma.LogisticsShipmentOrderUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.LogisticsShipmentOrderCreateOrConnectWithoutShipmentInput | Prisma.LogisticsShipmentOrderCreateOrConnectWithoutShipmentInput[];
    createMany?: Prisma.LogisticsShipmentOrderCreateManyShipmentInputEnvelope;
    connect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
};
export type LogisticsShipmentOrderUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutShipmentInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutShipmentInput> | Prisma.LogisticsShipmentOrderCreateWithoutShipmentInput[] | Prisma.LogisticsShipmentOrderUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.LogisticsShipmentOrderCreateOrConnectWithoutShipmentInput | Prisma.LogisticsShipmentOrderCreateOrConnectWithoutShipmentInput[];
    createMany?: Prisma.LogisticsShipmentOrderCreateManyShipmentInputEnvelope;
    connect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
};
export type LogisticsShipmentOrderUpdateManyWithoutShipmentNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutShipmentInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutShipmentInput> | Prisma.LogisticsShipmentOrderCreateWithoutShipmentInput[] | Prisma.LogisticsShipmentOrderUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.LogisticsShipmentOrderCreateOrConnectWithoutShipmentInput | Prisma.LogisticsShipmentOrderCreateOrConnectWithoutShipmentInput[];
    upsert?: Prisma.LogisticsShipmentOrderUpsertWithWhereUniqueWithoutShipmentInput | Prisma.LogisticsShipmentOrderUpsertWithWhereUniqueWithoutShipmentInput[];
    createMany?: Prisma.LogisticsShipmentOrderCreateManyShipmentInputEnvelope;
    set?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    disconnect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    delete?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    connect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    update?: Prisma.LogisticsShipmentOrderUpdateWithWhereUniqueWithoutShipmentInput | Prisma.LogisticsShipmentOrderUpdateWithWhereUniqueWithoutShipmentInput[];
    updateMany?: Prisma.LogisticsShipmentOrderUpdateManyWithWhereWithoutShipmentInput | Prisma.LogisticsShipmentOrderUpdateManyWithWhereWithoutShipmentInput[];
    deleteMany?: Prisma.LogisticsShipmentOrderScalarWhereInput | Prisma.LogisticsShipmentOrderScalarWhereInput[];
};
export type LogisticsShipmentOrderUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutShipmentInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutShipmentInput> | Prisma.LogisticsShipmentOrderCreateWithoutShipmentInput[] | Prisma.LogisticsShipmentOrderUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.LogisticsShipmentOrderCreateOrConnectWithoutShipmentInput | Prisma.LogisticsShipmentOrderCreateOrConnectWithoutShipmentInput[];
    upsert?: Prisma.LogisticsShipmentOrderUpsertWithWhereUniqueWithoutShipmentInput | Prisma.LogisticsShipmentOrderUpsertWithWhereUniqueWithoutShipmentInput[];
    createMany?: Prisma.LogisticsShipmentOrderCreateManyShipmentInputEnvelope;
    set?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    disconnect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    delete?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    connect?: Prisma.LogisticsShipmentOrderWhereUniqueInput | Prisma.LogisticsShipmentOrderWhereUniqueInput[];
    update?: Prisma.LogisticsShipmentOrderUpdateWithWhereUniqueWithoutShipmentInput | Prisma.LogisticsShipmentOrderUpdateWithWhereUniqueWithoutShipmentInput[];
    updateMany?: Prisma.LogisticsShipmentOrderUpdateManyWithWhereWithoutShipmentInput | Prisma.LogisticsShipmentOrderUpdateManyWithWhereWithoutShipmentInput[];
    deleteMany?: Prisma.LogisticsShipmentOrderScalarWhereInput | Prisma.LogisticsShipmentOrderScalarWhereInput[];
};
export type LogisticsShipmentOrderCreateWithoutOrderInput = {
    active?: boolean;
    cartons: number;
    grossWeightGrams: number;
    volumeLitres: number;
    buyerShareMinor: bigint | number;
    costShareMinor: bigint | number;
    shipment: Prisma.LogisticsShipmentCreateNestedOneWithoutOrdersInput;
};
export type LogisticsShipmentOrderUncheckedCreateWithoutOrderInput = {
    shipmentId: string;
    active?: boolean;
    cartons: number;
    grossWeightGrams: number;
    volumeLitres: number;
    buyerShareMinor: bigint | number;
    costShareMinor: bigint | number;
};
export type LogisticsShipmentOrderCreateOrConnectWithoutOrderInput = {
    where: Prisma.LogisticsShipmentOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutOrderInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutOrderInput>;
};
export type LogisticsShipmentOrderCreateManyOrderInputEnvelope = {
    data: Prisma.LogisticsShipmentOrderCreateManyOrderInput | Prisma.LogisticsShipmentOrderCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type LogisticsShipmentOrderUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.LogisticsShipmentOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.LogisticsShipmentOrderUpdateWithoutOrderInput, Prisma.LogisticsShipmentOrderUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutOrderInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutOrderInput>;
};
export type LogisticsShipmentOrderUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.LogisticsShipmentOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.LogisticsShipmentOrderUpdateWithoutOrderInput, Prisma.LogisticsShipmentOrderUncheckedUpdateWithoutOrderInput>;
};
export type LogisticsShipmentOrderUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.LogisticsShipmentOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.LogisticsShipmentOrderUpdateManyMutationInput, Prisma.LogisticsShipmentOrderUncheckedUpdateManyWithoutOrderInput>;
};
export type LogisticsShipmentOrderScalarWhereInput = {
    AND?: Prisma.LogisticsShipmentOrderScalarWhereInput | Prisma.LogisticsShipmentOrderScalarWhereInput[];
    OR?: Prisma.LogisticsShipmentOrderScalarWhereInput[];
    NOT?: Prisma.LogisticsShipmentOrderScalarWhereInput | Prisma.LogisticsShipmentOrderScalarWhereInput[];
    shipmentId?: Prisma.UuidFilter<"LogisticsShipmentOrder"> | string;
    orderId?: Prisma.UuidFilter<"LogisticsShipmentOrder"> | string;
    active?: Prisma.BoolFilter<"LogisticsShipmentOrder"> | boolean;
    cartons?: Prisma.IntFilter<"LogisticsShipmentOrder"> | number;
    grossWeightGrams?: Prisma.IntFilter<"LogisticsShipmentOrder"> | number;
    volumeLitres?: Prisma.IntFilter<"LogisticsShipmentOrder"> | number;
    buyerShareMinor?: Prisma.BigIntFilter<"LogisticsShipmentOrder"> | bigint | number;
    costShareMinor?: Prisma.BigIntFilter<"LogisticsShipmentOrder"> | bigint | number;
};
export type LogisticsShipmentOrderCreateWithoutShipmentInput = {
    active?: boolean;
    cartons: number;
    grossWeightGrams: number;
    volumeLitres: number;
    buyerShareMinor: bigint | number;
    costShareMinor: bigint | number;
    order: Prisma.OrderCreateNestedOneWithoutLogisticsShipmentsInput;
};
export type LogisticsShipmentOrderUncheckedCreateWithoutShipmentInput = {
    orderId: string;
    active?: boolean;
    cartons: number;
    grossWeightGrams: number;
    volumeLitres: number;
    buyerShareMinor: bigint | number;
    costShareMinor: bigint | number;
};
export type LogisticsShipmentOrderCreateOrConnectWithoutShipmentInput = {
    where: Prisma.LogisticsShipmentOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutShipmentInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutShipmentInput>;
};
export type LogisticsShipmentOrderCreateManyShipmentInputEnvelope = {
    data: Prisma.LogisticsShipmentOrderCreateManyShipmentInput | Prisma.LogisticsShipmentOrderCreateManyShipmentInput[];
    skipDuplicates?: boolean;
};
export type LogisticsShipmentOrderUpsertWithWhereUniqueWithoutShipmentInput = {
    where: Prisma.LogisticsShipmentOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.LogisticsShipmentOrderUpdateWithoutShipmentInput, Prisma.LogisticsShipmentOrderUncheckedUpdateWithoutShipmentInput>;
    create: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateWithoutShipmentInput, Prisma.LogisticsShipmentOrderUncheckedCreateWithoutShipmentInput>;
};
export type LogisticsShipmentOrderUpdateWithWhereUniqueWithoutShipmentInput = {
    where: Prisma.LogisticsShipmentOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.LogisticsShipmentOrderUpdateWithoutShipmentInput, Prisma.LogisticsShipmentOrderUncheckedUpdateWithoutShipmentInput>;
};
export type LogisticsShipmentOrderUpdateManyWithWhereWithoutShipmentInput = {
    where: Prisma.LogisticsShipmentOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.LogisticsShipmentOrderUpdateManyMutationInput, Prisma.LogisticsShipmentOrderUncheckedUpdateManyWithoutShipmentInput>;
};
export type LogisticsShipmentOrderCreateManyOrderInput = {
    shipmentId: string;
    active?: boolean;
    cartons: number;
    grossWeightGrams: number;
    volumeLitres: number;
    buyerShareMinor: bigint | number;
    costShareMinor: bigint | number;
};
export type LogisticsShipmentOrderUpdateWithoutOrderInput = {
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    costShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    shipment?: Prisma.LogisticsShipmentUpdateOneRequiredWithoutOrdersNestedInput;
};
export type LogisticsShipmentOrderUncheckedUpdateWithoutOrderInput = {
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    costShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LogisticsShipmentOrderUncheckedUpdateManyWithoutOrderInput = {
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    costShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LogisticsShipmentOrderCreateManyShipmentInput = {
    orderId: string;
    active?: boolean;
    cartons: number;
    grossWeightGrams: number;
    volumeLitres: number;
    buyerShareMinor: bigint | number;
    costShareMinor: bigint | number;
};
export type LogisticsShipmentOrderUpdateWithoutShipmentInput = {
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    costShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    order?: Prisma.OrderUpdateOneRequiredWithoutLogisticsShipmentsNestedInput;
};
export type LogisticsShipmentOrderUncheckedUpdateWithoutShipmentInput = {
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    costShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LogisticsShipmentOrderUncheckedUpdateManyWithoutShipmentInput = {
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    costShareMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LogisticsShipmentOrderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    shipmentId?: boolean;
    orderId?: boolean;
    active?: boolean;
    cartons?: boolean;
    grossWeightGrams?: boolean;
    volumeLitres?: boolean;
    buyerShareMinor?: boolean;
    costShareMinor?: boolean;
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["logisticsShipmentOrder"]>;
export type LogisticsShipmentOrderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    shipmentId?: boolean;
    orderId?: boolean;
    active?: boolean;
    cartons?: boolean;
    grossWeightGrams?: boolean;
    volumeLitres?: boolean;
    buyerShareMinor?: boolean;
    costShareMinor?: boolean;
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["logisticsShipmentOrder"]>;
export type LogisticsShipmentOrderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    shipmentId?: boolean;
    orderId?: boolean;
    active?: boolean;
    cartons?: boolean;
    grossWeightGrams?: boolean;
    volumeLitres?: boolean;
    buyerShareMinor?: boolean;
    costShareMinor?: boolean;
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["logisticsShipmentOrder"]>;
export type LogisticsShipmentOrderSelectScalar = {
    shipmentId?: boolean;
    orderId?: boolean;
    active?: boolean;
    cartons?: boolean;
    grossWeightGrams?: boolean;
    volumeLitres?: boolean;
    buyerShareMinor?: boolean;
    costShareMinor?: boolean;
};
export type LogisticsShipmentOrderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"shipmentId" | "orderId" | "active" | "cartons" | "grossWeightGrams" | "volumeLitres" | "buyerShareMinor" | "costShareMinor", ExtArgs["result"]["logisticsShipmentOrder"]>;
export type LogisticsShipmentOrderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type LogisticsShipmentOrderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type LogisticsShipmentOrderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $LogisticsShipmentOrderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LogisticsShipmentOrder";
    objects: {
        shipment: Prisma.$LogisticsShipmentPayload<ExtArgs>;
        order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        shipmentId: string;
        orderId: string;
        active: boolean;
        cartons: number;
        grossWeightGrams: number;
        volumeLitres: number;
        buyerShareMinor: bigint;
        costShareMinor: bigint;
    }, ExtArgs["result"]["logisticsShipmentOrder"]>;
    composites: {};
};
export type LogisticsShipmentOrderGetPayload<S extends boolean | null | undefined | LogisticsShipmentOrderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload, S>;
export type LogisticsShipmentOrderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LogisticsShipmentOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LogisticsShipmentOrderCountAggregateInputType | true;
};
export interface LogisticsShipmentOrderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LogisticsShipmentOrder'];
        meta: {
            name: 'LogisticsShipmentOrder';
        };
    };
    findUnique<T extends LogisticsShipmentOrderFindUniqueArgs>(args: Prisma.SelectSubset<T, LogisticsShipmentOrderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LogisticsShipmentOrderClient<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LogisticsShipmentOrderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LogisticsShipmentOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LogisticsShipmentOrderClient<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LogisticsShipmentOrderFindFirstArgs>(args?: Prisma.SelectSubset<T, LogisticsShipmentOrderFindFirstArgs<ExtArgs>>): Prisma.Prisma__LogisticsShipmentOrderClient<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LogisticsShipmentOrderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LogisticsShipmentOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LogisticsShipmentOrderClient<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LogisticsShipmentOrderFindManyArgs>(args?: Prisma.SelectSubset<T, LogisticsShipmentOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LogisticsShipmentOrderCreateArgs>(args: Prisma.SelectSubset<T, LogisticsShipmentOrderCreateArgs<ExtArgs>>): Prisma.Prisma__LogisticsShipmentOrderClient<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LogisticsShipmentOrderCreateManyArgs>(args?: Prisma.SelectSubset<T, LogisticsShipmentOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LogisticsShipmentOrderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LogisticsShipmentOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LogisticsShipmentOrderDeleteArgs>(args: Prisma.SelectSubset<T, LogisticsShipmentOrderDeleteArgs<ExtArgs>>): Prisma.Prisma__LogisticsShipmentOrderClient<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LogisticsShipmentOrderUpdateArgs>(args: Prisma.SelectSubset<T, LogisticsShipmentOrderUpdateArgs<ExtArgs>>): Prisma.Prisma__LogisticsShipmentOrderClient<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LogisticsShipmentOrderDeleteManyArgs>(args?: Prisma.SelectSubset<T, LogisticsShipmentOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LogisticsShipmentOrderUpdateManyArgs>(args: Prisma.SelectSubset<T, LogisticsShipmentOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LogisticsShipmentOrderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LogisticsShipmentOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LogisticsShipmentOrderUpsertArgs>(args: Prisma.SelectSubset<T, LogisticsShipmentOrderUpsertArgs<ExtArgs>>): Prisma.Prisma__LogisticsShipmentOrderClient<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LogisticsShipmentOrderCountArgs>(args?: Prisma.Subset<T, LogisticsShipmentOrderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LogisticsShipmentOrderCountAggregateOutputType> : number>;
    aggregate<T extends LogisticsShipmentOrderAggregateArgs>(args: Prisma.Subset<T, LogisticsShipmentOrderAggregateArgs>): Prisma.PrismaPromise<GetLogisticsShipmentOrderAggregateType<T>>;
    groupBy<T extends LogisticsShipmentOrderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LogisticsShipmentOrderGroupByArgs['orderBy'];
    } : {
        orderBy?: LogisticsShipmentOrderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LogisticsShipmentOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogisticsShipmentOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LogisticsShipmentOrderFieldRefs;
}
export interface Prisma__LogisticsShipmentOrderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shipment<T extends Prisma.LogisticsShipmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LogisticsShipmentDefaultArgs<ExtArgs>>): Prisma.Prisma__LogisticsShipmentClient<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LogisticsShipmentOrderFieldRefs {
    readonly shipmentId: Prisma.FieldRef<"LogisticsShipmentOrder", 'String'>;
    readonly orderId: Prisma.FieldRef<"LogisticsShipmentOrder", 'String'>;
    readonly active: Prisma.FieldRef<"LogisticsShipmentOrder", 'Boolean'>;
    readonly cartons: Prisma.FieldRef<"LogisticsShipmentOrder", 'Int'>;
    readonly grossWeightGrams: Prisma.FieldRef<"LogisticsShipmentOrder", 'Int'>;
    readonly volumeLitres: Prisma.FieldRef<"LogisticsShipmentOrder", 'Int'>;
    readonly buyerShareMinor: Prisma.FieldRef<"LogisticsShipmentOrder", 'BigInt'>;
    readonly costShareMinor: Prisma.FieldRef<"LogisticsShipmentOrder", 'BigInt'>;
}
export type LogisticsShipmentOrderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentOrderInclude<ExtArgs> | null;
    where: Prisma.LogisticsShipmentOrderWhereUniqueInput;
};
export type LogisticsShipmentOrderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentOrderInclude<ExtArgs> | null;
    where: Prisma.LogisticsShipmentOrderWhereUniqueInput;
};
export type LogisticsShipmentOrderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentOrderInclude<ExtArgs> | null;
    where?: Prisma.LogisticsShipmentOrderWhereInput;
    orderBy?: Prisma.LogisticsShipmentOrderOrderByWithRelationInput | Prisma.LogisticsShipmentOrderOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsShipmentOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsShipmentOrderScalarFieldEnum | Prisma.LogisticsShipmentOrderScalarFieldEnum[];
};
export type LogisticsShipmentOrderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentOrderInclude<ExtArgs> | null;
    where?: Prisma.LogisticsShipmentOrderWhereInput;
    orderBy?: Prisma.LogisticsShipmentOrderOrderByWithRelationInput | Prisma.LogisticsShipmentOrderOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsShipmentOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsShipmentOrderScalarFieldEnum | Prisma.LogisticsShipmentOrderScalarFieldEnum[];
};
export type LogisticsShipmentOrderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentOrderInclude<ExtArgs> | null;
    where?: Prisma.LogisticsShipmentOrderWhereInput;
    orderBy?: Prisma.LogisticsShipmentOrderOrderByWithRelationInput | Prisma.LogisticsShipmentOrderOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsShipmentOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsShipmentOrderScalarFieldEnum | Prisma.LogisticsShipmentOrderScalarFieldEnum[];
};
export type LogisticsShipmentOrderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentOrderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateInput, Prisma.LogisticsShipmentOrderUncheckedCreateInput>;
};
export type LogisticsShipmentOrderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LogisticsShipmentOrderCreateManyInput | Prisma.LogisticsShipmentOrderCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LogisticsShipmentOrderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    data: Prisma.LogisticsShipmentOrderCreateManyInput | Prisma.LogisticsShipmentOrderCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LogisticsShipmentOrderIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LogisticsShipmentOrderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentOrderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsShipmentOrderUpdateInput, Prisma.LogisticsShipmentOrderUncheckedUpdateInput>;
    where: Prisma.LogisticsShipmentOrderWhereUniqueInput;
};
export type LogisticsShipmentOrderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LogisticsShipmentOrderUpdateManyMutationInput, Prisma.LogisticsShipmentOrderUncheckedUpdateManyInput>;
    where?: Prisma.LogisticsShipmentOrderWhereInput;
    limit?: number;
};
export type LogisticsShipmentOrderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsShipmentOrderUpdateManyMutationInput, Prisma.LogisticsShipmentOrderUncheckedUpdateManyInput>;
    where?: Prisma.LogisticsShipmentOrderWhereInput;
    limit?: number;
    include?: Prisma.LogisticsShipmentOrderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LogisticsShipmentOrderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentOrderInclude<ExtArgs> | null;
    where: Prisma.LogisticsShipmentOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsShipmentOrderCreateInput, Prisma.LogisticsShipmentOrderUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LogisticsShipmentOrderUpdateInput, Prisma.LogisticsShipmentOrderUncheckedUpdateInput>;
};
export type LogisticsShipmentOrderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentOrderInclude<ExtArgs> | null;
    where: Prisma.LogisticsShipmentOrderWhereUniqueInput;
};
export type LogisticsShipmentOrderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsShipmentOrderWhereInput;
    limit?: number;
};
export type LogisticsShipmentOrderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentOrderSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOrderOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentOrderInclude<ExtArgs> | null;
};
