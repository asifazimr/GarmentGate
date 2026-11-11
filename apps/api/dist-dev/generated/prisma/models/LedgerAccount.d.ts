import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LedgerAccountModel = runtime.Types.Result.DefaultSelection<Prisma.$LedgerAccountPayload>;
export type AggregateLedgerAccount = {
    _count: LedgerAccountCountAggregateOutputType | null;
    _min: LedgerAccountMinAggregateOutputType | null;
    _max: LedgerAccountMaxAggregateOutputType | null;
};
export type LedgerAccountMinAggregateOutputType = {
    id: string | null;
    type: $Enums.LedgerAccountType | null;
    companyId: string | null;
    currency: $Enums.Currency | null;
    createdAt: Date | null;
    logisticsPartnerId: string | null;
};
export type LedgerAccountMaxAggregateOutputType = {
    id: string | null;
    type: $Enums.LedgerAccountType | null;
    companyId: string | null;
    currency: $Enums.Currency | null;
    createdAt: Date | null;
    logisticsPartnerId: string | null;
};
export type LedgerAccountCountAggregateOutputType = {
    id: number;
    type: number;
    companyId: number;
    currency: number;
    createdAt: number;
    logisticsPartnerId: number;
    _all: number;
};
export type LedgerAccountMinAggregateInputType = {
    id?: true;
    type?: true;
    companyId?: true;
    currency?: true;
    createdAt?: true;
    logisticsPartnerId?: true;
};
export type LedgerAccountMaxAggregateInputType = {
    id?: true;
    type?: true;
    companyId?: true;
    currency?: true;
    createdAt?: true;
    logisticsPartnerId?: true;
};
export type LedgerAccountCountAggregateInputType = {
    id?: true;
    type?: true;
    companyId?: true;
    currency?: true;
    createdAt?: true;
    logisticsPartnerId?: true;
    _all?: true;
};
export type LedgerAccountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LedgerAccountWhereInput;
    orderBy?: Prisma.LedgerAccountOrderByWithRelationInput | Prisma.LedgerAccountOrderByWithRelationInput[];
    cursor?: Prisma.LedgerAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LedgerAccountCountAggregateInputType;
    _min?: LedgerAccountMinAggregateInputType;
    _max?: LedgerAccountMaxAggregateInputType;
};
export type GetLedgerAccountAggregateType<T extends LedgerAccountAggregateArgs> = {
    [P in keyof T & keyof AggregateLedgerAccount]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLedgerAccount[P]> : Prisma.GetScalarType<T[P], AggregateLedgerAccount[P]>;
};
export type LedgerAccountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LedgerAccountWhereInput;
    orderBy?: Prisma.LedgerAccountOrderByWithAggregationInput | Prisma.LedgerAccountOrderByWithAggregationInput[];
    by: Prisma.LedgerAccountScalarFieldEnum[] | Prisma.LedgerAccountScalarFieldEnum;
    having?: Prisma.LedgerAccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LedgerAccountCountAggregateInputType | true;
    _min?: LedgerAccountMinAggregateInputType;
    _max?: LedgerAccountMaxAggregateInputType;
};
export type LedgerAccountGroupByOutputType = {
    id: string;
    type: $Enums.LedgerAccountType;
    companyId: string | null;
    currency: $Enums.Currency;
    createdAt: Date;
    logisticsPartnerId: string | null;
    _count: LedgerAccountCountAggregateOutputType | null;
    _min: LedgerAccountMinAggregateOutputType | null;
    _max: LedgerAccountMaxAggregateOutputType | null;
};
export type GetLedgerAccountGroupByPayload<T extends LedgerAccountGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LedgerAccountGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LedgerAccountGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LedgerAccountGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LedgerAccountGroupByOutputType[P]>;
}>>;
export type LedgerAccountWhereInput = {
    AND?: Prisma.LedgerAccountWhereInput | Prisma.LedgerAccountWhereInput[];
    OR?: Prisma.LedgerAccountWhereInput[];
    NOT?: Prisma.LedgerAccountWhereInput | Prisma.LedgerAccountWhereInput[];
    id?: Prisma.UuidFilter<"LedgerAccount"> | string;
    type?: Prisma.EnumLedgerAccountTypeFilter<"LedgerAccount"> | $Enums.LedgerAccountType;
    companyId?: Prisma.UuidNullableFilter<"LedgerAccount"> | string | null;
    currency?: Prisma.EnumCurrencyFilter<"LedgerAccount"> | $Enums.Currency;
    createdAt?: Prisma.DateTimeFilter<"LedgerAccount"> | Date | string;
    logisticsPartnerId?: Prisma.UuidNullableFilter<"LedgerAccount"> | string | null;
    company?: Prisma.XOR<Prisma.CompanyNullableScalarRelationFilter, Prisma.CompanyWhereInput> | null;
    logisticsPartner?: Prisma.XOR<Prisma.LogisticsPartnerNullableScalarRelationFilter, Prisma.LogisticsPartnerWhereInput> | null;
    entries?: Prisma.EscrowLedgerEntryListRelationFilter;
};
export type LedgerAccountOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    companyId?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    logisticsPartnerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    company?: Prisma.CompanyOrderByWithRelationInput;
    logisticsPartner?: Prisma.LogisticsPartnerOrderByWithRelationInput;
    entries?: Prisma.EscrowLedgerEntryOrderByRelationAggregateInput;
};
export type LedgerAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    type_companyId_currency?: Prisma.LedgerAccountTypeCompanyIdCurrencyCompoundUniqueInput;
    AND?: Prisma.LedgerAccountWhereInput | Prisma.LedgerAccountWhereInput[];
    OR?: Prisma.LedgerAccountWhereInput[];
    NOT?: Prisma.LedgerAccountWhereInput | Prisma.LedgerAccountWhereInput[];
    type?: Prisma.EnumLedgerAccountTypeFilter<"LedgerAccount"> | $Enums.LedgerAccountType;
    companyId?: Prisma.UuidNullableFilter<"LedgerAccount"> | string | null;
    currency?: Prisma.EnumCurrencyFilter<"LedgerAccount"> | $Enums.Currency;
    createdAt?: Prisma.DateTimeFilter<"LedgerAccount"> | Date | string;
    logisticsPartnerId?: Prisma.UuidNullableFilter<"LedgerAccount"> | string | null;
    company?: Prisma.XOR<Prisma.CompanyNullableScalarRelationFilter, Prisma.CompanyWhereInput> | null;
    logisticsPartner?: Prisma.XOR<Prisma.LogisticsPartnerNullableScalarRelationFilter, Prisma.LogisticsPartnerWhereInput> | null;
    entries?: Prisma.EscrowLedgerEntryListRelationFilter;
}, "id" | "type_companyId_currency">;
export type LedgerAccountOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    companyId?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    logisticsPartnerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.LedgerAccountCountOrderByAggregateInput;
    _max?: Prisma.LedgerAccountMaxOrderByAggregateInput;
    _min?: Prisma.LedgerAccountMinOrderByAggregateInput;
};
export type LedgerAccountScalarWhereWithAggregatesInput = {
    AND?: Prisma.LedgerAccountScalarWhereWithAggregatesInput | Prisma.LedgerAccountScalarWhereWithAggregatesInput[];
    OR?: Prisma.LedgerAccountScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LedgerAccountScalarWhereWithAggregatesInput | Prisma.LedgerAccountScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"LedgerAccount"> | string;
    type?: Prisma.EnumLedgerAccountTypeWithAggregatesFilter<"LedgerAccount"> | $Enums.LedgerAccountType;
    companyId?: Prisma.UuidNullableWithAggregatesFilter<"LedgerAccount"> | string | null;
    currency?: Prisma.EnumCurrencyWithAggregatesFilter<"LedgerAccount"> | $Enums.Currency;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"LedgerAccount"> | Date | string;
    logisticsPartnerId?: Prisma.UuidNullableWithAggregatesFilter<"LedgerAccount"> | string | null;
};
export type LedgerAccountCreateInput = {
    id?: string;
    type: $Enums.LedgerAccountType;
    currency: $Enums.Currency;
    createdAt?: Date | string;
    company?: Prisma.CompanyCreateNestedOneWithoutLedgerAccountsInput;
    logisticsPartner?: Prisma.LogisticsPartnerCreateNestedOneWithoutLedgerAccountsInput;
    entries?: Prisma.EscrowLedgerEntryCreateNestedManyWithoutAccountInput;
};
export type LedgerAccountUncheckedCreateInput = {
    id?: string;
    type: $Enums.LedgerAccountType;
    companyId?: string | null;
    currency: $Enums.Currency;
    createdAt?: Date | string;
    logisticsPartnerId?: string | null;
    entries?: Prisma.EscrowLedgerEntryUncheckedCreateNestedManyWithoutAccountInput;
};
export type LedgerAccountUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneWithoutLedgerAccountsNestedInput;
    logisticsPartner?: Prisma.LogisticsPartnerUpdateOneWithoutLedgerAccountsNestedInput;
    entries?: Prisma.EscrowLedgerEntryUpdateManyWithoutAccountNestedInput;
};
export type LedgerAccountUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    companyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logisticsPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entries?: Prisma.EscrowLedgerEntryUncheckedUpdateManyWithoutAccountNestedInput;
};
export type LedgerAccountCreateManyInput = {
    id?: string;
    type: $Enums.LedgerAccountType;
    companyId?: string | null;
    currency: $Enums.Currency;
    createdAt?: Date | string;
    logisticsPartnerId?: string | null;
};
export type LedgerAccountUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LedgerAccountUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    companyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logisticsPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type LedgerAccountListRelationFilter = {
    every?: Prisma.LedgerAccountWhereInput;
    some?: Prisma.LedgerAccountWhereInput;
    none?: Prisma.LedgerAccountWhereInput;
};
export type LedgerAccountOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LedgerAccountTypeCompanyIdCurrencyCompoundUniqueInput = {
    type: $Enums.LedgerAccountType;
    companyId: string;
    currency: $Enums.Currency;
};
export type LedgerAccountCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    logisticsPartnerId?: Prisma.SortOrder;
};
export type LedgerAccountMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    logisticsPartnerId?: Prisma.SortOrder;
};
export type LedgerAccountMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    logisticsPartnerId?: Prisma.SortOrder;
};
export type LedgerAccountScalarRelationFilter = {
    is?: Prisma.LedgerAccountWhereInput;
    isNot?: Prisma.LedgerAccountWhereInput;
};
export type LedgerAccountCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.LedgerAccountCreateWithoutCompanyInput, Prisma.LedgerAccountUncheckedCreateWithoutCompanyInput> | Prisma.LedgerAccountCreateWithoutCompanyInput[] | Prisma.LedgerAccountUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.LedgerAccountCreateOrConnectWithoutCompanyInput | Prisma.LedgerAccountCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.LedgerAccountCreateManyCompanyInputEnvelope;
    connect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
};
export type LedgerAccountUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.LedgerAccountCreateWithoutCompanyInput, Prisma.LedgerAccountUncheckedCreateWithoutCompanyInput> | Prisma.LedgerAccountCreateWithoutCompanyInput[] | Prisma.LedgerAccountUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.LedgerAccountCreateOrConnectWithoutCompanyInput | Prisma.LedgerAccountCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.LedgerAccountCreateManyCompanyInputEnvelope;
    connect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
};
export type LedgerAccountUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerAccountCreateWithoutCompanyInput, Prisma.LedgerAccountUncheckedCreateWithoutCompanyInput> | Prisma.LedgerAccountCreateWithoutCompanyInput[] | Prisma.LedgerAccountUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.LedgerAccountCreateOrConnectWithoutCompanyInput | Prisma.LedgerAccountCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.LedgerAccountUpsertWithWhereUniqueWithoutCompanyInput | Prisma.LedgerAccountUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.LedgerAccountCreateManyCompanyInputEnvelope;
    set?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    disconnect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    delete?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    connect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    update?: Prisma.LedgerAccountUpdateWithWhereUniqueWithoutCompanyInput | Prisma.LedgerAccountUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.LedgerAccountUpdateManyWithWhereWithoutCompanyInput | Prisma.LedgerAccountUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.LedgerAccountScalarWhereInput | Prisma.LedgerAccountScalarWhereInput[];
};
export type LedgerAccountUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerAccountCreateWithoutCompanyInput, Prisma.LedgerAccountUncheckedCreateWithoutCompanyInput> | Prisma.LedgerAccountCreateWithoutCompanyInput[] | Prisma.LedgerAccountUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.LedgerAccountCreateOrConnectWithoutCompanyInput | Prisma.LedgerAccountCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.LedgerAccountUpsertWithWhereUniqueWithoutCompanyInput | Prisma.LedgerAccountUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.LedgerAccountCreateManyCompanyInputEnvelope;
    set?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    disconnect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    delete?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    connect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    update?: Prisma.LedgerAccountUpdateWithWhereUniqueWithoutCompanyInput | Prisma.LedgerAccountUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.LedgerAccountUpdateManyWithWhereWithoutCompanyInput | Prisma.LedgerAccountUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.LedgerAccountScalarWhereInput | Prisma.LedgerAccountScalarWhereInput[];
};
export type EnumLedgerAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.LedgerAccountType;
};
export type LedgerAccountCreateNestedOneWithoutEntriesInput = {
    create?: Prisma.XOR<Prisma.LedgerAccountCreateWithoutEntriesInput, Prisma.LedgerAccountUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.LedgerAccountCreateOrConnectWithoutEntriesInput;
    connect?: Prisma.LedgerAccountWhereUniqueInput;
};
export type LedgerAccountUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerAccountCreateWithoutEntriesInput, Prisma.LedgerAccountUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.LedgerAccountCreateOrConnectWithoutEntriesInput;
    upsert?: Prisma.LedgerAccountUpsertWithoutEntriesInput;
    connect?: Prisma.LedgerAccountWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LedgerAccountUpdateToOneWithWhereWithoutEntriesInput, Prisma.LedgerAccountUpdateWithoutEntriesInput>, Prisma.LedgerAccountUncheckedUpdateWithoutEntriesInput>;
};
export type LedgerAccountCreateNestedManyWithoutLogisticsPartnerInput = {
    create?: Prisma.XOR<Prisma.LedgerAccountCreateWithoutLogisticsPartnerInput, Prisma.LedgerAccountUncheckedCreateWithoutLogisticsPartnerInput> | Prisma.LedgerAccountCreateWithoutLogisticsPartnerInput[] | Prisma.LedgerAccountUncheckedCreateWithoutLogisticsPartnerInput[];
    connectOrCreate?: Prisma.LedgerAccountCreateOrConnectWithoutLogisticsPartnerInput | Prisma.LedgerAccountCreateOrConnectWithoutLogisticsPartnerInput[];
    createMany?: Prisma.LedgerAccountCreateManyLogisticsPartnerInputEnvelope;
    connect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
};
export type LedgerAccountUncheckedCreateNestedManyWithoutLogisticsPartnerInput = {
    create?: Prisma.XOR<Prisma.LedgerAccountCreateWithoutLogisticsPartnerInput, Prisma.LedgerAccountUncheckedCreateWithoutLogisticsPartnerInput> | Prisma.LedgerAccountCreateWithoutLogisticsPartnerInput[] | Prisma.LedgerAccountUncheckedCreateWithoutLogisticsPartnerInput[];
    connectOrCreate?: Prisma.LedgerAccountCreateOrConnectWithoutLogisticsPartnerInput | Prisma.LedgerAccountCreateOrConnectWithoutLogisticsPartnerInput[];
    createMany?: Prisma.LedgerAccountCreateManyLogisticsPartnerInputEnvelope;
    connect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
};
export type LedgerAccountUpdateManyWithoutLogisticsPartnerNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerAccountCreateWithoutLogisticsPartnerInput, Prisma.LedgerAccountUncheckedCreateWithoutLogisticsPartnerInput> | Prisma.LedgerAccountCreateWithoutLogisticsPartnerInput[] | Prisma.LedgerAccountUncheckedCreateWithoutLogisticsPartnerInput[];
    connectOrCreate?: Prisma.LedgerAccountCreateOrConnectWithoutLogisticsPartnerInput | Prisma.LedgerAccountCreateOrConnectWithoutLogisticsPartnerInput[];
    upsert?: Prisma.LedgerAccountUpsertWithWhereUniqueWithoutLogisticsPartnerInput | Prisma.LedgerAccountUpsertWithWhereUniqueWithoutLogisticsPartnerInput[];
    createMany?: Prisma.LedgerAccountCreateManyLogisticsPartnerInputEnvelope;
    set?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    disconnect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    delete?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    connect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    update?: Prisma.LedgerAccountUpdateWithWhereUniqueWithoutLogisticsPartnerInput | Prisma.LedgerAccountUpdateWithWhereUniqueWithoutLogisticsPartnerInput[];
    updateMany?: Prisma.LedgerAccountUpdateManyWithWhereWithoutLogisticsPartnerInput | Prisma.LedgerAccountUpdateManyWithWhereWithoutLogisticsPartnerInput[];
    deleteMany?: Prisma.LedgerAccountScalarWhereInput | Prisma.LedgerAccountScalarWhereInput[];
};
export type LedgerAccountUncheckedUpdateManyWithoutLogisticsPartnerNestedInput = {
    create?: Prisma.XOR<Prisma.LedgerAccountCreateWithoutLogisticsPartnerInput, Prisma.LedgerAccountUncheckedCreateWithoutLogisticsPartnerInput> | Prisma.LedgerAccountCreateWithoutLogisticsPartnerInput[] | Prisma.LedgerAccountUncheckedCreateWithoutLogisticsPartnerInput[];
    connectOrCreate?: Prisma.LedgerAccountCreateOrConnectWithoutLogisticsPartnerInput | Prisma.LedgerAccountCreateOrConnectWithoutLogisticsPartnerInput[];
    upsert?: Prisma.LedgerAccountUpsertWithWhereUniqueWithoutLogisticsPartnerInput | Prisma.LedgerAccountUpsertWithWhereUniqueWithoutLogisticsPartnerInput[];
    createMany?: Prisma.LedgerAccountCreateManyLogisticsPartnerInputEnvelope;
    set?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    disconnect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    delete?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    connect?: Prisma.LedgerAccountWhereUniqueInput | Prisma.LedgerAccountWhereUniqueInput[];
    update?: Prisma.LedgerAccountUpdateWithWhereUniqueWithoutLogisticsPartnerInput | Prisma.LedgerAccountUpdateWithWhereUniqueWithoutLogisticsPartnerInput[];
    updateMany?: Prisma.LedgerAccountUpdateManyWithWhereWithoutLogisticsPartnerInput | Prisma.LedgerAccountUpdateManyWithWhereWithoutLogisticsPartnerInput[];
    deleteMany?: Prisma.LedgerAccountScalarWhereInput | Prisma.LedgerAccountScalarWhereInput[];
};
export type LedgerAccountCreateWithoutCompanyInput = {
    id?: string;
    type: $Enums.LedgerAccountType;
    currency: $Enums.Currency;
    createdAt?: Date | string;
    logisticsPartner?: Prisma.LogisticsPartnerCreateNestedOneWithoutLedgerAccountsInput;
    entries?: Prisma.EscrowLedgerEntryCreateNestedManyWithoutAccountInput;
};
export type LedgerAccountUncheckedCreateWithoutCompanyInput = {
    id?: string;
    type: $Enums.LedgerAccountType;
    currency: $Enums.Currency;
    createdAt?: Date | string;
    logisticsPartnerId?: string | null;
    entries?: Prisma.EscrowLedgerEntryUncheckedCreateNestedManyWithoutAccountInput;
};
export type LedgerAccountCreateOrConnectWithoutCompanyInput = {
    where: Prisma.LedgerAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.LedgerAccountCreateWithoutCompanyInput, Prisma.LedgerAccountUncheckedCreateWithoutCompanyInput>;
};
export type LedgerAccountCreateManyCompanyInputEnvelope = {
    data: Prisma.LedgerAccountCreateManyCompanyInput | Prisma.LedgerAccountCreateManyCompanyInput[];
    skipDuplicates?: boolean;
};
export type LedgerAccountUpsertWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.LedgerAccountWhereUniqueInput;
    update: Prisma.XOR<Prisma.LedgerAccountUpdateWithoutCompanyInput, Prisma.LedgerAccountUncheckedUpdateWithoutCompanyInput>;
    create: Prisma.XOR<Prisma.LedgerAccountCreateWithoutCompanyInput, Prisma.LedgerAccountUncheckedCreateWithoutCompanyInput>;
};
export type LedgerAccountUpdateWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.LedgerAccountWhereUniqueInput;
    data: Prisma.XOR<Prisma.LedgerAccountUpdateWithoutCompanyInput, Prisma.LedgerAccountUncheckedUpdateWithoutCompanyInput>;
};
export type LedgerAccountUpdateManyWithWhereWithoutCompanyInput = {
    where: Prisma.LedgerAccountScalarWhereInput;
    data: Prisma.XOR<Prisma.LedgerAccountUpdateManyMutationInput, Prisma.LedgerAccountUncheckedUpdateManyWithoutCompanyInput>;
};
export type LedgerAccountScalarWhereInput = {
    AND?: Prisma.LedgerAccountScalarWhereInput | Prisma.LedgerAccountScalarWhereInput[];
    OR?: Prisma.LedgerAccountScalarWhereInput[];
    NOT?: Prisma.LedgerAccountScalarWhereInput | Prisma.LedgerAccountScalarWhereInput[];
    id?: Prisma.UuidFilter<"LedgerAccount"> | string;
    type?: Prisma.EnumLedgerAccountTypeFilter<"LedgerAccount"> | $Enums.LedgerAccountType;
    companyId?: Prisma.UuidNullableFilter<"LedgerAccount"> | string | null;
    currency?: Prisma.EnumCurrencyFilter<"LedgerAccount"> | $Enums.Currency;
    createdAt?: Prisma.DateTimeFilter<"LedgerAccount"> | Date | string;
    logisticsPartnerId?: Prisma.UuidNullableFilter<"LedgerAccount"> | string | null;
};
export type LedgerAccountCreateWithoutEntriesInput = {
    id?: string;
    type: $Enums.LedgerAccountType;
    currency: $Enums.Currency;
    createdAt?: Date | string;
    company?: Prisma.CompanyCreateNestedOneWithoutLedgerAccountsInput;
    logisticsPartner?: Prisma.LogisticsPartnerCreateNestedOneWithoutLedgerAccountsInput;
};
export type LedgerAccountUncheckedCreateWithoutEntriesInput = {
    id?: string;
    type: $Enums.LedgerAccountType;
    companyId?: string | null;
    currency: $Enums.Currency;
    createdAt?: Date | string;
    logisticsPartnerId?: string | null;
};
export type LedgerAccountCreateOrConnectWithoutEntriesInput = {
    where: Prisma.LedgerAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.LedgerAccountCreateWithoutEntriesInput, Prisma.LedgerAccountUncheckedCreateWithoutEntriesInput>;
};
export type LedgerAccountUpsertWithoutEntriesInput = {
    update: Prisma.XOR<Prisma.LedgerAccountUpdateWithoutEntriesInput, Prisma.LedgerAccountUncheckedUpdateWithoutEntriesInput>;
    create: Prisma.XOR<Prisma.LedgerAccountCreateWithoutEntriesInput, Prisma.LedgerAccountUncheckedCreateWithoutEntriesInput>;
    where?: Prisma.LedgerAccountWhereInput;
};
export type LedgerAccountUpdateToOneWithWhereWithoutEntriesInput = {
    where?: Prisma.LedgerAccountWhereInput;
    data: Prisma.XOR<Prisma.LedgerAccountUpdateWithoutEntriesInput, Prisma.LedgerAccountUncheckedUpdateWithoutEntriesInput>;
};
export type LedgerAccountUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneWithoutLedgerAccountsNestedInput;
    logisticsPartner?: Prisma.LogisticsPartnerUpdateOneWithoutLedgerAccountsNestedInput;
};
export type LedgerAccountUncheckedUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    companyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logisticsPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type LedgerAccountCreateWithoutLogisticsPartnerInput = {
    id?: string;
    type: $Enums.LedgerAccountType;
    currency: $Enums.Currency;
    createdAt?: Date | string;
    company?: Prisma.CompanyCreateNestedOneWithoutLedgerAccountsInput;
    entries?: Prisma.EscrowLedgerEntryCreateNestedManyWithoutAccountInput;
};
export type LedgerAccountUncheckedCreateWithoutLogisticsPartnerInput = {
    id?: string;
    type: $Enums.LedgerAccountType;
    companyId?: string | null;
    currency: $Enums.Currency;
    createdAt?: Date | string;
    entries?: Prisma.EscrowLedgerEntryUncheckedCreateNestedManyWithoutAccountInput;
};
export type LedgerAccountCreateOrConnectWithoutLogisticsPartnerInput = {
    where: Prisma.LedgerAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.LedgerAccountCreateWithoutLogisticsPartnerInput, Prisma.LedgerAccountUncheckedCreateWithoutLogisticsPartnerInput>;
};
export type LedgerAccountCreateManyLogisticsPartnerInputEnvelope = {
    data: Prisma.LedgerAccountCreateManyLogisticsPartnerInput | Prisma.LedgerAccountCreateManyLogisticsPartnerInput[];
    skipDuplicates?: boolean;
};
export type LedgerAccountUpsertWithWhereUniqueWithoutLogisticsPartnerInput = {
    where: Prisma.LedgerAccountWhereUniqueInput;
    update: Prisma.XOR<Prisma.LedgerAccountUpdateWithoutLogisticsPartnerInput, Prisma.LedgerAccountUncheckedUpdateWithoutLogisticsPartnerInput>;
    create: Prisma.XOR<Prisma.LedgerAccountCreateWithoutLogisticsPartnerInput, Prisma.LedgerAccountUncheckedCreateWithoutLogisticsPartnerInput>;
};
export type LedgerAccountUpdateWithWhereUniqueWithoutLogisticsPartnerInput = {
    where: Prisma.LedgerAccountWhereUniqueInput;
    data: Prisma.XOR<Prisma.LedgerAccountUpdateWithoutLogisticsPartnerInput, Prisma.LedgerAccountUncheckedUpdateWithoutLogisticsPartnerInput>;
};
export type LedgerAccountUpdateManyWithWhereWithoutLogisticsPartnerInput = {
    where: Prisma.LedgerAccountScalarWhereInput;
    data: Prisma.XOR<Prisma.LedgerAccountUpdateManyMutationInput, Prisma.LedgerAccountUncheckedUpdateManyWithoutLogisticsPartnerInput>;
};
export type LedgerAccountCreateManyCompanyInput = {
    id?: string;
    type: $Enums.LedgerAccountType;
    currency: $Enums.Currency;
    createdAt?: Date | string;
    logisticsPartnerId?: string | null;
};
export type LedgerAccountUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logisticsPartner?: Prisma.LogisticsPartnerUpdateOneWithoutLedgerAccountsNestedInput;
    entries?: Prisma.EscrowLedgerEntryUpdateManyWithoutAccountNestedInput;
};
export type LedgerAccountUncheckedUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logisticsPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entries?: Prisma.EscrowLedgerEntryUncheckedUpdateManyWithoutAccountNestedInput;
};
export type LedgerAccountUncheckedUpdateManyWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logisticsPartnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type LedgerAccountCreateManyLogisticsPartnerInput = {
    id?: string;
    type: $Enums.LedgerAccountType;
    companyId?: string | null;
    currency: $Enums.Currency;
    createdAt?: Date | string;
};
export type LedgerAccountUpdateWithoutLogisticsPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneWithoutLedgerAccountsNestedInput;
    entries?: Prisma.EscrowLedgerEntryUpdateManyWithoutAccountNestedInput;
};
export type LedgerAccountUncheckedUpdateWithoutLogisticsPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    companyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: Prisma.EscrowLedgerEntryUncheckedUpdateManyWithoutAccountNestedInput;
};
export type LedgerAccountUncheckedUpdateManyWithoutLogisticsPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLedgerAccountTypeFieldUpdateOperationsInput | $Enums.LedgerAccountType;
    companyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LedgerAccountCountOutputType = {
    entries: number;
};
export type LedgerAccountCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entries?: boolean | LedgerAccountCountOutputTypeCountEntriesArgs;
};
export type LedgerAccountCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountCountOutputTypeSelect<ExtArgs> | null;
};
export type LedgerAccountCountOutputTypeCountEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EscrowLedgerEntryWhereInput;
};
export type LedgerAccountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    companyId?: boolean;
    currency?: boolean;
    createdAt?: boolean;
    logisticsPartnerId?: boolean;
    company?: boolean | Prisma.LedgerAccount$companyArgs<ExtArgs>;
    logisticsPartner?: boolean | Prisma.LedgerAccount$logisticsPartnerArgs<ExtArgs>;
    entries?: boolean | Prisma.LedgerAccount$entriesArgs<ExtArgs>;
    _count?: boolean | Prisma.LedgerAccountCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ledgerAccount"]>;
export type LedgerAccountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    companyId?: boolean;
    currency?: boolean;
    createdAt?: boolean;
    logisticsPartnerId?: boolean;
    company?: boolean | Prisma.LedgerAccount$companyArgs<ExtArgs>;
    logisticsPartner?: boolean | Prisma.LedgerAccount$logisticsPartnerArgs<ExtArgs>;
}, ExtArgs["result"]["ledgerAccount"]>;
export type LedgerAccountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    companyId?: boolean;
    currency?: boolean;
    createdAt?: boolean;
    logisticsPartnerId?: boolean;
    company?: boolean | Prisma.LedgerAccount$companyArgs<ExtArgs>;
    logisticsPartner?: boolean | Prisma.LedgerAccount$logisticsPartnerArgs<ExtArgs>;
}, ExtArgs["result"]["ledgerAccount"]>;
export type LedgerAccountSelectScalar = {
    id?: boolean;
    type?: boolean;
    companyId?: boolean;
    currency?: boolean;
    createdAt?: boolean;
    logisticsPartnerId?: boolean;
};
export type LedgerAccountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "companyId" | "currency" | "createdAt" | "logisticsPartnerId", ExtArgs["result"]["ledgerAccount"]>;
export type LedgerAccountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.LedgerAccount$companyArgs<ExtArgs>;
    logisticsPartner?: boolean | Prisma.LedgerAccount$logisticsPartnerArgs<ExtArgs>;
    entries?: boolean | Prisma.LedgerAccount$entriesArgs<ExtArgs>;
    _count?: boolean | Prisma.LedgerAccountCountOutputTypeDefaultArgs<ExtArgs>;
};
export type LedgerAccountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.LedgerAccount$companyArgs<ExtArgs>;
    logisticsPartner?: boolean | Prisma.LedgerAccount$logisticsPartnerArgs<ExtArgs>;
};
export type LedgerAccountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.LedgerAccount$companyArgs<ExtArgs>;
    logisticsPartner?: boolean | Prisma.LedgerAccount$logisticsPartnerArgs<ExtArgs>;
};
export type $LedgerAccountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LedgerAccount";
    objects: {
        company: Prisma.$CompanyPayload<ExtArgs> | null;
        logisticsPartner: Prisma.$LogisticsPartnerPayload<ExtArgs> | null;
        entries: Prisma.$EscrowLedgerEntryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: $Enums.LedgerAccountType;
        companyId: string | null;
        currency: $Enums.Currency;
        createdAt: Date;
        logisticsPartnerId: string | null;
    }, ExtArgs["result"]["ledgerAccount"]>;
    composites: {};
};
export type LedgerAccountGetPayload<S extends boolean | null | undefined | LedgerAccountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload, S>;
export type LedgerAccountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LedgerAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LedgerAccountCountAggregateInputType | true;
};
export interface LedgerAccountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LedgerAccount'];
        meta: {
            name: 'LedgerAccount';
        };
    };
    findUnique<T extends LedgerAccountFindUniqueArgs>(args: Prisma.SelectSubset<T, LedgerAccountFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LedgerAccountClient<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LedgerAccountFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LedgerAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LedgerAccountClient<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LedgerAccountFindFirstArgs>(args?: Prisma.SelectSubset<T, LedgerAccountFindFirstArgs<ExtArgs>>): Prisma.Prisma__LedgerAccountClient<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LedgerAccountFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LedgerAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LedgerAccountClient<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LedgerAccountFindManyArgs>(args?: Prisma.SelectSubset<T, LedgerAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LedgerAccountCreateArgs>(args: Prisma.SelectSubset<T, LedgerAccountCreateArgs<ExtArgs>>): Prisma.Prisma__LedgerAccountClient<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LedgerAccountCreateManyArgs>(args?: Prisma.SelectSubset<T, LedgerAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LedgerAccountCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LedgerAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LedgerAccountDeleteArgs>(args: Prisma.SelectSubset<T, LedgerAccountDeleteArgs<ExtArgs>>): Prisma.Prisma__LedgerAccountClient<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LedgerAccountUpdateArgs>(args: Prisma.SelectSubset<T, LedgerAccountUpdateArgs<ExtArgs>>): Prisma.Prisma__LedgerAccountClient<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LedgerAccountDeleteManyArgs>(args?: Prisma.SelectSubset<T, LedgerAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LedgerAccountUpdateManyArgs>(args: Prisma.SelectSubset<T, LedgerAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LedgerAccountUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LedgerAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LedgerAccountUpsertArgs>(args: Prisma.SelectSubset<T, LedgerAccountUpsertArgs<ExtArgs>>): Prisma.Prisma__LedgerAccountClient<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LedgerAccountCountArgs>(args?: Prisma.Subset<T, LedgerAccountCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LedgerAccountCountAggregateOutputType> : number>;
    aggregate<T extends LedgerAccountAggregateArgs>(args: Prisma.Subset<T, LedgerAccountAggregateArgs>): Prisma.PrismaPromise<GetLedgerAccountAggregateType<T>>;
    groupBy<T extends LedgerAccountGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LedgerAccountGroupByArgs['orderBy'];
    } : {
        orderBy?: LedgerAccountGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LedgerAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLedgerAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LedgerAccountFieldRefs;
}
export interface Prisma__LedgerAccountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    company<T extends Prisma.LedgerAccount$companyArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LedgerAccount$companyArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    logisticsPartner<T extends Prisma.LedgerAccount$logisticsPartnerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LedgerAccount$logisticsPartnerArgs<ExtArgs>>): Prisma.Prisma__LogisticsPartnerClient<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    entries<T extends Prisma.LedgerAccount$entriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LedgerAccount$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EscrowLedgerEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LedgerAccountFieldRefs {
    readonly id: Prisma.FieldRef<"LedgerAccount", 'String'>;
    readonly type: Prisma.FieldRef<"LedgerAccount", 'LedgerAccountType'>;
    readonly companyId: Prisma.FieldRef<"LedgerAccount", 'String'>;
    readonly currency: Prisma.FieldRef<"LedgerAccount", 'Currency'>;
    readonly createdAt: Prisma.FieldRef<"LedgerAccount", 'DateTime'>;
    readonly logisticsPartnerId: Prisma.FieldRef<"LedgerAccount", 'String'>;
}
export type LedgerAccountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelect<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    include?: Prisma.LedgerAccountInclude<ExtArgs> | null;
    where: Prisma.LedgerAccountWhereUniqueInput;
};
export type LedgerAccountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelect<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    include?: Prisma.LedgerAccountInclude<ExtArgs> | null;
    where: Prisma.LedgerAccountWhereUniqueInput;
};
export type LedgerAccountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelect<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    include?: Prisma.LedgerAccountInclude<ExtArgs> | null;
    where?: Prisma.LedgerAccountWhereInput;
    orderBy?: Prisma.LedgerAccountOrderByWithRelationInput | Prisma.LedgerAccountOrderByWithRelationInput[];
    cursor?: Prisma.LedgerAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LedgerAccountScalarFieldEnum | Prisma.LedgerAccountScalarFieldEnum[];
};
export type LedgerAccountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelect<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    include?: Prisma.LedgerAccountInclude<ExtArgs> | null;
    where?: Prisma.LedgerAccountWhereInput;
    orderBy?: Prisma.LedgerAccountOrderByWithRelationInput | Prisma.LedgerAccountOrderByWithRelationInput[];
    cursor?: Prisma.LedgerAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LedgerAccountScalarFieldEnum | Prisma.LedgerAccountScalarFieldEnum[];
};
export type LedgerAccountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelect<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    include?: Prisma.LedgerAccountInclude<ExtArgs> | null;
    where?: Prisma.LedgerAccountWhereInput;
    orderBy?: Prisma.LedgerAccountOrderByWithRelationInput | Prisma.LedgerAccountOrderByWithRelationInput[];
    cursor?: Prisma.LedgerAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LedgerAccountScalarFieldEnum | Prisma.LedgerAccountScalarFieldEnum[];
};
export type LedgerAccountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelect<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    include?: Prisma.LedgerAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LedgerAccountCreateInput, Prisma.LedgerAccountUncheckedCreateInput>;
};
export type LedgerAccountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LedgerAccountCreateManyInput | Prisma.LedgerAccountCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LedgerAccountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    data: Prisma.LedgerAccountCreateManyInput | Prisma.LedgerAccountCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LedgerAccountIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LedgerAccountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelect<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    include?: Prisma.LedgerAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LedgerAccountUpdateInput, Prisma.LedgerAccountUncheckedUpdateInput>;
    where: Prisma.LedgerAccountWhereUniqueInput;
};
export type LedgerAccountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LedgerAccountUpdateManyMutationInput, Prisma.LedgerAccountUncheckedUpdateManyInput>;
    where?: Prisma.LedgerAccountWhereInput;
    limit?: number;
};
export type LedgerAccountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LedgerAccountUpdateManyMutationInput, Prisma.LedgerAccountUncheckedUpdateManyInput>;
    where?: Prisma.LedgerAccountWhereInput;
    limit?: number;
    include?: Prisma.LedgerAccountIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LedgerAccountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelect<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    include?: Prisma.LedgerAccountInclude<ExtArgs> | null;
    where: Prisma.LedgerAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.LedgerAccountCreateInput, Prisma.LedgerAccountUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LedgerAccountUpdateInput, Prisma.LedgerAccountUncheckedUpdateInput>;
};
export type LedgerAccountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelect<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    include?: Prisma.LedgerAccountInclude<ExtArgs> | null;
    where: Prisma.LedgerAccountWhereUniqueInput;
};
export type LedgerAccountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LedgerAccountWhereInput;
    limit?: number;
};
export type LedgerAccount$companyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where?: Prisma.CompanyWhereInput;
};
export type LedgerAccount$logisticsPartnerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    where?: Prisma.LogisticsPartnerWhereInput;
};
export type LedgerAccount$entriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LedgerAccountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LedgerAccountSelect<ExtArgs> | null;
    omit?: Prisma.LedgerAccountOmit<ExtArgs> | null;
    include?: Prisma.LedgerAccountInclude<ExtArgs> | null;
};
