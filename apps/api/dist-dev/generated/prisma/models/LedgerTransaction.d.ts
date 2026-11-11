import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LedgerTransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$LedgerTransactionPayload>;
export type AggregateLedgerTransaction = {
    _count: LedgerTransactionCountAggregateOutputType | null;
    _avg: LedgerTransactionAvgAggregateOutputType | null;
    _sum: LedgerTransactionSumAggregateOutputType | null;
    _min: LedgerTransactionMinAggregateOutputType | null;
    _max: LedgerTransactionMaxAggregateOutputType | null;
};
export type LedgerTransactionAvgAggregateOutputType = {
    unitsPerUsd: runtime.Decimal | null;
    amountUsdMinor: number | null;
};
export type LedgerTransactionSumAggregateOutputType = {
    unitsPerUsd: runtime.Decimal | null;
    amountUsdMinor: bigint | null;
};
export type LedgerTransactionMinAggregateOutputType = {
    id: string | null;
    kind: $Enums.LedgerTransactionKind | null;
    orderId: string | null;
    capacityBookingId: string | null;
    paymentId: string | null;
    currency: $Enums.Currency | null;
    description: string | null;
    idempotencyKey: string | null;
    postedAt: Date | null;
    unitsPerUsd: runtime.Decimal | null;
    amountUsdMinor: bigint | null;
};
export type LedgerTransactionMaxAggregateOutputType = {
    id: string | null;
    kind: $Enums.LedgerTransactionKind | null;
    orderId: string | null;
    capacityBookingId: string | null;
    paymentId: string | null;
    currency: $Enums.Currency | null;
    description: string | null;
    idempotencyKey: string | null;
    postedAt: Date | null;
    unitsPerUsd: runtime.Decimal | null;
    amountUsdMinor: bigint | null;
};
export type LedgerTransactionCountAggregateOutputType = {
    id: number;
    kind: number;
    orderId: number;
    capacityBookingId: number;
    paymentId: number;
    currency: number;
    description: number;
    idempotencyKey: number;
    postedAt: number;
    unitsPerUsd: number;
    amountUsdMinor: number;
    _all: number;
};
export type LedgerTransactionAvgAggregateInputType = {
    unitsPerUsd?: true;
    amountUsdMinor?: true;
};
export type LedgerTransactionSumAggregateInputType = {
    unitsPerUsd?: true;
    amountUsdMinor?: true;
};
export type LedgerTransactionMinAggregateInputType = {
    id?: true;
    kind?: true;
    orderId?: true;
    capacityBookingId?: true;
    paymentId?: true;
    currency?: true;
    description?: true;
    idempotencyKey?: true;
    postedAt?: true;
    unitsPerUsd?: true;
    amountUsdMinor?: true;
};
export type LedgerTransactionMaxAggregateInputType = {
    id?: true;
    kind?: true;
    orderId?: true;
    capacityBookingId?: true;
    paymentId?: true;
    currency?: true;
    description?: true;
    idempotencyKey?: true;
    postedAt?: true;
    unitsPerUsd?: true;
    amountUsdMinor?: true;
};
export type LedgerTransactionCountAggregateInputType = {
    id?: true;
    kind?: true;
    orderId?: true;
    capacityBookingId?: true;
    paymentId?: true;
    currency?: true;
    description?: true;
    idempotencyKey?: true;
    postedAt?: true;
    unitsPerUsd?: true;
    amountUsdMinor?: true;
    _all?: true;
};
export type LedgerTransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LedgerTransactionWhereInput;
    orderBy?: Prisma.LedgerTransactionOrderByWithRelationInput | Prisma.LedgerTransactionOrderByWithRelationInput[];
    cursor?: Prisma.LedgerTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LedgerTransactionCountAggregateInputType;
    _avg?: LedgerTransactionAvgAggregateInputType;
    _sum?: LedgerTransactionSumAggregateInputType;
    _min?: LedgerTransactionMinAggregateInputType;
    _max?: LedgerTransactionMaxAggregateInputType;
};
export type GetLedgerTransactionAggregateType<T extends LedgerTransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateLedgerTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLedgerTransaction[P]> : Prisma.GetScalarType<T[P], AggregateLedgerTransaction[P]>;
};
export type LedgerTransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LedgerTransactionWhereInput;
    orderBy?: Prisma.LedgerTransactionOrderByWithAggregationInput | Prisma.LedgerTransactionOrderByWithAggregationInput[];
    by: Prisma.LedgerTransactionScalarFieldEnum[] | Prisma.LedgerTransactionScalarFieldEnum;
    having?: Prisma.LedgerTransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LedgerTransactionCountAggregateInputType | true;
    _avg?: LedgerTransactionAvgAggregateInputType;
    _sum?: LedgerTransactionSumAggregateInputType;
    _min?: LedgerTransactionMinAggregateInputType;
    _max?: LedgerTransactionMaxAggregateInputType;
};
export type LedgerTransactionGroupByOutputType = {
    id: string;
    kind: $Enums.LedgerTransactionKind;
    orderId: string | null;
    capacityBookingId: string | null;
    paymentId: string | null;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt: Date;
    unitsPerUsd: runtime.Decimal;
    amountUsdMinor: bigint;
    _count: LedgerTransactionCountAggregateOutputType | null;
    _avg: LedgerTransactionAvgAggregateOutputType | null;
    _sum: LedgerTransactionSumAggregateOutputType | null;
    _min: LedgerTransactionMinAggregateOutputType | null;
    _max: LedgerTransactionMaxAggregateOutputType | null;
};
export type GetLedgerTransactionGroupByPayload<T extends LedgerTransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LedgerTransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LedgerTransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LedgerTransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LedgerTransactionGroupByOutputType[P]>;
}>>;
export type LedgerTransactionWhereInput = {
    AND?: Prisma.LedgerTransactionWhereInput | Prisma.LedgerTransactionWhereInput[];
    OR?: Prisma.LedgerTransactionWhereInput[];
    NOT?: Prisma.LedgerTransactionWhereInput | Prisma.LedgerTransactionWhereInput[];
    id?: Prisma.UuidFilter<"LedgerTransaction"> | string;
    kind?: Prisma.EnumLedgerTransactionKindFilter<"LedgerTransaction"> | $Enums.LedgerTransactionKind;
    orderId?: Prisma.UuidNullableFilter<"LedgerTransaction"> | string | null;
    capacityBookingId?: Prisma.UuidNullableFilter<"LedgerTransaction"> | string | null;
    paymentId?: Prisma.UuidNullableFilter<"LedgerTransaction"> | string | null;
    currency?: Prisma.EnumCurrencyFilter<"LedgerTransaction"> | $Enums.Currency;
    description?: Prisma.StringFilter<"LedgerTransaction"> | string;
    idempotencyKey?: Prisma.StringFilter<"LedgerTransaction"> | string;
    postedAt?: Prisma.DateTimeFilter<"LedgerTransaction"> | Date | string;
    unitsPerUsd?: Prisma.DecimalFilter<"LedgerTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFilter<"LedgerTransaction"> | bigint | number;
    order?: Prisma.XOR<Prisma.OrderNullableScalarRelationFilter, Prisma.OrderWhereInput> | null;
    capacityBooking?: Prisma.XOR<Prisma.CapacityBookingNullableScalarRelationFilter, Prisma.CapacityBookingWhereInput> | null;
    payment?: Prisma.XOR<Prisma.PaymentNullableScalarRelationFilter, Prisma.PaymentWhereInput> | null;
    entries?: Prisma.EscrowLedgerEntryListRelationFilter;
};
export type LedgerTransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    orderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    capacityBookingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    unitsPerUsd?: Prisma.SortOrder;
    amountUsdMinor?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
    capacityBooking?: Prisma.CapacityBookingOrderByWithRelationInput;
    payment?: Prisma.PaymentOrderByWithRelationInput;
    entries?: Prisma.EscrowLedgerEntryOrderByRelationAggregateInput;
};
export type LedgerTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    idempotencyKey?: string;
    AND?: Prisma.LedgerTransactionWhereInput | Prisma.LedgerTransactionWhereInput[];
    OR?: Prisma.LedgerTransactionWhereInput[];
    NOT?: Prisma.LedgerTransactionWhereInput | Prisma.LedgerTransactionWhereInput[];
    kind?: Prisma.EnumLedgerTransactionKindFilter<"LedgerTransaction"> | $Enums.LedgerTransactionKind;
    orderId?: Prisma.UuidNullableFilter<"LedgerTransaction"> | string | null;
    capacityBookingId?: Prisma.UuidNullableFilter<"LedgerTransaction"> | string | null;
    paymentId?: Prisma.UuidNullableFilter<"LedgerTransaction"> | string | null;
    currency?: Prisma.EnumCurrencyFilter<"LedgerTransaction"> | $Enums.Currency;
    description?: Prisma.StringFilter<"LedgerTransaction"> | string;
    postedAt?: Prisma.DateTimeFilter<"LedgerTransaction"> | Date | string;
    unitsPerUsd?: Prisma.DecimalFilter<"LedgerTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFilter<"LedgerTransaction"> | bigint | number;
    order?: Prisma.XOR<Prisma.OrderNullableScalarRelationFilter, Prisma.OrderWhereInput> | null;
    capacityBooking?: Prisma.XOR<Prisma.CapacityBookingNullableScalarRelationFilter, Prisma.CapacityBookingWhereInput> | null;
    payment?: Prisma.XOR<Prisma.PaymentNullableScalarRelationFilter, Prisma.PaymentWhereInput> | null;
    entries?: Prisma.EscrowLedgerEntryListRelationFilter;
}, "id" | "idempotencyKey">;
export type LedgerTransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    orderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    capacityBookingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    paymentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    unitsPerUsd?: Prisma.SortOrder;
    amountUsdMinor?: Prisma.SortOrder;
    _count?: Prisma.LedgerTransactionCountOrderByAggregateInput;
    _avg?: Prisma.LedgerTransactionAvgOrderByAggregateInput;
    _max?: Prisma.LedgerTransactionMaxOrderByAggregateInput;
    _min?: Prisma.LedgerTransactionMinOrderByAggregateInput;
    _sum?: Prisma.LedgerTransactionSumOrderByAggregateInput;
};
export type LedgerTransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.LedgerTransactionScalarWhereWithAggregatesInput | Prisma.LedgerTransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.LedgerTransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LedgerTransactionScalarWhereWithAggregatesInput | Prisma.LedgerTransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"LedgerTransaction"> | string;
    kind?: Prisma.EnumLedgerTransactionKindWithAggregatesFilter<"LedgerTransaction"> | $Enums.LedgerTransactionKind;
    orderId?: Prisma.UuidNullableWithAggregatesFilter<"LedgerTransaction"> | string | null;
    capacityBookingId?: Prisma.UuidNullableWithAggregatesFilter<"LedgerTransaction"> | string | null;
    paymentId?: Prisma.UuidNullableWithAggregatesFilter<"LedgerTransaction"> | string | null;
    currency?: Prisma.EnumCurrencyWithAggregatesFilter<"LedgerTransaction"> | $Enums.Currency;
    description?: Prisma.StringWithAggregatesFilter<"LedgerTransaction"> | string;
    idempotencyKey?: Prisma.StringWithAggregatesFilter<"LedgerTransaction"> | string;
    postedAt?: Prisma.DateTimeWithAggregatesFilter<"LedgerTransaction"> | Date | string;
    unitsPerUsd?: Prisma.DecimalWithAggregatesFilter<"LedgerTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntWithAggregatesFilter<"LedgerTransaction"> | bigint | number;
};
export type LedgerTransactionCreateInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
    order?: Prisma.OrderCreateNestedOneWithoutLedgerTransactionsInput;
    capacityBooking?: Prisma.CapacityBookingCreateNestedOneWithoutLedgerTransactionsInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutTransactionsInput;
    entries?: Prisma.EscrowLedgerEntryCreateNestedManyWithoutTransactionInput;
};
export type LedgerTransactionUncheckedCreateInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    orderId?: string | null;
    capacityBookingId?: string | null;
    paymentId?: string | null;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
    entries?: Prisma.EscrowLedgerEntryUncheckedCreateNestedManyWithoutTransactionInput;
};
export type LedgerTransactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    order?: Prisma.OrderUpdateOneWithoutLedgerTransactionsNestedInput;
    capacityBooking?: Prisma.CapacityBookingUpdateOneWithoutLedgerTransactionsNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutTransactionsNestedInput;
    entries?: Prisma.EscrowLedgerEntryUpdateManyWithoutTransactionNestedInput;
};
export type LedgerTransactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityBookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    entries?: Prisma.EscrowLedgerEntryUncheckedUpdateManyWithoutTransactionNestedInput;
};
export type LedgerTransactionCreateManyInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    orderId?: string | null;
    capacityBookingId?: string | null;
    paymentId?: string | null;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
};
export type LedgerTransactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LedgerTransactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityBookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LedgerTransactionListRelationFilter = {
    every?: Prisma.LedgerTransactionWhereInput;
    some?: Prisma.LedgerTransactionWhereInput;
    none?: Prisma.LedgerTransactionWhereInput;
};
export type LedgerTransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LedgerTransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    capacityBookingId?: Prisma.SortOrder;
    paymentId?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    unitsPerUsd?: Prisma.SortOrder;
    amountUsdMinor?: Prisma.SortOrder;
};
export type LedgerTransactionAvgOrderByAggregateInput = {
    unitsPerUsd?: Prisma.SortOrder;
    amountUsdMinor?: Prisma.SortOrder;
};
export type LedgerTransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    capacityBookingId?: Prisma.SortOrder;
    paymentId?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    unitsPerUsd?: Prisma.SortOrder;
    amountUsdMinor?: Prisma.SortOrder;
};
export type LedgerTransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    capacityBookingId?: Prisma.SortOrder;
    paymentId?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    unitsPerUsd?: Prisma.SortOrder;
    amountUsdMinor?: Prisma.SortOrder;
};
export type LedgerTransactionSumOrderByAggregateInput = {
    unitsPerUsd?: Prisma.SortOrder;
    amountUsdMinor?: Prisma.SortOrder;
};
export type LedgerTransactionScalarRelationFilter = {
    is?: Prisma.LedgerTransactionWhereInput;
    isNot?: Prisma.LedgerTransactionWhereInput;
};
export type LedgerTransactionCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutOrderInput, Prisma.LedgerTransactionUncheckedCreateWithoutOrderInput> | Prisma.LedgerTransactionCreateWithoutOrderInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutOrderInput | Prisma.LedgerTransactionCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.LedgerTransactionCreateManyOrderInputEnvelope;
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
};
export type LedgerTransactionUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutOrderInput, Prisma.LedgerTransactionUncheckedCreateWithoutOrderInput> | Prisma.LedgerTransactionCreateWithoutOrderInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutOrderInput | Prisma.LedgerTransactionCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.LedgerTransactionCreateManyOrderInputEnvelope;
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
};
export type LedgerTransactionUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutOrderInput, Prisma.LedgerTransactionUncheckedCreateWithoutOrderInput> | Prisma.LedgerTransactionCreateWithoutOrderInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutOrderInput | Prisma.LedgerTransactionCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutOrderInput | Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.LedgerTransactionCreateManyOrderInputEnvelope;
    set?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    disconnect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    delete?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    update?: Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutOrderInput | Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.LedgerTransactionUpdateManyWithWhereWithoutOrderInput | Prisma.LedgerTransactionUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.LedgerTransactionScalarWhereInput | Prisma.LedgerTransactionScalarWhereInput[];
};
export type LedgerTransactionUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutOrderInput, Prisma.LedgerTransactionUncheckedCreateWithoutOrderInput> | Prisma.LedgerTransactionCreateWithoutOrderInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutOrderInput | Prisma.LedgerTransactionCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutOrderInput | Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.LedgerTransactionCreateManyOrderInputEnvelope;
    set?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    disconnect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    delete?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    update?: Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutOrderInput | Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.LedgerTransactionUpdateManyWithWhereWithoutOrderInput | Prisma.LedgerTransactionUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.LedgerTransactionScalarWhereInput | Prisma.LedgerTransactionScalarWhereInput[];
};
export type LedgerTransactionCreateNestedManyWithoutPaymentInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutPaymentInput, Prisma.LedgerTransactionUncheckedCreateWithoutPaymentInput> | Prisma.LedgerTransactionCreateWithoutPaymentInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutPaymentInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutPaymentInput | Prisma.LedgerTransactionCreateOrConnectWithoutPaymentInput[];
    createMany?: Prisma.LedgerTransactionCreateManyPaymentInputEnvelope;
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
};
export type LedgerTransactionUncheckedCreateNestedManyWithoutPaymentInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutPaymentInput, Prisma.LedgerTransactionUncheckedCreateWithoutPaymentInput> | Prisma.LedgerTransactionCreateWithoutPaymentInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutPaymentInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutPaymentInput | Prisma.LedgerTransactionCreateOrConnectWithoutPaymentInput[];
    createMany?: Prisma.LedgerTransactionCreateManyPaymentInputEnvelope;
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
};
export type LedgerTransactionUpdateManyWithoutPaymentNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutPaymentInput, Prisma.LedgerTransactionUncheckedCreateWithoutPaymentInput> | Prisma.LedgerTransactionCreateWithoutPaymentInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutPaymentInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutPaymentInput | Prisma.LedgerTransactionCreateOrConnectWithoutPaymentInput[];
    upsert?: Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutPaymentInput | Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutPaymentInput[];
    createMany?: Prisma.LedgerTransactionCreateManyPaymentInputEnvelope;
    set?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    disconnect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    delete?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    update?: Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutPaymentInput | Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutPaymentInput[];
    updateMany?: Prisma.LedgerTransactionUpdateManyWithWhereWithoutPaymentInput | Prisma.LedgerTransactionUpdateManyWithWhereWithoutPaymentInput[];
    deleteMany?: Prisma.LedgerTransactionScalarWhereInput | Prisma.LedgerTransactionScalarWhereInput[];
};
export type LedgerTransactionUncheckedUpdateManyWithoutPaymentNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutPaymentInput, Prisma.LedgerTransactionUncheckedCreateWithoutPaymentInput> | Prisma.LedgerTransactionCreateWithoutPaymentInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutPaymentInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutPaymentInput | Prisma.LedgerTransactionCreateOrConnectWithoutPaymentInput[];
    upsert?: Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutPaymentInput | Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutPaymentInput[];
    createMany?: Prisma.LedgerTransactionCreateManyPaymentInputEnvelope;
    set?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    disconnect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    delete?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    update?: Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutPaymentInput | Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutPaymentInput[];
    updateMany?: Prisma.LedgerTransactionUpdateManyWithWhereWithoutPaymentInput | Prisma.LedgerTransactionUpdateManyWithWhereWithoutPaymentInput[];
    deleteMany?: Prisma.LedgerTransactionScalarWhereInput | Prisma.LedgerTransactionScalarWhereInput[];
};
export type EnumLedgerTransactionKindFieldUpdateOperationsInput = {
    set?: $Enums.LedgerTransactionKind;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type LedgerTransactionCreateNestedOneWithoutEntriesInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutEntriesInput, Prisma.LedgerTransactionUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutEntriesInput;
    connect?: Prisma.LedgerTransactionWhereUniqueInput;
};
export type LedgerTransactionUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutEntriesInput, Prisma.LedgerTransactionUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutEntriesInput;
    upsert?: Prisma.LedgerTransactionUpsertWithoutEntriesInput;
    connect?: Prisma.LedgerTransactionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LedgerTransactionUpdateToOneWithWhereWithoutEntriesInput, Prisma.LedgerTransactionUpdateWithoutEntriesInput>, Prisma.LedgerTransactionUncheckedUpdateWithoutEntriesInput>;
};
export type LedgerTransactionCreateNestedManyWithoutCapacityBookingInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutCapacityBookingInput, Prisma.LedgerTransactionUncheckedCreateWithoutCapacityBookingInput> | Prisma.LedgerTransactionCreateWithoutCapacityBookingInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutCapacityBookingInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutCapacityBookingInput | Prisma.LedgerTransactionCreateOrConnectWithoutCapacityBookingInput[];
    createMany?: Prisma.LedgerTransactionCreateManyCapacityBookingInputEnvelope;
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
};
export type LedgerTransactionUncheckedCreateNestedManyWithoutCapacityBookingInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutCapacityBookingInput, Prisma.LedgerTransactionUncheckedCreateWithoutCapacityBookingInput> | Prisma.LedgerTransactionCreateWithoutCapacityBookingInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutCapacityBookingInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutCapacityBookingInput | Prisma.LedgerTransactionCreateOrConnectWithoutCapacityBookingInput[];
    createMany?: Prisma.LedgerTransactionCreateManyCapacityBookingInputEnvelope;
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
};
export type LedgerTransactionUpdateManyWithoutCapacityBookingNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutCapacityBookingInput, Prisma.LedgerTransactionUncheckedCreateWithoutCapacityBookingInput> | Prisma.LedgerTransactionCreateWithoutCapacityBookingInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutCapacityBookingInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutCapacityBookingInput | Prisma.LedgerTransactionCreateOrConnectWithoutCapacityBookingInput[];
    upsert?: Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutCapacityBookingInput | Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutCapacityBookingInput[];
    createMany?: Prisma.LedgerTransactionCreateManyCapacityBookingInputEnvelope;
    set?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    disconnect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    delete?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    update?: Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutCapacityBookingInput | Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutCapacityBookingInput[];
    updateMany?: Prisma.LedgerTransactionUpdateManyWithWhereWithoutCapacityBookingInput | Prisma.LedgerTransactionUpdateManyWithWhereWithoutCapacityBookingInput[];
    deleteMany?: Prisma.LedgerTransactionScalarWhereInput | Prisma.LedgerTransactionScalarWhereInput[];
};
export type LedgerTransactionUncheckedUpdateManyWithoutCapacityBookingNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutCapacityBookingInput, Prisma.LedgerTransactionUncheckedCreateWithoutCapacityBookingInput> | Prisma.LedgerTransactionCreateWithoutCapacityBookingInput[] | Prisma.LedgerTransactionUncheckedCreateWithoutCapacityBookingInput[];
    connectOrCreate?: Prisma.LedgerTransactionCreateOrConnectWithoutCapacityBookingInput | Prisma.LedgerTransactionCreateOrConnectWithoutCapacityBookingInput[];
    upsert?: Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutCapacityBookingInput | Prisma.LedgerTransactionUpsertWithWhereUniqueWithoutCapacityBookingInput[];
    createMany?: Prisma.LedgerTransactionCreateManyCapacityBookingInputEnvelope;
    set?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    disconnect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    delete?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    connect?: Prisma.LedgerTransactionWhereUniqueInput | Prisma.LedgerTransactionWhereUniqueInput[];
    update?: Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutCapacityBookingInput | Prisma.LedgerTransactionUpdateWithWhereUniqueWithoutCapacityBookingInput[];
    updateMany?: Prisma.LedgerTransactionUpdateManyWithWhereWithoutCapacityBookingInput | Prisma.LedgerTransactionUpdateManyWithWhereWithoutCapacityBookingInput[];
    deleteMany?: Prisma.LedgerTransactionScalarWhereInput | Prisma.LedgerTransactionScalarWhereInput[];
};
export type LedgerTransactionCreateWithoutOrderInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
    capacityBooking?: Prisma.CapacityBookingCreateNestedOneWithoutLedgerTransactionsInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutTransactionsInput;
    entries?: Prisma.EscrowLedgerEntryCreateNestedManyWithoutTransactionInput;
};
export type LedgerTransactionUncheckedCreateWithoutOrderInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    capacityBookingId?: string | null;
    paymentId?: string | null;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
    entries?: Prisma.EscrowLedgerEntryUncheckedCreateNestedManyWithoutTransactionInput;
};
export type LedgerTransactionCreateOrConnectWithoutOrderInput = {
    where: Prisma.LedgerTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutOrderInput, Prisma.LedgerTransactionUncheckedCreateWithoutOrderInput>;
};
export type LedgerTransactionCreateManyOrderInputEnvelope = {
    data: Prisma.LedgerTransactionCreateManyOrderInput | Prisma.LedgerTransactionCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type LedgerTransactionUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.LedgerTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.LedgerTransactionUpdateWithoutOrderInput, Prisma.LedgerTransactionUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutOrderInput, Prisma.LedgerTransactionUncheckedCreateWithoutOrderInput>;
};
export type LedgerTransactionUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.LedgerTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.LedgerTransactionUpdateWithoutOrderInput, Prisma.LedgerTransactionUncheckedUpdateWithoutOrderInput>;
};
export type LedgerTransactionUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.LedgerTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.LedgerTransactionUpdateManyMutationInput, Prisma.LedgerTransactionUncheckedUpdateManyWithoutOrderInput>;
};
export type LedgerTransactionScalarWhereInput = {
    AND?: Prisma.LedgerTransactionScalarWhereInput | Prisma.LedgerTransactionScalarWhereInput[];
    OR?: Prisma.LedgerTransactionScalarWhereInput[];
    NOT?: Prisma.LedgerTransactionScalarWhereInput | Prisma.LedgerTransactionScalarWhereInput[];
    id?: Prisma.UuidFilter<"LedgerTransaction"> | string;
    kind?: Prisma.EnumLedgerTransactionKindFilter<"LedgerTransaction"> | $Enums.LedgerTransactionKind;
    orderId?: Prisma.UuidNullableFilter<"LedgerTransaction"> | string | null;
    capacityBookingId?: Prisma.UuidNullableFilter<"LedgerTransaction"> | string | null;
    paymentId?: Prisma.UuidNullableFilter<"LedgerTransaction"> | string | null;
    currency?: Prisma.EnumCurrencyFilter<"LedgerTransaction"> | $Enums.Currency;
    description?: Prisma.StringFilter<"LedgerTransaction"> | string;
    idempotencyKey?: Prisma.StringFilter<"LedgerTransaction"> | string;
    postedAt?: Prisma.DateTimeFilter<"LedgerTransaction"> | Date | string;
    unitsPerUsd?: Prisma.DecimalFilter<"LedgerTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFilter<"LedgerTransaction"> | bigint | number;
};
export type LedgerTransactionCreateWithoutPaymentInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
    order?: Prisma.OrderCreateNestedOneWithoutLedgerTransactionsInput;
    capacityBooking?: Prisma.CapacityBookingCreateNestedOneWithoutLedgerTransactionsInput;
    entries?: Prisma.EscrowLedgerEntryCreateNestedManyWithoutTransactionInput;
};
export type LedgerTransactionUncheckedCreateWithoutPaymentInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    orderId?: string | null;
    capacityBookingId?: string | null;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
    entries?: Prisma.EscrowLedgerEntryUncheckedCreateNestedManyWithoutTransactionInput;
};
export type LedgerTransactionCreateOrConnectWithoutPaymentInput = {
    where: Prisma.LedgerTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutPaymentInput, Prisma.LedgerTransactionUncheckedCreateWithoutPaymentInput>;
};
export type LedgerTransactionCreateManyPaymentInputEnvelope = {
    data: Prisma.LedgerTransactionCreateManyPaymentInput | Prisma.LedgerTransactionCreateManyPaymentInput[];
    skipDuplicates?: boolean;
};
export type LedgerTransactionUpsertWithWhereUniqueWithoutPaymentInput = {
    where: Prisma.LedgerTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.LedgerTransactionUpdateWithoutPaymentInput, Prisma.LedgerTransactionUncheckedUpdateWithoutPaymentInput>;
    create: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutPaymentInput, Prisma.LedgerTransactionUncheckedCreateWithoutPaymentInput>;
};
export type LedgerTransactionUpdateWithWhereUniqueWithoutPaymentInput = {
    where: Prisma.LedgerTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.LedgerTransactionUpdateWithoutPaymentInput, Prisma.LedgerTransactionUncheckedUpdateWithoutPaymentInput>;
};
export type LedgerTransactionUpdateManyWithWhereWithoutPaymentInput = {
    where: Prisma.LedgerTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.LedgerTransactionUpdateManyMutationInput, Prisma.LedgerTransactionUncheckedUpdateManyWithoutPaymentInput>;
};
export type LedgerTransactionCreateWithoutEntriesInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
    order?: Prisma.OrderCreateNestedOneWithoutLedgerTransactionsInput;
    capacityBooking?: Prisma.CapacityBookingCreateNestedOneWithoutLedgerTransactionsInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutTransactionsInput;
};
export type LedgerTransactionUncheckedCreateWithoutEntriesInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    orderId?: string | null;
    capacityBookingId?: string | null;
    paymentId?: string | null;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
};
export type LedgerTransactionCreateOrConnectWithoutEntriesInput = {
    where: Prisma.LedgerTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutEntriesInput, Prisma.LedgerTransactionUncheckedCreateWithoutEntriesInput>;
};
export type LedgerTransactionUpsertWithoutEntriesInput = {
    update: Prisma.XOR<Prisma.LedgerTransactionUpdateWithoutEntriesInput, Prisma.LedgerTransactionUncheckedUpdateWithoutEntriesInput>;
    create: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutEntriesInput, Prisma.LedgerTransactionUncheckedCreateWithoutEntriesInput>;
    where?: Prisma.LedgerTransactionWhereInput;
};
export type LedgerTransactionUpdateToOneWithWhereWithoutEntriesInput = {
    where?: Prisma.LedgerTransactionWhereInput;
    data: Prisma.XOR<Prisma.LedgerTransactionUpdateWithoutEntriesInput, Prisma.LedgerTransactionUncheckedUpdateWithoutEntriesInput>;
};
export type LedgerTransactionUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    order?: Prisma.OrderUpdateOneWithoutLedgerTransactionsNestedInput;
    capacityBooking?: Prisma.CapacityBookingUpdateOneWithoutLedgerTransactionsNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutTransactionsNestedInput;
};
export type LedgerTransactionUncheckedUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityBookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LedgerTransactionCreateWithoutCapacityBookingInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
    order?: Prisma.OrderCreateNestedOneWithoutLedgerTransactionsInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutTransactionsInput;
    entries?: Prisma.EscrowLedgerEntryCreateNestedManyWithoutTransactionInput;
};
export type LedgerTransactionUncheckedCreateWithoutCapacityBookingInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    orderId?: string | null;
    paymentId?: string | null;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
    entries?: Prisma.EscrowLedgerEntryUncheckedCreateNestedManyWithoutTransactionInput;
};
export type LedgerTransactionCreateOrConnectWithoutCapacityBookingInput = {
    where: Prisma.LedgerTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutCapacityBookingInput, Prisma.LedgerTransactionUncheckedCreateWithoutCapacityBookingInput>;
};
export type LedgerTransactionCreateManyCapacityBookingInputEnvelope = {
    data: Prisma.LedgerTransactionCreateManyCapacityBookingInput | Prisma.LedgerTransactionCreateManyCapacityBookingInput[];
    skipDuplicates?: boolean;
};
export type LedgerTransactionUpsertWithWhereUniqueWithoutCapacityBookingInput = {
    where: Prisma.LedgerTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.LedgerTransactionUpdateWithoutCapacityBookingInput, Prisma.LedgerTransactionUncheckedUpdateWithoutCapacityBookingInput>;
    create: Prisma.XOR<Prisma.LedgerTransactionCreateWithoutCapacityBookingInput, Prisma.LedgerTransactionUncheckedCreateWithoutCapacityBookingInput>;
};
export type LedgerTransactionUpdateWithWhereUniqueWithoutCapacityBookingInput = {
    where: Prisma.LedgerTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.LedgerTransactionUpdateWithoutCapacityBookingInput, Prisma.LedgerTransactionUncheckedUpdateWithoutCapacityBookingInput>;
};
export type LedgerTransactionUpdateManyWithWhereWithoutCapacityBookingInput = {
    where: Prisma.LedgerTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.LedgerTransactionUpdateManyMutationInput, Prisma.LedgerTransactionUncheckedUpdateManyWithoutCapacityBookingInput>;
};
export type LedgerTransactionCreateManyOrderInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    capacityBookingId?: string | null;
    paymentId?: string | null;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
};
export type LedgerTransactionUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    capacityBooking?: Prisma.CapacityBookingUpdateOneWithoutLedgerTransactionsNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutTransactionsNestedInput;
    entries?: Prisma.EscrowLedgerEntryUpdateManyWithoutTransactionNestedInput;
};
export type LedgerTransactionUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    capacityBookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    entries?: Prisma.EscrowLedgerEntryUncheckedUpdateManyWithoutTransactionNestedInput;
};
export type LedgerTransactionUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    capacityBookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LedgerTransactionCreateManyPaymentInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    orderId?: string | null;
    capacityBookingId?: string | null;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
};
export type LedgerTransactionUpdateWithoutPaymentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    order?: Prisma.OrderUpdateOneWithoutLedgerTransactionsNestedInput;
    capacityBooking?: Prisma.CapacityBookingUpdateOneWithoutLedgerTransactionsNestedInput;
    entries?: Prisma.EscrowLedgerEntryUpdateManyWithoutTransactionNestedInput;
};
export type LedgerTransactionUncheckedUpdateWithoutPaymentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityBookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    entries?: Prisma.EscrowLedgerEntryUncheckedUpdateManyWithoutTransactionNestedInput;
};
export type LedgerTransactionUncheckedUpdateManyWithoutPaymentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityBookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LedgerTransactionCreateManyCapacityBookingInput = {
    id?: string;
    kind: $Enums.LedgerTransactionKind;
    orderId?: string | null;
    paymentId?: string | null;
    currency: $Enums.Currency;
    description: string;
    idempotencyKey: string;
    postedAt?: Date | string;
    unitsPerUsd?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: bigint | number;
};
export type LedgerTransactionUpdateWithoutCapacityBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    order?: Prisma.OrderUpdateOneWithoutLedgerTransactionsNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutTransactionsNestedInput;
    entries?: Prisma.EscrowLedgerEntryUpdateManyWithoutTransactionNestedInput;
};
export type LedgerTransactionUncheckedUpdateWithoutCapacityBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    entries?: Prisma.EscrowLedgerEntryUncheckedUpdateManyWithoutTransactionNestedInput;
};
export type LedgerTransactionUncheckedUpdateManyWithoutCapacityBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLedgerTransactionKindFieldUpdateOperationsInput | $Enums.LedgerTransactionKind;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    postedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amountUsdMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
};
export type LedgerTransactionCountOutputType = {
    entries: number;
};
export type LedgerTransactionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entries?: boolean | LedgerTransactionCountOutputTypeCountEntriesArgs;
};
export type LedgerTransactionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionCountOutputTypeSelect<ExtArgs> | null;
};
export type LedgerTransactionCountOutputTypeCountEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EscrowLedgerEntryWhereInput;
};
export type LedgerTransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    kind?: boolean;
    orderId?: boolean;
    capacityBookingId?: boolean;
    paymentId?: boolean;
    currency?: boolean;
    description?: boolean;
    idempotencyKey?: boolean;
    postedAt?: boolean;
    unitsPerUsd?: boolean;
    amountUsdMinor?: boolean;
    order?: boolean | Prisma.LedgerTransaction$orderArgs<ExtArgs>;
    capacityBooking?: boolean | Prisma.LedgerTransaction$capacityBookingArgs<ExtArgs>;
    payment?: boolean | Prisma.LedgerTransaction$paymentArgs<ExtArgs>;
    entries?: boolean | Prisma.LedgerTransaction$entriesArgs<ExtArgs>;
    _count?: boolean | Prisma.LedgerTransactionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ledgerTransaction"]>;
export type LedgerTransactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    kind?: boolean;
    orderId?: boolean;
    capacityBookingId?: boolean;
    paymentId?: boolean;
    currency?: boolean;
    description?: boolean;
    idempotencyKey?: boolean;
    postedAt?: boolean;
    unitsPerUsd?: boolean;
    amountUsdMinor?: boolean;
    order?: boolean | Prisma.LedgerTransaction$orderArgs<ExtArgs>;
    capacityBooking?: boolean | Prisma.LedgerTransaction$capacityBookingArgs<ExtArgs>;
    payment?: boolean | Prisma.LedgerTransaction$paymentArgs<ExtArgs>;
}, ExtArgs["result"]["ledgerTransaction"]>;
export type LedgerTransactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    kind?: boolean;
    orderId?: boolean;
    capacityBookingId?: boolean;
    paymentId?: boolean;
    currency?: boolean;
    description?: boolean;
    idempotencyKey?: boolean;
    postedAt?: boolean;
    unitsPerUsd?: boolean;
    amountUsdMinor?: boolean;
    order?: boolean | Prisma.LedgerTransaction$orderArgs<ExtArgs>;
    capacityBooking?: boolean | Prisma.LedgerTransaction$capacityBookingArgs<ExtArgs>;
    payment?: boolean | Prisma.LedgerTransaction$paymentArgs<ExtArgs>;
}, ExtArgs["result"]["ledgerTransaction"]>;
export type LedgerTransactionSelectScalar = {
    id?: boolean;
    kind?: boolean;
    orderId?: boolean;
    capacityBookingId?: boolean;
    paymentId?: boolean;
    currency?: boolean;
    description?: boolean;
    idempotencyKey?: boolean;
    postedAt?: boolean;
    unitsPerUsd?: boolean;
    amountUsdMinor?: boolean;
};
export type LedgerTransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "kind" | "orderId" | "capacityBookingId" | "paymentId" | "currency" | "description" | "idempotencyKey" | "postedAt" | "unitsPerUsd" | "amountUsdMinor", ExtArgs["result"]["ledgerTransaction"]>;
export type LedgerTransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.LedgerTransaction$orderArgs<ExtArgs>;
    capacityBooking?: boolean | Prisma.LedgerTransaction$capacityBookingArgs<ExtArgs>;
    payment?: boolean | Prisma.LedgerTransaction$paymentArgs<ExtArgs>;
    entries?: boolean | Prisma.LedgerTransaction$entriesArgs<ExtArgs>;
    _count?: boolean | Prisma.LedgerTransactionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type LedgerTransactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.LedgerTransaction$orderArgs<ExtArgs>;
    capacityBooking?: boolean | Prisma.LedgerTransaction$capacityBookingArgs<ExtArgs>;
    payment?: boolean | Prisma.LedgerTransaction$paymentArgs<ExtArgs>;
};
export type LedgerTransactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.LedgerTransaction$orderArgs<ExtArgs>;
    capacityBooking?: boolean | Prisma.LedgerTransaction$capacityBookingArgs<ExtArgs>;
    payment?: boolean | Prisma.LedgerTransaction$paymentArgs<ExtArgs>;
};
export type $LedgerTransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LedgerTransaction";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs> | null;
        capacityBooking: Prisma.$CapacityBookingPayload<ExtArgs> | null;
        payment: Prisma.$PaymentPayload<ExtArgs> | null;
        entries: Prisma.$EscrowLedgerEntryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        kind: $Enums.LedgerTransactionKind;
        orderId: string | null;
        capacityBookingId: string | null;
        paymentId: string | null;
        currency: $Enums.Currency;
        description: string;
        idempotencyKey: string;
        postedAt: Date;
        unitsPerUsd: runtime.Decimal;
        amountUsdMinor: bigint;
    }, ExtArgs["result"]["ledgerTransaction"]>;
    composites: {};
};
export type LedgerTransactionGetPayload<S extends boolean | null | undefined | LedgerTransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload, S>;
export type LedgerTransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LedgerTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LedgerTransactionCountAggregateInputType | true;
};
export interface LedgerTransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LedgerTransaction'];
        meta: {
            name: 'LedgerTransaction';
        };
    };
    findUnique<T extends LedgerTransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, LedgerTransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LedgerTransactionClient<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LedgerTransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LedgerTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LedgerTransactionClient<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LedgerTransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, LedgerTransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__LedgerTransactionClient<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LedgerTransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LedgerTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LedgerTransactionClient<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LedgerTransactionFindManyArgs>(args?: Prisma.SelectSubset<T, LedgerTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LedgerTransactionCreateArgs>(args: Prisma.SelectSubset<T, LedgerTransactionCreateArgs<ExtArgs>>): Prisma.Prisma__LedgerTransactionClient<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LedgerTransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, LedgerTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LedgerTransactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LedgerTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LedgerTransactionDeleteArgs>(args: Prisma.SelectSubset<T, LedgerTransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__LedgerTransactionClient<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LedgerTransactionUpdateArgs>(args: Prisma.SelectSubset<T, LedgerTransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__LedgerTransactionClient<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LedgerTransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, LedgerTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LedgerTransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, LedgerTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LedgerTransactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LedgerTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LedgerTransactionUpsertArgs>(args: Prisma.SelectSubset<T, LedgerTransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__LedgerTransactionClient<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LedgerTransactionCountArgs>(args?: Prisma.Subset<T, LedgerTransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LedgerTransactionCountAggregateOutputType> : number>;
    aggregate<T extends LedgerTransactionAggregateArgs>(args: Prisma.Subset<T, LedgerTransactionAggregateArgs>): Prisma.PrismaPromise<GetLedgerTransactionAggregateType<T>>;
    groupBy<T extends LedgerTransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LedgerTransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: LedgerTransactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LedgerTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLedgerTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LedgerTransactionFieldRefs;
}
export interface Prisma__LedgerTransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.LedgerTransaction$orderArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LedgerTransaction$orderArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    capacityBooking<T extends Prisma.LedgerTransaction$capacityBookingArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LedgerTransaction$capacityBookingArgs<ExtArgs>>): Prisma.Prisma__CapacityBookingClient<runtime.Types.Result.GetResult<Prisma.$CapacityBookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    payment<T extends Prisma.LedgerTransaction$paymentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LedgerTransaction$paymentArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    entries<T extends Prisma.LedgerTransaction$entriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LedgerTransaction$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LedgerTransactionFieldRefs {
    readonly id: Prisma.FieldRef<"LedgerTransaction", 'String'>;
    readonly kind: Prisma.FieldRef<"LedgerTransaction", 'LedgerTransactionKind'>;
    readonly orderId: Prisma.FieldRef<"LedgerTransaction", 'String'>;
    readonly capacityBookingId: Prisma.FieldRef<"LedgerTransaction", 'String'>;
    readonly paymentId: Prisma.FieldRef<"LedgerTransaction", 'String'>;
    readonly currency: Prisma.FieldRef<"LedgerTransaction", 'Currency'>;
    readonly description: Prisma.FieldRef<"LedgerTransaction", 'String'>;
    readonly idempotencyKey: Prisma.FieldRef<"LedgerTransaction", 'String'>;
    readonly postedAt: Prisma.FieldRef<"LedgerTransaction", 'DateTime'>;
    readonly unitsPerUsd: Prisma.FieldRef<"LedgerTransaction", 'Decimal'>;
    readonly amountUsdMinor: Prisma.FieldRef<"LedgerTransaction", 'BigInt'>;
}
export type LedgerTransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelect<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    include?: Prisma.LedgerTransactionInclude<ExtArgs> | null;
    where: Prisma.LedgerTransactionWhereUniqueInput;
};
export type LedgerTransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelect<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    include?: Prisma.LedgerTransactionInclude<ExtArgs> | null;
    where: Prisma.LedgerTransactionWhereUniqueInput;
};
export type LedgerTransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelect<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    include?: Prisma.LedgerTransactionInclude<ExtArgs> | null;
    where?: Prisma.LedgerTransactionWhereInput;
    orderBy?: Prisma.LedgerTransactionOrderByWithRelationInput | Prisma.LedgerTransactionOrderByWithRelationInput[];
    cursor?: Prisma.LedgerTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LedgerTransactionScalarFieldEnum | Prisma.LedgerTransactionScalarFieldEnum[];
};
export type LedgerTransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelect<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    include?: Prisma.LedgerTransactionInclude<ExtArgs> | null;
    where?: Prisma.LedgerTransactionWhereInput;
    orderBy?: Prisma.LedgerTransactionOrderByWithRelationInput | Prisma.LedgerTransactionOrderByWithRelationInput[];
    cursor?: Prisma.LedgerTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LedgerTransactionScalarFieldEnum | Prisma.LedgerTransactionScalarFieldEnum[];
};
export type LedgerTransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelect<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    include?: Prisma.LedgerTransactionInclude<ExtArgs> | null;
    where?: Prisma.LedgerTransactionWhereInput;
    orderBy?: Prisma.LedgerTransactionOrderByWithRelationInput | Prisma.LedgerTransactionOrderByWithRelationInput[];
    cursor?: Prisma.LedgerTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LedgerTransactionScalarFieldEnum | Prisma.LedgerTransactionScalarFieldEnum[];
};
export type LedgerTransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelect<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    include?: Prisma.LedgerTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LedgerTransactionCreateInput, Prisma.LedgerTransactionUncheckedCreateInput>;
};
export type LedgerTransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LedgerTransactionCreateManyInput | Prisma.LedgerTransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LedgerTransactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    data: Prisma.LedgerTransactionCreateManyInput | Prisma.LedgerTransactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LedgerTransactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LedgerTransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelect<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    include?: Prisma.LedgerTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LedgerTransactionUpdateInput, Prisma.LedgerTransactionUncheckedUpdateInput>;
    where: Prisma.LedgerTransactionWhereUniqueInput;
};
export type LedgerTransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LedgerTransactionUpdateManyMutationInput, Prisma.LedgerTransactionUncheckedUpdateManyInput>;
    where?: Prisma.LedgerTransactionWhereInput;
    limit?: number;
};
export type LedgerTransactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LedgerTransactionUpdateManyMutationInput, Prisma.LedgerTransactionUncheckedUpdateManyInput>;
    where?: Prisma.LedgerTransactionWhereInput;
    limit?: number;
    include?: Prisma.LedgerTransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LedgerTransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelect<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    include?: Prisma.LedgerTransactionInclude<ExtArgs> | null;
    where: Prisma.LedgerTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.LedgerTransactionCreateInput, Prisma.LedgerTransactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LedgerTransactionUpdateInput, Prisma.LedgerTransactionUncheckedUpdateInput>;
};
export type LedgerTransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelect<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    include?: Prisma.LedgerTransactionInclude<ExtArgs> | null;
    where: Prisma.LedgerTransactionWhereUniqueInput;
};
export type LedgerTransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LedgerTransactionWhereInput;
    limit?: number;
};
export type LedgerTransaction$orderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderSelect<ExtArgs> | null;
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
};
export type LedgerTransaction$capacityBookingArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingInclude<ExtArgs> | null;
    where?: Prisma.CapacityBookingWhereInput;
};
export type LedgerTransaction$paymentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
};
export type LedgerTransaction$entriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscrowLedgerEntrySelect<ExtArgs> | null;
    omit?: Prisma.EscrowLedgerEntryOmit<ExtArgs> | null;
    include?: Prisma.EscrowLedgerEntryInclude<ExtArgs> | null;
    where?: Prisma.EscrowLedgerEntryWhereInput;
    orderBy?: Prisma.EscrowLedgerEntryOrderByWithRelationInput | Prisma.EscrowLedgerEntryOrderByWithRelationInput[];
    cursor?: Prisma.EscrowLedgerEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EscrowLedgerEntryScalarFieldEnum | Prisma.EscrowLedgerEntryScalarFieldEnum[];
};
export type LedgerTransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerTransactionSelect<ExtArgs> | null;
    omit?: Prisma.LedgerTransactionOmit<ExtArgs> | null;
    include?: Prisma.LedgerTransactionInclude<ExtArgs> | null;
};
