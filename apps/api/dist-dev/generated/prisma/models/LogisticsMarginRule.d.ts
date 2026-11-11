import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LogisticsMarginRuleModel = runtime.Types.Result.DefaultSelection<Prisma.$LogisticsMarginRulePayload>;
export type AggregateLogisticsMarginRule = {
    _count: LogisticsMarginRuleCountAggregateOutputType | null;
    _avg: LogisticsMarginRuleAvgAggregateOutputType | null;
    _sum: LogisticsMarginRuleSumAggregateOutputType | null;
    _min: LogisticsMarginRuleMinAggregateOutputType | null;
    _max: LogisticsMarginRuleMaxAggregateOutputType | null;
};
export type LogisticsMarginRuleAvgAggregateOutputType = {
    markupBps: number | null;
    minMarginMinor: number | null;
};
export type LogisticsMarginRuleSumAggregateOutputType = {
    markupBps: number | null;
    minMarginMinor: number | null;
};
export type LogisticsMarginRuleMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    mode: $Enums.LogisticsMode | null;
    originCountry: string | null;
    destinationCountry: string | null;
    markupBps: number | null;
    minMarginMinor: number | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LogisticsMarginRuleMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    mode: $Enums.LogisticsMode | null;
    originCountry: string | null;
    destinationCountry: string | null;
    markupBps: number | null;
    minMarginMinor: number | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LogisticsMarginRuleCountAggregateOutputType = {
    id: number;
    name: number;
    mode: number;
    originCountry: number;
    destinationCountry: number;
    markupBps: number;
    minMarginMinor: number;
    active: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LogisticsMarginRuleAvgAggregateInputType = {
    markupBps?: true;
    minMarginMinor?: true;
};
export type LogisticsMarginRuleSumAggregateInputType = {
    markupBps?: true;
    minMarginMinor?: true;
};
export type LogisticsMarginRuleMinAggregateInputType = {
    id?: true;
    name?: true;
    mode?: true;
    originCountry?: true;
    destinationCountry?: true;
    markupBps?: true;
    minMarginMinor?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LogisticsMarginRuleMaxAggregateInputType = {
    id?: true;
    name?: true;
    mode?: true;
    originCountry?: true;
    destinationCountry?: true;
    markupBps?: true;
    minMarginMinor?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LogisticsMarginRuleCountAggregateInputType = {
    id?: true;
    name?: true;
    mode?: true;
    originCountry?: true;
    destinationCountry?: true;
    markupBps?: true;
    minMarginMinor?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LogisticsMarginRuleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsMarginRuleWhereInput;
    orderBy?: Prisma.LogisticsMarginRuleOrderByWithRelationInput | Prisma.LogisticsMarginRuleOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsMarginRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LogisticsMarginRuleCountAggregateInputType;
    _avg?: LogisticsMarginRuleAvgAggregateInputType;
    _sum?: LogisticsMarginRuleSumAggregateInputType;
    _min?: LogisticsMarginRuleMinAggregateInputType;
    _max?: LogisticsMarginRuleMaxAggregateInputType;
};
export type GetLogisticsMarginRuleAggregateType<T extends LogisticsMarginRuleAggregateArgs> = {
    [P in keyof T & keyof AggregateLogisticsMarginRule]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLogisticsMarginRule[P]> : Prisma.GetScalarType<T[P], AggregateLogisticsMarginRule[P]>;
};
export type LogisticsMarginRuleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsMarginRuleWhereInput;
    orderBy?: Prisma.LogisticsMarginRuleOrderByWithAggregationInput | Prisma.LogisticsMarginRuleOrderByWithAggregationInput[];
    by: Prisma.LogisticsMarginRuleScalarFieldEnum[] | Prisma.LogisticsMarginRuleScalarFieldEnum;
    having?: Prisma.LogisticsMarginRuleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LogisticsMarginRuleCountAggregateInputType | true;
    _avg?: LogisticsMarginRuleAvgAggregateInputType;
    _sum?: LogisticsMarginRuleSumAggregateInputType;
    _min?: LogisticsMarginRuleMinAggregateInputType;
    _max?: LogisticsMarginRuleMaxAggregateInputType;
};
export type LogisticsMarginRuleGroupByOutputType = {
    id: string;
    name: string;
    mode: $Enums.LogisticsMode | null;
    originCountry: string | null;
    destinationCountry: string | null;
    markupBps: number;
    minMarginMinor: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: LogisticsMarginRuleCountAggregateOutputType | null;
    _avg: LogisticsMarginRuleAvgAggregateOutputType | null;
    _sum: LogisticsMarginRuleSumAggregateOutputType | null;
    _min: LogisticsMarginRuleMinAggregateOutputType | null;
    _max: LogisticsMarginRuleMaxAggregateOutputType | null;
};
export type GetLogisticsMarginRuleGroupByPayload<T extends LogisticsMarginRuleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LogisticsMarginRuleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LogisticsMarginRuleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LogisticsMarginRuleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LogisticsMarginRuleGroupByOutputType[P]>;
}>>;
export type LogisticsMarginRuleWhereInput = {
    AND?: Prisma.LogisticsMarginRuleWhereInput | Prisma.LogisticsMarginRuleWhereInput[];
    OR?: Prisma.LogisticsMarginRuleWhereInput[];
    NOT?: Prisma.LogisticsMarginRuleWhereInput | Prisma.LogisticsMarginRuleWhereInput[];
    id?: Prisma.UuidFilter<"LogisticsMarginRule"> | string;
    name?: Prisma.StringFilter<"LogisticsMarginRule"> | string;
    mode?: Prisma.EnumLogisticsModeNullableFilter<"LogisticsMarginRule"> | $Enums.LogisticsMode | null;
    originCountry?: Prisma.StringNullableFilter<"LogisticsMarginRule"> | string | null;
    destinationCountry?: Prisma.StringNullableFilter<"LogisticsMarginRule"> | string | null;
    markupBps?: Prisma.IntFilter<"LogisticsMarginRule"> | number;
    minMarginMinor?: Prisma.IntFilter<"LogisticsMarginRule"> | number;
    active?: Prisma.BoolFilter<"LogisticsMarginRule"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"LogisticsMarginRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LogisticsMarginRule"> | Date | string;
};
export type LogisticsMarginRuleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    mode?: Prisma.SortOrderInput | Prisma.SortOrder;
    originCountry?: Prisma.SortOrderInput | Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrderInput | Prisma.SortOrder;
    markupBps?: Prisma.SortOrder;
    minMarginMinor?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LogisticsMarginRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.LogisticsMarginRuleWhereInput | Prisma.LogisticsMarginRuleWhereInput[];
    OR?: Prisma.LogisticsMarginRuleWhereInput[];
    NOT?: Prisma.LogisticsMarginRuleWhereInput | Prisma.LogisticsMarginRuleWhereInput[];
    name?: Prisma.StringFilter<"LogisticsMarginRule"> | string;
    mode?: Prisma.EnumLogisticsModeNullableFilter<"LogisticsMarginRule"> | $Enums.LogisticsMode | null;
    originCountry?: Prisma.StringNullableFilter<"LogisticsMarginRule"> | string | null;
    destinationCountry?: Prisma.StringNullableFilter<"LogisticsMarginRule"> | string | null;
    markupBps?: Prisma.IntFilter<"LogisticsMarginRule"> | number;
    minMarginMinor?: Prisma.IntFilter<"LogisticsMarginRule"> | number;
    active?: Prisma.BoolFilter<"LogisticsMarginRule"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"LogisticsMarginRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LogisticsMarginRule"> | Date | string;
}, "id">;
export type LogisticsMarginRuleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    mode?: Prisma.SortOrderInput | Prisma.SortOrder;
    originCountry?: Prisma.SortOrderInput | Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrderInput | Prisma.SortOrder;
    markupBps?: Prisma.SortOrder;
    minMarginMinor?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LogisticsMarginRuleCountOrderByAggregateInput;
    _avg?: Prisma.LogisticsMarginRuleAvgOrderByAggregateInput;
    _max?: Prisma.LogisticsMarginRuleMaxOrderByAggregateInput;
    _min?: Prisma.LogisticsMarginRuleMinOrderByAggregateInput;
    _sum?: Prisma.LogisticsMarginRuleSumOrderByAggregateInput;
};
export type LogisticsMarginRuleScalarWhereWithAggregatesInput = {
    AND?: Prisma.LogisticsMarginRuleScalarWhereWithAggregatesInput | Prisma.LogisticsMarginRuleScalarWhereWithAggregatesInput[];
    OR?: Prisma.LogisticsMarginRuleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LogisticsMarginRuleScalarWhereWithAggregatesInput | Prisma.LogisticsMarginRuleScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"LogisticsMarginRule"> | string;
    name?: Prisma.StringWithAggregatesFilter<"LogisticsMarginRule"> | string;
    mode?: Prisma.EnumLogisticsModeNullableWithAggregatesFilter<"LogisticsMarginRule"> | $Enums.LogisticsMode | null;
    originCountry?: Prisma.StringNullableWithAggregatesFilter<"LogisticsMarginRule"> | string | null;
    destinationCountry?: Prisma.StringNullableWithAggregatesFilter<"LogisticsMarginRule"> | string | null;
    markupBps?: Prisma.IntWithAggregatesFilter<"LogisticsMarginRule"> | number;
    minMarginMinor?: Prisma.IntWithAggregatesFilter<"LogisticsMarginRule"> | number;
    active?: Prisma.BoolWithAggregatesFilter<"LogisticsMarginRule"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"LogisticsMarginRule"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"LogisticsMarginRule"> | Date | string;
};
export type LogisticsMarginRuleCreateInput = {
    id?: string;
    name: string;
    mode?: $Enums.LogisticsMode | null;
    originCountry?: string | null;
    destinationCountry?: string | null;
    markupBps: number;
    minMarginMinor?: number;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LogisticsMarginRuleUncheckedCreateInput = {
    id?: string;
    name: string;
    mode?: $Enums.LogisticsMode | null;
    originCountry?: string | null;
    destinationCountry?: string | null;
    markupBps: number;
    minMarginMinor?: number;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LogisticsMarginRuleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.NullableEnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode | null;
    originCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    destinationCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsMarginRuleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.NullableEnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode | null;
    originCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    destinationCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsMarginRuleCreateManyInput = {
    id?: string;
    name: string;
    mode?: $Enums.LogisticsMode | null;
    originCountry?: string | null;
    destinationCountry?: string | null;
    markupBps: number;
    minMarginMinor?: number;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LogisticsMarginRuleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.NullableEnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode | null;
    originCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    destinationCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsMarginRuleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.NullableEnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode | null;
    originCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    destinationCountry?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    markupBps?: Prisma.IntFieldUpdateOperationsInput | number;
    minMarginMinor?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsMarginRuleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    originCountry?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    markupBps?: Prisma.SortOrder;
    minMarginMinor?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LogisticsMarginRuleAvgOrderByAggregateInput = {
    markupBps?: Prisma.SortOrder;
    minMarginMinor?: Prisma.SortOrder;
};
export type LogisticsMarginRuleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    originCountry?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    markupBps?: Prisma.SortOrder;
    minMarginMinor?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LogisticsMarginRuleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    originCountry?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    markupBps?: Prisma.SortOrder;
    minMarginMinor?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LogisticsMarginRuleSumOrderByAggregateInput = {
    markupBps?: Prisma.SortOrder;
    minMarginMinor?: Prisma.SortOrder;
};
export type NullableEnumLogisticsModeFieldUpdateOperationsInput = {
    set?: $Enums.LogisticsMode | null;
};
export type LogisticsMarginRuleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    mode?: boolean;
    originCountry?: boolean;
    destinationCountry?: boolean;
    markupBps?: boolean;
    minMarginMinor?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["logisticsMarginRule"]>;
export type LogisticsMarginRuleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    mode?: boolean;
    originCountry?: boolean;
    destinationCountry?: boolean;
    markupBps?: boolean;
    minMarginMinor?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["logisticsMarginRule"]>;
export type LogisticsMarginRuleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    mode?: boolean;
    originCountry?: boolean;
    destinationCountry?: boolean;
    markupBps?: boolean;
    minMarginMinor?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["logisticsMarginRule"]>;
export type LogisticsMarginRuleSelectScalar = {
    id?: boolean;
    name?: boolean;
    mode?: boolean;
    originCountry?: boolean;
    destinationCountry?: boolean;
    markupBps?: boolean;
    minMarginMinor?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LogisticsMarginRuleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "mode" | "originCountry" | "destinationCountry" | "markupBps" | "minMarginMinor" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["logisticsMarginRule"]>;
export type $LogisticsMarginRulePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LogisticsMarginRule";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        mode: $Enums.LogisticsMode | null;
        originCountry: string | null;
        destinationCountry: string | null;
        markupBps: number;
        minMarginMinor: number;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["logisticsMarginRule"]>;
    composites: {};
};
export type LogisticsMarginRuleGetPayload<S extends boolean | null | undefined | LogisticsMarginRuleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload, S>;
export type LogisticsMarginRuleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LogisticsMarginRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LogisticsMarginRuleCountAggregateInputType | true;
};
export interface LogisticsMarginRuleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LogisticsMarginRule'];
        meta: {
            name: 'LogisticsMarginRule';
        };
    };
    findUnique<T extends LogisticsMarginRuleFindUniqueArgs>(args: Prisma.SelectSubset<T, LogisticsMarginRuleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LogisticsMarginRuleClient<runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LogisticsMarginRuleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LogisticsMarginRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LogisticsMarginRuleClient<runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LogisticsMarginRuleFindFirstArgs>(args?: Prisma.SelectSubset<T, LogisticsMarginRuleFindFirstArgs<ExtArgs>>): Prisma.Prisma__LogisticsMarginRuleClient<runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LogisticsMarginRuleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LogisticsMarginRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LogisticsMarginRuleClient<runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LogisticsMarginRuleFindManyArgs>(args?: Prisma.SelectSubset<T, LogisticsMarginRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LogisticsMarginRuleCreateArgs>(args: Prisma.SelectSubset<T, LogisticsMarginRuleCreateArgs<ExtArgs>>): Prisma.Prisma__LogisticsMarginRuleClient<runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LogisticsMarginRuleCreateManyArgs>(args?: Prisma.SelectSubset<T, LogisticsMarginRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LogisticsMarginRuleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LogisticsMarginRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LogisticsMarginRuleDeleteArgs>(args: Prisma.SelectSubset<T, LogisticsMarginRuleDeleteArgs<ExtArgs>>): Prisma.Prisma__LogisticsMarginRuleClient<runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LogisticsMarginRuleUpdateArgs>(args: Prisma.SelectSubset<T, LogisticsMarginRuleUpdateArgs<ExtArgs>>): Prisma.Prisma__LogisticsMarginRuleClient<runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LogisticsMarginRuleDeleteManyArgs>(args?: Prisma.SelectSubset<T, LogisticsMarginRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LogisticsMarginRuleUpdateManyArgs>(args: Prisma.SelectSubset<T, LogisticsMarginRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LogisticsMarginRuleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LogisticsMarginRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LogisticsMarginRuleUpsertArgs>(args: Prisma.SelectSubset<T, LogisticsMarginRuleUpsertArgs<ExtArgs>>): Prisma.Prisma__LogisticsMarginRuleClient<runtime.Types.Result.GetResult<Prisma.$LogisticsMarginRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LogisticsMarginRuleCountArgs>(args?: Prisma.Subset<T, LogisticsMarginRuleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LogisticsMarginRuleCountAggregateOutputType> : number>;
    aggregate<T extends LogisticsMarginRuleAggregateArgs>(args: Prisma.Subset<T, LogisticsMarginRuleAggregateArgs>): Prisma.PrismaPromise<GetLogisticsMarginRuleAggregateType<T>>;
    groupBy<T extends LogisticsMarginRuleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LogisticsMarginRuleGroupByArgs['orderBy'];
    } : {
        orderBy?: LogisticsMarginRuleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LogisticsMarginRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogisticsMarginRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LogisticsMarginRuleFieldRefs;
}
export interface Prisma__LogisticsMarginRuleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LogisticsMarginRuleFieldRefs {
    readonly id: Prisma.FieldRef<"LogisticsMarginRule", 'String'>;
    readonly name: Prisma.FieldRef<"LogisticsMarginRule", 'String'>;
    readonly mode: Prisma.FieldRef<"LogisticsMarginRule", 'LogisticsMode'>;
    readonly originCountry: Prisma.FieldRef<"LogisticsMarginRule", 'String'>;
    readonly destinationCountry: Prisma.FieldRef<"LogisticsMarginRule", 'String'>;
    readonly markupBps: Prisma.FieldRef<"LogisticsMarginRule", 'Int'>;
    readonly minMarginMinor: Prisma.FieldRef<"LogisticsMarginRule", 'Int'>;
    readonly active: Prisma.FieldRef<"LogisticsMarginRule", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"LogisticsMarginRule", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"LogisticsMarginRule", 'DateTime'>;
}
export type LogisticsMarginRuleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
    where: Prisma.LogisticsMarginRuleWhereUniqueInput;
};
export type LogisticsMarginRuleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
    where: Prisma.LogisticsMarginRuleWhereUniqueInput;
};
export type LogisticsMarginRuleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
    where?: Prisma.LogisticsMarginRuleWhereInput;
    orderBy?: Prisma.LogisticsMarginRuleOrderByWithRelationInput | Prisma.LogisticsMarginRuleOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsMarginRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsMarginRuleScalarFieldEnum | Prisma.LogisticsMarginRuleScalarFieldEnum[];
};
export type LogisticsMarginRuleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
    where?: Prisma.LogisticsMarginRuleWhereInput;
    orderBy?: Prisma.LogisticsMarginRuleOrderByWithRelationInput | Prisma.LogisticsMarginRuleOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsMarginRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsMarginRuleScalarFieldEnum | Prisma.LogisticsMarginRuleScalarFieldEnum[];
};
export type LogisticsMarginRuleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
    where?: Prisma.LogisticsMarginRuleWhereInput;
    orderBy?: Prisma.LogisticsMarginRuleOrderByWithRelationInput | Prisma.LogisticsMarginRuleOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsMarginRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsMarginRuleScalarFieldEnum | Prisma.LogisticsMarginRuleScalarFieldEnum[];
};
export type LogisticsMarginRuleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsMarginRuleCreateInput, Prisma.LogisticsMarginRuleUncheckedCreateInput>;
};
export type LogisticsMarginRuleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LogisticsMarginRuleCreateManyInput | Prisma.LogisticsMarginRuleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LogisticsMarginRuleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
    data: Prisma.LogisticsMarginRuleCreateManyInput | Prisma.LogisticsMarginRuleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LogisticsMarginRuleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsMarginRuleUpdateInput, Prisma.LogisticsMarginRuleUncheckedUpdateInput>;
    where: Prisma.LogisticsMarginRuleWhereUniqueInput;
};
export type LogisticsMarginRuleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LogisticsMarginRuleUpdateManyMutationInput, Prisma.LogisticsMarginRuleUncheckedUpdateManyInput>;
    where?: Prisma.LogisticsMarginRuleWhereInput;
    limit?: number;
};
export type LogisticsMarginRuleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsMarginRuleUpdateManyMutationInput, Prisma.LogisticsMarginRuleUncheckedUpdateManyInput>;
    where?: Prisma.LogisticsMarginRuleWhereInput;
    limit?: number;
};
export type LogisticsMarginRuleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
    where: Prisma.LogisticsMarginRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsMarginRuleCreateInput, Prisma.LogisticsMarginRuleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LogisticsMarginRuleUpdateInput, Prisma.LogisticsMarginRuleUncheckedUpdateInput>;
};
export type LogisticsMarginRuleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
    where: Prisma.LogisticsMarginRuleWhereUniqueInput;
};
export type LogisticsMarginRuleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsMarginRuleWhereInput;
    limit?: number;
};
export type LogisticsMarginRuleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsMarginRuleSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsMarginRuleOmit<ExtArgs> | null;
};
