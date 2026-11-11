import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductPriceTierModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductPriceTierPayload>;
export type AggregateProductPriceTier = {
    _count: ProductPriceTierCountAggregateOutputType | null;
    _avg: ProductPriceTierAvgAggregateOutputType | null;
    _sum: ProductPriceTierSumAggregateOutputType | null;
    _min: ProductPriceTierMinAggregateOutputType | null;
    _max: ProductPriceTierMaxAggregateOutputType | null;
};
export type ProductPriceTierAvgAggregateOutputType = {
    minQty: number | null;
    manufacturerUnitPriceMinor: number | null;
    buyerUnitPriceMinor: number | null;
};
export type ProductPriceTierSumAggregateOutputType = {
    minQty: number | null;
    manufacturerUnitPriceMinor: number | null;
    buyerUnitPriceMinor: number | null;
};
export type ProductPriceTierMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    minQty: number | null;
    manufacturerUnitPriceMinor: number | null;
    buyerUnitPriceMinor: number | null;
};
export type ProductPriceTierMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    minQty: number | null;
    manufacturerUnitPriceMinor: number | null;
    buyerUnitPriceMinor: number | null;
};
export type ProductPriceTierCountAggregateOutputType = {
    id: number;
    productId: number;
    minQty: number;
    manufacturerUnitPriceMinor: number;
    buyerUnitPriceMinor: number;
    _all: number;
};
export type ProductPriceTierAvgAggregateInputType = {
    minQty?: true;
    manufacturerUnitPriceMinor?: true;
    buyerUnitPriceMinor?: true;
};
export type ProductPriceTierSumAggregateInputType = {
    minQty?: true;
    manufacturerUnitPriceMinor?: true;
    buyerUnitPriceMinor?: true;
};
export type ProductPriceTierMinAggregateInputType = {
    id?: true;
    productId?: true;
    minQty?: true;
    manufacturerUnitPriceMinor?: true;
    buyerUnitPriceMinor?: true;
};
export type ProductPriceTierMaxAggregateInputType = {
    id?: true;
    productId?: true;
    minQty?: true;
    manufacturerUnitPriceMinor?: true;
    buyerUnitPriceMinor?: true;
};
export type ProductPriceTierCountAggregateInputType = {
    id?: true;
    productId?: true;
    minQty?: true;
    manufacturerUnitPriceMinor?: true;
    buyerUnitPriceMinor?: true;
    _all?: true;
};
export type ProductPriceTierAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductPriceTierWhereInput;
    orderBy?: Prisma.ProductPriceTierOrderByWithRelationInput | Prisma.ProductPriceTierOrderByWithRelationInput[];
    cursor?: Prisma.ProductPriceTierWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductPriceTierCountAggregateInputType;
    _avg?: ProductPriceTierAvgAggregateInputType;
    _sum?: ProductPriceTierSumAggregateInputType;
    _min?: ProductPriceTierMinAggregateInputType;
    _max?: ProductPriceTierMaxAggregateInputType;
};
export type GetProductPriceTierAggregateType<T extends ProductPriceTierAggregateArgs> = {
    [P in keyof T & keyof AggregateProductPriceTier]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductPriceTier[P]> : Prisma.GetScalarType<T[P], AggregateProductPriceTier[P]>;
};
export type ProductPriceTierGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductPriceTierWhereInput;
    orderBy?: Prisma.ProductPriceTierOrderByWithAggregationInput | Prisma.ProductPriceTierOrderByWithAggregationInput[];
    by: Prisma.ProductPriceTierScalarFieldEnum[] | Prisma.ProductPriceTierScalarFieldEnum;
    having?: Prisma.ProductPriceTierScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductPriceTierCountAggregateInputType | true;
    _avg?: ProductPriceTierAvgAggregateInputType;
    _sum?: ProductPriceTierSumAggregateInputType;
    _min?: ProductPriceTierMinAggregateInputType;
    _max?: ProductPriceTierMaxAggregateInputType;
};
export type ProductPriceTierGroupByOutputType = {
    id: string;
    productId: string;
    minQty: number;
    manufacturerUnitPriceMinor: number;
    buyerUnitPriceMinor: number;
    _count: ProductPriceTierCountAggregateOutputType | null;
    _avg: ProductPriceTierAvgAggregateOutputType | null;
    _sum: ProductPriceTierSumAggregateOutputType | null;
    _min: ProductPriceTierMinAggregateOutputType | null;
    _max: ProductPriceTierMaxAggregateOutputType | null;
};
export type GetProductPriceTierGroupByPayload<T extends ProductPriceTierGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductPriceTierGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductPriceTierGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductPriceTierGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductPriceTierGroupByOutputType[P]>;
}>>;
export type ProductPriceTierWhereInput = {
    AND?: Prisma.ProductPriceTierWhereInput | Prisma.ProductPriceTierWhereInput[];
    OR?: Prisma.ProductPriceTierWhereInput[];
    NOT?: Prisma.ProductPriceTierWhereInput | Prisma.ProductPriceTierWhereInput[];
    id?: Prisma.UuidFilter<"ProductPriceTier"> | string;
    productId?: Prisma.UuidFilter<"ProductPriceTier"> | string;
    minQty?: Prisma.IntFilter<"ProductPriceTier"> | number;
    manufacturerUnitPriceMinor?: Prisma.IntFilter<"ProductPriceTier"> | number;
    buyerUnitPriceMinor?: Prisma.IntFilter<"ProductPriceTier"> | number;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type ProductPriceTierOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    minQty?: Prisma.SortOrder;
    manufacturerUnitPriceMinor?: Prisma.SortOrder;
    buyerUnitPriceMinor?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type ProductPriceTierWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    productId_minQty?: Prisma.ProductPriceTierProductIdMinQtyCompoundUniqueInput;
    AND?: Prisma.ProductPriceTierWhereInput | Prisma.ProductPriceTierWhereInput[];
    OR?: Prisma.ProductPriceTierWhereInput[];
    NOT?: Prisma.ProductPriceTierWhereInput | Prisma.ProductPriceTierWhereInput[];
    productId?: Prisma.UuidFilter<"ProductPriceTier"> | string;
    minQty?: Prisma.IntFilter<"ProductPriceTier"> | number;
    manufacturerUnitPriceMinor?: Prisma.IntFilter<"ProductPriceTier"> | number;
    buyerUnitPriceMinor?: Prisma.IntFilter<"ProductPriceTier"> | number;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id" | "productId_minQty">;
export type ProductPriceTierOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    minQty?: Prisma.SortOrder;
    manufacturerUnitPriceMinor?: Prisma.SortOrder;
    buyerUnitPriceMinor?: Prisma.SortOrder;
    _count?: Prisma.ProductPriceTierCountOrderByAggregateInput;
    _avg?: Prisma.ProductPriceTierAvgOrderByAggregateInput;
    _max?: Prisma.ProductPriceTierMaxOrderByAggregateInput;
    _min?: Prisma.ProductPriceTierMinOrderByAggregateInput;
    _sum?: Prisma.ProductPriceTierSumOrderByAggregateInput;
};
export type ProductPriceTierScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductPriceTierScalarWhereWithAggregatesInput | Prisma.ProductPriceTierScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductPriceTierScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductPriceTierScalarWhereWithAggregatesInput | Prisma.ProductPriceTierScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ProductPriceTier"> | string;
    productId?: Prisma.UuidWithAggregatesFilter<"ProductPriceTier"> | string;
    minQty?: Prisma.IntWithAggregatesFilter<"ProductPriceTier"> | number;
    manufacturerUnitPriceMinor?: Prisma.IntWithAggregatesFilter<"ProductPriceTier"> | number;
    buyerUnitPriceMinor?: Prisma.IntWithAggregatesFilter<"ProductPriceTier"> | number;
};
export type ProductPriceTierCreateInput = {
    id?: string;
    minQty: number;
    manufacturerUnitPriceMinor: number;
    buyerUnitPriceMinor: number;
    product: Prisma.ProductCreateNestedOneWithoutPriceTiersInput;
};
export type ProductPriceTierUncheckedCreateInput = {
    id?: string;
    productId: string;
    minQty: number;
    manufacturerUnitPriceMinor: number;
    buyerUnitPriceMinor: number;
};
export type ProductPriceTierUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    minQty?: Prisma.IntFieldUpdateOperationsInput | number;
    manufacturerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    product?: Prisma.ProductUpdateOneRequiredWithoutPriceTiersNestedInput;
};
export type ProductPriceTierUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    minQty?: Prisma.IntFieldUpdateOperationsInput | number;
    manufacturerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductPriceTierCreateManyInput = {
    id?: string;
    productId: string;
    minQty: number;
    manufacturerUnitPriceMinor: number;
    buyerUnitPriceMinor: number;
};
export type ProductPriceTierUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    minQty?: Prisma.IntFieldUpdateOperationsInput | number;
    manufacturerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductPriceTierUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    minQty?: Prisma.IntFieldUpdateOperationsInput | number;
    manufacturerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductPriceTierListRelationFilter = {
    every?: Prisma.ProductPriceTierWhereInput;
    some?: Prisma.ProductPriceTierWhereInput;
    none?: Prisma.ProductPriceTierWhereInput;
};
export type ProductPriceTierOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductPriceTierProductIdMinQtyCompoundUniqueInput = {
    productId: string;
    minQty: number;
};
export type ProductPriceTierCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    minQty?: Prisma.SortOrder;
    manufacturerUnitPriceMinor?: Prisma.SortOrder;
    buyerUnitPriceMinor?: Prisma.SortOrder;
};
export type ProductPriceTierAvgOrderByAggregateInput = {
    minQty?: Prisma.SortOrder;
    manufacturerUnitPriceMinor?: Prisma.SortOrder;
    buyerUnitPriceMinor?: Prisma.SortOrder;
};
export type ProductPriceTierMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    minQty?: Prisma.SortOrder;
    manufacturerUnitPriceMinor?: Prisma.SortOrder;
    buyerUnitPriceMinor?: Prisma.SortOrder;
};
export type ProductPriceTierMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    minQty?: Prisma.SortOrder;
    manufacturerUnitPriceMinor?: Prisma.SortOrder;
    buyerUnitPriceMinor?: Prisma.SortOrder;
};
export type ProductPriceTierSumOrderByAggregateInput = {
    minQty?: Prisma.SortOrder;
    manufacturerUnitPriceMinor?: Prisma.SortOrder;
    buyerUnitPriceMinor?: Prisma.SortOrder;
};
export type ProductPriceTierCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductPriceTierCreateWithoutProductInput, Prisma.ProductPriceTierUncheckedCreateWithoutProductInput> | Prisma.ProductPriceTierCreateWithoutProductInput[] | Prisma.ProductPriceTierUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductPriceTierCreateOrConnectWithoutProductInput | Prisma.ProductPriceTierCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductPriceTierCreateManyProductInputEnvelope;
    connect?: Prisma.ProductPriceTierWhereUniqueInput | Prisma.ProductPriceTierWhereUniqueInput[];
};
export type ProductPriceTierUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductPriceTierCreateWithoutProductInput, Prisma.ProductPriceTierUncheckedCreateWithoutProductInput> | Prisma.ProductPriceTierCreateWithoutProductInput[] | Prisma.ProductPriceTierUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductPriceTierCreateOrConnectWithoutProductInput | Prisma.ProductPriceTierCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductPriceTierCreateManyProductInputEnvelope;
    connect?: Prisma.ProductPriceTierWhereUniqueInput | Prisma.ProductPriceTierWhereUniqueInput[];
};
export type ProductPriceTierUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductPriceTierCreateWithoutProductInput, Prisma.ProductPriceTierUncheckedCreateWithoutProductInput> | Prisma.ProductPriceTierCreateWithoutProductInput[] | Prisma.ProductPriceTierUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductPriceTierCreateOrConnectWithoutProductInput | Prisma.ProductPriceTierCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductPriceTierUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductPriceTierUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductPriceTierCreateManyProductInputEnvelope;
    set?: Prisma.ProductPriceTierWhereUniqueInput | Prisma.ProductPriceTierWhereUniqueInput[];
    disconnect?: Prisma.ProductPriceTierWhereUniqueInput | Prisma.ProductPriceTierWhereUniqueInput[];
    delete?: Prisma.ProductPriceTierWhereUniqueInput | Prisma.ProductPriceTierWhereUniqueInput[];
    connect?: Prisma.ProductPriceTierWhereUniqueInput | Prisma.ProductPriceTierWhereUniqueInput[];
    update?: Prisma.ProductPriceTierUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductPriceTierUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductPriceTierUpdateManyWithWhereWithoutProductInput | Prisma.ProductPriceTierUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductPriceTierScalarWhereInput | Prisma.ProductPriceTierScalarWhereInput[];
};
export type ProductPriceTierUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductPriceTierCreateWithoutProductInput, Prisma.ProductPriceTierUncheckedCreateWithoutProductInput> | Prisma.ProductPriceTierCreateWithoutProductInput[] | Prisma.ProductPriceTierUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductPriceTierCreateOrConnectWithoutProductInput | Prisma.ProductPriceTierCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductPriceTierUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductPriceTierUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductPriceTierCreateManyProductInputEnvelope;
    set?: Prisma.ProductPriceTierWhereUniqueInput | Prisma.ProductPriceTierWhereUniqueInput[];
    disconnect?: Prisma.ProductPriceTierWhereUniqueInput | Prisma.ProductPriceTierWhereUniqueInput[];
    delete?: Prisma.ProductPriceTierWhereUniqueInput | Prisma.ProductPriceTierWhereUniqueInput[];
    connect?: Prisma.ProductPriceTierWhereUniqueInput | Prisma.ProductPriceTierWhereUniqueInput[];
    update?: Prisma.ProductPriceTierUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductPriceTierUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductPriceTierUpdateManyWithWhereWithoutProductInput | Prisma.ProductPriceTierUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductPriceTierScalarWhereInput | Prisma.ProductPriceTierScalarWhereInput[];
};
export type ProductPriceTierCreateWithoutProductInput = {
    id?: string;
    minQty: number;
    manufacturerUnitPriceMinor: number;
    buyerUnitPriceMinor: number;
};
export type ProductPriceTierUncheckedCreateWithoutProductInput = {
    id?: string;
    minQty: number;
    manufacturerUnitPriceMinor: number;
    buyerUnitPriceMinor: number;
};
export type ProductPriceTierCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductPriceTierWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductPriceTierCreateWithoutProductInput, Prisma.ProductPriceTierUncheckedCreateWithoutProductInput>;
};
export type ProductPriceTierCreateManyProductInputEnvelope = {
    data: Prisma.ProductPriceTierCreateManyProductInput | Prisma.ProductPriceTierCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductPriceTierUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductPriceTierWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductPriceTierUpdateWithoutProductInput, Prisma.ProductPriceTierUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductPriceTierCreateWithoutProductInput, Prisma.ProductPriceTierUncheckedCreateWithoutProductInput>;
};
export type ProductPriceTierUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductPriceTierWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductPriceTierUpdateWithoutProductInput, Prisma.ProductPriceTierUncheckedUpdateWithoutProductInput>;
};
export type ProductPriceTierUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductPriceTierScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductPriceTierUpdateManyMutationInput, Prisma.ProductPriceTierUncheckedUpdateManyWithoutProductInput>;
};
export type ProductPriceTierScalarWhereInput = {
    AND?: Prisma.ProductPriceTierScalarWhereInput | Prisma.ProductPriceTierScalarWhereInput[];
    OR?: Prisma.ProductPriceTierScalarWhereInput[];
    NOT?: Prisma.ProductPriceTierScalarWhereInput | Prisma.ProductPriceTierScalarWhereInput[];
    id?: Prisma.UuidFilter<"ProductPriceTier"> | string;
    productId?: Prisma.UuidFilter<"ProductPriceTier"> | string;
    minQty?: Prisma.IntFilter<"ProductPriceTier"> | number;
    manufacturerUnitPriceMinor?: Prisma.IntFilter<"ProductPriceTier"> | number;
    buyerUnitPriceMinor?: Prisma.IntFilter<"ProductPriceTier"> | number;
};
export type ProductPriceTierCreateManyProductInput = {
    id?: string;
    minQty: number;
    manufacturerUnitPriceMinor: number;
    buyerUnitPriceMinor: number;
};
export type ProductPriceTierUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    minQty?: Prisma.IntFieldUpdateOperationsInput | number;
    manufacturerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductPriceTierUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    minQty?: Prisma.IntFieldUpdateOperationsInput | number;
    manufacturerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductPriceTierUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    minQty?: Prisma.IntFieldUpdateOperationsInput | number;
    manufacturerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    buyerUnitPriceMinor?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductPriceTierSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    minQty?: boolean;
    manufacturerUnitPriceMinor?: boolean;
    buyerUnitPriceMinor?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productPriceTier"]>;
export type ProductPriceTierSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    minQty?: boolean;
    manufacturerUnitPriceMinor?: boolean;
    buyerUnitPriceMinor?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productPriceTier"]>;
export type ProductPriceTierSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    minQty?: boolean;
    manufacturerUnitPriceMinor?: boolean;
    buyerUnitPriceMinor?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productPriceTier"]>;
export type ProductPriceTierSelectScalar = {
    id?: boolean;
    productId?: boolean;
    minQty?: boolean;
    manufacturerUnitPriceMinor?: boolean;
    buyerUnitPriceMinor?: boolean;
};
export type ProductPriceTierOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "minQty" | "manufacturerUnitPriceMinor" | "buyerUnitPriceMinor", ExtArgs["result"]["productPriceTier"]>;
export type ProductPriceTierInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductPriceTierIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductPriceTierIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $ProductPriceTierPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductPriceTier";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        minQty: number;
        manufacturerUnitPriceMinor: number;
        buyerUnitPriceMinor: number;
    }, ExtArgs["result"]["productPriceTier"]>;
    composites: {};
};
export type ProductPriceTierGetPayload<S extends boolean | null | undefined | ProductPriceTierDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload, S>;
export type ProductPriceTierCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductPriceTierFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductPriceTierCountAggregateInputType | true;
};
export interface ProductPriceTierDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductPriceTier'];
        meta: {
            name: 'ProductPriceTier';
        };
    };
    findUnique<T extends ProductPriceTierFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductPriceTierFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductPriceTierClient<runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductPriceTierFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductPriceTierFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductPriceTierClient<runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductPriceTierFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductPriceTierFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductPriceTierClient<runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductPriceTierFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductPriceTierFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductPriceTierClient<runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductPriceTierFindManyArgs>(args?: Prisma.SelectSubset<T, ProductPriceTierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductPriceTierCreateArgs>(args: Prisma.SelectSubset<T, ProductPriceTierCreateArgs<ExtArgs>>): Prisma.Prisma__ProductPriceTierClient<runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductPriceTierCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductPriceTierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductPriceTierCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductPriceTierCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductPriceTierDeleteArgs>(args: Prisma.SelectSubset<T, ProductPriceTierDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductPriceTierClient<runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductPriceTierUpdateArgs>(args: Prisma.SelectSubset<T, ProductPriceTierUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductPriceTierClient<runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductPriceTierDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductPriceTierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductPriceTierUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductPriceTierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductPriceTierUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductPriceTierUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductPriceTierUpsertArgs>(args: Prisma.SelectSubset<T, ProductPriceTierUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductPriceTierClient<runtime.Types.Result.GetResult<Prisma.$ProductPriceTierPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductPriceTierCountArgs>(args?: Prisma.Subset<T, ProductPriceTierCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductPriceTierCountAggregateOutputType> : number>;
    aggregate<T extends ProductPriceTierAggregateArgs>(args: Prisma.Subset<T, ProductPriceTierAggregateArgs>): Prisma.PrismaPromise<GetProductPriceTierAggregateType<T>>;
    groupBy<T extends ProductPriceTierGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductPriceTierGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductPriceTierGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductPriceTierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductPriceTierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductPriceTierFieldRefs;
}
export interface Prisma__ProductPriceTierClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductPriceTierFieldRefs {
    readonly id: Prisma.FieldRef<"ProductPriceTier", 'String'>;
    readonly productId: Prisma.FieldRef<"ProductPriceTier", 'String'>;
    readonly minQty: Prisma.FieldRef<"ProductPriceTier", 'Int'>;
    readonly manufacturerUnitPriceMinor: Prisma.FieldRef<"ProductPriceTier", 'Int'>;
    readonly buyerUnitPriceMinor: Prisma.FieldRef<"ProductPriceTier", 'Int'>;
}
export type ProductPriceTierFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelect<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    include?: Prisma.ProductPriceTierInclude<ExtArgs> | null;
    where: Prisma.ProductPriceTierWhereUniqueInput;
};
export type ProductPriceTierFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelect<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    include?: Prisma.ProductPriceTierInclude<ExtArgs> | null;
    where: Prisma.ProductPriceTierWhereUniqueInput;
};
export type ProductPriceTierFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelect<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    include?: Prisma.ProductPriceTierInclude<ExtArgs> | null;
    where?: Prisma.ProductPriceTierWhereInput;
    orderBy?: Prisma.ProductPriceTierOrderByWithRelationInput | Prisma.ProductPriceTierOrderByWithRelationInput[];
    cursor?: Prisma.ProductPriceTierWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductPriceTierScalarFieldEnum | Prisma.ProductPriceTierScalarFieldEnum[];
};
export type ProductPriceTierFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelect<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    include?: Prisma.ProductPriceTierInclude<ExtArgs> | null;
    where?: Prisma.ProductPriceTierWhereInput;
    orderBy?: Prisma.ProductPriceTierOrderByWithRelationInput | Prisma.ProductPriceTierOrderByWithRelationInput[];
    cursor?: Prisma.ProductPriceTierWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductPriceTierScalarFieldEnum | Prisma.ProductPriceTierScalarFieldEnum[];
};
export type ProductPriceTierFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelect<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    include?: Prisma.ProductPriceTierInclude<ExtArgs> | null;
    where?: Prisma.ProductPriceTierWhereInput;
    orderBy?: Prisma.ProductPriceTierOrderByWithRelationInput | Prisma.ProductPriceTierOrderByWithRelationInput[];
    cursor?: Prisma.ProductPriceTierWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductPriceTierScalarFieldEnum | Prisma.ProductPriceTierScalarFieldEnum[];
};
export type ProductPriceTierCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelect<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    include?: Prisma.ProductPriceTierInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductPriceTierCreateInput, Prisma.ProductPriceTierUncheckedCreateInput>;
};
export type ProductPriceTierCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductPriceTierCreateManyInput | Prisma.ProductPriceTierCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductPriceTierCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    data: Prisma.ProductPriceTierCreateManyInput | Prisma.ProductPriceTierCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductPriceTierIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductPriceTierUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelect<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    include?: Prisma.ProductPriceTierInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductPriceTierUpdateInput, Prisma.ProductPriceTierUncheckedUpdateInput>;
    where: Prisma.ProductPriceTierWhereUniqueInput;
};
export type ProductPriceTierUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductPriceTierUpdateManyMutationInput, Prisma.ProductPriceTierUncheckedUpdateManyInput>;
    where?: Prisma.ProductPriceTierWhereInput;
    limit?: number;
};
export type ProductPriceTierUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductPriceTierUpdateManyMutationInput, Prisma.ProductPriceTierUncheckedUpdateManyInput>;
    where?: Prisma.ProductPriceTierWhereInput;
    limit?: number;
    include?: Prisma.ProductPriceTierIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductPriceTierUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelect<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    include?: Prisma.ProductPriceTierInclude<ExtArgs> | null;
    where: Prisma.ProductPriceTierWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductPriceTierCreateInput, Prisma.ProductPriceTierUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductPriceTierUpdateInput, Prisma.ProductPriceTierUncheckedUpdateInput>;
};
export type ProductPriceTierDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelect<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    include?: Prisma.ProductPriceTierInclude<ExtArgs> | null;
    where: Prisma.ProductPriceTierWhereUniqueInput;
};
export type ProductPriceTierDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductPriceTierWhereInput;
    limit?: number;
};
export type ProductPriceTierDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductPriceTierSelect<ExtArgs> | null;
    omit?: Prisma.ProductPriceTierOmit<ExtArgs> | null;
    include?: Prisma.ProductPriceTierInclude<ExtArgs> | null;
};
