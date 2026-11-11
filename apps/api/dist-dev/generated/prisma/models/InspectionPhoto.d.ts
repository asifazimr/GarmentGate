import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InspectionPhotoModel = runtime.Types.Result.DefaultSelection<Prisma.$InspectionPhotoPayload>;
export type AggregateInspectionPhoto = {
    _count: InspectionPhotoCountAggregateOutputType | null;
    _min: InspectionPhotoMinAggregateOutputType | null;
    _max: InspectionPhotoMaxAggregateOutputType | null;
};
export type InspectionPhotoMinAggregateOutputType = {
    id: string | null;
    inspectionId: string | null;
    fileId: string | null;
    caption: string | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
};
export type InspectionPhotoMaxAggregateOutputType = {
    id: string | null;
    inspectionId: string | null;
    fileId: string | null;
    caption: string | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
};
export type InspectionPhotoCountAggregateOutputType = {
    id: number;
    inspectionId: number;
    fileId: number;
    caption: number;
    reviewStatus: number;
    reviewNote: number;
    reviewedAt: number;
    createdAt: number;
    _all: number;
};
export type InspectionPhotoMinAggregateInputType = {
    id?: true;
    inspectionId?: true;
    fileId?: true;
    caption?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
};
export type InspectionPhotoMaxAggregateInputType = {
    id?: true;
    inspectionId?: true;
    fileId?: true;
    caption?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
};
export type InspectionPhotoCountAggregateInputType = {
    id?: true;
    inspectionId?: true;
    fileId?: true;
    caption?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type InspectionPhotoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InspectionPhotoWhereInput;
    orderBy?: Prisma.InspectionPhotoOrderByWithRelationInput | Prisma.InspectionPhotoOrderByWithRelationInput[];
    cursor?: Prisma.InspectionPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InspectionPhotoCountAggregateInputType;
    _min?: InspectionPhotoMinAggregateInputType;
    _max?: InspectionPhotoMaxAggregateInputType;
};
export type GetInspectionPhotoAggregateType<T extends InspectionPhotoAggregateArgs> = {
    [P in keyof T & keyof AggregateInspectionPhoto]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInspectionPhoto[P]> : Prisma.GetScalarType<T[P], AggregateInspectionPhoto[P]>;
};
export type InspectionPhotoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InspectionPhotoWhereInput;
    orderBy?: Prisma.InspectionPhotoOrderByWithAggregationInput | Prisma.InspectionPhotoOrderByWithAggregationInput[];
    by: Prisma.InspectionPhotoScalarFieldEnum[] | Prisma.InspectionPhotoScalarFieldEnum;
    having?: Prisma.InspectionPhotoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InspectionPhotoCountAggregateInputType | true;
    _min?: InspectionPhotoMinAggregateInputType;
    _max?: InspectionPhotoMaxAggregateInputType;
};
export type InspectionPhotoGroupByOutputType = {
    id: string;
    inspectionId: string;
    fileId: string;
    caption: string | null;
    reviewStatus: $Enums.MediaReviewStatus;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    _count: InspectionPhotoCountAggregateOutputType | null;
    _min: InspectionPhotoMinAggregateOutputType | null;
    _max: InspectionPhotoMaxAggregateOutputType | null;
};
export type GetInspectionPhotoGroupByPayload<T extends InspectionPhotoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InspectionPhotoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InspectionPhotoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InspectionPhotoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InspectionPhotoGroupByOutputType[P]>;
}>>;
export type InspectionPhotoWhereInput = {
    AND?: Prisma.InspectionPhotoWhereInput | Prisma.InspectionPhotoWhereInput[];
    OR?: Prisma.InspectionPhotoWhereInput[];
    NOT?: Prisma.InspectionPhotoWhereInput | Prisma.InspectionPhotoWhereInput[];
    id?: Prisma.UuidFilter<"InspectionPhoto"> | string;
    inspectionId?: Prisma.UuidFilter<"InspectionPhoto"> | string;
    fileId?: Prisma.UuidFilter<"InspectionPhoto"> | string;
    caption?: Prisma.StringNullableFilter<"InspectionPhoto"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"InspectionPhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"InspectionPhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"InspectionPhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"InspectionPhoto"> | Date | string;
    inspection?: Prisma.XOR<Prisma.InspectionScalarRelationFilter, Prisma.InspectionWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
};
export type InspectionPhotoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    caption?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    inspection?: Prisma.InspectionOrderByWithRelationInput;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type InspectionPhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.InspectionPhotoWhereInput | Prisma.InspectionPhotoWhereInput[];
    OR?: Prisma.InspectionPhotoWhereInput[];
    NOT?: Prisma.InspectionPhotoWhereInput | Prisma.InspectionPhotoWhereInput[];
    inspectionId?: Prisma.UuidFilter<"InspectionPhoto"> | string;
    caption?: Prisma.StringNullableFilter<"InspectionPhoto"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"InspectionPhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"InspectionPhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"InspectionPhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"InspectionPhoto"> | Date | string;
    inspection?: Prisma.XOR<Prisma.InspectionScalarRelationFilter, Prisma.InspectionWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
}, "id" | "fileId">;
export type InspectionPhotoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    caption?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.InspectionPhotoCountOrderByAggregateInput;
    _max?: Prisma.InspectionPhotoMaxOrderByAggregateInput;
    _min?: Prisma.InspectionPhotoMinOrderByAggregateInput;
};
export type InspectionPhotoScalarWhereWithAggregatesInput = {
    AND?: Prisma.InspectionPhotoScalarWhereWithAggregatesInput | Prisma.InspectionPhotoScalarWhereWithAggregatesInput[];
    OR?: Prisma.InspectionPhotoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InspectionPhotoScalarWhereWithAggregatesInput | Prisma.InspectionPhotoScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"InspectionPhoto"> | string;
    inspectionId?: Prisma.UuidWithAggregatesFilter<"InspectionPhoto"> | string;
    fileId?: Prisma.UuidWithAggregatesFilter<"InspectionPhoto"> | string;
    caption?: Prisma.StringNullableWithAggregatesFilter<"InspectionPhoto"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusWithAggregatesFilter<"InspectionPhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableWithAggregatesFilter<"InspectionPhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"InspectionPhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"InspectionPhoto"> | Date | string;
};
export type InspectionPhotoCreateInput = {
    id?: string;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    inspection: Prisma.InspectionCreateNestedOneWithoutPhotosInput;
    file: Prisma.FileAssetCreateNestedOneWithoutInspectionPhotoInput;
};
export type InspectionPhotoUncheckedCreateInput = {
    id?: string;
    inspectionId: string;
    fileId: string;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type InspectionPhotoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspection?: Prisma.InspectionUpdateOneRequiredWithoutPhotosNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutInspectionPhotoNestedInput;
};
export type InspectionPhotoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectionId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionPhotoCreateManyInput = {
    id?: string;
    inspectionId: string;
    fileId: string;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type InspectionPhotoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionPhotoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectionId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionPhotoListRelationFilter = {
    every?: Prisma.InspectionPhotoWhereInput;
    some?: Prisma.InspectionPhotoWhereInput;
    none?: Prisma.InspectionPhotoWhereInput;
};
export type InspectionPhotoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InspectionPhotoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    caption?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InspectionPhotoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    caption?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InspectionPhotoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    inspectionId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    caption?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InspectionPhotoNullableScalarRelationFilter = {
    is?: Prisma.InspectionPhotoWhereInput | null;
    isNot?: Prisma.InspectionPhotoWhereInput | null;
};
export type InspectionPhotoCreateNestedManyWithoutInspectionInput = {
    create?: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutInspectionInput, Prisma.InspectionPhotoUncheckedCreateWithoutInspectionInput> | Prisma.InspectionPhotoCreateWithoutInspectionInput[] | Prisma.InspectionPhotoUncheckedCreateWithoutInspectionInput[];
    connectOrCreate?: Prisma.InspectionPhotoCreateOrConnectWithoutInspectionInput | Prisma.InspectionPhotoCreateOrConnectWithoutInspectionInput[];
    createMany?: Prisma.InspectionPhotoCreateManyInspectionInputEnvelope;
    connect?: Prisma.InspectionPhotoWhereUniqueInput | Prisma.InspectionPhotoWhereUniqueInput[];
};
export type InspectionPhotoUncheckedCreateNestedManyWithoutInspectionInput = {
    create?: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutInspectionInput, Prisma.InspectionPhotoUncheckedCreateWithoutInspectionInput> | Prisma.InspectionPhotoCreateWithoutInspectionInput[] | Prisma.InspectionPhotoUncheckedCreateWithoutInspectionInput[];
    connectOrCreate?: Prisma.InspectionPhotoCreateOrConnectWithoutInspectionInput | Prisma.InspectionPhotoCreateOrConnectWithoutInspectionInput[];
    createMany?: Prisma.InspectionPhotoCreateManyInspectionInputEnvelope;
    connect?: Prisma.InspectionPhotoWhereUniqueInput | Prisma.InspectionPhotoWhereUniqueInput[];
};
export type InspectionPhotoUpdateManyWithoutInspectionNestedInput = {
    create?: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutInspectionInput, Prisma.InspectionPhotoUncheckedCreateWithoutInspectionInput> | Prisma.InspectionPhotoCreateWithoutInspectionInput[] | Prisma.InspectionPhotoUncheckedCreateWithoutInspectionInput[];
    connectOrCreate?: Prisma.InspectionPhotoCreateOrConnectWithoutInspectionInput | Prisma.InspectionPhotoCreateOrConnectWithoutInspectionInput[];
    upsert?: Prisma.InspectionPhotoUpsertWithWhereUniqueWithoutInspectionInput | Prisma.InspectionPhotoUpsertWithWhereUniqueWithoutInspectionInput[];
    createMany?: Prisma.InspectionPhotoCreateManyInspectionInputEnvelope;
    set?: Prisma.InspectionPhotoWhereUniqueInput | Prisma.InspectionPhotoWhereUniqueInput[];
    disconnect?: Prisma.InspectionPhotoWhereUniqueInput | Prisma.InspectionPhotoWhereUniqueInput[];
    delete?: Prisma.InspectionPhotoWhereUniqueInput | Prisma.InspectionPhotoWhereUniqueInput[];
    connect?: Prisma.InspectionPhotoWhereUniqueInput | Prisma.InspectionPhotoWhereUniqueInput[];
    update?: Prisma.InspectionPhotoUpdateWithWhereUniqueWithoutInspectionInput | Prisma.InspectionPhotoUpdateWithWhereUniqueWithoutInspectionInput[];
    updateMany?: Prisma.InspectionPhotoUpdateManyWithWhereWithoutInspectionInput | Prisma.InspectionPhotoUpdateManyWithWhereWithoutInspectionInput[];
    deleteMany?: Prisma.InspectionPhotoScalarWhereInput | Prisma.InspectionPhotoScalarWhereInput[];
};
export type InspectionPhotoUncheckedUpdateManyWithoutInspectionNestedInput = {
    create?: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutInspectionInput, Prisma.InspectionPhotoUncheckedCreateWithoutInspectionInput> | Prisma.InspectionPhotoCreateWithoutInspectionInput[] | Prisma.InspectionPhotoUncheckedCreateWithoutInspectionInput[];
    connectOrCreate?: Prisma.InspectionPhotoCreateOrConnectWithoutInspectionInput | Prisma.InspectionPhotoCreateOrConnectWithoutInspectionInput[];
    upsert?: Prisma.InspectionPhotoUpsertWithWhereUniqueWithoutInspectionInput | Prisma.InspectionPhotoUpsertWithWhereUniqueWithoutInspectionInput[];
    createMany?: Prisma.InspectionPhotoCreateManyInspectionInputEnvelope;
    set?: Prisma.InspectionPhotoWhereUniqueInput | Prisma.InspectionPhotoWhereUniqueInput[];
    disconnect?: Prisma.InspectionPhotoWhereUniqueInput | Prisma.InspectionPhotoWhereUniqueInput[];
    delete?: Prisma.InspectionPhotoWhereUniqueInput | Prisma.InspectionPhotoWhereUniqueInput[];
    connect?: Prisma.InspectionPhotoWhereUniqueInput | Prisma.InspectionPhotoWhereUniqueInput[];
    update?: Prisma.InspectionPhotoUpdateWithWhereUniqueWithoutInspectionInput | Prisma.InspectionPhotoUpdateWithWhereUniqueWithoutInspectionInput[];
    updateMany?: Prisma.InspectionPhotoUpdateManyWithWhereWithoutInspectionInput | Prisma.InspectionPhotoUpdateManyWithWhereWithoutInspectionInput[];
    deleteMany?: Prisma.InspectionPhotoScalarWhereInput | Prisma.InspectionPhotoScalarWhereInput[];
};
export type InspectionPhotoCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutFileInput, Prisma.InspectionPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.InspectionPhotoCreateOrConnectWithoutFileInput;
    connect?: Prisma.InspectionPhotoWhereUniqueInput;
};
export type InspectionPhotoUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutFileInput, Prisma.InspectionPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.InspectionPhotoCreateOrConnectWithoutFileInput;
    connect?: Prisma.InspectionPhotoWhereUniqueInput;
};
export type InspectionPhotoUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutFileInput, Prisma.InspectionPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.InspectionPhotoCreateOrConnectWithoutFileInput;
    upsert?: Prisma.InspectionPhotoUpsertWithoutFileInput;
    disconnect?: Prisma.InspectionPhotoWhereInput | boolean;
    delete?: Prisma.InspectionPhotoWhereInput | boolean;
    connect?: Prisma.InspectionPhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InspectionPhotoUpdateToOneWithWhereWithoutFileInput, Prisma.InspectionPhotoUpdateWithoutFileInput>, Prisma.InspectionPhotoUncheckedUpdateWithoutFileInput>;
};
export type InspectionPhotoUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutFileInput, Prisma.InspectionPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.InspectionPhotoCreateOrConnectWithoutFileInput;
    upsert?: Prisma.InspectionPhotoUpsertWithoutFileInput;
    disconnect?: Prisma.InspectionPhotoWhereInput | boolean;
    delete?: Prisma.InspectionPhotoWhereInput | boolean;
    connect?: Prisma.InspectionPhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InspectionPhotoUpdateToOneWithWhereWithoutFileInput, Prisma.InspectionPhotoUpdateWithoutFileInput>, Prisma.InspectionPhotoUncheckedUpdateWithoutFileInput>;
};
export type InspectionPhotoCreateWithoutInspectionInput = {
    id?: string;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    file: Prisma.FileAssetCreateNestedOneWithoutInspectionPhotoInput;
};
export type InspectionPhotoUncheckedCreateWithoutInspectionInput = {
    id?: string;
    fileId: string;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type InspectionPhotoCreateOrConnectWithoutInspectionInput = {
    where: Prisma.InspectionPhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutInspectionInput, Prisma.InspectionPhotoUncheckedCreateWithoutInspectionInput>;
};
export type InspectionPhotoCreateManyInspectionInputEnvelope = {
    data: Prisma.InspectionPhotoCreateManyInspectionInput | Prisma.InspectionPhotoCreateManyInspectionInput[];
    skipDuplicates?: boolean;
};
export type InspectionPhotoUpsertWithWhereUniqueWithoutInspectionInput = {
    where: Prisma.InspectionPhotoWhereUniqueInput;
    update: Prisma.XOR<Prisma.InspectionPhotoUpdateWithoutInspectionInput, Prisma.InspectionPhotoUncheckedUpdateWithoutInspectionInput>;
    create: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutInspectionInput, Prisma.InspectionPhotoUncheckedCreateWithoutInspectionInput>;
};
export type InspectionPhotoUpdateWithWhereUniqueWithoutInspectionInput = {
    where: Prisma.InspectionPhotoWhereUniqueInput;
    data: Prisma.XOR<Prisma.InspectionPhotoUpdateWithoutInspectionInput, Prisma.InspectionPhotoUncheckedUpdateWithoutInspectionInput>;
};
export type InspectionPhotoUpdateManyWithWhereWithoutInspectionInput = {
    where: Prisma.InspectionPhotoScalarWhereInput;
    data: Prisma.XOR<Prisma.InspectionPhotoUpdateManyMutationInput, Prisma.InspectionPhotoUncheckedUpdateManyWithoutInspectionInput>;
};
export type InspectionPhotoScalarWhereInput = {
    AND?: Prisma.InspectionPhotoScalarWhereInput | Prisma.InspectionPhotoScalarWhereInput[];
    OR?: Prisma.InspectionPhotoScalarWhereInput[];
    NOT?: Prisma.InspectionPhotoScalarWhereInput | Prisma.InspectionPhotoScalarWhereInput[];
    id?: Prisma.UuidFilter<"InspectionPhoto"> | string;
    inspectionId?: Prisma.UuidFilter<"InspectionPhoto"> | string;
    fileId?: Prisma.UuidFilter<"InspectionPhoto"> | string;
    caption?: Prisma.StringNullableFilter<"InspectionPhoto"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"InspectionPhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"InspectionPhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"InspectionPhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"InspectionPhoto"> | Date | string;
};
export type InspectionPhotoCreateWithoutFileInput = {
    id?: string;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    inspection: Prisma.InspectionCreateNestedOneWithoutPhotosInput;
};
export type InspectionPhotoUncheckedCreateWithoutFileInput = {
    id?: string;
    inspectionId: string;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type InspectionPhotoCreateOrConnectWithoutFileInput = {
    where: Prisma.InspectionPhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutFileInput, Prisma.InspectionPhotoUncheckedCreateWithoutFileInput>;
};
export type InspectionPhotoUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.InspectionPhotoUpdateWithoutFileInput, Prisma.InspectionPhotoUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.InspectionPhotoCreateWithoutFileInput, Prisma.InspectionPhotoUncheckedCreateWithoutFileInput>;
    where?: Prisma.InspectionPhotoWhereInput;
};
export type InspectionPhotoUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.InspectionPhotoWhereInput;
    data: Prisma.XOR<Prisma.InspectionPhotoUpdateWithoutFileInput, Prisma.InspectionPhotoUncheckedUpdateWithoutFileInput>;
};
export type InspectionPhotoUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    inspection?: Prisma.InspectionUpdateOneRequiredWithoutPhotosNestedInput;
};
export type InspectionPhotoUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    inspectionId?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionPhotoCreateManyInspectionInput = {
    id?: string;
    fileId: string;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type InspectionPhotoUpdateWithoutInspectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutInspectionPhotoNestedInput;
};
export type InspectionPhotoUncheckedUpdateWithoutInspectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionPhotoUncheckedUpdateManyWithoutInspectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectionPhotoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    inspectionId?: boolean;
    fileId?: boolean;
    caption?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    inspection?: boolean | Prisma.InspectionDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inspectionPhoto"]>;
export type InspectionPhotoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    inspectionId?: boolean;
    fileId?: boolean;
    caption?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    inspection?: boolean | Prisma.InspectionDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inspectionPhoto"]>;
export type InspectionPhotoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    inspectionId?: boolean;
    fileId?: boolean;
    caption?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    inspection?: boolean | Prisma.InspectionDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inspectionPhoto"]>;
export type InspectionPhotoSelectScalar = {
    id?: boolean;
    inspectionId?: boolean;
    fileId?: boolean;
    caption?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
};
export type InspectionPhotoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "inspectionId" | "fileId" | "caption" | "reviewStatus" | "reviewNote" | "reviewedAt" | "createdAt", ExtArgs["result"]["inspectionPhoto"]>;
export type InspectionPhotoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    inspection?: boolean | Prisma.InspectionDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type InspectionPhotoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    inspection?: boolean | Prisma.InspectionDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type InspectionPhotoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    inspection?: boolean | Prisma.InspectionDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type $InspectionPhotoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InspectionPhoto";
    objects: {
        inspection: Prisma.$InspectionPayload<ExtArgs>;
        file: Prisma.$FileAssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        inspectionId: string;
        fileId: string;
        caption: string | null;
        reviewStatus: $Enums.MediaReviewStatus;
        reviewNote: string | null;
        reviewedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["inspectionPhoto"]>;
    composites: {};
};
export type InspectionPhotoGetPayload<S extends boolean | null | undefined | InspectionPhotoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload, S>;
export type InspectionPhotoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InspectionPhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InspectionPhotoCountAggregateInputType | true;
};
export interface InspectionPhotoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InspectionPhoto'];
        meta: {
            name: 'InspectionPhoto';
        };
    };
    findUnique<T extends InspectionPhotoFindUniqueArgs>(args: Prisma.SelectSubset<T, InspectionPhotoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InspectionPhotoClient<runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InspectionPhotoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InspectionPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InspectionPhotoClient<runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InspectionPhotoFindFirstArgs>(args?: Prisma.SelectSubset<T, InspectionPhotoFindFirstArgs<ExtArgs>>): Prisma.Prisma__InspectionPhotoClient<runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InspectionPhotoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InspectionPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InspectionPhotoClient<runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InspectionPhotoFindManyArgs>(args?: Prisma.SelectSubset<T, InspectionPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InspectionPhotoCreateArgs>(args: Prisma.SelectSubset<T, InspectionPhotoCreateArgs<ExtArgs>>): Prisma.Prisma__InspectionPhotoClient<runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InspectionPhotoCreateManyArgs>(args?: Prisma.SelectSubset<T, InspectionPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InspectionPhotoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InspectionPhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InspectionPhotoDeleteArgs>(args: Prisma.SelectSubset<T, InspectionPhotoDeleteArgs<ExtArgs>>): Prisma.Prisma__InspectionPhotoClient<runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InspectionPhotoUpdateArgs>(args: Prisma.SelectSubset<T, InspectionPhotoUpdateArgs<ExtArgs>>): Prisma.Prisma__InspectionPhotoClient<runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InspectionPhotoDeleteManyArgs>(args?: Prisma.SelectSubset<T, InspectionPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InspectionPhotoUpdateManyArgs>(args: Prisma.SelectSubset<T, InspectionPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InspectionPhotoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InspectionPhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InspectionPhotoUpsertArgs>(args: Prisma.SelectSubset<T, InspectionPhotoUpsertArgs<ExtArgs>>): Prisma.Prisma__InspectionPhotoClient<runtime.Types.Result.GetResult<Prisma.$InspectionPhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InspectionPhotoCountArgs>(args?: Prisma.Subset<T, InspectionPhotoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InspectionPhotoCountAggregateOutputType> : number>;
    aggregate<T extends InspectionPhotoAggregateArgs>(args: Prisma.Subset<T, InspectionPhotoAggregateArgs>): Prisma.PrismaPromise<GetInspectionPhotoAggregateType<T>>;
    groupBy<T extends InspectionPhotoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InspectionPhotoGroupByArgs['orderBy'];
    } : {
        orderBy?: InspectionPhotoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InspectionPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInspectionPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InspectionPhotoFieldRefs;
}
export interface Prisma__InspectionPhotoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    inspection<T extends Prisma.InspectionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InspectionDefaultArgs<ExtArgs>>): Prisma.Prisma__InspectionClient<runtime.Types.Result.GetResult<Prisma.$InspectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    file<T extends Prisma.FileAssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileAssetDefaultArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InspectionPhotoFieldRefs {
    readonly id: Prisma.FieldRef<"InspectionPhoto", 'String'>;
    readonly inspectionId: Prisma.FieldRef<"InspectionPhoto", 'String'>;
    readonly fileId: Prisma.FieldRef<"InspectionPhoto", 'String'>;
    readonly caption: Prisma.FieldRef<"InspectionPhoto", 'String'>;
    readonly reviewStatus: Prisma.FieldRef<"InspectionPhoto", 'MediaReviewStatus'>;
    readonly reviewNote: Prisma.FieldRef<"InspectionPhoto", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"InspectionPhoto", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"InspectionPhoto", 'DateTime'>;
}
export type InspectionPhotoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    include?: Prisma.InspectionPhotoInclude<ExtArgs> | null;
    where: Prisma.InspectionPhotoWhereUniqueInput;
};
export type InspectionPhotoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    include?: Prisma.InspectionPhotoInclude<ExtArgs> | null;
    where: Prisma.InspectionPhotoWhereUniqueInput;
};
export type InspectionPhotoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    include?: Prisma.InspectionPhotoInclude<ExtArgs> | null;
    where?: Prisma.InspectionPhotoWhereInput;
    orderBy?: Prisma.InspectionPhotoOrderByWithRelationInput | Prisma.InspectionPhotoOrderByWithRelationInput[];
    cursor?: Prisma.InspectionPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InspectionPhotoScalarFieldEnum | Prisma.InspectionPhotoScalarFieldEnum[];
};
export type InspectionPhotoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    include?: Prisma.InspectionPhotoInclude<ExtArgs> | null;
    where?: Prisma.InspectionPhotoWhereInput;
    orderBy?: Prisma.InspectionPhotoOrderByWithRelationInput | Prisma.InspectionPhotoOrderByWithRelationInput[];
    cursor?: Prisma.InspectionPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InspectionPhotoScalarFieldEnum | Prisma.InspectionPhotoScalarFieldEnum[];
};
export type InspectionPhotoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    include?: Prisma.InspectionPhotoInclude<ExtArgs> | null;
    where?: Prisma.InspectionPhotoWhereInput;
    orderBy?: Prisma.InspectionPhotoOrderByWithRelationInput | Prisma.InspectionPhotoOrderByWithRelationInput[];
    cursor?: Prisma.InspectionPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InspectionPhotoScalarFieldEnum | Prisma.InspectionPhotoScalarFieldEnum[];
};
export type InspectionPhotoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    include?: Prisma.InspectionPhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InspectionPhotoCreateInput, Prisma.InspectionPhotoUncheckedCreateInput>;
};
export type InspectionPhotoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InspectionPhotoCreateManyInput | Prisma.InspectionPhotoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InspectionPhotoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    data: Prisma.InspectionPhotoCreateManyInput | Prisma.InspectionPhotoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InspectionPhotoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InspectionPhotoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    include?: Prisma.InspectionPhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InspectionPhotoUpdateInput, Prisma.InspectionPhotoUncheckedUpdateInput>;
    where: Prisma.InspectionPhotoWhereUniqueInput;
};
export type InspectionPhotoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InspectionPhotoUpdateManyMutationInput, Prisma.InspectionPhotoUncheckedUpdateManyInput>;
    where?: Prisma.InspectionPhotoWhereInput;
    limit?: number;
};
export type InspectionPhotoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InspectionPhotoUpdateManyMutationInput, Prisma.InspectionPhotoUncheckedUpdateManyInput>;
    where?: Prisma.InspectionPhotoWhereInput;
    limit?: number;
    include?: Prisma.InspectionPhotoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InspectionPhotoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    include?: Prisma.InspectionPhotoInclude<ExtArgs> | null;
    where: Prisma.InspectionPhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.InspectionPhotoCreateInput, Prisma.InspectionPhotoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InspectionPhotoUpdateInput, Prisma.InspectionPhotoUncheckedUpdateInput>;
};
export type InspectionPhotoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    include?: Prisma.InspectionPhotoInclude<ExtArgs> | null;
    where: Prisma.InspectionPhotoWhereUniqueInput;
};
export type InspectionPhotoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InspectionPhotoWhereInput;
    limit?: number;
};
export type InspectionPhotoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectionPhotoSelect<ExtArgs> | null;
    omit?: Prisma.InspectionPhotoOmit<ExtArgs> | null;
    include?: Prisma.InspectionPhotoInclude<ExtArgs> | null;
};
