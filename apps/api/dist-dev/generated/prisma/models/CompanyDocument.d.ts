import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CompanyDocumentModel = runtime.Types.Result.DefaultSelection<Prisma.$CompanyDocumentPayload>;
export type AggregateCompanyDocument = {
    _count: CompanyDocumentCountAggregateOutputType | null;
    _min: CompanyDocumentMinAggregateOutputType | null;
    _max: CompanyDocumentMaxAggregateOutputType | null;
};
export type CompanyDocumentMinAggregateOutputType = {
    id: string | null;
    companyId: string | null;
    type: $Enums.CompanyDocumentType | null;
    fileId: string | null;
    status: $Enums.ReviewState | null;
    documentNumber: string | null;
    expiresAt: Date | null;
    rejectionReason: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CompanyDocumentMaxAggregateOutputType = {
    id: string | null;
    companyId: string | null;
    type: $Enums.CompanyDocumentType | null;
    fileId: string | null;
    status: $Enums.ReviewState | null;
    documentNumber: string | null;
    expiresAt: Date | null;
    rejectionReason: string | null;
    reviewedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CompanyDocumentCountAggregateOutputType = {
    id: number;
    companyId: number;
    type: number;
    fileId: number;
    status: number;
    documentNumber: number;
    expiresAt: number;
    rejectionReason: number;
    reviewedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CompanyDocumentMinAggregateInputType = {
    id?: true;
    companyId?: true;
    type?: true;
    fileId?: true;
    status?: true;
    documentNumber?: true;
    expiresAt?: true;
    rejectionReason?: true;
    reviewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CompanyDocumentMaxAggregateInputType = {
    id?: true;
    companyId?: true;
    type?: true;
    fileId?: true;
    status?: true;
    documentNumber?: true;
    expiresAt?: true;
    rejectionReason?: true;
    reviewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CompanyDocumentCountAggregateInputType = {
    id?: true;
    companyId?: true;
    type?: true;
    fileId?: true;
    status?: true;
    documentNumber?: true;
    expiresAt?: true;
    rejectionReason?: true;
    reviewedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CompanyDocumentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyDocumentWhereInput;
    orderBy?: Prisma.CompanyDocumentOrderByWithRelationInput | Prisma.CompanyDocumentOrderByWithRelationInput[];
    cursor?: Prisma.CompanyDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CompanyDocumentCountAggregateInputType;
    _min?: CompanyDocumentMinAggregateInputType;
    _max?: CompanyDocumentMaxAggregateInputType;
};
export type GetCompanyDocumentAggregateType<T extends CompanyDocumentAggregateArgs> = {
    [P in keyof T & keyof AggregateCompanyDocument]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCompanyDocument[P]> : Prisma.GetScalarType<T[P], AggregateCompanyDocument[P]>;
};
export type CompanyDocumentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyDocumentWhereInput;
    orderBy?: Prisma.CompanyDocumentOrderByWithAggregationInput | Prisma.CompanyDocumentOrderByWithAggregationInput[];
    by: Prisma.CompanyDocumentScalarFieldEnum[] | Prisma.CompanyDocumentScalarFieldEnum;
    having?: Prisma.CompanyDocumentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CompanyDocumentCountAggregateInputType | true;
    _min?: CompanyDocumentMinAggregateInputType;
    _max?: CompanyDocumentMaxAggregateInputType;
};
export type CompanyDocumentGroupByOutputType = {
    id: string;
    companyId: string;
    type: $Enums.CompanyDocumentType;
    fileId: string;
    status: $Enums.ReviewState;
    documentNumber: string | null;
    expiresAt: Date | null;
    rejectionReason: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CompanyDocumentCountAggregateOutputType | null;
    _min: CompanyDocumentMinAggregateOutputType | null;
    _max: CompanyDocumentMaxAggregateOutputType | null;
};
export type GetCompanyDocumentGroupByPayload<T extends CompanyDocumentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CompanyDocumentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CompanyDocumentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CompanyDocumentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CompanyDocumentGroupByOutputType[P]>;
}>>;
export type CompanyDocumentWhereInput = {
    AND?: Prisma.CompanyDocumentWhereInput | Prisma.CompanyDocumentWhereInput[];
    OR?: Prisma.CompanyDocumentWhereInput[];
    NOT?: Prisma.CompanyDocumentWhereInput | Prisma.CompanyDocumentWhereInput[];
    id?: Prisma.UuidFilter<"CompanyDocument"> | string;
    companyId?: Prisma.UuidFilter<"CompanyDocument"> | string;
    type?: Prisma.EnumCompanyDocumentTypeFilter<"CompanyDocument"> | $Enums.CompanyDocumentType;
    fileId?: Prisma.UuidFilter<"CompanyDocument"> | string;
    status?: Prisma.EnumReviewStateFilter<"CompanyDocument"> | $Enums.ReviewState;
    documentNumber?: Prisma.StringNullableFilter<"CompanyDocument"> | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"CompanyDocument"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"CompanyDocument"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"CompanyDocument"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CompanyDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CompanyDocument"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
};
export type CompanyDocumentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    documentNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    company?: Prisma.CompanyOrderByWithRelationInput;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type CompanyDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.CompanyDocumentWhereInput | Prisma.CompanyDocumentWhereInput[];
    OR?: Prisma.CompanyDocumentWhereInput[];
    NOT?: Prisma.CompanyDocumentWhereInput | Prisma.CompanyDocumentWhereInput[];
    companyId?: Prisma.UuidFilter<"CompanyDocument"> | string;
    type?: Prisma.EnumCompanyDocumentTypeFilter<"CompanyDocument"> | $Enums.CompanyDocumentType;
    status?: Prisma.EnumReviewStateFilter<"CompanyDocument"> | $Enums.ReviewState;
    documentNumber?: Prisma.StringNullableFilter<"CompanyDocument"> | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"CompanyDocument"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"CompanyDocument"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"CompanyDocument"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CompanyDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CompanyDocument"> | Date | string;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
}, "id" | "fileId">;
export type CompanyDocumentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    documentNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CompanyDocumentCountOrderByAggregateInput;
    _max?: Prisma.CompanyDocumentMaxOrderByAggregateInput;
    _min?: Prisma.CompanyDocumentMinOrderByAggregateInput;
};
export type CompanyDocumentScalarWhereWithAggregatesInput = {
    AND?: Prisma.CompanyDocumentScalarWhereWithAggregatesInput | Prisma.CompanyDocumentScalarWhereWithAggregatesInput[];
    OR?: Prisma.CompanyDocumentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CompanyDocumentScalarWhereWithAggregatesInput | Prisma.CompanyDocumentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CompanyDocument"> | string;
    companyId?: Prisma.UuidWithAggregatesFilter<"CompanyDocument"> | string;
    type?: Prisma.EnumCompanyDocumentTypeWithAggregatesFilter<"CompanyDocument"> | $Enums.CompanyDocumentType;
    fileId?: Prisma.UuidWithAggregatesFilter<"CompanyDocument"> | string;
    status?: Prisma.EnumReviewStateWithAggregatesFilter<"CompanyDocument"> | $Enums.ReviewState;
    documentNumber?: Prisma.StringNullableWithAggregatesFilter<"CompanyDocument"> | string | null;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CompanyDocument"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableWithAggregatesFilter<"CompanyDocument"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CompanyDocument"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CompanyDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CompanyDocument"> | Date | string;
};
export type CompanyDocumentCreateInput = {
    id?: string;
    type: $Enums.CompanyDocumentType;
    status?: $Enums.ReviewState;
    documentNumber?: string | null;
    expiresAt?: Date | string | null;
    rejectionReason?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutDocumentsInput;
    file: Prisma.FileAssetCreateNestedOneWithoutCompanyDocumentInput;
};
export type CompanyDocumentUncheckedCreateInput = {
    id?: string;
    companyId: string;
    type: $Enums.CompanyDocumentType;
    fileId: string;
    status?: $Enums.ReviewState;
    documentNumber?: string | null;
    expiresAt?: Date | string | null;
    rejectionReason?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CompanyDocumentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCompanyDocumentTypeFieldUpdateOperationsInput | $Enums.CompanyDocumentType;
    status?: Prisma.EnumReviewStateFieldUpdateOperationsInput | $Enums.ReviewState;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutDocumentsNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutCompanyDocumentNestedInput;
};
export type CompanyDocumentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCompanyDocumentTypeFieldUpdateOperationsInput | $Enums.CompanyDocumentType;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReviewStateFieldUpdateOperationsInput | $Enums.ReviewState;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyDocumentCreateManyInput = {
    id?: string;
    companyId: string;
    type: $Enums.CompanyDocumentType;
    fileId: string;
    status?: $Enums.ReviewState;
    documentNumber?: string | null;
    expiresAt?: Date | string | null;
    rejectionReason?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CompanyDocumentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCompanyDocumentTypeFieldUpdateOperationsInput | $Enums.CompanyDocumentType;
    status?: Prisma.EnumReviewStateFieldUpdateOperationsInput | $Enums.ReviewState;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyDocumentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCompanyDocumentTypeFieldUpdateOperationsInput | $Enums.CompanyDocumentType;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReviewStateFieldUpdateOperationsInput | $Enums.ReviewState;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyDocumentListRelationFilter = {
    every?: Prisma.CompanyDocumentWhereInput;
    some?: Prisma.CompanyDocumentWhereInput;
    none?: Prisma.CompanyDocumentWhereInput;
};
export type CompanyDocumentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CompanyDocumentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    documentNumber?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CompanyDocumentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    documentNumber?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CompanyDocumentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    documentNumber?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CompanyDocumentNullableScalarRelationFilter = {
    is?: Prisma.CompanyDocumentWhereInput | null;
    isNot?: Prisma.CompanyDocumentWhereInput | null;
};
export type CompanyDocumentCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutCompanyInput, Prisma.CompanyDocumentUncheckedCreateWithoutCompanyInput> | Prisma.CompanyDocumentCreateWithoutCompanyInput[] | Prisma.CompanyDocumentUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.CompanyDocumentCreateOrConnectWithoutCompanyInput | Prisma.CompanyDocumentCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.CompanyDocumentCreateManyCompanyInputEnvelope;
    connect?: Prisma.CompanyDocumentWhereUniqueInput | Prisma.CompanyDocumentWhereUniqueInput[];
};
export type CompanyDocumentUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutCompanyInput, Prisma.CompanyDocumentUncheckedCreateWithoutCompanyInput> | Prisma.CompanyDocumentCreateWithoutCompanyInput[] | Prisma.CompanyDocumentUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.CompanyDocumentCreateOrConnectWithoutCompanyInput | Prisma.CompanyDocumentCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.CompanyDocumentCreateManyCompanyInputEnvelope;
    connect?: Prisma.CompanyDocumentWhereUniqueInput | Prisma.CompanyDocumentWhereUniqueInput[];
};
export type CompanyDocumentUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutCompanyInput, Prisma.CompanyDocumentUncheckedCreateWithoutCompanyInput> | Prisma.CompanyDocumentCreateWithoutCompanyInput[] | Prisma.CompanyDocumentUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.CompanyDocumentCreateOrConnectWithoutCompanyInput | Prisma.CompanyDocumentCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.CompanyDocumentUpsertWithWhereUniqueWithoutCompanyInput | Prisma.CompanyDocumentUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.CompanyDocumentCreateManyCompanyInputEnvelope;
    set?: Prisma.CompanyDocumentWhereUniqueInput | Prisma.CompanyDocumentWhereUniqueInput[];
    disconnect?: Prisma.CompanyDocumentWhereUniqueInput | Prisma.CompanyDocumentWhereUniqueInput[];
    delete?: Prisma.CompanyDocumentWhereUniqueInput | Prisma.CompanyDocumentWhereUniqueInput[];
    connect?: Prisma.CompanyDocumentWhereUniqueInput | Prisma.CompanyDocumentWhereUniqueInput[];
    update?: Prisma.CompanyDocumentUpdateWithWhereUniqueWithoutCompanyInput | Prisma.CompanyDocumentUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.CompanyDocumentUpdateManyWithWhereWithoutCompanyInput | Prisma.CompanyDocumentUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.CompanyDocumentScalarWhereInput | Prisma.CompanyDocumentScalarWhereInput[];
};
export type CompanyDocumentUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutCompanyInput, Prisma.CompanyDocumentUncheckedCreateWithoutCompanyInput> | Prisma.CompanyDocumentCreateWithoutCompanyInput[] | Prisma.CompanyDocumentUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.CompanyDocumentCreateOrConnectWithoutCompanyInput | Prisma.CompanyDocumentCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.CompanyDocumentUpsertWithWhereUniqueWithoutCompanyInput | Prisma.CompanyDocumentUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.CompanyDocumentCreateManyCompanyInputEnvelope;
    set?: Prisma.CompanyDocumentWhereUniqueInput | Prisma.CompanyDocumentWhereUniqueInput[];
    disconnect?: Prisma.CompanyDocumentWhereUniqueInput | Prisma.CompanyDocumentWhereUniqueInput[];
    delete?: Prisma.CompanyDocumentWhereUniqueInput | Prisma.CompanyDocumentWhereUniqueInput[];
    connect?: Prisma.CompanyDocumentWhereUniqueInput | Prisma.CompanyDocumentWhereUniqueInput[];
    update?: Prisma.CompanyDocumentUpdateWithWhereUniqueWithoutCompanyInput | Prisma.CompanyDocumentUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.CompanyDocumentUpdateManyWithWhereWithoutCompanyInput | Prisma.CompanyDocumentUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.CompanyDocumentScalarWhereInput | Prisma.CompanyDocumentScalarWhereInput[];
};
export type EnumCompanyDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.CompanyDocumentType;
};
export type EnumReviewStateFieldUpdateOperationsInput = {
    set?: $Enums.ReviewState;
};
export type CompanyDocumentCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutFileInput, Prisma.CompanyDocumentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.CompanyDocumentCreateOrConnectWithoutFileInput;
    connect?: Prisma.CompanyDocumentWhereUniqueInput;
};
export type CompanyDocumentUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutFileInput, Prisma.CompanyDocumentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.CompanyDocumentCreateOrConnectWithoutFileInput;
    connect?: Prisma.CompanyDocumentWhereUniqueInput;
};
export type CompanyDocumentUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutFileInput, Prisma.CompanyDocumentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.CompanyDocumentCreateOrConnectWithoutFileInput;
    upsert?: Prisma.CompanyDocumentUpsertWithoutFileInput;
    disconnect?: Prisma.CompanyDocumentWhereInput | boolean;
    delete?: Prisma.CompanyDocumentWhereInput | boolean;
    connect?: Prisma.CompanyDocumentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CompanyDocumentUpdateToOneWithWhereWithoutFileInput, Prisma.CompanyDocumentUpdateWithoutFileInput>, Prisma.CompanyDocumentUncheckedUpdateWithoutFileInput>;
};
export type CompanyDocumentUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutFileInput, Prisma.CompanyDocumentUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.CompanyDocumentCreateOrConnectWithoutFileInput;
    upsert?: Prisma.CompanyDocumentUpsertWithoutFileInput;
    disconnect?: Prisma.CompanyDocumentWhereInput | boolean;
    delete?: Prisma.CompanyDocumentWhereInput | boolean;
    connect?: Prisma.CompanyDocumentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CompanyDocumentUpdateToOneWithWhereWithoutFileInput, Prisma.CompanyDocumentUpdateWithoutFileInput>, Prisma.CompanyDocumentUncheckedUpdateWithoutFileInput>;
};
export type CompanyDocumentCreateWithoutCompanyInput = {
    id?: string;
    type: $Enums.CompanyDocumentType;
    status?: $Enums.ReviewState;
    documentNumber?: string | null;
    expiresAt?: Date | string | null;
    rejectionReason?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    file: Prisma.FileAssetCreateNestedOneWithoutCompanyDocumentInput;
};
export type CompanyDocumentUncheckedCreateWithoutCompanyInput = {
    id?: string;
    type: $Enums.CompanyDocumentType;
    fileId: string;
    status?: $Enums.ReviewState;
    documentNumber?: string | null;
    expiresAt?: Date | string | null;
    rejectionReason?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CompanyDocumentCreateOrConnectWithoutCompanyInput = {
    where: Prisma.CompanyDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutCompanyInput, Prisma.CompanyDocumentUncheckedCreateWithoutCompanyInput>;
};
export type CompanyDocumentCreateManyCompanyInputEnvelope = {
    data: Prisma.CompanyDocumentCreateManyCompanyInput | Prisma.CompanyDocumentCreateManyCompanyInput[];
    skipDuplicates?: boolean;
};
export type CompanyDocumentUpsertWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.CompanyDocumentWhereUniqueInput;
    update: Prisma.XOR<Prisma.CompanyDocumentUpdateWithoutCompanyInput, Prisma.CompanyDocumentUncheckedUpdateWithoutCompanyInput>;
    create: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutCompanyInput, Prisma.CompanyDocumentUncheckedCreateWithoutCompanyInput>;
};
export type CompanyDocumentUpdateWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.CompanyDocumentWhereUniqueInput;
    data: Prisma.XOR<Prisma.CompanyDocumentUpdateWithoutCompanyInput, Prisma.CompanyDocumentUncheckedUpdateWithoutCompanyInput>;
};
export type CompanyDocumentUpdateManyWithWhereWithoutCompanyInput = {
    where: Prisma.CompanyDocumentScalarWhereInput;
    data: Prisma.XOR<Prisma.CompanyDocumentUpdateManyMutationInput, Prisma.CompanyDocumentUncheckedUpdateManyWithoutCompanyInput>;
};
export type CompanyDocumentScalarWhereInput = {
    AND?: Prisma.CompanyDocumentScalarWhereInput | Prisma.CompanyDocumentScalarWhereInput[];
    OR?: Prisma.CompanyDocumentScalarWhereInput[];
    NOT?: Prisma.CompanyDocumentScalarWhereInput | Prisma.CompanyDocumentScalarWhereInput[];
    id?: Prisma.UuidFilter<"CompanyDocument"> | string;
    companyId?: Prisma.UuidFilter<"CompanyDocument"> | string;
    type?: Prisma.EnumCompanyDocumentTypeFilter<"CompanyDocument"> | $Enums.CompanyDocumentType;
    fileId?: Prisma.UuidFilter<"CompanyDocument"> | string;
    status?: Prisma.EnumReviewStateFilter<"CompanyDocument"> | $Enums.ReviewState;
    documentNumber?: Prisma.StringNullableFilter<"CompanyDocument"> | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"CompanyDocument"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"CompanyDocument"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"CompanyDocument"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CompanyDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CompanyDocument"> | Date | string;
};
export type CompanyDocumentCreateWithoutFileInput = {
    id?: string;
    type: $Enums.CompanyDocumentType;
    status?: $Enums.ReviewState;
    documentNumber?: string | null;
    expiresAt?: Date | string | null;
    rejectionReason?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    company: Prisma.CompanyCreateNestedOneWithoutDocumentsInput;
};
export type CompanyDocumentUncheckedCreateWithoutFileInput = {
    id?: string;
    companyId: string;
    type: $Enums.CompanyDocumentType;
    status?: $Enums.ReviewState;
    documentNumber?: string | null;
    expiresAt?: Date | string | null;
    rejectionReason?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CompanyDocumentCreateOrConnectWithoutFileInput = {
    where: Prisma.CompanyDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutFileInput, Prisma.CompanyDocumentUncheckedCreateWithoutFileInput>;
};
export type CompanyDocumentUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.CompanyDocumentUpdateWithoutFileInput, Prisma.CompanyDocumentUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.CompanyDocumentCreateWithoutFileInput, Prisma.CompanyDocumentUncheckedCreateWithoutFileInput>;
    where?: Prisma.CompanyDocumentWhereInput;
};
export type CompanyDocumentUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.CompanyDocumentWhereInput;
    data: Prisma.XOR<Prisma.CompanyDocumentUpdateWithoutFileInput, Prisma.CompanyDocumentUncheckedUpdateWithoutFileInput>;
};
export type CompanyDocumentUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCompanyDocumentTypeFieldUpdateOperationsInput | $Enums.CompanyDocumentType;
    status?: Prisma.EnumReviewStateFieldUpdateOperationsInput | $Enums.ReviewState;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    company?: Prisma.CompanyUpdateOneRequiredWithoutDocumentsNestedInput;
};
export type CompanyDocumentUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCompanyDocumentTypeFieldUpdateOperationsInput | $Enums.CompanyDocumentType;
    status?: Prisma.EnumReviewStateFieldUpdateOperationsInput | $Enums.ReviewState;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyDocumentCreateManyCompanyInput = {
    id?: string;
    type: $Enums.CompanyDocumentType;
    fileId: string;
    status?: $Enums.ReviewState;
    documentNumber?: string | null;
    expiresAt?: Date | string | null;
    rejectionReason?: string | null;
    reviewedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CompanyDocumentUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCompanyDocumentTypeFieldUpdateOperationsInput | $Enums.CompanyDocumentType;
    status?: Prisma.EnumReviewStateFieldUpdateOperationsInput | $Enums.ReviewState;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutCompanyDocumentNestedInput;
};
export type CompanyDocumentUncheckedUpdateWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCompanyDocumentTypeFieldUpdateOperationsInput | $Enums.CompanyDocumentType;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReviewStateFieldUpdateOperationsInput | $Enums.ReviewState;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyDocumentUncheckedUpdateManyWithoutCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumCompanyDocumentTypeFieldUpdateOperationsInput | $Enums.CompanyDocumentType;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumReviewStateFieldUpdateOperationsInput | $Enums.ReviewState;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyDocumentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyId?: boolean;
    type?: boolean;
    fileId?: boolean;
    status?: boolean;
    documentNumber?: boolean;
    expiresAt?: boolean;
    rejectionReason?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["companyDocument"]>;
export type CompanyDocumentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyId?: boolean;
    type?: boolean;
    fileId?: boolean;
    status?: boolean;
    documentNumber?: boolean;
    expiresAt?: boolean;
    rejectionReason?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["companyDocument"]>;
export type CompanyDocumentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyId?: boolean;
    type?: boolean;
    fileId?: boolean;
    status?: boolean;
    documentNumber?: boolean;
    expiresAt?: boolean;
    rejectionReason?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["companyDocument"]>;
export type CompanyDocumentSelectScalar = {
    id?: boolean;
    companyId?: boolean;
    type?: boolean;
    fileId?: boolean;
    status?: boolean;
    documentNumber?: boolean;
    expiresAt?: boolean;
    rejectionReason?: boolean;
    reviewedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CompanyDocumentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "companyId" | "type" | "fileId" | "status" | "documentNumber" | "expiresAt" | "rejectionReason" | "reviewedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["companyDocument"]>;
export type CompanyDocumentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type CompanyDocumentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type CompanyDocumentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type $CompanyDocumentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CompanyDocument";
    objects: {
        company: Prisma.$CompanyPayload<ExtArgs>;
        file: Prisma.$FileAssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        companyId: string;
        type: $Enums.CompanyDocumentType;
        fileId: string;
        status: $Enums.ReviewState;
        documentNumber: string | null;
        expiresAt: Date | null;
        rejectionReason: string | null;
        reviewedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["companyDocument"]>;
    composites: {};
};
export type CompanyDocumentGetPayload<S extends boolean | null | undefined | CompanyDocumentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload, S>;
export type CompanyDocumentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CompanyDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CompanyDocumentCountAggregateInputType | true;
};
export interface CompanyDocumentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CompanyDocument'];
        meta: {
            name: 'CompanyDocument';
        };
    };
    findUnique<T extends CompanyDocumentFindUniqueArgs>(args: Prisma.SelectSubset<T, CompanyDocumentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CompanyDocumentClient<runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CompanyDocumentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CompanyDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CompanyDocumentClient<runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CompanyDocumentFindFirstArgs>(args?: Prisma.SelectSubset<T, CompanyDocumentFindFirstArgs<ExtArgs>>): Prisma.Prisma__CompanyDocumentClient<runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CompanyDocumentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CompanyDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CompanyDocumentClient<runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CompanyDocumentFindManyArgs>(args?: Prisma.SelectSubset<T, CompanyDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CompanyDocumentCreateArgs>(args: Prisma.SelectSubset<T, CompanyDocumentCreateArgs<ExtArgs>>): Prisma.Prisma__CompanyDocumentClient<runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CompanyDocumentCreateManyArgs>(args?: Prisma.SelectSubset<T, CompanyDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CompanyDocumentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CompanyDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CompanyDocumentDeleteArgs>(args: Prisma.SelectSubset<T, CompanyDocumentDeleteArgs<ExtArgs>>): Prisma.Prisma__CompanyDocumentClient<runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CompanyDocumentUpdateArgs>(args: Prisma.SelectSubset<T, CompanyDocumentUpdateArgs<ExtArgs>>): Prisma.Prisma__CompanyDocumentClient<runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CompanyDocumentDeleteManyArgs>(args?: Prisma.SelectSubset<T, CompanyDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CompanyDocumentUpdateManyArgs>(args: Prisma.SelectSubset<T, CompanyDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CompanyDocumentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CompanyDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CompanyDocumentUpsertArgs>(args: Prisma.SelectSubset<T, CompanyDocumentUpsertArgs<ExtArgs>>): Prisma.Prisma__CompanyDocumentClient<runtime.Types.Result.GetResult<Prisma.$CompanyDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CompanyDocumentCountArgs>(args?: Prisma.Subset<T, CompanyDocumentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CompanyDocumentCountAggregateOutputType> : number>;
    aggregate<T extends CompanyDocumentAggregateArgs>(args: Prisma.Subset<T, CompanyDocumentAggregateArgs>): Prisma.PrismaPromise<GetCompanyDocumentAggregateType<T>>;
    groupBy<T extends CompanyDocumentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CompanyDocumentGroupByArgs['orderBy'];
    } : {
        orderBy?: CompanyDocumentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CompanyDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CompanyDocumentFieldRefs;
}
export interface Prisma__CompanyDocumentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    company<T extends Prisma.CompanyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CompanyDefaultArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    file<T extends Prisma.FileAssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileAssetDefaultArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CompanyDocumentFieldRefs {
    readonly id: Prisma.FieldRef<"CompanyDocument", 'String'>;
    readonly companyId: Prisma.FieldRef<"CompanyDocument", 'String'>;
    readonly type: Prisma.FieldRef<"CompanyDocument", 'CompanyDocumentType'>;
    readonly fileId: Prisma.FieldRef<"CompanyDocument", 'String'>;
    readonly status: Prisma.FieldRef<"CompanyDocument", 'ReviewState'>;
    readonly documentNumber: Prisma.FieldRef<"CompanyDocument", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"CompanyDocument", 'DateTime'>;
    readonly rejectionReason: Prisma.FieldRef<"CompanyDocument", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"CompanyDocument", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"CompanyDocument", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CompanyDocument", 'DateTime'>;
}
export type CompanyDocumentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelect<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    include?: Prisma.CompanyDocumentInclude<ExtArgs> | null;
    where: Prisma.CompanyDocumentWhereUniqueInput;
};
export type CompanyDocumentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelect<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    include?: Prisma.CompanyDocumentInclude<ExtArgs> | null;
    where: Prisma.CompanyDocumentWhereUniqueInput;
};
export type CompanyDocumentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelect<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    include?: Prisma.CompanyDocumentInclude<ExtArgs> | null;
    where?: Prisma.CompanyDocumentWhereInput;
    orderBy?: Prisma.CompanyDocumentOrderByWithRelationInput | Prisma.CompanyDocumentOrderByWithRelationInput[];
    cursor?: Prisma.CompanyDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyDocumentScalarFieldEnum | Prisma.CompanyDocumentScalarFieldEnum[];
};
export type CompanyDocumentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelect<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    include?: Prisma.CompanyDocumentInclude<ExtArgs> | null;
    where?: Prisma.CompanyDocumentWhereInput;
    orderBy?: Prisma.CompanyDocumentOrderByWithRelationInput | Prisma.CompanyDocumentOrderByWithRelationInput[];
    cursor?: Prisma.CompanyDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyDocumentScalarFieldEnum | Prisma.CompanyDocumentScalarFieldEnum[];
};
export type CompanyDocumentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelect<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    include?: Prisma.CompanyDocumentInclude<ExtArgs> | null;
    where?: Prisma.CompanyDocumentWhereInput;
    orderBy?: Prisma.CompanyDocumentOrderByWithRelationInput | Prisma.CompanyDocumentOrderByWithRelationInput[];
    cursor?: Prisma.CompanyDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyDocumentScalarFieldEnum | Prisma.CompanyDocumentScalarFieldEnum[];
};
export type CompanyDocumentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelect<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    include?: Prisma.CompanyDocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyDocumentCreateInput, Prisma.CompanyDocumentUncheckedCreateInput>;
};
export type CompanyDocumentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CompanyDocumentCreateManyInput | Prisma.CompanyDocumentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CompanyDocumentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    data: Prisma.CompanyDocumentCreateManyInput | Prisma.CompanyDocumentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CompanyDocumentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CompanyDocumentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelect<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    include?: Prisma.CompanyDocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyDocumentUpdateInput, Prisma.CompanyDocumentUncheckedUpdateInput>;
    where: Prisma.CompanyDocumentWhereUniqueInput;
};
export type CompanyDocumentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CompanyDocumentUpdateManyMutationInput, Prisma.CompanyDocumentUncheckedUpdateManyInput>;
    where?: Prisma.CompanyDocumentWhereInput;
    limit?: number;
};
export type CompanyDocumentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyDocumentUpdateManyMutationInput, Prisma.CompanyDocumentUncheckedUpdateManyInput>;
    where?: Prisma.CompanyDocumentWhereInput;
    limit?: number;
    include?: Prisma.CompanyDocumentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CompanyDocumentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelect<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    include?: Prisma.CompanyDocumentInclude<ExtArgs> | null;
    where: Prisma.CompanyDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CompanyDocumentCreateInput, Prisma.CompanyDocumentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CompanyDocumentUpdateInput, Prisma.CompanyDocumentUncheckedUpdateInput>;
};
export type CompanyDocumentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelect<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    include?: Prisma.CompanyDocumentInclude<ExtArgs> | null;
    where: Prisma.CompanyDocumentWhereUniqueInput;
};
export type CompanyDocumentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyDocumentWhereInput;
    limit?: number;
};
export type CompanyDocumentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyDocumentSelect<ExtArgs> | null;
    omit?: Prisma.CompanyDocumentOmit<ExtArgs> | null;
    include?: Prisma.CompanyDocumentInclude<ExtArgs> | null;
};
