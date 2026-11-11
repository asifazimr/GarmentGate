import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ShortlistModel = runtime.Types.Result.DefaultSelection<Prisma.$ShortlistPayload>;
export type AggregateShortlist = {
    _count: ShortlistCountAggregateOutputType | null;
    _min: ShortlistMinAggregateOutputType | null;
    _max: ShortlistMaxAggregateOutputType | null;
};
export type ShortlistMinAggregateOutputType = {
    id: string | null;
    companyId: string | null;
    name: string | null;
    isDefault: boolean | null;
    createdById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ShortlistMaxAggregateOutputType = {
    id: string | null;
    companyId: string | null;
    name: string | null;
    isDefault: boolean | null;
    createdById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ShortlistCountAggregateOutputType = {
    id: number;
    companyId: number;
    name: number;
    isDefault: number;
    createdById: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ShortlistMinAggregateInputType = {
    id?: true;
    companyId?: true;
    name?: true;
    isDefault?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ShortlistMaxAggregateInputType = {
    id?: true;
    companyId?: true;
    name?: true;
    isDefault?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ShortlistCountAggregateInputType = {
    id?: true;
    companyId?: true;
    name?: true;
    isDefault?: true;
    createdById?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ShortlistAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShortlistWhereInput;
    orderBy?: Prisma.ShortlistOrderByWithRelationInput | Prisma.ShortlistOrderByWithRelationInput[];
    cursor?: Prisma.ShortlistWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ShortlistCountAggregateInputType;
    _min?: ShortlistMinAggregateInputType;
    _max?: ShortlistMaxAggregateInputType;
};
export type GetShortlistAggregateType<T extends ShortlistAggregateArgs> = {
    [P in keyof T & keyof AggregateShortlist]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShortlist[P]> : Prisma.GetScalarType<T[P], AggregateShortlist[P]>;
};
export type ShortlistGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShortlistWhereInput;
    orderBy?: Prisma.ShortlistOrderByWithAggregationInput | Prisma.ShortlistOrderByWithAggregationInput[];
    by: Prisma.ShortlistScalarFieldEnum[] | Prisma.ShortlistScalarFieldEnum;
    having?: Prisma.ShortlistScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShortlistCountAggregateInputType | true;
    _min?: ShortlistMinAggregateInputType;
    _max?: ShortlistMaxAggregateInputType;
};
export type ShortlistGroupByOutputType = {
    id: string;
    companyId: string;
    name: string;
    isDefault: boolean;
    createdById: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ShortlistCountAggregateOutputType | null;
    _min: ShortlistMinAggregateOutputType | null;
    _max: ShortlistMaxAggregateOutputType | null;
};
export type GetShortlistGroupByPayload<T extends ShortlistGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ShortlistGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ShortlistGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ShortlistGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ShortlistGroupByOutputType[P]>;
}>>;
export type ShortlistWhereInput = {
    AND?: Prisma.ShortlistWhereInput | Prisma.ShortlistWhereInput[];
    OR?: Prisma.ShortlistWhereInput[];
    NOT?: Prisma.ShortlistWhereInput | Prisma.ShortlistWhereInput[];
    id?: Prisma.UuidFilter<"Shortlist"> | string;
    companyId?: Prisma.UuidFilter<"Shortlist"> | string;
    name?: Prisma.StringFilter<"Shortlist"> | string;
    isDefault?: Prisma.BoolFilter<"Shortlist"> | boolean;
    createdById?: Prisma.UuidNullableFilter<"Shortlist"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Shortlist"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Shortlist"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    items?: Prisma.ShortlistItemListRelationFilter;
};
export type ShortlistOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    company?: Prisma.CompanyOrderByWithRelationInput;
    items?: Prisma.ShortlistItemOrderByRelationAggregateInput;
};
export type ShortlistWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    companyId_name?: Prisma.ShortlistCompanyIdNameCompoundUniqueInput;
    AND?: Prisma.ShortlistWhereInput | Prisma.ShortlistWhereInput[];
    OR?: Prisma.ShortlistWhereInput[];
    NOT?: Prisma.ShortlistWhereInput | Prisma.ShortlistWhereInput[];
    companyId?: Prisma.UuidFilter<"Shortlist"> | string;
    name?: Prisma.StringFilter<"Shortlist"> | string;
    isDefault?: Prisma.BoolFilter<"Shortlist"> | boolean;
    createdById?: Prisma.UuidNullableFilter<"Shortlist"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Shortlist"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Shortlist"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    items?: Prisma.ShortlistItemListRelationFilter;
}, "id" | "companyId_name">;
export type ShortlistOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ShortlistCountOrderByAggregateInput;
    _max?: Prisma.ShortlistMaxOrderByAggregateInput;
    _min?: Prisma.ShortlistMinOrderByAggregateInput;
};
export type ShortlistScalarWhereWithAggregatesInput = {
    AND?: Prisma.ShortlistScalarWhereWithAggregatesInput | Prisma.ShortlistScalarWhereWithAggregatesInput[];
    OR?: Prisma.ShortlistScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ShortlistScalarWhereWithAggregatesInput | Prisma.ShortlistScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Shortlist"> | string;
    companyId?: Prisma.UuidWithAggregatesFilter<"Shortlist"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Shortlist"> | string;
    isDefault?: Prisma.BoolWithAggregatesFilter<"Shortlist"> | boolean;
    createdById?: Prisma.UuidNullableWithAggregatesFilter<"Shortlist"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Shortlist"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Shortlist"> | Date | string;
};
export type ShortlistCreateInput = {
    id?: string;
    name: string;
    isDefault?: boolean;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutShortlistsInput;
    items?: Prisma.ShortlistItemCreateNestedManyWithoutShortlistInput;
};
export type ShortlistUncheckedCreateInput = {
    id?: string;
    companyId: string;
    name: string;
    isDefault?: boolean;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ShortlistItemUncheckedCreateNestedManyWithoutShortlistInput;
};
export type ShortlistUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutShortlistsNestedInput;
    items?: Prisma.ShortlistItemUpdateManyWithoutShortlistNestedInput;
};
export type ShortlistUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ShortlistItemUncheckedUpdateManyWithoutShortlistNestedInput;
};
export type ShortlistCreateManyInput = {
    id?: string;
    companyId: string;
    name: string;
    isDefault?: boolean;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ShortlistUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistListRelationFilter = {
    every?: Prisma.ShortlistWhereInput;
    some?: Prisma.ShortlistWhereInput;
    none?: Prisma.ShortlistWhereInput;
};
export type ShortlistOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ShortlistCompanyIdNameCompoundUniqueInput = {
    companyId: string;
    name: string;
};
export type ShortlistCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ShortlistMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ShortlistMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isDefault?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ShortlistScalarRelationFilter = {
    is?: Prisma.ShortlistWhereInput;
    isNot?: Prisma.ShortlistWhereInput;
};
export type ShortlistCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.ShortlistCreateWithoutCompanyInput, Prisma.ShortlistUncheckedCreateWithoutCompanyInput> | Prisma.ShortlistCreateWithoutCompanyInput[] | Prisma.ShortlistUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ShortlistCreateOrConnectWithoutCompanyInput | Prisma.ShortlistCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.ShortlistCreateManyCompanyInputEnvelope;
    connect?: Prisma.ShortlistWhereUniqueInput | Prisma.ShortlistWhereUniqueInput[];
};
export type ShortlistUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.ShortlistCreateWithoutCompanyInput, Prisma.ShortlistUncheckedCreateWithoutCompanyInput> | Prisma.ShortlistCreateWithoutCompanyInput[] | Prisma.ShortlistUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ShortlistCreateOrConnectWithoutCompanyInput | Prisma.ShortlistCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.ShortlistCreateManyCompanyInputEnvelope;
    connect?: Prisma.ShortlistWhereUniqueInput | Prisma.ShortlistWhereUniqueInput[];
};
export type ShortlistUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ShortlistCreateWithoutCompanyInput, Prisma.ShortlistUncheckedCreateWithoutCompanyInput> | Prisma.ShortlistCreateWithoutCompanyInput[] | Prisma.ShortlistUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ShortlistCreateOrConnectWithoutCompanyInput | Prisma.ShortlistCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.ShortlistUpsertWithWhereUniqueWithoutCompanyInput | Prisma.ShortlistUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.ShortlistCreateManyCompanyInputEnvelope;
    set?: Prisma.ShortlistWhereUniqueInput | Prisma.ShortlistWhereUniqueInput[];
    disconnect?: Prisma.ShortlistWhereUniqueInput | Prisma.ShortlistWhereUniqueInput[];
    delete?: Prisma.ShortlistWhereUniqueInput | Prisma.ShortlistWhereUniqueInput[];
    connect?: Prisma.ShortlistWhereUniqueInput | Prisma.ShortlistWhereUniqueInput[];
    update?: Prisma.ShortlistUpdateWithWhereUniqueWithoutCompanyInput | Prisma.ShortlistUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.ShortlistUpdateManyWithWhereWithoutCompanyInput | Prisma.ShortlistUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.ShortlistScalarWhereInput | Prisma.ShortlistScalarWhereInput[];
};
export type ShortlistUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ShortlistCreateWithoutCompanyInput, Prisma.ShortlistUncheckedCreateWithoutCompanyInput> | Prisma.ShortlistCreateWithoutCompanyInput[] | Prisma.ShortlistUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ShortlistCreateOrConnectWithoutCompanyInput | Prisma.ShortlistCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.ShortlistUpsertWithWhereUniqueWithoutCompanyInput | Prisma.ShortlistUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.ShortlistCreateManyCompanyInputEnvelope;
    set?: Prisma.ShortlistWhereUniqueInput | Prisma.ShortlistWhereUniqueInput[];
    disconnect?: Prisma.ShortlistWhereUniqueInput | Prisma.ShortlistWhereUniqueInput[];
    delete?: Prisma.ShortlistWhereUniqueInput | Prisma.ShortlistWhereUniqueInput[];
    connect?: Prisma.ShortlistWhereUniqueInput | Prisma.ShortlistWhereUniqueInput[];
    update?: Prisma.ShortlistUpdateWithWhereUniqueWithoutCompanyInput | Prisma.ShortlistUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.ShortlistUpdateManyWithWhereWithoutCompanyInput | Prisma.ShortlistUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.ShortlistScalarWhereInput | Prisma.ShortlistScalarWhereInput[];
};
export type ShortlistCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.ShortlistCreateWithoutItemsInput, Prisma.ShortlistUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.ShortlistCreateOrConnectWithoutItemsInput;
    connect?: Prisma.ShortlistWhereUniqueInput;
};
export type ShortlistUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.ShortlistCreateWithoutItemsInput, Prisma.ShortlistUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.ShortlistCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.ShortlistUpsertWithoutItemsInput;
    connect?: Prisma.ShortlistWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ShortlistUpdateToOneWithWhereWithoutItemsInput, Prisma.ShortlistUpdateWithoutItemsInput>, Prisma.ShortlistUncheckedUpdateWithoutItemsInput>;
};
export type ShortlistCreateWithoutCompanyInput = {
    id?: string;
    name: string;
    isDefault?: boolean;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ShortlistItemCreateNestedManyWithoutShortlistInput;
};
export type ShortlistUncheckedCreateWithoutCompanyInput = {
    id?: string;
    name: string;
    isDefault?: boolean;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ShortlistItemUncheckedCreateNestedManyWithoutShortlistInput;
};
export type ShortlistCreateOrConnectWithoutCompanyInput = {
    where: Prisma.ShortlistWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShortlistCreateWithoutCompanyInput, Prisma.ShortlistUncheckedCreateWithoutCompanyInput>;
};
export type ShortlistCreateManyCompanyInputEnvelope = {
    data: Prisma.ShortlistCreateManyCompanyInput | Prisma.ShortlistCreateManyCompanyInput[];
    skipDuplicates?: boolean;
};
export type ShortlistUpsertWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.ShortlistWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShortlistUpdateWithoutCompanyInput, Prisma.ShortlistUncheckedUpdateWithoutCompanyInput>;
    create: Prisma.XOR<Prisma.ShortlistCreateWithoutCompanyInput, Prisma.ShortlistUncheckedCreateWithoutCompanyInput>;
};
export type ShortlistUpdateWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.ShortlistWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShortlistUpdateWithoutCompanyInput, Prisma.ShortlistUncheckedUpdateWithoutCompanyInput>;
};
export type ShortlistUpdateManyWithWhereWithoutCompanyInput = {
    where: Prisma.ShortlistScalarWhereInput;
    data: Prisma.XOR<Prisma.ShortlistUpdateManyMutationInput, Prisma.ShortlistUncheckedUpdateManyWithoutCompanyInput>;
};
export type ShortlistScalarWhereInput = {
    AND?: Prisma.ShortlistScalarWhereInput | Prisma.ShortlistScalarWhereInput[];
    OR?: Prisma.ShortlistScalarWhereInput[];
    NOT?: Prisma.ShortlistScalarWhereInput | Prisma.ShortlistScalarWhereInput[];
    id?: Prisma.UuidFilter<"Shortlist"> | string;
    companyId?: Prisma.UuidFilter<"Shortlist"> | string;
    name?: Prisma.StringFilter<"Shortlist"> | string;
    isDefault?: Prisma.BoolFilter<"Shortlist"> | boolean;
    createdById?: Prisma.UuidNullableFilter<"Shortlist"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Shortlist"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Shortlist"> | Date | string;
};
export type ShortlistCreateWithoutItemsInput = {
    id?: string;
    name: string;
    isDefault?: boolean;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutShortlistsInput;
};
export type ShortlistUncheckedCreateWithoutItemsInput = {
    id?: string;
    companyId: string;
    name: string;
    isDefault?: boolean;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ShortlistCreateOrConnectWithoutItemsInput = {
    where: Prisma.ShortlistWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShortlistCreateWithoutItemsInput, Prisma.ShortlistUncheckedCreateWithoutItemsInput>;
};
export type ShortlistUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.ShortlistUpdateWithoutItemsInput, Prisma.ShortlistUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.ShortlistCreateWithoutItemsInput, Prisma.ShortlistUncheckedCreateWithoutItemsInput>;
    where?: Prisma.ShortlistWhereInput;
};
export type ShortlistUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.ShortlistWhereInput;
    data: Prisma.XOR<Prisma.ShortlistUpdateWithoutItemsInput, Prisma.ShortlistUncheckedUpdateWithoutItemsInput>;
};
export type ShortlistUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutShortlistsNestedInput;
};
export type ShortlistUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistCreateManyCompanyInput = {
    id?: string;
    name: string;
    isDefault?: boolean;
    createdById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ShortlistUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ShortlistItemUpdateManyWithoutShortlistNestedInput;
};
export type ShortlistUncheckedUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ShortlistItemUncheckedUpdateManyWithoutShortlistNestedInput;
};
export type ShortlistUncheckedUpdateManyWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isDefault?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShortlistCountOutputType = {
    items: number;
};
export type ShortlistCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | ShortlistCountOutputTypeCountItemsArgs;
};
export type ShortlistCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistCountOutputTypeSelect<ExtArgs> | null;
};
export type ShortlistCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShortlistItemWhereInput;
};
export type ShortlistSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyId?: boolean;
    name?: boolean;
    isDefault?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.Shortlist$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.ShortlistCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shortlist"]>;
export type ShortlistSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyId?: boolean;
    name?: boolean;
    isDefault?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shortlist"]>;
export type ShortlistSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyId?: boolean;
    name?: boolean;
    isDefault?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shortlist"]>;
export type ShortlistSelectScalar = {
    id?: boolean;
    companyId?: boolean;
    name?: boolean;
    isDefault?: boolean;
    createdById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ShortlistOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "companyId" | "name" | "isDefault" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["shortlist"]>;
export type ShortlistInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.Shortlist$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.ShortlistCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ShortlistIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
};
export type ShortlistIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
};
export type $ShortlistPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Shortlist";
    objects: {
        company: Prisma.$CompanyPayload<ExtArgs>;
        items: Prisma.$ShortlistItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        companyId: string;
        name: string;
        isDefault: boolean;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["shortlist"]>;
    composites: {};
};
export type ShortlistGetPayload<S extends boolean | null | undefined | ShortlistDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ShortlistPayload, S>;
export type ShortlistCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ShortlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ShortlistCountAggregateInputType | true;
};
export interface ShortlistDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Shortlist'];
        meta: {
            name: 'Shortlist';
        };
    };
    findUnique<T extends ShortlistFindUniqueArgs>(args: Prisma.SelectSubset<T, ShortlistFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ShortlistClient<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ShortlistFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ShortlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShortlistClient<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ShortlistFindFirstArgs>(args?: Prisma.SelectSubset<T, ShortlistFindFirstArgs<ExtArgs>>): Prisma.Prisma__ShortlistClient<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ShortlistFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ShortlistFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShortlistClient<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ShortlistFindManyArgs>(args?: Prisma.SelectSubset<T, ShortlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ShortlistCreateArgs>(args: Prisma.SelectSubset<T, ShortlistCreateArgs<ExtArgs>>): Prisma.Prisma__ShortlistClient<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ShortlistCreateManyArgs>(args?: Prisma.SelectSubset<T, ShortlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ShortlistCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ShortlistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ShortlistDeleteArgs>(args: Prisma.SelectSubset<T, ShortlistDeleteArgs<ExtArgs>>): Prisma.Prisma__ShortlistClient<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ShortlistUpdateArgs>(args: Prisma.SelectSubset<T, ShortlistUpdateArgs<ExtArgs>>): Prisma.Prisma__ShortlistClient<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ShortlistDeleteManyArgs>(args?: Prisma.SelectSubset<T, ShortlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ShortlistUpdateManyArgs>(args: Prisma.SelectSubset<T, ShortlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ShortlistUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ShortlistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ShortlistUpsertArgs>(args: Prisma.SelectSubset<T, ShortlistUpsertArgs<ExtArgs>>): Prisma.Prisma__ShortlistClient<runtime.Types.Result.GetResult<Prisma.$ShortlistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ShortlistCountArgs>(args?: Prisma.Subset<T, ShortlistCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ShortlistCountAggregateOutputType> : number>;
    aggregate<T extends ShortlistAggregateArgs>(args: Prisma.Subset<T, ShortlistAggregateArgs>): Prisma.PrismaPromise<GetShortlistAggregateType<T>>;
    groupBy<T extends ShortlistGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ShortlistGroupByArgs['orderBy'];
    } : {
        orderBy?: ShortlistGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ShortlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShortlistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ShortlistFieldRefs;
}
export interface Prisma__ShortlistClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    company<T extends Prisma.CompanyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CompanyDefaultArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.Shortlist$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Shortlist$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShortlistItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ShortlistFieldRefs {
    readonly id: Prisma.FieldRef<"Shortlist", 'String'>;
    readonly companyId: Prisma.FieldRef<"Shortlist", 'String'>;
    readonly name: Prisma.FieldRef<"Shortlist", 'String'>;
    readonly isDefault: Prisma.FieldRef<"Shortlist", 'Boolean'>;
    readonly createdById: Prisma.FieldRef<"Shortlist", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Shortlist", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Shortlist", 'DateTime'>;
}
export type ShortlistFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    include?: Prisma.ShortlistInclude<ExtArgs> | null;
    where: Prisma.ShortlistWhereUniqueInput;
};
export type ShortlistFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    include?: Prisma.ShortlistInclude<ExtArgs> | null;
    where: Prisma.ShortlistWhereUniqueInput;
};
export type ShortlistFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    include?: Prisma.ShortlistInclude<ExtArgs> | null;
    where?: Prisma.ShortlistWhereInput;
    orderBy?: Prisma.ShortlistOrderByWithRelationInput | Prisma.ShortlistOrderByWithRelationInput[];
    cursor?: Prisma.ShortlistWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShortlistScalarFieldEnum | Prisma.ShortlistScalarFieldEnum[];
};
export type ShortlistFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    include?: Prisma.ShortlistInclude<ExtArgs> | null;
    where?: Prisma.ShortlistWhereInput;
    orderBy?: Prisma.ShortlistOrderByWithRelationInput | Prisma.ShortlistOrderByWithRelationInput[];
    cursor?: Prisma.ShortlistWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShortlistScalarFieldEnum | Prisma.ShortlistScalarFieldEnum[];
};
export type ShortlistFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    include?: Prisma.ShortlistInclude<ExtArgs> | null;
    where?: Prisma.ShortlistWhereInput;
    orderBy?: Prisma.ShortlistOrderByWithRelationInput | Prisma.ShortlistOrderByWithRelationInput[];
    cursor?: Prisma.ShortlistWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShortlistScalarFieldEnum | Prisma.ShortlistScalarFieldEnum[];
};
export type ShortlistCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    include?: Prisma.ShortlistInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShortlistCreateInput, Prisma.ShortlistUncheckedCreateInput>;
};
export type ShortlistCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ShortlistCreateManyInput | Prisma.ShortlistCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ShortlistCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    data: Prisma.ShortlistCreateManyInput | Prisma.ShortlistCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ShortlistIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ShortlistUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    include?: Prisma.ShortlistInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShortlistUpdateInput, Prisma.ShortlistUncheckedUpdateInput>;
    where: Prisma.ShortlistWhereUniqueInput;
};
export type ShortlistUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ShortlistUpdateManyMutationInput, Prisma.ShortlistUncheckedUpdateManyInput>;
    where?: Prisma.ShortlistWhereInput;
    limit?: number;
};
export type ShortlistUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShortlistUpdateManyMutationInput, Prisma.ShortlistUncheckedUpdateManyInput>;
    where?: Prisma.ShortlistWhereInput;
    limit?: number;
    include?: Prisma.ShortlistIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ShortlistUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    include?: Prisma.ShortlistInclude<ExtArgs> | null;
    where: Prisma.ShortlistWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShortlistCreateInput, Prisma.ShortlistUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ShortlistUpdateInput, Prisma.ShortlistUncheckedUpdateInput>;
};
export type ShortlistDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    include?: Prisma.ShortlistInclude<ExtArgs> | null;
    where: Prisma.ShortlistWhereUniqueInput;
};
export type ShortlistDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShortlistWhereInput;
    limit?: number;
};
export type Shortlist$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ShortlistDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShortlistSelect<ExtArgs> | null;
    omit?: Prisma.ShortlistOmit<ExtArgs> | null;
    include?: Prisma.ShortlistInclude<ExtArgs> | null;
};
