import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CapacityMonthModel = runtime.Types.Result.DefaultSelection<Prisma.$CapacityMonthPayload>;
export type AggregateCapacityMonth = {
    _count: CapacityMonthCountAggregateOutputType | null;
    _avg: CapacityMonthAvgAggregateOutputType | null;
    _sum: CapacityMonthSumAggregateOutputType | null;
    _min: CapacityMonthMinAggregateOutputType | null;
    _max: CapacityMonthMaxAggregateOutputType | null;
};
export type CapacityMonthAvgAggregateOutputType = {
    availablePcs: number | null;
    externalBookedPcs: number | null;
};
export type CapacityMonthSumAggregateOutputType = {
    availablePcs: number | null;
    externalBookedPcs: number | null;
};
export type CapacityMonthMinAggregateOutputType = {
    id: string | null;
    manufacturerProfileId: string | null;
    month: Date | null;
    availablePcs: number | null;
    externalBookedPcs: number | null;
    note: string | null;
    updatedAt: Date | null;
};
export type CapacityMonthMaxAggregateOutputType = {
    id: string | null;
    manufacturerProfileId: string | null;
    month: Date | null;
    availablePcs: number | null;
    externalBookedPcs: number | null;
    note: string | null;
    updatedAt: Date | null;
};
export type CapacityMonthCountAggregateOutputType = {
    id: number;
    manufacturerProfileId: number;
    month: number;
    availablePcs: number;
    externalBookedPcs: number;
    note: number;
    updatedAt: number;
    _all: number;
};
export type CapacityMonthAvgAggregateInputType = {
    availablePcs?: true;
    externalBookedPcs?: true;
};
export type CapacityMonthSumAggregateInputType = {
    availablePcs?: true;
    externalBookedPcs?: true;
};
export type CapacityMonthMinAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    month?: true;
    availablePcs?: true;
    externalBookedPcs?: true;
    note?: true;
    updatedAt?: true;
};
export type CapacityMonthMaxAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    month?: true;
    availablePcs?: true;
    externalBookedPcs?: true;
    note?: true;
    updatedAt?: true;
};
export type CapacityMonthCountAggregateInputType = {
    id?: true;
    manufacturerProfileId?: true;
    month?: true;
    availablePcs?: true;
    externalBookedPcs?: true;
    note?: true;
    updatedAt?: true;
    _all?: true;
};
export type CapacityMonthAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacityMonthWhereInput;
    orderBy?: Prisma.CapacityMonthOrderByWithRelationInput | Prisma.CapacityMonthOrderByWithRelationInput[];
    cursor?: Prisma.CapacityMonthWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CapacityMonthCountAggregateInputType;
    _avg?: CapacityMonthAvgAggregateInputType;
    _sum?: CapacityMonthSumAggregateInputType;
    _min?: CapacityMonthMinAggregateInputType;
    _max?: CapacityMonthMaxAggregateInputType;
};
export type GetCapacityMonthAggregateType<T extends CapacityMonthAggregateArgs> = {
    [P in keyof T & keyof AggregateCapacityMonth]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCapacityMonth[P]> : Prisma.GetScalarType<T[P], AggregateCapacityMonth[P]>;
};
export type CapacityMonthGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacityMonthWhereInput;
    orderBy?: Prisma.CapacityMonthOrderByWithAggregationInput | Prisma.CapacityMonthOrderByWithAggregationInput[];
    by: Prisma.CapacityMonthScalarFieldEnum[] | Prisma.CapacityMonthScalarFieldEnum;
    having?: Prisma.CapacityMonthScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CapacityMonthCountAggregateInputType | true;
    _avg?: CapacityMonthAvgAggregateInputType;
    _sum?: CapacityMonthSumAggregateInputType;
    _min?: CapacityMonthMinAggregateInputType;
    _max?: CapacityMonthMaxAggregateInputType;
};
export type CapacityMonthGroupByOutputType = {
    id: string;
    manufacturerProfileId: string;
    month: Date;
    availablePcs: number | null;
    externalBookedPcs: number;
    note: string | null;
    updatedAt: Date;
    _count: CapacityMonthCountAggregateOutputType | null;
    _avg: CapacityMonthAvgAggregateOutputType | null;
    _sum: CapacityMonthSumAggregateOutputType | null;
    _min: CapacityMonthMinAggregateOutputType | null;
    _max: CapacityMonthMaxAggregateOutputType | null;
};
export type GetCapacityMonthGroupByPayload<T extends CapacityMonthGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CapacityMonthGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CapacityMonthGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CapacityMonthGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CapacityMonthGroupByOutputType[P]>;
}>>;
export type CapacityMonthWhereInput = {
    AND?: Prisma.CapacityMonthWhereInput | Prisma.CapacityMonthWhereInput[];
    OR?: Prisma.CapacityMonthWhereInput[];
    NOT?: Prisma.CapacityMonthWhereInput | Prisma.CapacityMonthWhereInput[];
    id?: Prisma.UuidFilter<"CapacityMonth"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"CapacityMonth"> | string;
    month?: Prisma.DateTimeFilter<"CapacityMonth"> | Date | string;
    availablePcs?: Prisma.IntNullableFilter<"CapacityMonth"> | number | null;
    externalBookedPcs?: Prisma.IntFilter<"CapacityMonth"> | number;
    note?: Prisma.StringNullableFilter<"CapacityMonth"> | string | null;
    updatedAt?: Prisma.DateTimeFilter<"CapacityMonth"> | Date | string;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
};
export type CapacityMonthOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    availablePcs?: Prisma.SortOrderInput | Prisma.SortOrder;
    externalBookedPcs?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    manufacturerProfile?: Prisma.ManufacturerProfileOrderByWithRelationInput;
};
export type CapacityMonthWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    manufacturerProfileId_month?: Prisma.CapacityMonthManufacturerProfileIdMonthCompoundUniqueInput;
    AND?: Prisma.CapacityMonthWhereInput | Prisma.CapacityMonthWhereInput[];
    OR?: Prisma.CapacityMonthWhereInput[];
    NOT?: Prisma.CapacityMonthWhereInput | Prisma.CapacityMonthWhereInput[];
    manufacturerProfileId?: Prisma.UuidFilter<"CapacityMonth"> | string;
    month?: Prisma.DateTimeFilter<"CapacityMonth"> | Date | string;
    availablePcs?: Prisma.IntNullableFilter<"CapacityMonth"> | number | null;
    externalBookedPcs?: Prisma.IntFilter<"CapacityMonth"> | number;
    note?: Prisma.StringNullableFilter<"CapacityMonth"> | string | null;
    updatedAt?: Prisma.DateTimeFilter<"CapacityMonth"> | Date | string;
    manufacturerProfile?: Prisma.XOR<Prisma.ManufacturerProfileScalarRelationFilter, Prisma.ManufacturerProfileWhereInput>;
}, "id" | "manufacturerProfileId_month">;
export type CapacityMonthOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    availablePcs?: Prisma.SortOrderInput | Prisma.SortOrder;
    externalBookedPcs?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CapacityMonthCountOrderByAggregateInput;
    _avg?: Prisma.CapacityMonthAvgOrderByAggregateInput;
    _max?: Prisma.CapacityMonthMaxOrderByAggregateInput;
    _min?: Prisma.CapacityMonthMinOrderByAggregateInput;
    _sum?: Prisma.CapacityMonthSumOrderByAggregateInput;
};
export type CapacityMonthScalarWhereWithAggregatesInput = {
    AND?: Prisma.CapacityMonthScalarWhereWithAggregatesInput | Prisma.CapacityMonthScalarWhereWithAggregatesInput[];
    OR?: Prisma.CapacityMonthScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CapacityMonthScalarWhereWithAggregatesInput | Prisma.CapacityMonthScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CapacityMonth"> | string;
    manufacturerProfileId?: Prisma.UuidWithAggregatesFilter<"CapacityMonth"> | string;
    month?: Prisma.DateTimeWithAggregatesFilter<"CapacityMonth"> | Date | string;
    availablePcs?: Prisma.IntNullableWithAggregatesFilter<"CapacityMonth"> | number | null;
    externalBookedPcs?: Prisma.IntWithAggregatesFilter<"CapacityMonth"> | number;
    note?: Prisma.StringNullableWithAggregatesFilter<"CapacityMonth"> | string | null;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CapacityMonth"> | Date | string;
};
export type CapacityMonthCreateInput = {
    id?: string;
    month: Date | string;
    availablePcs?: number | null;
    externalBookedPcs?: number;
    note?: string | null;
    updatedAt?: Date | string;
    manufacturerProfile: Prisma.ManufacturerProfileCreateNestedOneWithoutCapacityMonthsInput;
};
export type CapacityMonthUncheckedCreateInput = {
    id?: string;
    manufacturerProfileId: string;
    month: Date | string;
    availablePcs?: number | null;
    externalBookedPcs?: number;
    note?: string | null;
    updatedAt?: Date | string;
};
export type CapacityMonthUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availablePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    externalBookedPcs?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manufacturerProfile?: Prisma.ManufacturerProfileUpdateOneRequiredWithoutCapacityMonthsNestedInput;
};
export type CapacityMonthUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availablePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    externalBookedPcs?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CapacityMonthCreateManyInput = {
    id?: string;
    manufacturerProfileId: string;
    month: Date | string;
    availablePcs?: number | null;
    externalBookedPcs?: number;
    note?: string | null;
    updatedAt?: Date | string;
};
export type CapacityMonthUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availablePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    externalBookedPcs?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CapacityMonthUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturerProfileId?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availablePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    externalBookedPcs?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CapacityMonthListRelationFilter = {
    every?: Prisma.CapacityMonthWhereInput;
    some?: Prisma.CapacityMonthWhereInput;
    none?: Prisma.CapacityMonthWhereInput;
};
export type CapacityMonthOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CapacityMonthManufacturerProfileIdMonthCompoundUniqueInput = {
    manufacturerProfileId: string;
    month: Date | string;
};
export type CapacityMonthCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    availablePcs?: Prisma.SortOrder;
    externalBookedPcs?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CapacityMonthAvgOrderByAggregateInput = {
    availablePcs?: Prisma.SortOrder;
    externalBookedPcs?: Prisma.SortOrder;
};
export type CapacityMonthMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    availablePcs?: Prisma.SortOrder;
    externalBookedPcs?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CapacityMonthMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    manufacturerProfileId?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    availablePcs?: Prisma.SortOrder;
    externalBookedPcs?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CapacityMonthSumOrderByAggregateInput = {
    availablePcs?: Prisma.SortOrder;
    externalBookedPcs?: Prisma.SortOrder;
};
export type CapacityMonthCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.CapacityMonthCreateWithoutManufacturerProfileInput, Prisma.CapacityMonthUncheckedCreateWithoutManufacturerProfileInput> | Prisma.CapacityMonthCreateWithoutManufacturerProfileInput[] | Prisma.CapacityMonthUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.CapacityMonthCreateOrConnectWithoutManufacturerProfileInput | Prisma.CapacityMonthCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.CapacityMonthCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.CapacityMonthWhereUniqueInput | Prisma.CapacityMonthWhereUniqueInput[];
};
export type CapacityMonthUncheckedCreateNestedManyWithoutManufacturerProfileInput = {
    create?: Prisma.XOR<Prisma.CapacityMonthCreateWithoutManufacturerProfileInput, Prisma.CapacityMonthUncheckedCreateWithoutManufacturerProfileInput> | Prisma.CapacityMonthCreateWithoutManufacturerProfileInput[] | Prisma.CapacityMonthUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.CapacityMonthCreateOrConnectWithoutManufacturerProfileInput | Prisma.CapacityMonthCreateOrConnectWithoutManufacturerProfileInput[];
    createMany?: Prisma.CapacityMonthCreateManyManufacturerProfileInputEnvelope;
    connect?: Prisma.CapacityMonthWhereUniqueInput | Prisma.CapacityMonthWhereUniqueInput[];
};
export type CapacityMonthUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.CapacityMonthCreateWithoutManufacturerProfileInput, Prisma.CapacityMonthUncheckedCreateWithoutManufacturerProfileInput> | Prisma.CapacityMonthCreateWithoutManufacturerProfileInput[] | Prisma.CapacityMonthUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.CapacityMonthCreateOrConnectWithoutManufacturerProfileInput | Prisma.CapacityMonthCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.CapacityMonthUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.CapacityMonthUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.CapacityMonthCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.CapacityMonthWhereUniqueInput | Prisma.CapacityMonthWhereUniqueInput[];
    disconnect?: Prisma.CapacityMonthWhereUniqueInput | Prisma.CapacityMonthWhereUniqueInput[];
    delete?: Prisma.CapacityMonthWhereUniqueInput | Prisma.CapacityMonthWhereUniqueInput[];
    connect?: Prisma.CapacityMonthWhereUniqueInput | Prisma.CapacityMonthWhereUniqueInput[];
    update?: Prisma.CapacityMonthUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.CapacityMonthUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.CapacityMonthUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.CapacityMonthUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.CapacityMonthScalarWhereInput | Prisma.CapacityMonthScalarWhereInput[];
};
export type CapacityMonthUncheckedUpdateManyWithoutManufacturerProfileNestedInput = {
    create?: Prisma.XOR<Prisma.CapacityMonthCreateWithoutManufacturerProfileInput, Prisma.CapacityMonthUncheckedCreateWithoutManufacturerProfileInput> | Prisma.CapacityMonthCreateWithoutManufacturerProfileInput[] | Prisma.CapacityMonthUncheckedCreateWithoutManufacturerProfileInput[];
    connectOrCreate?: Prisma.CapacityMonthCreateOrConnectWithoutManufacturerProfileInput | Prisma.CapacityMonthCreateOrConnectWithoutManufacturerProfileInput[];
    upsert?: Prisma.CapacityMonthUpsertWithWhereUniqueWithoutManufacturerProfileInput | Prisma.CapacityMonthUpsertWithWhereUniqueWithoutManufacturerProfileInput[];
    createMany?: Prisma.CapacityMonthCreateManyManufacturerProfileInputEnvelope;
    set?: Prisma.CapacityMonthWhereUniqueInput | Prisma.CapacityMonthWhereUniqueInput[];
    disconnect?: Prisma.CapacityMonthWhereUniqueInput | Prisma.CapacityMonthWhereUniqueInput[];
    delete?: Prisma.CapacityMonthWhereUniqueInput | Prisma.CapacityMonthWhereUniqueInput[];
    connect?: Prisma.CapacityMonthWhereUniqueInput | Prisma.CapacityMonthWhereUniqueInput[];
    update?: Prisma.CapacityMonthUpdateWithWhereUniqueWithoutManufacturerProfileInput | Prisma.CapacityMonthUpdateWithWhereUniqueWithoutManufacturerProfileInput[];
    updateMany?: Prisma.CapacityMonthUpdateManyWithWhereWithoutManufacturerProfileInput | Prisma.CapacityMonthUpdateManyWithWhereWithoutManufacturerProfileInput[];
    deleteMany?: Prisma.CapacityMonthScalarWhereInput | Prisma.CapacityMonthScalarWhereInput[];
};
export type CapacityMonthCreateWithoutManufacturerProfileInput = {
    id?: string;
    month: Date | string;
    availablePcs?: number | null;
    externalBookedPcs?: number;
    note?: string | null;
    updatedAt?: Date | string;
};
export type CapacityMonthUncheckedCreateWithoutManufacturerProfileInput = {
    id?: string;
    month: Date | string;
    availablePcs?: number | null;
    externalBookedPcs?: number;
    note?: string | null;
    updatedAt?: Date | string;
};
export type CapacityMonthCreateOrConnectWithoutManufacturerProfileInput = {
    where: Prisma.CapacityMonthWhereUniqueInput;
    create: Prisma.XOR<Prisma.CapacityMonthCreateWithoutManufacturerProfileInput, Prisma.CapacityMonthUncheckedCreateWithoutManufacturerProfileInput>;
};
export type CapacityMonthCreateManyManufacturerProfileInputEnvelope = {
    data: Prisma.CapacityMonthCreateManyManufacturerProfileInput | Prisma.CapacityMonthCreateManyManufacturerProfileInput[];
    skipDuplicates?: boolean;
};
export type CapacityMonthUpsertWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.CapacityMonthWhereUniqueInput;
    update: Prisma.XOR<Prisma.CapacityMonthUpdateWithoutManufacturerProfileInput, Prisma.CapacityMonthUncheckedUpdateWithoutManufacturerProfileInput>;
    create: Prisma.XOR<Prisma.CapacityMonthCreateWithoutManufacturerProfileInput, Prisma.CapacityMonthUncheckedCreateWithoutManufacturerProfileInput>;
};
export type CapacityMonthUpdateWithWhereUniqueWithoutManufacturerProfileInput = {
    where: Prisma.CapacityMonthWhereUniqueInput;
    data: Prisma.XOR<Prisma.CapacityMonthUpdateWithoutManufacturerProfileInput, Prisma.CapacityMonthUncheckedUpdateWithoutManufacturerProfileInput>;
};
export type CapacityMonthUpdateManyWithWhereWithoutManufacturerProfileInput = {
    where: Prisma.CapacityMonthScalarWhereInput;
    data: Prisma.XOR<Prisma.CapacityMonthUpdateManyMutationInput, Prisma.CapacityMonthUncheckedUpdateManyWithoutManufacturerProfileInput>;
};
export type CapacityMonthScalarWhereInput = {
    AND?: Prisma.CapacityMonthScalarWhereInput | Prisma.CapacityMonthScalarWhereInput[];
    OR?: Prisma.CapacityMonthScalarWhereInput[];
    NOT?: Prisma.CapacityMonthScalarWhereInput | Prisma.CapacityMonthScalarWhereInput[];
    id?: Prisma.UuidFilter<"CapacityMonth"> | string;
    manufacturerProfileId?: Prisma.UuidFilter<"CapacityMonth"> | string;
    month?: Prisma.DateTimeFilter<"CapacityMonth"> | Date | string;
    availablePcs?: Prisma.IntNullableFilter<"CapacityMonth"> | number | null;
    externalBookedPcs?: Prisma.IntFilter<"CapacityMonth"> | number;
    note?: Prisma.StringNullableFilter<"CapacityMonth"> | string | null;
    updatedAt?: Prisma.DateTimeFilter<"CapacityMonth"> | Date | string;
};
export type CapacityMonthCreateManyManufacturerProfileInput = {
    id?: string;
    month: Date | string;
    availablePcs?: number | null;
    externalBookedPcs?: number;
    note?: string | null;
    updatedAt?: Date | string;
};
export type CapacityMonthUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availablePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    externalBookedPcs?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CapacityMonthUncheckedUpdateWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availablePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    externalBookedPcs?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CapacityMonthUncheckedUpdateManyWithoutManufacturerProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availablePcs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    externalBookedPcs?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CapacityMonthSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    month?: boolean;
    availablePcs?: boolean;
    externalBookedPcs?: boolean;
    note?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["capacityMonth"]>;
export type CapacityMonthSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    month?: boolean;
    availablePcs?: boolean;
    externalBookedPcs?: boolean;
    note?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["capacityMonth"]>;
export type CapacityMonthSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    manufacturerProfileId?: boolean;
    month?: boolean;
    availablePcs?: boolean;
    externalBookedPcs?: boolean;
    note?: boolean;
    updatedAt?: boolean;
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["capacityMonth"]>;
export type CapacityMonthSelectScalar = {
    id?: boolean;
    manufacturerProfileId?: boolean;
    month?: boolean;
    availablePcs?: boolean;
    externalBookedPcs?: boolean;
    note?: boolean;
    updatedAt?: boolean;
};
export type CapacityMonthOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "manufacturerProfileId" | "month" | "availablePcs" | "externalBookedPcs" | "note" | "updatedAt", ExtArgs["result"]["capacityMonth"]>;
export type CapacityMonthInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
};
export type CapacityMonthIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
};
export type CapacityMonthIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manufacturerProfile?: boolean | Prisma.ManufacturerProfileDefaultArgs<ExtArgs>;
};
export type $CapacityMonthPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CapacityMonth";
    objects: {
        manufacturerProfile: Prisma.$ManufacturerProfilePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        manufacturerProfileId: string;
        month: Date;
        availablePcs: number | null;
        externalBookedPcs: number;
        note: string | null;
        updatedAt: Date;
    }, ExtArgs["result"]["capacityMonth"]>;
    composites: {};
};
export type CapacityMonthGetPayload<S extends boolean | null | undefined | CapacityMonthDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload, S>;
export type CapacityMonthCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CapacityMonthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CapacityMonthCountAggregateInputType | true;
};
export interface CapacityMonthDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CapacityMonth'];
        meta: {
            name: 'CapacityMonth';
        };
    };
    findUnique<T extends CapacityMonthFindUniqueArgs>(args: Prisma.SelectSubset<T, CapacityMonthFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CapacityMonthClient<runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CapacityMonthFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CapacityMonthFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CapacityMonthClient<runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CapacityMonthFindFirstArgs>(args?: Prisma.SelectSubset<T, CapacityMonthFindFirstArgs<ExtArgs>>): Prisma.Prisma__CapacityMonthClient<runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CapacityMonthFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CapacityMonthFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CapacityMonthClient<runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CapacityMonthFindManyArgs>(args?: Prisma.SelectSubset<T, CapacityMonthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CapacityMonthCreateArgs>(args: Prisma.SelectSubset<T, CapacityMonthCreateArgs<ExtArgs>>): Prisma.Prisma__CapacityMonthClient<runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CapacityMonthCreateManyArgs>(args?: Prisma.SelectSubset<T, CapacityMonthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CapacityMonthCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CapacityMonthCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CapacityMonthDeleteArgs>(args: Prisma.SelectSubset<T, CapacityMonthDeleteArgs<ExtArgs>>): Prisma.Prisma__CapacityMonthClient<runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CapacityMonthUpdateArgs>(args: Prisma.SelectSubset<T, CapacityMonthUpdateArgs<ExtArgs>>): Prisma.Prisma__CapacityMonthClient<runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CapacityMonthDeleteManyArgs>(args?: Prisma.SelectSubset<T, CapacityMonthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CapacityMonthUpdateManyArgs>(args: Prisma.SelectSubset<T, CapacityMonthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CapacityMonthUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CapacityMonthUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CapacityMonthUpsertArgs>(args: Prisma.SelectSubset<T, CapacityMonthUpsertArgs<ExtArgs>>): Prisma.Prisma__CapacityMonthClient<runtime.Types.Result.GetResult<Prisma.$CapacityMonthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CapacityMonthCountArgs>(args?: Prisma.Subset<T, CapacityMonthCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CapacityMonthCountAggregateOutputType> : number>;
    aggregate<T extends CapacityMonthAggregateArgs>(args: Prisma.Subset<T, CapacityMonthAggregateArgs>): Prisma.PrismaPromise<GetCapacityMonthAggregateType<T>>;
    groupBy<T extends CapacityMonthGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CapacityMonthGroupByArgs['orderBy'];
    } : {
        orderBy?: CapacityMonthGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CapacityMonthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCapacityMonthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CapacityMonthFieldRefs;
}
export interface Prisma__CapacityMonthClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    manufacturerProfile<T extends Prisma.ManufacturerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ManufacturerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__ManufacturerProfileClient<runtime.Types.Result.GetResult<Prisma.$ManufacturerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CapacityMonthFieldRefs {
    readonly id: Prisma.FieldRef<"CapacityMonth", 'String'>;
    readonly manufacturerProfileId: Prisma.FieldRef<"CapacityMonth", 'String'>;
    readonly month: Prisma.FieldRef<"CapacityMonth", 'DateTime'>;
    readonly availablePcs: Prisma.FieldRef<"CapacityMonth", 'Int'>;
    readonly externalBookedPcs: Prisma.FieldRef<"CapacityMonth", 'Int'>;
    readonly note: Prisma.FieldRef<"CapacityMonth", 'String'>;
    readonly updatedAt: Prisma.FieldRef<"CapacityMonth", 'DateTime'>;
}
export type CapacityMonthFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelect<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    include?: Prisma.CapacityMonthInclude<ExtArgs> | null;
    where: Prisma.CapacityMonthWhereUniqueInput;
};
export type CapacityMonthFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelect<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    include?: Prisma.CapacityMonthInclude<ExtArgs> | null;
    where: Prisma.CapacityMonthWhereUniqueInput;
};
export type CapacityMonthFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelect<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    include?: Prisma.CapacityMonthInclude<ExtArgs> | null;
    where?: Prisma.CapacityMonthWhereInput;
    orderBy?: Prisma.CapacityMonthOrderByWithRelationInput | Prisma.CapacityMonthOrderByWithRelationInput[];
    cursor?: Prisma.CapacityMonthWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacityMonthScalarFieldEnum | Prisma.CapacityMonthScalarFieldEnum[];
};
export type CapacityMonthFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelect<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    include?: Prisma.CapacityMonthInclude<ExtArgs> | null;
    where?: Prisma.CapacityMonthWhereInput;
    orderBy?: Prisma.CapacityMonthOrderByWithRelationInput | Prisma.CapacityMonthOrderByWithRelationInput[];
    cursor?: Prisma.CapacityMonthWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacityMonthScalarFieldEnum | Prisma.CapacityMonthScalarFieldEnum[];
};
export type CapacityMonthFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelect<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    include?: Prisma.CapacityMonthInclude<ExtArgs> | null;
    where?: Prisma.CapacityMonthWhereInput;
    orderBy?: Prisma.CapacityMonthOrderByWithRelationInput | Prisma.CapacityMonthOrderByWithRelationInput[];
    cursor?: Prisma.CapacityMonthWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacityMonthScalarFieldEnum | Prisma.CapacityMonthScalarFieldEnum[];
};
export type CapacityMonthCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelect<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    include?: Prisma.CapacityMonthInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CapacityMonthCreateInput, Prisma.CapacityMonthUncheckedCreateInput>;
};
export type CapacityMonthCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CapacityMonthCreateManyInput | Prisma.CapacityMonthCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CapacityMonthCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    data: Prisma.CapacityMonthCreateManyInput | Prisma.CapacityMonthCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CapacityMonthIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CapacityMonthUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelect<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    include?: Prisma.CapacityMonthInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CapacityMonthUpdateInput, Prisma.CapacityMonthUncheckedUpdateInput>;
    where: Prisma.CapacityMonthWhereUniqueInput;
};
export type CapacityMonthUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CapacityMonthUpdateManyMutationInput, Prisma.CapacityMonthUncheckedUpdateManyInput>;
    where?: Prisma.CapacityMonthWhereInput;
    limit?: number;
};
export type CapacityMonthUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CapacityMonthUpdateManyMutationInput, Prisma.CapacityMonthUncheckedUpdateManyInput>;
    where?: Prisma.CapacityMonthWhereInput;
    limit?: number;
    include?: Prisma.CapacityMonthIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CapacityMonthUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelect<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    include?: Prisma.CapacityMonthInclude<ExtArgs> | null;
    where: Prisma.CapacityMonthWhereUniqueInput;
    create: Prisma.XOR<Prisma.CapacityMonthCreateInput, Prisma.CapacityMonthUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CapacityMonthUpdateInput, Prisma.CapacityMonthUncheckedUpdateInput>;
};
export type CapacityMonthDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelect<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    include?: Prisma.CapacityMonthInclude<ExtArgs> | null;
    where: Prisma.CapacityMonthWhereUniqueInput;
};
export type CapacityMonthDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacityMonthWhereInput;
    limit?: number;
};
export type CapacityMonthDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityMonthSelect<ExtArgs> | null;
    omit?: Prisma.CapacityMonthOmit<ExtArgs> | null;
    include?: Prisma.CapacityMonthInclude<ExtArgs> | null;
};
