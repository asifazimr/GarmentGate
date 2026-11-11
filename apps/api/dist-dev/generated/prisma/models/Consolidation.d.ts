import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ConsolidationModel = runtime.Types.Result.DefaultSelection<Prisma.$ConsolidationPayload>;
export type AggregateConsolidation = {
    _count: ConsolidationCountAggregateOutputType | null;
    _avg: ConsolidationAvgAggregateOutputType | null;
    _sum: ConsolidationSumAggregateOutputType | null;
    _min: ConsolidationMinAggregateOutputType | null;
    _max: ConsolidationMaxAggregateOutputType | null;
};
export type ConsolidationAvgAggregateOutputType = {
    separateTotalMinor: number | null;
    combinedTotalMinor: number | null;
};
export type ConsolidationSumAggregateOutputType = {
    separateTotalMinor: bigint | null;
    combinedTotalMinor: bigint | null;
};
export type ConsolidationMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    buyerCompanyId: string | null;
    mode: $Enums.LogisticsMode | null;
    destinationCountry: string | null;
    currency: $Enums.Currency | null;
    separateTotalMinor: bigint | null;
    combinedTotalMinor: bigint | null;
    createdAt: Date | null;
};
export type ConsolidationMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    buyerCompanyId: string | null;
    mode: $Enums.LogisticsMode | null;
    destinationCountry: string | null;
    currency: $Enums.Currency | null;
    separateTotalMinor: bigint | null;
    combinedTotalMinor: bigint | null;
    createdAt: Date | null;
};
export type ConsolidationCountAggregateOutputType = {
    id: number;
    code: number;
    buyerCompanyId: number;
    mode: number;
    destinationCountry: number;
    currency: number;
    separateTotalMinor: number;
    combinedTotalMinor: number;
    createdAt: number;
    _all: number;
};
export type ConsolidationAvgAggregateInputType = {
    separateTotalMinor?: true;
    combinedTotalMinor?: true;
};
export type ConsolidationSumAggregateInputType = {
    separateTotalMinor?: true;
    combinedTotalMinor?: true;
};
export type ConsolidationMinAggregateInputType = {
    id?: true;
    code?: true;
    buyerCompanyId?: true;
    mode?: true;
    destinationCountry?: true;
    currency?: true;
    separateTotalMinor?: true;
    combinedTotalMinor?: true;
    createdAt?: true;
};
export type ConsolidationMaxAggregateInputType = {
    id?: true;
    code?: true;
    buyerCompanyId?: true;
    mode?: true;
    destinationCountry?: true;
    currency?: true;
    separateTotalMinor?: true;
    combinedTotalMinor?: true;
    createdAt?: true;
};
export type ConsolidationCountAggregateInputType = {
    id?: true;
    code?: true;
    buyerCompanyId?: true;
    mode?: true;
    destinationCountry?: true;
    currency?: true;
    separateTotalMinor?: true;
    combinedTotalMinor?: true;
    createdAt?: true;
    _all?: true;
};
export type ConsolidationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsolidationWhereInput;
    orderBy?: Prisma.ConsolidationOrderByWithRelationInput | Prisma.ConsolidationOrderByWithRelationInput[];
    cursor?: Prisma.ConsolidationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConsolidationCountAggregateInputType;
    _avg?: ConsolidationAvgAggregateInputType;
    _sum?: ConsolidationSumAggregateInputType;
    _min?: ConsolidationMinAggregateInputType;
    _max?: ConsolidationMaxAggregateInputType;
};
export type GetConsolidationAggregateType<T extends ConsolidationAggregateArgs> = {
    [P in keyof T & keyof AggregateConsolidation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConsolidation[P]> : Prisma.GetScalarType<T[P], AggregateConsolidation[P]>;
};
export type ConsolidationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsolidationWhereInput;
    orderBy?: Prisma.ConsolidationOrderByWithAggregationInput | Prisma.ConsolidationOrderByWithAggregationInput[];
    by: Prisma.ConsolidationScalarFieldEnum[] | Prisma.ConsolidationScalarFieldEnum;
    having?: Prisma.ConsolidationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConsolidationCountAggregateInputType | true;
    _avg?: ConsolidationAvgAggregateInputType;
    _sum?: ConsolidationSumAggregateInputType;
    _min?: ConsolidationMinAggregateInputType;
    _max?: ConsolidationMaxAggregateInputType;
};
export type ConsolidationGroupByOutputType = {
    id: string;
    code: string;
    buyerCompanyId: string;
    mode: $Enums.LogisticsMode;
    destinationCountry: string;
    currency: $Enums.Currency;
    separateTotalMinor: bigint;
    combinedTotalMinor: bigint;
    createdAt: Date;
    _count: ConsolidationCountAggregateOutputType | null;
    _avg: ConsolidationAvgAggregateOutputType | null;
    _sum: ConsolidationSumAggregateOutputType | null;
    _min: ConsolidationMinAggregateOutputType | null;
    _max: ConsolidationMaxAggregateOutputType | null;
};
export type GetConsolidationGroupByPayload<T extends ConsolidationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConsolidationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConsolidationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConsolidationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConsolidationGroupByOutputType[P]>;
}>>;
export type ConsolidationWhereInput = {
    AND?: Prisma.ConsolidationWhereInput | Prisma.ConsolidationWhereInput[];
    OR?: Prisma.ConsolidationWhereInput[];
    NOT?: Prisma.ConsolidationWhereInput | Prisma.ConsolidationWhereInput[];
    id?: Prisma.UuidFilter<"Consolidation"> | string;
    code?: Prisma.StringFilter<"Consolidation"> | string;
    buyerCompanyId?: Prisma.UuidFilter<"Consolidation"> | string;
    mode?: Prisma.EnumLogisticsModeFilter<"Consolidation"> | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFilter<"Consolidation"> | string;
    currency?: Prisma.EnumCurrencyFilter<"Consolidation"> | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFilter<"Consolidation"> | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFilter<"Consolidation"> | bigint | number;
    createdAt?: Prisma.DateTimeFilter<"Consolidation"> | Date | string;
    buyerCompany?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    quotes?: Prisma.LogisticsQuoteListRelationFilter;
    shipments?: Prisma.LogisticsShipmentListRelationFilter;
};
export type ConsolidationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    buyerCompanyId?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    separateTotalMinor?: Prisma.SortOrder;
    combinedTotalMinor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    buyerCompany?: Prisma.CompanyOrderByWithRelationInput;
    quotes?: Prisma.LogisticsQuoteOrderByRelationAggregateInput;
    shipments?: Prisma.LogisticsShipmentOrderByRelationAggregateInput;
};
export type ConsolidationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.ConsolidationWhereInput | Prisma.ConsolidationWhereInput[];
    OR?: Prisma.ConsolidationWhereInput[];
    NOT?: Prisma.ConsolidationWhereInput | Prisma.ConsolidationWhereInput[];
    buyerCompanyId?: Prisma.UuidFilter<"Consolidation"> | string;
    mode?: Prisma.EnumLogisticsModeFilter<"Consolidation"> | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFilter<"Consolidation"> | string;
    currency?: Prisma.EnumCurrencyFilter<"Consolidation"> | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFilter<"Consolidation"> | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFilter<"Consolidation"> | bigint | number;
    createdAt?: Prisma.DateTimeFilter<"Consolidation"> | Date | string;
    buyerCompany?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
    quotes?: Prisma.LogisticsQuoteListRelationFilter;
    shipments?: Prisma.LogisticsShipmentListRelationFilter;
}, "id" | "code">;
export type ConsolidationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    buyerCompanyId?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    separateTotalMinor?: Prisma.SortOrder;
    combinedTotalMinor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ConsolidationCountOrderByAggregateInput;
    _avg?: Prisma.ConsolidationAvgOrderByAggregateInput;
    _max?: Prisma.ConsolidationMaxOrderByAggregateInput;
    _min?: Prisma.ConsolidationMinOrderByAggregateInput;
    _sum?: Prisma.ConsolidationSumOrderByAggregateInput;
};
export type ConsolidationScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConsolidationScalarWhereWithAggregatesInput | Prisma.ConsolidationScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConsolidationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConsolidationScalarWhereWithAggregatesInput | Prisma.ConsolidationScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Consolidation"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Consolidation"> | string;
    buyerCompanyId?: Prisma.UuidWithAggregatesFilter<"Consolidation"> | string;
    mode?: Prisma.EnumLogisticsModeWithAggregatesFilter<"Consolidation"> | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringWithAggregatesFilter<"Consolidation"> | string;
    currency?: Prisma.EnumCurrencyWithAggregatesFilter<"Consolidation"> | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntWithAggregatesFilter<"Consolidation"> | bigint | number;
    combinedTotalMinor?: Prisma.BigIntWithAggregatesFilter<"Consolidation"> | bigint | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Consolidation"> | Date | string;
};
export type ConsolidationCreateInput = {
    id?: string;
    code: string;
    mode: $Enums.LogisticsMode;
    destinationCountry: string;
    currency: $Enums.Currency;
    separateTotalMinor: bigint | number;
    combinedTotalMinor: bigint | number;
    createdAt?: Date | string;
    buyerCompany: Prisma.CompanyCreateNestedOneWithoutConsolidationsInput;
    quotes?: Prisma.LogisticsQuoteCreateNestedManyWithoutConsolidationInput;
    shipments?: Prisma.LogisticsShipmentCreateNestedManyWithoutConsolidationInput;
};
export type ConsolidationUncheckedCreateInput = {
    id?: string;
    code: string;
    buyerCompanyId: string;
    mode: $Enums.LogisticsMode;
    destinationCountry: string;
    currency: $Enums.Currency;
    separateTotalMinor: bigint | number;
    combinedTotalMinor: bigint | number;
    createdAt?: Date | string;
    quotes?: Prisma.LogisticsQuoteUncheckedCreateNestedManyWithoutConsolidationInput;
    shipments?: Prisma.LogisticsShipmentUncheckedCreateNestedManyWithoutConsolidationInput;
};
export type ConsolidationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.EnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    buyerCompany?: Prisma.CompanyUpdateOneRequiredWithoutConsolidationsNestedInput;
    quotes?: Prisma.LogisticsQuoteUpdateManyWithoutConsolidationNestedInput;
    shipments?: Prisma.LogisticsShipmentUpdateManyWithoutConsolidationNestedInput;
};
export type ConsolidationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.EnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quotes?: Prisma.LogisticsQuoteUncheckedUpdateManyWithoutConsolidationNestedInput;
    shipments?: Prisma.LogisticsShipmentUncheckedUpdateManyWithoutConsolidationNestedInput;
};
export type ConsolidationCreateManyInput = {
    id?: string;
    code: string;
    buyerCompanyId: string;
    mode: $Enums.LogisticsMode;
    destinationCountry: string;
    currency: $Enums.Currency;
    separateTotalMinor: bigint | number;
    combinedTotalMinor: bigint | number;
    createdAt?: Date | string;
};
export type ConsolidationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.EnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsolidationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.EnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsolidationListRelationFilter = {
    every?: Prisma.ConsolidationWhereInput;
    some?: Prisma.ConsolidationWhereInput;
    none?: Prisma.ConsolidationWhereInput;
};
export type ConsolidationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ConsolidationNullableScalarRelationFilter = {
    is?: Prisma.ConsolidationWhereInput | null;
    isNot?: Prisma.ConsolidationWhereInput | null;
};
export type ConsolidationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    buyerCompanyId?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    separateTotalMinor?: Prisma.SortOrder;
    combinedTotalMinor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ConsolidationAvgOrderByAggregateInput = {
    separateTotalMinor?: Prisma.SortOrder;
    combinedTotalMinor?: Prisma.SortOrder;
};
export type ConsolidationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    buyerCompanyId?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    separateTotalMinor?: Prisma.SortOrder;
    combinedTotalMinor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ConsolidationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    buyerCompanyId?: Prisma.SortOrder;
    mode?: Prisma.SortOrder;
    destinationCountry?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    separateTotalMinor?: Prisma.SortOrder;
    combinedTotalMinor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ConsolidationSumOrderByAggregateInput = {
    separateTotalMinor?: Prisma.SortOrder;
    combinedTotalMinor?: Prisma.SortOrder;
};
export type ConsolidationCreateNestedManyWithoutBuyerCompanyInput = {
    create?: Prisma.XOR<Prisma.ConsolidationCreateWithoutBuyerCompanyInput, Prisma.ConsolidationUncheckedCreateWithoutBuyerCompanyInput> | Prisma.ConsolidationCreateWithoutBuyerCompanyInput[] | Prisma.ConsolidationUncheckedCreateWithoutBuyerCompanyInput[];
    connectOrCreate?: Prisma.ConsolidationCreateOrConnectWithoutBuyerCompanyInput | Prisma.ConsolidationCreateOrConnectWithoutBuyerCompanyInput[];
    createMany?: Prisma.ConsolidationCreateManyBuyerCompanyInputEnvelope;
    connect?: Prisma.ConsolidationWhereUniqueInput | Prisma.ConsolidationWhereUniqueInput[];
};
export type ConsolidationUncheckedCreateNestedManyWithoutBuyerCompanyInput = {
    create?: Prisma.XOR<Prisma.ConsolidationCreateWithoutBuyerCompanyInput, Prisma.ConsolidationUncheckedCreateWithoutBuyerCompanyInput> | Prisma.ConsolidationCreateWithoutBuyerCompanyInput[] | Prisma.ConsolidationUncheckedCreateWithoutBuyerCompanyInput[];
    connectOrCreate?: Prisma.ConsolidationCreateOrConnectWithoutBuyerCompanyInput | Prisma.ConsolidationCreateOrConnectWithoutBuyerCompanyInput[];
    createMany?: Prisma.ConsolidationCreateManyBuyerCompanyInputEnvelope;
    connect?: Prisma.ConsolidationWhereUniqueInput | Prisma.ConsolidationWhereUniqueInput[];
};
export type ConsolidationUpdateManyWithoutBuyerCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ConsolidationCreateWithoutBuyerCompanyInput, Prisma.ConsolidationUncheckedCreateWithoutBuyerCompanyInput> | Prisma.ConsolidationCreateWithoutBuyerCompanyInput[] | Prisma.ConsolidationUncheckedCreateWithoutBuyerCompanyInput[];
    connectOrCreate?: Prisma.ConsolidationCreateOrConnectWithoutBuyerCompanyInput | Prisma.ConsolidationCreateOrConnectWithoutBuyerCompanyInput[];
    upsert?: Prisma.ConsolidationUpsertWithWhereUniqueWithoutBuyerCompanyInput | Prisma.ConsolidationUpsertWithWhereUniqueWithoutBuyerCompanyInput[];
    createMany?: Prisma.ConsolidationCreateManyBuyerCompanyInputEnvelope;
    set?: Prisma.ConsolidationWhereUniqueInput | Prisma.ConsolidationWhereUniqueInput[];
    disconnect?: Prisma.ConsolidationWhereUniqueInput | Prisma.ConsolidationWhereUniqueInput[];
    delete?: Prisma.ConsolidationWhereUniqueInput | Prisma.ConsolidationWhereUniqueInput[];
    connect?: Prisma.ConsolidationWhereUniqueInput | Prisma.ConsolidationWhereUniqueInput[];
    update?: Prisma.ConsolidationUpdateWithWhereUniqueWithoutBuyerCompanyInput | Prisma.ConsolidationUpdateWithWhereUniqueWithoutBuyerCompanyInput[];
    updateMany?: Prisma.ConsolidationUpdateManyWithWhereWithoutBuyerCompanyInput | Prisma.ConsolidationUpdateManyWithWhereWithoutBuyerCompanyInput[];
    deleteMany?: Prisma.ConsolidationScalarWhereInput | Prisma.ConsolidationScalarWhereInput[];
};
export type ConsolidationUncheckedUpdateManyWithoutBuyerCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.ConsolidationCreateWithoutBuyerCompanyInput, Prisma.ConsolidationUncheckedCreateWithoutBuyerCompanyInput> | Prisma.ConsolidationCreateWithoutBuyerCompanyInput[] | Prisma.ConsolidationUncheckedCreateWithoutBuyerCompanyInput[];
    connectOrCreate?: Prisma.ConsolidationCreateOrConnectWithoutBuyerCompanyInput | Prisma.ConsolidationCreateOrConnectWithoutBuyerCompanyInput[];
    upsert?: Prisma.ConsolidationUpsertWithWhereUniqueWithoutBuyerCompanyInput | Prisma.ConsolidationUpsertWithWhereUniqueWithoutBuyerCompanyInput[];
    createMany?: Prisma.ConsolidationCreateManyBuyerCompanyInputEnvelope;
    set?: Prisma.ConsolidationWhereUniqueInput | Prisma.ConsolidationWhereUniqueInput[];
    disconnect?: Prisma.ConsolidationWhereUniqueInput | Prisma.ConsolidationWhereUniqueInput[];
    delete?: Prisma.ConsolidationWhereUniqueInput | Prisma.ConsolidationWhereUniqueInput[];
    connect?: Prisma.ConsolidationWhereUniqueInput | Prisma.ConsolidationWhereUniqueInput[];
    update?: Prisma.ConsolidationUpdateWithWhereUniqueWithoutBuyerCompanyInput | Prisma.ConsolidationUpdateWithWhereUniqueWithoutBuyerCompanyInput[];
    updateMany?: Prisma.ConsolidationUpdateManyWithWhereWithoutBuyerCompanyInput | Prisma.ConsolidationUpdateManyWithWhereWithoutBuyerCompanyInput[];
    deleteMany?: Prisma.ConsolidationScalarWhereInput | Prisma.ConsolidationScalarWhereInput[];
};
export type ConsolidationCreateNestedOneWithoutQuotesInput = {
    create?: Prisma.XOR<Prisma.ConsolidationCreateWithoutQuotesInput, Prisma.ConsolidationUncheckedCreateWithoutQuotesInput>;
    connectOrCreate?: Prisma.ConsolidationCreateOrConnectWithoutQuotesInput;
    connect?: Prisma.ConsolidationWhereUniqueInput;
};
export type ConsolidationUpdateOneWithoutQuotesNestedInput = {
    create?: Prisma.XOR<Prisma.ConsolidationCreateWithoutQuotesInput, Prisma.ConsolidationUncheckedCreateWithoutQuotesInput>;
    connectOrCreate?: Prisma.ConsolidationCreateOrConnectWithoutQuotesInput;
    upsert?: Prisma.ConsolidationUpsertWithoutQuotesInput;
    disconnect?: Prisma.ConsolidationWhereInput | boolean;
    delete?: Prisma.ConsolidationWhereInput | boolean;
    connect?: Prisma.ConsolidationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ConsolidationUpdateToOneWithWhereWithoutQuotesInput, Prisma.ConsolidationUpdateWithoutQuotesInput>, Prisma.ConsolidationUncheckedUpdateWithoutQuotesInput>;
};
export type ConsolidationCreateNestedOneWithoutShipmentsInput = {
    create?: Prisma.XOR<Prisma.ConsolidationCreateWithoutShipmentsInput, Prisma.ConsolidationUncheckedCreateWithoutShipmentsInput>;
    connectOrCreate?: Prisma.ConsolidationCreateOrConnectWithoutShipmentsInput;
    connect?: Prisma.ConsolidationWhereUniqueInput;
};
export type ConsolidationUpdateOneWithoutShipmentsNestedInput = {
    create?: Prisma.XOR<Prisma.ConsolidationCreateWithoutShipmentsInput, Prisma.ConsolidationUncheckedCreateWithoutShipmentsInput>;
    connectOrCreate?: Prisma.ConsolidationCreateOrConnectWithoutShipmentsInput;
    upsert?: Prisma.ConsolidationUpsertWithoutShipmentsInput;
    disconnect?: Prisma.ConsolidationWhereInput | boolean;
    delete?: Prisma.ConsolidationWhereInput | boolean;
    connect?: Prisma.ConsolidationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ConsolidationUpdateToOneWithWhereWithoutShipmentsInput, Prisma.ConsolidationUpdateWithoutShipmentsInput>, Prisma.ConsolidationUncheckedUpdateWithoutShipmentsInput>;
};
export type ConsolidationCreateWithoutBuyerCompanyInput = {
    id?: string;
    code: string;
    mode: $Enums.LogisticsMode;
    destinationCountry: string;
    currency: $Enums.Currency;
    separateTotalMinor: bigint | number;
    combinedTotalMinor: bigint | number;
    createdAt?: Date | string;
    quotes?: Prisma.LogisticsQuoteCreateNestedManyWithoutConsolidationInput;
    shipments?: Prisma.LogisticsShipmentCreateNestedManyWithoutConsolidationInput;
};
export type ConsolidationUncheckedCreateWithoutBuyerCompanyInput = {
    id?: string;
    code: string;
    mode: $Enums.LogisticsMode;
    destinationCountry: string;
    currency: $Enums.Currency;
    separateTotalMinor: bigint | number;
    combinedTotalMinor: bigint | number;
    createdAt?: Date | string;
    quotes?: Prisma.LogisticsQuoteUncheckedCreateNestedManyWithoutConsolidationInput;
    shipments?: Prisma.LogisticsShipmentUncheckedCreateNestedManyWithoutConsolidationInput;
};
export type ConsolidationCreateOrConnectWithoutBuyerCompanyInput = {
    where: Prisma.ConsolidationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConsolidationCreateWithoutBuyerCompanyInput, Prisma.ConsolidationUncheckedCreateWithoutBuyerCompanyInput>;
};
export type ConsolidationCreateManyBuyerCompanyInputEnvelope = {
    data: Prisma.ConsolidationCreateManyBuyerCompanyInput | Prisma.ConsolidationCreateManyBuyerCompanyInput[];
    skipDuplicates?: boolean;
};
export type ConsolidationUpsertWithWhereUniqueWithoutBuyerCompanyInput = {
    where: Prisma.ConsolidationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConsolidationUpdateWithoutBuyerCompanyInput, Prisma.ConsolidationUncheckedUpdateWithoutBuyerCompanyInput>;
    create: Prisma.XOR<Prisma.ConsolidationCreateWithoutBuyerCompanyInput, Prisma.ConsolidationUncheckedCreateWithoutBuyerCompanyInput>;
};
export type ConsolidationUpdateWithWhereUniqueWithoutBuyerCompanyInput = {
    where: Prisma.ConsolidationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConsolidationUpdateWithoutBuyerCompanyInput, Prisma.ConsolidationUncheckedUpdateWithoutBuyerCompanyInput>;
};
export type ConsolidationUpdateManyWithWhereWithoutBuyerCompanyInput = {
    where: Prisma.ConsolidationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConsolidationUpdateManyMutationInput, Prisma.ConsolidationUncheckedUpdateManyWithoutBuyerCompanyInput>;
};
export type ConsolidationScalarWhereInput = {
    AND?: Prisma.ConsolidationScalarWhereInput | Prisma.ConsolidationScalarWhereInput[];
    OR?: Prisma.ConsolidationScalarWhereInput[];
    NOT?: Prisma.ConsolidationScalarWhereInput | Prisma.ConsolidationScalarWhereInput[];
    id?: Prisma.UuidFilter<"Consolidation"> | string;
    code?: Prisma.StringFilter<"Consolidation"> | string;
    buyerCompanyId?: Prisma.UuidFilter<"Consolidation"> | string;
    mode?: Prisma.EnumLogisticsModeFilter<"Consolidation"> | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFilter<"Consolidation"> | string;
    currency?: Prisma.EnumCurrencyFilter<"Consolidation"> | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFilter<"Consolidation"> | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFilter<"Consolidation"> | bigint | number;
    createdAt?: Prisma.DateTimeFilter<"Consolidation"> | Date | string;
};
export type ConsolidationCreateWithoutQuotesInput = {
    id?: string;
    code: string;
    mode: $Enums.LogisticsMode;
    destinationCountry: string;
    currency: $Enums.Currency;
    separateTotalMinor: bigint | number;
    combinedTotalMinor: bigint | number;
    createdAt?: Date | string;
    buyerCompany: Prisma.CompanyCreateNestedOneWithoutConsolidationsInput;
    shipments?: Prisma.LogisticsShipmentCreateNestedManyWithoutConsolidationInput;
};
export type ConsolidationUncheckedCreateWithoutQuotesInput = {
    id?: string;
    code: string;
    buyerCompanyId: string;
    mode: $Enums.LogisticsMode;
    destinationCountry: string;
    currency: $Enums.Currency;
    separateTotalMinor: bigint | number;
    combinedTotalMinor: bigint | number;
    createdAt?: Date | string;
    shipments?: Prisma.LogisticsShipmentUncheckedCreateNestedManyWithoutConsolidationInput;
};
export type ConsolidationCreateOrConnectWithoutQuotesInput = {
    where: Prisma.ConsolidationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConsolidationCreateWithoutQuotesInput, Prisma.ConsolidationUncheckedCreateWithoutQuotesInput>;
};
export type ConsolidationUpsertWithoutQuotesInput = {
    update: Prisma.XOR<Prisma.ConsolidationUpdateWithoutQuotesInput, Prisma.ConsolidationUncheckedUpdateWithoutQuotesInput>;
    create: Prisma.XOR<Prisma.ConsolidationCreateWithoutQuotesInput, Prisma.ConsolidationUncheckedCreateWithoutQuotesInput>;
    where?: Prisma.ConsolidationWhereInput;
};
export type ConsolidationUpdateToOneWithWhereWithoutQuotesInput = {
    where?: Prisma.ConsolidationWhereInput;
    data: Prisma.XOR<Prisma.ConsolidationUpdateWithoutQuotesInput, Prisma.ConsolidationUncheckedUpdateWithoutQuotesInput>;
};
export type ConsolidationUpdateWithoutQuotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.EnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    buyerCompany?: Prisma.CompanyUpdateOneRequiredWithoutConsolidationsNestedInput;
    shipments?: Prisma.LogisticsShipmentUpdateManyWithoutConsolidationNestedInput;
};
export type ConsolidationUncheckedUpdateWithoutQuotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.EnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shipments?: Prisma.LogisticsShipmentUncheckedUpdateManyWithoutConsolidationNestedInput;
};
export type ConsolidationCreateWithoutShipmentsInput = {
    id?: string;
    code: string;
    mode: $Enums.LogisticsMode;
    destinationCountry: string;
    currency: $Enums.Currency;
    separateTotalMinor: bigint | number;
    combinedTotalMinor: bigint | number;
    createdAt?: Date | string;
    buyerCompany: Prisma.CompanyCreateNestedOneWithoutConsolidationsInput;
    quotes?: Prisma.LogisticsQuoteCreateNestedManyWithoutConsolidationInput;
};
export type ConsolidationUncheckedCreateWithoutShipmentsInput = {
    id?: string;
    code: string;
    buyerCompanyId: string;
    mode: $Enums.LogisticsMode;
    destinationCountry: string;
    currency: $Enums.Currency;
    separateTotalMinor: bigint | number;
    combinedTotalMinor: bigint | number;
    createdAt?: Date | string;
    quotes?: Prisma.LogisticsQuoteUncheckedCreateNestedManyWithoutConsolidationInput;
};
export type ConsolidationCreateOrConnectWithoutShipmentsInput = {
    where: Prisma.ConsolidationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConsolidationCreateWithoutShipmentsInput, Prisma.ConsolidationUncheckedCreateWithoutShipmentsInput>;
};
export type ConsolidationUpsertWithoutShipmentsInput = {
    update: Prisma.XOR<Prisma.ConsolidationUpdateWithoutShipmentsInput, Prisma.ConsolidationUncheckedUpdateWithoutShipmentsInput>;
    create: Prisma.XOR<Prisma.ConsolidationCreateWithoutShipmentsInput, Prisma.ConsolidationUncheckedCreateWithoutShipmentsInput>;
    where?: Prisma.ConsolidationWhereInput;
};
export type ConsolidationUpdateToOneWithWhereWithoutShipmentsInput = {
    where?: Prisma.ConsolidationWhereInput;
    data: Prisma.XOR<Prisma.ConsolidationUpdateWithoutShipmentsInput, Prisma.ConsolidationUncheckedUpdateWithoutShipmentsInput>;
};
export type ConsolidationUpdateWithoutShipmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.EnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    buyerCompany?: Prisma.CompanyUpdateOneRequiredWithoutConsolidationsNestedInput;
    quotes?: Prisma.LogisticsQuoteUpdateManyWithoutConsolidationNestedInput;
};
export type ConsolidationUncheckedUpdateWithoutShipmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    buyerCompanyId?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.EnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quotes?: Prisma.LogisticsQuoteUncheckedUpdateManyWithoutConsolidationNestedInput;
};
export type ConsolidationCreateManyBuyerCompanyInput = {
    id?: string;
    code: string;
    mode: $Enums.LogisticsMode;
    destinationCountry: string;
    currency: $Enums.Currency;
    separateTotalMinor: bigint | number;
    combinedTotalMinor: bigint | number;
    createdAt?: Date | string;
};
export type ConsolidationUpdateWithoutBuyerCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.EnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quotes?: Prisma.LogisticsQuoteUpdateManyWithoutConsolidationNestedInput;
    shipments?: Prisma.LogisticsShipmentUpdateManyWithoutConsolidationNestedInput;
};
export type ConsolidationUncheckedUpdateWithoutBuyerCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.EnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    quotes?: Prisma.LogisticsQuoteUncheckedUpdateManyWithoutConsolidationNestedInput;
    shipments?: Prisma.LogisticsShipmentUncheckedUpdateManyWithoutConsolidationNestedInput;
};
export type ConsolidationUncheckedUpdateManyWithoutBuyerCompanyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    mode?: Prisma.EnumLogisticsModeFieldUpdateOperationsInput | $Enums.LogisticsMode;
    destinationCountry?: Prisma.StringFieldUpdateOperationsInput | string;
    currency?: Prisma.EnumCurrencyFieldUpdateOperationsInput | $Enums.Currency;
    separateTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    combinedTotalMinor?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsolidationCountOutputType = {
    quotes: number;
    shipments: number;
};
export type ConsolidationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quotes?: boolean | ConsolidationCountOutputTypeCountQuotesArgs;
    shipments?: boolean | ConsolidationCountOutputTypeCountShipmentsArgs;
};
export type ConsolidationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationCountOutputTypeSelect<ExtArgs> | null;
};
export type ConsolidationCountOutputTypeCountQuotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsQuoteWhereInput;
};
export type ConsolidationCountOutputTypeCountShipmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsShipmentWhereInput;
};
export type ConsolidationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    buyerCompanyId?: boolean;
    mode?: boolean;
    destinationCountry?: boolean;
    currency?: boolean;
    separateTotalMinor?: boolean;
    combinedTotalMinor?: boolean;
    createdAt?: boolean;
    buyerCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    quotes?: boolean | Prisma.Consolidation$quotesArgs<ExtArgs>;
    shipments?: boolean | Prisma.Consolidation$shipmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.ConsolidationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["consolidation"]>;
export type ConsolidationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    buyerCompanyId?: boolean;
    mode?: boolean;
    destinationCountry?: boolean;
    currency?: boolean;
    separateTotalMinor?: boolean;
    combinedTotalMinor?: boolean;
    createdAt?: boolean;
    buyerCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["consolidation"]>;
export type ConsolidationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    buyerCompanyId?: boolean;
    mode?: boolean;
    destinationCountry?: boolean;
    currency?: boolean;
    separateTotalMinor?: boolean;
    combinedTotalMinor?: boolean;
    createdAt?: boolean;
    buyerCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["consolidation"]>;
export type ConsolidationSelectScalar = {
    id?: boolean;
    code?: boolean;
    buyerCompanyId?: boolean;
    mode?: boolean;
    destinationCountry?: boolean;
    currency?: boolean;
    separateTotalMinor?: boolean;
    combinedTotalMinor?: boolean;
    createdAt?: boolean;
};
export type ConsolidationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "buyerCompanyId" | "mode" | "destinationCountry" | "currency" | "separateTotalMinor" | "combinedTotalMinor" | "createdAt", ExtArgs["result"]["consolidation"]>;
export type ConsolidationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    buyerCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
    quotes?: boolean | Prisma.Consolidation$quotesArgs<ExtArgs>;
    shipments?: boolean | Prisma.Consolidation$shipmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.ConsolidationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ConsolidationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    buyerCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
};
export type ConsolidationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    buyerCompany?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
};
export type $ConsolidationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Consolidation";
    objects: {
        buyerCompany: Prisma.$CompanyPayload<ExtArgs>;
        quotes: Prisma.$LogisticsQuotePayload<ExtArgs>[];
        shipments: Prisma.$LogisticsShipmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        buyerCompanyId: string;
        mode: $Enums.LogisticsMode;
        destinationCountry: string;
        currency: $Enums.Currency;
        separateTotalMinor: bigint;
        combinedTotalMinor: bigint;
        createdAt: Date;
    }, ExtArgs["result"]["consolidation"]>;
    composites: {};
};
export type ConsolidationGetPayload<S extends boolean | null | undefined | ConsolidationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload, S>;
export type ConsolidationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConsolidationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConsolidationCountAggregateInputType | true;
};
export interface ConsolidationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Consolidation'];
        meta: {
            name: 'Consolidation';
        };
    };
    findUnique<T extends ConsolidationFindUniqueArgs>(args: Prisma.SelectSubset<T, ConsolidationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConsolidationClient<runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConsolidationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConsolidationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConsolidationClient<runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConsolidationFindFirstArgs>(args?: Prisma.SelectSubset<T, ConsolidationFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConsolidationClient<runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConsolidationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConsolidationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConsolidationClient<runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConsolidationFindManyArgs>(args?: Prisma.SelectSubset<T, ConsolidationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConsolidationCreateArgs>(args: Prisma.SelectSubset<T, ConsolidationCreateArgs<ExtArgs>>): Prisma.Prisma__ConsolidationClient<runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConsolidationCreateManyArgs>(args?: Prisma.SelectSubset<T, ConsolidationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConsolidationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConsolidationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConsolidationDeleteArgs>(args: Prisma.SelectSubset<T, ConsolidationDeleteArgs<ExtArgs>>): Prisma.Prisma__ConsolidationClient<runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConsolidationUpdateArgs>(args: Prisma.SelectSubset<T, ConsolidationUpdateArgs<ExtArgs>>): Prisma.Prisma__ConsolidationClient<runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConsolidationDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConsolidationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConsolidationUpdateManyArgs>(args: Prisma.SelectSubset<T, ConsolidationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConsolidationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConsolidationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConsolidationUpsertArgs>(args: Prisma.SelectSubset<T, ConsolidationUpsertArgs<ExtArgs>>): Prisma.Prisma__ConsolidationClient<runtime.Types.Result.GetResult<Prisma.$ConsolidationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConsolidationCountArgs>(args?: Prisma.Subset<T, ConsolidationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConsolidationCountAggregateOutputType> : number>;
    aggregate<T extends ConsolidationAggregateArgs>(args: Prisma.Subset<T, ConsolidationAggregateArgs>): Prisma.PrismaPromise<GetConsolidationAggregateType<T>>;
    groupBy<T extends ConsolidationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConsolidationGroupByArgs['orderBy'];
    } : {
        orderBy?: ConsolidationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConsolidationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsolidationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConsolidationFieldRefs;
}
export interface Prisma__ConsolidationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    buyerCompany<T extends Prisma.CompanyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CompanyDefaultArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    quotes<T extends Prisma.Consolidation$quotesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Consolidation$quotesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsQuotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    shipments<T extends Prisma.Consolidation$shipmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Consolidation$shipmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsShipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConsolidationFieldRefs {
    readonly id: Prisma.FieldRef<"Consolidation", 'String'>;
    readonly code: Prisma.FieldRef<"Consolidation", 'String'>;
    readonly buyerCompanyId: Prisma.FieldRef<"Consolidation", 'String'>;
    readonly mode: Prisma.FieldRef<"Consolidation", 'LogisticsMode'>;
    readonly destinationCountry: Prisma.FieldRef<"Consolidation", 'String'>;
    readonly currency: Prisma.FieldRef<"Consolidation", 'Currency'>;
    readonly separateTotalMinor: Prisma.FieldRef<"Consolidation", 'BigInt'>;
    readonly combinedTotalMinor: Prisma.FieldRef<"Consolidation", 'BigInt'>;
    readonly createdAt: Prisma.FieldRef<"Consolidation", 'DateTime'>;
}
export type ConsolidationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelect<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    include?: Prisma.ConsolidationInclude<ExtArgs> | null;
    where: Prisma.ConsolidationWhereUniqueInput;
};
export type ConsolidationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelect<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    include?: Prisma.ConsolidationInclude<ExtArgs> | null;
    where: Prisma.ConsolidationWhereUniqueInput;
};
export type ConsolidationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelect<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    include?: Prisma.ConsolidationInclude<ExtArgs> | null;
    where?: Prisma.ConsolidationWhereInput;
    orderBy?: Prisma.ConsolidationOrderByWithRelationInput | Prisma.ConsolidationOrderByWithRelationInput[];
    cursor?: Prisma.ConsolidationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsolidationScalarFieldEnum | Prisma.ConsolidationScalarFieldEnum[];
};
export type ConsolidationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelect<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    include?: Prisma.ConsolidationInclude<ExtArgs> | null;
    where?: Prisma.ConsolidationWhereInput;
    orderBy?: Prisma.ConsolidationOrderByWithRelationInput | Prisma.ConsolidationOrderByWithRelationInput[];
    cursor?: Prisma.ConsolidationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsolidationScalarFieldEnum | Prisma.ConsolidationScalarFieldEnum[];
};
export type ConsolidationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelect<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    include?: Prisma.ConsolidationInclude<ExtArgs> | null;
    where?: Prisma.ConsolidationWhereInput;
    orderBy?: Prisma.ConsolidationOrderByWithRelationInput | Prisma.ConsolidationOrderByWithRelationInput[];
    cursor?: Prisma.ConsolidationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsolidationScalarFieldEnum | Prisma.ConsolidationScalarFieldEnum[];
};
export type ConsolidationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelect<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    include?: Prisma.ConsolidationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsolidationCreateInput, Prisma.ConsolidationUncheckedCreateInput>;
};
export type ConsolidationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConsolidationCreateManyInput | Prisma.ConsolidationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConsolidationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    data: Prisma.ConsolidationCreateManyInput | Prisma.ConsolidationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ConsolidationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ConsolidationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelect<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    include?: Prisma.ConsolidationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsolidationUpdateInput, Prisma.ConsolidationUncheckedUpdateInput>;
    where: Prisma.ConsolidationWhereUniqueInput;
};
export type ConsolidationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConsolidationUpdateManyMutationInput, Prisma.ConsolidationUncheckedUpdateManyInput>;
    where?: Prisma.ConsolidationWhereInput;
    limit?: number;
};
export type ConsolidationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsolidationUpdateManyMutationInput, Prisma.ConsolidationUncheckedUpdateManyInput>;
    where?: Prisma.ConsolidationWhereInput;
    limit?: number;
    include?: Prisma.ConsolidationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ConsolidationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelect<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    include?: Prisma.ConsolidationInclude<ExtArgs> | null;
    where: Prisma.ConsolidationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConsolidationCreateInput, Prisma.ConsolidationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConsolidationUpdateInput, Prisma.ConsolidationUncheckedUpdateInput>;
};
export type ConsolidationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelect<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    include?: Prisma.ConsolidationInclude<ExtArgs> | null;
    where: Prisma.ConsolidationWhereUniqueInput;
};
export type ConsolidationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsolidationWhereInput;
    limit?: number;
};
export type Consolidation$quotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsQuoteSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsQuoteOmit<ExtArgs> | null;
    include?: Prisma.LogisticsQuoteInclude<ExtArgs> | null;
    where?: Prisma.LogisticsQuoteWhereInput;
    orderBy?: Prisma.LogisticsQuoteOrderByWithRelationInput | Prisma.LogisticsQuoteOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsQuoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsQuoteScalarFieldEnum | Prisma.LogisticsQuoteScalarFieldEnum[];
};
export type Consolidation$shipmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LogisticsShipmentSelect<ExtArgs> | null;
    omit?: Prisma.LogisticsShipmentOmit<ExtArgs> | null;
    include?: Prisma.LogisticsShipmentInclude<ExtArgs> | null;
    where?: Prisma.LogisticsShipmentWhereInput;
    orderBy?: Prisma.LogisticsShipmentOrderByWithRelationInput | Prisma.LogisticsShipmentOrderByWithRelationInput[];
    cursor?: Prisma.LogisticsShipmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LogisticsShipmentScalarFieldEnum | Prisma.LogisticsShipmentScalarFieldEnum[];
};
export type ConsolidationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsolidationSelect<ExtArgs> | null;
    omit?: Prisma.ConsolidationOmit<ExtArgs> | null;
    include?: Prisma.ConsolidationInclude<ExtArgs> | null;
};
