import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FactoryPhotoModel = runtime.Types.Result.DefaultSelection<Prisma.$FactoryPhotoPayload>;
export type AggregateFactoryPhoto = {
    _count: FactoryPhotoCountAggregateOutputType | null;
    _avg: FactoryPhotoAvgAggregateOutputType | null;
    _sum: FactoryPhotoSumAggregateOutputType | null;
    _min: FactoryPhotoMinAggregateOutputType | null;
    _max: FactoryPhotoMaxAggregateOutputType | null;
};
export type FactoryPhotoAvgAggregateOutputType = {
    sortOrder: number | null;
};
export type FactoryPhotoSumAggregateOutputType = {
    sortOrder: number | null;
};
export type FactoryPhotoMinAggregateOutputType = {
    id: string | null;
    manufacturerProfileId: string | null;
    fileId: string | null;
    caption: string | null;
    sortOrder: number | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
};
export type FactoryPhotoMaxAggregateOutputType = {
    id: string | null;
    manufacturerProfileId: string | null;
    fileId: string | null;
    caption: string | null;
    sortOrder: number | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
};
export type FactoryPhotoCountAggregateOutputType = {
    id: number;
    manufacturerProfileId: number;
    fileId: number;
    caption: number;
    sortOrder: number;
    reviewStatus: number;
    reviewNote: number;
    reviewedAt: number;
    createdAt: number;
    _all: number;
};
export type FactoryPhotoAvgAggregateInputType = {
    sortOrder?: true;
};
export type FactoryPhotoSumAggregateInputType = {
    sortOrder?: true;
};
export type FactoryPhotoMinAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    fileId?: true;
    caption?: true;
    sortOrder?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
};
export type FactoryPhotoMaxAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    fileId?: true;
    caption?: true;
    sortOrder?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
};
export type FactoryPhotoCountAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    fileId?: true;
    caption?: true;
    sortOrder?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type FactoryPhotoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FactoryPhotoWhereInput;
    orderBy?: Prisma.FactoryPhotoOrderByWithRelationInput | Prisma.FactoryPhotoOrderByWithRelationInput[];
    cursor?: Prisma.FactoryPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FactoryPhotoCountAggregateInputType;
    _avg?: FactoryPhotoAvgAggregateInputType;
    _sum?: FactoryPhotoSumAggregateInputType;
    _min?: FactoryPhotoMinAggregateInputType;
    _max?: FactoryPhotoMaxAggregateInputType;
};
export type GetFactoryPhotoAggregateType<T extends FactoryPhotoAggregateArgs> = {
    [P in keyof T & keyof AggregateFactoryPhoto]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFactoryPhoto[P]> : Prisma.GetScalarType<T[P], AggregateFactoryPhoto[P]>;
};
export type FactoryPhotoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FactoryPhotoWhereInput;
    orderBy?: Prisma.FactoryPhotoOrderByWithAggregationInput | Prisma.FactoryPhotoOrderByWithAggregationInput[];
    by: Prisma.FactoryPhotoScalarFieldEnum[] | Prisma.FactoryPhotoScalarFieldEnum;
    having?: Prisma.FactoryPhotoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FactoryPhotoCountAggregateInputType | true;
    _avg?: FactoryPhotoAvgAggregateInputType;
    _sum?: FactoryPhotoSumAggregateInputType;
    _min?: FactoryPhotoMinAggregateInputType;
    _max?: FactoryPhotoMaxAggregateInputType;
};
export type FactoryPhotoGroupByOutputType = {
    id: string;
    manufacturerProfileId: string;
    fileId: string;
    caption: string | null;
    sortOrder: number;
    reviewStatus: $Enums.MediaReviewStatus;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    _count: FactoryPhotoCountAggregateOutputType | null;
    _avg: FactoryPhotoAvgAggregateOutputType | null;
    _sum: FactoryPhotoSumAggregateOutputType | null;
    _min: FactoryPhotoMinAggregateOutputType | null;
    _max: FactoryPhotoMaxAggregateOutputType | null;
};
export type GetFactoryPhotoGroupByPayload<T extends FactoryPhotoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FactoryPhotoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FactoryPhotoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FactoryPhotoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FactoryPhotoGroupByOutputType[P]>;
}>>;
export type FactoryPhotoWhereInput = {
    AND?: Prisma.FactoryPhotoWhereInput | Prisma.FactoryPhotoWhereInput[];
    OR?: Prisma.FactoryPhotoWhereInput[];
    NOT?: Prisma.FactoryPhotoWhereInput | Prisma.FactoryPhotoWhereInput[];
    id?: Prisma.UuidFilter<"FactoryPhoto"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"FactoryPhoto"> | string;
    fileId?: Prisma.UuidFilter<"FactoryPhoto"> | string;
    caption?: Prisma.StringNullableFilter<"FactoryPhoto"> | string | null;
    sortOrder?: Prisma.IntFilter<"FactoryPhoto"> | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"FactoryPhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"FactoryPhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"FactoryPhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"FactoryPhoto"> | Date | string;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
};
export type FactoryPhotoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    caption?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    manufacturerProfile?: Prisma.ManufacturerProfileOrderByWithRelationInput;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type FactoryPhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.FactoryPhotoWhereInput | Prisma.FactoryPhotoWhereInput[];
    OR?: Prisma.FactoryPhotoWhereInput[];
    NOT?: Prisma.FactoryPhotoWhereInput | Prisma.FactoryPhotoWhereInput[];
    manufacturerProfileId?: Prisma.UuidFilter<"FactoryPhoto"> | string;
    caption?: Prisma.StringNullableFilter<"FactoryPhoto"> | string | null;
    sortOrder?: Prisma.IntFilter<"FactoryPhoto"> | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"FactoryPhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"FactoryPhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"FactoryPhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"FactoryPhoto"> | Date | string;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
}, "id" | "fileId">;
export type FactoryPhotoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    caption?: Prisma.SortOrderInput | Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FactoryPhotoCountOrderByAggregateInput;
    _avg?: Prisma.FactoryPhotoAvgOrderByAggregateInput;
    _max?: Prisma.FactoryPhotoMaxOrderByAggregateInput;
    _min?: Prisma.FactoryPhotoMinOrderByAggregateInput;
    _sum?: Prisma.FactoryPhotoSumOrderByAggregateInput;
};
export type FactoryPhotoScalarWhereWithAggregatesInput = {
    AND?: Prisma.FactoryPhotoScalarWhereWithAggregatesInput | Prisma.FactoryPhotoScalarWhereWithAggregatesInput[];
    OR?: Prisma.FactoryPhotoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FactoryPhotoScalarWhereWithAggregatesInput | Prisma.FactoryPhotoScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"FactoryPhoto"> | string;
    manufacturerProfileId?: Prisma.UuidWithAggregatesFilter<"FactoryPhoto"> | string;
    fileId?: Prisma.UuidWithAggregatesFilter<"FactoryPhoto"> | string;
    caption?: Prisma.StringNullableWithAggregatesFilter<"FactoryPhoto"> | string | null;
    sortOrder?: Prisma.IntWithAggregatesFilter<"FactoryPhoto"> | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusWithAggregatesFilter<"FactoryPhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableWithAggregatesFilter<"FactoryPhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FactoryPhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FactoryPhoto"> | Date | string;
};
export type FactoryPhotoCreateInput = {
    id?: string;
    caption?: string | null;
    sortOrder?: number;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutPhotosInput;
    file: Prisma.FileAssetCreateNestedOneWithoutFactoryPhotoInput;
};
export type FactoryPhotoUncheckedCreateInput = {
    id?: string;
    manufacturerProfileId: string;
    fileId: string;
    caption?: string | null;
    sortOrder?: number;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type FactoryPhotoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutPhotosNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutFactoryPhotoNestedInput;
};
export type FactoryPhotoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FactoryPhotoCreateManyInput = {
    id?: string;
    manufacturerProfileId: string;
    fileId: string;
    caption?: string | null;
    sortOrder?: number;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type FactoryPhotoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FactoryPhotoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FactoryPhotoListRelationFilter = {
    every?: Prisma.FactoryPhotoWhereInput;
    some?: Prisma.FactoryPhotoWhereInput;
    none?: Prisma.FactoryPhotoWhereInput;
};
export type FactoryPhotoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FactoryPhotoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    caption?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FactoryPhotoAvgOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type FactoryPhotoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    caption?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FactoryPhotoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    caption?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FactoryPhotoSumOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type FactoryPhotoNullableScalarRelationFilter = {
    is?: Prisma.FactoryPhotoWhereInput | null;
    isNot?: Prisma.FactoryPhotoWhereInput | null;
};
export type FactoryPhotoCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutManufacturerProfileInput, Prisma.FactoryPhotoUncheckedCreateWithoutManufacturerProfileInput> | Prisma.FactoryPhotoCreateWithoutManufacturerProfileInput[] | Prisma.FactoryPhotoUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.FactoryPhotoCreateOrConnectWithoutManufacturerProfileInput | Prisma.FactoryPhotoCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.FactoryPhotoCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.FactoryPhotoWhereUniqueInput | Prisma.FactoryPhotoWhereUniqueInput[];
};
export type FactoryPhotoUncheckedCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutManufacturerProfileInput, Prisma.FactoryPhotoUncheckedCreateWithoutManufacturerProfileInput> | Prisma.FactoryPhotoCreateWithoutManufacturerProfileInput[] | Prisma.FactoryPhotoUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.FactoryPhotoCreateOrConnectWithoutManufacturerProfileInput | Prisma.FactoryPhotoCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.FactoryPhotoCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.FactoryPhotoWhereUniqueInput | Prisma.FactoryPhotoWhereUniqueInput[];
};
export type FactoryPhotoUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutManufacturerProfileInput, Prisma.FactoryPhotoUncheckedCreateWithoutManufacturerProfileInput> | Prisma.FactoryPhotoCreateWithoutManufacturerProfileInput[] | Prisma.FactoryPhotoUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.FactoryPhotoCreateOrConnectWithoutManufacturerProfileInput | Prisma.FactoryPhotoCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.FactoryPhotoUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.FactoryPhotoUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.FactoryPhotoCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.FactoryPhotoWhereUniqueInput | Prisma.FactoryPhotoWhereUniqueInput[];
    disconnect?: Prisma.FactoryPhotoWhereUniqueInput | Prisma.FactoryPhotoWhereUniqueInput[];
    delete?: Prisma.FactoryPhotoWhereUniqueInput | Prisma.FactoryPhotoWhereUniqueInput[];
    connect?: Prisma.FactoryPhotoWhereUniqueInput | Prisma.FactoryPhotoWhereUniqueInput[];
    update?: Prisma.FactoryPhotoUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.FactoryPhotoUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.FactoryPhotoUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.FactoryPhotoUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.FactoryPhotoScalarWhereInput | Prisma.FactoryPhotoScalarWhereInput[];
};
export type FactoryPhotoUncheckedUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutManufacturerProfileInput, Prisma.FactoryPhotoUncheckedCreateWithoutManufacturerProfileInput> | Prisma.FactoryPhotoCreateWithoutManufacturerProfileInput[] | Prisma.FactoryPhotoUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.FactoryPhotoCreateOrConnectWithoutManufacturerProfileInput | Prisma.FactoryPhotoCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.FactoryPhotoUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.FactoryPhotoUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.FactoryPhotoCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.FactoryPhotoWhereUniqueInput | Prisma.FactoryPhotoWhereUniqueInput[];
    disconnect?: Prisma.FactoryPhotoWhereUniqueInput | Prisma.FactoryPhotoWhereUniqueInput[];
    delete?: Prisma.FactoryPhotoWhereUniqueInput | Prisma.FactoryPhotoWhereUniqueInput[];
    connect?: Prisma.FactoryPhotoWhereUniqueInput | Prisma.FactoryPhotoWhereUniqueInput[];
    update?: Prisma.FactoryPhotoUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.FactoryPhotoUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.FactoryPhotoUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.FactoryPhotoUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.FactoryPhotoScalarWhereInput | Prisma.FactoryPhotoScalarWhereInput[];
};
export type FactoryPhotoCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutFileInput, Prisma.FactoryPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.FactoryPhotoCreateOrConnectWithoutFileInput;
    connect?: Prisma.FactoryPhotoWhereUniqueInput;
};
export type FactoryPhotoUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutFileInput, Prisma.FactoryPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.FactoryPhotoCreateOrConnectWithoutFileInput;
    connect?: Prisma.FactoryPhotoWhereUniqueInput;
};
export type FactoryPhotoUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutFileInput, Prisma.FactoryPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.FactoryPhotoCreateOrConnectWithoutFileInput;
    upsert?: Prisma.FactoryPhotoUpsertWithoutFileInput;
    disconnect?: Prisma.FactoryPhotoWhereInput | boolean;
    delete?: Prisma.FactoryPhotoWhereInput | boolean;
    connect?: Prisma.FactoryPhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FactoryPhotoUpdateToOneWithWhereWithoutFileInput, Prisma.FactoryPhotoUpdateWithoutFileInput>, Prisma.FactoryPhotoUncheckedUpdateWithoutFileInput>;
};
export type FactoryPhotoUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutFileInput, Prisma.FactoryPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.FactoryPhotoCreateOrConnectWithoutFileInput;
    upsert?: Prisma.FactoryPhotoUpsertWithoutFileInput;
    disconnect?: Prisma.FactoryPhotoWhereInput | boolean;
    delete?: Prisma.FactoryPhotoWhereInput | boolean;
    connect?: Prisma.FactoryPhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FactoryPhotoUpdateToOneWithWhereWithoutFileInput, Prisma.FactoryPhotoUpdateWithoutFileInput>, Prisma.FactoryPhotoUncheckedUpdateWithoutFileInput>;
};
export type FactoryPhotoCreateWithoutManufacturerProfileInput = {
    id?: string;
    caption?: string | null;
    sortOrder?: number;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    file: Prisma.FileAssetCreateNestedOneWithoutFactoryPhotoInput;
};
export type FactoryPhotoUncheckedCreateWithoutManufacturerProfileInput = {
    id?: string;
    fileId: string;
    caption?: string | null;
    sortOrder?: number;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type FactoryPhotoCreateOrConnectWithoutManufacturerProfileInput = {
    where: Prisma.FactoryPhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutManufacturerProfileInput, Prisma.FactoryPhotoUncheckedCreateWithoutManufacturerProfileInput>;
};
export type FactoryPhotoCreateManyManufacturerProfileInputEnvelope = {
    data: Prisma.FactoryPhotoCreateManyManufacturerProfileInput | Prisma.FactoryPhotoCreateManyManufacturerProfileInput[];
    skipDuplicates?: boolean;
};
export type FactoryPhotoUpsertWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.FactoryPhotoWhereUniqueInput;
    update: Prisma.XOR<Prisma.FactoryPhotoUpdateWithoutManufacturerProfileInput, Prisma.FactoryPhotoUncheckedUpdateWithoutManufacturerProfileInput>;
    create: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutManufacturerProfileInput, Prisma.FactoryPhotoUncheckedCreateWithoutManufacturerProfileInput>;
};
export type FactoryPhotoUpdateWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.FactoryPhotoWhereUniqueInput;
    data: Prisma.XOR<Prisma.FactoryPhotoUpdateWithoutManufacturerProfileInput, Prisma.FactoryPhotoUncheckedUpdateWithoutManufacturerProfileInput>;
};
export type FactoryPhotoUpdateManyWithWhereWithoutManufacturerProfileInput = {
    where: Prisma.FactoryPhotoScalarWhereInput;
    data: Prisma.XOR<Prisma.FactoryPhotoUpdateManyMutationInput, Prisma.FactoryPhotoUncheckedUpdateManyWithoutManufacturerProfileInput>;
};
export type FactoryPhotoScalarWhereInput = {
    AND?: Prisma.FactoryPhotoScalarWhereInput | Prisma.FactoryPhotoScalarWhereInput[];
    OR?: Prisma.FactoryPhotoScalarWhereInput[];
    NOT?: Prisma.FactoryPhotoScalarWhereInput | Prisma.FactoryPhotoScalarWhereInput[];
    id?: Prisma.UuidFilter<"FactoryPhoto"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"FactoryPhoto"> | string;
    fileId?: Prisma.UuidFilter<"FactoryPhoto"> | string;
    caption?: Prisma.StringNullableFilter<"FactoryPhoto"> | string | null;
    sortOrder?: Prisma.IntFilter<"FactoryPhoto"> | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"FactoryPhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"FactoryPhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"FactoryPhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"FactoryPhoto"> | Date | string;
};
export type FactoryPhotoCreateWithoutFileInput = {
    id?: string;
    caption?: string | null;
    sortOrder?: number;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutPhotosInput;
};
export type FactoryPhotoUncheckedCreateWithoutFileInput = {
    id?: string;
    manufacturerProfileId: string;
    caption?: string | null;
    sortOrder?: number;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type FactoryPhotoCreateOrConnectWithoutFileInput = {
    where: Prisma.FactoryPhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutFileInput, Prisma.FactoryPhotoUncheckedCreateWithoutFileInput>;
};
export type FactoryPhotoUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.FactoryPhotoUpdateWithoutFileInput, Prisma.FactoryPhotoUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.FactoryPhotoCreateWithoutFileInput, Prisma.FactoryPhotoUncheckedCreateWithoutFileInput>;
    where?: Prisma.FactoryPhotoWhereInput;
};
export type FactoryPhotoUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.FactoryPhotoWhereInput;
    data: Prisma.XOR<Prisma.FactoryPhotoUpdateWithoutFileInput, Prisma.FactoryPhotoUncheckedUpdateWithoutFileInput>;
};
export type FactoryPhotoUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutPhotosNestedInput;
};
export type FactoryPhotoUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FactoryPhotoCreateManyManufacturerProfileInput = {
    id?: string;
    fileId: string;
    caption?: string | null;
    sortOrder?: number;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type FactoryPhotoUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutFactoryPhotoNestedInput;
};
export type FactoryPhotoUncheckedUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FactoryPhotoUncheckedUpdateManyWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FactoryPhotoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    fileId?: boolean;
    caption?: boolean;
    sortOrder?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["factoryPhoto"]>;
export type FactoryPhotoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    fileId?: boolean;
    caption?: boolean;
    sortOrder?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["factoryPhoto"]>;
export type FactoryPhotoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    fileId?: boolean;
    caption?: boolean;
    sortOrder?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["factoryPhoto"]>;
export type FactoryPhotoSelectScalar = {
    id?: boolean;
    manufacturerProfileId?: boolean;
    fileId?: boolean;
    caption?: boolean;
    sortOrder?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
};
export type FactoryPhotoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "manufacturerProfileId" | "fileId" | "caption" | "sortOrder" | "reviewStatus" | "reviewNote" | "reviewedAt" | "createdAt", ExtArgs["result"]["factoryPhoto"]>;
export type FactoryPhotoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type FactoryPhotoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type FactoryPhotoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type $FactoryPhotoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FactoryPhoto";
    objects: {
        manufacturerProfile: Prisma.$ManufacturerProfilePayload<ExtArgs>;
        file: Prisma.$FileAssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        manufacturerProfileId: string;
        fileId: string;
        caption: string | null;
        sortOrder: number;
        reviewStatus: $Enums.MediaReviewStatus;
        reviewNote: string | null;
        reviewedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["factoryPhoto"]>;
    composites: {};
};
export type FactoryPhotoGetPayload<S extends boolean | null | undefined | FactoryPhotoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload, S>;
export type FactoryPhotoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FactoryPhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FactoryPhotoCountAggregateInputType | true;
};
export interface FactoryPhotoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FactoryPhoto'];
        meta: {
            name: 'FactoryPhoto';
        };
    };
    findUnique<T extends FactoryPhotoFindUniqueArgs>(args: Prisma.SelectSubset<T, FactoryPhotoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FactoryPhotoClient<runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FactoryPhotoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FactoryPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FactoryPhotoClient<runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FactoryPhotoFindFirstArgs>(args?: Prisma.SelectSubset<T, FactoryPhotoFindFirstArgs<ExtArgs>>): Prisma.Prisma__FactoryPhotoClient<runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FactoryPhotoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FactoryPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FactoryPhotoClient<runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FactoryPhotoFindManyArgs>(args?: Prisma.SelectSubset<T, FactoryPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FactoryPhotoCreateArgs>(args: Prisma.SelectSubset<T, FactoryPhotoCreateArgs<ExtArgs>>): Prisma.Prisma__FactoryPhotoClient<runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FactoryPhotoCreateManyArgs>(args?: Prisma.SelectSubset<T, FactoryPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FactoryPhotoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FactoryPhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FactoryPhotoDeleteArgs>(args: Prisma.SelectSubset<T, FactoryPhotoDeleteArgs<ExtArgs>>): Prisma.Prisma__FactoryPhotoClient<runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FactoryPhotoUpdateArgs>(args: Prisma.SelectSubset<T, FactoryPhotoUpdateArgs<ExtArgs>>): Prisma.Prisma__FactoryPhotoClient<runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FactoryPhotoDeleteManyArgs>(args?: Prisma.SelectSubset<T, FactoryPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FactoryPhotoUpdateManyArgs>(args: Prisma.SelectSubset<T, FactoryPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FactoryPhotoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FactoryPhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FactoryPhotoUpsertArgs>(args: Prisma.SelectSubset<T, FactoryPhotoUpsertArgs<ExtArgs>>): Prisma.Prisma__FactoryPhotoClient<runtime.Types.Result.GetResult<Prisma.$FactoryPhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FactoryPhotoCountArgs>(args?: Prisma.Subset<T, FactoryPhotoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FactoryPhotoCountAggregateOutputType> : number>;
    aggregate<T extends FactoryPhotoAggregateArgs>(args: Prisma.Subset<T, FactoryPhotoAggregateArgs>): Prisma.PrismaPromise<GetFactoryPhotoAggregateType<T>>;
    groupBy<T extends FactoryPhotoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FactoryPhotoGroupByArgs['orderBy'];
    } : {
        orderBy?: FactoryPhotoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FactoryPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFactoryPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FactoryPhotoFieldRefs;
}
export interface Prisma__FactoryPhotoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    manufacturerProfile<T extends Prisma.ManufacturerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ManufacturerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__ManufacturerProfileClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    file<T extends Prisma.FileAssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileAssetDefaultArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FactoryPhotoFieldRefs {
    readonly id: Prisma.FieldRef<"FactoryPhoto", 'String'>;
    readonly manufacturerProfileId: Prisma.FieldRef<"FactoryPhoto", 'String'>;
    readonly fileId: Prisma.FieldRef<"FactoryPhoto", 'String'>;
    readonly caption: Prisma.FieldRef<"FactoryPhoto", 'String'>;
    readonly sortOrder: Prisma.FieldRef<"FactoryPhoto", 'Int'>;
    readonly reviewStatus: Prisma.FieldRef<"FactoryPhoto", 'MediaReviewStatus'>;
    readonly reviewNote: Prisma.FieldRef<"FactoryPhoto", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"FactoryPhoto", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"FactoryPhoto", 'DateTime'>;
}
export type FactoryPhotoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelect<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    include?: Prisma.FactoryPhotoInclude<ExtArgs> | null;
    where: Prisma.FactoryPhotoWhereUniqueInput;
};
export type FactoryPhotoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelect<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    include?: Prisma.FactoryPhotoInclude<ExtArgs> | null;
    where: Prisma.FactoryPhotoWhereUniqueInput;
};
export type FactoryPhotoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelect<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    include?: Prisma.FactoryPhotoInclude<ExtArgs> | null;
    where?: Prisma.FactoryPhotoWhereInput;
    orderBy?: Prisma.FactoryPhotoOrderByWithRelationInput | Prisma.FactoryPhotoOrderByWithRelationInput[];
    cursor?: Prisma.FactoryPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FactoryPhotoScalarFieldEnum | Prisma.FactoryPhotoScalarFieldEnum[];
};
export type FactoryPhotoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelect<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    include?: Prisma.FactoryPhotoInclude<ExtArgs> | null;
    where?: Prisma.FactoryPhotoWhereInput;
    orderBy?: Prisma.FactoryPhotoOrderByWithRelationInput | Prisma.FactoryPhotoOrderByWithRelationInput[];
    cursor?: Prisma.FactoryPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FactoryPhotoScalarFieldEnum | Prisma.FactoryPhotoScalarFieldEnum[];
};
export type FactoryPhotoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelect<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    include?: Prisma.FactoryPhotoInclude<ExtArgs> | null;
    where?: Prisma.FactoryPhotoWhereInput;
    orderBy?: Prisma.FactoryPhotoOrderByWithRelationInput | Prisma.FactoryPhotoOrderByWithRelationInput[];
    cursor?: Prisma.FactoryPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FactoryPhotoScalarFieldEnum | Prisma.FactoryPhotoScalarFieldEnum[];
};
export type FactoryPhotoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelect<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    include?: Prisma.FactoryPhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FactoryPhotoCreateInput, Prisma.FactoryPhotoUncheckedCreateInput>;
};
export type FactoryPhotoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FactoryPhotoCreateManyInput | Prisma.FactoryPhotoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FactoryPhotoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    data: Prisma.FactoryPhotoCreateManyInput | Prisma.FactoryPhotoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FactoryPhotoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FactoryPhotoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelect<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    include?: Prisma.FactoryPhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FactoryPhotoUpdateInput, Prisma.FactoryPhotoUncheckedUpdateInput>;
    where: Prisma.FactoryPhotoWhereUniqueInput;
};
export type FactoryPhotoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FactoryPhotoUpdateManyMutationInput, Prisma.FactoryPhotoUncheckedUpdateManyInput>;
    where?: Prisma.FactoryPhotoWhereInput;
    limit?: number;
};
export type FactoryPhotoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FactoryPhotoUpdateManyMutationInput, Prisma.FactoryPhotoUncheckedUpdateManyInput>;
    where?: Prisma.FactoryPhotoWhereInput;
    limit?: number;
    include?: Prisma.FactoryPhotoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FactoryPhotoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelect<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    include?: Prisma.FactoryPhotoInclude<ExtArgs> | null;
    where: Prisma.FactoryPhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.FactoryPhotoCreateInput, Prisma.FactoryPhotoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FactoryPhotoUpdateInput, Prisma.FactoryPhotoUncheckedUpdateInput>;
};
export type FactoryPhotoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelect<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    include?: Prisma.FactoryPhotoInclude<ExtArgs> | null;
    where: Prisma.FactoryPhotoWhereUniqueInput;
};
export type FactoryPhotoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FactoryPhotoWhereInput;
    limit?: number;
};
export type FactoryPhotoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FactoryPhotoSelect<ExtArgs> | null;
    omit?: Prisma.FactoryPhotoOmit<ExtArgs> | null;
    include?: Prisma.FactoryPhotoInclude<ExtArgs> | null;
};
