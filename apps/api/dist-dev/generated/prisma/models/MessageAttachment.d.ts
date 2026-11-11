import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MessageAttachmentModel = runtime.Types.Result.DefaultSelection<Prisma.$MessageAttachmentPayload>;
export type AggregateMessageAttachment = {
    _count: MessageAttachmentCountAggregateOutputType | null;
    _min: MessageAttachmentMinAggregateOutputType | null;
    _max: MessageAttachmentMaxAggregateOutputType | null;
};
export type MessageAttachmentMinAggregateOutputType = {
    id: string | null;
    messageId: string | null;
    fileId: string | null;
    displayName: string | null;
    flagged: boolean | null;
    scannedAt: Date | null;
};
export type MessageAttachmentMaxAggregateOutputType = {
    id: string | null;
    messageId: string | null;
    fileId: string | null;
    displayName: string | null;
    flagged: boolean | null;
    scannedAt: Date | null;
};
export type MessageAttachmentCountAggregateOutputType = {
    id: number;
    messageId: number;
    fileId: number;
    displayName: number;
    flagged: number;
    flagReasons: number;
    scannedAt: number;
    _all: number;
};
export type MessageAttachmentMinAggregateInputType = {
    id?: true;
    messageId?: true;
    fileId?: true;
    displayName?: true;
    flagged?: true;
    scannedAt?: true;
};
export type MessageAttachmentMaxAggregateInputType = {
    id?: true;
    messageId?: true;
    fileId?: true;
    displayName?: true;
    flagged?: true;
    scannedAt?: true;
};
export type MessageAttachmentCountAggregateInputType = {
    id?: true;
    messageId?: true;
    fileId?: true;
    displayName?: true;
    flagged?: true;
    flagReasons?: true;
    scannedAt?: true;
    _all?: true;
};
export type MessageAttachmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageAttachmentWhereInput;
    orderBy?: Prisma.MessageAttachmentOrderByWithRelationInput | Prisma.MessageAttachmentOrderByWithRelationInput[];
    cursor?: Prisma.MessageAttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MessageAttachmentCountAggregateInputType;
    _min?: MessageAttachmentMinAggregateInputType;
    _max?: MessageAttachmentMaxAggregateInputType;
};
export type GetMessageAttachmentAggregateType<T extends MessageAttachmentAggregateArgs> = {
    [P in keyof T & keyof AggregateMessageAttachment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMessageAttachment[P]> : Prisma.GetScalarType<T[P], AggregateMessageAttachment[P]>;
};
export type MessageAttachmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageAttachmentWhereInput;
    orderBy?: Prisma.MessageAttachmentOrderByWithAggregationInput | Prisma.MessageAttachmentOrderByWithAggregationInput[];
    by: Prisma.MessageAttachmentScalarFieldEnum[] | Prisma.MessageAttachmentScalarFieldEnum;
    having?: Prisma.MessageAttachmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageAttachmentCountAggregateInputType | true;
    _min?: MessageAttachmentMinAggregateInputType;
    _max?: MessageAttachmentMaxAggregateInputType;
};
export type MessageAttachmentGroupByOutputType = {
    id: string;
    messageId: string;
    fileId: string;
    displayName: string;
    flagged: boolean;
    flagReasons: $Enums.ContactFlag[];
    scannedAt: Date | null;
    _count: MessageAttachmentCountAggregateOutputType | null;
    _min: MessageAttachmentMinAggregateOutputType | null;
    _max: MessageAttachmentMaxAggregateOutputType | null;
};
export type GetMessageAttachmentGroupByPayload<T extends MessageAttachmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MessageAttachmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MessageAttachmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MessageAttachmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MessageAttachmentGroupByOutputType[P]>;
}>>;
export type MessageAttachmentWhereInput = {
    AND?: Prisma.MessageAttachmentWhereInput | Prisma.MessageAttachmentWhereInput[];
    OR?: Prisma.MessageAttachmentWhereInput[];
    NOT?: Prisma.MessageAttachmentWhereInput | Prisma.MessageAttachmentWhereInput[];
    id?: Prisma.UuidFilter<"MessageAttachment"> | string;
    messageId?: Prisma.UuidFilter<"MessageAttachment"> | string;
    fileId?: Prisma.UuidFilter<"MessageAttachment"> | string;
    displayName?: Prisma.StringFilter<"MessageAttachment"> | string;
    flagged?: Prisma.BoolFilter<"MessageAttachment"> | boolean;
    flagReasons?: Prisma.EnumContactFlagNullableListFilter<"MessageAttachment">;
    scannedAt?: Prisma.DateTimeNullableFilter<"MessageAttachment"> | Date | string | null;
    message?: Prisma.XOR<Prisma.MessageScalarRelationFilter, Prisma.MessageWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
};
export type MessageAttachmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    flagged?: Prisma.SortOrder;
    flagReasons?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    message?: Prisma.MessageOrderByWithRelationInput;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type MessageAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.MessageAttachmentWhereInput | Prisma.MessageAttachmentWhereInput[];
    OR?: Prisma.MessageAttachmentWhereInput[];
    NOT?: Prisma.MessageAttachmentWhereInput | Prisma.MessageAttachmentWhereInput[];
    messageId?: Prisma.UuidFilter<"MessageAttachment"> | string;
    displayName?: Prisma.StringFilter<"MessageAttachment"> | string;
    flagged?: Prisma.BoolFilter<"MessageAttachment"> | boolean;
    flagReasons?: Prisma.EnumContactFlagNullableListFilter<"MessageAttachment">;
    scannedAt?: Prisma.DateTimeNullableFilter<"MessageAttachment"> | Date | string | null;
    message?: Prisma.XOR<Prisma.MessageScalarRelationFilter, Prisma.MessageWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
}, "id" | "fileId">;
export type MessageAttachmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    flagged?: Prisma.SortOrder;
    flagReasons?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MessageAttachmentCountOrderByAggregateInput;
    _max?: Prisma.MessageAttachmentMaxOrderByAggregateInput;
    _min?: Prisma.MessageAttachmentMinOrderByAggregateInput;
};
export type MessageAttachmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.MessageAttachmentScalarWhereWithAggregatesInput | Prisma.MessageAttachmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.MessageAttachmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MessageAttachmentScalarWhereWithAggregatesInput | Prisma.MessageAttachmentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MessageAttachment"> | string;
    messageId?: Prisma.UuidWithAggregatesFilter<"MessageAttachment"> | string;
    fileId?: Prisma.UuidWithAggregatesFilter<"MessageAttachment"> | string;
    displayName?: Prisma.StringWithAggregatesFilter<"MessageAttachment"> | string;
    flagged?: Prisma.BoolWithAggregatesFilter<"MessageAttachment"> | boolean;
    flagReasons?: Prisma.EnumContactFlagNullableListFilter<"MessageAttachment">;
    scannedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MessageAttachment"> | Date | string | null;
};
export type MessageAttachmentCreateInput = {
    id?: string;
    displayName: string;
    flagged?: boolean;
    flagReasons?: Prisma.MessageAttachmentCreateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Date | string | null;
    message: Prisma.MessageCreateNestedOneWithoutAttachmentsInput;
    file: Prisma.FileAssetCreateNestedOneWithoutMessageAttachmentInput;
};
export type MessageAttachmentUncheckedCreateInput = {
    id?: string;
    messageId: string;
    fileId: string;
    displayName: string;
    flagged?: boolean;
    flagReasons?: Prisma.MessageAttachmentCreateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Date | string | null;
};
export type MessageAttachmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageAttachmentUpdateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    message?: Prisma.MessageUpdateOneRequiredWithoutAttachmentsNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutMessageAttachmentNestedInput;
};
export type MessageAttachmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageAttachmentUpdateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MessageAttachmentCreateManyInput = {
    id?: string;
    messageId: string;
    fileId: string;
    displayName: string;
    flagged?: boolean;
    flagReasons?: Prisma.MessageAttachmentCreateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Date | string | null;
};
export type MessageAttachmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageAttachmentUpdateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MessageAttachmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageAttachmentUpdateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MessageAttachmentListRelationFilter = {
    every?: Prisma.MessageAttachmentWhereInput;
    some?: Prisma.MessageAttachmentWhereInput;
    none?: Prisma.MessageAttachmentWhereInput;
};
export type MessageAttachmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MessageAttachmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    flagged?: Prisma.SortOrder;
    flagReasons?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
};
export type MessageAttachmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    flagged?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
};
export type MessageAttachmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    flagged?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
};
export type MessageAttachmentNullableScalarRelationFilter = {
    is?: Prisma.MessageAttachmentWhereInput | null;
    isNot?: Prisma.MessageAttachmentWhereInput | null;
};
export type MessageAttachmentCreateNestedManyWithoutMessageInput = {
    create?: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutMessageInput, Prisma.MessageAttachmentUncheckedCreateWithoutMessageInput> | Prisma.MessageAttachmentCreateWithoutMessageInput[] | Prisma.MessageAttachmentUncheckedCreateWithoutMessageInput[];
    connectOrCreate?: Prisma.MessageAttachmentCreateOrConnectWithoutMessageInput | Prisma.MessageAttachmentCreateOrConnectWithoutMessageInput[];
    createMany?: Prisma.MessageAttachmentCreateManyMessageInputEnvelope;
    connect?: Prisma.MessageAttachmentWhereUniqueInput | Prisma.MessageAttachmentWhereUniqueInput[];
};
export type MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput = {
    create?: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutMessageInput, Prisma.MessageAttachmentUncheckedCreateWithoutMessageInput> | Prisma.MessageAttachmentCreateWithoutMessageInput[] | Prisma.MessageAttachmentUncheckedCreateWithoutMessageInput[];
    connectOrCreate?: Prisma.MessageAttachmentCreateOrConnectWithoutMessageInput | Prisma.MessageAttachmentCreateOrConnectWithoutMessageInput[];
    createMany?: Prisma.MessageAttachmentCreateManyMessageInputEnvelope;
    connect?: Prisma.MessageAttachmentWhereUniqueInput | Prisma.MessageAttachmentWhereUniqueInput[];
};
export type MessageAttachmentUpdateManyWithoutMessageNestedInput = {
    create?: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutMessageInput, Prisma.MessageAttachmentUncheckedCreateWithoutMessageInput> | Prisma.MessageAttachmentCreateWithoutMessageInput[] | Prisma.MessageAttachmentUncheckedCreateWithoutMessageInput[];
    connectOrCreate?: Prisma.MessageAttachmentCreateOrConnectWithoutMessageInput | Prisma.MessageAttachmentCreateOrConnectWithoutMessageInput[];
    upsert?: Prisma.MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput | Prisma.MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput[];
    createMany?: Prisma.MessageAttachmentCreateManyMessageInputEnvelope;
    set?: Prisma.MessageAttachmentWhereUniqueInput | Prisma.MessageAttachmentWhereUniqueInput[];
    disconnect?: Prisma.MessageAttachmentWhereUniqueInput | Prisma.MessageAttachmentWhereUniqueInput[];
    delete?: Prisma.MessageAttachmentWhereUniqueInput | Prisma.MessageAttachmentWhereUniqueInput[];
    connect?: Prisma.MessageAttachmentWhereUniqueInput | Prisma.MessageAttachmentWhereUniqueInput[];
    update?: Prisma.MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput | Prisma.MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput[];
    updateMany?: Prisma.MessageAttachmentUpdateManyWithWhereWithoutMessageInput | Prisma.MessageAttachmentUpdateManyWithWhereWithoutMessageInput[];
    deleteMany?: Prisma.MessageAttachmentScalarWhereInput | Prisma.MessageAttachmentScalarWhereInput[];
};
export type MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutMessageInput, Prisma.MessageAttachmentUncheckedCreateWithoutMessageInput> | Prisma.MessageAttachmentCreateWithoutMessageInput[] | Prisma.MessageAttachmentUncheckedCreateWithoutMessageInput[];
    connectOrCreate?: Prisma.MessageAttachmentCreateOrConnectWithoutMessageInput | Prisma.MessageAttachmentCreateOrConnectWithoutMessageInput[];
    upsert?: Prisma.MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput | Prisma.MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput[];
    createMany?: Prisma.MessageAttachmentCreateManyMessageInputEnvelope;
    set?: Prisma.MessageAttachmentWhereUniqueInput | Prisma.MessageAttachmentWhereUniqueInput[];
    disconnect?: Prisma.MessageAttachmentWhereUniqueInput | Prisma.MessageAttachmentWhereUniqueInput[];
    delete?: Prisma.MessageAttachmentWhereUniqueInput | Prisma.MessageAttachmentWhereUniqueInput[];
    connect?: Prisma.MessageAttachmentWhereUniqueInput | Prisma.MessageAttachmentWhereUniqueInput[];
    update?: Prisma.MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput | Prisma.MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput[];
    updateMany?: Prisma.MessageAttachmentUpdateManyWithWhereWithoutMessageInput | Prisma.MessageAttachmentUpdateManyWithWhereWithoutMessageInput[];
    deleteMany?: Prisma.MessageAttachmentScalarWhereInput | Prisma.MessageAttachmentScalarWhereInput[];
};
export type MessageAttachmentCreateflagReasonsInput = {
    set: $Enums.ContactFlag[];
};
export type MessageAttachmentUpdateflagReasonsInput = {
    set?: $Enums.ContactFlag[];
    push?: $Enums.ContactFlag | $Enums.ContactFlag[];
};
export type MessageAttachmentCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutFileInput, Prisma.MessageAttachmentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.MessageAttachmentCreateOrConnectWithoutFileInput;
    connect?: Prisma.MessageAttachmentWhereUniqueInput;
};
export type MessageAttachmentUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutFileInput, Prisma.MessageAttachmentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.MessageAttachmentCreateOrConnectWithoutFileInput;
    connect?: Prisma.MessageAttachmentWhereUniqueInput;
};
export type MessageAttachmentUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutFileInput, Prisma.MessageAttachmentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.MessageAttachmentCreateOrConnectWithoutFileInput;
    upsert?: Prisma.MessageAttachmentUpsertWithoutFileInput;
    disconnect?: Prisma.MessageAttachmentWhereInput | boolean;
    delete?: Prisma.MessageAttachmentWhereInput | boolean;
    connect?: Prisma.MessageAttachmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MessageAttachmentUpdateToOneWithWhereWithoutFileInput, Prisma.MessageAttachmentUpdateWithoutFileInput>, Prisma.MessageAttachmentUncheckedUpdateWithoutFileInput>;
};
export type MessageAttachmentUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutFileInput, Prisma.MessageAttachmentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.MessageAttachmentCreateOrConnectWithoutFileInput;
    upsert?: Prisma.MessageAttachmentUpsertWithoutFileInput;
    disconnect?: Prisma.MessageAttachmentWhereInput | boolean;
    delete?: Prisma.MessageAttachmentWhereInput | boolean;
    connect?: Prisma.MessageAttachmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MessageAttachmentUpdateToOneWithWhereWithoutFileInput, Prisma.MessageAttachmentUpdateWithoutFileInput>, Prisma.MessageAttachmentUncheckedUpdateWithoutFileInput>;
};
export type MessageAttachmentCreateWithoutMessageInput = {
    id?: string;
    displayName: string;
    flagged?: boolean;
    flagReasons?: Prisma.MessageAttachmentCreateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Date | string | null;
    file: Prisma.FileAssetCreateNestedOneWithoutMessageAttachmentInput;
};
export type MessageAttachmentUncheckedCreateWithoutMessageInput = {
    id?: string;
    fileId: string;
    displayName: string;
    flagged?: boolean;
    flagReasons?: Prisma.MessageAttachmentCreateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Date | string | null;
};
export type MessageAttachmentCreateOrConnectWithoutMessageInput = {
    where: Prisma.MessageAttachmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutMessageInput, Prisma.MessageAttachmentUncheckedCreateWithoutMessageInput>;
};
export type MessageAttachmentCreateManyMessageInputEnvelope = {
    data: Prisma.MessageAttachmentCreateManyMessageInput | Prisma.MessageAttachmentCreateManyMessageInput[];
    skipDuplicates?: boolean;
};
export type MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput = {
    where: Prisma.MessageAttachmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.MessageAttachmentUpdateWithoutMessageInput, Prisma.MessageAttachmentUncheckedUpdateWithoutMessageInput>;
    create: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutMessageInput, Prisma.MessageAttachmentUncheckedCreateWithoutMessageInput>;
};
export type MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput = {
    where: Prisma.MessageAttachmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.MessageAttachmentUpdateWithoutMessageInput, Prisma.MessageAttachmentUncheckedUpdateWithoutMessageInput>;
};
export type MessageAttachmentUpdateManyWithWhereWithoutMessageInput = {
    where: Prisma.MessageAttachmentScalarWhereInput;
    data: Prisma.XOR<Prisma.MessageAttachmentUpdateManyMutationInput, Prisma.MessageAttachmentUncheckedUpdateManyWithoutMessageInput>;
};
export type MessageAttachmentScalarWhereInput = {
    AND?: Prisma.MessageAttachmentScalarWhereInput | Prisma.MessageAttachmentScalarWhereInput[];
    OR?: Prisma.MessageAttachmentScalarWhereInput[];
    NOT?: Prisma.MessageAttachmentScalarWhereInput | Prisma.MessageAttachmentScalarWhereInput[];
    id?: Prisma.UuidFilter<"MessageAttachment"> | string;
    messageId?: Prisma.UuidFilter<"MessageAttachment"> | string;
    fileId?: Prisma.UuidFilter<"MessageAttachment"> | string;
    displayName?: Prisma.StringFilter<"MessageAttachment"> | string;
    flagged?: Prisma.BoolFilter<"MessageAttachment"> | boolean;
    flagReasons?: Prisma.EnumContactFlagNullableListFilter<"MessageAttachment">;
    scannedAt?: Prisma.DateTimeNullableFilter<"MessageAttachment"> | Date | string | null;
};
export type MessageAttachmentCreateWithoutFileInput = {
    id?: string;
    displayName: string;
    flagged?: boolean;
    flagReasons?: Prisma.MessageAttachmentCreateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Date | string | null;
    message: Prisma.MessageCreateNestedOneWithoutAttachmentsInput;
};
export type MessageAttachmentUncheckedCreateWithoutFileInput = {
    id?: string;
    messageId: string;
    displayName: string;
    flagged?: boolean;
    flagReasons?: Prisma.MessageAttachmentCreateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Date | string | null;
};
export type MessageAttachmentCreateOrConnectWithoutFileInput = {
    where: Prisma.MessageAttachmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutFileInput, Prisma.MessageAttachmentUncheckedCreateWithoutFileInput>;
};
export type MessageAttachmentUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.MessageAttachmentUpdateWithoutFileInput, Prisma.MessageAttachmentUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.MessageAttachmentCreateWithoutFileInput, Prisma.MessageAttachmentUncheckedCreateWithoutFileInput>;
    where?: Prisma.MessageAttachmentWhereInput;
};
export type MessageAttachmentUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.MessageAttachmentWhereInput;
    data: Prisma.XOR<Prisma.MessageAttachmentUpdateWithoutFileInput, Prisma.MessageAttachmentUncheckedUpdateWithoutFileInput>;
};
export type MessageAttachmentUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageAttachmentUpdateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    message?: Prisma.MessageUpdateOneRequiredWithoutAttachmentsNestedInput;
};
export type MessageAttachmentUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageAttachmentUpdateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MessageAttachmentCreateManyMessageInput = {
    id?: string;
    fileId: string;
    displayName: string;
    flagged?: boolean;
    flagReasons?: Prisma.MessageAttachmentCreateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Date | string | null;
};
export type MessageAttachmentUpdateWithoutMessageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageAttachmentUpdateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutMessageAttachmentNestedInput;
};
export type MessageAttachmentUncheckedUpdateWithoutMessageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageAttachmentUpdateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MessageAttachmentUncheckedUpdateManyWithoutMessageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageAttachmentUpdateflagReasonsInput | $Enums.ContactFlag[];
    scannedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MessageAttachmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    messageId?: boolean;
    fileId?: boolean;
    displayName?: boolean;
    flagged?: boolean;
    flagReasons?: boolean;
    scannedAt?: boolean;
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["messageAttachment"]>;
export type MessageAttachmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    messageId?: boolean;
    fileId?: boolean;
    displayName?: boolean;
    flagged?: boolean;
    flagReasons?: boolean;
    scannedAt?: boolean;
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["messageAttachment"]>;
export type MessageAttachmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    messageId?: boolean;
    fileId?: boolean;
    displayName?: boolean;
    flagged?: boolean;
    flagReasons?: boolean;
    scannedAt?: boolean;
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["messageAttachment"]>;
export type MessageAttachmentSelectScalar = {
    id?: boolean;
    messageId?: boolean;
    fileId?: boolean;
    displayName?: boolean;
    flagged?: boolean;
    flagReasons?: boolean;
    scannedAt?: boolean;
};
export type MessageAttachmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "messageId" | "fileId" | "displayName" | "flagged" | "flagReasons" | "scannedAt", ExtArgs["result"]["messageAttachment"]>;
export type MessageAttachmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type MessageAttachmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type MessageAttachmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    message?: boolean | Prisma.MessageDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type $MessageAttachmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MessageAttachment";
    objects: {
        message: Prisma.$MessagePayload<ExtArgs>;
        file: Prisma.$FileAssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        messageId: string;
        fileId: string;
        displayName: string;
        flagged: boolean;
        flagReasons: $Enums.ContactFlag[];
        scannedAt: Date | null;
    }, ExtArgs["result"]["messageAttachment"]>;
    composites: {};
};
export type MessageAttachmentGetPayload<S extends boolean | null | undefined | MessageAttachmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload, S>;
export type MessageAttachmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MessageAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MessageAttachmentCountAggregateInputType | true;
};
export interface MessageAttachmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MessageAttachment'];
        meta: {
            name: 'MessageAttachment';
        };
    };
    findUnique<T extends MessageAttachmentFindUniqueArgs>(args: Prisma.SelectSubset<T, MessageAttachmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MessageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MessageAttachmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MessageAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MessageAttachmentFindFirstArgs>(args?: Prisma.SelectSubset<T, MessageAttachmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__MessageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MessageAttachmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MessageAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MessageAttachmentFindManyArgs>(args?: Prisma.SelectSubset<T, MessageAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MessageAttachmentCreateArgs>(args: Prisma.SelectSubset<T, MessageAttachmentCreateArgs<ExtArgs>>): Prisma.Prisma__MessageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MessageAttachmentCreateManyArgs>(args?: Prisma.SelectSubset<T, MessageAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MessageAttachmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MessageAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MessageAttachmentDeleteArgs>(args: Prisma.SelectSubset<T, MessageAttachmentDeleteArgs<ExtArgs>>): Prisma.Prisma__MessageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MessageAttachmentUpdateArgs>(args: Prisma.SelectSubset<T, MessageAttachmentUpdateArgs<ExtArgs>>): Prisma.Prisma__MessageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MessageAttachmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, MessageAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MessageAttachmentUpdateManyArgs>(args: Prisma.SelectSubset<T, MessageAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MessageAttachmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MessageAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MessageAttachmentUpsertArgs>(args: Prisma.SelectSubset<T, MessageAttachmentUpsertArgs<ExtArgs>>): Prisma.Prisma__MessageAttachmentClient<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MessageAttachmentCountArgs>(args?: Prisma.Subset<T, MessageAttachmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MessageAttachmentCountAggregateOutputType> : number>;
    aggregate<T extends MessageAttachmentAggregateArgs>(args: Prisma.Subset<T, MessageAttachmentAggregateArgs>): Prisma.PrismaPromise<GetMessageAttachmentAggregateType<T>>;
    groupBy<T extends MessageAttachmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MessageAttachmentGroupByArgs['orderBy'];
    } : {
        orderBy?: MessageAttachmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MessageAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MessageAttachmentFieldRefs;
}
export interface Prisma__MessageAttachmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    message<T extends Prisma.MessageDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MessageDefaultArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    file<T extends Prisma.FileAssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileAssetDefaultArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MessageAttachmentFieldRefs {
    readonly id: Prisma.FieldRef<"MessageAttachment", 'String'>;
    readonly messageId: Prisma.FieldRef<"MessageAttachment", 'String'>;
    readonly fileId: Prisma.FieldRef<"MessageAttachment", 'String'>;
    readonly displayName: Prisma.FieldRef<"MessageAttachment", 'String'>;
    readonly flagged: Prisma.FieldRef<"MessageAttachment", 'Boolean'>;
    readonly flagReasons: Prisma.FieldRef<"MessageAttachment", 'ContactFlag[]'>;
    readonly scannedAt: Prisma.FieldRef<"MessageAttachment", 'DateTime'>;
}
export type MessageAttachmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    include?: Prisma.MessageAttachmentInclude<ExtArgs> | null;
    where: Prisma.MessageAttachmentWhereUniqueInput;
};
export type MessageAttachmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    include?: Prisma.MessageAttachmentInclude<ExtArgs> | null;
    where: Prisma.MessageAttachmentWhereUniqueInput;
};
export type MessageAttachmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    include?: Prisma.MessageAttachmentInclude<ExtArgs> | null;
    where?: Prisma.MessageAttachmentWhereInput;
    orderBy?: Prisma.MessageAttachmentOrderByWithRelationInput | Prisma.MessageAttachmentOrderByWithRelationInput[];
    cursor?: Prisma.MessageAttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageAttachmentScalarFieldEnum | Prisma.MessageAttachmentScalarFieldEnum[];
};
export type MessageAttachmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    include?: Prisma.MessageAttachmentInclude<ExtArgs> | null;
    where?: Prisma.MessageAttachmentWhereInput;
    orderBy?: Prisma.MessageAttachmentOrderByWithRelationInput | Prisma.MessageAttachmentOrderByWithRelationInput[];
    cursor?: Prisma.MessageAttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageAttachmentScalarFieldEnum | Prisma.MessageAttachmentScalarFieldEnum[];
};
export type MessageAttachmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    include?: Prisma.MessageAttachmentInclude<ExtArgs> | null;
    where?: Prisma.MessageAttachmentWhereInput;
    orderBy?: Prisma.MessageAttachmentOrderByWithRelationInput | Prisma.MessageAttachmentOrderByWithRelationInput[];
    cursor?: Prisma.MessageAttachmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageAttachmentScalarFieldEnum | Prisma.MessageAttachmentScalarFieldEnum[];
};
export type MessageAttachmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    include?: Prisma.MessageAttachmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageAttachmentCreateInput, Prisma.MessageAttachmentUncheckedCreateInput>;
};
export type MessageAttachmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MessageAttachmentCreateManyInput | Prisma.MessageAttachmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MessageAttachmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    data: Prisma.MessageAttachmentCreateManyInput | Prisma.MessageAttachmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MessageAttachmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MessageAttachmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    include?: Prisma.MessageAttachmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageAttachmentUpdateInput, Prisma.MessageAttachmentUncheckedUpdateInput>;
    where: Prisma.MessageAttachmentWhereUniqueInput;
};
export type MessageAttachmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MessageAttachmentUpdateManyMutationInput, Prisma.MessageAttachmentUncheckedUpdateManyInput>;
    where?: Prisma.MessageAttachmentWhereInput;
    limit?: number;
};
export type MessageAttachmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageAttachmentUpdateManyMutationInput, Prisma.MessageAttachmentUncheckedUpdateManyInput>;
    where?: Prisma.MessageAttachmentWhereInput;
    limit?: number;
    include?: Prisma.MessageAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MessageAttachmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    include?: Prisma.MessageAttachmentInclude<ExtArgs> | null;
    where: Prisma.MessageAttachmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageAttachmentCreateInput, Prisma.MessageAttachmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MessageAttachmentUpdateInput, Prisma.MessageAttachmentUncheckedUpdateInput>;
};
export type MessageAttachmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    include?: Prisma.MessageAttachmentInclude<ExtArgs> | null;
    where: Prisma.MessageAttachmentWhereUniqueInput;
};
export type MessageAttachmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageAttachmentWhereInput;
    limit?: number;
};
export type MessageAttachmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageAttachmentSelect<ExtArgs> | null;
    omit?: Prisma.MessageAttachmentOmit<ExtArgs> | null;
    include?: Prisma.MessageAttachmentInclude<ExtArgs> | null;
};
