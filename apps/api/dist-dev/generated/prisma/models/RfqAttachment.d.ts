import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RfqAttachmentModel = runtime.Types.Result.DefaultSelection<Prisma.$RfqAttachmentPayload>;
export type AggregateRfqAttachment = {
    _count: RfqAttachmentCountAggregateOutputType | null;
    _min: RfqAttachmentMinAggregateOutputType | null;
    _max: RfqAttachmentMaxAggregateOutputType | null;
};
export type RfqAttachmentMinAggregateOutputType = {
    id: string | null;
    rfqId: string | null;
    fileId: string | null;
    kind: $Enums.RfqAttachmentKind | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
};
export type RfqAttachmentMaxAggregateOutputType = {
    id: string | null;
    rfqId: string | null;
    fileId: string | null;
    kind: $Enums.RfqAttachmentKind | null;
    reviewStatus: $Enums.MediaReviewStatus | null;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
};
export type RfqAttachmentCountAggregateOutputType = {
    id: number;
    rfqId: number;
    fileId: number;
    kind: number;
    reviewStatus: number;
    reviewNote: number;
    reviewedAt: number;
    createdAt: number;
    _all: number;
};
export type RfqAttachmentMinAggregateInputType = {
    id?: true;
    rfqId?: true;
    fileId?: true;
    kind?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
};
export type RfqAttachmentMaxAggregateInputType = {
    id?: true;
    rfqId?: true;
    fileId?: true;
    kind?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
};
export type RfqAttachmentCountAggregateInputType = {
    id?: true;
    rfqId?: true;
    fileId?: true;
    kind?: true;
    reviewStatus?: true;
    reviewNote?: true;
    reviewedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type RfqAttachmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqAttachmentWhereInput;
    orderBy?: Prisma.RfqAttachmentOrderByWithRelationInput | Prisma.RfqAttachmentOrderByWithRelationInput[];
    cursor?: Prisma.RfqAttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RfqAttachmentCountAggregateInputType;
    _min?: RfqAttachmentMinAggregateInputType;
    _max?: RfqAttachmentMaxAggregateInputType;
};
export type GetRfqAttachmentAggregateType<T extends RfqAttachmentAggregateArgs> = {
    [P in keyof T & keyof AggregateRfqAttachment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRfqAttachment[P]> : Prisma.GetScalarType<T[P], AggregateRfqAttachment[P]>;
};
export type RfqAttachmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqAttachmentWhereInput;
    orderBy?: Prisma.RfqAttachmentOrderByWithAggregationInput | Prisma.RfqAttachmentOrderByWithAggregationInput[];
    by: Prisma.RfqAttachmentScalarFieldEnum[] | Prisma.RfqAttachmentScalarFieldEnum;
    having?: Prisma.RfqAttachmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RfqAttachmentCountAggregateInputType | true;
    _min?: RfqAttachmentMinAggregateInputType;
    _max?: RfqAttachmentMaxAggregateInputType;
};
export type RfqAttachmentGroupByOutputType = {
    id: string;
    rfqId: string;
    fileId: string;
    kind: $Enums.RfqAttachmentKind;
    reviewStatus: $Enums.MediaReviewStatus;
    reviewNote: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    _count: RfqAttachmentCountAggregateOutputType | null;
    _min: RfqAttachmentMinAggregateOutputType | null;
    _max: RfqAttachmentMaxAggregateOutputType | null;
};
export type GetRfqAttachmentGroupByPayload<T extends RfqAttachmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RfqAttachmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RfqAttachmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RfqAttachmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RfqAttachmentGroupByOutputType[P]>;
}>>;
export type RfqAttachmentWhereInput = {
    AND?: Prisma.RfqAttachmentWhereInput | Prisma.RfqAttachmentWhereInput[];
    OR?: Prisma.RfqAttachmentWhereInput[];
    NOT?: Prisma.RfqAttachmentWhereInput | Prisma.RfqAttachmentWhereInput[];
    id?: Prisma.UuidFilter<"RfqAttachment"> | string;
    rfqId?: Prisma.UuidFilter<"RfqAttachment"> | string;
    fileId?: Prisma.UuidFilter<"RfqAttachment"> | string;
    kind?: Prisma.EnumRfqAttachmentKindFilter<"RfqAttachment"> | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"RfqAttachment"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"RfqAttachment"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"RfqAttachment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"RfqAttachment"> | Date | string;
    rfq?: Prisma.XOR<Prisma.RfqScalarRelationFilter, Prisma.RfqWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
};
export type RfqAttachmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    rfq?: Prisma.RfqOrderByWithRelationInput;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type RfqAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.RfqAttachmentWhereInput | Prisma.RfqAttachmentWhereInput[];
    OR?: Prisma.RfqAttachmentWhereInput[];
    NOT?: Prisma.RfqAttachmentWhereInput | Prisma.RfqAttachmentWhereInput[];
    rfqId?: Prisma.UuidFilter<"RfqAttachment"> | string;
    kind?: Prisma.EnumRfqAttachmentKindFilter<"RfqAttachment"> | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"RfqAttachment"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"RfqAttachment"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"RfqAttachment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"RfqAttachment"> | Date | string;
    rfq?: Prisma.XOR<Prisma.RfqScalarRelationFilter, Prisma.RfqWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
}, "id" | "fileId">;
export type RfqAttachmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RfqAttachmentCountOrderByAggregateInput;
    _max?: Prisma.RfqAttachmentMaxOrderByAggregateInput;
    _min?: Prisma.RfqAttachmentMinOrderByAggregateInput;
};
export type RfqAttachmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.RfqAttachmentScalarWhereWithAggregatesInput | Prisma.RfqAttachmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.RfqAttachmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RfqAttachmentScalarWhereWithAggregatesInput | Prisma.RfqAttachmentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"RfqAttachment"> | string;
    rfqId?: Prisma.UuidWithAggregatesFilter<"RfqAttachment"> | string;
    fileId?: Prisma.UuidWithAggregatesFilter<"RfqAttachment"> | string;
    kind?: Prisma.EnumRfqAttachmentKindWithAggregatesFilter<"RfqAttachment"> | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusWithAggregatesFilter<"RfqAttachment"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableWithAggregatesFilter<"RfqAttachment"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RfqAttachment"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RfqAttachment"> | Date | string;
};
export type RfqAttachmentCreateInput = {
    id?: string;
    kind: $Enums.RfqAttachmentKind;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    rfq: Prisma.RfqCreateNestedOneWithoutAttachmentsInput;
    file: Prisma.FileAssetCreateNestedOneWithoutRfqAttachmentInput;
};
export type RfqAttachmentUncheckedCreateInput = {
    id?: string;
    rfqId: string;
    fileId: string;
    kind: $Enums.RfqAttachmentKind;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type RfqAttachmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumRfqAttachmentKindFieldUpdateOperationsInput | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rfq?: Prisma.RfqUpdateOneRequiredWithoutAttachmentsNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutRfqAttachmentNestedInput;
};
export type RfqAttachmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumRfqAttachmentKindFieldUpdateOperationsInput | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqAttachmentCreateManyInput = {
    id?: string;
    rfqId: string;
    fileId: string;
    kind: $Enums.RfqAttachmentKind;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type RfqAttachmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumRfqAttachmentKindFieldUpdateOperationsInput | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqAttachmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumRfqAttachmentKindFieldUpdateOperationsInput | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqAttachmentListRelationFilter = {
    every?: Prisma.RfqAttachmentWhereInput;
    some?: Prisma.RfqAttachmentWhereInput;
    none?: Prisma.RfqAttachmentWhereInput;
};
export type RfqAttachmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RfqAttachmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RfqAttachmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RfqAttachmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    reviewStatus?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RfqAttachmentNullableScalarRelationFilter = {
    is?: Prisma.RfqAttachmentWhereInput | null;
    isNot?: Prisma.RfqAttachmentWhereInput | null;
};
export type RfqAttachmentCreateNestedManyWithoutRfqInput = {
    create?: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutRfqInput, Prisma.RfqAttachmentUncheckedCreateWithoutRfqInput> | Prisma.RfqAttachmentCreateWithoutRfqInput[] | Prisma.RfqAttachmentUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqAttachmentCreateOrConnectWithoutRfqInput | Prisma.RfqAttachmentCreateOrConnectWithoutRfqInput[];
    createMany?: Prisma.RfqAttachmentCreateManyRfqInputEnvelope;
    connect?: Prisma.RfqAttachmentWhereUniqueInput | Prisma.RfqAttachmentWhereUniqueInput[];
};
export type RfqAttachmentUncheckedCreateNestedManyWithoutRfqInput = {
    create?: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutRfqInput, Prisma.RfqAttachmentUncheckedCreateWithoutRfqInput> | Prisma.RfqAttachmentCreateWithoutRfqInput[] | Prisma.RfqAttachmentUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqAttachmentCreateOrConnectWithoutRfqInput | Prisma.RfqAttachmentCreateOrConnectWithoutRfqInput[];
    createMany?: Prisma.RfqAttachmentCreateManyRfqInputEnvelope;
    connect?: Prisma.RfqAttachmentWhereUniqueInput | Prisma.RfqAttachmentWhereUniqueInput[];
};
export type RfqAttachmentUpdateManyWithoutRfqNestedInput = {
    create?: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutRfqInput, Prisma.RfqAttachmentUncheckedCreateWithoutRfqInput> | Prisma.RfqAttachmentCreateWithoutRfqInput[] | Prisma.RfqAttachmentUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqAttachmentCreateOrConnectWithoutRfqInput | Prisma.RfqAttachmentCreateOrConnectWithoutRfqInput[];
    upsert?: Prisma.RfqAttachmentUpsertWithWhereUniqueWithoutRfqInput | Prisma.RfqAttachmentUpsertWithWhereUniqueWithoutRfqInput[];
    createMany?: Prisma.RfqAttachmentCreateManyRfqInputEnvelope;
    set?: Prisma.RfqAttachmentWhereUniqueInput | Prisma.RfqAttachmentWhereUniqueInput[];
    disconnect?: Prisma.RfqAttachmentWhereUniqueInput | Prisma.RfqAttachmentWhereUniqueInput[];
    delete?: Prisma.RfqAttachmentWhereUniqueInput | Prisma.RfqAttachmentWhereUniqueInput[];
    connect?: Prisma.RfqAttachmentWhereUniqueInput | Prisma.RfqAttachmentWhereUniqueInput[];
    update?: Prisma.RfqAttachmentUpdateWithWhereUniqueWithoutRfqInput | Prisma.RfqAttachmentUpdateWithWhereUniqueWithoutRfqInput[];
    updateMany?: Prisma.RfqAttachmentUpdateManyWithWhereWithoutRfqInput | Prisma.RfqAttachmentUpdateManyWithWhereWithoutRfqInput[];
    deleteMany?: Prisma.RfqAttachmentScalarWhereInput | Prisma.RfqAttachmentScalarWhereInput[];
};
export type RfqAttachmentUncheckedUpdateManyWithoutRfqNestedInput = {
    create?: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutRfqInput, Prisma.RfqAttachmentUncheckedCreateWithoutRfqInput> | Prisma.RfqAttachmentCreateWithoutRfqInput[] | Prisma.RfqAttachmentUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqAttachmentCreateOrConnectWithoutRfqInput | Prisma.RfqAttachmentCreateOrConnectWithoutRfqInput[];
    upsert?: Prisma.RfqAttachmentUpsertWithWhereUniqueWithoutRfqInput | Prisma.RfqAttachmentUpsertWithWhereUniqueWithoutRfqInput[];
    createMany?: Prisma.RfqAttachmentCreateManyRfqInputEnvelope;
    set?: Prisma.RfqAttachmentWhereUniqueInput | Prisma.RfqAttachmentWhereUniqueInput[];
    disconnect?: Prisma.RfqAttachmentWhereUniqueInput | Prisma.RfqAttachmentWhereUniqueInput[];
    delete?: Prisma.RfqAttachmentWhereUniqueInput | Prisma.RfqAttachmentWhereUniqueInput[];
    connect?: Prisma.RfqAttachmentWhereUniqueInput | Prisma.RfqAttachmentWhereUniqueInput[];
    update?: Prisma.RfqAttachmentUpdateWithWhereUniqueWithoutRfqInput | Prisma.RfqAttachmentUpdateWithWhereUniqueWithoutRfqInput[];
    updateMany?: Prisma.RfqAttachmentUpdateManyWithWhereWithoutRfqInput | Prisma.RfqAttachmentUpdateManyWithWhereWithoutRfqInput[];
    deleteMany?: Prisma.RfqAttachmentScalarWhereInput | Prisma.RfqAttachmentScalarWhereInput[];
};
export type EnumRfqAttachmentKindFieldUpdateOperationsInput = {
    set?: $Enums.RfqAttachmentKind;
};
export type RfqAttachmentCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutFileInput, Prisma.RfqAttachmentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.RfqAttachmentCreateOrConnectWithoutFileInput;
    connect?: Prisma.RfqAttachmentWhereUniqueInput;
};
export type RfqAttachmentUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutFileInput, Prisma.RfqAttachmentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.RfqAttachmentCreateOrConnectWithoutFileInput;
    connect?: Prisma.RfqAttachmentWhereUniqueInput;
};
export type RfqAttachmentUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutFileInput, Prisma.RfqAttachmentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.RfqAttachmentCreateOrConnectWithoutFileInput;
    upsert?: Prisma.RfqAttachmentUpsertWithoutFileInput;
    disconnect?: Prisma.RfqAttachmentWhereInput | boolean;
    delete?: Prisma.RfqAttachmentWhereInput | boolean;
    connect?: Prisma.RfqAttachmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RfqAttachmentUpdateToOneWithWhereWithoutFileInput, Prisma.RfqAttachmentUpdateWithoutFileInput>, Prisma.RfqAttachmentUncheckedUpdateWithoutFileInput>;
};
export type RfqAttachmentUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutFileInput, Prisma.RfqAttachmentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.RfqAttachmentCreateOrConnectWithoutFileInput;
    upsert?: Prisma.RfqAttachmentUpsertWithoutFileInput;
    disconnect?: Prisma.RfqAttachmentWhereInput | boolean;
    delete?: Prisma.RfqAttachmentWhereInput | boolean;
    connect?: Prisma.RfqAttachmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RfqAttachmentUpdateToOneWithWhereWithoutFileInput, Prisma.RfqAttachmentUpdateWithoutFileInput>, Prisma.RfqAttachmentUncheckedUpdateWithoutFileInput>;
};
export type RfqAttachmentCreateWithoutRfqInput = {
    id?: string;
    kind: $Enums.RfqAttachmentKind;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    file: Prisma.FileAssetCreateNestedOneWithoutRfqAttachmentInput;
};
export type RfqAttachmentUncheckedCreateWithoutRfqInput = {
    id?: string;
    fileId: string;
    kind: $Enums.RfqAttachmentKind;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type RfqAttachmentCreateOrConnectWithoutRfqInput = {
    where: Prisma.RfqAttachmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutRfqInput, Prisma.RfqAttachmentUncheckedCreateWithoutRfqInput>;
};
export type RfqAttachmentCreateManyRfqInputEnvelope = {
    data: Prisma.RfqAttachmentCreateManyRfqInput | Prisma.RfqAttachmentCreateManyRfqInput[];
    skipDuplicates?: boolean;
};
export type RfqAttachmentUpsertWithWhereUniqueWithoutRfqInput = {
    where: Prisma.RfqAttachmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.RfqAttachmentUpdateWithoutRfqInput, Prisma.RfqAttachmentUncheckedUpdateWithoutRfqInput>;
    create: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutRfqInput, Prisma.RfqAttachmentUncheckedCreateWithoutRfqInput>;
};
export type RfqAttachmentUpdateWithWhereUniqueWithoutRfqInput = {
    where: Prisma.RfqAttachmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.RfqAttachmentUpdateWithoutRfqInput, Prisma.RfqAttachmentUncheckedUpdateWithoutRfqInput>;
};
export type RfqAttachmentUpdateManyWithWhereWithoutRfqInput = {
    where: Prisma.RfqAttachmentScalarWhereInput;
    data: Prisma.XOR<Prisma.RfqAttachmentUpdateManyMutationInput, Prisma.RfqAttachmentUncheckedUpdateManyWithoutRfqInput>;
};
export type RfqAttachmentScalarWhereInput = {
    AND?: Prisma.RfqAttachmentScalarWhereInput | Prisma.RfqAttachmentScalarWhereInput[];
    OR?: Prisma.RfqAttachmentScalarWhereInput[];
    NOT?: Prisma.RfqAttachmentScalarWhereInput | Prisma.RfqAttachmentScalarWhereInput[];
    id?: Prisma.UuidFilter<"RfqAttachment"> | string;
    rfqId?: Prisma.UuidFilter<"RfqAttachment"> | string;
    fileId?: Prisma.UuidFilter<"RfqAttachment"> | string;
    kind?: Prisma.EnumRfqAttachmentKindFilter<"RfqAttachment"> | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFilter<"RfqAttachment"> | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.StringNullableFilter<"RfqAttachment"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"RfqAttachment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"RfqAttachment"> | Date | string;
};
export type RfqAttachmentCreateWithoutFileInput = {
    id?: string;
    kind: $Enums.RfqAttachmentKind;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    rfq: Prisma.RfqCreateNestedOneWithoutAttachmentsInput;
};
export type RfqAttachmentUncheckedCreateWithoutFileInput = {
    id?: string;
    rfqId: string;
    kind: $Enums.RfqAttachmentKind;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type RfqAttachmentCreateOrConnectWithoutFileInput = {
    where: Prisma.RfqAttachmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutFileInput, Prisma.RfqAttachmentUncheckedCreateWithoutFileInput>;
};
export type RfqAttachmentUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.RfqAttachmentUpdateWithoutFileInput, Prisma.RfqAttachmentUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.RfqAttachmentCreateWithoutFileInput, Prisma.RfqAttachmentUncheckedCreateWithoutFileInput>;
    where?: Prisma.RfqAttachmentWhereInput;
};
export type RfqAttachmentUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.RfqAttachmentWhereInput;
    data: Prisma.XOR<Prisma.RfqAttachmentUpdateWithoutFileInput, Prisma.RfqAttachmentUncheckedUpdateWithoutFileInput>;
};
export type RfqAttachmentUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumRfqAttachmentKindFieldUpdateOperationsInput | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rfq?: Prisma.RfqUpdateOneRequiredWithoutAttachmentsNestedInput;
};
export type RfqAttachmentUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumRfqAttachmentKindFieldUpdateOperationsInput | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqAttachmentCreateManyRfqInput = {
    id?: string;
    fileId: string;
    kind: $Enums.RfqAttachmentKind;
    reviewStatus?: $Enums.MediaReviewStatus;
    reviewNote?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type RfqAttachmentUpdateWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumRfqAttachmentKindFieldUpdateOperationsInput | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutRfqAttachmentNestedInput;
};
export type RfqAttachmentUncheckedUpdateWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumRfqAttachmentKindFieldUpdateOperationsInput | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqAttachmentUncheckedUpdateManyWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumRfqAttachmentKindFieldUpdateOperationsInput | $Enums.RfqAttachmentKind;
    reviewStatus?: Prisma.EnumMediaReviewStatusFieldUpdateOperationsInput | $Enums.MediaReviewStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqAttachmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    rfqId?: boolean;
    fileId?: boolean;
    kind?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqAttachment"]>;
export type RfqAttachmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    rfqId?: boolean;
    fileId?: boolean;
    kind?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqAttachment"]>;
export type RfqAttachmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    rfqId?: boolean;
    fileId?: boolean;
    kind?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqAttachment"]>;
export type RfqAttachmentSelectScalar = {
    id?: boolean;
    rfqId?: boolean;
    fileId?: boolean;
    kind?: boolean;
    reviewStatus?: boolean;
    reviewNote?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
};
export type RfqAttachmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "rfqId" | "fileId" | "kind" | "reviewStatus" | "reviewNote" | "reviewedAt" | "createdAt", ExtArgs["result"]["rfqAttachment"]>;
export type RfqAttachmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type RfqAttachmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type RfqAttachmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type $RfqAttachmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RfqAttachment";
    objects: {
        rfq: Prisma.$RfqPayload<ExtArgs>;
        file: Prisma.$FileAssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        rfqId: string;
        fileId: string;
        kind: $Enums.RfqAttachmentKind;
        reviewStatus: $Enums.MediaReviewStatus;
        reviewNote: string | null;
        reviewedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["rfqAttachment"]>;
    composites: {};
};
export type RfqAttachmentGetPayload<S extends boolean | null | undefined | RfqAttachmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload, S>;
export type RfqAttachmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RfqAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RfqAttachmentCountAggregateInputType | true;
};
export interface RfqAttachmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RfqAttachment'];
        meta: {
            name: 'RfqAttachment';
        };
    };
    findUnique<T extends RfqAttachmentFindUniqueArgs>(args: Prisma.SelectSubset<T, RfqAttachmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RfqAttachmentClient<runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RfqAttachmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RfqAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RfqAttachmentClient<runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RfqAttachmentFindFirstArgs>(args?: Prisma.SelectSubset<T, RfqAttachmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__RfqAttachmentClient<runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RfqAttachmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RfqAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RfqAttachmentClient<runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RfqAttachmentFindManyArgs>(args?: Prisma.SelectSubset<T, RfqAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RfqAttachmentCreateArgs>(args: Prisma.SelectSubset<T, RfqAttachmentCreateArgs<ExtArgs>>): Prisma.Prisma__RfqAttachmentClient<runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RfqAttachmentCreateManyArgs>(args?: Prisma.SelectSubset<T, RfqAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RfqAttachmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RfqAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RfqAttachmentDeleteArgs>(args: Prisma.SelectSubset<T, RfqAttachmentDeleteArgs<ExtArgs>>): Prisma.Prisma__RfqAttachmentClient<runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RfqAttachmentUpdateArgs>(args: Prisma.SelectSubset<T, RfqAttachmentUpdateArgs<ExtArgs>>): Prisma.Prisma__RfqAttachmentClient<runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RfqAttachmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, RfqAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RfqAttachmentUpdateManyArgs>(args: Prisma.SelectSubset<T, RfqAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RfqAttachmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RfqAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RfqAttachmentUpsertArgs>(args: Prisma.SelectSubset<T, RfqAttachmentUpsertArgs<ExtArgs>>): Prisma.Prisma__RfqAttachmentClient<runtime.Types.Result.GetResult<Prisma.$RfqAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RfqAttachmentCountArgs>(args?: Prisma.Subset<T, RfqAttachmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RfqAttachmentCountAggregateOutputType> : number>;
    aggregate<T extends RfqAttachmentAggregateArgs>(args: Prisma.Subset<T, RfqAttachmentAggregateArgs>): Prisma.PrismaPromise<GetRfqAttachmentAggregateType<T>>;
    groupBy<T extends RfqAttachmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RfqAttachmentGroupByArgs['orderBy'];
    } : {
        orderBy?: RfqAttachmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RfqAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRfqAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RfqAttachmentFieldRefs;
}
export interface Prisma__RfqAttachmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    rfq<T extends Prisma.RfqDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RfqDefaultArgs<ExtArgs>>): Prisma.Prisma__RfqClient<runtime.Types.Result.GetResult<Prisma.$RfqPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    file<T extends Prisma.FileAssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileAssetDefaultArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RfqAttachmentFieldRefs {
    readonly id: Prisma.FieldRef<"RfqAttachment", 'String'>;
    readonly rfqId: Prisma.FieldRef<"RfqAttachment", 'String'>;
    readonly fileId: Prisma.FieldRef<"RfqAttachment", 'String'>;
    readonly kind: Prisma.FieldRef<"RfqAttachment", 'RfqAttachmentKind'>;
    readonly reviewStatus: Prisma.FieldRef<"RfqAttachment", 'MediaReviewStatus'>;
    readonly reviewNote: Prisma.FieldRef<"RfqAttachment", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"RfqAttachment", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"RfqAttachment", 'DateTime'>;
}
export type RfqAttachmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    include?: Prisma.RfqAttachmentInclude<ExtArgs> | null;
    where: Prisma.RfqAttachmentWhereUniqueInput;
};
export type RfqAttachmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    include?: Prisma.RfqAttachmentInclude<ExtArgs> | null;
    where: Prisma.RfqAttachmentWhereUniqueInput;
};
export type RfqAttachmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    include?: Prisma.RfqAttachmentInclude<ExtArgs> | null;
    where?: Prisma.RfqAttachmentWhereInput;
    orderBy?: Prisma.RfqAttachmentOrderByWithRelationInput | Prisma.RfqAttachmentOrderByWithRelationInput[];
    cursor?: Prisma.RfqAttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqAttachmentScalarFieldEnum | Prisma.RfqAttachmentScalarFieldEnum[];
};
export type RfqAttachmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    include?: Prisma.RfqAttachmentInclude<ExtArgs> | null;
    where?: Prisma.RfqAttachmentWhereInput;
    orderBy?: Prisma.RfqAttachmentOrderByWithRelationInput | Prisma.RfqAttachmentOrderByWithRelationInput[];
    cursor?: Prisma.RfqAttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqAttachmentScalarFieldEnum | Prisma.RfqAttachmentScalarFieldEnum[];
};
export type RfqAttachmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    include?: Prisma.RfqAttachmentInclude<ExtArgs> | null;
    where?: Prisma.RfqAttachmentWhereInput;
    orderBy?: Prisma.RfqAttachmentOrderByWithRelationInput | Prisma.RfqAttachmentOrderByWithRelationInput[];
    cursor?: Prisma.RfqAttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqAttachmentScalarFieldEnum | Prisma.RfqAttachmentScalarFieldEnum[];
};
export type RfqAttachmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    include?: Prisma.RfqAttachmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqAttachmentCreateInput, Prisma.RfqAttachmentUncheckedCreateInput>;
};
export type RfqAttachmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RfqAttachmentCreateManyInput | Prisma.RfqAttachmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RfqAttachmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    data: Prisma.RfqAttachmentCreateManyInput | Prisma.RfqAttachmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RfqAttachmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RfqAttachmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    include?: Prisma.RfqAttachmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqAttachmentUpdateInput, Prisma.RfqAttachmentUncheckedUpdateInput>;
    where: Prisma.RfqAttachmentWhereUniqueInput;
};
export type RfqAttachmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RfqAttachmentUpdateManyMutationInput, Prisma.RfqAttachmentUncheckedUpdateManyInput>;
    where?: Prisma.RfqAttachmentWhereInput;
    limit?: number;
};
export type RfqAttachmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqAttachmentUpdateManyMutationInput, Prisma.RfqAttachmentUncheckedUpdateManyInput>;
    where?: Prisma.RfqAttachmentWhereInput;
    limit?: number;
    include?: Prisma.RfqAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RfqAttachmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    include?: Prisma.RfqAttachmentInclude<ExtArgs> | null;
    where: Prisma.RfqAttachmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqAttachmentCreateInput, Prisma.RfqAttachmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RfqAttachmentUpdateInput, Prisma.RfqAttachmentUncheckedUpdateInput>;
};
export type RfqAttachmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    include?: Prisma.RfqAttachmentInclude<ExtArgs> | null;
    where: Prisma.RfqAttachmentWhereUniqueInput;
};
export type RfqAttachmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqAttachmentWhereInput;
    limit?: number;
};
export type RfqAttachmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.RfqAttachmentOmit<ExtArgs> | null;
    include?: Prisma.RfqAttachmentInclude<ExtArgs> | null;
};
