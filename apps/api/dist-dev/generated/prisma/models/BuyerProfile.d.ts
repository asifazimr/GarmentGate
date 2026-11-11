import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BuyerProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$BuyerProfilePayload>;
export type AggregateBuyerProfile = {
    _count: BuyerProfileCountAggregateOutputType | null;
    _avg: BuyerProfileAvgAggregateOutputType | null;
    _sum: BuyerProfileSumAggregateOutputType | null;
    _min: BuyerProfileMinAggregateOutputType | null;
    _max: BuyerProfileMaxAggregateOutputType | null;
};
export type BuyerProfileAvgAggregateOutputType = {
    annualVolumePcs: number | null;
    typicalOrderQuantityPcs: number | null;
};
export type BuyerProfileSumAggregateOutputType = {
    annualVolumePcs: number | null;
    typicalOrderQuantityPcs: number | null;
};
export type BuyerProfileMinAggregateOutputType = {
    id: string | null;
    companyId: string | null;
    publicCode: string | null;
    plusActive: boolean | null;
    businessType: $Enums.BuyerBusinessType | null;
    annualVolumePcs: number | null;
    typicalOrderQuantityPcs: number | null;
    sourcingNeeds: string | null;
    sourcingNeedsFiltered: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BuyerProfileMaxAggregateOutputType = {
    id: string | null;
    companyId: string | null;
    publicCode: string | null;
    plusActive: boolean | null;
    businessType: $Enums.BuyerBusinessType | null;
    annualVolumePcs: number | null;
    typicalOrderQuantityPcs: number | null;
    sourcingNeeds: string | null;
    sourcingNeedsFiltered: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BuyerProfileCountAggregateOutputType = {
    id: number;
    companyId: number;
    publicCode: number;
    plusActive: number;
    businessType: number;
    annualVolumePcs: number;
    typicalOrderQuantityPcs: number;
    targetMarkets: number;
    sourcingNeeds: number;
    sourcingNeedsFiltered: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BuyerProfileAvgAggregateInputType = {
    annualVolumePcs?: true;
    typicalOrderQuantityPcs?: true;
};
export type BuyerProfileSumAggregateInputType = {
    annualVolumePcs?: true;
    typicalOrderQuantityPcs?: true;
};
export type BuyerProfileMinAggregateInputType = {
    id?: true;
    companyId?: true;
    publicCode?: true;
    plusActive?: true;
    businessType?: true;
    annualVolumePcs?: true;
    typicalOrderQuantityPcs?: true;
    sourcingNeeds?: true;
    sourcingNeedsFiltered?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BuyerProfileMaxAggregateInputType = {
    id?: true;
    companyId?: true;
    publicCode?: true;
    plusActive?: true;
    businessType?: true;
    annualVolumePcs?: true;
    typicalOrderQuantityPcs?: true;
    sourcingNeeds?: true;
    sourcingNeedsFiltered?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BuyerProfileCountAggregateInputType = {
    id?: true;
    companyId?: true;
    publicCode?: true;
    plusActive?: true;
    businessType?: true;
    annualVolumePcs?: true;
    typicalOrderQuantityPcs?: true;
    targetMarkets?: true;
    sourcingNeeds?: true;
    sourcingNeedsFiltered?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BuyerProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BuyerProfileWhereInput;
    orderBy?: Prisma.BuyerProfileOrderByWithRelationInput | Prisma.BuyerProfileOrderByWithRelationInput[];
    cursor?: Prisma.BuyerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BuyerProfileCountAggregateInputType;
    _avg?: BuyerProfileAvgAggregateInputType;
    _sum?: BuyerProfileSumAggregateInputType;
    _min?: BuyerProfileMinAggregateInputType;
    _max?: BuyerProfileMaxAggregateInputType;
};
export type GetBuyerProfileAggregateType<T extends BuyerProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateBuyerProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBuyerProfile[P]> : Prisma.GetScalarType<T[P], AggregateBuyerProfile[P]>;
};
export type BuyerProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BuyerProfileWhereInput;
    orderBy?: Prisma.BuyerProfileOrderByWithAggregationInput | Prisma.BuyerProfileOrderByWithAggregationInput[];
    by: Prisma.BuyerProfileScalarFieldEnum[] | Prisma.BuyerProfileScalarFieldEnum;
    having?: Prisma.BuyerProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BuyerProfileCountAggregateInputType | true;
    _avg?: BuyerProfileAvgAggregateInputType;
    _sum?: BuyerProfileSumAggregateInputType;
    _min?: BuyerProfileMinAggregateInputType;
    _max?: BuyerProfileMaxAggregateInputType;
};
export type BuyerProfileGroupByOutputType = {
    id: string;
    companyId: string;
    publicCode: string;
    plusActive: boolean;
    businessType: $Enums.BuyerBusinessType | null;
    annualVolumePcs: number | null;
    typicalOrderQuantityPcs: number | null;
    targetMarkets: string[];
    sourcingNeeds: string | null;
    sourcingNeedsFiltered: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: BuyerProfileCountAggregateOutputType | null;
    _avg: BuyerProfileAvgAggregateOutputType | null;
    _sum: BuyerProfileSumAggregateOutputType | null;
    _min: BuyerProfileMinAggregateOutputType | null;
    _max: BuyerProfileMaxAggregateOutputType | null;
};
export type GetBuyerProfileGroupByPayload<T extends BuyerProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BuyerProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BuyerProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BuyerProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BuyerProfileGroupByOutputType[P]>;
}>>;
export type BuyerProfileWhereInput = {
    AND?: Prisma.BuyerProfileWhereInput | Prisma.BuyerProfileWhereInput[];
    OR?: Prisma.BuyerProfileWhereInput[];
    NOT?: Prisma.BuyerProfileWhereInput | Prisma.BuyerProfileWhereInput[];
    id?: Prisma.UuidFilter<"BuyerProfile"> | string;
    companyId?: Prisma.UuidFilter<"BuyerProfile"> | string;
    publicCode?: Prisma.StringFilter<"BuyerProfile"> | string;
    plusActive?: Prisma.BoolFilter<"BuyerProfile"> | boolean;
    businessType?: Prisma.EnumBuyerBusinessTypeNullableFilter<"BuyerProfile"> | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.IntNullableFilter<"BuyerProfile"> | number | null;
    typicalOrderQuantityPcs?: Prisma.IntNullableFilter<"BuyerProfile"> | number | null;
    targetMarkets?: Prisma.StringNullableListFilter<"BuyerProfile">;
    sourcingNeeds?: Prisma.StringNullableFilter<"BuyerProfile"> | string | null;
    sourcingNeedsFiltered?: Prisma.StringNullableFilter<"BuyerProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"BuyerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BuyerProfile"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    categories?: Prisma.CategoryListRelationFilter;
};
export type BuyerProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    publicCode?: Prisma.SortOrder;
    plusActive?: Prisma.SortOrder;
    businessType?: Prisma.SortOrderInput | Prisma.SortOrder;
    annualVolumePcs?: Prisma.SortOrderInput | Prisma.SortOrder;
    typicalOrderQuantityPcs?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetMarkets?: Prisma.SortOrder;
    sourcingNeeds?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourcingNeedsFiltered?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    company?: Prisma.CompanyOrderByWithRelationInput;
    categories?: Prisma.CategoryOrderByRelationAggregateInput;
};
export type BuyerProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    companyId?: string;
    publicCode?: string;
    AND?: Prisma.BuyerProfileWhereInput | Prisma.BuyerProfileWhereInput[];
    OR?: Prisma.BuyerProfileWhereInput[];
    NOT?: Prisma.BuyerProfileWhereInput | Prisma.BuyerProfileWhereInput[];
    plusActive?: Prisma.BoolFilter<"BuyerProfile"> | boolean;
    businessType?: Prisma.EnumBuyerBusinessTypeNullableFilter<"BuyerProfile"> | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.IntNullableFilter<"BuyerProfile"> | number | null;
    typicalOrderQuantityPcs?: Prisma.IntNullableFilter<"BuyerProfile"> | number | null;
    targetMarkets?: Prisma.StringNullableListFilter<"BuyerProfile">;
    sourcingNeeds?: Prisma.StringNullableFilter<"BuyerProfile"> | string | null;
    sourcingNeedsFiltered?: Prisma.StringNullableFilter<"BuyerProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"BuyerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BuyerProfile"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    categories?: Prisma.CategoryListRelationFilter;
}, "id" | "companyId" | "publicCode">;
export type BuyerProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    publicCode?: Prisma.SortOrder;
    plusActive?: Prisma.SortOrder;
    businessType?: Prisma.SortOrderInput | Prisma.SortOrder;
    annualVolumePcs?: Prisma.SortOrderInput | Prisma.SortOrder;
    typicalOrderQuantityPcs?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetMarkets?: Prisma.SortOrder;
    sourcingNeeds?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourcingNeedsFiltered?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BuyerProfileCountOrderByAggregateInput;
    _avg?: Prisma.BuyerProfileAvgOrderByAggregateInput;
    _max?: Prisma.BuyerProfileMaxOrderByAggregateInput;
    _min?: Prisma.BuyerProfileMinOrderByAggregateInput;
    _sum?: Prisma.BuyerProfileSumOrderByAggregateInput;
};
export type BuyerProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.BuyerProfileScalarWhereWithAggregatesInput | Prisma.BuyerProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.BuyerProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BuyerProfileScalarWhereWithAggregatesInput | Prisma.BuyerProfileScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"BuyerProfile"> | string;
    companyId?: Prisma.UuidWithAggregatesFilter<"BuyerProfile"> | string;
    publicCode?: Prisma.StringWithAggregatesFilter<"BuyerProfile"> | string;
    plusActive?: Prisma.BoolWithAggregatesFilter<"BuyerProfile"> | boolean;
    businessType?: Prisma.EnumBuyerBusinessTypeNullableWithAggregatesFilter<"BuyerProfile"> | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.IntNullableWithAggregatesFilter<"BuyerProfile"> | number | null;
    typicalOrderQuantityPcs?: Prisma.IntNullableWithAggregatesFilter<"BuyerProfile"> | number | null;
    targetMarkets?: Prisma.StringNullableListFilter<"BuyerProfile">;
    sourcingNeeds?: Prisma.StringNullableWithAggregatesFilter<"BuyerProfile"> | string | null;
    sourcingNeedsFiltered?: Prisma.StringNullableWithAggregatesFilter<"BuyerProfile"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BuyerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"BuyerProfile"> | Date | string;
};
export type BuyerProfileCreateInput = {
    id?: string;
    publicCode: string;
    plusActive?: boolean;
    businessType?: $Enums.BuyerBusinessType | null;
    annualVolumePcs?: number | null;
    typicalOrderQuantityPcs?: number | null;
    targetMarkets?: Prisma.BuyerProfileCreatetargetMarketsInput | string[];
    sourcingNeeds?: string | null;
    sourcingNeedsFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutBuyerProfileInput;
    categories?: Prisma.CategoryCreateNestedManyWithoutBuyersInput;
};
export type BuyerProfileUncheckedCreateInput = {
    id?: string;
    companyId: string;
    publicCode: string;
    plusActive?: boolean;
    businessType?: $Enums.BuyerBusinessType | null;
    annualVolumePcs?: number | null;
    typicalOrderQuantityPcs?: number | null;
    targetMarkets?: Prisma.BuyerProfileCreatetargetMarketsInput | string[];
    sourcingNeeds?: string | null;
    sourcingNeedsFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryUncheckedCreateNestedManyWithoutBuyersInput;
};
export type BuyerProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicCode?: Prisma.StringFieldUpdateOperationsInput | string;
    plusActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessType?: Prisma.NullableEnumBuyerBusinessTypeFieldUpdateOperationsInput | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    typicalOrderQuantityPcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetMarkets?: Prisma.BuyerProfileUpdatetargetMarketsInput | string[];
    sourcingNeeds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourcingNeedsFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutBuyerProfileNestedInput;
    categories?: Prisma.CategoryUpdateManyWithoutBuyersNestedInput;
};
export type BuyerProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicCode?: Prisma.StringFieldUpdateOperationsInput | string;
    plusActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessType?: Prisma.NullableEnumBuyerBusinessTypeFieldUpdateOperationsInput | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    typicalOrderQuantityPcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetMarkets?: Prisma.BuyerProfileUpdatetargetMarketsInput | string[];
    sourcingNeeds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourcingNeedsFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUncheckedUpdateManyWithoutBuyersNestedInput;
};
export type BuyerProfileCreateManyInput = {
    id?: string;
    companyId: string;
    publicCode: string;
    plusActive?: boolean;
    businessType?: $Enums.BuyerBusinessType | null;
    annualVolumePcs?: number | null;
    typicalOrderQuantityPcs?: number | null;
    targetMarkets?: Prisma.BuyerProfileCreatetargetMarketsInput | string[];
    sourcingNeeds?: string | null;
    sourcingNeedsFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BuyerProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicCode?: Prisma.StringFieldUpdateOperationsInput | string;
    plusActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessType?: Prisma.NullableEnumBuyerBusinessTypeFieldUpdateOperationsInput | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    typicalOrderQuantityPcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetMarkets?: Prisma.BuyerProfileUpdatetargetMarketsInput | string[];
    sourcingNeeds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourcingNeedsFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BuyerProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicCode?: Prisma.StringFieldUpdateOperationsInput | string;
    plusActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessType?: Prisma.NullableEnumBuyerBusinessTypeFieldUpdateOperationsInput | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    typicalOrderQuantityPcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetMarkets?: Prisma.BuyerProfileUpdatetargetMarketsInput | string[];
    sourcingNeeds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourcingNeedsFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BuyerProfileNullableScalarRelationFilter = {
    is?: Prisma.BuyerProfileWhereInput | null;
    isNot?: Prisma.BuyerProfileWhereInput | null;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type BuyerProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    publicCode?: Prisma.SortOrder;
    plusActive?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    annualVolumePcs?: Prisma.SortOrder;
    typicalOrderQuantityPcs?: Prisma.SortOrder;
    targetMarkets?: Prisma.SortOrder;
    sourcingNeeds?: Prisma.SortOrder;
    sourcingNeedsFiltered?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BuyerProfileAvgOrderByAggregateInput = {
    annualVolumePcs?: Prisma.SortOrder;
    typicalOrderQuantityPcs?: Prisma.SortOrder;
};
export type BuyerProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    publicCode?: Prisma.SortOrder;
    plusActive?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    annualVolumePcs?: Prisma.SortOrder;
    typicalOrderQuantityPcs?: Prisma.SortOrder;
    sourcingNeeds?: Prisma.SortOrder;
    sourcingNeedsFiltered?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BuyerProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    publicCode?: Prisma.SortOrder;
    plusActive?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    annualVolumePcs?: Prisma.SortOrder;
    typicalOrderQuantityPcs?: Prisma.SortOrder;
    sourcingNeeds?: Prisma.SortOrder;
    sourcingNeedsFiltered?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BuyerProfileSumOrderByAggregateInput = {
    annualVolumePcs?: Prisma.SortOrder;
    typicalOrderQuantityPcs?: Prisma.SortOrder;
};
export type BuyerProfileListRelationFilter = {
    every?: Prisma.BuyerProfileWhereInput;
    some?: Prisma.BuyerProfileWhereInput;
    none?: Prisma.BuyerProfileWhereInput;
};
export type BuyerProfileOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BuyerProfileCreateNestedOneWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCompanyInput, Prisma.BuyerProfileUncheckedCreateWithoutCompanyInput>;
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutCompanyInput;
    connect?: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileUncheckedCreateNestedOneWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCompanyInput, Prisma.BuyerProfileUncheckedCreateWithoutCompanyInput>;
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutCompanyInput;
    connect?: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileUpdateOneWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCompanyInput, Prisma.BuyerProfileUncheckedCreateWithoutCompanyInput>;
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutCompanyInput;
    upsert?: Prisma.BuyerProfileUpsertWithoutCompanyInput;
    disconnect?: Prisma.BuyerProfileWhereInput | boolean;
    delete?: Prisma.BuyerProfileWhereInput | boolean;
    connect?: Prisma.BuyerProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BuyerProfileUpdateToOneWithWhereWithoutCompanyInput, Prisma.BuyerProfileUpdateWithoutCompanyInput>, Prisma.BuyerProfileUncheckedUpdateWithoutCompanyInput>;
};
export type BuyerProfileUncheckedUpdateOneWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCompanyInput, Prisma.BuyerProfileUncheckedCreateWithoutCompanyInput>;
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutCompanyInput;
    upsert?: Prisma.BuyerProfileUpsertWithoutCompanyInput;
    disconnect?: Prisma.BuyerProfileWhereInput | boolean;
    delete?: Prisma.BuyerProfileWhereInput | boolean;
    connect?: Prisma.BuyerProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BuyerProfileUpdateToOneWithWhereWithoutCompanyInput, Prisma.BuyerProfileUpdateWithoutCompanyInput>, Prisma.BuyerProfileUncheckedUpdateWithoutCompanyInput>;
};
export type BuyerProfileCreatetargetMarketsInput = {
    set: string[];
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NullableEnumBuyerBusinessTypeFieldUpdateOperationsInput = {
    set?: $Enums.BuyerBusinessType | null;
};
export type BuyerProfileUpdatetargetMarketsInput = {
    set?: string[];
    push?: string | string[];
};
export type BuyerProfileCreateNestedManyWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCategoriesInput, Prisma.BuyerProfileUncheckedCreateWithoutCategoriesInput> | Prisma.BuyerProfileCreateWithoutCategoriesInput[] | Prisma.BuyerProfileUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutCategoriesInput | Prisma.BuyerProfileCreateOrConnectWithoutCategoriesInput[];
    connect?: Prisma.BuyerProfileWhereUniqueInput | Prisma.BuyerProfileWhereUniqueInput[];
};
export type BuyerProfileUncheckedCreateNestedManyWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCategoriesInput, Prisma.BuyerProfileUncheckedCreateWithoutCategoriesInput> | Prisma.BuyerProfileCreateWithoutCategoriesInput[] | Prisma.BuyerProfileUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutCategoriesInput | Prisma.BuyerProfileCreateOrConnectWithoutCategoriesInput[];
    connect?: Prisma.BuyerProfileWhereUniqueInput | Prisma.BuyerProfileWhereUniqueInput[];
};
export type BuyerProfileUpdateManyWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCategoriesInput, Prisma.BuyerProfileUncheckedCreateWithoutCategoriesInput> | Prisma.BuyerProfileCreateWithoutCategoriesInput[] | Prisma.BuyerProfileUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutCategoriesInput | Prisma.BuyerProfileCreateOrConnectWithoutCategoriesInput[];
    upsert?: Prisma.BuyerProfileUpsertWithWhereUniqueWithoutCategoriesInput | Prisma.BuyerProfileUpsertWithWhereUniqueWithoutCategoriesInput[];
    set?: Prisma.BuyerProfileWhereUniqueInput | Prisma.BuyerProfileWhereUniqueInput[];
    disconnect?: Prisma.BuyerProfileWhereUniqueInput | Prisma.BuyerProfileWhereUniqueInput[];
    delete?: Prisma.BuyerProfileWhereUniqueInput | Prisma.BuyerProfileWhereUniqueInput[];
    connect?: Prisma.BuyerProfileWhereUniqueInput | Prisma.BuyerProfileWhereUniqueInput[];
    update?: Prisma.BuyerProfileUpdateWithWhereUniqueWithoutCategoriesInput | Prisma.BuyerProfileUpdateWithWhereUniqueWithoutCategoriesInput[];
    updateMany?: Prisma.BuyerProfileUpdateManyWithWhereWithoutCategoriesInput | Prisma.BuyerProfileUpdateManyWithWhereWithoutCategoriesInput[];
    deleteMany?: Prisma.BuyerProfileScalarWhereInput | Prisma.BuyerProfileScalarWhereInput[];
};
export type BuyerProfileUncheckedUpdateManyWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCategoriesInput, Prisma.BuyerProfileUncheckedCreateWithoutCategoriesInput> | Prisma.BuyerProfileCreateWithoutCategoriesInput[] | Prisma.BuyerProfileUncheckedCreateWithoutCategoriesInput[];
    connectOrCreate?: Prisma.BuyerProfileCreateOrConnectWithoutCategoriesInput | Prisma.BuyerProfileCreateOrConnectWithoutCategoriesInput[];
    upsert?: Prisma.BuyerProfileUpsertWithWhereUniqueWithoutCategoriesInput | Prisma.BuyerProfileUpsertWithWhereUniqueWithoutCategoriesInput[];
    set?: Prisma.BuyerProfileWhereUniqueInput | Prisma.BuyerProfileWhereUniqueInput[];
    disconnect?: Prisma.BuyerProfileWhereUniqueInput | Prisma.BuyerProfileWhereUniqueInput[];
    delete?: Prisma.BuyerProfileWhereUniqueInput | Prisma.BuyerProfileWhereUniqueInput[];
    connect?: Prisma.BuyerProfileWhereUniqueInput | Prisma.BuyerProfileWhereUniqueInput[];
    update?: Prisma.BuyerProfileUpdateWithWhereUniqueWithoutCategoriesInput | Prisma.BuyerProfileUpdateWithWhereUniqueWithoutCategoriesInput[];
    updateMany?: Prisma.BuyerProfileUpdateManyWithWhereWithoutCategoriesInput | Prisma.BuyerProfileUpdateManyWithWhereWithoutCategoriesInput[];
    deleteMany?: Prisma.BuyerProfileScalarWhereInput | Prisma.BuyerProfileScalarWhereInput[];
};
export type BuyerProfileCreateWithoutCompanyInput = {
    id?: string;
    publicCode: string;
    plusActive?: boolean;
    businessType?: $Enums.BuyerBusinessType | null;
    annualVolumePcs?: number | null;
    typicalOrderQuantityPcs?: number | null;
    targetMarkets?: Prisma.BuyerProfileCreatetargetMarketsInput | string[];
    sourcingNeeds?: string | null;
    sourcingNeedsFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryCreateNestedManyWithoutBuyersInput;
};
export type BuyerProfileUncheckedCreateWithoutCompanyInput = {
    id?: string;
    publicCode: string;
    plusActive?: boolean;
    businessType?: $Enums.BuyerBusinessType | null;
    annualVolumePcs?: number | null;
    typicalOrderQuantityPcs?: number | null;
    targetMarkets?: Prisma.BuyerProfileCreatetargetMarketsInput | string[];
    sourcingNeeds?: string | null;
    sourcingNeedsFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryUncheckedCreateNestedManyWithoutBuyersInput;
};
export type BuyerProfileCreateOrConnectWithoutCompanyInput = {
    where: Prisma.BuyerProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCompanyInput, Prisma.BuyerProfileUncheckedCreateWithoutCompanyInput>;
};
export type BuyerProfileUpsertWithoutCompanyInput = {
    update: Prisma.XOR<Prisma.BuyerProfileUpdateWithoutCompanyInput, Prisma.BuyerProfileUncheckedUpdateWithoutCompanyInput>;
    create: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCompanyInput, Prisma.BuyerProfileUncheckedCreateWithoutCompanyInput>;
    where?: Prisma.BuyerProfileWhereInput;
};
export type BuyerProfileUpdateToOneWithWhereWithoutCompanyInput = {
    where?: Prisma.BuyerProfileWhereInput;
    data: Prisma.XOR<Prisma.BuyerProfileUpdateWithoutCompanyInput, Prisma.BuyerProfileUncheckedUpdateWithoutCompanyInput>;
};
export type BuyerProfileUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicCode?: Prisma.StringFieldUpdateOperationsInput | string;
    plusActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessType?: Prisma.NullableEnumBuyerBusinessTypeFieldUpdateOperationsInput | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    typicalOrderQuantityPcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetMarkets?: Prisma.BuyerProfileUpdatetargetMarketsInput | string[];
    sourcingNeeds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourcingNeedsFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUpdateManyWithoutBuyersNestedInput;
};
export type BuyerProfileUncheckedUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicCode?: Prisma.StringFieldUpdateOperationsInput | string;
    plusActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessType?: Prisma.NullableEnumBuyerBusinessTypeFieldUpdateOperationsInput | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    typicalOrderQuantityPcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetMarkets?: Prisma.BuyerProfileUpdatetargetMarketsInput | string[];
    sourcingNeeds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourcingNeedsFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUncheckedUpdateManyWithoutBuyersNestedInput;
};
export type BuyerProfileCreateWithoutCategoriesInput = {
    id?: string;
    publicCode: string;
    plusActive?: boolean;
    businessType?: $Enums.BuyerBusinessType | null;
    annualVolumePcs?: number | null;
    typicalOrderQuantityPcs?: number | null;
    targetMarkets?: Prisma.BuyerProfileCreatetargetMarketsInput | string[];
    sourcingNeeds?: string | null;
    sourcingNeedsFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutBuyerProfileInput;
};
export type BuyerProfileUncheckedCreateWithoutCategoriesInput = {
    id?: string;
    companyId: string;
    publicCode: string;
    plusActive?: boolean;
    businessType?: $Enums.BuyerBusinessType | null;
    annualVolumePcs?: number | null;
    typicalOrderQuantityPcs?: number | null;
    targetMarkets?: Prisma.BuyerProfileCreatetargetMarketsInput | string[];
    sourcingNeeds?: string | null;
    sourcingNeedsFiltered?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BuyerProfileCreateOrConnectWithoutCategoriesInput = {
    where: Prisma.BuyerProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCategoriesInput, Prisma.BuyerProfileUncheckedCreateWithoutCategoriesInput>;
};
export type BuyerProfileUpsertWithWhereUniqueWithoutCategoriesInput = {
    where: Prisma.BuyerProfileWhereUniqueInput;
    update: Prisma.XOR<Prisma.BuyerProfileUpdateWithoutCategoriesInput, Prisma.BuyerProfileUncheckedUpdateWithoutCategoriesInput>;
    create: Prisma.XOR<Prisma.BuyerProfileCreateWithoutCategoriesInput, Prisma.BuyerProfileUncheckedCreateWithoutCategoriesInput>;
};
export type BuyerProfileUpdateWithWhereUniqueWithoutCategoriesInput = {
    where: Prisma.BuyerProfileWhereUniqueInput;
    data: Prisma.XOR<Prisma.BuyerProfileUpdateWithoutCategoriesInput, Prisma.BuyerProfileUncheckedUpdateWithoutCategoriesInput>;
};
export type BuyerProfileUpdateManyWithWhereWithoutCategoriesInput = {
    where: Prisma.BuyerProfileScalarWhereInput;
    data: Prisma.XOR<Prisma.BuyerProfileUpdateManyMutationInput, Prisma.BuyerProfileUncheckedUpdateManyWithoutCategoriesInput>;
};
export type BuyerProfileScalarWhereInput = {
    AND?: Prisma.BuyerProfileScalarWhereInput | Prisma.BuyerProfileScalarWhereInput[];
    OR?: Prisma.BuyerProfileScalarWhereInput[];
    NOT?: Prisma.BuyerProfileScalarWhereInput | Prisma.BuyerProfileScalarWhereInput[];
    id?: Prisma.UuidFilter<"BuyerProfile"> | string;
    companyId?: Prisma.UuidFilter<"BuyerProfile"> | string;
    publicCode?: Prisma.StringFilter<"BuyerProfile"> | string;
    plusActive?: Prisma.BoolFilter<"BuyerProfile"> | boolean;
    businessType?: Prisma.EnumBuyerBusinessTypeNullableFilter<"BuyerProfile"> | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.IntNullableFilter<"BuyerProfile"> | number | null;
    typicalOrderQuantityPcs?: Prisma.IntNullableFilter<"BuyerProfile"> | number | null;
    targetMarkets?: Prisma.StringNullableListFilter<"BuyerProfile">;
    sourcingNeeds?: Prisma.StringNullableFilter<"BuyerProfile"> | string | null;
    sourcingNeedsFiltered?: Prisma.StringNullableFilter<"BuyerProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"BuyerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BuyerProfile"> | Date | string;
};
export type BuyerProfileUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicCode?: Prisma.StringFieldUpdateOperationsInput | string;
    plusActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessType?: Prisma.NullableEnumBuyerBusinessTypeFieldUpdateOperationsInput | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    typicalOrderQuantityPcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetMarkets?: Prisma.BuyerProfileUpdatetargetMarketsInput | string[];
    sourcingNeeds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourcingNeedsFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutBuyerProfileNestedInput;
};
export type BuyerProfileUncheckedUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicCode?: Prisma.StringFieldUpdateOperationsInput | string;
    plusActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessType?: Prisma.NullableEnumBuyerBusinessTypeFieldUpdateOperationsInput | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    typicalOrderQuantityPcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetMarkets?: Prisma.BuyerProfileUpdatetargetMarketsInput | string[];
    sourcingNeeds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourcingNeedsFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BuyerProfileUncheckedUpdateManyWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    publicCode?: Prisma.StringFieldUpdateOperationsInput | string;
    plusActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    businessType?: Prisma.NullableEnumBuyerBusinessTypeFieldUpdateOperationsInput | $Enums.BuyerBusinessType | null;
    annualVolumePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    typicalOrderQuantityPcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    targetMarkets?: Prisma.BuyerProfileUpdatetargetMarketsInput | string[];
    sourcingNeeds?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourcingNeedsFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BuyerProfileCountOutputType = {
    categories: number;
};
export type BuyerProfileCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | BuyerProfileCountOutputTypeCountCategoriesArgs;
};
export type BuyerProfileCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileCountOutputTypeSelect<ExtArgs> | null;
};
export type BuyerProfileCountOutputTypeCountCategoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
};
export type BuyerProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyId?: boolean;
    publicCode?: boolean;
    plusActive?: boolean;
    businessType?: boolean;
    annualVolumePcs?: boolean;
    typicalOrderQuantityPcs?: boolean;
    targetMarkets?: boolean;
    sourcingNeeds?: boolean;
    sourcingNeedsFiltered?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    categories?: boolean | Prisma.BuyerProfile$categoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.BuyerProfileCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["buyerProfile"]>;
export type BuyerProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyId?: boolean;
    publicCode?: boolean;
    plusActive?: boolean;
    businessType?: boolean;
    annualVolumePcs?: boolean;
    typicalOrderQuantityPcs?: boolean;
    targetMarkets?: boolean;
    sourcingNeeds?: boolean;
    sourcingNeedsFiltered?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["buyerProfile"]>;
export type BuyerProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyId?: boolean;
    publicCode?: boolean;
    plusActive?: boolean;
    businessType?: boolean;
    annualVolumePcs?: boolean;
    typicalOrderQuantityPcs?: boolean;
    targetMarkets?: boolean;
    sourcingNeeds?: boolean;
    sourcingNeedsFiltered?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["buyerProfile"]>;
export type BuyerProfileSelectScalar = {
    id?: boolean;
    companyId?: boolean;
    publicCode?: boolean;
    plusActive?: boolean;
    businessType?: boolean;
    annualVolumePcs?: boolean;
    typicalOrderQuantityPcs?: boolean;
    targetMarkets?: boolean;
    sourcingNeeds?: boolean;
    sourcingNeedsFiltered?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BuyerProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "companyId" | "publicCode" | "plusActive" | "businessType" | "annualVolumePcs" | "typicalOrderQuantityPcs" | "targetMarkets" | "sourcingNeeds" | "sourcingNeedsFiltered" | "createdAt" | "updatedAt", ExtArgs["result"]["buyerProfile"]>;
export type BuyerProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    categories?: boolean | Prisma.BuyerProfile$categoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.BuyerProfileCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BuyerProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
};
export type BuyerProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
};
export type $BuyerProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BuyerProfile";
    objects: {
        company: Prisma.$CompanyPayload<ExtArgs>;
        categories: Prisma.$CategoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        companyId: string;
        publicCode: string;
        plusActive: boolean;
        businessType: $Enums.BuyerBusinessType | null;
        annualVolumePcs: number | null;
        typicalOrderQuantityPcs: number | null;
        targetMarkets: string[];
        sourcingNeeds: string | null;
        sourcingNeedsFiltered: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["buyerProfile"]>;
    composites: {};
};
export type BuyerProfileGetPayload<S extends boolean | null | undefined | BuyerProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload, S>;
export type BuyerProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BuyerProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BuyerProfileCountAggregateInputType | true;
};
export interface BuyerProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BuyerProfile'];
        meta: {
            name: 'BuyerProfile';
        };
    };
    findUnique<T extends BuyerProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, BuyerProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BuyerProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BuyerProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BuyerProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, BuyerProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BuyerProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BuyerProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BuyerProfileFindManyArgs>(args?: Prisma.SelectSubset<T, BuyerProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BuyerProfileCreateArgs>(args: Prisma.SelectSubset<T, BuyerProfileCreateArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BuyerProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, BuyerProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BuyerProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BuyerProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BuyerProfileDeleteArgs>(args: Prisma.SelectSubset<T, BuyerProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BuyerProfileUpdateArgs>(args: Prisma.SelectSubset<T, BuyerProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BuyerProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, BuyerProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BuyerProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, BuyerProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BuyerProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BuyerProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BuyerProfileUpsertArgs>(args: Prisma.SelectSubset<T, BuyerProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__BuyerProfileClient<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BuyerProfileCountArgs>(args?: Prisma.Subset<T, BuyerProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BuyerProfileCountAggregateOutputType> : number>;
    aggregate<T extends BuyerProfileAggregateArgs>(args: Prisma.Subset<T, BuyerProfileAggregateArgs>): Prisma.PrismaPromise<GetBuyerProfileAggregateType<T>>;
    groupBy<T extends BuyerProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BuyerProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: BuyerProfileGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BuyerProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuyerProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BuyerProfileFieldRefs;
}
export interface Prisma__BuyerProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    company<T extends Prisma.CompanyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CompanyDefaultArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    categories<T extends Prisma.BuyerProfile$categoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BuyerProfile$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BuyerProfileFieldRefs {
    readonly id: Prisma.FieldRef<"BuyerProfile", 'String'>;
    readonly companyId: Prisma.FieldRef<"BuyerProfile", 'String'>;
    readonly publicCode: Prisma.FieldRef<"BuyerProfile", 'String'>;
    readonly plusActive: Prisma.FieldRef<"BuyerProfile", 'Boolean'>;
    readonly businessType: Prisma.FieldRef<"BuyerProfile", 'BuyerBusinessType'>;
    readonly annualVolumePcs: Prisma.FieldRef<"BuyerProfile", 'Int'>;
    readonly typicalOrderQuantityPcs: Prisma.FieldRef<"BuyerProfile", 'Int'>;
    readonly targetMarkets: Prisma.FieldRef<"BuyerProfile", 'String[]'>;
    readonly sourcingNeeds: Prisma.FieldRef<"BuyerProfile", 'String'>;
    readonly sourcingNeedsFiltered: Prisma.FieldRef<"BuyerProfile", 'String'>;
    readonly createdAt: Prisma.FieldRef<"BuyerProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"BuyerProfile", 'DateTime'>;
}
export type BuyerProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where?: Prisma.BuyerProfileWhereInput;
    orderBy?: Prisma.BuyerProfileOrderByWithRelationInput | Prisma.BuyerProfileOrderByWithRelationInput[];
    cursor?: Prisma.BuyerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BuyerProfileScalarFieldEnum | Prisma.BuyerProfileScalarFieldEnum[];
};
export type BuyerProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where?: Prisma.BuyerProfileWhereInput;
    orderBy?: Prisma.BuyerProfileOrderByWithRelationInput | Prisma.BuyerProfileOrderByWithRelationInput[];
    cursor?: Prisma.BuyerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BuyerProfileScalarFieldEnum | Prisma.BuyerProfileScalarFieldEnum[];
};
export type BuyerProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where?: Prisma.BuyerProfileWhereInput;
    orderBy?: Prisma.BuyerProfileOrderByWithRelationInput | Prisma.BuyerProfileOrderByWithRelationInput[];
    cursor?: Prisma.BuyerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BuyerProfileScalarFieldEnum | Prisma.BuyerProfileScalarFieldEnum[];
};
export type BuyerProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BuyerProfileCreateInput, Prisma.BuyerProfileUncheckedCreateInput>;
};
export type BuyerProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BuyerProfileCreateManyInput | Prisma.BuyerProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BuyerProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    data: Prisma.BuyerProfileCreateManyInput | Prisma.BuyerProfileCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BuyerProfileIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BuyerProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BuyerProfileUpdateInput, Prisma.BuyerProfileUncheckedUpdateInput>;
    where: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BuyerProfileUpdateManyMutationInput, Prisma.BuyerProfileUncheckedUpdateManyInput>;
    where?: Prisma.BuyerProfileWhereInput;
    limit?: number;
};
export type BuyerProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BuyerProfileUpdateManyMutationInput, Prisma.BuyerProfileUncheckedUpdateManyInput>;
    where?: Prisma.BuyerProfileWhereInput;
    limit?: number;
    include?: Prisma.BuyerProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BuyerProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where: Prisma.BuyerProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.BuyerProfileCreateInput, Prisma.BuyerProfileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BuyerProfileUpdateInput, Prisma.BuyerProfileUncheckedUpdateInput>;
};
export type BuyerProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
    where: Prisma.BuyerProfileWhereUniqueInput;
};
export type BuyerProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BuyerProfileWhereInput;
    limit?: number;
};
export type BuyerProfile$categoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[];
};
export type BuyerProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BuyerProfileSelect<ExtArgs> | null;
    omit?: Prisma.BuyerProfileOmit<ExtArgs> | null;
    include?: Prisma.BuyerProfileInclude<ExtArgs> | null;
};
