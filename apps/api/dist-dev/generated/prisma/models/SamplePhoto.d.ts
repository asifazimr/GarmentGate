import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SamplePhotoModel = runtime.Types.Result.DefaultSelection<Prisma.$SamplePhotoPayload>;
export type AggregateSamplePhoto = {
    _count: SamplePhotoCountAggregateOutputType | null;
    _min: SamplePhotoMinAggregateOutputType | null;
    _max: SamplePhotoMaxAggregateOutputType | null;
};
export type SamplePhotoMinAggregateOutputType = {
    id: string | null;
    sampleId: string | null;
    fileId: string | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
};
export type SamplePhotoMaxAggregateOutputType = {
    id: string | null;
    sampleId: string | null;
    fileId: string | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
};
export type SamplePhotoCountAggregateOutputType = {
    id: number;
    sampleId: number;
    fileId: number;
    reviewStatus: number;
    reviewNote: number;
    reviewedAt: number;
    createdAt: number;
    _all: number;
};
export type SamplePhotoMinAggregateInputType = {
    id?: true;
    sampleId?: true;
    fileId?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
};
export type SamplePhotoMaxAggregateInputType = {
    id?: true;
    sampleId?: true;
    fileId?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
};
export type SamplePhotoCountAggregateInputType = {
    id?: true;
    sampleId?: true;
    fileId?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type SamplePhotoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SamplePhotoWhereInput;
    orderBy?: Prisma.SamplePhotoOrderByWithRelationInput | Prisma.SamplePhotoOrderByWithRelationInput[];
    cursor?: Prisma.SamplePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SamplePhotoCountAggregateInputType;
    _min?: SamplePhotoMinAggregateInputType;
    _max?: SamplePhotoMaxAggregateInputType;
};
export type GetSamplePhotoAggregateType<T extends SamplePhotoAggregateArgs> = {
    [P in keyof T & keyof AggregateSamplePhoto]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSamplePhoto[P]> : Prisma.GetScalarType<T[P], AggregateSamplePhoto[P]>;
};
export type SamplePhotoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SamplePhotoWhereInput;
    orderBy?: Prisma.SamplePhotoOrderByWithAggregationInput | Prisma.SamplePhotoOrderByWithAggregationInput[];
    by: Prisma.SamplePhotoScalarFieldEnum[] | Prisma.SamplePhotoScalarFieldEnum;
    having?: Prisma.SamplePhotoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SamplePhotoCountAggregateInputType | true;
    _min?: SamplePhotoMinAggregateInputType;
    _max?: SamplePhotoMaxAggregateInputType;
};
export type SamplePhotoGroupByOutputType = {
    id: string;
    sampleId: string;
    fileId: string;
    reviewStatus: $Enums.MediaReviewStatus;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    _count: SamplePhotoCountAggregateOutputType | null;
    _min: SamplePhotoMinAggregateOutputType | null;
    _max: SamplePhotoMaxAggregateOutputType | null;
};
export type GetSamplePhotoGroupByPayload<T extends SamplePhotoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SamplePhotoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SamplePhotoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SamplePhotoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SamplePhotoGroupByOutputType[P]>;
}>>;
export type SamplePhotoWhereInput = {
    AND?: Prisma.SamplePhotoWhereInput | Prisma.SamplePhotoWhereInput[];
    OR?: Prisma.SamplePhotoWhereInput[];
    NOT?: Prisma.SamplePhotoWhereInput | Prisma.SamplePhotoWhereInput[];
    id?: Prisma.UuidFilter<"SamplePhoto"> | string;
    sampleId?: Prisma.UuidFilter<"SamplePhoto"> | string;
    fileId?: Prisma.UuidFilter<"SamplePhoto"> | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"SamplePhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"SamplePhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"SamplePhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"SamplePhoto"> | Date | string;
    sample?: Prisma.XOR<Prisma.SampleScalarRelationFilter, Prisma.SampleWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
};
export type SamplePhotoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sampleId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    sample?: Prisma.SampleOrderByWithRelationInput;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type SamplePhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.SamplePhotoWhereInput | Prisma.SamplePhotoWhereInput[];
    OR?: Prisma.SamplePhotoWhereInput[];
    NOT?: Prisma.SamplePhotoWhereInput | Prisma.SamplePhotoWhereInput[];
    sampleId?: Prisma.UuidFilter<"SamplePhoto"> | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"SamplePhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"SamplePhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"SamplePhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"SamplePhoto"> | Date | string;
    sample?: Prisma.XOR<Prisma.SampleScalarRelationFilter, Prisma.SampleWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
}, "id" | "fileId">;
export type SamplePhotoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sampleId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SamplePhotoCountOrderByAggregateInput;
    _max?: Prisma.SamplePhotoMaxOrderByAggregateInput;
    _min?: Prisma.SamplePhotoMinOrderByAggregateInput;
};
export type SamplePhotoScalarWhereWithAggregatesInput = {
    AND?: Prisma.SamplePhotoScalarWhereWithAggregatesInput | Prisma.SamplePhotoScalarWhereWithAggregatesInput[];
    OR?: Prisma.SamplePhotoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SamplePhotoScalarWhereWithAggregatesInput | Prisma.SamplePhotoScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"SamplePhoto"> | string;
    sampleId?: Prisma.UuidWithAggregatesFilter<"SamplePhoto"> | string;
    fileId?: Prisma.UuidWithAggregatesFilter<"SamplePhoto"> | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusWithAggregatesFilter<"SamplePhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableWithAggregatesFilter<"SamplePhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"SamplePhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SamplePhoto"> | Date | string;
};
export type SamplePhotoCreateInput = {
    id?: string;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    sample: Prisma.SampleCreateNestedOneWithoutPhotosInput;
    file: Prisma.FileAssetCreateNestedOneWithoutSamplePhotoInput;
};
export type SamplePhotoUncheckedCreateInput = {
    id?: string;
    sampleId: string;
    fileId: string;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SamplePhotoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sample?: Prisma.SampleUpdateOneRequiredWithoutPhotosNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutSamplePhotoNestedInput;
};
export type SamplePhotoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sampleId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SamplePhotoCreateManyInput = {
    id?: string;
    sampleId: string;
    fileId: string;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SamplePhotoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SamplePhotoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sampleId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SamplePhotoListRelationFilter = {
    every?: Prisma.SamplePhotoWhereInput;
    some?: Prisma.SamplePhotoWhereInput;
    none?: Prisma.SamplePhotoWhereInput;
};
export type SamplePhotoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SamplePhotoNullableScalarRelationFilter = {
    is?: Prisma.SamplePhotoWhereInput | null;
    isNot?: Prisma.SamplePhotoWhereInput | null;
};
export type SamplePhotoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sampleId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SamplePhotoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sampleId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SamplePhotoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sampleId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SamplePhotoCreateNestedManyWithoutSampleInput = {
    create?: Prisma.XOR<Prisma.SamplePhotoCreateWithoutSampleInput, Prisma.SamplePhotoUncheckedCreateWithoutSampleInput> | Prisma.SamplePhotoCreateWithoutSampleInput[] | Prisma.SamplePhotoUncheckedCreateWithoutSampleInput[];
    connectOrCreate?: Prisma.SamplePhotoCreateOrConnectWithoutSampleInput | Prisma.SamplePhotoCreateOrConnectWithoutSampleInput[];
    createMany?: Prisma.SamplePhotoCreateManySampleInputEnvelope;
    connect?: Prisma.SamplePhotoWhereUniqueInput | Prisma.SamplePhotoWhereUniqueInput[];
};
export type SamplePhotoUncheckedCreateNestedManyWithoutSampleInput = {
    create?: Prisma.XOR<Prisma.SamplePhotoCreateWithoutSampleInput, Prisma.SamplePhotoUncheckedCreateWithoutSampleInput> | Prisma.SamplePhotoCreateWithoutSampleInput[] | Prisma.SamplePhotoUncheckedCreateWithoutSampleInput[];
    connectOrCreate?: Prisma.SamplePhotoCreateOrConnectWithoutSampleInput | Prisma.SamplePhotoCreateOrConnectWithoutSampleInput[];
    createMany?: Prisma.SamplePhotoCreateManySampleInputEnvelope;
    connect?: Prisma.SamplePhotoWhereUniqueInput | Prisma.SamplePhotoWhereUniqueInput[];
};
export type SamplePhotoUpdateManyWithoutSampleNestedInput = {
    create?: Prisma.XOR<Prisma.SamplePhotoCreateWithoutSampleInput, Prisma.SamplePhotoUncheckedCreateWithoutSampleInput> | Prisma.SamplePhotoCreateWithoutSampleInput[] | Prisma.SamplePhotoUncheckedCreateWithoutSampleInput[];
    connectOrCreate?: Prisma.SamplePhotoCreateOrConnectWithoutSampleInput | Prisma.SamplePhotoCreateOrConnectWithoutSampleInput[];
    upsert?: Prisma.SamplePhotoUpsertWithWhereUniqueWithoutSampleInput | Prisma.SamplePhotoUpsertWithWhereUniqueWithoutSampleInput[];
    createMany?: Prisma.SamplePhotoCreateManySampleInputEnvelope;
    set?: Prisma.SamplePhotoWhereUniqueInput | Prisma.SamplePhotoWhereUniqueInput[];
    disconnect?: Prisma.SamplePhotoWhereUniqueInput | Prisma.SamplePhotoWhereUniqueInput[];
    delete?: Prisma.SamplePhotoWhereUniqueInput | Prisma.SamplePhotoWhereUniqueInput[];
    connect?: Prisma.SamplePhotoWhereUniqueInput | Prisma.SamplePhotoWhereUniqueInput[];
    update?: Prisma.SamplePhotoUpdateWithWhereUniqueWithoutSampleInput | Prisma.SamplePhotoUpdateWithWhereUniqueWithoutSampleInput[];
    updateMany?: Prisma.SamplePhotoUpdateManyWithWhereWithoutSampleInput | Prisma.SamplePhotoUpdateManyWithWhereWithoutSampleInput[];
    deleteMany?: Prisma.SamplePhotoScalarWhereInput | Prisma.SamplePhotoScalarWhereInput[];
};
export type SamplePhotoUncheckedUpdateManyWithoutSampleNestedInput = {
    create?: Prisma.XOR<Prisma.SamplePhotoCreateWithoutSampleInput, Prisma.SamplePhotoUncheckedCreateWithoutSampleInput> | Prisma.SamplePhotoCreateWithoutSampleInput[] | Prisma.SamplePhotoUncheckedCreateWithoutSampleInput[];
    connectOrCreate?: Prisma.SamplePhotoCreateOrConnectWithoutSampleInput | Prisma.SamplePhotoCreateOrConnectWithoutSampleInput[];
    upsert?: Prisma.SamplePhotoUpsertWithWhereUniqueWithoutSampleInput | Prisma.SamplePhotoUpsertWithWhereUniqueWithoutSampleInput[];
    createMany?: Prisma.SamplePhotoCreateManySampleInputEnvelope;
    set?: Prisma.SamplePhotoWhereUniqueInput | Prisma.SamplePhotoWhereUniqueInput[];
    disconnect?: Prisma.SamplePhotoWhereUniqueInput | Prisma.SamplePhotoWhereUniqueInput[];
    delete?: Prisma.SamplePhotoWhereUniqueInput | Prisma.SamplePhotoWhereUniqueInput[];
    connect?: Prisma.SamplePhotoWhereUniqueInput | Prisma.SamplePhotoWhereUniqueInput[];
    update?: Prisma.SamplePhotoUpdateWithWhereUniqueWithoutSampleInput | Prisma.SamplePhotoUpdateWithWhereUniqueWithoutSampleInput[];
    updateMany?: Prisma.SamplePhotoUpdateManyWithWhereWithoutSampleInput | Prisma.SamplePhotoUpdateManyWithWhereWithoutSampleInput[];
    deleteMany?: Prisma.SamplePhotoScalarWhereInput | Prisma.SamplePhotoScalarWhereInput[];
};
export type SamplePhotoCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.SamplePhotoCreateWithoutFileInput, Prisma.SamplePhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.SamplePhotoCreateOrConnectWithoutFileInput;
    connect?: Prisma.SamplePhotoWhereUniqueInput;
};
export type SamplePhotoUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.SamplePhotoCreateWithoutFileInput, Prisma.SamplePhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.SamplePhotoCreateOrConnectWithoutFileInput;
    connect?: Prisma.SamplePhotoWhereUniqueInput;
};
export type SamplePhotoUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.SamplePhotoCreateWithoutFileInput, Prisma.SamplePhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.SamplePhotoCreateOrConnectWithoutFileInput;
    upsert?: Prisma.SamplePhotoUpsertWithoutFileInput;
    disconnect?: Prisma.SamplePhotoWhereInput | boolean;
    delete?: Prisma.SamplePhotoWhereInput | boolean;
    connect?: Prisma.SamplePhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SamplePhotoUpdateToOneWithWhereWithoutFileInput, Prisma.SamplePhotoUpdateWithoutFileInput>, Prisma.SamplePhotoUncheckedUpdateWithoutFileInput>;
};
export type SamplePhotoUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.SamplePhotoCreateWithoutFileInput, Prisma.SamplePhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.SamplePhotoCreateOrConnectWithoutFileInput;
    upsert?: Prisma.SamplePhotoUpsertWithoutFileInput;
    disconnect?: Prisma.SamplePhotoWhereInput | boolean;
    delete?: Prisma.SamplePhotoWhereInput | boolean;
    connect?: Prisma.SamplePhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SamplePhotoUpdateToOneWithWhereWithoutFileInput, Prisma.SamplePhotoUpdateWithoutFileInput>, Prisma.SamplePhotoUncheckedUpdateWithoutFileInput>;
};
export type SamplePhotoCreateWithoutSampleInput = {
    id?: string;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    file: Prisma.FileAssetCreateNestedOneWithoutSamplePhotoInput;
};
export type SamplePhotoUncheckedCreateWithoutSampleInput = {
    id?: string;
    fileId: string;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SamplePhotoCreateOrConnectWithoutSampleInput = {
    where: Prisma.SamplePhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.SamplePhotoCreateWithoutSampleInput, Prisma.SamplePhotoUncheckedCreateWithoutSampleInput>;
};
export type SamplePhotoCreateManySampleInputEnvelope = {
    data: Prisma.SamplePhotoCreateManySampleInput | Prisma.SamplePhotoCreateManySampleInput[];
    skipDuplicates?: boolean;
};
export type SamplePhotoUpsertWithWhereUniqueWithoutSampleInput = {
    where: Prisma.SamplePhotoWhereUniqueInput;
    update: Prisma.XOR<Prisma.SamplePhotoUpdateWithoutSampleInput, Prisma.SamplePhotoUncheckedUpdateWithoutSampleInput>;
    create: Prisma.XOR<Prisma.SamplePhotoCreateWithoutSampleInput, Prisma.SamplePhotoUncheckedCreateWithoutSampleInput>;
};
export type SamplePhotoUpdateWithWhereUniqueWithoutSampleInput = {
    where: Prisma.SamplePhotoWhereUniqueInput;
    data: Prisma.XOR<Prisma.SamplePhotoUpdateWithoutSampleInput, Prisma.SamplePhotoUncheckedUpdateWithoutSampleInput>;
};
export type SamplePhotoUpdateManyWithWhereWithoutSampleInput = {
    where: Prisma.SamplePhotoScalarWhereInput;
    data: Prisma.XOR<Prisma.SamplePhotoUpdateManyMutationInput, Prisma.SamplePhotoUncheckedUpdateManyWithoutSampleInput>;
};
export type SamplePhotoScalarWhereInput = {
    AND?: Prisma.SamplePhotoScalarWhereInput | Prisma.SamplePhotoScalarWhereInput[];
    OR?: Prisma.SamplePhotoScalarWhereInput[];
    NOT?: Prisma.SamplePhotoScalarWhereInput | Prisma.SamplePhotoScalarWhereInput[];
    id?: Prisma.UuidFilter<"SamplePhoto"> | string;
    sampleId?: Prisma.UuidFilter<"SamplePhoto"> | string;
    fileId?: Prisma.UuidFilter<"SamplePhoto"> | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"SamplePhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"SamplePhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"SamplePhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"SamplePhoto"> | Date | string;
};
export type SamplePhotoCreateWithoutFileInput = {
    id?: string;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    sample: Prisma.SampleCreateNestedOneWithoutPhotosInput;
};
export type SamplePhotoUncheckedCreateWithoutFileInput = {
    id?: string;
    sampleId: string;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SamplePhotoCreateOrConnectWithoutFileInput = {
    where: Prisma.SamplePhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.SamplePhotoCreateWithoutFileInput, Prisma.SamplePhotoUncheckedCreateWithoutFileInput>;
};
export type SamplePhotoUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.SamplePhotoUpdateWithoutFileInput, Prisma.SamplePhotoUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.SamplePhotoCreateWithoutFileInput, Prisma.SamplePhotoUncheckedCreateWithoutFileInput>;
    where?: Prisma.SamplePhotoWhereInput;
};
export type SamplePhotoUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.SamplePhotoWhereInput;
    data: Prisma.XOR<Prisma.SamplePhotoUpdateWithoutFileInput, Prisma.SamplePhotoUncheckedUpdateWithoutFileInput>;
};
export type SamplePhotoUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sample?: Prisma.SampleUpdateOneRequiredWithoutPhotosNestedInput;
};
export type SamplePhotoUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sampleId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SamplePhotoCreateManySampleInput = {
    id?: string;
    fileId: string;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SamplePhotoUpdateWithoutSampleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutSamplePhotoNestedInput;
};
export type SamplePhotoUncheckedUpdateWithoutSampleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SamplePhotoUncheckedUpdateManyWithoutSampleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SamplePhotoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sampleId?: boolean;
    fileId?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    sample?: boolean | Prisma.SampleDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["samplePhoto"]>;
export type SamplePhotoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sampleId?: boolean;
    fileId?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    sample?: boolean | Prisma.SampleDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["samplePhoto"]>;
export type SamplePhotoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sampleId?: boolean;
    fileId?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    sample?: boolean | Prisma.SampleDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["samplePhoto"]>;
export type SamplePhotoSelectScalar = {
    id?: boolean;
    sampleId?: boolean;
    fileId?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
};
export type SamplePhotoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sampleId" | "fileId" | "reviewStatus" | "reviewNote" | "reviewedAt" | "createdAt", ExtArgs["result"]["samplePhoto"]>;
export type SamplePhotoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sample?: boolean | Prisma.SampleDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type SamplePhotoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sample?: boolean | Prisma.SampleDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type SamplePhotoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sample?: boolean | Prisma.SampleDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type $SamplePhotoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SamplePhoto";
    objects: {
        sample: Prisma.$SamplePayload<ExtArgs>;
        file: Prisma.$FileAssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sampleId: string;
        fileId: string;
        reviewStatus: $Enums.MediaReviewStatus;
        reviewNote: string | null;
        reviewedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["samplePhoto"]>;
    composites: {};
};
export type SamplePhotoGetPayload<S extends boolean | null | undefined | SamplePhotoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload, S>;
export type SamplePhotoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SamplePhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SamplePhotoCountAggregateInputType | true;
};
export interface SamplePhotoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SamplePhoto'];
        meta: {
            name: 'SamplePhoto';
        };
    };
    findUnique<T extends SamplePhotoFindUniqueArgs>(args: Prisma.SelectSubset<T, SamplePhotoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SamplePhotoClient<runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SamplePhotoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SamplePhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SamplePhotoClient<runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SamplePhotoFindFirstArgs>(args?: Prisma.SelectSubset<T, SamplePhotoFindFirstArgs<ExtArgs>>): Prisma.Prisma__SamplePhotoClient<runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SamplePhotoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SamplePhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SamplePhotoClient<runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SamplePhotoFindManyArgs>(args?: Prisma.SelectSubset<T, SamplePhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SamplePhotoCreateArgs>(args: Prisma.SelectSubset<T, SamplePhotoCreateArgs<ExtArgs>>): Prisma.Prisma__SamplePhotoClient<runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SamplePhotoCreateManyArgs>(args?: Prisma.SelectSubset<T, SamplePhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SamplePhotoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SamplePhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SamplePhotoDeleteArgs>(args: Prisma.SelectSubset<T, SamplePhotoDeleteArgs<ExtArgs>>): Prisma.Prisma__SamplePhotoClient<runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SamplePhotoUpdateArgs>(args: Prisma.SelectSubset<T, SamplePhotoUpdateArgs<ExtArgs>>): Prisma.Prisma__SamplePhotoClient<runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SamplePhotoDeleteManyArgs>(args?: Prisma.SelectSubset<T, SamplePhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SamplePhotoUpdateManyArgs>(args: Prisma.SelectSubset<T, SamplePhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SamplePhotoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SamplePhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SamplePhotoUpsertArgs>(args: Prisma.SelectSubset<T, SamplePhotoUpsertArgs<ExtArgs>>): Prisma.Prisma__SamplePhotoClient<runtime.Types.Result.GetResult<Prisma.$SamplePhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SamplePhotoCountArgs>(args?: Prisma.Subset<T, SamplePhotoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SamplePhotoCountAggregateOutputType> : number>;
    aggregate<T extends SamplePhotoAggregateArgs>(args: Prisma.Subset<T, SamplePhotoAggregateArgs>): Prisma.PrismaPromise<GetSamplePhotoAggregateType<T>>;
    groupBy<T extends SamplePhotoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SamplePhotoGroupByArgs['orderBy'];
    } : {
        orderBy?: SamplePhotoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SamplePhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSamplePhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SamplePhotoFieldRefs;
}
export interface Prisma__SamplePhotoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sample<T extends Prisma.SampleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SampleDefaultArgs<ExtArgs>>): Prisma.Prisma__SampleClient<runtime.Types.Result.GetResult<Prisma.$SamplePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    file<T extends Prisma.FileAssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileAssetDefaultArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SamplePhotoFieldRefs {
    readonly id: Prisma.FieldRef<"SamplePhoto", 'String'>;
    readonly sampleId: Prisma.FieldRef<"SamplePhoto", 'String'>;
    readonly fileId: Prisma.FieldRef<"SamplePhoto", 'String'>;
    readonly reviewStatus: Prisma.FieldRef<"SamplePhoto", 'MediaReviewStatus'>;
    readonly reviewNote: Prisma.FieldRef<"SamplePhoto", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"SamplePhoto", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"SamplePhoto", 'DateTime'>;
}
export type SamplePhotoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelect<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    include?: Prisma.SamplePhotoInclude<ExtArgs> | null;
    where: Prisma.SamplePhotoWhereUniqueInput;
};
export type SamplePhotoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelect<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    include?: Prisma.SamplePhotoInclude<ExtArgs> | null;
    where: Prisma.SamplePhotoWhereUniqueInput;
};
export type SamplePhotoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelect<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    include?: Prisma.SamplePhotoInclude<ExtArgs> | null;
    where?: Prisma.SamplePhotoWhereInput;
    orderBy?: Prisma.SamplePhotoOrderByWithRelationInput | Prisma.SamplePhotoOrderByWithRelationInput[];
    cursor?: Prisma.SamplePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SamplePhotoScalarFieldEnum | Prisma.SamplePhotoScalarFieldEnum[];
};
export type SamplePhotoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelect<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    include?: Prisma.SamplePhotoInclude<ExtArgs> | null;
    where?: Prisma.SamplePhotoWhereInput;
    orderBy?: Prisma.SamplePhotoOrderByWithRelationInput | Prisma.SamplePhotoOrderByWithRelationInput[];
    cursor?: Prisma.SamplePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SamplePhotoScalarFieldEnum | Prisma.SamplePhotoScalarFieldEnum[];
};
export type SamplePhotoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelect<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    include?: Prisma.SamplePhotoInclude<ExtArgs> | null;
    where?: Prisma.SamplePhotoWhereInput;
    orderBy?: Prisma.SamplePhotoOrderByWithRelationInput | Prisma.SamplePhotoOrderByWithRelationInput[];
    cursor?: Prisma.SamplePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SamplePhotoScalarFieldEnum | Prisma.SamplePhotoScalarFieldEnum[];
};
export type SamplePhotoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelect<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    include?: Prisma.SamplePhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SamplePhotoCreateInput, Prisma.SamplePhotoUncheckedCreateInput>;
};
export type SamplePhotoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SamplePhotoCreateManyInput | Prisma.SamplePhotoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SamplePhotoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    data: Prisma.SamplePhotoCreateManyInput | Prisma.SamplePhotoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SamplePhotoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SamplePhotoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelect<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    include?: Prisma.SamplePhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SamplePhotoUpdateInput, Prisma.SamplePhotoUncheckedUpdateInput>;
    where: Prisma.SamplePhotoWhereUniqueInput;
};
export type SamplePhotoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SamplePhotoUpdateManyMutationInput, Prisma.SamplePhotoUncheckedUpdateManyInput>;
    where?: Prisma.SamplePhotoWhereInput;
    limit?: number;
};
export type SamplePhotoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SamplePhotoUpdateManyMutationInput, Prisma.SamplePhotoUncheckedUpdateManyInput>;
    where?: Prisma.SamplePhotoWhereInput;
    limit?: number;
    include?: Prisma.SamplePhotoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SamplePhotoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelect<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    include?: Prisma.SamplePhotoInclude<ExtArgs> | null;
    where: Prisma.SamplePhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.SamplePhotoCreateInput, Prisma.SamplePhotoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SamplePhotoUpdateInput, Prisma.SamplePhotoUncheckedUpdateInput>;
};
export type SamplePhotoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelect<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    include?: Prisma.SamplePhotoInclude<ExtArgs> | null;
    where: Prisma.SamplePhotoWhereUniqueInput;
};
export type SamplePhotoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SamplePhotoWhereInput;
    limit?: number;
};
export type SamplePhotoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SamplePhotoSelect<ExtArgs> | null;
    omit?: Prisma.SamplePhotoOmit<ExtArgs> | null;
    include?: Prisma.SamplePhotoInclude<ExtArgs> | null;
};
