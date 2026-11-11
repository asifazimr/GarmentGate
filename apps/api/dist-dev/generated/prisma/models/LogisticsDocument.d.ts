import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LogisticsDocumentModel = runtime.Types.Result.DefaultSelection<Prisma.$LogisticsDocumentPayload>;
export type AggregateLogisticsDocument = {
    _count: LogisticsDocumentCountAggregateOutputType | null;
    _min: LogisticsDocumentMinAggregateOutputType | null;
    _max: LogisticsDocumentMaxAggregateOutputType | null;
};
export type LogisticsDocumentMinAggregateOutputType = {
    id: string | null;
    shipmentId: string | null;
    type: $Enums.LogisticsDocumentType | null;
    number: string | null;
    issuedById: string | null;
    createdAt: Date | null;
};
export type LogisticsDocumentMaxAggregateOutputType = {
    id: string | null;
    shipmentId: string | null;
    type: $Enums.LogisticsDocumentType | null;
    number: string | null;
    issuedById: string | null;
    createdAt: Date | null;
};
export type LogisticsDocumentCountAggregateOutputType = {
    id: number;
    shipmentId: number;
    type: number;
    number: number;
    issuedById: number;
    createdAt: number;
    _all: number;
};
export type LogisticsDocumentMinAggregateInputType = {
    id?: true;
    shipmentId?: true;
    type?: true;
    number?: true;
    issuedById?: true;
    createdAt?: true;
};
export type LogisticsDocumentMaxAggregateInputType = {
    id?: true;
    shipmentId?: true;
    type?: true;
    number?: true;
    issuedById?: true;
    createdAt?: true;
};
export type LogisticsDocumentCountAggregateInputType = {
    id?: true;
    shipmentId?: true;
    type?: true;
    number?: true;
    issuedById?: true;
    createdAt?: true;
    _all?: true;
};
export type LogisticsDocumentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsDocumentWhereInput;
    orderBy?: Prisma.LogisticsDocumentOrderByWithRelationInput | Prisma.LogisticsDocumentOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LogisticsDocumentCountAggregateInputType;
    _min?: LogisticsDocumentMinAggregateInputType;
    _max?: LogisticsDocumentMaxAggregateInputType;
};
export type GetLogisticsDocumentAggregateType<T extends LogisticsDocumentAggregateArgs> = {
    [P in keyof T & keyof AggregateLogisticsDocument]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLogisticsDocument[P]> : Prisma.GetScalarType<T[P], AggregateLogisticsDocument[P]>;
};
export type LogisticsDocumentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsDocumentWhereInput;
    orderBy?: Prisma.LogisticsDocumentOrderByWithAggregationInput | Prisma.LogisticsDocumentOrderByWithAggregationInput[];
    by: Prisma.LogisticsDocumentScalarFieldEnum[] | Prisma.LogisticsDocumentScalarFieldEnum;
    having?: Prisma.LogisticsDocumentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LogisticsDocumentCountAggregateInputType | true;
    _min?: LogisticsDocumentMinAggregateInputType;
    _max?: LogisticsDocumentMaxAggregateInputType;
};
export type LogisticsDocumentGroupByOutputType = {
    id: string;
    shipmentId: string;
    type: $Enums.LogisticsDocumentType;
    number: string;
    issuedById: string | null;
    createdAt: Date;
    _count: LogisticsDocumentCountAggregateOutputType | null;
    _min: LogisticsDocumentMinAggregateOutputType | null;
    _max: LogisticsDocumentMaxAggregateOutputType | null;
};
export type GetLogisticsDocumentGroupByPayload<T extends LogisticsDocumentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LogisticsDocumentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LogisticsDocumentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LogisticsDocumentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LogisticsDocumentGroupByOutputType[P]>;
}>>;
export type LogisticsDocumentWhereInput = {
    AND?: Prisma.LogisticsDocumentWhereInput | Prisma.LogisticsDocumentWhereInput[];
    OR?: Prisma.LogisticsDocumentWhereInput[];
    NOT?: Prisma.LogisticsDocumentWhereInput | Prisma.LogisticsDocumentWhereInput[];
    id?: Prisma.UuidFilter<"LogisticsDocument"> | string;
    shipmentId?: Prisma.UuidFilter<"LogisticsDocument"> | string;
    type?: Prisma.EnumLogisticsDocumentTypeFilter<"LogisticsDocument"> | $Enums.LogisticsDocumentType;
    number?: Prisma.StringFilter<"LogisticsDocument"> | string;
    issuedById?: Prisma.UuidNullableFilter<"LogisticsDocument"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"LogisticsDocument"> | Date | string;
    shipment?: Prisma.XOR<Prisma.LogisticsShipmentScalarRelationFilter, Prisma.LogisticsShipmentWhereInput>;
};
export type LogisticsDocumentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    shipment?: Prisma.LogisticsShipmentOrderByWithRelationInput;
};
export type LogisticsDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    number?: string;
    AND?: Prisma.LogisticsDocumentWhereInput | Prisma.LogisticsDocumentWhereInput[];
    OR?: Prisma.LogisticsDocumentWhereInput[];
    NOT?: Prisma.LogisticsDocumentWhereInput | Prisma.LogisticsDocumentWhereInput[];
    shipmentId?: Prisma.UuidFilter<"LogisticsDocument"> | string;
    type?: Prisma.EnumLogisticsDocumentTypeFilter<"LogisticsDocument"> | $Enums.LogisticsDocumentType;
    issuedById?: Prisma.UuidNullableFilter<"LogisticsDocument"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"LogisticsDocument"> | Date | string;
    shipment?: Prisma.XOR<Prisma.LogisticsShipmentScalarRelationFilter, Prisma.LogisticsShipmentWhereInput>;
}, "id" | "number">;
export type LogisticsDocumentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.LogisticsDocumentCountOrderByAggregateInput;
    _max?: Prisma.LogisticsDocumentMaxOrderByAggregateInput;
    _min?: Prisma.LogisticsDocumentMinOrderByAggregateInput;
};
export type LogisticsDocumentScalarWhereWithAggregatesInput = {
    AND?: Prisma.LogisticsDocumentScalarWhereWithAggregatesInput | Prisma.LogisticsDocumentScalarWhereWithAggregatesInput[];
    OR?: Prisma.LogisticsDocumentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LogisticsDocumentScalarWhereWithAggregatesInput | Prisma.LogisticsDocumentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"LogisticsDocument"> | string;
    shipmentId?: Prisma.UuidWithAggregatesFilter<"LogisticsDocument"> | string;
    type?: Prisma.EnumLogisticsDocumentTypeWithAggregatesFilter<"LogisticsDocument"> | $Enums.LogisticsDocumentType;
    number?: Prisma.StringWithAggregatesFilter<"LogisticsDocument"> | string;
    issuedById?: Prisma.UuidNullableWithAggregatesFilter<"LogisticsDocument"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"LogisticsDocument"> | Date | string;
};
export type LogisticsDocumentCreateInput = {
    id?: string;
    type: $Enums.LogisticsDocumentType;
    number: string;
    issuedById?: string | null;
    createdAt?: Date | string;
    shipment: Prisma.LogisticsShipmentCreateNestedOneWithoutDocumentsInput;
};
export type LogisticsDocumentUncheckedCreateInput = {
    id?: string;
    shipmentId: string;
    type: $Enums.LogisticsDocumentType;
    number: string;
    issuedById?: string | null;
    createdAt?: Date | string;
};
export type LogisticsDocumentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLogisticsDocumentTypeFieldUpdateOperationsInput | $Enums.LogisticsDocumentType;
    number?: Prisma.StringFieldUpdateOperationsInput | string;
    issuedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shipment?: Prisma.LogisticsShipmentUpdateOneRequiredWithoutDocumentsNestedInput;
};
export type LogisticsDocumentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLogisticsDocumentTypeFieldUpdateOperationsInput | $Enums.LogisticsDocumentType;
    number?: Prisma.StringFieldUpdateOperationsInput | string;
    issuedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsDocumentCreateManyInput = {
    id?: string;
    shipmentId: string;
    type: $Enums.LogisticsDocumentType;
    number: string;
    issuedById?: string | null;
    createdAt?: Date | string;
};
export type LogisticsDocumentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLogisticsDocumentTypeFieldUpdateOperationsInput | $Enums.LogisticsDocumentType;
    number?: Prisma.StringFieldUpdateOperationsInput | string;
    issuedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsDocumentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLogisticsDocumentTypeFieldUpdateOperationsInput | $Enums.LogisticsDocumentType;
    number?: Prisma.StringFieldUpdateOperationsInput | string;
    issuedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsDocumentListRelationFilter = {
    every?: Prisma.LogisticsDocumentWhereInput;
    some?: Prisma.LogisticsDocumentWhereInput;
    none?: Prisma.LogisticsDocumentWhereInput;
};
export type LogisticsDocumentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LogisticsDocumentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LogisticsDocumentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LogisticsDocumentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LogisticsDocumentCreateNestedManyWithoutShipmentInput = {
    create?: Prisma.XOR<Prisma.LogisticsDocumentCreateWithoutShipmentInput, Prisma.LogisticsDocumentUncheckedCreateWithoutShipmentInput> | Prisma.LogisticsDocumentCreateWithoutShipmentInput[] | Prisma.LogisticsDocumentUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.LogisticsDocumentCreateOrConnectWithoutShipmentInput | Prisma.LogisticsDocumentCreateOrConnectWithoutShipmentInput[];
    createMany?: Prisma.LogisticsDocumentCreateManyShipmentInputEnvelope;
    connect?: Prisma.LogisticsDocumentWhereUniqueInput | Prisma.LogisticsDocumentWhereUniqueInput[];
};
export type LogisticsDocumentUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: Prisma.XOR<Prisma.LogisticsDocumentCreateWithoutShipmentInput, Prisma.LogisticsDocumentUncheckedCreateWithoutShipmentInput> | Prisma.LogisticsDocumentCreateWithoutShipmentInput[] | Prisma.LogisticsDocumentUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.LogisticsDocumentCreateOrConnectWithoutShipmentInput | Prisma.LogisticsDocumentCreateOrConnectWithoutShipmentInput[];
    createMany?: Prisma.LogisticsDocumentCreateManyShipmentInputEnvelope;
    connect?: Prisma.LogisticsDocumentWhereUniqueInput | Prisma.LogisticsDocumentWhereUniqueInput[];
};
export type LogisticsDocumentUpdateManyWithoutShipmentNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsDocumentCreateWithoutShipmentInput, Prisma.LogisticsDocumentUncheckedCreateWithoutShipmentInput> | Prisma.LogisticsDocumentCreateWithoutShipmentInput[] | Prisma.LogisticsDocumentUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.LogisticsDocumentCreateOrConnectWithoutShipmentInput | Prisma.LogisticsDocumentCreateOrConnectWithoutShipmentInput[];
    upsert?: Prisma.LogisticsDocumentUpsertWithWhereUniqueWithoutShipmentInput | Prisma.LogisticsDocumentUpsertWithWhereUniqueWithoutShipmentInput[];
    createMany?: Prisma.LogisticsDocumentCreateManyShipmentInputEnvelope;
    set?: Prisma.LogisticsDocumentWhereUniqueInput | Prisma.LogisticsDocumentWhereUniqueInput[];
    disconnect?: Prisma.LogisticsDocumentWhereUniqueInput | Prisma.LogisticsDocumentWhereUniqueInput[];
    delete?: Prisma.LogisticsDocumentWhereUniqueInput | Prisma.LogisticsDocumentWhereUniqueInput[];
    connect?: Prisma.LogisticsDocumentWhereUniqueInput | Prisma.LogisticsDocumentWhereUniqueInput[];
    update?: Prisma.LogisticsDocumentUpdateWithWhereUniqueWithoutShipmentInput | Prisma.LogisticsDocumentUpdateWithWhereUniqueWithoutShipmentInput[];
    updateMany?: Prisma.LogisticsDocumentUpdateManyWithWhereWithoutShipmentInput | Prisma.LogisticsDocumentUpdateManyWithWhereWithoutShipmentInput[];
    deleteMany?: Prisma.LogisticsDocumentScalarWhereInput | Prisma.LogisticsDocumentScalarWhereInput[];
};
export type LogisticsDocumentUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsDocumentCreateWithoutShipmentInput, Prisma.LogisticsDocumentUncheckedCreateWithoutShipmentInput> | Prisma.LogisticsDocumentCreateWithoutShipmentInput[] | Prisma.LogisticsDocumentUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.LogisticsDocumentCreateOrConnectWithoutShipmentInput | Prisma.LogisticsDocumentCreateOrConnectWithoutShipmentInput[];
    upsert?: Prisma.LogisticsDocumentUpsertWithWhereUniqueWithoutShipmentInput | Prisma.LogisticsDocumentUpsertWithWhereUniqueWithoutShipmentInput[];
    createMany?: Prisma.LogisticsDocumentCreateManyShipmentInputEnvelope;
    set?: Prisma.LogisticsDocumentWhereUniqueInput | Prisma.LogisticsDocumentWhereUniqueInput[];
    disconnect?: Prisma.LogisticsDocumentWhereUniqueInput | Prisma.LogisticsDocumentWhereUniqueInput[];
    delete?: Prisma.LogisticsDocumentWhereUniqueInput | Prisma.LogisticsDocumentWhereUniqueInput[];
    connect?: Prisma.LogisticsDocumentWhereUniqueInput | Prisma.LogisticsDocumentWhereUniqueInput[];
    update?: Prisma.LogisticsDocumentUpdateWithWhereUniqueWithoutShipmentInput | Prisma.LogisticsDocumentUpdateWithWhereUniqueWithoutShipmentInput[];
    updateMany?: Prisma.LogisticsDocumentUpdateManyWithWhereWithoutShipmentInput | Prisma.LogisticsDocumentUpdateManyWithWhereWithoutShipmentInput[];
    deleteMany?: Prisma.LogisticsDocumentScalarWhereInput | Prisma.LogisticsDocumentScalarWhereInput[];
};
export type EnumLogisticsDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.LogisticsDocumentType;
};
export type LogisticsDocumentCreateWithoutShipmentInput = {
    id?: string;
    type: $Enums.LogisticsDocumentType;
    number: string;
    issuedById?: string | null;
    createdAt?: Date | string;
};
export type LogisticsDocumentUncheckedCreateWithoutShipmentInput = {
    id?: string;
    type: $Enums.LogisticsDocumentType;
    number: string;
    issuedById?: string | null;
    createdAt?: Date | string;
};
export type LogisticsDocumentCreateOrConnectWithoutShipmentInput = {
    where: Prisma.LogisticsDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsDocumentCreateWithoutShipmentInput, Prisma.LogisticsDocumentUncheckedCreateWithoutShipmentInput>;
};
export type LogisticsDocumentCreateManyShipmentInputEnvelope = {
    data: Prisma.LogisticsDocumentCreateManyShipmentInput | Prisma.LogisticsDocumentCreateManyShipmentInput[];
    skipDuplicates?: boolean;
};
export type LogisticsDocumentUpsertWithWhereUniqueWithoutShipmentInput = {
    where: Prisma.LogisticsDocumentWhereUniqueInput;
    update: Prisma.XOR<Prisma.LogisticsDocumentUpdateWithoutShipmentInput, Prisma.LogisticsDocumentUncheckedUpdateWithoutShipmentInput>;
    create: Prisma.XOR<Prisma.LogisticsDocumentCreateWithoutShipmentInput, Prisma.LogisticsDocumentUncheckedCreateWithoutShipmentInput>;
};
export type LogisticsDocumentUpdateWithWhereUniqueWithoutShipmentInput = {
    where: Prisma.LogisticsDocumentWhereUniqueInput;
    data: Prisma.XOR<Prisma.LogisticsDocumentUpdateWithoutShipmentInput, Prisma.LogisticsDocumentUncheckedUpdateWithoutShipmentInput>;
};
export type LogisticsDocumentUpdateManyWithWhereWithoutShipmentInput = {
    where: Prisma.LogisticsDocumentScalarWhereInput;
    data: Prisma.XOR<Prisma.LogisticsDocumentUpdateManyMutationInput, Prisma.LogisticsDocumentUncheckedUpdateManyWithoutShipmentInput>;
};
export type LogisticsDocumentScalarWhereInput = {
    AND?: Prisma.LogisticsDocumentScalarWhereInput | Prisma.LogisticsDocumentScalarWhereInput[];
    OR?: Prisma.LogisticsDocumentScalarWhereInput[];
    NOT?: Prisma.LogisticsDocumentScalarWhereInput | Prisma.LogisticsDocumentScalarWhereInput[];
    id?: Prisma.UuidFilter<"LogisticsDocument"> | string;
    shipmentId?: Prisma.UuidFilter<"LogisticsDocument"> | string;
    type?: Prisma.EnumLogisticsDocumentTypeFilter<"LogisticsDocument"> | $Enums.LogisticsDocumentType;
    number?: Prisma.StringFilter<"LogisticsDocument"> | string;
    issuedById?: Prisma.UuidNullableFilter<"LogisticsDocument"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"LogisticsDocument"> | Date | string;
};
export type LogisticsDocumentCreateManyShipmentInput = {
    id?: string;
    type: $Enums.LogisticsDocumentType;
    number: string;
    issuedById?: string | null;
    createdAt?: Date | string;
};
export type LogisticsDocumentUpdateWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLogisticsDocumentTypeFieldUpdateOperationsInput | $Enums.LogisticsDocumentType;
    number?: Prisma.StringFieldUpdateOperationsInput | string;
    issuedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsDocumentUncheckedUpdateWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLogisticsDocumentTypeFieldUpdateOperationsInput | $Enums.LogisticsDocumentType;
    number?: Prisma.StringFieldUpdateOperationsInput | string;
    issuedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsDocumentUncheckedUpdateManyWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumLogisticsDocumentTypeFieldUpdateOperationsInput | $Enums.LogisticsDocumentType;
    number?: Prisma.StringFieldUpdateOperationsInput | string;
    issuedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LogisticsDocumentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    type?: boolean;
    number?: boolean;
    issuedById?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["logisticsDocument"]>;
export type LogisticsDocumentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    type?: boolean;
    number?: boolean;
    issuedById?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["logisticsDocument"]>;
export type LogisticsDocumentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    type?: boolean;
    number?: boolean;
    issuedById?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["logisticsDocument"]>;
export type LogisticsDocumentSelectScalar = {
    id?: boolean;
    shipmentId?: boolean;
    type?: boolean;
    number?: boolean;
    issuedById?: boolean;
    createdAt?: boolean;
};
export type LogisticsDocumentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "shipmentId" | "type" | "number" | "issuedById" | "createdAt", ExtArgs["result"]["logisticsDocument"]>;
export type LogisticsDocumentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
};
export type LogisticsDocumentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
};
export type LogisticsDocumentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.LogisticsShipmentDefaultArgs<ExtArgs>;
};
export type $LogisticsDocumentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LogisticsDocument";
    objects: {
        shipment: Prisma.$LogisticsShipmentPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        shipmentId: string;
        type: $Enums.LogisticsDocumentType;
        number: string;
        issuedById: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["logisticsDocument"]>;
    composites: {};
};
export type LogisticsDocumentGetPayload<S extends boolean | null | undefined | LogisticsDocumentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload, S>;
export type LogisticsDocumentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LogisticsDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LogisticsDocumentCountAggregateInputType | true;
};
export interface LogisticsDocumentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LogisticsDocument'];
        meta: {
            name: 'LogisticsDocument';
        };
    };
    findUnique<T extends LogisticsDocumentFindUniqueArgs>(args: Prisma.SelectSubset<T, LogisticsDocumentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LogisticsDocumentClient<runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LogisticsDocumentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LogisticsDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LogisticsDocumentClient<runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LogisticsDocumentFindFirstArgs>(args?: Prisma.SelectSubset<T, LogisticsDocumentFindFirstArgs<ExtArgs>>): Prisma.Prisma__LogisticsDocumentClient<runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LogisticsDocumentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LogisticsDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LogisticsDocumentClient<runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LogisticsDocumentFindManyArgs>(args?: Prisma.SelectSubset<T, LogisticsDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LogisticsDocumentCreateArgs>(args: Prisma.SelectSubset<T, LogisticsDocumentCreateArgs<ExtArgs>>): Prisma.Prisma__LogisticsDocumentClient<runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LogisticsDocumentCreateManyArgs>(args?: Prisma.SelectSubset<T, LogisticsDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LogisticsDocumentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LogisticsDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LogisticsDocumentDeleteArgs>(args: Prisma.SelectSubset<T, LogisticsDocumentDeleteArgs<ExtArgs>>): Prisma.Prisma__LogisticsDocumentClient<runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LogisticsDocumentUpdateArgs>(args: Prisma.SelectSubset<T, LogisticsDocumentUpdateArgs<ExtArgs>>): Prisma.Prisma__LogisticsDocumentClient<runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LogisticsDocumentDeleteManyArgs>(args?: Prisma.SelectSubset<T, LogisticsDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LogisticsDocumentUpdateManyArgs>(args: Prisma.SelectSubset<T, LogisticsDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LogisticsDocumentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LogisticsDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LogisticsDocumentUpsertArgs>(args: Prisma.SelectSubset<T, LogisticsDocumentUpsertArgs<ExtArgs>>): Prisma.Prisma__LogisticsDocumentClient<runtime.Types.Result.GetResult<Prisma.$LogisticsDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LogisticsDocumentCountArgs>(args?: Prisma.Subset<T, LogisticsDocumentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LogisticsDocumentCountAggregateOutputType> : number>;
    aggregate<T extends LogisticsDocumentAggregateArgs>(args: Prisma.Subset<T, LogisticsDocumentAggregateArgs>): Prisma.PrismaPromise<GetLogisticsDocumentAggregateType<T>>;
    groupBy<T extends LogisticsDocumentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LogisticsDocumentGroupByArgs['orderBy'];
    } : {
        orderBy?: LogisticsDocumentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LogisticsDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogisticsDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LogisticsDocumentFieldRefs;
}
export interface Prisma__LogisticsDocumentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shipment<T extends Prisma.LogisticsShipmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LogisticsShipmentDefaultArgs<ExtArgs>>): Prisma.Prisma__LogisticsShipmentClient<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LogisticsDocumentFieldRefs {
    readonly id: Prisma.FieldRef<"LogisticsDocument", 'String'>;
    readonly shipmentId: Prisma.FieldRef<"LogisticsDocument", 'String'>;
    readonly type: Prisma.FieldRef<"LogisticsDocument", 'LogisticsDocumentType'>;
    readonly number: Prisma.FieldRef<"LogisticsDocument", 'String'>;
    readonly issuedById: Prisma.FieldRef<"LogisticsDocument", 'String'>;
    readonly createdAt: Prisma.FieldRef<"LogisticsDocument", 'DateTime'>;
}
export type LogisticsDocumentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsDocumentInclude<ExtArgs> | null;
    where: Prisma.LogisticsDocumentWhereUniqueInput;
};
export type LogisticsDocumentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsDocumentInclude<ExtArgs> | null;
    where: Prisma.LogisticsDocumentWhereUniqueInput;
};
export type LogisticsDocumentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsDocumentInclude<ExtArgs> | null;
    where?: Prisma.LogisticsDocumentWhereInput;
    orderBy?: Prisma.LogisticsDocumentOrderByWithRelationInput | Prisma.LogisticsDocumentOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsDocumentScalarFieldEnum | Prisma.LogisticsDocumentScalarFieldEnum[];
};
export type LogisticsDocumentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsDocumentInclude<ExtArgs> | null;
    where?: Prisma.LogisticsDocumentWhereInput;
    orderBy?: Prisma.LogisticsDocumentOrderByWithRelationInput | Prisma.LogisticsDocumentOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsDocumentScalarFieldEnum | Prisma.LogisticsDocumentScalarFieldEnum[];
};
export type LogisticsDocumentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsDocumentInclude<ExtArgs> | null;
    where?: Prisma.LogisticsDocumentWhereInput;
    orderBy?: Prisma.LogisticsDocumentOrderByWithRelationInput | Prisma.LogisticsDocumentOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsDocumentScalarFieldEnum | Prisma.LogisticsDocumentScalarFieldEnum[];
};
export type LogisticsDocumentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsDocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsDocumentCreateInput, Prisma.LogisticsDocumentUncheckedCreateInput>;
};
export type LogisticsDocumentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LogisticsDocumentCreateManyInput | Prisma.LogisticsDocumentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LogisticsDocumentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    data: Prisma.LogisticsDocumentCreateManyInput | Prisma.LogisticsDocumentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LogisticsDocumentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LogisticsDocumentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsDocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsDocumentUpdateInput, Prisma.LogisticsDocumentUncheckedUpdateInput>;
    where: Prisma.LogisticsDocumentWhereUniqueInput;
};
export type LogisticsDocumentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LogisticsDocumentUpdateManyMutationInput, Prisma.LogisticsDocumentUncheckedUpdateManyInput>;
    where?: Prisma.LogisticsDocumentWhereInput;
    limit?: number;
};
export type LogisticsDocumentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LogisticsDocumentUpdateManyMutationInput, Prisma.LogisticsDocumentUncheckedUpdateManyInput>;
    where?: Prisma.LogisticsDocumentWhereInput;
    limit?: number;
    include?: Prisma.LogisticsDocumentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LogisticsDocumentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsDocumentInclude<ExtArgs> | null;
    where: Prisma.LogisticsDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsDocumentCreateInput, Prisma.LogisticsDocumentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LogisticsDocumentUpdateInput, Prisma.LogisticsDocumentUncheckedUpdateInput>;
};
export type LogisticsDocumentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsDocumentInclude<ExtArgs> | null;
    where: Prisma.LogisticsDocumentWhereUniqueInput;
};
export type LogisticsDocumentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsDocumentWhereInput;
    limit?: number;
};
export type LogisticsDocumentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsDocumentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsDocumentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsDocumentInclude<ExtArgs> | null;
};
