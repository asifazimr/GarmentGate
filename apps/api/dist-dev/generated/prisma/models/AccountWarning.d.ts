import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AccountWarningModel = runtime.Types.Result.DefaultSelection<Prisma.$AccountWarningPayload>;
export type AggregateAccountWarning = {
    _count: AccountWarningCountAggregateOutputType | null;
    _avg: AccountWarningAvgAggregateOutputType | null;
    _sum: AccountWarningSumAggregateOutputType | null;
    _min: AccountWarningMinAggregateOutputType | null;
    _max: AccountWarningMaxAggregateOutputType | null;
};
export type AccountWarningAvgAggregateOutputType = {
    violations: number | null;
};
export type AccountWarningSumAggregateOutputType = {
    violations: number | null;
};
export type AccountWarningMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    level: $Enums.WarningLevel | null;
    violations: number | null;
    issuedById: string | null;
    note: string | null;
    createdAt: Date | null;
    acknowledgedAt: Date | null;
};
export type AccountWarningMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    level: $Enums.WarningLevel | null;
    violations: number | null;
    issuedById: string | null;
    note: string | null;
    createdAt: Date | null;
    acknowledgedAt: Date | null;
};
export type AccountWarningCountAggregateOutputType = {
    id: number;
    userId: number;
    level: number;
    violations: number;
    issuedById: number;
    note: number;
    createdAt: number;
    acknowledgedAt: number;
    _all: number;
};
export type AccountWarningAvgAggregateInputType = {
    violations?: true;
};
export type AccountWarningSumAggregateInputType = {
    violations?: true;
};
export type AccountWarningMinAggregateInputType = {
    id?: true;
    userId?: true;
    level?: true;
    violations?: true;
    issuedById?: true;
    note?: true;
    createdAt?: true;
    acknowledgedAt?: true;
};
export type AccountWarningMaxAggregateInputType = {
    id?: true;
    userId?: true;
    level?: true;
    violations?: true;
    issuedById?: true;
    note?: true;
    createdAt?: true;
    acknowledgedAt?: true;
};
export type AccountWarningCountAggregateInputType = {
    id?: true;
    userId?: true;
    level?: true;
    violations?: true;
    issuedById?: true;
    note?: true;
    createdAt?: true;
    acknowledgedAt?: true;
    _all?: true;
};
export type AccountWarningAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWarningWhereInput;
    orderBy?: Prisma.AccountWarningOrderByWithRelationInput | Prisma.AccountWarningOrderByWithRelationInput[];
    cursor?: Prisma.AccountWarningWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AccountWarningCountAggregateInputType;
    _avg?: AccountWarningAvgAggregateInputType;
    _sum?: AccountWarningSumAggregateInputType;
    _min?: AccountWarningMinAggregateInputType;
    _max?: AccountWarningMaxAggregateInputType;
};
export type GetAccountWarningAggregateType<T extends AccountWarningAggregateArgs> = {
    [P in keyof T & keyof AggregateAccountWarning]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAccountWarning[P]> : Prisma.GetScalarType<T[P], AggregateAccountWarning[P]>;
};
export type AccountWarningGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWarningWhereInput;
    orderBy?: Prisma.AccountWarningOrderByWithAggregationInput | Prisma.AccountWarningOrderByWithAggregationInput[];
    by: Prisma.AccountWarningScalarFieldEnum[] | Prisma.AccountWarningScalarFieldEnum;
    having?: Prisma.AccountWarningScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AccountWarningCountAggregateInputType | true;
    _avg?: AccountWarningAvgAggregateInputType;
    _sum?: AccountWarningSumAggregateInputType;
    _min?: AccountWarningMinAggregateInputType;
    _max?: AccountWarningMaxAggregateInputType;
};
export type AccountWarningGroupByOutputType = {
    id: string;
    userId: string;
    level: $Enums.WarningLevel;
    violations: number;
    issuedById: string | null;
    note: string | null;
    createdAt: Date;
    acknowledgedAt: Date | null;
    _count: AccountWarningCountAggregateOutputType | null;
    _avg: AccountWarningAvgAggregateOutputType | null;
    _sum: AccountWarningSumAggregateOutputType | null;
    _min: AccountWarningMinAggregateOutputType | null;
    _max: AccountWarningMaxAggregateOutputType | null;
};
export type GetAccountWarningGroupByPayload<T extends AccountWarningGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AccountWarningGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AccountWarningGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AccountWarningGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AccountWarningGroupByOutputType[P]>;
}>>;
export type AccountWarningWhereInput = {
    AND?: Prisma.AccountWarningWhereInput | Prisma.AccountWarningWhereInput[];
    OR?: Prisma.AccountWarningWhereInput[];
    NOT?: Prisma.AccountWarningWhereInput | Prisma.AccountWarningWhereInput[];
    id?: Prisma.UuidFilter<"AccountWarning"> | string;
    userId?: Prisma.UuidFilter<"AccountWarning"> | string;
    level?: Prisma.EnumWarningLevelFilter<"AccountWarning"> | $Enums.WarningLevel;
    violations?: Prisma.IntFilter<"AccountWarning"> | number;
    issuedById?: Prisma.UuidNullableFilter<"AccountWarning"> | string | null;
    note?: Prisma.StringNullableFilter<"AccountWarning"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AccountWarning"> | Date | string;
    acknowledgedAt?: Prisma.DateTimeNullableFilter<"AccountWarning"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    issuedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type AccountWarningOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    violations?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    acknowledgedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    issuedBy?: Prisma.UserOrderByWithRelationInput;
};
export type AccountWarningWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AccountWarningWhereInput | Prisma.AccountWarningWhereInput[];
    OR?: Prisma.AccountWarningWhereInput[];
    NOT?: Prisma.AccountWarningWhereInput | Prisma.AccountWarningWhereInput[];
    userId?: Prisma.UuidFilter<"AccountWarning"> | string;
    level?: Prisma.EnumWarningLevelFilter<"AccountWarning"> | $Enums.WarningLevel;
    violations?: Prisma.IntFilter<"AccountWarning"> | number;
    issuedById?: Prisma.UuidNullableFilter<"AccountWarning"> | string | null;
    note?: Prisma.StringNullableFilter<"AccountWarning"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AccountWarning"> | Date | string;
    acknowledgedAt?: Prisma.DateTimeNullableFilter<"AccountWarning"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    issuedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type AccountWarningOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    violations?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    acknowledgedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.AccountWarningCountOrderByAggregateInput;
    _avg?: Prisma.AccountWarningAvgOrderByAggregateInput;
    _max?: Prisma.AccountWarningMaxOrderByAggregateInput;
    _min?: Prisma.AccountWarningMinOrderByAggregateInput;
    _sum?: Prisma.AccountWarningSumOrderByAggregateInput;
};
export type AccountWarningScalarWhereWithAggregatesInput = {
    AND?: Prisma.AccountWarningScalarWhereWithAggregatesInput | Prisma.AccountWarningScalarWhereWithAggregatesInput[];
    OR?: Prisma.AccountWarningScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AccountWarningScalarWhereWithAggregatesInput | Prisma.AccountWarningScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"AccountWarning"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"AccountWarning"> | string;
    level?: Prisma.EnumWarningLevelWithAggregatesFilter<"AccountWarning"> | $Enums.WarningLevel;
    violations?: Prisma.IntWithAggregatesFilter<"AccountWarning"> | number;
    issuedById?: Prisma.UuidNullableWithAggregatesFilter<"AccountWarning"> | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"AccountWarning"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AccountWarning"> | Date | string;
    acknowledgedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"AccountWarning"> | Date | string | null;
};
export type AccountWarningCreateInput = {
    id?: string;
    level: $Enums.WarningLevel;
    violations: number;
    note?: string | null;
    createdAt?: Date | string;
    acknowledgedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutAccountWarningsInput;
    issuedBy?: Prisma.UserCreateNestedOneWithoutWarningsIssuedInput;
};
export type AccountWarningUncheckedCreateInput = {
    id?: string;
    userId: string;
    level: $Enums.WarningLevel;
    violations: number;
    issuedById?: string | null;
    note?: string | null;
    createdAt?: Date | string;
    acknowledgedAt?: Date | string | null;
};
export type AccountWarningUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumWarningLevelFieldUpdateOperationsInput | $Enums.WarningLevel;
    violations?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    acknowledgedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutAccountWarningsNestedInput;
    issuedBy?: Prisma.UserUpdateOneWithoutWarningsIssuedNestedInput;
};
export type AccountWarningUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumWarningLevelFieldUpdateOperationsInput | $Enums.WarningLevel;
    violations?: Prisma.IntFieldUpdateOperationsInput | number;
    issuedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    acknowledgedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AccountWarningCreateManyInput = {
    id?: string;
    userId: string;
    level: $Enums.WarningLevel;
    violations: number;
    issuedById?: string | null;
    note?: string | null;
    createdAt?: Date | string;
    acknowledgedAt?: Date | string | null;
};
export type AccountWarningUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumWarningLevelFieldUpdateOperationsInput | $Enums.WarningLevel;
    violations?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    acknowledgedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AccountWarningUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumWarningLevelFieldUpdateOperationsInput | $Enums.WarningLevel;
    violations?: Prisma.IntFieldUpdateOperationsInput | number;
    issuedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    acknowledgedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AccountWarningListRelationFilter = {
    every?: Prisma.AccountWarningWhereInput;
    some?: Prisma.AccountWarningWhereInput;
    none?: Prisma.AccountWarningWhereInput;
};
export type AccountWarningOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AccountWarningCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    violations?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    acknowledgedAt?: Prisma.SortOrder;
};
export type AccountWarningAvgOrderByAggregateInput = {
    violations?: Prisma.SortOrder;
};
export type AccountWarningMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    violations?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    acknowledgedAt?: Prisma.SortOrder;
};
export type AccountWarningMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    violations?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    acknowledgedAt?: Prisma.SortOrder;
};
export type AccountWarningSumOrderByAggregateInput = {
    violations?: Prisma.SortOrder;
};
export type AccountWarningCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AccountWarningCreateWithoutUserInput, Prisma.AccountWarningUncheckedCreateWithoutUserInput> | Prisma.AccountWarningCreateWithoutUserInput[] | Prisma.AccountWarningUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AccountWarningCreateOrConnectWithoutUserInput | Prisma.AccountWarningCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AccountWarningCreateManyUserInputEnvelope;
    connect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
};
export type AccountWarningCreateNestedManyWithoutIssuedByInput = {
    create?: Prisma.XOR<Prisma.AccountWarningCreateWithoutIssuedByInput, Prisma.AccountWarningUncheckedCreateWithoutIssuedByInput> | Prisma.AccountWarningCreateWithoutIssuedByInput[] | Prisma.AccountWarningUncheckedCreateWithoutIssuedByInput[];
    connectOrCreate?: Prisma.AccountWarningCreateOrConnectWithoutIssuedByInput | Prisma.AccountWarningCreateOrConnectWithoutIssuedByInput[];
    createMany?: Prisma.AccountWarningCreateManyIssuedByInputEnvelope;
    connect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
};
export type AccountWarningUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AccountWarningCreateWithoutUserInput, Prisma.AccountWarningUncheckedCreateWithoutUserInput> | Prisma.AccountWarningCreateWithoutUserInput[] | Prisma.AccountWarningUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AccountWarningCreateOrConnectWithoutUserInput | Prisma.AccountWarningCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AccountWarningCreateManyUserInputEnvelope;
    connect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
};
export type AccountWarningUncheckedCreateNestedManyWithoutIssuedByInput = {
    create?: Prisma.XOR<Prisma.AccountWarningCreateWithoutIssuedByInput, Prisma.AccountWarningUncheckedCreateWithoutIssuedByInput> | Prisma.AccountWarningCreateWithoutIssuedByInput[] | Prisma.AccountWarningUncheckedCreateWithoutIssuedByInput[];
    connectOrCreate?: Prisma.AccountWarningCreateOrConnectWithoutIssuedByInput | Prisma.AccountWarningCreateOrConnectWithoutIssuedByInput[];
    createMany?: Prisma.AccountWarningCreateManyIssuedByInputEnvelope;
    connect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
};
export type AccountWarningUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AccountWarningCreateWithoutUserInput, Prisma.AccountWarningUncheckedCreateWithoutUserInput> | Prisma.AccountWarningCreateWithoutUserInput[] | Prisma.AccountWarningUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AccountWarningCreateOrConnectWithoutUserInput | Prisma.AccountWarningCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AccountWarningUpsertWithWhereUniqueWithoutUserInput | Prisma.AccountWarningUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AccountWarningCreateManyUserInputEnvelope;
    set?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    disconnect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    delete?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    connect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    update?: Prisma.AccountWarningUpdateWithWhereUniqueWithoutUserInput | Prisma.AccountWarningUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AccountWarningUpdateManyWithWhereWithoutUserInput | Prisma.AccountWarningUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AccountWarningScalarWhereInput | Prisma.AccountWarningScalarWhereInput[];
};
export type AccountWarningUpdateManyWithoutIssuedByNestedInput = {
    create?: Prisma.XOR<Prisma.AccountWarningCreateWithoutIssuedByInput, Prisma.AccountWarningUncheckedCreateWithoutIssuedByInput> | Prisma.AccountWarningCreateWithoutIssuedByInput[] | Prisma.AccountWarningUncheckedCreateWithoutIssuedByInput[];
    connectOrCreate?: Prisma.AccountWarningCreateOrConnectWithoutIssuedByInput | Prisma.AccountWarningCreateOrConnectWithoutIssuedByInput[];
    upsert?: Prisma.AccountWarningUpsertWithWhereUniqueWithoutIssuedByInput | Prisma.AccountWarningUpsertWithWhereUniqueWithoutIssuedByInput[];
    createMany?: Prisma.AccountWarningCreateManyIssuedByInputEnvelope;
    set?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    disconnect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    delete?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    connect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    update?: Prisma.AccountWarningUpdateWithWhereUniqueWithoutIssuedByInput | Prisma.AccountWarningUpdateWithWhereUniqueWithoutIssuedByInput[];
    updateMany?: Prisma.AccountWarningUpdateManyWithWhereWithoutIssuedByInput | Prisma.AccountWarningUpdateManyWithWhereWithoutIssuedByInput[];
    deleteMany?: Prisma.AccountWarningScalarWhereInput | Prisma.AccountWarningScalarWhereInput[];
};
export type AccountWarningUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AccountWarningCreateWithoutUserInput, Prisma.AccountWarningUncheckedCreateWithoutUserInput> | Prisma.AccountWarningCreateWithoutUserInput[] | Prisma.AccountWarningUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AccountWarningCreateOrConnectWithoutUserInput | Prisma.AccountWarningCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AccountWarningUpsertWithWhereUniqueWithoutUserInput | Prisma.AccountWarningUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AccountWarningCreateManyUserInputEnvelope;
    set?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    disconnect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    delete?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    connect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    update?: Prisma.AccountWarningUpdateWithWhereUniqueWithoutUserInput | Prisma.AccountWarningUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AccountWarningUpdateManyWithWhereWithoutUserInput | Prisma.AccountWarningUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AccountWarningScalarWhereInput | Prisma.AccountWarningScalarWhereInput[];
};
export type AccountWarningUncheckedUpdateManyWithoutIssuedByNestedInput = {
    create?: Prisma.XOR<Prisma.AccountWarningCreateWithoutIssuedByInput, Prisma.AccountWarningUncheckedCreateWithoutIssuedByInput> | Prisma.AccountWarningCreateWithoutIssuedByInput[] | Prisma.AccountWarningUncheckedCreateWithoutIssuedByInput[];
    connectOrCreate?: Prisma.AccountWarningCreateOrConnectWithoutIssuedByInput | Prisma.AccountWarningCreateOrConnectWithoutIssuedByInput[];
    upsert?: Prisma.AccountWarningUpsertWithWhereUniqueWithoutIssuedByInput | Prisma.AccountWarningUpsertWithWhereUniqueWithoutIssuedByInput[];
    createMany?: Prisma.AccountWarningCreateManyIssuedByInputEnvelope;
    set?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    disconnect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    delete?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    connect?: Prisma.AccountWarningWhereUniqueInput | Prisma.AccountWarningWhereUniqueInput[];
    update?: Prisma.AccountWarningUpdateWithWhereUniqueWithoutIssuedByInput | Prisma.AccountWarningUpdateWithWhereUniqueWithoutIssuedByInput[];
    updateMany?: Prisma.AccountWarningUpdateManyWithWhereWithoutIssuedByInput | Prisma.AccountWarningUpdateManyWithWhereWithoutIssuedByInput[];
    deleteMany?: Prisma.AccountWarningScalarWhereInput | Prisma.AccountWarningScalarWhereInput[];
};
export type EnumWarningLevelFieldUpdateOperationsInput = {
    set?: $Enums.WarningLevel;
};
export type AccountWarningCreateWithoutUserInput = {
    id?: string;
    level: $Enums.WarningLevel;
    violations: number;
    note?: string | null;
    createdAt?: Date | string;
    acknowledgedAt?: Date | string | null;
    issuedBy?: Prisma.UserCreateNestedOneWithoutWarningsIssuedInput;
};
export type AccountWarningUncheckedCreateWithoutUserInput = {
    id?: string;
    level: $Enums.WarningLevel;
    violations: number;
    issuedById?: string | null;
    note?: string | null;
    createdAt?: Date | string;
    acknowledgedAt?: Date | string | null;
};
export type AccountWarningCreateOrConnectWithoutUserInput = {
    where: Prisma.AccountWarningWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountWarningCreateWithoutUserInput, Prisma.AccountWarningUncheckedCreateWithoutUserInput>;
};
export type AccountWarningCreateManyUserInputEnvelope = {
    data: Prisma.AccountWarningCreateManyUserInput | Prisma.AccountWarningCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AccountWarningCreateWithoutIssuedByInput = {
    id?: string;
    level: $Enums.WarningLevel;
    violations: number;
    note?: string | null;
    createdAt?: Date | string;
    acknowledgedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutAccountWarningsInput;
};
export type AccountWarningUncheckedCreateWithoutIssuedByInput = {
    id?: string;
    userId: string;
    level: $Enums.WarningLevel;
    violations: number;
    note?: string | null;
    createdAt?: Date | string;
    acknowledgedAt?: Date | string | null;
};
export type AccountWarningCreateOrConnectWithoutIssuedByInput = {
    where: Prisma.AccountWarningWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountWarningCreateWithoutIssuedByInput, Prisma.AccountWarningUncheckedCreateWithoutIssuedByInput>;
};
export type AccountWarningCreateManyIssuedByInputEnvelope = {
    data: Prisma.AccountWarningCreateManyIssuedByInput | Prisma.AccountWarningCreateManyIssuedByInput[];
    skipDuplicates?: boolean;
};
export type AccountWarningUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AccountWarningWhereUniqueInput;
    update: Prisma.XOR<Prisma.AccountWarningUpdateWithoutUserInput, Prisma.AccountWarningUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AccountWarningCreateWithoutUserInput, Prisma.AccountWarningUncheckedCreateWithoutUserInput>;
};
export type AccountWarningUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AccountWarningWhereUniqueInput;
    data: Prisma.XOR<Prisma.AccountWarningUpdateWithoutUserInput, Prisma.AccountWarningUncheckedUpdateWithoutUserInput>;
};
export type AccountWarningUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AccountWarningScalarWhereInput;
    data: Prisma.XOR<Prisma.AccountWarningUpdateManyMutationInput, Prisma.AccountWarningUncheckedUpdateManyWithoutUserInput>;
};
export type AccountWarningScalarWhereInput = {
    AND?: Prisma.AccountWarningScalarWhereInput | Prisma.AccountWarningScalarWhereInput[];
    OR?: Prisma.AccountWarningScalarWhereInput[];
    NOT?: Prisma.AccountWarningScalarWhereInput | Prisma.AccountWarningScalarWhereInput[];
    id?: Prisma.UuidFilter<"AccountWarning"> | string;
    userId?: Prisma.UuidFilter<"AccountWarning"> | string;
    level?: Prisma.EnumWarningLevelFilter<"AccountWarning"> | $Enums.WarningLevel;
    violations?: Prisma.IntFilter<"AccountWarning"> | number;
    issuedById?: Prisma.UuidNullableFilter<"AccountWarning"> | string | null;
    note?: Prisma.StringNullableFilter<"AccountWarning"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AccountWarning"> | Date | string;
    acknowledgedAt?: Prisma.DateTimeNullableFilter<"AccountWarning"> | Date | string | null;
};
export type AccountWarningUpsertWithWhereUniqueWithoutIssuedByInput = {
    where: Prisma.AccountWarningWhereUniqueInput;
    update: Prisma.XOR<Prisma.AccountWarningUpdateWithoutIssuedByInput, Prisma.AccountWarningUncheckedUpdateWithoutIssuedByInput>;
    create: Prisma.XOR<Prisma.AccountWarningCreateWithoutIssuedByInput, Prisma.AccountWarningUncheckedCreateWithoutIssuedByInput>;
};
export type AccountWarningUpdateWithWhereUniqueWithoutIssuedByInput = {
    where: Prisma.AccountWarningWhereUniqueInput;
    data: Prisma.XOR<Prisma.AccountWarningUpdateWithoutIssuedByInput, Prisma.AccountWarningUncheckedUpdateWithoutIssuedByInput>;
};
export type AccountWarningUpdateManyWithWhereWithoutIssuedByInput = {
    where: Prisma.AccountWarningScalarWhereInput;
    data: Prisma.XOR<Prisma.AccountWarningUpdateManyMutationInput, Prisma.AccountWarningUncheckedUpdateManyWithoutIssuedByInput>;
};
export type AccountWarningCreateManyUserInput = {
    id?: string;
    level: $Enums.WarningLevel;
    violations: number;
    issuedById?: string | null;
    note?: string | null;
    createdAt?: Date | string;
    acknowledgedAt?: Date | string | null;
};
export type AccountWarningCreateManyIssuedByInput = {
    id?: string;
    userId: string;
    level: $Enums.WarningLevel;
    violations: number;
    note?: string | null;
    createdAt?: Date | string;
    acknowledgedAt?: Date | string | null;
};
export type AccountWarningUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumWarningLevelFieldUpdateOperationsInput | $Enums.WarningLevel;
    violations?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    acknowledgedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    issuedBy?: Prisma.UserUpdateOneWithoutWarningsIssuedNestedInput;
};
export type AccountWarningUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumWarningLevelFieldUpdateOperationsInput | $Enums.WarningLevel;
    violations?: Prisma.IntFieldUpdateOperationsInput | number;
    issuedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    acknowledgedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AccountWarningUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumWarningLevelFieldUpdateOperationsInput | $Enums.WarningLevel;
    violations?: Prisma.IntFieldUpdateOperationsInput | number;
    issuedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    acknowledgedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AccountWarningUpdateWithoutIssuedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumWarningLevelFieldUpdateOperationsInput | $Enums.WarningLevel;
    violations?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    acknowledgedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutAccountWarningsNestedInput;
};
export type AccountWarningUncheckedUpdateWithoutIssuedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumWarningLevelFieldUpdateOperationsInput | $Enums.WarningLevel;
    violations?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    acknowledgedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AccountWarningUncheckedUpdateManyWithoutIssuedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.EnumWarningLevelFieldUpdateOperationsInput | $Enums.WarningLevel;
    violations?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    acknowledgedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AccountWarningSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    level?: boolean;
    violations?: boolean;
    issuedById?: boolean;
    note?: boolean;
    createdAt?: boolean;
    acknowledgedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.AccountWarning$issuedByArgs<ExtArgs>;
}, ExtArgs["result"]["accountWarning"]>;
export type AccountWarningSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    level?: boolean;
    violations?: boolean;
    issuedById?: boolean;
    note?: boolean;
    createdAt?: boolean;
    acknowledgedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.AccountWarning$issuedByArgs<ExtArgs>;
}, ExtArgs["result"]["accountWarning"]>;
export type AccountWarningSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    level?: boolean;
    violations?: boolean;
    issuedById?: boolean;
    note?: boolean;
    createdAt?: boolean;
    acknowledgedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.AccountWarning$issuedByArgs<ExtArgs>;
}, ExtArgs["result"]["accountWarning"]>;
export type AccountWarningSelectScalar = {
    id?: boolean;
    userId?: boolean;
    level?: boolean;
    violations?: boolean;
    issuedById?: boolean;
    note?: boolean;
    createdAt?: boolean;
    acknowledgedAt?: boolean;
};
export type AccountWarningOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "level" | "violations" | "issuedById" | "note" | "createdAt" | "acknowledgedAt", ExtArgs["result"]["accountWarning"]>;
export type AccountWarningInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.AccountWarning$issuedByArgs<ExtArgs>;
};
export type AccountWarningIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.AccountWarning$issuedByArgs<ExtArgs>;
};
export type AccountWarningIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.AccountWarning$issuedByArgs<ExtArgs>;
};
export type $AccountWarningPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AccountWarning";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        issuedBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        level: $Enums.WarningLevel;
        violations: number;
        issuedById: string | null;
        note: string | null;
        createdAt: Date;
        acknowledgedAt: Date | null;
    }, ExtArgs["result"]["accountWarning"]>;
    composites: {};
};
export type AccountWarningGetPayload<S extends boolean | null | undefined | AccountWarningDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload, S>;
export type AccountWarningCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AccountWarningFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AccountWarningCountAggregateInputType | true;
};
export interface AccountWarningDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AccountWarning'];
        meta: {
            name: 'AccountWarning';
        };
    };
    findUnique<T extends AccountWarningFindUniqueArgs>(args: Prisma.SelectSubset<T, AccountWarningFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AccountWarningClient<runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AccountWarningFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AccountWarningFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AccountWarningClient<runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AccountWarningFindFirstArgs>(args?: Prisma.SelectSubset<T, AccountWarningFindFirstArgs<ExtArgs>>): Prisma.Prisma__AccountWarningClient<runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AccountWarningFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AccountWarningFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AccountWarningClient<runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AccountWarningFindManyArgs>(args?: Prisma.SelectSubset<T, AccountWarningFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AccountWarningCreateArgs>(args: Prisma.SelectSubset<T, AccountWarningCreateArgs<ExtArgs>>): Prisma.Prisma__AccountWarningClient<runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AccountWarningCreateManyArgs>(args?: Prisma.SelectSubset<T, AccountWarningCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AccountWarningCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AccountWarningCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AccountWarningDeleteArgs>(args: Prisma.SelectSubset<T, AccountWarningDeleteArgs<ExtArgs>>): Prisma.Prisma__AccountWarningClient<runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AccountWarningUpdateArgs>(args: Prisma.SelectSubset<T, AccountWarningUpdateArgs<ExtArgs>>): Prisma.Prisma__AccountWarningClient<runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AccountWarningDeleteManyArgs>(args?: Prisma.SelectSubset<T, AccountWarningDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AccountWarningUpdateManyArgs>(args: Prisma.SelectSubset<T, AccountWarningUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AccountWarningUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AccountWarningUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AccountWarningUpsertArgs>(args: Prisma.SelectSubset<T, AccountWarningUpsertArgs<ExtArgs>>): Prisma.Prisma__AccountWarningClient<runtime.Types.Result.GetResult<Prisma.$AccountWarningPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AccountWarningCountArgs>(args?: Prisma.Subset<T, AccountWarningCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AccountWarningCountAggregateOutputType> : number>;
    aggregate<T extends AccountWarningAggregateArgs>(args: Prisma.Subset<T, AccountWarningAggregateArgs>): Prisma.PrismaPromise<GetAccountWarningAggregateType<T>>;
    groupBy<T extends AccountWarningGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AccountWarningGroupByArgs['orderBy'];
    } : {
        orderBy?: AccountWarningGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AccountWarningGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountWarningGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AccountWarningFieldRefs;
}
export interface Prisma__AccountWarningClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    issuedBy<T extends Prisma.AccountWarning$issuedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AccountWarning$issuedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AccountWarningFieldRefs {
    readonly id: Prisma.FieldRef<"AccountWarning", 'String'>;
    readonly userId: Prisma.FieldRef<"AccountWarning", 'String'>;
    readonly level: Prisma.FieldRef<"AccountWarning", 'WarningLevel'>;
    readonly violations: Prisma.FieldRef<"AccountWarning", 'Int'>;
    readonly issuedById: Prisma.FieldRef<"AccountWarning", 'String'>;
    readonly note: Prisma.FieldRef<"AccountWarning", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AccountWarning", 'DateTime'>;
    readonly acknowledgedAt: Prisma.FieldRef<"AccountWarning", 'DateTime'>;
}
export type AccountWarningFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelect<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    include?: Prisma.AccountWarningInclude<ExtArgs> | null;
    where: Prisma.AccountWarningWhereUniqueInput;
};
export type AccountWarningFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelect<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    include?: Prisma.AccountWarningInclude<ExtArgs> | null;
    where: Prisma.AccountWarningWhereUniqueInput;
};
export type AccountWarningFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelect<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    include?: Prisma.AccountWarningInclude<ExtArgs> | null;
    where?: Prisma.AccountWarningWhereInput;
    orderBy?: Prisma.AccountWarningOrderByWithRelationInput | Prisma.AccountWarningOrderByWithRelationInput[];
    cursor?: Prisma.AccountWarningWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AccountWarningScalarFieldEnum | Prisma.AccountWarningScalarFieldEnum[];
};
export type AccountWarningFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelect<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    include?: Prisma.AccountWarningInclude<ExtArgs> | null;
    where?: Prisma.AccountWarningWhereInput;
    orderBy?: Prisma.AccountWarningOrderByWithRelationInput | Prisma.AccountWarningOrderByWithRelationInput[];
    cursor?: Prisma.AccountWarningWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AccountWarningScalarFieldEnum | Prisma.AccountWarningScalarFieldEnum[];
};
export type AccountWarningFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelect<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    include?: Prisma.AccountWarningInclude<ExtArgs> | null;
    where?: Prisma.AccountWarningWhereInput;
    orderBy?: Prisma.AccountWarningOrderByWithRelationInput | Prisma.AccountWarningOrderByWithRelationInput[];
    cursor?: Prisma.AccountWarningWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AccountWarningScalarFieldEnum | Prisma.AccountWarningScalarFieldEnum[];
};
export type AccountWarningCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelect<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    include?: Prisma.AccountWarningInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountWarningCreateInput, Prisma.AccountWarningUncheckedCreateInput>;
};
export type AccountWarningCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AccountWarningCreateManyInput | Prisma.AccountWarningCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AccountWarningCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    data: Prisma.AccountWarningCreateManyInput | Prisma.AccountWarningCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AccountWarningIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AccountWarningUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelect<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    include?: Prisma.AccountWarningInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountWarningUpdateInput, Prisma.AccountWarningUncheckedUpdateInput>;
    where: Prisma.AccountWarningWhereUniqueInput;
};
export type AccountWarningUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AccountWarningUpdateManyMutationInput, Prisma.AccountWarningUncheckedUpdateManyInput>;
    where?: Prisma.AccountWarningWhereInput;
    limit?: number;
};
export type AccountWarningUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AccountWarningUpdateManyMutationInput, Prisma.AccountWarningUncheckedUpdateManyInput>;
    where?: Prisma.AccountWarningWhereInput;
    limit?: number;
    include?: Prisma.AccountWarningIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AccountWarningUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelect<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    include?: Prisma.AccountWarningInclude<ExtArgs> | null;
    where: Prisma.AccountWarningWhereUniqueInput;
    create: Prisma.XOR<Prisma.AccountWarningCreateInput, Prisma.AccountWarningUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AccountWarningUpdateInput, Prisma.AccountWarningUncheckedUpdateInput>;
};
export type AccountWarningDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelect<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    include?: Prisma.AccountWarningInclude<ExtArgs> | null;
    where: Prisma.AccountWarningWhereUniqueInput;
};
export type AccountWarningDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AccountWarningWhereInput;
    limit?: number;
};
export type AccountWarning$issuedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type AccountWarningDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AccountWarningSelect<ExtArgs> | null;
    omit?: Prisma.AccountWarningOmit<ExtArgs> | null;
    include?: Prisma.AccountWarningInclude<ExtArgs> | null;
};
