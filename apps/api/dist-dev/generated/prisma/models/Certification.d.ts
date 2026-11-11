import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CertificationModel = runtime.Types.Result.DefaultSelection<Prisma.$CertificationPayload>;
export type AggregateCertification = {
    _count: CertificationCountAggregateOutputType | null;
    _min: CertificationMinAggregateOutputType | null;
    _max: CertificationMaxAggregateOutputType | null;
};
export type CertificationMinAggregateOutputType = {
    id: string | null;
    manufacturerProfileId: string | null;
    type: $Enums.CertificationType | null;
    customName: string | null;
    certificateNumber: string | null;
    issuedAt: Date | null;
    expiresAt: Date | null;
    fileId: string | null;
    status: $Enums.CertificationStatus | null;
    verifiedAt: Date | null;
    rejectionReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CertificationMaxAggregateOutputType = {
    id: string | null;
    manufacturerProfileId: string | null;
    type: $Enums.CertificationType | null;
    customName: string | null;
    certificateNumber: string | null;
    issuedAt: Date | null;
    expiresAt: Date | null;
    fileId: string | null;
    status: $Enums.CertificationStatus | null;
    verifiedAt: Date | null;
    rejectionReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CertificationCountAggregateOutputType = {
    id: number;
    manufacturerProfileId: number;
    type: number;
    customName: number;
    certificateNumber: number;
    issuedAt: number;
    expiresAt: number;
    fileId: number;
    status: number;
    verifiedAt: number;
    rejectionReason: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CertificationMinAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    type?: true;
    customName?: true;
    certificateNumber?: true;
    issuedAt?: true;
    expiresAt?: true;
    fileId?: true;
    status?: true;
    verifiedAt?: true;
    rejectionReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CertificationMaxAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    type?: true;
    customName?: true;
    certificateNumber?: true;
    issuedAt?: true;
    expiresAt?: true;
    fileId?: true;
    status?: true;
    verifiedAt?: true;
    rejectionReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CertificationCountAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    type?: true;
    customName?: true;
    certificateNumber?: true;
    issuedAt?: true;
    expiresAt?: true;
    fileId?: true;
    status?: true;
    verifiedAt?: true;
    rejectionReason?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CertificationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CertificationWhereInput;
    orderBy?: Prisma.CertificationOrderByWithRelationInput | Prisma.CertificationOrderByWithRelationInput[];
    cursor?: Prisma.CertificationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CertificationCountAggregateInputType;
    _min?: CertificationMinAggregateInputType;
    _max?: CertificationMaxAggregateInputType;
};
export type GetCertificationAggregateType<T extends CertificationAggregateArgs> = {
    [P in keyof T & keyof AggregateCertification]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCertification[P]> : Prisma.GetScalarType<T[P], AggregateCertification[P]>;
};
export type CertificationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CertificationWhereInput;
    orderBy?: Prisma.CertificationOrderByWithAggregationInput | Prisma.CertificationOrderByWithAggregationInput[];
    by: Prisma.CertificationScalarFieldEnum[] | Prisma.CertificationScalarFieldEnum;
    having?: Prisma.CertificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CertificationCountAggregateInputType | true;
    _min?: CertificationMinAggregateInputType;
    _max?: CertificationMaxAggregateInputType;
};
export type CertificationGroupByOutputType = {
    id: string;
    manufacturerProfileId: string;
    type: $Enums.CertificationType;
    customName: string | null;
    certificateNumber: string | null;
    issuedAt: Date | null;
    expiresAt: Date | null;
    fileId: string | null;
    status: $Enums.CertificationStatus;
    verifiedAt: Date | null;
    rejectionReason: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CertificationCountAggregateOutputType | null;
    _min: CertificationMinAggregateOutputType | null;
    _max: CertificationMaxAggregateOutputType | null;
};
export type GetCertificationGroupByPayload<T extends CertificationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CertificationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CertificationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CertificationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CertificationGroupByOutputType[P]>;
}>>;
export type CertificationWhereInput = {
    AND?: Prisma.CertificationWhereInput | Prisma.CertificationWhereInput[];
    OR?: Prisma.CertificationWhereInput[];
    NOT?: Prisma.CertificationWhereInput | Prisma.CertificationWhereInput[];
    id?: Prisma.UuidFilter<"Certification"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"Certification"> | string;
    type?: Prisma.EnumCertificationTypeFilter<"Certification"> | $Enums.CertificationType;
    customName?: Prisma.StringNullableFilter<"Certification"> | string | null;
    certificateNumber?: Prisma.StringNullableFilter<"Certification"> | string | null;
    issuedAt?: Prisma.DateTimeNullableFilter<"Certification"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"Certification"> | Date | string | null;
    fileId?: Prisma.UuidNullableFilter<"Certification"> | string | null;
    status?: Prisma.EnumCertificationStatusFilter<"Certification"> | $Enums.CertificationStatus;
    verifiedAt?: Prisma.DateTimeNullableFilter<"Certification"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"Certification"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Certification"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Certification"> | Date | string;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetNullableScalarRelationFilter, Prisma.FileAssetWhereInput> | null;
};
export type CertificationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    customName?: Prisma.SortOrderInput | Prisma.SortOrder;
    certificateNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    issuedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    manufacturerProfile?: Prisma.ManufacturerProfileOrderByWithRelationInput;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type CertificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.CertificationWhereInput | Prisma.CertificationWhereInput[];
    OR?: Prisma.CertificationWhereInput[];
    NOT?: Prisma.CertificationWhereInput | Prisma.CertificationWhereInput[];
    manufacturerProfileId?: Prisma.UuidFilter<"Certification"> | string;
    type?: Prisma.EnumCertificationTypeFilter<"Certification"> | $Enums.CertificationType;
    customName?: Prisma.StringNullableFilter<"Certification"> | string | null;
    certificateNumber?: Prisma.StringNullableFilter<"Certification"> | string | null;
    issuedAt?: Prisma.DateTimeNullableFilter<"Certification"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"Certification"> | Date | string | null;
    status?: Prisma.EnumCertificationStatusFilter<"Certification"> | $Enums.CertificationStatus;
    verifiedAt?: Prisma.DateTimeNullableFilter<"Certification"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"Certification"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Certification"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Certification"> | Date | string;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetNullableScalarRelationFilter, Prisma.FileAssetWhereInput> | null;
}, "id" | "fileId">;
export type CertificationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    customName?: Prisma.SortOrderInput | Prisma.SortOrder;
    certificateNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    issuedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CertificationCountOrderByAggregateInput;
    _max?: Prisma.CertificationMaxOrderByAggregateInput;
    _min?: Prisma.CertificationMinOrderByAggregateInput;
};
export type CertificationScalarWhereWithAggregatesInput = {
    AND?: Prisma.CertificationScalarWhereWithAggregatesInput | Prisma.CertificationScalarWhereWithAggregatesInput[];
    OR?: Prisma.CertificationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CertificationScalarWhereWithAggregatesInput | Prisma.CertificationScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Certification"> | string;
    manufacturerProfileId?: Prisma.UuidWithAggregatesFilter<"Certification"> | string;
    type?: Prisma.EnumCertificationTypeWithAggregatesFilter<"Certification"> | $Enums.CertificationType;
    customName?: Prisma.StringNullableWithAggregatesFilter<"Certification"> | string | null;
    certificateNumber?: Prisma.StringNullableWithAggregatesFilter<"Certification"> | string | null;
    issuedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Certification"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Certification"> | Date | string | null;
    fileId?: Prisma.UuidNullableWithAggregatesFilter<"Certification"> | string | null;
    status?: Prisma.EnumCertificationStatusWithAggregatesFilter<"Certification"> | $Enums.CertificationStatus;
    verifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Certification"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableWithAggregatesFilter<"Certification"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Certification"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Certification"> | Date | string;
};
export type CertificationCreateInput = {
    id?: string;
    type: $Enums.CertificationType;
    customName?: string | null;
    certificateNumber?: string | null;
    issuedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    status?: $Enums.CertificationStatus;
    verifiedAt?: Date | string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutCertificationsInput;
    file?: Prisma.FileAssetCreateNestedOneWithoutCertificationInput;
};
export type CertificationUncheckedCreateInput = {
    id?: string;
    manufacturerProfileId: string;
    type: $Enums.CertificationType;
    customName?: string | null;
    certificateNumber?: string | null;
    issuedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    fileId?: string | null;
    status?: $Enums.CertificationStatus;
    verifiedAt?: Date | string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CertificationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType;
    customName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    certificateNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumCertificationStatusFieldUpdateOperationsInput | $Enums.CertificationStatus;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutCertificationsNestedInput;
    file?: Prisma.FileAssetUpdateOneWithoutCertificationNestedInput;
};
export type CertificationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType;
    customName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    certificateNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumCertificationStatusFieldUpdateOperationsInput | $Enums.CertificationStatus;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CertificationCreateManyInput = {
    id?: string;
    manufacturerProfileId: string;
    type: $Enums.CertificationType;
    customName?: string | null;
    certificateNumber?: string | null;
    issuedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    fileId?: string | null;
    status?: $Enums.CertificationStatus;
    verifiedAt?: Date | string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CertificationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType;
    customName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    certificateNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumCertificationStatusFieldUpdateOperationsInput | $Enums.CertificationStatus;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CertificationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType;
    customName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    certificateNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumCertificationStatusFieldUpdateOperationsInput | $Enums.CertificationStatus;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CertificationListRelationFilter = {
    every?: Prisma.CertificationWhereInput;
    some?: Prisma.CertificationWhereInput;
    none?: Prisma.CertificationWhereInput;
};
export type CertificationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CertificationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    customName?: Prisma.SortOrder;
    certificateNumber?: Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CertificationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    customName?: Prisma.SortOrder;
    certificateNumber?: Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CertificationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    customName?: Prisma.SortOrder;
    certificateNumber?: Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CertificationNullableScalarRelationFilter = {
    is?: Prisma.CertificationWhereInput | null;
    isNot?: Prisma.CertificationWhereInput | null;
};
export type CertificationCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.CertificationCreateWithoutManufacturerProfileInput, Prisma.CertificationUncheckedCreateWithoutManufacturerProfileInput> | Prisma.CertificationCreateWithoutManufacturerProfileInput[] | Prisma.CertificationUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.CertificationCreateOrConnectWithoutManufacturerProfileInput | Prisma.CertificationCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.CertificationCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.CertificationWhereUniqueInput | Prisma.CertificationWhereUniqueInput[];
};
export type CertificationUncheckedCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.CertificationCreateWithoutManufacturerProfileInput, Prisma.CertificationUncheckedCreateWithoutManufacturerProfileInput> | Prisma.CertificationCreateWithoutManufacturerProfileInput[] | Prisma.CertificationUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.CertificationCreateOrConnectWithoutManufacturerProfileInput | Prisma.CertificationCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.CertificationCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.CertificationWhereUniqueInput | Prisma.CertificationWhereUniqueInput[];
};
export type CertificationUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.CertificationCreateWithoutManufacturerProfileInput, Prisma.CertificationUncheckedCreateWithoutManufacturerProfileInput> | Prisma.CertificationCreateWithoutManufacturerProfileInput[] | Prisma.CertificationUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.CertificationCreateOrConnectWithoutManufacturerProfileInput | Prisma.CertificationCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.CertificationUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.CertificationUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.CertificationCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.CertificationWhereUniqueInput | Prisma.CertificationWhereUniqueInput[];
    disconnect?: Prisma.CertificationWhereUniqueInput | Prisma.CertificationWhereUniqueInput[];
    delete?: Prisma.CertificationWhereUniqueInput | Prisma.CertificationWhereUniqueInput[];
    connect?: Prisma.CertificationWhereUniqueInput | Prisma.CertificationWhereUniqueInput[];
    update?: Prisma.CertificationUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.CertificationUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.CertificationUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.CertificationUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.CertificationScalarWhereInput | Prisma.CertificationScalarWhereInput[];
};
export type CertificationUncheckedUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.CertificationCreateWithoutManufacturerProfileInput, Prisma.CertificationUncheckedCreateWithoutManufacturerProfileInput> | Prisma.CertificationCreateWithoutManufacturerProfileInput[] | Prisma.CertificationUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.CertificationCreateOrConnectWithoutManufacturerProfileInput | Prisma.CertificationCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.CertificationUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.CertificationUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.CertificationCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.CertificationWhereUniqueInput | Prisma.CertificationWhereUniqueInput[];
    disconnect?: Prisma.CertificationWhereUniqueInput | Prisma.CertificationWhereUniqueInput[];
    delete?: Prisma.CertificationWhereUniqueInput | Prisma.CertificationWhereUniqueInput[];
    connect?: Prisma.CertificationWhereUniqueInput | Prisma.CertificationWhereUniqueInput[];
    update?: Prisma.CertificationUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.CertificationUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.CertificationUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.CertificationUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.CertificationScalarWhereInput | Prisma.CertificationScalarWhereInput[];
};
export type EnumCertificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.CertificationType;
};
export type EnumCertificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.CertificationStatus;
};
export type CertificationCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.CertificationCreateWithoutFileInput, Prisma.CertificationUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.CertificationCreateOrConnectWithoutFileInput;
    connect?: Prisma.CertificationWhereUniqueInput;
};
export type CertificationUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.CertificationCreateWithoutFileInput, Prisma.CertificationUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.CertificationCreateOrConnectWithoutFileInput;
    connect?: Prisma.CertificationWhereUniqueInput;
};
export type CertificationUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.CertificationCreateWithoutFileInput, Prisma.CertificationUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.CertificationCreateOrConnectWithoutFileInput;
    upsert?: Prisma.CertificationUpsertWithoutFileInput;
    disconnect?: Prisma.CertificationWhereInput | boolean;
    delete?: Prisma.CertificationWhereInput | boolean;
    connect?: Prisma.CertificationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CertificationUpdateToOneWithWhereWithoutFileInput, Prisma.CertificationUpdateWithoutFileInput>, Prisma.CertificationUncheckedUpdateWithoutFileInput>;
};
export type CertificationUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.CertificationCreateWithoutFileInput, Prisma.CertificationUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.CertificationCreateOrConnectWithoutFileInput;
    upsert?: Prisma.CertificationUpsertWithoutFileInput;
    disconnect?: Prisma.CertificationWhereInput | boolean;
    delete?: Prisma.CertificationWhereInput | boolean;
    connect?: Prisma.CertificationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CertificationUpdateToOneWithWhereWithoutFileInput, Prisma.CertificationUpdateWithoutFileInput>, Prisma.CertificationUncheckedUpdateWithoutFileInput>;
};
export type CertificationCreateWithoutManufacturerProfileInput = {
    id?: string;
    type: $Enums.CertificationType;
    customName?: string | null;
    certificateNumber?: string | null;
    issuedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    status?: $Enums.CertificationStatus;
    verifiedAt?: Date | string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    file?: Prisma.FileAssetCreateNestedOneWithoutCertificationInput;
};
export type CertificationUncheckedCreateWithoutManufacturerProfileInput = {
    id?: string;
    type: $Enums.CertificationType;
    customName?: string | null;
    certificateNumber?: string | null;
    issuedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    fileId?: string | null;
    status?: $Enums.CertificationStatus;
    verifiedAt?: Date | string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CertificationCreateOrConnectWithoutManufacturerProfileInput = {
    where: Prisma.CertificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.CertificationCreateWithoutManufacturerProfileInput, Prisma.CertificationUncheckedCreateWithoutManufacturerProfileInput>;
};
export type CertificationCreateManyManufacturerProfileInputEnvelope = {
    data: Prisma.CertificationCreateManyManufacturerProfileInput | Prisma.CertificationCreateManyManufacturerProfileInput[];
    skipDuplicates?: boolean;
};
export type CertificationUpsertWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.CertificationWhereUniqueInput;
    update: Prisma.XOR<Prisma.CertificationUpdateWithoutManufacturerProfileInput, Prisma.CertificationUncheckedUpdateWithoutManufacturerProfileInput>;
    create: Prisma.XOR<Prisma.CertificationCreateWithoutManufacturerProfileInput, Prisma.CertificationUncheckedCreateWithoutManufacturerProfileInput>;
};
export type CertificationUpdateWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.CertificationWhereUniqueInput;
    data: Prisma.XOR<Prisma.CertificationUpdateWithoutManufacturerProfileInput, Prisma.CertificationUncheckedUpdateWithoutManufacturerProfileInput>;
};
export type CertificationUpdateManyWithWhereWithoutManufacturerProfileInput = {
    where: Prisma.CertificationScalarWhereInput;
    data: Prisma.XOR<Prisma.CertificationUpdateManyMutationInput, Prisma.CertificationUncheckedUpdateManyWithoutManufacturerProfileInput>;
};
export type CertificationScalarWhereInput = {
    AND?: Prisma.CertificationScalarWhereInput | Prisma.CertificationScalarWhereInput[];
    OR?: Prisma.CertificationScalarWhereInput[];
    NOT?: Prisma.CertificationScalarWhereInput | Prisma.CertificationScalarWhereInput[];
    id?: Prisma.UuidFilter<"Certification"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"Certification"> | string;
    type?: Prisma.EnumCertificationTypeFilter<"Certification"> | $Enums.CertificationType;
    customName?: Prisma.StringNullableFilter<"Certification"> | string | null;
    certificateNumber?: Prisma.StringNullableFilter<"Certification"> | string | null;
    issuedAt?: Prisma.DateTimeNullableFilter<"Certification"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"Certification"> | Date | string | null;
    fileId?: Prisma.UuidNullableFilter<"Certification"> | string | null;
    status?: Prisma.EnumCertificationStatusFilter<"Certification"> | $Enums.CertificationStatus;
    verifiedAt?: Prisma.DateTimeNullableFilter<"Certification"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"Certification"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Certification"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Certification"> | Date | string;
};
export type CertificationCreateWithoutFileInput = {
    id?: string;
    type: $Enums.CertificationType;
    customName?: string | null;
    certificateNumber?: string | null;
    issuedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    status?: $Enums.CertificationStatus;
    verifiedAt?: Date | string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutCertificationsInput;
};
export type CertificationUncheckedCreateWithoutFileInput = {
    id?: string;
    manufacturerProfileId: string;
    type: $Enums.CertificationType;
    customName?: string | null;
    certificateNumber?: string | null;
    issuedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    status?: $Enums.CertificationStatus;
    verifiedAt?: Date | string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CertificationCreateOrConnectWithoutFileInput = {
    where: Prisma.CertificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.CertificationCreateWithoutFileInput, Prisma.CertificationUncheckedCreateWithoutFileInput>;
};
export type CertificationUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.CertificationUpdateWithoutFileInput, Prisma.CertificationUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.CertificationCreateWithoutFileInput, Prisma.CertificationUncheckedCreateWithoutFileInput>;
    where?: Prisma.CertificationWhereInput;
};
export type CertificationUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.CertificationWhereInput;
    data: Prisma.XOR<Prisma.CertificationUpdateWithoutFileInput, Prisma.CertificationUncheckedUpdateWithoutFileInput>;
};
export type CertificationUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType;
    customName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    certificateNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumCertificationStatusFieldUpdateOperationsInput | $Enums.CertificationStatus;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutCertificationsNestedInput;
};
export type CertificationUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType;
    customName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    certificateNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumCertificationStatusFieldUpdateOperationsInput | $Enums.CertificationStatus;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CertificationCreateManyManufacturerProfileInput = {
    id?: string;
    type: $Enums.CertificationType;
    customName?: string | null;
    certificateNumber?: string | null;
    issuedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    fileId?: string | null;
    status?: $Enums.CertificationStatus;
    verifiedAt?: Date | string | null;
    rejectionReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CertificationUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType;
    customName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    certificateNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumCertificationStatusFieldUpdateOperationsInput | $Enums.CertificationStatus;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileAssetUpdateOneWithoutCertificationNestedInput;
};
export type CertificationUncheckedUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType;
    customName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    certificateNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumCertificationStatusFieldUpdateOperationsInput | $Enums.CertificationStatus;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CertificationUncheckedUpdateManyWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCertificationTypeFieldUpdateOperationsInput | $Enums.CertificationType;
    customName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    certificateNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issuedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumCertificationStatusFieldUpdateOperationsInput | $Enums.CertificationStatus;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CertificationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    type?: boolean;
    customName?: boolean;
    certificateNumber?: boolean;
    issuedAt?: boolean;
    expiresAt?: boolean;
    fileId?: boolean;
    status?: boolean;
    verifiedAt?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.Certification$fileArgs<ExtArgs>;
}, ExtArgs["result"]["certification"]>;
export type CertificationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    type?: boolean;
    customName?: boolean;
    certificateNumber?: boolean;
    issuedAt?: boolean;
    expiresAt?: boolean;
    fileId?: boolean;
    status?: boolean;
    verifiedAt?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.Certification$fileArgs<ExtArgs>;
}, ExtArgs["result"]["certification"]>;
export type CertificationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    type?: boolean;
    customName?: boolean;
    certificateNumber?: boolean;
    issuedAt?: boolean;
    expiresAt?: boolean;
    fileId?: boolean;
    status?: boolean;
    verifiedAt?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.Certification$fileArgs<ExtArgs>;
}, ExtArgs["result"]["certification"]>;
export type CertificationSelectScalar = {
    id?: boolean;
    manufacturerProfileId?: boolean;
    type?: boolean;
    customName?: boolean;
    certificateNumber?: boolean;
    issuedAt?: boolean;
    expiresAt?: boolean;
    fileId?: boolean;
    status?: boolean;
    verifiedAt?: boolean;
    rejectionReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CertificationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "manufacturerProfileId" | "type" | "customName" | "certificateNumber" | "issuedAt" | "expiresAt" | "fileId" | "status" | "verifiedAt" | "rejectionReason" | "createdAt" | "updatedAt", ExtArgs["result"]["certification"]>;
export type CertificationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.Certification$fileArgs<ExtArgs>;
};
export type CertificationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.Certification$fileArgs<ExtArgs>;
};
export type CertificationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.Certification$fileArgs<ExtArgs>;
};
export type $CertificationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Certification";
    objects: {
        manufacturerProfile: Prisma.$ManufacturerProfilePayload<ExtArgs>;
        file: Prisma.$FileAssetPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        manufacturerProfileId: string;
        type: $Enums.CertificationType;
        customName: string | null;
        certificateNumber: string | null;
        issuedAt: Date | null;
        expiresAt: Date | null;
        fileId: string | null;
        status: $Enums.CertificationStatus;
        verifiedAt: Date | null;
        rejectionReason: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["certification"]>;
    composites: {};
};
export type CertificationGetPayload<S extends boolean | null | undefined | CertificationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CertificationPayload, S>;
export type CertificationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CertificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CertificationCountAggregateInputType | true;
};
export interface CertificationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Certification'];
        meta: {
            name: 'Certification';
        };
    };
    findUnique<T extends CertificationFindUniqueArgs>(args: Prisma.SelectSubset<T, CertificationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CertificationClient<runtime.Types.Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CertificationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CertificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CertificationClient<runtime.Types.Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CertificationFindFirstArgs>(args?: Prisma.SelectSubset<T, CertificationFindFirstArgs<ExtArgs>>): Prisma.Prisma__CertificationClient<runtime.Types.Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CertificationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CertificationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CertificationClient<runtime.Types.Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CertificationFindManyArgs>(args?: Prisma.SelectSubset<T, CertificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CertificationCreateArgs>(args: Prisma.SelectSubset<T, CertificationCreateArgs<ExtArgs>>): Prisma.Prisma__CertificationClient<runtime.Types.Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CertificationCreateManyArgs>(args?: Prisma.SelectSubset<T, CertificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CertificationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CertificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CertificationDeleteArgs>(args: Prisma.SelectSubset<T, CertificationDeleteArgs<ExtArgs>>): Prisma.Prisma__CertificationClient<runtime.Types.Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CertificationUpdateArgs>(args: Prisma.SelectSubset<T, CertificationUpdateArgs<ExtArgs>>): Prisma.Prisma__CertificationClient<runtime.Types.Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CertificationDeleteManyArgs>(args?: Prisma.SelectSubset<T, CertificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CertificationUpdateManyArgs>(args: Prisma.SelectSubset<T, CertificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CertificationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CertificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CertificationUpsertArgs>(args: Prisma.SelectSubset<T, CertificationUpsertArgs<ExtArgs>>): Prisma.Prisma__CertificationClient<runtime.Types.Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CertificationCountArgs>(args?: Prisma.Subset<T, CertificationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CertificationCountAggregateOutputType> : number>;
    aggregate<T extends CertificationAggregateArgs>(args: Prisma.Subset<T, CertificationAggregateArgs>): Prisma.PrismaPromise<GetCertificationAggregateType<T>>;
    groupBy<T extends CertificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CertificationGroupByArgs['orderBy'];
    } : {
        orderBy?: CertificationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CertificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCertificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CertificationFieldRefs;
}
export interface Prisma__CertificationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    manufacturerProfile<T extends Prisma.ManufacturerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ManufacturerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__ManufacturerProfileClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    file<T extends Prisma.Certification$fileArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Certification$fileArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CertificationFieldRefs {
    readonly id: Prisma.FieldRef<"Certification", 'String'>;
    readonly manufacturerProfileId: Prisma.FieldRef<"Certification", 'String'>;
    readonly type: Prisma.FieldRef<"Certification", 'CertificationType'>;
    readonly customName: Prisma.FieldRef<"Certification", 'String'>;
    readonly certificateNumber: Prisma.FieldRef<"Certification", 'String'>;
    readonly issuedAt: Prisma.FieldRef<"Certification", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"Certification", 'DateTime'>;
    readonly fileId: Prisma.FieldRef<"Certification", 'String'>;
    readonly status: Prisma.FieldRef<"Certification", 'CertificationStatus'>;
    readonly verifiedAt: Prisma.FieldRef<"Certification", 'DateTime'>;
    readonly rejectionReason: Prisma.FieldRef<"Certification", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Certification", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Certification", 'DateTime'>;
}
export type CertificationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelect<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    include?: Prisma.CertificationInclude<ExtArgs> | null;
    where: Prisma.CertificationWhereUniqueInput;
};
export type CertificationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelect<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    include?: Prisma.CertificationInclude<ExtArgs> | null;
    where: Prisma.CertificationWhereUniqueInput;
};
export type CertificationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelect<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    include?: Prisma.CertificationInclude<ExtArgs> | null;
    where?: Prisma.CertificationWhereInput;
    orderBy?: Prisma.CertificationOrderByWithRelationInput | Prisma.CertificationOrderByWithRelationInput[];
    cursor?: Prisma.CertificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CertificationScalarFieldEnum | Prisma.CertificationScalarFieldEnum[];
};
export type CertificationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelect<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    include?: Prisma.CertificationInclude<ExtArgs> | null;
    where?: Prisma.CertificationWhereInput;
    orderBy?: Prisma.CertificationOrderByWithRelationInput | Prisma.CertificationOrderByWithRelationInput[];
    cursor?: Prisma.CertificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CertificationScalarFieldEnum | Prisma.CertificationScalarFieldEnum[];
};
export type CertificationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelect<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    include?: Prisma.CertificationInclude<ExtArgs> | null;
    where?: Prisma.CertificationWhereInput;
    orderBy?: Prisma.CertificationOrderByWithRelationInput | Prisma.CertificationOrderByWithRelationInput[];
    cursor?: Prisma.CertificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CertificationScalarFieldEnum | Prisma.CertificationScalarFieldEnum[];
};
export type CertificationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelect<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    include?: Prisma.CertificationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CertificationCreateInput, Prisma.CertificationUncheckedCreateInput>;
};
export type CertificationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CertificationCreateManyInput | Prisma.CertificationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CertificationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    data: Prisma.CertificationCreateManyInput | Prisma.CertificationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CertificationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CertificationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelect<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    include?: Prisma.CertificationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CertificationUpdateInput, Prisma.CertificationUncheckedUpdateInput>;
    where: Prisma.CertificationWhereUniqueInput;
};
export type CertificationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CertificationUpdateManyMutationInput, Prisma.CertificationUncheckedUpdateManyInput>;
    where?: Prisma.CertificationWhereInput;
    limit?: number;
};
export type CertificationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CertificationUpdateManyMutationInput, Prisma.CertificationUncheckedUpdateManyInput>;
    where?: Prisma.CertificationWhereInput;
    limit?: number;
    include?: Prisma.CertificationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CertificationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelect<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    include?: Prisma.CertificationInclude<ExtArgs> | null;
    where: Prisma.CertificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.CertificationCreateInput, Prisma.CertificationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CertificationUpdateInput, Prisma.CertificationUncheckedUpdateInput>;
};
export type CertificationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelect<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    include?: Prisma.CertificationInclude<ExtArgs> | null;
    where: Prisma.CertificationWhereUniqueInput;
};
export type CertificationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CertificationWhereInput;
    limit?: number;
};
export type Certification$fileArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileAssetSelect<ExtArgs> | null;
    omit?: Prisma.FileAssetOmit<ExtArgs> | null;
    include?: Prisma.FileAssetInclude<ExtArgs> | null;
    where?: Prisma.FileAssetWhereInput;
};
export type CertificationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CertificationSelect<ExtArgs> | null;
    omit?: Prisma.CertificationOmit<ExtArgs> | null;
    include?: Prisma.CertificationInclude<ExtArgs> | null;
};
