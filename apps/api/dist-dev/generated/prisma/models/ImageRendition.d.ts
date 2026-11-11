import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ImageRenditionModel = runtime.Types.Result.DefaultSelection<Prisma.$ImageRenditionPayload>;
export type AggregateImageRendition = {
    _count: ImageRenditionCountAggregateOutputType | null;
    _avg: ImageRenditionAvgAggregateOutputType | null;
    _sum: ImageRenditionSumAggregateOutputType | null;
    _min: ImageRenditionMinAggregateOutputType | null;
    _max: ImageRenditionMaxAggregateOutputType | null;
};
export type ImageRenditionAvgAggregateOutputType = {
    width: number | null;
    height: number | null;
    sizeBytes: number | null;
};
export type ImageRenditionSumAggregateOutputType = {
    width: number | null;
    height: number | null;
    sizeBytes: number | null;
};
export type ImageRenditionMinAggregateOutputType = {
    id: string | null;
    fileId: string | null;
    width: number | null;
    height: number | null;
    storageKey: string | null;
    sizeBytes: number | null;
    format: string | null;
    createdAt: Date | null;
};
export type ImageRenditionMaxAggregateOutputType = {
    id: string | null;
    fileId: string | null;
    width: number | null;
    height: number | null;
    storageKey: string | null;
    sizeBytes: number | null;
    format: string | null;
    createdAt: Date | null;
};
export type ImageRenditionCountAggregateOutputType = {
    id: number;
    fileId: number;
    width: number;
    height: number;
    storageKey: number;
    sizeBytes: number;
    format: number;
    createdAt: number;
    _all: number;
};
export type ImageRenditionAvgAggregateInputType = {
    width?: true;
    height?: true;
    sizeBytes?: true;
};
export type ImageRenditionSumAggregateInputType = {
    width?: true;
    height?: true;
    sizeBytes?: true;
};
export type ImageRenditionMinAggregateInputType = {
    id?: true;
    fileId?: true;
    width?: true;
    height?: true;
    storageKey?: true;
    sizeBytes?: true;
    format?: true;
    createdAt?: true;
};
export type ImageRenditionMaxAggregateInputType = {
    id?: true;
    fileId?: true;
    width?: true;
    height?: true;
    storageKey?: true;
    sizeBytes?: true;
    format?: true;
    createdAt?: true;
};
export type ImageRenditionCountAggregateInputType = {
    id?: true;
    fileId?: true;
    width?: true;
    height?: true;
    storageKey?: true;
    sizeBytes?: true;
    format?: true;
    createdAt?: true;
    _all?: true;
};
export type ImageRenditionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ImageRenditionWhereInput;
    orderBy?: Prisma.ImageRenditionOrderByWithRelationInput | Prisma.ImageRenditionOrderByWithRelationInput[];
    cursor?: Prisma.ImageRenditionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ImageRenditionCountAggregateInputType;
    _avg?: ImageRenditionAvgAggregateInputType;
    _sum?: ImageRenditionSumAggregateInputType;
    _min?: ImageRenditionMinAggregateInputType;
    _max?: ImageRenditionMaxAggregateInputType;
};
export type GetImageRenditionAggregateType<T extends ImageRenditionAggregateArgs> = {
    [P in keyof T & keyof AggregateImageRendition]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateImageRendition[P]> : Prisma.GetScalarType<T[P], AggregateImageRendition[P]>;
};
export type ImageRenditionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ImageRenditionWhereInput;
    orderBy?: Prisma.ImageRenditionOrderByWithAggregationInput | Prisma.ImageRenditionOrderByWithAggregationInput[];
    by: Prisma.ImageRenditionScalarFieldEnum[] | Prisma.ImageRenditionScalarFieldEnum;
    having?: Prisma.ImageRenditionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ImageRenditionCountAggregateInputType | true;
    _avg?: ImageRenditionAvgAggregateInputType;
    _sum?: ImageRenditionSumAggregateInputType;
    _min?: ImageRenditionMinAggregateInputType;
    _max?: ImageRenditionMaxAggregateInputType;
};
export type ImageRenditionGroupByOutputType = {
    id: string;
    fileId: string;
    width: number;
    height: number;
    storageKey: string;
    sizeBytes: number;
    format: string;
    createdAt: Date;
    _count: ImageRenditionCountAggregateOutputType | null;
    _avg: ImageRenditionAvgAggregateOutputType | null;
    _sum: ImageRenditionSumAggregateOutputType | null;
    _min: ImageRenditionMinAggregateOutputType | null;
    _max: ImageRenditionMaxAggregateOutputType | null;
};
export type GetImageRenditionGroupByPayload<T extends ImageRenditionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ImageRenditionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ImageRenditionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ImageRenditionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ImageRenditionGroupByOutputType[P]>;
}>>;
export type ImageRenditionWhereInput = {
    AND?: Prisma.ImageRenditionWhereInput | Prisma.ImageRenditionWhereInput[];
    OR?: Prisma.ImageRenditionWhereInput[];
    NOT?: Prisma.ImageRenditionWhereInput | Prisma.ImageRenditionWhereInput[];
    id?: Prisma.UuidFilter<"ImageRendition"> | string;
    fileId?: Prisma.UuidFilter<"ImageRendition"> | string;
    width?: Prisma.IntFilter<"ImageRendition"> | number;
    height?: Prisma.IntFilter<"ImageRendition"> | number;
    storageKey?: Prisma.StringFilter<"ImageRendition"> | string;
    sizeBytes?: Prisma.IntFilter<"ImageRendition"> | number;
    format?: Prisma.StringFilter<"ImageRendition"> | string;
    createdAt?: Prisma.DateTimeFilter<"ImageRendition"> | Date | string;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
};
export type ImageRenditionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    file?: Prisma.FileAssetOrderByWithRelationInput;
};
export type ImageRenditionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    storageKey?: string;
    fileId_width?: Prisma.ImageRenditionFileIdWidthCompoundUniqueInput;
    AND?: Prisma.ImageRenditionWhereInput | Prisma.ImageRenditionWhereInput[];
    OR?: Prisma.ImageRenditionWhereInput[];
    NOT?: Prisma.ImageRenditionWhereInput | Prisma.ImageRenditionWhereInput[];
    fileId?: Prisma.UuidFilter<"ImageRendition"> | string;
    width?: Prisma.IntFilter<"ImageRendition"> | number;
    height?: Prisma.IntFilter<"ImageRendition"> | number;
    sizeBytes?: Prisma.IntFilter<"ImageRendition"> | number;
    format?: Prisma.StringFilter<"ImageRendition"> | string;
    createdAt?: Prisma.DateTimeFilter<"ImageRendition"> | Date | string;
    file?: Prisma.XOR<Prisma.FileAssetScalarRelationFilter, Prisma.FileAssetWhereInput>;
}, "id" | "storageKey" | "fileId_width">;
export type ImageRenditionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ImageRenditionCountOrderByAggregateInput;
    _avg?: Prisma.ImageRenditionAvgOrderByAggregateInput;
    _max?: Prisma.ImageRenditionMaxOrderByAggregateInput;
    _min?: Prisma.ImageRenditionMinOrderByAggregateInput;
    _sum?: Prisma.ImageRenditionSumOrderByAggregateInput;
};
export type ImageRenditionScalarWhereWithAggregatesInput = {
    AND?: Prisma.ImageRenditionScalarWhereWithAggregatesInput | Prisma.ImageRenditionScalarWhereWithAggregatesInput[];
    OR?: Prisma.ImageRenditionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ImageRenditionScalarWhereWithAggregatesInput | Prisma.ImageRenditionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ImageRendition"> | string;
    fileId?: Prisma.UuidWithAggregatesFilter<"ImageRendition"> | string;
    width?: Prisma.IntWithAggregatesFilter<"ImageRendition"> | number;
    height?: Prisma.IntWithAggregatesFilter<"ImageRendition"> | number;
    storageKey?: Prisma.StringWithAggregatesFilter<"ImageRendition"> | string;
    sizeBytes?: Prisma.IntWithAggregatesFilter<"ImageRendition"> | number;
    format?: Prisma.StringWithAggregatesFilter<"ImageRendition"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ImageRendition"> | Date | string;
};
export type ImageRenditionCreateInput = {
    id?: string;
    width: number;
    height: number;
    storageKey: string;
    sizeBytes: number;
    format?: string;
    createdAt?: Date | string;
    file: Prisma.FileAssetCreateNestedOneWithoutRenditionsInput;
};
export type ImageRenditionUncheckedCreateInput = {
    id?: string;
    fileId: string;
    width: number;
    height: number;
    storageKey: string;
    sizeBytes: number;
    format?: string;
    createdAt?: Date | string;
};
export type ImageRenditionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileAssetUpdateOneRequiredWithoutRenditionsNestedInput;
};
export type ImageRenditionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ImageRenditionCreateManyInput = {
    id?: string;
    fileId: string;
    width: number;
    height: number;
    storageKey: string;
    sizeBytes: number;
    format?: string;
    createdAt?: Date | string;
};
export type ImageRenditionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ImageRenditionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ImageRenditionListRelationFilter = {
    every?: Prisma.ImageRenditionWhereInput;
    some?: Prisma.ImageRenditionWhereInput;
    none?: Prisma.ImageRenditionWhereInput;
};
export type ImageRenditionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ImageRenditionFileIdWidthCompoundUniqueInput = {
    fileId: string;
    width: number;
};
export type ImageRenditionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ImageRenditionAvgOrderByAggregateInput = {
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
};
export type ImageRenditionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ImageRenditionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    format?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ImageRenditionSumOrderByAggregateInput = {
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
};
export type ImageRenditionCreateNestedManyWithoutFileInput = {
    create?: Prisma.XOR<Prisma.ImageRenditionCreateWithoutFileInput, Prisma.ImageRenditionUncheckedCreateWithoutFileInput> | Prisma.ImageRenditionCreateWithoutFileInput[] | Prisma.ImageRenditionUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.ImageRenditionCreateOrConnectWithoutFileInput | Prisma.ImageRenditionCreateOrConnectWithoutFileInput[];
    createMany?: Prisma.ImageRenditionCreateManyFileInputEnvelope;
    connect?: Prisma.ImageRenditionWhereUniqueInput | Prisma.ImageRenditionWhereUniqueInput[];
};
export type ImageRenditionUncheckedCreateNestedManyWithoutFileInput = {
    create?: Prisma.XOR<Prisma.ImageRenditionCreateWithoutFileInput, Prisma.ImageRenditionUncheckedCreateWithoutFileInput> | Prisma.ImageRenditionCreateWithoutFileInput[] | Prisma.ImageRenditionUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.ImageRenditionCreateOrConnectWithoutFileInput | Prisma.ImageRenditionCreateOrConnectWithoutFileInput[];
    createMany?: Prisma.ImageRenditionCreateManyFileInputEnvelope;
    connect?: Prisma.ImageRenditionWhereUniqueInput | Prisma.ImageRenditionWhereUniqueInput[];
};
export type ImageRenditionUpdateManyWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.ImageRenditionCreateWithoutFileInput, Prisma.ImageRenditionUncheckedCreateWithoutFileInput> | Prisma.ImageRenditionCreateWithoutFileInput[] | Prisma.ImageRenditionUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.ImageRenditionCreateOrConnectWithoutFileInput | Prisma.ImageRenditionCreateOrConnectWithoutFileInput[];
    upsert?: Prisma.ImageRenditionUpsertWithWhereUniqueWithoutFileInput | Prisma.ImageRenditionUpsertWithWhereUniqueWithoutFileInput[];
    createMany?: Prisma.ImageRenditionCreateManyFileInputEnvelope;
    set?: Prisma.ImageRenditionWhereUniqueInput | Prisma.ImageRenditionWhereUniqueInput[];
    disconnect?: Prisma.ImageRenditionWhereUniqueInput | Prisma.ImageRenditionWhereUniqueInput[];
    delete?: Prisma.ImageRenditionWhereUniqueInput | Prisma.ImageRenditionWhereUniqueInput[];
    connect?: Prisma.ImageRenditionWhereUniqueInput | Prisma.ImageRenditionWhereUniqueInput[];
    update?: Prisma.ImageRenditionUpdateWithWhereUniqueWithoutFileInput | Prisma.ImageRenditionUpdateWithWhereUniqueWithoutFileInput[];
    updateMany?: Prisma.ImageRenditionUpdateManyWithWhereWithoutFileInput | Prisma.ImageRenditionUpdateManyWithWhereWithoutFileInput[];
    deleteMany?: Prisma.ImageRenditionScalarWhereInput | Prisma.ImageRenditionScalarWhereInput[];
};
export type ImageRenditionUncheckedUpdateManyWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.ImageRenditionCreateWithoutFileInput, Prisma.ImageRenditionUncheckedCreateWithoutFileInput> | Prisma.ImageRenditionCreateWithoutFileInput[] | Prisma.ImageRenditionUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.ImageRenditionCreateOrConnectWithoutFileInput | Prisma.ImageRenditionCreateOrConnectWithoutFileInput[];
    upsert?: Prisma.ImageRenditionUpsertWithWhereUniqueWithoutFileInput | Prisma.ImageRenditionUpsertWithWhereUniqueWithoutFileInput[];
    createMany?: Prisma.ImageRenditionCreateManyFileInputEnvelope;
    set?: Prisma.ImageRenditionWhereUniqueInput | Prisma.ImageRenditionWhereUniqueInput[];
    disconnect?: Prisma.ImageRenditionWhereUniqueInput | Prisma.ImageRenditionWhereUniqueInput[];
    delete?: Prisma.ImageRenditionWhereUniqueInput | Prisma.ImageRenditionWhereUniqueInput[];
    connect?: Prisma.ImageRenditionWhereUniqueInput | Prisma.ImageRenditionWhereUniqueInput[];
    update?: Prisma.ImageRenditionUpdateWithWhereUniqueWithoutFileInput | Prisma.ImageRenditionUpdateWithWhereUniqueWithoutFileInput[];
    updateMany?: Prisma.ImageRenditionUpdateManyWithWhereWithoutFileInput | Prisma.ImageRenditionUpdateManyWithWhereWithoutFileInput[];
    deleteMany?: Prisma.ImageRenditionScalarWhereInput | Prisma.ImageRenditionScalarWhereInput[];
};
export type ImageRenditionCreateWithoutFileInput = {
    id?: string;
    width: number;
    height: number;
    storageKey: string;
    sizeBytes: number;
    format?: string;
    createdAt?: Date | string;
};
export type ImageRenditionUncheckedCreateWithoutFileInput = {
    id?: string;
    width: number;
    height: number;
    storageKey: string;
    sizeBytes: number;
    format?: string;
    createdAt?: Date | string;
};
export type ImageRenditionCreateOrConnectWithoutFileInput = {
    where: Prisma.ImageRenditionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ImageRenditionCreateWithoutFileInput, Prisma.ImageRenditionUncheckedCreateWithoutFileInput>;
};
export type ImageRenditionCreateManyFileInputEnvelope = {
    data: Prisma.ImageRenditionCreateManyFileInput | Prisma.ImageRenditionCreateManyFileInput[];
    skipDuplicates?: boolean;
};
export type ImageRenditionUpsertWithWhereUniqueWithoutFileInput = {
    where: Prisma.ImageRenditionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ImageRenditionUpdateWithoutFileInput, Prisma.ImageRenditionUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.ImageRenditionCreateWithoutFileInput, Prisma.ImageRenditionUncheckedCreateWithoutFileInput>;
};
export type ImageRenditionUpdateWithWhereUniqueWithoutFileInput = {
    where: Prisma.ImageRenditionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ImageRenditionUpdateWithoutFileInput, Prisma.ImageRenditionUncheckedUpdateWithoutFileInput>;
};
export type ImageRenditionUpdateManyWithWhereWithoutFileInput = {
    where: Prisma.ImageRenditionScalarWhereInput;
    data: Prisma.XOR<Prisma.ImageRenditionUpdateManyMutationInput, Prisma.ImageRenditionUncheckedUpdateManyWithoutFileInput>;
};
export type ImageRenditionScalarWhereInput = {
    AND?: Prisma.ImageRenditionScalarWhereInput | Prisma.ImageRenditionScalarWhereInput[];
    OR?: Prisma.ImageRenditionScalarWhereInput[];
    NOT?: Prisma.ImageRenditionScalarWhereInput | Prisma.ImageRenditionScalarWhereInput[];
    id?: Prisma.UuidFilter<"ImageRendition"> | string;
    fileId?: Prisma.UuidFilter<"ImageRendition"> | string;
    width?: Prisma.IntFilter<"ImageRendition"> | number;
    height?: Prisma.IntFilter<"ImageRendition"> | number;
    storageKey?: Prisma.StringFilter<"ImageRendition"> | string;
    sizeBytes?: Prisma.IntFilter<"ImageRendition"> | number;
    format?: Prisma.StringFilter<"ImageRendition"> | string;
    createdAt?: Prisma.DateTimeFilter<"ImageRendition"> | Date | string;
};
export type ImageRenditionCreateManyFileInput = {
    id?: string;
    width: number;
    height: number;
    storageKey: string;
    sizeBytes: number;
    format?: string;
    createdAt?: Date | string;
};
export type ImageRenditionUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ImageRenditionUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ImageRenditionUncheckedUpdateManyWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    width?: Prisma.IntFieldUpdateOperationsInput | number;
    height?: Prisma.IntFieldUpdateOperationsInput | number;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    format?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ImageRenditionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fileId?: boolean;
    width?: boolean;
    height?: boolean;
    storageKey?: boolean;
    sizeBytes?: boolean;
    format?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["imageRendition"]>;
export type ImageRenditionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fileId?: boolean;
    width?: boolean;
    height?: boolean;
    storageKey?: boolean;
    sizeBytes?: boolean;
    format?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["imageRendition"]>;
export type ImageRenditionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fileId?: boolean;
    width?: boolean;
    height?: boolean;
    storageKey?: boolean;
    sizeBytes?: boolean;
    format?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["imageRendition"]>;
export type ImageRenditionSelectScalar = {
    id?: boolean;
    fileId?: boolean;
    width?: boolean;
    height?: boolean;
    storageKey?: boolean;
    sizeBytes?: boolean;
    format?: boolean;
    createdAt?: boolean;
};
export type ImageRenditionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fileId" | "width" | "height" | "storageKey" | "sizeBytes" | "format" | "createdAt", ExtArgs["result"]["imageRendition"]>;
export type ImageRenditionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type ImageRenditionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type ImageRenditionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileAssetDefaultArgs<ExtArgs>;
};
export type $ImageRenditionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ImageRendition";
    objects: {
        file: Prisma.$FileAssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fileId: string;
        width: number;
        height: number;
        storageKey: string;
        sizeBytes: number;
        format: string;
        createdAt: Date;
    }, ExtArgs["result"]["imageRendition"]>;
    composites: {};
};
export type ImageRenditionGetPayload<S extends boolean | null | undefined | ImageRenditionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload, S>;
export type ImageRenditionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ImageRenditionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ImageRenditionCountAggregateInputType | true;
};
export interface ImageRenditionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ImageRendition'];
        meta: {
            name: 'ImageRendition';
        };
    };
    findUnique<T extends ImageRenditionFindUniqueArgs>(args: Prisma.SelectSubset<T, ImageRenditionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ImageRenditionClient<runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ImageRenditionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ImageRenditionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ImageRenditionClient<runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ImageRenditionFindFirstArgs>(args?: Prisma.SelectSubset<T, ImageRenditionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ImageRenditionClient<runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ImageRenditionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ImageRenditionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ImageRenditionClient<runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ImageRenditionFindManyArgs>(args?: Prisma.SelectSubset<T, ImageRenditionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ImageRenditionCreateArgs>(args: Prisma.SelectSubset<T, ImageRenditionCreateArgs<ExtArgs>>): Prisma.Prisma__ImageRenditionClient<runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ImageRenditionCreateManyArgs>(args?: Prisma.SelectSubset<T, ImageRenditionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ImageRenditionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ImageRenditionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ImageRenditionDeleteArgs>(args: Prisma.SelectSubset<T, ImageRenditionDeleteArgs<ExtArgs>>): Prisma.Prisma__ImageRenditionClient<runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ImageRenditionUpdateArgs>(args: Prisma.SelectSubset<T, ImageRenditionUpdateArgs<ExtArgs>>): Prisma.Prisma__ImageRenditionClient<runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ImageRenditionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ImageRenditionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ImageRenditionUpdateManyArgs>(args: Prisma.SelectSubset<T, ImageRenditionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ImageRenditionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ImageRenditionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ImageRenditionUpsertArgs>(args: Prisma.SelectSubset<T, ImageRenditionUpsertArgs<ExtArgs>>): Prisma.Prisma__ImageRenditionClient<runtime.Types.Result.GetResult<Prisma.$ImageRenditionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ImageRenditionCountArgs>(args?: Prisma.Subset<T, ImageRenditionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ImageRenditionCountAggregateOutputType> : number>;
    aggregate<T extends ImageRenditionAggregateArgs>(args: Prisma.Subset<T, ImageRenditionAggregateArgs>): Prisma.PrismaPromise<GetImageRenditionAggregateType<T>>;
    groupBy<T extends ImageRenditionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ImageRenditionGroupByArgs['orderBy'];
    } : {
        orderBy?: ImageRenditionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ImageRenditionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageRenditionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ImageRenditionFieldRefs;
}
export interface Prisma__ImageRenditionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    file<T extends Prisma.FileAssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileAssetDefaultArgs<ExtArgs>>): Prisma.Prisma__FileAssetClient<runtime.Types.Result.GetResult<Prisma.$FileAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ImageRenditionFieldRefs {
    readonly id: Prisma.FieldRef<"ImageRendition", 'String'>;
    readonly fileId: Prisma.FieldRef<"ImageRendition", 'String'>;
    readonly width: Prisma.FieldRef<"ImageRendition", 'Int'>;
    readonly height: Prisma.FieldRef<"ImageRendition", 'Int'>;
    readonly storageKey: Prisma.FieldRef<"ImageRendition", 'String'>;
    readonly sizeBytes: Prisma.FieldRef<"ImageRendition", 'Int'>;
    readonly format: Prisma.FieldRef<"ImageRendition", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ImageRendition", 'DateTime'>;
}
export type ImageRenditionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelect<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    include?: Prisma.ImageRenditionInclude<ExtArgs> | null;
    where: Prisma.ImageRenditionWhereUniqueInput;
};
export type ImageRenditionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelect<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    include?: Prisma.ImageRenditionInclude<ExtArgs> | null;
    where: Prisma.ImageRenditionWhereUniqueInput;
};
export type ImageRenditionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelect<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    include?: Prisma.ImageRenditionInclude<ExtArgs> | null;
    where?: Prisma.ImageRenditionWhereInput;
    orderBy?: Prisma.ImageRenditionOrderByWithRelationInput | Prisma.ImageRenditionOrderByWithRelationInput[];
    cursor?: Prisma.ImageRenditionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ImageRenditionScalarFieldEnum | Prisma.ImageRenditionScalarFieldEnum[];
};
export type ImageRenditionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelect<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    include?: Prisma.ImageRenditionInclude<ExtArgs> | null;
    where?: Prisma.ImageRenditionWhereInput;
    orderBy?: Prisma.ImageRenditionOrderByWithRelationInput | Prisma.ImageRenditionOrderByWithRelationInput[];
    cursor?: Prisma.ImageRenditionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ImageRenditionScalarFieldEnum | Prisma.ImageRenditionScalarFieldEnum[];
};
export type ImageRenditionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelect<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    include?: Prisma.ImageRenditionInclude<ExtArgs> | null;
    where?: Prisma.ImageRenditionWhereInput;
    orderBy?: Prisma.ImageRenditionOrderByWithRelationInput | Prisma.ImageRenditionOrderByWithRelationInput[];
    cursor?: Prisma.ImageRenditionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ImageRenditionScalarFieldEnum | Prisma.ImageRenditionScalarFieldEnum[];
};
export type ImageRenditionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelect<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    include?: Prisma.ImageRenditionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ImageRenditionCreateInput, Prisma.ImageRenditionUncheckedCreateInput>;
};
export type ImageRenditionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ImageRenditionCreateManyInput | Prisma.ImageRenditionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ImageRenditionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    data: Prisma.ImageRenditionCreateManyInput | Prisma.ImageRenditionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ImageRenditionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ImageRenditionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelect<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    include?: Prisma.ImageRenditionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ImageRenditionUpdateInput, Prisma.ImageRenditionUncheckedUpdateInput>;
    where: Prisma.ImageRenditionWhereUniqueInput;
};
export type ImageRenditionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ImageRenditionUpdateManyMutationInput, Prisma.ImageRenditionUncheckedUpdateManyInput>;
    where?: Prisma.ImageRenditionWhereInput;
    limit?: number;
};
export type ImageRenditionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ImageRenditionUpdateManyMutationInput, Prisma.ImageRenditionUncheckedUpdateManyInput>;
    where?: Prisma.ImageRenditionWhereInput;
    limit?: number;
    include?: Prisma.ImageRenditionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ImageRenditionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelect<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    include?: Prisma.ImageRenditionInclude<ExtArgs> | null;
    where: Prisma.ImageRenditionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ImageRenditionCreateInput, Prisma.ImageRenditionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ImageRenditionUpdateInput, Prisma.ImageRenditionUncheckedUpdateInput>;
};
export type ImageRenditionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelect<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    include?: Prisma.ImageRenditionInclude<ExtArgs> | null;
    where: Prisma.ImageRenditionWhereUniqueInput;
};
export type ImageRenditionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ImageRenditionWhereInput;
    limit?: number;
};
export type ImageRenditionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageRenditionSelect<ExtArgs> | null;
    omit?: Prisma.ImageRenditionOmit<ExtArgs> | null;
    include?: Prisma.ImageRenditionInclude<ExtArgs> | null;
};
