import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LogisticsPartnerModel = runtime.Types.Result.DefaultSelection<Prisma.$LogisticsPartnerPayload>;
export type AggregateLogisticsPartner = {
    _count: LogisticsPartnerCountAggregateOutputType | null;
    _min: LogisticsPartnerMinAggregateOutputType | null;
    _max: LogisticsPartnerMaxAggregateOutputType | null;
};
export type LogisticsPartnerMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    kind: $Enums.LogisticsPartnerKind | null;
    country: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    notes: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LogisticsPartnerMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    kind: $Enums.LogisticsPartnerKind | null;
    country: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
    notes: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LogisticsPartnerCountAggregateOutputType = {
    id: number;
    code: number;
    name: number;
    kind: number;
    country: number;
    contactEmail: number;
    contactPhone: number;
    notes: number;
    active: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LogisticsPartnerMinAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    kind?: true;
    country?: true;
    contactEmail?: true;
    contactPhone?: true;
    notes?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LogisticsPartnerMaxAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    kind?: true;
    country?: true;
    contactEmail?: true;
    contactPhone?: true;
    notes?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LogisticsPartnerCountAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    kind?: true;
    country?: true;
    contactEmail?: true;
    contactPhone?: true;
    notes?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LogisticsPartnerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsPartnerWhereInput;
    orderBy?: Prisma.LogisticsPartnerOrderByWithRelationInput | Prisma.LogisticsPartnerOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LogisticsPartnerCountAggregateInputType;
    _min?: LogisticsPartnerMinAggregateInputType;
    _max?: LogisticsPartnerMaxAggregateInputType;
};
export type GetLogisticsPartnerAggregateType<T extends LogisticsPartnerAggregateArgs> = {
    [P in keyof T & keyof AggregateLogisticsPartner]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLogisticsPartner[P]> : Prisma.GetScalarType<T[P], AggregateLogisticsPartner[P]>;
};
export type LogisticsPartnerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsPartnerWhereInput;
    orderBy?: Prisma.LogisticsPartnerOrderByWithAggregationInput | Prisma.LogisticsPartnerOrderByWithAggregationInput[];
    by: Prisma.LogisticsPartnerScalarFieldEnum[] | Prisma.LogisticsPartnerScalarFieldEnum;
    having?: Prisma.LogisticsPartnerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LogisticsPartnerCountAggregateInputType | true;
    _min?: LogisticsPartnerMinAggregateInputType;
    _max?: LogisticsPartnerMaxAggregateInputType;
};
export type LogisticsPartnerGroupByOutputType = {
    id: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail: string | null;
    contactPhone: string | null;
    notes: string | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: LogisticsPartnerCountAggregateOutputType | null;
    _min: LogisticsPartnerMinAggregateOutputType | null;
    _max: LogisticsPartnerMaxAggregateOutputType | null;
};
export type GetLogisticsPartnerGroupByPayload<T extends LogisticsPartnerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LogisticsPartnerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LogisticsPartnerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LogisticsPartnerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LogisticsPartnerGroupByOutputType[P]>;
}>>;
export type LogisticsPartnerWhereInput = {
    AND?: Prisma.LogisticsPartnerWhereInput | Prisma.LogisticsPartnerWhereInput[];
    OR?: Prisma.LogisticsPartnerWhereInput[];
    NOT?: Prisma.LogisticsPartnerWhereInput | Prisma.LogisticsPartnerWhereInput[];
    id?: Prisma.UuidFilter<"LogisticsPartner"> | string;
    code?: Prisma.StringFilter<"LogisticsPartner"> | string;
    name?: Prisma.StringFilter<"LogisticsPartner"> | string;
    kind?: Prisma.EnumLogisticsPartnerKindFilter<"LogisticsPartner"> | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFilter<"LogisticsPartner"> | string;
    contactEmail?: Prisma.StringNullableFilter<"LogisticsPartner"> | string | null;
    contactPhone?: Prisma.StringNullableFilter<"LogisticsPartner"> | string | null;
    notes?: Prisma.StringNullableFilter<"LogisticsPartner"> | string | null;
    active?: Prisma.BoolFilter<"LogisticsPartner"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"LogisticsPartner"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LogisticsPartner"> | Date | string;
    rateCards?: Prisma.RateCardListRelationFilter;
    hubs?: Prisma.HubListRelationFilter;
    pickups?: Prisma.PickupRequestListRelationFilter;
    legs?: Prisma.ShipmentLegListRelationFilter;
    users?: Prisma.UserListRelationFilter;
    ledgerAccounts?: Prisma.LedgerAccountListRelationFilter;
};
export type LogisticsPartnerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactPhone?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    rateCards?: Prisma.RateCardOrderByRelationAggregateInput;
    hubs?: Prisma.HubOrderByRelationAggregateInput;
    pickups?: Prisma.PickupRequestOrderByRelationAggregateInput;
    legs?: Prisma.ShipmentLegOrderByRelationAggregateInput;
    users?: Prisma.UserOrderByRelationAggregateInput;
    ledgerAccounts?: Prisma.LedgerAccountOrderByRelationAggregateInput;
};
export type LogisticsPartnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.LogisticsPartnerWhereInput | Prisma.LogisticsPartnerWhereInput[];
    OR?: Prisma.LogisticsPartnerWhereInput[];
    NOT?: Prisma.LogisticsPartnerWhereInput | Prisma.LogisticsPartnerWhereInput[];
    name?: Prisma.StringFilter<"LogisticsPartner"> | string;
    kind?: Prisma.EnumLogisticsPartnerKindFilter<"LogisticsPartner"> | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFilter<"LogisticsPartner"> | string;
    contactEmail?: Prisma.StringNullableFilter<"LogisticsPartner"> | string | null;
    contactPhone?: Prisma.StringNullableFilter<"LogisticsPartner"> | string | null;
    notes?: Prisma.StringNullableFilter<"LogisticsPartner"> | string | null;
    active?: Prisma.BoolFilter<"LogisticsPartner"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"LogisticsPartner"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LogisticsPartner"> | Date | string;
    rateCards?: Prisma.RateCardListRelationFilter;
    hubs?: Prisma.HubListRelationFilter;
    pickups?: Prisma.PickupRequestListRelationFilter;
    legs?: Prisma.ShipmentLegListRelationFilter;
    users?: Prisma.UserListRelationFilter;
    ledgerAccounts?: Prisma.LedgerAccountListRelationFilter;
}, "id" | "code">;
export type LogisticsPartnerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    contactPhone?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LogisticsPartnerCountOrderByAggregateInput;
    _max?: Prisma.LogisticsPartnerMaxOrderByAggregateInput;
    _min?: Prisma.LogisticsPartnerMinOrderByAggregateInput;
};
export type LogisticsPartnerScalarWhereWithAggregatesInput = {
    AND?: Prisma.LogisticsPartnerScalarWhereWithAggregatesInput | Prisma.LogisticsPartnerScalarWhereWithAggregatesInput[];
    OR?: Prisma.LogisticsPartnerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LogisticsPartnerScalarWhereWithAggregatesInput | Prisma.LogisticsPartnerScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"LogisticsPartner"> | string;
    code?: Prisma.StringWithAggregatesFilter<"LogisticsPartner"> | string;
    name?: Prisma.StringWithAggregatesFilter<"LogisticsPartner"> | string;
    kind?: Prisma.EnumLogisticsPartnerKindWithAggregatesFilter<"LogisticsPartner"> | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringWithAggregatesFilter<"LogisticsPartner"> | string;
    contactEmail?: Prisma.StringNullableWithAggregatesFilter<"LogisticsPartner"> | string | null;
    contactPhone?: Prisma.StringNullableWithAggregatesFilter<"LogisticsPartner"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"LogisticsPartner"> | string | null;
    active?: Prisma.BoolWithAggregatesFilter<"LogisticsPartner"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"LogisticsPartner"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"LogisticsPartner"> | Date | string;
};
export type LogisticsPartnerCreateInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardCreateNestedManyWithoutPartnerInput;
    hubs?: Prisma.HubCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserCreateNestedManyWithoutLogisticsPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerUncheckedCreateInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardUncheckedCreateNestedManyWithoutPartnerInput;
    hubs?: Prisma.HubUncheckedCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestUncheckedCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegUncheckedCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUpdateManyWithoutPartnerNestedInput;
    hubs?: Prisma.HubUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUpdateManyWithoutLogisticsPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUncheckedUpdateManyWithoutPartnerNestedInput;
    hubs?: Prisma.HubUncheckedUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUncheckedUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUncheckedUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerCreateManyInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LogisticsPartnerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsPartnerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsPartnerNullableScalarRelationFilter = {
    is?: Prisma.LogisticsPartnerWhereInput | null;
    isNot?: Prisma.LogisticsPartnerWhereInput | null;
};
export type LogisticsPartnerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LogisticsPartnerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LogisticsPartnerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    contactEmail?: Prisma.SortOrder;
    contactPhone?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LogisticsPartnerScalarRelationFilter = {
    is?: Prisma.LogisticsPartnerWhereInput;
    isNot?: Prisma.LogisticsPartnerWhereInput;
};
export type LogisticsPartnerCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutUsersInput, Prisma.LogisticsPartnerUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutUsersInput;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
};
export type LogisticsPartnerUpdateOneWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutUsersInput, Prisma.LogisticsPartnerUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.LogisticsPartnerUpsertWithoutUsersInput;
    disconnect?: Prisma.LogisticsPartnerWhereInput | boolean;
    delete?: Prisma.LogisticsPartnerWhereInput | boolean;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LogisticsPartnerUpdateToOneWithWhereWithoutUsersInput, Prisma.LogisticsPartnerUpdateWithoutUsersInput>, Prisma.LogisticsPartnerUncheckedUpdateWithoutUsersInput>;
};
export type LogisticsPartnerCreateNestedOneWithoutLedgerAccountsInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutLedgerAccountsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutLedgerAccountsInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutLedgerAccountsInput;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
};
export type LogisticsPartnerUpdateOneWithoutLedgerAccountsNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutLedgerAccountsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutLedgerAccountsInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutLedgerAccountsInput;
    upsert?: Prisma.LogisticsPartnerUpsertWithoutLedgerAccountsInput;
    disconnect?: Prisma.LogisticsPartnerWhereInput | boolean;
    delete?: Prisma.LogisticsPartnerWhereInput | boolean;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LogisticsPartnerUpdateToOneWithWhereWithoutLedgerAccountsInput, Prisma.LogisticsPartnerUpdateWithoutLedgerAccountsInput>, Prisma.LogisticsPartnerUncheckedUpdateWithoutLedgerAccountsInput>;
};
export type EnumLogisticsPartnerKindFieldUpdateOperationsInput = {
    set?: $Enums.LogisticsPartnerKind;
};
export type LogisticsPartnerCreateNestedOneWithoutHubsInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutHubsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutHubsInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutHubsInput;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
};
export type LogisticsPartnerUpdateOneWithoutHubsNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutHubsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutHubsInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutHubsInput;
    upsert?: Prisma.LogisticsPartnerUpsertWithoutHubsInput;
    disconnect?: Prisma.LogisticsPartnerWhereInput | boolean;
    delete?: Prisma.LogisticsPartnerWhereInput | boolean;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LogisticsPartnerUpdateToOneWithWhereWithoutHubsInput, Prisma.LogisticsPartnerUpdateWithoutHubsInput>, Prisma.LogisticsPartnerUncheckedUpdateWithoutHubsInput>;
};
export type LogisticsPartnerCreateNestedOneWithoutRateCardsInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutRateCardsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutRateCardsInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutRateCardsInput;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
};
export type LogisticsPartnerUpdateOneRequiredWithoutRateCardsNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutRateCardsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutRateCardsInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutRateCardsInput;
    upsert?: Prisma.LogisticsPartnerUpsertWithoutRateCardsInput;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LogisticsPartnerUpdateToOneWithWhereWithoutRateCardsInput, Prisma.LogisticsPartnerUpdateWithoutRateCardsInput>, Prisma.LogisticsPartnerUncheckedUpdateWithoutRateCardsInput>;
};
export type LogisticsPartnerCreateNestedOneWithoutPickupsInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutPickupsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutPickupsInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutPickupsInput;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
};
export type LogisticsPartnerUpdateOneWithoutPickupsNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutPickupsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutPickupsInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutPickupsInput;
    upsert?: Prisma.LogisticsPartnerUpsertWithoutPickupsInput;
    disconnect?: Prisma.LogisticsPartnerWhereInput | boolean;
    delete?: Prisma.LogisticsPartnerWhereInput | boolean;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LogisticsPartnerUpdateToOneWithWhereWithoutPickupsInput, Prisma.LogisticsPartnerUpdateWithoutPickupsInput>, Prisma.LogisticsPartnerUncheckedUpdateWithoutPickupsInput>;
};
export type LogisticsPartnerCreateNestedOneWithoutLegsInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutLegsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutLegsInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutLegsInput;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
};
export type LogisticsPartnerUpdateOneWithoutLegsNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutLegsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutLegsInput>;
    connectOrCreate?: Prisma.LogisticsPartnerCreateOrConnectWithoutLegsInput;
    upsert?: Prisma.LogisticsPartnerUpsertWithoutLegsInput;
    disconnect?: Prisma.LogisticsPartnerWhereInput | boolean;
    delete?: Prisma.LogisticsPartnerWhereInput | boolean;
    connect?: Prisma.LogisticsPartnerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LogisticsPartnerUpdateToOneWithWhereWithoutLegsInput, Prisma.LogisticsPartnerUpdateWithoutLegsInput>, Prisma.LogisticsPartnerUncheckedUpdateWithoutLegsInput>;
};
export type LogisticsPartnerCreateWithoutUsersInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardCreateNestedManyWithoutPartnerInput;
    hubs?: Prisma.HubCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegCreateNestedManyWithoutPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerUncheckedCreateWithoutUsersInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardUncheckedCreateNestedManyWithoutPartnerInput;
    hubs?: Prisma.HubUncheckedCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestUncheckedCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegUncheckedCreateNestedManyWithoutPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerCreateOrConnectWithoutUsersInput = {
    where: Prisma.LogisticsPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutUsersInput, Prisma.LogisticsPartnerUncheckedCreateWithoutUsersInput>;
};
export type LogisticsPartnerUpsertWithoutUsersInput = {
    update: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutUsersInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutUsersInput, Prisma.LogisticsPartnerUncheckedCreateWithoutUsersInput>;
    where?: Prisma.LogisticsPartnerWhereInput;
};
export type LogisticsPartnerUpdateToOneWithWhereWithoutUsersInput = {
    where?: Prisma.LogisticsPartnerWhereInput;
    data: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutUsersInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutUsersInput>;
};
export type LogisticsPartnerUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUpdateManyWithoutPartnerNestedInput;
    hubs?: Prisma.HubUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUpdateManyWithoutPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUncheckedUpdateManyWithoutPartnerNestedInput;
    hubs?: Prisma.HubUncheckedUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUncheckedUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUncheckedUpdateManyWithoutPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerCreateWithoutLedgerAccountsInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardCreateNestedManyWithoutPartnerInput;
    hubs?: Prisma.HubCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerUncheckedCreateWithoutLedgerAccountsInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardUncheckedCreateNestedManyWithoutPartnerInput;
    hubs?: Prisma.HubUncheckedCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestUncheckedCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegUncheckedCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerCreateOrConnectWithoutLedgerAccountsInput = {
    where: Prisma.LogisticsPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutLedgerAccountsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutLedgerAccountsInput>;
};
export type LogisticsPartnerUpsertWithoutLedgerAccountsInput = {
    update: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutLedgerAccountsInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutLedgerAccountsInput>;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutLedgerAccountsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutLedgerAccountsInput>;
    where?: Prisma.LogisticsPartnerWhereInput;
};
export type LogisticsPartnerUpdateToOneWithWhereWithoutLedgerAccountsInput = {
    where?: Prisma.LogisticsPartnerWhereInput;
    data: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutLedgerAccountsInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutLedgerAccountsInput>;
};
export type LogisticsPartnerUpdateWithoutLedgerAccountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUpdateManyWithoutPartnerNestedInput;
    hubs?: Prisma.HubUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerUncheckedUpdateWithoutLedgerAccountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUncheckedUpdateManyWithoutPartnerNestedInput;
    hubs?: Prisma.HubUncheckedUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUncheckedUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUncheckedUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerCreateWithoutHubsInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserCreateNestedManyWithoutLogisticsPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerUncheckedCreateWithoutHubsInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardUncheckedCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestUncheckedCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegUncheckedCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerCreateOrConnectWithoutHubsInput = {
    where: Prisma.LogisticsPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutHubsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutHubsInput>;
};
export type LogisticsPartnerUpsertWithoutHubsInput = {
    update: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutHubsInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutHubsInput>;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutHubsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutHubsInput>;
    where?: Prisma.LogisticsPartnerWhereInput;
};
export type LogisticsPartnerUpdateToOneWithWhereWithoutHubsInput = {
    where?: Prisma.LogisticsPartnerWhereInput;
    data: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutHubsInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutHubsInput>;
};
export type LogisticsPartnerUpdateWithoutHubsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUpdateManyWithoutLogisticsPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerUncheckedUpdateWithoutHubsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUncheckedUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUncheckedUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUncheckedUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerCreateWithoutRateCardsInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    hubs?: Prisma.HubCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserCreateNestedManyWithoutLogisticsPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerUncheckedCreateWithoutRateCardsInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    hubs?: Prisma.HubUncheckedCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestUncheckedCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegUncheckedCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerCreateOrConnectWithoutRateCardsInput = {
    where: Prisma.LogisticsPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutRateCardsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutRateCardsInput>;
};
export type LogisticsPartnerUpsertWithoutRateCardsInput = {
    update: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutRateCardsInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutRateCardsInput>;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutRateCardsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutRateCardsInput>;
    where?: Prisma.LogisticsPartnerWhereInput;
};
export type LogisticsPartnerUpdateToOneWithWhereWithoutRateCardsInput = {
    where?: Prisma.LogisticsPartnerWhereInput;
    data: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutRateCardsInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutRateCardsInput>;
};
export type LogisticsPartnerUpdateWithoutRateCardsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hubs?: Prisma.HubUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUpdateManyWithoutLogisticsPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerUncheckedUpdateWithoutRateCardsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hubs?: Prisma.HubUncheckedUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUncheckedUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUncheckedUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerCreateWithoutPickupsInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardCreateNestedManyWithoutPartnerInput;
    hubs?: Prisma.HubCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserCreateNestedManyWithoutLogisticsPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerUncheckedCreateWithoutPickupsInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardUncheckedCreateNestedManyWithoutPartnerInput;
    hubs?: Prisma.HubUncheckedCreateNestedManyWithoutPartnerInput;
    legs?: Prisma.ShipmentLegUncheckedCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerCreateOrConnectWithoutPickupsInput = {
    where: Prisma.LogisticsPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutPickupsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutPickupsInput>;
};
export type LogisticsPartnerUpsertWithoutPickupsInput = {
    update: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutPickupsInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutPickupsInput>;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutPickupsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutPickupsInput>;
    where?: Prisma.LogisticsPartnerWhereInput;
};
export type LogisticsPartnerUpdateToOneWithWhereWithoutPickupsInput = {
    where?: Prisma.LogisticsPartnerWhereInput;
    data: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutPickupsInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutPickupsInput>;
};
export type LogisticsPartnerUpdateWithoutPickupsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUpdateManyWithoutPartnerNestedInput;
    hubs?: Prisma.HubUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUpdateManyWithoutLogisticsPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerUncheckedUpdateWithoutPickupsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUncheckedUpdateManyWithoutPartnerNestedInput;
    hubs?: Prisma.HubUncheckedUpdateManyWithoutPartnerNestedInput;
    legs?: Prisma.ShipmentLegUncheckedUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerCreateWithoutLegsInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardCreateNestedManyWithoutPartnerInput;
    hubs?: Prisma.HubCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserCreateNestedManyWithoutLogisticsPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerUncheckedCreateWithoutLegsInput = {
    id?: string;
    code: string;
    name: string;
    kind: $Enums.LogisticsPartnerKind;
    country: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    notes?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rateCards?: Prisma.RateCardUncheckedCreateNestedManyWithoutPartnerInput;
    hubs?: Prisma.HubUncheckedCreateNestedManyWithoutPartnerInput;
    pickups?: Prisma.PickupRequestUncheckedCreateNestedManyWithoutPartnerInput;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedCreateNestedManyWithoutLogisticsPartnerInput;
};
export type LogisticsPartnerCreateOrConnectWithoutLegsInput = {
    where: Prisma.LogisticsPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutLegsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutLegsInput>;
};
export type LogisticsPartnerUpsertWithoutLegsInput = {
    update: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutLegsInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutLegsInput>;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateWithoutLegsInput, Prisma.LogisticsPartnerUncheckedCreateWithoutLegsInput>;
    where?: Prisma.LogisticsPartnerWhereInput;
};
export type LogisticsPartnerUpdateToOneWithWhereWithoutLegsInput = {
    where?: Prisma.LogisticsPartnerWhereInput;
    data: Prisma.XOR<Prisma.LogisticsPartnerUpdateWithoutLegsInput, Prisma.LogisticsPartnerUncheckedUpdateWithoutLegsInput>;
};
export type LogisticsPartnerUpdateWithoutLegsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUpdateManyWithoutPartnerNestedInput;
    hubs?: Prisma.HubUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUpdateManyWithoutLogisticsPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerUncheckedUpdateWithoutLegsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumLogisticsPartnerKindFieldUpdateOperationsInput | $Enums.LogisticsPartnerKind;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    contactEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contactPhone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateCards?: Prisma.RateCardUncheckedUpdateManyWithoutPartnerNestedInput;
    hubs?: Prisma.HubUncheckedUpdateManyWithoutPartnerNestedInput;
    pickups?: Prisma.PickupRequestUncheckedUpdateManyWithoutPartnerNestedInput;
    users?: Prisma.UserUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
    ledgerAccounts?: Prisma.LedgerAccountUncheckedUpdateManyWithoutLogisticsPartnerNestedInput;
};
export type LogisticsPartnerCountOutputType = {
    rateCards: number;
    hubs: number;
    pickups: number;
    legs: number;
    users: number;
    ledgerAccounts: number;
};
export type LogisticsPartnerCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    rateCards?: boolean | LogisticsPartnerCountOutputTypeCountRateCardsArgs;
    hubs?: boolean | LogisticsPartnerCountOutputTypeCountHubsArgs;
    pickups?: boolean | LogisticsPartnerCountOutputTypeCountPickupsArgs;
    legs?: boolean | LogisticsPartnerCountOutputTypeCountLegsArgs;
    users?: boolean | LogisticsPartnerCountOutputTypeCountUsersArgs;
    ledgerAccounts?: boolean | LogisticsPartnerCountOutputTypeCountLedgerAccountsArgs;
};
export type LogisticsPartnerCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerCountOutputTypeSelect<ExtArgs> | null;
};
export type LogisticsPartnerCountOutputTypeCountRateCardsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RateCardWhereInput;
};
export type LogisticsPartnerCountOutputTypeCountHubsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubWhereInput;
};
export type LogisticsPartnerCountOutputTypeCountPickupsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PickupRequestWhereInput;
};
export type LogisticsPartnerCountOutputTypeCountLegsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShipmentLegWhereInput;
};
export type LogisticsPartnerCountOutputTypeCountUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
export type LogisticsPartnerCountOutputTypeCountLedgerAccountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LedgerAccountWhereInput;
};
export type LogisticsPartnerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    kind?: boolean;
    country?: boolean;
    contactEmail?: boolean;
    contactPhone?: boolean;
    notes?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    rateCards?: boolean | Prisma.LogisticsPartner$rateCardsArgs<ExtArgs>;
    hubs?: boolean | Prisma.LogisticsPartner$hubsArgs<ExtArgs>;
    pickups?: boolean | Prisma.LogisticsPartner$pickupsArgs<ExtArgs>;
    legs?: boolean | Prisma.LogisticsPartner$legsArgs<ExtArgs>;
    users?: boolean | Prisma.LogisticsPartner$usersArgs<ExtArgs>;
    ledgerAccounts?: boolean | Prisma.LogisticsPartner$ledgerAccountsArgs<ExtArgs>;
    _count?: boolean | Prisma.LogisticsPartnerCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["logisticsPartner"]>;
export type LogisticsPartnerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    kind?: boolean;
    country?: boolean;
    contactEmail?: boolean;
    contactPhone?: boolean;
    notes?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["logisticsPartner"]>;
export type LogisticsPartnerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    kind?: boolean;
    country?: boolean;
    contactEmail?: boolean;
    contactPhone?: boolean;
    notes?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["logisticsPartner"]>;
export type LogisticsPartnerSelectScalar = {
    id?: boolean;
    code?: boolean;
    name?: boolean;
    kind?: boolean;
    country?: boolean;
    contactEmail?: boolean;
    contactPhone?: boolean;
    notes?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LogisticsPartnerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "name" | "kind" | "country" | "contactEmail" | "contactPhone" | "notes" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["logisticsPartner"]>;
export type LogisticsPartnerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    rateCards?: boolean | Prisma.LogisticsPartner$rateCardsArgs<ExtArgs>;
    hubs?: boolean | Prisma.LogisticsPartner$hubsArgs<ExtArgs>;
    pickups?: boolean | Prisma.LogisticsPartner$pickupsArgs<ExtArgs>;
    legs?: boolean | Prisma.LogisticsPartner$legsArgs<ExtArgs>;
    users?: boolean | Prisma.LogisticsPartner$usersArgs<ExtArgs>;
    ledgerAccounts?: boolean | Prisma.LogisticsPartner$ledgerAccountsArgs<ExtArgs>;
    _count?: boolean | Prisma.LogisticsPartnerCountOutputTypeDefaultArgs<ExtArgs>;
};
export type LogisticsPartnerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type LogisticsPartnerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $LogisticsPartnerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LogisticsPartner";
    objects: {
        rateCards: Prisma.$RateCardPayload<ExtArgs>[];
        hubs: Prisma.$HubPayload<ExtArgs>[];
        pickups: Prisma.$PickupRequestPayload<ExtArgs>[];
        legs: Prisma.$ShipmentLegPayload<ExtArgs>[];
        users: Prisma.$UserPayload<ExtArgs>[];
        ledgerAccounts: Prisma.$LedgerAccountPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        name: string;
        kind: $Enums.LogisticsPartnerKind;
        country: string;
        contactEmail: string | null;
        contactPhone: string | null;
        notes: string | null;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["logisticsPartner"]>;
    composites: {};
};
export type LogisticsPartnerGetPayload<S extends boolean | null | undefined | LogisticsPartnerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload, S>;
export type LogisticsPartnerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LogisticsPartnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LogisticsPartnerCountAggregateInputType | true;
};
export interface LogisticsPartnerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LogisticsPartner'];
        meta: {
            name: 'LogisticsPartner';
        };
    };
    findUnique<T extends LogisticsPartnerFindUniqueArgs>(args: Prisma.SelectSubset<T, LogisticsPartnerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LogisticsPartnerClient<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LogisticsPartnerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LogisticsPartnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LogisticsPartnerClient<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LogisticsPartnerFindFirstArgs>(args?: Prisma.SelectSubset<T, LogisticsPartnerFindFirstArgs<ExtArgs>>): Prisma.Prisma__LogisticsPartnerClient<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LogisticsPartnerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LogisticsPartnerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LogisticsPartnerClient<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LogisticsPartnerFindManyArgs>(args?: Prisma.SelectSubset<T, LogisticsPartnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LogisticsPartnerCreateArgs>(args: Prisma.SelectSubset<T, LogisticsPartnerCreateArgs<ExtArgs>>): Prisma.Prisma__LogisticsPartnerClient<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LogisticsPartnerCreateManyArgs>(args?: Prisma.SelectSubset<T, LogisticsPartnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LogisticsPartnerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LogisticsPartnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LogisticsPartnerDeleteArgs>(args: Prisma.SelectSubset<T, LogisticsPartnerDeleteArgs<ExtArgs>>): Prisma.Prisma__LogisticsPartnerClient<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LogisticsPartnerUpdateArgs>(args: Prisma.SelectSubset<T, LogisticsPartnerUpdateArgs<ExtArgs>>): Prisma.Prisma__LogisticsPartnerClient<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LogisticsPartnerDeleteManyArgs>(args?: Prisma.SelectSubset<T, LogisticsPartnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LogisticsPartnerUpdateManyArgs>(args: Prisma.SelectSubset<T, LogisticsPartnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LogisticsPartnerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LogisticsPartnerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LogisticsPartnerUpsertArgs>(args: Prisma.SelectSubset<T, LogisticsPartnerUpsertArgs<ExtArgs>>): Prisma.Prisma__LogisticsPartnerClient<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LogisticsPartnerCountArgs>(args?: Prisma.Subset<T, LogisticsPartnerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LogisticsPartnerCountAggregateOutputType> : number>;
    aggregate<T extends LogisticsPartnerAggregateArgs>(args: Prisma.Subset<T, LogisticsPartnerAggregateArgs>): Prisma.PrismaPromise<GetLogisticsPartnerAggregateType<T>>;
    groupBy<T extends LogisticsPartnerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LogisticsPartnerGroupByArgs['orderBy'];
    } : {
        orderBy?: LogisticsPartnerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LogisticsPartnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogisticsPartnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LogisticsPartnerFieldRefs;
}
export interface Prisma__LogisticsPartnerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    rateCards<T extends Prisma.LogisticsPartner$rateCardsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LogisticsPartner$rateCardsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RateCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    hubs<T extends Prisma.LogisticsPartner$hubsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LogisticsPartner$hubsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pickups<T extends Prisma.LogisticsPartner$pickupsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LogisticsPartner$pickupsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    legs<T extends Prisma.LogisticsPartner$legsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LogisticsPartner$legsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShipmentLegPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    users<T extends Prisma.LogisticsPartner$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LogisticsPartner$usersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    ledgerAccounts<T extends Prisma.LogisticsPartner$ledgerAccountsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LogisticsPartner$ledgerAccountsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LedgerAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LogisticsPartnerFieldRefs {
    readonly id: Prisma.FieldRef<"LogisticsPartner", 'String'>;
    readonly code: Prisma.FieldRef<"LogisticsPartner", 'String'>;
    readonly name: Prisma.FieldRef<"LogisticsPartner", 'String'>;
    readonly kind: Prisma.FieldRef<"LogisticsPartner", 'LogisticsPartnerKind'>;
    readonly country: Prisma.FieldRef<"LogisticsPartner", 'String'>;
    readonly contactEmail: Prisma.FieldRef<"LogisticsPartner", 'String'>;
    readonly contactPhone: Prisma.FieldRef<"LogisticsPartner", 'String'>;
    readonly notes: Prisma.FieldRef<"LogisticsPartner", 'String'>;
    readonly active: Prisma.FieldRef<"LogisticsPartner", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"LogisticsPartner", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"LogisticsPartner", 'DateTime'>;
}
export type LogisticsPartnerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    where: Prisma.LogisticsPartnerWhereUniqueInput;
};
export type LogisticsPartnerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    where: Prisma.LogisticsPartnerWhereUniqueInput;
};
export type LogisticsPartnerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    where?: Prisma.LogisticsPartnerWhereInput;
    orderBy?: Prisma.LogisticsPartnerOrderByWithRelationInput | Prisma.LogisticsPartnerOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsPartnerScalarFieldEnum | Prisma.LogisticsPartnerScalarFieldEnum[];
};
export type LogisticsPartnerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    where?: Prisma.LogisticsPartnerWhereInput;
    orderBy?: Prisma.LogisticsPartnerOrderByWithRelationInput | Prisma.LogisticsPartnerOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsPartnerScalarFieldEnum | Prisma.LogisticsPartnerScalarFieldEnum[];
};
export type LogisticsPartnerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    where?: Prisma.LogisticsPartnerWhereInput;
    orderBy?: Prisma.LogisticsPartnerOrderByWithRelationInput | Prisma.LogisticsPartnerOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsPartnerScalarFieldEnum | Prisma.LogisticsPartnerScalarFieldEnum[];
};
export type LogisticsPartnerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsPartnerCreateInput, Prisma.LogisticsPartnerUncheckedCreateInput>;
};
export type LogisticsPartnerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LogisticsPartnerCreateManyInput | Prisma.LogisticsPartnerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LogisticsPartnerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    data: Prisma.LogisticsPartnerCreateManyInput | Prisma.LogisticsPartnerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LogisticsPartnerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsPartnerUpdateInput, Prisma.LogisticsPartnerUncheckedUpdateInput>;
    where: Prisma.LogisticsPartnerWhereUniqueInput;
};
export type LogisticsPartnerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LogisticsPartnerUpdateManyMutationInput, Prisma.LogisticsPartnerUncheckedUpdateManyInput>;
    where?: Prisma.LogisticsPartnerWhereInput;
    limit?: number;
};
export type LogisticsPartnerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsPartnerUpdateManyMutationInput, Prisma.LogisticsPartnerUncheckedUpdateManyInput>;
    where?: Prisma.LogisticsPartnerWhereInput;
    limit?: number;
};
export type LogisticsPartnerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    where: Prisma.LogisticsPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsPartnerCreateInput, Prisma.LogisticsPartnerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LogisticsPartnerUpdateInput, Prisma.LogisticsPartnerUncheckedUpdateInput>;
};
export type LogisticsPartnerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    where: Prisma.LogisticsPartnerWhereUniqueInput;
};
export type LogisticsPartnerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsPartnerWhereInput;
    limit?: number;
};
export type LogisticsPartner$rateCardsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateCardSelect<ExtArgs> | null;
    omit?: Prisma.RateCardOmit<ExtArgs> | null;
    include?: Prisma.RateCardInclude<ExtArgs> | null;
    where?: Prisma.RateCardWhereInput;
    orderBy?: Prisma.RateCardOrderByWithRelationInput | Prisma.RateCardOrderByWithRelationInput[];
    cursor?: Prisma.RateCardWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RateCardScalarFieldEnum | Prisma.RateCardScalarFieldEnum[];
};
export type LogisticsPartner$hubsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelect<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    include?: Prisma.HubInclude<ExtArgs> | null;
    where?: Prisma.HubWhereInput;
    orderBy?: Prisma.HubOrderByWithRelationInput | Prisma.HubOrderByWithRelationInput[];
    cursor?: Prisma.HubWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HubScalarFieldEnum | Prisma.HubScalarFieldEnum[];
};
export type LogisticsPartner$pickupsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    where?: Prisma.PickupRequestWhereInput;
    orderBy?: Prisma.PickupRequestOrderByWithRelationInput | Prisma.PickupRequestOrderByWithRelationInput[];
    cursor?: Prisma.PickupRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PickupRequestScalarFieldEnum | Prisma.PickupRequestScalarFieldEnum[];
};
export type LogisticsPartner$legsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLegSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLegOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLegInclude<ExtArgs> | null;
    where?: Prisma.ShipmentLegWhereInput;
    orderBy?: Prisma.ShipmentLegOrderByWithRelationInput | Prisma.ShipmentLegOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentLegWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShipmentLegScalarFieldEnum | Prisma.ShipmentLegScalarFieldEnum[];
};
export type LogisticsPartner$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type LogisticsPartner$ledgerAccountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LogisticsPartnerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
};
