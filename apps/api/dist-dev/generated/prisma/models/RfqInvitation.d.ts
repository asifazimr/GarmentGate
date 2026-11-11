import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RfqInvitationModel = runtime.Types.Result.DefaultSelection<Prisma.$RfqInvitationPayload>;
export type AggregateRfqInvitation = {
    _count: RfqInvitationCountAggregateOutputType | null;
    _min: RfqInvitationMinAggregateOutputType | null;
    _max: RfqInvitationMaxAggregateOutputType | null;
};
export type RfqInvitationMinAggregateOutputType = {
    id: string | null;
    rfqId: string | null;
    manufacturerProfileId: string | null;
    status: $Enums.RfqInvitationStatus | null;
    invitedAt: Date | null;
    visibleAt: Date | null;
    notifiedAt: Date | null;
    respondedAt: Date | null;
    declineReason: string | null;
};
export type RfqInvitationMaxAggregateOutputType = {
    id: string | null;
    rfqId: string | null;
    manufacturerProfileId: string | null;
    status: $Enums.RfqInvitationStatus | null;
    invitedAt: Date | null;
    visibleAt: Date | null;
    notifiedAt: Date | null;
    respondedAt: Date | null;
    declineReason: string | null;
};
export type RfqInvitationCountAggregateOutputType = {
    id: number;
    rfqId: number;
    manufacturerProfileId: number;
    status: number;
    invitedAt: number;
    visibleAt: number;
    notifiedAt: number;
    respondedAt: number;
    declineReason: number;
    _all: number;
};
export type RfqInvitationMinAggregateInputType = {
    id?: true;
    rfqId?: true;
    manufacturerProfileId?: true;
    status?: true;
    invitedAt?: true;
    visibleAt?: true;
    notifiedAt?: true;
    respondedAt?: true;
    declineReason?: true;
};
export type RfqInvitationMaxAggregateInputType = {
    id?: true;
    rfqId?: true;
    manufacturerProfileId?: true;
    status?: true;
    invitedAt?: true;
    visibleAt?: true;
    notifiedAt?: true;
    respondedAt?: true;
    declineReason?: true;
};
export type RfqInvitationCountAggregateInputType = {
    id?: true;
    rfqId?: true;
    manufacturerProfileId?: true;
    status?: true;
    invitedAt?: true;
    visibleAt?: true;
    notifiedAt?: true;
    respondedAt?: true;
    declineReason?: true;
    _all?: true;
};
export type RfqInvitationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqInvitationWhereInput;
    orderBy?: Prisma.RfqInvitationOrderByWithRelationInput | Prisma.RfqInvitationOrderByWithRelationInput[];
    cursor?: Prisma.RfqInvitationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RfqInvitationCountAggregateInputType;
    _min?: RfqInvitationMinAggregateInputType;
    _max?: RfqInvitationMaxAggregateInputType;
};
export type GetRfqInvitationAggregateType<T extends RfqInvitationAggregateArgs> = {
    [P in keyof T & keyof AggregateRfqInvitation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRfqInvitation[P]> : Prisma.GetScalarType<T[P], AggregateRfqInvitation[P]>;
};
export type RfqInvitationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqInvitationWhereInput;
    orderBy?: Prisma.RfqInvitationOrderByWithAggregationInput | Prisma.RfqInvitationOrderByWithAggregationInput[];
    by: Prisma.RfqInvitationScalarFieldEnum[] | Prisma.RfqInvitationScalarFieldEnum;
    having?: Prisma.RfqInvitationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RfqInvitationCountAggregateInputType | true;
    _min?: RfqInvitationMinAggregateInputType;
    _max?: RfqInvitationMaxAggregateInputType;
};
export type RfqInvitationGroupByOutputType = {
    id: string;
    rfqId: string;
    manufacturerProfileId: string;
    status: $Enums.RfqInvitationStatus;
    invitedAt: Date;
    visibleAt: Date;
    notifiedAt: Date | null;
    respondedAt: Date | null;
    declineReason: string | null;
    _count: RfqInvitationCountAggregateOutputType | null;
    _min: RfqInvitationMinAggregateOutputType | null;
    _max: RfqInvitationMaxAggregateOutputType | null;
};
export type GetRfqInvitationGroupByPayload<T extends RfqInvitationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RfqInvitationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RfqInvitationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RfqInvitationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RfqInvitationGroupByOutputType[P]>;
}>>;
export type RfqInvitationWhereInput = {
    AND?: Prisma.RfqInvitationWhereInput | Prisma.RfqInvitationWhereInput[];
    OR?: Prisma.RfqInvitationWhereInput[];
    NOT?: Prisma.RfqInvitationWhereInput | Prisma.RfqInvitationWhereInput[];
    id?: Prisma.UuidFilter<"RfqInvitation"> | string;
    rfqId?: Prisma.UuidFilter<"RfqInvitation"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"RfqInvitation"> | string;
    status?: Prisma.EnumRfqInvitationStatusFilter<"RfqInvitation"> | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFilter<"RfqInvitation"> | Date | string;
    visibleAt?: Prisma.DateTimeFilter<"RfqInvitation"> | Date | string;
    notifiedAt?: Prisma.DateTimeNullableFilter<"RfqInvitation"> | Date | string | null;
    respondedAt?: Prisma.DateTimeNullableFilter<"RfqInvitation"> | Date | string | null;
    declineReason?: Prisma.StringNullableFilter<"RfqInvitation"> | string | null;
    rfq?: Prisma.XOR<Prisma.RfqScalarRelationFilter, Prisma.RfqWhereInput>;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
};
export type RfqInvitationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    invitedAt?: Prisma.SortOrder;
    visibleAt?: Prisma.SortOrder;
    notifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    respondedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    declineReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    rfq?: Prisma.RfqOrderByWithRelationInput;
    manufacturerProfile?: Prisma.ManufacturerProfileOrderByWithRelationInput;
};
export type RfqInvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    rfqId_manufacturerProfileId?: Prisma.RfqInvitationRfqIdManufacturerProfileIdCompoundUniqueInput;
    AND?: Prisma.RfqInvitationWhereInput | Prisma.RfqInvitationWhereInput[];
    OR?: Prisma.RfqInvitationWhereInput[];
    NOT?: Prisma.RfqInvitationWhereInput | Prisma.RfqInvitationWhereInput[];
    rfqId?: Prisma.UuidFilter<"RfqInvitation"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"RfqInvitation"> | string;
    status?: Prisma.EnumRfqInvitationStatusFilter<"RfqInvitation"> | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFilter<"RfqInvitation"> | Date | string;
    visibleAt?: Prisma.DateTimeFilter<"RfqInvitation"> | Date | string;
    notifiedAt?: Prisma.DateTimeNullableFilter<"RfqInvitation"> | Date | string | null;
    respondedAt?: Prisma.DateTimeNullableFilter<"RfqInvitation"> | Date | string | null;
    declineReason?: Prisma.StringNullableFilter<"RfqInvitation"> | string | null;
    rfq?: Prisma.XOR<Prisma.RfqScalarRelationFilter, Prisma.RfqWhereInput>;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
}, "id" | "rfqId_manufacturerProfileId">;
export type RfqInvitationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    invitedAt?: Prisma.SortOrder;
    visibleAt?: Prisma.SortOrder;
    notifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    respondedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    declineReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.RfqInvitationCountOrderByAggregateInput;
    _max?: Prisma.RfqInvitationMaxOrderByAggregateInput;
    _min?: Prisma.RfqInvitationMinOrderByAggregateInput;
};
export type RfqInvitationScalarWhereWithAggregatesInput = {
    AND?: Prisma.RfqInvitationScalarWhereWithAggregatesInput | Prisma.RfqInvitationScalarWhereWithAggregatesInput[];
    OR?: Prisma.RfqInvitationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RfqInvitationScalarWhereWithAggregatesInput | Prisma.RfqInvitationScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"RfqInvitation"> | string;
    rfqId?: Prisma.UuidWithAggregatesFilter<"RfqInvitation"> | string;
    manufacturerProfileId?: Prisma.UuidWithAggregatesFilter<"RfqInvitation"> | string;
    status?: Prisma.EnumRfqInvitationStatusWithAggregatesFilter<"RfqInvitation"> | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeWithAggregatesFilter<"RfqInvitation"> | Date | string;
    visibleAt?: Prisma.DateTimeWithAggregatesFilter<"RfqInvitation"> | Date | string;
    notifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RfqInvitation"> | Date | string | null;
    respondedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RfqInvitation"> | Date | string | null;
    declineReason?: Prisma.StringNullableWithAggregatesFilter<"RfqInvitation"> | string | null;
};
export type RfqInvitationCreateInput = {
    id?: string;
    status?: $Enums.RfqInvitationStatus;
    invitedAt?: Date | string;
    visibleAt?: Date | string;
    notifiedAt?: Date | string | null;
    respondedAt?: Date | string | null;
    declineReason?: string | null;
    rfq: Prisma.RfqCreateNestedOneWithoutInvitationsInput;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutRfqInvitationsInput;
};
export type RfqInvitationUncheckedCreateInput = {
    id?: string;
    rfqId: string;
    manufacturerProfileId: string;
    status?: $Enums.RfqInvitationStatus;
    invitedAt?: Date | string;
    visibleAt?: Date | string;
    notifiedAt?: Date | string | null;
    respondedAt?: Date | string | null;
    declineReason?: string | null;
};
export type RfqInvitationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRfqInvitationStatusFieldUpdateOperationsInput | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    visibleAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    declineReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rfq?: Prisma.RfqUpdateOneRequiredWithoutInvitationsNestedInput;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutRfqInvitationsNestedInput;
};
export type RfqInvitationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRfqInvitationStatusFieldUpdateOperationsInput | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    visibleAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    declineReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type RfqInvitationCreateManyInput = {
    id?: string;
    rfqId: string;
    manufacturerProfileId: string;
    status?: $Enums.RfqInvitationStatus;
    invitedAt?: Date | string;
    visibleAt?: Date | string;
    notifiedAt?: Date | string | null;
    respondedAt?: Date | string | null;
    declineReason?: string | null;
};
export type RfqInvitationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRfqInvitationStatusFieldUpdateOperationsInput | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    visibleAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    declineReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type RfqInvitationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRfqInvitationStatusFieldUpdateOperationsInput | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    visibleAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    declineReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type RfqInvitationListRelationFilter = {
    every?: Prisma.RfqInvitationWhereInput;
    some?: Prisma.RfqInvitationWhereInput;
    none?: Prisma.RfqInvitationWhereInput;
};
export type RfqInvitationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RfqInvitationRfqIdManufacturerProfileIdCompoundUniqueInput = {
    rfqId: string;
    manufacturerProfileId: string;
};
export type RfqInvitationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    invitedAt?: Prisma.SortOrder;
    visibleAt?: Prisma.SortOrder;
    notifiedAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    declineReason?: Prisma.SortOrder;
};
export type RfqInvitationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    invitedAt?: Prisma.SortOrder;
    visibleAt?: Prisma.SortOrder;
    notifiedAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    declineReason?: Prisma.SortOrder;
};
export type RfqInvitationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    invitedAt?: Prisma.SortOrder;
    visibleAt?: Prisma.SortOrder;
    notifiedAt?: Prisma.SortOrder;
    respondedAt?: Prisma.SortOrder;
    declineReason?: Prisma.SortOrder;
};
export type RfqInvitationCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.RfqInvitationCreateWithoutManufacturerProfileInput, Prisma.RfqInvitationUncheckedCreateWithoutManufacturerProfileInput> | Prisma.RfqInvitationCreateWithoutManufacturerProfileInput[] | Prisma.RfqInvitationUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.RfqInvitationCreateOrConnectWithoutManufacturerProfileInput | Prisma.RfqInvitationCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.RfqInvitationCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
};
export type RfqInvitationUncheckedCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.RfqInvitationCreateWithoutManufacturerProfileInput, Prisma.RfqInvitationUncheckedCreateWithoutManufacturerProfileInput> | Prisma.RfqInvitationCreateWithoutManufacturerProfileInput[] | Prisma.RfqInvitationUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.RfqInvitationCreateOrConnectWithoutManufacturerProfileInput | Prisma.RfqInvitationCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.RfqInvitationCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
};
export type RfqInvitationUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.RfqInvitationCreateWithoutManufacturerProfileInput, Prisma.RfqInvitationUncheckedCreateWithoutManufacturerProfileInput> | Prisma.RfqInvitationCreateWithoutManufacturerProfileInput[] | Prisma.RfqInvitationUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.RfqInvitationCreateOrConnectWithoutManufacturerProfileInput | Prisma.RfqInvitationCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.RfqInvitationUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.RfqInvitationUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.RfqInvitationCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    disconnect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    delete?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    connect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    update?: Prisma.RfqInvitationUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.RfqInvitationUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.RfqInvitationUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.RfqInvitationUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.RfqInvitationScalarWhereInput | Prisma.RfqInvitationScalarWhereInput[];
};
export type RfqInvitationUncheckedUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.RfqInvitationCreateWithoutManufacturerProfileInput, Prisma.RfqInvitationUncheckedCreateWithoutManufacturerProfileInput> | Prisma.RfqInvitationCreateWithoutManufacturerProfileInput[] | Prisma.RfqInvitationUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.RfqInvitationCreateOrConnectWithoutManufacturerProfileInput | Prisma.RfqInvitationCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.RfqInvitationUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.RfqInvitationUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.RfqInvitationCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    disconnect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    delete?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    connect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    update?: Prisma.RfqInvitationUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.RfqInvitationUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.RfqInvitationUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.RfqInvitationUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.RfqInvitationScalarWhereInput | Prisma.RfqInvitationScalarWhereInput[];
};
export type RfqInvitationCreateNestedManyWithoutRfqInput = {
    create?: Prisma.XOR<Prisma.RfqInvitationCreateWithoutRfqInput, Prisma.RfqInvitationUncheckedCreateWithoutRfqInput> | Prisma.RfqInvitationCreateWithoutRfqInput[] | Prisma.RfqInvitationUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqInvitationCreateOrConnectWithoutRfqInput | Prisma.RfqInvitationCreateOrConnectWithoutRfqInput[];
    createMany?: Prisma.RfqInvitationCreateManyRfqInputEnvelope;
    connect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
};
export type RfqInvitationUncheckedCreateNestedManyWithoutRfqInput = {
    create?: Prisma.XOR<Prisma.RfqInvitationCreateWithoutRfqInput, Prisma.RfqInvitationUncheckedCreateWithoutRfqInput> | Prisma.RfqInvitationCreateWithoutRfqInput[] | Prisma.RfqInvitationUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqInvitationCreateOrConnectWithoutRfqInput | Prisma.RfqInvitationCreateOrConnectWithoutRfqInput[];
    createMany?: Prisma.RfqInvitationCreateManyRfqInputEnvelope;
    connect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
};
export type RfqInvitationUpdateManyWithoutRfqNestedInput = {
    create?: Prisma.XOR<Prisma.RfqInvitationCreateWithoutRfqInput, Prisma.RfqInvitationUncheckedCreateWithoutRfqInput> | Prisma.RfqInvitationCreateWithoutRfqInput[] | Prisma.RfqInvitationUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqInvitationCreateOrConnectWithoutRfqInput | Prisma.RfqInvitationCreateOrConnectWithoutRfqInput[];
    upsert?: Prisma.RfqInvitationUpsertWithWhereUniqueWithoutRfqInput | Prisma.RfqInvitationUpsertWithWhereUniqueWithoutRfqInput[];
    createMany?: Prisma.RfqInvitationCreateManyRfqInputEnvelope;
    set?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    disconnect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    delete?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    connect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    update?: Prisma.RfqInvitationUpdateWithWhereUniqueWithoutRfqInput | Prisma.RfqInvitationUpdateWithWhereUniqueWithoutRfqInput[];
    updateMany?: Prisma.RfqInvitationUpdateManyWithWhereWithoutRfqInput | Prisma.RfqInvitationUpdateManyWithWhereWithoutRfqInput[];
    deleteMany?: Prisma.RfqInvitationScalarWhereInput | Prisma.RfqInvitationScalarWhereInput[];
};
export type RfqInvitationUncheckedUpdateManyWithoutRfqNestedInput = {
    create?: Prisma.XOR<Prisma.RfqInvitationCreateWithoutRfqInput, Prisma.RfqInvitationUncheckedCreateWithoutRfqInput> | Prisma.RfqInvitationCreateWithoutRfqInput[] | Prisma.RfqInvitationUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqInvitationCreateOrConnectWithoutRfqInput | Prisma.RfqInvitationCreateOrConnectWithoutRfqInput[];
    upsert?: Prisma.RfqInvitationUpsertWithWhereUniqueWithoutRfqInput | Prisma.RfqInvitationUpsertWithWhereUniqueWithoutRfqInput[];
    createMany?: Prisma.RfqInvitationCreateManyRfqInputEnvelope;
    set?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    disconnect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    delete?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    connect?: Prisma.RfqInvitationWhereUniqueInput | Prisma.RfqInvitationWhereUniqueInput[];
    update?: Prisma.RfqInvitationUpdateWithWhereUniqueWithoutRfqInput | Prisma.RfqInvitationUpdateWithWhereUniqueWithoutRfqInput[];
    updateMany?: Prisma.RfqInvitationUpdateManyWithWhereWithoutRfqInput | Prisma.RfqInvitationUpdateManyWithWhereWithoutRfqInput[];
    deleteMany?: Prisma.RfqInvitationScalarWhereInput | Prisma.RfqInvitationScalarWhereInput[];
};
export type EnumRfqInvitationStatusFieldUpdateOperationsInput = {
    set?: $Enums.RfqInvitationStatus;
};
export type RfqInvitationCreateWithoutManufacturerProfileInput = {
    id?: string;
    status?: $Enums.RfqInvitationStatus;
    invitedAt?: Date | string;
    visibleAt?: Date | string;
    notifiedAt?: Date | string | null;
    respondedAt?: Date | string | null;
    declineReason?: string | null;
    rfq: Prisma.RfqCreateNestedOneWithoutInvitationsInput;
};
export type RfqInvitationUncheckedCreateWithoutManufacturerProfileInput = {
    id?: string;
    rfqId: string;
    status?: $Enums.RfqInvitationStatus;
    invitedAt?: Date | string;
    visibleAt?: Date | string;
    notifiedAt?: Date | string | null;
    respondedAt?: Date | string | null;
    declineReason?: string | null;
};
export type RfqInvitationCreateOrConnectWithoutManufacturerProfileInput = {
    where: Prisma.RfqInvitationWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqInvitationCreateWithoutManufacturerProfileInput, Prisma.RfqInvitationUncheckedCreateWithoutManufacturerProfileInput>;
};
export type RfqInvitationCreateManyManufacturerProfileInputEnvelope = {
    data: Prisma.RfqInvitationCreateManyManufacturerProfileInput | Prisma.RfqInvitationCreateManyManufacturerProfileInput[];
    skipDuplicates?: boolean;
};
export type RfqInvitationUpsertWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.RfqInvitationWhereUniqueInput;
    update: Prisma.XOR<Prisma.RfqInvitationUpdateWithoutManufacturerProfileInput, Prisma.RfqInvitationUncheckedUpdateWithoutManufacturerProfileInput>;
    create: Prisma.XOR<Prisma.RfqInvitationCreateWithoutManufacturerProfileInput, Prisma.RfqInvitationUncheckedCreateWithoutManufacturerProfileInput>;
};
export type RfqInvitationUpdateWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.RfqInvitationWhereUniqueInput;
    data: Prisma.XOR<Prisma.RfqInvitationUpdateWithoutManufacturerProfileInput, Prisma.RfqInvitationUncheckedUpdateWithoutManufacturerProfileInput>;
};
export type RfqInvitationUpdateManyWithWhereWithoutManufacturerProfileInput = {
    where: Prisma.RfqInvitationScalarWhereInput;
    data: Prisma.XOR<Prisma.RfqInvitationUpdateManyMutationInput, Prisma.RfqInvitationUncheckedUpdateManyWithoutManufacturerProfileInput>;
};
export type RfqInvitationScalarWhereInput = {
    AND?: Prisma.RfqInvitationScalarWhereInput | Prisma.RfqInvitationScalarWhereInput[];
    OR?: Prisma.RfqInvitationScalarWhereInput[];
    NOT?: Prisma.RfqInvitationScalarWhereInput | Prisma.RfqInvitationScalarWhereInput[];
    id?: Prisma.UuidFilter<"RfqInvitation"> | string;
    rfqId?: Prisma.UuidFilter<"RfqInvitation"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"RfqInvitation"> | string;
    status?: Prisma.EnumRfqInvitationStatusFilter<"RfqInvitation"> | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFilter<"RfqInvitation"> | Date | string;
    visibleAt?: Prisma.DateTimeFilter<"RfqInvitation"> | Date | string;
    notifiedAt?: Prisma.DateTimeNullableFilter<"RfqInvitation"> | Date | string | null;
    respondedAt?: Prisma.DateTimeNullableFilter<"RfqInvitation"> | Date | string | null;
    declineReason?: Prisma.StringNullableFilter<"RfqInvitation"> | string | null;
};
export type RfqInvitationCreateWithoutRfqInput = {
    id?: string;
    status?: $Enums.RfqInvitationStatus;
    invitedAt?: Date | string;
    visibleAt?: Date | string;
    notifiedAt?: Date | string | null;
    respondedAt?: Date | string | null;
    declineReason?: string | null;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutRfqInvitationsInput;
};
export type RfqInvitationUncheckedCreateWithoutRfqInput = {
    id?: string;
    manufacturerProfileId: string;
    status?: $Enums.RfqInvitationStatus;
    invitedAt?: Date | string;
    visibleAt?: Date | string;
    notifiedAt?: Date | string | null;
    respondedAt?: Date | string | null;
    declineReason?: string | null;
};
export type RfqInvitationCreateOrConnectWithoutRfqInput = {
    where: Prisma.RfqInvitationWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqInvitationCreateWithoutRfqInput, Prisma.RfqInvitationUncheckedCreateWithoutRfqInput>;
};
export type RfqInvitationCreateManyRfqInputEnvelope = {
    data: Prisma.RfqInvitationCreateManyRfqInput | Prisma.RfqInvitationCreateManyRfqInput[];
    skipDuplicates?: boolean;
};
export type RfqInvitationUpsertWithWhereUniqueWithoutRfqInput = {
    where: Prisma.RfqInvitationWhereUniqueInput;
    update: Prisma.XOR<Prisma.RfqInvitationUpdateWithoutRfqInput, Prisma.RfqInvitationUncheckedUpdateWithoutRfqInput>;
    create: Prisma.XOR<Prisma.RfqInvitationCreateWithoutRfqInput, Prisma.RfqInvitationUncheckedCreateWithoutRfqInput>;
};
export type RfqInvitationUpdateWithWhereUniqueWithoutRfqInput = {
    where: Prisma.RfqInvitationWhereUniqueInput;
    data: Prisma.XOR<Prisma.RfqInvitationUpdateWithoutRfqInput, Prisma.RfqInvitationUncheckedUpdateWithoutRfqInput>;
};
export type RfqInvitationUpdateManyWithWhereWithoutRfqInput = {
    where: Prisma.RfqInvitationScalarWhereInput;
    data: Prisma.XOR<Prisma.RfqInvitationUpdateManyMutationInput, Prisma.RfqInvitationUncheckedUpdateManyWithoutRfqInput>;
};
export type RfqInvitationCreateManyManufacturerProfileInput = {
    id?: string;
    rfqId: string;
    status?: $Enums.RfqInvitationStatus;
    invitedAt?: Date | string;
    visibleAt?: Date | string;
    notifiedAt?: Date | string | null;
    respondedAt?: Date | string | null;
    declineReason?: string | null;
};
export type RfqInvitationUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRfqInvitationStatusFieldUpdateOperationsInput | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    visibleAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    declineReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rfq?: Prisma.RfqUpdateOneRequiredWithoutInvitationsNestedInput;
};
export type RfqInvitationUncheckedUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRfqInvitationStatusFieldUpdateOperationsInput | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    visibleAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    declineReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type RfqInvitationUncheckedUpdateManyWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRfqInvitationStatusFieldUpdateOperationsInput | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    visibleAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    declineReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type RfqInvitationCreateManyRfqInput = {
    id?: string;
    manufacturerProfileId: string;
    status?: $Enums.RfqInvitationStatus;
    invitedAt?: Date | string;
    visibleAt?: Date | string;
    notifiedAt?: Date | string | null;
    respondedAt?: Date | string | null;
    declineReason?: string | null;
};
export type RfqInvitationUpdateWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRfqInvitationStatusFieldUpdateOperationsInput | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    visibleAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    declineReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutRfqInvitationsNestedInput;
};
export type RfqInvitationUncheckedUpdateWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRfqInvitationStatusFieldUpdateOperationsInput | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    visibleAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    declineReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type RfqInvitationUncheckedUpdateManyWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumRfqInvitationStatusFieldUpdateOperationsInput | $Enums.RfqInvitationStatus;
    invitedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    visibleAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    respondedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    declineReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type RfqInvitationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    rfqId?: boolean;
    manufacturerProfileId?: boolean;
    status?: boolean;
    invitedAt?: boolean;
    visibleAt?: boolean;
    notifiedAt?: boolean;
    respondedAt?: boolean;
    declineReason?: boolean;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqInvitation"]>;
export type RfqInvitationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    rfqId?: boolean;
    manufacturerProfileId?: boolean;
    status?: boolean;
    invitedAt?: boolean;
    visibleAt?: boolean;
    notifiedAt?: boolean;
    respondedAt?: boolean;
    declineReason?: boolean;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqInvitation"]>;
export type RfqInvitationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    rfqId?: boolean;
    manufacturerProfileId?: boolean;
    status?: boolean;
    invitedAt?: boolean;
    visibleAt?: boolean;
    notifiedAt?: boolean;
    respondedAt?: boolean;
    declineReason?: boolean;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqInvitation"]>;
export type RfqInvitationSelectScalar = {
    id?: boolean;
    rfqId?: boolean;
    manufacturerProfileId?: boolean;
    status?: boolean;
    invitedAt?: boolean;
    visibleAt?: boolean;
    notifiedAt?: boolean;
    respondedAt?: boolean;
    declineReason?: boolean;
};
export type RfqInvitationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "rfqId" | "manufacturerProfileId" | "status" | "invitedAt" | "visibleAt" | "notifiedAt" | "respondedAt" | "declineReason", ExtArgs["result"]["rfqInvitation"]>;
export type RfqInvitationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
};
export type RfqInvitationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
};
export type RfqInvitationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
};
export type $RfqInvitationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RfqInvitation";
    objects: {
        rfq: Prisma.$RfqPayload<ExtArgs>;
        manufacturerProfile: Prisma.$ManufacturerProfilePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        rfqId: string;
        manufacturerProfileId: string;
        status: $Enums.RfqInvitationStatus;
        invitedAt: Date;
        visibleAt: Date;
        notifiedAt: Date | null;
        respondedAt: Date | null;
        declineReason: string | null;
    }, ExtArgs["result"]["rfqInvitation"]>;
    composites: {};
};
export type RfqInvitationGetPayload<S extends boolean | null | undefined | RfqInvitationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload, S>;
export type RfqInvitationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RfqInvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RfqInvitationCountAggregateInputType | true;
};
export interface RfqInvitationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RfqInvitation'];
        meta: {
            name: 'RfqInvitation';
        };
    };
    findUnique<T extends RfqInvitationFindUniqueArgs>(args: Prisma.SelectSubset<T, RfqInvitationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RfqInvitationClient<runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RfqInvitationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RfqInvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RfqInvitationClient<runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RfqInvitationFindFirstArgs>(args?: Prisma.SelectSubset<T, RfqInvitationFindFirstArgs<ExtArgs>>): Prisma.Prisma__RfqInvitationClient<runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RfqInvitationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RfqInvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RfqInvitationClient<runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RfqInvitationFindManyArgs>(args?: Prisma.SelectSubset<T, RfqInvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RfqInvitationCreateArgs>(args: Prisma.SelectSubset<T, RfqInvitationCreateArgs<ExtArgs>>): Prisma.Prisma__RfqInvitationClient<runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RfqInvitationCreateManyArgs>(args?: Prisma.SelectSubset<T, RfqInvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RfqInvitationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RfqInvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RfqInvitationDeleteArgs>(args: Prisma.SelectSubset<T, RfqInvitationDeleteArgs<ExtArgs>>): Prisma.Prisma__RfqInvitationClient<runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RfqInvitationUpdateArgs>(args: Prisma.SelectSubset<T, RfqInvitationUpdateArgs<ExtArgs>>): Prisma.Prisma__RfqInvitationClient<runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RfqInvitationDeleteManyArgs>(args?: Prisma.SelectSubset<T, RfqInvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RfqInvitationUpdateManyArgs>(args: Prisma.SelectSubset<T, RfqInvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RfqInvitationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RfqInvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RfqInvitationUpsertArgs>(args: Prisma.SelectSubset<T, RfqInvitationUpsertArgs<ExtArgs>>): Prisma.Prisma__RfqInvitationClient<runtime.Types.Result.GetResult<Prisma.$RfqInvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RfqInvitationCountArgs>(args?: Prisma.Subset<T, RfqInvitationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RfqInvitationCountAggregateOutputType> : number>;
    aggregate<T extends RfqInvitationAggregateArgs>(args: Prisma.Subset<T, RfqInvitationAggregateArgs>): Prisma.PrismaPromise<GetRfqInvitationAggregateType<T>>;
    groupBy<T extends RfqInvitationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RfqInvitationGroupByArgs['orderBy'];
    } : {
        orderBy?: RfqInvitationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RfqInvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRfqInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RfqInvitationFieldRefs;
}
export interface Prisma__RfqInvitationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    rfq<T extends Prisma.RfqDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RfqDefaultArgs<ExtArgs>>): Prisma.Prisma__RfqClient<runtime.Types.Result.GetResult<Prisma.$RfqPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    manufacturerProfile<T extends Prisma.ManufacturerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ManufacturerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__ManufacturerProfileClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RfqInvitationFieldRefs {
    readonly id: Prisma.FieldRef<"RfqInvitation", 'String'>;
    readonly rfqId: Prisma.FieldRef<"RfqInvitation", 'String'>;
    readonly manufacturerProfileId: Prisma.FieldRef<"RfqInvitation", 'String'>;
    readonly status: Prisma.FieldRef<"RfqInvitation", 'RfqInvitationStatus'>;
    readonly invitedAt: Prisma.FieldRef<"RfqInvitation", 'DateTime'>;
    readonly visibleAt: Prisma.FieldRef<"RfqInvitation", 'DateTime'>;
    readonly notifiedAt: Prisma.FieldRef<"RfqInvitation", 'DateTime'>;
    readonly respondedAt: Prisma.FieldRef<"RfqInvitation", 'DateTime'>;
    readonly declineReason: Prisma.FieldRef<"RfqInvitation", 'String'>;
}
export type RfqInvitationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelect<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    include?: Prisma.RfqInvitationInclude<ExtArgs> | null;
    where: Prisma.RfqInvitationWhereUniqueInput;
};
export type RfqInvitationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelect<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    include?: Prisma.RfqInvitationInclude<ExtArgs> | null;
    where: Prisma.RfqInvitationWhereUniqueInput;
};
export type RfqInvitationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelect<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    include?: Prisma.RfqInvitationInclude<ExtArgs> | null;
    where?: Prisma.RfqInvitationWhereInput;
    orderBy?: Prisma.RfqInvitationOrderByWithRelationInput | Prisma.RfqInvitationOrderByWithRelationInput[];
    cursor?: Prisma.RfqInvitationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqInvitationScalarFieldEnum | Prisma.RfqInvitationScalarFieldEnum[];
};
export type RfqInvitationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelect<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    include?: Prisma.RfqInvitationInclude<ExtArgs> | null;
    where?: Prisma.RfqInvitationWhereInput;
    orderBy?: Prisma.RfqInvitationOrderByWithRelationInput | Prisma.RfqInvitationOrderByWithRelationInput[];
    cursor?: Prisma.RfqInvitationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqInvitationScalarFieldEnum | Prisma.RfqInvitationScalarFieldEnum[];
};
export type RfqInvitationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelect<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    include?: Prisma.RfqInvitationInclude<ExtArgs> | null;
    where?: Prisma.RfqInvitationWhereInput;
    orderBy?: Prisma.RfqInvitationOrderByWithRelationInput | Prisma.RfqInvitationOrderByWithRelationInput[];
    cursor?: Prisma.RfqInvitationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqInvitationScalarFieldEnum | Prisma.RfqInvitationScalarFieldEnum[];
};
export type RfqInvitationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelect<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    include?: Prisma.RfqInvitationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqInvitationCreateInput, Prisma.RfqInvitationUncheckedCreateInput>;
};
export type RfqInvitationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RfqInvitationCreateManyInput | Prisma.RfqInvitationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RfqInvitationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    data: Prisma.RfqInvitationCreateManyInput | Prisma.RfqInvitationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RfqInvitationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RfqInvitationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelect<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    include?: Prisma.RfqInvitationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqInvitationUpdateInput, Prisma.RfqInvitationUncheckedUpdateInput>;
    where: Prisma.RfqInvitationWhereUniqueInput;
};
export type RfqInvitationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RfqInvitationUpdateManyMutationInput, Prisma.RfqInvitationUncheckedUpdateManyInput>;
    where?: Prisma.RfqInvitationWhereInput;
    limit?: number;
};
export type RfqInvitationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqInvitationUpdateManyMutationInput, Prisma.RfqInvitationUncheckedUpdateManyInput>;
    where?: Prisma.RfqInvitationWhereInput;
    limit?: number;
    include?: Prisma.RfqInvitationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RfqInvitationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelect<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    include?: Prisma.RfqInvitationInclude<ExtArgs> | null;
    where: Prisma.RfqInvitationWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqInvitationCreateInput, Prisma.RfqInvitationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RfqInvitationUpdateInput, Prisma.RfqInvitationUncheckedUpdateInput>;
};
export type RfqInvitationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelect<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    include?: Prisma.RfqInvitationInclude<ExtArgs> | null;
    where: Prisma.RfqInvitationWhereUniqueInput;
};
export type RfqInvitationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqInvitationWhereInput;
    limit?: number;
};
export type RfqInvitationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqInvitationSelect<ExtArgs> | null;
    omit?: Prisma.RfqInvitationOmit<ExtArgs> | null;
    include?: Prisma.RfqInvitationInclude<ExtArgs> | null;
};
