import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MessageModel = runtime.Types.Result.DefaultSelection<Prisma.$MessagePayload>;
export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
};
export type MessageMinAggregateOutputType = {
    id: string | null;
    conversationId: string | null;
    senderId: string | null;
    originalContent: string | null;
    filteredContent: string | null;
    relayedFromId: string | null;
    flagged: boolean | null;
    moderationStatus: $Enums.ModerationStatus | null;
    editedAt: Date | null;
    createdAt: Date | null;
};
export type MessageMaxAggregateOutputType = {
    id: string | null;
    conversationId: string | null;
    senderId: string | null;
    originalContent: string | null;
    filteredContent: string | null;
    relayedFromId: string | null;
    flagged: boolean | null;
    moderationStatus: $Enums.ModerationStatus | null;
    editedAt: Date | null;
    createdAt: Date | null;
};
export type MessageCountAggregateOutputType = {
    id: number;
    conversationId: number;
    senderId: number;
    originalContent: number;
    filteredContent: number;
    relayedFromId: number;
    flagged: number;
    flagReasons: number;
    moderationStatus: number;
    editedAt: number;
    createdAt: number;
    _all: number;
};
export type MessageMinAggregateInputType = {
    id?: true;
    conversationId?: true;
    senderId?: true;
    originalContent?: true;
    filteredContent?: true;
    relayedFromId?: true;
    flagged?: true;
    moderationStatus?: true;
    editedAt?: true;
    createdAt?: true;
};
export type MessageMaxAggregateInputType = {
    id?: true;
    conversationId?: true;
    senderId?: true;
    originalContent?: true;
    filteredContent?: true;
    relayedFromId?: true;
    flagged?: true;
    moderationStatus?: true;
    editedAt?: true;
    createdAt?: true;
};
export type MessageCountAggregateInputType = {
    id?: true;
    conversationId?: true;
    senderId?: true;
    originalContent?: true;
    filteredContent?: true;
    relayedFromId?: true;
    flagged?: true;
    flagReasons?: true;
    moderationStatus?: true;
    editedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type MessageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MessageCountAggregateInputType;
    _min?: MessageMinAggregateInputType;
    _max?: MessageMaxAggregateInputType;
};
export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
    [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMessage[P]> : Prisma.GetScalarType<T[P], AggregateMessage[P]>;
};
export type MessageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithAggregationInput | Prisma.MessageOrderByWithAggregationInput[];
    by: Prisma.MessageScalarFieldEnum[] | Prisma.MessageScalarFieldEnum;
    having?: Prisma.MessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageCountAggregateInputType | true;
    _min?: MessageMinAggregateInputType;
    _max?: MessageMaxAggregateInputType;
};
export type MessageGroupByOutputType = {
    id: string;
    conversationId: string;
    senderId: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId: string | null;
    flagged: boolean;
    flagReasons: $Enums.ContactFlag[];
    moderationStatus: $Enums.ModerationStatus;
    editedAt: Date | null;
    createdAt: Date;
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
};
export type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MessageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MessageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MessageGroupByOutputType[P]>;
}>>;
export type MessageWhereInput = {
    AND?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    OR?: Prisma.MessageWhereInput[];
    NOT?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    id?: Prisma.UuidFilter<"Message"> | string;
    conversationId?: Prisma.UuidFilter<"Message"> | string;
    senderId?: Prisma.UuidFilter<"Message"> | string;
    originalContent?: Prisma.StringFilter<"Message"> | string;
    filteredContent?: Prisma.StringFilter<"Message"> | string;
    relayedFromId?: Prisma.UuidNullableFilter<"Message"> | string | null;
    flagged?: Prisma.BoolFilter<"Message"> | boolean;
    flagReasons?: Prisma.EnumContactFlagNullableListFilter<"Message">;
    moderationStatus?: Prisma.EnumModerationStatusFilter<"Message"> | $Enums.ModerationStatus;
    editedAt?: Prisma.DateTimeNullableFilter<"Message"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    attachments?: Prisma.MessageAttachmentListRelationFilter;
};
export type MessageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    originalContent?: Prisma.SortOrder;
    filteredContent?: Prisma.SortOrder;
    relayedFromId?: Prisma.SortOrderInput | Prisma.SortOrder;
    flagged?: Prisma.SortOrder;
    flagReasons?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    editedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    conversation?: Prisma.ConversationOrderByWithRelationInput;
    sender?: Prisma.UserOrderByWithRelationInput;
    attachments?: Prisma.MessageAttachmentOrderByRelationAggregateInput;
};
export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    OR?: Prisma.MessageWhereInput[];
    NOT?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    conversationId?: Prisma.UuidFilter<"Message"> | string;
    senderId?: Prisma.UuidFilter<"Message"> | string;
    originalContent?: Prisma.StringFilter<"Message"> | string;
    filteredContent?: Prisma.StringFilter<"Message"> | string;
    relayedFromId?: Prisma.UuidNullableFilter<"Message"> | string | null;
    flagged?: Prisma.BoolFilter<"Message"> | boolean;
    flagReasons?: Prisma.EnumContactFlagNullableListFilter<"Message">;
    moderationStatus?: Prisma.EnumModerationStatusFilter<"Message"> | $Enums.ModerationStatus;
    editedAt?: Prisma.DateTimeNullableFilter<"Message"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    attachments?: Prisma.MessageAttachmentListRelationFilter;
}, "id">;
export type MessageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    originalContent?: Prisma.SortOrder;
    filteredContent?: Prisma.SortOrder;
    relayedFromId?: Prisma.SortOrderInput | Prisma.SortOrder;
    flagged?: Prisma.SortOrder;
    flagReasons?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    editedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MessageCountOrderByAggregateInput;
    _max?: Prisma.MessageMaxOrderByAggregateInput;
    _min?: Prisma.MessageMinOrderByAggregateInput;
};
export type MessageScalarWhereWithAggregatesInput = {
    AND?: Prisma.MessageScalarWhereWithAggregatesInput | Prisma.MessageScalarWhereWithAggregatesInput[];
    OR?: Prisma.MessageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MessageScalarWhereWithAggregatesInput | Prisma.MessageScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Message"> | string;
    conversationId?: Prisma.UuidWithAggregatesFilter<"Message"> | string;
    senderId?: Prisma.UuidWithAggregatesFilter<"Message"> | string;
    originalContent?: Prisma.StringWithAggregatesFilter<"Message"> | string;
    filteredContent?: Prisma.StringWithAggregatesFilter<"Message"> | string;
    relayedFromId?: Prisma.UuidNullableWithAggregatesFilter<"Message"> | string | null;
    flagged?: Prisma.BoolWithAggregatesFilter<"Message"> | boolean;
    flagReasons?: Prisma.EnumContactFlagNullableListFilter<"Message">;
    moderationStatus?: Prisma.EnumModerationStatusWithAggregatesFilter<"Message"> | $Enums.ModerationStatus;
    editedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Message"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Message"> | Date | string;
};
export type MessageCreateInput = {
    id?: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId?: string | null;
    flagged?: boolean;
    flagReasons?: Prisma.MessageCreateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: $Enums.ModerationStatus;
    editedAt?: Date | string | null;
    createdAt?: Date | string;
    conversation: Prisma.ConversationCreateNestedOneWithoutMessagesInput;
    sender: Prisma.UserCreateNestedOneWithoutMessagesSentInput;
    attachments?: Prisma.MessageAttachmentCreateNestedManyWithoutMessageInput;
};
export type MessageUncheckedCreateInput = {
    id?: string;
    conversationId: string;
    senderId: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId?: string | null;
    flagged?: boolean;
    flagReasons?: Prisma.MessageCreateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: $Enums.ModerationStatus;
    editedAt?: Date | string | null;
    createdAt?: Date | string;
    attachments?: Prisma.MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput;
};
export type MessageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesSentNestedInput;
    attachments?: Prisma.MessageAttachmentUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attachments?: Prisma.MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput;
};
export type MessageCreateManyInput = {
    id?: string;
    conversationId: string;
    senderId: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId?: string | null;
    flagged?: boolean;
    flagReasons?: Prisma.MessageCreateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: $Enums.ModerationStatus;
    editedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MessageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageListRelationFilter = {
    every?: Prisma.MessageWhereInput;
    some?: Prisma.MessageWhereInput;
    none?: Prisma.MessageWhereInput;
};
export type MessageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EnumContactFlagNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.ContactFlag[] | Prisma.ListEnumContactFlagFieldRefInput<$PrismaModel> | null;
    has?: $Enums.ContactFlag | Prisma.EnumContactFlagFieldRefInput<$PrismaModel> | null;
    hasEvery?: $Enums.ContactFlag[] | Prisma.ListEnumContactFlagFieldRefInput<$PrismaModel>;
    hasSome?: $Enums.ContactFlag[] | Prisma.ListEnumContactFlagFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type MessageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    originalContent?: Prisma.SortOrder;
    filteredContent?: Prisma.SortOrder;
    relayedFromId?: Prisma.SortOrder;
    flagged?: Prisma.SortOrder;
    flagReasons?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    editedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MessageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    originalContent?: Prisma.SortOrder;
    filteredContent?: Prisma.SortOrder;
    relayedFromId?: Prisma.SortOrder;
    flagged?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    editedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MessageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    originalContent?: Prisma.SortOrder;
    filteredContent?: Prisma.SortOrder;
    relayedFromId?: Prisma.SortOrder;
    flagged?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    editedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MessageScalarRelationFilter = {
    is?: Prisma.MessageWhereInput;
    isNot?: Prisma.MessageWhereInput;
};
export type MessageCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput | Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput | Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutSenderInput | Prisma.MessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput | Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput | Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutSenderInput | Prisma.MessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput> | Prisma.MessageCreateWithoutConversationInput[] | Prisma.MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutConversationInput | Prisma.MessageCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.MessageCreateManyConversationInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput> | Prisma.MessageCreateWithoutConversationInput[] | Prisma.MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutConversationInput | Prisma.MessageCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.MessageCreateManyConversationInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput> | Prisma.MessageCreateWithoutConversationInput[] | Prisma.MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutConversationInput | Prisma.MessageCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput | Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.MessageCreateManyConversationInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput | Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutConversationInput | Prisma.MessageUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput> | Prisma.MessageCreateWithoutConversationInput[] | Prisma.MessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutConversationInput | Prisma.MessageCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput | Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.MessageCreateManyConversationInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput | Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutConversationInput | Prisma.MessageUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageCreateflagReasonsInput = {
    set: $Enums.ContactFlag[];
};
export type MessageUpdateflagReasonsInput = {
    set?: $Enums.ContactFlag[];
    push?: $Enums.ContactFlag | $Enums.ContactFlag[];
};
export type EnumModerationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ModerationStatus;
};
export type MessageCreateNestedOneWithoutAttachmentsInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutAttachmentsInput, Prisma.MessageUncheckedCreateWithoutAttachmentsInput>;
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutAttachmentsInput;
    connect?: Prisma.MessageWhereUniqueInput;
};
export type MessageUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutAttachmentsInput, Prisma.MessageUncheckedCreateWithoutAttachmentsInput>;
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutAttachmentsInput;
    upsert?: Prisma.MessageUpsertWithoutAttachmentsInput;
    connect?: Prisma.MessageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MessageUpdateToOneWithWhereWithoutAttachmentsInput, Prisma.MessageUpdateWithoutAttachmentsInput>, Prisma.MessageUncheckedUpdateWithoutAttachmentsInput>;
};
export type MessageCreateWithoutSenderInput = {
    id?: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId?: string | null;
    flagged?: boolean;
    flagReasons?: Prisma.MessageCreateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: $Enums.ModerationStatus;
    editedAt?: Date | string | null;
    createdAt?: Date | string;
    conversation: Prisma.ConversationCreateNestedOneWithoutMessagesInput;
    attachments?: Prisma.MessageAttachmentCreateNestedManyWithoutMessageInput;
};
export type MessageUncheckedCreateWithoutSenderInput = {
    id?: string;
    conversationId: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId?: string | null;
    flagged?: boolean;
    flagReasons?: Prisma.MessageCreateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: $Enums.ModerationStatus;
    editedAt?: Date | string | null;
    createdAt?: Date | string;
    attachments?: Prisma.MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput;
};
export type MessageCreateOrConnectWithoutSenderInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput>;
};
export type MessageCreateManySenderInputEnvelope = {
    data: Prisma.MessageCreateManySenderInput | Prisma.MessageCreateManySenderInput[];
    skipDuplicates?: boolean;
};
export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: Prisma.MessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MessageUpdateWithoutSenderInput, Prisma.MessageUncheckedUpdateWithoutSenderInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput>;
};
export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutSenderInput, Prisma.MessageUncheckedUpdateWithoutSenderInput>;
};
export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: Prisma.MessageScalarWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyWithoutSenderInput>;
};
export type MessageScalarWhereInput = {
    AND?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
    OR?: Prisma.MessageScalarWhereInput[];
    NOT?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
    id?: Prisma.UuidFilter<"Message"> | string;
    conversationId?: Prisma.UuidFilter<"Message"> | string;
    senderId?: Prisma.UuidFilter<"Message"> | string;
    originalContent?: Prisma.StringFilter<"Message"> | string;
    filteredContent?: Prisma.StringFilter<"Message"> | string;
    relayedFromId?: Prisma.UuidNullableFilter<"Message"> | string | null;
    flagged?: Prisma.BoolFilter<"Message"> | boolean;
    flagReasons?: Prisma.EnumContactFlagNullableListFilter<"Message">;
    moderationStatus?: Prisma.EnumModerationStatusFilter<"Message"> | $Enums.ModerationStatus;
    editedAt?: Prisma.DateTimeNullableFilter<"Message"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
};
export type MessageCreateWithoutConversationInput = {
    id?: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId?: string | null;
    flagged?: boolean;
    flagReasons?: Prisma.MessageCreateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: $Enums.ModerationStatus;
    editedAt?: Date | string | null;
    createdAt?: Date | string;
    sender: Prisma.UserCreateNestedOneWithoutMessagesSentInput;
    attachments?: Prisma.MessageAttachmentCreateNestedManyWithoutMessageInput;
};
export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string;
    senderId: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId?: string | null;
    flagged?: boolean;
    flagReasons?: Prisma.MessageCreateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: $Enums.ModerationStatus;
    editedAt?: Date | string | null;
    createdAt?: Date | string;
    attachments?: Prisma.MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput;
};
export type MessageCreateOrConnectWithoutConversationInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput>;
};
export type MessageCreateManyConversationInputEnvelope = {
    data: Prisma.MessageCreateManyConversationInput | Prisma.MessageCreateManyConversationInput[];
    skipDuplicates?: boolean;
};
export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: Prisma.MessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MessageUpdateWithoutConversationInput, Prisma.MessageUncheckedUpdateWithoutConversationInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutConversationInput, Prisma.MessageUncheckedCreateWithoutConversationInput>;
};
export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutConversationInput, Prisma.MessageUncheckedUpdateWithoutConversationInput>;
};
export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: Prisma.MessageScalarWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyWithoutConversationInput>;
};
export type MessageCreateWithoutAttachmentsInput = {
    id?: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId?: string | null;
    flagged?: boolean;
    flagReasons?: Prisma.MessageCreateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: $Enums.ModerationStatus;
    editedAt?: Date | string | null;
    createdAt?: Date | string;
    conversation: Prisma.ConversationCreateNestedOneWithoutMessagesInput;
    sender: Prisma.UserCreateNestedOneWithoutMessagesSentInput;
};
export type MessageUncheckedCreateWithoutAttachmentsInput = {
    id?: string;
    conversationId: string;
    senderId: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId?: string | null;
    flagged?: boolean;
    flagReasons?: Prisma.MessageCreateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: $Enums.ModerationStatus;
    editedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MessageCreateOrConnectWithoutAttachmentsInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutAttachmentsInput, Prisma.MessageUncheckedCreateWithoutAttachmentsInput>;
};
export type MessageUpsertWithoutAttachmentsInput = {
    update: Prisma.XOR<Prisma.MessageUpdateWithoutAttachmentsInput, Prisma.MessageUncheckedUpdateWithoutAttachmentsInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutAttachmentsInput, Prisma.MessageUncheckedCreateWithoutAttachmentsInput>;
    where?: Prisma.MessageWhereInput;
};
export type MessageUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: Prisma.MessageWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutAttachmentsInput, Prisma.MessageUncheckedUpdateWithoutAttachmentsInput>;
};
export type MessageUpdateWithoutAttachmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesSentNestedInput;
};
export type MessageUncheckedUpdateWithoutAttachmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageCreateManySenderInput = {
    id?: string;
    conversationId: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId?: string | null;
    flagged?: boolean;
    flagReasons?: Prisma.MessageCreateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: $Enums.ModerationStatus;
    editedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MessageUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput;
    attachments?: Prisma.MessageAttachmentUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attachments?: Prisma.MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageCreateManyConversationInput = {
    id?: string;
    senderId: string;
    originalContent: string;
    filteredContent: string;
    relayedFromId?: string | null;
    flagged?: boolean;
    flagReasons?: Prisma.MessageCreateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: $Enums.ModerationStatus;
    editedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type MessageUpdateWithoutConversationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesSentNestedInput;
    attachments?: Prisma.MessageAttachmentUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    attachments?: Prisma.MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput;
};
export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    originalContent?: Prisma.StringFieldUpdateOperationsInput | string;
    filteredContent?: Prisma.StringFieldUpdateOperationsInput | string;
    relayedFromId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    flagged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    flagReasons?: Prisma.MessageUpdateflagReasonsInput | $Enums.ContactFlag[];
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    editedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageCountOutputType = {
    attachments: number;
};
export type MessageCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    attachments?: boolean | MessageCountOutputTypeCountAttachmentsArgs;
};
export type MessageCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageCountOutputTypeSelect<ExtArgs> | null;
};
export type MessageCountOutputTypeCountAttachmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageAttachmentWhereInput;
};
export type MessageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    senderId?: boolean;
    originalContent?: boolean;
    filteredContent?: boolean;
    relayedFromId?: boolean;
    flagged?: boolean;
    flagReasons?: boolean;
    moderationStatus?: boolean;
    editedAt?: boolean;
    createdAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    attachments?: boolean | Prisma.Message$attachmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.MessageCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["message"]>;
export type MessageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    senderId?: boolean;
    originalContent?: boolean;
    filteredContent?: boolean;
    relayedFromId?: boolean;
    flagged?: boolean;
    flagReasons?: boolean;
    moderationStatus?: boolean;
    editedAt?: boolean;
    createdAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["message"]>;
export type MessageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    senderId?: boolean;
    originalContent?: boolean;
    filteredContent?: boolean;
    relayedFromId?: boolean;
    flagged?: boolean;
    flagReasons?: boolean;
    moderationStatus?: boolean;
    editedAt?: boolean;
    createdAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["message"]>;
export type MessageSelectScalar = {
    id?: boolean;
    conversationId?: boolean;
    senderId?: boolean;
    originalContent?: boolean;
    filteredContent?: boolean;
    relayedFromId?: boolean;
    flagged?: boolean;
    flagReasons?: boolean;
    moderationStatus?: boolean;
    editedAt?: boolean;
    createdAt?: boolean;
};
export type MessageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "conversationId" | "senderId" | "originalContent" | "filteredContent" | "relayedFromId" | "flagged" | "flagReasons" | "moderationStatus" | "editedAt" | "createdAt", ExtArgs["result"]["message"]>;
export type MessageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    attachments?: boolean | Prisma.Message$attachmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.MessageCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MessageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MessageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $MessagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Message";
    objects: {
        conversation: Prisma.$ConversationPayload<ExtArgs>;
        sender: Prisma.$UserPayload<ExtArgs>;
        attachments: Prisma.$MessageAttachmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        conversationId: string;
        senderId: string;
        originalContent: string;
        filteredContent: string;
        relayedFromId: string | null;
        flagged: boolean;
        flagReasons: $Enums.ContactFlag[];
        moderationStatus: $Enums.ModerationStatus;
        editedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["message"]>;
    composites: {};
};
export type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MessagePayload, S>;
export type MessageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MessageCountAggregateInputType | true;
};
export interface MessageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Message'];
        meta: {
            name: 'Message';
        };
    };
    findUnique<T extends MessageFindUniqueArgs>(args: Prisma.SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MessageFindFirstArgs>(args?: Prisma.SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MessageFindManyArgs>(args?: Prisma.SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MessageCreateArgs>(args: Prisma.SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MessageCreateManyArgs>(args?: Prisma.SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MessageDeleteArgs>(args: Prisma.SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MessageUpdateArgs>(args: Prisma.SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MessageDeleteManyArgs>(args?: Prisma.SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MessageUpdateManyArgs>(args: Prisma.SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MessageUpsertArgs>(args: Prisma.SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MessageCountArgs>(args?: Prisma.Subset<T, MessageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MessageCountAggregateOutputType> : number>;
    aggregate<T extends MessageAggregateArgs>(args: Prisma.Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>;
    groupBy<T extends MessageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MessageGroupByArgs['orderBy'];
    } : {
        orderBy?: MessageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MessageFieldRefs;
}
export interface Prisma__MessageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    conversation<T extends Prisma.ConversationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConversationDefaultArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sender<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    attachments<T extends Prisma.Message$attachmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Message$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MessageFieldRefs {
    readonly id: Prisma.FieldRef<"Message", 'String'>;
    readonly conversationId: Prisma.FieldRef<"Message", 'String'>;
    readonly senderId: Prisma.FieldRef<"Message", 'String'>;
    readonly originalContent: Prisma.FieldRef<"Message", 'String'>;
    readonly filteredContent: Prisma.FieldRef<"Message", 'String'>;
    readonly relayedFromId: Prisma.FieldRef<"Message", 'String'>;
    readonly flagged: Prisma.FieldRef<"Message", 'Boolean'>;
    readonly flagReasons: Prisma.FieldRef<"Message", 'ContactFlag[]'>;
    readonly moderationStatus: Prisma.FieldRef<"Message", 'ModerationStatus'>;
    readonly editedAt: Prisma.FieldRef<"Message", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Message", 'DateTime'>;
}
export type MessageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type MessageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type MessageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type MessageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageCreateInput, Prisma.MessageUncheckedCreateInput>;
};
export type MessageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MessageCreateManyInput | Prisma.MessageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MessageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    data: Prisma.MessageCreateManyInput | Prisma.MessageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MessageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MessageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageUpdateInput, Prisma.MessageUncheckedUpdateInput>;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyInput>;
    where?: Prisma.MessageWhereInput;
    limit?: number;
};
export type MessageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyInput>;
    where?: Prisma.MessageWhereInput;
    limit?: number;
    include?: Prisma.MessageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MessageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateInput, Prisma.MessageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MessageUpdateInput, Prisma.MessageUncheckedUpdateInput>;
};
export type MessageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
    limit?: number;
};
export type Message$attachmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MessageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
};
