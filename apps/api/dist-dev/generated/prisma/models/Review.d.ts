import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReviewModel = runtime.Types.Result.DefaultSelection<Prisma.$ReviewPayload>;
export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
};
export type ReviewAvgAggregateOutputType = {
    rating: number | null;
    qualityRating: number | null;
    communicationRating: number | null;
    deliveryRating: number | null;
};
export type ReviewSumAggregateOutputType = {
    rating: number | null;
    qualityRating: number | null;
    communicationRating: number | null;
    deliveryRating: number | null;
};
export type ReviewMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    authorCompanyId: string | null;
    subjectCompanyId: string | null;
    direction: $Enums.ReviewDirection | null;
    manufacturerProfileId: string | null;
    rating: number | null;
    qualityRating: number | null;
    communicationRating: number | null;
    deliveryRating: number | null;
    comment: string | null;
    commentFiltered: string | null;
    status: $Enums.ReviewStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReviewMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    authorCompanyId: string | null;
    subjectCompanyId: string | null;
    direction: $Enums.ReviewDirection | null;
    manufacturerProfileId: string | null;
    rating: number | null;
    qualityRating: number | null;
    communicationRating: number | null;
    deliveryRating: number | null;
    comment: string | null;
    commentFiltered: string | null;
    status: $Enums.ReviewStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReviewCountAggregateOutputType = {
    id: number;
    orderId: number;
    authorCompanyId: number;
    subjectCompanyId: number;
    direction: number;
    manufacturerProfileId: number;
    rating: number;
    qualityRating: number;
    communicationRating: number;
    deliveryRating: number;
    comment: number;
    commentFiltered: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ReviewAvgAggregateInputType = {
    rating?: true;
    qualityRating?: true;
    communicationRating?: true;
    deliveryRating?: true;
};
export type ReviewSumAggregateInputType = {
    rating?: true;
    qualityRating?: true;
    communicationRating?: true;
    deliveryRating?: true;
};
export type ReviewMinAggregateInputType = {
    id?: true;
    orderId?: true;
    authorCompanyId?: true;
    subjectCompanyId?: true;
    direction?: true;
    manufacturerProfileId?: true;
    rating?: true;
    qualityRating?: true;
    communicationRating?: true;
    deliveryRating?: true;
    comment?: true;
    commentFiltered?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReviewMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    authorCompanyId?: true;
    subjectCompanyId?: true;
    direction?: true;
    manufacturerProfileId?: true;
    rating?: true;
    qualityRating?: true;
    communicationRating?: true;
    deliveryRating?: true;
    comment?: true;
    commentFiltered?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReviewCountAggregateInputType = {
    id?: true;
    orderId?: true;
    authorCompanyId?: true;
    subjectCompanyId?: true;
    direction?: true;
    manufacturerProfileId?: true;
    rating?: true;
    qualityRating?: true;
    communicationRating?: true;
    deliveryRating?: true;
    comment?: true;
    commentFiltered?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ReviewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReviewCountAggregateInputType;
    _avg?: ReviewAvgAggregateInputType;
    _sum?: ReviewSumAggregateInputType;
    _min?: ReviewMinAggregateInputType;
    _max?: ReviewMaxAggregateInputType;
};
export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
    [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReview[P]> : Prisma.GetScalarType<T[P], AggregateReview[P]>;
};
export type ReviewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithAggregationInput | Prisma.ReviewOrderByWithAggregationInput[];
    by: Prisma.ReviewScalarFieldEnum[] | Prisma.ReviewScalarFieldEnum;
    having?: Prisma.ReviewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReviewCountAggregateInputType | true;
    _avg?: ReviewAvgAggregateInputType;
    _sum?: ReviewSumAggregateInputType;
    _min?: ReviewMinAggregateInputType;
    _max?: ReviewMaxAggregateInputType;
};
export type ReviewGroupByOutputType = {
    id: string;
    orderId: string;
    authorCompanyId: string;
    subjectCompanyId: string;
    direction: $Enums.ReviewDirection;
    manufacturerProfileId: string;
    rating: number;
    qualityRating: number | null;
    communicationRating: number | null;
    deliveryRating: number | null;
    comment: string | null;
    commentFiltered: string | null;
    status: $Enums.ReviewStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
};
export type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReviewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReviewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReviewGroupByOutputType[P]>;
}>>;
export type ReviewWhereInput = {
    AND?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    OR?: Prisma.ReviewWhereInput[];
    NOT?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    id?: Prisma.UuidFilter<"Review"> | string;
    orderId?: Prisma.UuidFilter<"Review"> | string;
    authorCompanyId?: Prisma.UuidFilter<"Review"> | string;
    subjectCompanyId?: Prisma.UuidFilter<"Review"> | string;
    direction?: Prisma.EnumReviewDirectionFilter<"Review"> | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.UuidFilter<"Review"> | string;
    rating?: Prisma.IntFilter<"Review"> | number;
    qualityRating?: Prisma.IntNullableFilter<"Review"> | number | null;
    communicationRating?: Prisma.IntNullableFilter<"Review"> | number | null;
    deliveryRating?: Prisma.IntNullableFilter<"Review"> | number | null;
    comment?: Prisma.StringNullableFilter<"Review"> | string | null;
    commentFiltered?: Prisma.StringNullableFilter<"Review"> | string | null;
    status?: Prisma.EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    authorCompany?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    subjectCompany?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
};
export type ReviewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    authorCompanyId?: Prisma.SortOrder;
    subjectCompanyId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    qualityRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    communicationRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    deliveryRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentFiltered?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
    authorCompany?: Prisma.CompanyOrderByWithRelationInput;
    subjectCompany?: Prisma.CompanyOrderByWithRelationInput;
    manufacturerProfile?: Prisma.ManufacturerProfileOrderByWithRelationInput;
};
export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    orderId_authorCompanyId?: Prisma.ReviewOrderIdAuthorCompanyIdCompoundUniqueInput;
    AND?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    OR?: Prisma.ReviewWhereInput[];
    NOT?: Prisma.ReviewWhereInput | Prisma.ReviewWhereInput[];
    orderId?: Prisma.UuidFilter<"Review"> | string;
    authorCompanyId?: Prisma.UuidFilter<"Review"> | string;
    subjectCompanyId?: Prisma.UuidFilter<"Review"> | string;
    direction?: Prisma.EnumReviewDirectionFilter<"Review"> | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.UuidFilter<"Review"> | string;
    rating?: Prisma.IntFilter<"Review"> | number;
    qualityRating?: Prisma.IntNullableFilter<"Review"> | number | null;
    communicationRating?: Prisma.IntNullableFilter<"Review"> | number | null;
    deliveryRating?: Prisma.IntNullableFilter<"Review"> | number | null;
    comment?: Prisma.StringNullableFilter<"Review"> | string | null;
    commentFiltered?: Prisma.StringNullableFilter<"Review"> | string | null;
    status?: Prisma.EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
    authorCompany?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    subjectCompany?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
}, "id" | "orderId_authorCompanyId">;
export type ReviewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    authorCompanyId?: Prisma.SortOrder;
    subjectCompanyId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    qualityRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    communicationRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    deliveryRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentFiltered?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ReviewCountOrderByAggregateInput;
    _avg?: Prisma.ReviewAvgOrderByAggregateInput;
    _max?: Prisma.ReviewMaxOrderByAggregateInput;
    _min?: Prisma.ReviewMinOrderByAggregateInput;
    _sum?: Prisma.ReviewSumOrderByAggregateInput;
};
export type ReviewScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReviewScalarWhereWithAggregatesInput | Prisma.ReviewScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReviewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReviewScalarWhereWithAggregatesInput | Prisma.ReviewScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Review"> | string;
    orderId?: Prisma.UuidWithAggregatesFilter<"Review"> | string;
    authorCompanyId?: Prisma.UuidWithAggregatesFilter<"Review"> | string;
    subjectCompanyId?: Prisma.UuidWithAggregatesFilter<"Review"> | string;
    direction?: Prisma.EnumReviewDirectionWithAggregatesFilter<"Review"> | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.UuidWithAggregatesFilter<"Review"> | string;
    rating?: Prisma.IntWithAggregatesFilter<"Review"> | number;
    qualityRating?: Prisma.IntNullableWithAggregatesFilter<"Review"> | number | null;
    communicationRating?: Prisma.IntNullableWithAggregatesFilter<"Review"> | number | null;
    deliveryRating?: Prisma.IntNullableWithAggregatesFilter<"Review"> | number | null;
    comment?: Prisma.StringNullableWithAggregatesFilter<"Review"> | string | null;
    commentFiltered?: Prisma.StringNullableWithAggregatesFilter<"Review"> | string | null;
    status?: Prisma.EnumReviewStatusWithAggregatesFilter<"Review"> | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Review"> | Date | string;
};
export type ReviewCreateInput = {
    id?: string;
    direction: $Enums.ReviewDirection;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutReviewsInput;
    authorCompany: Prisma.CompanyCreateNestedOneWithoutReviewsWrittenInput;
    subjectCompany: Prisma.CompanyCreateNestedOneWithoutReviewsReceivedInput;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutReviewsReceivedInput;
};
export type ReviewUncheckedCreateInput = {
    id?: string;
    orderId: string;
    authorCompanyId: string;
    subjectCompanyId: string;
    direction: $Enums.ReviewDirection;
    manufacturerProfileId: string;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutReviewsNestedInput;
    authorCompany?: Prisma.CompanyUpdateOneRequiredWithoutReviewsWrittenNestedInput;
    subjectCompany?: Prisma.CompanyUpdateOneRequiredWithoutReviewsReceivedNestedInput;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutReviewsReceivedNestedInput;
};
export type ReviewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewCreateManyInput = {
    id?: string;
    orderId: string;
    authorCompanyId: string;
    subjectCompanyId: string;
    direction: $Enums.ReviewDirection;
    manufacturerProfileId: string;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewListRelationFilter = {
    every?: Prisma.ReviewWhereInput;
    some?: Prisma.ReviewWhereInput;
    none?: Prisma.ReviewWhereInput;
};
export type ReviewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReviewOrderIdAuthorCompanyIdCompoundUniqueInput = {
    orderId: string;
    authorCompanyId: string;
};
export type ReviewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    authorCompanyId?: Prisma.SortOrder;
    subjectCompanyId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    qualityRating?: Prisma.SortOrder;
    communicationRating?: Prisma.SortOrder;
    deliveryRating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    commentFiltered?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReviewAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    qualityRating?: Prisma.SortOrder;
    communicationRating?: Prisma.SortOrder;
    deliveryRating?: Prisma.SortOrder;
};
export type ReviewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    authorCompanyId?: Prisma.SortOrder;
    subjectCompanyId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    qualityRating?: Prisma.SortOrder;
    communicationRating?: Prisma.SortOrder;
    deliveryRating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    commentFiltered?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReviewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    authorCompanyId?: Prisma.SortOrder;
    subjectCompanyId?: Prisma.SortOrder;
    direction?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    qualityRating?: Prisma.SortOrder;
    communicationRating?: Prisma.SortOrder;
    deliveryRating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    commentFiltered?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReviewSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    qualityRating?: Prisma.SortOrder;
    communicationRating?: Prisma.SortOrder;
    deliveryRating?: Prisma.SortOrder;
};
export type ReviewCreateNestedManyWithoutAuthorCompanyInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutAuthorCompanyInput, Prisma.ReviewUncheckedCreateWithoutAuthorCompanyInput> | Prisma.ReviewCreateWithoutAuthorCompanyInput[] | Prisma.ReviewUncheckedCreateWithoutAuthorCompanyInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutAuthorCompanyInput | Prisma.ReviewCreateOrConnectWithoutAuthorCompanyInput[];
    createMany?: Prisma.ReviewCreateManyAuthorCompanyInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewCreateNestedManyWithoutSubjectCompanyInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutSubjectCompanyInput, Prisma.ReviewUncheckedCreateWithoutSubjectCompanyInput> | Prisma.ReviewCreateWithoutSubjectCompanyInput[] | Prisma.ReviewUncheckedCreateWithoutSubjectCompanyInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutSubjectCompanyInput | Prisma.ReviewCreateOrConnectWithoutSubjectCompanyInput[];
    createMany?: Prisma.ReviewCreateManySubjectCompanyInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutAuthorCompanyInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutAuthorCompanyInput, Prisma.ReviewUncheckedCreateWithoutAuthorCompanyInput> | Prisma.ReviewCreateWithoutAuthorCompanyInput[] | Prisma.ReviewUncheckedCreateWithoutAuthorCompanyInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutAuthorCompanyInput | Prisma.ReviewCreateOrConnectWithoutAuthorCompanyInput[];
    createMany?: Prisma.ReviewCreateManyAuthorCompanyInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutSubjectCompanyInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutSubjectCompanyInput, Prisma.ReviewUncheckedCreateWithoutSubjectCompanyInput> | Prisma.ReviewCreateWithoutSubjectCompanyInput[] | Prisma.ReviewUncheckedCreateWithoutSubjectCompanyInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutSubjectCompanyInput | Prisma.ReviewCreateOrConnectWithoutSubjectCompanyInput[];
    createMany?: Prisma.ReviewCreateManySubjectCompanyInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUpdateManyWithoutAuthorCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutAuthorCompanyInput, Prisma.ReviewUncheckedCreateWithoutAuthorCompanyInput> | Prisma.ReviewCreateWithoutAuthorCompanyInput[] | Prisma.ReviewUncheckedCreateWithoutAuthorCompanyInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutAuthorCompanyInput | Prisma.ReviewCreateOrConnectWithoutAuthorCompanyInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutAuthorCompanyInput | Prisma.ReviewUpsertWithWhereUniqueWithoutAuthorCompanyInput[];
    createMany?: Prisma.ReviewCreateManyAuthorCompanyInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutAuthorCompanyInput | Prisma.ReviewUpdateWithWhereUniqueWithoutAuthorCompanyInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutAuthorCompanyInput | Prisma.ReviewUpdateManyWithWhereWithoutAuthorCompanyInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUpdateManyWithoutSubjectCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutSubjectCompanyInput, Prisma.ReviewUncheckedCreateWithoutSubjectCompanyInput> | Prisma.ReviewCreateWithoutSubjectCompanyInput[] | Prisma.ReviewUncheckedCreateWithoutSubjectCompanyInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutSubjectCompanyInput | Prisma.ReviewCreateOrConnectWithoutSubjectCompanyInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutSubjectCompanyInput | Prisma.ReviewUpsertWithWhereUniqueWithoutSubjectCompanyInput[];
    createMany?: Prisma.ReviewCreateManySubjectCompanyInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutSubjectCompanyInput | Prisma.ReviewUpdateWithWhereUniqueWithoutSubjectCompanyInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutSubjectCompanyInput | Prisma.ReviewUpdateManyWithWhereWithoutSubjectCompanyInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutAuthorCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutAuthorCompanyInput, Prisma.ReviewUncheckedCreateWithoutAuthorCompanyInput> | Prisma.ReviewCreateWithoutAuthorCompanyInput[] | Prisma.ReviewUncheckedCreateWithoutAuthorCompanyInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutAuthorCompanyInput | Prisma.ReviewCreateOrConnectWithoutAuthorCompanyInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutAuthorCompanyInput | Prisma.ReviewUpsertWithWhereUniqueWithoutAuthorCompanyInput[];
    createMany?: Prisma.ReviewCreateManyAuthorCompanyInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutAuthorCompanyInput | Prisma.ReviewUpdateWithWhereUniqueWithoutAuthorCompanyInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutAuthorCompanyInput | Prisma.ReviewUpdateManyWithWhereWithoutAuthorCompanyInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutSubjectCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutSubjectCompanyInput, Prisma.ReviewUncheckedCreateWithoutSubjectCompanyInput> | Prisma.ReviewCreateWithoutSubjectCompanyInput[] | Prisma.ReviewUncheckedCreateWithoutSubjectCompanyInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutSubjectCompanyInput | Prisma.ReviewCreateOrConnectWithoutSubjectCompanyInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutSubjectCompanyInput | Prisma.ReviewUpsertWithWhereUniqueWithoutSubjectCompanyInput[];
    createMany?: Prisma.ReviewCreateManySubjectCompanyInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutSubjectCompanyInput | Prisma.ReviewUpdateWithWhereUniqueWithoutSubjectCompanyInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutSubjectCompanyInput | Prisma.ReviewUpdateManyWithWhereWithoutSubjectCompanyInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutManufacturerProfileInput, Prisma.ReviewUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ReviewCreateWithoutManufacturerProfileInput[] | Prisma.ReviewUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutManufacturerProfileInput | Prisma.ReviewCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.ReviewCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutManufacturerProfileInput, Prisma.ReviewUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ReviewCreateWithoutManufacturerProfileInput[] | Prisma.ReviewUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutManufacturerProfileInput | Prisma.ReviewCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.ReviewCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutManufacturerProfileInput, Prisma.ReviewUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ReviewCreateWithoutManufacturerProfileInput[] | Prisma.ReviewUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutManufacturerProfileInput | Prisma.ReviewCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ReviewUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.ReviewCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ReviewUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.ReviewUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutManufacturerProfileInput, Prisma.ReviewUncheckedCreateWithoutManufacturerProfileInput> | Prisma.ReviewCreateWithoutManufacturerProfileInput[] | Prisma.ReviewUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutManufacturerProfileInput | Prisma.ReviewCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ReviewUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.ReviewCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.ReviewUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.ReviewUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput> | Prisma.ReviewCreateWithoutOrderInput[] | Prisma.ReviewUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutOrderInput | Prisma.ReviewCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.ReviewCreateManyOrderInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput> | Prisma.ReviewCreateWithoutOrderInput[] | Prisma.ReviewUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutOrderInput | Prisma.ReviewCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.ReviewCreateManyOrderInputEnvelope;
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
};
export type ReviewUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput> | Prisma.ReviewCreateWithoutOrderInput[] | Prisma.ReviewUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutOrderInput | Prisma.ReviewCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutOrderInput | Prisma.ReviewUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.ReviewCreateManyOrderInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutOrderInput | Prisma.ReviewUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutOrderInput | Prisma.ReviewUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type ReviewUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput> | Prisma.ReviewCreateWithoutOrderInput[] | Prisma.ReviewUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ReviewCreateOrConnectWithoutOrderInput | Prisma.ReviewCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.ReviewUpsertWithWhereUniqueWithoutOrderInput | Prisma.ReviewUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.ReviewCreateManyOrderInputEnvelope;
    set?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    disconnect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    delete?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    connect?: Prisma.ReviewWhereUniqueInput | Prisma.ReviewWhereUniqueInput[];
    update?: Prisma.ReviewUpdateWithWhereUniqueWithoutOrderInput | Prisma.ReviewUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.ReviewUpdateManyWithWhereWithoutOrderInput | Prisma.ReviewUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
};
export type EnumReviewDirectionFieldUpdateOperationsInput = {
    set?: $Enums.ReviewDirection;
};
export type EnumReviewStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReviewStatus;
};
export type ReviewCreateWithoutAuthorCompanyInput = {
    id?: string;
    direction: $Enums.ReviewDirection;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutReviewsInput;
    subjectCompany: Prisma.CompanyCreateNestedOneWithoutReviewsReceivedInput;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutReviewsReceivedInput;
};
export type ReviewUncheckedCreateWithoutAuthorCompanyInput = {
    id?: string;
    orderId: string;
    subjectCompanyId: string;
    direction: $Enums.ReviewDirection;
    manufacturerProfileId: string;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutAuthorCompanyInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutAuthorCompanyInput, Prisma.ReviewUncheckedCreateWithoutAuthorCompanyInput>;
};
export type ReviewCreateManyAuthorCompanyInputEnvelope = {
    data: Prisma.ReviewCreateManyAuthorCompanyInput | Prisma.ReviewCreateManyAuthorCompanyInput[];
    skipDuplicates?: boolean;
};
export type ReviewCreateWithoutSubjectCompanyInput = {
    id?: string;
    direction: $Enums.ReviewDirection;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutReviewsInput;
    authorCompany: Prisma.CompanyCreateNestedOneWithoutReviewsWrittenInput;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutReviewsReceivedInput;
};
export type ReviewUncheckedCreateWithoutSubjectCompanyInput = {
    id?: string;
    orderId: string;
    authorCompanyId: string;
    direction: $Enums.ReviewDirection;
    manufacturerProfileId: string;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutSubjectCompanyInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutSubjectCompanyInput, Prisma.ReviewUncheckedCreateWithoutSubjectCompanyInput>;
};
export type ReviewCreateManySubjectCompanyInputEnvelope = {
    data: Prisma.ReviewCreateManySubjectCompanyInput | Prisma.ReviewCreateManySubjectCompanyInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpsertWithWhereUniqueWithoutAuthorCompanyInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutAuthorCompanyInput, Prisma.ReviewUncheckedUpdateWithoutAuthorCompanyInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutAuthorCompanyInput, Prisma.ReviewUncheckedCreateWithoutAuthorCompanyInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutAuthorCompanyInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutAuthorCompanyInput, Prisma.ReviewUncheckedUpdateWithoutAuthorCompanyInput>;
};
export type ReviewUpdateManyWithWhereWithoutAuthorCompanyInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutAuthorCompanyInput>;
};
export type ReviewScalarWhereInput = {
    AND?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
    OR?: Prisma.ReviewScalarWhereInput[];
    NOT?: Prisma.ReviewScalarWhereInput | Prisma.ReviewScalarWhereInput[];
    id?: Prisma.UuidFilter<"Review"> | string;
    orderId?: Prisma.UuidFilter<"Review"> | string;
    authorCompanyId?: Prisma.UuidFilter<"Review"> | string;
    subjectCompanyId?: Prisma.UuidFilter<"Review"> | string;
    direction?: Prisma.EnumReviewDirectionFilter<"Review"> | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.UuidFilter<"Review"> | string;
    rating?: Prisma.IntFilter<"Review"> | number;
    qualityRating?: Prisma.IntNullableFilter<"Review"> | number | null;
    communicationRating?: Prisma.IntNullableFilter<"Review"> | number | null;
    deliveryRating?: Prisma.IntNullableFilter<"Review"> | number | null;
    comment?: Prisma.StringNullableFilter<"Review"> | string | null;
    commentFiltered?: Prisma.StringNullableFilter<"Review"> | string | null;
    status?: Prisma.EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Review"> | Date | string;
};
export type ReviewUpsertWithWhereUniqueWithoutSubjectCompanyInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutSubjectCompanyInput, Prisma.ReviewUncheckedUpdateWithoutSubjectCompanyInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutSubjectCompanyInput, Prisma.ReviewUncheckedCreateWithoutSubjectCompanyInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutSubjectCompanyInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutSubjectCompanyInput, Prisma.ReviewUncheckedUpdateWithoutSubjectCompanyInput>;
};
export type ReviewUpdateManyWithWhereWithoutSubjectCompanyInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutSubjectCompanyInput>;
};
export type ReviewCreateWithoutManufacturerProfileInput = {
    id?: string;
    direction: $Enums.ReviewDirection;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutReviewsInput;
    authorCompany: Prisma.CompanyCreateNestedOneWithoutReviewsWrittenInput;
    subjectCompany: Prisma.CompanyCreateNestedOneWithoutReviewsReceivedInput;
};
export type ReviewUncheckedCreateWithoutManufacturerProfileInput = {
    id?: string;
    orderId: string;
    authorCompanyId: string;
    subjectCompanyId: string;
    direction: $Enums.ReviewDirection;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutManufacturerProfileInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutManufacturerProfileInput, Prisma.ReviewUncheckedCreateWithoutManufacturerProfileInput>;
};
export type ReviewCreateManyManufacturerProfileInputEnvelope = {
    data: Prisma.ReviewCreateManyManufacturerProfileInput | Prisma.ReviewCreateManyManufacturerProfileInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpsertWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutManufacturerProfileInput, Prisma.ReviewUncheckedUpdateWithoutManufacturerProfileInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutManufacturerProfileInput, Prisma.ReviewUncheckedCreateWithoutManufacturerProfileInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutManufacturerProfileInput, Prisma.ReviewUncheckedUpdateWithoutManufacturerProfileInput>;
};
export type ReviewUpdateManyWithWhereWithoutManufacturerProfileInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutManufacturerProfileInput>;
};
export type ReviewCreateWithoutOrderInput = {
    id?: string;
    direction: $Enums.ReviewDirection;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authorCompany: Prisma.CompanyCreateNestedOneWithoutReviewsWrittenInput;
    subjectCompany: Prisma.CompanyCreateNestedOneWithoutReviewsReceivedInput;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutReviewsReceivedInput;
};
export type ReviewUncheckedCreateWithoutOrderInput = {
    id?: string;
    authorCompanyId: string;
    subjectCompanyId: string;
    direction: $Enums.ReviewDirection;
    manufacturerProfileId: string;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateOrConnectWithoutOrderInput = {
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput>;
};
export type ReviewCreateManyOrderInputEnvelope = {
    data: Prisma.ReviewCreateManyOrderInput | Prisma.ReviewCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type ReviewUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.ReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReviewUpdateWithoutOrderInput, Prisma.ReviewUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.ReviewCreateWithoutOrderInput, Prisma.ReviewUncheckedCreateWithoutOrderInput>;
};
export type ReviewUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReviewUpdateWithoutOrderInput, Prisma.ReviewUncheckedUpdateWithoutOrderInput>;
};
export type ReviewUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.ReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyWithoutOrderInput>;
};
export type ReviewCreateManyAuthorCompanyInput = {
    id?: string;
    orderId: string;
    subjectCompanyId: string;
    direction: $Enums.ReviewDirection;
    manufacturerProfileId: string;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewCreateManySubjectCompanyInput = {
    id?: string;
    orderId: string;
    authorCompanyId: string;
    direction: $Enums.ReviewDirection;
    manufacturerProfileId: string;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewUpdateWithoutAuthorCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutReviewsNestedInput;
    subjectCompany?: Prisma.CompanyUpdateOneRequiredWithoutReviewsReceivedNestedInput;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutReviewsReceivedNestedInput;
};
export type ReviewUncheckedUpdateWithoutAuthorCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyWithoutAuthorCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUpdateWithoutSubjectCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutReviewsNestedInput;
    authorCompany?: Prisma.CompanyUpdateOneRequiredWithoutReviewsWrittenNestedInput;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutReviewsReceivedNestedInput;
};
export type ReviewUncheckedUpdateWithoutSubjectCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyWithoutSubjectCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewCreateManyManufacturerProfileInput = {
    id?: string;
    orderId: string;
    authorCompanyId: string;
    subjectCompanyId: string;
    direction: $Enums.ReviewDirection;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutReviewsNestedInput;
    authorCompany?: Prisma.CompanyUpdateOneRequiredWithoutReviewsWrittenNestedInput;
    subjectCompany?: Prisma.CompanyUpdateOneRequiredWithoutReviewsReceivedNestedInput;
};
export type ReviewUncheckedUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    authorCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewCreateManyOrderInput = {
    id?: string;
    authorCompanyId: string;
    subjectCompanyId: string;
    direction: $Enums.ReviewDirection;
    manufacturerProfileId: string;
    rating: number;
    qualityRating?: number | null;
    communicationRating?: number | null;
    deliveryRating?: number | null;
    comment?: string | null;
    commentFiltered?: string | null;
    status?: $Enums.ReviewStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReviewUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    authorCompany?: Prisma.CompanyUpdateOneRequiredWithoutReviewsWrittenNestedInput;
    subjectCompany?: Prisma.CompanyUpdateOneRequiredWithoutReviewsReceivedNestedInput;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutReviewsReceivedNestedInput;
};
export type ReviewUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    subjectCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    direction?: Prisma.EnumReviewDirectionFieldUpdateOperationsInput | $Enums.ReviewDirection;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    qualityRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    communicationRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    deliveryRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentFiltered?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReviewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    authorCompanyId?: boolean;
    subjectCompanyId?: boolean;
    direction?: boolean;
    manufacturerProfileId?: boolean;
    rating?: boolean;
    qualityRating?: boolean;
    communicationRating?: boolean;
    deliveryRating?: boolean;
    comment?: boolean;
    commentFiltered?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    authorCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    subjectCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    authorCompanyId?: boolean;
    subjectCompanyId?: boolean;
    direction?: boolean;
    manufacturerProfileId?: boolean;
    rating?: boolean;
    qualityRating?: boolean;
    communicationRating?: boolean;
    deliveryRating?: boolean;
    comment?: boolean;
    commentFiltered?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    authorCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    subjectCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    authorCompanyId?: boolean;
    subjectCompanyId?: boolean;
    direction?: boolean;
    manufacturerProfileId?: boolean;
    rating?: boolean;
    qualityRating?: boolean;
    communicationRating?: boolean;
    deliveryRating?: boolean;
    comment?: boolean;
    commentFiltered?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    authorCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    subjectCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["review"]>;
export type ReviewSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    authorCompanyId?: boolean;
    subjectCompanyId?: boolean;
    direction?: boolean;
    manufacturerProfileId?: boolean;
    rating?: boolean;
    qualityRating?: boolean;
    communicationRating?: boolean;
    deliveryRating?: boolean;
    comment?: boolean;
    commentFiltered?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ReviewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "authorCompanyId" | "subjectCompanyId" | "direction" | "manufacturerProfileId" | "rating" | "qualityRating" | "communicationRating" | "deliveryRating" | "comment" | "commentFiltered" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["review"]>;
export type ReviewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    authorCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    subjectCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
};
export type ReviewIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    authorCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    subjectCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
};
export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
    authorCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    subjectCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
};
export type $ReviewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Review";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
        authorCompany: Prisma.$CompanyPayload<ExtArgs>;
        subjectCompany: Prisma.$CompanyPayload<ExtArgs>;
        manufacturerProfile: Prisma.$ManufacturerProfilePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        authorCompanyId: string;
        subjectCompanyId: string;
        direction: $Enums.ReviewDirection;
        manufacturerProfileId: string;
        rating: number;
        qualityRating: number | null;
        communicationRating: number | null;
        deliveryRating: number | null;
        comment: string | null;
        commentFiltered: string | null;
        status: $Enums.ReviewStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["review"]>;
    composites: {};
};
export type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReviewPayload, S>;
export type ReviewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReviewCountAggregateInputType | true;
};
export interface ReviewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Review'];
        meta: {
            name: 'Review';
        };
    };
    findUnique<T extends ReviewFindUniqueArgs>(args: Prisma.SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReviewFindFirstArgs>(args?: Prisma.SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReviewFindManyArgs>(args?: Prisma.SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReviewCreateArgs>(args: Prisma.SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReviewCreateManyArgs>(args?: Prisma.SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReviewDeleteArgs>(args: Prisma.SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReviewUpdateArgs>(args: Prisma.SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReviewDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReviewUpdateManyArgs>(args: Prisma.SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReviewUpsertArgs>(args: Prisma.SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma.Prisma__ReviewClient<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReviewCountArgs>(args?: Prisma.Subset<T, ReviewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReviewCountAggregateOutputType> : number>;
    aggregate<T extends ReviewAggregateArgs>(args: Prisma.Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>;
    groupBy<T extends ReviewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReviewGroupByArgs['orderBy'];
    } : {
        orderBy?: ReviewGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReviewFieldRefs;
}
export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    authorCompany<T extends Prisma.CompanyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CompanyDefaultArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    subjectCompany<T extends Prisma.CompanyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CompanyDefaultArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    manufacturerProfile<T extends Prisma.ManufacturerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ManufacturerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__ManufacturerProfileClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReviewFieldRefs {
    readonly id: Prisma.FieldRef<"Review", 'String'>;
    readonly orderId: Prisma.FieldRef<"Review", 'String'>;
    readonly authorCompanyId: Prisma.FieldRef<"Review", 'String'>;
    readonly subjectCompanyId: Prisma.FieldRef<"Review", 'String'>;
    readonly direction: Prisma.FieldRef<"Review", 'ReviewDirection'>;
    readonly manufacturerProfileId: Prisma.FieldRef<"Review", 'String'>;
    readonly rating: Prisma.FieldRef<"Review", 'Int'>;
    readonly qualityRating: Prisma.FieldRef<"Review", 'Int'>;
    readonly communicationRating: Prisma.FieldRef<"Review", 'Int'>;
    readonly deliveryRating: Prisma.FieldRef<"Review", 'Int'>;
    readonly comment: Prisma.FieldRef<"Review", 'String'>;
    readonly commentFiltered: Prisma.FieldRef<"Review", 'String'>;
    readonly status: Prisma.FieldRef<"Review", 'ReviewStatus'>;
    readonly createdAt: Prisma.FieldRef<"Review", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Review", 'DateTime'>;
}
export type ReviewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type ReviewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewCreateInput, Prisma.ReviewUncheckedCreateInput>;
};
export type ReviewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReviewCreateManyInput | Prisma.ReviewCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReviewCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    data: Prisma.ReviewCreateManyInput | Prisma.ReviewCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReviewIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReviewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewUpdateInput, Prisma.ReviewUncheckedUpdateInput>;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyInput>;
    where?: Prisma.ReviewWhereInput;
    limit?: number;
};
export type ReviewUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReviewUpdateManyMutationInput, Prisma.ReviewUncheckedUpdateManyInput>;
    where?: Prisma.ReviewWhereInput;
    limit?: number;
    include?: Prisma.ReviewIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReviewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReviewCreateInput, Prisma.ReviewUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReviewUpdateInput, Prisma.ReviewUncheckedUpdateInput>;
};
export type ReviewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where: Prisma.ReviewWhereUniqueInput;
};
export type ReviewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
    limit?: number;
};
export type ReviewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
};
