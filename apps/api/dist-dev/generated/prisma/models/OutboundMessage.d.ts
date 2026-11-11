import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OutboundMessageModel = runtime.Types.Result.DefaultSelection<Prisma.$OutboundMessagePayload>;
export type AggregateOutboundMessage = {
    _count: OutboundMessageCountAggregateOutputType | null;
    _min: OutboundMessageMinAggregateOutputType | null;
    _max: OutboundMessageMaxAggregateOutputType | null;
};
export type OutboundMessageMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    channel: $Enums.TextChannel | null;
    to: string | null;
    type: string | null;
    body: string | null;
    status: $Enums.OutboundMessageStatus | null;
    error: string | null;
    providerRef: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OutboundMessageMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    channel: $Enums.TextChannel | null;
    to: string | null;
    type: string | null;
    body: string | null;
    status: $Enums.OutboundMessageStatus | null;
    error: string | null;
    providerRef: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OutboundMessageCountAggregateOutputType = {
    id: number;
    userId: number;
    channel: number;
    to: number;
    type: number;
    body: number;
    status: number;
    error: number;
    providerRef: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OutboundMessageMinAggregateInputType = {
    id?: true;
    userId?: true;
    channel?: true;
    to?: true;
    type?: true;
    body?: true;
    status?: true;
    error?: true;
    providerRef?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OutboundMessageMaxAggregateInputType = {
    id?: true;
    userId?: true;
    channel?: true;
    to?: true;
    type?: true;
    body?: true;
    status?: true;
    error?: true;
    providerRef?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OutboundMessageCountAggregateInputType = {
    id?: true;
    userId?: true;
    channel?: true;
    to?: true;
    type?: true;
    body?: true;
    status?: true;
    error?: true;
    providerRef?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OutboundMessageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutboundMessageWhereInput;
    orderBy?: Prisma.OutboundMessageOrderByWithRelationInput | Prisma.OutboundMessageOrderByWithRelationInput[];
    cursor?: Prisma.OutboundMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OutboundMessageCountAggregateInputType;
    _min?: OutboundMessageMinAggregateInputType;
    _max?: OutboundMessageMaxAggregateInputType;
};
export type GetOutboundMessageAggregateType<T extends OutboundMessageAggregateArgs> = {
    [P in keyof T & keyof AggregateOutboundMessage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOutboundMessage[P]> : Prisma.GetScalarType<T[P], AggregateOutboundMessage[P]>;
};
export type OutboundMessageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutboundMessageWhereInput;
    orderBy?: Prisma.OutboundMessageOrderByWithAggregationInput | Prisma.OutboundMessageOrderByWithAggregationInput[];
    by: Prisma.OutboundMessageScalarFieldEnum[] | Prisma.OutboundMessageScalarFieldEnum;
    having?: Prisma.OutboundMessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OutboundMessageCountAggregateInputType | true;
    _min?: OutboundMessageMinAggregateInputType;
    _max?: OutboundMessageMaxAggregateInputType;
};
export type OutboundMessageGroupByOutputType = {
    id: string;
    userId: string | null;
    channel: $Enums.TextChannel;
    to: string;
    type: string;
    body: string;
    status: $Enums.OutboundMessageStatus;
    error: string | null;
    providerRef: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OutboundMessageCountAggregateOutputType | null;
    _min: OutboundMessageMinAggregateOutputType | null;
    _max: OutboundMessageMaxAggregateOutputType | null;
};
export type GetOutboundMessageGroupByPayload<T extends OutboundMessageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OutboundMessageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OutboundMessageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OutboundMessageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OutboundMessageGroupByOutputType[P]>;
}>>;
export type OutboundMessageWhereInput = {
    AND?: Prisma.OutboundMessageWhereInput | Prisma.OutboundMessageWhereInput[];
    OR?: Prisma.OutboundMessageWhereInput[];
    NOT?: Prisma.OutboundMessageWhereInput | Prisma.OutboundMessageWhereInput[];
    id?: Prisma.UuidFilter<"OutboundMessage"> | string;
    userId?: Prisma.UuidNullableFilter<"OutboundMessage"> | string | null;
    channel?: Prisma.EnumTextChannelFilter<"OutboundMessage"> | $Enums.TextChannel;
    to?: Prisma.StringFilter<"OutboundMessage"> | string;
    type?: Prisma.StringFilter<"OutboundMessage"> | string;
    body?: Prisma.StringFilter<"OutboundMessage"> | string;
    status?: Prisma.EnumOutboundMessageStatusFilter<"OutboundMessage"> | $Enums.OutboundMessageStatus;
    error?: Prisma.StringNullableFilter<"OutboundMessage"> | string | null;
    providerRef?: Prisma.StringNullableFilter<"OutboundMessage"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OutboundMessage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OutboundMessage"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type OutboundMessageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    to?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    providerRef?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type OutboundMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    providerRef?: string;
    AND?: Prisma.OutboundMessageWhereInput | Prisma.OutboundMessageWhereInput[];
    OR?: Prisma.OutboundMessageWhereInput[];
    NOT?: Prisma.OutboundMessageWhereInput | Prisma.OutboundMessageWhereInput[];
    userId?: Prisma.UuidNullableFilter<"OutboundMessage"> | string | null;
    channel?: Prisma.EnumTextChannelFilter<"OutboundMessage"> | $Enums.TextChannel;
    to?: Prisma.StringFilter<"OutboundMessage"> | string;
    type?: Prisma.StringFilter<"OutboundMessage"> | string;
    body?: Prisma.StringFilter<"OutboundMessage"> | string;
    status?: Prisma.EnumOutboundMessageStatusFilter<"OutboundMessage"> | $Enums.OutboundMessageStatus;
    error?: Prisma.StringNullableFilter<"OutboundMessage"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OutboundMessage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OutboundMessage"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "providerRef">;
export type OutboundMessageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    to?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    providerRef?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OutboundMessageCountOrderByAggregateInput;
    _max?: Prisma.OutboundMessageMaxOrderByAggregateInput;
    _min?: Prisma.OutboundMessageMinOrderByAggregateInput;
};
export type OutboundMessageScalarWhereWithAggregatesInput = {
    AND?: Prisma.OutboundMessageScalarWhereWithAggregatesInput | Prisma.OutboundMessageScalarWhereWithAggregatesInput[];
    OR?: Prisma.OutboundMessageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OutboundMessageScalarWhereWithAggregatesInput | Prisma.OutboundMessageScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"OutboundMessage"> | string;
    userId?: Prisma.UuidNullableWithAggregatesFilter<"OutboundMessage"> | string | null;
    channel?: Prisma.EnumTextChannelWithAggregatesFilter<"OutboundMessage"> | $Enums.TextChannel;
    to?: Prisma.StringWithAggregatesFilter<"OutboundMessage"> | string;
    type?: Prisma.StringWithAggregatesFilter<"OutboundMessage"> | string;
    body?: Prisma.StringWithAggregatesFilter<"OutboundMessage"> | string;
    status?: Prisma.EnumOutboundMessageStatusWithAggregatesFilter<"OutboundMessage"> | $Enums.OutboundMessageStatus;
    error?: Prisma.StringNullableWithAggregatesFilter<"OutboundMessage"> | string | null;
    providerRef?: Prisma.StringNullableWithAggregatesFilter<"OutboundMessage"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OutboundMessage"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OutboundMessage"> | Date | string;
};
export type OutboundMessageCreateInput = {
    id?: string;
    channel: $Enums.TextChannel;
    to: string;
    type: string;
    body: string;
    status?: $Enums.OutboundMessageStatus;
    error?: string | null;
    providerRef?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutOutboundMessagesInput;
};
export type OutboundMessageUncheckedCreateInput = {
    id?: string;
    userId?: string | null;
    channel: $Enums.TextChannel;
    to: string;
    type: string;
    body: string;
    status?: $Enums.OutboundMessageStatus;
    error?: string | null;
    providerRef?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OutboundMessageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumTextChannelFieldUpdateOperationsInput | $Enums.TextChannel;
    to?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOutboundMessageStatusFieldUpdateOperationsInput | $Enums.OutboundMessageStatus;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutOutboundMessagesNestedInput;
};
export type OutboundMessageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    channel?: Prisma.EnumTextChannelFieldUpdateOperationsInput | $Enums.TextChannel;
    to?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOutboundMessageStatusFieldUpdateOperationsInput | $Enums.OutboundMessageStatus;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutboundMessageCreateManyInput = {
    id?: string;
    userId?: string | null;
    channel: $Enums.TextChannel;
    to: string;
    type: string;
    body: string;
    status?: $Enums.OutboundMessageStatus;
    error?: string | null;
    providerRef?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OutboundMessageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumTextChannelFieldUpdateOperationsInput | $Enums.TextChannel;
    to?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOutboundMessageStatusFieldUpdateOperationsInput | $Enums.OutboundMessageStatus;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutboundMessageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    channel?: Prisma.EnumTextChannelFieldUpdateOperationsInput | $Enums.TextChannel;
    to?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOutboundMessageStatusFieldUpdateOperationsInput | $Enums.OutboundMessageStatus;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutboundMessageListRelationFilter = {
    every?: Prisma.OutboundMessageWhereInput;
    some?: Prisma.OutboundMessageWhereInput;
    none?: Prisma.OutboundMessageWhereInput;
};
export type OutboundMessageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OutboundMessageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    to?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OutboundMessageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    to?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OutboundMessageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    to?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    providerRef?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OutboundMessageCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OutboundMessageCreateWithoutUserInput, Prisma.OutboundMessageUncheckedCreateWithoutUserInput> | Prisma.OutboundMessageCreateWithoutUserInput[] | Prisma.OutboundMessageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OutboundMessageCreateOrConnectWithoutUserInput | Prisma.OutboundMessageCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OutboundMessageCreateManyUserInputEnvelope;
    connect?: Prisma.OutboundMessageWhereUniqueInput | Prisma.OutboundMessageWhereUniqueInput[];
};
export type OutboundMessageUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OutboundMessageCreateWithoutUserInput, Prisma.OutboundMessageUncheckedCreateWithoutUserInput> | Prisma.OutboundMessageCreateWithoutUserInput[] | Prisma.OutboundMessageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OutboundMessageCreateOrConnectWithoutUserInput | Prisma.OutboundMessageCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OutboundMessageCreateManyUserInputEnvelope;
    connect?: Prisma.OutboundMessageWhereUniqueInput | Prisma.OutboundMessageWhereUniqueInput[];
};
export type OutboundMessageUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OutboundMessageCreateWithoutUserInput, Prisma.OutboundMessageUncheckedCreateWithoutUserInput> | Prisma.OutboundMessageCreateWithoutUserInput[] | Prisma.OutboundMessageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OutboundMessageCreateOrConnectWithoutUserInput | Prisma.OutboundMessageCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OutboundMessageUpsertWithWhereUniqueWithoutUserInput | Prisma.OutboundMessageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OutboundMessageCreateManyUserInputEnvelope;
    set?: Prisma.OutboundMessageWhereUniqueInput | Prisma.OutboundMessageWhereUniqueInput[];
    disconnect?: Prisma.OutboundMessageWhereUniqueInput | Prisma.OutboundMessageWhereUniqueInput[];
    delete?: Prisma.OutboundMessageWhereUniqueInput | Prisma.OutboundMessageWhereUniqueInput[];
    connect?: Prisma.OutboundMessageWhereUniqueInput | Prisma.OutboundMessageWhereUniqueInput[];
    update?: Prisma.OutboundMessageUpdateWithWhereUniqueWithoutUserInput | Prisma.OutboundMessageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OutboundMessageUpdateManyWithWhereWithoutUserInput | Prisma.OutboundMessageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OutboundMessageScalarWhereInput | Prisma.OutboundMessageScalarWhereInput[];
};
export type OutboundMessageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OutboundMessageCreateWithoutUserInput, Prisma.OutboundMessageUncheckedCreateWithoutUserInput> | Prisma.OutboundMessageCreateWithoutUserInput[] | Prisma.OutboundMessageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OutboundMessageCreateOrConnectWithoutUserInput | Prisma.OutboundMessageCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OutboundMessageUpsertWithWhereUniqueWithoutUserInput | Prisma.OutboundMessageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OutboundMessageCreateManyUserInputEnvelope;
    set?: Prisma.OutboundMessageWhereUniqueInput | Prisma.OutboundMessageWhereUniqueInput[];
    disconnect?: Prisma.OutboundMessageWhereUniqueInput | Prisma.OutboundMessageWhereUniqueInput[];
    delete?: Prisma.OutboundMessageWhereUniqueInput | Prisma.OutboundMessageWhereUniqueInput[];
    connect?: Prisma.OutboundMessageWhereUniqueInput | Prisma.OutboundMessageWhereUniqueInput[];
    update?: Prisma.OutboundMessageUpdateWithWhereUniqueWithoutUserInput | Prisma.OutboundMessageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OutboundMessageUpdateManyWithWhereWithoutUserInput | Prisma.OutboundMessageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OutboundMessageScalarWhereInput | Prisma.OutboundMessageScalarWhereInput[];
};
export type EnumOutboundMessageStatusFieldUpdateOperationsInput = {
    set?: $Enums.OutboundMessageStatus;
};
export type OutboundMessageCreateWithoutUserInput = {
    id?: string;
    channel: $Enums.TextChannel;
    to: string;
    type: string;
    body: string;
    status?: $Enums.OutboundMessageStatus;
    error?: string | null;
    providerRef?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OutboundMessageUncheckedCreateWithoutUserInput = {
    id?: string;
    channel: $Enums.TextChannel;
    to: string;
    type: string;
    body: string;
    status?: $Enums.OutboundMessageStatus;
    error?: string | null;
    providerRef?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OutboundMessageCreateOrConnectWithoutUserInput = {
    where: Prisma.OutboundMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.OutboundMessageCreateWithoutUserInput, Prisma.OutboundMessageUncheckedCreateWithoutUserInput>;
};
export type OutboundMessageCreateManyUserInputEnvelope = {
    data: Prisma.OutboundMessageCreateManyUserInput | Prisma.OutboundMessageCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type OutboundMessageUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.OutboundMessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.OutboundMessageUpdateWithoutUserInput, Prisma.OutboundMessageUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.OutboundMessageCreateWithoutUserInput, Prisma.OutboundMessageUncheckedCreateWithoutUserInput>;
};
export type OutboundMessageUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.OutboundMessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.OutboundMessageUpdateWithoutUserInput, Prisma.OutboundMessageUncheckedUpdateWithoutUserInput>;
};
export type OutboundMessageUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.OutboundMessageScalarWhereInput;
    data: Prisma.XOR<Prisma.OutboundMessageUpdateManyMutationInput, Prisma.OutboundMessageUncheckedUpdateManyWithoutUserInput>;
};
export type OutboundMessageScalarWhereInput = {
    AND?: Prisma.OutboundMessageScalarWhereInput | Prisma.OutboundMessageScalarWhereInput[];
    OR?: Prisma.OutboundMessageScalarWhereInput[];
    NOT?: Prisma.OutboundMessageScalarWhereInput | Prisma.OutboundMessageScalarWhereInput[];
    id?: Prisma.UuidFilter<"OutboundMessage"> | string;
    userId?: Prisma.UuidNullableFilter<"OutboundMessage"> | string | null;
    channel?: Prisma.EnumTextChannelFilter<"OutboundMessage"> | $Enums.TextChannel;
    to?: Prisma.StringFilter<"OutboundMessage"> | string;
    type?: Prisma.StringFilter<"OutboundMessage"> | string;
    body?: Prisma.StringFilter<"OutboundMessage"> | string;
    status?: Prisma.EnumOutboundMessageStatusFilter<"OutboundMessage"> | $Enums.OutboundMessageStatus;
    error?: Prisma.StringNullableFilter<"OutboundMessage"> | string | null;
    providerRef?: Prisma.StringNullableFilter<"OutboundMessage"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"OutboundMessage"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OutboundMessage"> | Date | string;
};
export type OutboundMessageCreateManyUserInput = {
    id?: string;
    channel: $Enums.TextChannel;
    to: string;
    type: string;
    body: string;
    status?: $Enums.OutboundMessageStatus;
    error?: string | null;
    providerRef?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OutboundMessageUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumTextChannelFieldUpdateOperationsInput | $Enums.TextChannel;
    to?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOutboundMessageStatusFieldUpdateOperationsInput | $Enums.OutboundMessageStatus;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutboundMessageUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumTextChannelFieldUpdateOperationsInput | $Enums.TextChannel;
    to?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOutboundMessageStatusFieldUpdateOperationsInput | $Enums.OutboundMessageStatus;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutboundMessageUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumTextChannelFieldUpdateOperationsInput | $Enums.TextChannel;
    to?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOutboundMessageStatusFieldUpdateOperationsInput | $Enums.OutboundMessageStatus;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    providerRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OutboundMessageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    channel?: boolean;
    to?: boolean;
    type?: boolean;
    body?: boolean;
    status?: boolean;
    error?: boolean;
    providerRef?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.OutboundMessage$userArgs<ExtArgs>;
}, ExtArgs["result"]["outboundMessage"]>;
export type OutboundMessageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    channel?: boolean;
    to?: boolean;
    type?: boolean;
    body?: boolean;
    status?: boolean;
    error?: boolean;
    providerRef?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.OutboundMessage$userArgs<ExtArgs>;
}, ExtArgs["result"]["outboundMessage"]>;
export type OutboundMessageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    channel?: boolean;
    to?: boolean;
    type?: boolean;
    body?: boolean;
    status?: boolean;
    error?: boolean;
    providerRef?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.OutboundMessage$userArgs<ExtArgs>;
}, ExtArgs["result"]["outboundMessage"]>;
export type OutboundMessageSelectScalar = {
    id?: boolean;
    userId?: boolean;
    channel?: boolean;
    to?: boolean;
    type?: boolean;
    body?: boolean;
    status?: boolean;
    error?: boolean;
    providerRef?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OutboundMessageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "channel" | "to" | "type" | "body" | "status" | "error" | "providerRef" | "createdAt" | "updatedAt", ExtArgs["result"]["outboundMessage"]>;
export type OutboundMessageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.OutboundMessage$userArgs<ExtArgs>;
};
export type OutboundMessageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.OutboundMessage$userArgs<ExtArgs>;
};
export type OutboundMessageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.OutboundMessage$userArgs<ExtArgs>;
};
export type $OutboundMessagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OutboundMessage";
    objects: {
        user: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string | null;
        channel: $Enums.TextChannel;
        to: string;
        type: string;
        body: string;
        status: $Enums.OutboundMessageStatus;
        error: string | null;
        providerRef: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["outboundMessage"]>;
    composites: {};
};
export type OutboundMessageGetPayload<S extends boolean | null | undefined | OutboundMessageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload, S>;
export type OutboundMessageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OutboundMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OutboundMessageCountAggregateInputType | true;
};
export interface OutboundMessageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OutboundMessage'];
        meta: {
            name: 'OutboundMessage';
        };
    };
    findUnique<T extends OutboundMessageFindUniqueArgs>(args: Prisma.SelectSubset<T, OutboundMessageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OutboundMessageClient<runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OutboundMessageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OutboundMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OutboundMessageClient<runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OutboundMessageFindFirstArgs>(args?: Prisma.SelectSubset<T, OutboundMessageFindFirstArgs<ExtArgs>>): Prisma.Prisma__OutboundMessageClient<runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OutboundMessageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OutboundMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OutboundMessageClient<runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OutboundMessageFindManyArgs>(args?: Prisma.SelectSubset<T, OutboundMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OutboundMessageCreateArgs>(args: Prisma.SelectSubset<T, OutboundMessageCreateArgs<ExtArgs>>): Prisma.Prisma__OutboundMessageClient<runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OutboundMessageCreateManyArgs>(args?: Prisma.SelectSubset<T, OutboundMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OutboundMessageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OutboundMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OutboundMessageDeleteArgs>(args: Prisma.SelectSubset<T, OutboundMessageDeleteArgs<ExtArgs>>): Prisma.Prisma__OutboundMessageClient<runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OutboundMessageUpdateArgs>(args: Prisma.SelectSubset<T, OutboundMessageUpdateArgs<ExtArgs>>): Prisma.Prisma__OutboundMessageClient<runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OutboundMessageDeleteManyArgs>(args?: Prisma.SelectSubset<T, OutboundMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OutboundMessageUpdateManyArgs>(args: Prisma.SelectSubset<T, OutboundMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OutboundMessageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OutboundMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OutboundMessageUpsertArgs>(args: Prisma.SelectSubset<T, OutboundMessageUpsertArgs<ExtArgs>>): Prisma.Prisma__OutboundMessageClient<runtime.Types.Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OutboundMessageCountArgs>(args?: Prisma.Subset<T, OutboundMessageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OutboundMessageCountAggregateOutputType> : number>;
    aggregate<T extends OutboundMessageAggregateArgs>(args: Prisma.Subset<T, OutboundMessageAggregateArgs>): Prisma.PrismaPromise<GetOutboundMessageAggregateType<T>>;
    groupBy<T extends OutboundMessageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OutboundMessageGroupByArgs['orderBy'];
    } : {
        orderBy?: OutboundMessageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OutboundMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutboundMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OutboundMessageFieldRefs;
}
export interface Prisma__OutboundMessageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.OutboundMessage$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OutboundMessage$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OutboundMessageFieldRefs {
    readonly id: Prisma.FieldRef<"OutboundMessage", 'String'>;
    readonly userId: Prisma.FieldRef<"OutboundMessage", 'String'>;
    readonly channel: Prisma.FieldRef<"OutboundMessage", 'TextChannel'>;
    readonly to: Prisma.FieldRef<"OutboundMessage", 'String'>;
    readonly type: Prisma.FieldRef<"OutboundMessage", 'String'>;
    readonly body: Prisma.FieldRef<"OutboundMessage", 'String'>;
    readonly status: Prisma.FieldRef<"OutboundMessage", 'OutboundMessageStatus'>;
    readonly error: Prisma.FieldRef<"OutboundMessage", 'String'>;
    readonly providerRef: Prisma.FieldRef<"OutboundMessage", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OutboundMessage", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OutboundMessage", 'DateTime'>;
}
export type OutboundMessageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelect<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    include?: Prisma.OutboundMessageInclude<ExtArgs> | null;
    where: Prisma.OutboundMessageWhereUniqueInput;
};
export type OutboundMessageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelect<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    include?: Prisma.OutboundMessageInclude<ExtArgs> | null;
    where: Prisma.OutboundMessageWhereUniqueInput;
};
export type OutboundMessageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelect<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    include?: Prisma.OutboundMessageInclude<ExtArgs> | null;
    where?: Prisma.OutboundMessageWhereInput;
    orderBy?: Prisma.OutboundMessageOrderByWithRelationInput | Prisma.OutboundMessageOrderByWithRelationInput[];
    cursor?: Prisma.OutboundMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OutboundMessageScalarFieldEnum | Prisma.OutboundMessageScalarFieldEnum[];
};
export type OutboundMessageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelect<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    include?: Prisma.OutboundMessageInclude<ExtArgs> | null;
    where?: Prisma.OutboundMessageWhereInput;
    orderBy?: Prisma.OutboundMessageOrderByWithRelationInput | Prisma.OutboundMessageOrderByWithRelationInput[];
    cursor?: Prisma.OutboundMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OutboundMessageScalarFieldEnum | Prisma.OutboundMessageScalarFieldEnum[];
};
export type OutboundMessageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelect<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    include?: Prisma.OutboundMessageInclude<ExtArgs> | null;
    where?: Prisma.OutboundMessageWhereInput;
    orderBy?: Prisma.OutboundMessageOrderByWithRelationInput | Prisma.OutboundMessageOrderByWithRelationInput[];
    cursor?: Prisma.OutboundMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OutboundMessageScalarFieldEnum | Prisma.OutboundMessageScalarFieldEnum[];
};
export type OutboundMessageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelect<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    include?: Prisma.OutboundMessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutboundMessageCreateInput, Prisma.OutboundMessageUncheckedCreateInput>;
};
export type OutboundMessageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OutboundMessageCreateManyInput | Prisma.OutboundMessageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OutboundMessageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    data: Prisma.OutboundMessageCreateManyInput | Prisma.OutboundMessageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OutboundMessageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OutboundMessageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelect<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    include?: Prisma.OutboundMessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutboundMessageUpdateInput, Prisma.OutboundMessageUncheckedUpdateInput>;
    where: Prisma.OutboundMessageWhereUniqueInput;
};
export type OutboundMessageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OutboundMessageUpdateManyMutationInput, Prisma.OutboundMessageUncheckedUpdateManyInput>;
    where?: Prisma.OutboundMessageWhereInput;
    limit?: number;
};
export type OutboundMessageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OutboundMessageUpdateManyMutationInput, Prisma.OutboundMessageUncheckedUpdateManyInput>;
    where?: Prisma.OutboundMessageWhereInput;
    limit?: number;
    include?: Prisma.OutboundMessageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OutboundMessageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelect<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    include?: Prisma.OutboundMessageInclude<ExtArgs> | null;
    where: Prisma.OutboundMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.OutboundMessageCreateInput, Prisma.OutboundMessageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OutboundMessageUpdateInput, Prisma.OutboundMessageUncheckedUpdateInput>;
};
export type OutboundMessageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelect<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    include?: Prisma.OutboundMessageInclude<ExtArgs> | null;
    where: Prisma.OutboundMessageWhereUniqueInput;
};
export type OutboundMessageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OutboundMessageWhereInput;
    limit?: number;
};
export type OutboundMessage$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type OutboundMessageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OutboundMessageSelect<ExtArgs> | null;
    omit?: Prisma.OutboundMessageOmit<ExtArgs> | null;
    include?: Prisma.OutboundMessageInclude<ExtArgs> | null;
};
