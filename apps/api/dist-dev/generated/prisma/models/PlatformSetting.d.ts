import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PlatformSettingModel = runtime.Types.Result.DefaultSelection<Prisma.$PlatformSettingPayload>;
export type AggregatePlatformSetting = {
    _count: PlatformSettingCountAggregateOutputType | null;
    _min: PlatformSettingMinAggregateOutputType | null;
    _max: PlatformSettingMaxAggregateOutputType | null;
};
export type PlatformSettingMinAggregateOutputType = {
    key: string | null;
    updatedAt: Date | null;
};
export type PlatformSettingMaxAggregateOutputType = {
    key: string | null;
    updatedAt: Date | null;
};
export type PlatformSettingCountAggregateOutputType = {
    key: number;
    value: number;
    updatedAt: number;
    _all: number;
};
export type PlatformSettingMinAggregateInputType = {
    key?: true;
    updatedAt?: true;
};
export type PlatformSettingMaxAggregateInputType = {
    key?: true;
    updatedAt?: true;
};
export type PlatformSettingCountAggregateInputType = {
    key?: true;
    value?: true;
    updatedAt?: true;
    _all?: true;
};
export type PlatformSettingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlatformSettingWhereInput;
    orderBy?: Prisma.PlatformSettingOrderByWithRelationInput | Prisma.PlatformSettingOrderByWithRelationInput[];
    cursor?: Prisma.PlatformSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PlatformSettingCountAggregateInputType;
    _min?: PlatformSettingMinAggregateInputType;
    _max?: PlatformSettingMaxAggregateInputType;
};
export type GetPlatformSettingAggregateType<T extends PlatformSettingAggregateArgs> = {
    [P in keyof T & keyof AggregatePlatformSetting]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePlatformSetting[P]> : Prisma.GetScalarType<T[P], AggregatePlatformSetting[P]>;
};
export type PlatformSettingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlatformSettingWhereInput;
    orderBy?: Prisma.PlatformSettingOrderByWithAggregationInput | Prisma.PlatformSettingOrderByWithAggregationInput[];
    by: Prisma.PlatformSettingScalarFieldEnum[] | Prisma.PlatformSettingScalarFieldEnum;
    having?: Prisma.PlatformSettingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PlatformSettingCountAggregateInputType | true;
    _min?: PlatformSettingMinAggregateInputType;
    _max?: PlatformSettingMaxAggregateInputType;
};
export type PlatformSettingGroupByOutputType = {
    key: string;
    value: runtime.JsonValue;
    updatedAt: Date;
    _count: PlatformSettingCountAggregateOutputType | null;
    _min: PlatformSettingMinAggregateOutputType | null;
    _max: PlatformSettingMaxAggregateOutputType | null;
};
export type GetPlatformSettingGroupByPayload<T extends PlatformSettingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PlatformSettingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PlatformSettingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PlatformSettingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PlatformSettingGroupByOutputType[P]>;
}>>;
export type PlatformSettingWhereInput = {
    AND?: Prisma.PlatformSettingWhereInput | Prisma.PlatformSettingWhereInput[];
    OR?: Prisma.PlatformSettingWhereInput[];
    NOT?: Prisma.PlatformSettingWhereInput | Prisma.PlatformSettingWhereInput[];
    key?: Prisma.StringFilter<"PlatformSetting"> | string;
    value?: Prisma.JsonFilter<"PlatformSetting">;
    updatedAt?: Prisma.DateTimeFilter<"PlatformSetting"> | Date | string;
};
export type PlatformSettingOrderByWithRelationInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlatformSettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string;
    AND?: Prisma.PlatformSettingWhereInput | Prisma.PlatformSettingWhereInput[];
    OR?: Prisma.PlatformSettingWhereInput[];
    NOT?: Prisma.PlatformSettingWhereInput | Prisma.PlatformSettingWhereInput[];
    value?: Prisma.JsonFilter<"PlatformSetting">;
    updatedAt?: Prisma.DateTimeFilter<"PlatformSetting"> | Date | string;
}, "key">;
export type PlatformSettingOrderByWithAggregationInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PlatformSettingCountOrderByAggregateInput;
    _max?: Prisma.PlatformSettingMaxOrderByAggregateInput;
    _min?: Prisma.PlatformSettingMinOrderByAggregateInput;
};
export type PlatformSettingScalarWhereWithAggregatesInput = {
    AND?: Prisma.PlatformSettingScalarWhereWithAggregatesInput | Prisma.PlatformSettingScalarWhereWithAggregatesInput[];
    OR?: Prisma.PlatformSettingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PlatformSettingScalarWhereWithAggregatesInput | Prisma.PlatformSettingScalarWhereWithAggregatesInput[];
    key?: Prisma.StringWithAggregatesFilter<"PlatformSetting"> | string;
    value?: Prisma.JsonWithAggregatesFilter<"PlatformSetting">;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PlatformSetting"> | Date | string;
};
export type PlatformSettingCreateInput = {
    key: string;
    value: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Date | string;
};
export type PlatformSettingUncheckedCreateInput = {
    key: string;
    value: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Date | string;
};
export type PlatformSettingUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlatformSettingUncheckedUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlatformSettingCreateManyInput = {
    key: string;
    value: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Date | string;
};
export type PlatformSettingUpdateManyMutationInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlatformSettingUncheckedUpdateManyInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlatformSettingCountOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlatformSettingMaxOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlatformSettingMinOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlatformSettingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["platformSetting"]>;
export type PlatformSettingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["platformSetting"]>;
export type PlatformSettingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["platformSetting"]>;
export type PlatformSettingSelectScalar = {
    key?: boolean;
    value?: boolean;
    updatedAt?: boolean;
};
export type PlatformSettingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"key" | "value" | "updatedAt", ExtArgs["result"]["platformSetting"]>;
export type $PlatformSettingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PlatformSetting";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        key: string;
        value: runtime.JsonValue;
        updatedAt: Date;
    }, ExtArgs["result"]["platformSetting"]>;
    composites: {};
};
export type PlatformSettingGetPayload<S extends boolean | null | undefined | PlatformSettingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload, S>;
export type PlatformSettingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PlatformSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PlatformSettingCountAggregateInputType | true;
};
export interface PlatformSettingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PlatformSetting'];
        meta: {
            name: 'PlatformSetting';
        };
    };
    findUnique<T extends PlatformSettingFindUniqueArgs>(args: Prisma.SelectSubset<T, PlatformSettingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PlatformSettingClient<runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PlatformSettingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PlatformSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlatformSettingClient<runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PlatformSettingFindFirstArgs>(args?: Prisma.SelectSubset<T, PlatformSettingFindFirstArgs<ExtArgs>>): Prisma.Prisma__PlatformSettingClient<runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PlatformSettingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PlatformSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlatformSettingClient<runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PlatformSettingFindManyArgs>(args?: Prisma.SelectSubset<T, PlatformSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PlatformSettingCreateArgs>(args: Prisma.SelectSubset<T, PlatformSettingCreateArgs<ExtArgs>>): Prisma.Prisma__PlatformSettingClient<runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PlatformSettingCreateManyArgs>(args?: Prisma.SelectSubset<T, PlatformSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PlatformSettingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PlatformSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PlatformSettingDeleteArgs>(args: Prisma.SelectSubset<T, PlatformSettingDeleteArgs<ExtArgs>>): Prisma.Prisma__PlatformSettingClient<runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PlatformSettingUpdateArgs>(args: Prisma.SelectSubset<T, PlatformSettingUpdateArgs<ExtArgs>>): Prisma.Prisma__PlatformSettingClient<runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PlatformSettingDeleteManyArgs>(args?: Prisma.SelectSubset<T, PlatformSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PlatformSettingUpdateManyArgs>(args: Prisma.SelectSubset<T, PlatformSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PlatformSettingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PlatformSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PlatformSettingUpsertArgs>(args: Prisma.SelectSubset<T, PlatformSettingUpsertArgs<ExtArgs>>): Prisma.Prisma__PlatformSettingClient<runtime.Types.Result.GetResult<Prisma.$PlatformSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PlatformSettingCountArgs>(args?: Prisma.Subset<T, PlatformSettingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PlatformSettingCountAggregateOutputType> : number>;
    aggregate<T extends PlatformSettingAggregateArgs>(args: Prisma.Subset<T, PlatformSettingAggregateArgs>): Prisma.PrismaPromise<GetPlatformSettingAggregateType<T>>;
    groupBy<T extends PlatformSettingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PlatformSettingGroupByArgs['orderBy'];
    } : {
        orderBy?: PlatformSettingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PlatformSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PlatformSettingFieldRefs;
}
export interface Prisma__PlatformSettingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PlatformSettingFieldRefs {
    readonly key: Prisma.FieldRef<"PlatformSetting", 'String'>;
    readonly value: Prisma.FieldRef<"PlatformSetting", 'Json'>;
    readonly updatedAt: Prisma.FieldRef<"PlatformSetting", 'DateTime'>;
}
export type PlatformSettingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelect<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
    where: Prisma.PlatformSettingWhereUniqueInput;
};
export type PlatformSettingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelect<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
    where: Prisma.PlatformSettingWhereUniqueInput;
};
export type PlatformSettingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelect<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
    where?: Prisma.PlatformSettingWhereInput;
    orderBy?: Prisma.PlatformSettingOrderByWithRelationInput | Prisma.PlatformSettingOrderByWithRelationInput[];
    cursor?: Prisma.PlatformSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlatformSettingScalarFieldEnum | Prisma.PlatformSettingScalarFieldEnum[];
};
export type PlatformSettingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelect<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
    where?: Prisma.PlatformSettingWhereInput;
    orderBy?: Prisma.PlatformSettingOrderByWithRelationInput | Prisma.PlatformSettingOrderByWithRelationInput[];
    cursor?: Prisma.PlatformSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlatformSettingScalarFieldEnum | Prisma.PlatformSettingScalarFieldEnum[];
};
export type PlatformSettingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelect<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
    where?: Prisma.PlatformSettingWhereInput;
    orderBy?: Prisma.PlatformSettingOrderByWithRelationInput | Prisma.PlatformSettingOrderByWithRelationInput[];
    cursor?: Prisma.PlatformSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlatformSettingScalarFieldEnum | Prisma.PlatformSettingScalarFieldEnum[];
};
export type PlatformSettingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelect<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlatformSettingCreateInput, Prisma.PlatformSettingUncheckedCreateInput>;
};
export type PlatformSettingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PlatformSettingCreateManyInput | Prisma.PlatformSettingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PlatformSettingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
    data: Prisma.PlatformSettingCreateManyInput | Prisma.PlatformSettingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PlatformSettingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelect<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlatformSettingUpdateInput, Prisma.PlatformSettingUncheckedUpdateInput>;
    where: Prisma.PlatformSettingWhereUniqueInput;
};
export type PlatformSettingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PlatformSettingUpdateManyMutationInput, Prisma.PlatformSettingUncheckedUpdateManyInput>;
    where?: Prisma.PlatformSettingWhereInput;
    limit?: number;
};
export type PlatformSettingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlatformSettingUpdateManyMutationInput, Prisma.PlatformSettingUncheckedUpdateManyInput>;
    where?: Prisma.PlatformSettingWhereInput;
    limit?: number;
};
export type PlatformSettingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelect<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
    where: Prisma.PlatformSettingWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlatformSettingCreateInput, Prisma.PlatformSettingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PlatformSettingUpdateInput, Prisma.PlatformSettingUncheckedUpdateInput>;
};
export type PlatformSettingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelect<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
    where: Prisma.PlatformSettingWhereUniqueInput;
};
export type PlatformSettingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlatformSettingWhereInput;
    limit?: number;
};
export type PlatformSettingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlatformSettingSelect<ExtArgs> | null;
    omit?: Prisma.PlatformSettingOmit<ExtArgs> | null;
};
