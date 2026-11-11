import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CapacityBookingAllocationModel = runtime.Types.Result.DefaultSelection<Prisma.$CapacityBookingAllocationPayload>;
export type AggregateCapacityBookingAllocation = {
    _count: CapacityBookingAllocationCountAggregateOutputType | null;
    _avg: CapacityBookingAllocationAvgAggregateOutputType | null;
    _sum: CapacityBookingAllocationSumAggregateOutputType | null;
    _min: CapacityBookingAllocationMinAggregateOutputType | null;
    _max: CapacityBookingAllocationMaxAggregateOutputType | null;
};
export type CapacityBookingAllocationAvgAggregateOutputType = {
    minutes: number | null;
};
export type CapacityBookingAllocationSumAggregateOutputType = {
    minutes: number | null;
};
export type CapacityBookingAllocationMinAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    slotId: string | null;
    minutes: number | null;
};
export type CapacityBookingAllocationMaxAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    slotId: string | null;
    minutes: number | null;
};
export type CapacityBookingAllocationCountAggregateOutputType = {
    id: number;
    bookingId: number;
    slotId: number;
    minutes: number;
    _all: number;
};
export type CapacityBookingAllocationAvgAggregateInputType = {
    minutes?: true;
};
export type CapacityBookingAllocationSumAggregateInputType = {
    minutes?: true;
};
export type CapacityBookingAllocationMinAggregateInputType = {
    id?: true;
    bookingId?: true;
    slotId?: true;
    minutes?: true;
};
export type CapacityBookingAllocationMaxAggregateInputType = {
    id?: true;
    bookingId?: true;
    slotId?: true;
    minutes?: true;
};
export type CapacityBookingAllocationCountAggregateInputType = {
    id?: true;
    bookingId?: true;
    slotId?: true;
    minutes?: true;
    _all?: true;
};
export type CapacityBookingAllocationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacityBookingAllocationWhereInput;
    orderBy?: Prisma.CapacityBookingAllocationOrderByWithRelationInput | Prisma.CapacityBookingAllocationOrderByWithRelationInput[];
    cursor?: Prisma.CapacityBookingAllocationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CapacityBookingAllocationCountAggregateInputType;
    _avg?: CapacityBookingAllocationAvgAggregateInputType;
    _sum?: CapacityBookingAllocationSumAggregateInputType;
    _min?: CapacityBookingAllocationMinAggregateInputType;
    _max?: CapacityBookingAllocationMaxAggregateInputType;
};
export type GetCapacityBookingAllocationAggregateType<T extends CapacityBookingAllocationAggregateArgs> = {
    [P in keyof T & keyof AggregateCapacityBookingAllocation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCapacityBookingAllocation[P]> : Prisma.GetScalarType<T[P], AggregateCapacityBookingAllocation[P]>;
};
export type CapacityBookingAllocationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacityBookingAllocationWhereInput;
    orderBy?: Prisma.CapacityBookingAllocationOrderByWithAggregationInput | Prisma.CapacityBookingAllocationOrderByWithAggregationInput[];
    by: Prisma.CapacityBookingAllocationScalarFieldEnum[] | Prisma.CapacityBookingAllocationScalarFieldEnum;
    having?: Prisma.CapacityBookingAllocationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CapacityBookingAllocationCountAggregateInputType | true;
    _avg?: CapacityBookingAllocationAvgAggregateInputType;
    _sum?: CapacityBookingAllocationSumAggregateInputType;
    _min?: CapacityBookingAllocationMinAggregateInputType;
    _max?: CapacityBookingAllocationMaxAggregateInputType;
};
export type CapacityBookingAllocationGroupByOutputType = {
    id: string;
    bookingId: string;
    slotId: string;
    minutes: number;
    _count: CapacityBookingAllocationCountAggregateOutputType | null;
    _avg: CapacityBookingAllocationAvgAggregateOutputType | null;
    _sum: CapacityBookingAllocationSumAggregateOutputType | null;
    _min: CapacityBookingAllocationMinAggregateOutputType | null;
    _max: CapacityBookingAllocationMaxAggregateOutputType | null;
};
export type GetCapacityBookingAllocationGroupByPayload<T extends CapacityBookingAllocationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CapacityBookingAllocationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CapacityBookingAllocationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CapacityBookingAllocationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CapacityBookingAllocationGroupByOutputType[P]>;
}>>;
export type CapacityBookingAllocationWhereInput = {
    AND?: Prisma.CapacityBookingAllocationWhereInput | Prisma.CapacityBookingAllocationWhereInput[];
    OR?: Prisma.CapacityBookingAllocationWhereInput[];
    NOT?: Prisma.CapacityBookingAllocationWhereInput | Prisma.CapacityBookingAllocationWhereInput[];
    id?: Prisma.UuidFilter<"CapacityBookingAllocation"> | string;
    bookingId?: Prisma.UuidFilter<"CapacityBookingAllocation"> | string;
    slotId?: Prisma.UuidFilter<"CapacityBookingAllocation"> | string;
    minutes?: Prisma.IntFilter<"CapacityBookingAllocation"> | number;
    booking?: Prisma.XOR<Prisma.CapacityBookingScalarRelationFilter, Prisma.CapacityBookingWhereInput>;
    slot?: Prisma.XOR<Prisma.CapacitySlotScalarRelationFilter, Prisma.CapacitySlotWhereInput>;
};
export type CapacityBookingAllocationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    minutes?: Prisma.SortOrder;
    booking?: Prisma.CapacityBookingOrderByWithRelationInput;
    slot?: Prisma.CapacitySlotOrderByWithRelationInput;
};
export type CapacityBookingAllocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    bookingId_slotId?: Prisma.CapacityBookingAllocationBookingIdSlotIdCompoundUniqueInput;
    AND?: Prisma.CapacityBookingAllocationWhereInput | Prisma.CapacityBookingAllocationWhereInput[];
    OR?: Prisma.CapacityBookingAllocationWhereInput[];
    NOT?: Prisma.CapacityBookingAllocationWhereInput | Prisma.CapacityBookingAllocationWhereInput[];
    bookingId?: Prisma.UuidFilter<"CapacityBookingAllocation"> | string;
    slotId?: Prisma.UuidFilter<"CapacityBookingAllocation"> | string;
    minutes?: Prisma.IntFilter<"CapacityBookingAllocation"> | number;
    booking?: Prisma.XOR<Prisma.CapacityBookingScalarRelationFilter, Prisma.CapacityBookingWhereInput>;
    slot?: Prisma.XOR<Prisma.CapacitySlotScalarRelationFilter, Prisma.CapacitySlotWhereInput>;
}, "id" | "bookingId_slotId">;
export type CapacityBookingAllocationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    minutes?: Prisma.SortOrder;
    _count?: Prisma.CapacityBookingAllocationCountOrderByAggregateInput;
    _avg?: Prisma.CapacityBookingAllocationAvgOrderByAggregateInput;
    _max?: Prisma.CapacityBookingAllocationMaxOrderByAggregateInput;
    _min?: Prisma.CapacityBookingAllocationMinOrderByAggregateInput;
    _sum?: Prisma.CapacityBookingAllocationSumOrderByAggregateInput;
};
export type CapacityBookingAllocationScalarWhereWithAggregatesInput = {
    AND?: Prisma.CapacityBookingAllocationScalarWhereWithAggregatesInput | Prisma.CapacityBookingAllocationScalarWhereWithAggregatesInput[];
    OR?: Prisma.CapacityBookingAllocationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CapacityBookingAllocationScalarWhereWithAggregatesInput | Prisma.CapacityBookingAllocationScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CapacityBookingAllocation"> | string;
    bookingId?: Prisma.UuidWithAggregatesFilter<"CapacityBookingAllocation"> | string;
    slotId?: Prisma.UuidWithAggregatesFilter<"CapacityBookingAllocation"> | string;
    minutes?: Prisma.IntWithAggregatesFilter<"CapacityBookingAllocation"> | number;
};
export type CapacityBookingAllocationCreateInput = {
    id?: string;
    minutes: number;
    booking: Prisma.CapacityBookingCreateNestedOneWithoutAllocationsInput;
    slot: Prisma.CapacitySlotCreateNestedOneWithoutAllocationsInput;
};
export type CapacityBookingAllocationUncheckedCreateInput = {
    id?: string;
    bookingId: string;
    slotId: string;
    minutes: number;
};
export type CapacityBookingAllocationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    minutes?: Prisma.IntFieldUpdateOperationsInput | number;
    booking?: Prisma.CapacityBookingUpdateOneRequiredWithoutAllocationsNestedInput;
    slot?: Prisma.CapacitySlotUpdateOneRequiredWithoutAllocationsNestedInput;
};
export type CapacityBookingAllocationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    minutes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CapacityBookingAllocationCreateManyInput = {
    id?: string;
    bookingId: string;
    slotId: string;
    minutes: number;
};
export type CapacityBookingAllocationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    minutes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CapacityBookingAllocationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    minutes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CapacityBookingAllocationListRelationFilter = {
    every?: Prisma.CapacityBookingAllocationWhereInput;
    some?: Prisma.CapacityBookingAllocationWhereInput;
    none?: Prisma.CapacityBookingAllocationWhereInput;
};
export type CapacityBookingAllocationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CapacityBookingAllocationBookingIdSlotIdCompoundUniqueInput = {
    bookingId: string;
    slotId: string;
};
export type CapacityBookingAllocationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    minutes?: Prisma.SortOrder;
};
export type CapacityBookingAllocationAvgOrderByAggregateInput = {
    minutes?: Prisma.SortOrder;
};
export type CapacityBookingAllocationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    minutes?: Prisma.SortOrder;
};
export type CapacityBookingAllocationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    minutes?: Prisma.SortOrder;
};
export type CapacityBookingAllocationSumOrderByAggregateInput = {
    minutes?: Prisma.SortOrder;
};
export type CapacityBookingAllocationCreateNestedManyWithoutSlotInput = {
    create?: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutSlotInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutSlotInput> | Prisma.CapacityBookingAllocationCreateWithoutSlotInput[] | Prisma.CapacityBookingAllocationUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.CapacityBookingAllocationCreateOrConnectWithoutSlotInput | Prisma.CapacityBookingAllocationCreateOrConnectWithoutSlotInput[];
    createMany?: Prisma.CapacityBookingAllocationCreateManySlotInputEnvelope;
    connect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
};
export type CapacityBookingAllocationUncheckedCreateNestedManyWithoutSlotInput = {
    create?: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutSlotInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutSlotInput> | Prisma.CapacityBookingAllocationCreateWithoutSlotInput[] | Prisma.CapacityBookingAllocationUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.CapacityBookingAllocationCreateOrConnectWithoutSlotInput | Prisma.CapacityBookingAllocationCreateOrConnectWithoutSlotInput[];
    createMany?: Prisma.CapacityBookingAllocationCreateManySlotInputEnvelope;
    connect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
};
export type CapacityBookingAllocationUpdateManyWithoutSlotNestedInput = {
    create?: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutSlotInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutSlotInput> | Prisma.CapacityBookingAllocationCreateWithoutSlotInput[] | Prisma.CapacityBookingAllocationUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.CapacityBookingAllocationCreateOrConnectWithoutSlotInput | Prisma.CapacityBookingAllocationCreateOrConnectWithoutSlotInput[];
    upsert?: Prisma.CapacityBookingAllocationUpsertWithWhereUniqueWithoutSlotInput | Prisma.CapacityBookingAllocationUpsertWithWhereUniqueWithoutSlotInput[];
    createMany?: Prisma.CapacityBookingAllocationCreateManySlotInputEnvelope;
    set?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    disconnect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    delete?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    connect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    update?: Prisma.CapacityBookingAllocationUpdateWithWhereUniqueWithoutSlotInput | Prisma.CapacityBookingAllocationUpdateWithWhereUniqueWithoutSlotInput[];
    updateMany?: Prisma.CapacityBookingAllocationUpdateManyWithWhereWithoutSlotInput | Prisma.CapacityBookingAllocationUpdateManyWithWhereWithoutSlotInput[];
    deleteMany?: Prisma.CapacityBookingAllocationScalarWhereInput | Prisma.CapacityBookingAllocationScalarWhereInput[];
};
export type CapacityBookingAllocationUncheckedUpdateManyWithoutSlotNestedInput = {
    create?: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutSlotInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutSlotInput> | Prisma.CapacityBookingAllocationCreateWithoutSlotInput[] | Prisma.CapacityBookingAllocationUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.CapacityBookingAllocationCreateOrConnectWithoutSlotInput | Prisma.CapacityBookingAllocationCreateOrConnectWithoutSlotInput[];
    upsert?: Prisma.CapacityBookingAllocationUpsertWithWhereUniqueWithoutSlotInput | Prisma.CapacityBookingAllocationUpsertWithWhereUniqueWithoutSlotInput[];
    createMany?: Prisma.CapacityBookingAllocationCreateManySlotInputEnvelope;
    set?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    disconnect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    delete?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    connect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    update?: Prisma.CapacityBookingAllocationUpdateWithWhereUniqueWithoutSlotInput | Prisma.CapacityBookingAllocationUpdateWithWhereUniqueWithoutSlotInput[];
    updateMany?: Prisma.CapacityBookingAllocationUpdateManyWithWhereWithoutSlotInput | Prisma.CapacityBookingAllocationUpdateManyWithWhereWithoutSlotInput[];
    deleteMany?: Prisma.CapacityBookingAllocationScalarWhereInput | Prisma.CapacityBookingAllocationScalarWhereInput[];
};
export type CapacityBookingAllocationCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutBookingInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutBookingInput> | Prisma.CapacityBookingAllocationCreateWithoutBookingInput[] | Prisma.CapacityBookingAllocationUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.CapacityBookingAllocationCreateOrConnectWithoutBookingInput | Prisma.CapacityBookingAllocationCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.CapacityBookingAllocationCreateManyBookingInputEnvelope;
    connect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
};
export type CapacityBookingAllocationUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutBookingInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutBookingInput> | Prisma.CapacityBookingAllocationCreateWithoutBookingInput[] | Prisma.CapacityBookingAllocationUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.CapacityBookingAllocationCreateOrConnectWithoutBookingInput | Prisma.CapacityBookingAllocationCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.CapacityBookingAllocationCreateManyBookingInputEnvelope;
    connect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
};
export type CapacityBookingAllocationUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutBookingInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutBookingInput> | Prisma.CapacityBookingAllocationCreateWithoutBookingInput[] | Prisma.CapacityBookingAllocationUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.CapacityBookingAllocationCreateOrConnectWithoutBookingInput | Prisma.CapacityBookingAllocationCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.CapacityBookingAllocationUpsertWithWhereUniqueWithoutBookingInput | Prisma.CapacityBookingAllocationUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.CapacityBookingAllocationCreateManyBookingInputEnvelope;
    set?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    disconnect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    delete?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    connect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    update?: Prisma.CapacityBookingAllocationUpdateWithWhereUniqueWithoutBookingInput | Prisma.CapacityBookingAllocationUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.CapacityBookingAllocationUpdateManyWithWhereWithoutBookingInput | Prisma.CapacityBookingAllocationUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.CapacityBookingAllocationScalarWhereInput | Prisma.CapacityBookingAllocationScalarWhereInput[];
};
export type CapacityBookingAllocationUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutBookingInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutBookingInput> | Prisma.CapacityBookingAllocationCreateWithoutBookingInput[] | Prisma.CapacityBookingAllocationUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.CapacityBookingAllocationCreateOrConnectWithoutBookingInput | Prisma.CapacityBookingAllocationCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.CapacityBookingAllocationUpsertWithWhereUniqueWithoutBookingInput | Prisma.CapacityBookingAllocationUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.CapacityBookingAllocationCreateManyBookingInputEnvelope;
    set?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    disconnect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    delete?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    connect?: Prisma.CapacityBookingAllocationWhereUniqueInput | Prisma.CapacityBookingAllocationWhereUniqueInput[];
    update?: Prisma.CapacityBookingAllocationUpdateWithWhereUniqueWithoutBookingInput | Prisma.CapacityBookingAllocationUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.CapacityBookingAllocationUpdateManyWithWhereWithoutBookingInput | Prisma.CapacityBookingAllocationUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.CapacityBookingAllocationScalarWhereInput | Prisma.CapacityBookingAllocationScalarWhereInput[];
};
export type CapacityBookingAllocationCreateWithoutSlotInput = {
    id?: string;
    minutes: number;
    booking: Prisma.CapacityBookingCreateNestedOneWithoutAllocationsInput;
};
export type CapacityBookingAllocationUncheckedCreateWithoutSlotInput = {
    id?: string;
    bookingId: string;
    minutes: number;
};
export type CapacityBookingAllocationCreateOrConnectWithoutSlotInput = {
    where: Prisma.CapacityBookingAllocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutSlotInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutSlotInput>;
};
export type CapacityBookingAllocationCreateManySlotInputEnvelope = {
    data: Prisma.CapacityBookingAllocationCreateManySlotInput | Prisma.CapacityBookingAllocationCreateManySlotInput[];
    skipDuplicates?: boolean;
};
export type CapacityBookingAllocationUpsertWithWhereUniqueWithoutSlotInput = {
    where: Prisma.CapacityBookingAllocationWhereUniqueInput;
    update: Prisma.XOR<Prisma.CapacityBookingAllocationUpdateWithoutSlotInput, Prisma.CapacityBookingAllocationUncheckedUpdateWithoutSlotInput>;
    create: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutSlotInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutSlotInput>;
};
export type CapacityBookingAllocationUpdateWithWhereUniqueWithoutSlotInput = {
    where: Prisma.CapacityBookingAllocationWhereUniqueInput;
    data: Prisma.XOR<Prisma.CapacityBookingAllocationUpdateWithoutSlotInput, Prisma.CapacityBookingAllocationUncheckedUpdateWithoutSlotInput>;
};
export type CapacityBookingAllocationUpdateManyWithWhereWithoutSlotInput = {
    where: Prisma.CapacityBookingAllocationScalarWhereInput;
    data: Prisma.XOR<Prisma.CapacityBookingAllocationUpdateManyMutationInput, Prisma.CapacityBookingAllocationUncheckedUpdateManyWithoutSlotInput>;
};
export type CapacityBookingAllocationScalarWhereInput = {
    AND?: Prisma.CapacityBookingAllocationScalarWhereInput | Prisma.CapacityBookingAllocationScalarWhereInput[];
    OR?: Prisma.CapacityBookingAllocationScalarWhereInput[];
    NOT?: Prisma.CapacityBookingAllocationScalarWhereInput | Prisma.CapacityBookingAllocationScalarWhereInput[];
    id?: Prisma.UuidFilter<"CapacityBookingAllocation"> | string;
    bookingId?: Prisma.UuidFilter<"CapacityBookingAllocation"> | string;
    slotId?: Prisma.UuidFilter<"CapacityBookingAllocation"> | string;
    minutes?: Prisma.IntFilter<"CapacityBookingAllocation"> | number;
};
export type CapacityBookingAllocationCreateWithoutBookingInput = {
    id?: string;
    minutes: number;
    slot: Prisma.CapacitySlotCreateNestedOneWithoutAllocationsInput;
};
export type CapacityBookingAllocationUncheckedCreateWithoutBookingInput = {
    id?: string;
    slotId: string;
    minutes: number;
};
export type CapacityBookingAllocationCreateOrConnectWithoutBookingInput = {
    where: Prisma.CapacityBookingAllocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutBookingInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutBookingInput>;
};
export type CapacityBookingAllocationCreateManyBookingInputEnvelope = {
    data: Prisma.CapacityBookingAllocationCreateManyBookingInput | Prisma.CapacityBookingAllocationCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type CapacityBookingAllocationUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.CapacityBookingAllocationWhereUniqueInput;
    update: Prisma.XOR<Prisma.CapacityBookingAllocationUpdateWithoutBookingInput, Prisma.CapacityBookingAllocationUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.CapacityBookingAllocationCreateWithoutBookingInput, Prisma.CapacityBookingAllocationUncheckedCreateWithoutBookingInput>;
};
export type CapacityBookingAllocationUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.CapacityBookingAllocationWhereUniqueInput;
    data: Prisma.XOR<Prisma.CapacityBookingAllocationUpdateWithoutBookingInput, Prisma.CapacityBookingAllocationUncheckedUpdateWithoutBookingInput>;
};
export type CapacityBookingAllocationUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.CapacityBookingAllocationScalarWhereInput;
    data: Prisma.XOR<Prisma.CapacityBookingAllocationUpdateManyMutationInput, Prisma.CapacityBookingAllocationUncheckedUpdateManyWithoutBookingInput>;
};
export type CapacityBookingAllocationCreateManySlotInput = {
    id?: string;
    bookingId: string;
    minutes: number;
};
export type CapacityBookingAllocationUpdateWithoutSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    minutes?: Prisma.IntFieldUpdateOperationsInput | number;
    booking?: Prisma.CapacityBookingUpdateOneRequiredWithoutAllocationsNestedInput;
};
export type CapacityBookingAllocationUncheckedUpdateWithoutSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    minutes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CapacityBookingAllocationUncheckedUpdateManyWithoutSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    minutes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CapacityBookingAllocationCreateManyBookingInput = {
    id?: string;
    slotId: string;
    minutes: number;
};
export type CapacityBookingAllocationUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    minutes?: Prisma.IntFieldUpdateOperationsInput | number;
    slot?: Prisma.CapacitySlotUpdateOneRequiredWithoutAllocationsNestedInput;
};
export type CapacityBookingAllocationUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    minutes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CapacityBookingAllocationUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    minutes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CapacityBookingAllocationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    slotId?: boolean;
    minutes?: boolean;
    booking?: boolean | Prisma.CapacityBookingDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.CapacitySlotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["capacityBookingAllocation"]>;
export type CapacityBookingAllocationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    slotId?: boolean;
    minutes?: boolean;
    booking?: boolean | Prisma.CapacityBookingDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.CapacitySlotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["capacityBookingAllocation"]>;
export type CapacityBookingAllocationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    slotId?: boolean;
    minutes?: boolean;
    booking?: boolean | Prisma.CapacityBookingDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.CapacitySlotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["capacityBookingAllocation"]>;
export type CapacityBookingAllocationSelectScalar = {
    id?: boolean;
    bookingId?: boolean;
    slotId?: boolean;
    minutes?: boolean;
};
export type CapacityBookingAllocationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookingId" | "slotId" | "minutes", ExtArgs["result"]["capacityBookingAllocation"]>;
export type CapacityBookingAllocationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.CapacityBookingDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.CapacitySlotDefaultArgs<ExtArgs>;
};
export type CapacityBookingAllocationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.CapacityBookingDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.CapacitySlotDefaultArgs<ExtArgs>;
};
export type CapacityBookingAllocationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.CapacityBookingDefaultArgs<ExtArgs>;
    slot?: boolean | Prisma.CapacitySlotDefaultArgs<ExtArgs>;
};
export type $CapacityBookingAllocationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CapacityBookingAllocation";
    objects: {
        booking: Prisma.$CapacityBookingPayload<ExtArgs>;
        slot: Prisma.$CapacitySlotPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookingId: string;
        slotId: string;
        minutes: number;
    }, ExtArgs["result"]["capacityBookingAllocation"]>;
    composites: {};
};
export type CapacityBookingAllocationGetPayload<S extends boolean | null | undefined | CapacityBookingAllocationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload, S>;
export type CapacityBookingAllocationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CapacityBookingAllocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CapacityBookingAllocationCountAggregateInputType | true;
};
export interface CapacityBookingAllocationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CapacityBookingAllocation'];
        meta: {
            name: 'CapacityBookingAllocation';
        };
    };
    findUnique<T extends CapacityBookingAllocationFindUniqueArgs>(args: Prisma.SelectSubset<T, CapacityBookingAllocationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CapacityBookingAllocationClient<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CapacityBookingAllocationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CapacityBookingAllocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CapacityBookingAllocationClient<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CapacityBookingAllocationFindFirstArgs>(args?: Prisma.SelectSubset<T, CapacityBookingAllocationFindFirstArgs<ExtArgs>>): Prisma.Prisma__CapacityBookingAllocationClient<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CapacityBookingAllocationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CapacityBookingAllocationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CapacityBookingAllocationClient<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CapacityBookingAllocationFindManyArgs>(args?: Prisma.SelectSubset<T, CapacityBookingAllocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CapacityBookingAllocationCreateArgs>(args: Prisma.SelectSubset<T, CapacityBookingAllocationCreateArgs<ExtArgs>>): Prisma.Prisma__CapacityBookingAllocationClient<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CapacityBookingAllocationCreateManyArgs>(args?: Prisma.SelectSubset<T, CapacityBookingAllocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CapacityBookingAllocationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CapacityBookingAllocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CapacityBookingAllocationDeleteArgs>(args: Prisma.SelectSubset<T, CapacityBookingAllocationDeleteArgs<ExtArgs>>): Prisma.Prisma__CapacityBookingAllocationClient<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CapacityBookingAllocationUpdateArgs>(args: Prisma.SelectSubset<T, CapacityBookingAllocationUpdateArgs<ExtArgs>>): Prisma.Prisma__CapacityBookingAllocationClient<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CapacityBookingAllocationDeleteManyArgs>(args?: Prisma.SelectSubset<T, CapacityBookingAllocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CapacityBookingAllocationUpdateManyArgs>(args: Prisma.SelectSubset<T, CapacityBookingAllocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CapacityBookingAllocationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CapacityBookingAllocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CapacityBookingAllocationUpsertArgs>(args: Prisma.SelectSubset<T, CapacityBookingAllocationUpsertArgs<ExtArgs>>): Prisma.Prisma__CapacityBookingAllocationClient<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CapacityBookingAllocationCountArgs>(args?: Prisma.Subset<T, CapacityBookingAllocationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CapacityBookingAllocationCountAggregateOutputType> : number>;
    aggregate<T extends CapacityBookingAllocationAggregateArgs>(args: Prisma.Subset<T, CapacityBookingAllocationAggregateArgs>): Prisma.PrismaPromise<GetCapacityBookingAllocationAggregateType<T>>;
    groupBy<T extends CapacityBookingAllocationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CapacityBookingAllocationGroupByArgs['orderBy'];
    } : {
        orderBy?: CapacityBookingAllocationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CapacityBookingAllocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCapacityBookingAllocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CapacityBookingAllocationFieldRefs;
}
export interface Prisma__CapacityBookingAllocationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    booking<T extends Prisma.CapacityBookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CapacityBookingDefaultArgs<ExtArgs>>): Prisma.Prisma__CapacityBookingClient<runtime.Types.Result.GetResult<Prisma.$CapacityBookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    slot<T extends Prisma.CapacitySlotDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CapacitySlotDefaultArgs<ExtArgs>>): Prisma.Prisma__CapacitySlotClient<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CapacityBookingAllocationFieldRefs {
    readonly id: Prisma.FieldRef<"CapacityBookingAllocation", 'String'>;
    readonly bookingId: Prisma.FieldRef<"CapacityBookingAllocation", 'String'>;
    readonly slotId: Prisma.FieldRef<"CapacityBookingAllocation", 'String'>;
    readonly minutes: Prisma.FieldRef<"CapacityBookingAllocation", 'Int'>;
}
export type CapacityBookingAllocationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingAllocationInclude<ExtArgs> | null;
    where: Prisma.CapacityBookingAllocationWhereUniqueInput;
};
export type CapacityBookingAllocationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingAllocationInclude<ExtArgs> | null;
    where: Prisma.CapacityBookingAllocationWhereUniqueInput;
};
export type CapacityBookingAllocationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingAllocationInclude<ExtArgs> | null;
    where?: Prisma.CapacityBookingAllocationWhereInput;
    orderBy?: Prisma.CapacityBookingAllocationOrderByWithRelationInput | Prisma.CapacityBookingAllocationOrderByWithRelationInput[];
    cursor?: Prisma.CapacityBookingAllocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacityBookingAllocationScalarFieldEnum | Prisma.CapacityBookingAllocationScalarFieldEnum[];
};
export type CapacityBookingAllocationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingAllocationInclude<ExtArgs> | null;
    where?: Prisma.CapacityBookingAllocationWhereInput;
    orderBy?: Prisma.CapacityBookingAllocationOrderByWithRelationInput | Prisma.CapacityBookingAllocationOrderByWithRelationInput[];
    cursor?: Prisma.CapacityBookingAllocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacityBookingAllocationScalarFieldEnum | Prisma.CapacityBookingAllocationScalarFieldEnum[];
};
export type CapacityBookingAllocationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingAllocationInclude<ExtArgs> | null;
    where?: Prisma.CapacityBookingAllocationWhereInput;
    orderBy?: Prisma.CapacityBookingAllocationOrderByWithRelationInput | Prisma.CapacityBookingAllocationOrderByWithRelationInput[];
    cursor?: Prisma.CapacityBookingAllocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacityBookingAllocationScalarFieldEnum | Prisma.CapacityBookingAllocationScalarFieldEnum[];
};
export type CapacityBookingAllocationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingAllocationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CapacityBookingAllocationCreateInput, Prisma.CapacityBookingAllocationUncheckedCreateInput>;
};
export type CapacityBookingAllocationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CapacityBookingAllocationCreateManyInput | Prisma.CapacityBookingAllocationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CapacityBookingAllocationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    data: Prisma.CapacityBookingAllocationCreateManyInput | Prisma.CapacityBookingAllocationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CapacityBookingAllocationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CapacityBookingAllocationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingAllocationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CapacityBookingAllocationUpdateInput, Prisma.CapacityBookingAllocationUncheckedUpdateInput>;
    where: Prisma.CapacityBookingAllocationWhereUniqueInput;
};
export type CapacityBookingAllocationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CapacityBookingAllocationUpdateManyMutationInput, Prisma.CapacityBookingAllocationUncheckedUpdateManyInput>;
    where?: Prisma.CapacityBookingAllocationWhereInput;
    limit?: number;
};
export type CapacityBookingAllocationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CapacityBookingAllocationUpdateManyMutationInput, Prisma.CapacityBookingAllocationUncheckedUpdateManyInput>;
    where?: Prisma.CapacityBookingAllocationWhereInput;
    limit?: number;
    include?: Prisma.CapacityBookingAllocationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CapacityBookingAllocationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingAllocationInclude<ExtArgs> | null;
    where: Prisma.CapacityBookingAllocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.CapacityBookingAllocationCreateInput, Prisma.CapacityBookingAllocationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CapacityBookingAllocationUpdateInput, Prisma.CapacityBookingAllocationUncheckedUpdateInput>;
};
export type CapacityBookingAllocationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingAllocationInclude<ExtArgs> | null;
    where: Prisma.CapacityBookingAllocationWhereUniqueInput;
};
export type CapacityBookingAllocationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacityBookingAllocationWhereInput;
    limit?: number;
};
export type CapacityBookingAllocationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacityBookingAllocationSelect<ExtArgs> | null;
    omit?: Prisma.CapacityBookingAllocationOmit<ExtArgs> | null;
    include?: Prisma.CapacityBookingAllocationInclude<ExtArgs> | null;
};
