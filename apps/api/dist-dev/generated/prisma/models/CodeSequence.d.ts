import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CodeSequenceModel = runtime.Types.Result.DefaultSelection<Prisma.$CodeSequencePayload>;
export type AggregateCodeSequence = {
    _count: CodeSequenceCountAggregateOutputType | null;
    _avg: CodeSequenceAvgAggregateOutputType | null;
    _sum: CodeSequenceSumAggregateOutputType | null;
    _min: CodeSequenceMinAggregateOutputType | null;
    _max: CodeSequenceMaxAggregateOutputType | null;
};
export type CodeSequenceAvgAggregateOutputType = {
    lastValue: number | null;
};
export type CodeSequenceSumAggregateOutputType = {
    lastValue: number | null;
};
export type CodeSequenceMinAggregateOutputType = {
    prefix: string | null;
    lastValue: number | null;
};
export type CodeSequenceMaxAggregateOutputType = {
    prefix: string | null;
    lastValue: number | null;
};
export type CodeSequenceCountAggregateOutputType = {
    prefix: number;
    lastValue: number;
    _all: number;
};
export type CodeSequenceAvgAggregateInputType = {
    lastValue?: true;
};
export type CodeSequenceSumAggregateInputType = {
    lastValue?: true;
};
export type CodeSequenceMinAggregateInputType = {
    prefix?: true;
    lastValue?: true;
};
export type CodeSequenceMaxAggregateInputType = {
    prefix?: true;
    lastValue?: true;
};
export type CodeSequenceCountAggregateInputType = {
    prefix?: true;
    lastValue?: true;
    _all?: true;
};
export type CodeSequenceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CodeSequenceWhereInput;
    orderBy?: Prisma.CodeSequenceOrderByWithRelationInput | Prisma.CodeSequenceOrderByWithRelationInput[];
    cursor?: Prisma.CodeSequenceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CodeSequenceCountAggregateInputType;
    _avg?: CodeSequenceAvgAggregateInputType;
    _sum?: CodeSequenceSumAggregateInputType;
    _min?: CodeSequenceMinAggregateInputType;
    _max?: CodeSequenceMaxAggregateInputType;
};
export type GetCodeSequenceAggregateType<T extends CodeSequenceAggregateArgs> = {
    [P in keyof T & keyof AggregateCodeSequence]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCodeSequence[P]> : Prisma.GetScalarType<T[P], AggregateCodeSequence[P]>;
};
export type CodeSequenceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CodeSequenceWhereInput;
    orderBy?: Prisma.CodeSequenceOrderByWithAggregationInput | Prisma.CodeSequenceOrderByWithAggregationInput[];
    by: Prisma.CodeSequenceScalarFieldEnum[] | Prisma.CodeSequenceScalarFieldEnum;
    having?: Prisma.CodeSequenceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CodeSequenceCountAggregateInputType | true;
    _avg?: CodeSequenceAvgAggregateInputType;
    _sum?: CodeSequenceSumAggregateInputType;
    _min?: CodeSequenceMinAggregateInputType;
    _max?: CodeSequenceMaxAggregateInputType;
};
export type CodeSequenceGroupByOutputType = {
    prefix: string;
    lastValue: number;
    _count: CodeSequenceCountAggregateOutputType | null;
    _avg: CodeSequenceAvgAggregateOutputType | null;
    _sum: CodeSequenceSumAggregateOutputType | null;
    _min: CodeSequenceMinAggregateOutputType | null;
    _max: CodeSequenceMaxAggregateOutputType | null;
};
export type GetCodeSequenceGroupByPayload<T extends CodeSequenceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CodeSequenceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CodeSequenceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CodeSequenceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CodeSequenceGroupByOutputType[P]>;
}>>;
export type CodeSequenceWhereInput = {
    AND?: Prisma.CodeSequenceWhereInput | Prisma.CodeSequenceWhereInput[];
    OR?: Prisma.CodeSequenceWhereInput[];
    NOT?: Prisma.CodeSequenceWhereInput | Prisma.CodeSequenceWhereInput[];
    prefix?: Prisma.StringFilter<"CodeSequence"> | string;
    lastValue?: Prisma.IntFilter<"CodeSequence"> | number;
};
export type CodeSequenceOrderByWithRelationInput = {
    prefix?: Prisma.SortOrder;
    lastValue?: Prisma.SortOrder;
};
export type CodeSequenceWhereUniqueInput = Prisma.AtLeast<{
    prefix?: string;
    AND?: Prisma.CodeSequenceWhereInput | Prisma.CodeSequenceWhereInput[];
    OR?: Prisma.CodeSequenceWhereInput[];
    NOT?: Prisma.CodeSequenceWhereInput | Prisma.CodeSequenceWhereInput[];
    lastValue?: Prisma.IntFilter<"CodeSequence"> | number;
}, "prefix">;
export type CodeSequenceOrderByWithAggregationInput = {
    prefix?: Prisma.SortOrder;
    lastValue?: Prisma.SortOrder;
    _count?: Prisma.CodeSequenceCountOrderByAggregateInput;
    _avg?: Prisma.CodeSequenceAvgOrderByAggregateInput;
    _max?: Prisma.CodeSequenceMaxOrderByAggregateInput;
    _min?: Prisma.CodeSequenceMinOrderByAggregateInput;
    _sum?: Prisma.CodeSequenceSumOrderByAggregateInput;
};
export type CodeSequenceScalarWhereWithAggregatesInput = {
    AND?: Prisma.CodeSequenceScalarWhereWithAggregatesInput | Prisma.CodeSequenceScalarWhereWithAggregatesInput[];
    OR?: Prisma.CodeSequenceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CodeSequenceScalarWhereWithAggregatesInput | Prisma.CodeSequenceScalarWhereWithAggregatesInput[];
    prefix?: Prisma.StringWithAggregatesFilter<"CodeSequence"> | string;
    lastValue?: Prisma.IntWithAggregatesFilter<"CodeSequence"> | number;
};
export type CodeSequenceCreateInput = {
    prefix: string;
    lastValue?: number;
};
export type CodeSequenceUncheckedCreateInput = {
    prefix: string;
    lastValue?: number;
};
export type CodeSequenceUpdateInput = {
    prefix?: Prisma.StringFieldUpdateOperationsInput | string;
    lastValue?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CodeSequenceUncheckedUpdateInput = {
    prefix?: Prisma.StringFieldUpdateOperationsInput | string;
    lastValue?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CodeSequenceCreateManyInput = {
    prefix: string;
    lastValue?: number;
};
export type CodeSequenceUpdateManyMutationInput = {
    prefix?: Prisma.StringFieldUpdateOperationsInput | string;
    lastValue?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CodeSequenceUncheckedUpdateManyInput = {
    prefix?: Prisma.StringFieldUpdateOperationsInput | string;
    lastValue?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CodeSequenceCountOrderByAggregateInput = {
    prefix?: Prisma.SortOrder;
    lastValue?: Prisma.SortOrder;
};
export type CodeSequenceAvgOrderByAggregateInput = {
    lastValue?: Prisma.SortOrder;
};
export type CodeSequenceMaxOrderByAggregateInput = {
    prefix?: Prisma.SortOrder;
    lastValue?: Prisma.SortOrder;
};
export type CodeSequenceMinOrderByAggregateInput = {
    prefix?: Prisma.SortOrder;
    lastValue?: Prisma.SortOrder;
};
export type CodeSequenceSumOrderByAggregateInput = {
    lastValue?: Prisma.SortOrder;
};
export type CodeSequenceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    prefix?: boolean;
    lastValue?: boolean;
}, ExtArgs["result"]["codeSequence"]>;
export type CodeSequenceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    prefix?: boolean;
    lastValue?: boolean;
}, ExtArgs["result"]["codeSequence"]>;
export type CodeSequenceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    prefix?: boolean;
    lastValue?: boolean;
}, ExtArgs["result"]["codeSequence"]>;
export type CodeSequenceSelectScalar = {
    prefix?: boolean;
    lastValue?: boolean;
};
export type CodeSequenceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"prefix" | "lastValue", ExtArgs["result"]["codeSequence"]>;
export type $CodeSequencePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CodeSequence";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        prefix: string;
        lastValue: number;
    }, ExtArgs["result"]["codeSequence"]>;
    composites: {};
};
export type CodeSequenceGetPayload<S extends boolean | null | undefined | CodeSequenceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload, S>;
export type CodeSequenceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CodeSequenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CodeSequenceCountAggregateInputType | true;
};
export interface CodeSequenceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CodeSequence'];
        meta: {
            name: 'CodeSequence';
        };
    };
    findUnique<T extends CodeSequenceFindUniqueArgs>(args: Prisma.SelectSubset<T, CodeSequenceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CodeSequenceClient<runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CodeSequenceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CodeSequenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CodeSequenceClient<runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CodeSequenceFindFirstArgs>(args?: Prisma.SelectSubset<T, CodeSequenceFindFirstArgs<ExtArgs>>): Prisma.Prisma__CodeSequenceClient<runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CodeSequenceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CodeSequenceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CodeSequenceClient<runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CodeSequenceFindManyArgs>(args?: Prisma.SelectSubset<T, CodeSequenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CodeSequenceCreateArgs>(args: Prisma.SelectSubset<T, CodeSequenceCreateArgs<ExtArgs>>): Prisma.Prisma__CodeSequenceClient<runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CodeSequenceCreateManyArgs>(args?: Prisma.SelectSubset<T, CodeSequenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CodeSequenceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CodeSequenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CodeSequenceDeleteArgs>(args: Prisma.SelectSubset<T, CodeSequenceDeleteArgs<ExtArgs>>): Prisma.Prisma__CodeSequenceClient<runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CodeSequenceUpdateArgs>(args: Prisma.SelectSubset<T, CodeSequenceUpdateArgs<ExtArgs>>): Prisma.Prisma__CodeSequenceClient<runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CodeSequenceDeleteManyArgs>(args?: Prisma.SelectSubset<T, CodeSequenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CodeSequenceUpdateManyArgs>(args: Prisma.SelectSubset<T, CodeSequenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CodeSequenceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CodeSequenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CodeSequenceUpsertArgs>(args: Prisma.SelectSubset<T, CodeSequenceUpsertArgs<ExtArgs>>): Prisma.Prisma__CodeSequenceClient<runtime.Types.Result.GetResult<Prisma.$CodeSequencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CodeSequenceCountArgs>(args?: Prisma.Subset<T, CodeSequenceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CodeSequenceCountAggregateOutputType> : number>;
    aggregate<T extends CodeSequenceAggregateArgs>(args: Prisma.Subset<T, CodeSequenceAggregateArgs>): Prisma.PrismaPromise<GetCodeSequenceAggregateType<T>>;
    groupBy<T extends CodeSequenceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CodeSequenceGroupByArgs['orderBy'];
    } : {
        orderBy?: CodeSequenceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CodeSequenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCodeSequenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CodeSequenceFieldRefs;
}
export interface Prisma__CodeSequenceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CodeSequenceFieldRefs {
    readonly prefix: Prisma.FieldRef<"CodeSequence", 'String'>;
    readonly lastValue: Prisma.FieldRef<"CodeSequence", 'Int'>;
}
export type CodeSequenceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelect<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
    where: Prisma.CodeSequenceWhereUniqueInput;
};
export type CodeSequenceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelect<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
    where: Prisma.CodeSequenceWhereUniqueInput;
};
export type CodeSequenceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelect<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
    where?: Prisma.CodeSequenceWhereInput;
    orderBy?: Prisma.CodeSequenceOrderByWithRelationInput | Prisma.CodeSequenceOrderByWithRelationInput[];
    cursor?: Prisma.CodeSequenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CodeSequenceScalarFieldEnum | Prisma.CodeSequenceScalarFieldEnum[];
};
export type CodeSequenceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelect<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
    where?: Prisma.CodeSequenceWhereInput;
    orderBy?: Prisma.CodeSequenceOrderByWithRelationInput | Prisma.CodeSequenceOrderByWithRelationInput[];
    cursor?: Prisma.CodeSequenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CodeSequenceScalarFieldEnum | Prisma.CodeSequenceScalarFieldEnum[];
};
export type CodeSequenceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelect<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
    where?: Prisma.CodeSequenceWhereInput;
    orderBy?: Prisma.CodeSequenceOrderByWithRelationInput | Prisma.CodeSequenceOrderByWithRelationInput[];
    cursor?: Prisma.CodeSequenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CodeSequenceScalarFieldEnum | Prisma.CodeSequenceScalarFieldEnum[];
};
export type CodeSequenceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelect<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CodeSequenceCreateInput, Prisma.CodeSequenceUncheckedCreateInput>;
};
export type CodeSequenceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CodeSequenceCreateManyInput | Prisma.CodeSequenceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CodeSequenceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
    data: Prisma.CodeSequenceCreateManyInput | Prisma.CodeSequenceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CodeSequenceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelect<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CodeSequenceUpdateInput, Prisma.CodeSequenceUncheckedUpdateInput>;
    where: Prisma.CodeSequenceWhereUniqueInput;
};
export type CodeSequenceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CodeSequenceUpdateManyMutationInput, Prisma.CodeSequenceUncheckedUpdateManyInput>;
    where?: Prisma.CodeSequenceWhereInput;
    limit?: number;
};
export type CodeSequenceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CodeSequenceUpdateManyMutationInput, Prisma.CodeSequenceUncheckedUpdateManyInput>;
    where?: Prisma.CodeSequenceWhereInput;
    limit?: number;
};
export type CodeSequenceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelect<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
    where: Prisma.CodeSequenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.CodeSequenceCreateInput, Prisma.CodeSequenceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CodeSequenceUpdateInput, Prisma.CodeSequenceUncheckedUpdateInput>;
};
export type CodeSequenceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelect<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
    where: Prisma.CodeSequenceWhereUniqueInput;
};
export type CodeSequenceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CodeSequenceWhereInput;
    limit?: number;
};
export type CodeSequenceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CodeSequenceSelect<ExtArgs> | null;
    omit?: Prisma.CodeSequenceOmit<ExtArgs> | null;
};
