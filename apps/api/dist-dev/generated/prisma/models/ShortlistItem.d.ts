import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ShortlistItemModel = runtime.Types.Result.DefaultSelection<Prisma.$ShortlistItemPayload>;
export type AggregateShortlistItem = {
    _count: ShortlistItemCountAggregateOutputType | null;
    _min: ShortlistItemMinAggregateOutputType | null;
    _max: ShortlistItemMaxAggregateOutputType | null;
};
export type ShortlistItemMinAggregateOutputType = {
    id: string | null;
    shortlistId: string | null;
    productId: string | null;
    manufacturerProfileId: string | null;
    note: string | null;
    createdAt: Date | null;
};
export type ShortlistItemMaxAggregateOutputType = {
    id: string | null;
    shortlistId: string | null;
    productId: string | null;
    manufacturerProfileId: string | null;
    note: string | null;
    createdAt: Date | null;
};
export type ShortlistItemCountAggregateOutputType = {
    id: number;
    shortlistId: number;
    productId: number;
    manufacturerProfileId: number;
    note: number;
    createdAt: number;
    _all: number;
};
export type ShortlistItemMinAggregateInputType = {
    id?: true;
    shortlistId?: true;
    productId?: true;
    manufacturerProfileId?: true;
    note?: true;
    createdAt?: true;
};
export type ShortlistItemMaxAggregateInputType = {
    id?: true;
    shortlistId?: true;
    productId?: true;
    manufacturerProfileId?: true;
    note?: true;
    createdAt?: true;
};
export type ShortlistItemCountAggregateInputType = {
    id?: true;
    shortlistId?: true;
    productId?: true;
    manufacturerProfileId?: true;
    note?: true;
    createdAt?: true;
    _all?: true;
};
export type ShortlistItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShortlistItemWhereInput;
    orderBy?: Prisma.ShortlistItemOrderByWithRelationInput | Prisma.ShortlistItemOrderByWithRelationInput[];
    cursor?: Prisma.ShortlistItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ShortlistItemCountAggregateInputType;
    _min?: ShortlistItemMinAggregateInputType;
    _max?: ShortlistItemMaxAggregateInputType;
};
export type GetShortlistItemAggregateType<T extends ShortlistItemAggregateArgs> = {
    [P in keyof T & keyof AggregateShortlistItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShortlistItem[P]> : Prisma.GetScalarType<T[P], AggregateShortlistItem[P]>;
};
export type ShortlistItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShortlistItemWhereInput;
    orderBy?: Prisma.ShortlistItemOrderByWithAggregationInput | Prisma.ShortlistItemOrderByWithAggregationInput[];
    by: Prisma.ShortlistItemScalarFieldEnum[] | Prisma.ShortlistItemScalarFieldEnum;
    having?: Prisma.ShortlistItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShortlistItemCountAggregateInputType | true;
    _min?: ShortlistItemMinAggregateInputType;
    _max?: ShortlistItemMaxAggregateInputType;
};
export type ShortlistItemGroupByOutputType = {
    id: string;
    shortlistId: string;
    productId: string | null;
    manufacturerProfileId: string | null;
    note: string | null;
    createdAt: Date;
    _count: ShortlistItemCountAggregateOutputType | null;
    _min: ShortlistItemMinAggregateOutputType | null;
    _max: ShortlistItemMaxAggregateOutputType | null;
};
export type GetShortlistItemGroupByPayload<T extends ShortlistItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ShortlistItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ShortlistItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ShortlistItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ShortlistItemGroupByOutputType[P]>;
}>>;
export type ShortlistItemWhereInput = {
    AND?: Prisma.ShortlistItemWhereInput | Prisma.ShortlistItemWhereInput[];
    OR?: Prisma.ShortlistItemWhereInput[];
    NOT?: Prisma.ShortlistItemWhereInput | Prisma.ShortlistItemWhereInput[];
    id?: Prisma.UuidFilter<"ShortlistItem"> | string;
    shortlistId?: Prisma.UuidFilter<"ShortlistItem"> | string;
    productId?: Prisma.UuidNullableFilter<"ShortlistItem"> | string | null;
    manufacturerProfileId?: Prisma.UuidNullableFilter<"ShortlistItem"> | string | null;
    note?: Prisma.StringNullableFilter<"ShortlistItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShortlistItem"> | Date | string;
    shortlist?: Prisma.XOR<Prisma.ShortlistScalarRelationFilter, Prisma.ShortlistWhereInput>;
    product?: Prisma.XOR<Prisma.ProductNullableScalarRelationFilter, Prisma.ProductWhereInput> | null;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileNullableScalarRelationFilter, Prisma.ManufacturerProfileWhereInput> | null;
};
export type ShortlistItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    shortlistId?: Prisma.SortOrder;
    productId?: Prisma.SortOrderInput | Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    shortlist?: Prisma.ShortlistOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    manufacturerProfile?: Prisma.ManufacturerProfileOrderByWithRelationInput;
};
export type ShortlistItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    shortlistId_productId?: Prisma.ShortlistItemShortlistIdProductIdCompoundUniqueInput;
    shortlistId_manufacturerProfileId?: Prisma.ShortlistItemShortlistIdManufacturerProfileIdCompoundUniqueInput;
    AND?: Prisma.ShortlistItemWhereInput | Prisma.ShortlistItemWhereInput[];
    OR?: Prisma.ShortlistItemWhereInput[];
    NOT?: Prisma.ShortlistItemWhereInput | Prisma.ShortlistItemWhereInput[];
    shortlistId?: Prisma.UuidFilter<"ShortlistItem"> | string;
    productId?: Prisma.UuidNullableFilter<"ShortlistItem"> | string | null;
    manufacturerProfileId?: Prisma.UuidNullableFilter<"ShortlistItem"> | string | null;
    note?: Prisma.StringNullableFilter<"ShortlistItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShortlistItem"> | Date | string;
    shortlist?: Prisma.XOR<Prisma.ShortlistScalarRelationFilter, Prisma.ShortlistWhereInput>;
    product?: Prisma.XOR<Prisma.ProductNullableScalarRelationFilter, Prisma.ProductWhereInput> | null;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileNullableScalarRelationFilter, Prisma.ManufacturerProfileWhereInput> | null;
}, "id" | "shortlistId_productId" | "shortlistId_manufacturerProfileId">;
export type ShortlistItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    shortlistId?: Prisma.SortOrder;
    productId?: Prisma.SortOrderInput | Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ShortlistItemCountOrderByAggregateInput;
    _max?: Prisma.ShortlistItemMaxOrderByAggregateInput;
    _min?: Prisma.ShortlistItemMinOrderByAggregateInput;
};
export type ShortlistItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.ShortlistItemScalarWhereWithAggregatesInput | Prisma.ShortlistItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.ShortlistItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ShortlistItemScalarWhereWithAggregatesInput | Prisma.ShortlistItemScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ShortlistItem"> | string;
    shortlistId?: Prisma.UuidWithAggregatesFilter<"ShortlistItem"> | string;
    productId?: Prisma.UuidNullableWithAggregatesFilter<"ShortlistItem"> | string | null;
    manufacturerProfileId?: Prisma.UuidNullableWithAggregatesFilter<"ShortlistItem"> | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"ShortlistItem"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ShortlistItem"> | Date | string;
};
export type ShortlistItemCreateInput = {
    id?: string;
    note?: string | null;
    createdAt?: Date | string;
    shortlist: Prisma.ShortlistCreateNestedOneWithoutItemsInput;
    product?: Prisma.ProductCreateNestedOneWithoutShortlistItemsInput;
    manufacturerProfile?: Prisma.ManufacturerProfileCreateNestedOneWithoutShortlistItemsInput;
};
export type ShortlistItemUncheckedCreateInput = {
    id?: string;
    shortlistId: string;
    productId?: string | null;
    manufacturerProfileId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ShortlistItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shortlist?: Prisma.ShortlistUpdateOneRequiredWithoutItemsNestedInput;
    product?: Prisma.ProductUpdateOneWithoutShortlistItemsNestedInput;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneWithoutShortlistItemsNestedInput;
};
export type ShortlistItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shortlistId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturerProfileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistItemCreateManyInput = {
    id?: string;
    shortlistId: string;
    productId?: string | null;
    manufacturerProfileId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ShortlistItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shortlistId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturerProfileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistItemListRelationFilter = {
    every?: Prisma.ShortlistItemWhereInput;
    some?: Prisma.ShortlistItemWhereInput;
    none?: Prisma.ShortlistItemWhereInput;
};
export type ShortlistItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ShortlistItemShortlistIdProductIdCompoundUniqueInput = {
    shortlistId: string;
    productId: string;
};
export type ShortlistItemShortlistIdManufacturerProfileIdCompoundUniqueInput = {
    shortlistId: string;
    manufacturerProfileId: string;
};
export type ShortlistItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shortlistId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShortlistItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shortlistId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShortlistItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shortlistId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShortlistItemCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutManufacturerProfileInput, Prisma.ShortlistItemUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ShortlistItemCreateWithoutManufacturerProfileInput[] | Prisma.ShortlistItemUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutManufacturerProfileInput | Prisma.ShortlistItemCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.ShortlistItemCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
};
export type ShortlistItemUncheckedCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutManufacturerProfileInput, Prisma.ShortlistItemUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ShortlistItemCreateWithoutManufacturerProfileInput[] | Prisma.ShortlistItemUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutManufacturerProfileInput | Prisma.ShortlistItemCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.ShortlistItemCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
};
export type ShortlistItemUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutManufacturerProfileInput, Prisma.ShortlistItemUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ShortlistItemCreateWithoutManufacturerProfileInput[] | Prisma.ShortlistItemUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutManufacturerProfileInput | Prisma.ShortlistItemCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.ShortlistItemUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ShortlistItemUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.ShortlistItemCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    disconnect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    delete?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    update?: Prisma.ShortlistItemUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ShortlistItemUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.ShortlistItemUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.ShortlistItemUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.ShortlistItemScalarWhereInput | Prisma.ShortlistItemScalarWhereInput[];
};
export type ShortlistItemUncheckedUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutManufacturerProfileInput, Prisma.ShortlistItemUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ShortlistItemCreateWithoutManufacturerProfileInput[] | Prisma.ShortlistItemUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutManufacturerProfileInput | Prisma.ShortlistItemCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.ShortlistItemUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ShortlistItemUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.ShortlistItemCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    disconnect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    delete?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    update?: Prisma.ShortlistItemUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ShortlistItemUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.ShortlistItemUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.ShortlistItemUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.ShortlistItemScalarWhereInput | Prisma.ShortlistItemScalarWhereInput[];
};
export type ShortlistItemCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutProductInput, Prisma.ShortlistItemUncheckedCreateWithoutProductInput> | Prisma.ShortlistItemCreateWithoutProductInput[] | Prisma.ShortlistItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutProductInput | Prisma.ShortlistItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ShortlistItemCreateManyProductInputEnvelope;
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
};
export type ShortlistItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutProductInput, Prisma.ShortlistItemUncheckedCreateWithoutProductInput> | Prisma.ShortlistItemCreateWithoutProductInput[] | Prisma.ShortlistItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutProductInput | Prisma.ShortlistItemCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ShortlistItemCreateManyProductInputEnvelope;
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
};
export type ShortlistItemUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutProductInput, Prisma.ShortlistItemUncheckedCreateWithoutProductInput> | Prisma.ShortlistItemCreateWithoutProductInput[] | Prisma.ShortlistItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutProductInput | Prisma.ShortlistItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ShortlistItemUpsertWithWhereUniqueWithoutProductInput | Prisma.ShortlistItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ShortlistItemCreateManyProductInputEnvelope;
    set?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    disconnect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    delete?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    update?: Prisma.ShortlistItemUpdateWithWhereUniqueWithoutProductInput | Prisma.ShortlistItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ShortlistItemUpdateManyWithWhereWithoutProductInput | Prisma.ShortlistItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ShortlistItemScalarWhereInput | Prisma.ShortlistItemScalarWhereInput[];
};
export type ShortlistItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutProductInput, Prisma.ShortlistItemUncheckedCreateWithoutProductInput> | Prisma.ShortlistItemCreateWithoutProductInput[] | Prisma.ShortlistItemUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutProductInput | Prisma.ShortlistItemCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ShortlistItemUpsertWithWhereUniqueWithoutProductInput | Prisma.ShortlistItemUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ShortlistItemCreateManyProductInputEnvelope;
    set?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    disconnect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    delete?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    update?: Prisma.ShortlistItemUpdateWithWhereUniqueWithoutProductInput | Prisma.ShortlistItemUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ShortlistItemUpdateManyWithWhereWithoutProductInput | Prisma.ShortlistItemUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ShortlistItemScalarWhereInput | Prisma.ShortlistItemScalarWhereInput[];
};
export type ShortlistItemCreateNestedManyWithoutShortlistInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutShortlistInput, Prisma.ShortlistItemUncheckedCreateWithoutShortlistInput> | Prisma.ShortlistItemCreateWithoutShortlistInput[] | Prisma.ShortlistItemUncheckedCreateWithoutShortlistInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutShortlistInput | Prisma.ShortlistItemCreateOrConnectWithoutShortlistInput[];
    createMany?: Prisma.ShortlistItemCreateManyShortlistInputEnvelope;
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
};
export type ShortlistItemUncheckedCreateNestedManyWithoutShortlistInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutShortlistInput, Prisma.ShortlistItemUncheckedCreateWithoutShortlistInput> | Prisma.ShortlistItemCreateWithoutShortlistInput[] | Prisma.ShortlistItemUncheckedCreateWithoutShortlistInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutShortlistInput | Prisma.ShortlistItemCreateOrConnectWithoutShortlistInput[];
    createMany?: Prisma.ShortlistItemCreateManyShortlistInputEnvelope;
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
};
export type ShortlistItemUpdateManyWithoutShortlistNestedInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutShortlistInput, Prisma.ShortlistItemUncheckedCreateWithoutShortlistInput> | Prisma.ShortlistItemCreateWithoutShortlistInput[] | Prisma.ShortlistItemUncheckedCreateWithoutShortlistInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutShortlistInput | Prisma.ShortlistItemCreateOrConnectWithoutShortlistInput[];
    upsert?: Prisma.ShortlistItemUpsertWithWhereUniqueWithoutShortlistInput | Prisma.ShortlistItemUpsertWithWhereUniqueWithoutShortlistInput[];
    createMany?: Prisma.ShortlistItemCreateManyShortlistInputEnvelope;
    set?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    disconnect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    delete?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    update?: Prisma.ShortlistItemUpdateWithWhereUniqueWithoutShortlistInput | Prisma.ShortlistItemUpdateWithWhereUniqueWithoutShortlistInput[];
    updateMany?: Prisma.ShortlistItemUpdateManyWithWhereWithoutShortlistInput | Prisma.ShortlistItemUpdateManyWithWhereWithoutShortlistInput[];
    deleteMany?: Prisma.ShortlistItemScalarWhereInput | Prisma.ShortlistItemScalarWhereInput[];
};
export type ShortlistItemUncheckedUpdateManyWithoutShortlistNestedInput = {
    create?: Prisma.XOR<Prisma.ShortlistItemCreateWithoutShortlistInput, Prisma.ShortlistItemUncheckedCreateWithoutShortlistInput> | Prisma.ShortlistItemCreateWithoutShortlistInput[] | Prisma.ShortlistItemUncheckedCreateWithoutShortlistInput[];
    connectOrCreate?: Prisma.ShortlistItemCreateOrConnectWithoutShortlistInput | Prisma.ShortlistItemCreateOrConnectWithoutShortlistInput[];
    upsert?: Prisma.ShortlistItemUpsertWithWhereUniqueWithoutShortlistInput | Prisma.ShortlistItemUpsertWithWhereUniqueWithoutShortlistInput[];
    createMany?: Prisma.ShortlistItemCreateManyShortlistInputEnvelope;
    set?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    disconnect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    delete?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    connect?: Prisma.ShortlistItemWhereUniqueInput | Prisma.ShortlistItemWhereUniqueInput[];
    update?: Prisma.ShortlistItemUpdateWithWhereUniqueWithoutShortlistInput | Prisma.ShortlistItemUpdateWithWhereUniqueWithoutShortlistInput[];
    updateMany?: Prisma.ShortlistItemUpdateManyWithWhereWithoutShortlistInput | Prisma.ShortlistItemUpdateManyWithWhereWithoutShortlistInput[];
    deleteMany?: Prisma.ShortlistItemScalarWhereInput | Prisma.ShortlistItemScalarWhereInput[];
};
export type ShortlistItemCreateWithoutManufacturerProfileInput = {
    id?: string;
    note?: string | null;
    createdAt?: Date | string;
    shortlist: Prisma.ShortlistCreateNestedOneWithoutItemsInput;
    product?: Prisma.ProductCreateNestedOneWithoutShortlistItemsInput;
};
export type ShortlistItemUncheckedCreateWithoutManufacturerProfileInput = {
    id?: string;
    shortlistId: string;
    productId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ShortlistItemCreateOrConnectWithoutManufacturerProfileInput = {
    where: Prisma.ShortlistItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShortlistItemCreateWithoutManufacturerProfileInput, Prisma.ShortlistItemUncheckedCreateWithoutManufacturerProfileInput>;
};
export type ShortlistItemCreateManyManufacturerProfileInputEnvelope = {
    data: Prisma.ShortlistItemCreateManyManufacturerProfileInput | Prisma.ShortlistItemCreateManyManufacturerProfileInput[];
    skipDuplicates?: boolean;
};
export type ShortlistItemUpsertWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.ShortlistItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShortlistItemUpdateWithoutManufacturerProfileInput, Prisma.ShortlistItemUncheckedUpdateWithoutManufacturerProfileInput>;
    create: Prisma.XOR<Prisma.ShortlistItemCreateWithoutManufacturerProfileInput, Prisma.ShortlistItemUncheckedCreateWithoutManufacturerProfileInput>;
};
export type ShortlistItemUpdateWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.ShortlistItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShortlistItemUpdateWithoutManufacturerProfileInput, Prisma.ShortlistItemUncheckedUpdateWithoutManufacturerProfileInput>;
};
export type ShortlistItemUpdateManyWithWhereWithoutManufacturerProfileInput = {
    where: Prisma.ShortlistItemScalarWhereInput;
    data: Prisma.XOR<Prisma.ShortlistItemUpdateManyMutationInput, Prisma.ShortlistItemUncheckedUpdateManyWithoutManufacturerProfileInput>;
};
export type ShortlistItemScalarWhereInput = {
    AND?: Prisma.ShortlistItemScalarWhereInput | Prisma.ShortlistItemScalarWhereInput[];
    OR?: Prisma.ShortlistItemScalarWhereInput[];
    NOT?: Prisma.ShortlistItemScalarWhereInput | Prisma.ShortlistItemScalarWhereInput[];
    id?: Prisma.UuidFilter<"ShortlistItem"> | string;
    shortlistId?: Prisma.UuidFilter<"ShortlistItem"> | string;
    productId?: Prisma.UuidNullableFilter<"ShortlistItem"> | string | null;
    manufacturerProfileId?: Prisma.UuidNullableFilter<"ShortlistItem"> | string | null;
    note?: Prisma.StringNullableFilter<"ShortlistItem"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShortlistItem"> | Date | string;
};
export type ShortlistItemCreateWithoutProductInput = {
    id?: string;
    note?: string | null;
    createdAt?: Date | string;
    shortlist: Prisma.ShortlistCreateNestedOneWithoutItemsInput;
    manufacturerProfile?: Prisma.ManufacturerProfileCreateNestedOneWithoutShortlistItemsInput;
};
export type ShortlistItemUncheckedCreateWithoutProductInput = {
    id?: string;
    shortlistId: string;
    manufacturerProfileId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ShortlistItemCreateOrConnectWithoutProductInput = {
    where: Prisma.ShortlistItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShortlistItemCreateWithoutProductInput, Prisma.ShortlistItemUncheckedCreateWithoutProductInput>;
};
export type ShortlistItemCreateManyProductInputEnvelope = {
    data: Prisma.ShortlistItemCreateManyProductInput | Prisma.ShortlistItemCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ShortlistItemUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ShortlistItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShortlistItemUpdateWithoutProductInput, Prisma.ShortlistItemUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ShortlistItemCreateWithoutProductInput, Prisma.ShortlistItemUncheckedCreateWithoutProductInput>;
};
export type ShortlistItemUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ShortlistItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShortlistItemUpdateWithoutProductInput, Prisma.ShortlistItemUncheckedUpdateWithoutProductInput>;
};
export type ShortlistItemUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ShortlistItemScalarWhereInput;
    data: Prisma.XOR<Prisma.ShortlistItemUpdateManyMutationInput, Prisma.ShortlistItemUncheckedUpdateManyWithoutProductInput>;
};
export type ShortlistItemCreateWithoutShortlistInput = {
    id?: string;
    note?: string | null;
    createdAt?: Date | string;
    product?: Prisma.ProductCreateNestedOneWithoutShortlistItemsInput;
    manufacturerProfile?: Prisma.ManufacturerProfileCreateNestedOneWithoutShortlistItemsInput;
};
export type ShortlistItemUncheckedCreateWithoutShortlistInput = {
    id?: string;
    productId?: string | null;
    manufacturerProfileId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ShortlistItemCreateOrConnectWithoutShortlistInput = {
    where: Prisma.ShortlistItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShortlistItemCreateWithoutShortlistInput, Prisma.ShortlistItemUncheckedCreateWithoutShortlistInput>;
};
export type ShortlistItemCreateManyShortlistInputEnvelope = {
    data: Prisma.ShortlistItemCreateManyShortlistInput | Prisma.ShortlistItemCreateManyShortlistInput[];
    skipDuplicates?: boolean;
};
export type ShortlistItemUpsertWithWhereUniqueWithoutShortlistInput = {
    where: Prisma.ShortlistItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShortlistItemUpdateWithoutShortlistInput, Prisma.ShortlistItemUncheckedUpdateWithoutShortlistInput>;
    create: Prisma.XOR<Prisma.ShortlistItemCreateWithoutShortlistInput, Prisma.ShortlistItemUncheckedCreateWithoutShortlistInput>;
};
export type ShortlistItemUpdateWithWhereUniqueWithoutShortlistInput = {
    where: Prisma.ShortlistItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShortlistItemUpdateWithoutShortlistInput, Prisma.ShortlistItemUncheckedUpdateWithoutShortlistInput>;
};
export type ShortlistItemUpdateManyWithWhereWithoutShortlistInput = {
    where: Prisma.ShortlistItemScalarWhereInput;
    data: Prisma.XOR<Prisma.ShortlistItemUpdateManyMutationInput, Prisma.ShortlistItemUncheckedUpdateManyWithoutShortlistInput>;
};
export type ShortlistItemCreateManyManufacturerProfileInput = {
    id?: string;
    shortlistId: string;
    productId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ShortlistItemUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shortlist?: Prisma.ShortlistUpdateOneRequiredWithoutItemsNestedInput;
    product?: Prisma.ProductUpdateOneWithoutShortlistItemsNestedInput;
};
export type ShortlistItemUncheckedUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shortlistId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistItemUncheckedUpdateManyWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shortlistId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistItemCreateManyProductInput = {
    id?: string;
    shortlistId: string;
    manufacturerProfileId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ShortlistItemUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shortlist?: Prisma.ShortlistUpdateOneRequiredWithoutItemsNestedInput;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneWithoutShortlistItemsNestedInput;
};
export type ShortlistItemUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shortlistId?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistItemUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shortlistId?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistItemCreateManyShortlistInput = {
    id?: string;
    productId?: string | null;
    manufacturerProfileId?: string | null;
    note?: string | null;
    createdAt?: Date | string;
};
export type ShortlistItemUpdateWithoutShortlistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneWithoutShortlistItemsNestedInput;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneWithoutShortlistItemsNestedInput;
};
export type ShortlistItemUncheckedUpdateWithoutShortlistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturerProfileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistItemUncheckedUpdateManyWithoutShortlistInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturerProfileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shortlistId?: boolean;
    productId?: boolean;
    manufacturerProfileId?: boolean;
    note?: boolean;
    createdAt?: boolean;
    shortlist?: boolean | Prisma.ShortlistDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ShortlistItem$productArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ShortlistItem$manufacturerProfileArgs<ExtArgs>;
}, ExtArgs["result"]["shortlistItem"]>;
export type ShortlistItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shortlistId?: boolean;
    productId?: boolean;
    manufacturerProfileId?: boolean;
    note?: boolean;
    createdAt?: boolean;
    shortlist?: boolean | Prisma.ShortlistDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ShortlistItem$productArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ShortlistItem$manufacturerProfileArgs<ExtArgs>;
}, ExtArgs["result"]["shortlistItem"]>;
export type ShortlistItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shortlistId?: boolean;
    productId?: boolean;
    manufacturerProfileId?: boolean;
    note?: boolean;
    createdAt?: boolean;
    shortlist?: boolean | Prisma.ShortlistDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ShortlistItem$productArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ShortlistItem$manufacturerProfileArgs<ExtArgs>;
}, ExtArgs["result"]["shortlistItem"]>;
export type ShortlistItemSelectScalar = {
    id?: boolean;
    shortlistId?: boolean;
    productId?: boolean;
    manufacturerProfileId?: boolean;
    note?: boolean;
    createdAt?: boolean;
};
export type ShortlistItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "shortlistId" | "productId" | "manufacturerProfileId" | "note" | "createdAt", ExtArgs["result"]["shortlistItem"]>;
export type ShortlistItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shortlist?: boolean | Prisma.ShortlistDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ShortlistItem$productArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ShortlistItem$manufacturerProfileArgs<ExtArgs>;
};
export type ShortlistItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shortlist?: boolean | Prisma.ShortlistDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ShortlistItem$productArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ShortlistItem$manufacturerProfileArgs<ExtArgs>;
};
export type ShortlistItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shortlist?: boolean | Prisma.ShortlistDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ShortlistItem$productArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ShortlistItem$manufacturerProfileArgs<ExtArgs>;
};
export type $ShortlistItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ShortlistItem";
    objects: {
        shortlist: Prisma.$ShortlistPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs> | null;
        manufacturerProfile: Prisma.$ManufacturerProfilePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        shortlistId: string;
        productId: string | null;
        manufacturerProfileId: string | null;
        note: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["shortlistItem"]>;
    composites: {};
};
export type ShortlistItemGetPayload<S extends boolean | null | undefined | ShortlistItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload, S>;
export type ShortlistItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ShortlistItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ShortlistItemCountAggregateInputType | true;
};
export interface ShortlistItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ShortlistItem'];
        meta: {
            name: 'ShortlistItem';
        };
    };
    findUnique<T extends ShortlistItemFindUniqueArgs>(args: Prisma.SelectSubset<T, ShortlistItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ShortlistItemClient<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ShortlistItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ShortlistItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShortlistItemClient<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ShortlistItemFindFirstArgs>(args?: Prisma.SelectSubset<T, ShortlistItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__ShortlistItemClient<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ShortlistItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ShortlistItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShortlistItemClient<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ShortlistItemFindManyArgs>(args?: Prisma.SelectSubset<T, ShortlistItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ShortlistItemCreateArgs>(args: Prisma.SelectSubset<T, ShortlistItemCreateArgs<ExtArgs>>): Prisma.Prisma__ShortlistItemClient<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ShortlistItemCreateManyArgs>(args?: Prisma.SelectSubset<T, ShortlistItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ShortlistItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ShortlistItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ShortlistItemDeleteArgs>(args: Prisma.SelectSubset<T, ShortlistItemDeleteArgs<ExtArgs>>): Prisma.Prisma__ShortlistItemClient<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ShortlistItemUpdateArgs>(args: Prisma.SelectSubset<T, ShortlistItemUpdateArgs<ExtArgs>>): Prisma.Prisma__ShortlistItemClient<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ShortlistItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, ShortlistItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ShortlistItemUpdateManyArgs>(args: Prisma.SelectSubset<T, ShortlistItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ShortlistItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ShortlistItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ShortlistItemUpsertArgs>(args: Prisma.SelectSubset<T, ShortlistItemUpsertArgs<ExtArgs>>): Prisma.Prisma__ShortlistItemClient<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ShortlistItemCountArgs>(args?: Prisma.Subset<T, ShortlistItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ShortlistItemCountAggregateOutputType> : number>;
    aggregate<T extends ShortlistItemAggregateArgs>(args: Prisma.Subset<T, ShortlistItemAggregateArgs>): Prisma.PrismaPromise<GetShortlistItemAggregateType<T>>;
    groupBy<T extends ShortlistItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ShortlistItemGroupByArgs['orderBy'];
    } : {
        orderBy?: ShortlistItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ShortlistItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShortlistItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ShortlistItemFieldRefs;
}
export interface Prisma__ShortlistItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shortlist<T extends Prisma.ShortlistDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShortlistDefaultArgs<ExtArgs>>): Prisma.Prisma__ShortlistClient<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ShortlistItem$productArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShortlistItem$productArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    manufacturerProfile<T extends Prisma.ShortlistItem$manufacturerProfileArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShortlistItem$manufacturerProfileArgs<ExtArgs>>): Prisma.Prisma__ManufacturerProfileClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ShortlistItemFieldRefs {
    readonly id: Prisma.FieldRef<"ShortlistItem", 'String'>;
    readonly shortlistId: Prisma.FieldRef<"ShortlistItem", 'String'>;
    readonly productId: Prisma.FieldRef<"ShortlistItem", 'String'>;
    readonly manufacturerProfileId: Prisma.FieldRef<"ShortlistItem", 'String'>;
    readonly note: Prisma.FieldRef<"ShortlistItem", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ShortlistItem", 'DateTime'>;
}
export type ShortlistItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    include?: Prisma.ShortlistItemInclude<ExtArgs> | null;
    where: Prisma.ShortlistItemWhereUniqueInput;
};
export type ShortlistItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    include?: Prisma.ShortlistItemInclude<ExtArgs> | null;
    where: Prisma.ShortlistItemWhereUniqueInput;
};
export type ShortlistItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    include?: Prisma.ShortlistItemInclude<ExtArgs> | null;
    where?: Prisma.ShortlistItemWhereInput;
    orderBy?: Prisma.ShortlistItemOrderByWithRelationInput | Prisma.ShortlistItemOrderByWithRelationInput[];
    cursor?: Prisma.ShortlistItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShortlistItemScalarFieldEnum | Prisma.ShortlistItemScalarFieldEnum[];
};
export type ShortlistItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    include?: Prisma.ShortlistItemInclude<ExtArgs> | null;
    where?: Prisma.ShortlistItemWhereInput;
    orderBy?: Prisma.ShortlistItemOrderByWithRelationInput | Prisma.ShortlistItemOrderByWithRelationInput[];
    cursor?: Prisma.ShortlistItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShortlistItemScalarFieldEnum | Prisma.ShortlistItemScalarFieldEnum[];
};
export type ShortlistItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    include?: Prisma.ShortlistItemInclude<ExtArgs> | null;
    where?: Prisma.ShortlistItemWhereInput;
    orderBy?: Prisma.ShortlistItemOrderByWithRelationInput | Prisma.ShortlistItemOrderByWithRelationInput[];
    cursor?: Prisma.ShortlistItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShortlistItemScalarFieldEnum | Prisma.ShortlistItemScalarFieldEnum[];
};
export type ShortlistItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    include?: Prisma.ShortlistItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShortlistItemCreateInput, Prisma.ShortlistItemUncheckedCreateInput>;
};
export type ShortlistItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ShortlistItemCreateManyInput | Prisma.ShortlistItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ShortlistItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    data: Prisma.ShortlistItemCreateManyInput | Prisma.ShortlistItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ShortlistItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ShortlistItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    include?: Prisma.ShortlistItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShortlistItemUpdateInput, Prisma.ShortlistItemUncheckedUpdateInput>;
    where: Prisma.ShortlistItemWhereUniqueInput;
};
export type ShortlistItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ShortlistItemUpdateManyMutationInput, Prisma.ShortlistItemUncheckedUpdateManyInput>;
    where?: Prisma.ShortlistItemWhereInput;
    limit?: number;
};
export type ShortlistItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShortlistItemUpdateManyMutationInput, Prisma.ShortlistItemUncheckedUpdateManyInput>;
    where?: Prisma.ShortlistItemWhereInput;
    limit?: number;
    include?: Prisma.ShortlistItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ShortlistItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    include?: Prisma.ShortlistItemInclude<ExtArgs> | null;
    where: Prisma.ShortlistItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShortlistItemCreateInput, Prisma.ShortlistItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ShortlistItemUpdateInput, Prisma.ShortlistItemUncheckedUpdateInput>;
};
export type ShortlistItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    include?: Prisma.ShortlistItemInclude<ExtArgs> | null;
    where: Prisma.ShortlistItemWhereUniqueInput;
};
export type ShortlistItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShortlistItemWhereInput;
    limit?: number;
};
export type ShortlistItem$productArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
};
export type ShortlistItem$manufacturerProfileArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ManufacturerProfileSelect<ExtArgs> | null;
    omit?: Prisma.ManufacturerProfileOmit<ExtArgs> | null;
    include?: Prisma.ManufacturerProfileInclude<ExtArgs> | null;
    where?: Prisma.ManufacturerProfileWhereInput;
};
export type ShortlistItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistItemSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistItemOmit<ExtArgs> | null;
    include?: Prisma.ShortlistItemInclude<ExtArgs> | null;
};
