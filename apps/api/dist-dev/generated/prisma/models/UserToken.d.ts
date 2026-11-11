import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserTokenModel = runtime.Types.Result.DefaultSelection<Prisma.$UserTokenPayload>;
export type AggregateUserToken = {
    _count: UserTokenCountAggregateOutputType | null;
    _min: UserTokenMinAggregateOutputType | null;
    _max: UserTokenMaxAggregateOutputType | null;
};
export type UserTokenMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.UserTokenType | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    createdAt: Date | null;
};
export type UserTokenMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.UserTokenType | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    createdAt: Date | null;
};
export type UserTokenCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    tokenHash: number;
    expiresAt: number;
    usedAt: number;
    createdAt: number;
    _all: number;
};
export type UserTokenMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    tokenHash?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
};
export type UserTokenMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    tokenHash?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
};
export type UserTokenCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    tokenHash?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type UserTokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserTokenWhereInput;
    orderBy?: Prisma.UserTokenOrderByWithRelationInput | Prisma.UserTokenOrderByWithRelationInput[];
    cursor?: Prisma.UserTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserTokenCountAggregateInputType;
    _min?: UserTokenMinAggregateInputType;
    _max?: UserTokenMaxAggregateInputType;
};
export type GetUserTokenAggregateType<T extends UserTokenAggregateArgs> = {
    [P in keyof T & keyof AggregateUserToken]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserToken[P]> : Prisma.GetScalarType<T[P], AggregateUserToken[P]>;
};
export type UserTokenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserTokenWhereInput;
    orderBy?: Prisma.UserTokenOrderByWithAggregationInput | Prisma.UserTokenOrderByWithAggregationInput[];
    by: Prisma.UserTokenScalarFieldEnum[] | Prisma.UserTokenScalarFieldEnum;
    having?: Prisma.UserTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserTokenCountAggregateInputType | true;
    _min?: UserTokenMinAggregateInputType;
    _max?: UserTokenMaxAggregateInputType;
};
export type UserTokenGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.UserTokenType;
    tokenHash: string;
    expiresAt: Date;
    usedAt: Date | null;
    createdAt: Date;
    _count: UserTokenCountAggregateOutputType | null;
    _min: UserTokenMinAggregateOutputType | null;
    _max: UserTokenMaxAggregateOutputType | null;
};
export type GetUserTokenGroupByPayload<T extends UserTokenGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserTokenGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserTokenGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserTokenGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserTokenGroupByOutputType[P]>;
}>>;
export type UserTokenWhereInput = {
    AND?: Prisma.UserTokenWhereInput | Prisma.UserTokenWhereInput[];
    OR?: Prisma.UserTokenWhereInput[];
    NOT?: Prisma.UserTokenWhereInput | Prisma.UserTokenWhereInput[];
    id?: Prisma.UuidFilter<"UserToken"> | string;
    userId?: Prisma.UuidFilter<"UserToken"> | string;
    type?: Prisma.EnumUserTokenTypeFilter<"UserToken"> | $Enums.UserTokenType;
    tokenHash?: Prisma.StringFilter<"UserToken"> | string;
    expiresAt?: Prisma.DateTimeFilter<"UserToken"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"UserToken"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserToken"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserTokenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tokenHash?: string;
    AND?: Prisma.UserTokenWhereInput | Prisma.UserTokenWhereInput[];
    OR?: Prisma.UserTokenWhereInput[];
    NOT?: Prisma.UserTokenWhereInput | Prisma.UserTokenWhereInput[];
    userId?: Prisma.UuidFilter<"UserToken"> | string;
    type?: Prisma.EnumUserTokenTypeFilter<"UserToken"> | $Enums.UserTokenType;
    expiresAt?: Prisma.DateTimeFilter<"UserToken"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"UserToken"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserToken"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "tokenHash">;
export type UserTokenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.UserTokenCountOrderByAggregateInput;
    _max?: Prisma.UserTokenMaxOrderByAggregateInput;
    _min?: Prisma.UserTokenMinOrderByAggregateInput;
};
export type UserTokenScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserTokenScalarWhereWithAggregatesInput | Prisma.UserTokenScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserTokenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserTokenScalarWhereWithAggregatesInput | Prisma.UserTokenScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"UserToken"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"UserToken"> | string;
    type?: Prisma.EnumUserTokenTypeWithAggregatesFilter<"UserToken"> | $Enums.UserTokenType;
    tokenHash?: Prisma.StringWithAggregatesFilter<"UserToken"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"UserToken"> | Date | string;
    usedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"UserToken"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserToken"> | Date | string;
};
export type UserTokenCreateInput = {
    id?: string;
    type: $Enums.UserTokenType;
    tokenHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTokensInput;
};
export type UserTokenUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: $Enums.UserTokenType;
    tokenHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type UserTokenUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumUserTokenTypeFieldUpdateOperationsInput | $Enums.UserTokenType;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTokensNestedInput;
};
export type UserTokenUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumUserTokenTypeFieldUpdateOperationsInput | $Enums.UserTokenType;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserTokenCreateManyInput = {
    id?: string;
    userId: string;
    type: $Enums.UserTokenType;
    tokenHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type UserTokenUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumUserTokenTypeFieldUpdateOperationsInput | $Enums.UserTokenType;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserTokenUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumUserTokenTypeFieldUpdateOperationsInput | $Enums.UserTokenType;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserTokenListRelationFilter = {
    every?: Prisma.UserTokenWhereInput;
    some?: Prisma.UserTokenWhereInput;
    none?: Prisma.UserTokenWhereInput;
};
export type UserTokenOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserTokenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserTokenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserTokenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserTokenCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserTokenCreateWithoutUserInput, Prisma.UserTokenUncheckedCreateWithoutUserInput> | Prisma.UserTokenCreateWithoutUserInput[] | Prisma.UserTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserTokenCreateOrConnectWithoutUserInput | Prisma.UserTokenCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserTokenCreateManyUserInputEnvelope;
    connect?: Prisma.UserTokenWhereUniqueInput | Prisma.UserTokenWhereUniqueInput[];
};
export type UserTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserTokenCreateWithoutUserInput, Prisma.UserTokenUncheckedCreateWithoutUserInput> | Prisma.UserTokenCreateWithoutUserInput[] | Prisma.UserTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserTokenCreateOrConnectWithoutUserInput | Prisma.UserTokenCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserTokenCreateManyUserInputEnvelope;
    connect?: Prisma.UserTokenWhereUniqueInput | Prisma.UserTokenWhereUniqueInput[];
};
export type UserTokenUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserTokenCreateWithoutUserInput, Prisma.UserTokenUncheckedCreateWithoutUserInput> | Prisma.UserTokenCreateWithoutUserInput[] | Prisma.UserTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserTokenCreateOrConnectWithoutUserInput | Prisma.UserTokenCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserTokenUpsertWithWhereUniqueWithoutUserInput | Prisma.UserTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserTokenCreateManyUserInputEnvelope;
    set?: Prisma.UserTokenWhereUniqueInput | Prisma.UserTokenWhereUniqueInput[];
    disconnect?: Prisma.UserTokenWhereUniqueInput | Prisma.UserTokenWhereUniqueInput[];
    delete?: Prisma.UserTokenWhereUniqueInput | Prisma.UserTokenWhereUniqueInput[];
    connect?: Prisma.UserTokenWhereUniqueInput | Prisma.UserTokenWhereUniqueInput[];
    update?: Prisma.UserTokenUpdateWithWhereUniqueWithoutUserInput | Prisma.UserTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserTokenUpdateManyWithWhereWithoutUserInput | Prisma.UserTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserTokenScalarWhereInput | Prisma.UserTokenScalarWhereInput[];
};
export type UserTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserTokenCreateWithoutUserInput, Prisma.UserTokenUncheckedCreateWithoutUserInput> | Prisma.UserTokenCreateWithoutUserInput[] | Prisma.UserTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserTokenCreateOrConnectWithoutUserInput | Prisma.UserTokenCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserTokenUpsertWithWhereUniqueWithoutUserInput | Prisma.UserTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserTokenCreateManyUserInputEnvelope;
    set?: Prisma.UserTokenWhereUniqueInput | Prisma.UserTokenWhereUniqueInput[];
    disconnect?: Prisma.UserTokenWhereUniqueInput | Prisma.UserTokenWhereUniqueInput[];
    delete?: Prisma.UserTokenWhereUniqueInput | Prisma.UserTokenWhereUniqueInput[];
    connect?: Prisma.UserTokenWhereUniqueInput | Prisma.UserTokenWhereUniqueInput[];
    update?: Prisma.UserTokenUpdateWithWhereUniqueWithoutUserInput | Prisma.UserTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserTokenUpdateManyWithWhereWithoutUserInput | Prisma.UserTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserTokenScalarWhereInput | Prisma.UserTokenScalarWhereInput[];
};
export type EnumUserTokenTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserTokenType;
};
export type UserTokenCreateWithoutUserInput = {
    id?: string;
    type: $Enums.UserTokenType;
    tokenHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type UserTokenUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.UserTokenType;
    tokenHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type UserTokenCreateOrConnectWithoutUserInput = {
    where: Prisma.UserTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserTokenCreateWithoutUserInput, Prisma.UserTokenUncheckedCreateWithoutUserInput>;
};
export type UserTokenCreateManyUserInputEnvelope = {
    data: Prisma.UserTokenCreateManyUserInput | Prisma.UserTokenCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type UserTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserTokenWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserTokenUpdateWithoutUserInput, Prisma.UserTokenUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserTokenCreateWithoutUserInput, Prisma.UserTokenUncheckedCreateWithoutUserInput>;
};
export type UserTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserTokenWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserTokenUpdateWithoutUserInput, Prisma.UserTokenUncheckedUpdateWithoutUserInput>;
};
export type UserTokenUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.UserTokenScalarWhereInput;
    data: Prisma.XOR<Prisma.UserTokenUpdateManyMutationInput, Prisma.UserTokenUncheckedUpdateManyWithoutUserInput>;
};
export type UserTokenScalarWhereInput = {
    AND?: Prisma.UserTokenScalarWhereInput | Prisma.UserTokenScalarWhereInput[];
    OR?: Prisma.UserTokenScalarWhereInput[];
    NOT?: Prisma.UserTokenScalarWhereInput | Prisma.UserTokenScalarWhereInput[];
    id?: Prisma.UuidFilter<"UserToken"> | string;
    userId?: Prisma.UuidFilter<"UserToken"> | string;
    type?: Prisma.EnumUserTokenTypeFilter<"UserToken"> | $Enums.UserTokenType;
    tokenHash?: Prisma.StringFilter<"UserToken"> | string;
    expiresAt?: Prisma.DateTimeFilter<"UserToken"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"UserToken"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserToken"> | Date | string;
};
export type UserTokenCreateManyUserInput = {
    id?: string;
    type: $Enums.UserTokenType;
    tokenHash: string;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type UserTokenUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumUserTokenTypeFieldUpdateOperationsInput | $Enums.UserTokenType;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserTokenUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumUserTokenTypeFieldUpdateOperationsInput | $Enums.UserTokenType;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserTokenUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumUserTokenTypeFieldUpdateOperationsInput | $Enums.UserTokenType;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserTokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userToken"]>;
export type UserTokenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userToken"]>;
export type UserTokenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userToken"]>;
export type UserTokenSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
};
export type UserTokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "tokenHash" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["userToken"]>;
export type UserTokenInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserTokenIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserTokenIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserTokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserToken";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: $Enums.UserTokenType;
        tokenHash: string;
        expiresAt: Date;
        usedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["userToken"]>;
    composites: {};
};
export type UserTokenGetPayload<S extends boolean | null | undefined | UserTokenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserTokenPayload, S>;
export type UserTokenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserTokenCountAggregateInputType | true;
};
export interface UserTokenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserToken'];
        meta: {
            name: 'UserToken';
        };
    };
    findUnique<T extends UserTokenFindUniqueArgs>(args: Prisma.SelectSubset<T, UserTokenFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserTokenClient<runtime.Types.Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserTokenFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserTokenClient<runtime.Types.Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserTokenFindFirstArgs>(args?: Prisma.SelectSubset<T, UserTokenFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserTokenClient<runtime.Types.Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserTokenFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserTokenClient<runtime.Types.Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserTokenFindManyArgs>(args?: Prisma.SelectSubset<T, UserTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserTokenCreateArgs>(args: Prisma.SelectSubset<T, UserTokenCreateArgs<ExtArgs>>): Prisma.Prisma__UserTokenClient<runtime.Types.Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserTokenCreateManyArgs>(args?: Prisma.SelectSubset<T, UserTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserTokenCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserTokenDeleteArgs>(args: Prisma.SelectSubset<T, UserTokenDeleteArgs<ExtArgs>>): Prisma.Prisma__UserTokenClient<runtime.Types.Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserTokenUpdateArgs>(args: Prisma.SelectSubset<T, UserTokenUpdateArgs<ExtArgs>>): Prisma.Prisma__UserTokenClient<runtime.Types.Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserTokenDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserTokenUpdateManyArgs>(args: Prisma.SelectSubset<T, UserTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserTokenUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserTokenUpsertArgs>(args: Prisma.SelectSubset<T, UserTokenUpsertArgs<ExtArgs>>): Prisma.Prisma__UserTokenClient<runtime.Types.Result.GetResult<Prisma.$UserTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserTokenCountArgs>(args?: Prisma.Subset<T, UserTokenCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserTokenCountAggregateOutputType> : number>;
    aggregate<T extends UserTokenAggregateArgs>(args: Prisma.Subset<T, UserTokenAggregateArgs>): Prisma.PrismaPromise<GetUserTokenAggregateType<T>>;
    groupBy<T extends UserTokenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserTokenGroupByArgs['orderBy'];
    } : {
        orderBy?: UserTokenGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserTokenFieldRefs;
}
export interface Prisma__UserTokenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserTokenFieldRefs {
    readonly id: Prisma.FieldRef<"UserToken", 'String'>;
    readonly userId: Prisma.FieldRef<"UserToken", 'String'>;
    readonly type: Prisma.FieldRef<"UserToken", 'UserTokenType'>;
    readonly tokenHash: Prisma.FieldRef<"UserToken", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"UserToken", 'DateTime'>;
    readonly usedAt: Prisma.FieldRef<"UserToken", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"UserToken", 'DateTime'>;
}
export type UserTokenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelect<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    include?: Prisma.UserTokenInclude<ExtArgs> | null;
    where: Prisma.UserTokenWhereUniqueInput;
};
export type UserTokenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelect<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    include?: Prisma.UserTokenInclude<ExtArgs> | null;
    where: Prisma.UserTokenWhereUniqueInput;
};
export type UserTokenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelect<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    include?: Prisma.UserTokenInclude<ExtArgs> | null;
    where?: Prisma.UserTokenWhereInput;
    orderBy?: Prisma.UserTokenOrderByWithRelationInput | Prisma.UserTokenOrderByWithRelationInput[];
    cursor?: Prisma.UserTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserTokenScalarFieldEnum | Prisma.UserTokenScalarFieldEnum[];
};
export type UserTokenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelect<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    include?: Prisma.UserTokenInclude<ExtArgs> | null;
    where?: Prisma.UserTokenWhereInput;
    orderBy?: Prisma.UserTokenOrderByWithRelationInput | Prisma.UserTokenOrderByWithRelationInput[];
    cursor?: Prisma.UserTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserTokenScalarFieldEnum | Prisma.UserTokenScalarFieldEnum[];
};
export type UserTokenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelect<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    include?: Prisma.UserTokenInclude<ExtArgs> | null;
    where?: Prisma.UserTokenWhereInput;
    orderBy?: Prisma.UserTokenOrderByWithRelationInput | Prisma.UserTokenOrderByWithRelationInput[];
    cursor?: Prisma.UserTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserTokenScalarFieldEnum | Prisma.UserTokenScalarFieldEnum[];
};
export type UserTokenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelect<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    include?: Prisma.UserTokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserTokenCreateInput, Prisma.UserTokenUncheckedCreateInput>;
};
export type UserTokenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserTokenCreateManyInput | Prisma.UserTokenCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserTokenCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    data: Prisma.UserTokenCreateManyInput | Prisma.UserTokenCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserTokenIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserTokenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelect<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    include?: Prisma.UserTokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserTokenUpdateInput, Prisma.UserTokenUncheckedUpdateInput>;
    where: Prisma.UserTokenWhereUniqueInput;
};
export type UserTokenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserTokenUpdateManyMutationInput, Prisma.UserTokenUncheckedUpdateManyInput>;
    where?: Prisma.UserTokenWhereInput;
    limit?: number;
};
export type UserTokenUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserTokenUpdateManyMutationInput, Prisma.UserTokenUncheckedUpdateManyInput>;
    where?: Prisma.UserTokenWhereInput;
    limit?: number;
    include?: Prisma.UserTokenIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserTokenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelect<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    include?: Prisma.UserTokenInclude<ExtArgs> | null;
    where: Prisma.UserTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserTokenCreateInput, Prisma.UserTokenUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserTokenUpdateInput, Prisma.UserTokenUncheckedUpdateInput>;
};
export type UserTokenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelect<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    include?: Prisma.UserTokenInclude<ExtArgs> | null;
    where: Prisma.UserTokenWhereUniqueInput;
};
export type UserTokenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserTokenWhereInput;
    limit?: number;
};
export type UserTokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserTokenSelect<ExtArgs> | null;
    omit?: Prisma.UserTokenOmit<ExtArgs> | null;
    include?: Prisma.UserTokenInclude<ExtArgs> | null;
};
