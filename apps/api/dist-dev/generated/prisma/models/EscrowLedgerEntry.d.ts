import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EscrowLedgerEntryModel = runtime.Types.Result.DefaultSelection<Prisma.$EscrowLedgerEntryPayload>;
export type AggregateEscrowLedgerEntry = {
    _count: EscrowLedgerEntryCountAggregateOutputType | null;
    _avg: EscrowLedgerEntryAvgAggregateOutputType | null;
    _sum: EscrowLedgerEntrySumAggregateOutputType | null;
    _min: EscrowLedgerEntryMinAggregateOutputType | null;
    _max: EscrowLedgerEntryMaxAggregateOutputType | null;
};
export type EscrowLedgerEntryAvgAggregateOutputType = {
    amountMinor: number | null;
};
export type EscrowLedgerEntrySumAggregateOutputType = {
    amountMinor: bigint | null;
};
export type EscrowLedgerEntryMinAggregateOutputType = {
    id: string | null;
    transactionId: string | null;
    accountId: string | null;
    direction: $Enums.EntryDirection | null;
    amountMinor: bigint | null;
    createdAt: Date | null;
};
export type EscrowLedgerEntryMaxAggregateOutputType = {
    id: string | null;
    transactionId: string | null;
    accountId: string | null;
    direction: $Enums.EntryDirection | null;
    amountMinor: bigint | null;
    createdAt: Date | null;
};
export type EscrowLedgerEntryCountAggregateOutputType = {
    id: number;
    transactionId: number;
    accountId: number;
    direction: number;
    amountMinor: number;
    createdAt: number;
    _all: number;
};
export type EscrowLedgerEntryAvgAggregateInputType = {
    amountMinor?: true;
};
export type EscrowLedgerEntrySumAggregateInputType = {
    amountMinor?: true;
};
export type EscrowLedgerEntryMinAggregateInputType = {
    id?: true;
    transactionId?: true;
    accountId?: true;
    direction?: true;
    amountMinor?: true;
    createdAt?: true;
};
export type EscrowLedgerEntryMaxAggregateInputType = {
    id?: true;
    transactionId?: true;
    accountId?: true;
    direction?: true;
    amountMinor?: true;
    createdAt?: true;
};
export type EscrowLedgerEntryCountAggregateInputType = {
    id?: true;
    transactionId?: true;
    accountId?: true;
    direction?: true;
    amountMinor?: true;
    createdAt?: true;
    _all?: true;
};
export type EscrowLedgerEntryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EscrowLedgerEntryWhereInput;
    orderBy?: Prisma.EscrowLedgerEntryOrderByWithRelationInput | Prisma.EscrowLedgerEntryOrderByWithRelationInput[];
    cursor?: Prisma.EscrowLedgerEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EscrowLedgerEntryCountAggregateInputType;
    _avg?: EscrowLedgerEntryAvgAggregateInputType;
    _sum?: EscrowLedgerEntrySumAggregateInputType;
    _min?: EscrowLedgerEntryMinAggregateInputType;
    _max?: EscrowLedgerEntryMaxAggregateInputType;
};
export type GetEscrowLedgerEntryAggregateType<T extends EscrowLedgerEntryAggregateArgs> = {
    [P in keyof T & keyof AggregateEscrowLedgerEntry]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEscrowLedgerEntry[P]> : Prisma.GetScalarType<T[P], AggregateEscrowLedgerEntry[P]>;
};
export type EscrowLedgerEntryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EscrowLedgerEntryWhereInput;
    orderBy?: Prisma.EscrowLedgerEntryOrderByWithAggregationInput | Prisma.EscrowLedgerEntryOrderByWithAggregationInput[];
    by: Prisma.EscrowLedgerEntryScalarFieldEnum[] | Prisma.EscrowLedgerEntryScalarFieldEnum;
    having?: Prisma.EscrowLedgerEntryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EscrowLedgerEntryCountAggregateInputType | true;
    _avg?: EscrowLedgerEntryAvgAggregateInputType;
    _sum?: EscrowLedgerEntrySumAggregateInputType;
    _min?: EscrowLedgerEntryMinAggregateInputType;
    _max?: EscrowLedgerEntryMaxAggregateInputType;
};
export type EscrowLedgerEntryGroupByOutputType = {
    id: string;
    transactionId: string;
    accountId: string;
    direction: $Enums.EntryDirection;
    amountMinor: bigint;
    createdAt: Date;
    _count: EscrowLedgerEntryCountAggregateOutputType | null;
    _avg: EscrowLedgerEntryAvgAggregateOutputType | null;
    _sum: EscrowLedgerEntrySumAggregateOutputType | null;
    _min: EscrowLedgerEntryMinAggregateOutputType | null;
    _max: EscrowLedgerEntryMaxAggregateOutputType | null;
};
export type GetEscrowLedgerEntryGroupByPayload<T extends EscrowLedgerEntryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EscrowLedgerEntryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EscrowLedgerEntryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EscrowLedgerEntryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EscrowLedgerEntryGroupByOutputType[P]>;
}>>;
export type EscrowLedgerEntryWhereInput = {
    AND?: Prisma.EscrowLedgerEntryWhereInput | Prisma.EscrowLedgerEntryWhereInput[];
    OR?: Prisma.EscrowLedgerEntryWhereInput[];
    NOT?: Prisma.EscrowLedgerEntryWhereInput | Prisma.EscrowLedgerEntryWhereInput[];
    id?: Prisma.UuidFilter<"EscrowLedgerEntry"> | string;
    transactionId?: Prisma.UuidFilter<"EscrowLedgerEntry"> | string;
    accountId?: Prisma.UuidFilter<"EscrowLedgerEntry"> | string;
    direction?: Prisma.EnumEntryDirectionFilter<"EscrowLedgerEntry"> | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFilter<"EscrowLedgerEntry"> | bigint | number;
    createdAt?: Prisma.DateTimeFilter<"EscrowLedgerEntry"> | Date | string;
    transaction?: Prisma.XOR<Prisma.LedgerTransactionScalarRelationFilter, Prisma.LedgerTransactionWhereInput>;
    account?: Prisma.XOR<Prisma.LedgerAccountScalarRelationFilter, Prisma.LedgerAccountWhereInput>;
};
export type EscrowLedgerEntryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    transaction?: Prisma.LedgerTransactionOrderByWithRelationInput;
    account?: Prisma.LedgerAccountOrderByWithRelationInput;
};
export type EscrowLedgerEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.EscrowLedgerEntryWhereInput | Prisma.EscrowLedgerEntryWhereInput[];
    OR?: Prisma.EscrowLedgerEntryWhereInput[];
    NOT?: Prisma.EscrowLedgerEntryWhereInput | Prisma.EscrowLedgerEntryWhereInput[];
    transactionId?: Prisma.UuidFilter<"EscrowLedgerEntry"> | string;
    accountId?: Prisma.UuidFilter<"EscrowLedgerEntry"> | string;
    direction?: Prisma.EnumEntryDirectionFilter<"EscrowLedgerEntry"> | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFilter<"EscrowLedgerEntry"> | bigint | number;
    createdAt?: Prisma.DateTimeFilter<"EscrowLedgerEntry"> | Date | string;
    transaction?: Prisma.XOR<Prisma.LedgerTransactionScalarRelationFilter, Prisma.LedgerTransactionWhereInput>;
    account?: Prisma.XOR<Prisma.LedgerAccountScalarRelationFilter, Prisma.LedgerAccountWhereInput>;
}, "id">;
export type EscrowLedgerEntryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.EscrowLedgerEntryCountOrderByAggregateInput;
    _avg?: Prisma.EscrowLedgerEntryAvgOrderByAggregateInput;
    _max?: Prisma.EscrowLedgerEntryMaxOrderByAggregateInput;
    _min?: Prisma.EscrowLedgerEntryMinOrderByAggregateInput;
    _sum?: Prisma.EscrowLedgerEntrySumOrderByAggregateInput;
};
export type EscrowLedgerEntryScalarWhereWithAggregatesInput = {
    AND?: Prisma.EscrowLedgerEntryScalarWhereWithAggregatesInput | Prisma.EscrowLedgerEntryScalarWhereWithAggregatesInput[];
    OR?: Prisma.EscrowLedgerEntryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EscrowLedgerEntryScalarWhereWithAggregatesInput | Prisma.EscrowLedgerEntryScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"EscrowLedgerEntry"> | string;
    transactionId?: Prisma.UuidWithAggregatesFilter<"EscrowLedgerEntry"> | string;
    accountId?: Prisma.UuidWithAggregatesFilter<"EscrowLedgerEntry"> | string;
    direction?: Prisma.EnumEntryDirectionWithAggregatesFilter<"EscrowLedgerEntry"> | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntWithAggregatesFilter<"EscrowLedgerEntry"> | bigint | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EscrowLedgerEntry"> | Date | string;
};
export type EscrowLedgerEntryCreateInput = {
    id?: string;
    direction: $Enums.EntryDirection;
    amountMinor: bigint | number;
    createdAt?: Date | string;
    transaction: Prisma.LedgerTransactionCreateNestedOneWithoutEntriesInput;
    account: Prisma.LedgerAccountCreateNestedOneWithoutEntriesInput;
};
export type EscrowLedgerEntryUncheckedCreateInput = {
    id?: string;
    transactionId: string;
    accountId: string;
    direction: $Enums.EntryDirection;
    amountMinor: bigint | number;
    createdAt?: Date | string;
};
export type EscrowLedgerEntryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumEntryDirectionFieldUpdateOperationsInput | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transaction?: Prisma.LedgerTransactionUpdateOneRequiredWithoutEntriesNestedInput;
    account?: Prisma.LedgerAccountUpdateOneRequiredWithoutEntriesNestedInput;
};
export type EscrowLedgerEntryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumEntryDirectionFieldUpdateOperationsInput | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscrowLedgerEntryCreateManyInput = {
    id?: string;
    transactionId: string;
    accountId: string;
    direction: $Enums.EntryDirection;
    amountMinor: bigint | number;
    createdAt?: Date | string;
};
export type EscrowLedgerEntryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumEntryDirectionFieldUpdateOperationsInput | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscrowLedgerEntryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumEntryDirectionFieldUpdateOperationsInput | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscrowLedgerEntryListRelationFilter = {
    every?: Prisma.EscrowLedgerEntryWhereInput;
    some?: Prisma.EscrowLedgerEntryWhereInput;
    none?: Prisma.EscrowLedgerEntryWhereInput;
};
export type EscrowLedgerEntryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EscrowLedgerEntryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EscrowLedgerEntryAvgOrderByAggregateInput = {
    amountMinor?: Prisma.SortOrder;
};
export type EscrowLedgerEntryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EscrowLedgerEntryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    accountId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    amountMinor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EscrowLedgerEntrySumOrderByAggregateInput = {
    amountMinor?: Prisma.SortOrder;
};
export type EscrowLedgerEntryCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutAccountInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutAccountInput> | Prisma.EscrowLedgerEntryCreateWithoutAccountInput[] | Prisma.EscrowLedgerEntryUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.EscrowLedgerEntryCreateOrConnectWithoutAccountInput | Prisma.EscrowLedgerEntryCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.EscrowLedgerEntryCreateManyAccountInputEnvelope;
    connect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
};
export type EscrowLedgerEntryUncheckedCreateNestedManyWithoutAccountInput = {
    create?: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutAccountInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutAccountInput> | Prisma.EscrowLedgerEntryCreateWithoutAccountInput[] | Prisma.EscrowLedgerEntryUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.EscrowLedgerEntryCreateOrConnectWithoutAccountInput | Prisma.EscrowLedgerEntryCreateOrConnectWithoutAccountInput[];
    createMany?: Prisma.EscrowLedgerEntryCreateManyAccountInputEnvelope;
    connect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
};
export type EscrowLedgerEntryUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutAccountInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutAccountInput> | Prisma.EscrowLedgerEntryCreateWithoutAccountInput[] | Prisma.EscrowLedgerEntryUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.EscrowLedgerEntryCreateOrConnectWithoutAccountInput | Prisma.EscrowLedgerEntryCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.EscrowLedgerEntryUpsertWithWhereUniqueWithoutAccountInput | Prisma.EscrowLedgerEntryUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.EscrowLedgerEntryCreateManyAccountInputEnvelope;
    set?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    disconnect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    delete?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    connect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    update?: Prisma.EscrowLedgerEntryUpdateWithWhereUniqueWithoutAccountInput | Prisma.EscrowLedgerEntryUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.EscrowLedgerEntryUpdateManyWithWhereWithoutAccountInput | Prisma.EscrowLedgerEntryUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.EscrowLedgerEntryScalarWhereInput | Prisma.EscrowLedgerEntryScalarWhereInput[];
};
export type EscrowLedgerEntryUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutAccountInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutAccountInput> | Prisma.EscrowLedgerEntryCreateWithoutAccountInput[] | Prisma.EscrowLedgerEntryUncheckedCreateWithoutAccountInput[];
    connectOrCreate?: Prisma.EscrowLedgerEntryCreateOrConnectWithoutAccountInput | Prisma.EscrowLedgerEntryCreateOrConnectWithoutAccountInput[];
    upsert?: Prisma.EscrowLedgerEntryUpsertWithWhereUniqueWithoutAccountInput | Prisma.EscrowLedgerEntryUpsertWithWhereUniqueWithoutAccountInput[];
    createMany?: Prisma.EscrowLedgerEntryCreateManyAccountInputEnvelope;
    set?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    disconnect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    delete?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    connect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    update?: Prisma.EscrowLedgerEntryUpdateWithWhereUniqueWithoutAccountInput | Prisma.EscrowLedgerEntryUpdateWithWhereUniqueWithoutAccountInput[];
    updateMany?: Prisma.EscrowLedgerEntryUpdateManyWithWhereWithoutAccountInput | Prisma.EscrowLedgerEntryUpdateManyWithWhereWithoutAccountInput[];
    deleteMany?: Prisma.EscrowLedgerEntryScalarWhereInput | Prisma.EscrowLedgerEntryScalarWhereInput[];
};
export type EscrowLedgerEntryCreateNestedManyWithoutTransactionInput = {
    create?: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutTransactionInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutTransactionInput> | Prisma.EscrowLedgerEntryCreateWithoutTransactionInput[] | Prisma.EscrowLedgerEntryUncheckedCreateWithoutTransactionInput[];
    connectOrCreate?: Prisma.EscrowLedgerEntryCreateOrConnectWithoutTransactionInput | Prisma.EscrowLedgerEntryCreateOrConnectWithoutTransactionInput[];
    createMany?: Prisma.EscrowLedgerEntryCreateManyTransactionInputEnvelope;
    connect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
};
export type EscrowLedgerEntryUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutTransactionInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutTransactionInput> | Prisma.EscrowLedgerEntryCreateWithoutTransactionInput[] | Prisma.EscrowLedgerEntryUncheckedCreateWithoutTransactionInput[];
    connectOrCreate?: Prisma.EscrowLedgerEntryCreateOrConnectWithoutTransactionInput | Prisma.EscrowLedgerEntryCreateOrConnectWithoutTransactionInput[];
    createMany?: Prisma.EscrowLedgerEntryCreateManyTransactionInputEnvelope;
    connect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
};
export type EscrowLedgerEntryUpdateManyWithoutTransactionNestedInput = {
    create?: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutTransactionInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutTransactionInput> | Prisma.EscrowLedgerEntryCreateWithoutTransactionInput[] | Prisma.EscrowLedgerEntryUncheckedCreateWithoutTransactionInput[];
    connectOrCreate?: Prisma.EscrowLedgerEntryCreateOrConnectWithoutTransactionInput | Prisma.EscrowLedgerEntryCreateOrConnectWithoutTransactionInput[];
    upsert?: Prisma.EscrowLedgerEntryUpsertWithWhereUniqueWithoutTransactionInput | Prisma.EscrowLedgerEntryUpsertWithWhereUniqueWithoutTransactionInput[];
    createMany?: Prisma.EscrowLedgerEntryCreateManyTransactionInputEnvelope;
    set?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    disconnect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    delete?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    connect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    update?: Prisma.EscrowLedgerEntryUpdateWithWhereUniqueWithoutTransactionInput | Prisma.EscrowLedgerEntryUpdateWithWhereUniqueWithoutTransactionInput[];
    updateMany?: Prisma.EscrowLedgerEntryUpdateManyWithWhereWithoutTransactionInput | Prisma.EscrowLedgerEntryUpdateManyWithWhereWithoutTransactionInput[];
    deleteMany?: Prisma.EscrowLedgerEntryScalarWhereInput | Prisma.EscrowLedgerEntryScalarWhereInput[];
};
export type EscrowLedgerEntryUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutTransactionInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutTransactionInput> | Prisma.EscrowLedgerEntryCreateWithoutTransactionInput[] | Prisma.EscrowLedgerEntryUncheckedCreateWithoutTransactionInput[];
    connectOrCreate?: Prisma.EscrowLedgerEntryCreateOrConnectWithoutTransactionInput | Prisma.EscrowLedgerEntryCreateOrConnectWithoutTransactionInput[];
    upsert?: Prisma.EscrowLedgerEntryUpsertWithWhereUniqueWithoutTransactionInput | Prisma.EscrowLedgerEntryUpsertWithWhereUniqueWithoutTransactionInput[];
    createMany?: Prisma.EscrowLedgerEntryCreateManyTransactionInputEnvelope;
    set?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    disconnect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    delete?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    connect?: Prisma.EscrowLedgerEntryWhereUniqueInput | Prisma.EscrowLedgerEntryWhereUniqueInput[];
    update?: Prisma.EscrowLedgerEntryUpdateWithWhereUniqueWithoutTransactionInput | Prisma.EscrowLedgerEntryUpdateWithWhereUniqueWithoutTransactionInput[];
    updateMany?: Prisma.EscrowLedgerEntryUpdateManyWithWhereWithoutTransactionInput | Prisma.EscrowLedgerEntryUpdateManyWithWhereWithoutTransactionInput[];
    deleteMany?: Prisma.EscrowLedgerEntryScalarWhereInput | Prisma.EscrowLedgerEntryScalarWhereInput[];
};
export type EnumEntryDirectionFieldUpdateOperationsInput = {
    set?: $Enums.EntryDirection;
};
export type EscrowLedgerEntryCreateWithoutAccountInput = {
    id?: string;
    direction: $Enums.EntryDirection;
    amountMinor: bigint | number;
    createdAt?: Date | string;
    transaction: Prisma.LedgerTransactionCreateNestedOneWithoutEntriesInput;
};
export type EscrowLedgerEntryUncheckedCreateWithoutAccountInput = {
    id?: string;
    transactionId: string;
    direction: $Enums.EntryDirection;
    amountMinor: bigint | number;
    createdAt?: Date | string;
};
export type EscrowLedgerEntryCreateOrConnectWithoutAccountInput = {
    where: Prisma.EscrowLedgerEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutAccountInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutAccountInput>;
};
export type EscrowLedgerEntryCreateManyAccountInputEnvelope = {
    data: Prisma.EscrowLedgerEntryCreateManyAccountInput | Prisma.EscrowLedgerEntryCreateManyAccountInput[];
    skipDuplicates?: boolean;
};
export type EscrowLedgerEntryUpsertWithWhereUniqueWithoutAccountInput = {
    where: Prisma.EscrowLedgerEntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.EscrowLedgerEntryUpdateWithoutAccountInput, Prisma.EscrowLedgerEntryUncheckedUpdateWithoutAccountInput>;
    create: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutAccountInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutAccountInput>;
};
export type EscrowLedgerEntryUpdateWithWhereUniqueWithoutAccountInput = {
    where: Prisma.EscrowLedgerEntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.EscrowLedgerEntryUpdateWithoutAccountInput, Prisma.EscrowLedgerEntryUncheckedUpdateWithoutAccountInput>;
};
export type EscrowLedgerEntryUpdateManyWithWhereWithoutAccountInput = {
    where: Prisma.EscrowLedgerEntryScalarWhereInput;
    data: Prisma.XOR<Prisma.EscrowLedgerEntryUpdateManyMutationInput, Prisma.EscrowLedgerEntryUncheckedUpdateManyWithoutAccountInput>;
};
export type EscrowLedgerEntryScalarWhereInput = {
    AND?: Prisma.EscrowLedgerEntryScalarWhereInput | Prisma.EscrowLedgerEntryScalarWhereInput[];
    OR?: Prisma.EscrowLedgerEntryScalarWhereInput[];
    NOT?: Prisma.EscrowLedgerEntryScalarWhereInput | Prisma.EscrowLedgerEntryScalarWhereInput[];
    id?: Prisma.UuidFilter<"EscrowLedgerEntry"> | string;
    transactionId?: Prisma.UuidFilter<"EscrowLedgerEntry"> | string;
    accountId?: Prisma.UuidFilter<"EscrowLedgerEntry"> | string;
    direction?: Prisma.EnumEntryDirectionFilter<"EscrowLedgerEntry"> | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFilter<"EscrowLedgerEntry"> | bigint | number;
    createdAt?: Prisma.DateTimeFilter<"EscrowLedgerEntry"> | Date | string;
};
export type EscrowLedgerEntryCreateWithoutTransactionInput = {
    id?: string;
    direction: $Enums.EntryDirection;
    amountMinor: bigint | number;
    createdAt?: Date | string;
    account: Prisma.LedgerAccountCreateNestedOneWithoutEntriesInput;
};
export type EscrowLedgerEntryUncheckedCreateWithoutTransactionInput = {
    id?: string;
    accountId: string;
    direction: $Enums.EntryDirection;
    amountMinor: bigint | number;
    createdAt?: Date | string;
};
export type EscrowLedgerEntryCreateOrConnectWithoutTransactionInput = {
    where: Prisma.EscrowLedgerEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutTransactionInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutTransactionInput>;
};
export type EscrowLedgerEntryCreateManyTransactionInputEnvelope = {
    data: Prisma.EscrowLedgerEntryCreateManyTransactionInput | Prisma.EscrowLedgerEntryCreateManyTransactionInput[];
    skipDuplicates?: boolean;
};
export type EscrowLedgerEntryUpsertWithWhereUniqueWithoutTransactionInput = {
    where: Prisma.EscrowLedgerEntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.EscrowLedgerEntryUpdateWithoutTransactionInput, Prisma.EscrowLedgerEntryUncheckedUpdateWithoutTransactionInput>;
    create: Prisma.XOR<Prisma.EscrowLedgerEntryCreateWithoutTransactionInput, Prisma.EscrowLedgerEntryUncheckedCreateWithoutTransactionInput>;
};
export type EscrowLedgerEntryUpdateWithWhereUniqueWithoutTransactionInput = {
    where: Prisma.EscrowLedgerEntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.EscrowLedgerEntryUpdateWithoutTransactionInput, Prisma.EscrowLedgerEntryUncheckedUpdateWithoutTransactionInput>;
};
export type EscrowLedgerEntryUpdateManyWithWhereWithoutTransactionInput = {
    where: Prisma.EscrowLedgerEntryScalarWhereInput;
    data: Prisma.XOR<Prisma.EscrowLedgerEntryUpdateManyMutationInput, Prisma.EscrowLedgerEntryUncheckedUpdateManyWithoutTransactionInput>;
};
export type EscrowLedgerEntryCreateManyAccountInput = {
    id?: string;
    transactionId: string;
    direction: $Enums.EntryDirection;
    amountMinor: bigint | number;
    createdAt?: Date | string;
};
export type EscrowLedgerEntryUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumEntryDirectionFieldUpdateOperationsInput | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transaction?: Prisma.LedgerTransactionUpdateOneRequiredWithoutEntriesNestedInput;
};
export type EscrowLedgerEntryUncheckedUpdateWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumEntryDirectionFieldUpdateOperationsInput | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscrowLedgerEntryUncheckedUpdateManyWithoutAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumEntryDirectionFieldUpdateOperationsInput | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscrowLedgerEntryCreateManyTransactionInput = {
    id?: string;
    accountId: string;
    direction: $Enums.EntryDirection;
    amountMinor: bigint | number;
    createdAt?: Date | string;
};
export type EscrowLedgerEntryUpdateWithoutTransactionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumEntryDirectionFieldUpdateOperationsInput | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    account?: Prisma.LedgerAccountUpdateOneRequiredWithoutEntriesNestedInput;
};
export type EscrowLedgerEntryUncheckedUpdateWithoutTransactionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumEntryDirectionFieldUpdateOperationsInput | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscrowLedgerEntryUncheckedUpdateManyWithoutTransactionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumEntryDirectionFieldUpdateOperationsInput | $Enums.EntryDirection;
    amountMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EscrowLedgerEntrySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    transactionId?: boolean;
    accountId?: boolean;
    direction?: boolean;
    amountMinor?: boolean;
    createdAt?: boolean;
    transaction?: boolean | Prisma.LedgerTransactionDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.LedgerAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["escrowLedgerEntry"]>;
export type EscrowLedgerEntrySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    transactionId?: boolean;
    accountId?: boolean;
    direction?: boolean;
    amountMinor?: boolean;
    createdAt?: boolean;
    transaction?: boolean | Prisma.LedgerTransactionDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.LedgerAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["escrowLedgerEntry"]>;
export type EscrowLedgerEntrySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    transactionId?: boolean;
    accountId?: boolean;
    direction?: boolean;
    amountMinor?: boolean;
    createdAt?: boolean;
    transaction?: boolean | Prisma.LedgerTransactionDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.LedgerAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["escrowLedgerEntry"]>;
export type EscrowLedgerEntrySelectScalar = {
    id?: boolean;
    transactionId?: boolean;
    accountId?: boolean;
    direction?: boolean;
    amountMinor?: boolean;
    createdAt?: boolean;
};
export type EscrowLedgerEntryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "transactionId" | "accountId" | "direction" | "amountMinor" | "createdAt", ExtArgs["result"]["escrowLedgerEntry"]>;
export type EscrowLedgerEntryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transaction?: boolean | Prisma.LedgerTransactionDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.LedgerAccountDefaultArgs<ExtArgs>;
};
export type EscrowLedgerEntryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transaction?: boolean | Prisma.LedgerTransactionDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.LedgerAccountDefaultArgs<ExtArgs>;
};
export type EscrowLedgerEntryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transaction?: boolean | Prisma.LedgerTransactionDefaultArgs<ExtArgs>;
    account?: boolean | Prisma.LedgerAccountDefaultArgs<ExtArgs>;
};
export type $EscrowLedgerEntryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EscrowLedgerEntry";
    objects: {
        transaction: Prisma.$LedgerTransactionPayload<ExtArgs>;
        account: Prisma.$LedgerAccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        transactionId: string;
        accountId: string;
        direction: $Enums.EntryDirection;
        amountMinor: bigint;
        createdAt: Date;
    }, ExtArgs["result"]["escrowLedgerEntry"]>;
    composites: {};
};
export type EscrowLedgerEntryGetPayload<S extends boolean | null | undefined | EscrowLedgerEntryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload, S>;
export type EscrowLedgerEntryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EscrowLedgerEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EscrowLedgerEntryCountAggregateInputType | true;
};
export interface EscrowLedgerEntryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EscrowLedgerEntry'];
        meta: {
            name: 'EscrowLedgerEntry';
        };
    };
    findUnique<T extends EscrowLedgerEntryFindUniqueArgs>(args: Prisma.SelectSubset<T, EscrowLedgerEntryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EscrowLedgerEntryClient<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EscrowLedgerEntryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EscrowLedgerEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EscrowLedgerEntryClient<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EscrowLedgerEntryFindFirstArgs>(args?: Prisma.SelectSubset<T, EscrowLedgerEntryFindFirstArgs<ExtArgs>>): Prisma.Prisma__EscrowLedgerEntryClient<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EscrowLedgerEntryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EscrowLedgerEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EscrowLedgerEntryClient<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EscrowLedgerEntryFindManyArgs>(args?: Prisma.SelectSubset<T, EscrowLedgerEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EscrowLedgerEntryCreateArgs>(args: Prisma.SelectSubset<T, EscrowLedgerEntryCreateArgs<ExtArgs>>): Prisma.Prisma__EscrowLedgerEntryClient<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EscrowLedgerEntryCreateManyArgs>(args?: Prisma.SelectSubset<T, EscrowLedgerEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EscrowLedgerEntryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EscrowLedgerEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EscrowLedgerEntryDeleteArgs>(args: Prisma.SelectSubset<T, EscrowLedgerEntryDeleteArgs<ExtArgs>>): Prisma.Prisma__EscrowLedgerEntryClient<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EscrowLedgerEntryUpdateArgs>(args: Prisma.SelectSubset<T, EscrowLedgerEntryUpdateArgs<ExtArgs>>): Prisma.Prisma__EscrowLedgerEntryClient<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EscrowLedgerEntryDeleteManyArgs>(args?: Prisma.SelectSubset<T, EscrowLedgerEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EscrowLedgerEntryUpdateManyArgs>(args: Prisma.SelectSubset<T, EscrowLedgerEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EscrowLedgerEntryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EscrowLedgerEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EscrowLedgerEntryUpsertArgs>(args: Prisma.SelectSubset<T, EscrowLedgerEntryUpsertArgs<ExtArgs>>): Prisma.Prisma__EscrowLedgerEntryClient<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EscrowLedgerEntryCountArgs>(args?: Prisma.Subset<T, EscrowLedgerEntryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EscrowLedgerEntryCountAggregateOutputType> : number>;
    aggregate<T extends EscrowLedgerEntryAggregateArgs>(args: Prisma.Subset<T, EscrowLedgerEntryAggregateArgs>): Prisma.PrismaPromise<GetEscrowLedgerEntryAggregateType<T>>;
    groupBy<T extends EscrowLedgerEntryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EscrowLedgerEntryGroupByArgs['orderBy'];
    } : {
        orderBy?: EscrowLedgerEntryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EscrowLedgerEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEscrowLedgerEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EscrowLedgerEntryFieldRefs;
}
export interface Prisma__EscrowLedgerEntryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    transaction<T extends Prisma.LedgerTransactionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LedgerTransactionDefaultArgs<ExtArgs>>): Prisma.Prisma__LedgerTransactionClient<runtime.Types.Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    account<T extends Prisma.LedgerAccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LedgerAccountDefaultArgs<ExtArgs>>): Prisma.Prisma__LedgerAccountClient<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EscrowLedgerEntryFieldRefs {
    readonly id: Prisma.FieldRef<"EscrowLedgerEntry", 'String'>;
    readonly transactionId: Prisma.FieldRef<"EscrowLedgerEntry", 'String'>;
    readonly accountId: Prisma.FieldRef<"EscrowLedgerEntry", 'String'>;
    readonly direction: Prisma.FieldRef<"EscrowLedgerEntry", 'EntryDirection'>;
    readonly amountMinor: Prisma.FieldRef<"EscrowLedgerEntry", 'BigInt'>;
    readonly createdAt: Prisma.FieldRef<"EscrowLedgerEntry", 'DateTime'>;
}
export type EscrowLedgerEntryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscrowLedgerEntrySelect<ExtArgs> | null;
    omit?: Prisma.EscrowLedgerEntryOmit<ExtArgs> | null;
    include?: Prisma.EscrowLedgerEntryInclude<ExtArgs> | null;
    where: Prisma.EscrowLedgerEntryWhereUniqueInput;
};
export type EscrowLedgerEntryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscrowLedgerEntrySelect<ExtArgs> | null;
    omit?: Prisma.EscrowLedgerEntryOmit<ExtArgs> | null;
    include?: Prisma.EscrowLedgerEntryInclude<ExtArgs> | null;
    where: Prisma.EscrowLedgerEntryWhereUniqueInput;
};
export type EscrowLedgerEntryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EscrowLedgerEntryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EscrowLedgerEntryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type EscrowLedgerEntryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscrowLedgerEntrySelect<ExtArgs> | null;
    omit?: Prisma.EscrowLedgerEntryOmit<ExtArgs> | null;
    include?: Prisma.EscrowLedgerEntryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EscrowLedgerEntryCreateInput, Prisma.EscrowLedgerEntryUncheckedCreateInput>;
};
export type EscrowLedgerEntryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EscrowLedgerEntryCreateManyInput | Prisma.EscrowLedgerEntryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EscrowLedgerEntryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscrowLedgerEntrySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EscrowLedgerEntryOmit<ExtArgs> | null;
    data: Prisma.EscrowLedgerEntryCreateManyInput | Prisma.EscrowLedgerEntryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.EscrowLedgerEntryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type EscrowLedgerEntryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscrowLedgerEntrySelect<ExtArgs> | null;
    omit?: Prisma.EscrowLedgerEntryOmit<ExtArgs> | null;
    include?: Prisma.EscrowLedgerEntryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EscrowLedgerEntryUpdateInput, Prisma.EscrowLedgerEntryUncheckedUpdateInput>;
    where: Prisma.EscrowLedgerEntryWhereUniqueInput;
};
export type EscrowLedgerEntryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EscrowLedgerEntryUpdateManyMutationInput, Prisma.EscrowLedgerEntryUncheckedUpdateManyInput>;
    where?: Prisma.EscrowLedgerEntryWhereInput;
    limit?: number;
};
export type EscrowLedgerEntryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscrowLedgerEntrySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EscrowLedgerEntryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EscrowLedgerEntryUpdateManyMutationInput, Prisma.EscrowLedgerEntryUncheckedUpdateManyInput>;
    where?: Prisma.EscrowLedgerEntryWhereInput;
    limit?: number;
    include?: Prisma.EscrowLedgerEntryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type EscrowLedgerEntryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscrowLedgerEntrySelect<ExtArgs> | null;
    omit?: Prisma.EscrowLedgerEntryOmit<ExtArgs> | null;
    include?: Prisma.EscrowLedgerEntryInclude<ExtArgs> | null;
    where: Prisma.EscrowLedgerEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.EscrowLedgerEntryCreateInput, Prisma.EscrowLedgerEntryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EscrowLedgerEntryUpdateInput, Prisma.EscrowLedgerEntryUncheckedUpdateInput>;
};
export type EscrowLedgerEntryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscrowLedgerEntrySelect<ExtArgs> | null;
    omit?: Prisma.EscrowLedgerEntryOmit<ExtArgs> | null;
    include?: Prisma.EscrowLedgerEntryInclude<ExtArgs> | null;
    where: Prisma.EscrowLedgerEntryWhereUniqueInput;
};
export type EscrowLedgerEntryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EscrowLedgerEntryWhereInput;
    limit?: number;
};
export type EscrowLedgerEntryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EscrowLedgerEntrySelect<ExtArgs> | null;
    omit?: Prisma.EscrowLedgerEntryOmit<ExtArgs> | null;
    include?: Prisma.EscrowLedgerEntryInclude<ExtArgs> | null;
};
