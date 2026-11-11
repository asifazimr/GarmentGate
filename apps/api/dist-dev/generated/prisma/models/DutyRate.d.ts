import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DutyRateModel = runtime.Types.Result.DefaultSelection<Prisma.$DutyRatePayload>;
export type AggregateDutyRate = {
    _count: DutyRateCountAggregateOutputType | null;
    _avg: DutyRateAvgAggregateOutputType | null;
    _sum: DutyRateSumAggregateOutputType | null;
    _min: DutyRateMinAggregateOutputType | null;
    _max: DutyRateMaxAggregateOutputType | null;
};
export type DutyRateAvgAggregateOutputType = {
    rateBps: number | null;
};
export type DutyRateSumAggregateOutputType = {
    rateBps: number | null;
};
export type DutyRateMinAggregateOutputType = {
    id: string | null;
    hsPrefix: string | null;
    destinationCountry: string | null;
    rateBps: number | null;
    note: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DutyRateMaxAggregateOutputType = {
    id: string | null;
    hsPrefix: string | null;
    destinationCountry: string | null;
    rateBps: number | null;
    note: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DutyRateCountAggregateOutputType = {
    id: number;
    hsPrefix: number;
    destinationCountry: number;
    rateBps: number;
    note: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DutyRateAvgAggregateInputType = {
    rateBps?: true;
};
export type DutyRateSumAggregateInputType = {
    rateBps?: true;
};
export type DutyRateMinAggregateInputType = {
    id?: true;
    hsPrefix?: true;
    destinationCountry?: true;
    rateBps?: true;
    note?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DutyRateMaxAggregateInputType = {
    id?: true;
    hsPrefix?: true;
    destinationCountry?: true;
    rateBps?: true;
    note?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DutyRateCountAggregateInputType = {
    id?: true;
    hsPrefix?: true;
    destinationCountry?: true;
    rateBps?: true;
    note?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DutyRateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DutyRateWhereInput;
    orderBy?: Prisma.DutyRateOrderByWithRelationInput | Prisma.DutyRateOrderByWithRelationInput[];
    cursor?: Prisma.DutyRateWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DutyRateCountAggregateInputType;
    _avg?: DutyRateAvgAggregateInputType;
    _sum?: DutyRateSumAggregateInputType;
    _min?: DutyRateMinAggregateInputType;
    _max?: DutyRateMaxAggregateInputType;
};
export type GetDutyRateAggregateType<T extends DutyRateAggregateArgs> = {
    [P in keyof T & keyof AggregateDutyRate]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDutyRate[P]> : Prisma.GetScalarType<T[P], AggregateDutyRate[P]>;
};
export type DutyRateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DutyRateWhereInput;
    orderBy?: Prisma.DutyRateOrderByWithAggregationInput | Prisma.DutyRateOrderByWithAggregationInput[];
    by: Prisma.DutyRateScalarFieldEnum[] | Prisma.DutyRateScalarFieldEnum;
    having?: Prisma.DutyRateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DutyRateCountAggregateInputType | true;
    _avg?: DutyRateAvgAggregateInputType;
    _sum?: DutyRateSumAggregateInputType;
    _min?: DutyRateMinAggregateInputType;
    _max?: DutyRateMaxAggregateInputType;
};
export type DutyRateGroupByOutputType = {
    id: string;
    hsPrefix: string;
    destinationCountry: string;
    rateBps: number;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: DutyRateCountAggregateOutputType | null;
    _avg: DutyRateAvgAggregateOutputType | null;
    _sum: DutyRateSumAggregateOutputType | null;
    _min: DutyRateMinAggregateOutputType | null;
    _max: DutyRateMaxAggregateOutputType | null;
};
export type GetDutyRateGroupByPayload<T extends DutyRateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DutyRateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DutyRateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DutyRateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DutyRateGroupByOutputType[P]>;
}>>;
export type DutyRateWhereInput = {
    AND?: Prisma.DutyRateWhereInput | Prisma.DutyRateWhereInput[];
    OR?: Prisma.DutyRateWhereInput[];
    NOT?: Prisma.DutyRateWhereInput | Prisma.DutyRateWhereInput[];
    id?: Prisma.UuidFilter<"DutyRate"> | string;
    hsPrefix?: Prisma.StringFilter<"DutyRate"> | string;
    destinationCountry?: Prisma.StringFilter<"DutyRate"> | string;
    rateBps?: Prisma.IntFilter<"DutyRate"> | number;
    note?: Prisma.StringNullableFilter<"DutyRate"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DutyRate"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DutyRate"> | Date | string;
};
export type DutyRateOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    hsPrefix?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    rateBps?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DutyRateWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    hsPrefix_destinationCountry?: Prisma.DutyRateHsPrefixDestinationCountryCompoundUniqueInput;
    AND?: Prisma.DutyRateWhereInput | Prisma.DutyRateWhereInput[];
    OR?: Prisma.DutyRateWhereInput[];
    NOT?: Prisma.DutyRateWhereInput | Prisma.DutyRateWhereInput[];
    hsPrefix?: Prisma.StringFilter<"DutyRate"> | string;
    destinationCountry?: Prisma.StringFilter<"DutyRate"> | string;
    rateBps?: Prisma.IntFilter<"DutyRate"> | number;
    note?: Prisma.StringNullableFilter<"DutyRate"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DutyRate"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DutyRate"> | Date | string;
}, "id" | "hsPrefix_destinationCountry">;
export type DutyRateOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    hsPrefix?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    rateBps?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DutyRateCountOrderByAggregateInput;
    _avg?: Prisma.DutyRateAvgOrderByAggregateInput;
    _max?: Prisma.DutyRateMaxOrderByAggregateInput;
    _min?: Prisma.DutyRateMinOrderByAggregateInput;
    _sum?: Prisma.DutyRateSumOrderByAggregateInput;
};
export type DutyRateScalarWhereWithAggregatesInput = {
    AND?: Prisma.DutyRateScalarWhereWithAggregatesInput | Prisma.DutyRateScalarWhereWithAggregatesInput[];
    OR?: Prisma.DutyRateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DutyRateScalarWhereWithAggregatesInput | Prisma.DutyRateScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"DutyRate"> | string;
    hsPrefix?: Prisma.StringWithAggregatesFilter<"DutyRate"> | string;
    destinationCountry?: Prisma.StringWithAggregatesFilter<"DutyRate"> | string;
    rateBps?: Prisma.IntWithAggregatesFilter<"DutyRate"> | number;
    note?: Prisma.StringNullableWithAggregatesFilter<"DutyRate"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DutyRate"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DutyRate"> | Date | string;
};
export type DutyRateCreateInput = {
    id?: string;
    hsPrefix: string;
    destinationCountry: string;
    rateBps: number;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DutyRateUncheckedCreateInput = {
    id?: string;
    hsPrefix: string;
    destinationCountry: string;
    rateBps: number;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DutyRateUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hsPrefix?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    rateBps?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DutyRateUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hsPrefix?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    rateBps?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DutyRateCreateManyInput = {
    id?: string;
    hsPrefix: string;
    destinationCountry: string;
    rateBps: number;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DutyRateUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hsPrefix?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    rateBps?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DutyRateUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hsPrefix?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    rateBps?: Prisma.IntFieldUpdateOperationsInput | number;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DutyRateHsPrefixDestinationCountryCompoundUniqueInput = {
    hsPrefix: string;
    destinationCountry: string;
};
export type DutyRateCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hsPrefix?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    rateBps?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DutyRateAvgOrderByAggregateInput = {
    rateBps?: Prisma.SortOrder;
};
export type DutyRateMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hsPrefix?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    rateBps?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DutyRateMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hsPrefix?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    rateBps?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DutyRateSumOrderByAggregateInput = {
    rateBps?: Prisma.SortOrder;
};
export type DutyRateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hsPrefix?: boolean;
    destinationCountry?: boolean;
    rateBps?: boolean;
    note?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["dutyRate"]>;
export type DutyRateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hsPrefix?: boolean;
    destinationCountry?: boolean;
    rateBps?: boolean;
    note?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["dutyRate"]>;
export type DutyRateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hsPrefix?: boolean;
    destinationCountry?: boolean;
    rateBps?: boolean;
    note?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["dutyRate"]>;
export type DutyRateSelectScalar = {
    id?: boolean;
    hsPrefix?: boolean;
    destinationCountry?: boolean;
    rateBps?: boolean;
    note?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DutyRateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hsPrefix" | "destinationCountry" | "rateBps" | "note" | "createdAt" | "updatedAt", ExtArgs["result"]["dutyRate"]>;
export type $DutyRatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DutyRate";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        hsPrefix: string;
        destinationCountry: string;
        rateBps: number;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["dutyRate"]>;
    composites: {};
};
export type DutyRateGetPayload<S extends boolean | null | undefined | DutyRateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DutyRatePayload, S>;
export type DutyRateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DutyRateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DutyRateCountAggregateInputType | true;
};
export interface DutyRateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DutyRate'];
        meta: {
            name: 'DutyRate';
        };
    };
    findUnique<T extends DutyRateFindUniqueArgs>(args: Prisma.SelectSubset<T, DutyRateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DutyRateClient<runtime.Types.Result.GetResult<Prisma.$DutyRatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DutyRateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DutyRateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DutyRateClient<runtime.Types.Result.GetResult<Prisma.$DutyRatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DutyRateFindFirstArgs>(args?: Prisma.SelectSubset<T, DutyRateFindFirstArgs<ExtArgs>>): Prisma.Prisma__DutyRateClient<runtime.Types.Result.GetResult<Prisma.$DutyRatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DutyRateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DutyRateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DutyRateClient<runtime.Types.Result.GetResult<Prisma.$DutyRatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DutyRateFindManyArgs>(args?: Prisma.SelectSubset<T, DutyRateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DutyRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DutyRateCreateArgs>(args: Prisma.SelectSubset<T, DutyRateCreateArgs<ExtArgs>>): Prisma.Prisma__DutyRateClient<runtime.Types.Result.GetResult<Prisma.$DutyRatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DutyRateCreateManyArgs>(args?: Prisma.SelectSubset<T, DutyRateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DutyRateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DutyRateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DutyRatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DutyRateDeleteArgs>(args: Prisma.SelectSubset<T, DutyRateDeleteArgs<ExtArgs>>): Prisma.Prisma__DutyRateClient<runtime.Types.Result.GetResult<Prisma.$DutyRatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DutyRateUpdateArgs>(args: Prisma.SelectSubset<T, DutyRateUpdateArgs<ExtArgs>>): Prisma.Prisma__DutyRateClient<runtime.Types.Result.GetResult<Prisma.$DutyRatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DutyRateDeleteManyArgs>(args?: Prisma.SelectSubset<T, DutyRateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DutyRateUpdateManyArgs>(args: Prisma.SelectSubset<T, DutyRateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DutyRateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DutyRateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DutyRatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DutyRateUpsertArgs>(args: Prisma.SelectSubset<T, DutyRateUpsertArgs<ExtArgs>>): Prisma.Prisma__DutyRateClient<runtime.Types.Result.GetResult<Prisma.$DutyRatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DutyRateCountArgs>(args?: Prisma.Subset<T, DutyRateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DutyRateCountAggregateOutputType> : number>;
    aggregate<T extends DutyRateAggregateArgs>(args: Prisma.Subset<T, DutyRateAggregateArgs>): Prisma.PrismaPromise<GetDutyRateAggregateType<T>>;
    groupBy<T extends DutyRateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DutyRateGroupByArgs['orderBy'];
    } : {
        orderBy?: DutyRateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DutyRateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDutyRateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DutyRateFieldRefs;
}
export interface Prisma__DutyRateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DutyRateFieldRefs {
    readonly id: Prisma.FieldRef<"DutyRate", 'String'>;
    readonly hsPrefix: Prisma.FieldRef<"DutyRate", 'String'>;
    readonly destinationCountry: Prisma.FieldRef<"DutyRate", 'String'>;
    readonly rateBps: Prisma.FieldRef<"DutyRate", 'Int'>;
    readonly note: Prisma.FieldRef<"DutyRate", 'String'>;
    readonly createdAt: Prisma.FieldRef<"DutyRate", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DutyRate", 'DateTime'>;
}
export type DutyRateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelect<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
    where: Prisma.DutyRateWhereUniqueInput;
};
export type DutyRateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelect<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
    where: Prisma.DutyRateWhereUniqueInput;
};
export type DutyRateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelect<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
    where?: Prisma.DutyRateWhereInput;
    orderBy?: Prisma.DutyRateOrderByWithRelationInput | Prisma.DutyRateOrderByWithRelationInput[];
    cursor?: Prisma.DutyRateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DutyRateScalarFieldEnum | Prisma.DutyRateScalarFieldEnum[];
};
export type DutyRateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelect<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
    where?: Prisma.DutyRateWhereInput;
    orderBy?: Prisma.DutyRateOrderByWithRelationInput | Prisma.DutyRateOrderByWithRelationInput[];
    cursor?: Prisma.DutyRateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DutyRateScalarFieldEnum | Prisma.DutyRateScalarFieldEnum[];
};
export type DutyRateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelect<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
    where?: Prisma.DutyRateWhereInput;
    orderBy?: Prisma.DutyRateOrderByWithRelationInput | Prisma.DutyRateOrderByWithRelationInput[];
    cursor?: Prisma.DutyRateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DutyRateScalarFieldEnum | Prisma.DutyRateScalarFieldEnum[];
};
export type DutyRateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelect<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DutyRateCreateInput, Prisma.DutyRateUncheckedCreateInput>;
};
export type DutyRateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DutyRateCreateManyInput | Prisma.DutyRateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DutyRateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
    data: Prisma.DutyRateCreateManyInput | Prisma.DutyRateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DutyRateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelect<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DutyRateUpdateInput, Prisma.DutyRateUncheckedUpdateInput>;
    where: Prisma.DutyRateWhereUniqueInput;
};
export type DutyRateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DutyRateUpdateManyMutationInput, Prisma.DutyRateUncheckedUpdateManyInput>;
    where?: Prisma.DutyRateWhereInput;
    limit?: number;
};
export type DutyRateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DutyRateUpdateManyMutationInput, Prisma.DutyRateUncheckedUpdateManyInput>;
    where?: Prisma.DutyRateWhereInput;
    limit?: number;
};
export type DutyRateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelect<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
    where: Prisma.DutyRateWhereUniqueInput;
    create: Prisma.XOR<Prisma.DutyRateCreateInput, Prisma.DutyRateUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DutyRateUpdateInput, Prisma.DutyRateUncheckedUpdateInput>;
};
export type DutyRateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelect<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
    where: Prisma.DutyRateWhereUniqueInput;
};
export type DutyRateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DutyRateWhereInput;
    limit?: number;
};
export type DutyRateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DutyRateSelect<ExtArgs> | null;
    omit?: Prisma.DutyRateOmit<ExtArgs> | null;
};
