import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CapacitySlotModel = runtime.Types.Result.DefaultSelection<Prisma.$CapacitySlotPayload>;
export type AggregateCapacitySlot = {
    _count: CapacitySlotCountAggregateOutputType | null;
    _avg: CapacitySlotAvgAggregateOutputType | null;
    _sum: CapacitySlotSumAggregateOutputType | null;
    _min: CapacitySlotMinAggregateOutputType | null;
    _max: CapacitySlotMaxAggregateOutputType | null;
};
export type CapacitySlotAvgAggregateOutputType = {
    totalMinutes: number | null;
    bookedMinutes: number | null;
};
export type CapacitySlotSumAggregateOutputType = {
    totalMinutes: number | null;
    bookedMinutes: number | null;
};
export type CapacitySlotMinAggregateOutputType = {
    id: string | null;
    lineId: string | null;
    startDate: Date | null;
    endDate: Date | null;
    totalMinutes: number | null;
    bookedMinutes: number | null;
    status: $Enums.CapacitySlotStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CapacitySlotMaxAggregateOutputType = {
    id: string | null;
    lineId: string | null;
    startDate: Date | null;
    endDate: Date | null;
    totalMinutes: number | null;
    bookedMinutes: number | null;
    status: $Enums.CapacitySlotStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CapacitySlotCountAggregateOutputType = {
    id: number;
    lineId: number;
    startDate: number;
    endDate: number;
    totalMinutes: number;
    bookedMinutes: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CapacitySlotAvgAggregateInputType = {
    totalMinutes?: true;
    bookedMinutes?: true;
};
export type CapacitySlotSumAggregateInputType = {
    totalMinutes?: true;
    bookedMinutes?: true;
};
export type CapacitySlotMinAggregateInputType = {
    id?: true;
    lineId?: true;
    startDate?: true;
    endDate?: true;
    totalMinutes?: true;
    bookedMinutes?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CapacitySlotMaxAggregateInputType = {
    id?: true;
    lineId?: true;
    startDate?: true;
    endDate?: true;
    totalMinutes?: true;
    bookedMinutes?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CapacitySlotCountAggregateInputType = {
    id?: true;
    lineId?: true;
    startDate?: true;
    endDate?: true;
    totalMinutes?: true;
    bookedMinutes?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CapacitySlotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacitySlotWhereInput;
    orderBy?: Prisma.CapacitySlotOrderByWithRelationInput | Prisma.CapacitySlotOrderByWithRelationInput[];
    cursor?: Prisma.CapacitySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CapacitySlotCountAggregateInputType;
    _avg?: CapacitySlotAvgAggregateInputType;
    _sum?: CapacitySlotSumAggregateInputType;
    _min?: CapacitySlotMinAggregateInputType;
    _max?: CapacitySlotMaxAggregateInputType;
};
export type GetCapacitySlotAggregateType<T extends CapacitySlotAggregateArgs> = {
    [P in keyof T & keyof AggregateCapacitySlot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCapacitySlot[P]> : Prisma.GetScalarType<T[P], AggregateCapacitySlot[P]>;
};
export type CapacitySlotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacitySlotWhereInput;
    orderBy?: Prisma.CapacitySlotOrderByWithAggregationInput | Prisma.CapacitySlotOrderByWithAggregationInput[];
    by: Prisma.CapacitySlotScalarFieldEnum[] | Prisma.CapacitySlotScalarFieldEnum;
    having?: Prisma.CapacitySlotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CapacitySlotCountAggregateInputType | true;
    _avg?: CapacitySlotAvgAggregateInputType;
    _sum?: CapacitySlotSumAggregateInputType;
    _min?: CapacitySlotMinAggregateInputType;
    _max?: CapacitySlotMaxAggregateInputType;
};
export type CapacitySlotGroupByOutputType = {
    id: string;
    lineId: string;
    startDate: Date;
    endDate: Date;
    totalMinutes: number;
    bookedMinutes: number;
    status: $Enums.CapacitySlotStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: CapacitySlotCountAggregateOutputType | null;
    _avg: CapacitySlotAvgAggregateOutputType | null;
    _sum: CapacitySlotSumAggregateOutputType | null;
    _min: CapacitySlotMinAggregateOutputType | null;
    _max: CapacitySlotMaxAggregateOutputType | null;
};
export type GetCapacitySlotGroupByPayload<T extends CapacitySlotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CapacitySlotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CapacitySlotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CapacitySlotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CapacitySlotGroupByOutputType[P]>;
}>>;
export type CapacitySlotWhereInput = {
    AND?: Prisma.CapacitySlotWhereInput | Prisma.CapacitySlotWhereInput[];
    OR?: Prisma.CapacitySlotWhereInput[];
    NOT?: Prisma.CapacitySlotWhereInput | Prisma.CapacitySlotWhereInput[];
    id?: Prisma.UuidFilter<"CapacitySlot"> | string;
    lineId?: Prisma.UuidFilter<"CapacitySlot"> | string;
    startDate?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
    endDate?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
    totalMinutes?: Prisma.IntFilter<"CapacitySlot"> | number;
    bookedMinutes?: Prisma.IntFilter<"CapacitySlot"> | number;
    status?: Prisma.EnumCapacitySlotStatusFilter<"CapacitySlot"> | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
    line?: Prisma.XOR<Prisma.ProductionLineScalarRelationFilter, Prisma.ProductionLineWhereInput>;
    allocations?: Prisma.CapacityBookingAllocationListRelationFilter;
};
export type CapacitySlotOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    lineId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    totalMinutes?: Prisma.SortOrder;
    bookedMinutes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    line?: Prisma.ProductionLineOrderByWithRelationInput;
    allocations?: Prisma.CapacityBookingAllocationOrderByRelationAggregateInput;
};
export type CapacitySlotWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CapacitySlotWhereInput | Prisma.CapacitySlotWhereInput[];
    OR?: Prisma.CapacitySlotWhereInput[];
    NOT?: Prisma.CapacitySlotWhereInput | Prisma.CapacitySlotWhereInput[];
    lineId?: Prisma.UuidFilter<"CapacitySlot"> | string;
    startDate?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
    endDate?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
    totalMinutes?: Prisma.IntFilter<"CapacitySlot"> | number;
    bookedMinutes?: Prisma.IntFilter<"CapacitySlot"> | number;
    status?: Prisma.EnumCapacitySlotStatusFilter<"CapacitySlot"> | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
    line?: Prisma.XOR<Prisma.ProductionLineScalarRelationFilter, Prisma.ProductionLineWhereInput>;
    allocations?: Prisma.CapacityBookingAllocationListRelationFilter;
}, "id">;
export type CapacitySlotOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    lineId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    totalMinutes?: Prisma.SortOrder;
    bookedMinutes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CapacitySlotCountOrderByAggregateInput;
    _avg?: Prisma.CapacitySlotAvgOrderByAggregateInput;
    _max?: Prisma.CapacitySlotMaxOrderByAggregateInput;
    _min?: Prisma.CapacitySlotMinOrderByAggregateInput;
    _sum?: Prisma.CapacitySlotSumOrderByAggregateInput;
};
export type CapacitySlotScalarWhereWithAggregatesInput = {
    AND?: Prisma.CapacitySlotScalarWhereWithAggregatesInput | Prisma.CapacitySlotScalarWhereWithAggregatesInput[];
    OR?: Prisma.CapacitySlotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CapacitySlotScalarWhereWithAggregatesInput | Prisma.CapacitySlotScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CapacitySlot"> | string;
    lineId?: Prisma.UuidWithAggregatesFilter<"CapacitySlot"> | string;
    startDate?: Prisma.DateTimeWithAggregatesFilter<"CapacitySlot"> | Date | string;
    endDate?: Prisma.DateTimeWithAggregatesFilter<"CapacitySlot"> | Date | string;
    totalMinutes?: Prisma.IntWithAggregatesFilter<"CapacitySlot"> | number;
    bookedMinutes?: Prisma.IntWithAggregatesFilter<"CapacitySlot"> | number;
    status?: Prisma.EnumCapacitySlotStatusWithAggregatesFilter<"CapacitySlot"> | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CapacitySlot"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CapacitySlot"> | Date | string;
};
export type CapacitySlotCreateInput = {
    id?: string;
    startDate: Date | string;
    endDate: Date | string;
    totalMinutes: number;
    bookedMinutes?: number;
    status?: $Enums.CapacitySlotStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    line: Prisma.ProductionLineCreateNestedOneWithoutSlotsInput;
    allocations?: Prisma.CapacityBookingAllocationCreateNestedManyWithoutSlotInput;
};
export type CapacitySlotUncheckedCreateInput = {
    id?: string;
    lineId: string;
    startDate: Date | string;
    endDate: Date | string;
    totalMinutes: number;
    bookedMinutes?: number;
    status?: $Enums.CapacitySlotStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    allocations?: Prisma.CapacityBookingAllocationUncheckedCreateNestedManyWithoutSlotInput;
};
export type CapacitySlotUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    bookedMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumCapacitySlotStatusFieldUpdateOperationsInput | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    line?: Prisma.ProductionLineUpdateOneRequiredWithoutSlotsNestedInput;
    allocations?: Prisma.CapacityBookingAllocationUpdateManyWithoutSlotNestedInput;
};
export type CapacitySlotUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineId?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    bookedMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumCapacitySlotStatusFieldUpdateOperationsInput | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    allocations?: Prisma.CapacityBookingAllocationUncheckedUpdateManyWithoutSlotNestedInput;
};
export type CapacitySlotCreateManyInput = {
    id?: string;
    lineId: string;
    startDate: Date | string;
    endDate: Date | string;
    totalMinutes: number;
    bookedMinutes?: number;
    status?: $Enums.CapacitySlotStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CapacitySlotUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    bookedMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumCapacitySlotStatusFieldUpdateOperationsInput | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CapacitySlotUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineId?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    bookedMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumCapacitySlotStatusFieldUpdateOperationsInput | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CapacitySlotListRelationFilter = {
    every?: Prisma.CapacitySlotWhereInput;
    some?: Prisma.CapacitySlotWhereInput;
    none?: Prisma.CapacitySlotWhereInput;
};
export type CapacitySlotOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CapacitySlotCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lineId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    totalMinutes?: Prisma.SortOrder;
    bookedMinutes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CapacitySlotAvgOrderByAggregateInput = {
    totalMinutes?: Prisma.SortOrder;
    bookedMinutes?: Prisma.SortOrder;
};
export type CapacitySlotMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lineId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    totalMinutes?: Prisma.SortOrder;
    bookedMinutes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CapacitySlotMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lineId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    totalMinutes?: Prisma.SortOrder;
    bookedMinutes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CapacitySlotSumOrderByAggregateInput = {
    totalMinutes?: Prisma.SortOrder;
    bookedMinutes?: Prisma.SortOrder;
};
export type CapacitySlotScalarRelationFilter = {
    is?: Prisma.CapacitySlotWhereInput;
    isNot?: Prisma.CapacitySlotWhereInput;
};
export type CapacitySlotCreateNestedManyWithoutLineInput = {
    create?: Prisma.XOR<Prisma.CapacitySlotCreateWithoutLineInput, Prisma.CapacitySlotUncheckedCreateWithoutLineInput> | Prisma.CapacitySlotCreateWithoutLineInput[] | Prisma.CapacitySlotUncheckedCreateWithoutLineInput[];
    connectOrCreate?: Prisma.CapacitySlotCreateOrConnectWithoutLineInput | Prisma.CapacitySlotCreateOrConnectWithoutLineInput[];
    createMany?: Prisma.CapacitySlotCreateManyLineInputEnvelope;
    connect?: Prisma.CapacitySlotWhereUniqueInput | Prisma.CapacitySlotWhereUniqueInput[];
};
export type CapacitySlotUncheckedCreateNestedManyWithoutLineInput = {
    create?: Prisma.XOR<Prisma.CapacitySlotCreateWithoutLineInput, Prisma.CapacitySlotUncheckedCreateWithoutLineInput> | Prisma.CapacitySlotCreateWithoutLineInput[] | Prisma.CapacitySlotUncheckedCreateWithoutLineInput[];
    connectOrCreate?: Prisma.CapacitySlotCreateOrConnectWithoutLineInput | Prisma.CapacitySlotCreateOrConnectWithoutLineInput[];
    createMany?: Prisma.CapacitySlotCreateManyLineInputEnvelope;
    connect?: Prisma.CapacitySlotWhereUniqueInput | Prisma.CapacitySlotWhereUniqueInput[];
};
export type CapacitySlotUpdateManyWithoutLineNestedInput = {
    create?: Prisma.XOR<Prisma.CapacitySlotCreateWithoutLineInput, Prisma.CapacitySlotUncheckedCreateWithoutLineInput> | Prisma.CapacitySlotCreateWithoutLineInput[] | Prisma.CapacitySlotUncheckedCreateWithoutLineInput[];
    connectOrCreate?: Prisma.CapacitySlotCreateOrConnectWithoutLineInput | Prisma.CapacitySlotCreateOrConnectWithoutLineInput[];
    upsert?: Prisma.CapacitySlotUpsertWithWhereUniqueWithoutLineInput | Prisma.CapacitySlotUpsertWithWhereUniqueWithoutLineInput[];
    createMany?: Prisma.CapacitySlotCreateManyLineInputEnvelope;
    set?: Prisma.CapacitySlotWhereUniqueInput | Prisma.CapacitySlotWhereUniqueInput[];
    disconnect?: Prisma.CapacitySlotWhereUniqueInput | Prisma.CapacitySlotWhereUniqueInput[];
    delete?: Prisma.CapacitySlotWhereUniqueInput | Prisma.CapacitySlotWhereUniqueInput[];
    connect?: Prisma.CapacitySlotWhereUniqueInput | Prisma.CapacitySlotWhereUniqueInput[];
    update?: Prisma.CapacitySlotUpdateWithWhereUniqueWithoutLineInput | Prisma.CapacitySlotUpdateWithWhereUniqueWithoutLineInput[];
    updateMany?: Prisma.CapacitySlotUpdateManyWithWhereWithoutLineInput | Prisma.CapacitySlotUpdateManyWithWhereWithoutLineInput[];
    deleteMany?: Prisma.CapacitySlotScalarWhereInput | Prisma.CapacitySlotScalarWhereInput[];
};
export type CapacitySlotUncheckedUpdateManyWithoutLineNestedInput = {
    create?: Prisma.XOR<Prisma.CapacitySlotCreateWithoutLineInput, Prisma.CapacitySlotUncheckedCreateWithoutLineInput> | Prisma.CapacitySlotCreateWithoutLineInput[] | Prisma.CapacitySlotUncheckedCreateWithoutLineInput[];
    connectOrCreate?: Prisma.CapacitySlotCreateOrConnectWithoutLineInput | Prisma.CapacitySlotCreateOrConnectWithoutLineInput[];
    upsert?: Prisma.CapacitySlotUpsertWithWhereUniqueWithoutLineInput | Prisma.CapacitySlotUpsertWithWhereUniqueWithoutLineInput[];
    createMany?: Prisma.CapacitySlotCreateManyLineInputEnvelope;
    set?: Prisma.CapacitySlotWhereUniqueInput | Prisma.CapacitySlotWhereUniqueInput[];
    disconnect?: Prisma.CapacitySlotWhereUniqueInput | Prisma.CapacitySlotWhereUniqueInput[];
    delete?: Prisma.CapacitySlotWhereUniqueInput | Prisma.CapacitySlotWhereUniqueInput[];
    connect?: Prisma.CapacitySlotWhereUniqueInput | Prisma.CapacitySlotWhereUniqueInput[];
    update?: Prisma.CapacitySlotUpdateWithWhereUniqueWithoutLineInput | Prisma.CapacitySlotUpdateWithWhereUniqueWithoutLineInput[];
    updateMany?: Prisma.CapacitySlotUpdateManyWithWhereWithoutLineInput | Prisma.CapacitySlotUpdateManyWithWhereWithoutLineInput[];
    deleteMany?: Prisma.CapacitySlotScalarWhereInput | Prisma.CapacitySlotScalarWhereInput[];
};
export type EnumCapacitySlotStatusFieldUpdateOperationsInput = {
    set?: $Enums.CapacitySlotStatus;
};
export type CapacitySlotCreateNestedOneWithoutAllocationsInput = {
    create?: Prisma.XOR<Prisma.CapacitySlotCreateWithoutAllocationsInput, Prisma.CapacitySlotUncheckedCreateWithoutAllocationsInput>;
    connectOrCreate?: Prisma.CapacitySlotCreateOrConnectWithoutAllocationsInput;
    connect?: Prisma.CapacitySlotWhereUniqueInput;
};
export type CapacitySlotUpdateOneRequiredWithoutAllocationsNestedInput = {
    create?: Prisma.XOR<Prisma.CapacitySlotCreateWithoutAllocationsInput, Prisma.CapacitySlotUncheckedCreateWithoutAllocationsInput>;
    connectOrCreate?: Prisma.CapacitySlotCreateOrConnectWithoutAllocationsInput;
    upsert?: Prisma.CapacitySlotUpsertWithoutAllocationsInput;
    connect?: Prisma.CapacitySlotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CapacitySlotUpdateToOneWithWhereWithoutAllocationsInput, Prisma.CapacitySlotUpdateWithoutAllocationsInput>, Prisma.CapacitySlotUncheckedUpdateWithoutAllocationsInput>;
};
export type CapacitySlotCreateWithoutLineInput = {
    id?: string;
    startDate: Date | string;
    endDate: Date | string;
    totalMinutes: number;
    bookedMinutes?: number;
    status?: $Enums.CapacitySlotStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    allocations?: Prisma.CapacityBookingAllocationCreateNestedManyWithoutSlotInput;
};
export type CapacitySlotUncheckedCreateWithoutLineInput = {
    id?: string;
    startDate: Date | string;
    endDate: Date | string;
    totalMinutes: number;
    bookedMinutes?: number;
    status?: $Enums.CapacitySlotStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    allocations?: Prisma.CapacityBookingAllocationUncheckedCreateNestedManyWithoutSlotInput;
};
export type CapacitySlotCreateOrConnectWithoutLineInput = {
    where: Prisma.CapacitySlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.CapacitySlotCreateWithoutLineInput, Prisma.CapacitySlotUncheckedCreateWithoutLineInput>;
};
export type CapacitySlotCreateManyLineInputEnvelope = {
    data: Prisma.CapacitySlotCreateManyLineInput | Prisma.CapacitySlotCreateManyLineInput[];
    skipDuplicates?: boolean;
};
export type CapacitySlotUpsertWithWhereUniqueWithoutLineInput = {
    where: Prisma.CapacitySlotWhereUniqueInput;
    update: Prisma.XOR<Prisma.CapacitySlotUpdateWithoutLineInput, Prisma.CapacitySlotUncheckedUpdateWithoutLineInput>;
    create: Prisma.XOR<Prisma.CapacitySlotCreateWithoutLineInput, Prisma.CapacitySlotUncheckedCreateWithoutLineInput>;
};
export type CapacitySlotUpdateWithWhereUniqueWithoutLineInput = {
    where: Prisma.CapacitySlotWhereUniqueInput;
    data: Prisma.XOR<Prisma.CapacitySlotUpdateWithoutLineInput, Prisma.CapacitySlotUncheckedUpdateWithoutLineInput>;
};
export type CapacitySlotUpdateManyWithWhereWithoutLineInput = {
    where: Prisma.CapacitySlotScalarWhereInput;
    data: Prisma.XOR<Prisma.CapacitySlotUpdateManyMutationInput, Prisma.CapacitySlotUncheckedUpdateManyWithoutLineInput>;
};
export type CapacitySlotScalarWhereInput = {
    AND?: Prisma.CapacitySlotScalarWhereInput | Prisma.CapacitySlotScalarWhereInput[];
    OR?: Prisma.CapacitySlotScalarWhereInput[];
    NOT?: Prisma.CapacitySlotScalarWhereInput | Prisma.CapacitySlotScalarWhereInput[];
    id?: Prisma.UuidFilter<"CapacitySlot"> | string;
    lineId?: Prisma.UuidFilter<"CapacitySlot"> | string;
    startDate?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
    endDate?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
    totalMinutes?: Prisma.IntFilter<"CapacitySlot"> | number;
    bookedMinutes?: Prisma.IntFilter<"CapacitySlot"> | number;
    status?: Prisma.EnumCapacitySlotStatusFilter<"CapacitySlot"> | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CapacitySlot"> | Date | string;
};
export type CapacitySlotCreateWithoutAllocationsInput = {
    id?: string;
    startDate: Date | string;
    endDate: Date | string;
    totalMinutes: number;
    bookedMinutes?: number;
    status?: $Enums.CapacitySlotStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    line: Prisma.ProductionLineCreateNestedOneWithoutSlotsInput;
};
export type CapacitySlotUncheckedCreateWithoutAllocationsInput = {
    id?: string;
    lineId: string;
    startDate: Date | string;
    endDate: Date | string;
    totalMinutes: number;
    bookedMinutes?: number;
    status?: $Enums.CapacitySlotStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CapacitySlotCreateOrConnectWithoutAllocationsInput = {
    where: Prisma.CapacitySlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.CapacitySlotCreateWithoutAllocationsInput, Prisma.CapacitySlotUncheckedCreateWithoutAllocationsInput>;
};
export type CapacitySlotUpsertWithoutAllocationsInput = {
    update: Prisma.XOR<Prisma.CapacitySlotUpdateWithoutAllocationsInput, Prisma.CapacitySlotUncheckedUpdateWithoutAllocationsInput>;
    create: Prisma.XOR<Prisma.CapacitySlotCreateWithoutAllocationsInput, Prisma.CapacitySlotUncheckedCreateWithoutAllocationsInput>;
    where?: Prisma.CapacitySlotWhereInput;
};
export type CapacitySlotUpdateToOneWithWhereWithoutAllocationsInput = {
    where?: Prisma.CapacitySlotWhereInput;
    data: Prisma.XOR<Prisma.CapacitySlotUpdateWithoutAllocationsInput, Prisma.CapacitySlotUncheckedUpdateWithoutAllocationsInput>;
};
export type CapacitySlotUpdateWithoutAllocationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    bookedMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumCapacitySlotStatusFieldUpdateOperationsInput | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    line?: Prisma.ProductionLineUpdateOneRequiredWithoutSlotsNestedInput;
};
export type CapacitySlotUncheckedUpdateWithoutAllocationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineId?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    bookedMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumCapacitySlotStatusFieldUpdateOperationsInput | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CapacitySlotCreateManyLineInput = {
    id?: string;
    startDate: Date | string;
    endDate: Date | string;
    totalMinutes: number;
    bookedMinutes?: number;
    status?: $Enums.CapacitySlotStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CapacitySlotUpdateWithoutLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    bookedMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumCapacitySlotStatusFieldUpdateOperationsInput | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    allocations?: Prisma.CapacityBookingAllocationUpdateManyWithoutSlotNestedInput;
};
export type CapacitySlotUncheckedUpdateWithoutLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    bookedMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumCapacitySlotStatusFieldUpdateOperationsInput | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    allocations?: Prisma.CapacityBookingAllocationUncheckedUpdateManyWithoutSlotNestedInput;
};
export type CapacitySlotUncheckedUpdateManyWithoutLineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    totalMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    bookedMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumCapacitySlotStatusFieldUpdateOperationsInput | $Enums.CapacitySlotStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CapacitySlotCountOutputType = {
    allocations: number;
};
export type CapacitySlotCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    allocations?: boolean | CapacitySlotCountOutputTypeCountAllocationsArgs;
};
export type CapacitySlotCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotCountOutputTypeSelect<ExtArgs> | null;
};
export type CapacitySlotCountOutputTypeCountAllocationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacityBookingAllocationWhereInput;
};
export type CapacitySlotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lineId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    totalMinutes?: boolean;
    bookedMinutes?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    line?: boolean | Prisma.ProductionLineDefaultArgs<ExtArgs>;
    allocations?: boolean | Prisma.CapacitySlot$allocationsArgs<ExtArgs>;
    _count?: boolean | Prisma.CapacitySlotCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["capacitySlot"]>;
export type CapacitySlotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lineId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    totalMinutes?: boolean;
    bookedMinutes?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    line?: boolean | Prisma.ProductionLineDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["capacitySlot"]>;
export type CapacitySlotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lineId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    totalMinutes?: boolean;
    bookedMinutes?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    line?: boolean | Prisma.ProductionLineDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["capacitySlot"]>;
export type CapacitySlotSelectScalar = {
    id?: boolean;
    lineId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    totalMinutes?: boolean;
    bookedMinutes?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CapacitySlotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "lineId" | "startDate" | "endDate" | "totalMinutes" | "bookedMinutes" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["capacitySlot"]>;
export type CapacitySlotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    line?: boolean | Prisma.ProductionLineDefaultArgs<ExtArgs>;
    allocations?: boolean | Prisma.CapacitySlot$allocationsArgs<ExtArgs>;
    _count?: boolean | Prisma.CapacitySlotCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CapacitySlotIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    line?: boolean | Prisma.ProductionLineDefaultArgs<ExtArgs>;
};
export type CapacitySlotIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    line?: boolean | Prisma.ProductionLineDefaultArgs<ExtArgs>;
};
export type $CapacitySlotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CapacitySlot";
    objects: {
        line: Prisma.$ProductionLinePayload<ExtArgs>;
        allocations: Prisma.$CapacityBookingAllocationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        lineId: string;
        startDate: Date;
        endDate: Date;
        totalMinutes: number;
        bookedMinutes: number;
        status: $Enums.CapacitySlotStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["capacitySlot"]>;
    composites: {};
};
export type CapacitySlotGetPayload<S extends boolean | null | undefined | CapacitySlotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload, S>;
export type CapacitySlotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CapacitySlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CapacitySlotCountAggregateInputType | true;
};
export interface CapacitySlotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CapacitySlot'];
        meta: {
            name: 'CapacitySlot';
        };
    };
    findUnique<T extends CapacitySlotFindUniqueArgs>(args: Prisma.SelectSubset<T, CapacitySlotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CapacitySlotClient<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CapacitySlotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CapacitySlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CapacitySlotClient<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CapacitySlotFindFirstArgs>(args?: Prisma.SelectSubset<T, CapacitySlotFindFirstArgs<ExtArgs>>): Prisma.Prisma__CapacitySlotClient<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CapacitySlotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CapacitySlotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CapacitySlotClient<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CapacitySlotFindManyArgs>(args?: Prisma.SelectSubset<T, CapacitySlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CapacitySlotCreateArgs>(args: Prisma.SelectSubset<T, CapacitySlotCreateArgs<ExtArgs>>): Prisma.Prisma__CapacitySlotClient<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CapacitySlotCreateManyArgs>(args?: Prisma.SelectSubset<T, CapacitySlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CapacitySlotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CapacitySlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CapacitySlotDeleteArgs>(args: Prisma.SelectSubset<T, CapacitySlotDeleteArgs<ExtArgs>>): Prisma.Prisma__CapacitySlotClient<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CapacitySlotUpdateArgs>(args: Prisma.SelectSubset<T, CapacitySlotUpdateArgs<ExtArgs>>): Prisma.Prisma__CapacitySlotClient<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CapacitySlotDeleteManyArgs>(args?: Prisma.SelectSubset<T, CapacitySlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CapacitySlotUpdateManyArgs>(args: Prisma.SelectSubset<T, CapacitySlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CapacitySlotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CapacitySlotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CapacitySlotUpsertArgs>(args: Prisma.SelectSubset<T, CapacitySlotUpsertArgs<ExtArgs>>): Prisma.Prisma__CapacitySlotClient<runtime.Types.Result.GetResult<Prisma.$CapacitySlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CapacitySlotCountArgs>(args?: Prisma.Subset<T, CapacitySlotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CapacitySlotCountAggregateOutputType> : number>;
    aggregate<T extends CapacitySlotAggregateArgs>(args: Prisma.Subset<T, CapacitySlotAggregateArgs>): Prisma.PrismaPromise<GetCapacitySlotAggregateType<T>>;
    groupBy<T extends CapacitySlotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CapacitySlotGroupByArgs['orderBy'];
    } : {
        orderBy?: CapacitySlotGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CapacitySlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCapacitySlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CapacitySlotFieldRefs;
}
export interface Prisma__CapacitySlotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    line<T extends Prisma.ProductionLineDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionLineDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductionLineClient<runtime.Types.Result.GetResult<Prisma.$ProductionLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    allocations<T extends Prisma.CapacitySlot$allocationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CapacitySlot$allocationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacityBookingAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CapacitySlotFieldRefs {
    readonly id: Prisma.FieldRef<"CapacitySlot", 'String'>;
    readonly lineId: Prisma.FieldRef<"CapacitySlot", 'String'>;
    readonly startDate: Prisma.FieldRef<"CapacitySlot", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"CapacitySlot", 'DateTime'>;
    readonly totalMinutes: Prisma.FieldRef<"CapacitySlot", 'Int'>;
    readonly bookedMinutes: Prisma.FieldRef<"CapacitySlot", 'Int'>;
    readonly status: Prisma.FieldRef<"CapacitySlot", 'CapacitySlotStatus'>;
    readonly createdAt: Prisma.FieldRef<"CapacitySlot", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CapacitySlot", 'DateTime'>;
}
export type CapacitySlotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelect<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    include?: Prisma.CapacitySlotInclude<ExtArgs> | null;
    where: Prisma.CapacitySlotWhereUniqueInput;
};
export type CapacitySlotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelect<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    include?: Prisma.CapacitySlotInclude<ExtArgs> | null;
    where: Prisma.CapacitySlotWhereUniqueInput;
};
export type CapacitySlotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelect<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    include?: Prisma.CapacitySlotInclude<ExtArgs> | null;
    where?: Prisma.CapacitySlotWhereInput;
    orderBy?: Prisma.CapacitySlotOrderByWithRelationInput | Prisma.CapacitySlotOrderByWithRelationInput[];
    cursor?: Prisma.CapacitySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacitySlotScalarFieldEnum | Prisma.CapacitySlotScalarFieldEnum[];
};
export type CapacitySlotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelect<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    include?: Prisma.CapacitySlotInclude<ExtArgs> | null;
    where?: Prisma.CapacitySlotWhereInput;
    orderBy?: Prisma.CapacitySlotOrderByWithRelationInput | Prisma.CapacitySlotOrderByWithRelationInput[];
    cursor?: Prisma.CapacitySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacitySlotScalarFieldEnum | Prisma.CapacitySlotScalarFieldEnum[];
};
export type CapacitySlotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelect<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    include?: Prisma.CapacitySlotInclude<ExtArgs> | null;
    where?: Prisma.CapacitySlotWhereInput;
    orderBy?: Prisma.CapacitySlotOrderByWithRelationInput | Prisma.CapacitySlotOrderByWithRelationInput[];
    cursor?: Prisma.CapacitySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacitySlotScalarFieldEnum | Prisma.CapacitySlotScalarFieldEnum[];
};
export type CapacitySlotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelect<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    include?: Prisma.CapacitySlotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CapacitySlotCreateInput, Prisma.CapacitySlotUncheckedCreateInput>;
};
export type CapacitySlotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CapacitySlotCreateManyInput | Prisma.CapacitySlotCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CapacitySlotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    data: Prisma.CapacitySlotCreateManyInput | Prisma.CapacitySlotCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CapacitySlotIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CapacitySlotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelect<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    include?: Prisma.CapacitySlotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CapacitySlotUpdateInput, Prisma.CapacitySlotUncheckedUpdateInput>;
    where: Prisma.CapacitySlotWhereUniqueInput;
};
export type CapacitySlotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CapacitySlotUpdateManyMutationInput, Prisma.CapacitySlotUncheckedUpdateManyInput>;
    where?: Prisma.CapacitySlotWhereInput;
    limit?: number;
};
export type CapacitySlotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CapacitySlotUpdateManyMutationInput, Prisma.CapacitySlotUncheckedUpdateManyInput>;
    where?: Prisma.CapacitySlotWhereInput;
    limit?: number;
    include?: Prisma.CapacitySlotIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CapacitySlotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelect<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    include?: Prisma.CapacitySlotInclude<ExtArgs> | null;
    where: Prisma.CapacitySlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.CapacitySlotCreateInput, Prisma.CapacitySlotUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CapacitySlotUpdateInput, Prisma.CapacitySlotUncheckedUpdateInput>;
};
export type CapacitySlotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelect<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    include?: Prisma.CapacitySlotInclude<ExtArgs> | null;
    where: Prisma.CapacitySlotWhereUniqueInput;
};
export type CapacitySlotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacitySlotWhereInput;
    limit?: number;
};
export type CapacitySlot$allocationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CapacitySlotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CapacitySlotSelect<ExtArgs> | null;
    omit?: Prisma.CapacitySlotOmit<ExtArgs> | null;
    include?: Prisma.CapacitySlotInclude<ExtArgs> | null;
};
