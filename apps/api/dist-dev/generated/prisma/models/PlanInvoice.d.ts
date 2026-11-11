import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PlanInvoiceModel = runtime.Types.Result.DefaultSelection<Prisma.$PlanInvoicePayload>;
export type AggregatePlanInvoice = {
    _count: PlanInvoiceCountAggregateOutputType | null;
    _avg: PlanInvoiceAvgAggregateOutputType | null;
    _sum: PlanInvoiceSumAggregateOutputType | null;
    _min: PlanInvoiceMinAggregateOutputType | null;
    _max: PlanInvoiceMaxAggregateOutputType | null;
};
export type PlanInvoiceAvgAggregateOutputType = {
    amountMinor: number | null;
};
export type PlanInvoiceSumAggregateOutputType = {
    amountMinor: number | null;
};
export type PlanInvoiceMinAggregateOutputType = {
    id: string | null;
    subscriptionId: string | null;
    stripeInvoiceId: string | null;
    amountMinor: number | null;
    currency: $Enums.Currency | null;
    paidAt: Date | null;
    periodEnd: Date | null;
    createdAt: Date | null;
};
export type PlanInvoiceMaxAggregateOutputType = {
    id: string | null;
    subscriptionId: string | null;
    stripeInvoiceId: string | null;
    amountMinor: number | null;
    currency: $Enums.Currency | null;
    paidAt: Date | null;
    periodEnd: Date | null;
    createdAt: Date | null;
};
export type PlanInvoiceCountAggregateOutputType = {
    id: number;
    subscriptionId: number;
    stripeInvoiceId: number;
    amountMinor: number;
    currency: number;
    paidAt: number;
    periodEnd: number;
    createdAt: number;
    _all: number;
};
export type PlanInvoiceAvgAggregateInputType = {
    amountMinor?: true;
};
export type PlanInvoiceSumAggregateInputType = {
    amountMinor?: true;
};
export type PlanInvoiceMinAggregateInputType = {
    id?: true;
    subscriptionId?: true;
    stripeInvoiceId?: true;
    amountMinor?: true;
    currency?: true;
    paidAt?: true;
    periodEnd?: true;
    createdAt?: true;
};
export type PlanInvoiceMaxAggregateInputType = {
    id?: true;
    subscriptionId?: true;
    stripeInvoiceId?: true;
    amountMinor?: true;
    currency?: true;
    paidAt?: true;
    periodEnd?: true;
    createdAt?: true;
};
export type PlanInvoiceCountAggregateInputType = {
    id?: true;
    subscriptionId?: true;
    stripeInvoiceId?: true;
    amountMinor?: true;
    currency?: true;
    paidAt?: true;
    periodEnd?: true;
    createdAt?: true;
    _all?: true;
};
export type PlanInvoiceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlanInvoiceWhereInput;
    orderBy?: Prisma.PlanInvoiceOrderByWithRelationInput | Prisma.PlanInvoiceOrderByWithRelationInput[];
    cursor?: Prisma.PlanInvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PlanInvoiceCountAggregateInputType;
    _avg?: PlanInvoiceAvgAggregateInputType;
    _sum?: PlanInvoiceSumAggregateInputType;
    _min?: PlanInvoiceMinAggregateInputType;
    _max?: PlanInvoiceMaxAggregateInputType;
};
export type GetPlanInvoiceAggregateType<T extends PlanInvoiceAggregateArgs> = {
    [P in keyof T & keyof AggregatePlanInvoice]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePlanInvoice[P]> : Prisma.GetScalarType<T[P], AggregatePlanInvoice[P]>;
};
export type PlanInvoiceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlanInvoiceWhereInput;
    orderBy?: Prisma.PlanInvoiceOrderByWithAggregationInput | Prisma.PlanInvoiceOrderByWithAggregationInput[];
    by: Prisma.PlanInvoiceScalarFieldEnum[] | Prisma.PlanInvoiceScalarFieldEnum;
    having?: Prisma.PlanInvoiceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PlanInvoiceCountAggregateInputType | true;
    _avg?: PlanInvoiceAvgAggregateInputType;
    _sum?: PlanInvoiceSumAggregateInputType;
    _min?: PlanInvoiceMinAggregateInputType;
    _max?: PlanInvoiceMaxAggregateInputType;
};
export type PlanInvoiceGroupByOutputType = {
    id: string;
    subscriptionId: string;
    stripeInvoiceId: string | null;
    amountMinor: number;
    currency: $Enums.Currency;
    paidAt: Date;
    periodEnd: Date | null;
    createdAt: Date;
    _count: PlanInvoiceCountAggregateOutputType | null;
    _avg: PlanInvoiceAvgAggregateOutputType | null;
    _sum: PlanInvoiceSumAggregateOutputType | null;
    _min: PlanInvoiceMinAggregateOutputType | null;
    _max: PlanInvoiceMaxAggregateOutputType | null;
};
export type GetPlanInvoiceGroupByPayload<T extends PlanInvoiceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PlanInvoiceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PlanInvoiceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PlanInvoiceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PlanInvoiceGroupByOutputType[P]>;
}>>;
export type PlanInvoiceWhereInput = {
    AND?: Prisma.PlanInvoiceWhereInput | Prisma.PlanInvoiceWhereInput[];
    OR?: Prisma.PlanInvoiceWhereInput[];
    NOT?: Prisma.PlanInvoiceWhereInput | Prisma.PlanInvoiceWhereInput[];
    id?: Prisma.UuidFilter<"PlanInvoice"> | string;
    subscriptionId?: Prisma.UuidFilter<"PlanInvoice"> | string;
    stripeInvoiceId?: Prisma.StringNullableFilter<"PlanInvoice"> | string | null;
    amountMinor?: Prisma.IntFilter<"PlanInvoice"> | number;
    currency?: Prisma.EnumCurrencyFilter<"PlanInvoice"> | $Enums.Currency;
    paidAt?: Prisma.DateTimeFilter<"PlanInvoice"> | Date | string;
    periodEnd?: Prisma.DateTimeNullableFilter<"PlanInvoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PlanInvoice"> | Date | string;
    subscription?: Prisma.XOR<Prisma.PlanSubscriptionScalarRelationFilter, Prisma.PlanSubscriptionWhereInput>;
};
export type PlanInvoiceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    stripeInvoiceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    periodEnd?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    subscription?: Prisma.PlanSubscriptionOrderByWithRelationInput;
};
export type PlanInvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    stripeInvoiceId?: string;
    AND?: Prisma.PlanInvoiceWhereInput | Prisma.PlanInvoiceWhereInput[];
    OR?: Prisma.PlanInvoiceWhereInput[];
    NOT?: Prisma.PlanInvoiceWhereInput | Prisma.PlanInvoiceWhereInput[];
    subscriptionId?: Prisma.UuidFilter<"PlanInvoice"> | string;
    amountMinor?: Prisma.IntFilter<"PlanInvoice"> | number;
    currency?: Prisma.EnumCurrencyFilter<"PlanInvoice"> | $Enums.Currency;
    paidAt?: Prisma.DateTimeFilter<"PlanInvoice"> | Date | string;
    periodEnd?: Prisma.DateTimeNullableFilter<"PlanInvoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PlanInvoice"> | Date | string;
    subscription?: Prisma.XOR<Prisma.PlanSubscriptionScalarRelationFilter, Prisma.PlanSubscriptionWhereInput>;
}, "id" | "stripeInvoiceId">;
export type PlanInvoiceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    stripeInvoiceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    periodEnd?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PlanInvoiceCountOrderByAggregateInput;
    _avg?: Prisma.PlanInvoiceAvgOrderByAggregateInput;
    _max?: Prisma.PlanInvoiceMaxOrderByAggregateInput;
    _min?: Prisma.PlanInvoiceMinOrderByAggregateInput;
    _sum?: Prisma.PlanInvoiceSumOrderByAggregateInput;
};
export type PlanInvoiceScalarWhereWithAggregatesInput = {
    AND?: Prisma.PlanInvoiceScalarWhereWithAggregatesInput | Prisma.PlanInvoiceScalarWhereWithAggregatesInput[];
    OR?: Prisma.PlanInvoiceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PlanInvoiceScalarWhereWithAggregatesInput | Prisma.PlanInvoiceScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"PlanInvoice"> | string;
    subscriptionId?: Prisma.UuidWithAggregatesFilter<"PlanInvoice"> | string;
    stripeInvoiceId?: Prisma.StringNullableWithAggregatesFilter<"PlanInvoice"> | string | null;
    amountMinor?: Prisma.IntWithAggregatesFilter<"PlanInvoice"> | number;
    currency?: Prisma.EnumCurrencyWithAggregatesFilter<"PlanInvoice"> | $Enums.Currency;
    paidAt?: Prisma.DateTimeWithAggregatesFilter<"PlanInvoice"> | Date | string;
    periodEnd?: Prisma.DateTimeNullableWithAggregatesFilter<"PlanInvoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PlanInvoice"> | Date | string;
};
export type PlanInvoiceCreateInput = {
    id?: string;
    stripeInvoiceId?: string | null;
    amountMinor: number;
    currency: $Enums.Currency;
    paidAt: Date | string;
    periodEnd?: Date | string | null;
    createdAt?: Date | string;
    subscription: Prisma.PlanSubscriptionCreateNestedOneWithoutInvoicesInput;
};
export type PlanInvoiceUncheckedCreateInput = {
    id?: string;
    subscriptionId: string;
    stripeInvoiceId?: string | null;
    amountMinor: number;
    currency: $Enums.Currency;
    paidAt: Date | string;
    periodEnd?: Date | string | null;
    createdAt?: Date | string;
};
export type PlanInvoiceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stripeInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amountMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subscription?: Prisma.PlanSubscriptionUpdateOneRequiredWithoutInvoicesNestedInput;
};
export type PlanInvoiceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionId?: Prisma.StringFieldUpdateOperationsInput | string;
    stripeInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amountMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlanInvoiceCreateManyInput = {
    id?: string;
    subscriptionId: string;
    stripeInvoiceId?: string | null;
    amountMinor: number;
    currency: $Enums.Currency;
    paidAt: Date | string;
    periodEnd?: Date | string | null;
    createdAt?: Date | string;
};
export type PlanInvoiceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stripeInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amountMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlanInvoiceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionId?: Prisma.StringFieldUpdateOperationsInput | string;
    stripeInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amountMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlanInvoiceListRelationFilter = {
    every?: Prisma.PlanInvoiceWhereInput;
    some?: Prisma.PlanInvoiceWhereInput;
    none?: Prisma.PlanInvoiceWhereInput;
};
export type PlanInvoiceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PlanInvoiceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    stripeInvoiceId?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    periodEnd?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PlanInvoiceAvgOrderByAggregateInput = {
    amountMinor?: Prisma.SortOrder;
};
export type PlanInvoiceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    stripeInvoiceId?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    periodEnd?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PlanInvoiceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    stripeInvoiceId?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    periodEnd?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PlanInvoiceSumOrderByAggregateInput = {
    amountMinor?: Prisma.SortOrder;
};
export type PlanInvoiceCreateNestedManyWithoutSubscriptionInput = {
    create?: Prisma.XOR<Prisma.PlanInvoiceCreateWithoutSubscriptionInput, Prisma.PlanInvoiceUncheckedCreateWithoutSubscriptionInput> | Prisma.PlanInvoiceCreateWithoutSubscriptionInput[] | Prisma.PlanInvoiceUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.PlanInvoiceCreateOrConnectWithoutSubscriptionInput | Prisma.PlanInvoiceCreateOrConnectWithoutSubscriptionInput[];
    createMany?: Prisma.PlanInvoiceCreateManySubscriptionInputEnvelope;
    connect?: Prisma.PlanInvoiceWhereUniqueInput | Prisma.PlanInvoiceWhereUniqueInput[];
};
export type PlanInvoiceUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: Prisma.XOR<Prisma.PlanInvoiceCreateWithoutSubscriptionInput, Prisma.PlanInvoiceUncheckedCreateWithoutSubscriptionInput> | Prisma.PlanInvoiceCreateWithoutSubscriptionInput[] | Prisma.PlanInvoiceUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.PlanInvoiceCreateOrConnectWithoutSubscriptionInput | Prisma.PlanInvoiceCreateOrConnectWithoutSubscriptionInput[];
    createMany?: Prisma.PlanInvoiceCreateManySubscriptionInputEnvelope;
    connect?: Prisma.PlanInvoiceWhereUniqueInput | Prisma.PlanInvoiceWhereUniqueInput[];
};
export type PlanInvoiceUpdateManyWithoutSubscriptionNestedInput = {
    create?: Prisma.XOR<Prisma.PlanInvoiceCreateWithoutSubscriptionInput, Prisma.PlanInvoiceUncheckedCreateWithoutSubscriptionInput> | Prisma.PlanInvoiceCreateWithoutSubscriptionInput[] | Prisma.PlanInvoiceUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.PlanInvoiceCreateOrConnectWithoutSubscriptionInput | Prisma.PlanInvoiceCreateOrConnectWithoutSubscriptionInput[];
    upsert?: Prisma.PlanInvoiceUpsertWithWhereUniqueWithoutSubscriptionInput | Prisma.PlanInvoiceUpsertWithWhereUniqueWithoutSubscriptionInput[];
    createMany?: Prisma.PlanInvoiceCreateManySubscriptionInputEnvelope;
    set?: Prisma.PlanInvoiceWhereUniqueInput | Prisma.PlanInvoiceWhereUniqueInput[];
    disconnect?: Prisma.PlanInvoiceWhereUniqueInput | Prisma.PlanInvoiceWhereUniqueInput[];
    delete?: Prisma.PlanInvoiceWhereUniqueInput | Prisma.PlanInvoiceWhereUniqueInput[];
    connect?: Prisma.PlanInvoiceWhereUniqueInput | Prisma.PlanInvoiceWhereUniqueInput[];
    update?: Prisma.PlanInvoiceUpdateWithWhereUniqueWithoutSubscriptionInput | Prisma.PlanInvoiceUpdateWithWhereUniqueWithoutSubscriptionInput[];
    updateMany?: Prisma.PlanInvoiceUpdateManyWithWhereWithoutSubscriptionInput | Prisma.PlanInvoiceUpdateManyWithWhereWithoutSubscriptionInput[];
    deleteMany?: Prisma.PlanInvoiceScalarWhereInput | Prisma.PlanInvoiceScalarWhereInput[];
};
export type PlanInvoiceUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: Prisma.XOR<Prisma.PlanInvoiceCreateWithoutSubscriptionInput, Prisma.PlanInvoiceUncheckedCreateWithoutSubscriptionInput> | Prisma.PlanInvoiceCreateWithoutSubscriptionInput[] | Prisma.PlanInvoiceUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.PlanInvoiceCreateOrConnectWithoutSubscriptionInput | Prisma.PlanInvoiceCreateOrConnectWithoutSubscriptionInput[];
    upsert?: Prisma.PlanInvoiceUpsertWithWhereUniqueWithoutSubscriptionInput | Prisma.PlanInvoiceUpsertWithWhereUniqueWithoutSubscriptionInput[];
    createMany?: Prisma.PlanInvoiceCreateManySubscriptionInputEnvelope;
    set?: Prisma.PlanInvoiceWhereUniqueInput | Prisma.PlanInvoiceWhereUniqueInput[];
    disconnect?: Prisma.PlanInvoiceWhereUniqueInput | Prisma.PlanInvoiceWhereUniqueInput[];
    delete?: Prisma.PlanInvoiceWhereUniqueInput | Prisma.PlanInvoiceWhereUniqueInput[];
    connect?: Prisma.PlanInvoiceWhereUniqueInput | Prisma.PlanInvoiceWhereUniqueInput[];
    update?: Prisma.PlanInvoiceUpdateWithWhereUniqueWithoutSubscriptionInput | Prisma.PlanInvoiceUpdateWithWhereUniqueWithoutSubscriptionInput[];
    updateMany?: Prisma.PlanInvoiceUpdateManyWithWhereWithoutSubscriptionInput | Prisma.PlanInvoiceUpdateManyWithWhereWithoutSubscriptionInput[];
    deleteMany?: Prisma.PlanInvoiceScalarWhereInput | Prisma.PlanInvoiceScalarWhereInput[];
};
export type PlanInvoiceCreateWithoutSubscriptionInput = {
    id?: string;
    stripeInvoiceId?: string | null;
    amountMinor: number;
    currency: $Enums.Currency;
    paidAt: Date | string;
    periodEnd?: Date | string | null;
    createdAt?: Date | string;
};
export type PlanInvoiceUncheckedCreateWithoutSubscriptionInput = {
    id?: string;
    stripeInvoiceId?: string | null;
    amountMinor: number;
    currency: $Enums.Currency;
    paidAt: Date | string;
    periodEnd?: Date | string | null;
    createdAt?: Date | string;
};
export type PlanInvoiceCreateOrConnectWithoutSubscriptionInput = {
    where: Prisma.PlanInvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlanInvoiceCreateWithoutSubscriptionInput, Prisma.PlanInvoiceUncheckedCreateWithoutSubscriptionInput>;
};
export type PlanInvoiceCreateManySubscriptionInputEnvelope = {
    data: Prisma.PlanInvoiceCreateManySubscriptionInput | Prisma.PlanInvoiceCreateManySubscriptionInput[];
    skipDuplicates?: boolean;
};
export type PlanInvoiceUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: Prisma.PlanInvoiceWhereUniqueInput;
    update: Prisma.XOR<Prisma.PlanInvoiceUpdateWithoutSubscriptionInput, Prisma.PlanInvoiceUncheckedUpdateWithoutSubscriptionInput>;
    create: Prisma.XOR<Prisma.PlanInvoiceCreateWithoutSubscriptionInput, Prisma.PlanInvoiceUncheckedCreateWithoutSubscriptionInput>;
};
export type PlanInvoiceUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: Prisma.PlanInvoiceWhereUniqueInput;
    data: Prisma.XOR<Prisma.PlanInvoiceUpdateWithoutSubscriptionInput, Prisma.PlanInvoiceUncheckedUpdateWithoutSubscriptionInput>;
};
export type PlanInvoiceUpdateManyWithWhereWithoutSubscriptionInput = {
    where: Prisma.PlanInvoiceScalarWhereInput;
    data: Prisma.XOR<Prisma.PlanInvoiceUpdateManyMutationInput, Prisma.PlanInvoiceUncheckedUpdateManyWithoutSubscriptionInput>;
};
export type PlanInvoiceScalarWhereInput = {
    AND?: Prisma.PlanInvoiceScalarWhereInput | Prisma.PlanInvoiceScalarWhereInput[];
    OR?: Prisma.PlanInvoiceScalarWhereInput[];
    NOT?: Prisma.PlanInvoiceScalarWhereInput | Prisma.PlanInvoiceScalarWhereInput[];
    id?: Prisma.UuidFilter<"PlanInvoice"> | string;
    subscriptionId?: Prisma.UuidFilter<"PlanInvoice"> | string;
    stripeInvoiceId?: Prisma.StringNullableFilter<"PlanInvoice"> | string | null;
    amountMinor?: Prisma.IntFilter<"PlanInvoice"> | number;
    currency?: Prisma.EnumCurrencyFilter<"PlanInvoice"> | $Enums.Currency;
    paidAt?: Prisma.DateTimeFilter<"PlanInvoice"> | Date | string;
    periodEnd?: Prisma.DateTimeNullableFilter<"PlanInvoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PlanInvoice"> | Date | string;
};
export type PlanInvoiceCreateManySubscriptionInput = {
    id?: string;
    stripeInvoiceId?: string | null;
    amountMinor: number;
    currency: $Enums.Currency;
    paidAt: Date | string;
    periodEnd?: Date | string | null;
    createdAt?: Date | string;
};
export type PlanInvoiceUpdateWithoutSubscriptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stripeInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amountMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlanInvoiceUncheckedUpdateWithoutSubscriptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stripeInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amountMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlanInvoiceUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stripeInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amountMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    paidAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    periodEnd?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlanInvoiceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subscriptionId?: boolean;
    stripeInvoiceId?: boolean;
    amountMinor?: boolean;
    currency?: boolean;
    paidAt?: boolean;
    periodEnd?: boolean;
    createdAt?: boolean;
    subscription?: boolean | Prisma.PlanSubscriptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["planInvoice"]>;
export type PlanInvoiceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subscriptionId?: boolean;
    stripeInvoiceId?: boolean;
    amountMinor?: boolean;
    currency?: boolean;
    paidAt?: boolean;
    periodEnd?: boolean;
    createdAt?: boolean;
    subscription?: boolean | Prisma.PlanSubscriptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["planInvoice"]>;
export type PlanInvoiceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subscriptionId?: boolean;
    stripeInvoiceId?: boolean;
    amountMinor?: boolean;
    currency?: boolean;
    paidAt?: boolean;
    periodEnd?: boolean;
    createdAt?: boolean;
    subscription?: boolean | Prisma.PlanSubscriptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["planInvoice"]>;
export type PlanInvoiceSelectScalar = {
    id?: boolean;
    subscriptionId?: boolean;
    stripeInvoiceId?: boolean;
    amountMinor?: boolean;
    currency?: boolean;
    paidAt?: boolean;
    periodEnd?: boolean;
    createdAt?: boolean;
};
export type PlanInvoiceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "subscriptionId" | "stripeInvoiceId" | "amountMinor" | "currency" | "paidAt" | "periodEnd" | "createdAt", ExtArgs["result"]["planInvoice"]>;
export type PlanInvoiceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subscription?: boolean | Prisma.PlanSubscriptionDefaultArgs<ExtArgs>;
};
export type PlanInvoiceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subscription?: boolean | Prisma.PlanSubscriptionDefaultArgs<ExtArgs>;
};
export type PlanInvoiceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subscription?: boolean | Prisma.PlanSubscriptionDefaultArgs<ExtArgs>;
};
export type $PlanInvoicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PlanInvoice";
    objects: {
        subscription: Prisma.$PlanSubscriptionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        subscriptionId: string;
        stripeInvoiceId: string | null;
        amountMinor: number;
        currency: $Enums.Currency;
        paidAt: Date;
        periodEnd: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["planInvoice"]>;
    composites: {};
};
export type PlanInvoiceGetPayload<S extends boolean | null | undefined | PlanInvoiceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload, S>;
export type PlanInvoiceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PlanInvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PlanInvoiceCountAggregateInputType | true;
};
export interface PlanInvoiceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PlanInvoice'];
        meta: {
            name: 'PlanInvoice';
        };
    };
    findUnique<T extends PlanInvoiceFindUniqueArgs>(args: Prisma.SelectSubset<T, PlanInvoiceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PlanInvoiceClient<runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PlanInvoiceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PlanInvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlanInvoiceClient<runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PlanInvoiceFindFirstArgs>(args?: Prisma.SelectSubset<T, PlanInvoiceFindFirstArgs<ExtArgs>>): Prisma.Prisma__PlanInvoiceClient<runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PlanInvoiceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PlanInvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlanInvoiceClient<runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PlanInvoiceFindManyArgs>(args?: Prisma.SelectSubset<T, PlanInvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PlanInvoiceCreateArgs>(args: Prisma.SelectSubset<T, PlanInvoiceCreateArgs<ExtArgs>>): Prisma.Prisma__PlanInvoiceClient<runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PlanInvoiceCreateManyArgs>(args?: Prisma.SelectSubset<T, PlanInvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PlanInvoiceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PlanInvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PlanInvoiceDeleteArgs>(args: Prisma.SelectSubset<T, PlanInvoiceDeleteArgs<ExtArgs>>): Prisma.Prisma__PlanInvoiceClient<runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PlanInvoiceUpdateArgs>(args: Prisma.SelectSubset<T, PlanInvoiceUpdateArgs<ExtArgs>>): Prisma.Prisma__PlanInvoiceClient<runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PlanInvoiceDeleteManyArgs>(args?: Prisma.SelectSubset<T, PlanInvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PlanInvoiceUpdateManyArgs>(args: Prisma.SelectSubset<T, PlanInvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PlanInvoiceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PlanInvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PlanInvoiceUpsertArgs>(args: Prisma.SelectSubset<T, PlanInvoiceUpsertArgs<ExtArgs>>): Prisma.Prisma__PlanInvoiceClient<runtime.Types.Result.GetResult<Prisma.$PlanInvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PlanInvoiceCountArgs>(args?: Prisma.Subset<T, PlanInvoiceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PlanInvoiceCountAggregateOutputType> : number>;
    aggregate<T extends PlanInvoiceAggregateArgs>(args: Prisma.Subset<T, PlanInvoiceAggregateArgs>): Prisma.PrismaPromise<GetPlanInvoiceAggregateType<T>>;
    groupBy<T extends PlanInvoiceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PlanInvoiceGroupByArgs['orderBy'];
    } : {
        orderBy?: PlanInvoiceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PlanInvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PlanInvoiceFieldRefs;
}
export interface Prisma__PlanInvoiceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    subscription<T extends Prisma.PlanSubscriptionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PlanSubscriptionDefaultArgs<ExtArgs>>): Prisma.Prisma__PlanSubscriptionClient<runtime.Types.Result.GetResult<Prisma.$PlanSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PlanInvoiceFieldRefs {
    readonly id: Prisma.FieldRef<"PlanInvoice", 'String'>;
    readonly subscriptionId: Prisma.FieldRef<"PlanInvoice", 'String'>;
    readonly stripeInvoiceId: Prisma.FieldRef<"PlanInvoice", 'String'>;
    readonly amountMinor: Prisma.FieldRef<"PlanInvoice", 'Int'>;
    readonly currency: Prisma.FieldRef<"PlanInvoice", 'Currency'>;
    readonly paidAt: Prisma.FieldRef<"PlanInvoice", 'DateTime'>;
    readonly periodEnd: Prisma.FieldRef<"PlanInvoice", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"PlanInvoice", 'DateTime'>;
}
export type PlanInvoiceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PlanInvoiceInclude<ExtArgs> | null;
    where: Prisma.PlanInvoiceWhereUniqueInput;
};
export type PlanInvoiceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PlanInvoiceInclude<ExtArgs> | null;
    where: Prisma.PlanInvoiceWhereUniqueInput;
};
export type PlanInvoiceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PlanInvoiceInclude<ExtArgs> | null;
    where?: Prisma.PlanInvoiceWhereInput;
    orderBy?: Prisma.PlanInvoiceOrderByWithRelationInput | Prisma.PlanInvoiceOrderByWithRelationInput[];
    cursor?: Prisma.PlanInvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlanInvoiceScalarFieldEnum | Prisma.PlanInvoiceScalarFieldEnum[];
};
export type PlanInvoiceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PlanInvoiceInclude<ExtArgs> | null;
    where?: Prisma.PlanInvoiceWhereInput;
    orderBy?: Prisma.PlanInvoiceOrderByWithRelationInput | Prisma.PlanInvoiceOrderByWithRelationInput[];
    cursor?: Prisma.PlanInvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlanInvoiceScalarFieldEnum | Prisma.PlanInvoiceScalarFieldEnum[];
};
export type PlanInvoiceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PlanInvoiceInclude<ExtArgs> | null;
    where?: Prisma.PlanInvoiceWhereInput;
    orderBy?: Prisma.PlanInvoiceOrderByWithRelationInput | Prisma.PlanInvoiceOrderByWithRelationInput[];
    cursor?: Prisma.PlanInvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlanInvoiceScalarFieldEnum | Prisma.PlanInvoiceScalarFieldEnum[];
};
export type PlanInvoiceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PlanInvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlanInvoiceCreateInput, Prisma.PlanInvoiceUncheckedCreateInput>;
};
export type PlanInvoiceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PlanInvoiceCreateManyInput | Prisma.PlanInvoiceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PlanInvoiceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    data: Prisma.PlanInvoiceCreateManyInput | Prisma.PlanInvoiceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PlanInvoiceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PlanInvoiceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PlanInvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlanInvoiceUpdateInput, Prisma.PlanInvoiceUncheckedUpdateInput>;
    where: Prisma.PlanInvoiceWhereUniqueInput;
};
export type PlanInvoiceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PlanInvoiceUpdateManyMutationInput, Prisma.PlanInvoiceUncheckedUpdateManyInput>;
    where?: Prisma.PlanInvoiceWhereInput;
    limit?: number;
};
export type PlanInvoiceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlanInvoiceUpdateManyMutationInput, Prisma.PlanInvoiceUncheckedUpdateManyInput>;
    where?: Prisma.PlanInvoiceWhereInput;
    limit?: number;
    include?: Prisma.PlanInvoiceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PlanInvoiceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PlanInvoiceInclude<ExtArgs> | null;
    where: Prisma.PlanInvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlanInvoiceCreateInput, Prisma.PlanInvoiceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PlanInvoiceUpdateInput, Prisma.PlanInvoiceUncheckedUpdateInput>;
};
export type PlanInvoiceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PlanInvoiceInclude<ExtArgs> | null;
    where: Prisma.PlanInvoiceWhereUniqueInput;
};
export type PlanInvoiceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlanInvoiceWhereInput;
    limit?: number;
};
export type PlanInvoiceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PlanInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PlanInvoiceInclude<ExtArgs> | null;
};
