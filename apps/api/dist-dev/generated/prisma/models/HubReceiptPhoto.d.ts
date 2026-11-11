import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type HubReceiptPhotoModel = runtime.Types.Result.DefaultSelection<Prisma.$HubReceiptPhotoPayload>;
export type AggregateHubReceiptPhoto = {
    _count: HubReceiptPhotoCountAggregateOutputType | null;
    _min: HubReceiptPhotoMinAggregateOutputType | null;
    _max: HubReceiptPhotoMaxAggregateOutputType | null;
};
export type HubReceiptPhotoMinAggregateOutputType = {
    id: string | null;
    receiptId: string | null;
    fileId: string | null;
    createdAt: Date | null;
};
export type HubReceiptPhotoMaxAggregateOutputType = {
    id: string | null;
    receiptId: string | null;
    fileId: string | null;
    createdAt: Date | null;
};
export type HubReceiptPhotoCountAggregateOutputType = {
    id: number;
    receiptId: number;
    fileId: number;
    createdAt: number;
    _all: number;
};
export type HubReceiptPhotoMinAggregateInputType = {
    id?: true;
    receiptId?: true;
    fileId?: true;
    createdAt?: true;
};
export type HubReceiptPhotoMaxAggregateInputType = {
    id?: true;
    receiptId?: true;
    fileId?: true;
    createdAt?: true;
};
export type HubReceiptPhotoCountAggregateInputType = {
    id?: true;
    receiptId?: true;
    fileId?: true;
    createdAt?: true;
    _all?: true;
};
export type HubReceiptPhotoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubReceiptPhotoWhereInput;
    orderBy?: Prisma.HubReceiptPhotoOrderByWithRelationInput | Prisma.HubReceiptPhotoOrderByWithRelationInput[];
    cursor?: Prisma.HubReceiptPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | HubReceiptPhotoCountAggregateInputType;
    _min?: HubReceiptPhotoMinAggregateInputType;
    _max?: HubReceiptPhotoMaxAggregateInputType;
};
export type GetHubReceiptPhotoAggregateType<T extends HubReceiptPhotoAggregateArgs> = {
    [P in keyof T & keyof AggregateHubReceiptPhoto]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHubReceiptPhoto[P]> : Prisma.GetScalarType<T[P], AggregateHubReceiptPhoto[P]>;
};
export type HubReceiptPhotoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubReceiptPhotoWhereInput;
    orderBy?: Prisma.HubReceiptPhotoOrderByWithAggregationInput | Prisma.HubReceiptPhotoOrderByWithAggregationInput[];
    by: Prisma.HubReceiptPhotoScalarFieldEnum[] | Prisma.HubReceiptPhotoScalarFieldEnum;
    having?: Prisma.HubReceiptPhotoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HubReceiptPhotoCountAggregateInputType | true;
    _min?: HubReceiptPhotoMinAggregateInputType;
    _max?: HubReceiptPhotoMaxAggregateInputType;
};
export type HubReceiptPhotoGroupByOutputType = {
    id: string;
    receiptId: string;
    fileId: string;
    createdAt: Date;
    _count: HubReceiptPhotoCountAggregateOutputType | null;
    _min: HubReceiptPhotoMinAggregateOutputType | null;
    _max: HubReceiptPhotoMaxAggregateOutputType | null;
};
export type GetHubReceiptPhotoGroupByPayload<T extends HubReceiptPhotoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HubReceiptPhotoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HubReceiptPhotoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HubReceiptPhotoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HubReceiptPhotoGroupByOutputType[P]>;
}>>;
export type HubReceiptPhotoWhereInput = {
    AND?: Prisma.HubReceiptPhotoWhereInput | Prisma.HubReceiptPhotoWhereInput[];
    OR?: Prisma.HubReceiptPhotoWhereInput[];
    NOT?: Prisma.HubReceiptPhotoWhereInput | Prisma.HubReceiptPhotoWhereInput[];
    id?: Prisma.UuidFilter<"HubReceiptPhoto"> | string;
    receiptId?: Prisma.UuidFilter<"HubReceiptPhoto"> | string;
    fileId?: Prisma.UuidFilter<"HubReceiptPhoto"> | string;
    createdAt?: Prisma.DateTimeFilter<"HubReceiptPhoto"> | Date | string;
    receipt?: Prisma.XOR<Prisma.HubReceiptScalarRelationFilter, Prisma.HubReceiptWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
};
export type HubReceiptPhotoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    receipt?: Prisma.HubReceiptOrderByWithRelationInput;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type HubReceiptPhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.HubReceiptPhotoWhereInput | Prisma.HubReceiptPhotoWhereInput[];
    OR?: Prisma.HubReceiptPhotoWhereInput[];
    NOT?: Prisma.HubReceiptPhotoWhereInput | Prisma.HubReceiptPhotoWhereInput[];
    receiptId?: Prisma.UuidFilter<"HubReceiptPhoto"> | string;
    createdAt?: Prisma.DateTimeFilter<"HubReceiptPhoto"> | Date | string;
    receipt?: Prisma.XOR<Prisma.HubReceiptScalarRelationFilter, Prisma.HubReceiptWhereInput>;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
}, "id" | "fileId">;
export type HubReceiptPhotoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.HubReceiptPhotoCountOrderByAggregateInput;
    _max?: Prisma.HubReceiptPhotoMaxOrderByAggregateInput;
    _min?: Prisma.HubReceiptPhotoMinOrderByAggregateInput;
};
export type HubReceiptPhotoScalarWhereWithAggregatesInput = {
    AND?: Prisma.HubReceiptPhotoScalarWhereWithAggregatesInput | Prisma.HubReceiptPhotoScalarWhereWithAggregatesInput[];
    OR?: Prisma.HubReceiptPhotoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HubReceiptPhotoScalarWhereWithAggregatesInput | Prisma.HubReceiptPhotoScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"HubReceiptPhoto"> | string;
    receiptId?: Prisma.UuidWithAggregatesFilter<"HubReceiptPhoto"> | string;
    fileId?: Prisma.UuidWithAggregatesFilter<"HubReceiptPhoto"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"HubReceiptPhoto"> | Date | string;
};
export type HubReceiptPhotoCreateInput = {
    id?: string;
    createdAt?: Date | string;
    receipt: Prisma.HubReceiptCreateNestedOneWithoutPhotosInput;
    file: Prisma.FileAssetCreateNestedOneWithoutHubReceiptPhotoInput;
};
export type HubReceiptPhotoUncheckedCreateInput = {
    id?: string;
    receiptId: string;
    fileId: string;
    createdAt?: Date | string;
};
export type HubReceiptPhotoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipt?: Prisma.HubReceiptUpdateOneRequiredWithoutPhotosNestedInput;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutHubReceiptPhotoNestedInput;
};
export type HubReceiptPhotoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HubReceiptPhotoCreateManyInput = {
    id?: string;
    receiptId: string;
    fileId: string;
    createdAt?: Date | string;
};
export type HubReceiptPhotoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HubReceiptPhotoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HubReceiptPhotoNullableScalarRelationFilter = {
    is?: Prisma.HubReceiptPhotoWhereInput | null;
    isNot?: Prisma.HubReceiptPhotoWhereInput | null;
};
export type HubReceiptPhotoListRelationFilter = {
    every?: Prisma.HubReceiptPhotoWhereInput;
    some?: Prisma.HubReceiptPhotoWhereInput;
    none?: Prisma.HubReceiptPhotoWhereInput;
};
export type HubReceiptPhotoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HubReceiptPhotoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HubReceiptPhotoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HubReceiptPhotoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HubReceiptPhotoCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutFileInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.HubReceiptPhotoCreateOrConnectWithoutFileInput;
    connect?: Prisma.HubReceiptPhotoWhereUniqueInput;
};
export type HubReceiptPhotoUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutFileInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.HubReceiptPhotoCreateOrConnectWithoutFileInput;
    connect?: Prisma.HubReceiptPhotoWhereUniqueInput;
};
export type HubReceiptPhotoUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutFileInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.HubReceiptPhotoCreateOrConnectWithoutFileInput;
    upsert?: Prisma.HubReceiptPhotoUpsertWithoutFileInput;
    disconnect?: Prisma.HubReceiptPhotoWhereInput | boolean;
    delete?: Prisma.HubReceiptPhotoWhereInput | boolean;
    connect?: Prisma.HubReceiptPhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HubReceiptPhotoUpdateToOneWithWhereWithoutFileInput, Prisma.HubReceiptPhotoUpdateWithoutFileInput>, Prisma.HubReceiptPhotoUncheckedUpdateWithoutFileInput>;
};
export type HubReceiptPhotoUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutFileInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.HubReceiptPhotoCreateOrConnectWithoutFileInput;
    upsert?: Prisma.HubReceiptPhotoUpsertWithoutFileInput;
    disconnect?: Prisma.HubReceiptPhotoWhereInput | boolean;
    delete?: Prisma.HubReceiptPhotoWhereInput | boolean;
    connect?: Prisma.HubReceiptPhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.HubReceiptPhotoUpdateToOneWithWhereWithoutFileInput, Prisma.HubReceiptPhotoUpdateWithoutFileInput>, Prisma.HubReceiptPhotoUncheckedUpdateWithoutFileInput>;
};
export type HubReceiptPhotoCreateNestedManyWithoutReceiptInput = {
    create?: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutReceiptInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutReceiptInput> | Prisma.HubReceiptPhotoCreateWithoutReceiptInput[] | Prisma.HubReceiptPhotoUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.HubReceiptPhotoCreateOrConnectWithoutReceiptInput | Prisma.HubReceiptPhotoCreateOrConnectWithoutReceiptInput[];
    createMany?: Prisma.HubReceiptPhotoCreateManyReceiptInputEnvelope;
    connect?: Prisma.HubReceiptPhotoWhereUniqueInput | Prisma.HubReceiptPhotoWhereUniqueInput[];
};
export type HubReceiptPhotoUncheckedCreateNestedManyWithoutReceiptInput = {
    create?: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutReceiptInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutReceiptInput> | Prisma.HubReceiptPhotoCreateWithoutReceiptInput[] | Prisma.HubReceiptPhotoUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.HubReceiptPhotoCreateOrConnectWithoutReceiptInput | Prisma.HubReceiptPhotoCreateOrConnectWithoutReceiptInput[];
    createMany?: Prisma.HubReceiptPhotoCreateManyReceiptInputEnvelope;
    connect?: Prisma.HubReceiptPhotoWhereUniqueInput | Prisma.HubReceiptPhotoWhereUniqueInput[];
};
export type HubReceiptPhotoUpdateManyWithoutReceiptNestedInput = {
    create?: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutReceiptInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutReceiptInput> | Prisma.HubReceiptPhotoCreateWithoutReceiptInput[] | Prisma.HubReceiptPhotoUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.HubReceiptPhotoCreateOrConnectWithoutReceiptInput | Prisma.HubReceiptPhotoCreateOrConnectWithoutReceiptInput[];
    upsert?: Prisma.HubReceiptPhotoUpsertWithWhereUniqueWithoutReceiptInput | Prisma.HubReceiptPhotoUpsertWithWhereUniqueWithoutReceiptInput[];
    createMany?: Prisma.HubReceiptPhotoCreateManyReceiptInputEnvelope;
    set?: Prisma.HubReceiptPhotoWhereUniqueInput | Prisma.HubReceiptPhotoWhereUniqueInput[];
    disconnect?: Prisma.HubReceiptPhotoWhereUniqueInput | Prisma.HubReceiptPhotoWhereUniqueInput[];
    delete?: Prisma.HubReceiptPhotoWhereUniqueInput | Prisma.HubReceiptPhotoWhereUniqueInput[];
    connect?: Prisma.HubReceiptPhotoWhereUniqueInput | Prisma.HubReceiptPhotoWhereUniqueInput[];
    update?: Prisma.HubReceiptPhotoUpdateWithWhereUniqueWithoutReceiptInput | Prisma.HubReceiptPhotoUpdateWithWhereUniqueWithoutReceiptInput[];
    updateMany?: Prisma.HubReceiptPhotoUpdateManyWithWhereWithoutReceiptInput | Prisma.HubReceiptPhotoUpdateManyWithWhereWithoutReceiptInput[];
    deleteMany?: Prisma.HubReceiptPhotoScalarWhereInput | Prisma.HubReceiptPhotoScalarWhereInput[];
};
export type HubReceiptPhotoUncheckedUpdateManyWithoutReceiptNestedInput = {
    create?: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutReceiptInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutReceiptInput> | Prisma.HubReceiptPhotoCreateWithoutReceiptInput[] | Prisma.HubReceiptPhotoUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.HubReceiptPhotoCreateOrConnectWithoutReceiptInput | Prisma.HubReceiptPhotoCreateOrConnectWithoutReceiptInput[];
    upsert?: Prisma.HubReceiptPhotoUpsertWithWhereUniqueWithoutReceiptInput | Prisma.HubReceiptPhotoUpsertWithWhereUniqueWithoutReceiptInput[];
    createMany?: Prisma.HubReceiptPhotoCreateManyReceiptInputEnvelope;
    set?: Prisma.HubReceiptPhotoWhereUniqueInput | Prisma.HubReceiptPhotoWhereUniqueInput[];
    disconnect?: Prisma.HubReceiptPhotoWhereUniqueInput | Prisma.HubReceiptPhotoWhereUniqueInput[];
    delete?: Prisma.HubReceiptPhotoWhereUniqueInput | Prisma.HubReceiptPhotoWhereUniqueInput[];
    connect?: Prisma.HubReceiptPhotoWhereUniqueInput | Prisma.HubReceiptPhotoWhereUniqueInput[];
    update?: Prisma.HubReceiptPhotoUpdateWithWhereUniqueWithoutReceiptInput | Prisma.HubReceiptPhotoUpdateWithWhereUniqueWithoutReceiptInput[];
    updateMany?: Prisma.HubReceiptPhotoUpdateManyWithWhereWithoutReceiptInput | Prisma.HubReceiptPhotoUpdateManyWithWhereWithoutReceiptInput[];
    deleteMany?: Prisma.HubReceiptPhotoScalarWhereInput | Prisma.HubReceiptPhotoScalarWhereInput[];
};
export type HubReceiptPhotoCreateWithoutFileInput = {
    id?: string;
    createdAt?: Date | string;
    receipt: Prisma.HubReceiptCreateNestedOneWithoutPhotosInput;
};
export type HubReceiptPhotoUncheckedCreateWithoutFileInput = {
    id?: string;
    receiptId: string;
    createdAt?: Date | string;
};
export type HubReceiptPhotoCreateOrConnectWithoutFileInput = {
    where: Prisma.HubReceiptPhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutFileInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutFileInput>;
};
export type HubReceiptPhotoUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.HubReceiptPhotoUpdateWithoutFileInput, Prisma.HubReceiptPhotoUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutFileInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutFileInput>;
    where?: Prisma.HubReceiptPhotoWhereInput;
};
export type HubReceiptPhotoUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.HubReceiptPhotoWhereInput;
    data: Prisma.XOR<Prisma.HubReceiptPhotoUpdateWithoutFileInput, Prisma.HubReceiptPhotoUncheckedUpdateWithoutFileInput>;
};
export type HubReceiptPhotoUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipt?: Prisma.HubReceiptUpdateOneRequiredWithoutPhotosNestedInput;
};
export type HubReceiptPhotoUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HubReceiptPhotoCreateWithoutReceiptInput = {
    id?: string;
    createdAt?: Date | string;
    file: Prisma.FileAssetCreateNestedOneWithoutHubReceiptPhotoInput;
};
export type HubReceiptPhotoUncheckedCreateWithoutReceiptInput = {
    id?: string;
    fileId: string;
    createdAt?: Date | string;
};
export type HubReceiptPhotoCreateOrConnectWithoutReceiptInput = {
    where: Prisma.HubReceiptPhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutReceiptInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutReceiptInput>;
};
export type HubReceiptPhotoCreateManyReceiptInputEnvelope = {
    data: Prisma.HubReceiptPhotoCreateManyReceiptInput | Prisma.HubReceiptPhotoCreateManyReceiptInput[];
    skipDuplicates?: boolean;
};
export type HubReceiptPhotoUpsertWithWhereUniqueWithoutReceiptInput = {
    where: Prisma.HubReceiptPhotoWhereUniqueInput;
    update: Prisma.XOR<Prisma.HubReceiptPhotoUpdateWithoutReceiptInput, Prisma.HubReceiptPhotoUncheckedUpdateWithoutReceiptInput>;
    create: Prisma.XOR<Prisma.HubReceiptPhotoCreateWithoutReceiptInput, Prisma.HubReceiptPhotoUncheckedCreateWithoutReceiptInput>;
};
export type HubReceiptPhotoUpdateWithWhereUniqueWithoutReceiptInput = {
    where: Prisma.HubReceiptPhotoWhereUniqueInput;
    data: Prisma.XOR<Prisma.HubReceiptPhotoUpdateWithoutReceiptInput, Prisma.HubReceiptPhotoUncheckedUpdateWithoutReceiptInput>;
};
export type HubReceiptPhotoUpdateManyWithWhereWithoutReceiptInput = {
    where: Prisma.HubReceiptPhotoScalarWhereInput;
    data: Prisma.XOR<Prisma.HubReceiptPhotoUpdateManyMutationInput, Prisma.HubReceiptPhotoUncheckedUpdateManyWithoutReceiptInput>;
};
export type HubReceiptPhotoScalarWhereInput = {
    AND?: Prisma.HubReceiptPhotoScalarWhereInput | Prisma.HubReceiptPhotoScalarWhereInput[];
    OR?: Prisma.HubReceiptPhotoScalarWhereInput[];
    NOT?: Prisma.HubReceiptPhotoScalarWhereInput | Prisma.HubReceiptPhotoScalarWhereInput[];
    id?: Prisma.UuidFilter<"HubReceiptPhoto"> | string;
    receiptId?: Prisma.UuidFilter<"HubReceiptPhoto"> | string;
    fileId?: Prisma.UuidFilter<"HubReceiptPhoto"> | string;
    createdAt?: Prisma.DateTimeFilter<"HubReceiptPhoto"> | Date | string;
};
export type HubReceiptPhotoCreateManyReceiptInput = {
    id?: string;
    fileId: string;
    createdAt?: Date | string;
};
export type HubReceiptPhotoUpdateWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutHubReceiptPhotoNestedInput;
};
export type HubReceiptPhotoUncheckedUpdateWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HubReceiptPhotoUncheckedUpdateManyWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HubReceiptPhotoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    receiptId?: boolean;
    fileId?: boolean;
    createdAt?: boolean;
    receipt?: boolean | Prisma.HubReceiptDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hubReceiptPhoto"]>;
export type HubReceiptPhotoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    receiptId?: boolean;
    fileId?: boolean;
    createdAt?: boolean;
    receipt?: boolean | Prisma.HubReceiptDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hubReceiptPhoto"]>;
export type HubReceiptPhotoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    receiptId?: boolean;
    fileId?: boolean;
    createdAt?: boolean;
    receipt?: boolean | Prisma.HubReceiptDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["hubReceiptPhoto"]>;
export type HubReceiptPhotoSelectScalar = {
    id?: boolean;
    receiptId?: boolean;
    fileId?: boolean;
    createdAt?: boolean;
};
export type HubReceiptPhotoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "receiptId" | "fileId" | "createdAt", ExtArgs["result"]["hubReceiptPhoto"]>;
export type HubReceiptPhotoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receipt?: boolean | Prisma.HubReceiptDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type HubReceiptPhotoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receipt?: boolean | Prisma.HubReceiptDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type HubReceiptPhotoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receipt?: boolean | Prisma.HubReceiptDefaultArgs<ExtArgs>;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type $HubReceiptPhotoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HubReceiptPhoto";
    objects: {
        receipt: Prisma.$HubReceiptPayload<ExtArgs>;
        file: Prisma.$FileAssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        receiptId: string;
        fileId: string;
        createdAt: Date;
    }, ExtArgs["result"]["hubReceiptPhoto"]>;
    composites: {};
};
export type HubReceiptPhotoGetPayload<S extends boolean | null | undefined | HubReceiptPhotoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload, S>;
export type HubReceiptPhotoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HubReceiptPhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HubReceiptPhotoCountAggregateInputType | true;
};
export interface HubReceiptPhotoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HubReceiptPhoto'];
        meta: {
            name: 'HubReceiptPhoto';
        };
    };
    findUnique<T extends HubReceiptPhotoFindUniqueArgs>(args: Prisma.SelectSubset<T, HubReceiptPhotoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HubReceiptPhotoClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends HubReceiptPhotoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HubReceiptPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HubReceiptPhotoClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends HubReceiptPhotoFindFirstArgs>(args?: Prisma.SelectSubset<T, HubReceiptPhotoFindFirstArgs<ExtArgs>>): Prisma.Prisma__HubReceiptPhotoClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends HubReceiptPhotoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HubReceiptPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HubReceiptPhotoClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends HubReceiptPhotoFindManyArgs>(args?: Prisma.SelectSubset<T, HubReceiptPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends HubReceiptPhotoCreateArgs>(args: Prisma.SelectSubset<T, HubReceiptPhotoCreateArgs<ExtArgs>>): Prisma.Prisma__HubReceiptPhotoClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends HubReceiptPhotoCreateManyArgs>(args?: Prisma.SelectSubset<T, HubReceiptPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends HubReceiptPhotoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HubReceiptPhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends HubReceiptPhotoDeleteArgs>(args: Prisma.SelectSubset<T, HubReceiptPhotoDeleteArgs<ExtArgs>>): Prisma.Prisma__HubReceiptPhotoClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends HubReceiptPhotoUpdateArgs>(args: Prisma.SelectSubset<T, HubReceiptPhotoUpdateArgs<ExtArgs>>): Prisma.Prisma__HubReceiptPhotoClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends HubReceiptPhotoDeleteManyArgs>(args?: Prisma.SelectSubset<T, HubReceiptPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends HubReceiptPhotoUpdateManyArgs>(args: Prisma.SelectSubset<T, HubReceiptPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends HubReceiptPhotoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HubReceiptPhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends HubReceiptPhotoUpsertArgs>(args: Prisma.SelectSubset<T, HubReceiptPhotoUpsertArgs<ExtArgs>>): Prisma.Prisma__HubReceiptPhotoClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends HubReceiptPhotoCountArgs>(args?: Prisma.Subset<T, HubReceiptPhotoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HubReceiptPhotoCountAggregateOutputType> : number>;
    aggregate<T extends HubReceiptPhotoAggregateArgs>(args: Prisma.Subset<T, HubReceiptPhotoAggregateArgs>): Prisma.PrismaPromise<GetHubReceiptPhotoAggregateType<T>>;
    groupBy<T extends HubReceiptPhotoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HubReceiptPhotoGroupByArgs['orderBy'];
    } : {
        orderBy?: HubReceiptPhotoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HubReceiptPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHubReceiptPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: HubReceiptPhotoFieldRefs;
}
export interface Prisma__HubReceiptPhotoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    receipt<T extends Prisma.HubReceiptDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.HubReceiptDefaultArgs<ExtArgs>>): Prisma.Prisma__HubReceiptClient<runtime.Types.Result.GetResult<Prisma.$HubReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    file<T extends Prisma.FileAssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileAssetDefaultArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface HubReceiptPhotoFieldRefs {
    readonly id: Prisma.FieldRef<"HubReceiptPhoto", 'String'>;
    readonly receiptId: Prisma.FieldRef<"HubReceiptPhoto", 'String'>;
    readonly fileId: Prisma.FieldRef<"HubReceiptPhoto", 'String'>;
    readonly createdAt: Prisma.FieldRef<"HubReceiptPhoto", 'DateTime'>;
}
export type HubReceiptPhotoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptPhotoInclude<ExtArgs> | null;
    where: Prisma.HubReceiptPhotoWhereUniqueInput;
};
export type HubReceiptPhotoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptPhotoInclude<ExtArgs> | null;
    where: Prisma.HubReceiptPhotoWhereUniqueInput;
};
export type HubReceiptPhotoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptPhotoInclude<ExtArgs> | null;
    where?: Prisma.HubReceiptPhotoWhereInput;
    orderBy?: Prisma.HubReceiptPhotoOrderByWithRelationInput | Prisma.HubReceiptPhotoOrderByWithRelationInput[];
    cursor?: Prisma.HubReceiptPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HubReceiptPhotoScalarFieldEnum | Prisma.HubReceiptPhotoScalarFieldEnum[];
};
export type HubReceiptPhotoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptPhotoInclude<ExtArgs> | null;
    where?: Prisma.HubReceiptPhotoWhereInput;
    orderBy?: Prisma.HubReceiptPhotoOrderByWithRelationInput | Prisma.HubReceiptPhotoOrderByWithRelationInput[];
    cursor?: Prisma.HubReceiptPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HubReceiptPhotoScalarFieldEnum | Prisma.HubReceiptPhotoScalarFieldEnum[];
};
export type HubReceiptPhotoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptPhotoInclude<ExtArgs> | null;
    where?: Prisma.HubReceiptPhotoWhereInput;
    orderBy?: Prisma.HubReceiptPhotoOrderByWithRelationInput | Prisma.HubReceiptPhotoOrderByWithRelationInput[];
    cursor?: Prisma.HubReceiptPhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HubReceiptPhotoScalarFieldEnum | Prisma.HubReceiptPhotoScalarFieldEnum[];
};
export type HubReceiptPhotoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptPhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HubReceiptPhotoCreateInput, Prisma.HubReceiptPhotoUncheckedCreateInput>;
};
export type HubReceiptPhotoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.HubReceiptPhotoCreateManyInput | Prisma.HubReceiptPhotoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HubReceiptPhotoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    data: Prisma.HubReceiptPhotoCreateManyInput | Prisma.HubReceiptPhotoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.HubReceiptPhotoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type HubReceiptPhotoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptPhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HubReceiptPhotoUpdateInput, Prisma.HubReceiptPhotoUncheckedUpdateInput>;
    where: Prisma.HubReceiptPhotoWhereUniqueInput;
};
export type HubReceiptPhotoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.HubReceiptPhotoUpdateManyMutationInput, Prisma.HubReceiptPhotoUncheckedUpdateManyInput>;
    where?: Prisma.HubReceiptPhotoWhereInput;
    limit?: number;
};
export type HubReceiptPhotoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HubReceiptPhotoUpdateManyMutationInput, Prisma.HubReceiptPhotoUncheckedUpdateManyInput>;
    where?: Prisma.HubReceiptPhotoWhereInput;
    limit?: number;
    include?: Prisma.HubReceiptPhotoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type HubReceiptPhotoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptPhotoInclude<ExtArgs> | null;
    where: Prisma.HubReceiptPhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.HubReceiptPhotoCreateInput, Prisma.HubReceiptPhotoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.HubReceiptPhotoUpdateInput, Prisma.HubReceiptPhotoUncheckedUpdateInput>;
};
export type HubReceiptPhotoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptPhotoInclude<ExtArgs> | null;
    where: Prisma.HubReceiptPhotoWhereUniqueInput;
};
export type HubReceiptPhotoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HubReceiptPhotoWhereInput;
    limit?: number;
};
export type HubReceiptPhotoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HubReceiptPhotoSelect<ExtArgs> | null;
    omit?: Prisma.HubReceiptPhotoOmit<ExtArgs> | null;
    include?: Prisma.HubReceiptPhotoInclude<ExtArgs> | null;
};
