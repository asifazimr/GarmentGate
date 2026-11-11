import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type HubReceiptModel = runtime.Types.Result.DefaultSelection<Prisma.$HubReceiptPayload>;
export type AggregateHubReceipt = {
    _count: HubReceiptCountAggregateOutputType | null;
    _avg: HubReceiptAvgAggregateOutputType | null;
    _sum: HubReceiptSumAggregateOutputType | null;
    _min: HubReceiptMinAggregateOutputType | null;
    _max: HubReceiptMaxAggregateOutputType | null;
};
export type HubReceiptAvgAggregateOutputType = {
    cartonsExpected: number | null;
    cartonsReceived: number | null;
    grossWeightGrams: number | null;
};
export type HubReceiptSumAggregateOutputType = {
    cartonsExpected: number | null;
    cartonsReceived: number | null;
    grossWeightGrams: number | null;
};
export type HubReceiptMinAggregateOutputType = {
    id: string | null;
    hubId: string | null;
    orderId: string | null;
    pickupId: string | null;
    receivedById: string | null;
    receivedAt: Date | null;
    cartonsExpected: number | null;
    cartonsReceived: number | null;
    grossWeightGrams: number | null;
    condition: $Enums.HubReceiptCondition | null;
    repacked: boolean | null;
    relabelled: boolean | null;
    notes: string | null;
};
export type HubReceiptMaxAggregateOutputType = {
    id: string | null;
    hubId: string | null;
    orderId: string | null;
    pickupId: string | null;
    receivedById: string | null;
    receivedAt: Date | null;
    cartonsExpected: number | null;
    cartonsReceived: number | null;
    grossWeightGrams: number | null;
    condition: $Enums.HubReceiptCondition | null;
    repacked: boolean | null;
    relabelled: boolean | null;
    notes: string | null;
};
export type HubReceiptCountAggregateOutputType = {
    id: number;
    hubId: number;
    orderId: number;
    pickupId: number;
    receivedById: number;
    receivedAt: number;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams: number;
    condition: number;
    repacked: number;
    relabelled: number;
    notes: number;
    _all: number;
};
export type HubReceiptAvgAggregateInputType = {
    cartonsExpected?: true;
    cartonsReceived?: true;
    grossWeightGrams?: true;
};
export type HubReceiptSumAggregateInputType = {
    cartonsExpected?: true;
    cartonsReceived?: true;
    grossWeightGrams?: true;
};
export type HubReceiptMinAggregateInputType = {
    id?: true;
    hubId?: true;
    orderId?: true;
    pickupId?: true;
    receivedById?: true;
    receivedAt?: true;
    cartonsExpected?: true;
    cartonsReceived?: true;
    grossWeightGrams?: true;
    condition?: true;
    repacked?: true;
    relabelled?: true;
    notes?: true;
};
export type HubReceiptMaxAggregateInputType = {
    id?: true;
    hubId?: true;
    orderId?: true;
    pickupId?: true;
    receivedById?: true;
    receivedAt?: true;
    cartonsExpected?: true;
    cartonsReceived?: true;
    grossWeightGrams?: true;
    condition?: true;
    repacked?: true;
    relabelled?: true;
    notes?: true;
};
export type HubReceiptCountAggregateInputType = {
    id?: true;
    hubId?: true;
    orderId?: true;
    pickupId?: true;
    receivedById?: true;
    receivedAt?: true;
    cartonsExpected?: true;
    cartonsReceived?: true;
    grossWeightGrams?: true;
    condition?: true;
    repacked?: true;
    relabelled?: true;
    notes?: true;
    _all?: true;
};
export type HubReceiptAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubReceiptWhereInput;
    orderBy?: Prisma.HubReceiptOrderByWithRelationInput | Prisma.HubReceiptOrderByWithRelationInput[];
    cursor?: Prisma.HubReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | HubReceiptCountAggregateInputType;
    _avg?: HubReceiptAvgAggregateInputType;
    _sum?: HubReceiptSumAggregateInputType;
    _min?: HubReceiptMinAggregateInputType;
    _max?: HubReceiptMaxAggregateInputType;
};
export type GetHubReceiptAggregateType<T extends HubReceiptAggregateArgs> = {
    [P in keyof T & keyof AggregateHubReceipt]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHubReceipt[P]> : Prisma.GetScalarType<T[P], AggregateHubReceipt[P]>;
};
export type HubReceiptGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubReceiptWhereInput;
    orderBy?: Prisma.HubReceiptOrderByWithAggregationInput | Prisma.HubReceiptOrderByWithAggregationInput[];
    by: Prisma.HubReceiptScalarFieldEnum[] | Prisma.HubReceiptScalarFieldEnum;
    having?: Prisma.HubReceiptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HubReceiptCountAggregateInputType | true;
    _avg?: HubReceiptAvgAggregateInputType;
    _sum?: HubReceiptSumAggregateInputType;
    _min?: HubReceiptMinAggregateInputType;
    _max?: HubReceiptMaxAggregateInputType;
};
export type HubReceiptGroupByOutputType = {
    id: string;
    hubId: string;
    orderId: string;
    pickupId: string | null;
    receivedById: string;
    receivedAt: Date;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked: boolean;
    relabelled: boolean;
    notes: string | null;
    _count: HubReceiptCountAggregateOutputType | null;
    _avg: HubReceiptAvgAggregateOutputType | null;
    _sum: HubReceiptSumAggregateOutputType | null;
    _min: HubReceiptMinAggregateOutputType | null;
    _max: HubReceiptMaxAggregateOutputType | null;
};
export type GetHubReceiptGroupByPayload<T extends HubReceiptGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HubReceiptGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HubReceiptGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HubReceiptGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HubReceiptGroupByOutputType[P]>;
}>>;
export type HubReceiptWhereInput = {
    AND?: Prisma.HubReceiptWhereInput | Prisma.HubReceiptWhereInput[];
    OR?: Prisma.HubReceiptWhereInput[];
    NOT?: Prisma.HubReceiptWhereInput | Prisma.HubReceiptWhereInput[];
    id?: Prisma.UuidFilter<"HubReceipt"> | string;
    hubId?: Prisma.UuidFilter<"HubReceipt"> | string;
    orderId?: Prisma.UuidFilter<"HubReceipt"> | string;
    pickupId?: Prisma.UuidNullableFilter<"HubReceipt"> | string | null;
    receivedById?: Prisma.UuidFilter<"HubReceipt"> | string;
    receivedAt?: Prisma.DateTimeFilter<"HubReceipt"> | Date | string;
    cartonsExpected?: Prisma.IntFilter<"HubReceipt"> | number;
    cartonsReceived?: Prisma.IntFilter<"HubReceipt"> | number;
    grossWeightGrams?: Prisma.IntNullableFilter<"HubReceipt"> | number | null;
    condition?: Prisma.EnumHubReceiptConditionFilter<"HubReceipt"> | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFilter<"HubReceipt"> | boolean;
    relabelled?: Prisma.BoolFilter<"HubReceipt"> | boolean;
    notes?: Prisma.StringNullableFilter<"HubReceipt"> | string | null;
    hub?: Prisma.XOR<Prisma.HubScalarRelationFilter, Prisma.HubWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    pickup?: Prisma.XOR<Prisma.PickupRequestNullableScalarRelationFilter, Prisma.PickupRequestWhereInput> | null;
    photos?: Prisma.HubReceiptPhotoListRelationFilter;
};
export type HubReceiptOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    hubId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    pickupId?: Prisma.SortOrderInput | Prisma.SortOrder;
    receivedById?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    cartonsExpected?: Prisma.SortOrder;
    cartonsReceived?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrderInput | Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    repacked?: Prisma.SortOrder;
    relabelled?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    hub?: Prisma.HubOrderByWithRelationInput;
    order?: Prisma.OrderOrderByWithRelationInput;
    pickup?: Prisma.PickupRequestOrderByWithRelationInput;
    photos?: Prisma.HubReceiptPhotoOrderByRelationAggregateInput;
};
export type HubReceiptWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.HubReceiptWhereInput | Prisma.HubReceiptWhereInput[];
    OR?: Prisma.HubReceiptWhereInput[];
    NOT?: Prisma.HubReceiptWhereInput | Prisma.HubReceiptWhereInput[];
    hubId?: Prisma.UuidFilter<"HubReceipt"> | string;
    orderId?: Prisma.UuidFilter<"HubReceipt"> | string;
    pickupId?: Prisma.UuidNullableFilter<"HubReceipt"> | string | null;
    receivedById?: Prisma.UuidFilter<"HubReceipt"> | string;
    receivedAt?: Prisma.DateTimeFilter<"HubReceipt"> | Date | string;
    cartonsExpected?: Prisma.IntFilter<"HubReceipt"> | number;
    cartonsReceived?: Prisma.IntFilter<"HubReceipt"> | number;
    grossWeightGrams?: Prisma.IntNullableFilter<"HubReceipt"> | number | null;
    condition?: Prisma.EnumHubReceiptConditionFilter<"HubReceipt"> | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFilter<"HubReceipt"> | boolean;
    relabelled?: Prisma.BoolFilter<"HubReceipt"> | boolean;
    notes?: Prisma.StringNullableFilter<"HubReceipt"> | string | null;
    hub?: Prisma.XOR<Prisma.HubScalarRelationFilter, Prisma.HubWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    pickup?: Prisma.XOR<Prisma.PickupRequestNullableScalarRelationFilter, Prisma.PickupRequestWhereInput> | null;
    photos?: Prisma.HubReceiptPhotoListRelationFilter;
}, "id">;
export type HubReceiptOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    hubId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    pickupId?: Prisma.SortOrderInput | Prisma.SortOrder;
    receivedById?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    cartonsExpected?: Prisma.SortOrder;
    cartonsReceived?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrderInput | Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    repacked?: Prisma.SortOrder;
    relabelled?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.HubReceiptCountOrderByAggregateInput;
    _avg?: Prisma.HubReceiptAvgOrderByAggregateInput;
    _max?: Prisma.HubReceiptMaxOrderByAggregateInput;
    _min?: Prisma.HubReceiptMinOrderByAggregateInput;
    _sum?: Prisma.HubReceiptSumOrderByAggregateInput;
};
export type HubReceiptScalarWhereWithAggregatesInput = {
    AND?: Prisma.HubReceiptScalarWhereWithAggregatesInput | Prisma.HubReceiptScalarWhereWithAggregatesInput[];
    OR?: Prisma.HubReceiptScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HubReceiptScalarWhereWithAggregatesInput | Prisma.HubReceiptScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"HubReceipt"> | string;
    hubId?: Prisma.UuidWithAggregatesFilter<"HubReceipt"> | string;
    orderId?: Prisma.UuidWithAggregatesFilter<"HubReceipt"> | string;
    pickupId?: Prisma.UuidNullableWithAggregatesFilter<"HubReceipt"> | string | null;
    receivedById?: Prisma.UuidWithAggregatesFilter<"HubReceipt"> | string;
    receivedAt?: Prisma.DateTimeWithAggregatesFilter<"HubReceipt"> | Date | string;
    cartonsExpected?: Prisma.IntWithAggregatesFilter<"HubReceipt"> | number;
    cartonsReceived?: Prisma.IntWithAggregatesFilter<"HubReceipt"> | number;
    grossWeightGrams?: Prisma.IntNullableWithAggregatesFilter<"HubReceipt"> | number | null;
    condition?: Prisma.EnumHubReceiptConditionWithAggregatesFilter<"HubReceipt"> | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolWithAggregatesFilter<"HubReceipt"> | boolean;
    relabelled?: Prisma.BoolWithAggregatesFilter<"HubReceipt"> | boolean;
    notes?: Prisma.StringNullableWithAggregatesFilter<"HubReceipt"> | string | null;
};
export type HubReceiptCreateInput = {
    id?: string;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
    hub: Prisma.HubCreateNestedOneWithoutReceiptsInput;
    order: Prisma.OrderCreateNestedOneWithoutHubReceiptsInput;
    pickup?: Prisma.PickupRequestCreateNestedOneWithoutReceiptsInput;
    photos?: Prisma.HubReceiptPhotoCreateNestedManyWithoutReceiptInput;
};
export type HubReceiptUncheckedCreateInput = {
    id?: string;
    hubId: string;
    orderId: string;
    pickupId?: string | null;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
    photos?: Prisma.HubReceiptPhotoUncheckedCreateNestedManyWithoutReceiptInput;
};
export type HubReceiptUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hub?: Prisma.HubUpdateOneRequiredWithoutReceiptsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutHubReceiptsNestedInput;
    pickup?: Prisma.PickupRequestUpdateOneWithoutReceiptsNestedInput;
    photos?: Prisma.HubReceiptPhotoUpdateManyWithoutReceiptNestedInput;
};
export type HubReceiptUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photos?: Prisma.HubReceiptPhotoUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type HubReceiptCreateManyInput = {
    id?: string;
    hubId: string;
    orderId: string;
    pickupId?: string | null;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
};
export type HubReceiptUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type HubReceiptUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type HubReceiptListRelationFilter = {
    every?: Prisma.HubReceiptWhereInput;
    some?: Prisma.HubReceiptWhereInput;
    none?: Prisma.HubReceiptWhereInput;
};
export type HubReceiptOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HubReceiptCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hubId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    pickupId?: Prisma.SortOrder;
    receivedById?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    cartonsExpected?: Prisma.SortOrder;
    cartonsReceived?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    repacked?: Prisma.SortOrder;
    relabelled?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
};
export type HubReceiptAvgOrderByAggregateInput = {
    cartonsExpected?: Prisma.SortOrder;
    cartonsReceived?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
};
export type HubReceiptMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hubId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    pickupId?: Prisma.SortOrder;
    receivedById?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    cartonsExpected?: Prisma.SortOrder;
    cartonsReceived?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    repacked?: Prisma.SortOrder;
    relabelled?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
};
export type HubReceiptMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hubId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    pickupId?: Prisma.SortOrder;
    receivedById?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    cartonsExpected?: Prisma.SortOrder;
    cartonsReceived?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
    condition?: Prisma.SortOrder;
    repacked?: Prisma.SortOrder;
    relabelled?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
};
export type HubReceiptSumOrderByAggregateInput = {
    cartonsExpected?: Prisma.SortOrder;
    cartonsReceived?: Prisma.SortOrder;
    grossWeightGrams?: Prisma.SortOrder;
};
export type HubReceiptScalarRelationFilter = {
    is?: Prisma.HubReceiptWhereInput;
    isNot?: Prisma.HubReceiptWhereInput;
};
export type HubReceiptCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutOrderInput, Prisma.HubReceiptUncheckedCreateWithoutOrderInput> | Prisma.HubReceiptCreateWithoutOrderInput[] | Prisma.HubReceiptUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutOrderInput | Prisma.HubReceiptCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.HubReceiptCreateManyOrderInputEnvelope;
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
};
export type HubReceiptUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutOrderInput, Prisma.HubReceiptUncheckedCreateWithoutOrderInput> | Prisma.HubReceiptCreateWithoutOrderInput[] | Prisma.HubReceiptUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutOrderInput | Prisma.HubReceiptCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.HubReceiptCreateManyOrderInputEnvelope;
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
};
export type HubReceiptUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutOrderInput, Prisma.HubReceiptUncheckedCreateWithoutOrderInput> | Prisma.HubReceiptCreateWithoutOrderInput[] | Prisma.HubReceiptUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutOrderInput | Prisma.HubReceiptCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.HubReceiptUpsertWithWhereUniqueWithoutOrderInput | Prisma.HubReceiptUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.HubReceiptCreateManyOrderInputEnvelope;
    set?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    disconnect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    delete?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    update?: Prisma.HubReceiptUpdateWithWhereUniqueWithoutOrderInput | Prisma.HubReceiptUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.HubReceiptUpdateManyWithWhereWithoutOrderInput | Prisma.HubReceiptUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.HubReceiptScalarWhereInput | Prisma.HubReceiptScalarWhereInput[];
};
export type HubReceiptUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutOrderInput, Prisma.HubReceiptUncheckedCreateWithoutOrderInput> | Prisma.HubReceiptCreateWithoutOrderInput[] | Prisma.HubReceiptUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutOrderInput | Prisma.HubReceiptCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.HubReceiptUpsertWithWhereUniqueWithoutOrderInput | Prisma.HubReceiptUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.HubReceiptCreateManyOrderInputEnvelope;
    set?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    disconnect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    delete?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    update?: Prisma.HubReceiptUpdateWithWhereUniqueWithoutOrderInput | Prisma.HubReceiptUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.HubReceiptUpdateManyWithWhereWithoutOrderInput | Prisma.HubReceiptUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.HubReceiptScalarWhereInput | Prisma.HubReceiptScalarWhereInput[];
};
export type HubReceiptCreateNestedManyWithoutHubInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutHubInput, Prisma.HubReceiptUncheckedCreateWithoutHubInput> | Prisma.HubReceiptCreateWithoutHubInput[] | Prisma.HubReceiptUncheckedCreateWithoutHubInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutHubInput | Prisma.HubReceiptCreateOrConnectWithoutHubInput[];
    createMany?: Prisma.HubReceiptCreateManyHubInputEnvelope;
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
};
export type HubReceiptUncheckedCreateNestedManyWithoutHubInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutHubInput, Prisma.HubReceiptUncheckedCreateWithoutHubInput> | Prisma.HubReceiptCreateWithoutHubInput[] | Prisma.HubReceiptUncheckedCreateWithoutHubInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutHubInput | Prisma.HubReceiptCreateOrConnectWithoutHubInput[];
    createMany?: Prisma.HubReceiptCreateManyHubInputEnvelope;
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
};
export type HubReceiptUpdateManyWithoutHubNestedInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutHubInput, Prisma.HubReceiptUncheckedCreateWithoutHubInput> | Prisma.HubReceiptCreateWithoutHubInput[] | Prisma.HubReceiptUncheckedCreateWithoutHubInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutHubInput | Prisma.HubReceiptCreateOrConnectWithoutHubInput[];
    upsert?: Prisma.HubReceiptUpsertWithWhereUniqueWithoutHubInput | Prisma.HubReceiptUpsertWithWhereUniqueWithoutHubInput[];
    createMany?: Prisma.HubReceiptCreateManyHubInputEnvelope;
    set?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    disconnect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    delete?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    update?: Prisma.HubReceiptUpdateWithWhereUniqueWithoutHubInput | Prisma.HubReceiptUpdateWithWhereUniqueWithoutHubInput[];
    updateMany?: Prisma.HubReceiptUpdateManyWithWhereWithoutHubInput | Prisma.HubReceiptUpdateManyWithWhereWithoutHubInput[];
    deleteMany?: Prisma.HubReceiptScalarWhereInput | Prisma.HubReceiptScalarWhereInput[];
};
export type HubReceiptUncheckedUpdateManyWithoutHubNestedInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutHubInput, Prisma.HubReceiptUncheckedCreateWithoutHubInput> | Prisma.HubReceiptCreateWithoutHubInput[] | Prisma.HubReceiptUncheckedCreateWithoutHubInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutHubInput | Prisma.HubReceiptCreateOrConnectWithoutHubInput[];
    upsert?: Prisma.HubReceiptUpsertWithWhereUniqueWithoutHubInput | Prisma.HubReceiptUpsertWithWhereUniqueWithoutHubInput[];
    createMany?: Prisma.HubReceiptCreateManyHubInputEnvelope;
    set?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    disconnect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    delete?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    update?: Prisma.HubReceiptUpdateWithWhereUniqueWithoutHubInput | Prisma.HubReceiptUpdateWithWhereUniqueWithoutHubInput[];
    updateMany?: Prisma.HubReceiptUpdateManyWithWhereWithoutHubInput | Prisma.HubReceiptUpdateManyWithWhereWithoutHubInput[];
    deleteMany?: Prisma.HubReceiptScalarWhereInput | Prisma.HubReceiptScalarWhereInput[];
};
export type HubReceiptCreateNestedManyWithoutPickupInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutPickupInput, Prisma.HubReceiptUncheckedCreateWithoutPickupInput> | Prisma.HubReceiptCreateWithoutPickupInput[] | Prisma.HubReceiptUncheckedCreateWithoutPickupInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutPickupInput | Prisma.HubReceiptCreateOrConnectWithoutPickupInput[];
    createMany?: Prisma.HubReceiptCreateManyPickupInputEnvelope;
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
};
export type HubReceiptUncheckedCreateNestedManyWithoutPickupInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutPickupInput, Prisma.HubReceiptUncheckedCreateWithoutPickupInput> | Prisma.HubReceiptCreateWithoutPickupInput[] | Prisma.HubReceiptUncheckedCreateWithoutPickupInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutPickupInput | Prisma.HubReceiptCreateOrConnectWithoutPickupInput[];
    createMany?: Prisma.HubReceiptCreateManyPickupInputEnvelope;
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
};
export type HubReceiptUpdateManyWithoutPickupNestedInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutPickupInput, Prisma.HubReceiptUncheckedCreateWithoutPickupInput> | Prisma.HubReceiptCreateWithoutPickupInput[] | Prisma.HubReceiptUncheckedCreateWithoutPickupInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutPickupInput | Prisma.HubReceiptCreateOrConnectWithoutPickupInput[];
    upsert?: Prisma.HubReceiptUpsertWithWhereUniqueWithoutPickupInput | Prisma.HubReceiptUpsertWithWhereUniqueWithoutPickupInput[];
    createMany?: Prisma.HubReceiptCreateManyPickupInputEnvelope;
    set?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    disconnect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    delete?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    update?: Prisma.HubReceiptUpdateWithWhereUniqueWithoutPickupInput | Prisma.HubReceiptUpdateWithWhereUniqueWithoutPickupInput[];
    updateMany?: Prisma.HubReceiptUpdateManyWithWhereWithoutPickupInput | Prisma.HubReceiptUpdateManyWithWhereWithoutPickupInput[];
    deleteMany?: Prisma.HubReceiptScalarWhereInput | Prisma.HubReceiptScalarWhereInput[];
};
export type HubReceiptUncheckedUpdateManyWithoutPickupNestedInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutPickupInput, Prisma.HubReceiptUncheckedCreateWithoutPickupInput> | Prisma.HubReceiptCreateWithoutPickupInput[] | Prisma.HubReceiptUncheckedCreateWithoutPickupInput[];
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutPickupInput | Prisma.HubReceiptCreateOrConnectWithoutPickupInput[];
    upsert?: Prisma.HubReceiptUpsertWithWhereUniqueWithoutPickupInput | Prisma.HubReceiptUpsertWithWhereUniqueWithoutPickupInput[];
    createMany?: Prisma.HubReceiptCreateManyPickupInputEnvelope;
    set?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    disconnect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    delete?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    connect?: Prisma.HubReceiptWhereUniqueInput | Prisma.HubReceiptWhereUniqueInput[];
    update?: Prisma.HubReceiptUpdateWithWhereUniqueWithoutPickupInput | Prisma.HubReceiptUpdateWithWhereUniqueWithoutPickupInput[];
    updateMany?: Prisma.HubReceiptUpdateManyWithWhereWithoutPickupInput | Prisma.HubReceiptUpdateManyWithWhereWithoutPickupInput[];
    deleteMany?: Prisma.HubReceiptScalarWhereInput | Prisma.HubReceiptScalarWhereInput[];
};
export type EnumHubReceiptConditionFieldUpdateOperationsInput = {
    set?: $Enums.HubReceiptCondition;
};
export type HubReceiptCreateNestedOneWithoutPhotosInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutPhotosInput, Prisma.HubReceiptUncheckedCreateWithoutPhotosInput>;
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutPhotosInput;
    connect?: Prisma.HubReceiptWhereUniqueInput;
};
export type HubReceiptUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: Prisma.XOR<Prisma.HubReceiptCreateWithoutPhotosInput, Prisma.HubReceiptUncheckedCreateWithoutPhotosInput>;
    connectOrCreate?: Prisma.HubReceiptCreateOrConnectWithoutPhotosInput;
    upsert?: Prisma.HubReceiptUpsertWithoutPhotosInput;
    connect?: Prisma.HubReceiptWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HubReceiptUpdateToOneWithWhereWithoutPhotosInput, Prisma.HubReceiptUpdateWithoutPhotosInput>, Prisma.HubReceiptUncheckedUpdateWithoutPhotosInput>;
};
export type HubReceiptCreateWithoutOrderInput = {
    id?: string;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
    hub: Prisma.HubCreateNestedOneWithoutReceiptsInput;
    pickup?: Prisma.PickupRequestCreateNestedOneWithoutReceiptsInput;
    photos?: Prisma.HubReceiptPhotoCreateNestedManyWithoutReceiptInput;
};
export type HubReceiptUncheckedCreateWithoutOrderInput = {
    id?: string;
    hubId: string;
    pickupId?: string | null;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
    photos?: Prisma.HubReceiptPhotoUncheckedCreateNestedManyWithoutReceiptInput;
};
export type HubReceiptCreateOrConnectWithoutOrderInput = {
    where: Prisma.HubReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubReceiptCreateWithoutOrderInput, Prisma.HubReceiptUncheckedCreateWithoutOrderInput>;
};
export type HubReceiptCreateManyOrderInputEnvelope = {
    data: Prisma.HubReceiptCreateManyOrderInput | Prisma.HubReceiptCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type HubReceiptUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.HubReceiptWhereUniqueInput;
    update: Prisma.XOR<Prisma.HubReceiptUpdateWithoutOrderInput, Prisma.HubReceiptUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.HubReceiptCreateWithoutOrderInput, Prisma.HubReceiptUncheckedCreateWithoutOrderInput>;
};
export type HubReceiptUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.HubReceiptWhereUniqueInput;
    data: Prisma.XOR<Prisma.HubReceiptUpdateWithoutOrderInput, Prisma.HubReceiptUncheckedUpdateWithoutOrderInput>;
};
export type HubReceiptUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.HubReceiptScalarWhereInput;
    data: Prisma.XOR<Prisma.HubReceiptUpdateManyMutationInput, Prisma.HubReceiptUncheckedUpdateManyWithoutOrderInput>;
};
export type HubReceiptScalarWhereInput = {
    AND?: Prisma.HubReceiptScalarWhereInput | Prisma.HubReceiptScalarWhereInput[];
    OR?: Prisma.HubReceiptScalarWhereInput[];
    NOT?: Prisma.HubReceiptScalarWhereInput | Prisma.HubReceiptScalarWhereInput[];
    id?: Prisma.UuidFilter<"HubReceipt"> | string;
    hubId?: Prisma.UuidFilter<"HubReceipt"> | string;
    orderId?: Prisma.UuidFilter<"HubReceipt"> | string;
    pickupId?: Prisma.UuidNullableFilter<"HubReceipt"> | string | null;
    receivedById?: Prisma.UuidFilter<"HubReceipt"> | string;
    receivedAt?: Prisma.DateTimeFilter<"HubReceipt"> | Date | string;
    cartonsExpected?: Prisma.IntFilter<"HubReceipt"> | number;
    cartonsReceived?: Prisma.IntFilter<"HubReceipt"> | number;
    grossWeightGrams?: Prisma.IntNullableFilter<"HubReceipt"> | number | null;
    condition?: Prisma.EnumHubReceiptConditionFilter<"HubReceipt"> | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFilter<"HubReceipt"> | boolean;
    relabelled?: Prisma.BoolFilter<"HubReceipt"> | boolean;
    notes?: Prisma.StringNullableFilter<"HubReceipt"> | string | null;
};
export type HubReceiptCreateWithoutHubInput = {
    id?: string;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
    order: Prisma.OrderCreateNestedOneWithoutHubReceiptsInput;
    pickup?: Prisma.PickupRequestCreateNestedOneWithoutReceiptsInput;
    photos?: Prisma.HubReceiptPhotoCreateNestedManyWithoutReceiptInput;
};
export type HubReceiptUncheckedCreateWithoutHubInput = {
    id?: string;
    orderId: string;
    pickupId?: string | null;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
    photos?: Prisma.HubReceiptPhotoUncheckedCreateNestedManyWithoutReceiptInput;
};
export type HubReceiptCreateOrConnectWithoutHubInput = {
    where: Prisma.HubReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubReceiptCreateWithoutHubInput, Prisma.HubReceiptUncheckedCreateWithoutHubInput>;
};
export type HubReceiptCreateManyHubInputEnvelope = {
    data: Prisma.HubReceiptCreateManyHubInput | Prisma.HubReceiptCreateManyHubInput[];
    skipDuplicates?: boolean;
};
export type HubReceiptUpsertWithWhereUniqueWithoutHubInput = {
    where: Prisma.HubReceiptWhereUniqueInput;
    update: Prisma.XOR<Prisma.HubReceiptUpdateWithoutHubInput, Prisma.HubReceiptUncheckedUpdateWithoutHubInput>;
    create: Prisma.XOR<Prisma.HubReceiptCreateWithoutHubInput, Prisma.HubReceiptUncheckedCreateWithoutHubInput>;
};
export type HubReceiptUpdateWithWhereUniqueWithoutHubInput = {
    where: Prisma.HubReceiptWhereUniqueInput;
    data: Prisma.XOR<Prisma.HubReceiptUpdateWithoutHubInput, Prisma.HubReceiptUncheckedUpdateWithoutHubInput>;
};
export type HubReceiptUpdateManyWithWhereWithoutHubInput = {
    where: Prisma.HubReceiptScalarWhereInput;
    data: Prisma.XOR<Prisma.HubReceiptUpdateManyMutationInput, Prisma.HubReceiptUncheckedUpdateManyWithoutHubInput>;
};
export type HubReceiptCreateWithoutPickupInput = {
    id?: string;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
    hub: Prisma.HubCreateNestedOneWithoutReceiptsInput;
    order: Prisma.OrderCreateNestedOneWithoutHubReceiptsInput;
    photos?: Prisma.HubReceiptPhotoCreateNestedManyWithoutReceiptInput;
};
export type HubReceiptUncheckedCreateWithoutPickupInput = {
    id?: string;
    hubId: string;
    orderId: string;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
    photos?: Prisma.HubReceiptPhotoUncheckedCreateNestedManyWithoutReceiptInput;
};
export type HubReceiptCreateOrConnectWithoutPickupInput = {
    where: Prisma.HubReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubReceiptCreateWithoutPickupInput, Prisma.HubReceiptUncheckedCreateWithoutPickupInput>;
};
export type HubReceiptCreateManyPickupInputEnvelope = {
    data: Prisma.HubReceiptCreateManyPickupInput | Prisma.HubReceiptCreateManyPickupInput[];
    skipDuplicates?: boolean;
};
export type HubReceiptUpsertWithWhereUniqueWithoutPickupInput = {
    where: Prisma.HubReceiptWhereUniqueInput;
    update: Prisma.XOR<Prisma.HubReceiptUpdateWithoutPickupInput, Prisma.HubReceiptUncheckedUpdateWithoutPickupInput>;
    create: Prisma.XOR<Prisma.HubReceiptCreateWithoutPickupInput, Prisma.HubReceiptUncheckedCreateWithoutPickupInput>;
};
export type HubReceiptUpdateWithWhereUniqueWithoutPickupInput = {
    where: Prisma.HubReceiptWhereUniqueInput;
    data: Prisma.XOR<Prisma.HubReceiptUpdateWithoutPickupInput, Prisma.HubReceiptUncheckedUpdateWithoutPickupInput>;
};
export type HubReceiptUpdateManyWithWhereWithoutPickupInput = {
    where: Prisma.HubReceiptScalarWhereInput;
    data: Prisma.XOR<Prisma.HubReceiptUpdateManyMutationInput, Prisma.HubReceiptUncheckedUpdateManyWithoutPickupInput>;
};
export type HubReceiptCreateWithoutPhotosInput = {
    id?: string;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
    hub: Prisma.HubCreateNestedOneWithoutReceiptsInput;
    order: Prisma.OrderCreateNestedOneWithoutHubReceiptsInput;
    pickup?: Prisma.PickupRequestCreateNestedOneWithoutReceiptsInput;
};
export type HubReceiptUncheckedCreateWithoutPhotosInput = {
    id?: string;
    hubId: string;
    orderId: string;
    pickupId?: string | null;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
};
export type HubReceiptCreateOrConnectWithoutPhotosInput = {
    where: Prisma.HubReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubReceiptCreateWithoutPhotosInput, Prisma.HubReceiptUncheckedCreateWithoutPhotosInput>;
};
export type HubReceiptUpsertWithoutPhotosInput = {
    update: Prisma.XOR<Prisma.HubReceiptUpdateWithoutPhotosInput, Prisma.HubReceiptUncheckedUpdateWithoutPhotosInput>;
    create: Prisma.XOR<Prisma.HubReceiptCreateWithoutPhotosInput, Prisma.HubReceiptUncheckedCreateWithoutPhotosInput>;
    where?: Prisma.HubReceiptWhereInput;
};
export type HubReceiptUpdateToOneWithWhereWithoutPhotosInput = {
    where?: Prisma.HubReceiptWhereInput;
    data: Prisma.XOR<Prisma.HubReceiptUpdateWithoutPhotosInput, Prisma.HubReceiptUncheckedUpdateWithoutPhotosInput>;
};
export type HubReceiptUpdateWithoutPhotosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hub?: Prisma.HubUpdateOneRequiredWithoutReceiptsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutHubReceiptsNestedInput;
    pickup?: Prisma.PickupRequestUpdateOneWithoutReceiptsNestedInput;
};
export type HubReceiptUncheckedUpdateWithoutPhotosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type HubReceiptCreateManyOrderInput = {
    id?: string;
    hubId: string;
    pickupId?: string | null;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
};
export type HubReceiptUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hub?: Prisma.HubUpdateOneRequiredWithoutReceiptsNestedInput;
    pickup?: Prisma.PickupRequestUpdateOneWithoutReceiptsNestedInput;
    photos?: Prisma.HubReceiptPhotoUpdateManyWithoutReceiptNestedInput;
};
export type HubReceiptUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photos?: Prisma.HubReceiptPhotoUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type HubReceiptUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type HubReceiptCreateManyHubInput = {
    id?: string;
    orderId: string;
    pickupId?: string | null;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
};
export type HubReceiptUpdateWithoutHubInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.OrderUpdateOneRequiredWithoutHubReceiptsNestedInput;
    pickup?: Prisma.PickupRequestUpdateOneWithoutReceiptsNestedInput;
    photos?: Prisma.HubReceiptPhotoUpdateManyWithoutReceiptNestedInput;
};
export type HubReceiptUncheckedUpdateWithoutHubInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photos?: Prisma.HubReceiptPhotoUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type HubReceiptUncheckedUpdateManyWithoutHubInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type HubReceiptCreateManyPickupInput = {
    id?: string;
    hubId: string;
    orderId: string;
    receivedById: string;
    receivedAt?: Date | string;
    cartonsExpected: number;
    cartonsReceived: number;
    grossWeightGrams?: number | null;
    condition: $Enums.HubReceiptCondition;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: string | null;
};
export type HubReceiptUpdateWithoutPickupInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hub?: Prisma.HubUpdateOneRequiredWithoutReceiptsNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutHubReceiptsNestedInput;
    photos?: Prisma.HubReceiptPhotoUpdateManyWithoutReceiptNestedInput;
};
export type HubReceiptUncheckedUpdateWithoutPickupInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photos?: Prisma.HubReceiptPhotoUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type HubReceiptUncheckedUpdateManyWithoutPickupInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hubId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedById?: Prisma.StringFieldUpdateOperationsInput | string;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cartonsExpected?: Prisma.IntFieldUpdateOperationsInput | number;
    cartonsReceived?: Prisma.IntFieldUpdateOperationsInput | number;
    grossWeightGrams?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    condition?: Prisma.EnumHubReceiptConditionFieldUpdateOperationsInput | $Enums.HubReceiptCondition;
    repacked?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    relabelled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type HubReceiptCountOutputType = {
    photos: number;
};
export type HubReceiptCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    photos?: boolean | HubReceiptCountOutputTypeCountPhotosArgs;
};
export type HubReceiptCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptCountOutputTypeSelect<ExtArgs> | null;
};
export type HubReceiptCountOutputTypeCountPhotosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubReceiptPhotoWhereInput;
};
export type HubReceiptSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hubId?: boolean;
    orderId?: boolean;
    pickupId?: boolean;
    receivedById?: boolean;
    receivedAt?: boolean;
    cartonsExpected?: boolean;
    cartonsReceived?: boolean;
    grossWeightGrams?: boolean;
    condition?: boolean;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: boolean;
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    pickup?: boolean | Prisma.HubReceipt$pickupArgs<ExtArgs>;
    photos?: boolean | Prisma.HubReceipt$photosArgs<ExtArgs>;
    _count?: boolean | Prisma.HubReceiptCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hubReceipt"]>;
export type HubReceiptSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hubId?: boolean;
    orderId?: boolean;
    pickupId?: boolean;
    receivedById?: boolean;
    receivedAt?: boolean;
    cartonsExpected?: boolean;
    cartonsReceived?: boolean;
    grossWeightGrams?: boolean;
    condition?: boolean;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: boolean;
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    pickup?: boolean | Prisma.HubReceipt$pickupArgs<ExtArgs>;
}, ExtArgs["result"]["hubReceipt"]>;
export type HubReceiptSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hubId?: boolean;
    orderId?: boolean;
    pickupId?: boolean;
    receivedById?: boolean;
    receivedAt?: boolean;
    cartonsExpected?: boolean;
    cartonsReceived?: boolean;
    grossWeightGrams?: boolean;
    condition?: boolean;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: boolean;
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    pickup?: boolean | Prisma.HubReceipt$pickupArgs<ExtArgs>;
}, ExtArgs["result"]["hubReceipt"]>;
export type HubReceiptSelectScalar = {
    id?: boolean;
    hubId?: boolean;
    orderId?: boolean;
    pickupId?: boolean;
    receivedById?: boolean;
    receivedAt?: boolean;
    cartonsExpected?: boolean;
    cartonsReceived?: boolean;
    grossWeightGrams?: boolean;
    condition?: boolean;
    repacked?: boolean;
    relabelled?: boolean;
    notes?: boolean;
};
export type HubReceiptOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hubId" | "orderId" | "pickupId" | "receivedById" | "receivedAt" | "cartonsExpected" | "cartonsReceived" | "grossWeightGrams" | "condition" | "repacked" | "relabelled" | "notes", ExtArgs["result"]["hubReceipt"]>;
export type HubReceiptInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    pickup?: boolean | Prisma.HubReceipt$pickupArgs<ExtArgs>;
    photos?: boolean | Prisma.HubReceipt$photosArgs<ExtArgs>;
    _count?: boolean | Prisma.HubReceiptCountOutputTypeDefaultArgs<ExtArgs>;
};
export type HubReceiptIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    pickup?: boolean | Prisma.HubReceipt$pickupArgs<ExtArgs>;
};
export type HubReceiptIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    hub?: boolean | Prisma.HubDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    pickup?: boolean | Prisma.HubReceipt$pickupArgs<ExtArgs>;
};
export type $HubReceiptPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HubReceipt";
    objects: {
        hub: Prisma.$HubPayload<ExtArgs>;
        order: Prisma.$OrderPayload<ExtArgs>;
        pickup: Prisma.$PickupRequestPayload<ExtArgs> | null;
        photos: Prisma.$HubReceiptPhotoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        hubId: string;
        orderId: string;
        pickupId: string | null;
        receivedById: string;
        receivedAt: Date;
        cartonsExpected: number;
        cartonsReceived: number;
        grossWeightGrams: number | null;
        condition: $Enums.HubReceiptCondition;
        repacked: boolean;
        relabelled: boolean;
        notes: string | null;
    }, ExtArgs["result"]["hubReceipt"]>;
    composites: {};
};
export type HubReceiptGetPayload<S extends boolean | null | undefined | HubReceiptDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload, S>;
export type HubReceiptCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HubReceiptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HubReceiptCountAggregateInputType | true;
};
export interface HubReceiptDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HubReceipt'];
        meta: {
            name: 'HubReceipt';
        };
    };
    findUnique<T extends HubReceiptFindUniqueArgs>(args: Prisma.SelectSubset<T, HubReceiptFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HubReceiptClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends HubReceiptFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HubReceiptFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HubReceiptClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends HubReceiptFindFirstArgs>(args?: Prisma.SelectSubset<T, HubReceiptFindFirstArgs<ExtArgs>>): Prisma.Prisma__HubReceiptClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends HubReceiptFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HubReceiptFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HubReceiptClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends HubReceiptFindManyArgs>(args?: Prisma.SelectSubset<T, HubReceiptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends HubReceiptCreateArgs>(args: Prisma.SelectSubset<T, HubReceiptCreateArgs<ExtArgs>>): Prisma.Prisma__HubReceiptClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends HubReceiptCreateManyArgs>(args?: Prisma.SelectSubset<T, HubReceiptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends HubReceiptCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HubReceiptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends HubReceiptDeleteArgs>(args: Prisma.SelectSubset<T, HubReceiptDeleteArgs<ExtArgs>>): Prisma.Prisma__HubReceiptClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends HubReceiptUpdateArgs>(args: Prisma.SelectSubset<T, HubReceiptUpdateArgs<ExtArgs>>): Prisma.Prisma__HubReceiptClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends HubReceiptDeleteManyArgs>(args?: Prisma.SelectSubset<T, HubReceiptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends HubReceiptUpdateManyArgs>(args: Prisma.SelectSubset<T, HubReceiptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends HubReceiptUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HubReceiptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends HubReceiptUpsertArgs>(args: Prisma.SelectSubset<T, HubReceiptUpsertArgs<ExtArgs>>): Prisma.Prisma__HubReceiptClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends HubReceiptCountArgs>(args?: Prisma.Subset<T, HubReceiptCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HubReceiptCountAggregateOutputType> : number>;
    aggregate<T extends HubReceiptAggregateArgs>(args: Prisma.Subset<T, HubReceiptAggregateArgs>): Prisma.PrismaPromise<GetHubReceiptAggregateType<T>>;
    groupBy<T extends HubReceiptGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HubReceiptGroupByArgs['orderBy'];
    } : {
        orderBy?: HubReceiptGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HubReceiptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHubReceiptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: HubReceiptFieldRefs;
}
export interface Prisma__HubReceiptClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    hub<T extends Prisma.HubDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.HubDefaultArgs<ExtArgs>>): Prisma.Prisma__HubClient<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    pickup<T extends Prisma.HubReceipt$pickupArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.HubReceipt$pickupArgs<ExtArgs>>): Prisma.Prisma__PickupRequestClient<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    photos<T extends Prisma.HubReceipt$photosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.HubReceipt$photosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface HubReceiptFieldRefs {
    readonly id: Prisma.FieldRef<"HubReceipt", 'String'>;
    readonly hubId: Prisma.FieldRef<"HubReceipt", 'String'>;
    readonly orderId: Prisma.FieldRef<"HubReceipt", 'String'>;
    readonly pickupId: Prisma.FieldRef<"HubReceipt", 'String'>;
    readonly receivedById: Prisma.FieldRef<"HubReceipt", 'String'>;
    readonly receivedAt: Prisma.FieldRef<"HubReceipt", 'DateTime'>;
    readonly cartonsExpected: Prisma.FieldRef<"HubReceipt", 'Int'>;
    readonly cartonsReceived: Prisma.FieldRef<"HubReceipt", 'Int'>;
    readonly grossWeightGrams: Prisma.FieldRef<"HubReceipt", 'Int'>;
    readonly condition: Prisma.FieldRef<"HubReceipt", 'HubReceiptCondition'>;
    readonly repacked: Prisma.FieldRef<"HubReceipt", 'Boolean'>;
    readonly relabelled: Prisma.FieldRef<"HubReceipt", 'Boolean'>;
    readonly notes: Prisma.FieldRef<"HubReceipt", 'String'>;
}
export type HubReceiptFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptInclude<ExtArgs> | null;
    where: Prisma.HubReceiptWhereUniqueInput;
};
export type HubReceiptFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptInclude<ExtArgs> | null;
    where: Prisma.HubReceiptWhereUniqueInput;
};
export type HubReceiptFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type HubReceiptFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type HubReceiptFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type HubReceiptCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HubReceiptCreateInput, Prisma.HubReceiptUncheckedCreateInput>;
};
export type HubReceiptCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.HubReceiptCreateManyInput | Prisma.HubReceiptCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HubReceiptCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HubReceiptOmit<ExtArgs> | null;
    data: Prisma.HubReceiptCreateManyInput | Prisma.HubReceiptCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.HubReceiptIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type HubReceiptUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HubReceiptUpdateInput, Prisma.HubReceiptUncheckedUpdateInput>;
    where: Prisma.HubReceiptWhereUniqueInput;
};
export type HubReceiptUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.HubReceiptUpdateManyMutationInput, Prisma.HubReceiptUncheckedUpdateManyInput>;
    where?: Prisma.HubReceiptWhereInput;
    limit?: number;
};
export type HubReceiptUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HubReceiptOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HubReceiptUpdateManyMutationInput, Prisma.HubReceiptUncheckedUpdateManyInput>;
    where?: Prisma.HubReceiptWhereInput;
    limit?: number;
    include?: Prisma.HubReceiptIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type HubReceiptUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptInclude<ExtArgs> | null;
    where: Prisma.HubReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubReceiptCreateInput, Prisma.HubReceiptUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.HubReceiptUpdateInput, Prisma.HubReceiptUncheckedUpdateInput>;
};
export type HubReceiptDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptInclude<ExtArgs> | null;
    where: Prisma.HubReceiptWhereUniqueInput;
};
export type HubReceiptDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubReceiptWhereInput;
    limit?: number;
};
export type HubReceipt$pickupArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    where?: Prisma.PickupRequestWhereInput;
};
export type HubReceipt$photosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptPhotoInclude<ExtArgs> | null;
    where?: Prisma.HubReceiptPhotoWhereInput;
    orderBy?: Prisma.HubReceiptPhotoOrderByWithRelationInput | Prisma.HubReceiptPhotoOrderByWithRelationInput[];
    cursor?: Prisma.HubReceiptPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HubReceiptPhotoScalarFieldEnum | Prisma.HubReceiptPhotoScalarFieldEnum[];
};
export type HubReceiptDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptInclude<ExtArgs> | null;
};
