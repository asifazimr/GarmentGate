import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OrderPackingModel = runtime.Types.Result.DefaultSelection<Prisma.$OrderPackingPayload>;
export type AggregateOrderPacking = {
    _count: OrderPackingCountAggregateOutputType | null;
    _avg: OrderPackingAvgAggregateOutputType | null;
    _sum: OrderPackingSumAggregateOutputType | null;
    _min: OrderPackingMinAggregateOutputType | null;
    _max: OrderPackingMaxAggregateOutputType | null;
};
export type OrderPackingAvgAggregateOutputType = {
    cartons: number | null;
    piecesPerCarton: number | null;
    grossWeightGrams: number | null;
    netWeightGrams: number | null;
    volumeLitres: number | null;
    cartonLengthCm: number | null;
    cartonWidthCm: number | null;
    cartonHeightCm: number | null;
};
export type OrderPackingSumAggregateOutputType = {
    cartons: number | null;
    piecesPerCarton: number | null;
    grossWeightGrams: number | null;
    netWeightGrams: number | null;
    volumeLitres: number | null;
    cartonLengthCm: number | null;
    cartonWidthCm: number | null;
    cartonHeightCm: number | null;
};
export type OrderPackingMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    cartons: number | null;
    piecesPerCarton: number | null;
    grossWeightGrams: number | null;
    netWeightGrams: number | null;
    volumeLitres: number | null;
    cartonLengthCm: number | null;
    cartonWidthCm: number | null;
    cartonHeightCm: number | null;
    updatedById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OrderPackingMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    cartons: number | null;
    piecesPerCarton: number | null;
    grossWeightGrams: number | null;
    netWeightGrams: number | null;
    volumeLitres: number | null;
    cartonLengthCm: number | null;
    cartonWidthCm: number | null;
    cartonHeightCm: number | null;
    updatedById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OrderPackingCountAggregateOutputType = {
    id: number;
    orderId: number;
    cartons: number;
    piecesPerCarton: number;
    grossWeightGrams: number;
    netWeightGrams: number;
    volumeLitres: number;
    cartonLengthCm: number;
    cartonWidthCm: number;
    cartonHeightCm: number;
    updatedById: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OrderPackingAvgAggregateInputType = {
    cartons?: true;
    piecesPerCarton?: true;
    grossWeightGrams?: true;
    netWeightGrams?: true;
    volumeLitres?: true;
    cartonLengthCm?: true;
    cartonWidthCm?: true;
    cartonHeightCm?: true;
};
export type OrderPackingSumAggregateInputType = {
    cartons?: true;
    piecesPerCarton?: true;
    grossWeightGrams?: true;
    netWeightGrams?: true;
    volumeLitres?: true;
    cartonLengthCm?: true;
    cartonWidthCm?: true;
    cartonHeightCm?: true;
};
export type OrderPackingMinAggregateInputType = {
    id?: true;
    orderId?: true;
    cartons?: true;
    piecesPerCarton?: true;
    grossWeightGrams?: true;
    netWeightGrams?: true;
    volumeLitres?: true;
    cartonLengthCm?: true;
    cartonWidthCm?: true;
    cartonHeightCm?: true;
    updatedById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OrderPackingMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    cartons?: true;
    piecesPerCarton?: true;
    grossWeightGrams?: true;
    netWeightGrams?: true;
    volumeLitres?: true;
    cartonLengthCm?: true;
    cartonWidthCm?: true;
    cartonHeightCm?: true;
    updatedById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OrderPackingCountAggregateInputType = {
    id?: true;
    orderId?: true;
    cartons?: true;
    piecesPerCarton?: true;
    grossWeightGrams?: true;
    netWeightGrams?: true;
    volumeLitres?: true;
    cartonLengthCm?: true;
    cartonWidthCm?: true;
    cartonHeightCm?: true;
    updatedById?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OrderPackingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderPackingWhereInput;
    orderBy?: Prisma.OrderPackingOrderByWithRelationInput | Prisma.OrderPackingOrderByWithRelationInput[];
    cursor?: Prisma.OrderPackingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OrderPackingCountAggregateInputType;
    _avg?: OrderPackingAvgAggregateInputType;
    _sum?: OrderPackingSumAggregateInputType;
    _min?: OrderPackingMinAggregateInputType;
    _max?: OrderPackingMaxAggregateInputType;
};
export type GetOrderPackingAggregateType<T extends OrderPackingAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderPacking]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrderPacking[P]> : Prisma.GetScalarType<T[P], AggregateOrderPacking[P]>;
};
export type OrderPackingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderPackingWhereInput;
    orderBy?: Prisma.OrderPackingOrderByWithAggregationInput | Prisma.OrderPackingOrderByWithAggregationInput[];
    by: Prisma.OrderPackingScalarFieldEnum[] | Prisma.OrderPackingScalarFieldEnum;
    having?: Prisma.OrderPackingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderPackingCountAggregateInputType | true;
    _avg?: OrderPackingAvgAggregateInputType;
    _sum?: OrderPackingSumAggregateInputType;
    _min?: OrderPackingMinAggregateInputType;
    _max?: OrderPackingMaxAggregateInputType;
};
export type OrderPackingGroupByOutputType = {
    id: string;
    orderId: string;
    cartons: number;
    piecesPerCarton: number | null;
    grossWeightGrams: number;
    netWeightGrams: number | null;
    volumeLitres: number;
    cartonLengthCm: number | null;
    cartonWidthCm: number | null;
    cartonHeightCm: number | null;
    updatedById: string;
    createdAt: Date;
    updatedAt: Date;
    _count: OrderPackingCountAggregateOutputType | null;
    _avg: OrderPackingAvgAggregateOutputType | null;
    _sum: OrderPackingSumAggregateOutputType | null;
    _min: OrderPackingMinAggregateOutputType | null;
    _max: OrderPackingMaxAggregateOutputType | null;
};
export type GetOrderPackingGroupByPayload<T extends OrderPackingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrderPackingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrderPackingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrderPackingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrderPackingGroupByOutputType[P]>;
}>>;
export type OrderPackingWhereInput = {
    AND?: Prisma.OrderPackingWhereInput | Prisma.OrderPackingWhereInput[];
    OR?: Prisma.OrderPackingWhereInput[];
    NOT?: Prisma.OrderPackingWhereInput | Prisma.OrderPackingWhereInput[];
    id?: Prisma.UuidFilter<"OrderPacking"> | string;
    orderId?: Prisma.UuidFilter<"OrderPacking"> | string;
    cartons?: Prisma.IntFilter<"OrderPacking"> | number;
    piecesPerCarton?: Prisma.IntNullableFilter<"OrderPacking"> | number | null;
    grossWeightGrams?: Prisma.IntFilter<"OrderPacking"> | number;
    netWeightGrams?: Prisma.IntNullableFilter<"OrderPacking"> | number | null;
    volumeLitres?: Prisma.IntFilter<"OrderPacking"> | number;
    cartonLengthCm?: Prisma.IntNullableFilter<"OrderPacking"> | number | null;
    cartonWidthCm?: Prisma.IntNullableFilter<"OrderPacking"> | number | null;
    cartonHeightCm?: Prisma.IntNullableFilter<"OrderPacking"> | number | null;
    updatedById?: Prisma.UuidFilter<"OrderPacking"> | string;
    createdAt?: Prisma.DateTimeFilter<"OrderPacking"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OrderPacking"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
};
export type OrderPackingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    cartons?: Prisma.SortOrder;
    piecesPerCarton?: Prisma.SortOrderInput | Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    netWeightGrams?: Prisma.SortOrderInput | Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    cartonLengthCm?: Prisma.SortOrderInput | Prisma.SortOrder;
    cartonWidthCm?: Prisma.SortOrderInput | Prisma.SortOrder;
    cartonHeightCm?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
};
export type OrderPackingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    orderId?: string;
    AND?: Prisma.OrderPackingWhereInput | Prisma.OrderPackingWhereInput[];
    OR?: Prisma.OrderPackingWhereInput[];
    NOT?: Prisma.OrderPackingWhereInput | Prisma.OrderPackingWhereInput[];
    cartons?: Prisma.IntFilter<"OrderPacking"> | number;
    piecesPerCarton?: Prisma.IntNullableFilter<"OrderPacking"> | number | null;
    grossWeightGrams?: Prisma.IntFilter<"OrderPacking"> | number;
    netWeightGrams?: Prisma.IntNullableFilter<"OrderPacking"> | number | null;
    volumeLitres?: Prisma.IntFilter<"OrderPacking"> | number;
    cartonLengthCm?: Prisma.IntNullableFilter<"OrderPacking"> | number | null;
    cartonWidthCm?: Prisma.IntNullableFilter<"OrderPacking"> | number | null;
    cartonHeightCm?: Prisma.IntNullableFilter<"OrderPacking"> | number | null;
    updatedById?: Prisma.UuidFilter<"OrderPacking"> | string;
    createdAt?: Prisma.DateTimeFilter<"OrderPacking"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OrderPacking"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
}, "id" | "orderId">;
export type OrderPackingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    cartons?: Prisma.SortOrder;
    piecesPerCarton?: Prisma.SortOrderInput | Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    netWeightGrams?: Prisma.SortOrderInput | Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    cartonLengthCm?: Prisma.SortOrderInput | Prisma.SortOrder;
    cartonWidthCm?: Prisma.SortOrderInput | Prisma.SortOrder;
    cartonHeightCm?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OrderPackingCountOrderByAggregateInput;
    _avg?: Prisma.OrderPackingAvgOrderByAggregateInput;
    _max?: Prisma.OrderPackingMaxOrderByAggregateInput;
    _min?: Prisma.OrderPackingMinOrderByAggregateInput;
    _sum?: Prisma.OrderPackingSumOrderByAggregateInput;
};
export type OrderPackingScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrderPackingScalarWhereWithAggregatesInput | Prisma.OrderPackingScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrderPackingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrderPackingScalarWhereWithAggregatesInput | Prisma.OrderPackingScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"OrderPacking"> | string;
    orderId?: Prisma.UuidWithAggregatesFilter<"OrderPacking"> | string;
    cartons?: Prisma.IntWithAggregatesFilter<"OrderPacking"> | number;
    piecesPerCarton?: Prisma.IntNullableWithAggregatesFilter<"OrderPacking"> | number | null;
    grossWeightGrams?: Prisma.IntWithAggregatesFilter<"OrderPacking"> | number;
    netWeightGrams?: Prisma.IntNullableWithAggregatesFilter<"OrderPacking"> | number | null;
    volumeLitres?: Prisma.IntWithAggregatesFilter<"OrderPacking"> | number;
    cartonLengthCm?: Prisma.IntNullableWithAggregatesFilter<"OrderPacking"> | number | null;
    cartonWidthCm?: Prisma.IntNullableWithAggregatesFilter<"OrderPacking"> | number | null;
    cartonHeightCm?: Prisma.IntNullableWithAggregatesFilter<"OrderPacking"> | number | null;
    updatedById?: Prisma.UuidWithAggregatesFilter<"OrderPacking"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OrderPacking"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OrderPacking"> | Date | string;
};
export type OrderPackingCreateInput = {
    id?: string;
    cartons: number;
    piecesPerCarton?: number | null;
    grossWeightGrams: number;
    netWeightGrams?: number | null;
    volumeLitres: number;
    cartonLengthCm?: number | null;
    cartonWidthCm?: number | null;
    cartonHeightCm?: number | null;
    updatedById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutPackingInput;
};
export type OrderPackingUncheckedCreateInput = {
    id?: string;
    orderId: string;
    cartons: number;
    piecesPerCarton?: number | null;
    grossWeightGrams: number;
    netWeightGrams?: number | null;
    volumeLitres: number;
    cartonLengthCm?: number | null;
    cartonWidthCm?: number | null;
    cartonHeightCm?: number | null;
    updatedById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderPackingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    piecesPerCarton?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    netWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonLengthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonWidthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonHeightCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    updatedById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutPackingNestedInput;
};
export type OrderPackingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    piecesPerCarton?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    netWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonLengthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonWidthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonHeightCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    updatedById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderPackingCreateManyInput = {
    id?: string;
    orderId: string;
    cartons: number;
    piecesPerCarton?: number | null;
    grossWeightGrams: number;
    netWeightGrams?: number | null;
    volumeLitres: number;
    cartonLengthCm?: number | null;
    cartonWidthCm?: number | null;
    cartonHeightCm?: number | null;
    updatedById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderPackingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    piecesPerCarton?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    netWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonLengthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonWidthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonHeightCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    updatedById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderPackingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    piecesPerCarton?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    netWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonLengthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonWidthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonHeightCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    updatedById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderPackingNullableScalarRelationFilter = {
    is?: Prisma.OrderPackingWhereInput | null;
    isNot?: Prisma.OrderPackingWhereInput | null;
};
export type OrderPackingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    cartons?: Prisma.SortOrder;
    piecesPerCarton?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    netWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    cartonLengthCm?: Prisma.SortOrder;
    cartonWidthCm?: Prisma.SortOrder;
    cartonHeightCm?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderPackingAvgOrderByAggregateInput = {
    cartons?: Prisma.SortOrder;
    piecesPerCarton?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    netWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    cartonLengthCm?: Prisma.SortOrder;
    cartonWidthCm?: Prisma.SortOrder;
    cartonHeightCm?: Prisma.SortOrder;
};
export type OrderPackingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    cartons?: Prisma.SortOrder;
    piecesPerCarton?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    netWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    cartonLengthCm?: Prisma.SortOrder;
    cartonWidthCm?: Prisma.SortOrder;
    cartonHeightCm?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderPackingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    cartons?: Prisma.SortOrder;
    piecesPerCarton?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    netWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    cartonLengthCm?: Prisma.SortOrder;
    cartonWidthCm?: Prisma.SortOrder;
    cartonHeightCm?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrderPackingSumOrderByAggregateInput = {
    cartons?: Prisma.SortOrder;
    piecesPerCarton?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    netWeightGrams?: Prisma.SortOrder;
    volumeLitres?: Prisma.SortOrder;
    cartonLengthCm?: Prisma.SortOrder;
    cartonWidthCm?: Prisma.SortOrder;
    cartonHeightCm?: Prisma.SortOrder;
};
export type OrderPackingCreateNestedOneWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderPackingCreateWithoutOrderInput, Prisma.OrderPackingUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.OrderPackingCreateOrConnectWithoutOrderInput;
    connect?: Prisma.OrderPackingWhereUniqueInput;
};
export type OrderPackingUncheckedCreateNestedOneWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderPackingCreateWithoutOrderInput, Prisma.OrderPackingUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.OrderPackingCreateOrConnectWithoutOrderInput;
    connect?: Prisma.OrderPackingWhereUniqueInput;
};
export type OrderPackingUpdateOneWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderPackingCreateWithoutOrderInput, Prisma.OrderPackingUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.OrderPackingCreateOrConnectWithoutOrderInput;
    upsert?: Prisma.OrderPackingUpsertWithoutOrderInput;
    disconnect?: Prisma.OrderPackingWhereInput | boolean;
    delete?: Prisma.OrderPackingWhereInput | boolean;
    connect?: Prisma.OrderPackingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrderPackingUpdateToOneWithWhereWithoutOrderInput, Prisma.OrderPackingUpdateWithoutOrderInput>, Prisma.OrderPackingUncheckedUpdateWithoutOrderInput>;
};
export type OrderPackingUncheckedUpdateOneWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderPackingCreateWithoutOrderInput, Prisma.OrderPackingUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.OrderPackingCreateOrConnectWithoutOrderInput;
    upsert?: Prisma.OrderPackingUpsertWithoutOrderInput;
    disconnect?: Prisma.OrderPackingWhereInput | boolean;
    delete?: Prisma.OrderPackingWhereInput | boolean;
    connect?: Prisma.OrderPackingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrderPackingUpdateToOneWithWhereWithoutOrderInput, Prisma.OrderPackingUpdateWithoutOrderInput>, Prisma.OrderPackingUncheckedUpdateWithoutOrderInput>;
};
export type OrderPackingCreateWithoutOrderInput = {
    id?: string;
    cartons: number;
    piecesPerCarton?: number | null;
    grossWeightGrams: number;
    netWeightGrams?: number | null;
    volumeLitres: number;
    cartonLengthCm?: number | null;
    cartonWidthCm?: number | null;
    cartonHeightCm?: number | null;
    updatedById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderPackingUncheckedCreateWithoutOrderInput = {
    id?: string;
    cartons: number;
    piecesPerCarton?: number | null;
    grossWeightGrams: number;
    netWeightGrams?: number | null;
    volumeLitres: number;
    cartonLengthCm?: number | null;
    cartonWidthCm?: number | null;
    cartonHeightCm?: number | null;
    updatedById: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrderPackingCreateOrConnectWithoutOrderInput = {
    where: Prisma.OrderPackingWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderPackingCreateWithoutOrderInput, Prisma.OrderPackingUncheckedCreateWithoutOrderInput>;
};
export type OrderPackingUpsertWithoutOrderInput = {
    update: Prisma.XOR<Prisma.OrderPackingUpdateWithoutOrderInput, Prisma.OrderPackingUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.OrderPackingCreateWithoutOrderInput, Prisma.OrderPackingUncheckedCreateWithoutOrderInput>;
    where?: Prisma.OrderPackingWhereInput;
};
export type OrderPackingUpdateToOneWithWhereWithoutOrderInput = {
    where?: Prisma.OrderPackingWhereInput;
    data: Prisma.XOR<Prisma.OrderPackingUpdateWithoutOrderInput, Prisma.OrderPackingUncheckedUpdateWithoutOrderInput>;
};
export type OrderPackingUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    piecesPerCarton?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    netWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonLengthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonWidthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonHeightCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    updatedById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderPackingUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cartons?: Prisma.IntFieldUpdateOperationsInput | number;
    piecesPerCarton?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    grossWeightGrams?: Prisma.IntFieldUpdateOperationsInput | number;
    netWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    volumeLitres?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonLengthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonWidthCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    cartonHeightCm?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    updatedById?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderPackingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    cartons?: boolean;
    piecesPerCarton?: boolean;
    grossWeightGrams?: boolean;
    netWeightGrams?: boolean;
    volumeLitres?: boolean;
    cartonLengthCm?: boolean;
    cartonWidthCm?: boolean;
    cartonHeightCm?: boolean;
    updatedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderPacking"]>;
export type OrderPackingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    cartons?: boolean;
    piecesPerCarton?: boolean;
    grossWeightGrams?: boolean;
    netWeightGrams?: boolean;
    volumeLitres?: boolean;
    cartonLengthCm?: boolean;
    cartonWidthCm?: boolean;
    cartonHeightCm?: boolean;
    updatedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderPacking"]>;
export type OrderPackingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    cartons?: boolean;
    piecesPerCarton?: boolean;
    grossWeightGrams?: boolean;
    netWeightGrams?: boolean;
    volumeLitres?: boolean;
    cartonLengthCm?: boolean;
    cartonWidthCm?: boolean;
    cartonHeightCm?: boolean;
    updatedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderPacking"]>;
export type OrderPackingSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    cartons?: boolean;
    piecesPerCarton?: boolean;
    grossWeightGrams?: boolean;
    netWeightGrams?: boolean;
    volumeLitres?: boolean;
    cartonLengthCm?: boolean;
    cartonWidthCm?: boolean;
    cartonHeightCm?: boolean;
    updatedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OrderPackingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "cartons" | "piecesPerCarton" | "grossWeightGrams" | "netWeightGrams" | "volumeLitres" | "cartonLengthCm" | "cartonWidthCm" | "cartonHeightCm" | "updatedById" | "createdAt" | "updatedAt", ExtArgs["result"]["orderPacking"]>;
export type OrderPackingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type OrderPackingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type OrderPackingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $OrderPackingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OrderPacking";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        cartons: number;
        piecesPerCarton: number | null;
        grossWeightGrams: number;
        netWeightGrams: number | null;
        volumeLitres: number;
        cartonLengthCm: number | null;
        cartonWidthCm: number | null;
        cartonHeightCm: number | null;
        updatedById: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["orderPacking"]>;
    composites: {};
};
export type OrderPackingGetPayload<S extends boolean | null | undefined | OrderPackingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload, S>;
export type OrderPackingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrderPackingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderPackingCountAggregateInputType | true;
};
export interface OrderPackingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OrderPacking'];
        meta: {
            name: 'OrderPacking';
        };
    };
    findUnique<T extends OrderPackingFindUniqueArgs>(args: Prisma.SelectSubset<T, OrderPackingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrderPackingClient<runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OrderPackingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrderPackingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderPackingClient<runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OrderPackingFindFirstArgs>(args?: Prisma.SelectSubset<T, OrderPackingFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrderPackingClient<runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OrderPackingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrderPackingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderPackingClient<runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OrderPackingFindManyArgs>(args?: Prisma.SelectSubset<T, OrderPackingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OrderPackingCreateArgs>(args: Prisma.SelectSubset<T, OrderPackingCreateArgs<ExtArgs>>): Prisma.Prisma__OrderPackingClient<runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OrderPackingCreateManyArgs>(args?: Prisma.SelectSubset<T, OrderPackingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OrderPackingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrderPackingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OrderPackingDeleteArgs>(args: Prisma.SelectSubset<T, OrderPackingDeleteArgs<ExtArgs>>): Prisma.Prisma__OrderPackingClient<runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OrderPackingUpdateArgs>(args: Prisma.SelectSubset<T, OrderPackingUpdateArgs<ExtArgs>>): Prisma.Prisma__OrderPackingClient<runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OrderPackingDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrderPackingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OrderPackingUpdateManyArgs>(args: Prisma.SelectSubset<T, OrderPackingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OrderPackingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrderPackingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OrderPackingUpsertArgs>(args: Prisma.SelectSubset<T, OrderPackingUpsertArgs<ExtArgs>>): Prisma.Prisma__OrderPackingClient<runtime.Types.Result.GetResult<Prisma.$OrderPackingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OrderPackingCountArgs>(args?: Prisma.Subset<T, OrderPackingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrderPackingCountAggregateOutputType> : number>;
    aggregate<T extends OrderPackingAggregateArgs>(args: Prisma.Subset<T, OrderPackingAggregateArgs>): Prisma.PrismaPromise<GetOrderPackingAggregateType<T>>;
    groupBy<T extends OrderPackingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrderPackingGroupByArgs['orderBy'];
    } : {
        orderBy?: OrderPackingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrderPackingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderPackingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OrderPackingFieldRefs;
}
export interface Prisma__OrderPackingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OrderPackingFieldRefs {
    readonly id: Prisma.FieldRef<"OrderPacking", 'String'>;
    readonly orderId: Prisma.FieldRef<"OrderPacking", 'String'>;
    readonly cartons: Prisma.FieldRef<"OrderPacking", 'Int'>;
    readonly piecesPerCarton: Prisma.FieldRef<"OrderPacking", 'Int'>;
    readonly grossWeightGrams: Prisma.FieldRef<"OrderPacking", 'Int'>;
    readonly netWeightGrams: Prisma.FieldRef<"OrderPacking", 'Int'>;
    readonly volumeLitres: Prisma.FieldRef<"OrderPacking", 'Int'>;
    readonly cartonLengthCm: Prisma.FieldRef<"OrderPacking", 'Int'>;
    readonly cartonWidthCm: Prisma.FieldRef<"OrderPacking", 'Int'>;
    readonly cartonHeightCm: Prisma.FieldRef<"OrderPacking", 'Int'>;
    readonly updatedById: Prisma.FieldRef<"OrderPacking", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OrderPacking", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OrderPacking", 'DateTime'>;
}
export type OrderPackingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelect<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    include?: Prisma.OrderPackingInclude<ExtArgs> | null;
    where: Prisma.OrderPackingWhereUniqueInput;
};
export type OrderPackingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelect<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    include?: Prisma.OrderPackingInclude<ExtArgs> | null;
    where: Prisma.OrderPackingWhereUniqueInput;
};
export type OrderPackingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelect<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    include?: Prisma.OrderPackingInclude<ExtArgs> | null;
    where?: Prisma.OrderPackingWhereInput;
    orderBy?: Prisma.OrderPackingOrderByWithRelationInput | Prisma.OrderPackingOrderByWithRelationInput[];
    cursor?: Prisma.OrderPackingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderPackingScalarFieldEnum | Prisma.OrderPackingScalarFieldEnum[];
};
export type OrderPackingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelect<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    include?: Prisma.OrderPackingInclude<ExtArgs> | null;
    where?: Prisma.OrderPackingWhereInput;
    orderBy?: Prisma.OrderPackingOrderByWithRelationInput | Prisma.OrderPackingOrderByWithRelationInput[];
    cursor?: Prisma.OrderPackingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderPackingScalarFieldEnum | Prisma.OrderPackingScalarFieldEnum[];
};
export type OrderPackingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelect<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    include?: Prisma.OrderPackingInclude<ExtArgs> | null;
    where?: Prisma.OrderPackingWhereInput;
    orderBy?: Prisma.OrderPackingOrderByWithRelationInput | Prisma.OrderPackingOrderByWithRelationInput[];
    cursor?: Prisma.OrderPackingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderPackingScalarFieldEnum | Prisma.OrderPackingScalarFieldEnum[];
};
export type OrderPackingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelect<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    include?: Prisma.OrderPackingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderPackingCreateInput, Prisma.OrderPackingUncheckedCreateInput>;
};
export type OrderPackingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OrderPackingCreateManyInput | Prisma.OrderPackingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OrderPackingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    data: Prisma.OrderPackingCreateManyInput | Prisma.OrderPackingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OrderPackingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OrderPackingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelect<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    include?: Prisma.OrderPackingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderPackingUpdateInput, Prisma.OrderPackingUncheckedUpdateInput>;
    where: Prisma.OrderPackingWhereUniqueInput;
};
export type OrderPackingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OrderPackingUpdateManyMutationInput, Prisma.OrderPackingUncheckedUpdateManyInput>;
    where?: Prisma.OrderPackingWhereInput;
    limit?: number;
};
export type OrderPackingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderPackingUpdateManyMutationInput, Prisma.OrderPackingUncheckedUpdateManyInput>;
    where?: Prisma.OrderPackingWhereInput;
    limit?: number;
    include?: Prisma.OrderPackingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OrderPackingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelect<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    include?: Prisma.OrderPackingInclude<ExtArgs> | null;
    where: Prisma.OrderPackingWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderPackingCreateInput, Prisma.OrderPackingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OrderPackingUpdateInput, Prisma.OrderPackingUncheckedUpdateInput>;
};
export type OrderPackingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelect<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    include?: Prisma.OrderPackingInclude<ExtArgs> | null;
    where: Prisma.OrderPackingWhereUniqueInput;
};
export type OrderPackingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderPackingWhereInput;
    limit?: number;
};
export type OrderPackingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderPackingSelect<ExtArgs> | null;
    omit?: Prisma.OrderPackingOmit<ExtArgs> | null;
    include?: Prisma.OrderPackingInclude<ExtArgs> | null;
};
