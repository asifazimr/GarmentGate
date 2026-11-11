import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MilestonePhotoModel = runtime.Types.Result.DefaultSelection<Prisma.$MilestonePhotoPayload>;
export type AggregateMilestonePhoto = {
    _count: MilestonePhotoCountAggregateOutputType | null;
    _min: MilestonePhotoMinAggregateOutputType | null;
    _max: MilestonePhotoMaxAggregateOutputType | null;
};
export type MilestonePhotoMinAggregateOutputType = {
    id: string | null;
    milestoneId: string | null;
    fileId: string | null;
    takenAt: Date | null;
    caption: string | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
};
export type MilestonePhotoMaxAggregateOutputType = {
    id: string | null;
    milestoneId: string | null;
    fileId: string | null;
    takenAt: Date | null;
    caption: string | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
};
export type MilestonePhotoCountAggregateOutputType = {
    id: number;
    milestoneId: number;
    fileId: number;
    takenAt: number;
    caption: number;
    reviewStatus: number;
    reviewNote: number;
    reviewedAt: number;
    createdAt: number;
    _all: number;
};
export type MilestonePhotoMinAggregateInputType = {
    id?: true;
    milestoneId?: true;
    fileId?: true;
    takenAt?: true;
    caption?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
};
export type MilestonePhotoMaxAggregateInputType = {
    id?: true;
    milestoneId?: true;
    fileId?: true;
    takenAt?: true;
    caption?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
};
export type MilestonePhotoCountAggregateInputType = {
    id?: true;
    milestoneId?: true;
    fileId?: true;
    takenAt?: true;
    caption?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type MilestonePhotoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MilestonePhotoWhereInput;
    orderBy?: Prisma.MilestonePhotoOrderByWithRelationInput | Prisma.MilestonePhotoOrderByWithRelationInput[];
    cursor?: Prisma.MilestonePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MilestonePhotoCountAggregateInputType;
    _min?: MilestonePhotoMinAggregateInputType;
    _max?: MilestonePhotoMaxAggregateInputType;
};
export type GetMilestonePhotoAggregateType<T extends MilestonePhotoAggregateArgs> = {
    [P in keyof T & keyof AggregateMilestonePhoto]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMilestonePhoto[P]> : Prisma.GetScalarType<T[P], AggregateMilestonePhoto[P]>;
};
export type MilestonePhotoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MilestonePhotoWhereInput;
    orderBy?: Prisma.MilestonePhotoOrderByWithAggregationInput | Prisma.MilestonePhotoOrderByWithAggregationInput[];
    by: Prisma.MilestonePhotoScalarFieldEnum[] | Prisma.MilestonePhotoScalarFieldEnum;
    having?: Prisma.MilestonePhotoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MilestonePhotoCountAggregateInputType | true;
    _min?: MilestonePhotoMinAggregateInputType;
    _max?: MilestonePhotoMaxAggregateInputType;
};
export type MilestonePhotoGroupByOutputType = {
    id: string;
    milestoneId: string;
    fileId: string;
    takenAt: Date | null;
    caption: string | null;
    reviewStatus: $Enums.MediaReviewStatus;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    _count: MilestonePhotoCountAggregateOutputType | null;
    _min: MilestonePhotoMinAggregateOutputType | null;
    _max: MilestonePhotoMaxAggregateOutputType | null;
};
export type GetMilestonePhotoGroupByPayload<T extends MilestonePhotoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MilestonePhotoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MilestonePhotoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MilestonePhotoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MilestonePhotoGroupByOutputType[P]>;
}>>;
export type MilestonePhotoWhereInput = {
    AND?: Prisma.MilestonePhotoWhereInput | Prisma.MilestonePhotoWhereInput[];
    OR?: Prisma.MilestonePhotoWhereInput[];
    NOT?: Prisma.MilestonePhotoWhereInput | Prisma.MilestonePhotoWhereInput[];
    id?: Prisma.UuidFilter<"MilestonePhoto"> | string;
    milestoneId?: Prisma.UuidFilter<"MilestonePhoto"> | string;
    fileId?: Prisma.UuidFilter<"MilestonePhoto"> | string;
    takenAt?: Prisma.DateTimeNullableFilter<"MilestonePhoto"> | Date | string | null;
    caption?: Prisma.StringNullableFilter<"MilestonePhoto"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"MilestonePhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"MilestonePhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"MilestonePhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"MilestonePhoto"> | Date | string;
    milestone?: Prisma.XOR<Prisma.OrderMilestoneScalarRelationFilter, Prisma.OrderMilestoneWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
};
export type MilestonePhotoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    milestoneId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    caption?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    milestone?: Prisma.OrderMilestoneOrderByWithRelationInput;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type MilestonePhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.MilestonePhotoWhereInput | Prisma.MilestonePhotoWhereInput[];
    OR?: Prisma.MilestonePhotoWhereInput[];
    NOT?: Prisma.MilestonePhotoWhereInput | Prisma.MilestonePhotoWhereInput[];
    milestoneId?: Prisma.UuidFilter<"MilestonePhoto"> | string;
    takenAt?: Prisma.DateTimeNullableFilter<"MilestonePhoto"> | Date | string | null;
    caption?: Prisma.StringNullableFilter<"MilestonePhoto"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"MilestonePhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"MilestonePhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"MilestonePhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"MilestonePhoto"> | Date | string;
    milestone?: Prisma.XOR<Prisma.OrderMilestoneScalarRelationFilter, Prisma.OrderMilestoneWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
}, "id" | "fileId">;
export type MilestonePhotoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    milestoneId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    caption?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MilestonePhotoCountOrderByAggregateInput;
    _max?: Prisma.MilestonePhotoMaxOrderByAggregateInput;
    _min?: Prisma.MilestonePhotoMinOrderByAggregateInput;
};
export type MilestonePhotoScalarWhereWithAggregatesInput = {
    AND?: Prisma.MilestonePhotoScalarWhereWithAggregatesInput | Prisma.MilestonePhotoScalarWhereWithAggregatesInput[];
    OR?: Prisma.MilestonePhotoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MilestonePhotoScalarWhereWithAggregatesInput | Prisma.MilestonePhotoScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MilestonePhoto"> | string;
    milestoneId?: Prisma.UuidWithAggregatesFilter<"MilestonePhoto"> | string;
    fileId?: Prisma.UuidWithAggregatesFilter<"MilestonePhoto"> | string;
    takenAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MilestonePhoto"> | Date | string | null;
    caption?: Prisma.StringNullableWithAggregatesFilter<"MilestonePhoto"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusWithAggregatesFilter<"MilestonePhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableWithAggregatesFilter<"MilestonePhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MilestonePhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MilestonePhoto"> | Date | string;
};
export type MilestonePhotoCreateInput = {
    id?: string;
    takenAt?: Date | string | null;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    milestone: Prisma.OrderMilestoneCreateNestedOneWithoutPhotosInput;
    file: Prisma.FileAssetCreateNestedOneWithoutMilestonePhotoInput;
};
export type MilestonePhotoUncheckedCreateInput = {
    id?: string;
    milestoneId: string;
    fileId: string;
    takenAt?: Date | string | null;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MilestonePhotoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    takenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    milestone?: Prisma.OrderMilestoneUpdateOneRequiredWithoutPhotosNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutMilestonePhotoNestedInput;
};
export type MilestonePhotoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    takenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MilestonePhotoCreateManyInput = {
    id?: string;
    milestoneId: string;
    fileId: string;
    takenAt?: Date | string | null;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MilestonePhotoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    takenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MilestonePhotoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    takenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MilestonePhotoListRelationFilter = {
    every?: Prisma.MilestonePhotoWhereInput;
    some?: Prisma.MilestonePhotoWhereInput;
    none?: Prisma.MilestonePhotoWhereInput;
};
export type MilestonePhotoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MilestonePhotoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    milestoneId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
    caption?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MilestonePhotoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    milestoneId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
    caption?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MilestonePhotoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    milestoneId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    takenAt?: Prisma.SortOrder;
    caption?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MilestonePhotoNullableScalarRelationFilter = {
    is?: Prisma.MilestonePhotoWhereInput | null;
    isNot?: Prisma.MilestonePhotoWhereInput | null;
};
export type MilestonePhotoCreateNestedManyWithoutMilestoneInput = {
    create?: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutMilestoneInput, Prisma.MilestonePhotoUncheckedCreateWithoutMilestoneInput> | Prisma.MilestonePhotoCreateWithoutMilestoneInput[] | Prisma.MilestonePhotoUncheckedCreateWithoutMilestoneInput[];
    connectOrCreate?: Prisma.MilestonePhotoCreateOrConnectWithoutMilestoneInput | Prisma.MilestonePhotoCreateOrConnectWithoutMilestoneInput[];
    createMany?: Prisma.MilestonePhotoCreateManyMilestoneInputEnvelope;
    connect?: Prisma.MilestonePhotoWhereUniqueInput | Prisma.MilestonePhotoWhereUniqueInput[];
};
export type MilestonePhotoUncheckedCreateNestedManyWithoutMilestoneInput = {
    create?: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutMilestoneInput, Prisma.MilestonePhotoUncheckedCreateWithoutMilestoneInput> | Prisma.MilestonePhotoCreateWithoutMilestoneInput[] | Prisma.MilestonePhotoUncheckedCreateWithoutMilestoneInput[];
    connectOrCreate?: Prisma.MilestonePhotoCreateOrConnectWithoutMilestoneInput | Prisma.MilestonePhotoCreateOrConnectWithoutMilestoneInput[];
    createMany?: Prisma.MilestonePhotoCreateManyMilestoneInputEnvelope;
    connect?: Prisma.MilestonePhotoWhereUniqueInput | Prisma.MilestonePhotoWhereUniqueInput[];
};
export type MilestonePhotoUpdateManyWithoutMilestoneNestedInput = {
    create?: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutMilestoneInput, Prisma.MilestonePhotoUncheckedCreateWithoutMilestoneInput> | Prisma.MilestonePhotoCreateWithoutMilestoneInput[] | Prisma.MilestonePhotoUncheckedCreateWithoutMilestoneInput[];
    connectOrCreate?: Prisma.MilestonePhotoCreateOrConnectWithoutMilestoneInput | Prisma.MilestonePhotoCreateOrConnectWithoutMilestoneInput[];
    upsert?: Prisma.MilestonePhotoUpsertWithWhereUniqueWithoutMilestoneInput | Prisma.MilestonePhotoUpsertWithWhereUniqueWithoutMilestoneInput[];
    createMany?: Prisma.MilestonePhotoCreateManyMilestoneInputEnvelope;
    set?: Prisma.MilestonePhotoWhereUniqueInput | Prisma.MilestonePhotoWhereUniqueInput[];
    disconnect?: Prisma.MilestonePhotoWhereUniqueInput | Prisma.MilestonePhotoWhereUniqueInput[];
    delete?: Prisma.MilestonePhotoWhereUniqueInput | Prisma.MilestonePhotoWhereUniqueInput[];
    connect?: Prisma.MilestonePhotoWhereUniqueInput | Prisma.MilestonePhotoWhereUniqueInput[];
    update?: Prisma.MilestonePhotoUpdateWithWhereUniqueWithoutMilestoneInput | Prisma.MilestonePhotoUpdateWithWhereUniqueWithoutMilestoneInput[];
    updateMany?: Prisma.MilestonePhotoUpdateManyWithWhereWithoutMilestoneInput | Prisma.MilestonePhotoUpdateManyWithWhereWithoutMilestoneInput[];
    deleteMany?: Prisma.MilestonePhotoScalarWhereInput | Prisma.MilestonePhotoScalarWhereInput[];
};
export type MilestonePhotoUncheckedUpdateManyWithoutMilestoneNestedInput = {
    create?: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutMilestoneInput, Prisma.MilestonePhotoUncheckedCreateWithoutMilestoneInput> | Prisma.MilestonePhotoCreateWithoutMilestoneInput[] | Prisma.MilestonePhotoUncheckedCreateWithoutMilestoneInput[];
    connectOrCreate?: Prisma.MilestonePhotoCreateOrConnectWithoutMilestoneInput | Prisma.MilestonePhotoCreateOrConnectWithoutMilestoneInput[];
    upsert?: Prisma.MilestonePhotoUpsertWithWhereUniqueWithoutMilestoneInput | Prisma.MilestonePhotoUpsertWithWhereUniqueWithoutMilestoneInput[];
    createMany?: Prisma.MilestonePhotoCreateManyMilestoneInputEnvelope;
    set?: Prisma.MilestonePhotoWhereUniqueInput | Prisma.MilestonePhotoWhereUniqueInput[];
    disconnect?: Prisma.MilestonePhotoWhereUniqueInput | Prisma.MilestonePhotoWhereUniqueInput[];
    delete?: Prisma.MilestonePhotoWhereUniqueInput | Prisma.MilestonePhotoWhereUniqueInput[];
    connect?: Prisma.MilestonePhotoWhereUniqueInput | Prisma.MilestonePhotoWhereUniqueInput[];
    update?: Prisma.MilestonePhotoUpdateWithWhereUniqueWithoutMilestoneInput | Prisma.MilestonePhotoUpdateWithWhereUniqueWithoutMilestoneInput[];
    updateMany?: Prisma.MilestonePhotoUpdateManyWithWhereWithoutMilestoneInput | Prisma.MilestonePhotoUpdateManyWithWhereWithoutMilestoneInput[];
    deleteMany?: Prisma.MilestonePhotoScalarWhereInput | Prisma.MilestonePhotoScalarWhereInput[];
};
export type MilestonePhotoCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutFileInput, Prisma.MilestonePhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.MilestonePhotoCreateOrConnectWithoutFileInput;
    connect?: Prisma.MilestonePhotoWhereUniqueInput;
};
export type MilestonePhotoUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutFileInput, Prisma.MilestonePhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.MilestonePhotoCreateOrConnectWithoutFileInput;
    connect?: Prisma.MilestonePhotoWhereUniqueInput;
};
export type MilestonePhotoUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutFileInput, Prisma.MilestonePhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.MilestonePhotoCreateOrConnectWithoutFileInput;
    upsert?: Prisma.MilestonePhotoUpsertWithoutFileInput;
    disconnect?: Prisma.MilestonePhotoWhereInput | boolean;
    delete?: Prisma.MilestonePhotoWhereInput | boolean;
    connect?: Prisma.MilestonePhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MilestonePhotoUpdateToOneWithWhereWithoutFileInput, Prisma.MilestonePhotoUpdateWithoutFileInput>, Prisma.MilestonePhotoUncheckedUpdateWithoutFileInput>;
};
export type MilestonePhotoUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutFileInput, Prisma.MilestonePhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.MilestonePhotoCreateOrConnectWithoutFileInput;
    upsert?: Prisma.MilestonePhotoUpsertWithoutFileInput;
    disconnect?: Prisma.MilestonePhotoWhereInput | boolean;
    delete?: Prisma.MilestonePhotoWhereInput | boolean;
    connect?: Prisma.MilestonePhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MilestonePhotoUpdateToOneWithWhereWithoutFileInput, Prisma.MilestonePhotoUpdateWithoutFileInput>, Prisma.MilestonePhotoUncheckedUpdateWithoutFileInput>;
};
export type MilestonePhotoCreateWithoutMilestoneInput = {
    id?: string;
    takenAt?: Date | string | null;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    file: Prisma.FileAssetCreateNestedOneWithoutMilestonePhotoInput;
};
export type MilestonePhotoUncheckedCreateWithoutMilestoneInput = {
    id?: string;
    fileId: string;
    takenAt?: Date | string | null;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MilestonePhotoCreateOrConnectWithoutMilestoneInput = {
    where: Prisma.MilestonePhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutMilestoneInput, Prisma.MilestonePhotoUncheckedCreateWithoutMilestoneInput>;
};
export type MilestonePhotoCreateManyMilestoneInputEnvelope = {
    data: Prisma.MilestonePhotoCreateManyMilestoneInput | Prisma.MilestonePhotoCreateManyMilestoneInput[];
    skipDuplicates?: boolean;
};
export type MilestonePhotoUpsertWithWhereUniqueWithoutMilestoneInput = {
    where: Prisma.MilestonePhotoWhereUniqueInput;
    update: Prisma.XOR<Prisma.MilestonePhotoUpdateWithoutMilestoneInput, Prisma.MilestonePhotoUncheckedUpdateWithoutMilestoneInput>;
    create: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutMilestoneInput, Prisma.MilestonePhotoUncheckedCreateWithoutMilestoneInput>;
};
export type MilestonePhotoUpdateWithWhereUniqueWithoutMilestoneInput = {
    where: Prisma.MilestonePhotoWhereUniqueInput;
    data: Prisma.XOR<Prisma.MilestonePhotoUpdateWithoutMilestoneInput, Prisma.MilestonePhotoUncheckedUpdateWithoutMilestoneInput>;
};
export type MilestonePhotoUpdateManyWithWhereWithoutMilestoneInput = {
    where: Prisma.MilestonePhotoScalarWhereInput;
    data: Prisma.XOR<Prisma.MilestonePhotoUpdateManyMutationInput, Prisma.MilestonePhotoUncheckedUpdateManyWithoutMilestoneInput>;
};
export type MilestonePhotoScalarWhereInput = {
    AND?: Prisma.MilestonePhotoScalarWhereInput | Prisma.MilestonePhotoScalarWhereInput[];
    OR?: Prisma.MilestonePhotoScalarWhereInput[];
    NOT?: Prisma.MilestonePhotoScalarWhereInput | Prisma.MilestonePhotoScalarWhereInput[];
    id?: Prisma.UuidFilter<"MilestonePhoto"> | string;
    milestoneId?: Prisma.UuidFilter<"MilestonePhoto"> | string;
    fileId?: Prisma.UuidFilter<"MilestonePhoto"> | string;
    takenAt?: Prisma.DateTimeNullableFilter<"MilestonePhoto"> | Date | string | null;
    caption?: Prisma.StringNullableFilter<"MilestonePhoto"> | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"MilestonePhoto"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"MilestonePhoto"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"MilestonePhoto"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"MilestonePhoto"> | Date | string;
};
export type MilestonePhotoCreateWithoutFileInput = {
    id?: string;
    takenAt?: Date | string | null;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    milestone: Prisma.OrderMilestoneCreateNestedOneWithoutPhotosInput;
};
export type MilestonePhotoUncheckedCreateWithoutFileInput = {
    id?: string;
    milestoneId: string;
    takenAt?: Date | string | null;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MilestonePhotoCreateOrConnectWithoutFileInput = {
    where: Prisma.MilestonePhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutFileInput, Prisma.MilestonePhotoUncheckedCreateWithoutFileInput>;
};
export type MilestonePhotoUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.MilestonePhotoUpdateWithoutFileInput, Prisma.MilestonePhotoUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.MilestonePhotoCreateWithoutFileInput, Prisma.MilestonePhotoUncheckedCreateWithoutFileInput>;
    where?: Prisma.MilestonePhotoWhereInput;
};
export type MilestonePhotoUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.MilestonePhotoWhereInput;
    data: Prisma.XOR<Prisma.MilestonePhotoUpdateWithoutFileInput, Prisma.MilestonePhotoUncheckedUpdateWithoutFileInput>;
};
export type MilestonePhotoUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    takenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    milestone?: Prisma.OrderMilestoneUpdateOneRequiredWithoutPhotosNestedInput;
};
export type MilestonePhotoUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    milestoneId?: Prisma.StringFieldUpdateOperationsInput | string;
    takenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MilestonePhotoCreateManyMilestoneInput = {
    id?: string;
    fileId: string;
    takenAt?: Date | string | null;
    caption?: string | null;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MilestonePhotoUpdateWithoutMilestoneInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    takenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutMilestonePhotoNestedInput;
};
export type MilestonePhotoUncheckedUpdateWithoutMilestoneInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    takenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MilestonePhotoUncheckedUpdateManyWithoutMilestoneInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    takenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    caption?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MilestonePhotoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    milestoneId?: boolean;
    fileId?: boolean;
    takenAt?: boolean;
    caption?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    milestone?: boolean | Prisma.OrderMilestoneDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["milestonePhoto"]>;
export type MilestonePhotoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    milestoneId?: boolean;
    fileId?: boolean;
    takenAt?: boolean;
    caption?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    milestone?: boolean | Prisma.OrderMilestoneDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["milestonePhoto"]>;
export type MilestonePhotoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    milestoneId?: boolean;
    fileId?: boolean;
    takenAt?: boolean;
    caption?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    milestone?: boolean | Prisma.OrderMilestoneDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["milestonePhoto"]>;
export type MilestonePhotoSelectScalar = {
    id?: boolean;
    milestoneId?: boolean;
    fileId?: boolean;
    takenAt?: boolean;
    caption?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
};
export type MilestonePhotoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "milestoneId" | "fileId" | "takenAt" | "caption" | "reviewStatus" | "reviewNote" | "reviewedAt" | "createdAt", ExtArgs["result"]["milestonePhoto"]>;
export type MilestonePhotoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    milestone?: boolean | Prisma.OrderMilestoneDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type MilestonePhotoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    milestone?: boolean | Prisma.OrderMilestoneDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type MilestonePhotoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    milestone?: boolean | Prisma.OrderMilestoneDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type $MilestonePhotoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MilestonePhoto";
    objects: {
        milestone: Prisma.$OrderMilestonePayload<ExtArgs>;
        file: Prisma.$FileAssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        milestoneId: string;
        fileId: string;
        takenAt: Date | null;
        caption: string | null;
        reviewStatus: $Enums.MediaReviewStatus;
        reviewNote: string | null;
        reviewedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["milestonePhoto"]>;
    composites: {};
};
export type MilestonePhotoGetPayload<S extends boolean | null | undefined | MilestonePhotoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload, S>;
export type MilestonePhotoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MilestonePhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MilestonePhotoCountAggregateInputType | true;
};
export interface MilestonePhotoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MilestonePhoto'];
        meta: {
            name: 'MilestonePhoto';
        };
    };
    findUnique<T extends MilestonePhotoFindUniqueArgs>(args: Prisma.SelectSubset<T, MilestonePhotoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MilestonePhotoClient<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MilestonePhotoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MilestonePhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MilestonePhotoClient<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MilestonePhotoFindFirstArgs>(args?: Prisma.SelectSubset<T, MilestonePhotoFindFirstArgs<ExtArgs>>): Prisma.Prisma__MilestonePhotoClient<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MilestonePhotoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MilestonePhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MilestonePhotoClient<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MilestonePhotoFindManyArgs>(args?: Prisma.SelectSubset<T, MilestonePhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MilestonePhotoCreateArgs>(args: Prisma.SelectSubset<T, MilestonePhotoCreateArgs<ExtArgs>>): Prisma.Prisma__MilestonePhotoClient<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MilestonePhotoCreateManyArgs>(args?: Prisma.SelectSubset<T, MilestonePhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MilestonePhotoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MilestonePhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MilestonePhotoDeleteArgs>(args: Prisma.SelectSubset<T, MilestonePhotoDeleteArgs<ExtArgs>>): Prisma.Prisma__MilestonePhotoClient<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MilestonePhotoUpdateArgs>(args: Prisma.SelectSubset<T, MilestonePhotoUpdateArgs<ExtArgs>>): Prisma.Prisma__MilestonePhotoClient<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MilestonePhotoDeleteManyArgs>(args?: Prisma.SelectSubset<T, MilestonePhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MilestonePhotoUpdateManyArgs>(args: Prisma.SelectSubset<T, MilestonePhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MilestonePhotoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MilestonePhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MilestonePhotoUpsertArgs>(args: Prisma.SelectSubset<T, MilestonePhotoUpsertArgs<ExtArgs>>): Prisma.Prisma__MilestonePhotoClient<runtime.Types.Result.GetResult<Prisma.$MilestonePhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MilestonePhotoCountArgs>(args?: Prisma.Subset<T, MilestonePhotoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MilestonePhotoCountAggregateOutputType> : number>;
    aggregate<T extends MilestonePhotoAggregateArgs>(args: Prisma.Subset<T, MilestonePhotoAggregateArgs>): Prisma.PrismaPromise<GetMilestonePhotoAggregateType<T>>;
    groupBy<T extends MilestonePhotoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MilestonePhotoGroupByArgs['orderBy'];
    } : {
        orderBy?: MilestonePhotoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MilestonePhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMilestonePhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MilestonePhotoFieldRefs;
}
export interface Prisma__MilestonePhotoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    milestone<T extends Prisma.OrderMilestoneDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderMilestoneDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderMilestoneClient<runtime.Types.Result.GetResult<Prisma.$OrderMilestonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    file<T extends Prisma.FileAssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileAssetDefaultArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MilestonePhotoFieldRefs {
    readonly id: Prisma.FieldRef<"MilestonePhoto", 'String'>;
    readonly milestoneId: Prisma.FieldRef<"MilestonePhoto", 'String'>;
    readonly fileId: Prisma.FieldRef<"MilestonePhoto", 'String'>;
    readonly takenAt: Prisma.FieldRef<"MilestonePhoto", 'DateTime'>;
    readonly caption: Prisma.FieldRef<"MilestonePhoto", 'String'>;
    readonly reviewStatus: Prisma.FieldRef<"MilestonePhoto", 'MediaReviewStatus'>;
    readonly reviewNote: Prisma.FieldRef<"MilestonePhoto", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"MilestonePhoto", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"MilestonePhoto", 'DateTime'>;
}
export type MilestonePhotoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelect<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    include?: Prisma.MilestonePhotoInclude<ExtArgs> | null;
    where: Prisma.MilestonePhotoWhereUniqueInput;
};
export type MilestonePhotoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelect<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    include?: Prisma.MilestonePhotoInclude<ExtArgs> | null;
    where: Prisma.MilestonePhotoWhereUniqueInput;
};
export type MilestonePhotoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelect<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    include?: Prisma.MilestonePhotoInclude<ExtArgs> | null;
    where?: Prisma.MilestonePhotoWhereInput;
    orderBy?: Prisma.MilestonePhotoOrderByWithRelationInput | Prisma.MilestonePhotoOrderByWithRelationInput[];
    cursor?: Prisma.MilestonePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MilestonePhotoScalarFieldEnum | Prisma.MilestonePhotoScalarFieldEnum[];
};
export type MilestonePhotoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelect<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    include?: Prisma.MilestonePhotoInclude<ExtArgs> | null;
    where?: Prisma.MilestonePhotoWhereInput;
    orderBy?: Prisma.MilestonePhotoOrderByWithRelationInput | Prisma.MilestonePhotoOrderByWithRelationInput[];
    cursor?: Prisma.MilestonePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MilestonePhotoScalarFieldEnum | Prisma.MilestonePhotoScalarFieldEnum[];
};
export type MilestonePhotoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelect<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    include?: Prisma.MilestonePhotoInclude<ExtArgs> | null;
    where?: Prisma.MilestonePhotoWhereInput;
    orderBy?: Prisma.MilestonePhotoOrderByWithRelationInput | Prisma.MilestonePhotoOrderByWithRelationInput[];
    cursor?: Prisma.MilestonePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MilestonePhotoScalarFieldEnum | Prisma.MilestonePhotoScalarFieldEnum[];
};
export type MilestonePhotoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelect<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    include?: Prisma.MilestonePhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MilestonePhotoCreateInput, Prisma.MilestonePhotoUncheckedCreateInput>;
};
export type MilestonePhotoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MilestonePhotoCreateManyInput | Prisma.MilestonePhotoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MilestonePhotoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    data: Prisma.MilestonePhotoCreateManyInput | Prisma.MilestonePhotoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MilestonePhotoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MilestonePhotoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelect<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    include?: Prisma.MilestonePhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MilestonePhotoUpdateInput, Prisma.MilestonePhotoUncheckedUpdateInput>;
    where: Prisma.MilestonePhotoWhereUniqueInput;
};
export type MilestonePhotoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MilestonePhotoUpdateManyMutationInput, Prisma.MilestonePhotoUncheckedUpdateManyInput>;
    where?: Prisma.MilestonePhotoWhereInput;
    limit?: number;
};
export type MilestonePhotoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MilestonePhotoUpdateManyMutationInput, Prisma.MilestonePhotoUncheckedUpdateManyInput>;
    where?: Prisma.MilestonePhotoWhereInput;
    limit?: number;
    include?: Prisma.MilestonePhotoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MilestonePhotoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelect<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    include?: Prisma.MilestonePhotoInclude<ExtArgs> | null;
    where: Prisma.MilestonePhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.MilestonePhotoCreateInput, Prisma.MilestonePhotoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MilestonePhotoUpdateInput, Prisma.MilestonePhotoUncheckedUpdateInput>;
};
export type MilestonePhotoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelect<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    include?: Prisma.MilestonePhotoInclude<ExtArgs> | null;
    where: Prisma.MilestonePhotoWhereUniqueInput;
};
export type MilestonePhotoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MilestonePhotoWhereInput;
    limit?: number;
};
export type MilestonePhotoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestonePhotoSelect<ExtArgs> | null;
    omit?: Prisma.MilestonePhotoOmit<ExtArgs> | null;
    include?: Prisma.MilestonePhotoInclude<ExtArgs> | null;
};
