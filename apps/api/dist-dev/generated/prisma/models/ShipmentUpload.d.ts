import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ShipmentUploadModel = runtime.Types.Result.DefaultSelection<Prisma.$ShipmentUploadPayload>;
export type AggregateShipmentUpload = {
    _count: ShipmentUploadCountAggregateOutputType | null;
    _min: ShipmentUploadMinAggregateOutputType | null;
    _max: ShipmentUploadMaxAggregateOutputType | null;
};
export type ShipmentUploadMinAggregateOutputType = {
    id: string | null;
    shipmentId: string | null;
    legId: string | null;
    fileId: string | null;
    kind: $Enums.ShipmentUploadKind | null;
    uploadedById: string | null;
    buyerVisible: boolean | null;
    publishedAt: Date | null;
    publishedById: string | null;
    createdAt: Date | null;
};
export type ShipmentUploadMaxAggregateOutputType = {
    id: string | null;
    shipmentId: string | null;
    legId: string | null;
    fileId: string | null;
    kind: $Enums.ShipmentUploadKind | null;
    uploadedById: string | null;
    buyerVisible: boolean | null;
    publishedAt: Date | null;
    publishedById: string | null;
    createdAt: Date | null;
};
export type ShipmentUploadCountAggregateOutputType = {
    id: number;
    shipmentId: number;
    legId: number;
    fileId: number;
    kind: number;
    uploadedById: number;
    buyerVisible: number;
    publishedAt: number;
    publishedById: number;
    createdAt: number;
    _all: number;
};
export type ShipmentUploadMinAggregateInputType = {
    id?: true;
    shipmentId?: true;
    legId?: true;
    fileId?: true;
    kind?: true;
    uploadedById?: true;
    buyerVisible?: true;
    publishedAt?: true;
    publishedById?: true;
    createdAt?: true;
};
export type ShipmentUploadMaxAggregateInputType = {
    id?: true;
    shipmentId?: true;
    legId?: true;
    fileId?: true;
    kind?: true;
    uploadedById?: true;
    buyerVisible?: true;
    publishedAt?: true;
    publishedById?: true;
    createdAt?: true;
};
export type ShipmentUploadCountAggregateInputType = {
    id?: true;
    shipmentId?: true;
    legId?: true;
    fileId?: true;
    kind?: true;
    uploadedById?: true;
    buyerVisible?: true;
    publishedAt?: true;
    publishedById?: true;
    createdAt?: true;
    _all?: true;
};
export type ShipmentUploadAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShipmentUploadWhereInput;
    orderBy?: Prisma.ShipmentUploadOrderByWithRelationInput | Prisma.ShipmentUploadOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentUploadWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ShipmentUploadCountAggregateInputType;
    _min?: ShipmentUploadMinAggregateInputType;
    _max?: ShipmentUploadMaxAggregateInputType;
};
export type GetShipmentUploadAggregateType<T extends ShipmentUploadAggregateArgs> = {
    [P in keyof T & keyof AggregateShipmentUpload]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShipmentUpload[P]> : Prisma.GetScalarType<T[P], AggregateShipmentUpload[P]>;
};
export type ShipmentUploadGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShipmentUploadWhereInput;
    orderBy?: Prisma.ShipmentUploadOrderByWithAggregationInput | Prisma.ShipmentUploadOrderByWithAggregationInput[];
    by: Prisma.ShipmentUploadScalarFieldEnum[] | Prisma.ShipmentUploadScalarFieldEnum;
    having?: Prisma.ShipmentUploadScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShipmentUploadCountAggregateInputType | true;
    _min?: ShipmentUploadMinAggregateInputType;
    _max?: ShipmentUploadMaxAggregateInputType;
};
export type ShipmentUploadGroupByOutputType = {
    id: string;
    shipmentId: string;
    legId: string | null;
    fileId: string;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible: boolean;
    publishedAt: Date | null;
    publishedById: string | null;
    createdAt: Date;
    _count: ShipmentUploadCountAggregateOutputType | null;
    _min: ShipmentUploadMinAggregateOutputType | null;
    _max: ShipmentUploadMaxAggregateOutputType | null;
};
export type GetShipmentUploadGroupByPayload<T extends ShipmentUploadGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ShipmentUploadGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ShipmentUploadGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ShipmentUploadGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ShipmentUploadGroupByOutputType[P]>;
}>>;
export type ShipmentUploadWhereInput = {
    AND?: Prisma.ShipmentUploadWhereInput | Prisma.ShipmentUploadWhereInput[];
    OR?: Prisma.ShipmentUploadWhereInput[];
    NOT?: Prisma.ShipmentUploadWhereInput | Prisma.ShipmentUploadWhereInput[];
    id?: Prisma.UuidFilter<"ShipmentUpload"> | string;
    shipmentId?: Prisma.UuidFilter<"ShipmentUpload"> | string;
    legId?: Prisma.UuidNullableFilter<"ShipmentUpload"> | string | null;
    fileId?: Prisma.UuidFilter<"ShipmentUpload"> | string;
    kind?: Prisma.EnumShipmentUploadKindFilter<"ShipmentUpload"> | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.UuidFilter<"ShipmentUpload"> | string;
    buyerVisible?: Prisma.BoolFilter<"ShipmentUpload"> | boolean;
    publishedAt?: Prisma.DateTimeNullableFilter<"ShipmentUpload"> | Date | string | null;
    publishedById?: Prisma.UuidNullableFilter<"ShipmentUpload"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShipmentUpload"> | Date | string;
    shipment?: Prisma.XOR<Prisma.LogisticsShipmentScalarRelationFilter, Prisma.LogisticsShipmentWhereInput>;
    leg?: Prisma.XOR<Prisma.ShipmentLegNullableScalarRelationFilter, Prisma.ShipmentLegWhereInput> | null;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
};
export type ShipmentUploadOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    legId?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    uploadedById?: Prisma.SortOrder;
    buyerVisible?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    publishedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    shipment?: Prisma.LogisticsShipmentOrderByWithRelationInput;
    leg?: Prisma.ShipmentLegOrderByWithRelationInput;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type ShipmentUploadWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.ShipmentUploadWhereInput | Prisma.ShipmentUploadWhereInput[];
    OR?: Prisma.ShipmentUploadWhereInput[];
    NOT?: Prisma.ShipmentUploadWhereInput | Prisma.ShipmentUploadWhereInput[];
    shipmentId?: Prisma.UuidFilter<"ShipmentUpload"> | string;
    legId?: Prisma.UuidNullableFilter<"ShipmentUpload"> | string | null;
    kind?: Prisma.EnumShipmentUploadKindFilter<"ShipmentUpload"> | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.UuidFilter<"ShipmentUpload"> | string;
    buyerVisible?: Prisma.BoolFilter<"ShipmentUpload"> | boolean;
    publishedAt?: Prisma.DateTimeNullableFilter<"ShipmentUpload"> | Date | string | null;
    publishedById?: Prisma.UuidNullableFilter<"ShipmentUpload"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShipmentUpload"> | Date | string;
    shipment?: Prisma.XOR<Prisma.LogisticsShipmentScalarRelationFilter, Prisma.LogisticsShipmentWhereInput>;
    leg?: Prisma.XOR<Prisma.ShipmentLegNullableScalarRelationFilter, Prisma.ShipmentLegWhereInput> | null;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
}, "id" | "fileId">;
export type ShipmentUploadOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    legId?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    uploadedById?: Prisma.SortOrder;
    buyerVisible?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    publishedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ShipmentUploadCountOrderByAggregateInput;
    _max?: Prisma.ShipmentUploadMaxOrderByAggregateInput;
    _min?: Prisma.ShipmentUploadMinOrderByAggregateInput;
};
export type ShipmentUploadScalarWhereWithAggregatesInput = {
    AND?: Prisma.ShipmentUploadScalarWhereWithAggregatesInput | Prisma.ShipmentUploadScalarWhereWithAggregatesInput[];
    OR?: Prisma.ShipmentUploadScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ShipmentUploadScalarWhereWithAggregatesInput | Prisma.ShipmentUploadScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ShipmentUpload"> | string;
    shipmentId?: Prisma.UuidWithAggregatesFilter<"ShipmentUpload"> | string;
    legId?: Prisma.UuidNullableWithAggregatesFilter<"ShipmentUpload"> | string | null;
    fileId?: Prisma.UuidWithAggregatesFilter<"ShipmentUpload"> | string;
    kind?: Prisma.EnumShipmentUploadKindWithAggregatesFilter<"ShipmentUpload"> | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.UuidWithAggregatesFilter<"ShipmentUpload"> | string;
    buyerVisible?: Prisma.BoolWithAggregatesFilter<"ShipmentUpload"> | boolean;
    publishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ShipmentUpload"> | Date | string | null;
    publishedById?: Prisma.UuidNullableWithAggregatesFilter<"ShipmentUpload"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ShipmentUpload"> | Date | string;
};
export type ShipmentUploadCreateInput = {
    id?: string;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible?: boolean;
    publishedAt?: Date | string | null;
    publishedById?: string | null;
    createdAt?: Date | string;
    shipment: Prisma.LogisticsShipmentCreateNestedOneWithoutUploadsInput;
    leg?: Prisma.ShipmentLegCreateNestedOneWithoutUploadsInput;
    file: Prisma.FileAssetCreateNestedOneWithoutShipmentUploadInput;
};
export type ShipmentUploadUncheckedCreateInput = {
    id?: string;
    shipmentId: string;
    legId?: string | null;
    fileId: string;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible?: boolean;
    publishedAt?: Date | string | null;
    publishedById?: string | null;
    createdAt?: Date | string;
};
export type ShipmentUploadUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shipment?: Prisma.LogisticsShipmentUpdateOneRequiredWithoutUploadsNestedInput;
    leg?: Prisma.ShipmentLegUpdateOneWithoutUploadsNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutShipmentUploadNestedInput;
};
export type ShipmentUploadUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    legId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentUploadCreateManyInput = {
    id?: string;
    shipmentId: string;
    legId?: string | null;
    fileId: string;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible?: boolean;
    publishedAt?: Date | string | null;
    publishedById?: string | null;
    createdAt?: Date | string;
};
export type ShipmentUploadUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentUploadUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    legId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentUploadNullableScalarRelationFilter = {
    is?: Prisma.ShipmentUploadWhereInput | null;
    isNot?: Prisma.ShipmentUploadWhereInput | null;
};
export type ShipmentUploadListRelationFilter = {
    every?: Prisma.ShipmentUploadWhereInput;
    some?: Prisma.ShipmentUploadWhereInput;
    none?: Prisma.ShipmentUploadWhereInput;
};
export type ShipmentUploadOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ShipmentUploadCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    legId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    uploadedById?: Prisma.SortOrder;
    buyerVisible?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    publishedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShipmentUploadMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    legId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    uploadedById?: Prisma.SortOrder;
    buyerVisible?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    publishedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShipmentUploadMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    legId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    uploadedById?: Prisma.SortOrder;
    buyerVisible?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    publishedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShipmentUploadCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutFileInput, Prisma.ShipmentUploadUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutFileInput;
    connect?: Prisma.ShipmentUploadWhereUniqueInput;
};
export type ShipmentUploadUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutFileInput, Prisma.ShipmentUploadUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutFileInput;
    connect?: Prisma.ShipmentUploadWhereUniqueInput;
};
export type ShipmentUploadUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutFileInput, Prisma.ShipmentUploadUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutFileInput;
    upsert?: Prisma.ShipmentUploadUpsertWithoutFileInput;
    disconnect?: Prisma.ShipmentUploadWhereInput | boolean;
    delete?: Prisma.ShipmentUploadWhereInput | boolean;
    connect?: Prisma.ShipmentUploadWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ShipmentUploadUpdateToOneWithWhereWithoutFileInput, Prisma.ShipmentUploadUpdateWithoutFileInput>, Prisma.ShipmentUploadUncheckedUpdateWithoutFileInput>;
};
export type ShipmentUploadUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutFileInput, Prisma.ShipmentUploadUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutFileInput;
    upsert?: Prisma.ShipmentUploadUpsertWithoutFileInput;
    disconnect?: Prisma.ShipmentUploadWhereInput | boolean;
    delete?: Prisma.ShipmentUploadWhereInput | boolean;
    connect?: Prisma.ShipmentUploadWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ShipmentUploadUpdateToOneWithWhereWithoutFileInput, Prisma.ShipmentUploadUpdateWithoutFileInput>, Prisma.ShipmentUploadUncheckedUpdateWithoutFileInput>;
};
export type ShipmentUploadCreateNestedManyWithoutShipmentInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutShipmentInput, Prisma.ShipmentUploadUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentUploadCreateWithoutShipmentInput[] | Prisma.ShipmentUploadUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutShipmentInput | Prisma.ShipmentUploadCreateOrConnectWithoutShipmentInput[];
    createMany?: Prisma.ShipmentUploadCreateManyShipmentInputEnvelope;
    connect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
};
export type ShipmentUploadUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutShipmentInput, Prisma.ShipmentUploadUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentUploadCreateWithoutShipmentInput[] | Prisma.ShipmentUploadUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutShipmentInput | Prisma.ShipmentUploadCreateOrConnectWithoutShipmentInput[];
    createMany?: Prisma.ShipmentUploadCreateManyShipmentInputEnvelope;
    connect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
};
export type ShipmentUploadUpdateManyWithoutShipmentNestedInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutShipmentInput, Prisma.ShipmentUploadUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentUploadCreateWithoutShipmentInput[] | Prisma.ShipmentUploadUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutShipmentInput | Prisma.ShipmentUploadCreateOrConnectWithoutShipmentInput[];
    upsert?: Prisma.ShipmentUploadUpsertWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentUploadUpsertWithWhereUniqueWithoutShipmentInput[];
    createMany?: Prisma.ShipmentUploadCreateManyShipmentInputEnvelope;
    set?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    disconnect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    delete?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    connect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    update?: Prisma.ShipmentUploadUpdateWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentUploadUpdateWithWhereUniqueWithoutShipmentInput[];
    updateMany?: Prisma.ShipmentUploadUpdateManyWithWhereWithoutShipmentInput | Prisma.ShipmentUploadUpdateManyWithWhereWithoutShipmentInput[];
    deleteMany?: Prisma.ShipmentUploadScalarWhereInput | Prisma.ShipmentUploadScalarWhereInput[];
};
export type ShipmentUploadUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutShipmentInput, Prisma.ShipmentUploadUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentUploadCreateWithoutShipmentInput[] | Prisma.ShipmentUploadUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutShipmentInput | Prisma.ShipmentUploadCreateOrConnectWithoutShipmentInput[];
    upsert?: Prisma.ShipmentUploadUpsertWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentUploadUpsertWithWhereUniqueWithoutShipmentInput[];
    createMany?: Prisma.ShipmentUploadCreateManyShipmentInputEnvelope;
    set?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    disconnect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    delete?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    connect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    update?: Prisma.ShipmentUploadUpdateWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentUploadUpdateWithWhereUniqueWithoutShipmentInput[];
    updateMany?: Prisma.ShipmentUploadUpdateManyWithWhereWithoutShipmentInput | Prisma.ShipmentUploadUpdateManyWithWhereWithoutShipmentInput[];
    deleteMany?: Prisma.ShipmentUploadScalarWhereInput | Prisma.ShipmentUploadScalarWhereInput[];
};
export type ShipmentUploadCreateNestedManyWithoutLegInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutLegInput, Prisma.ShipmentUploadUncheckedCreateWithoutLegInput> | Prisma.ShipmentUploadCreateWithoutLegInput[] | Prisma.ShipmentUploadUncheckedCreateWithoutLegInput[];
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutLegInput | Prisma.ShipmentUploadCreateOrConnectWithoutLegInput[];
    createMany?: Prisma.ShipmentUploadCreateManyLegInputEnvelope;
    connect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
};
export type ShipmentUploadUncheckedCreateNestedManyWithoutLegInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutLegInput, Prisma.ShipmentUploadUncheckedCreateWithoutLegInput> | Prisma.ShipmentUploadCreateWithoutLegInput[] | Prisma.ShipmentUploadUncheckedCreateWithoutLegInput[];
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutLegInput | Prisma.ShipmentUploadCreateOrConnectWithoutLegInput[];
    createMany?: Prisma.ShipmentUploadCreateManyLegInputEnvelope;
    connect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
};
export type ShipmentUploadUpdateManyWithoutLegNestedInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutLegInput, Prisma.ShipmentUploadUncheckedCreateWithoutLegInput> | Prisma.ShipmentUploadCreateWithoutLegInput[] | Prisma.ShipmentUploadUncheckedCreateWithoutLegInput[];
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutLegInput | Prisma.ShipmentUploadCreateOrConnectWithoutLegInput[];
    upsert?: Prisma.ShipmentUploadUpsertWithWhereUniqueWithoutLegInput | Prisma.ShipmentUploadUpsertWithWhereUniqueWithoutLegInput[];
    createMany?: Prisma.ShipmentUploadCreateManyLegInputEnvelope;
    set?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    disconnect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    delete?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    connect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    update?: Prisma.ShipmentUploadUpdateWithWhereUniqueWithoutLegInput | Prisma.ShipmentUploadUpdateWithWhereUniqueWithoutLegInput[];
    updateMany?: Prisma.ShipmentUploadUpdateManyWithWhereWithoutLegInput | Prisma.ShipmentUploadUpdateManyWithWhereWithoutLegInput[];
    deleteMany?: Prisma.ShipmentUploadScalarWhereInput | Prisma.ShipmentUploadScalarWhereInput[];
};
export type ShipmentUploadUncheckedUpdateManyWithoutLegNestedInput = {
    create?: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutLegInput, Prisma.ShipmentUploadUncheckedCreateWithoutLegInput> | Prisma.ShipmentUploadCreateWithoutLegInput[] | Prisma.ShipmentUploadUncheckedCreateWithoutLegInput[];
    connectOrCreate?: Prisma.ShipmentUploadCreateOrConnectWithoutLegInput | Prisma.ShipmentUploadCreateOrConnectWithoutLegInput[];
    upsert?: Prisma.ShipmentUploadUpsertWithWhereUniqueWithoutLegInput | Prisma.ShipmentUploadUpsertWithWhereUniqueWithoutLegInput[];
    createMany?: Prisma.ShipmentUploadCreateManyLegInputEnvelope;
    set?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    disconnect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    delete?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    connect?: Prisma.ShipmentUploadWhereUniqueInput | Prisma.ShipmentUploadWhereUniqueInput[];
    update?: Prisma.ShipmentUploadUpdateWithWhereUniqueWithoutLegInput | Prisma.ShipmentUploadUpdateWithWhereUniqueWithoutLegInput[];
    updateMany?: Prisma.ShipmentUploadUpdateManyWithWhereWithoutLegInput | Prisma.ShipmentUploadUpdateManyWithWhereWithoutLegInput[];
    deleteMany?: Prisma.ShipmentUploadScalarWhereInput | Prisma.ShipmentUploadScalarWhereInput[];
};
export type EnumShipmentUploadKindFieldUpdateOperationsInput = {
    set?: $Enums.ShipmentUploadKind;
};
export type ShipmentUploadCreateWithoutFileInput = {
    id?: string;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible?: boolean;
    publishedAt?: Date | string | null;
    publishedById?: string | null;
    createdAt?: Date | string;
    shipment: Prisma.LogisticsShipmentCreateNestedOneWithoutUploadsInput;
    leg?: Prisma.ShipmentLegCreateNestedOneWithoutUploadsInput;
};
export type ShipmentUploadUncheckedCreateWithoutFileInput = {
    id?: string;
    shipmentId: string;
    legId?: string | null;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible?: boolean;
    publishedAt?: Date | string | null;
    publishedById?: string | null;
    createdAt?: Date | string;
};
export type ShipmentUploadCreateOrConnectWithoutFileInput = {
    where: Prisma.ShipmentUploadWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutFileInput, Prisma.ShipmentUploadUncheckedCreateWithoutFileInput>;
};
export type ShipmentUploadUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.ShipmentUploadUpdateWithoutFileInput, Prisma.ShipmentUploadUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutFileInput, Prisma.ShipmentUploadUncheckedCreateWithoutFileInput>;
    where?: Prisma.ShipmentUploadWhereInput;
};
export type ShipmentUploadUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.ShipmentUploadWhereInput;
    data: Prisma.XOR<Prisma.ShipmentUploadUpdateWithoutFileInput, Prisma.ShipmentUploadUncheckedUpdateWithoutFileInput>;
};
export type ShipmentUploadUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shipment?: Prisma.LogisticsShipmentUpdateOneRequiredWithoutUploadsNestedInput;
    leg?: Prisma.ShipmentLegUpdateOneWithoutUploadsNestedInput;
};
export type ShipmentUploadUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    legId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentUploadCreateWithoutShipmentInput = {
    id?: string;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible?: boolean;
    publishedAt?: Date | string | null;
    publishedById?: string | null;
    createdAt?: Date | string;
    leg?: Prisma.ShipmentLegCreateNestedOneWithoutUploadsInput;
    file: Prisma.FileAssetCreateNestedOneWithoutShipmentUploadInput;
};
export type ShipmentUploadUncheckedCreateWithoutShipmentInput = {
    id?: string;
    legId?: string | null;
    fileId: string;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible?: boolean;
    publishedAt?: Date | string | null;
    publishedById?: string | null;
    createdAt?: Date | string;
};
export type ShipmentUploadCreateOrConnectWithoutShipmentInput = {
    where: Prisma.ShipmentUploadWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutShipmentInput, Prisma.ShipmentUploadUncheckedCreateWithoutShipmentInput>;
};
export type ShipmentUploadCreateManyShipmentInputEnvelope = {
    data: Prisma.ShipmentUploadCreateManyShipmentInput | Prisma.ShipmentUploadCreateManyShipmentInput[];
    skipDuplicates?: boolean;
};
export type ShipmentUploadUpsertWithWhereUniqueWithoutShipmentInput = {
    where: Prisma.ShipmentUploadWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShipmentUploadUpdateWithoutShipmentInput, Prisma.ShipmentUploadUncheckedUpdateWithoutShipmentInput>;
    create: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutShipmentInput, Prisma.ShipmentUploadUncheckedCreateWithoutShipmentInput>;
};
export type ShipmentUploadUpdateWithWhereUniqueWithoutShipmentInput = {
    where: Prisma.ShipmentUploadWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShipmentUploadUpdateWithoutShipmentInput, Prisma.ShipmentUploadUncheckedUpdateWithoutShipmentInput>;
};
export type ShipmentUploadUpdateManyWithWhereWithoutShipmentInput = {
    where: Prisma.ShipmentUploadScalarWhereInput;
    data: Prisma.XOR<Prisma.ShipmentUploadUpdateManyMutationInput, Prisma.ShipmentUploadUncheckedUpdateManyWithoutShipmentInput>;
};
export type ShipmentUploadScalarWhereInput = {
    AND?: Prisma.ShipmentUploadScalarWhereInput | Prisma.ShipmentUploadScalarWhereInput[];
    OR?: Prisma.ShipmentUploadScalarWhereInput[];
    NOT?: Prisma.ShipmentUploadScalarWhereInput | Prisma.ShipmentUploadScalarWhereInput[];
    id?: Prisma.UuidFilter<"ShipmentUpload"> | string;
    shipmentId?: Prisma.UuidFilter<"ShipmentUpload"> | string;
    legId?: Prisma.UuidNullableFilter<"ShipmentUpload"> | string | null;
    fileId?: Prisma.UuidFilter<"ShipmentUpload"> | string;
    kind?: Prisma.EnumShipmentUploadKindFilter<"ShipmentUpload"> | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.UuidFilter<"ShipmentUpload"> | string;
    buyerVisible?: Prisma.BoolFilter<"ShipmentUpload"> | boolean;
    publishedAt?: Prisma.DateTimeNullableFilter<"ShipmentUpload"> | Date | string | null;
    publishedById?: Prisma.UuidNullableFilter<"ShipmentUpload"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShipmentUpload"> | Date | string;
};
export type ShipmentUploadCreateWithoutLegInput = {
    id?: string;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible?: boolean;
    publishedAt?: Date | string | null;
    publishedById?: string | null;
    createdAt?: Date | string;
    shipment: Prisma.LogisticsShipmentCreateNestedOneWithoutUploadsInput;
    file: Prisma.FileAssetCreateNestedOneWithoutShipmentUploadInput;
};
export type ShipmentUploadUncheckedCreateWithoutLegInput = {
    id?: string;
    shipmentId: string;
    fileId: string;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible?: boolean;
    publishedAt?: Date | string | null;
    publishedById?: string | null;
    createdAt?: Date | string;
};
export type ShipmentUploadCreateOrConnectWithoutLegInput = {
    where: Prisma.ShipmentUploadWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutLegInput, Prisma.ShipmentUploadUncheckedCreateWithoutLegInput>;
};
export type ShipmentUploadCreateManyLegInputEnvelope = {
    data: Prisma.ShipmentUploadCreateManyLegInput | Prisma.ShipmentUploadCreateManyLegInput[];
    skipDuplicates?: boolean;
};
export type ShipmentUploadUpsertWithWhereUniqueWithoutLegInput = {
    where: Prisma.ShipmentUploadWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShipmentUploadUpdateWithoutLegInput, Prisma.ShipmentUploadUncheckedUpdateWithoutLegInput>;
    create: Prisma.XOR<Prisma.ShipmentUploadCreateWithoutLegInput, Prisma.ShipmentUploadUncheckedCreateWithoutLegInput>;
};
export type ShipmentUploadUpdateWithWhereUniqueWithoutLegInput = {
    where: Prisma.ShipmentUploadWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShipmentUploadUpdateWithoutLegInput, Prisma.ShipmentUploadUncheckedUpdateWithoutLegInput>;
};
export type ShipmentUploadUpdateManyWithWhereWithoutLegInput = {
    where: Prisma.ShipmentUploadScalarWhereInput;
    data: Prisma.XOR<Prisma.ShipmentUploadUpdateManyMutationInput, Prisma.ShipmentUploadUncheckedUpdateManyWithoutLegInput>;
};
export type ShipmentUploadCreateManyShipmentInput = {
    id?: string;
    legId?: string | null;
    fileId: string;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible?: boolean;
    publishedAt?: Date | string | null;
    publishedById?: string | null;
    createdAt?: Date | string;
};
export type ShipmentUploadUpdateWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leg?: Prisma.ShipmentLegUpdateOneWithoutUploadsNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutShipmentUploadNestedInput;
};
export type ShipmentUploadUncheckedUpdateWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentUploadUncheckedUpdateManyWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    legId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentUploadCreateManyLegInput = {
    id?: string;
    shipmentId: string;
    fileId: string;
    kind: $Enums.ShipmentUploadKind;
    uploadedById: string;
    buyerVisible?: boolean;
    publishedAt?: Date | string | null;
    publishedById?: string | null;
    createdAt?: Date | string;
};
export type ShipmentUploadUpdateWithoutLegInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shipment?: Prisma.LogisticsShipmentUpdateOneRequiredWithoutUploadsNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutShipmentUploadNestedInput;
};
export type ShipmentUploadUncheckedUpdateWithoutLegInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentUploadUncheckedUpdateManyWithoutLegInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumShipmentUploadKindFieldUpdateOperationsInput | $Enums.ShipmentUploadKind;
    uploadedById?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerVisible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    publishedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentUploadSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    legId?: boolean;
    fileId?: boolean;
    kind?: boolean;
    uploadedById?: boolean;
    buyerVisible?: boolean;
    publishedAt?: boolean;
    publishedById?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    leg?: boolean | Prisma.ShipmentUpload$legArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shipmentUpload"]>;
export type ShipmentUploadSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    legId?: boolean;
    fileId?: boolean;
    kind?: boolean;
    uploadedById?: boolean;
    buyerVisible?: boolean;
    publishedAt?: boolean;
    publishedById?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    leg?: boolean | Prisma.ShipmentUpload$legArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shipmentUpload"]>;
export type ShipmentUploadSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    legId?: boolean;
    fileId?: boolean;
    kind?: boolean;
    uploadedById?: boolean;
    buyerVisible?: boolean;
    publishedAt?: boolean;
    publishedById?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    leg?: boolean | Prisma.ShipmentUpload$legArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shipmentUpload"]>;
export type ShipmentUploadSelectScalar = {
    id?: boolean;
    shipmentId?: boolean;
    legId?: boolean;
    fileId?: boolean;
    kind?: boolean;
    uploadedById?: boolean;
    buyerVisible?: boolean;
    publishedAt?: boolean;
    publishedById?: boolean;
    createdAt?: boolean;
};
export type ShipmentUploadOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "shipmentId" | "legId" | "fileId" | "kind" | "uploadedById" | "buyerVisible" | "publishedAt" | "publishedById" | "createdAt", ExtArgs["result"]["shipmentUpload"]>;
export type ShipmentUploadInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    leg?: boolean | Prisma.ShipmentUpload$legArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type ShipmentUploadIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    leg?: boolean | Prisma.ShipmentUpload$legArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type ShipmentUploadIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
    leg?: boolean | Prisma.ShipmentUpload$legArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type $ShipmentUploadPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ShipmentUpload";
    objects: {
        shipment: Prisma.$LogisticsShipmentPayload<ExtArgs>;
        leg: Prisma.$ShipmentLegPayload<ExtArgs> | null;
        file: Prisma.$FileAssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        shipmentId: string;
        legId: string | null;
        fileId: string;
        kind: $Enums.ShipmentUploadKind;
        uploadedById: string;
        buyerVisible: boolean;
        publishedAt: Date | null;
        publishedById: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["shipmentUpload"]>;
    composites: {};
};
export type ShipmentUploadGetPayload<S extends boolean | null | undefined | ShipmentUploadDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload, S>;
export type ShipmentUploadCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ShipmentUploadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ShipmentUploadCountAggregateInputType | true;
};
export interface ShipmentUploadDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ShipmentUpload'];
        meta: {
            name: 'ShipmentUpload';
        };
    };
    findUnique<T extends ShipmentUploadFindUniqueArgs>(args: Prisma.SelectSubset<T, ShipmentUploadFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ShipmentUploadClient<runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ShipmentUploadFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ShipmentUploadFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShipmentUploadClient<runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ShipmentUploadFindFirstArgs>(args?: Prisma.SelectSubset<T, ShipmentUploadFindFirstArgs<ExtArgs>>): Prisma.Prisma__ShipmentUploadClient<runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ShipmentUploadFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ShipmentUploadFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShipmentUploadClient<runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ShipmentUploadFindManyArgs>(args?: Prisma.SelectSubset<T, ShipmentUploadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ShipmentUploadCreateArgs>(args: Prisma.SelectSubset<T, ShipmentUploadCreateArgs<ExtArgs>>): Prisma.Prisma__ShipmentUploadClient<runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ShipmentUploadCreateManyArgs>(args?: Prisma.SelectSubset<T, ShipmentUploadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ShipmentUploadCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ShipmentUploadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ShipmentUploadDeleteArgs>(args: Prisma.SelectSubset<T, ShipmentUploadDeleteArgs<ExtArgs>>): Prisma.Prisma__ShipmentUploadClient<runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ShipmentUploadUpdateArgs>(args: Prisma.SelectSubset<T, ShipmentUploadUpdateArgs<ExtArgs>>): Prisma.Prisma__ShipmentUploadClient<runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ShipmentUploadDeleteManyArgs>(args?: Prisma.SelectSubset<T, ShipmentUploadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ShipmentUploadUpdateManyArgs>(args: Prisma.SelectSubset<T, ShipmentUploadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ShipmentUploadUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ShipmentUploadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ShipmentUploadUpsertArgs>(args: Prisma.SelectSubset<T, ShipmentUploadUpsertArgs<ExtArgs>>): Prisma.Prisma__ShipmentUploadClient<runtime.Types.Result.GetResult<Prisma.$ShipmentUploadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ShipmentUploadCountArgs>(args?: Prisma.Subset<T, ShipmentUploadCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ShipmentUploadCountAggregateOutputType> : number>;
    aggregate<T extends ShipmentUploadAggregateArgs>(args: Prisma.Subset<T, ShipmentUploadAggregateArgs>): Prisma.PrismaPromise<GetShipmentUploadAggregateType<T>>;
    groupBy<T extends ShipmentUploadGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ShipmentUploadGroupByArgs['orderBy'];
    } : {
        orderBy?: ShipmentUploadGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ShipmentUploadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShipmentUploadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ShipmentUploadFieldRefs;
}
export interface Prisma__ShipmentUploadClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shipment<T extends Prisma.LogisticsShipmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LogisticsShipmentDefaultArgs<ExtArgs>>): Prisma.Prisma__LogisticsShipmentClient<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    leg<T extends Prisma.ShipmentUpload$legArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShipmentUpload$legArgs<ExtArgs>>): Prisma.Prisma__ShipmentLegClient<runtime.Types.Result.GetResult<Prisma.$ShipmentLegPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    file<T extends Prisma.FileAssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileAssetDefaultArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ShipmentUploadFieldRefs {
    readonly id: Prisma.FieldRef<"ShipmentUpload", 'String'>;
    readonly shipmentId: Prisma.FieldRef<"ShipmentUpload", 'String'>;
    readonly legId: Prisma.FieldRef<"ShipmentUpload", 'String'>;
    readonly fileId: Prisma.FieldRef<"ShipmentUpload", 'String'>;
    readonly kind: Prisma.FieldRef<"ShipmentUpload", 'ShipmentUploadKind'>;
    readonly uploadedById: Prisma.FieldRef<"ShipmentUpload", 'String'>;
    readonly buyerVisible: Prisma.FieldRef<"ShipmentUpload", 'Boolean'>;
    readonly publishedAt: Prisma.FieldRef<"ShipmentUpload", 'DateTime'>;
    readonly publishedById: Prisma.FieldRef<"ShipmentUpload", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ShipmentUpload", 'DateTime'>;
}
export type ShipmentUploadFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    include?: Prisma.ShipmentUploadInclude<ExtArgs> | null;
    where: Prisma.ShipmentUploadWhereUniqueInput;
};
export type ShipmentUploadFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    include?: Prisma.ShipmentUploadInclude<ExtArgs> | null;
    where: Prisma.ShipmentUploadWhereUniqueInput;
};
export type ShipmentUploadFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    include?: Prisma.ShipmentUploadInclude<ExtArgs> | null;
    where?: Prisma.ShipmentUploadWhereInput;
    orderBy?: Prisma.ShipmentUploadOrderByWithRelationInput | Prisma.ShipmentUploadOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentUploadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShipmentUploadScalarFieldEnum | Prisma.ShipmentUploadScalarFieldEnum[];
};
export type ShipmentUploadFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    include?: Prisma.ShipmentUploadInclude<ExtArgs> | null;
    where?: Prisma.ShipmentUploadWhereInput;
    orderBy?: Prisma.ShipmentUploadOrderByWithRelationInput | Prisma.ShipmentUploadOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentUploadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShipmentUploadScalarFieldEnum | Prisma.ShipmentUploadScalarFieldEnum[];
};
export type ShipmentUploadFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    include?: Prisma.ShipmentUploadInclude<ExtArgs> | null;
    where?: Prisma.ShipmentUploadWhereInput;
    orderBy?: Prisma.ShipmentUploadOrderByWithRelationInput | Prisma.ShipmentUploadOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentUploadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShipmentUploadScalarFieldEnum | Prisma.ShipmentUploadScalarFieldEnum[];
};
export type ShipmentUploadCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    include?: Prisma.ShipmentUploadInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShipmentUploadCreateInput, Prisma.ShipmentUploadUncheckedCreateInput>;
};
export type ShipmentUploadCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ShipmentUploadCreateManyInput | Prisma.ShipmentUploadCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ShipmentUploadCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    data: Prisma.ShipmentUploadCreateManyInput | Prisma.ShipmentUploadCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ShipmentUploadIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ShipmentUploadUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    include?: Prisma.ShipmentUploadInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShipmentUploadUpdateInput, Prisma.ShipmentUploadUncheckedUpdateInput>;
    where: Prisma.ShipmentUploadWhereUniqueInput;
};
export type ShipmentUploadUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ShipmentUploadUpdateManyMutationInput, Prisma.ShipmentUploadUncheckedUpdateManyInput>;
    where?: Prisma.ShipmentUploadWhereInput;
    limit?: number;
};
export type ShipmentUploadUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShipmentUploadUpdateManyMutationInput, Prisma.ShipmentUploadUncheckedUpdateManyInput>;
    where?: Prisma.ShipmentUploadWhereInput;
    limit?: number;
    include?: Prisma.ShipmentUploadIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ShipmentUploadUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    include?: Prisma.ShipmentUploadInclude<ExtArgs> | null;
    where: Prisma.ShipmentUploadWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShipmentUploadCreateInput, Prisma.ShipmentUploadUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ShipmentUploadUpdateInput, Prisma.ShipmentUploadUncheckedUpdateInput>;
};
export type ShipmentUploadDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    include?: Prisma.ShipmentUploadInclude<ExtArgs> | null;
    where: Prisma.ShipmentUploadWhereUniqueInput;
};
export type ShipmentUploadDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShipmentUploadWhereInput;
    limit?: number;
};
export type ShipmentUpload$legArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLegSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLegOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLegInclude<ExtArgs> | null;
    where?: Prisma.ShipmentLegWhereInput;
};
export type ShipmentUploadDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentUploadSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentUploadOmit<ExtArgs> | null;
    include?: Prisma.ShipmentUploadInclude<ExtArgs> | null;
};
