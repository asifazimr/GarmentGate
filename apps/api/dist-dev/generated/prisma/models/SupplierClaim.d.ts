import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SupplierClaimModel = runtime.Types.Result.DefaultSelection<Prisma.$SupplierClaimPayload>;
export type AggregateSupplierClaim = {
    _count: SupplierClaimCountAggregateOutputType | null;
    _min: SupplierClaimMinAggregateOutputType | null;
    _max: SupplierClaimMaxAggregateOutputType | null;
};
export type SupplierClaimMinAggregateOutputType = {
    id: string | null;
    manufacturerProfileId: string | null;
    region: $Enums.SupplierClaimRegion | null;
    tier: $Enums.SupplierClaimTier | null;
    evidenceFileId: string | null;
    note: string | null;
    status: $Enums.SupplierClaimStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    reviewedById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SupplierClaimMaxAggregateOutputType = {
    id: string | null;
    manufacturerProfileId: string | null;
    region: $Enums.SupplierClaimRegion | null;
    tier: $Enums.SupplierClaimTier | null;
    evidenceFileId: string | null;
    note: string | null;
    status: $Enums.SupplierClaimStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    reviewedById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SupplierClaimCountAggregateOutputType = {
    id: number;
    manufacturerProfileId: number;
    region: number;
    tier: number;
    brandNames: number;
    evidenceFileId: number;
    note: number;
    status: number;
    reviewNote: number;
    reviewedAt: number;
    reviewedById: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SupplierClaimMinAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    region?: true;
    tier?: true;
    evidenceFileId?: true;
    note?: true;
    status?: true;
    reviewNote?: true;
    reviewedAt?: true;
    reviewedById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SupplierClaimMaxAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    region?: true;
    tier?: true;
    evidenceFileId?: true;
    note?: true;
    status?: true;
    reviewNote?: true;
    reviewedAt?: true;
    reviewedById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SupplierClaimCountAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    region?: true;
    tier?: true;
    brandNames?: true;
    evidenceFileId?: true;
    note?: true;
    status?: true;
    reviewNote?: true;
    reviewedAt?: true;
    reviewedById?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SupplierClaimAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SupplierClaimWhereInput;
    orderBy?: Prisma.SupplierClaimOrderByWithRelationInput | Prisma.SupplierClaimOrderByWithRelationInput[];
    cursor?: Prisma.SupplierClaimWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SupplierClaimCountAggregateInputType;
    _min?: SupplierClaimMinAggregateInputType;
    _max?: SupplierClaimMaxAggregateInputType;
};
export type GetSupplierClaimAggregateType<T extends SupplierClaimAggregateArgs> = {
    [P in keyof T & keyof AggregateSupplierClaim]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSupplierClaim[P]> : Prisma.GetScalarType<T[P], AggregateSupplierClaim[P]>;
};
export type SupplierClaimGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SupplierClaimWhereInput;
    orderBy?: Prisma.SupplierClaimOrderByWithAggregationInput | Prisma.SupplierClaimOrderByWithAggregationInput[];
    by: Prisma.SupplierClaimScalarFieldEnum[] | Prisma.SupplierClaimScalarFieldEnum;
    having?: Prisma.SupplierClaimScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SupplierClaimCountAggregateInputType | true;
    _min?: SupplierClaimMinAggregateInputType;
    _max?: SupplierClaimMaxAggregateInputType;
};
export type SupplierClaimGroupByOutputType = {
    id: string;
    manufacturerProfileId: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames: string[];
    evidenceFileId: string | null;
    note: string | null;
    status: $Enums.SupplierClaimStatus;
    reviewNote: string | null;
    reviewedAt: Date | null;
    reviewedById: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: SupplierClaimCountAggregateOutputType | null;
    _min: SupplierClaimMinAggregateOutputType | null;
    _max: SupplierClaimMaxAggregateOutputType | null;
};
export type GetSupplierClaimGroupByPayload<T extends SupplierClaimGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SupplierClaimGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SupplierClaimGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SupplierClaimGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SupplierClaimGroupByOutputType[P]>;
}>>;
export type SupplierClaimWhereInput = {
    AND?: Prisma.SupplierClaimWhereInput | Prisma.SupplierClaimWhereInput[];
    OR?: Prisma.SupplierClaimWhereInput[];
    NOT?: Prisma.SupplierClaimWhereInput | Prisma.SupplierClaimWhereInput[];
    id?: Prisma.UuidFilter<"SupplierClaim"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"SupplierClaim"> | string;
    region?: Prisma.EnumSupplierClaimRegionFilter<"SupplierClaim"> | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFilter<"SupplierClaim"> | $Enums.SupplierClaimTier;
    brandNames?: Prisma.StringNullableListFilter<"SupplierClaim">;
    evidenceFileId?: Prisma.UuidNullableFilter<"SupplierClaim"> | string | null;
    note?: Prisma.StringNullableFilter<"SupplierClaim"> | string | null;
    status?: Prisma.EnumSupplierClaimStatusFilter<"SupplierClaim"> | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.StringNullableFilter<"SupplierClaim"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"SupplierClaim"> | Date | string | null;
    reviewedById?: Prisma.UuidNullableFilter<"SupplierClaim"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SupplierClaim"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SupplierClaim"> | Date | string;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
    evidenceFile?: Prisma.XOR<Prisma.FileAssetNullableScalarRelationFilter, Prisma.FileAssetWhereInput> | null;
    reviewedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type SupplierClaimOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    tier?: Prisma.SortOrder;
    brandNames?: Prisma.SortOrder;
    evidenceFileId?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    manufacturerProfile?: Prisma.ManufacturerProfileOrderByWithRelationInput;
    evidenceFile?: Prisma.FileAssetOrderByWithRelationInput;
    reviewedBy?: Prisma.UserOrderByWithRelationInput;
};
export type SupplierClaimWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    evidenceFileId?: string;
    AND?: Prisma.SupplierClaimWhereInput | Prisma.SupplierClaimWhereInput[];
    OR?: Prisma.SupplierClaimWhereInput[];
    NOT?: Prisma.SupplierClaimWhereInput | Prisma.SupplierClaimWhereInput[];
    manufacturerProfileId?: Prisma.UuidFilter<"SupplierClaim"> | string;
    region?: Prisma.EnumSupplierClaimRegionFilter<"SupplierClaim"> | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFilter<"SupplierClaim"> | $Enums.SupplierClaimTier;
    brandNames?: Prisma.StringNullableListFilter<"SupplierClaim">;
    note?: Prisma.StringNullableFilter<"SupplierClaim"> | string | null;
    status?: Prisma.EnumSupplierClaimStatusFilter<"SupplierClaim"> | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.StringNullableFilter<"SupplierClaim"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"SupplierClaim"> | Date | string | null;
    reviewedById?: Prisma.UuidNullableFilter<"SupplierClaim"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SupplierClaim"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SupplierClaim"> | Date | string;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
    evidenceFile?: Prisma.XOR<Prisma.FileAssetNullableScalarRelationFilter, Prisma.FileAssetWhereInput> | null;
    reviewedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "evidenceFileId">;
export type SupplierClaimOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    tier?: Prisma.SortOrder;
    brandNames?: Prisma.SortOrder;
    evidenceFileId?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SupplierClaimCountOrderByAggregateInput;
    _max?: Prisma.SupplierClaimMaxOrderByAggregateInput;
    _min?: Prisma.SupplierClaimMinOrderByAggregateInput;
};
export type SupplierClaimScalarWhereWithAggregatesInput = {
    AND?: Prisma.SupplierClaimScalarWhereWithAggregatesInput | Prisma.SupplierClaimScalarWhereWithAggregatesInput[];
    OR?: Prisma.SupplierClaimScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SupplierClaimScalarWhereWithAggregatesInput | Prisma.SupplierClaimScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"SupplierClaim"> | string;
    manufacturerProfileId?: Prisma.UuidWithAggregatesFilter<"SupplierClaim"> | string;
    region?: Prisma.EnumSupplierClaimRegionWithAggregatesFilter<"SupplierClaim"> | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierWithAggregatesFilter<"SupplierClaim"> | $Enums.SupplierClaimTier;
    brandNames?: Prisma.StringNullableListFilter<"SupplierClaim">;
    evidenceFileId?: Prisma.UuidNullableWithAggregatesFilter<"SupplierClaim"> | string | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"SupplierClaim"> | string | null;
    status?: Prisma.EnumSupplierClaimStatusWithAggregatesFilter<"SupplierClaim"> | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.StringNullableWithAggregatesFilter<"SupplierClaim"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"SupplierClaim"> | Date | string | null;
    reviewedById?: Prisma.UuidNullableWithAggregatesFilter<"SupplierClaim"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SupplierClaim"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SupplierClaim"> | Date | string;
};
export type SupplierClaimCreateInput = {
    id?: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimCreatebrandNamesInput | string[];
    note?: string | null;
    status?: $Enums.SupplierClaimStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutSupplierClaimsInput;
    evidenceFile?: Prisma.FileAssetCreateNestedOneWithoutSupplierClaimInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutSupplierClaimsReviewedInput;
};
export type SupplierClaimUncheckedCreateInput = {
    id?: string;
    manufacturerProfileId: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimCreatebrandNamesInput | string[];
    evidenceFileId?: string | null;
    note?: string | null;
    status?: $Enums.SupplierClaimStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    reviewedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SupplierClaimUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutSupplierClaimsNestedInput;
    evidenceFile?: Prisma.FileAssetUpdateOneWithoutSupplierClaimNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutSupplierClaimsReviewedNestedInput;
};
export type SupplierClaimUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    evidenceFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SupplierClaimCreateManyInput = {
    id?: string;
    manufacturerProfileId: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimCreatebrandNamesInput | string[];
    evidenceFileId?: string | null;
    note?: string | null;
    status?: $Enums.SupplierClaimStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    reviewedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SupplierClaimUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SupplierClaimUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    evidenceFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SupplierClaimListRelationFilter = {
    every?: Prisma.SupplierClaimWhereInput;
    some?: Prisma.SupplierClaimWhereInput;
    none?: Prisma.SupplierClaimWhereInput;
};
export type SupplierClaimOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SupplierClaimNullableScalarRelationFilter = {
    is?: Prisma.SupplierClaimWhereInput | null;
    isNot?: Prisma.SupplierClaimWhereInput | null;
};
export type SupplierClaimCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    tier?: Prisma.SortOrder;
    brandNames?: Prisma.SortOrder;
    evidenceFileId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SupplierClaimMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    tier?: Prisma.SortOrder;
    evidenceFileId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SupplierClaimMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    region?: Prisma.SortOrder;
    tier?: Prisma.SortOrder;
    evidenceFileId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SupplierClaimCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutReviewedByInput, Prisma.SupplierClaimUncheckedCreateWithoutReviewedByInput> | Prisma.SupplierClaimCreateWithoutReviewedByInput[] | Prisma.SupplierClaimUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutReviewedByInput | Prisma.SupplierClaimCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.SupplierClaimCreateManyReviewedByInputEnvelope;
    connect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
};
export type SupplierClaimUncheckedCreateNestedManyWithoutReviewedByInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutReviewedByInput, Prisma.SupplierClaimUncheckedCreateWithoutReviewedByInput> | Prisma.SupplierClaimCreateWithoutReviewedByInput[] | Prisma.SupplierClaimUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutReviewedByInput | Prisma.SupplierClaimCreateOrConnectWithoutReviewedByInput[];
    createMany?: Prisma.SupplierClaimCreateManyReviewedByInputEnvelope;
    connect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
};
export type SupplierClaimUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutReviewedByInput, Prisma.SupplierClaimUncheckedCreateWithoutReviewedByInput> | Prisma.SupplierClaimCreateWithoutReviewedByInput[] | Prisma.SupplierClaimUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutReviewedByInput | Prisma.SupplierClaimCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.SupplierClaimUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.SupplierClaimUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.SupplierClaimCreateManyReviewedByInputEnvelope;
    set?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    disconnect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    delete?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    connect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    update?: Prisma.SupplierClaimUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.SupplierClaimUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.SupplierClaimUpdateManyWithWhereWithoutReviewedByInput | Prisma.SupplierClaimUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.SupplierClaimScalarWhereInput | Prisma.SupplierClaimScalarWhereInput[];
};
export type SupplierClaimUncheckedUpdateManyWithoutReviewedByNestedInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutReviewedByInput, Prisma.SupplierClaimUncheckedCreateWithoutReviewedByInput> | Prisma.SupplierClaimCreateWithoutReviewedByInput[] | Prisma.SupplierClaimUncheckedCreateWithoutReviewedByInput[];
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutReviewedByInput | Prisma.SupplierClaimCreateOrConnectWithoutReviewedByInput[];
    upsert?: Prisma.SupplierClaimUpsertWithWhereUniqueWithoutReviewedByInput | Prisma.SupplierClaimUpsertWithWhereUniqueWithoutReviewedByInput[];
    createMany?: Prisma.SupplierClaimCreateManyReviewedByInputEnvelope;
    set?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    disconnect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    delete?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    connect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    update?: Prisma.SupplierClaimUpdateWithWhereUniqueWithoutReviewedByInput | Prisma.SupplierClaimUpdateWithWhereUniqueWithoutReviewedByInput[];
    updateMany?: Prisma.SupplierClaimUpdateManyWithWhereWithoutReviewedByInput | Prisma.SupplierClaimUpdateManyWithWhereWithoutReviewedByInput[];
    deleteMany?: Prisma.SupplierClaimScalarWhereInput | Prisma.SupplierClaimScalarWhereInput[];
};
export type SupplierClaimCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutManufacturerProfileInput, Prisma.SupplierClaimUncheckedCreateWithoutManufacturerProfileInput> | Prisma.SupplierClaimCreateWithoutManufacturerProfileInput[] | Prisma.SupplierClaimUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutManufacturerProfileInput | Prisma.SupplierClaimCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.SupplierClaimCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
};
export type SupplierClaimUncheckedCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutManufacturerProfileInput, Prisma.SupplierClaimUncheckedCreateWithoutManufacturerProfileInput> | Prisma.SupplierClaimCreateWithoutManufacturerProfileInput[] | Prisma.SupplierClaimUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutManufacturerProfileInput | Prisma.SupplierClaimCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.SupplierClaimCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
};
export type SupplierClaimUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutManufacturerProfileInput, Prisma.SupplierClaimUncheckedCreateWithoutManufacturerProfileInput> | Prisma.SupplierClaimCreateWithoutManufacturerProfileInput[] | Prisma.SupplierClaimUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutManufacturerProfileInput | Prisma.SupplierClaimCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.SupplierClaimUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.SupplierClaimUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.SupplierClaimCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    disconnect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    delete?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    connect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    update?: Prisma.SupplierClaimUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.SupplierClaimUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.SupplierClaimUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.SupplierClaimUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.SupplierClaimScalarWhereInput | Prisma.SupplierClaimScalarWhereInput[];
};
export type SupplierClaimUncheckedUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutManufacturerProfileInput, Prisma.SupplierClaimUncheckedCreateWithoutManufacturerProfileInput> | Prisma.SupplierClaimCreateWithoutManufacturerProfileInput[] | Prisma.SupplierClaimUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutManufacturerProfileInput | Prisma.SupplierClaimCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.SupplierClaimUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.SupplierClaimUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.SupplierClaimCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    disconnect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    delete?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    connect?: Prisma.SupplierClaimWhereUniqueInput | Prisma.SupplierClaimWhereUniqueInput[];
    update?: Prisma.SupplierClaimUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.SupplierClaimUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.SupplierClaimUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.SupplierClaimUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.SupplierClaimScalarWhereInput | Prisma.SupplierClaimScalarWhereInput[];
};
export type SupplierClaimCreateNestedOneWithoutEvidenceFileInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutEvidenceFileInput, Prisma.SupplierClaimUncheckedCreateWithoutEvidenceFileInput>;
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutEvidenceFileInput;
    connect?: Prisma.SupplierClaimWhereUniqueInput;
};
export type SupplierClaimUncheckedCreateNestedOneWithoutEvidenceFileInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutEvidenceFileInput, Prisma.SupplierClaimUncheckedCreateWithoutEvidenceFileInput>;
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutEvidenceFileInput;
    connect?: Prisma.SupplierClaimWhereUniqueInput;
};
export type SupplierClaimUpdateOneWithoutEvidenceFileNestedInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutEvidenceFileInput, Prisma.SupplierClaimUncheckedCreateWithoutEvidenceFileInput>;
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutEvidenceFileInput;
    upsert?: Prisma.SupplierClaimUpsertWithoutEvidenceFileInput;
    disconnect?: Prisma.SupplierClaimWhereInput | boolean;
    delete?: Prisma.SupplierClaimWhereInput | boolean;
    connect?: Prisma.SupplierClaimWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SupplierClaimUpdateToOneWithWhereWithoutEvidenceFileInput, Prisma.SupplierClaimUpdateWithoutEvidenceFileInput>, Prisma.SupplierClaimUncheckedUpdateWithoutEvidenceFileInput>;
};
export type SupplierClaimUncheckedUpdateOneWithoutEvidenceFileNestedInput = {
    create?: Prisma.XOR<Prisma.SupplierClaimCreateWithoutEvidenceFileInput, Prisma.SupplierClaimUncheckedCreateWithoutEvidenceFileInput>;
    connectOrCreate?: Prisma.SupplierClaimCreateOrConnectWithoutEvidenceFileInput;
    upsert?: Prisma.SupplierClaimUpsertWithoutEvidenceFileInput;
    disconnect?: Prisma.SupplierClaimWhereInput | boolean;
    delete?: Prisma.SupplierClaimWhereInput | boolean;
    connect?: Prisma.SupplierClaimWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SupplierClaimUpdateToOneWithWhereWithoutEvidenceFileInput, Prisma.SupplierClaimUpdateWithoutEvidenceFileInput>, Prisma.SupplierClaimUncheckedUpdateWithoutEvidenceFileInput>;
};
export type SupplierClaimCreatebrandNamesInput = {
    set: string[];
};
export type EnumSupplierClaimRegionFieldUpdateOperationsInput = {
    set?: $Enums.SupplierClaimRegion;
};
export type EnumSupplierClaimTierFieldUpdateOperationsInput = {
    set?: $Enums.SupplierClaimTier;
};
export type SupplierClaimUpdatebrandNamesInput = {
    set?: string[];
    push?: string | string[];
};
export type EnumSupplierClaimStatusFieldUpdateOperationsInput = {
    set?: $Enums.SupplierClaimStatus;
};
export type SupplierClaimCreateWithoutReviewedByInput = {
    id?: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimCreatebrandNamesInput | string[];
    note?: string | null;
    status?: $Enums.SupplierClaimStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutSupplierClaimsInput;
    evidenceFile?: Prisma.FileAssetCreateNestedOneWithoutSupplierClaimInput;
};
export type SupplierClaimUncheckedCreateWithoutReviewedByInput = {
    id?: string;
    manufacturerProfileId: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimCreatebrandNamesInput | string[];
    evidenceFileId?: string | null;
    note?: string | null;
    status?: $Enums.SupplierClaimStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SupplierClaimCreateOrConnectWithoutReviewedByInput = {
    where: Prisma.SupplierClaimWhereUniqueInput;
    create: Prisma.XOR<Prisma.SupplierClaimCreateWithoutReviewedByInput, Prisma.SupplierClaimUncheckedCreateWithoutReviewedByInput>;
};
export type SupplierClaimCreateManyReviewedByInputEnvelope = {
    data: Prisma.SupplierClaimCreateManyReviewedByInput | Prisma.SupplierClaimCreateManyReviewedByInput[];
    skipDuplicates?: boolean;
};
export type SupplierClaimUpsertWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.SupplierClaimWhereUniqueInput;
    update: Prisma.XOR<Prisma.SupplierClaimUpdateWithoutReviewedByInput, Prisma.SupplierClaimUncheckedUpdateWithoutReviewedByInput>;
    create: Prisma.XOR<Prisma.SupplierClaimCreateWithoutReviewedByInput, Prisma.SupplierClaimUncheckedCreateWithoutReviewedByInput>;
};
export type SupplierClaimUpdateWithWhereUniqueWithoutReviewedByInput = {
    where: Prisma.SupplierClaimWhereUniqueInput;
    data: Prisma.XOR<Prisma.SupplierClaimUpdateWithoutReviewedByInput, Prisma.SupplierClaimUncheckedUpdateWithoutReviewedByInput>;
};
export type SupplierClaimUpdateManyWithWhereWithoutReviewedByInput = {
    where: Prisma.SupplierClaimScalarWhereInput;
    data: Prisma.XOR<Prisma.SupplierClaimUpdateManyMutationInput, Prisma.SupplierClaimUncheckedUpdateManyWithoutReviewedByInput>;
};
export type SupplierClaimScalarWhereInput = {
    AND?: Prisma.SupplierClaimScalarWhereInput | Prisma.SupplierClaimScalarWhereInput[];
    OR?: Prisma.SupplierClaimScalarWhereInput[];
    NOT?: Prisma.SupplierClaimScalarWhereInput | Prisma.SupplierClaimScalarWhereInput[];
    id?: Prisma.UuidFilter<"SupplierClaim"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"SupplierClaim"> | string;
    region?: Prisma.EnumSupplierClaimRegionFilter<"SupplierClaim"> | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFilter<"SupplierClaim"> | $Enums.SupplierClaimTier;
    brandNames?: Prisma.StringNullableListFilter<"SupplierClaim">;
    evidenceFileId?: Prisma.UuidNullableFilter<"SupplierClaim"> | string | null;
    note?: Prisma.StringNullableFilter<"SupplierClaim"> | string | null;
    status?: Prisma.EnumSupplierClaimStatusFilter<"SupplierClaim"> | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.StringNullableFilter<"SupplierClaim"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"SupplierClaim"> | Date | string | null;
    reviewedById?: Prisma.UuidNullableFilter<"SupplierClaim"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SupplierClaim"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SupplierClaim"> | Date | string;
};
export type SupplierClaimCreateWithoutManufacturerProfileInput = {
    id?: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimCreatebrandNamesInput | string[];
    note?: string | null;
    status?: $Enums.SupplierClaimStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    evidenceFile?: Prisma.FileAssetCreateNestedOneWithoutSupplierClaimInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutSupplierClaimsReviewedInput;
};
export type SupplierClaimUncheckedCreateWithoutManufacturerProfileInput = {
    id?: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimCreatebrandNamesInput | string[];
    evidenceFileId?: string | null;
    note?: string | null;
    status?: $Enums.SupplierClaimStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    reviewedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SupplierClaimCreateOrConnectWithoutManufacturerProfileInput = {
    where: Prisma.SupplierClaimWhereUniqueInput;
    create: Prisma.XOR<Prisma.SupplierClaimCreateWithoutManufacturerProfileInput, Prisma.SupplierClaimUncheckedCreateWithoutManufacturerProfileInput>;
};
export type SupplierClaimCreateManyManufacturerProfileInputEnvelope = {
    data: Prisma.SupplierClaimCreateManyManufacturerProfileInput | Prisma.SupplierClaimCreateManyManufacturerProfileInput[];
    skipDuplicates?: boolean;
};
export type SupplierClaimUpsertWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.SupplierClaimWhereUniqueInput;
    update: Prisma.XOR<Prisma.SupplierClaimUpdateWithoutManufacturerProfileInput, Prisma.SupplierClaimUncheckedUpdateWithoutManufacturerProfileInput>;
    create: Prisma.XOR<Prisma.SupplierClaimCreateWithoutManufacturerProfileInput, Prisma.SupplierClaimUncheckedCreateWithoutManufacturerProfileInput>;
};
export type SupplierClaimUpdateWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.SupplierClaimWhereUniqueInput;
    data: Prisma.XOR<Prisma.SupplierClaimUpdateWithoutManufacturerProfileInput, Prisma.SupplierClaimUncheckedUpdateWithoutManufacturerProfileInput>;
};
export type SupplierClaimUpdateManyWithWhereWithoutManufacturerProfileInput = {
    where: Prisma.SupplierClaimScalarWhereInput;
    data: Prisma.XOR<Prisma.SupplierClaimUpdateManyMutationInput, Prisma.SupplierClaimUncheckedUpdateManyWithoutManufacturerProfileInput>;
};
export type SupplierClaimCreateWithoutEvidenceFileInput = {
    id?: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimCreatebrandNamesInput | string[];
    note?: string | null;
    status?: $Enums.SupplierClaimStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutSupplierClaimsInput;
    reviewedBy?: Prisma.UserCreateNestedOneWithoutSupplierClaimsReviewedInput;
};
export type SupplierClaimUncheckedCreateWithoutEvidenceFileInput = {
    id?: string;
    manufacturerProfileId: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimCreatebrandNamesInput | string[];
    note?: string | null;
    status?: $Enums.SupplierClaimStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    reviewedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SupplierClaimCreateOrConnectWithoutEvidenceFileInput = {
    where: Prisma.SupplierClaimWhereUniqueInput;
    create: Prisma.XOR<Prisma.SupplierClaimCreateWithoutEvidenceFileInput, Prisma.SupplierClaimUncheckedCreateWithoutEvidenceFileInput>;
};
export type SupplierClaimUpsertWithoutEvidenceFileInput = {
    update: Prisma.XOR<Prisma.SupplierClaimUpdateWithoutEvidenceFileInput, Prisma.SupplierClaimUncheckedUpdateWithoutEvidenceFileInput>;
    create: Prisma.XOR<Prisma.SupplierClaimCreateWithoutEvidenceFileInput, Prisma.SupplierClaimUncheckedCreateWithoutEvidenceFileInput>;
    where?: Prisma.SupplierClaimWhereInput;
};
export type SupplierClaimUpdateToOneWithWhereWithoutEvidenceFileInput = {
    where?: Prisma.SupplierClaimWhereInput;
    data: Prisma.XOR<Prisma.SupplierClaimUpdateWithoutEvidenceFileInput, Prisma.SupplierClaimUncheckedUpdateWithoutEvidenceFileInput>;
};
export type SupplierClaimUpdateWithoutEvidenceFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutSupplierClaimsNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutSupplierClaimsReviewedNestedInput;
};
export type SupplierClaimUncheckedUpdateWithoutEvidenceFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SupplierClaimCreateManyReviewedByInput = {
    id?: string;
    manufacturerProfileId: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimCreatebrandNamesInput | string[];
    evidenceFileId?: string | null;
    note?: string | null;
    status?: $Enums.SupplierClaimStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SupplierClaimUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutSupplierClaimsNestedInput;
    evidenceFile?: Prisma.FileAssetUpdateOneWithoutSupplierClaimNestedInput;
};
export type SupplierClaimUncheckedUpdateWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    evidenceFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SupplierClaimUncheckedUpdateManyWithoutReviewedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    evidenceFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SupplierClaimCreateManyManufacturerProfileInput = {
    id?: string;
    region: $Enums.SupplierClaimRegion;
    tier: $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimCreatebrandNamesInput | string[];
    evidenceFileId?: string | null;
    note?: string | null;
    status?: $Enums.SupplierClaimStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    reviewedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SupplierClaimUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    evidenceFile?: Prisma.FileAssetUpdateOneWithoutSupplierClaimNestedInput;
    reviewedBy?: Prisma.UserUpdateOneWithoutSupplierClaimsReviewedNestedInput;
};
export type SupplierClaimUncheckedUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    evidenceFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SupplierClaimUncheckedUpdateManyWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    region?: Prisma.EnumSupplierClaimRegionFieldUpdateOperationsInput | $Enums.SupplierClaimRegion;
    tier?: Prisma.EnumSupplierClaimTierFieldUpdateOperationsInput | $Enums.SupplierClaimTier;
    brandNames?: Prisma.SupplierClaimUpdatebrandNamesInput | string[];
    evidenceFileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumSupplierClaimStatusFieldUpdateOperationsInput | $Enums.SupplierClaimStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SupplierClaimSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    region?: boolean;
    tier?: boolean;
    brandNames?: boolean;
    evidenceFileId?: boolean;
    note?: boolean;
    status?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    reviewedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    evidenceFile?: boolean | Prisma.SupplierClaim$evidenceFileArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.SupplierClaim$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["supplierClaim"]>;
export type SupplierClaimSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    region?: boolean;
    tier?: boolean;
    brandNames?: boolean;
    evidenceFileId?: boolean;
    note?: boolean;
    status?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    reviewedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    evidenceFile?: boolean | Prisma.SupplierClaim$evidenceFileArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.SupplierClaim$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["supplierClaim"]>;
export type SupplierClaimSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    region?: boolean;
    tier?: boolean;
    brandNames?: boolean;
    evidenceFileId?: boolean;
    note?: boolean;
    status?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    reviewedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    evidenceFile?: boolean | Prisma.SupplierClaim$evidenceFileArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.SupplierClaim$reviewedByArgs<ExtArgs>;
}, ExtArgs["result"]["supplierClaim"]>;
export type SupplierClaimSelectScalar = {
    id?: boolean;
    manufacturerProfileId?: boolean;
    region?: boolean;
    tier?: boolean;
    brandNames?: boolean;
    evidenceFileId?: boolean;
    note?: boolean;
    status?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    reviewedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SupplierClaimOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "manufacturerProfileId" | "region" | "tier" | "brandNames" | "evidenceFileId" | "note" | "status" | "reviewNote" | "reviewedAt" | "reviewedById" | "createdAt" | "updatedAt", ExtArgs["result"]["supplierClaim"]>;
export type SupplierClaimInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    evidenceFile?: boolean | Prisma.SupplierClaim$evidenceFileArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.SupplierClaim$reviewedByArgs<ExtArgs>;
};
export type SupplierClaimIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    evidenceFile?: boolean | Prisma.SupplierClaim$evidenceFileArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.SupplierClaim$reviewedByArgs<ExtArgs>;
};
export type SupplierClaimIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    evidenceFile?: boolean | Prisma.SupplierClaim$evidenceFileArgs<ExtArgs>;
    reviewedBy?: boolean | Prisma.SupplierClaim$reviewedByArgs<ExtArgs>;
};
export type $SupplierClaimPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SupplierClaim";
    objects: {
        manufacturerProfile: Prisma.$ManufacturerProfilePayload<ExtArgs>;
        evidenceFile: Prisma.$FileAssetPayload<ExtArgs> | null;
        reviewedBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        manufacturerProfileId: string;
        region: $Enums.SupplierClaimRegion;
        tier: $Enums.SupplierClaimTier;
        brandNames: string[];
        evidenceFileId: string | null;
        note: string | null;
        status: $Enums.SupplierClaimStatus;
        reviewNote: string | null;
        reviewedAt: Date | null;
        reviewedById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["supplierClaim"]>;
    composites: {};
};
export type SupplierClaimGetPayload<S extends boolean | null | undefined | SupplierClaimDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload, S>;
export type SupplierClaimCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SupplierClaimFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SupplierClaimCountAggregateInputType | true;
};
export interface SupplierClaimDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SupplierClaim'];
        meta: {
            name: 'SupplierClaim';
        };
    };
    findUnique<T extends SupplierClaimFindUniqueArgs>(args: Prisma.SelectSubset<T, SupplierClaimFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SupplierClaimClient<runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SupplierClaimFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SupplierClaimFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SupplierClaimClient<runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SupplierClaimFindFirstArgs>(args?: Prisma.SelectSubset<T, SupplierClaimFindFirstArgs<ExtArgs>>): Prisma.Prisma__SupplierClaimClient<runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SupplierClaimFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SupplierClaimFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SupplierClaimClient<runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SupplierClaimFindManyArgs>(args?: Prisma.SelectSubset<T, SupplierClaimFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SupplierClaimCreateArgs>(args: Prisma.SelectSubset<T, SupplierClaimCreateArgs<ExtArgs>>): Prisma.Prisma__SupplierClaimClient<runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SupplierClaimCreateManyArgs>(args?: Prisma.SelectSubset<T, SupplierClaimCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SupplierClaimCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SupplierClaimCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SupplierClaimDeleteArgs>(args: Prisma.SelectSubset<T, SupplierClaimDeleteArgs<ExtArgs>>): Prisma.Prisma__SupplierClaimClient<runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SupplierClaimUpdateArgs>(args: Prisma.SelectSubset<T, SupplierClaimUpdateArgs<ExtArgs>>): Prisma.Prisma__SupplierClaimClient<runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SupplierClaimDeleteManyArgs>(args?: Prisma.SelectSubset<T, SupplierClaimDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SupplierClaimUpdateManyArgs>(args: Prisma.SelectSubset<T, SupplierClaimUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SupplierClaimUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SupplierClaimUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SupplierClaimUpsertArgs>(args: Prisma.SelectSubset<T, SupplierClaimUpsertArgs<ExtArgs>>): Prisma.Prisma__SupplierClaimClient<runtime.Types.Result.GetResult<Prisma.$SupplierClaimPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SupplierClaimCountArgs>(args?: Prisma.Subset<T, SupplierClaimCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SupplierClaimCountAggregateOutputType> : number>;
    aggregate<T extends SupplierClaimAggregateArgs>(args: Prisma.Subset<T, SupplierClaimAggregateArgs>): Prisma.PrismaPromise<GetSupplierClaimAggregateType<T>>;
    groupBy<T extends SupplierClaimGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SupplierClaimGroupByArgs['orderBy'];
    } : {
        orderBy?: SupplierClaimGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SupplierClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierClaimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SupplierClaimFieldRefs;
}
export interface Prisma__SupplierClaimClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    manufacturerProfile<T extends Prisma.ManufacturerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ManufacturerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__ManufacturerProfileClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    evidenceFile<T extends Prisma.SupplierClaim$evidenceFileArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SupplierClaim$evidenceFileArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    reviewedBy<T extends Prisma.SupplierClaim$reviewedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SupplierClaim$reviewedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SupplierClaimFieldRefs {
    readonly id: Prisma.FieldRef<"SupplierClaim", 'String'>;
    readonly manufacturerProfileId: Prisma.FieldRef<"SupplierClaim", 'String'>;
    readonly region: Prisma.FieldRef<"SupplierClaim", 'SupplierClaimRegion'>;
    readonly tier: Prisma.FieldRef<"SupplierClaim", 'SupplierClaimTier'>;
    readonly brandNames: Prisma.FieldRef<"SupplierClaim", 'String[]'>;
    readonly evidenceFileId: Prisma.FieldRef<"SupplierClaim", 'String'>;
    readonly note: Prisma.FieldRef<"SupplierClaim", 'String'>;
    readonly status: Prisma.FieldRef<"SupplierClaim", 'SupplierClaimStatus'>;
    readonly reviewNote: Prisma.FieldRef<"SupplierClaim", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"SupplierClaim", 'DateTime'>;
    readonly reviewedById: Prisma.FieldRef<"SupplierClaim", 'String'>;
    readonly createdAt: Prisma.FieldRef<"SupplierClaim", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SupplierClaim", 'DateTime'>;
}
export type SupplierClaimFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelect<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    include?: Prisma.SupplierClaimInclude<ExtArgs> | null;
    where: Prisma.SupplierClaimWhereUniqueInput;
};
export type SupplierClaimFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelect<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    include?: Prisma.SupplierClaimInclude<ExtArgs> | null;
    where: Prisma.SupplierClaimWhereUniqueInput;
};
export type SupplierClaimFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelect<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    include?: Prisma.SupplierClaimInclude<ExtArgs> | null;
    where?: Prisma.SupplierClaimWhereInput;
    orderBy?: Prisma.SupplierClaimOrderByWithRelationInput | Prisma.SupplierClaimOrderByWithRelationInput[];
    cursor?: Prisma.SupplierClaimWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SupplierClaimScalarFieldEnum | Prisma.SupplierClaimScalarFieldEnum[];
};
export type SupplierClaimFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelect<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    include?: Prisma.SupplierClaimInclude<ExtArgs> | null;
    where?: Prisma.SupplierClaimWhereInput;
    orderBy?: Prisma.SupplierClaimOrderByWithRelationInput | Prisma.SupplierClaimOrderByWithRelationInput[];
    cursor?: Prisma.SupplierClaimWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SupplierClaimScalarFieldEnum | Prisma.SupplierClaimScalarFieldEnum[];
};
export type SupplierClaimFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelect<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    include?: Prisma.SupplierClaimInclude<ExtArgs> | null;
    where?: Prisma.SupplierClaimWhereInput;
    orderBy?: Prisma.SupplierClaimOrderByWithRelationInput | Prisma.SupplierClaimOrderByWithRelationInput[];
    cursor?: Prisma.SupplierClaimWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SupplierClaimScalarFieldEnum | Prisma.SupplierClaimScalarFieldEnum[];
};
export type SupplierClaimCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelect<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    include?: Prisma.SupplierClaimInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SupplierClaimCreateInput, Prisma.SupplierClaimUncheckedCreateInput>;
};
export type SupplierClaimCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SupplierClaimCreateManyInput | Prisma.SupplierClaimCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SupplierClaimCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    data: Prisma.SupplierClaimCreateManyInput | Prisma.SupplierClaimCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SupplierClaimIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SupplierClaimUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelect<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    include?: Prisma.SupplierClaimInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SupplierClaimUpdateInput, Prisma.SupplierClaimUncheckedUpdateInput>;
    where: Prisma.SupplierClaimWhereUniqueInput;
};
export type SupplierClaimUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SupplierClaimUpdateManyMutationInput, Prisma.SupplierClaimUncheckedUpdateManyInput>;
    where?: Prisma.SupplierClaimWhereInput;
    limit?: number;
};
export type SupplierClaimUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SupplierClaimUpdateManyMutationInput, Prisma.SupplierClaimUncheckedUpdateManyInput>;
    where?: Prisma.SupplierClaimWhereInput;
    limit?: number;
    include?: Prisma.SupplierClaimIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SupplierClaimUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelect<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    include?: Prisma.SupplierClaimInclude<ExtArgs> | null;
    where: Prisma.SupplierClaimWhereUniqueInput;
    create: Prisma.XOR<Prisma.SupplierClaimCreateInput, Prisma.SupplierClaimUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SupplierClaimUpdateInput, Prisma.SupplierClaimUncheckedUpdateInput>;
};
export type SupplierClaimDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelect<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    include?: Prisma.SupplierClaimInclude<ExtArgs> | null;
    where: Prisma.SupplierClaimWhereUniqueInput;
};
export type SupplierClaimDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SupplierClaimWhereInput;
    limit?: number;
};
export type SupplierClaim$evidenceFileArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileAssetSelect<ExtArgs> | null;
    omit?: Prisma.FileAssetOmit<ExtArgs> | null;
    include?: Prisma.FileAssetInclude<ExtArgs> | null;
    where?: Prisma.FileAssetWhereInput;
};
export type SupplierClaim$reviewedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type SupplierClaimDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierClaimSelect<ExtArgs> | null;
    omit?: Prisma.SupplierClaimOmit<ExtArgs> | null;
    include?: Prisma.SupplierClaimInclude<ExtArgs> | null;
};
