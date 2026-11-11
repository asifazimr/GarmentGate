import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InspectorApplicationModel = runtime.Types.Result.DefaultSelection<Prisma.$InspectorApplicationPayload>;
export type AggregateInspectorApplication = {
    _count: InspectorApplicationCountAggregateOutputType | null;
    _avg: InspectorApplicationAvgAggregateOutputType | null;
    _sum: InspectorApplicationSumAggregateOutputType | null;
    _min: InspectorApplicationMinAggregateOutputType | null;
    _max: InspectorApplicationMaxAggregateOutputType | null;
};
export type InspectorApplicationAvgAggregateOutputType = {
    experienceYears: number | null;
};
export type InspectorApplicationSumAggregateOutputType = {
    experienceYears: number | null;
};
export type InspectorApplicationMinAggregateOutputType = {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    country: string | null;
    city: string | null;
    experienceYears: number | null;
    about: string | null;
    status: $Enums.InspectorApplicationStatus | null;
    reviewNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    userId: string | null;
    createdAt: Date | null;
};
export type InspectorApplicationMaxAggregateOutputType = {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    country: string | null;
    city: string | null;
    experienceYears: number | null;
    about: string | null;
    status: $Enums.InspectorApplicationStatus | null;
    reviewNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    userId: string | null;
    createdAt: Date | null;
};
export type InspectorApplicationCountAggregateOutputType = {
    id: number;
    firstName: number;
    lastName: number;
    email: number;
    phone: number;
    country: number;
    city: number;
    experienceYears: number;
    inspectionTypes: number;
    about: number;
    status: number;
    reviewNote: number;
    reviewedById: number;
    reviewedAt: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type InspectorApplicationAvgAggregateInputType = {
    experienceYears?: true;
};
export type InspectorApplicationSumAggregateInputType = {
    experienceYears?: true;
};
export type InspectorApplicationMinAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    email?: true;
    phone?: true;
    country?: true;
    city?: true;
    experienceYears?: true;
    about?: true;
    status?: true;
    reviewNote?: true;
    reviewedById?: true;
    reviewedAt?: true;
    userId?: true;
    createdAt?: true;
};
export type InspectorApplicationMaxAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    email?: true;
    phone?: true;
    country?: true;
    city?: true;
    experienceYears?: true;
    about?: true;
    status?: true;
    reviewNote?: true;
    reviewedById?: true;
    reviewedAt?: true;
    userId?: true;
    createdAt?: true;
};
export type InspectorApplicationCountAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    email?: true;
    phone?: true;
    country?: true;
    city?: true;
    experienceYears?: true;
    inspectionTypes?: true;
    about?: true;
    status?: true;
    reviewNote?: true;
    reviewedById?: true;
    reviewedAt?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type InspectorApplicationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InspectorApplicationWhereInput;
    orderBy?: Prisma.InspectorApplicationOrderByWithRelationInput | Prisma.InspectorApplicationOrderByWithRelationInput[];
    cursor?: Prisma.InspectorApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InspectorApplicationCountAggregateInputType;
    _avg?: InspectorApplicationAvgAggregateInputType;
    _sum?: InspectorApplicationSumAggregateInputType;
    _min?: InspectorApplicationMinAggregateInputType;
    _max?: InspectorApplicationMaxAggregateInputType;
};
export type GetInspectorApplicationAggregateType<T extends InspectorApplicationAggregateArgs> = {
    [P in keyof T & keyof AggregateInspectorApplication]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInspectorApplication[P]> : Prisma.GetScalarType<T[P], AggregateInspectorApplication[P]>;
};
export type InspectorApplicationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InspectorApplicationWhereInput;
    orderBy?: Prisma.InspectorApplicationOrderByWithAggregationInput | Prisma.InspectorApplicationOrderByWithAggregationInput[];
    by: Prisma.InspectorApplicationScalarFieldEnum[] | Prisma.InspectorApplicationScalarFieldEnum;
    having?: Prisma.InspectorApplicationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InspectorApplicationCountAggregateInputType | true;
    _avg?: InspectorApplicationAvgAggregateInputType;
    _sum?: InspectorApplicationSumAggregateInputType;
    _min?: InspectorApplicationMinAggregateInputType;
    _max?: InspectorApplicationMaxAggregateInputType;
};
export type InspectorApplicationGroupByOutputType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    experienceYears: number;
    inspectionTypes: $Enums.InspectionType[];
    about: string;
    status: $Enums.InspectorApplicationStatus;
    reviewNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    userId: string | null;
    createdAt: Date;
    _count: InspectorApplicationCountAggregateOutputType | null;
    _avg: InspectorApplicationAvgAggregateOutputType | null;
    _sum: InspectorApplicationSumAggregateOutputType | null;
    _min: InspectorApplicationMinAggregateOutputType | null;
    _max: InspectorApplicationMaxAggregateOutputType | null;
};
export type GetInspectorApplicationGroupByPayload<T extends InspectorApplicationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InspectorApplicationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InspectorApplicationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InspectorApplicationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InspectorApplicationGroupByOutputType[P]>;
}>>;
export type InspectorApplicationWhereInput = {
    AND?: Prisma.InspectorApplicationWhereInput | Prisma.InspectorApplicationWhereInput[];
    OR?: Prisma.InspectorApplicationWhereInput[];
    NOT?: Prisma.InspectorApplicationWhereInput | Prisma.InspectorApplicationWhereInput[];
    id?: Prisma.UuidFilter<"InspectorApplication"> | string;
    firstName?: Prisma.StringFilter<"InspectorApplication"> | string;
    lastName?: Prisma.StringFilter<"InspectorApplication"> | string;
    email?: Prisma.StringFilter<"InspectorApplication"> | string;
    phone?: Prisma.StringFilter<"InspectorApplication"> | string;
    country?: Prisma.StringFilter<"InspectorApplication"> | string;
    city?: Prisma.StringFilter<"InspectorApplication"> | string;
    experienceYears?: Prisma.IntFilter<"InspectorApplication"> | number;
    inspectionTypes?: Prisma.EnumInspectionTypeNullableListFilter<"InspectorApplication">;
    about?: Prisma.StringFilter<"InspectorApplication"> | string;
    status?: Prisma.EnumInspectorApplicationStatusFilter<"InspectorApplication"> | $Enums.InspectorApplicationStatus;
    reviewNote?: Prisma.StringNullableFilter<"InspectorApplication"> | string | null;
    reviewedById?: Prisma.UuidNullableFilter<"InspectorApplication"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"InspectorApplication"> | Date | string | null;
    userId?: Prisma.UuidNullableFilter<"InspectorApplication"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"InspectorApplication"> | Date | string;
};
export type InspectorApplicationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    experienceYears?: Prisma.SortOrder;
    inspectionTypes?: Prisma.SortOrder;
    about?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InspectorApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.InspectorApplicationWhereInput | Prisma.InspectorApplicationWhereInput[];
    OR?: Prisma.InspectorApplicationWhereInput[];
    NOT?: Prisma.InspectorApplicationWhereInput | Prisma.InspectorApplicationWhereInput[];
    firstName?: Prisma.StringFilter<"InspectorApplication"> | string;
    lastName?: Prisma.StringFilter<"InspectorApplication"> | string;
    email?: Prisma.StringFilter<"InspectorApplication"> | string;
    phone?: Prisma.StringFilter<"InspectorApplication"> | string;
    country?: Prisma.StringFilter<"InspectorApplication"> | string;
    city?: Prisma.StringFilter<"InspectorApplication"> | string;
    experienceYears?: Prisma.IntFilter<"InspectorApplication"> | number;
    inspectionTypes?: Prisma.EnumInspectionTypeNullableListFilter<"InspectorApplication">;
    about?: Prisma.StringFilter<"InspectorApplication"> | string;
    status?: Prisma.EnumInspectorApplicationStatusFilter<"InspectorApplication"> | $Enums.InspectorApplicationStatus;
    reviewNote?: Prisma.StringNullableFilter<"InspectorApplication"> | string | null;
    reviewedById?: Prisma.UuidNullableFilter<"InspectorApplication"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableFilter<"InspectorApplication"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"InspectorApplication"> | Date | string;
}, "id" | "userId">;
export type InspectorApplicationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    experienceYears?: Prisma.SortOrder;
    inspectionTypes?: Prisma.SortOrder;
    about?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.InspectorApplicationCountOrderByAggregateInput;
    _avg?: Prisma.InspectorApplicationAvgOrderByAggregateInput;
    _max?: Prisma.InspectorApplicationMaxOrderByAggregateInput;
    _min?: Prisma.InspectorApplicationMinOrderByAggregateInput;
    _sum?: Prisma.InspectorApplicationSumOrderByAggregateInput;
};
export type InspectorApplicationScalarWhereWithAggregatesInput = {
    AND?: Prisma.InspectorApplicationScalarWhereWithAggregatesInput | Prisma.InspectorApplicationScalarWhereWithAggregatesInput[];
    OR?: Prisma.InspectorApplicationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InspectorApplicationScalarWhereWithAggregatesInput | Prisma.InspectorApplicationScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"InspectorApplication"> | string;
    firstName?: Prisma.StringWithAggregatesFilter<"InspectorApplication"> | string;
    lastName?: Prisma.StringWithAggregatesFilter<"InspectorApplication"> | string;
    email?: Prisma.StringWithAggregatesFilter<"InspectorApplication"> | string;
    phone?: Prisma.StringWithAggregatesFilter<"InspectorApplication"> | string;
    country?: Prisma.StringWithAggregatesFilter<"InspectorApplication"> | string;
    city?: Prisma.StringWithAggregatesFilter<"InspectorApplication"> | string;
    experienceYears?: Prisma.IntWithAggregatesFilter<"InspectorApplication"> | number;
    inspectionTypes?: Prisma.EnumInspectionTypeNullableListFilter<"InspectorApplication">;
    about?: Prisma.StringWithAggregatesFilter<"InspectorApplication"> | string;
    status?: Prisma.EnumInspectorApplicationStatusWithAggregatesFilter<"InspectorApplication"> | $Enums.InspectorApplicationStatus;
    reviewNote?: Prisma.StringNullableWithAggregatesFilter<"InspectorApplication"> | string | null;
    reviewedById?: Prisma.UuidNullableWithAggregatesFilter<"InspectorApplication"> | string | null;
    reviewedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"InspectorApplication"> | Date | string | null;
    userId?: Prisma.UuidNullableWithAggregatesFilter<"InspectorApplication"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"InspectorApplication"> | Date | string;
};
export type InspectorApplicationCreateInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    experienceYears: number;
    inspectionTypes?: Prisma.InspectorApplicationCreateinspectionTypesInput | $Enums.InspectionType[];
    about: string;
    status?: $Enums.InspectorApplicationStatus;
    reviewNote?: string | null;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    userId?: string | null;
    createdAt?: Date | string;
};
export type InspectorApplicationUncheckedCreateInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    experienceYears: number;
    inspectionTypes?: Prisma.InspectorApplicationCreateinspectionTypesInput | $Enums.InspectionType[];
    about: string;
    status?: $Enums.InspectorApplicationStatus;
    reviewNote?: string | null;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    userId?: string | null;
    createdAt?: Date | string;
};
export type InspectorApplicationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    inspectionTypes?: Prisma.InspectorApplicationUpdateinspectionTypesInput | $Enums.InspectionType[];
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInspectorApplicationStatusFieldUpdateOperationsInput | $Enums.InspectorApplicationStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectorApplicationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    inspectionTypes?: Prisma.InspectorApplicationUpdateinspectionTypesInput | $Enums.InspectionType[];
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInspectorApplicationStatusFieldUpdateOperationsInput | $Enums.InspectorApplicationStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectorApplicationCreateManyInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    experienceYears: number;
    inspectionTypes?: Prisma.InspectorApplicationCreateinspectionTypesInput | $Enums.InspectionType[];
    about: string;
    status?: $Enums.InspectorApplicationStatus;
    reviewNote?: string | null;
    reviewedById?: string | null;
    reviewedAt?: Date | string | null;
    userId?: string | null;
    createdAt?: Date | string;
};
export type InspectorApplicationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    inspectionTypes?: Prisma.InspectorApplicationUpdateinspectionTypesInput | $Enums.InspectionType[];
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInspectorApplicationStatusFieldUpdateOperationsInput | $Enums.InspectorApplicationStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InspectorApplicationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    firstName?: Prisma.StringFieldUpdateOperationsInput | string;
    lastName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    experienceYears?: Prisma.IntFieldUpdateOperationsInput | number;
    inspectionTypes?: Prisma.InspectorApplicationUpdateinspectionTypesInput | $Enums.InspectionType[];
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInspectorApplicationStatusFieldUpdateOperationsInput | $Enums.InspectorApplicationStatus;
    reviewNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reviewedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EnumInspectionTypeNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectionType[] | Prisma.ListEnumInspectionTypeFieldRefInput<$PrismaModel> | null;
    has?: $Enums.InspectionType | Prisma.EnumInspectionTypeFieldRefInput<$PrismaModel> | null;
    hasEvery?: $Enums.InspectionType[] | Prisma.ListEnumInspectionTypeFieldRefInput<$PrismaModel>;
    hasSome?: $Enums.InspectionType[] | Prisma.ListEnumInspectionTypeFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type InspectorApplicationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    experienceYears?: Prisma.SortOrder;
    inspectionTypes?: Prisma.SortOrder;
    about?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InspectorApplicationAvgOrderByAggregateInput = {
    experienceYears?: Prisma.SortOrder;
};
export type InspectorApplicationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    experienceYears?: Prisma.SortOrder;
    about?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InspectorApplicationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    firstName?: Prisma.SortOrder;
    lastName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    experienceYears?: Prisma.SortOrder;
    about?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    reviewNote?: Prisma.SortOrder;
    reviewedById?: Prisma.SortOrder;
    reviewedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InspectorApplicationSumOrderByAggregateInput = {
    experienceYears?: Prisma.SortOrder;
};
export type InspectorApplicationCreateinspectionTypesInput = {
    set: $Enums.InspectionType[];
};
export type InspectorApplicationUpdateinspectionTypesInput = {
    set?: $Enums.InspectionType[];
    push?: $Enums.InspectionType | $Enums.InspectionType[];
};
export type EnumInspectorApplicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.InspectorApplicationStatus;
};
export type InspectorApplicationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    phone?: boolean;
    country?: boolean;
    city?: boolean;
    experienceYears?: boolean;
    inspectionTypes?: boolean;
    about?: boolean;
    status?: boolean;
    reviewNote?: boolean;
    reviewedById?: boolean;
    reviewedAt?: boolean;
    userId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["inspectorApplication"]>;
export type InspectorApplicationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    phone?: boolean;
    country?: boolean;
    city?: boolean;
    experienceYears?: boolean;
    inspectionTypes?: boolean;
    about?: boolean;
    status?: boolean;
    reviewNote?: boolean;
    reviewedById?: boolean;
    reviewedAt?: boolean;
    userId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["inspectorApplication"]>;
export type InspectorApplicationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    phone?: boolean;
    country?: boolean;
    city?: boolean;
    experienceYears?: boolean;
    inspectionTypes?: boolean;
    about?: boolean;
    status?: boolean;
    reviewNote?: boolean;
    reviewedById?: boolean;
    reviewedAt?: boolean;
    userId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["inspectorApplication"]>;
export type InspectorApplicationSelectScalar = {
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    phone?: boolean;
    country?: boolean;
    city?: boolean;
    experienceYears?: boolean;
    inspectionTypes?: boolean;
    about?: boolean;
    status?: boolean;
    reviewNote?: boolean;
    reviewedById?: boolean;
    reviewedAt?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type InspectorApplicationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "phone" | "country" | "city" | "experienceYears" | "inspectionTypes" | "about" | "status" | "reviewNote" | "reviewedById" | "reviewedAt" | "userId" | "createdAt", ExtArgs["result"]["inspectorApplication"]>;
export type $InspectorApplicationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InspectorApplication";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        experienceYears: number;
        inspectionTypes: $Enums.InspectionType[];
        about: string;
        status: $Enums.InspectorApplicationStatus;
        reviewNote: string | null;
        reviewedById: string | null;
        reviewedAt: Date | null;
        userId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["inspectorApplication"]>;
    composites: {};
};
export type InspectorApplicationGetPayload<S extends boolean | null | undefined | InspectorApplicationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload, S>;
export type InspectorApplicationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InspectorApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InspectorApplicationCountAggregateInputType | true;
};
export interface InspectorApplicationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InspectorApplication'];
        meta: {
            name: 'InspectorApplication';
        };
    };
    findUnique<T extends InspectorApplicationFindUniqueArgs>(args: Prisma.SelectSubset<T, InspectorApplicationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InspectorApplicationClient<runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InspectorApplicationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InspectorApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InspectorApplicationClient<runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InspectorApplicationFindFirstArgs>(args?: Prisma.SelectSubset<T, InspectorApplicationFindFirstArgs<ExtArgs>>): Prisma.Prisma__InspectorApplicationClient<runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InspectorApplicationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InspectorApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InspectorApplicationClient<runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InspectorApplicationFindManyArgs>(args?: Prisma.SelectSubset<T, InspectorApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InspectorApplicationCreateArgs>(args: Prisma.SelectSubset<T, InspectorApplicationCreateArgs<ExtArgs>>): Prisma.Prisma__InspectorApplicationClient<runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InspectorApplicationCreateManyArgs>(args?: Prisma.SelectSubset<T, InspectorApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InspectorApplicationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InspectorApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InspectorApplicationDeleteArgs>(args: Prisma.SelectSubset<T, InspectorApplicationDeleteArgs<ExtArgs>>): Prisma.Prisma__InspectorApplicationClient<runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InspectorApplicationUpdateArgs>(args: Prisma.SelectSubset<T, InspectorApplicationUpdateArgs<ExtArgs>>): Prisma.Prisma__InspectorApplicationClient<runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InspectorApplicationDeleteManyArgs>(args?: Prisma.SelectSubset<T, InspectorApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InspectorApplicationUpdateManyArgs>(args: Prisma.SelectSubset<T, InspectorApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InspectorApplicationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InspectorApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InspectorApplicationUpsertArgs>(args: Prisma.SelectSubset<T, InspectorApplicationUpsertArgs<ExtArgs>>): Prisma.Prisma__InspectorApplicationClient<runtime.Types.Result.GetResult<Prisma.$InspectorApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InspectorApplicationCountArgs>(args?: Prisma.Subset<T, InspectorApplicationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InspectorApplicationCountAggregateOutputType> : number>;
    aggregate<T extends InspectorApplicationAggregateArgs>(args: Prisma.Subset<T, InspectorApplicationAggregateArgs>): Prisma.PrismaPromise<GetInspectorApplicationAggregateType<T>>;
    groupBy<T extends InspectorApplicationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InspectorApplicationGroupByArgs['orderBy'];
    } : {
        orderBy?: InspectorApplicationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InspectorApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInspectorApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InspectorApplicationFieldRefs;
}
export interface Prisma__InspectorApplicationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InspectorApplicationFieldRefs {
    readonly id: Prisma.FieldRef<"InspectorApplication", 'String'>;
    readonly firstName: Prisma.FieldRef<"InspectorApplication", 'String'>;
    readonly lastName: Prisma.FieldRef<"InspectorApplication", 'String'>;
    readonly email: Prisma.FieldRef<"InspectorApplication", 'String'>;
    readonly phone: Prisma.FieldRef<"InspectorApplication", 'String'>;
    readonly country: Prisma.FieldRef<"InspectorApplication", 'String'>;
    readonly city: Prisma.FieldRef<"InspectorApplication", 'String'>;
    readonly experienceYears: Prisma.FieldRef<"InspectorApplication", 'Int'>;
    readonly inspectionTypes: Prisma.FieldRef<"InspectorApplication", 'InspectionType[]'>;
    readonly about: Prisma.FieldRef<"InspectorApplication", 'String'>;
    readonly status: Prisma.FieldRef<"InspectorApplication", 'InspectorApplicationStatus'>;
    readonly reviewNote: Prisma.FieldRef<"InspectorApplication", 'String'>;
    readonly reviewedById: Prisma.FieldRef<"InspectorApplication", 'String'>;
    readonly reviewedAt: Prisma.FieldRef<"InspectorApplication", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"InspectorApplication", 'String'>;
    readonly createdAt: Prisma.FieldRef<"InspectorApplication", 'DateTime'>;
}
export type InspectorApplicationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelect<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
    where: Prisma.InspectorApplicationWhereUniqueInput;
};
export type InspectorApplicationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelect<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
    where: Prisma.InspectorApplicationWhereUniqueInput;
};
export type InspectorApplicationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelect<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
    where?: Prisma.InspectorApplicationWhereInput;
    orderBy?: Prisma.InspectorApplicationOrderByWithRelationInput | Prisma.InspectorApplicationOrderByWithRelationInput[];
    cursor?: Prisma.InspectorApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InspectorApplicationScalarFieldEnum | Prisma.InspectorApplicationScalarFieldEnum[];
};
export type InspectorApplicationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelect<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
    where?: Prisma.InspectorApplicationWhereInput;
    orderBy?: Prisma.InspectorApplicationOrderByWithRelationInput | Prisma.InspectorApplicationOrderByWithRelationInput[];
    cursor?: Prisma.InspectorApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InspectorApplicationScalarFieldEnum | Prisma.InspectorApplicationScalarFieldEnum[];
};
export type InspectorApplicationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelect<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
    where?: Prisma.InspectorApplicationWhereInput;
    orderBy?: Prisma.InspectorApplicationOrderByWithRelationInput | Prisma.InspectorApplicationOrderByWithRelationInput[];
    cursor?: Prisma.InspectorApplicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InspectorApplicationScalarFieldEnum | Prisma.InspectorApplicationScalarFieldEnum[];
};
export type InspectorApplicationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelect<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InspectorApplicationCreateInput, Prisma.InspectorApplicationUncheckedCreateInput>;
};
export type InspectorApplicationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InspectorApplicationCreateManyInput | Prisma.InspectorApplicationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InspectorApplicationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
    data: Prisma.InspectorApplicationCreateManyInput | Prisma.InspectorApplicationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InspectorApplicationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelect<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InspectorApplicationUpdateInput, Prisma.InspectorApplicationUncheckedUpdateInput>;
    where: Prisma.InspectorApplicationWhereUniqueInput;
};
export type InspectorApplicationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InspectorApplicationUpdateManyMutationInput, Prisma.InspectorApplicationUncheckedUpdateManyInput>;
    where?: Prisma.InspectorApplicationWhereInput;
    limit?: number;
};
export type InspectorApplicationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InspectorApplicationUpdateManyMutationInput, Prisma.InspectorApplicationUncheckedUpdateManyInput>;
    where?: Prisma.InspectorApplicationWhereInput;
    limit?: number;
};
export type InspectorApplicationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelect<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
    where: Prisma.InspectorApplicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.InspectorApplicationCreateInput, Prisma.InspectorApplicationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InspectorApplicationUpdateInput, Prisma.InspectorApplicationUncheckedUpdateInput>;
};
export type InspectorApplicationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelect<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
    where: Prisma.InspectorApplicationWhereUniqueInput;
};
export type InspectorApplicationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InspectorApplicationWhereInput;
    limit?: number;
};
export type InspectorApplicationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InspectorApplicationSelect<ExtArgs> | null;
    omit?: Prisma.InspectorApplicationOmit<ExtArgs> | null;
};
