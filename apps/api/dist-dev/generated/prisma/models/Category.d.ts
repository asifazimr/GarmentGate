import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$CategoryPayload>;
export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null;
    _avg: CategoryAvgAggregateOutputType | null;
    _sum: CategorySumAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
};
export type CategoryAvgAggregateOutputType = {
    sortOrder: number | null;
};
export type CategorySumAggregateOutputType = {
    sortOrder: number | null;
};
export type CategoryMinAggregateOutputType = {
    id: string | null;
    slug: string | null;
    name: string | null;
    parentId: string | null;
    sortOrder: number | null;
    createdAt: Date | null;
};
export type CategoryMaxAggregateOutputType = {
    id: string | null;
    slug: string | null;
    name: string | null;
    parentId: string | null;
    sortOrder: number | null;
    createdAt: Date | null;
};
export type CategoryCountAggregateOutputType = {
    id: number;
    slug: number;
    name: number;
    parentId: number;
    sortOrder: number;
    createdAt: number;
    _all: number;
};
export type CategoryAvgAggregateInputType = {
    sortOrder?: true;
};
export type CategorySumAggregateInputType = {
    sortOrder?: true;
};
export type CategoryMinAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    parentId?: true;
    sortOrder?: true;
    createdAt?: true;
};
export type CategoryMaxAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    parentId?: true;
    sortOrder?: true;
    createdAt?: true;
};
export type CategoryCountAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    parentId?: true;
    sortOrder?: true;
    createdAt?: true;
    _all?: true;
};
export type CategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CategoryCountAggregateInputType;
    _avg?: CategoryAvgAggregateInputType;
    _sum?: CategorySumAggregateInputType;
    _min?: CategoryMinAggregateInputType;
    _max?: CategoryMaxAggregateInputType;
};
export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCategory[P]> : Prisma.GetScalarType<T[P], AggregateCategory[P]>;
};
export type CategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithAggregationInput | Prisma.CategoryOrderByWithAggregationInput[];
    by: Prisma.CategoryScalarFieldEnum[] | Prisma.CategoryScalarFieldEnum;
    having?: Prisma.CategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CategoryCountAggregateInputType | true;
    _avg?: CategoryAvgAggregateInputType;
    _sum?: CategorySumAggregateInputType;
    _min?: CategoryMinAggregateInputType;
    _max?: CategoryMaxAggregateInputType;
};
export type CategoryGroupByOutputType = {
    id: string;
    slug: string;
    name: string;
    parentId: string | null;
    sortOrder: number;
    createdAt: Date;
    _count: CategoryCountAggregateOutputType | null;
    _avg: CategoryAvgAggregateOutputType | null;
    _sum: CategorySumAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
};
export type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CategoryGroupByOutputType[P]>;
}>>;
export type CategoryWhereInput = {
    AND?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    OR?: Prisma.CategoryWhereInput[];
    NOT?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    id?: Prisma.UuidFilter<"Category"> | string;
    slug?: Prisma.StringFilter<"Category"> | string;
    name?: Prisma.StringFilter<"Category"> | string;
    parentId?: Prisma.UuidNullableFilter<"Category"> | string | null;
    sortOrder?: Prisma.IntFilter<"Category"> | number;
    createdAt?: Prisma.DateTimeFilter<"Category"> | Date | string;
    parent?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
    children?: Prisma.CategoryListRelationFilter;
    manufacturers?: Prisma.ManufacturerProfileListRelationFilter;
    buyers?: Prisma.BuyerProfileListRelationFilter;
    products?: Prisma.ProductListRelationFilter;
    rfqs?: Prisma.RfqListRelationFilter;
    marginRules?: Prisma.MarginRuleListRelationFilter;
    productionLines?: Prisma.ProductionLineListRelationFilter;
    capacityBookings?: Prisma.CapacityBookingListRelationFilter;
    capacityPartnerships?: Prisma.CapacityPartnershipListRelationFilter;
};
export type CategoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    parent?: Prisma.CategoryOrderByWithRelationInput;
    children?: Prisma.CategoryOrderByRelationAggregateInput;
    manufacturers?: Prisma.ManufacturerProfileOrderByRelationAggregateInput;
    buyers?: Prisma.BuyerProfileOrderByRelationAggregateInput;
    products?: Prisma.ProductOrderByRelationAggregateInput;
    rfqs?: Prisma.RfqOrderByRelationAggregateInput;
    marginRules?: Prisma.MarginRuleOrderByRelationAggregateInput;
    productionLines?: Prisma.ProductionLineOrderByRelationAggregateInput;
    capacityBookings?: Prisma.CapacityBookingOrderByRelationAggregateInput;
    capacityPartnerships?: Prisma.CapacityPartnershipOrderByRelationAggregateInput;
};
export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    OR?: Prisma.CategoryWhereInput[];
    NOT?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    name?: Prisma.StringFilter<"Category"> | string;
    parentId?: Prisma.UuidNullableFilter<"Category"> | string | null;
    sortOrder?: Prisma.IntFilter<"Category"> | number;
    createdAt?: Prisma.DateTimeFilter<"Category"> | Date | string;
    parent?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
    children?: Prisma.CategoryListRelationFilter;
    manufacturers?: Prisma.ManufacturerProfileListRelationFilter;
    buyers?: Prisma.BuyerProfileListRelationFilter;
    products?: Prisma.ProductListRelationFilter;
    rfqs?: Prisma.RfqListRelationFilter;
    marginRules?: Prisma.MarginRuleListRelationFilter;
    productionLines?: Prisma.ProductionLineListRelationFilter;
    capacityBookings?: Prisma.CapacityBookingListRelationFilter;
    capacityPartnerships?: Prisma.CapacityPartnershipListRelationFilter;
}, "id" | "slug">;
export type CategoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CategoryCountOrderByAggregateInput;
    _avg?: Prisma.CategoryAvgOrderByAggregateInput;
    _max?: Prisma.CategoryMaxOrderByAggregateInput;
    _min?: Prisma.CategoryMinOrderByAggregateInput;
    _sum?: Prisma.CategorySumOrderByAggregateInput;
};
export type CategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.CategoryScalarWhereWithAggregatesInput | Prisma.CategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.CategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CategoryScalarWhereWithAggregatesInput | Prisma.CategoryScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Category"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"Category"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Category"> | string;
    parentId?: Prisma.UuidNullableWithAggregatesFilter<"Category"> | string | null;
    sortOrder?: Prisma.IntWithAggregatesFilter<"Category"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Category"> | Date | string;
};
export type CategoryCreateInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateInput = {
    id?: string;
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    createdAt?: Date | string;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqUncheckedCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleUncheckedCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineUncheckedCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUncheckedUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUncheckedUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUncheckedUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateManyInput = {
    id?: string;
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    createdAt?: Date | string;
};
export type CategoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryListRelationFilter = {
    every?: Prisma.CategoryWhereInput;
    some?: Prisma.CategoryWhereInput;
    none?: Prisma.CategoryWhereInput;
};
export type CategoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CategoryNullableScalarRelationFilter = {
    is?: Prisma.CategoryWhereInput | null;
    isNot?: Prisma.CategoryWhereInput | null;
};
export type CategoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CategoryAvgOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type CategoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CategoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CategorySumOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type CategoryScalarRelationFilter = {
    is?: Prisma.CategoryWhereInput;
    isNot?: Prisma.CategoryWhereInput;
};
export type CategoryCreateNestedManyWithoutBuyersInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutBuyersInput, Prisma.CategoryUncheckedCreateWithoutBuyersInput> | Prisma.CategoryCreateWithoutBuyersInput[] | Prisma.CategoryUncheckedCreateWithoutBuyersInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutBuyersInput | Prisma.CategoryCreateOrConnectWithoutBuyersInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
};
export type CategoryUncheckedCreateNestedManyWithoutBuyersInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutBuyersInput, Prisma.CategoryUncheckedCreateWithoutBuyersInput> | Prisma.CategoryCreateWithoutBuyersInput[] | Prisma.CategoryUncheckedCreateWithoutBuyersInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutBuyersInput | Prisma.CategoryCreateOrConnectWithoutBuyersInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
};
export type CategoryUpdateManyWithoutBuyersNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutBuyersInput, Prisma.CategoryUncheckedCreateWithoutBuyersInput> | Prisma.CategoryCreateWithoutBuyersInput[] | Prisma.CategoryUncheckedCreateWithoutBuyersInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutBuyersInput | Prisma.CategoryCreateOrConnectWithoutBuyersInput[];
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutBuyersInput | Prisma.CategoryUpsertWithWhereUniqueWithoutBuyersInput[];
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutBuyersInput | Prisma.CategoryUpdateWithWhereUniqueWithoutBuyersInput[];
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutBuyersInput | Prisma.CategoryUpdateManyWithWhereWithoutBuyersInput[];
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
};
export type CategoryUncheckedUpdateManyWithoutBuyersNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutBuyersInput, Prisma.CategoryUncheckedCreateWithoutBuyersInput> | Prisma.CategoryCreateWithoutBuyersInput[] | Prisma.CategoryUncheckedCreateWithoutBuyersInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutBuyersInput | Prisma.CategoryCreateOrConnectWithoutBuyersInput[];
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutBuyersInput | Prisma.CategoryUpsertWithWhereUniqueWithoutBuyersInput[];
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutBuyersInput | Prisma.CategoryUpdateWithWhereUniqueWithoutBuyersInput[];
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutBuyersInput | Prisma.CategoryUpdateManyWithWhereWithoutBuyersInput[];
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
};
export type CategoryCreateNestedManyWithoutManufacturersInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutManufacturersInput, Prisma.CategoryUncheckedCreateWithoutManufacturersInput> | Prisma.CategoryCreateWithoutManufacturersInput[] | Prisma.CategoryUncheckedCreateWithoutManufacturersInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutManufacturersInput | Prisma.CategoryCreateOrConnectWithoutManufacturersInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
};
export type CategoryUncheckedCreateNestedManyWithoutManufacturersInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutManufacturersInput, Prisma.CategoryUncheckedCreateWithoutManufacturersInput> | Prisma.CategoryCreateWithoutManufacturersInput[] | Prisma.CategoryUncheckedCreateWithoutManufacturersInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutManufacturersInput | Prisma.CategoryCreateOrConnectWithoutManufacturersInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
};
export type CategoryUpdateManyWithoutManufacturersNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutManufacturersInput, Prisma.CategoryUncheckedCreateWithoutManufacturersInput> | Prisma.CategoryCreateWithoutManufacturersInput[] | Prisma.CategoryUncheckedCreateWithoutManufacturersInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutManufacturersInput | Prisma.CategoryCreateOrConnectWithoutManufacturersInput[];
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutManufacturersInput | Prisma.CategoryUpsertWithWhereUniqueWithoutManufacturersInput[];
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutManufacturersInput | Prisma.CategoryUpdateWithWhereUniqueWithoutManufacturersInput[];
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutManufacturersInput | Prisma.CategoryUpdateManyWithWhereWithoutManufacturersInput[];
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
};
export type CategoryUncheckedUpdateManyWithoutManufacturersNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutManufacturersInput, Prisma.CategoryUncheckedCreateWithoutManufacturersInput> | Prisma.CategoryCreateWithoutManufacturersInput[] | Prisma.CategoryUncheckedCreateWithoutManufacturersInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutManufacturersInput | Prisma.CategoryCreateOrConnectWithoutManufacturersInput[];
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutManufacturersInput | Prisma.CategoryUpsertWithWhereUniqueWithoutManufacturersInput[];
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutManufacturersInput | Prisma.CategoryUpdateWithWhereUniqueWithoutManufacturersInput[];
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutManufacturersInput | Prisma.CategoryUpdateManyWithWhereWithoutManufacturersInput[];
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
};
export type CategoryCreateNestedOneWithoutChildrenInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutChildrenInput, Prisma.CategoryUncheckedCreateWithoutChildrenInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutChildrenInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput> | Prisma.CategoryCreateWithoutParentInput[] | Prisma.CategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutParentInput | Prisma.CategoryCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.CategoryCreateManyParentInputEnvelope;
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
};
export type CategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput> | Prisma.CategoryCreateWithoutParentInput[] | Prisma.CategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutParentInput | Prisma.CategoryCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.CategoryCreateManyParentInputEnvelope;
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
};
export type CategoryUpdateOneWithoutChildrenNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutChildrenInput, Prisma.CategoryUncheckedCreateWithoutChildrenInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutChildrenInput;
    upsert?: Prisma.CategoryUpsertWithoutChildrenInput;
    disconnect?: Prisma.CategoryWhereInput | boolean;
    delete?: Prisma.CategoryWhereInput | boolean;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutChildrenInput, Prisma.CategoryUpdateWithoutChildrenInput>, Prisma.CategoryUncheckedUpdateWithoutChildrenInput>;
};
export type CategoryUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput> | Prisma.CategoryCreateWithoutParentInput[] | Prisma.CategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutParentInput | Prisma.CategoryCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutParentInput | Prisma.CategoryUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.CategoryCreateManyParentInputEnvelope;
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutParentInput | Prisma.CategoryUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutParentInput | Prisma.CategoryUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
};
export type CategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput> | Prisma.CategoryCreateWithoutParentInput[] | Prisma.CategoryUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutParentInput | Prisma.CategoryCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutParentInput | Prisma.CategoryUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.CategoryCreateManyParentInputEnvelope;
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutParentInput | Prisma.CategoryUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutParentInput | Prisma.CategoryUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
};
export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutProductsInput, Prisma.CategoryUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutProductsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutProductsInput, Prisma.CategoryUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutProductsInput;
    upsert?: Prisma.CategoryUpsertWithoutProductsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutProductsInput, Prisma.CategoryUpdateWithoutProductsInput>, Prisma.CategoryUncheckedUpdateWithoutProductsInput>;
};
export type CategoryCreateNestedOneWithoutRfqsInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutRfqsInput, Prisma.CategoryUncheckedCreateWithoutRfqsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutRfqsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateOneRequiredWithoutRfqsNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutRfqsInput, Prisma.CategoryUncheckedCreateWithoutRfqsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutRfqsInput;
    upsert?: Prisma.CategoryUpsertWithoutRfqsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutRfqsInput, Prisma.CategoryUpdateWithoutRfqsInput>, Prisma.CategoryUncheckedUpdateWithoutRfqsInput>;
};
export type CategoryCreateNestedOneWithoutMarginRulesInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutMarginRulesInput, Prisma.CategoryUncheckedCreateWithoutMarginRulesInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutMarginRulesInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateOneWithoutMarginRulesNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutMarginRulesInput, Prisma.CategoryUncheckedCreateWithoutMarginRulesInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutMarginRulesInput;
    upsert?: Prisma.CategoryUpsertWithoutMarginRulesInput;
    disconnect?: Prisma.CategoryWhereInput | boolean;
    delete?: Prisma.CategoryWhereInput | boolean;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutMarginRulesInput, Prisma.CategoryUpdateWithoutMarginRulesInput>, Prisma.CategoryUncheckedUpdateWithoutMarginRulesInput>;
};
export type CategoryCreateNestedManyWithoutProductionLinesInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutProductionLinesInput, Prisma.CategoryUncheckedCreateWithoutProductionLinesInput> | Prisma.CategoryCreateWithoutProductionLinesInput[] | Prisma.CategoryUncheckedCreateWithoutProductionLinesInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutProductionLinesInput | Prisma.CategoryCreateOrConnectWithoutProductionLinesInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
};
export type CategoryUncheckedCreateNestedManyWithoutProductionLinesInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutProductionLinesInput, Prisma.CategoryUncheckedCreateWithoutProductionLinesInput> | Prisma.CategoryCreateWithoutProductionLinesInput[] | Prisma.CategoryUncheckedCreateWithoutProductionLinesInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutProductionLinesInput | Prisma.CategoryCreateOrConnectWithoutProductionLinesInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
};
export type CategoryUpdateManyWithoutProductionLinesNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutProductionLinesInput, Prisma.CategoryUncheckedCreateWithoutProductionLinesInput> | Prisma.CategoryCreateWithoutProductionLinesInput[] | Prisma.CategoryUncheckedCreateWithoutProductionLinesInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutProductionLinesInput | Prisma.CategoryCreateOrConnectWithoutProductionLinesInput[];
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutProductionLinesInput | Prisma.CategoryUpsertWithWhereUniqueWithoutProductionLinesInput[];
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutProductionLinesInput | Prisma.CategoryUpdateWithWhereUniqueWithoutProductionLinesInput[];
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutProductionLinesInput | Prisma.CategoryUpdateManyWithWhereWithoutProductionLinesInput[];
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
};
export type CategoryUncheckedUpdateManyWithoutProductionLinesNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutProductionLinesInput, Prisma.CategoryUncheckedCreateWithoutProductionLinesInput> | Prisma.CategoryCreateWithoutProductionLinesInput[] | Prisma.CategoryUncheckedCreateWithoutProductionLinesInput[];
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutProductionLinesInput | Prisma.CategoryCreateOrConnectWithoutProductionLinesInput[];
    upsert?: Prisma.CategoryUpsertWithWhereUniqueWithoutProductionLinesInput | Prisma.CategoryUpsertWithWhereUniqueWithoutProductionLinesInput[];
    set?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    disconnect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    delete?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    connect?: Prisma.CategoryWhereUniqueInput | Prisma.CategoryWhereUniqueInput[];
    update?: Prisma.CategoryUpdateWithWhereUniqueWithoutProductionLinesInput | Prisma.CategoryUpdateWithWhereUniqueWithoutProductionLinesInput[];
    updateMany?: Prisma.CategoryUpdateManyWithWhereWithoutProductionLinesInput | Prisma.CategoryUpdateManyWithWhereWithoutProductionLinesInput[];
    deleteMany?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
};
export type CategoryCreateNestedOneWithoutCapacityBookingsInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutCapacityBookingsInput, Prisma.CategoryUncheckedCreateWithoutCapacityBookingsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutCapacityBookingsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateOneRequiredWithoutCapacityBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutCapacityBookingsInput, Prisma.CategoryUncheckedCreateWithoutCapacityBookingsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutCapacityBookingsInput;
    upsert?: Prisma.CategoryUpsertWithoutCapacityBookingsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutCapacityBookingsInput, Prisma.CategoryUpdateWithoutCapacityBookingsInput>, Prisma.CategoryUncheckedUpdateWithoutCapacityBookingsInput>;
};
export type CategoryCreateNestedOneWithoutCapacityPartnershipsInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutCapacityPartnershipsInput, Prisma.CategoryUncheckedCreateWithoutCapacityPartnershipsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutCapacityPartnershipsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateOneRequiredWithoutCapacityPartnershipsNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutCapacityPartnershipsInput, Prisma.CategoryUncheckedCreateWithoutCapacityPartnershipsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutCapacityPartnershipsInput;
    upsert?: Prisma.CategoryUpsertWithoutCapacityPartnershipsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutCapacityPartnershipsInput, Prisma.CategoryUpdateWithoutCapacityPartnershipsInput>, Prisma.CategoryUncheckedUpdateWithoutCapacityPartnershipsInput>;
};
export type CategoryCreateWithoutBuyersInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutBuyersInput = {
    id?: string;
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    createdAt?: Date | string;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqUncheckedCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleUncheckedCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineUncheckedCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutBuyersInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutBuyersInput, Prisma.CategoryUncheckedCreateWithoutBuyersInput>;
};
export type CategoryUpsertWithWhereUniqueWithoutBuyersInput = {
    where: Prisma.CategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutBuyersInput, Prisma.CategoryUncheckedUpdateWithoutBuyersInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutBuyersInput, Prisma.CategoryUncheckedCreateWithoutBuyersInput>;
};
export type CategoryUpdateWithWhereUniqueWithoutBuyersInput = {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutBuyersInput, Prisma.CategoryUncheckedUpdateWithoutBuyersInput>;
};
export type CategoryUpdateManyWithWhereWithoutBuyersInput = {
    where: Prisma.CategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyWithoutBuyersInput>;
};
export type CategoryScalarWhereInput = {
    AND?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
    OR?: Prisma.CategoryScalarWhereInput[];
    NOT?: Prisma.CategoryScalarWhereInput | Prisma.CategoryScalarWhereInput[];
    id?: Prisma.UuidFilter<"Category"> | string;
    slug?: Prisma.StringFilter<"Category"> | string;
    name?: Prisma.StringFilter<"Category"> | string;
    parentId?: Prisma.UuidNullableFilter<"Category"> | string | null;
    sortOrder?: Prisma.IntFilter<"Category"> | number;
    createdAt?: Prisma.DateTimeFilter<"Category"> | Date | string;
};
export type CategoryCreateWithoutManufacturersInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput;
    buyers?: Prisma.BuyerProfileCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutManufacturersInput = {
    id?: string;
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    createdAt?: Date | string;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput;
    buyers?: Prisma.BuyerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqUncheckedCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleUncheckedCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineUncheckedCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutManufacturersInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutManufacturersInput, Prisma.CategoryUncheckedCreateWithoutManufacturersInput>;
};
export type CategoryUpsertWithWhereUniqueWithoutManufacturersInput = {
    where: Prisma.CategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutManufacturersInput, Prisma.CategoryUncheckedUpdateWithoutManufacturersInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutManufacturersInput, Prisma.CategoryUncheckedCreateWithoutManufacturersInput>;
};
export type CategoryUpdateWithWhereUniqueWithoutManufacturersInput = {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutManufacturersInput, Prisma.CategoryUncheckedUpdateWithoutManufacturersInput>;
};
export type CategoryUpdateManyWithWhereWithoutManufacturersInput = {
    where: Prisma.CategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyWithoutManufacturersInput>;
};
export type CategoryCreateWithoutChildrenInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput;
    manufacturers?: Prisma.ManufacturerProfileCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutChildrenInput = {
    id?: string;
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    createdAt?: Date | string;
    manufacturers?: Prisma.ManufacturerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqUncheckedCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleUncheckedCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineUncheckedCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutChildrenInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutChildrenInput, Prisma.CategoryUncheckedCreateWithoutChildrenInput>;
};
export type CategoryCreateWithoutParentInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutParentInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqUncheckedCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleUncheckedCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineUncheckedCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutParentInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput>;
};
export type CategoryCreateManyParentInputEnvelope = {
    data: Prisma.CategoryCreateManyParentInput | Prisma.CategoryCreateManyParentInput[];
    skipDuplicates?: boolean;
};
export type CategoryUpsertWithoutChildrenInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutChildrenInput, Prisma.CategoryUncheckedUpdateWithoutChildrenInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutChildrenInput, Prisma.CategoryUncheckedCreateWithoutChildrenInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutChildrenInput, Prisma.CategoryUncheckedUpdateWithoutChildrenInput>;
};
export type CategoryUpdateWithoutChildrenInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutChildrenInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturers?: Prisma.ManufacturerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUncheckedUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUncheckedUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUncheckedUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: Prisma.CategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutParentInput, Prisma.CategoryUncheckedUpdateWithoutParentInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutParentInput, Prisma.CategoryUncheckedCreateWithoutParentInput>;
};
export type CategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutParentInput, Prisma.CategoryUncheckedUpdateWithoutParentInput>;
};
export type CategoryUpdateManyWithWhereWithoutParentInput = {
    where: Prisma.CategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyWithoutParentInput>;
};
export type CategoryCreateWithoutProductsInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileCreateNestedManyWithoutCategoriesInput;
    rfqs?: Prisma.RfqCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string;
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    createdAt?: Date | string;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    rfqs?: Prisma.RfqUncheckedCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleUncheckedCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineUncheckedCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutProductsInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutProductsInput, Prisma.CategoryUncheckedCreateWithoutProductsInput>;
};
export type CategoryUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutProductsInput, Prisma.CategoryUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutProductsInput, Prisma.CategoryUncheckedCreateWithoutProductsInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutProductsInput, Prisma.CategoryUncheckedUpdateWithoutProductsInput>;
};
export type CategoryUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUpdateManyWithoutCategoriesNestedInput;
    rfqs?: Prisma.RfqUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    rfqs?: Prisma.RfqUncheckedUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUncheckedUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUncheckedUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateWithoutRfqsInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutRfqsInput = {
    id?: string;
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    createdAt?: Date | string;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleUncheckedCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineUncheckedCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutRfqsInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutRfqsInput, Prisma.CategoryUncheckedCreateWithoutRfqsInput>;
};
export type CategoryUpsertWithoutRfqsInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutRfqsInput, Prisma.CategoryUncheckedUpdateWithoutRfqsInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutRfqsInput, Prisma.CategoryUncheckedCreateWithoutRfqsInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutRfqsInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutRfqsInput, Prisma.CategoryUncheckedUpdateWithoutRfqsInput>;
};
export type CategoryUpdateWithoutRfqsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutRfqsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUncheckedUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUncheckedUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateWithoutMarginRulesInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutMarginRulesInput = {
    id?: string;
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    createdAt?: Date | string;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqUncheckedCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineUncheckedCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutMarginRulesInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutMarginRulesInput, Prisma.CategoryUncheckedCreateWithoutMarginRulesInput>;
};
export type CategoryUpsertWithoutMarginRulesInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutMarginRulesInput, Prisma.CategoryUncheckedUpdateWithoutMarginRulesInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutMarginRulesInput, Prisma.CategoryUncheckedCreateWithoutMarginRulesInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutMarginRulesInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutMarginRulesInput, Prisma.CategoryUncheckedUpdateWithoutMarginRulesInput>;
};
export type CategoryUpdateWithoutMarginRulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutMarginRulesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUncheckedUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUncheckedUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateWithoutProductionLinesInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleCreateNestedManyWithoutCategoryInput;
    capacityBookings?: Prisma.CapacityBookingCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutProductionLinesInput = {
    id?: string;
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    createdAt?: Date | string;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqUncheckedCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleUncheckedCreateNestedManyWithoutCategoryInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutCategoryInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutProductionLinesInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutProductionLinesInput, Prisma.CategoryUncheckedCreateWithoutProductionLinesInput>;
};
export type CategoryUpsertWithWhereUniqueWithoutProductionLinesInput = {
    where: Prisma.CategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutProductionLinesInput, Prisma.CategoryUncheckedUpdateWithoutProductionLinesInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutProductionLinesInput, Prisma.CategoryUncheckedCreateWithoutProductionLinesInput>;
};
export type CategoryUpdateWithWhereUniqueWithoutProductionLinesInput = {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutProductionLinesInput, Prisma.CategoryUncheckedUpdateWithoutProductionLinesInput>;
};
export type CategoryUpdateManyWithWhereWithoutProductionLinesInput = {
    where: Prisma.CategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyWithoutProductionLinesInput>;
};
export type CategoryCreateWithoutCapacityBookingsInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineCreateNestedManyWithoutCategoriesInput;
    capacityPartnerships?: Prisma.CapacityPartnershipCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutCapacityBookingsInput = {
    id?: string;
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    createdAt?: Date | string;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqUncheckedCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleUncheckedCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineUncheckedCreateNestedManyWithoutCategoriesInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutCapacityBookingsInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutCapacityBookingsInput, Prisma.CategoryUncheckedCreateWithoutCapacityBookingsInput>;
};
export type CategoryUpsertWithoutCapacityBookingsInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutCapacityBookingsInput, Prisma.CategoryUncheckedUpdateWithoutCapacityBookingsInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutCapacityBookingsInput, Prisma.CategoryUncheckedCreateWithoutCapacityBookingsInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutCapacityBookingsInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutCapacityBookingsInput, Prisma.CategoryUncheckedUpdateWithoutCapacityBookingsInput>;
};
export type CategoryUpdateWithoutCapacityBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUpdateManyWithoutCategoriesNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutCapacityBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUncheckedUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUncheckedUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUncheckedUpdateManyWithoutCategoriesNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateWithoutCapacityPartnershipsInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
    parent?: Prisma.CategoryCreateNestedOneWithoutChildrenInput;
    children?: Prisma.CategoryCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutCapacityPartnershipsInput = {
    id?: string;
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    createdAt?: Date | string;
    children?: Prisma.CategoryUncheckedCreateNestedManyWithoutParentInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    buyers?: Prisma.BuyerProfileUncheckedCreateNestedManyWithoutCategoriesInput;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutCategoryInput;
    rfqs?: Prisma.RfqUncheckedCreateNestedManyWithoutCategoryInput;
    marginRules?: Prisma.MarginRuleUncheckedCreateNestedManyWithoutCategoryInput;
    productionLines?: Prisma.ProductionLineUncheckedCreateNestedManyWithoutCategoriesInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutCapacityPartnershipsInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutCapacityPartnershipsInput, Prisma.CategoryUncheckedCreateWithoutCapacityPartnershipsInput>;
};
export type CategoryUpsertWithoutCapacityPartnershipsInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutCapacityPartnershipsInput, Prisma.CategoryUncheckedUpdateWithoutCapacityPartnershipsInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutCapacityPartnershipsInput, Prisma.CategoryUncheckedCreateWithoutCapacityPartnershipsInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutCapacityPartnershipsInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutCapacityPartnershipsInput, Prisma.CategoryUncheckedUpdateWithoutCapacityPartnershipsInput>;
};
export type CategoryUpdateWithoutCapacityPartnershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutCapacityPartnershipsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUncheckedUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUncheckedUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUncheckedUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUpdateWithoutBuyersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutBuyersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUncheckedUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUncheckedUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUncheckedUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateManyWithoutBuyersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryUpdateWithoutManufacturersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput;
    buyers?: Prisma.BuyerProfileUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutManufacturersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput;
    buyers?: Prisma.BuyerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUncheckedUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUncheckedUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUncheckedUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateManyWithoutManufacturersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryCreateManyParentInput = {
    id?: string;
    slug: string;
    name: string;
    sortOrder?: number;
    createdAt?: Date | string;
};
export type CategoryUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUncheckedUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUncheckedUpdateManyWithoutCategoryNestedInput;
    productionLines?: Prisma.ProductionLineUncheckedUpdateManyWithoutCategoriesNestedInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateManyWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryUpdateWithoutProductionLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.CategoryUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.CategoryUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUpdateManyWithoutCategoryNestedInput;
    capacityBookings?: Prisma.CapacityBookingUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutProductionLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.CategoryUncheckedUpdateManyWithoutParentNestedInput;
    manufacturers?: Prisma.ManufacturerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    buyers?: Prisma.BuyerProfileUncheckedUpdateManyWithoutCategoriesNestedInput;
    products?: Prisma.ProductUncheckedUpdateManyWithoutCategoryNestedInput;
    rfqs?: Prisma.RfqUncheckedUpdateManyWithoutCategoryNestedInput;
    marginRules?: Prisma.MarginRuleUncheckedUpdateManyWithoutCategoryNestedInput;
    capacityBookings?: Prisma.CapacityBookingUncheckedUpdateManyWithoutCategoryNestedInput;
    capacityPartnerships?: Prisma.CapacityPartnershipUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateManyWithoutProductionLinesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryCountOutputType = {
    children: number;
    manufacturers: number;
    buyers: number;
    products: number;
    rfqs: number;
    marginRules: number;
    productionLines: number;
    capacityBookings: number;
    capacityPartnerships: number;
};
export type CategoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    children?: boolean | CategoryCountOutputTypeCountChildrenArgs;
    manufacturers?: boolean | CategoryCountOutputTypeCountManufacturersArgs;
    buyers?: boolean | CategoryCountOutputTypeCountBuyersArgs;
    products?: boolean | CategoryCountOutputTypeCountProductsArgs;
    rfqs?: boolean | CategoryCountOutputTypeCountRfqsArgs;
    marginRules?: boolean | CategoryCountOutputTypeCountMarginRulesArgs;
    productionLines?: boolean | CategoryCountOutputTypeCountProductionLinesArgs;
    capacityBookings?: boolean | CategoryCountOutputTypeCountCapacityBookingsArgs;
    capacityPartnerships?: boolean | CategoryCountOutputTypeCountCapacityPartnershipsArgs;
};
export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryCountOutputTypeSelect<ExtArgs> | null;
};
export type CategoryCountOutputTypeCountChildrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
};
export type CategoryCountOutputTypeCountManufacturersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ManufacturerProfileWhereInput;
};
export type CategoryCountOutputTypeCountBuyersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BuyerProfileWhereInput;
};
export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
};
export type CategoryCountOutputTypeCountRfqsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqWhereInput;
};
export type CategoryCountOutputTypeCountMarginRulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MarginRuleWhereInput;
};
export type CategoryCountOutputTypeCountProductionLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionLineWhereInput;
};
export type CategoryCountOutputTypeCountCapacityBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacityBookingWhereInput;
};
export type CategoryCountOutputTypeCountCapacityPartnershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacityPartnershipWhereInput;
};
export type CategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    parentId?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs>;
    children?: boolean | Prisma.Category$childrenArgs<ExtArgs>;
    manufacturers?: boolean | Prisma.Category$manufacturersArgs<ExtArgs>;
    buyers?: boolean | Prisma.Category$buyersArgs<ExtArgs>;
    products?: boolean | Prisma.Category$productsArgs<ExtArgs>;
    rfqs?: boolean | Prisma.Category$rfqsArgs<ExtArgs>;
    marginRules?: boolean | Prisma.Category$marginRulesArgs<ExtArgs>;
    productionLines?: boolean | Prisma.Category$productionLinesArgs<ExtArgs>;
    capacityBookings?: boolean | Prisma.Category$capacityBookingsArgs<ExtArgs>;
    capacityPartnerships?: boolean | Prisma.Category$capacityPartnershipsArgs<ExtArgs>;
    _count?: boolean | Prisma.CategoryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["category"]>;
export type CategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    parentId?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs>;
}, ExtArgs["result"]["category"]>;
export type CategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    parentId?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs>;
}, ExtArgs["result"]["category"]>;
export type CategorySelectScalar = {
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    parentId?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
};
export type CategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "slug" | "name" | "parentId" | "sortOrder" | "createdAt", ExtArgs["result"]["category"]>;
export type CategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs>;
    children?: boolean | Prisma.Category$childrenArgs<ExtArgs>;
    manufacturers?: boolean | Prisma.Category$manufacturersArgs<ExtArgs>;
    buyers?: boolean | Prisma.Category$buyersArgs<ExtArgs>;
    products?: boolean | Prisma.Category$productsArgs<ExtArgs>;
    rfqs?: boolean | Prisma.Category$rfqsArgs<ExtArgs>;
    marginRules?: boolean | Prisma.Category$marginRulesArgs<ExtArgs>;
    productionLines?: boolean | Prisma.Category$productionLinesArgs<ExtArgs>;
    capacityBookings?: boolean | Prisma.Category$capacityBookingsArgs<ExtArgs>;
    capacityPartnerships?: boolean | Prisma.Category$capacityPartnershipsArgs<ExtArgs>;
    _count?: boolean | Prisma.CategoryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs>;
};
export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.Category$parentArgs<ExtArgs>;
};
export type $CategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Category";
    objects: {
        parent: Prisma.$CategoryPayload<ExtArgs> | null;
        children: Prisma.$CategoryPayload<ExtArgs>[];
        manufacturers: Prisma.$ManufacturerProfilePayload<ExtArgs>[];
        buyers: Prisma.$BuyerProfilePayload<ExtArgs>[];
        products: Prisma.$ProductPayload<ExtArgs>[];
        rfqs: Prisma.$RfqPayload<ExtArgs>[];
        marginRules: Prisma.$MarginRulePayload<ExtArgs>[];
        productionLines: Prisma.$ProductionLinePayload<ExtArgs>[];
        capacityBookings: Prisma.$CapacityBookingPayload<ExtArgs>[];
        capacityPartnerships: Prisma.$CapacityPartnershipPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        slug: string;
        name: string;
        parentId: string | null;
        sortOrder: number;
        createdAt: Date;
    }, ExtArgs["result"]["category"]>;
    composites: {};
};
export type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CategoryPayload, S>;
export type CategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CategoryCountAggregateInputType | true;
};
export interface CategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Category'];
        meta: {
            name: 'Category';
        };
    };
    findUnique<T extends CategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CategoryFindManyArgs>(args?: Prisma.SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CategoryCreateArgs>(args: Prisma.SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CategoryDeleteArgs>(args: Prisma.SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CategoryUpdateArgs>(args: Prisma.SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CategoryUpsertArgs>(args: Prisma.SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CategoryCountArgs>(args?: Prisma.Subset<T, CategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CategoryCountAggregateOutputType> : number>;
    aggregate<T extends CategoryAggregateArgs>(args: Prisma.Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>;
    groupBy<T extends CategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: CategoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CategoryFieldRefs;
}
export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    parent<T extends Prisma.Category$parentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$parentArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    children<T extends Prisma.Category$childrenArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    manufacturers<T extends Prisma.Category$manufacturersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$manufacturersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ManufacturerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    buyers<T extends Prisma.Category$buyersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$buyersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BuyerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    products<T extends Prisma.Category$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    rfqs<T extends Prisma.Category$rfqsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$rfqsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    marginRules<T extends Prisma.Category$marginRulesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$marginRulesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MarginRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    productionLines<T extends Prisma.Category$productionLinesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$productionLinesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    capacityBookings<T extends Prisma.Category$capacityBookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$capacityBookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacityBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    capacityPartnerships<T extends Prisma.Category$capacityPartnershipsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$capacityPartnershipsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacityPartnershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CategoryFieldRefs {
    readonly id: Prisma.FieldRef<"Category", 'String'>;
    readonly slug: Prisma.FieldRef<"Category", 'String'>;
    readonly name: Prisma.FieldRef<"Category", 'String'>;
    readonly parentId: Prisma.FieldRef<"Category", 'String'>;
    readonly sortOrder: Prisma.FieldRef<"Category", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Category", 'DateTime'>;
}
export type CategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryCreateInput, Prisma.CategoryUncheckedCreateInput>;
};
export type CategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CategoryCreateManyInput | Prisma.CategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    data: Prisma.CategoryCreateManyInput | Prisma.CategoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CategoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryUpdateInput, Prisma.CategoryUncheckedUpdateInput>;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyInput>;
    where?: Prisma.CategoryWhereInput;
    limit?: number;
};
export type CategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyInput>;
    where?: Prisma.CategoryWhereInput;
    limit?: number;
    include?: Prisma.CategoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateInput, Prisma.CategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CategoryUpdateInput, Prisma.CategoryUncheckedUpdateInput>;
};
export type CategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
    limit?: number;
};
export type Category$parentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
};
export type Category$childrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Category$manufacturersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerProfileSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerProfileOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerProfileInclude<ExtArgs> | null;
    where?: Prisma.ManufacturerProfileWhereInput;
    orderBy?: Prisma.ManufacturerProfileOrderByWithRelationInput | Prisma.ManufacturerProfileOrderByWithRelationInput[];
    cursor?: Prisma.ManufacturerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ManufacturerProfileScalarFieldEnum | Prisma.ManufacturerProfileScalarFieldEnum[];
};
export type Category$buyersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Category$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type Category$rfqsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqSelect<ExtArgs> | null;
    omit?: Prisma.RfqOmit<ExtArgs> | null;
    include?: Prisma.RfqInclude<ExtArgs> | null;
    where?: Prisma.RfqWhereInput;
    orderBy?: Prisma.RfqOrderByWithRelationInput | Prisma.RfqOrderByWithRelationInput[];
    cursor?: Prisma.RfqWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqScalarFieldEnum | Prisma.RfqScalarFieldEnum[];
};
export type Category$marginRulesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Category$productionLinesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductionLineSelect<ExtArgs> | null;
    omit?: Prisma.ProductionLineOmit<ExtArgs> | null;
    include?: Prisma.ProductionLineInclude<ExtArgs> | null;
    where?: Prisma.ProductionLineWhereInput;
    orderBy?: Prisma.ProductionLineOrderByWithRelationInput | Prisma.ProductionLineOrderByWithRelationInput[];
    cursor?: Prisma.ProductionLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductionLineScalarFieldEnum | Prisma.ProductionLineScalarFieldEnum[];
};
export type Category$capacityBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingInclude<ExtArgs> | null;
    where?: Prisma.CapacityBookingWhereInput;
    orderBy?: Prisma.CapacityBookingOrderByWithRelationInput | Prisma.CapacityBookingOrderByWithRelationInput[];
    cursor?: Prisma.CapacityBookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacityBookingScalarFieldEnum | Prisma.CapacityBookingScalarFieldEnum[];
};
export type Category$capacityPartnershipsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityPartnershipSelect<ExtArgs> | null;
    omit?: Prisma.CapacityPartnershipOmit<ExtArgs> | null;
    include?: Prisma.CapacityPartnershipInclude<ExtArgs> | null;
    where?: Prisma.CapacityPartnershipWhereInput;
    orderBy?: Prisma.CapacityPartnershipOrderByWithRelationInput | Prisma.CapacityPartnershipOrderByWithRelationInput[];
    cursor?: Prisma.CapacityPartnershipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacityPartnershipScalarFieldEnum | Prisma.CapacityPartnershipScalarFieldEnum[];
};
export type CategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
};
