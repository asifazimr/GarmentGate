import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type HubModel = runtime.Types.Result.DefaultSelection<Prisma.$HubPayload>;
export type AggregateHub = {
    _count: HubCountAggregateOutputType | null;
    _min: HubMinAggregateOutputType | null;
    _max: HubMaxAggregateOutputType | null;
};
export type HubMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    operator: $Enums.HubOperator | null;
    partnerId: string | null;
    country: string | null;
    city: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    postalCode: string | null;
    port: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HubMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    operator: $Enums.HubOperator | null;
    partnerId: string | null;
    country: string | null;
    city: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    postalCode: string | null;
    port: string | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HubCountAggregateOutputType = {
    id: number;
    code: number;
    name: number;
    operator: number;
    partnerId: number;
    country: number;
    city: number;
    addressLine1: number;
    addressLine2: number;
    postalCode: number;
    port: number;
    active: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type HubMinAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    operator?: true;
    partnerId?: true;
    country?: true;
    city?: true;
    addressLine1?: true;
    addressLine2?: true;
    postalCode?: true;
    port?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HubMaxAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    operator?: true;
    partnerId?: true;
    country?: true;
    city?: true;
    addressLine1?: true;
    addressLine2?: true;
    postalCode?: true;
    port?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HubCountAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    operator?: true;
    partnerId?: true;
    country?: true;
    city?: true;
    addressLine1?: true;
    addressLine2?: true;
    postalCode?: true;
    port?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type HubAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubWhereInput;
    orderBy?: Prisma.HubOrderByWithRelationInput | Prisma.HubOrderByWithRelationInput[];
    cursor?: Prisma.HubWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | HubCountAggregateInputType;
    _min?: HubMinAggregateInputType;
    _max?: HubMaxAggregateInputType;
};
export type GetHubAggregateType<T extends HubAggregateArgs> = {
    [P in keyof T & keyof AggregateHub]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHub[P]> : Prisma.GetScalarType<T[P], AggregateHub[P]>;
};
export type HubGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubWhereInput;
    orderBy?: Prisma.HubOrderByWithAggregationInput | Prisma.HubOrderByWithAggregationInput[];
    by: Prisma.HubScalarFieldEnum[] | Prisma.HubScalarFieldEnum;
    having?: Prisma.HubScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HubCountAggregateInputType | true;
    _min?: HubMinAggregateInputType;
    _max?: HubMaxAggregateInputType;
};
export type HubGroupByOutputType = {
    id: string;
    code: string;
    name: string;
    operator: $Enums.HubOperator;
    partnerId: string | null;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2: string | null;
    postalCode: string | null;
    port: string | null;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: HubCountAggregateOutputType | null;
    _min: HubMinAggregateOutputType | null;
    _max: HubMaxAggregateOutputType | null;
};
export type GetHubGroupByPayload<T extends HubGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HubGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HubGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HubGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HubGroupByOutputType[P]>;
}>>;
export type HubWhereInput = {
    AND?: Prisma.HubWhereInput | Prisma.HubWhereInput[];
    OR?: Prisma.HubWhereInput[];
    NOT?: Prisma.HubWhereInput | Prisma.HubWhereInput[];
    id?: Prisma.UuidFilter<"Hub"> | string;
    code?: Prisma.StringFilter<"Hub"> | string;
    name?: Prisma.StringFilter<"Hub"> | string;
    operator?: Prisma.EnumHubOperatorFilter<"Hub"> | $Enums.HubOperator;
    partnerId?: Prisma.UuidNullableFilter<"Hub"> | string | null;
    country?: Prisma.StringFilter<"Hub"> | string;
    city?: Prisma.StringFilter<"Hub"> | string;
    addressLine1?: Prisma.StringFilter<"Hub"> | string;
    addressLine2?: Prisma.StringNullableFilter<"Hub"> | string | null;
    postalCode?: Prisma.StringNullableFilter<"Hub"> | string | null;
    port?: Prisma.StringNullableFilter<"Hub"> | string | null;
    active?: Prisma.BoolFilter<"Hub"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Hub"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Hub"> | Date | string;
    partner?: Prisma.XOR<Prisma.LogisticsPartnerNullableScalarRelationFilter, Prisma.LogisticsPartnerWhereInput> | null;
    pickups?: Prisma.PickupRequestListRelationFilter;
    receipts?: Prisma.HubReceiptListRelationFilter;
    shipments?: Prisma.LogisticsShipmentListRelationFilter;
};
export type HubOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    partnerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    country?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    addressLine1?: Prisma.SortOrder;
    addressLine2?: Prisma.SortOrderInput | Prisma.SortOrder;
    postalCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    port?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    partner?: Prisma.LogisticsPartnerOrderByWithRelationInput;
    pickups?: Prisma.PickupRequestOrderByRelationAggregateInput;
    receipts?: Prisma.HubReceiptOrderByRelationAggregateInput;
    shipments?: Prisma.LogisticsShipmentOrderByRelationAggregateInput;
};
export type HubWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.HubWhereInput | Prisma.HubWhereInput[];
    OR?: Prisma.HubWhereInput[];
    NOT?: Prisma.HubWhereInput | Prisma.HubWhereInput[];
    name?: Prisma.StringFilter<"Hub"> | string;
    operator?: Prisma.EnumHubOperatorFilter<"Hub"> | $Enums.HubOperator;
    partnerId?: Prisma.UuidNullableFilter<"Hub"> | string | null;
    country?: Prisma.StringFilter<"Hub"> | string;
    city?: Prisma.StringFilter<"Hub"> | string;
    addressLine1?: Prisma.StringFilter<"Hub"> | string;
    addressLine2?: Prisma.StringNullableFilter<"Hub"> | string | null;
    postalCode?: Prisma.StringNullableFilter<"Hub"> | string | null;
    port?: Prisma.StringNullableFilter<"Hub"> | string | null;
    active?: Prisma.BoolFilter<"Hub"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Hub"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Hub"> | Date | string;
    partner?: Prisma.XOR<Prisma.LogisticsPartnerNullableScalarRelationFilter, Prisma.LogisticsPartnerWhereInput> | null;
    pickups?: Prisma.PickupRequestListRelationFilter;
    receipts?: Prisma.HubReceiptListRelationFilter;
    shipments?: Prisma.LogisticsShipmentListRelationFilter;
}, "id" | "code">;
export type HubOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    partnerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    country?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    addressLine1?: Prisma.SortOrder;
    addressLine2?: Prisma.SortOrderInput | Prisma.SortOrder;
    postalCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    port?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.HubCountOrderByAggregateInput;
    _max?: Prisma.HubMaxOrderByAggregateInput;
    _min?: Prisma.HubMinOrderByAggregateInput;
};
export type HubScalarWhereWithAggregatesInput = {
    AND?: Prisma.HubScalarWhereWithAggregatesInput | Prisma.HubScalarWhereWithAggregatesInput[];
    OR?: Prisma.HubScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HubScalarWhereWithAggregatesInput | Prisma.HubScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Hub"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Hub"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Hub"> | string;
    operator?: Prisma.EnumHubOperatorWithAggregatesFilter<"Hub"> | $Enums.HubOperator;
    partnerId?: Prisma.UuidNullableWithAggregatesFilter<"Hub"> | string | null;
    country?: Prisma.StringWithAggregatesFilter<"Hub"> | string;
    city?: Prisma.StringWithAggregatesFilter<"Hub"> | string;
    addressLine1?: Prisma.StringWithAggregatesFilter<"Hub"> | string;
    addressLine2?: Prisma.StringNullableWithAggregatesFilter<"Hub"> | string | null;
    postalCode?: Prisma.StringNullableWithAggregatesFilter<"Hub"> | string | null;
    port?: Prisma.StringNullableWithAggregatesFilter<"Hub"> | string | null;
    active?: Prisma.BoolWithAggregatesFilter<"Hub"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Hub"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Hub"> | Date | string;
};
export type HubCreateInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    partner?: Prisma.LogisticsPartnerCreateNestedOneWithoutHubsInput;
    pickups?: Prisma.PickupRequestCreateNestedManyWithoutHubInput;
    receipts?: Prisma.HubReceiptCreateNestedManyWithoutHubInput;
    shipments?: Prisma.LogisticsShipmentCreateNestedManyWithoutOriginHubInput;
};
export type HubUncheckedCreateInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    partnerId?: string | null;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pickups?: Prisma.PickupRequestUncheckedCreateNestedManyWithoutHubInput;
    receipts?: Prisma.HubReceiptUncheckedCreateNestedManyWithoutHubInput;
    shipments?: Prisma.LogisticsShipmentUncheckedCreateNestedManyWithoutOriginHubInput;
};
export type HubUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    partner?: Prisma.LogisticsPartnerUpdateOneWithoutHubsNestedInput;
    pickups?: Prisma.PickupRequestUpdateManyWithoutHubNestedInput;
    receipts?: Prisma.HubReceiptUpdateManyWithoutHubNestedInput;
    shipments?: Prisma.LogisticsShipmentUpdateManyWithoutOriginHubNestedInput;
};
export type HubUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pickups?: Prisma.PickupRequestUncheckedUpdateManyWithoutHubNestedInput;
    receipts?: Prisma.HubReceiptUncheckedUpdateManyWithoutHubNestedInput;
    shipments?: Prisma.LogisticsShipmentUncheckedUpdateManyWithoutOriginHubNestedInput;
};
export type HubCreateManyInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    partnerId?: string | null;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HubUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HubUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HubListRelationFilter = {
    every?: Prisma.HubWhereInput;
    some?: Prisma.HubWhereInput;
    none?: Prisma.HubWhereInput;
};
export type HubOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HubCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    partnerId?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    addressLine1?: Prisma.SortOrder;
    addressLine2?: Prisma.SortOrder;
    postalCode?: Prisma.SortOrder;
    port?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HubMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    partnerId?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    addressLine1?: Prisma.SortOrder;
    addressLine2?: Prisma.SortOrder;
    postalCode?: Prisma.SortOrder;
    port?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HubMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    partnerId?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    addressLine1?: Prisma.SortOrder;
    addressLine2?: Prisma.SortOrder;
    postalCode?: Prisma.SortOrder;
    port?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HubScalarRelationFilter = {
    is?: Prisma.HubWhereInput;
    isNot?: Prisma.HubWhereInput;
};
export type HubNullableScalarRelationFilter = {
    is?: Prisma.HubWhereInput | null;
    isNot?: Prisma.HubWhereInput | null;
};
export type HubCreateNestedManyWithoutPartnerInput = {
    create?: Prisma.XOR<Prisma.HubCreateWithoutPartnerInput, Prisma.HubUncheckedCreateWithoutPartnerInput> | Prisma.HubCreateWithoutPartnerInput[] | Prisma.HubUncheckedCreateWithoutPartnerInput[];
    connectOrCreate?: Prisma.HubCreateOrConnectWithoutPartnerInput | Prisma.HubCreateOrConnectWithoutPartnerInput[];
    createMany?: Prisma.HubCreateManyPartnerInputEnvelope;
    connect?: Prisma.HubWhereUniqueInput | Prisma.HubWhereUniqueInput[];
};
export type HubUncheckedCreateNestedManyWithoutPartnerInput = {
    create?: Prisma.XOR<Prisma.HubCreateWithoutPartnerInput, Prisma.HubUncheckedCreateWithoutPartnerInput> | Prisma.HubCreateWithoutPartnerInput[] | Prisma.HubUncheckedCreateWithoutPartnerInput[];
    connectOrCreate?: Prisma.HubCreateOrConnectWithoutPartnerInput | Prisma.HubCreateOrConnectWithoutPartnerInput[];
    createMany?: Prisma.HubCreateManyPartnerInputEnvelope;
    connect?: Prisma.HubWhereUniqueInput | Prisma.HubWhereUniqueInput[];
};
export type HubUpdateManyWithoutPartnerNestedInput = {
    create?: Prisma.XOR<Prisma.HubCreateWithoutPartnerInput, Prisma.HubUncheckedCreateWithoutPartnerInput> | Prisma.HubCreateWithoutPartnerInput[] | Prisma.HubUncheckedCreateWithoutPartnerInput[];
    connectOrCreate?: Prisma.HubCreateOrConnectWithoutPartnerInput | Prisma.HubCreateOrConnectWithoutPartnerInput[];
    upsert?: Prisma.HubUpsertWithWhereUniqueWithoutPartnerInput | Prisma.HubUpsertWithWhereUniqueWithoutPartnerInput[];
    createMany?: Prisma.HubCreateManyPartnerInputEnvelope;
    set?: Prisma.HubWhereUniqueInput | Prisma.HubWhereUniqueInput[];
    disconnect?: Prisma.HubWhereUniqueInput | Prisma.HubWhereUniqueInput[];
    delete?: Prisma.HubWhereUniqueInput | Prisma.HubWhereUniqueInput[];
    connect?: Prisma.HubWhereUniqueInput | Prisma.HubWhereUniqueInput[];
    update?: Prisma.HubUpdateWithWhereUniqueWithoutPartnerInput | Prisma.HubUpdateWithWhereUniqueWithoutPartnerInput[];
    updateMany?: Prisma.HubUpdateManyWithWhereWithoutPartnerInput | Prisma.HubUpdateManyWithWhereWithoutPartnerInput[];
    deleteMany?: Prisma.HubScalarWhereInput | Prisma.HubScalarWhereInput[];
};
export type HubUncheckedUpdateManyWithoutPartnerNestedInput = {
    create?: Prisma.XOR<Prisma.HubCreateWithoutPartnerInput, Prisma.HubUncheckedCreateWithoutPartnerInput> | Prisma.HubCreateWithoutPartnerInput[] | Prisma.HubUncheckedCreateWithoutPartnerInput[];
    connectOrCreate?: Prisma.HubCreateOrConnectWithoutPartnerInput | Prisma.HubCreateOrConnectWithoutPartnerInput[];
    upsert?: Prisma.HubUpsertWithWhereUniqueWithoutPartnerInput | Prisma.HubUpsertWithWhereUniqueWithoutPartnerInput[];
    createMany?: Prisma.HubCreateManyPartnerInputEnvelope;
    set?: Prisma.HubWhereUniqueInput | Prisma.HubWhereUniqueInput[];
    disconnect?: Prisma.HubWhereUniqueInput | Prisma.HubWhereUniqueInput[];
    delete?: Prisma.HubWhereUniqueInput | Prisma.HubWhereUniqueInput[];
    connect?: Prisma.HubWhereUniqueInput | Prisma.HubWhereUniqueInput[];
    update?: Prisma.HubUpdateWithWhereUniqueWithoutPartnerInput | Prisma.HubUpdateWithWhereUniqueWithoutPartnerInput[];
    updateMany?: Prisma.HubUpdateManyWithWhereWithoutPartnerInput | Prisma.HubUpdateManyWithWhereWithoutPartnerInput[];
    deleteMany?: Prisma.HubScalarWhereInput | Prisma.HubScalarWhereInput[];
};
export type EnumHubOperatorFieldUpdateOperationsInput = {
    set?: $Enums.HubOperator;
};
export type HubCreateNestedOneWithoutPickupsInput = {
    create?: Prisma.XOR<Prisma.HubCreateWithoutPickupsInput, Prisma.HubUncheckedCreateWithoutPickupsInput>;
    connectOrCreate?: Prisma.HubCreateOrConnectWithoutPickupsInput;
    connect?: Prisma.HubWhereUniqueInput;
};
export type HubUpdateOneRequiredWithoutPickupsNestedInput = {
    create?: Prisma.XOR<Prisma.HubCreateWithoutPickupsInput, Prisma.HubUncheckedCreateWithoutPickupsInput>;
    connectOrCreate?: Prisma.HubCreateOrConnectWithoutPickupsInput;
    upsert?: Prisma.HubUpsertWithoutPickupsInput;
    connect?: Prisma.HubWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HubUpdateToOneWithWhereWithoutPickupsInput, Prisma.HubUpdateWithoutPickupsInput>, Prisma.HubUncheckedUpdateWithoutPickupsInput>;
};
export type HubCreateNestedOneWithoutReceiptsInput = {
    create?: Prisma.XOR<Prisma.HubCreateWithoutReceiptsInput, Prisma.HubUncheckedCreateWithoutReceiptsInput>;
    connectOrCreate?: Prisma.HubCreateOrConnectWithoutReceiptsInput;
    connect?: Prisma.HubWhereUniqueInput;
};
export type HubUpdateOneRequiredWithoutReceiptsNestedInput = {
    create?: Prisma.XOR<Prisma.HubCreateWithoutReceiptsInput, Prisma.HubUncheckedCreateWithoutReceiptsInput>;
    connectOrCreate?: Prisma.HubCreateOrConnectWithoutReceiptsInput;
    upsert?: Prisma.HubUpsertWithoutReceiptsInput;
    connect?: Prisma.HubWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HubUpdateToOneWithWhereWithoutReceiptsInput, Prisma.HubUpdateWithoutReceiptsInput>, Prisma.HubUncheckedUpdateWithoutReceiptsInput>;
};
export type HubCreateNestedOneWithoutShipmentsInput = {
    create?: Prisma.XOR<Prisma.HubCreateWithoutShipmentsInput, Prisma.HubUncheckedCreateWithoutShipmentsInput>;
    connectOrCreate?: Prisma.HubCreateOrConnectWithoutShipmentsInput;
    connect?: Prisma.HubWhereUniqueInput;
};
export type HubUpdateOneWithoutShipmentsNestedInput = {
    create?: Prisma.XOR<Prisma.HubCreateWithoutShipmentsInput, Prisma.HubUncheckedCreateWithoutShipmentsInput>;
    connectOrCreate?: Prisma.HubCreateOrConnectWithoutShipmentsInput;
    upsert?: Prisma.HubUpsertWithoutShipmentsInput;
    disconnect?: Prisma.HubWhereInput | boolean;
    delete?: Prisma.HubWhereInput | boolean;
    connect?: Prisma.HubWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HubUpdateToOneWithWhereWithoutShipmentsInput, Prisma.HubUpdateWithoutShipmentsInput>, Prisma.HubUncheckedUpdateWithoutShipmentsInput>;
};
export type HubCreateWithoutPartnerInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pickups?: Prisma.PickupRequestCreateNestedManyWithoutHubInput;
    receipts?: Prisma.HubReceiptCreateNestedManyWithoutHubInput;
    shipments?: Prisma.LogisticsShipmentCreateNestedManyWithoutOriginHubInput;
};
export type HubUncheckedCreateWithoutPartnerInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pickups?: Prisma.PickupRequestUncheckedCreateNestedManyWithoutHubInput;
    receipts?: Prisma.HubReceiptUncheckedCreateNestedManyWithoutHubInput;
    shipments?: Prisma.LogisticsShipmentUncheckedCreateNestedManyWithoutOriginHubInput;
};
export type HubCreateOrConnectWithoutPartnerInput = {
    where: Prisma.HubWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubCreateWithoutPartnerInput, Prisma.HubUncheckedCreateWithoutPartnerInput>;
};
export type HubCreateManyPartnerInputEnvelope = {
    data: Prisma.HubCreateManyPartnerInput | Prisma.HubCreateManyPartnerInput[];
    skipDuplicates?: boolean;
};
export type HubUpsertWithWhereUniqueWithoutPartnerInput = {
    where: Prisma.HubWhereUniqueInput;
    update: Prisma.XOR<Prisma.HubUpdateWithoutPartnerInput, Prisma.HubUncheckedUpdateWithoutPartnerInput>;
    create: Prisma.XOR<Prisma.HubCreateWithoutPartnerInput, Prisma.HubUncheckedCreateWithoutPartnerInput>;
};
export type HubUpdateWithWhereUniqueWithoutPartnerInput = {
    where: Prisma.HubWhereUniqueInput;
    data: Prisma.XOR<Prisma.HubUpdateWithoutPartnerInput, Prisma.HubUncheckedUpdateWithoutPartnerInput>;
};
export type HubUpdateManyWithWhereWithoutPartnerInput = {
    where: Prisma.HubScalarWhereInput;
    data: Prisma.XOR<Prisma.HubUpdateManyMutationInput, Prisma.HubUncheckedUpdateManyWithoutPartnerInput>;
};
export type HubScalarWhereInput = {
    AND?: Prisma.HubScalarWhereInput | Prisma.HubScalarWhereInput[];
    OR?: Prisma.HubScalarWhereInput[];
    NOT?: Prisma.HubScalarWhereInput | Prisma.HubScalarWhereInput[];
    id?: Prisma.UuidFilter<"Hub"> | string;
    code?: Prisma.StringFilter<"Hub"> | string;
    name?: Prisma.StringFilter<"Hub"> | string;
    operator?: Prisma.EnumHubOperatorFilter<"Hub"> | $Enums.HubOperator;
    partnerId?: Prisma.UuidNullableFilter<"Hub"> | string | null;
    country?: Prisma.StringFilter<"Hub"> | string;
    city?: Prisma.StringFilter<"Hub"> | string;
    addressLine1?: Prisma.StringFilter<"Hub"> | string;
    addressLine2?: Prisma.StringNullableFilter<"Hub"> | string | null;
    postalCode?: Prisma.StringNullableFilter<"Hub"> | string | null;
    port?: Prisma.StringNullableFilter<"Hub"> | string | null;
    active?: Prisma.BoolFilter<"Hub"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Hub"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Hub"> | Date | string;
};
export type HubCreateWithoutPickupsInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    partner?: Prisma.LogisticsPartnerCreateNestedOneWithoutHubsInput;
    receipts?: Prisma.HubReceiptCreateNestedManyWithoutHubInput;
    shipments?: Prisma.LogisticsShipmentCreateNestedManyWithoutOriginHubInput;
};
export type HubUncheckedCreateWithoutPickupsInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    partnerId?: string | null;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receipts?: Prisma.HubReceiptUncheckedCreateNestedManyWithoutHubInput;
    shipments?: Prisma.LogisticsShipmentUncheckedCreateNestedManyWithoutOriginHubInput;
};
export type HubCreateOrConnectWithoutPickupsInput = {
    where: Prisma.HubWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubCreateWithoutPickupsInput, Prisma.HubUncheckedCreateWithoutPickupsInput>;
};
export type HubUpsertWithoutPickupsInput = {
    update: Prisma.XOR<Prisma.HubUpdateWithoutPickupsInput, Prisma.HubUncheckedUpdateWithoutPickupsInput>;
    create: Prisma.XOR<Prisma.HubCreateWithoutPickupsInput, Prisma.HubUncheckedCreateWithoutPickupsInput>;
    where?: Prisma.HubWhereInput;
};
export type HubUpdateToOneWithWhereWithoutPickupsInput = {
    where?: Prisma.HubWhereInput;
    data: Prisma.XOR<Prisma.HubUpdateWithoutPickupsInput, Prisma.HubUncheckedUpdateWithoutPickupsInput>;
};
export type HubUpdateWithoutPickupsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    partner?: Prisma.LogisticsPartnerUpdateOneWithoutHubsNestedInput;
    receipts?: Prisma.HubReceiptUpdateManyWithoutHubNestedInput;
    shipments?: Prisma.LogisticsShipmentUpdateManyWithoutOriginHubNestedInput;
};
export type HubUncheckedUpdateWithoutPickupsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipts?: Prisma.HubReceiptUncheckedUpdateManyWithoutHubNestedInput;
    shipments?: Prisma.LogisticsShipmentUncheckedUpdateManyWithoutOriginHubNestedInput;
};
export type HubCreateWithoutReceiptsInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    partner?: Prisma.LogisticsPartnerCreateNestedOneWithoutHubsInput;
    pickups?: Prisma.PickupRequestCreateNestedManyWithoutHubInput;
    shipments?: Prisma.LogisticsShipmentCreateNestedManyWithoutOriginHubInput;
};
export type HubUncheckedCreateWithoutReceiptsInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    partnerId?: string | null;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pickups?: Prisma.PickupRequestUncheckedCreateNestedManyWithoutHubInput;
    shipments?: Prisma.LogisticsShipmentUncheckedCreateNestedManyWithoutOriginHubInput;
};
export type HubCreateOrConnectWithoutReceiptsInput = {
    where: Prisma.HubWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubCreateWithoutReceiptsInput, Prisma.HubUncheckedCreateWithoutReceiptsInput>;
};
export type HubUpsertWithoutReceiptsInput = {
    update: Prisma.XOR<Prisma.HubUpdateWithoutReceiptsInput, Prisma.HubUncheckedUpdateWithoutReceiptsInput>;
    create: Prisma.XOR<Prisma.HubCreateWithoutReceiptsInput, Prisma.HubUncheckedCreateWithoutReceiptsInput>;
    where?: Prisma.HubWhereInput;
};
export type HubUpdateToOneWithWhereWithoutReceiptsInput = {
    where?: Prisma.HubWhereInput;
    data: Prisma.XOR<Prisma.HubUpdateWithoutReceiptsInput, Prisma.HubUncheckedUpdateWithoutReceiptsInput>;
};
export type HubUpdateWithoutReceiptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    partner?: Prisma.LogisticsPartnerUpdateOneWithoutHubsNestedInput;
    pickups?: Prisma.PickupRequestUpdateManyWithoutHubNestedInput;
    shipments?: Prisma.LogisticsShipmentUpdateManyWithoutOriginHubNestedInput;
};
export type HubUncheckedUpdateWithoutReceiptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pickups?: Prisma.PickupRequestUncheckedUpdateManyWithoutHubNestedInput;
    shipments?: Prisma.LogisticsShipmentUncheckedUpdateManyWithoutOriginHubNestedInput;
};
export type HubCreateWithoutShipmentsInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    partner?: Prisma.LogisticsPartnerCreateNestedOneWithoutHubsInput;
    pickups?: Prisma.PickupRequestCreateNestedManyWithoutHubInput;
    receipts?: Prisma.HubReceiptCreateNestedManyWithoutHubInput;
};
export type HubUncheckedCreateWithoutShipmentsInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    partnerId?: string | null;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pickups?: Prisma.PickupRequestUncheckedCreateNestedManyWithoutHubInput;
    receipts?: Prisma.HubReceiptUncheckedCreateNestedManyWithoutHubInput;
};
export type HubCreateOrConnectWithoutShipmentsInput = {
    where: Prisma.HubWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubCreateWithoutShipmentsInput, Prisma.HubUncheckedCreateWithoutShipmentsInput>;
};
export type HubUpsertWithoutShipmentsInput = {
    update: Prisma.XOR<Prisma.HubUpdateWithoutShipmentsInput, Prisma.HubUncheckedUpdateWithoutShipmentsInput>;
    create: Prisma.XOR<Prisma.HubCreateWithoutShipmentsInput, Prisma.HubUncheckedCreateWithoutShipmentsInput>;
    where?: Prisma.HubWhereInput;
};
export type HubUpdateToOneWithWhereWithoutShipmentsInput = {
    where?: Prisma.HubWhereInput;
    data: Prisma.XOR<Prisma.HubUpdateWithoutShipmentsInput, Prisma.HubUncheckedUpdateWithoutShipmentsInput>;
};
export type HubUpdateWithoutShipmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    partner?: Prisma.LogisticsPartnerUpdateOneWithoutHubsNestedInput;
    pickups?: Prisma.PickupRequestUpdateManyWithoutHubNestedInput;
    receipts?: Prisma.HubReceiptUpdateManyWithoutHubNestedInput;
};
export type HubUncheckedUpdateWithoutShipmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    partnerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pickups?: Prisma.PickupRequestUncheckedUpdateManyWithoutHubNestedInput;
    receipts?: Prisma.HubReceiptUncheckedUpdateManyWithoutHubNestedInput;
};
export type HubCreateManyPartnerInput = {
    id?: string;
    code: string;
    name: string;
    operator?: $Enums.HubOperator;
    country: string;
    city: string;
    addressLine1: string;
    addressLine2?: string | null;
    postalCode?: string | null;
    port?: string | null;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HubUpdateWithoutPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pickups?: Prisma.PickupRequestUpdateManyWithoutHubNestedInput;
    receipts?: Prisma.HubReceiptUpdateManyWithoutHubNestedInput;
    shipments?: Prisma.LogisticsShipmentUpdateManyWithoutOriginHubNestedInput;
};
export type HubUncheckedUpdateWithoutPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pickups?: Prisma.PickupRequestUncheckedUpdateManyWithoutHubNestedInput;
    receipts?: Prisma.HubReceiptUncheckedUpdateManyWithoutHubNestedInput;
    shipments?: Prisma.LogisticsShipmentUncheckedUpdateManyWithoutOriginHubNestedInput;
};
export type HubUncheckedUpdateManyWithoutPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.EnumHubOperatorFieldUpdateOperationsInput | $Enums.HubOperator;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine1?: Prisma.StringFieldUpdateOperationsInput | string;
    addressLine2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postalCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    port?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HubCountOutputType = {
    pickups: number;
    receipts: number;
    shipments: number;
};
export type HubCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pickups?: boolean | HubCountOutputTypeCountPickupsArgs;
    receipts?: boolean | HubCountOutputTypeCountReceiptsArgs;
    shipments?: boolean | HubCountOutputTypeCountShipmentsArgs;
};
export type HubCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubCountOutputTypeSelect<ExtArgs> | null;
};
export type HubCountOutputTypeCountPickupsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PickupRequestWhereInput;
};
export type HubCountOutputTypeCountReceiptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubReceiptWhereInput;
};
export type HubCountOutputTypeCountShipmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsShipmentWhereInput;
};
export type HubSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    operator?: boolean;
    partnerId?: boolean;
    country?: boolean;
    city?: boolean;
    addressLine1?: boolean;
    addressLine2?: boolean;
    postalCode?: boolean;
    port?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    partner?: boolean | Prisma.Hub$partnerArgs<ExtArgs>;
    pickups?: boolean | Prisma.Hub$pickupsArgs<ExtArgs>;
    receipts?: boolean | Prisma.Hub$receiptsArgs<ExtArgs>;
    shipments?: boolean | Prisma.Hub$shipmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.HubCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hub"]>;
export type HubSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    operator?: boolean;
    partnerId?: boolean;
    country?: boolean;
    city?: boolean;
    addressLine1?: boolean;
    addressLine2?: boolean;
    postalCode?: boolean;
    port?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    partner?: boolean | Prisma.Hub$partnerArgs<ExtArgs>;
}, ExtArgs["result"]["hub"]>;
export type HubSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    name?: boolean;
    operator?: boolean;
    partnerId?: boolean;
    country?: boolean;
    city?: boolean;
    addressLine1?: boolean;
    addressLine2?: boolean;
    postalCode?: boolean;
    port?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    partner?: boolean | Prisma.Hub$partnerArgs<ExtArgs>;
}, ExtArgs["result"]["hub"]>;
export type HubSelectScalar = {
    id?: boolean;
    code?: boolean;
    name?: boolean;
    operator?: boolean;
    partnerId?: boolean;
    country?: boolean;
    city?: boolean;
    addressLine1?: boolean;
    addressLine2?: boolean;
    postalCode?: boolean;
    port?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type HubOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "name" | "operator" | "partnerId" | "country" | "city" | "addressLine1" | "addressLine2" | "postalCode" | "port" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["hub"]>;
export type HubInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    partner?: boolean | Prisma.Hub$partnerArgs<ExtArgs>;
    pickups?: boolean | Prisma.Hub$pickupsArgs<ExtArgs>;
    receipts?: boolean | Prisma.Hub$receiptsArgs<ExtArgs>;
    shipments?: boolean | Prisma.Hub$shipmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.HubCountOutputTypeDefaultArgs<ExtArgs>;
};
export type HubIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    partner?: boolean | Prisma.Hub$partnerArgs<ExtArgs>;
};
export type HubIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    partner?: boolean | Prisma.Hub$partnerArgs<ExtArgs>;
};
export type $HubPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Hub";
    objects: {
        partner: Prisma.$LogisticsPartnerPayload<ExtArgs> | null;
        pickups: Prisma.$PickupRequestPayload<ExtArgs>[];
        receipts: Prisma.$HubReceiptPayload<ExtArgs>[];
        shipments: Prisma.$LogisticsShipmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        name: string;
        operator: $Enums.HubOperator;
        partnerId: string | null;
        country: string;
        city: string;
        addressLine1: string;
        addressLine2: string | null;
        postalCode: string | null;
        port: string | null;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["hub"]>;
    composites: {};
};
export type HubGetPayload<S extends boolean | null | undefined | HubDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HubPayload, S>;
export type HubCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HubFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HubCountAggregateInputType | true;
};
export interface HubDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Hub'];
        meta: {
            name: 'Hub';
        };
    };
    findUnique<T extends HubFindUniqueArgs>(args: Prisma.SelectSubset<T, HubFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HubClient<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends HubFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HubFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HubClient<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends HubFindFirstArgs>(args?: Prisma.SelectSubset<T, HubFindFirstArgs<ExtArgs>>): Prisma.Prisma__HubClient<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends HubFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HubFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HubClient<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends HubFindManyArgs>(args?: Prisma.SelectSubset<T, HubFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends HubCreateArgs>(args: Prisma.SelectSubset<T, HubCreateArgs<ExtArgs>>): Prisma.Prisma__HubClient<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends HubCreateManyArgs>(args?: Prisma.SelectSubset<T, HubCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends HubCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HubCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends HubDeleteArgs>(args: Prisma.SelectSubset<T, HubDeleteArgs<ExtArgs>>): Prisma.Prisma__HubClient<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends HubUpdateArgs>(args: Prisma.SelectSubset<T, HubUpdateArgs<ExtArgs>>): Prisma.Prisma__HubClient<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends HubDeleteManyArgs>(args?: Prisma.SelectSubset<T, HubDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends HubUpdateManyArgs>(args: Prisma.SelectSubset<T, HubUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends HubUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HubUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends HubUpsertArgs>(args: Prisma.SelectSubset<T, HubUpsertArgs<ExtArgs>>): Prisma.Prisma__HubClient<runtime.Types.Result.GetResult<Prisma.$HubPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends HubCountArgs>(args?: Prisma.Subset<T, HubCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HubCountAggregateOutputType> : number>;
    aggregate<T extends HubAggregateArgs>(args: Prisma.Subset<T, HubAggregateArgs>): Prisma.PrismaPromise<GetHubAggregateType<T>>;
    groupBy<T extends HubGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HubGroupByArgs['orderBy'];
    } : {
        orderBy?: HubGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HubGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHubGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: HubFieldRefs;
}
export interface Prisma__HubClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    partner<T extends Prisma.Hub$partnerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hub$partnerArgs<ExtArgs>>): Prisma.Prisma__LogisticsPartnerClient<runtime.Types.Result.GetResult<Prisma.$LogisticsPartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    pickups<T extends Prisma.Hub$pickupsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hub$pickupsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PickupRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    receipts<T extends Prisma.Hub$receiptsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hub$receiptsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    shipments<T extends Prisma.Hub$shipmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Hub$shipmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface HubFieldRefs {
    readonly id: Prisma.FieldRef<"Hub", 'String'>;
    readonly code: Prisma.FieldRef<"Hub", 'String'>;
    readonly name: Prisma.FieldRef<"Hub", 'String'>;
    readonly operator: Prisma.FieldRef<"Hub", 'HubOperator'>;
    readonly partnerId: Prisma.FieldRef<"Hub", 'String'>;
    readonly country: Prisma.FieldRef<"Hub", 'String'>;
    readonly city: Prisma.FieldRef<"Hub", 'String'>;
    readonly addressLine1: Prisma.FieldRef<"Hub", 'String'>;
    readonly addressLine2: Prisma.FieldRef<"Hub", 'String'>;
    readonly postalCode: Prisma.FieldRef<"Hub", 'String'>;
    readonly port: Prisma.FieldRef<"Hub", 'String'>;
    readonly active: Prisma.FieldRef<"Hub", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Hub", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Hub", 'DateTime'>;
}
export type HubFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelect<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    include?: Prisma.HubInclude<ExtArgs> | null;
    where: Prisma.HubWhereUniqueInput;
};
export type HubFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelect<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    include?: Prisma.HubInclude<ExtArgs> | null;
    where: Prisma.HubWhereUniqueInput;
};
export type HubFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelect<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    include?: Prisma.HubInclude<ExtArgs> | null;
    where?: Prisma.HubWhereInput;
    orderBy?: Prisma.HubOrderByWithRelationInput | Prisma.HubOrderByWithRelationInput[];
    cursor?: Prisma.HubWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HubScalarFieldEnum | Prisma.HubScalarFieldEnum[];
};
export type HubFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelect<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    include?: Prisma.HubInclude<ExtArgs> | null;
    where?: Prisma.HubWhereInput;
    orderBy?: Prisma.HubOrderByWithRelationInput | Prisma.HubOrderByWithRelationInput[];
    cursor?: Prisma.HubWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HubScalarFieldEnum | Prisma.HubScalarFieldEnum[];
};
export type HubFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelect<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    include?: Prisma.HubInclude<ExtArgs> | null;
    where?: Prisma.HubWhereInput;
    orderBy?: Prisma.HubOrderByWithRelationInput | Prisma.HubOrderByWithRelationInput[];
    cursor?: Prisma.HubWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HubScalarFieldEnum | Prisma.HubScalarFieldEnum[];
};
export type HubCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelect<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    include?: Prisma.HubInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HubCreateInput, Prisma.HubUncheckedCreateInput>;
};
export type HubCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.HubCreateManyInput | Prisma.HubCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HubCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    data: Prisma.HubCreateManyInput | Prisma.HubCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.HubIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type HubUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelect<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    include?: Prisma.HubInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HubUpdateInput, Prisma.HubUncheckedUpdateInput>;
    where: Prisma.HubWhereUniqueInput;
};
export type HubUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.HubUpdateManyMutationInput, Prisma.HubUncheckedUpdateManyInput>;
    where?: Prisma.HubWhereInput;
    limit?: number;
};
export type HubUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HubUpdateManyMutationInput, Prisma.HubUncheckedUpdateManyInput>;
    where?: Prisma.HubWhereInput;
    limit?: number;
    include?: Prisma.HubIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type HubUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelect<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    include?: Prisma.HubInclude<ExtArgs> | null;
    where: Prisma.HubWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubCreateInput, Prisma.HubUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.HubUpdateInput, Prisma.HubUncheckedUpdateInput>;
};
export type HubDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelect<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    include?: Prisma.HubInclude<ExtArgs> | null;
    where: Prisma.HubWhereUniqueInput;
};
export type HubDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubWhereInput;
    limit?: number;
};
export type Hub$partnerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsPartnerSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsPartnerOmit<ExtArgs> | null;
    include?: Prisma.LogisticsPartnerInclude<ExtArgs> | null;
    where?: Prisma.LogisticsPartnerWhereInput;
};
export type Hub$pickupsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PickupRequestSelect<ExtArgs> | null;
    omit?: Prisma.PickupRequestOmit<ExtArgs> | null;
    include?: Prisma.PickupRequestInclude<ExtArgs> | null;
    where?: Prisma.PickupRequestWhereInput;
    orderBy?: Prisma.PickupRequestOrderByWithRelationInput | Prisma.PickupRequestOrderByWithRelationInput[];
    cursor?: Prisma.PickupRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PickupRequestScalarFieldEnum | Prisma.PickupRequestScalarFieldEnum[];
};
export type Hub$receiptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptInclude<ExtArgs> | null;
    where?: Prisma.HubReceiptWhereInput;
    orderBy?: Prisma.HubReceiptOrderByWithRelationInput | Prisma.HubReceiptOrderByWithRelationInput[];
    cursor?: Prisma.HubReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HubReceiptScalarFieldEnum | Prisma.HubReceiptScalarFieldEnum[];
};
export type Hub$shipmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentInclude<ExtArgs> | null;
    where?: Prisma.LogisticsShipmentWhereInput;
    orderBy?: Prisma.LogisticsShipmentOrderByWithRelationInput | Prisma.LogisticsShipmentOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsShipmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsShipmentScalarFieldEnum | Prisma.LogisticsShipmentScalarFieldEnum[];
};
export type HubDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubSelect<ExtArgs> | null;
    omit?: Prisma.HubOmit<ExtArgs> | null;
    include?: Prisma.HubInclude<ExtArgs> | null;
};
