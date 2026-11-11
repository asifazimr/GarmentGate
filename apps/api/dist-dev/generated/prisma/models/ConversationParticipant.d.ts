import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ConversationParticipantModel = runtime.Types.Result.DefaultSelection<Prisma.$ConversationParticipantPayload>;
export type AggregateConversationParticipant = {
    _count: ConversationParticipantCountAggregateOutputType | null;
    _min: ConversationParticipantMinAggregateOutputType | null;
    _max: ConversationParticipantMaxAggregateOutputType | null;
};
export type ConversationParticipantMinAggregateOutputType = {
    conversationId: string | null;
    userId: string | null;
    joinedAt: Date | null;
    lastReadAt: Date | null;
};
export type ConversationParticipantMaxAggregateOutputType = {
    conversationId: string | null;
    userId: string | null;
    joinedAt: Date | null;
    lastReadAt: Date | null;
};
export type ConversationParticipantCountAggregateOutputType = {
    conversationId: number;
    userId: number;
    joinedAt: number;
    lastReadAt: number;
    _all: number;
};
export type ConversationParticipantMinAggregateInputType = {
    conversationId?: true;
    userId?: true;
    joinedAt?: true;
    lastReadAt?: true;
};
export type ConversationParticipantMaxAggregateInputType = {
    conversationId?: true;
    userId?: true;
    joinedAt?: true;
    lastReadAt?: true;
};
export type ConversationParticipantCountAggregateInputType = {
    conversationId?: true;
    userId?: true;
    joinedAt?: true;
    lastReadAt?: true;
    _all?: true;
};
export type ConversationParticipantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationParticipantWhereInput;
    orderBy?: Prisma.ConversationParticipantOrderByWithRelationInput | Prisma.ConversationParticipantOrderByWithRelationInput[];
    cursor?: Prisma.ConversationParticipantWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConversationParticipantCountAggregateInputType;
    _min?: ConversationParticipantMinAggregateInputType;
    _max?: ConversationParticipantMaxAggregateInputType;
};
export type GetConversationParticipantAggregateType<T extends ConversationParticipantAggregateArgs> = {
    [P in keyof T & keyof AggregateConversationParticipant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConversationParticipant[P]> : Prisma.GetScalarType<T[P], AggregateConversationParticipant[P]>;
};
export type ConversationParticipantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationParticipantWhereInput;
    orderBy?: Prisma.ConversationParticipantOrderByWithAggregationInput | Prisma.ConversationParticipantOrderByWithAggregationInput[];
    by: Prisma.ConversationParticipantScalarFieldEnum[] | Prisma.ConversationParticipantScalarFieldEnum;
    having?: Prisma.ConversationParticipantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConversationParticipantCountAggregateInputType | true;
    _min?: ConversationParticipantMinAggregateInputType;
    _max?: ConversationParticipantMaxAggregateInputType;
};
export type ConversationParticipantGroupByOutputType = {
    conversationId: string;
    userId: string;
    joinedAt: Date;
    lastReadAt: Date | null;
    _count: ConversationParticipantCountAggregateOutputType | null;
    _min: ConversationParticipantMinAggregateOutputType | null;
    _max: ConversationParticipantMaxAggregateOutputType | null;
};
export type GetConversationParticipantGroupByPayload<T extends ConversationParticipantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConversationParticipantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConversationParticipantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConversationParticipantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConversationParticipantGroupByOutputType[P]>;
}>>;
export type ConversationParticipantWhereInput = {
    AND?: Prisma.ConversationParticipantWhereInput | Prisma.ConversationParticipantWhereInput[];
    OR?: Prisma.ConversationParticipantWhereInput[];
    NOT?: Prisma.ConversationParticipantWhereInput | Prisma.ConversationParticipantWhereInput[];
    conversationId?: Prisma.UuidFilter<"ConversationParticipant"> | string;
    userId?: Prisma.UuidFilter<"ConversationParticipant"> | string;
    joinedAt?: Prisma.DateTimeFilter<"ConversationParticipant"> | Date | string;
    lastReadAt?: Prisma.DateTimeNullableFilter<"ConversationParticipant"> | Date | string | null;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ConversationParticipantOrderByWithRelationInput = {
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    lastReadAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    conversation?: Prisma.ConversationOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ConversationParticipantWhereUniqueInput = Prisma.AtLeast<{
    conversationId_userId?: Prisma.ConversationParticipantConversationIdUserIdCompoundUniqueInput;
    AND?: Prisma.ConversationParticipantWhereInput | Prisma.ConversationParticipantWhereInput[];
    OR?: Prisma.ConversationParticipantWhereInput[];
    NOT?: Prisma.ConversationParticipantWhereInput | Prisma.ConversationParticipantWhereInput[];
    conversationId?: Prisma.UuidFilter<"ConversationParticipant"> | string;
    userId?: Prisma.UuidFilter<"ConversationParticipant"> | string;
    joinedAt?: Prisma.DateTimeFilter<"ConversationParticipant"> | Date | string;
    lastReadAt?: Prisma.DateTimeNullableFilter<"ConversationParticipant"> | Date | string | null;
    conversation?: Prisma.XOR<Prisma.ConversationScalarRelationFilter, Prisma.ConversationWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "conversationId_userId">;
export type ConversationParticipantOrderByWithAggregationInput = {
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    lastReadAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ConversationParticipantCountOrderByAggregateInput;
    _max?: Prisma.ConversationParticipantMaxOrderByAggregateInput;
    _min?: Prisma.ConversationParticipantMinOrderByAggregateInput;
};
export type ConversationParticipantScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConversationParticipantScalarWhereWithAggregatesInput | Prisma.ConversationParticipantScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConversationParticipantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConversationParticipantScalarWhereWithAggregatesInput | Prisma.ConversationParticipantScalarWhereWithAggregatesInput[];
    conversationId?: Prisma.UuidWithAggregatesFilter<"ConversationParticipant"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"ConversationParticipant"> | string;
    joinedAt?: Prisma.DateTimeWithAggregatesFilter<"ConversationParticipant"> | Date | string;
    lastReadAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ConversationParticipant"> | Date | string | null;
};
export type ConversationParticipantCreateInput = {
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    conversation: Prisma.ConversationCreateNestedOneWithoutParticipantsInput;
    user: Prisma.UserCreateNestedOneWithoutConversationsJoinedInput;
};
export type ConversationParticipantUncheckedCreateInput = {
    conversationId: string;
    userId: string;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
};
export type ConversationParticipantUpdateInput = {
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutParticipantsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutConversationsJoinedNestedInput;
};
export type ConversationParticipantUncheckedUpdateInput = {
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationParticipantCreateManyInput = {
    conversationId: string;
    userId: string;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
};
export type ConversationParticipantUpdateManyMutationInput = {
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationParticipantUncheckedUpdateManyInput = {
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationParticipantListRelationFilter = {
    every?: Prisma.ConversationParticipantWhereInput;
    some?: Prisma.ConversationParticipantWhereInput;
    none?: Prisma.ConversationParticipantWhereInput;
};
export type ConversationParticipantOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ConversationParticipantConversationIdUserIdCompoundUniqueInput = {
    conversationId: string;
    userId: string;
};
export type ConversationParticipantCountOrderByAggregateInput = {
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    lastReadAt?: Prisma.SortOrder;
};
export type ConversationParticipantMaxOrderByAggregateInput = {
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    lastReadAt?: Prisma.SortOrder;
};
export type ConversationParticipantMinOrderByAggregateInput = {
    conversationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    lastReadAt?: Prisma.SortOrder;
};
export type ConversationParticipantCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutUserInput, Prisma.ConversationParticipantUncheckedCreateWithoutUserInput> | Prisma.ConversationParticipantCreateWithoutUserInput[] | Prisma.ConversationParticipantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ConversationParticipantCreateOrConnectWithoutUserInput | Prisma.ConversationParticipantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ConversationParticipantCreateManyUserInputEnvelope;
    connect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
};
export type ConversationParticipantUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutUserInput, Prisma.ConversationParticipantUncheckedCreateWithoutUserInput> | Prisma.ConversationParticipantCreateWithoutUserInput[] | Prisma.ConversationParticipantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ConversationParticipantCreateOrConnectWithoutUserInput | Prisma.ConversationParticipantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ConversationParticipantCreateManyUserInputEnvelope;
    connect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
};
export type ConversationParticipantUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutUserInput, Prisma.ConversationParticipantUncheckedCreateWithoutUserInput> | Prisma.ConversationParticipantCreateWithoutUserInput[] | Prisma.ConversationParticipantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ConversationParticipantCreateOrConnectWithoutUserInput | Prisma.ConversationParticipantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ConversationParticipantUpsertWithWhereUniqueWithoutUserInput | Prisma.ConversationParticipantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ConversationParticipantCreateManyUserInputEnvelope;
    set?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    disconnect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    delete?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    connect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    update?: Prisma.ConversationParticipantUpdateWithWhereUniqueWithoutUserInput | Prisma.ConversationParticipantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ConversationParticipantUpdateManyWithWhereWithoutUserInput | Prisma.ConversationParticipantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ConversationParticipantScalarWhereInput | Prisma.ConversationParticipantScalarWhereInput[];
};
export type ConversationParticipantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutUserInput, Prisma.ConversationParticipantUncheckedCreateWithoutUserInput> | Prisma.ConversationParticipantCreateWithoutUserInput[] | Prisma.ConversationParticipantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ConversationParticipantCreateOrConnectWithoutUserInput | Prisma.ConversationParticipantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ConversationParticipantUpsertWithWhereUniqueWithoutUserInput | Prisma.ConversationParticipantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ConversationParticipantCreateManyUserInputEnvelope;
    set?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    disconnect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    delete?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    connect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    update?: Prisma.ConversationParticipantUpdateWithWhereUniqueWithoutUserInput | Prisma.ConversationParticipantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ConversationParticipantUpdateManyWithWhereWithoutUserInput | Prisma.ConversationParticipantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ConversationParticipantScalarWhereInput | Prisma.ConversationParticipantScalarWhereInput[];
};
export type ConversationParticipantCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutConversationInput, Prisma.ConversationParticipantUncheckedCreateWithoutConversationInput> | Prisma.ConversationParticipantCreateWithoutConversationInput[] | Prisma.ConversationParticipantUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ConversationParticipantCreateOrConnectWithoutConversationInput | Prisma.ConversationParticipantCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.ConversationParticipantCreateManyConversationInputEnvelope;
    connect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
};
export type ConversationParticipantUncheckedCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutConversationInput, Prisma.ConversationParticipantUncheckedCreateWithoutConversationInput> | Prisma.ConversationParticipantCreateWithoutConversationInput[] | Prisma.ConversationParticipantUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ConversationParticipantCreateOrConnectWithoutConversationInput | Prisma.ConversationParticipantCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.ConversationParticipantCreateManyConversationInputEnvelope;
    connect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
};
export type ConversationParticipantUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutConversationInput, Prisma.ConversationParticipantUncheckedCreateWithoutConversationInput> | Prisma.ConversationParticipantCreateWithoutConversationInput[] | Prisma.ConversationParticipantUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ConversationParticipantCreateOrConnectWithoutConversationInput | Prisma.ConversationParticipantCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput | Prisma.ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.ConversationParticipantCreateManyConversationInputEnvelope;
    set?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    disconnect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    delete?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    connect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    update?: Prisma.ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput | Prisma.ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.ConversationParticipantUpdateManyWithWhereWithoutConversationInput | Prisma.ConversationParticipantUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.ConversationParticipantScalarWhereInput | Prisma.ConversationParticipantScalarWhereInput[];
};
export type ConversationParticipantUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutConversationInput, Prisma.ConversationParticipantUncheckedCreateWithoutConversationInput> | Prisma.ConversationParticipantCreateWithoutConversationInput[] | Prisma.ConversationParticipantUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ConversationParticipantCreateOrConnectWithoutConversationInput | Prisma.ConversationParticipantCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput | Prisma.ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.ConversationParticipantCreateManyConversationInputEnvelope;
    set?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    disconnect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    delete?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    connect?: Prisma.ConversationParticipantWhereUniqueInput | Prisma.ConversationParticipantWhereUniqueInput[];
    update?: Prisma.ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput | Prisma.ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.ConversationParticipantUpdateManyWithWhereWithoutConversationInput | Prisma.ConversationParticipantUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.ConversationParticipantScalarWhereInput | Prisma.ConversationParticipantScalarWhereInput[];
};
export type ConversationParticipantCreateWithoutUserInput = {
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    conversation: Prisma.ConversationCreateNestedOneWithoutParticipantsInput;
};
export type ConversationParticipantUncheckedCreateWithoutUserInput = {
    conversationId: string;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
};
export type ConversationParticipantCreateOrConnectWithoutUserInput = {
    where: Prisma.ConversationParticipantWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutUserInput, Prisma.ConversationParticipantUncheckedCreateWithoutUserInput>;
};
export type ConversationParticipantCreateManyUserInputEnvelope = {
    data: Prisma.ConversationParticipantCreateManyUserInput | Prisma.ConversationParticipantCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ConversationParticipantUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ConversationParticipantWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationParticipantUpdateWithoutUserInput, Prisma.ConversationParticipantUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutUserInput, Prisma.ConversationParticipantUncheckedCreateWithoutUserInput>;
};
export type ConversationParticipantUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ConversationParticipantWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationParticipantUpdateWithoutUserInput, Prisma.ConversationParticipantUncheckedUpdateWithoutUserInput>;
};
export type ConversationParticipantUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ConversationParticipantScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationParticipantUpdateManyMutationInput, Prisma.ConversationParticipantUncheckedUpdateManyWithoutUserInput>;
};
export type ConversationParticipantScalarWhereInput = {
    AND?: Prisma.ConversationParticipantScalarWhereInput | Prisma.ConversationParticipantScalarWhereInput[];
    OR?: Prisma.ConversationParticipantScalarWhereInput[];
    NOT?: Prisma.ConversationParticipantScalarWhereInput | Prisma.ConversationParticipantScalarWhereInput[];
    conversationId?: Prisma.UuidFilter<"ConversationParticipant"> | string;
    userId?: Prisma.UuidFilter<"ConversationParticipant"> | string;
    joinedAt?: Prisma.DateTimeFilter<"ConversationParticipant"> | Date | string;
    lastReadAt?: Prisma.DateTimeNullableFilter<"ConversationParticipant"> | Date | string | null;
};
export type ConversationParticipantCreateWithoutConversationInput = {
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutConversationsJoinedInput;
};
export type ConversationParticipantUncheckedCreateWithoutConversationInput = {
    userId: string;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
};
export type ConversationParticipantCreateOrConnectWithoutConversationInput = {
    where: Prisma.ConversationParticipantWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutConversationInput, Prisma.ConversationParticipantUncheckedCreateWithoutConversationInput>;
};
export type ConversationParticipantCreateManyConversationInputEnvelope = {
    data: Prisma.ConversationParticipantCreateManyConversationInput | Prisma.ConversationParticipantCreateManyConversationInput[];
    skipDuplicates?: boolean;
};
export type ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput = {
    where: Prisma.ConversationParticipantWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationParticipantUpdateWithoutConversationInput, Prisma.ConversationParticipantUncheckedUpdateWithoutConversationInput>;
    create: Prisma.XOR<Prisma.ConversationParticipantCreateWithoutConversationInput, Prisma.ConversationParticipantUncheckedCreateWithoutConversationInput>;
};
export type ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput = {
    where: Prisma.ConversationParticipantWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationParticipantUpdateWithoutConversationInput, Prisma.ConversationParticipantUncheckedUpdateWithoutConversationInput>;
};
export type ConversationParticipantUpdateManyWithWhereWithoutConversationInput = {
    where: Prisma.ConversationParticipantScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationParticipantUpdateManyMutationInput, Prisma.ConversationParticipantUncheckedUpdateManyWithoutConversationInput>;
};
export type ConversationParticipantCreateManyUserInput = {
    conversationId: string;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
};
export type ConversationParticipantUpdateWithoutUserInput = {
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    conversation?: Prisma.ConversationUpdateOneRequiredWithoutParticipantsNestedInput;
};
export type ConversationParticipantUncheckedUpdateWithoutUserInput = {
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationParticipantUncheckedUpdateManyWithoutUserInput = {
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationParticipantCreateManyConversationInput = {
    userId: string;
    joinedAt?: Date | string;
    lastReadAt?: Date | string | null;
};
export type ConversationParticipantUpdateWithoutConversationInput = {
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutConversationsJoinedNestedInput;
};
export type ConversationParticipantUncheckedUpdateWithoutConversationInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationParticipantUncheckedUpdateManyWithoutConversationInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastReadAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ConversationParticipantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    conversationId?: boolean;
    userId?: boolean;
    joinedAt?: boolean;
    lastReadAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversationParticipant"]>;
export type ConversationParticipantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    conversationId?: boolean;
    userId?: boolean;
    joinedAt?: boolean;
    lastReadAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversationParticipant"]>;
export type ConversationParticipantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    conversationId?: boolean;
    userId?: boolean;
    joinedAt?: boolean;
    lastReadAt?: boolean;
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversationParticipant"]>;
export type ConversationParticipantSelectScalar = {
    conversationId?: boolean;
    userId?: boolean;
    joinedAt?: boolean;
    lastReadAt?: boolean;
};
export type ConversationParticipantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"conversationId" | "userId" | "joinedAt" | "lastReadAt", ExtArgs["result"]["conversationParticipant"]>;
export type ConversationParticipantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ConversationParticipantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ConversationParticipantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ConversationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ConversationParticipantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ConversationParticipant";
    objects: {
        conversation: Prisma.$ConversationPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        conversationId: string;
        userId: string;
        joinedAt: Date;
        lastReadAt: Date | null;
    }, ExtArgs["result"]["conversationParticipant"]>;
    composites: {};
};
export type ConversationParticipantGetPayload<S extends boolean | null | undefined | ConversationParticipantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload, S>;
export type ConversationParticipantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConversationParticipantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConversationParticipantCountAggregateInputType | true;
};
export interface ConversationParticipantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ConversationParticipant'];
        meta: {
            name: 'ConversationParticipant';
        };
    };
    findUnique<T extends ConversationParticipantFindUniqueArgs>(args: Prisma.SelectSubset<T, ConversationParticipantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConversationParticipantClient<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConversationParticipantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConversationParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationParticipantClient<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConversationParticipantFindFirstArgs>(args?: Prisma.SelectSubset<T, ConversationParticipantFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConversationParticipantClient<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConversationParticipantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConversationParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationParticipantClient<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConversationParticipantFindManyArgs>(args?: Prisma.SelectSubset<T, ConversationParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConversationParticipantCreateArgs>(args: Prisma.SelectSubset<T, ConversationParticipantCreateArgs<ExtArgs>>): Prisma.Prisma__ConversationParticipantClient<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConversationParticipantCreateManyArgs>(args?: Prisma.SelectSubset<T, ConversationParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConversationParticipantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConversationParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConversationParticipantDeleteArgs>(args: Prisma.SelectSubset<T, ConversationParticipantDeleteArgs<ExtArgs>>): Prisma.Prisma__ConversationParticipantClient<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConversationParticipantUpdateArgs>(args: Prisma.SelectSubset<T, ConversationParticipantUpdateArgs<ExtArgs>>): Prisma.Prisma__ConversationParticipantClient<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConversationParticipantDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConversationParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConversationParticipantUpdateManyArgs>(args: Prisma.SelectSubset<T, ConversationParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConversationParticipantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConversationParticipantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConversationParticipantUpsertArgs>(args: Prisma.SelectSubset<T, ConversationParticipantUpsertArgs<ExtArgs>>): Prisma.Prisma__ConversationParticipantClient<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConversationParticipantCountArgs>(args?: Prisma.Subset<T, ConversationParticipantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConversationParticipantCountAggregateOutputType> : number>;
    aggregate<T extends ConversationParticipantAggregateArgs>(args: Prisma.Subset<T, ConversationParticipantAggregateArgs>): Prisma.PrismaPromise<GetConversationParticipantAggregateType<T>>;
    groupBy<T extends ConversationParticipantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConversationParticipantGroupByArgs['orderBy'];
    } : {
        orderBy?: ConversationParticipantGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConversationParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConversationParticipantFieldRefs;
}
export interface Prisma__ConversationParticipantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    conversation<T extends Prisma.ConversationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ConversationDefaultArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConversationParticipantFieldRefs {
    readonly conversationId: Prisma.FieldRef<"ConversationParticipant", 'String'>;
    readonly userId: Prisma.FieldRef<"ConversationParticipant", 'String'>;
    readonly joinedAt: Prisma.FieldRef<"ConversationParticipant", 'DateTime'>;
    readonly lastReadAt: Prisma.FieldRef<"ConversationParticipant", 'DateTime'>;
}
export type ConversationParticipantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelect<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    include?: Prisma.ConversationParticipantInclude<ExtArgs> | null;
    where: Prisma.ConversationParticipantWhereUniqueInput;
};
export type ConversationParticipantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelect<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    include?: Prisma.ConversationParticipantInclude<ExtArgs> | null;
    where: Prisma.ConversationParticipantWhereUniqueInput;
};
export type ConversationParticipantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelect<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    include?: Prisma.ConversationParticipantInclude<ExtArgs> | null;
    where?: Prisma.ConversationParticipantWhereInput;
    orderBy?: Prisma.ConversationParticipantOrderByWithRelationInput | Prisma.ConversationParticipantOrderByWithRelationInput[];
    cursor?: Prisma.ConversationParticipantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationParticipantScalarFieldEnum | Prisma.ConversationParticipantScalarFieldEnum[];
};
export type ConversationParticipantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelect<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    include?: Prisma.ConversationParticipantInclude<ExtArgs> | null;
    where?: Prisma.ConversationParticipantWhereInput;
    orderBy?: Prisma.ConversationParticipantOrderByWithRelationInput | Prisma.ConversationParticipantOrderByWithRelationInput[];
    cursor?: Prisma.ConversationParticipantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationParticipantScalarFieldEnum | Prisma.ConversationParticipantScalarFieldEnum[];
};
export type ConversationParticipantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelect<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    include?: Prisma.ConversationParticipantInclude<ExtArgs> | null;
    where?: Prisma.ConversationParticipantWhereInput;
    orderBy?: Prisma.ConversationParticipantOrderByWithRelationInput | Prisma.ConversationParticipantOrderByWithRelationInput[];
    cursor?: Prisma.ConversationParticipantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationParticipantScalarFieldEnum | Prisma.ConversationParticipantScalarFieldEnum[];
};
export type ConversationParticipantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelect<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    include?: Prisma.ConversationParticipantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationParticipantCreateInput, Prisma.ConversationParticipantUncheckedCreateInput>;
};
export type ConversationParticipantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConversationParticipantCreateManyInput | Prisma.ConversationParticipantCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConversationParticipantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    data: Prisma.ConversationParticipantCreateManyInput | Prisma.ConversationParticipantCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ConversationParticipantIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ConversationParticipantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelect<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    include?: Prisma.ConversationParticipantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationParticipantUpdateInput, Prisma.ConversationParticipantUncheckedUpdateInput>;
    where: Prisma.ConversationParticipantWhereUniqueInput;
};
export type ConversationParticipantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConversationParticipantUpdateManyMutationInput, Prisma.ConversationParticipantUncheckedUpdateManyInput>;
    where?: Prisma.ConversationParticipantWhereInput;
    limit?: number;
};
export type ConversationParticipantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationParticipantUpdateManyMutationInput, Prisma.ConversationParticipantUncheckedUpdateManyInput>;
    where?: Prisma.ConversationParticipantWhereInput;
    limit?: number;
    include?: Prisma.ConversationParticipantIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ConversationParticipantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelect<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    include?: Prisma.ConversationParticipantInclude<ExtArgs> | null;
    where: Prisma.ConversationParticipantWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationParticipantCreateInput, Prisma.ConversationParticipantUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConversationParticipantUpdateInput, Prisma.ConversationParticipantUncheckedUpdateInput>;
};
export type ConversationParticipantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelect<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    include?: Prisma.ConversationParticipantInclude<ExtArgs> | null;
    where: Prisma.ConversationParticipantWhereUniqueInput;
};
export type ConversationParticipantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationParticipantWhereInput;
    limit?: number;
};
export type ConversationParticipantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationParticipantSelect<ExtArgs> | null;
    omit?: Prisma.ConversationParticipantOmit<ExtArgs> | null;
    include?: Prisma.ConversationParticipantInclude<ExtArgs> | null;
};
