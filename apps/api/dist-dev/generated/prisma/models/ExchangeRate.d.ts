import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ExchangeRateModel = runtime.Types.Result.DefaultSelection<Prisma.$ExchangeRatePayload>;
export type AggregateExchangeRate = {
    _count: ExchangeRateCountAggregateOutputType | null;
    _avg: ExchangeRateAvgAggregateOutputType | null;
    _sum: ExchangeRateSumAggregateOutputType | null;
    _min: ExchangeRateMinAggregateOutputType | null;
    _max: ExchangeRateMaxAggregateOutputType | null;
};
export type ExchangeRateAvgAggregateOutputType = {
    unitsPerUsd: runtime.Decimal | null;
};
export type ExchangeRateSumAggregateOutputType = {
    unitsPerUsd: runtime.Decimal | null;
};
export type ExchangeRateMinAggregateOutputType = {
    currency: $Enums.Currency | null;
    unitsPerUsd: runtime.Decimal | null;
    updatedAt: Date | null;
    updatedById: string | null;
};
export type ExchangeRateMaxAggregateOutputType = {
    currency: $Enums.Currency | null;
    unitsPerUsd: runtime.Decimal | null;
    updatedAt: Date | null;
    updatedById: string | null;
};
export type ExchangeRateCountAggregateOutputType = {
    currency: number;
    unitsPerUsd: number;
    updatedAt: number;
    updatedById: number;
    _all: number;
};
export type ExchangeRateAvgAggregateInputType = {
    unitsPerUsd?: true;
};
export type ExchangeRateSumAggregateInputType = {
    unitsPerUsd?: true;
};
export type ExchangeRateMinAggregateInputType = {
    currency?: true;
    unitsPerUsd?: true;
    updatedAt?: true;
    updatedById?: true;
};
export type ExchangeRateMaxAggregateInputType = {
    currency?: true;
    unitsPerUsd?: true;
    updatedAt?: true;
    updatedById?: true;
};
export type ExchangeRateCountAggregateInputType = {
    currency?: true;
    unitsPerUsd?: true;
    updatedAt?: true;
    updatedById?: true;
    _all?: true;
};
export type ExchangeRateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExchangeRateWhereInput;
    orderBy?: Prisma.ExchangeRateOrderByWithRelationInput | Prisma.ExchangeRateOrderByWithRelationInput[];
    cursor?: Prisma.ExchangeRateWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExchangeRateCountAggregateInputType;
    _avg?: ExchangeRateAvgAggregateInputType;
    _sum?: ExchangeRateSumAggregateInputType;
    _min?: ExchangeRateMinAggregateInputType;
    _max?: ExchangeRateMaxAggregateInputType;
};
export type GetExchangeRateAggregateType<T extends ExchangeRateAggregateArgs> = {
    [P in keyof T & keyof AggregateExchangeRate]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExchangeRate[P]> : Prisma.GetScalarType<T[P], AggregateExchangeRate[P]>;
};
export type ExchangeRateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExchangeRateWhereInput;
    orderBy?: Prisma.ExchangeRateOrderByWithAggregationInput | Prisma.ExchangeRateOrderByWithAggregationInput[];
    by: Prisma.ExchangeRateScalarFieldEnum[] | Prisma.ExchangeRateScalarFieldEnum;
    having?: Prisma.ExchangeRateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExchangeRateCountAggregateInputType | true;
    _avg?: ExchangeRateAvgAggregateInputType;
    _sum?: ExchangeRateSumAggregateInputType;
    _min?: ExchangeRateMinAggregateInputType;
    _max?: ExchangeRateMaxAggregateInputType;
};
export type ExchangeRateGroupByOutputType = {
    currency: $Enums.Currency;
    unitsPerUsd: runtime.Decimal;
    updatedAt: Date;
    updatedById: string | null;
    _count: ExchangeRateCountAggregateOutputType | null;
    _avg: ExchangeRateAvgAggregateOutputType | null;
    _sum: ExchangeRateSumAggregateOutputType | null;
    _min: ExchangeRateMinAggregateOutputType | null;
    _max: ExchangeRateMaxAggregateOutputType | null;
};
export type GetExchangeRateGroupByPayload<T extends ExchangeRateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExchangeRateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExchangeRateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExchangeRateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExchangeRateGroupByOutputType[P]>;
}>>;
export type ExchangeRateWhereInput = {
    AND?: Prisma.ExchangeRateWhereInput | Prisma.ExchangeRateWhereInput[];
    OR?: Prisma.ExchangeRateWhereInput[];
    NOT?: Prisma.ExchangeRateWhereInput | Prisma.ExchangeRateWhereInput[];
    currency?: Prisma.EnumCurrencyFilter<"ExchangeRate"> | $Enums.Currency;
    unitsPerUsd?: Prisma.DecimalFilter<"ExchangeRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFilter<"ExchangeRate"> | Date | string;
    updatedById?: Prisma.UuidNullableFilter<"ExchangeRate"> | string | null;
};
export type ExchangeRateOrderByWithRelationInput = {
    currency?: Prisma.SortOrder;
    unitsPerUsd?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type ExchangeRateWhereUniqueInput = Prisma.AtLeast<{
    currency?: $Enums.Currency;
    AND?: Prisma.ExchangeRateWhereInput | Prisma.ExchangeRateWhereInput[];
    OR?: Prisma.ExchangeRateWhereInput[];
    NOT?: Prisma.ExchangeRateWhereInput | Prisma.ExchangeRateWhereInput[];
    unitsPerUsd?: Prisma.DecimalFilter<"ExchangeRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFilter<"ExchangeRate"> | Date | string;
    updatedById?: Prisma.UuidNullableFilter<"ExchangeRate"> | string | null;
}, "currency">;
export type ExchangeRateOrderByWithAggregationInput = {
    currency?: Prisma.SortOrder;
    unitsPerUsd?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ExchangeRateCountOrderByAggregateInput;
    _avg?: Prisma.ExchangeRateAvgOrderByAggregateInput;
    _max?: Prisma.ExchangeRateMaxOrderByAggregateInput;
    _min?: Prisma.ExchangeRateMinOrderByAggregateInput;
    _sum?: Prisma.ExchangeRateSumOrderByAggregateInput;
};
export type ExchangeRateScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExchangeRateScalarWhereWithAggregatesInput | Prisma.ExchangeRateScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExchangeRateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExchangeRateScalarWhereWithAggregatesInput | Prisma.ExchangeRateScalarWhereWithAggregatesInput[];
    currency?: Prisma.EnumCurrencyWithAggregatesFilter<"ExchangeRate"> | $Enums.Currency;
    unitsPerUsd?: Prisma.DecimalWithAggregatesFilter<"ExchangeRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ExchangeRate"> | Date | string;
    updatedById?: Prisma.UuidNullableWithAggregatesFilter<"ExchangeRate"> | string | null;
};
export type ExchangeRateCreateInput = {
    currency: $Enums.Currency;
    unitsPerUsd: runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Date | string;
    updatedById?: string | null;
};
export type ExchangeRateUncheckedCreateInput = {
    currency: $Enums.Currency;
    unitsPerUsd: runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Date | string;
    updatedById?: string | null;
};
export type ExchangeRateUpdateInput = {
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ExchangeRateUncheckedUpdateInput = {
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ExchangeRateCreateManyInput = {
    currency: $Enums.Currency;
    unitsPerUsd: runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Date | string;
    updatedById?: string | null;
};
export type ExchangeRateUpdateManyMutationInput = {
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ExchangeRateUncheckedUpdateManyInput = {
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    unitsPerUsd?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ExchangeRateCountOrderByAggregateInput = {
    currency?: Prisma.SortOrder;
    unitsPerUsd?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
};
export type ExchangeRateAvgOrderByAggregateInput = {
    unitsPerUsd?: Prisma.SortOrder;
};
export type ExchangeRateMaxOrderByAggregateInput = {
    currency?: Prisma.SortOrder;
    unitsPerUsd?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
};
export type ExchangeRateMinOrderByAggregateInput = {
    currency?: Prisma.SortOrder;
    unitsPerUsd?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
};
export type ExchangeRateSumOrderByAggregateInput = {
    unitsPerUsd?: Prisma.SortOrder;
};
export type ExchangeRateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    currency?: boolean;
    unitsPerUsd?: boolean;
    updatedAt?: boolean;
    updatedById?: boolean;
}, ExtArgs["result"]["exchangeRate"]>;
export type ExchangeRateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    currency?: boolean;
    unitsPerUsd?: boolean;
    updatedAt?: boolean;
    updatedById?: boolean;
}, ExtArgs["result"]["exchangeRate"]>;
export type ExchangeRateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    currency?: boolean;
    unitsPerUsd?: boolean;
    updatedAt?: boolean;
    updatedById?: boolean;
}, ExtArgs["result"]["exchangeRate"]>;
export type ExchangeRateSelectScalar = {
    currency?: boolean;
    unitsPerUsd?: boolean;
    updatedAt?: boolean;
    updatedById?: boolean;
};
export type ExchangeRateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"currency" | "unitsPerUsd" | "updatedAt" | "updatedById", ExtArgs["result"]["exchangeRate"]>;
export type $ExchangeRatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ExchangeRate";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        currency: $Enums.Currency;
        unitsPerUsd: runtime.Decimal;
        updatedAt: Date;
        updatedById: string | null;
    }, ExtArgs["result"]["exchangeRate"]>;
    composites: {};
};
export type ExchangeRateGetPayload<S extends boolean | null | undefined | ExchangeRateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload, S>;
export type ExchangeRateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExchangeRateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExchangeRateCountAggregateInputType | true;
};
export interface ExchangeRateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ExchangeRate'];
        meta: {
            name: 'ExchangeRate';
        };
    };
    findUnique<T extends ExchangeRateFindUniqueArgs>(args: Prisma.SelectSubset<T, ExchangeRateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExchangeRateClient<runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExchangeRateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExchangeRateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExchangeRateClient<runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExchangeRateFindFirstArgs>(args?: Prisma.SelectSubset<T, ExchangeRateFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExchangeRateClient<runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExchangeRateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExchangeRateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExchangeRateClient<runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExchangeRateFindManyArgs>(args?: Prisma.SelectSubset<T, ExchangeRateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExchangeRateCreateArgs>(args: Prisma.SelectSubset<T, ExchangeRateCreateArgs<ExtArgs>>): Prisma.Prisma__ExchangeRateClient<runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExchangeRateCreateManyArgs>(args?: Prisma.SelectSubset<T, ExchangeRateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ExchangeRateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExchangeRateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ExchangeRateDeleteArgs>(args: Prisma.SelectSubset<T, ExchangeRateDeleteArgs<ExtArgs>>): Prisma.Prisma__ExchangeRateClient<runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExchangeRateUpdateArgs>(args: Prisma.SelectSubset<T, ExchangeRateUpdateArgs<ExtArgs>>): Prisma.Prisma__ExchangeRateClient<runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExchangeRateDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExchangeRateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExchangeRateUpdateManyArgs>(args: Prisma.SelectSubset<T, ExchangeRateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ExchangeRateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExchangeRateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ExchangeRateUpsertArgs>(args: Prisma.SelectSubset<T, ExchangeRateUpsertArgs<ExtArgs>>): Prisma.Prisma__ExchangeRateClient<runtime.Types.Result.GetResult<Prisma.$ExchangeRatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExchangeRateCountArgs>(args?: Prisma.Subset<T, ExchangeRateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExchangeRateCountAggregateOutputType> : number>;
    aggregate<T extends ExchangeRateAggregateArgs>(args: Prisma.Subset<T, ExchangeRateAggregateArgs>): Prisma.PrismaPromise<GetExchangeRateAggregateType<T>>;
    groupBy<T extends ExchangeRateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExchangeRateGroupByArgs['orderBy'];
    } : {
        orderBy?: ExchangeRateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExchangeRateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExchangeRateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExchangeRateFieldRefs;
}
export interface Prisma__ExchangeRateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExchangeRateFieldRefs {
    readonly currency: Prisma.FieldRef<"ExchangeRate", 'Currency'>;
    readonly unitsPerUsd: Prisma.FieldRef<"ExchangeRate", 'Decimal'>;
    readonly updatedAt: Prisma.FieldRef<"ExchangeRate", 'DateTime'>;
    readonly updatedById: Prisma.FieldRef<"ExchangeRate", 'String'>;
}
export type ExchangeRateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelect<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
    where: Prisma.ExchangeRateWhereUniqueInput;
};
export type ExchangeRateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelect<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
    where: Prisma.ExchangeRateWhereUniqueInput;
};
export type ExchangeRateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelect<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
    where?: Prisma.ExchangeRateWhereInput;
    orderBy?: Prisma.ExchangeRateOrderByWithRelationInput | Prisma.ExchangeRateOrderByWithRelationInput[];
    cursor?: Prisma.ExchangeRateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExchangeRateScalarFieldEnum | Prisma.ExchangeRateScalarFieldEnum[];
};
export type ExchangeRateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelect<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
    where?: Prisma.ExchangeRateWhereInput;
    orderBy?: Prisma.ExchangeRateOrderByWithRelationInput | Prisma.ExchangeRateOrderByWithRelationInput[];
    cursor?: Prisma.ExchangeRateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExchangeRateScalarFieldEnum | Prisma.ExchangeRateScalarFieldEnum[];
};
export type ExchangeRateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelect<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
    where?: Prisma.ExchangeRateWhereInput;
    orderBy?: Prisma.ExchangeRateOrderByWithRelationInput | Prisma.ExchangeRateOrderByWithRelationInput[];
    cursor?: Prisma.ExchangeRateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExchangeRateScalarFieldEnum | Prisma.ExchangeRateScalarFieldEnum[];
};
export type ExchangeRateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelect<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExchangeRateCreateInput, Prisma.ExchangeRateUncheckedCreateInput>;
};
export type ExchangeRateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExchangeRateCreateManyInput | Prisma.ExchangeRateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExchangeRateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
    data: Prisma.ExchangeRateCreateManyInput | Prisma.ExchangeRateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExchangeRateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelect<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExchangeRateUpdateInput, Prisma.ExchangeRateUncheckedUpdateInput>;
    where: Prisma.ExchangeRateWhereUniqueInput;
};
export type ExchangeRateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExchangeRateUpdateManyMutationInput, Prisma.ExchangeRateUncheckedUpdateManyInput>;
    where?: Prisma.ExchangeRateWhereInput;
    limit?: number;
};
export type ExchangeRateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExchangeRateUpdateManyMutationInput, Prisma.ExchangeRateUncheckedUpdateManyInput>;
    where?: Prisma.ExchangeRateWhereInput;
    limit?: number;
};
export type ExchangeRateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelect<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
    where: Prisma.ExchangeRateWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExchangeRateCreateInput, Prisma.ExchangeRateUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExchangeRateUpdateInput, Prisma.ExchangeRateUncheckedUpdateInput>;
};
export type ExchangeRateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelect<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
    where: Prisma.ExchangeRateWhereUniqueInput;
};
export type ExchangeRateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExchangeRateWhereInput;
    limit?: number;
};
export type ExchangeRateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExchangeRateSelect<ExtArgs> | null;
    omit?: Prisma.ExchangeRateOmit<ExtArgs> | null;
};
