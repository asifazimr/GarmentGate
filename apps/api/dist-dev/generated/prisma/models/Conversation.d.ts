import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ConversationModel = runtime.Types.Result.DefaultSelection<Prisma.$ConversationPayload>;
export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null;
    _min: ConversationMinAggregateOutputType | null;
    _max: ConversationMaxAggregateOutputType | null;
};
export type ConversationMinAggregateOutputType = {
    id: string | null;
    type: $Enums.ConversationType | null;
    companyId: string | null;
    subject: string | null;
    rfqId: string | null;
    orderId: string | null;
    disputeId: string | null;
    lastMessageAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConversationMaxAggregateOutputType = {
    id: string | null;
    type: $Enums.ConversationType | null;
    companyId: string | null;
    subject: string | null;
    rfqId: string | null;
    orderId: string | null;
    disputeId: string | null;
    lastMessageAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConversationCountAggregateOutputType = {
    id: number;
    type: number;
    companyId: number;
    subject: number;
    rfqId: number;
    orderId: number;
    disputeId: number;
    lastMessageAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ConversationMinAggregateInputType = {
    id?: true;
    type?: true;
    companyId?: true;
    subject?: true;
    rfqId?: true;
    orderId?: true;
    disputeId?: true;
    lastMessageAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConversationMaxAggregateInputType = {
    id?: true;
    type?: true;
    companyId?: true;
    subject?: true;
    rfqId?: true;
    orderId?: true;
    disputeId?: true;
    lastMessageAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConversationCountAggregateInputType = {
    id?: true;
    type?: true;
    companyId?: true;
    subject?: true;
    rfqId?: true;
    orderId?: true;
    disputeId?: true;
    lastMessageAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ConversationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConversationCountAggregateInputType;
    _min?: ConversationMinAggregateInputType;
    _max?: ConversationMaxAggregateInputType;
};
export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
    [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConversation[P]> : Prisma.GetScalarType<T[P], AggregateConversation[P]>;
};
export type ConversationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithAggregationInput | Prisma.ConversationOrderByWithAggregationInput[];
    by: Prisma.ConversationScalarFieldEnum[] | Prisma.ConversationScalarFieldEnum;
    having?: Prisma.ConversationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConversationCountAggregateInputType | true;
    _min?: ConversationMinAggregateInputType;
    _max?: ConversationMaxAggregateInputType;
};
export type ConversationGroupByOutputType = {
    id: string;
    type: $Enums.ConversationType;
    companyId: string;
    subject: string;
    rfqId: string | null;
    orderId: string | null;
    disputeId: string | null;
    lastMessageAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ConversationCountAggregateOutputType | null;
    _min: ConversationMinAggregateOutputType | null;
    _max: ConversationMaxAggregateOutputType | null;
};
export type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConversationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConversationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConversationGroupByOutputType[P]>;
}>>;
export type ConversationWhereInput = {
    AND?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    OR?: Prisma.ConversationWhereInput[];
    NOT?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    id?: Prisma.UuidFilter<"Conversation"> | string;
    type?: Prisma.EnumConversationTypeFilter<"Conversation"> | $Enums.ConversationType;
    companyId?: Prisma.UuidFilter<"Conversation"> | string;
    subject?: Prisma.StringFilter<"Conversation"> | string;
    rfqId?: Prisma.UuidNullableFilter<"Conversation"> | string | null;
    orderId?: Prisma.UuidNullableFilter<"Conversation"> | string | null;
    disputeId?: Prisma.UuidNullableFilter<"Conversation"> | string | null;
    lastMessageAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    rfq?: Prisma.XOR<Prisma.RfqNullableScalarRelationFilter, Prisma.RfqWhereInput> | null;
    order?: Prisma.XOR<Prisma.OrderNullableScalarRelationFilter, Prisma.OrderWhereInput> | null;
    dispute?: Prisma.XOR<Prisma.DisputeNullableScalarRelationFilter, Prisma.DisputeWhereInput> | null;
    participants?: Prisma.ConversationParticipantListRelationFilter;
    messages?: Prisma.MessageListRelationFilter;
};
export type ConversationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrderInput | Prisma.SortOrder;
    orderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    disputeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    company?: Prisma.CompanyOrderByWithRelationInput;
    rfq?: Prisma.RfqOrderByWithRelationInput;
    order?: Prisma.OrderOrderByWithRelationInput;
    dispute?: Prisma.DisputeOrderByWithRelationInput;
    participants?: Prisma.ConversationParticipantOrderByRelationAggregateInput;
    messages?: Prisma.MessageOrderByRelationAggregateInput;
};
export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    OR?: Prisma.ConversationWhereInput[];
    NOT?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    type?: Prisma.EnumConversationTypeFilter<"Conversation"> | $Enums.ConversationType;
    companyId?: Prisma.UuidFilter<"Conversation"> | string;
    subject?: Prisma.StringFilter<"Conversation"> | string;
    rfqId?: Prisma.UuidNullableFilter<"Conversation"> | string | null;
    orderId?: Prisma.UuidNullableFilter<"Conversation"> | string | null;
    disputeId?: Prisma.UuidNullableFilter<"Conversation"> | string | null;
    lastMessageAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    rfq?: Prisma.XOR<Prisma.RfqNullableScalarRelationFilter, Prisma.RfqWhereInput> | null;
    order?: Prisma.XOR<Prisma.OrderNullableScalarRelationFilter, Prisma.OrderWhereInput> | null;
    dispute?: Prisma.XOR<Prisma.DisputeNullableScalarRelationFilter, Prisma.DisputeWhereInput> | null;
    participants?: Prisma.ConversationParticipantListRelationFilter;
    messages?: Prisma.MessageListRelationFilter;
}, "id">;
export type ConversationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrderInput | Prisma.SortOrder;
    orderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    disputeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ConversationCountOrderByAggregateInput;
    _max?: Prisma.ConversationMaxOrderByAggregateInput;
    _min?: Prisma.ConversationMinOrderByAggregateInput;
};
export type ConversationScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConversationScalarWhereWithAggregatesInput | Prisma.ConversationScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConversationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConversationScalarWhereWithAggregatesInput | Prisma.ConversationScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Conversation"> | string;
    type?: Prisma.EnumConversationTypeWithAggregatesFilter<"Conversation"> | $Enums.ConversationType;
    companyId?: Prisma.UuidWithAggregatesFilter<"Conversation"> | string;
    subject?: Prisma.StringWithAggregatesFilter<"Conversation"> | string;
    rfqId?: Prisma.UuidNullableWithAggregatesFilter<"Conversation"> | string | null;
    orderId?: Prisma.UuidNullableWithAggregatesFilter<"Conversation"> | string | null;
    disputeId?: Prisma.UuidNullableWithAggregatesFilter<"Conversation"> | string | null;
    lastMessageAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Conversation"> | Date | string;
};
export type ConversationCreateInput = {
    id?: string;
    type: $Enums.ConversationType;
    subject: string;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutConversationsInput;
    rfq?: Prisma.RfqCreateNestedOneWithoutConversationsInput;
    order?: Prisma.OrderCreateNestedOneWithoutConversationsInput;
    dispute?: Prisma.DisputeCreateNestedOneWithoutThreadsInput;
    participants?: Prisma.ConversationParticipantCreateNestedManyWithoutConversationInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateInput = {
    id?: string;
    type: $Enums.ConversationType;
    companyId: string;
    subject: string;
    rfqId?: string | null;
    orderId?: string | null;
    disputeId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    participants?: Prisma.ConversationParticipantUncheckedCreateNestedManyWithoutConversationInput;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutConversationsNestedInput;
    rfq?: Prisma.RfqUpdateOneWithoutConversationsNestedInput;
    order?: Prisma.OrderUpdateOneWithoutConversationsNestedInput;
    dispute?: Prisma.DisputeUpdateOneWithoutThreadsNestedInput;
    participants?: Prisma.ConversationParticipantUpdateManyWithoutConversationNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    disputeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    participants?: Prisma.ConversationParticipantUncheckedUpdateManyWithoutConversationNestedInput;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationCreateManyInput = {
    id?: string;
    type: $Enums.ConversationType;
    companyId: string;
    subject: string;
    rfqId?: string | null;
    orderId?: string | null;
    disputeId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    disputeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationListRelationFilter = {
    every?: Prisma.ConversationWhereInput;
    some?: Prisma.ConversationWhereInput;
    none?: Prisma.ConversationWhereInput;
};
export type ConversationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ConversationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConversationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConversationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    disputeId?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConversationScalarRelationFilter = {
    is?: Prisma.ConversationWhereInput;
    isNot?: Prisma.ConversationWhereInput;
};
export type ConversationCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCompanyInput, Prisma.ConversationUncheckedCreateWithoutCompanyInput> | Prisma.ConversationCreateWithoutCompanyInput[] | Prisma.ConversationUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCompanyInput | Prisma.ConversationCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.ConversationCreateManyCompanyInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCompanyInput, Prisma.ConversationUncheckedCreateWithoutCompanyInput> | Prisma.ConversationCreateWithoutCompanyInput[] | Prisma.ConversationUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCompanyInput | Prisma.ConversationCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.ConversationCreateManyCompanyInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCompanyInput, Prisma.ConversationUncheckedCreateWithoutCompanyInput> | Prisma.ConversationCreateWithoutCompanyInput[] | Prisma.ConversationUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCompanyInput | Prisma.ConversationCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutCompanyInput | Prisma.ConversationUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.ConversationCreateManyCompanyInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutCompanyInput | Prisma.ConversationUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutCompanyInput | Prisma.ConversationUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCompanyInput, Prisma.ConversationUncheckedCreateWithoutCompanyInput> | Prisma.ConversationCreateWithoutCompanyInput[] | Prisma.ConversationUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCompanyInput | Prisma.ConversationCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutCompanyInput | Prisma.ConversationUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.ConversationCreateManyCompanyInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutCompanyInput | Prisma.ConversationUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutCompanyInput | Prisma.ConversationUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationCreateNestedManyWithoutRfqInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutRfqInput, Prisma.ConversationUncheckedCreateWithoutRfqInput> | Prisma.ConversationCreateWithoutRfqInput[] | Prisma.ConversationUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutRfqInput | Prisma.ConversationCreateOrConnectWithoutRfqInput[];
    createMany?: Prisma.ConversationCreateManyRfqInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutRfqInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutRfqInput, Prisma.ConversationUncheckedCreateWithoutRfqInput> | Prisma.ConversationCreateWithoutRfqInput[] | Prisma.ConversationUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutRfqInput | Prisma.ConversationCreateOrConnectWithoutRfqInput[];
    createMany?: Prisma.ConversationCreateManyRfqInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUpdateManyWithoutRfqNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutRfqInput, Prisma.ConversationUncheckedCreateWithoutRfqInput> | Prisma.ConversationCreateWithoutRfqInput[] | Prisma.ConversationUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutRfqInput | Prisma.ConversationCreateOrConnectWithoutRfqInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutRfqInput | Prisma.ConversationUpsertWithWhereUniqueWithoutRfqInput[];
    createMany?: Prisma.ConversationCreateManyRfqInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutRfqInput | Prisma.ConversationUpdateWithWhereUniqueWithoutRfqInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutRfqInput | Prisma.ConversationUpdateManyWithWhereWithoutRfqInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutRfqNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutRfqInput, Prisma.ConversationUncheckedCreateWithoutRfqInput> | Prisma.ConversationCreateWithoutRfqInput[] | Prisma.ConversationUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutRfqInput | Prisma.ConversationCreateOrConnectWithoutRfqInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutRfqInput | Prisma.ConversationUpsertWithWhereUniqueWithoutRfqInput[];
    createMany?: Prisma.ConversationCreateManyRfqInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutRfqInput | Prisma.ConversationUpdateWithWhereUniqueWithoutRfqInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutRfqInput | Prisma.ConversationUpdateManyWithWhereWithoutRfqInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type EnumConversationTypeFieldUpdateOperationsInput = {
    set?: $Enums.ConversationType;
};
export type ConversationCreateNestedOneWithoutParticipantsInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutParticipantsInput, Prisma.ConversationUncheckedCreateWithoutParticipantsInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutParticipantsInput;
    connect?: Prisma.ConversationWhereUniqueInput;
};
export type ConversationUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutParticipantsInput, Prisma.ConversationUncheckedCreateWithoutParticipantsInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutParticipantsInput;
    upsert?: Prisma.ConversationUpsertWithoutParticipantsInput;
    connect?: Prisma.ConversationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ConversationUpdateToOneWithWhereWithoutParticipantsInput, Prisma.ConversationUpdateWithoutParticipantsInput>, Prisma.ConversationUncheckedUpdateWithoutParticipantsInput>;
};
export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutMessagesInput;
    connect?: Prisma.ConversationWhereUniqueInput;
};
export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutMessagesInput;
    upsert?: Prisma.ConversationUpsertWithoutMessagesInput;
    connect?: Prisma.ConversationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ConversationUpdateToOneWithWhereWithoutMessagesInput, Prisma.ConversationUpdateWithoutMessagesInput>, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
};
export type ConversationCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutOrderInput, Prisma.ConversationUncheckedCreateWithoutOrderInput> | Prisma.ConversationCreateWithoutOrderInput[] | Prisma.ConversationUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutOrderInput | Prisma.ConversationCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.ConversationCreateManyOrderInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutOrderInput, Prisma.ConversationUncheckedCreateWithoutOrderInput> | Prisma.ConversationCreateWithoutOrderInput[] | Prisma.ConversationUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutOrderInput | Prisma.ConversationCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.ConversationCreateManyOrderInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutOrderInput, Prisma.ConversationUncheckedCreateWithoutOrderInput> | Prisma.ConversationCreateWithoutOrderInput[] | Prisma.ConversationUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutOrderInput | Prisma.ConversationCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutOrderInput | Prisma.ConversationUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.ConversationCreateManyOrderInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutOrderInput | Prisma.ConversationUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutOrderInput | Prisma.ConversationUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutOrderInput, Prisma.ConversationUncheckedCreateWithoutOrderInput> | Prisma.ConversationCreateWithoutOrderInput[] | Prisma.ConversationUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutOrderInput | Prisma.ConversationCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutOrderInput | Prisma.ConversationUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.ConversationCreateManyOrderInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutOrderInput | Prisma.ConversationUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutOrderInput | Prisma.ConversationUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationCreateNestedManyWithoutDisputeInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutDisputeInput, Prisma.ConversationUncheckedCreateWithoutDisputeInput> | Prisma.ConversationCreateWithoutDisputeInput[] | Prisma.ConversationUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutDisputeInput | Prisma.ConversationCreateOrConnectWithoutDisputeInput[];
    createMany?: Prisma.ConversationCreateManyDisputeInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutDisputeInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutDisputeInput, Prisma.ConversationUncheckedCreateWithoutDisputeInput> | Prisma.ConversationCreateWithoutDisputeInput[] | Prisma.ConversationUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutDisputeInput | Prisma.ConversationCreateOrConnectWithoutDisputeInput[];
    createMany?: Prisma.ConversationCreateManyDisputeInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUpdateManyWithoutDisputeNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutDisputeInput, Prisma.ConversationUncheckedCreateWithoutDisputeInput> | Prisma.ConversationCreateWithoutDisputeInput[] | Prisma.ConversationUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutDisputeInput | Prisma.ConversationCreateOrConnectWithoutDisputeInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutDisputeInput | Prisma.ConversationUpsertWithWhereUniqueWithoutDisputeInput[];
    createMany?: Prisma.ConversationCreateManyDisputeInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutDisputeInput | Prisma.ConversationUpdateWithWhereUniqueWithoutDisputeInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutDisputeInput | Prisma.ConversationUpdateManyWithWhereWithoutDisputeInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutDisputeNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutDisputeInput, Prisma.ConversationUncheckedCreateWithoutDisputeInput> | Prisma.ConversationCreateWithoutDisputeInput[] | Prisma.ConversationUncheckedCreateWithoutDisputeInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutDisputeInput | Prisma.ConversationCreateOrConnectWithoutDisputeInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutDisputeInput | Prisma.ConversationUpsertWithWhereUniqueWithoutDisputeInput[];
    createMany?: Prisma.ConversationCreateManyDisputeInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutDisputeInput | Prisma.ConversationUpdateWithWhereUniqueWithoutDisputeInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutDisputeInput | Prisma.ConversationUpdateManyWithWhereWithoutDisputeInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationCreateWithoutCompanyInput = {
    id?: string;
    type: $Enums.ConversationType;
    subject: string;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    rfq?: Prisma.RfqCreateNestedOneWithoutConversationsInput;
    order?: Prisma.OrderCreateNestedOneWithoutConversationsInput;
    dispute?: Prisma.DisputeCreateNestedOneWithoutThreadsInput;
    participants?: Prisma.ConversationParticipantCreateNestedManyWithoutConversationInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutCompanyInput = {
    id?: string;
    type: $Enums.ConversationType;
    subject: string;
    rfqId?: string | null;
    orderId?: string | null;
    disputeId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    participants?: Prisma.ConversationParticipantUncheckedCreateNestedManyWithoutConversationInput;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutCompanyInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutCompanyInput, Prisma.ConversationUncheckedCreateWithoutCompanyInput>;
};
export type ConversationCreateManyCompanyInputEnvelope = {
    data: Prisma.ConversationCreateManyCompanyInput | Prisma.ConversationCreateManyCompanyInput[];
    skipDuplicates?: boolean;
};
export type ConversationUpsertWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutCompanyInput, Prisma.ConversationUncheckedUpdateWithoutCompanyInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutCompanyInput, Prisma.ConversationUncheckedCreateWithoutCompanyInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutCompanyInput, Prisma.ConversationUncheckedUpdateWithoutCompanyInput>;
};
export type ConversationUpdateManyWithWhereWithoutCompanyInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutCompanyInput>;
};
export type ConversationScalarWhereInput = {
    AND?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
    OR?: Prisma.ConversationScalarWhereInput[];
    NOT?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
    id?: Prisma.UuidFilter<"Conversation"> | string;
    type?: Prisma.EnumConversationTypeFilter<"Conversation"> | $Enums.ConversationType;
    companyId?: Prisma.UuidFilter<"Conversation"> | string;
    subject?: Prisma.StringFilter<"Conversation"> | string;
    rfqId?: Prisma.UuidNullableFilter<"Conversation"> | string | null;
    orderId?: Prisma.UuidNullableFilter<"Conversation"> | string | null;
    disputeId?: Prisma.UuidNullableFilter<"Conversation"> | string | null;
    lastMessageAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
};
export type ConversationCreateWithoutRfqInput = {
    id?: string;
    type: $Enums.ConversationType;
    subject: string;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutConversationsInput;
    order?: Prisma.OrderCreateNestedOneWithoutConversationsInput;
    dispute?: Prisma.DisputeCreateNestedOneWithoutThreadsInput;
    participants?: Prisma.ConversationParticipantCreateNestedManyWithoutConversationInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutRfqInput = {
    id?: string;
    type: $Enums.ConversationType;
    companyId: string;
    subject: string;
    orderId?: string | null;
    disputeId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    participants?: Prisma.ConversationParticipantUncheckedCreateNestedManyWithoutConversationInput;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutRfqInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutRfqInput, Prisma.ConversationUncheckedCreateWithoutRfqInput>;
};
export type ConversationCreateManyRfqInputEnvelope = {
    data: Prisma.ConversationCreateManyRfqInput | Prisma.ConversationCreateManyRfqInput[];
    skipDuplicates?: boolean;
};
export type ConversationUpsertWithWhereUniqueWithoutRfqInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutRfqInput, Prisma.ConversationUncheckedUpdateWithoutRfqInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutRfqInput, Prisma.ConversationUncheckedCreateWithoutRfqInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutRfqInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutRfqInput, Prisma.ConversationUncheckedUpdateWithoutRfqInput>;
};
export type ConversationUpdateManyWithWhereWithoutRfqInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutRfqInput>;
};
export type ConversationCreateWithoutParticipantsInput = {
    id?: string;
    type: $Enums.ConversationType;
    subject: string;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutConversationsInput;
    rfq?: Prisma.RfqCreateNestedOneWithoutConversationsInput;
    order?: Prisma.OrderCreateNestedOneWithoutConversationsInput;
    dispute?: Prisma.DisputeCreateNestedOneWithoutThreadsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutParticipantsInput = {
    id?: string;
    type: $Enums.ConversationType;
    companyId: string;
    subject: string;
    rfqId?: string | null;
    orderId?: string | null;
    disputeId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutParticipantsInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutParticipantsInput, Prisma.ConversationUncheckedCreateWithoutParticipantsInput>;
};
export type ConversationUpsertWithoutParticipantsInput = {
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutParticipantsInput, Prisma.ConversationUncheckedUpdateWithoutParticipantsInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutParticipantsInput, Prisma.ConversationUncheckedCreateWithoutParticipantsInput>;
    where?: Prisma.ConversationWhereInput;
};
export type ConversationUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: Prisma.ConversationWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutParticipantsInput, Prisma.ConversationUncheckedUpdateWithoutParticipantsInput>;
};
export type ConversationUpdateWithoutParticipantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutConversationsNestedInput;
    rfq?: Prisma.RfqUpdateOneWithoutConversationsNestedInput;
    order?: Prisma.OrderUpdateOneWithoutConversationsNestedInput;
    dispute?: Prisma.DisputeUpdateOneWithoutThreadsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutParticipantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    disputeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationCreateWithoutMessagesInput = {
    id?: string;
    type: $Enums.ConversationType;
    subject: string;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutConversationsInput;
    rfq?: Prisma.RfqCreateNestedOneWithoutConversationsInput;
    order?: Prisma.OrderCreateNestedOneWithoutConversationsInput;
    dispute?: Prisma.DisputeCreateNestedOneWithoutThreadsInput;
    participants?: Prisma.ConversationParticipantCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string;
    type: $Enums.ConversationType;
    companyId: string;
    subject: string;
    rfqId?: string | null;
    orderId?: string | null;
    disputeId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    participants?: Prisma.ConversationParticipantUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
};
export type ConversationUpsertWithoutMessagesInput = {
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutMessagesInput, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    where?: Prisma.ConversationWhereInput;
};
export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: Prisma.ConversationWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutMessagesInput, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
};
export type ConversationUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutConversationsNestedInput;
    rfq?: Prisma.RfqUpdateOneWithoutConversationsNestedInput;
    order?: Prisma.OrderUpdateOneWithoutConversationsNestedInput;
    dispute?: Prisma.DisputeUpdateOneWithoutThreadsNestedInput;
    participants?: Prisma.ConversationParticipantUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    disputeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    participants?: Prisma.ConversationParticipantUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationCreateWithoutOrderInput = {
    id?: string;
    type: $Enums.ConversationType;
    subject: string;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutConversationsInput;
    rfq?: Prisma.RfqCreateNestedOneWithoutConversationsInput;
    dispute?: Prisma.DisputeCreateNestedOneWithoutThreadsInput;
    participants?: Prisma.ConversationParticipantCreateNestedManyWithoutConversationInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutOrderInput = {
    id?: string;
    type: $Enums.ConversationType;
    companyId: string;
    subject: string;
    rfqId?: string | null;
    disputeId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    participants?: Prisma.ConversationParticipantUncheckedCreateNestedManyWithoutConversationInput;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutOrderInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutOrderInput, Prisma.ConversationUncheckedCreateWithoutOrderInput>;
};
export type ConversationCreateManyOrderInputEnvelope = {
    data: Prisma.ConversationCreateManyOrderInput | Prisma.ConversationCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type ConversationUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutOrderInput, Prisma.ConversationUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutOrderInput, Prisma.ConversationUncheckedCreateWithoutOrderInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutOrderInput, Prisma.ConversationUncheckedUpdateWithoutOrderInput>;
};
export type ConversationUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutOrderInput>;
};
export type ConversationCreateWithoutDisputeInput = {
    id?: string;
    type: $Enums.ConversationType;
    subject: string;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutConversationsInput;
    rfq?: Prisma.RfqCreateNestedOneWithoutConversationsInput;
    order?: Prisma.OrderCreateNestedOneWithoutConversationsInput;
    participants?: Prisma.ConversationParticipantCreateNestedManyWithoutConversationInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutDisputeInput = {
    id?: string;
    type: $Enums.ConversationType;
    companyId: string;
    subject: string;
    rfqId?: string | null;
    orderId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    participants?: Prisma.ConversationParticipantUncheckedCreateNestedManyWithoutConversationInput;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutDisputeInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutDisputeInput, Prisma.ConversationUncheckedCreateWithoutDisputeInput>;
};
export type ConversationCreateManyDisputeInputEnvelope = {
    data: Prisma.ConversationCreateManyDisputeInput | Prisma.ConversationCreateManyDisputeInput[];
    skipDuplicates?: boolean;
};
export type ConversationUpsertWithWhereUniqueWithoutDisputeInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutDisputeInput, Prisma.ConversationUncheckedUpdateWithoutDisputeInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutDisputeInput, Prisma.ConversationUncheckedCreateWithoutDisputeInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutDisputeInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutDisputeInput, Prisma.ConversationUncheckedUpdateWithoutDisputeInput>;
};
export type ConversationUpdateManyWithWhereWithoutDisputeInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutDisputeInput>;
};
export type ConversationCreateManyCompanyInput = {
    id?: string;
    type: $Enums.ConversationType;
    subject: string;
    rfqId?: string | null;
    orderId?: string | null;
    disputeId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rfq?: Prisma.RfqUpdateOneWithoutConversationsNestedInput;
    order?: Prisma.OrderUpdateOneWithoutConversationsNestedInput;
    dispute?: Prisma.DisputeUpdateOneWithoutThreadsNestedInput;
    participants?: Prisma.ConversationParticipantUpdateManyWithoutConversationNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    disputeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    participants?: Prisma.ConversationParticipantUncheckedUpdateManyWithoutConversationNestedInput;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    disputeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCreateManyRfqInput = {
    id?: string;
    type: $Enums.ConversationType;
    companyId: string;
    subject: string;
    orderId?: string | null;
    disputeId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutConversationsNestedInput;
    order?: Prisma.OrderUpdateOneWithoutConversationsNestedInput;
    dispute?: Prisma.DisputeUpdateOneWithoutThreadsNestedInput;
    participants?: Prisma.ConversationParticipantUpdateManyWithoutConversationNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    disputeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    participants?: Prisma.ConversationParticipantUncheckedUpdateManyWithoutConversationNestedInput;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    disputeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCreateManyOrderInput = {
    id?: string;
    type: $Enums.ConversationType;
    companyId: string;
    subject: string;
    rfqId?: string | null;
    disputeId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutConversationsNestedInput;
    rfq?: Prisma.RfqUpdateOneWithoutConversationsNestedInput;
    dispute?: Prisma.DisputeUpdateOneWithoutThreadsNestedInput;
    participants?: Prisma.ConversationParticipantUpdateManyWithoutConversationNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    disputeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    participants?: Prisma.ConversationParticipantUncheckedUpdateManyWithoutConversationNestedInput;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    disputeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCreateManyDisputeInput = {
    id?: string;
    type: $Enums.ConversationType;
    companyId: string;
    subject: string;
    rfqId?: string | null;
    orderId?: string | null;
    lastMessageAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateWithoutDisputeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutConversationsNestedInput;
    rfq?: Prisma.RfqUpdateOneWithoutConversationsNestedInput;
    order?: Prisma.OrderUpdateOneWithoutConversationsNestedInput;
    participants?: Prisma.ConversationParticipantUpdateManyWithoutConversationNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutDisputeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    participants?: Prisma.ConversationParticipantUncheckedUpdateManyWithoutConversationNestedInput;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutDisputeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumConversationTypeFieldUpdateOperationsInput | $Enums.ConversationType;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastMessageAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCountOutputType = {
    participants: number;
    messages: number;
};
export type ConversationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    participants?: boolean | ConversationCountOutputTypeCountParticipantsArgs;
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs;
};
export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationCountOutputTypeSelect<ExtArgs> | null;
};
export type ConversationCountOutputTypeCountParticipantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationParticipantWhereInput;
};
export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
};
export type ConversationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    companyId?: boolean;
    subject?: boolean;
    rfqId?: boolean;
    orderId?: boolean;
    disputeId?: boolean;
    lastMessageAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.Conversation$rfqArgs<ExtArgs>;
    order?: boolean | Prisma.Conversation$orderArgs<ExtArgs>;
    dispute?: boolean | Prisma.Conversation$disputeArgs<ExtArgs>;
    participants?: boolean | Prisma.Conversation$participantsArgs<ExtArgs>;
    messages?: boolean | Prisma.Conversation$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ConversationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    companyId?: boolean;
    subject?: boolean;
    rfqId?: boolean;
    orderId?: boolean;
    disputeId?: boolean;
    lastMessageAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.Conversation$rfqArgs<ExtArgs>;
    order?: boolean | Prisma.Conversation$orderArgs<ExtArgs>;
    dispute?: boolean | Prisma.Conversation$disputeArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    companyId?: boolean;
    subject?: boolean;
    rfqId?: boolean;
    orderId?: boolean;
    disputeId?: boolean;
    lastMessageAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.Conversation$rfqArgs<ExtArgs>;
    order?: boolean | Prisma.Conversation$orderArgs<ExtArgs>;
    dispute?: boolean | Prisma.Conversation$disputeArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectScalar = {
    id?: boolean;
    type?: boolean;
    companyId?: boolean;
    subject?: boolean;
    rfqId?: boolean;
    orderId?: boolean;
    disputeId?: boolean;
    lastMessageAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ConversationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "companyId" | "subject" | "rfqId" | "orderId" | "disputeId" | "lastMessageAt" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>;
export type ConversationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.Conversation$rfqArgs<ExtArgs>;
    order?: boolean | Prisma.Conversation$orderArgs<ExtArgs>;
    dispute?: boolean | Prisma.Conversation$disputeArgs<ExtArgs>;
    participants?: boolean | Prisma.Conversation$participantsArgs<ExtArgs>;
    messages?: boolean | Prisma.Conversation$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ConversationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ConversationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.Conversation$rfqArgs<ExtArgs>;
    order?: boolean | Prisma.Conversation$orderArgs<ExtArgs>;
    dispute?: boolean | Prisma.Conversation$disputeArgs<ExtArgs>;
};
export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.Conversation$rfqArgs<ExtArgs>;
    order?: boolean | Prisma.Conversation$orderArgs<ExtArgs>;
    dispute?: boolean | Prisma.Conversation$disputeArgs<ExtArgs>;
};
export type $ConversationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Conversation";
    objects: {
        company: Prisma.$CompanyPayload<ExtArgs>;
        rfq: Prisma.$RfqPayload<ExtArgs> | null;
        order: Prisma.$OrderPayload<ExtArgs> | null;
        dispute: Prisma.$DisputePayload<ExtArgs> | null;
        participants: Prisma.$ConversationParticipantPayload<ExtArgs>[];
        messages: Prisma.$MessagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: $Enums.ConversationType;
        companyId: string;
        subject: string;
        rfqId: string | null;
        orderId: string | null;
        disputeId: string | null;
        lastMessageAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["conversation"]>;
    composites: {};
};
export type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConversationPayload, S>;
export type ConversationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConversationCountAggregateInputType | true;
};
export interface ConversationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Conversation'];
        meta: {
            name: 'Conversation';
        };
    };
    findUnique<T extends ConversationFindUniqueArgs>(args: Prisma.SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConversationFindFirstArgs>(args?: Prisma.SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConversationFindManyArgs>(args?: Prisma.SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConversationCreateArgs>(args: Prisma.SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConversationCreateManyArgs>(args?: Prisma.SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConversationDeleteArgs>(args: Prisma.SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConversationUpdateArgs>(args: Prisma.SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConversationDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConversationUpdateManyArgs>(args: Prisma.SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConversationUpsertArgs>(args: Prisma.SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConversationCountArgs>(args?: Prisma.Subset<T, ConversationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConversationCountAggregateOutputType> : number>;
    aggregate<T extends ConversationAggregateArgs>(args: Prisma.Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>;
    groupBy<T extends ConversationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConversationGroupByArgs['orderBy'];
    } : {
        orderBy?: ConversationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConversationFieldRefs;
}
export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    company<T extends Prisma.CompanyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CompanyDefaultArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    rfq<T extends Prisma.Conversation$rfqArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Conversation$rfqArgs<ExtArgs>>): Prisma.Prisma__RfqClient<runtime.Types.Result.GetResult<Prisma.$RfqPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    order<T extends Prisma.Conversation$orderArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Conversation$orderArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    dispute<T extends Prisma.Conversation$disputeArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Conversation$disputeArgs<ExtArgs>>): Prisma.Prisma__DisputeClient<runtime.Types.Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    participants<T extends Prisma.Conversation$participantsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Conversation$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    messages<T extends Prisma.Conversation$messagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConversationFieldRefs {
    readonly id: Prisma.FieldRef<"Conversation", 'String'>;
    readonly type: Prisma.FieldRef<"Conversation", 'ConversationType'>;
    readonly companyId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly subject: Prisma.FieldRef<"Conversation", 'String'>;
    readonly rfqId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly orderId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly disputeId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly lastMessageAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
}
export type ConversationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
export type ConversationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
export type ConversationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
export type ConversationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationCreateInput, Prisma.ConversationUncheckedCreateInput>;
};
export type ConversationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConversationCreateManyInput | Prisma.ConversationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConversationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    data: Prisma.ConversationCreateManyInput | Prisma.ConversationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ConversationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ConversationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationUpdateInput, Prisma.ConversationUncheckedUpdateInput>;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyInput>;
    where?: Prisma.ConversationWhereInput;
    limit?: number;
};
export type ConversationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyInput>;
    where?: Prisma.ConversationWhereInput;
    limit?: number;
    include?: Prisma.ConversationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ConversationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateInput, Prisma.ConversationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConversationUpdateInput, Prisma.ConversationUncheckedUpdateInput>;
};
export type ConversationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    limit?: number;
};
export type Conversation$rfqArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqSelect<ExtArgs> | null;
    omit?: Prisma.RfqOmit<ExtArgs> | null;
    include?: Prisma.RfqInclude<ExtArgs> | null;
    where?: Prisma.RfqWhereInput;
};
export type Conversation$orderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderSelect<ExtArgs> | null;
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
};
export type Conversation$disputeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DisputeSelect<ExtArgs> | null;
    omit?: Prisma.DisputeOmit<ExtArgs> | null;
    include?: Prisma.DisputeInclude<ExtArgs> | null;
    where?: Prisma.DisputeWhereInput;
};
export type Conversation$participantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Conversation$messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ConversationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
};
