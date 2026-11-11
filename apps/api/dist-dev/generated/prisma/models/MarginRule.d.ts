import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MarginRuleModel = runtime.Types.Result.DefaultSelection<Prisma.$MarginRulePayload>;
export type AggregateMarginRule = {
    _count: MarginRuleCountAggregateOutputType | null;
    _avg: MarginRuleAvgAggregateOutputType | null;
    _sum: MarginRuleSumAggregateOutputType | null;
    _min: MarginRuleMinAggregateOutputType | null;
    _max: MarginRuleMaxAggregateOutputType | null;
};
export type MarginRuleAvgAggregateOutputType = {
    markupBps: number | null;
    minMarginPerUnitMinor: number | null;
    commissionBps: number | null;
    repeatCommissionBps: number | null;
};
export type MarginRuleSumAggregateOutputType = {
    markupBps: number | null;
    minMarginPerUnitMinor: number | null;
    commissionBps: number | null;
    repeatCommissionBps: number | null;
};
export type MarginRuleMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    markupBps: number | null;
    minMarginPerUnitMinor: number | null;
    commissionBps: number | null;
    repeatCommissionBps: number | null;
    categoryId: string | null;
    companyId: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MarginRuleMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    markupBps: number | null;
    minMarginPerUnitMinor: number | null;
    commissionBps: number | null;
    repeatCommissionBps: number | null;
    categoryId: string | null;
    companyId: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MarginRuleCountAggregateOutputType = {
    id: number;
    name: number;
    markupBps: number;
    minMarginPerUnitMinor: number;
    commissionBps: number;
    repeatCommissionBps: number;
    categoryId: number;
    companyId: number;
    active: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MarginRuleAvgAggregateInputType = {
    markupBps?: true;
    minMarginPerUnitMinor?: true;
    commissionBps?: true;
    repeatCommissionBps?: true;
};
export type MarginRuleSumAggregateInputType = {
    markupBps?: true;
    minMarginPerUnitMinor?: true;
    commissionBps?: true;
    repeatCommissionBps?: true;
};
export type MarginRuleMinAggregateInputType = {
    id?: true;
    name?: true;
    markupBps?: true;
    minMarginPerUnitMinor?: true;
    commissionBps?: true;
    repeatCommissionBps?: true;
    categoryId?: true;
    companyId?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MarginRuleMaxAggregateInputType = {
    id?: true;
    name?: true;
    markupBps?: true;
    minMarginPerUnitMinor?: true;
    commissionBps?: true;
    repeatCommissionBps?: true;
    categoryId?: true;
    companyId?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MarginRuleCountAggregateInputType = {
    id?: true;
    name?: true;
    markupBps?: true;
    minMarginPerUnitMinor?: true;
    commissionBps?: true;
    repeatCommissionBps?: true;
    categoryId?: true;
    companyId?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MarginRuleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MarginRuleWhereInput;
    orderBy?: Prisma.MarginRuleOrderByWithRelationInput | Prisma.MarginRuleOrderByWithRelationInput[];
    cursor?: Prisma.MarginRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MarginRuleCountAggregateInputType;
    _avg?: MarginRuleAvgAggregateInputType;
    _sum?: MarginRuleSumAggregateInputType;
    _min?: MarginRuleMinAggregateInputType;
    _max?: MarginRuleMaxAggregateInputType;
};
export type GetMarginRuleAggregateType<T extends MarginRuleAggregateArgs> = {
    [P in keyof T & keyof AggregateMarginRule]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMarginRule[P]> : Prisma.GetScalarType<T[P], AggregateMarginRule[P]>;
};
export type MarginRuleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MarginRuleWhereInput;
    orderBy?: Prisma.MarginRuleOrderByWithAggregationInput | Prisma.MarginRuleOrderByWithAggregationInput[];
    by: Prisma.MarginRuleScalarFieldEnum[] | Prisma.MarginRuleScalarFieldEnum;
    having?: Prisma.MarginRuleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MarginRuleCountAggregateInputType | true;
    _avg?: MarginRuleAvgAggregateInputType;
    _sum?: MarginRuleSumAggregateInputType;
    _min?: MarginRuleMinAggregateInputType;
    _max?: MarginRuleMaxAggregateInputType;
};
export type MarginRuleGroupByOutputType = {
    id: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor: number | null;
    commissionBps: number;
    repeatCommissionBps: number | null;
    categoryId: string | null;
    companyId: string | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: MarginRuleCountAggregateOutputType | null;
    _avg: MarginRuleAvgAggregateOutputType | null;
    _sum: MarginRuleSumAggregateOutputType | null;
    _min: MarginRuleMinAggregateOutputType | null;
    _max: MarginRuleMaxAggregateOutputType | null;
};
export type GetMarginRuleGroupByPayload<T extends MarginRuleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MarginRuleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MarginRuleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MarginRuleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MarginRuleGroupByOutputType[P]>;
}>>;
export type MarginRuleWhereInput = {
    AND?: Prisma.MarginRuleWhereInput | Prisma.MarginRuleWhereInput[];
    OR?: Prisma.MarginRuleWhereInput[];
    NOT?: Prisma.MarginRuleWhereInput | Prisma.MarginRuleWhereInput[];
    id?: Prisma.UuidFilter<"MarginRule"> | string;
    name?: Prisma.StringFilter<"MarginRule"> | string;
    markupBps?: Prisma.IntFilter<"MarginRule"> | number;
    minMarginPerUnitMinor?: Prisma.IntNullableFilter<"MarginRule"> | number | null;
    commissionBps?: Prisma.IntFilter<"MarginRule"> | number;
    repeatCommissionBps?: Prisma.IntNullableFilter<"MarginRule"> | number | null;
    categoryId?: Prisma.UuidNullableFilter<"MarginRule"> | string | null;
    companyId?: Prisma.UuidNullableFilter<"MarginRule"> | string | null;
    active?: Prisma.BoolFilter<"MarginRule"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"MarginRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MarginRule"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
    company?: Prisma.XOR<Prisma.CompanyNullableScalarRelationFilter, Prisma.CompanyWhereInput> | null;
    quotes?: Prisma.QuoteListRelationFilter;
};
export type MarginRuleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    markupBps?: Prisma.SortOrder;
    minMarginPerUnitMinor?: Prisma.SortOrderInput | Prisma.SortOrder;
    commissionBps?: Prisma.SortOrder;
    repeatCommissionBps?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    companyId?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    category?: Prisma.CategoryOrderByWithRelationInput;
    company?: Prisma.CompanyOrderByWithRelationInput;
    quotes?: Prisma.QuoteOrderByRelationAggregateInput;
};
export type MarginRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MarginRuleWhereInput | Prisma.MarginRuleWhereInput[];
    OR?: Prisma.MarginRuleWhereInput[];
    NOT?: Prisma.MarginRuleWhereInput | Prisma.MarginRuleWhereInput[];
    name?: Prisma.StringFilter<"MarginRule"> | string;
    markupBps?: Prisma.IntFilter<"MarginRule"> | number;
    minMarginPerUnitMinor?: Prisma.IntNullableFilter<"MarginRule"> | number | null;
    commissionBps?: Prisma.IntFilter<"MarginRule"> | number;
    repeatCommissionBps?: Prisma.IntNullableFilter<"MarginRule"> | number | null;
    categoryId?: Prisma.UuidNullableFilter<"MarginRule"> | string | null;
    companyId?: Prisma.UuidNullableFilter<"MarginRule"> | string | null;
    active?: Prisma.BoolFilter<"MarginRule"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"MarginRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MarginRule"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
    company?: Prisma.XOR<Prisma.CompanyNullableScalarRelationFilter, Prisma.CompanyWhereInput> | null;
    quotes?: Prisma.QuoteListRelationFilter;
}, "id">;
export type MarginRuleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    markupBps?: Prisma.SortOrder;
    minMarginPerUnitMinor?: Prisma.SortOrderInput | Prisma.SortOrder;
    commissionBps?: Prisma.SortOrder;
    repeatCommissionBps?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    companyId?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MarginRuleCountOrderByAggregateInput;
    _avg?: Prisma.MarginRuleAvgOrderByAggregateInput;
    _max?: Prisma.MarginRuleMaxOrderByAggregateInput;
    _min?: Prisma.MarginRuleMinOrderByAggregateInput;
    _sum?: Prisma.MarginRuleSumOrderByAggregateInput;
};
export type MarginRuleScalarWhereWithAggregatesInput = {
    AND?: Prisma.MarginRuleScalarWhereWithAggregatesInput | Prisma.MarginRuleScalarWhereWithAggregatesInput[];
    OR?: Prisma.MarginRuleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MarginRuleScalarWhereWithAggregatesInput | Prisma.MarginRuleScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MarginRule"> | string;
    name?: Prisma.StringWithAggregatesFilter<"MarginRule"> | string;
    markupBps?: Prisma.IntWithAggregatesFilter<"MarginRule"> | number;
    minMarginPerUnitMinor?: Prisma.IntNullableWithAggregatesFilter<"MarginRule"> | number | null;
    commissionBps?: Prisma.IntWithAggregatesFilter<"MarginRule"> | number;
    repeatCommissionBps?: Prisma.IntNullableWithAggregatesFilter<"MarginRule"> | number | null;
    categoryId?: Prisma.UuidNullableWithAggregatesFilter<"MarginRule"> | string | null;
    companyId?: Prisma.UuidNullableWithAggregatesFilter<"MarginRule"> | string | null;
    active?: Prisma.BoolWithAggregatesFilter<"MarginRule"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MarginRule"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MarginRule"> | Date | string;
};
export type MarginRuleCreateInput = {
    id?: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor?: number | null;
    commissionBps?: number;
    repeatCommissionBps?: number | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category?: Prisma.CategoryCreateNestedOneWithoutMarginRulesInput;
    company?: Prisma.CompanyCreateNestedOneWithoutMarginRulesInput;
    quotes?: Prisma.QuoteCreateNestedManyWithoutMarginRuleInput;
};
export type MarginRuleUncheckedCreateInput = {
    id?: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor?: number | null;
    commissionBps?: number;
    repeatCommissionBps?: number | null;
    categoryId?: string | null;
    companyId?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    quotes?: Prisma.QuoteUncheckedCreateNestedManyWithoutMarginRuleInput;
};
export type MarginRuleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneWithoutMarginRulesNestedInput;
    company?: Prisma.CompanyUpdateOneWithoutMarginRulesNestedInput;
    quotes?: Prisma.QuoteUpdateManyWithoutMarginRuleNestedInput;
};
export type MarginRuleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    companyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quotes?: Prisma.QuoteUncheckedUpdateManyWithoutMarginRuleNestedInput;
};
export type MarginRuleCreateManyInput = {
    id?: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor?: number | null;
    commissionBps?: number;
    repeatCommissionBps?: number | null;
    categoryId?: string | null;
    companyId?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MarginRuleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarginRuleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    companyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarginRuleListRelationFilter = {
    every?: Prisma.MarginRuleWhereInput;
    some?: Prisma.MarginRuleWhereInput;
    none?: Prisma.MarginRuleWhereInput;
};
export type MarginRuleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MarginRuleNullableScalarRelationFilter = {
    is?: Prisma.MarginRuleWhereInput | null;
    isNot?: Prisma.MarginRuleWhereInput | null;
};
export type MarginRuleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    markupBps?: Prisma.SortOrder;
    minMarginPerUnitMinor?: Prisma.SortOrder;
    commissionBps?: Prisma.SortOrder;
    repeatCommissionBps?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MarginRuleAvgOrderByAggregateInput = {
    markupBps?: Prisma.SortOrder;
    minMarginPerUnitMinor?: Prisma.SortOrder;
    commissionBps?: Prisma.SortOrder;
    repeatCommissionBps?: Prisma.SortOrder;
};
export type MarginRuleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    markupBps?: Prisma.SortOrder;
    minMarginPerUnitMinor?: Prisma.SortOrder;
    commissionBps?: Prisma.SortOrder;
    repeatCommissionBps?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MarginRuleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    markupBps?: Prisma.SortOrder;
    minMarginPerUnitMinor?: Prisma.SortOrder;
    commissionBps?: Prisma.SortOrder;
    repeatCommissionBps?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MarginRuleSumOrderByAggregateInput = {
    markupBps?: Prisma.SortOrder;
    minMarginPerUnitMinor?: Prisma.SortOrder;
    commissionBps?: Prisma.SortOrder;
    repeatCommissionBps?: Prisma.SortOrder;
};
export type MarginRuleCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.MarginRuleCreateWithoutCompanyInput, Prisma.MarginRuleUncheckedCreateWithoutCompanyInput> | Prisma.MarginRuleCreateWithoutCompanyInput[] | Prisma.MarginRuleUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.MarginRuleCreateOrConnectWithoutCompanyInput | Prisma.MarginRuleCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.MarginRuleCreateManyCompanyInputEnvelope;
    connect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
};
export type MarginRuleUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.MarginRuleCreateWithoutCompanyInput, Prisma.MarginRuleUncheckedCreateWithoutCompanyInput> | Prisma.MarginRuleCreateWithoutCompanyInput[] | Prisma.MarginRuleUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.MarginRuleCreateOrConnectWithoutCompanyInput | Prisma.MarginRuleCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.MarginRuleCreateManyCompanyInputEnvelope;
    connect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
};
export type MarginRuleUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.MarginRuleCreateWithoutCompanyInput, Prisma.MarginRuleUncheckedCreateWithoutCompanyInput> | Prisma.MarginRuleCreateWithoutCompanyInput[] | Prisma.MarginRuleUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.MarginRuleCreateOrConnectWithoutCompanyInput | Prisma.MarginRuleCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.MarginRuleUpsertWithWhereUniqueWithoutCompanyInput | Prisma.MarginRuleUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.MarginRuleCreateManyCompanyInputEnvelope;
    set?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    disconnect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    delete?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    connect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    update?: Prisma.MarginRuleUpdateWithWhereUniqueWithoutCompanyInput | Prisma.MarginRuleUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.MarginRuleUpdateManyWithWhereWithoutCompanyInput | Prisma.MarginRuleUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.MarginRuleScalarWhereInput | Prisma.MarginRuleScalarWhereInput[];
};
export type MarginRuleUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.MarginRuleCreateWithoutCompanyInput, Prisma.MarginRuleUncheckedCreateWithoutCompanyInput> | Prisma.MarginRuleCreateWithoutCompanyInput[] | Prisma.MarginRuleUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.MarginRuleCreateOrConnectWithoutCompanyInput | Prisma.MarginRuleCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.MarginRuleUpsertWithWhereUniqueWithoutCompanyInput | Prisma.MarginRuleUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.MarginRuleCreateManyCompanyInputEnvelope;
    set?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    disconnect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    delete?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    connect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    update?: Prisma.MarginRuleUpdateWithWhereUniqueWithoutCompanyInput | Prisma.MarginRuleUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.MarginRuleUpdateManyWithWhereWithoutCompanyInput | Prisma.MarginRuleUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.MarginRuleScalarWhereInput | Prisma.MarginRuleScalarWhereInput[];
};
export type MarginRuleCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.MarginRuleCreateWithoutCategoryInput, Prisma.MarginRuleUncheckedCreateWithoutCategoryInput> | Prisma.MarginRuleCreateWithoutCategoryInput[] | Prisma.MarginRuleUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MarginRuleCreateOrConnectWithoutCategoryInput | Prisma.MarginRuleCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.MarginRuleCreateManyCategoryInputEnvelope;
    connect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
};
export type MarginRuleUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.MarginRuleCreateWithoutCategoryInput, Prisma.MarginRuleUncheckedCreateWithoutCategoryInput> | Prisma.MarginRuleCreateWithoutCategoryInput[] | Prisma.MarginRuleUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MarginRuleCreateOrConnectWithoutCategoryInput | Prisma.MarginRuleCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.MarginRuleCreateManyCategoryInputEnvelope;
    connect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
};
export type MarginRuleUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.MarginRuleCreateWithoutCategoryInput, Prisma.MarginRuleUncheckedCreateWithoutCategoryInput> | Prisma.MarginRuleCreateWithoutCategoryInput[] | Prisma.MarginRuleUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MarginRuleCreateOrConnectWithoutCategoryInput | Prisma.MarginRuleCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.MarginRuleUpsertWithWhereUniqueWithoutCategoryInput | Prisma.MarginRuleUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.MarginRuleCreateManyCategoryInputEnvelope;
    set?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    disconnect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    delete?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    connect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    update?: Prisma.MarginRuleUpdateWithWhereUniqueWithoutCategoryInput | Prisma.MarginRuleUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.MarginRuleUpdateManyWithWhereWithoutCategoryInput | Prisma.MarginRuleUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.MarginRuleScalarWhereInput | Prisma.MarginRuleScalarWhereInput[];
};
export type MarginRuleUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.MarginRuleCreateWithoutCategoryInput, Prisma.MarginRuleUncheckedCreateWithoutCategoryInput> | Prisma.MarginRuleCreateWithoutCategoryInput[] | Prisma.MarginRuleUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MarginRuleCreateOrConnectWithoutCategoryInput | Prisma.MarginRuleCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.MarginRuleUpsertWithWhereUniqueWithoutCategoryInput | Prisma.MarginRuleUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.MarginRuleCreateManyCategoryInputEnvelope;
    set?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    disconnect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    delete?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    connect?: Prisma.MarginRuleWhereUniqueInput | Prisma.MarginRuleWhereUniqueInput[];
    update?: Prisma.MarginRuleUpdateWithWhereUniqueWithoutCategoryInput | Prisma.MarginRuleUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.MarginRuleUpdateManyWithWhereWithoutCategoryInput | Prisma.MarginRuleUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.MarginRuleScalarWhereInput | Prisma.MarginRuleScalarWhereInput[];
};
export type MarginRuleCreateNestedOneWithoutQuotesInput = {
    create?: Prisma.XOR<Prisma.MarginRuleCreateWithoutQuotesInput, Prisma.MarginRuleUncheckedCreateWithoutQuotesInput>;
    connectOrCreate?: Prisma.MarginRuleCreateOrConnectWithoutQuotesInput;
    connect?: Prisma.MarginRuleWhereUniqueInput;
};
export type MarginRuleUpdateOneWithoutQuotesNestedInput = {
    create?: Prisma.XOR<Prisma.MarginRuleCreateWithoutQuotesInput, Prisma.MarginRuleUncheckedCreateWithoutQuotesInput>;
    connectOrCreate?: Prisma.MarginRuleCreateOrConnectWithoutQuotesInput;
    upsert?: Prisma.MarginRuleUpsertWithoutQuotesInput;
    disconnect?: Prisma.MarginRuleWhereInput | boolean;
    delete?: Prisma.MarginRuleWhereInput | boolean;
    connect?: Prisma.MarginRuleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MarginRuleUpdateToOneWithWhereWithoutQuotesInput, Prisma.MarginRuleUpdateWithoutQuotesInput>, Prisma.MarginRuleUncheckedUpdateWithoutQuotesInput>;
};
export type MarginRuleCreateWithoutCompanyInput = {
    id?: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor?: number | null;
    commissionBps?: number;
    repeatCommissionBps?: number | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category?: Prisma.CategoryCreateNestedOneWithoutMarginRulesInput;
    quotes?: Prisma.QuoteCreateNestedManyWithoutMarginRuleInput;
};
export type MarginRuleUncheckedCreateWithoutCompanyInput = {
    id?: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor?: number | null;
    commissionBps?: number;
    repeatCommissionBps?: number | null;
    categoryId?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    quotes?: Prisma.QuoteUncheckedCreateNestedManyWithoutMarginRuleInput;
};
export type MarginRuleCreateOrConnectWithoutCompanyInput = {
    where: Prisma.MarginRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.MarginRuleCreateWithoutCompanyInput, Prisma.MarginRuleUncheckedCreateWithoutCompanyInput>;
};
export type MarginRuleCreateManyCompanyInputEnvelope = {
    data: Prisma.MarginRuleCreateManyCompanyInput | Prisma.MarginRuleCreateManyCompanyInput[];
    skipDuplicates?: boolean;
};
export type MarginRuleUpsertWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.MarginRuleWhereUniqueInput;
    update: Prisma.XOR<Prisma.MarginRuleUpdateWithoutCompanyInput, Prisma.MarginRuleUncheckedUpdateWithoutCompanyInput>;
    create: Prisma.XOR<Prisma.MarginRuleCreateWithoutCompanyInput, Prisma.MarginRuleUncheckedCreateWithoutCompanyInput>;
};
export type MarginRuleUpdateWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.MarginRuleWhereUniqueInput;
    data: Prisma.XOR<Prisma.MarginRuleUpdateWithoutCompanyInput, Prisma.MarginRuleUncheckedUpdateWithoutCompanyInput>;
};
export type MarginRuleUpdateManyWithWhereWithoutCompanyInput = {
    where: Prisma.MarginRuleScalarWhereInput;
    data: Prisma.XOR<Prisma.MarginRuleUpdateManyMutationInput, Prisma.MarginRuleUncheckedUpdateManyWithoutCompanyInput>;
};
export type MarginRuleScalarWhereInput = {
    AND?: Prisma.MarginRuleScalarWhereInput | Prisma.MarginRuleScalarWhereInput[];
    OR?: Prisma.MarginRuleScalarWhereInput[];
    NOT?: Prisma.MarginRuleScalarWhereInput | Prisma.MarginRuleScalarWhereInput[];
    id?: Prisma.UuidFilter<"MarginRule"> | string;
    name?: Prisma.StringFilter<"MarginRule"> | string;
    markupBps?: Prisma.IntFilter<"MarginRule"> | number;
    minMarginPerUnitMinor?: Prisma.IntNullableFilter<"MarginRule"> | number | null;
    commissionBps?: Prisma.IntFilter<"MarginRule"> | number;
    repeatCommissionBps?: Prisma.IntNullableFilter<"MarginRule"> | number | null;
    categoryId?: Prisma.UuidNullableFilter<"MarginRule"> | string | null;
    companyId?: Prisma.UuidNullableFilter<"MarginRule"> | string | null;
    active?: Prisma.BoolFilter<"MarginRule"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"MarginRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MarginRule"> | Date | string;
};
export type MarginRuleCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor?: number | null;
    commissionBps?: number;
    repeatCommissionBps?: number | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company?: Prisma.CompanyCreateNestedOneWithoutMarginRulesInput;
    quotes?: Prisma.QuoteCreateNestedManyWithoutMarginRuleInput;
};
export type MarginRuleUncheckedCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor?: number | null;
    commissionBps?: number;
    repeatCommissionBps?: number | null;
    companyId?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    quotes?: Prisma.QuoteUncheckedCreateNestedManyWithoutMarginRuleInput;
};
export type MarginRuleCreateOrConnectWithoutCategoryInput = {
    where: Prisma.MarginRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.MarginRuleCreateWithoutCategoryInput, Prisma.MarginRuleUncheckedCreateWithoutCategoryInput>;
};
export type MarginRuleCreateManyCategoryInputEnvelope = {
    data: Prisma.MarginRuleCreateManyCategoryInput | Prisma.MarginRuleCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type MarginRuleUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.MarginRuleWhereUniqueInput;
    update: Prisma.XOR<Prisma.MarginRuleUpdateWithoutCategoryInput, Prisma.MarginRuleUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.MarginRuleCreateWithoutCategoryInput, Prisma.MarginRuleUncheckedCreateWithoutCategoryInput>;
};
export type MarginRuleUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.MarginRuleWhereUniqueInput;
    data: Prisma.XOR<Prisma.MarginRuleUpdateWithoutCategoryInput, Prisma.MarginRuleUncheckedUpdateWithoutCategoryInput>;
};
export type MarginRuleUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.MarginRuleScalarWhereInput;
    data: Prisma.XOR<Prisma.MarginRuleUpdateManyMutationInput, Prisma.MarginRuleUncheckedUpdateManyWithoutCategoryInput>;
};
export type MarginRuleCreateWithoutQuotesInput = {
    id?: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor?: number | null;
    commissionBps?: number;
    repeatCommissionBps?: number | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category?: Prisma.CategoryCreateNestedOneWithoutMarginRulesInput;
    company?: Prisma.CompanyCreateNestedOneWithoutMarginRulesInput;
};
export type MarginRuleUncheckedCreateWithoutQuotesInput = {
    id?: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor?: number | null;
    commissionBps?: number;
    repeatCommissionBps?: number | null;
    categoryId?: string | null;
    companyId?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MarginRuleCreateOrConnectWithoutQuotesInput = {
    where: Prisma.MarginRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.MarginRuleCreateWithoutQuotesInput, Prisma.MarginRuleUncheckedCreateWithoutQuotesInput>;
};
export type MarginRuleUpsertWithoutQuotesInput = {
    update: Prisma.XOR<Prisma.MarginRuleUpdateWithoutQuotesInput, Prisma.MarginRuleUncheckedUpdateWithoutQuotesInput>;
    create: Prisma.XOR<Prisma.MarginRuleCreateWithoutQuotesInput, Prisma.MarginRuleUncheckedCreateWithoutQuotesInput>;
    where?: Prisma.MarginRuleWhereInput;
};
export type MarginRuleUpdateToOneWithWhereWithoutQuotesInput = {
    where?: Prisma.MarginRuleWhereInput;
    data: Prisma.XOR<Prisma.MarginRuleUpdateWithoutQuotesInput, Prisma.MarginRuleUncheckedUpdateWithoutQuotesInput>;
};
export type MarginRuleUpdateWithoutQuotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneWithoutMarginRulesNestedInput;
    company?: Prisma.CompanyUpdateOneWithoutMarginRulesNestedInput;
};
export type MarginRuleUncheckedUpdateWithoutQuotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    companyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarginRuleCreateManyCompanyInput = {
    id?: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor?: number | null;
    commissionBps?: number;
    repeatCommissionBps?: number | null;
    categoryId?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MarginRuleUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneWithoutMarginRulesNestedInput;
    quotes?: Prisma.QuoteUpdateManyWithoutMarginRuleNestedInput;
};
export type MarginRuleUncheckedUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quotes?: Prisma.QuoteUncheckedUpdateManyWithoutMarginRuleNestedInput;
};
export type MarginRuleUncheckedUpdateManyWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarginRuleCreateManyCategoryInput = {
    id?: string;
    name: string;
    markupBps: number;
    minMarginPerUnitMinor?: number | null;
    commissionBps?: number;
    repeatCommissionBps?: number | null;
    companyId?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MarginRuleUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneWithoutMarginRulesNestedInput;
    quotes?: Prisma.QuoteUpdateManyWithoutMarginRuleNestedInput;
};
export type MarginRuleUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    companyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quotes?: Prisma.QuoteUncheckedUpdateManyWithoutMarginRuleNestedInput;
};
export type MarginRuleUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginPerUnitMinor?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    commissionBps?: Prisma.IntFieldUpdateOperationsInput | number;
    repeatCommissionBps?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    companyId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MarginRuleCountOutputType = {
    quotes: number;
};
export type MarginRuleCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quotes?: boolean | MarginRuleCountOutputTypeCountQuotesArgs;
};
export type MarginRuleCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleCountOutputTypeSelect<ExtArgs> | null;
};
export type MarginRuleCountOutputTypeCountQuotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuoteWhereInput;
};
export type MarginRuleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    markupBps?: boolean;
    minMarginPerUnitMinor?: boolean;
    commissionBps?: boolean;
    repeatCommissionBps?: boolean;
    categoryId?: boolean;
    companyId?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.MarginRule$categoryArgs<ExtArgs>;
    company?: boolean | Prisma.MarginRule$companyArgs<ExtArgs>;
    quotes?: boolean | Prisma.MarginRule$quotesArgs<ExtArgs>;
    _count?: boolean | Prisma.MarginRuleCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["marginRule"]>;
export type MarginRuleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    markupBps?: boolean;
    minMarginPerUnitMinor?: boolean;
    commissionBps?: boolean;
    repeatCommissionBps?: boolean;
    categoryId?: boolean;
    companyId?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.MarginRule$categoryArgs<ExtArgs>;
    company?: boolean | Prisma.MarginRule$companyArgs<ExtArgs>;
}, ExtArgs["result"]["marginRule"]>;
export type MarginRuleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    markupBps?: boolean;
    minMarginPerUnitMinor?: boolean;
    commissionBps?: boolean;
    repeatCommissionBps?: boolean;
    categoryId?: boolean;
    companyId?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.MarginRule$categoryArgs<ExtArgs>;
    company?: boolean | Prisma.MarginRule$companyArgs<ExtArgs>;
}, ExtArgs["result"]["marginRule"]>;
export type MarginRuleSelectScalar = {
    id?: boolean;
    name?: boolean;
    markupBps?: boolean;
    minMarginPerUnitMinor?: boolean;
    commissionBps?: boolean;
    repeatCommissionBps?: boolean;
    categoryId?: boolean;
    companyId?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MarginRuleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "markupBps" | "minMarginPerUnitMinor" | "commissionBps" | "repeatCommissionBps" | "categoryId" | "companyId" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["marginRule"]>;
export type MarginRuleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.MarginRule$categoryArgs<ExtArgs>;
    company?: boolean | Prisma.MarginRule$companyArgs<ExtArgs>;
    quotes?: boolean | Prisma.MarginRule$quotesArgs<ExtArgs>;
    _count?: boolean | Prisma.MarginRuleCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MarginRuleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.MarginRule$categoryArgs<ExtArgs>;
    company?: boolean | Prisma.MarginRule$companyArgs<ExtArgs>;
};
export type MarginRuleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.MarginRule$categoryArgs<ExtArgs>;
    company?: boolean | Prisma.MarginRule$companyArgs<ExtArgs>;
};
export type $MarginRulePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MarginRule";
    objects: {
        category: Prisma.$CategoryPayload<ExtArgs> | null;
        company: Prisma.$CompanyPayload<ExtArgs> | null;
        quotes: Prisma.$QuotePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        markupBps: number;
        minMarginPerUnitMinor: number | null;
        commissionBps: number;
        repeatCommissionBps: number | null;
        categoryId: string | null;
        companyId: string | null;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["marginRule"]>;
    composites: {};
};
export type MarginRuleGetPayload<S extends boolean | null | undefined | MarginRuleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MarginRulePayload, S>;
export type MarginRuleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MarginRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MarginRuleCountAggregateInputType | true;
};
export interface MarginRuleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MarginRule'];
        meta: {
            name: 'MarginRule';
        };
    };
    findUnique<T extends MarginRuleFindUniqueArgs>(args: Prisma.SelectSubset<T, MarginRuleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MarginRuleClient<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MarginRuleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MarginRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MarginRuleClient<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MarginRuleFindFirstArgs>(args?: Prisma.SelectSubset<T, MarginRuleFindFirstArgs<ExtArgs>>): Prisma.Prisma__MarginRuleClient<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MarginRuleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MarginRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MarginRuleClient<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MarginRuleFindManyArgs>(args?: Prisma.SelectSubset<T, MarginRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MarginRuleCreateArgs>(args: Prisma.SelectSubset<T, MarginRuleCreateArgs<ExtArgs>>): Prisma.Prisma__MarginRuleClient<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MarginRuleCreateManyArgs>(args?: Prisma.SelectSubset<T, MarginRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MarginRuleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MarginRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MarginRuleDeleteArgs>(args: Prisma.SelectSubset<T, MarginRuleDeleteArgs<ExtArgs>>): Prisma.Prisma__MarginRuleClient<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MarginRuleUpdateArgs>(args: Prisma.SelectSubset<T, MarginRuleUpdateArgs<ExtArgs>>): Prisma.Prisma__MarginRuleClient<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MarginRuleDeleteManyArgs>(args?: Prisma.SelectSubset<T, MarginRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MarginRuleUpdateManyArgs>(args: Prisma.SelectSubset<T, MarginRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MarginRuleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MarginRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MarginRuleUpsertArgs>(args: Prisma.SelectSubset<T, MarginRuleUpsertArgs<ExtArgs>>): Prisma.Prisma__MarginRuleClient<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MarginRuleCountArgs>(args?: Prisma.Subset<T, MarginRuleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MarginRuleCountAggregateOutputType> : number>;
    aggregate<T extends MarginRuleAggregateArgs>(args: Prisma.Subset<T, MarginRuleAggregateArgs>): Prisma.PrismaPromise<GetMarginRuleAggregateType<T>>;
    groupBy<T extends MarginRuleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MarginRuleGroupByArgs['orderBy'];
    } : {
        orderBy?: MarginRuleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MarginRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarginRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MarginRuleFieldRefs;
}
export interface Prisma__MarginRuleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    category<T extends Prisma.MarginRule$categoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MarginRule$categoryArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    company<T extends Prisma.MarginRule$companyArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MarginRule$companyArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    quotes<T extends Prisma.MarginRule$quotesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MarginRule$quotesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MarginRuleFieldRefs {
    readonly id: Prisma.FieldRef<"MarginRule", 'String'>;
    readonly name: Prisma.FieldRef<"MarginRule", 'String'>;
    readonly markupBps: Prisma.FieldRef<"MarginRule", 'Int'>;
    readonly minMarginPerUnitMinor: Prisma.FieldRef<"MarginRule", 'Int'>;
    readonly commissionBps: Prisma.FieldRef<"MarginRule", 'Int'>;
    readonly repeatCommissionBps: Prisma.FieldRef<"MarginRule", 'Int'>;
    readonly categoryId: Prisma.FieldRef<"MarginRule", 'String'>;
    readonly companyId: Prisma.FieldRef<"MarginRule", 'String'>;
    readonly active: Prisma.FieldRef<"MarginRule", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"MarginRule", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MarginRule", 'DateTime'>;
}
export type MarginRuleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    include?: Prisma.MarginRuleInclude<ExtArgs> | null;
    where: Prisma.MarginRuleWhereUniqueInput;
};
export type MarginRuleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    include?: Prisma.MarginRuleInclude<ExtArgs> | null;
    where: Prisma.MarginRuleWhereUniqueInput;
};
export type MarginRuleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    include?: Prisma.MarginRuleInclude<ExtArgs> | null;
    where?: Prisma.MarginRuleWhereInput;
    orderBy?: Prisma.MarginRuleOrderByWithRelationInput | Prisma.MarginRuleOrderByWithRelationInput[];
    cursor?: Prisma.MarginRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MarginRuleScalarFieldEnum | Prisma.MarginRuleScalarFieldEnum[];
};
export type MarginRuleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    include?: Prisma.MarginRuleInclude<ExtArgs> | null;
    where?: Prisma.MarginRuleWhereInput;
    orderBy?: Prisma.MarginRuleOrderByWithRelationInput | Prisma.MarginRuleOrderByWithRelationInput[];
    cursor?: Prisma.MarginRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MarginRuleScalarFieldEnum | Prisma.MarginRuleScalarFieldEnum[];
};
export type MarginRuleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    include?: Prisma.MarginRuleInclude<ExtArgs> | null;
    where?: Prisma.MarginRuleWhereInput;
    orderBy?: Prisma.MarginRuleOrderByWithRelationInput | Prisma.MarginRuleOrderByWithRelationInput[];
    cursor?: Prisma.MarginRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MarginRuleScalarFieldEnum | Prisma.MarginRuleScalarFieldEnum[];
};
export type MarginRuleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    include?: Prisma.MarginRuleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MarginRuleCreateInput, Prisma.MarginRuleUncheckedCreateInput>;
};
export type MarginRuleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MarginRuleCreateManyInput | Prisma.MarginRuleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MarginRuleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    data: Prisma.MarginRuleCreateManyInput | Prisma.MarginRuleCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MarginRuleIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MarginRuleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    include?: Prisma.MarginRuleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MarginRuleUpdateInput, Prisma.MarginRuleUncheckedUpdateInput>;
    where: Prisma.MarginRuleWhereUniqueInput;
};
export type MarginRuleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MarginRuleUpdateManyMutationInput, Prisma.MarginRuleUncheckedUpdateManyInput>;
    where?: Prisma.MarginRuleWhereInput;
    limit?: number;
};
export type MarginRuleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MarginRuleUpdateManyMutationInput, Prisma.MarginRuleUncheckedUpdateManyInput>;
    where?: Prisma.MarginRuleWhereInput;
    limit?: number;
    include?: Prisma.MarginRuleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MarginRuleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    include?: Prisma.MarginRuleInclude<ExtArgs> | null;
    where: Prisma.MarginRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.MarginRuleCreateInput, Prisma.MarginRuleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MarginRuleUpdateInput, Prisma.MarginRuleUncheckedUpdateInput>;
};
export type MarginRuleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    include?: Prisma.MarginRuleInclude<ExtArgs> | null;
    where: Prisma.MarginRuleWhereUniqueInput;
};
export type MarginRuleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MarginRuleWhereInput;
    limit?: number;
};
export type MarginRule$categoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
};
export type MarginRule$companyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where?: Prisma.CompanyWhereInput;
};
export type MarginRule$quotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuoteSelect<ExtArgs> | null;
    omit?: Prisma.QuoteOmit<ExtArgs> | null;
    include?: Prisma.QuoteInclude<ExtArgs> | null;
    where?: Prisma.QuoteWhereInput;
    orderBy?: Prisma.QuoteOrderByWithRelationInput | Prisma.QuoteOrderByWithRelationInput[];
    cursor?: Prisma.QuoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuoteScalarFieldEnum | Prisma.QuoteScalarFieldEnum[];
};
export type MarginRuleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.MarginRuleOmit<ExtArgs> | null;
    include?: Prisma.MarginRuleInclude<ExtArgs> | null;
};
