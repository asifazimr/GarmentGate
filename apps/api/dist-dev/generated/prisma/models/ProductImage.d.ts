import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductImageModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductImagePayload>;
export type AggregateProductImage = {
    _count: ProductImageCountAggregateOutputType | null;
    _avg: ProductImageAvgAggregateOutputType | null;
    _sum: ProductImageSumAggregateOutputType | null;
    _min: ProductImageMinAggregateOutputType | null;
    _max: ProductImageMaxAggregateOutputType | null;
};
export type ProductImageAvgAggregateOutputType = {
    sortOrder: number | null;
};
export type ProductImageSumAggregateOutputType = {
    sortOrder: number | null;
};
export type ProductImageMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    fileId: string | null;
    sortOrder: number | null;
    alt: string | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
};
export type ProductImageMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    fileId: string | null;
    sortOrder: number | null;
    alt: string | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
};
export type ProductImageCountAggregateOutputType = {
    id: number;
    productId: number;
    fileId: number;
    sortOrder: number;
    alt: number;
    reviewStatus: number;
    reviewNote: number;
    reviewedAt: number;
    _all: number;
};
export type ProductImageAvgAggregateInputType = {
    sortOrder?: true;
};
export type ProductImageSumAggregateInputType = {
    sortOrder?: true;
};
export type ProductImageMinAggregateInputType = {
    id?: true;
    productId?: true;
    fileId?: true;
    sortOrder?: true;
    alt?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
};
export type ProductImageMaxAggregateInputType = {
    id?: true;
    productId?: true;
    fileId?: true;
    sortOrder?: true;
    alt?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
};
export type ProductImageCountAggregateInputType = {
    id?: true;
    productId?: true;
    fileId?: true;
    sortOrder?: true;
    alt?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    _all?: true;
};
export type ProductImageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductImageWhereInput;
    orderBy?: Prisma.ProductImageOrderByWithRelationInput | Prisma.ProductImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductImageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductImageCountAggregateInputType;
    _avg?: ProductImageAvgAggregateInputType;
    _sum?: ProductImageSumAggregateInputType;
    _min?: ProductImageMinAggregateInputType;
    _max?: ProductImageMaxAggregateInputType;
};
export type GetProductImageAggregateType<T extends ProductImageAggregateArgs> = {
    [P in keyof T & keyof AggregateProductImage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductImage[P]> : Prisma.GetScalarType<T[P], AggregateProductImage[P]>;
};
export type ProductImageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductImageWhereInput;
    orderBy?: Prisma.ProductImageOrderByWithAggregationInput | Prisma.ProductImageOrderByWithAggregationInput[];
    by: Prisma.ProductImageScalarFieldEnum[] | Prisma.ProductImageScalarFieldEnum;
    having?: Prisma.ProductImageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductImageCountAggregateInputType | true;
    _avg?: ProductImageAvgAggregateInputType;
    _sum?: ProductImageSumAggregateInputType;
    _min?: ProductImageMinAggregateInputType;
    _max?: ProductImageMaxAggregateInputType;
};
export type ProductImageGroupByOutputType = {
    id: string;
    productId: string;
    fileId: string;
    sortOrder: number;
    alt: string | null;
    reviewStatus: $Enums.MediaReviewStatus;
    reviewNote: string | null;
    reviewedAt: Date | null;
    _count: ProductImageCountAggregateOutputType | null;
    _avg: ProductImageAvgAggregateOutputType | null;
    _sum: ProductImageSumAggregateOutputType | null;
    _min: ProductImageMinAggregateOutputType | null;
    _max: ProductImageMaxAggregateOutputType | null;
};
export type GetProductImageGroupByPayload<T extends ProductImageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductImageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductImageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductImageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductImageGroupByOutputType[P]>;
}>>;
export type ProductImageWhereInput = {
    AND?: Prisma.ProductImageWhereInput | Prisma.ProductImageWhereInput[];
    OR?: Prisma.ProductImageWhereInput[];
    NOT?: Prisma.ProductImageWhereInput | Prisma.ProductImageWhereInput[];
    id?: Prisma.UuidFilter<"ProductImage"> | string;
    productId?: Prisma.UuidFilter<"ProductImage"> | string;
    fileId?: Prisma.UuidFilter<"ProductImage"> | string;
    sortOrder?: Prisma.IntFilter<"ProductImage"> | number;
    alt?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"ProductImage"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"ProductImage"> | Date | string | null;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
};
export type ProductImageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    alt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type ProductImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.ProductImageWhereInput | Prisma.ProductImageWhereInput[];
    OR?: Prisma.ProductImageWhereInput[];
    NOT?: Prisma.ProductImageWhereInput | Prisma.ProductImageWhereInput[];
    productId?: Prisma.UuidFilter<"ProductImage"> | string;
    sortOrder?: Prisma.IntFilter<"ProductImage"> | number;
    alt?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"ProductImage"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"ProductImage"> | Date | string | null;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
}, "id" | "fileId">;
export type ProductImageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    alt?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ProductImageCountOrderByAggregateInput;
    _avg?: Prisma.ProductImageAvgOrderByAggregateInput;
    _max?: Prisma.ProductImageMaxOrderByAggregateInput;
    _min?: Prisma.ProductImageMinOrderByAggregateInput;
    _sum?: Prisma.ProductImageSumOrderByAggregateInput;
};
export type ProductImageScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductImageScalarWhereWithAggregatesInput | Prisma.ProductImageScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductImageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductImageScalarWhereWithAggregatesInput | Prisma.ProductImageScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ProductImage"> | string;
    productId?: Prisma.UuidWithAggregatesFilter<"ProductImage"> | string;
    fileId?: Prisma.UuidWithAggregatesFilter<"ProductImage"> | string;
    sortOrder?: Prisma.IntWithAggregatesFilter<"ProductImage"> | number;
    alt?: Prisma.StringNullableWithAggregatesFilter<"ProductImage"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusWithAggregatesFilter<"ProductImage"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableWithAggregatesFilter<"ProductImage"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ProductImage"> | Date | string | null;
};
export type ProductImageCreateInput = {
    id?: string;
    sortOrder?: number;
    alt?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    product: Prisma.ProductCreateNestedOneWithoutImagesInput;
    file: Prisma.FileAssetCreateNestedOneWithoutProductImageInput;
};
export type ProductImageUncheckedCreateInput = {
    id?: string;
    productId: string;
    fileId: string;
    sortOrder?: number;
    alt?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
};
export type ProductImageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    alt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    product?: Prisma.ProductUpdateOneRequiredWithoutImagesNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutProductImageNestedInput;
};
export type ProductImageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    alt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProductImageCreateManyInput = {
    id?: string;
    productId: string;
    fileId: string;
    sortOrder?: number;
    alt?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
};
export type ProductImageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    alt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProductImageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    alt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProductImageListRelationFilter = {
    every?: Prisma.ProductImageWhereInput;
    some?: Prisma.ProductImageWhereInput;
    none?: Prisma.ProductImageWhereInput;
};
export type ProductImageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductImageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    alt?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
};
export type ProductImageAvgOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type ProductImageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    alt?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
};
export type ProductImageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    alt?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
};
export type ProductImageSumOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type ProductImageNullableScalarRelationFilter = {
    is?: Prisma.ProductImageWhereInput | null;
    isNot?: Prisma.ProductImageWhereInput | null;
};
export type ProductImageCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput> | Prisma.ProductImageCreateWithoutProductInput[] | Prisma.ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutProductInput | Prisma.ProductImageCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductImageCreateManyProductInputEnvelope;
    connect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
};
export type ProductImageUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput> | Prisma.ProductImageCreateWithoutProductInput[] | Prisma.ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutProductInput | Prisma.ProductImageCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductImageCreateManyProductInputEnvelope;
    connect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
};
export type ProductImageUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput> | Prisma.ProductImageCreateWithoutProductInput[] | Prisma.ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutProductInput | Prisma.ProductImageCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductImageUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductImageUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductImageCreateManyProductInputEnvelope;
    set?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    disconnect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    delete?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    connect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    update?: Prisma.ProductImageUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductImageUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductImageUpdateManyWithWhereWithoutProductInput | Prisma.ProductImageUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductImageScalarWhereInput | Prisma.ProductImageScalarWhereInput[];
};
export type ProductImageUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput> | Prisma.ProductImageCreateWithoutProductInput[] | Prisma.ProductImageUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutProductInput | Prisma.ProductImageCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductImageUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductImageUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductImageCreateManyProductInputEnvelope;
    set?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    disconnect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    delete?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    connect?: Prisma.ProductImageWhereUniqueInput | Prisma.ProductImageWhereUniqueInput[];
    update?: Prisma.ProductImageUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductImageUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductImageUpdateManyWithWhereWithoutProductInput | Prisma.ProductImageUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductImageScalarWhereInput | Prisma.ProductImageScalarWhereInput[];
};
export type EnumMediaReviewStatusFieldUpdateOperationsInput = {
    set?: $Enums.MediaReviewStatus;
};
export type ProductImageCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutFileInput, Prisma.ProductImageUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutFileInput;
    connect?: Prisma.ProductImageWhereUniqueInput;
};
export type ProductImageUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutFileInput, Prisma.ProductImageUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutFileInput;
    connect?: Prisma.ProductImageWhereUniqueInput;
};
export type ProductImageUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutFileInput, Prisma.ProductImageUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutFileInput;
    upsert?: Prisma.ProductImageUpsertWithoutFileInput;
    disconnect?: Prisma.ProductImageWhereInput | boolean;
    delete?: Prisma.ProductImageWhereInput | boolean;
    connect?: Prisma.ProductImageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductImageUpdateToOneWithWhereWithoutFileInput, Prisma.ProductImageUpdateWithoutFileInput>, Prisma.ProductImageUncheckedUpdateWithoutFileInput>;
};
export type ProductImageUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.ProductImageCreateWithoutFileInput, Prisma.ProductImageUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.ProductImageCreateOrConnectWithoutFileInput;
    upsert?: Prisma.ProductImageUpsertWithoutFileInput;
    disconnect?: Prisma.ProductImageWhereInput | boolean;
    delete?: Prisma.ProductImageWhereInput | boolean;
    connect?: Prisma.ProductImageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductImageUpdateToOneWithWhereWithoutFileInput, Prisma.ProductImageUpdateWithoutFileInput>, Prisma.ProductImageUncheckedUpdateWithoutFileInput>;
};
export type ProductImageCreateWithoutProductInput = {
    id?: string;
    sortOrder?: number;
    alt?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    file: Prisma.FileAssetCreateNestedOneWithoutProductImageInput;
};
export type ProductImageUncheckedCreateWithoutProductInput = {
    id?: string;
    fileId: string;
    sortOrder?: number;
    alt?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
};
export type ProductImageCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput>;
};
export type ProductImageCreateManyProductInputEnvelope = {
    data: Prisma.ProductImageCreateManyProductInput | Prisma.ProductImageCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductImageUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductImageWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductImageUpdateWithoutProductInput, Prisma.ProductImageUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductImageCreateWithoutProductInput, Prisma.ProductImageUncheckedCreateWithoutProductInput>;
};
export type ProductImageUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductImageWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductImageUpdateWithoutProductInput, Prisma.ProductImageUncheckedUpdateWithoutProductInput>;
};
export type ProductImageUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductImageScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductImageUpdateManyMutationInput, Prisma.ProductImageUncheckedUpdateManyWithoutProductInput>;
};
export type ProductImageScalarWhereInput = {
    AND?: Prisma.ProductImageScalarWhereInput | Prisma.ProductImageScalarWhereInput[];
    OR?: Prisma.ProductImageScalarWhereInput[];
    NOT?: Prisma.ProductImageScalarWhereInput | Prisma.ProductImageScalarWhereInput[];
    id?: Prisma.UuidFilter<"ProductImage"> | string;
    productId?: Prisma.UuidFilter<"ProductImage"> | string;
    fileId?: Prisma.UuidFilter<"ProductImage"> | string;
    sortOrder?: Prisma.IntFilter<"ProductImage"> | number;
    alt?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"ProductImage"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"ProductImage"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"ProductImage"> | Date | string | null;
};
export type ProductImageCreateWithoutFileInput = {
    id?: string;
    sortOrder?: number;
    alt?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    product: Prisma.ProductCreateNestedOneWithoutImagesInput;
};
export type ProductImageUncheckedCreateWithoutFileInput = {
    id?: string;
    productId: string;
    sortOrder?: number;
    alt?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
};
export type ProductImageCreateOrConnectWithoutFileInput = {
    where: Prisma.ProductImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductImageCreateWithoutFileInput, Prisma.ProductImageUncheckedCreateWithoutFileInput>;
};
export type ProductImageUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.ProductImageUpdateWithoutFileInput, Prisma.ProductImageUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.ProductImageCreateWithoutFileInput, Prisma.ProductImageUncheckedCreateWithoutFileInput>;
    where?: Prisma.ProductImageWhereInput;
};
export type ProductImageUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.ProductImageWhereInput;
    data: Prisma.XOR<Prisma.ProductImageUpdateWithoutFileInput, Prisma.ProductImageUncheckedUpdateWithoutFileInput>;
};
export type ProductImageUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    alt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    product?: Prisma.ProductUpdateOneRequiredWithoutImagesNestedInput;
};
export type ProductImageUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    alt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProductImageCreateManyProductInput = {
    id?: string;
    fileId: string;
    sortOrder?: number;
    alt?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
};
export type ProductImageUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    alt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutProductImageNestedInput;
};
export type ProductImageUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    alt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProductImageUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    alt?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProductImageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    fileId?: boolean;
    sortOrder?: boolean;
    alt?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productImage"]>;
export type ProductImageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    fileId?: boolean;
    sortOrder?: boolean;
    alt?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productImage"]>;
export type ProductImageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    fileId?: boolean;
    sortOrder?: boolean;
    alt?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productImage"]>;
export type ProductImageSelectScalar = {
    id?: boolean;
    productId?: boolean;
    fileId?: boolean;
    sortOrder?: boolean;
    alt?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
};
export type ProductImageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "fileId" | "sortOrder" | "alt" | "reviewStatus" | "reviewNote" | "reviewedAt", ExtArgs["result"]["productImage"]>;
export type ProductImageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type ProductImageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type ProductImageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type $ProductImagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductImage";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        file: Prisma.$FileAssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        fileId: string;
        sortOrder: number;
        alt: string | null;
        reviewStatus: $Enums.MediaReviewStatus;
        reviewNote: string | null;
        reviewedAt: Date | null;
    }, ExtArgs["result"]["productImage"]>;
    composites: {};
};
export type ProductImageGetPayload<S extends boolean | null | undefined | ProductImageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductImagePayload, S>;
export type ProductImageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductImageCountAggregateInputType | true;
};
export interface ProductImageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductImage'];
        meta: {
            name: 'ProductImage';
        };
    };
    findUnique<T extends ProductImageFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductImageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductImageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductImageFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductImageFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductImageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductImageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductImageFindManyArgs>(args?: Prisma.SelectSubset<T, ProductImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductImageCreateArgs>(args: Prisma.SelectSubset<T, ProductImageCreateArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductImageCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductImageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductImageDeleteArgs>(args: Prisma.SelectSubset<T, ProductImageDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductImageUpdateArgs>(args: Prisma.SelectSubset<T, ProductImageUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductImageDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductImageUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductImageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductImageUpsertArgs>(args: Prisma.SelectSubset<T, ProductImageUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductImageClient<runtime.Types.Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductImageCountArgs>(args?: Prisma.Subset<T, ProductImageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductImageCountAggregateOutputType> : number>;
    aggregate<T extends ProductImageAggregateArgs>(args: Prisma.Subset<T, ProductImageAggregateArgs>): Prisma.PrismaPromise<GetProductImageAggregateType<T>>;
    groupBy<T extends ProductImageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductImageGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductImageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductImageFieldRefs;
}
export interface Prisma__ProductImageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    file<T extends Prisma.FileAssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileAssetDefaultArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductImageFieldRefs {
    readonly id: Prisma.FieldRef<"ProductImage", 'String'>;
    readonly productId: Prisma.FieldRef<"ProductImage", 'String'>;
    readonly fileId: Prisma.FieldRef<"ProductImage", 'String'>;
    readonly sortOrder: Prisma.FieldRef<"ProductImage", 'Int'>;
    readonly alt: Prisma.FieldRef<"ProductImage", 'String'>;
    readonly reviewStatus: Prisma.FieldRef<"ProductImage", 'MediaReviewStatus'>;
    readonly reviewNote: Prisma.FieldRef<"ProductImage", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"ProductImage", 'DateTime'>;
}
export type ProductImageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where: Prisma.ProductImageWhereUniqueInput;
};
export type ProductImageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where: Prisma.ProductImageWhereUniqueInput;
};
export type ProductImageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where?: Prisma.ProductImageWhereInput;
    orderBy?: Prisma.ProductImageOrderByWithRelationInput | Prisma.ProductImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductImageScalarFieldEnum | Prisma.ProductImageScalarFieldEnum[];
};
export type ProductImageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where?: Prisma.ProductImageWhereInput;
    orderBy?: Prisma.ProductImageOrderByWithRelationInput | Prisma.ProductImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductImageScalarFieldEnum | Prisma.ProductImageScalarFieldEnum[];
};
export type ProductImageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where?: Prisma.ProductImageWhereInput;
    orderBy?: Prisma.ProductImageOrderByWithRelationInput | Prisma.ProductImageOrderByWithRelationInput[];
    cursor?: Prisma.ProductImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductImageScalarFieldEnum | Prisma.ProductImageScalarFieldEnum[];
};
export type ProductImageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductImageCreateInput, Prisma.ProductImageUncheckedCreateInput>;
};
export type ProductImageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductImageCreateManyInput | Prisma.ProductImageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductImageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    data: Prisma.ProductImageCreateManyInput | Prisma.ProductImageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductImageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductImageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductImageUpdateInput, Prisma.ProductImageUncheckedUpdateInput>;
    where: Prisma.ProductImageWhereUniqueInput;
};
export type ProductImageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductImageUpdateManyMutationInput, Prisma.ProductImageUncheckedUpdateManyInput>;
    where?: Prisma.ProductImageWhereInput;
    limit?: number;
};
export type ProductImageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductImageUpdateManyMutationInput, Prisma.ProductImageUncheckedUpdateManyInput>;
    where?: Prisma.ProductImageWhereInput;
    limit?: number;
    include?: Prisma.ProductImageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductImageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where: Prisma.ProductImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductImageCreateInput, Prisma.ProductImageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductImageUpdateInput, Prisma.ProductImageUncheckedUpdateInput>;
};
export type ProductImageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
    where: Prisma.ProductImageWhereUniqueInput;
};
export type ProductImageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductImageWhereInput;
    limit?: number;
};
export type ProductImageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductImageSelect<ExtArgs> | null;
    omit?: Prisma.ProductImageOmit<ExtArgs> | null;
    include?: Prisma.ProductImageInclude<ExtArgs> | null;
};
