import type * as runtime from "@prisma/client/runtime/client";
import * as $Enums from "./enums.js";
import type * as Prisma from "./internal/prismaNamespace.js";
export type UuidFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidFilter<$PrismaModel> | string;
};
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleFilter<$PrismaModel> | $Enums.Role;
};
export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidNullableFilter<$PrismaModel> | string | null;
};
export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type EnumTextChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.TextChannel | Prisma.EnumTextChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.TextChannel[] | Prisma.ListEnumTextChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TextChannel[] | Prisma.ListEnumTextChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTextChannelFilter<$PrismaModel> | $Enums.TextChannel;
};
export type EnumCurrencyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | Prisma.EnumCurrencyFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCurrencyNullableFilter<$PrismaModel> | $Enums.Currency | null;
};
export type EnumCompanyRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyRole | Prisma.EnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CompanyRole[] | Prisma.ListEnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CompanyRole[] | Prisma.ListEnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCompanyRoleNullableFilter<$PrismaModel> | $Enums.CompanyRole | null;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
};
export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type EnumTextChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TextChannel | Prisma.EnumTextChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.TextChannel[] | Prisma.ListEnumTextChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TextChannel[] | Prisma.ListEnumTextChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTextChannelWithAggregatesFilter<$PrismaModel> | $Enums.TextChannel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTextChannelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTextChannelFilter<$PrismaModel>;
};
export type EnumCurrencyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | Prisma.EnumCurrencyFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCurrencyNullableWithAggregatesFilter<$PrismaModel> | $Enums.Currency | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCurrencyNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCurrencyNullableFilter<$PrismaModel>;
};
export type EnumCompanyRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyRole | Prisma.EnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CompanyRole[] | Prisma.ListEnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CompanyRole[] | Prisma.ListEnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCompanyRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.CompanyRole | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCompanyRoleNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCompanyRoleNullableFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type EnumUserTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserTokenType | Prisma.EnumUserTokenTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserTokenType[] | Prisma.ListEnumUserTokenTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserTokenType[] | Prisma.ListEnumUserTokenTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserTokenTypeFilter<$PrismaModel> | $Enums.UserTokenType;
};
export type EnumUserTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserTokenType | Prisma.EnumUserTokenTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserTokenType[] | Prisma.ListEnumUserTokenTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserTokenType[] | Prisma.ListEnumUserTokenTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserTokenType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserTokenTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserTokenTypeFilter<$PrismaModel>;
};
export type EnumCompanyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyType | Prisma.EnumCompanyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CompanyType[] | Prisma.ListEnumCompanyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CompanyType[] | Prisma.ListEnumCompanyTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCompanyTypeFilter<$PrismaModel> | $Enums.CompanyType;
};
export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type EnumOnboardingStepFilter<$PrismaModel = never> = {
    equals?: $Enums.OnboardingStep | Prisma.EnumOnboardingStepFieldRefInput<$PrismaModel>;
    in?: $Enums.OnboardingStep[] | Prisma.ListEnumOnboardingStepFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OnboardingStep[] | Prisma.ListEnumOnboardingStepFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOnboardingStepFilter<$PrismaModel> | $Enums.OnboardingStep;
};
export type EnumKycStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | Prisma.EnumKycStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.KycStatus[] | Prisma.ListEnumKycStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.KycStatus[] | Prisma.ListEnumKycStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumKycStatusFilter<$PrismaModel> | $Enums.KycStatus;
};
export type EnumCompanyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyType | Prisma.EnumCompanyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CompanyType[] | Prisma.ListEnumCompanyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CompanyType[] | Prisma.ListEnumCompanyTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCompanyTypeWithAggregatesFilter<$PrismaModel> | $Enums.CompanyType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCompanyTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCompanyTypeFilter<$PrismaModel>;
};
export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type EnumOnboardingStepWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OnboardingStep | Prisma.EnumOnboardingStepFieldRefInput<$PrismaModel>;
    in?: $Enums.OnboardingStep[] | Prisma.ListEnumOnboardingStepFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OnboardingStep[] | Prisma.ListEnumOnboardingStepFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOnboardingStepWithAggregatesFilter<$PrismaModel> | $Enums.OnboardingStep;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOnboardingStepFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOnboardingStepFilter<$PrismaModel>;
};
export type EnumKycStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | Prisma.EnumKycStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.KycStatus[] | Prisma.ListEnumKycStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.KycStatus[] | Prisma.ListEnumKycStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumKycStatusWithAggregatesFilter<$PrismaModel> | $Enums.KycStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumKycStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumKycStatusFilter<$PrismaModel>;
};
export type EnumCompanyDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyDocumentType | Prisma.EnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CompanyDocumentType[] | Prisma.ListEnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CompanyDocumentType[] | Prisma.ListEnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCompanyDocumentTypeFilter<$PrismaModel> | $Enums.CompanyDocumentType;
};
export type EnumReviewStateFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewState | Prisma.EnumReviewStateFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewState[] | Prisma.ListEnumReviewStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewState[] | Prisma.ListEnumReviewStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStateFilter<$PrismaModel> | $Enums.ReviewState;
};
export type EnumCompanyDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyDocumentType | Prisma.EnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CompanyDocumentType[] | Prisma.ListEnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CompanyDocumentType[] | Prisma.ListEnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCompanyDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.CompanyDocumentType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCompanyDocumentTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCompanyDocumentTypeFilter<$PrismaModel>;
};
export type EnumReviewStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewState | Prisma.EnumReviewStateFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewState[] | Prisma.ListEnumReviewStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewState[] | Prisma.ListEnumReviewStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStateWithAggregatesFilter<$PrismaModel> | $Enums.ReviewState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewStateFilter<$PrismaModel>;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type EnumBuyerBusinessTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.BuyerBusinessType | Prisma.EnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.BuyerBusinessType[] | Prisma.ListEnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.BuyerBusinessType[] | Prisma.ListEnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumBuyerBusinessTypeNullableFilter<$PrismaModel> | $Enums.BuyerBusinessType | null;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type EnumBuyerBusinessTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BuyerBusinessType | Prisma.EnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.BuyerBusinessType[] | Prisma.ListEnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.BuyerBusinessType[] | Prisma.ListEnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumBuyerBusinessTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.BuyerBusinessType | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBuyerBusinessTypeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBuyerBusinessTypeNullableFilter<$PrismaModel>;
};
export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type EnumPlanTierFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTier | Prisma.EnumPlanTierFieldRefInput<$PrismaModel>;
    in?: $Enums.PlanTier[] | Prisma.ListEnumPlanTierFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PlanTier[] | Prisma.ListEnumPlanTierFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPlanTierFilter<$PrismaModel> | $Enums.PlanTier;
};
export type JsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
};
export type EnumPlanTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTier | Prisma.EnumPlanTierFieldRefInput<$PrismaModel>;
    in?: $Enums.PlanTier[] | Prisma.ListEnumPlanTierFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PlanTier[] | Prisma.ListEnumPlanTierFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPlanTierWithAggregatesFilter<$PrismaModel> | $Enums.PlanTier;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPlanTierFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPlanTierFilter<$PrismaModel>;
};
export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
};
export type EnumCertificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationType | Prisma.EnumCertificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CertificationType[] | Prisma.ListEnumCertificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CertificationType[] | Prisma.ListEnumCertificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCertificationTypeFilter<$PrismaModel> | $Enums.CertificationType;
};
export type EnumCertificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationStatus | Prisma.EnumCertificationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CertificationStatus[] | Prisma.ListEnumCertificationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CertificationStatus[] | Prisma.ListEnumCertificationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCertificationStatusFilter<$PrismaModel> | $Enums.CertificationStatus;
};
export type EnumCertificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationType | Prisma.EnumCertificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CertificationType[] | Prisma.ListEnumCertificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CertificationType[] | Prisma.ListEnumCertificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCertificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.CertificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCertificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCertificationTypeFilter<$PrismaModel>;
};
export type EnumCertificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationStatus | Prisma.EnumCertificationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CertificationStatus[] | Prisma.ListEnumCertificationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CertificationStatus[] | Prisma.ListEnumCertificationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCertificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.CertificationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCertificationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCertificationStatusFilter<$PrismaModel>;
};
export type EnumCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | Prisma.EnumCurrencyFieldRefInput<$PrismaModel>;
    in?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCurrencyFilter<$PrismaModel> | $Enums.Currency;
};
export type EnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | Prisma.EnumProductStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductStatus[] | Prisma.ListEnumProductStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductStatus[] | Prisma.ListEnumProductStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus;
};
export type EnumCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | Prisma.EnumCurrencyFieldRefInput<$PrismaModel>;
    in?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.Currency;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCurrencyFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCurrencyFilter<$PrismaModel>;
};
export type EnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | Prisma.EnumProductStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductStatus[] | Prisma.ListEnumProductStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductStatus[] | Prisma.ListEnumProductStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProductStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProductStatusFilter<$PrismaModel>;
};
export type EnumMediaReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaReviewStatus | Prisma.EnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaReviewStatus[] | Prisma.ListEnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaReviewStatus[] | Prisma.ListEnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaReviewStatusFilter<$PrismaModel> | $Enums.MediaReviewStatus;
};
export type EnumMediaReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaReviewStatus | Prisma.EnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaReviewStatus[] | Prisma.ListEnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaReviewStatus[] | Prisma.ListEnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.MediaReviewStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMediaReviewStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMediaReviewStatusFilter<$PrismaModel>;
};
export type EnumIncotermNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Incoterm | Prisma.EnumIncotermFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumIncotermNullableFilter<$PrismaModel> | $Enums.Incoterm | null;
};
export type EnumRfqStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqStatus | Prisma.EnumRfqStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqStatus[] | Prisma.ListEnumRfqStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqStatus[] | Prisma.ListEnumRfqStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqStatusFilter<$PrismaModel> | $Enums.RfqStatus;
};
export type EnumIncotermNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Incoterm | Prisma.EnumIncotermFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumIncotermNullableWithAggregatesFilter<$PrismaModel> | $Enums.Incoterm | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumIncotermNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumIncotermNullableFilter<$PrismaModel>;
};
export type EnumRfqStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqStatus | Prisma.EnumRfqStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqStatus[] | Prisma.ListEnumRfqStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqStatus[] | Prisma.ListEnumRfqStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqStatusWithAggregatesFilter<$PrismaModel> | $Enums.RfqStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRfqStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRfqStatusFilter<$PrismaModel>;
};
export type EnumRfqInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqInvitationStatus | Prisma.EnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqInvitationStatus[] | Prisma.ListEnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqInvitationStatus[] | Prisma.ListEnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqInvitationStatusFilter<$PrismaModel> | $Enums.RfqInvitationStatus;
};
export type EnumRfqInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqInvitationStatus | Prisma.EnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqInvitationStatus[] | Prisma.ListEnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqInvitationStatus[] | Prisma.ListEnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RfqInvitationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRfqInvitationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRfqInvitationStatusFilter<$PrismaModel>;
};
export type EnumRfqAttachmentKindFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqAttachmentKind | Prisma.EnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqAttachmentKind[] | Prisma.ListEnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqAttachmentKind[] | Prisma.ListEnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqAttachmentKindFilter<$PrismaModel> | $Enums.RfqAttachmentKind;
};
export type EnumRfqAttachmentKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqAttachmentKind | Prisma.EnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqAttachmentKind[] | Prisma.ListEnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqAttachmentKind[] | Prisma.ListEnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqAttachmentKindWithAggregatesFilter<$PrismaModel> | $Enums.RfqAttachmentKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRfqAttachmentKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRfqAttachmentKindFilter<$PrismaModel>;
};
export type EnumQuoteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuoteStatus | Prisma.EnumQuoteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.QuoteStatus[] | Prisma.ListEnumQuoteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuoteStatus[] | Prisma.ListEnumQuoteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuoteStatusFilter<$PrismaModel> | $Enums.QuoteStatus;
};
export type EnumQuoteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuoteStatus | Prisma.EnumQuoteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.QuoteStatus[] | Prisma.ListEnumQuoteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuoteStatus[] | Prisma.ListEnumQuoteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuoteStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuoteStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuoteStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuoteStatusFilter<$PrismaModel>;
};
export type EnumConversationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | Prisma.EnumConversationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ConversationType[] | Prisma.ListEnumConversationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ConversationType[] | Prisma.ListEnumConversationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumConversationTypeFilter<$PrismaModel> | $Enums.ConversationType;
};
export type EnumConversationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | Prisma.EnumConversationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ConversationType[] | Prisma.ListEnumConversationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ConversationType[] | Prisma.ListEnumConversationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumConversationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConversationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumConversationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumConversationTypeFilter<$PrismaModel>;
};
export type EnumModerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | Prisma.EnumModerationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationStatus[] | Prisma.ListEnumModerationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationStatus[] | Prisma.ListEnumModerationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationStatusFilter<$PrismaModel> | $Enums.ModerationStatus;
};
export type EnumModerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | Prisma.EnumModerationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationStatus[] | Prisma.ListEnumModerationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationStatus[] | Prisma.ListEnumModerationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ModerationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumModerationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumModerationStatusFilter<$PrismaModel>;
};
export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntFilter<$PrismaModel> | bigint | number;
};
export type EnumIncotermFilter<$PrismaModel = never> = {
    equals?: $Enums.Incoterm | Prisma.EnumIncotermFieldRefInput<$PrismaModel>;
    in?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumIncotermFilter<$PrismaModel> | $Enums.Incoterm;
};
export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | Prisma.EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
};
export type EnumOrderStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | Prisma.EnumOrderStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumOrderStatusNullableFilter<$PrismaModel> | $Enums.OrderStatus | null;
};
export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedBigIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBigIntFilter<$PrismaModel>;
    _max?: Prisma.NestedBigIntFilter<$PrismaModel>;
};
export type EnumIncotermWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Incoterm | Prisma.EnumIncotermFieldRefInput<$PrismaModel>;
    in?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumIncotermWithAggregatesFilter<$PrismaModel> | $Enums.Incoterm;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumIncotermFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumIncotermFilter<$PrismaModel>;
};
export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | Prisma.EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOrderStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOrderStatusFilter<$PrismaModel>;
};
export type EnumOrderStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | Prisma.EnumOrderStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumOrderStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOrderStatusNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOrderStatusNullableFilter<$PrismaModel>;
};
export type EnumMilestoneStageFilter<$PrismaModel = never> = {
    equals?: $Enums.MilestoneStage | Prisma.EnumMilestoneStageFieldRefInput<$PrismaModel>;
    in?: $Enums.MilestoneStage[] | Prisma.ListEnumMilestoneStageFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MilestoneStage[] | Prisma.ListEnumMilestoneStageFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMilestoneStageFilter<$PrismaModel> | $Enums.MilestoneStage;
};
export type EnumMilestoneStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MilestoneStatus | Prisma.EnumMilestoneStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MilestoneStatus[] | Prisma.ListEnumMilestoneStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MilestoneStatus[] | Prisma.ListEnumMilestoneStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMilestoneStatusFilter<$PrismaModel> | $Enums.MilestoneStatus;
};
export type EnumMilestoneStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MilestoneStage | Prisma.EnumMilestoneStageFieldRefInput<$PrismaModel>;
    in?: $Enums.MilestoneStage[] | Prisma.ListEnumMilestoneStageFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MilestoneStage[] | Prisma.ListEnumMilestoneStageFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMilestoneStageWithAggregatesFilter<$PrismaModel> | $Enums.MilestoneStage;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMilestoneStageFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMilestoneStageFilter<$PrismaModel>;
};
export type EnumMilestoneStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MilestoneStatus | Prisma.EnumMilestoneStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MilestoneStatus[] | Prisma.ListEnumMilestoneStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MilestoneStatus[] | Prisma.ListEnumMilestoneStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMilestoneStatusWithAggregatesFilter<$PrismaModel> | $Enums.MilestoneStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMilestoneStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMilestoneStatusFilter<$PrismaModel>;
};
export type EnumSampleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SampleType | Prisma.EnumSampleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SampleType[] | Prisma.ListEnumSampleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SampleType[] | Prisma.ListEnumSampleTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSampleTypeFilter<$PrismaModel> | $Enums.SampleType;
};
export type EnumSampleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SampleStatus | Prisma.EnumSampleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SampleStatus[] | Prisma.ListEnumSampleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SampleStatus[] | Prisma.ListEnumSampleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSampleStatusFilter<$PrismaModel> | $Enums.SampleStatus;
};
export type EnumSampleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SampleType | Prisma.EnumSampleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SampleType[] | Prisma.ListEnumSampleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SampleType[] | Prisma.ListEnumSampleTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSampleTypeWithAggregatesFilter<$PrismaModel> | $Enums.SampleType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSampleTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSampleTypeFilter<$PrismaModel>;
};
export type EnumSampleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SampleStatus | Prisma.EnumSampleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SampleStatus[] | Prisma.ListEnumSampleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SampleStatus[] | Prisma.ListEnumSampleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSampleStatusWithAggregatesFilter<$PrismaModel> | $Enums.SampleStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSampleStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSampleStatusFilter<$PrismaModel>;
};
export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel> | null;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel> | null;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel> | null;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null;
};
export type EnumPaymentDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentDirection | Prisma.EnumPaymentDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentDirection[] | Prisma.ListEnumPaymentDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentDirection[] | Prisma.ListEnumPaymentDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentDirectionFilter<$PrismaModel> | $Enums.PaymentDirection;
};
export type EnumPaymentPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentPurpose | Prisma.EnumPaymentPurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentPurpose[] | Prisma.ListEnumPaymentPurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentPurpose[] | Prisma.ListEnumPaymentPurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentPurposeFilter<$PrismaModel> | $Enums.PaymentPurpose;
};
export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod;
};
export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
};
export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel> | null;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel> | null;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel> | null;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedBigIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedBigIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedBigIntNullableFilter<$PrismaModel>;
};
export type EnumPaymentDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentDirection | Prisma.EnumPaymentDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentDirection[] | Prisma.ListEnumPaymentDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentDirection[] | Prisma.ListEnumPaymentDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentDirectionWithAggregatesFilter<$PrismaModel> | $Enums.PaymentDirection;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentDirectionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentDirectionFilter<$PrismaModel>;
};
export type EnumPaymentPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentPurpose | Prisma.EnumPaymentPurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentPurpose[] | Prisma.ListEnumPaymentPurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentPurpose[] | Prisma.ListEnumPaymentPurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentPurposeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentPurpose;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentPurposeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentPurposeFilter<$PrismaModel>;
};
export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
};
export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
};
export type EnumLedgerAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerAccountType | Prisma.EnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LedgerAccountType[] | Prisma.ListEnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LedgerAccountType[] | Prisma.ListEnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLedgerAccountTypeFilter<$PrismaModel> | $Enums.LedgerAccountType;
};
export type EnumLedgerAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerAccountType | Prisma.EnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LedgerAccountType[] | Prisma.ListEnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LedgerAccountType[] | Prisma.ListEnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLedgerAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.LedgerAccountType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLedgerAccountTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLedgerAccountTypeFilter<$PrismaModel>;
};
export type EnumLedgerTransactionKindFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerTransactionKind | Prisma.EnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LedgerTransactionKind[] | Prisma.ListEnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LedgerTransactionKind[] | Prisma.ListEnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLedgerTransactionKindFilter<$PrismaModel> | $Enums.LedgerTransactionKind;
};
export type DecimalFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type EnumLedgerTransactionKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerTransactionKind | Prisma.EnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LedgerTransactionKind[] | Prisma.ListEnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LedgerTransactionKind[] | Prisma.ListEnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLedgerTransactionKindWithAggregatesFilter<$PrismaModel> | $Enums.LedgerTransactionKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLedgerTransactionKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLedgerTransactionKindFilter<$PrismaModel>;
};
export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalFilter<$PrismaModel>;
};
export type EnumEntryDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryDirection | Prisma.EnumEntryDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.EntryDirection[] | Prisma.ListEnumEntryDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EntryDirection[] | Prisma.ListEnumEntryDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEntryDirectionFilter<$PrismaModel> | $Enums.EntryDirection;
};
export type EnumEntryDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryDirection | Prisma.EnumEntryDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.EntryDirection[] | Prisma.ListEnumEntryDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EntryDirection[] | Prisma.ListEnumEntryDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEntryDirectionWithAggregatesFilter<$PrismaModel> | $Enums.EntryDirection;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumEntryDirectionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumEntryDirectionFilter<$PrismaModel>;
};
export type EnumInspectionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectionType | Prisma.EnumInspectionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectionType[] | Prisma.ListEnumInspectionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectionType[] | Prisma.ListEnumInspectionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectionTypeFilter<$PrismaModel> | $Enums.InspectionType;
};
export type EnumInspectionResultFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectionResult | Prisma.EnumInspectionResultFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectionResult[] | Prisma.ListEnumInspectionResultFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectionResult[] | Prisma.ListEnumInspectionResultFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectionResultFilter<$PrismaModel> | $Enums.InspectionResult;
};
export type EnumInspectionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectionType | Prisma.EnumInspectionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectionType[] | Prisma.ListEnumInspectionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectionType[] | Prisma.ListEnumInspectionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectionTypeWithAggregatesFilter<$PrismaModel> | $Enums.InspectionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInspectionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInspectionTypeFilter<$PrismaModel>;
};
export type EnumInspectionResultWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectionResult | Prisma.EnumInspectionResultFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectionResult[] | Prisma.ListEnumInspectionResultFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectionResult[] | Prisma.ListEnumInspectionResultFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectionResultWithAggregatesFilter<$PrismaModel> | $Enums.InspectionResult;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInspectionResultFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInspectionResultFilter<$PrismaModel>;
};
export type EnumReviewDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewDirection | Prisma.EnumReviewDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewDirection[] | Prisma.ListEnumReviewDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewDirection[] | Prisma.ListEnumReviewDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewDirectionFilter<$PrismaModel> | $Enums.ReviewDirection;
};
export type EnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus;
};
export type EnumReviewDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewDirection | Prisma.EnumReviewDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewDirection[] | Prisma.ListEnumReviewDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewDirection[] | Prisma.ListEnumReviewDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewDirectionWithAggregatesFilter<$PrismaModel> | $Enums.ReviewDirection;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewDirectionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewDirectionFilter<$PrismaModel>;
};
export type EnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
};
export type EnumDisputeReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeReason | Prisma.EnumDisputeReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeReason[] | Prisma.ListEnumDisputeReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeReason[] | Prisma.ListEnumDisputeReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeReasonFilter<$PrismaModel> | $Enums.DisputeReason;
};
export type EnumDisputeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | Prisma.EnumDisputeStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel> | $Enums.DisputeStatus;
};
export type EnumDisputeReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeReason | Prisma.EnumDisputeReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeReason[] | Prisma.ListEnumDisputeReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeReason[] | Prisma.ListEnumDisputeReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeReasonWithAggregatesFilter<$PrismaModel> | $Enums.DisputeReason;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputeReasonFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputeReasonFilter<$PrismaModel>;
};
export type EnumDisputeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | Prisma.EnumDisputeStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel> | $Enums.DisputeStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel>;
};
export type EnumDisputePartyFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeParty | Prisma.EnumDisputePartyFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeParty[] | Prisma.ListEnumDisputePartyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeParty[] | Prisma.ListEnumDisputePartyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputePartyFilter<$PrismaModel> | $Enums.DisputeParty;
};
export type EnumDisputePartyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeParty | Prisma.EnumDisputePartyFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeParty[] | Prisma.ListEnumDisputePartyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeParty[] | Prisma.ListEnumDisputePartyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputePartyWithAggregatesFilter<$PrismaModel> | $Enums.DisputeParty;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputePartyFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputePartyFilter<$PrismaModel>;
};
export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type EnumNotificationCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationCategory | Prisma.EnumNotificationCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel> | $Enums.NotificationCategory;
};
export type EnumNotificationCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationCategory | Prisma.EnumNotificationCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationCategoryWithAggregatesFilter<$PrismaModel> | $Enums.NotificationCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel>;
};
export type EnumFilePurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.FilePurpose | Prisma.EnumFilePurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.FilePurpose[] | Prisma.ListEnumFilePurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.FilePurpose[] | Prisma.ListEnumFilePurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumFilePurposeFilter<$PrismaModel> | $Enums.FilePurpose;
};
export type EnumFileStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FileStatus | Prisma.EnumFileStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.FileStatus[] | Prisma.ListEnumFileStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.FileStatus[] | Prisma.ListEnumFileStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumFileStatusFilter<$PrismaModel> | $Enums.FileStatus;
};
export type EnumScanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScanStatus | Prisma.EnumScanStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ScanStatus[] | Prisma.ListEnumScanStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ScanStatus[] | Prisma.ListEnumScanStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumScanStatusFilter<$PrismaModel> | $Enums.ScanStatus;
};
export type EnumImageProcessingStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageProcessingStatus | Prisma.EnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ImageProcessingStatus[] | Prisma.ListEnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ImageProcessingStatus[] | Prisma.ListEnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumImageProcessingStatusNullableFilter<$PrismaModel> | $Enums.ImageProcessingStatus | null;
};
export type EnumFilePurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FilePurpose | Prisma.EnumFilePurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.FilePurpose[] | Prisma.ListEnumFilePurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.FilePurpose[] | Prisma.ListEnumFilePurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumFilePurposeWithAggregatesFilter<$PrismaModel> | $Enums.FilePurpose;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumFilePurposeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumFilePurposeFilter<$PrismaModel>;
};
export type EnumFileStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FileStatus | Prisma.EnumFileStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.FileStatus[] | Prisma.ListEnumFileStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.FileStatus[] | Prisma.ListEnumFileStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumFileStatusWithAggregatesFilter<$PrismaModel> | $Enums.FileStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumFileStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumFileStatusFilter<$PrismaModel>;
};
export type EnumScanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScanStatus | Prisma.EnumScanStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ScanStatus[] | Prisma.ListEnumScanStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ScanStatus[] | Prisma.ListEnumScanStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumScanStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScanStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumScanStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumScanStatusFilter<$PrismaModel>;
};
export type EnumImageProcessingStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageProcessingStatus | Prisma.EnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ImageProcessingStatus[] | Prisma.ListEnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ImageProcessingStatus[] | Prisma.ListEnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumImageProcessingStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.ImageProcessingStatus | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumImageProcessingStatusNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumImageProcessingStatusNullableFilter<$PrismaModel>;
};
export type EnumWarningLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.WarningLevel | Prisma.EnumWarningLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.WarningLevel[] | Prisma.ListEnumWarningLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WarningLevel[] | Prisma.ListEnumWarningLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWarningLevelFilter<$PrismaModel> | $Enums.WarningLevel;
};
export type EnumWarningLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WarningLevel | Prisma.EnumWarningLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.WarningLevel[] | Prisma.ListEnumWarningLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WarningLevel[] | Prisma.ListEnumWarningLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWarningLevelWithAggregatesFilter<$PrismaModel> | $Enums.WarningLevel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWarningLevelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWarningLevelFilter<$PrismaModel>;
};
export type EnumReleaseTriggerFilter<$PrismaModel = never> = {
    equals?: $Enums.ReleaseTrigger | Prisma.EnumReleaseTriggerFieldRefInput<$PrismaModel>;
    in?: $Enums.ReleaseTrigger[] | Prisma.ListEnumReleaseTriggerFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReleaseTrigger[] | Prisma.ListEnumReleaseTriggerFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReleaseTriggerFilter<$PrismaModel> | $Enums.ReleaseTrigger;
};
export type EnumReleaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReleaseStatus | Prisma.EnumReleaseStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReleaseStatus[] | Prisma.ListEnumReleaseStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReleaseStatus[] | Prisma.ListEnumReleaseStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReleaseStatusFilter<$PrismaModel> | $Enums.ReleaseStatus;
};
export type EnumReleaseTriggerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReleaseTrigger | Prisma.EnumReleaseTriggerFieldRefInput<$PrismaModel>;
    in?: $Enums.ReleaseTrigger[] | Prisma.ListEnumReleaseTriggerFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReleaseTrigger[] | Prisma.ListEnumReleaseTriggerFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReleaseTriggerWithAggregatesFilter<$PrismaModel> | $Enums.ReleaseTrigger;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReleaseTriggerFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReleaseTriggerFilter<$PrismaModel>;
};
export type EnumReleaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReleaseStatus | Prisma.EnumReleaseStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReleaseStatus[] | Prisma.ListEnumReleaseStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReleaseStatus[] | Prisma.ListEnumReleaseStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReleaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReleaseStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReleaseStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReleaseStatusFilter<$PrismaModel>;
};
export type JsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>, Required<JsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;
export type JsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type JsonWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonFilter<$PrismaModel>;
};
export type EnumProductionLineStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductionLineStatus | Prisma.EnumProductionLineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductionLineStatus[] | Prisma.ListEnumProductionLineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductionLineStatus[] | Prisma.ListEnumProductionLineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductionLineStatusFilter<$PrismaModel> | $Enums.ProductionLineStatus;
};
export type EnumProductionLineStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductionLineStatus | Prisma.EnumProductionLineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductionLineStatus[] | Prisma.ListEnumProductionLineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductionLineStatus[] | Prisma.ListEnumProductionLineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductionLineStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductionLineStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProductionLineStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProductionLineStatusFilter<$PrismaModel>;
};
export type EnumCapacitySlotStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacitySlotStatus | Prisma.EnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacitySlotStatus[] | Prisma.ListEnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacitySlotStatus[] | Prisma.ListEnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacitySlotStatusFilter<$PrismaModel> | $Enums.CapacitySlotStatus;
};
export type EnumCapacitySlotStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacitySlotStatus | Prisma.EnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacitySlotStatus[] | Prisma.ListEnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacitySlotStatus[] | Prisma.ListEnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacitySlotStatusWithAggregatesFilter<$PrismaModel> | $Enums.CapacitySlotStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacitySlotStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacitySlotStatusFilter<$PrismaModel>;
};
export type EnumSupplierClaimRegionFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimRegion | Prisma.EnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimRegion[] | Prisma.ListEnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimRegion[] | Prisma.ListEnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimRegionFilter<$PrismaModel> | $Enums.SupplierClaimRegion;
};
export type EnumSupplierClaimTierFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimTier | Prisma.EnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimTier[] | Prisma.ListEnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimTier[] | Prisma.ListEnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimTierFilter<$PrismaModel> | $Enums.SupplierClaimTier;
};
export type EnumSupplierClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimStatus | Prisma.EnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimStatus[] | Prisma.ListEnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimStatus[] | Prisma.ListEnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimStatusFilter<$PrismaModel> | $Enums.SupplierClaimStatus;
};
export type EnumSupplierClaimRegionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimRegion | Prisma.EnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimRegion[] | Prisma.ListEnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimRegion[] | Prisma.ListEnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimRegionWithAggregatesFilter<$PrismaModel> | $Enums.SupplierClaimRegion;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSupplierClaimRegionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSupplierClaimRegionFilter<$PrismaModel>;
};
export type EnumSupplierClaimTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimTier | Prisma.EnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimTier[] | Prisma.ListEnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimTier[] | Prisma.ListEnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimTierWithAggregatesFilter<$PrismaModel> | $Enums.SupplierClaimTier;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSupplierClaimTierFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSupplierClaimTierFilter<$PrismaModel>;
};
export type EnumSupplierClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimStatus | Prisma.EnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimStatus[] | Prisma.ListEnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimStatus[] | Prisma.ListEnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.SupplierClaimStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSupplierClaimStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSupplierClaimStatusFilter<$PrismaModel>;
};
export type EnumCapacityBookingKindFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingKind | Prisma.EnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityBookingKind[] | Prisma.ListEnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityBookingKind[] | Prisma.ListEnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityBookingKindFilter<$PrismaModel> | $Enums.CapacityBookingKind;
};
export type EnumCapacityBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingStatus | Prisma.EnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityBookingStatus[] | Prisma.ListEnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityBookingStatus[] | Prisma.ListEnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityBookingStatusFilter<$PrismaModel> | $Enums.CapacityBookingStatus;
};
export type EnumCapacityBookingActorNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingActor | Prisma.EnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CapacityBookingActor[] | Prisma.ListEnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CapacityBookingActor[] | Prisma.ListEnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCapacityBookingActorNullableFilter<$PrismaModel> | $Enums.CapacityBookingActor | null;
};
export type EnumCapacityConversionModeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityConversionMode | Prisma.EnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CapacityConversionMode[] | Prisma.ListEnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CapacityConversionMode[] | Prisma.ListEnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCapacityConversionModeNullableFilter<$PrismaModel> | $Enums.CapacityConversionMode | null;
};
export type EnumCapacityBookingKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingKind | Prisma.EnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityBookingKind[] | Prisma.ListEnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityBookingKind[] | Prisma.ListEnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityBookingKindWithAggregatesFilter<$PrismaModel> | $Enums.CapacityBookingKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacityBookingKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacityBookingKindFilter<$PrismaModel>;
};
export type EnumCapacityBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingStatus | Prisma.EnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityBookingStatus[] | Prisma.ListEnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityBookingStatus[] | Prisma.ListEnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.CapacityBookingStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacityBookingStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacityBookingStatusFilter<$PrismaModel>;
};
export type EnumCapacityBookingActorNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingActor | Prisma.EnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CapacityBookingActor[] | Prisma.ListEnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CapacityBookingActor[] | Prisma.ListEnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCapacityBookingActorNullableWithAggregatesFilter<$PrismaModel> | $Enums.CapacityBookingActor | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacityBookingActorNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacityBookingActorNullableFilter<$PrismaModel>;
};
export type EnumCapacityConversionModeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityConversionMode | Prisma.EnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CapacityConversionMode[] | Prisma.ListEnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CapacityConversionMode[] | Prisma.ListEnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCapacityConversionModeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CapacityConversionMode | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacityConversionModeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacityConversionModeNullableFilter<$PrismaModel>;
};
export type EnumCapacityPartnershipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityPartnershipStatus | Prisma.EnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityPartnershipStatus[] | Prisma.ListEnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityPartnershipStatus[] | Prisma.ListEnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityPartnershipStatusFilter<$PrismaModel> | $Enums.CapacityPartnershipStatus;
};
export type EnumCapacityPartnershipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityPartnershipStatus | Prisma.EnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityPartnershipStatus[] | Prisma.ListEnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityPartnershipStatus[] | Prisma.ListEnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityPartnershipStatusWithAggregatesFilter<$PrismaModel> | $Enums.CapacityPartnershipStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacityPartnershipStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacityPartnershipStatusFilter<$PrismaModel>;
};
export type EnumLogisticsPartnerKindFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsPartnerKind | Prisma.EnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsPartnerKind[] | Prisma.ListEnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsPartnerKind[] | Prisma.ListEnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsPartnerKindFilter<$PrismaModel> | $Enums.LogisticsPartnerKind;
};
export type EnumLogisticsPartnerKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsPartnerKind | Prisma.EnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsPartnerKind[] | Prisma.ListEnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsPartnerKind[] | Prisma.ListEnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsPartnerKindWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsPartnerKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsPartnerKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsPartnerKindFilter<$PrismaModel>;
};
export type EnumHubOperatorFilter<$PrismaModel = never> = {
    equals?: $Enums.HubOperator | Prisma.EnumHubOperatorFieldRefInput<$PrismaModel>;
    in?: $Enums.HubOperator[] | Prisma.ListEnumHubOperatorFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HubOperator[] | Prisma.ListEnumHubOperatorFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHubOperatorFilter<$PrismaModel> | $Enums.HubOperator;
};
export type EnumHubOperatorWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HubOperator | Prisma.EnumHubOperatorFieldRefInput<$PrismaModel>;
    in?: $Enums.HubOperator[] | Prisma.ListEnumHubOperatorFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HubOperator[] | Prisma.ListEnumHubOperatorFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHubOperatorWithAggregatesFilter<$PrismaModel> | $Enums.HubOperator;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumHubOperatorFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumHubOperatorFilter<$PrismaModel>;
};
export type EnumLogisticsModeFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsMode | Prisma.EnumLogisticsModeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsModeFilter<$PrismaModel> | $Enums.LogisticsMode;
};
export type EnumRateUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.RateUnit | Prisma.EnumRateUnitFieldRefInput<$PrismaModel>;
    in?: $Enums.RateUnit[] | Prisma.ListEnumRateUnitFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RateUnit[] | Prisma.ListEnumRateUnitFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRateUnitFilter<$PrismaModel> | $Enums.RateUnit;
};
export type EnumContainerTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ContainerType | Prisma.EnumContainerTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ContainerType[] | Prisma.ListEnumContainerTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ContainerType[] | Prisma.ListEnumContainerTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumContainerTypeNullableFilter<$PrismaModel> | $Enums.ContainerType | null;
};
export type EnumLogisticsModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsMode | Prisma.EnumLogisticsModeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsModeWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsMode;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsModeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsModeFilter<$PrismaModel>;
};
export type EnumRateUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RateUnit | Prisma.EnumRateUnitFieldRefInput<$PrismaModel>;
    in?: $Enums.RateUnit[] | Prisma.ListEnumRateUnitFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RateUnit[] | Prisma.ListEnumRateUnitFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRateUnitWithAggregatesFilter<$PrismaModel> | $Enums.RateUnit;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRateUnitFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRateUnitFilter<$PrismaModel>;
};
export type EnumContainerTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContainerType | Prisma.EnumContainerTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ContainerType[] | Prisma.ListEnumContainerTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ContainerType[] | Prisma.ListEnumContainerTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumContainerTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.ContainerType | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumContainerTypeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumContainerTypeNullableFilter<$PrismaModel>;
};
export type EnumLogisticsModeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsMode | Prisma.EnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumLogisticsModeNullableFilter<$PrismaModel> | $Enums.LogisticsMode | null;
};
export type EnumLogisticsModeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsMode | Prisma.EnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumLogisticsModeNullableWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsMode | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsModeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsModeNullableFilter<$PrismaModel>;
};
export type EnumLogisticsQuoteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsQuoteStatus | Prisma.EnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsQuoteStatus[] | Prisma.ListEnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsQuoteStatus[] | Prisma.ListEnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsQuoteStatusFilter<$PrismaModel> | $Enums.LogisticsQuoteStatus;
};
export type EnumLogisticsQuoteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsQuoteStatus | Prisma.EnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsQuoteStatus[] | Prisma.ListEnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsQuoteStatus[] | Prisma.ListEnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsQuoteStatusWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsQuoteStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsQuoteStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsQuoteStatusFilter<$PrismaModel>;
};
export type EnumPickupStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PickupStatus | Prisma.EnumPickupStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PickupStatus[] | Prisma.ListEnumPickupStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PickupStatus[] | Prisma.ListEnumPickupStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPickupStatusFilter<$PrismaModel> | $Enums.PickupStatus;
};
export type EnumPickupStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PickupStatus | Prisma.EnumPickupStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PickupStatus[] | Prisma.ListEnumPickupStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PickupStatus[] | Prisma.ListEnumPickupStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPickupStatusWithAggregatesFilter<$PrismaModel> | $Enums.PickupStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPickupStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPickupStatusFilter<$PrismaModel>;
};
export type EnumHubReceiptConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.HubReceiptCondition | Prisma.EnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    in?: $Enums.HubReceiptCondition[] | Prisma.ListEnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HubReceiptCondition[] | Prisma.ListEnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHubReceiptConditionFilter<$PrismaModel> | $Enums.HubReceiptCondition;
};
export type EnumHubReceiptConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HubReceiptCondition | Prisma.EnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    in?: $Enums.HubReceiptCondition[] | Prisma.ListEnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HubReceiptCondition[] | Prisma.ListEnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHubReceiptConditionWithAggregatesFilter<$PrismaModel> | $Enums.HubReceiptCondition;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumHubReceiptConditionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumHubReceiptConditionFilter<$PrismaModel>;
};
export type EnumLogisticsShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsShipmentStatus | Prisma.EnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsShipmentStatusFilter<$PrismaModel> | $Enums.LogisticsShipmentStatus;
};
export type EnumLogisticsShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsShipmentStatus | Prisma.EnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsShipmentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsShipmentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsShipmentStatusFilter<$PrismaModel>;
};
export type EnumShipmentLegKindFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentLegKind | Prisma.EnumShipmentLegKindFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentLegKind[] | Prisma.ListEnumShipmentLegKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentLegKind[] | Prisma.ListEnumShipmentLegKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentLegKindFilter<$PrismaModel> | $Enums.ShipmentLegKind;
};
export type EnumShipmentLegStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentLegStatus | Prisma.EnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentLegStatus[] | Prisma.ListEnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentLegStatus[] | Prisma.ListEnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentLegStatusFilter<$PrismaModel> | $Enums.ShipmentLegStatus;
};
export type EnumShipmentLegKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentLegKind | Prisma.EnumShipmentLegKindFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentLegKind[] | Prisma.ListEnumShipmentLegKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentLegKind[] | Prisma.ListEnumShipmentLegKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentLegKindWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentLegKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumShipmentLegKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumShipmentLegKindFilter<$PrismaModel>;
};
export type EnumShipmentLegStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentLegStatus | Prisma.EnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentLegStatus[] | Prisma.ListEnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentLegStatus[] | Prisma.ListEnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentLegStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentLegStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumShipmentLegStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumShipmentLegStatusFilter<$PrismaModel>;
};
export type EnumLogisticsShipmentStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsShipmentStatus | Prisma.EnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumLogisticsShipmentStatusNullableFilter<$PrismaModel> | $Enums.LogisticsShipmentStatus | null;
};
export type EnumShipmentEventSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentEventSource | Prisma.EnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentEventSource[] | Prisma.ListEnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentEventSource[] | Prisma.ListEnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentEventSourceFilter<$PrismaModel> | $Enums.ShipmentEventSource;
};
export type EnumLogisticsShipmentStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsShipmentStatus | Prisma.EnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumLogisticsShipmentStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsShipmentStatus | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsShipmentStatusNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsShipmentStatusNullableFilter<$PrismaModel>;
};
export type EnumShipmentEventSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentEventSource | Prisma.EnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentEventSource[] | Prisma.ListEnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentEventSource[] | Prisma.ListEnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentEventSourceWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentEventSource;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumShipmentEventSourceFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumShipmentEventSourceFilter<$PrismaModel>;
};
export type EnumLogisticsDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsDocumentType | Prisma.EnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsDocumentType[] | Prisma.ListEnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsDocumentType[] | Prisma.ListEnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsDocumentTypeFilter<$PrismaModel> | $Enums.LogisticsDocumentType;
};
export type EnumLogisticsDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsDocumentType | Prisma.EnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsDocumentType[] | Prisma.ListEnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsDocumentType[] | Prisma.ListEnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsDocumentType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsDocumentTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsDocumentTypeFilter<$PrismaModel>;
};
export type EnumShipmentUploadKindFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentUploadKind | Prisma.EnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentUploadKind[] | Prisma.ListEnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentUploadKind[] | Prisma.ListEnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentUploadKindFilter<$PrismaModel> | $Enums.ShipmentUploadKind;
};
export type EnumShipmentUploadKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentUploadKind | Prisma.EnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentUploadKind[] | Prisma.ListEnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentUploadKind[] | Prisma.ListEnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentUploadKindWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentUploadKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumShipmentUploadKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumShipmentUploadKindFilter<$PrismaModel>;
};
export type EnumLogisticsClaimTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsClaimType | Prisma.EnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsClaimType[] | Prisma.ListEnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsClaimType[] | Prisma.ListEnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsClaimTypeFilter<$PrismaModel> | $Enums.LogisticsClaimType;
};
export type EnumLogisticsClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsClaimStatus | Prisma.EnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsClaimStatus[] | Prisma.ListEnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsClaimStatus[] | Prisma.ListEnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsClaimStatusFilter<$PrismaModel> | $Enums.LogisticsClaimStatus;
};
export type EnumLogisticsClaimTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsClaimType | Prisma.EnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsClaimType[] | Prisma.ListEnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsClaimType[] | Prisma.ListEnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsClaimTypeWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsClaimType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsClaimTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsClaimTypeFilter<$PrismaModel>;
};
export type EnumLogisticsClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsClaimStatus | Prisma.EnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsClaimStatus[] | Prisma.ListEnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsClaimStatus[] | Prisma.ListEnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsClaimStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsClaimStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsClaimStatusFilter<$PrismaModel>;
};
export type EnumOrderChargeKindFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderChargeKind | Prisma.EnumOrderChargeKindFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderChargeKind[] | Prisma.ListEnumOrderChargeKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderChargeKind[] | Prisma.ListEnumOrderChargeKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderChargeKindFilter<$PrismaModel> | $Enums.OrderChargeKind;
};
export type EnumOrderChargeKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderChargeKind | Prisma.EnumOrderChargeKindFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderChargeKind[] | Prisma.ListEnumOrderChargeKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderChargeKind[] | Prisma.ListEnumOrderChargeKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderChargeKindWithAggregatesFilter<$PrismaModel> | $Enums.OrderChargeKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOrderChargeKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOrderChargeKindFilter<$PrismaModel>;
};
export type EnumBankAccountStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BankAccountStatus | Prisma.EnumBankAccountStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BankAccountStatus[] | Prisma.ListEnumBankAccountStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BankAccountStatus[] | Prisma.ListEnumBankAccountStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBankAccountStatusFilter<$PrismaModel> | $Enums.BankAccountStatus;
};
export type EnumBankAccountStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BankAccountStatus | Prisma.EnumBankAccountStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BankAccountStatus[] | Prisma.ListEnumBankAccountStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BankAccountStatus[] | Prisma.ListEnumBankAccountStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBankAccountStatusWithAggregatesFilter<$PrismaModel> | $Enums.BankAccountStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBankAccountStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBankAccountStatusFilter<$PrismaModel>;
};
export type EnumSupplyContractStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplyContractStatus | Prisma.EnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplyContractStatus[] | Prisma.ListEnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplyContractStatus[] | Prisma.ListEnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplyContractStatusFilter<$PrismaModel> | $Enums.SupplyContractStatus;
};
export type EnumSupplyContractStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplyContractStatus | Prisma.EnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplyContractStatus[] | Prisma.ListEnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplyContractStatus[] | Prisma.ListEnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplyContractStatusWithAggregatesFilter<$PrismaModel> | $Enums.SupplyContractStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSupplyContractStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSupplyContractStatusFilter<$PrismaModel>;
};
export type EnumInspectorApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectorApplicationStatus | Prisma.EnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectorApplicationStatus[] | Prisma.ListEnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectorApplicationStatus[] | Prisma.ListEnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectorApplicationStatusFilter<$PrismaModel> | $Enums.InspectorApplicationStatus;
};
export type EnumInspectorApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectorApplicationStatus | Prisma.EnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectorApplicationStatus[] | Prisma.ListEnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectorApplicationStatus[] | Prisma.ListEnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectorApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InspectorApplicationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInspectorApplicationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInspectorApplicationStatusFilter<$PrismaModel>;
};
export type EnumInspectorStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectorStatus | Prisma.EnumInspectorStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectorStatus[] | Prisma.ListEnumInspectorStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectorStatus[] | Prisma.ListEnumInspectorStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectorStatusFilter<$PrismaModel> | $Enums.InspectorStatus;
};
export type EnumInspectorStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectorStatus | Prisma.EnumInspectorStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectorStatus[] | Prisma.ListEnumInspectorStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectorStatus[] | Prisma.ListEnumInspectorStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectorStatusWithAggregatesFilter<$PrismaModel> | $Enums.InspectorStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInspectorStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInspectorStatusFilter<$PrismaModel>;
};
export type EnumSubscriptionPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | Prisma.EnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionPlan[] | Prisma.ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionPlan[] | Prisma.ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionPlanFilter<$PrismaModel> | $Enums.SubscriptionPlan;
};
export type EnumPlanIntervalNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanInterval | Prisma.EnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    in?: $Enums.PlanInterval[] | Prisma.ListEnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.PlanInterval[] | Prisma.ListEnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumPlanIntervalNullableFilter<$PrismaModel> | $Enums.PlanInterval | null;
};
export type EnumSubscriptionSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionSource | Prisma.EnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionSource[] | Prisma.ListEnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionSource[] | Prisma.ListEnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionSourceFilter<$PrismaModel> | $Enums.SubscriptionSource;
};
export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | Prisma.EnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus;
};
export type EnumSubscriptionPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | Prisma.EnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionPlan[] | Prisma.ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionPlan[] | Prisma.ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionPlanWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionPlan;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSubscriptionPlanFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSubscriptionPlanFilter<$PrismaModel>;
};
export type EnumPlanIntervalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanInterval | Prisma.EnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    in?: $Enums.PlanInterval[] | Prisma.ListEnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.PlanInterval[] | Prisma.ListEnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumPlanIntervalNullableWithAggregatesFilter<$PrismaModel> | $Enums.PlanInterval | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPlanIntervalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPlanIntervalNullableFilter<$PrismaModel>;
};
export type EnumSubscriptionSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionSource | Prisma.EnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionSource[] | Prisma.ListEnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionSource[] | Prisma.ListEnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionSourceWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionSource;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSubscriptionSourceFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSubscriptionSourceFilter<$PrismaModel>;
};
export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | Prisma.EnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel>;
};
export type EnumOutboundMessageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboundMessageStatus | Prisma.EnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OutboundMessageStatus[] | Prisma.ListEnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OutboundMessageStatus[] | Prisma.ListEnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOutboundMessageStatusFilter<$PrismaModel> | $Enums.OutboundMessageStatus;
};
export type EnumOutboundMessageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboundMessageStatus | Prisma.EnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OutboundMessageStatus[] | Prisma.ListEnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OutboundMessageStatus[] | Prisma.ListEnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOutboundMessageStatusWithAggregatesFilter<$PrismaModel> | $Enums.OutboundMessageStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOutboundMessageStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOutboundMessageStatusFilter<$PrismaModel>;
};
export type EnumLeadKindFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadKind | Prisma.EnumLeadKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadKind[] | Prisma.ListEnumLeadKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadKind[] | Prisma.ListEnumLeadKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadKindFilter<$PrismaModel> | $Enums.LeadKind;
};
export type EnumLeadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | Prisma.EnumLeadStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel> | $Enums.LeadStatus;
};
export type EnumLeadKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadKind | Prisma.EnumLeadKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadKind[] | Prisma.ListEnumLeadKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadKind[] | Prisma.ListEnumLeadKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadKindWithAggregatesFilter<$PrismaModel> | $Enums.LeadKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLeadKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLeadKindFilter<$PrismaModel>;
};
export type EnumLeadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | Prisma.EnumLeadStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeadStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel>;
};
export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidFilter<$PrismaModel> | string;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleFilter<$PrismaModel> | $Enums.Role;
};
export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidNullableFilter<$PrismaModel> | string | null;
};
export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedEnumTextChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.TextChannel | Prisma.EnumTextChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.TextChannel[] | Prisma.ListEnumTextChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TextChannel[] | Prisma.ListEnumTextChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTextChannelFilter<$PrismaModel> | $Enums.TextChannel;
};
export type NestedEnumCurrencyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | Prisma.EnumCurrencyFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCurrencyNullableFilter<$PrismaModel> | $Enums.Currency | null;
};
export type NestedEnumCompanyRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyRole | Prisma.EnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CompanyRole[] | Prisma.ListEnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CompanyRole[] | Prisma.ListEnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCompanyRoleNullableFilter<$PrismaModel> | $Enums.CompanyRole | null;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | Prisma.EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | Prisma.ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRoleFilter<$PrismaModel>;
};
export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedEnumTextChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TextChannel | Prisma.EnumTextChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.TextChannel[] | Prisma.ListEnumTextChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TextChannel[] | Prisma.ListEnumTextChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTextChannelWithAggregatesFilter<$PrismaModel> | $Enums.TextChannel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTextChannelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTextChannelFilter<$PrismaModel>;
};
export type NestedEnumCurrencyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | Prisma.EnumCurrencyFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCurrencyNullableWithAggregatesFilter<$PrismaModel> | $Enums.Currency | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCurrencyNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCurrencyNullableFilter<$PrismaModel>;
};
export type NestedEnumCompanyRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyRole | Prisma.EnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CompanyRole[] | Prisma.ListEnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CompanyRole[] | Prisma.ListEnumCompanyRoleFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCompanyRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.CompanyRole | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCompanyRoleNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCompanyRoleNullableFilter<$PrismaModel>;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedEnumUserTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserTokenType | Prisma.EnumUserTokenTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserTokenType[] | Prisma.ListEnumUserTokenTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserTokenType[] | Prisma.ListEnumUserTokenTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserTokenTypeFilter<$PrismaModel> | $Enums.UserTokenType;
};
export type NestedEnumUserTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserTokenType | Prisma.EnumUserTokenTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.UserTokenType[] | Prisma.ListEnumUserTokenTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserTokenType[] | Prisma.ListEnumUserTokenTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserTokenType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserTokenTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserTokenTypeFilter<$PrismaModel>;
};
export type NestedEnumCompanyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyType | Prisma.EnumCompanyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CompanyType[] | Prisma.ListEnumCompanyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CompanyType[] | Prisma.ListEnumCompanyTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCompanyTypeFilter<$PrismaModel> | $Enums.CompanyType;
};
export type NestedEnumOnboardingStepFilter<$PrismaModel = never> = {
    equals?: $Enums.OnboardingStep | Prisma.EnumOnboardingStepFieldRefInput<$PrismaModel>;
    in?: $Enums.OnboardingStep[] | Prisma.ListEnumOnboardingStepFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OnboardingStep[] | Prisma.ListEnumOnboardingStepFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOnboardingStepFilter<$PrismaModel> | $Enums.OnboardingStep;
};
export type NestedEnumKycStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | Prisma.EnumKycStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.KycStatus[] | Prisma.ListEnumKycStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.KycStatus[] | Prisma.ListEnumKycStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumKycStatusFilter<$PrismaModel> | $Enums.KycStatus;
};
export type NestedEnumCompanyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyType | Prisma.EnumCompanyTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CompanyType[] | Prisma.ListEnumCompanyTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CompanyType[] | Prisma.ListEnumCompanyTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCompanyTypeWithAggregatesFilter<$PrismaModel> | $Enums.CompanyType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCompanyTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCompanyTypeFilter<$PrismaModel>;
};
export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumOnboardingStepWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OnboardingStep | Prisma.EnumOnboardingStepFieldRefInput<$PrismaModel>;
    in?: $Enums.OnboardingStep[] | Prisma.ListEnumOnboardingStepFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OnboardingStep[] | Prisma.ListEnumOnboardingStepFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOnboardingStepWithAggregatesFilter<$PrismaModel> | $Enums.OnboardingStep;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOnboardingStepFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOnboardingStepFilter<$PrismaModel>;
};
export type NestedEnumKycStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | Prisma.EnumKycStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.KycStatus[] | Prisma.ListEnumKycStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.KycStatus[] | Prisma.ListEnumKycStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumKycStatusWithAggregatesFilter<$PrismaModel> | $Enums.KycStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumKycStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumKycStatusFilter<$PrismaModel>;
};
export type NestedEnumCompanyDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyDocumentType | Prisma.EnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CompanyDocumentType[] | Prisma.ListEnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CompanyDocumentType[] | Prisma.ListEnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCompanyDocumentTypeFilter<$PrismaModel> | $Enums.CompanyDocumentType;
};
export type NestedEnumReviewStateFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewState | Prisma.EnumReviewStateFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewState[] | Prisma.ListEnumReviewStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewState[] | Prisma.ListEnumReviewStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStateFilter<$PrismaModel> | $Enums.ReviewState;
};
export type NestedEnumCompanyDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompanyDocumentType | Prisma.EnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CompanyDocumentType[] | Prisma.ListEnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CompanyDocumentType[] | Prisma.ListEnumCompanyDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCompanyDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.CompanyDocumentType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCompanyDocumentTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCompanyDocumentTypeFilter<$PrismaModel>;
};
export type NestedEnumReviewStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewState | Prisma.EnumReviewStateFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewState[] | Prisma.ListEnumReviewStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewState[] | Prisma.ListEnumReviewStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStateWithAggregatesFilter<$PrismaModel> | $Enums.ReviewState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewStateFilter<$PrismaModel>;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedEnumBuyerBusinessTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.BuyerBusinessType | Prisma.EnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.BuyerBusinessType[] | Prisma.ListEnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.BuyerBusinessType[] | Prisma.ListEnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumBuyerBusinessTypeNullableFilter<$PrismaModel> | $Enums.BuyerBusinessType | null;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedEnumBuyerBusinessTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BuyerBusinessType | Prisma.EnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.BuyerBusinessType[] | Prisma.ListEnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.BuyerBusinessType[] | Prisma.ListEnumBuyerBusinessTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumBuyerBusinessTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.BuyerBusinessType | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBuyerBusinessTypeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBuyerBusinessTypeNullableFilter<$PrismaModel>;
};
export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type NestedEnumPlanTierFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTier | Prisma.EnumPlanTierFieldRefInput<$PrismaModel>;
    in?: $Enums.PlanTier[] | Prisma.ListEnumPlanTierFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PlanTier[] | Prisma.ListEnumPlanTierFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPlanTierFilter<$PrismaModel> | $Enums.PlanTier;
};
export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
};
export type NestedEnumPlanTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTier | Prisma.EnumPlanTierFieldRefInput<$PrismaModel>;
    in?: $Enums.PlanTier[] | Prisma.ListEnumPlanTierFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PlanTier[] | Prisma.ListEnumPlanTierFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPlanTierWithAggregatesFilter<$PrismaModel> | $Enums.PlanTier;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPlanTierFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPlanTierFilter<$PrismaModel>;
};
export type NestedJsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedEnumCertificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationType | Prisma.EnumCertificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CertificationType[] | Prisma.ListEnumCertificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CertificationType[] | Prisma.ListEnumCertificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCertificationTypeFilter<$PrismaModel> | $Enums.CertificationType;
};
export type NestedEnumCertificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationStatus | Prisma.EnumCertificationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CertificationStatus[] | Prisma.ListEnumCertificationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CertificationStatus[] | Prisma.ListEnumCertificationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCertificationStatusFilter<$PrismaModel> | $Enums.CertificationStatus;
};
export type NestedEnumCertificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationType | Prisma.EnumCertificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CertificationType[] | Prisma.ListEnumCertificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CertificationType[] | Prisma.ListEnumCertificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCertificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.CertificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCertificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCertificationTypeFilter<$PrismaModel>;
};
export type NestedEnumCertificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificationStatus | Prisma.EnumCertificationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CertificationStatus[] | Prisma.ListEnumCertificationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CertificationStatus[] | Prisma.ListEnumCertificationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCertificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.CertificationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCertificationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCertificationStatusFilter<$PrismaModel>;
};
export type NestedEnumCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | Prisma.EnumCurrencyFieldRefInput<$PrismaModel>;
    in?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCurrencyFilter<$PrismaModel> | $Enums.Currency;
};
export type NestedEnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | Prisma.EnumProductStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductStatus[] | Prisma.ListEnumProductStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductStatus[] | Prisma.ListEnumProductStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus;
};
export type NestedEnumCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Currency | Prisma.EnumCurrencyFieldRefInput<$PrismaModel>;
    in?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Currency[] | Prisma.ListEnumCurrencyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.Currency;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCurrencyFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCurrencyFilter<$PrismaModel>;
};
export type NestedEnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | Prisma.EnumProductStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductStatus[] | Prisma.ListEnumProductStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductStatus[] | Prisma.ListEnumProductStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProductStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProductStatusFilter<$PrismaModel>;
};
export type NestedEnumMediaReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaReviewStatus | Prisma.EnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaReviewStatus[] | Prisma.ListEnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaReviewStatus[] | Prisma.ListEnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaReviewStatusFilter<$PrismaModel> | $Enums.MediaReviewStatus;
};
export type NestedEnumMediaReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaReviewStatus | Prisma.EnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MediaReviewStatus[] | Prisma.ListEnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MediaReviewStatus[] | Prisma.ListEnumMediaReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMediaReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.MediaReviewStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMediaReviewStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMediaReviewStatusFilter<$PrismaModel>;
};
export type NestedEnumIncotermNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Incoterm | Prisma.EnumIncotermFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumIncotermNullableFilter<$PrismaModel> | $Enums.Incoterm | null;
};
export type NestedEnumRfqStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqStatus | Prisma.EnumRfqStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqStatus[] | Prisma.ListEnumRfqStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqStatus[] | Prisma.ListEnumRfqStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqStatusFilter<$PrismaModel> | $Enums.RfqStatus;
};
export type NestedEnumIncotermNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Incoterm | Prisma.EnumIncotermFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumIncotermNullableWithAggregatesFilter<$PrismaModel> | $Enums.Incoterm | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumIncotermNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumIncotermNullableFilter<$PrismaModel>;
};
export type NestedEnumRfqStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqStatus | Prisma.EnumRfqStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqStatus[] | Prisma.ListEnumRfqStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqStatus[] | Prisma.ListEnumRfqStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqStatusWithAggregatesFilter<$PrismaModel> | $Enums.RfqStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRfqStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRfqStatusFilter<$PrismaModel>;
};
export type NestedEnumRfqInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqInvitationStatus | Prisma.EnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqInvitationStatus[] | Prisma.ListEnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqInvitationStatus[] | Prisma.ListEnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqInvitationStatusFilter<$PrismaModel> | $Enums.RfqInvitationStatus;
};
export type NestedEnumRfqInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqInvitationStatus | Prisma.EnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqInvitationStatus[] | Prisma.ListEnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqInvitationStatus[] | Prisma.ListEnumRfqInvitationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RfqInvitationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRfqInvitationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRfqInvitationStatusFilter<$PrismaModel>;
};
export type NestedEnumRfqAttachmentKindFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqAttachmentKind | Prisma.EnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqAttachmentKind[] | Prisma.ListEnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqAttachmentKind[] | Prisma.ListEnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqAttachmentKindFilter<$PrismaModel> | $Enums.RfqAttachmentKind;
};
export type NestedEnumRfqAttachmentKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RfqAttachmentKind | Prisma.EnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    in?: $Enums.RfqAttachmentKind[] | Prisma.ListEnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RfqAttachmentKind[] | Prisma.ListEnumRfqAttachmentKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRfqAttachmentKindWithAggregatesFilter<$PrismaModel> | $Enums.RfqAttachmentKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRfqAttachmentKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRfqAttachmentKindFilter<$PrismaModel>;
};
export type NestedEnumQuoteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QuoteStatus | Prisma.EnumQuoteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.QuoteStatus[] | Prisma.ListEnumQuoteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuoteStatus[] | Prisma.ListEnumQuoteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuoteStatusFilter<$PrismaModel> | $Enums.QuoteStatus;
};
export type NestedEnumQuoteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuoteStatus | Prisma.EnumQuoteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.QuoteStatus[] | Prisma.ListEnumQuoteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.QuoteStatus[] | Prisma.ListEnumQuoteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumQuoteStatusWithAggregatesFilter<$PrismaModel> | $Enums.QuoteStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumQuoteStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumQuoteStatusFilter<$PrismaModel>;
};
export type NestedEnumConversationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | Prisma.EnumConversationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ConversationType[] | Prisma.ListEnumConversationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ConversationType[] | Prisma.ListEnumConversationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumConversationTypeFilter<$PrismaModel> | $Enums.ConversationType;
};
export type NestedEnumConversationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationType | Prisma.EnumConversationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ConversationType[] | Prisma.ListEnumConversationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ConversationType[] | Prisma.ListEnumConversationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumConversationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConversationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumConversationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumConversationTypeFilter<$PrismaModel>;
};
export type NestedEnumModerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | Prisma.EnumModerationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationStatus[] | Prisma.ListEnumModerationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationStatus[] | Prisma.ListEnumModerationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationStatusFilter<$PrismaModel> | $Enums.ModerationStatus;
};
export type NestedEnumModerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | Prisma.EnumModerationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ModerationStatus[] | Prisma.ListEnumModerationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ModerationStatus[] | Prisma.ListEnumModerationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumModerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ModerationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumModerationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumModerationStatusFilter<$PrismaModel>;
};
export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntFilter<$PrismaModel> | bigint | number;
};
export type NestedEnumIncotermFilter<$PrismaModel = never> = {
    equals?: $Enums.Incoterm | Prisma.EnumIncotermFieldRefInput<$PrismaModel>;
    in?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumIncotermFilter<$PrismaModel> | $Enums.Incoterm;
};
export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | Prisma.EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus;
};
export type NestedEnumOrderStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | Prisma.EnumOrderStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumOrderStatusNullableFilter<$PrismaModel> | $Enums.OrderStatus | null;
};
export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedBigIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBigIntFilter<$PrismaModel>;
    _max?: Prisma.NestedBigIntFilter<$PrismaModel>;
};
export type NestedEnumIncotermWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Incoterm | Prisma.EnumIncotermFieldRefInput<$PrismaModel>;
    in?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Incoterm[] | Prisma.ListEnumIncotermFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumIncotermWithAggregatesFilter<$PrismaModel> | $Enums.Incoterm;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumIncotermFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumIncotermFilter<$PrismaModel>;
};
export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | Prisma.EnumOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOrderStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOrderStatusFilter<$PrismaModel>;
};
export type NestedEnumOrderStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | Prisma.EnumOrderStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.OrderStatus[] | Prisma.ListEnumOrderStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumOrderStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOrderStatusNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOrderStatusNullableFilter<$PrismaModel>;
};
export type NestedEnumMilestoneStageFilter<$PrismaModel = never> = {
    equals?: $Enums.MilestoneStage | Prisma.EnumMilestoneStageFieldRefInput<$PrismaModel>;
    in?: $Enums.MilestoneStage[] | Prisma.ListEnumMilestoneStageFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MilestoneStage[] | Prisma.ListEnumMilestoneStageFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMilestoneStageFilter<$PrismaModel> | $Enums.MilestoneStage;
};
export type NestedEnumMilestoneStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MilestoneStatus | Prisma.EnumMilestoneStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MilestoneStatus[] | Prisma.ListEnumMilestoneStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MilestoneStatus[] | Prisma.ListEnumMilestoneStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMilestoneStatusFilter<$PrismaModel> | $Enums.MilestoneStatus;
};
export type NestedEnumMilestoneStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MilestoneStage | Prisma.EnumMilestoneStageFieldRefInput<$PrismaModel>;
    in?: $Enums.MilestoneStage[] | Prisma.ListEnumMilestoneStageFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MilestoneStage[] | Prisma.ListEnumMilestoneStageFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMilestoneStageWithAggregatesFilter<$PrismaModel> | $Enums.MilestoneStage;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMilestoneStageFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMilestoneStageFilter<$PrismaModel>;
};
export type NestedEnumMilestoneStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MilestoneStatus | Prisma.EnumMilestoneStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MilestoneStatus[] | Prisma.ListEnumMilestoneStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MilestoneStatus[] | Prisma.ListEnumMilestoneStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMilestoneStatusWithAggregatesFilter<$PrismaModel> | $Enums.MilestoneStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMilestoneStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMilestoneStatusFilter<$PrismaModel>;
};
export type NestedEnumSampleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SampleType | Prisma.EnumSampleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SampleType[] | Prisma.ListEnumSampleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SampleType[] | Prisma.ListEnumSampleTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSampleTypeFilter<$PrismaModel> | $Enums.SampleType;
};
export type NestedEnumSampleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SampleStatus | Prisma.EnumSampleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SampleStatus[] | Prisma.ListEnumSampleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SampleStatus[] | Prisma.ListEnumSampleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSampleStatusFilter<$PrismaModel> | $Enums.SampleStatus;
};
export type NestedEnumSampleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SampleType | Prisma.EnumSampleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SampleType[] | Prisma.ListEnumSampleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SampleType[] | Prisma.ListEnumSampleTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSampleTypeWithAggregatesFilter<$PrismaModel> | $Enums.SampleType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSampleTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSampleTypeFilter<$PrismaModel>;
};
export type NestedEnumSampleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SampleStatus | Prisma.EnumSampleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SampleStatus[] | Prisma.ListEnumSampleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SampleStatus[] | Prisma.ListEnumSampleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSampleStatusWithAggregatesFilter<$PrismaModel> | $Enums.SampleStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSampleStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSampleStatusFilter<$PrismaModel>;
};
export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel> | null;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel> | null;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel> | null;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null;
};
export type NestedEnumPaymentDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentDirection | Prisma.EnumPaymentDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentDirection[] | Prisma.ListEnumPaymentDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentDirection[] | Prisma.ListEnumPaymentDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentDirectionFilter<$PrismaModel> | $Enums.PaymentDirection;
};
export type NestedEnumPaymentPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentPurpose | Prisma.EnumPaymentPurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentPurpose[] | Prisma.ListEnumPaymentPurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentPurpose[] | Prisma.ListEnumPaymentPurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentPurposeFilter<$PrismaModel> | $Enums.PaymentPurpose;
};
export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod;
};
export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
};
export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel> | null;
    in?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel> | null;
    notIn?: bigint[] | number[] | Prisma.ListBigIntFieldRefInput<$PrismaModel> | null;
    lt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | Prisma.BigIntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedBigIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedBigIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedBigIntNullableFilter<$PrismaModel>;
};
export type NestedEnumPaymentDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentDirection | Prisma.EnumPaymentDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentDirection[] | Prisma.ListEnumPaymentDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentDirection[] | Prisma.ListEnumPaymentDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentDirectionWithAggregatesFilter<$PrismaModel> | $Enums.PaymentDirection;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentDirectionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentDirectionFilter<$PrismaModel>;
};
export type NestedEnumPaymentPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentPurpose | Prisma.EnumPaymentPurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentPurpose[] | Prisma.ListEnumPaymentPurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentPurpose[] | Prisma.ListEnumPaymentPurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentPurposeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentPurpose;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentPurposeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentPurposeFilter<$PrismaModel>;
};
export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
};
export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
};
export type NestedEnumLedgerAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerAccountType | Prisma.EnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LedgerAccountType[] | Prisma.ListEnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LedgerAccountType[] | Prisma.ListEnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLedgerAccountTypeFilter<$PrismaModel> | $Enums.LedgerAccountType;
};
export type NestedEnumLedgerAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerAccountType | Prisma.EnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LedgerAccountType[] | Prisma.ListEnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LedgerAccountType[] | Prisma.ListEnumLedgerAccountTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLedgerAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.LedgerAccountType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLedgerAccountTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLedgerAccountTypeFilter<$PrismaModel>;
};
export type NestedEnumLedgerTransactionKindFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerTransactionKind | Prisma.EnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LedgerTransactionKind[] | Prisma.ListEnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LedgerTransactionKind[] | Prisma.ListEnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLedgerTransactionKindFilter<$PrismaModel> | $Enums.LedgerTransactionKind;
};
export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type NestedEnumLedgerTransactionKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerTransactionKind | Prisma.EnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LedgerTransactionKind[] | Prisma.ListEnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LedgerTransactionKind[] | Prisma.ListEnumLedgerTransactionKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLedgerTransactionKindWithAggregatesFilter<$PrismaModel> | $Enums.LedgerTransactionKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLedgerTransactionKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLedgerTransactionKindFilter<$PrismaModel>;
};
export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalFilter<$PrismaModel>;
};
export type NestedEnumEntryDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryDirection | Prisma.EnumEntryDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.EntryDirection[] | Prisma.ListEnumEntryDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EntryDirection[] | Prisma.ListEnumEntryDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEntryDirectionFilter<$PrismaModel> | $Enums.EntryDirection;
};
export type NestedEnumEntryDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntryDirection | Prisma.EnumEntryDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.EntryDirection[] | Prisma.ListEnumEntryDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.EntryDirection[] | Prisma.ListEnumEntryDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumEntryDirectionWithAggregatesFilter<$PrismaModel> | $Enums.EntryDirection;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumEntryDirectionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumEntryDirectionFilter<$PrismaModel>;
};
export type NestedEnumInspectionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectionType | Prisma.EnumInspectionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectionType[] | Prisma.ListEnumInspectionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectionType[] | Prisma.ListEnumInspectionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectionTypeFilter<$PrismaModel> | $Enums.InspectionType;
};
export type NestedEnumInspectionResultFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectionResult | Prisma.EnumInspectionResultFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectionResult[] | Prisma.ListEnumInspectionResultFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectionResult[] | Prisma.ListEnumInspectionResultFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectionResultFilter<$PrismaModel> | $Enums.InspectionResult;
};
export type NestedEnumInspectionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectionType | Prisma.EnumInspectionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectionType[] | Prisma.ListEnumInspectionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectionType[] | Prisma.ListEnumInspectionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectionTypeWithAggregatesFilter<$PrismaModel> | $Enums.InspectionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInspectionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInspectionTypeFilter<$PrismaModel>;
};
export type NestedEnumInspectionResultWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectionResult | Prisma.EnumInspectionResultFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectionResult[] | Prisma.ListEnumInspectionResultFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectionResult[] | Prisma.ListEnumInspectionResultFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectionResultWithAggregatesFilter<$PrismaModel> | $Enums.InspectionResult;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInspectionResultFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInspectionResultFilter<$PrismaModel>;
};
export type NestedEnumReviewDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewDirection | Prisma.EnumReviewDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewDirection[] | Prisma.ListEnumReviewDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewDirection[] | Prisma.ListEnumReviewDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewDirectionFilter<$PrismaModel> | $Enums.ReviewDirection;
};
export type NestedEnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus;
};
export type NestedEnumReviewDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewDirection | Prisma.EnumReviewDirectionFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewDirection[] | Prisma.ListEnumReviewDirectionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewDirection[] | Prisma.ListEnumReviewDirectionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewDirectionWithAggregatesFilter<$PrismaModel> | $Enums.ReviewDirection;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewDirectionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewDirectionFilter<$PrismaModel>;
};
export type NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | Prisma.EnumReviewStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReviewStatus[] | Prisma.ListEnumReviewStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReviewStatusFilter<$PrismaModel>;
};
export type NestedEnumDisputeReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeReason | Prisma.EnumDisputeReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeReason[] | Prisma.ListEnumDisputeReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeReason[] | Prisma.ListEnumDisputeReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeReasonFilter<$PrismaModel> | $Enums.DisputeReason;
};
export type NestedEnumDisputeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | Prisma.EnumDisputeStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel> | $Enums.DisputeStatus;
};
export type NestedEnumDisputeReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeReason | Prisma.EnumDisputeReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeReason[] | Prisma.ListEnumDisputeReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeReason[] | Prisma.ListEnumDisputeReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeReasonWithAggregatesFilter<$PrismaModel> | $Enums.DisputeReason;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputeReasonFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputeReasonFilter<$PrismaModel>;
};
export type NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | Prisma.EnumDisputeStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeStatus[] | Prisma.ListEnumDisputeStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel> | $Enums.DisputeStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputeStatusFilter<$PrismaModel>;
};
export type NestedEnumDisputePartyFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeParty | Prisma.EnumDisputePartyFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeParty[] | Prisma.ListEnumDisputePartyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeParty[] | Prisma.ListEnumDisputePartyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputePartyFilter<$PrismaModel> | $Enums.DisputeParty;
};
export type NestedEnumDisputePartyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeParty | Prisma.EnumDisputePartyFieldRefInput<$PrismaModel>;
    in?: $Enums.DisputeParty[] | Prisma.ListEnumDisputePartyFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DisputeParty[] | Prisma.ListEnumDisputePartyFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDisputePartyWithAggregatesFilter<$PrismaModel> | $Enums.DisputeParty;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDisputePartyFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDisputePartyFilter<$PrismaModel>;
};
export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type NestedEnumNotificationCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationCategory | Prisma.EnumNotificationCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel> | $Enums.NotificationCategory;
};
export type NestedEnumNotificationCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationCategory | Prisma.EnumNotificationCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationCategory[] | Prisma.ListEnumNotificationCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationCategoryWithAggregatesFilter<$PrismaModel> | $Enums.NotificationCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationCategoryFilter<$PrismaModel>;
};
export type NestedEnumFilePurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.FilePurpose | Prisma.EnumFilePurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.FilePurpose[] | Prisma.ListEnumFilePurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.FilePurpose[] | Prisma.ListEnumFilePurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumFilePurposeFilter<$PrismaModel> | $Enums.FilePurpose;
};
export type NestedEnumFileStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FileStatus | Prisma.EnumFileStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.FileStatus[] | Prisma.ListEnumFileStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.FileStatus[] | Prisma.ListEnumFileStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumFileStatusFilter<$PrismaModel> | $Enums.FileStatus;
};
export type NestedEnumScanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScanStatus | Prisma.EnumScanStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ScanStatus[] | Prisma.ListEnumScanStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ScanStatus[] | Prisma.ListEnumScanStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumScanStatusFilter<$PrismaModel> | $Enums.ScanStatus;
};
export type NestedEnumImageProcessingStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageProcessingStatus | Prisma.EnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ImageProcessingStatus[] | Prisma.ListEnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ImageProcessingStatus[] | Prisma.ListEnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumImageProcessingStatusNullableFilter<$PrismaModel> | $Enums.ImageProcessingStatus | null;
};
export type NestedEnumFilePurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FilePurpose | Prisma.EnumFilePurposeFieldRefInput<$PrismaModel>;
    in?: $Enums.FilePurpose[] | Prisma.ListEnumFilePurposeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.FilePurpose[] | Prisma.ListEnumFilePurposeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumFilePurposeWithAggregatesFilter<$PrismaModel> | $Enums.FilePurpose;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumFilePurposeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumFilePurposeFilter<$PrismaModel>;
};
export type NestedEnumFileStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FileStatus | Prisma.EnumFileStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.FileStatus[] | Prisma.ListEnumFileStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.FileStatus[] | Prisma.ListEnumFileStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumFileStatusWithAggregatesFilter<$PrismaModel> | $Enums.FileStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumFileStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumFileStatusFilter<$PrismaModel>;
};
export type NestedEnumScanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScanStatus | Prisma.EnumScanStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ScanStatus[] | Prisma.ListEnumScanStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ScanStatus[] | Prisma.ListEnumScanStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumScanStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScanStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumScanStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumScanStatusFilter<$PrismaModel>;
};
export type NestedEnumImageProcessingStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ImageProcessingStatus | Prisma.EnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ImageProcessingStatus[] | Prisma.ListEnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ImageProcessingStatus[] | Prisma.ListEnumImageProcessingStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumImageProcessingStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.ImageProcessingStatus | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumImageProcessingStatusNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumImageProcessingStatusNullableFilter<$PrismaModel>;
};
export type NestedEnumWarningLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.WarningLevel | Prisma.EnumWarningLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.WarningLevel[] | Prisma.ListEnumWarningLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WarningLevel[] | Prisma.ListEnumWarningLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWarningLevelFilter<$PrismaModel> | $Enums.WarningLevel;
};
export type NestedEnumWarningLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WarningLevel | Prisma.EnumWarningLevelFieldRefInput<$PrismaModel>;
    in?: $Enums.WarningLevel[] | Prisma.ListEnumWarningLevelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WarningLevel[] | Prisma.ListEnumWarningLevelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWarningLevelWithAggregatesFilter<$PrismaModel> | $Enums.WarningLevel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWarningLevelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWarningLevelFilter<$PrismaModel>;
};
export type NestedEnumReleaseTriggerFilter<$PrismaModel = never> = {
    equals?: $Enums.ReleaseTrigger | Prisma.EnumReleaseTriggerFieldRefInput<$PrismaModel>;
    in?: $Enums.ReleaseTrigger[] | Prisma.ListEnumReleaseTriggerFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReleaseTrigger[] | Prisma.ListEnumReleaseTriggerFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReleaseTriggerFilter<$PrismaModel> | $Enums.ReleaseTrigger;
};
export type NestedEnumReleaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReleaseStatus | Prisma.EnumReleaseStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReleaseStatus[] | Prisma.ListEnumReleaseStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReleaseStatus[] | Prisma.ListEnumReleaseStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReleaseStatusFilter<$PrismaModel> | $Enums.ReleaseStatus;
};
export type NestedEnumReleaseTriggerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReleaseTrigger | Prisma.EnumReleaseTriggerFieldRefInput<$PrismaModel>;
    in?: $Enums.ReleaseTrigger[] | Prisma.ListEnumReleaseTriggerFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReleaseTrigger[] | Prisma.ListEnumReleaseTriggerFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReleaseTriggerWithAggregatesFilter<$PrismaModel> | $Enums.ReleaseTrigger;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReleaseTriggerFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReleaseTriggerFilter<$PrismaModel>;
};
export type NestedEnumReleaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReleaseStatus | Prisma.EnumReleaseStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReleaseStatus[] | Prisma.ListEnumReleaseStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReleaseStatus[] | Prisma.ListEnumReleaseStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReleaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReleaseStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReleaseStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReleaseStatusFilter<$PrismaModel>;
};
export type NestedJsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedEnumProductionLineStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductionLineStatus | Prisma.EnumProductionLineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductionLineStatus[] | Prisma.ListEnumProductionLineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductionLineStatus[] | Prisma.ListEnumProductionLineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductionLineStatusFilter<$PrismaModel> | $Enums.ProductionLineStatus;
};
export type NestedEnumProductionLineStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductionLineStatus | Prisma.EnumProductionLineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductionLineStatus[] | Prisma.ListEnumProductionLineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductionLineStatus[] | Prisma.ListEnumProductionLineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductionLineStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductionLineStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProductionLineStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProductionLineStatusFilter<$PrismaModel>;
};
export type NestedEnumCapacitySlotStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacitySlotStatus | Prisma.EnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacitySlotStatus[] | Prisma.ListEnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacitySlotStatus[] | Prisma.ListEnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacitySlotStatusFilter<$PrismaModel> | $Enums.CapacitySlotStatus;
};
export type NestedEnumCapacitySlotStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacitySlotStatus | Prisma.EnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacitySlotStatus[] | Prisma.ListEnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacitySlotStatus[] | Prisma.ListEnumCapacitySlotStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacitySlotStatusWithAggregatesFilter<$PrismaModel> | $Enums.CapacitySlotStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacitySlotStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacitySlotStatusFilter<$PrismaModel>;
};
export type NestedEnumSupplierClaimRegionFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimRegion | Prisma.EnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimRegion[] | Prisma.ListEnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimRegion[] | Prisma.ListEnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimRegionFilter<$PrismaModel> | $Enums.SupplierClaimRegion;
};
export type NestedEnumSupplierClaimTierFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimTier | Prisma.EnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimTier[] | Prisma.ListEnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimTier[] | Prisma.ListEnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimTierFilter<$PrismaModel> | $Enums.SupplierClaimTier;
};
export type NestedEnumSupplierClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimStatus | Prisma.EnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimStatus[] | Prisma.ListEnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimStatus[] | Prisma.ListEnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimStatusFilter<$PrismaModel> | $Enums.SupplierClaimStatus;
};
export type NestedEnumSupplierClaimRegionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimRegion | Prisma.EnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimRegion[] | Prisma.ListEnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimRegion[] | Prisma.ListEnumSupplierClaimRegionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimRegionWithAggregatesFilter<$PrismaModel> | $Enums.SupplierClaimRegion;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSupplierClaimRegionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSupplierClaimRegionFilter<$PrismaModel>;
};
export type NestedEnumSupplierClaimTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimTier | Prisma.EnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimTier[] | Prisma.ListEnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimTier[] | Prisma.ListEnumSupplierClaimTierFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimTierWithAggregatesFilter<$PrismaModel> | $Enums.SupplierClaimTier;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSupplierClaimTierFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSupplierClaimTierFilter<$PrismaModel>;
};
export type NestedEnumSupplierClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplierClaimStatus | Prisma.EnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplierClaimStatus[] | Prisma.ListEnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplierClaimStatus[] | Prisma.ListEnumSupplierClaimStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplierClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.SupplierClaimStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSupplierClaimStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSupplierClaimStatusFilter<$PrismaModel>;
};
export type NestedEnumCapacityBookingKindFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingKind | Prisma.EnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityBookingKind[] | Prisma.ListEnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityBookingKind[] | Prisma.ListEnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityBookingKindFilter<$PrismaModel> | $Enums.CapacityBookingKind;
};
export type NestedEnumCapacityBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingStatus | Prisma.EnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityBookingStatus[] | Prisma.ListEnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityBookingStatus[] | Prisma.ListEnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityBookingStatusFilter<$PrismaModel> | $Enums.CapacityBookingStatus;
};
export type NestedEnumCapacityBookingActorNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingActor | Prisma.EnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CapacityBookingActor[] | Prisma.ListEnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CapacityBookingActor[] | Prisma.ListEnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCapacityBookingActorNullableFilter<$PrismaModel> | $Enums.CapacityBookingActor | null;
};
export type NestedEnumCapacityConversionModeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityConversionMode | Prisma.EnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CapacityConversionMode[] | Prisma.ListEnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CapacityConversionMode[] | Prisma.ListEnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCapacityConversionModeNullableFilter<$PrismaModel> | $Enums.CapacityConversionMode | null;
};
export type NestedEnumCapacityBookingKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingKind | Prisma.EnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityBookingKind[] | Prisma.ListEnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityBookingKind[] | Prisma.ListEnumCapacityBookingKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityBookingKindWithAggregatesFilter<$PrismaModel> | $Enums.CapacityBookingKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacityBookingKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacityBookingKindFilter<$PrismaModel>;
};
export type NestedEnumCapacityBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingStatus | Prisma.EnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityBookingStatus[] | Prisma.ListEnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityBookingStatus[] | Prisma.ListEnumCapacityBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.CapacityBookingStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacityBookingStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacityBookingStatusFilter<$PrismaModel>;
};
export type NestedEnumCapacityBookingActorNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityBookingActor | Prisma.EnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CapacityBookingActor[] | Prisma.ListEnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CapacityBookingActor[] | Prisma.ListEnumCapacityBookingActorFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCapacityBookingActorNullableWithAggregatesFilter<$PrismaModel> | $Enums.CapacityBookingActor | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacityBookingActorNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacityBookingActorNullableFilter<$PrismaModel>;
};
export type NestedEnumCapacityConversionModeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityConversionMode | Prisma.EnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.CapacityConversionMode[] | Prisma.ListEnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.CapacityConversionMode[] | Prisma.ListEnumCapacityConversionModeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumCapacityConversionModeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CapacityConversionMode | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacityConversionModeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacityConversionModeNullableFilter<$PrismaModel>;
};
export type NestedEnumCapacityPartnershipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityPartnershipStatus | Prisma.EnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityPartnershipStatus[] | Prisma.ListEnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityPartnershipStatus[] | Prisma.ListEnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityPartnershipStatusFilter<$PrismaModel> | $Enums.CapacityPartnershipStatus;
};
export type NestedEnumCapacityPartnershipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CapacityPartnershipStatus | Prisma.EnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CapacityPartnershipStatus[] | Prisma.ListEnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CapacityPartnershipStatus[] | Prisma.ListEnumCapacityPartnershipStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCapacityPartnershipStatusWithAggregatesFilter<$PrismaModel> | $Enums.CapacityPartnershipStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCapacityPartnershipStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCapacityPartnershipStatusFilter<$PrismaModel>;
};
export type NestedEnumLogisticsPartnerKindFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsPartnerKind | Prisma.EnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsPartnerKind[] | Prisma.ListEnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsPartnerKind[] | Prisma.ListEnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsPartnerKindFilter<$PrismaModel> | $Enums.LogisticsPartnerKind;
};
export type NestedEnumLogisticsPartnerKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsPartnerKind | Prisma.EnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsPartnerKind[] | Prisma.ListEnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsPartnerKind[] | Prisma.ListEnumLogisticsPartnerKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsPartnerKindWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsPartnerKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsPartnerKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsPartnerKindFilter<$PrismaModel>;
};
export type NestedEnumHubOperatorFilter<$PrismaModel = never> = {
    equals?: $Enums.HubOperator | Prisma.EnumHubOperatorFieldRefInput<$PrismaModel>;
    in?: $Enums.HubOperator[] | Prisma.ListEnumHubOperatorFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HubOperator[] | Prisma.ListEnumHubOperatorFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHubOperatorFilter<$PrismaModel> | $Enums.HubOperator;
};
export type NestedEnumHubOperatorWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HubOperator | Prisma.EnumHubOperatorFieldRefInput<$PrismaModel>;
    in?: $Enums.HubOperator[] | Prisma.ListEnumHubOperatorFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HubOperator[] | Prisma.ListEnumHubOperatorFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHubOperatorWithAggregatesFilter<$PrismaModel> | $Enums.HubOperator;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumHubOperatorFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumHubOperatorFilter<$PrismaModel>;
};
export type NestedEnumLogisticsModeFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsMode | Prisma.EnumLogisticsModeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsModeFilter<$PrismaModel> | $Enums.LogisticsMode;
};
export type NestedEnumRateUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.RateUnit | Prisma.EnumRateUnitFieldRefInput<$PrismaModel>;
    in?: $Enums.RateUnit[] | Prisma.ListEnumRateUnitFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RateUnit[] | Prisma.ListEnumRateUnitFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRateUnitFilter<$PrismaModel> | $Enums.RateUnit;
};
export type NestedEnumContainerTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ContainerType | Prisma.EnumContainerTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ContainerType[] | Prisma.ListEnumContainerTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ContainerType[] | Prisma.ListEnumContainerTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumContainerTypeNullableFilter<$PrismaModel> | $Enums.ContainerType | null;
};
export type NestedEnumLogisticsModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsMode | Prisma.EnumLogisticsModeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsModeWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsMode;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsModeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsModeFilter<$PrismaModel>;
};
export type NestedEnumRateUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RateUnit | Prisma.EnumRateUnitFieldRefInput<$PrismaModel>;
    in?: $Enums.RateUnit[] | Prisma.ListEnumRateUnitFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RateUnit[] | Prisma.ListEnumRateUnitFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumRateUnitWithAggregatesFilter<$PrismaModel> | $Enums.RateUnit;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumRateUnitFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumRateUnitFilter<$PrismaModel>;
};
export type NestedEnumContainerTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContainerType | Prisma.EnumContainerTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ContainerType[] | Prisma.ListEnumContainerTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ContainerType[] | Prisma.ListEnumContainerTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumContainerTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.ContainerType | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumContainerTypeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumContainerTypeNullableFilter<$PrismaModel>;
};
export type NestedEnumLogisticsModeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsMode | Prisma.EnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumLogisticsModeNullableFilter<$PrismaModel> | $Enums.LogisticsMode | null;
};
export type NestedEnumLogisticsModeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsMode | Prisma.EnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.LogisticsMode[] | Prisma.ListEnumLogisticsModeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumLogisticsModeNullableWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsMode | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsModeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsModeNullableFilter<$PrismaModel>;
};
export type NestedEnumLogisticsQuoteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsQuoteStatus | Prisma.EnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsQuoteStatus[] | Prisma.ListEnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsQuoteStatus[] | Prisma.ListEnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsQuoteStatusFilter<$PrismaModel> | $Enums.LogisticsQuoteStatus;
};
export type NestedEnumLogisticsQuoteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsQuoteStatus | Prisma.EnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsQuoteStatus[] | Prisma.ListEnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsQuoteStatus[] | Prisma.ListEnumLogisticsQuoteStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsQuoteStatusWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsQuoteStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsQuoteStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsQuoteStatusFilter<$PrismaModel>;
};
export type NestedEnumPickupStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PickupStatus | Prisma.EnumPickupStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PickupStatus[] | Prisma.ListEnumPickupStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PickupStatus[] | Prisma.ListEnumPickupStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPickupStatusFilter<$PrismaModel> | $Enums.PickupStatus;
};
export type NestedEnumPickupStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PickupStatus | Prisma.EnumPickupStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PickupStatus[] | Prisma.ListEnumPickupStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PickupStatus[] | Prisma.ListEnumPickupStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPickupStatusWithAggregatesFilter<$PrismaModel> | $Enums.PickupStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPickupStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPickupStatusFilter<$PrismaModel>;
};
export type NestedEnumHubReceiptConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.HubReceiptCondition | Prisma.EnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    in?: $Enums.HubReceiptCondition[] | Prisma.ListEnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HubReceiptCondition[] | Prisma.ListEnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHubReceiptConditionFilter<$PrismaModel> | $Enums.HubReceiptCondition;
};
export type NestedEnumHubReceiptConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HubReceiptCondition | Prisma.EnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    in?: $Enums.HubReceiptCondition[] | Prisma.ListEnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.HubReceiptCondition[] | Prisma.ListEnumHubReceiptConditionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumHubReceiptConditionWithAggregatesFilter<$PrismaModel> | $Enums.HubReceiptCondition;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumHubReceiptConditionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumHubReceiptConditionFilter<$PrismaModel>;
};
export type NestedEnumLogisticsShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsShipmentStatus | Prisma.EnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsShipmentStatusFilter<$PrismaModel> | $Enums.LogisticsShipmentStatus;
};
export type NestedEnumLogisticsShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsShipmentStatus | Prisma.EnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsShipmentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsShipmentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsShipmentStatusFilter<$PrismaModel>;
};
export type NestedEnumShipmentLegKindFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentLegKind | Prisma.EnumShipmentLegKindFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentLegKind[] | Prisma.ListEnumShipmentLegKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentLegKind[] | Prisma.ListEnumShipmentLegKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentLegKindFilter<$PrismaModel> | $Enums.ShipmentLegKind;
};
export type NestedEnumShipmentLegStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentLegStatus | Prisma.EnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentLegStatus[] | Prisma.ListEnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentLegStatus[] | Prisma.ListEnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentLegStatusFilter<$PrismaModel> | $Enums.ShipmentLegStatus;
};
export type NestedEnumShipmentLegKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentLegKind | Prisma.EnumShipmentLegKindFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentLegKind[] | Prisma.ListEnumShipmentLegKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentLegKind[] | Prisma.ListEnumShipmentLegKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentLegKindWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentLegKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumShipmentLegKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumShipmentLegKindFilter<$PrismaModel>;
};
export type NestedEnumShipmentLegStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentLegStatus | Prisma.EnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentLegStatus[] | Prisma.ListEnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentLegStatus[] | Prisma.ListEnumShipmentLegStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentLegStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentLegStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumShipmentLegStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumShipmentLegStatusFilter<$PrismaModel>;
};
export type NestedEnumLogisticsShipmentStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsShipmentStatus | Prisma.EnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumLogisticsShipmentStatusNullableFilter<$PrismaModel> | $Enums.LogisticsShipmentStatus | null;
};
export type NestedEnumShipmentEventSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentEventSource | Prisma.EnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentEventSource[] | Prisma.ListEnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentEventSource[] | Prisma.ListEnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentEventSourceFilter<$PrismaModel> | $Enums.ShipmentEventSource;
};
export type NestedEnumLogisticsShipmentStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsShipmentStatus | Prisma.EnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.LogisticsShipmentStatus[] | Prisma.ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumLogisticsShipmentStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsShipmentStatus | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsShipmentStatusNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsShipmentStatusNullableFilter<$PrismaModel>;
};
export type NestedEnumShipmentEventSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentEventSource | Prisma.EnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentEventSource[] | Prisma.ListEnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentEventSource[] | Prisma.ListEnumShipmentEventSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentEventSourceWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentEventSource;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumShipmentEventSourceFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumShipmentEventSourceFilter<$PrismaModel>;
};
export type NestedEnumLogisticsDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsDocumentType | Prisma.EnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsDocumentType[] | Prisma.ListEnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsDocumentType[] | Prisma.ListEnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsDocumentTypeFilter<$PrismaModel> | $Enums.LogisticsDocumentType;
};
export type NestedEnumLogisticsDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsDocumentType | Prisma.EnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsDocumentType[] | Prisma.ListEnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsDocumentType[] | Prisma.ListEnumLogisticsDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsDocumentType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsDocumentTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsDocumentTypeFilter<$PrismaModel>;
};
export type NestedEnumShipmentUploadKindFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentUploadKind | Prisma.EnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentUploadKind[] | Prisma.ListEnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentUploadKind[] | Prisma.ListEnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentUploadKindFilter<$PrismaModel> | $Enums.ShipmentUploadKind;
};
export type NestedEnumShipmentUploadKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentUploadKind | Prisma.EnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentUploadKind[] | Prisma.ListEnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentUploadKind[] | Prisma.ListEnumShipmentUploadKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentUploadKindWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentUploadKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumShipmentUploadKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumShipmentUploadKindFilter<$PrismaModel>;
};
export type NestedEnumLogisticsClaimTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsClaimType | Prisma.EnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsClaimType[] | Prisma.ListEnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsClaimType[] | Prisma.ListEnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsClaimTypeFilter<$PrismaModel> | $Enums.LogisticsClaimType;
};
export type NestedEnumLogisticsClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsClaimStatus | Prisma.EnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsClaimStatus[] | Prisma.ListEnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsClaimStatus[] | Prisma.ListEnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsClaimStatusFilter<$PrismaModel> | $Enums.LogisticsClaimStatus;
};
export type NestedEnumLogisticsClaimTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsClaimType | Prisma.EnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsClaimType[] | Prisma.ListEnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsClaimType[] | Prisma.ListEnumLogisticsClaimTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsClaimTypeWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsClaimType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsClaimTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsClaimTypeFilter<$PrismaModel>;
};
export type NestedEnumLogisticsClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogisticsClaimStatus | Prisma.EnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LogisticsClaimStatus[] | Prisma.ListEnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LogisticsClaimStatus[] | Prisma.ListEnumLogisticsClaimStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLogisticsClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.LogisticsClaimStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLogisticsClaimStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLogisticsClaimStatusFilter<$PrismaModel>;
};
export type NestedEnumOrderChargeKindFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderChargeKind | Prisma.EnumOrderChargeKindFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderChargeKind[] | Prisma.ListEnumOrderChargeKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderChargeKind[] | Prisma.ListEnumOrderChargeKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderChargeKindFilter<$PrismaModel> | $Enums.OrderChargeKind;
};
export type NestedEnumOrderChargeKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderChargeKind | Prisma.EnumOrderChargeKindFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderChargeKind[] | Prisma.ListEnumOrderChargeKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderChargeKind[] | Prisma.ListEnumOrderChargeKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderChargeKindWithAggregatesFilter<$PrismaModel> | $Enums.OrderChargeKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOrderChargeKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOrderChargeKindFilter<$PrismaModel>;
};
export type NestedEnumBankAccountStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BankAccountStatus | Prisma.EnumBankAccountStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BankAccountStatus[] | Prisma.ListEnumBankAccountStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BankAccountStatus[] | Prisma.ListEnumBankAccountStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBankAccountStatusFilter<$PrismaModel> | $Enums.BankAccountStatus;
};
export type NestedEnumBankAccountStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BankAccountStatus | Prisma.EnumBankAccountStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BankAccountStatus[] | Prisma.ListEnumBankAccountStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BankAccountStatus[] | Prisma.ListEnumBankAccountStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBankAccountStatusWithAggregatesFilter<$PrismaModel> | $Enums.BankAccountStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBankAccountStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBankAccountStatusFilter<$PrismaModel>;
};
export type NestedEnumSupplyContractStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplyContractStatus | Prisma.EnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplyContractStatus[] | Prisma.ListEnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplyContractStatus[] | Prisma.ListEnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplyContractStatusFilter<$PrismaModel> | $Enums.SupplyContractStatus;
};
export type NestedEnumSupplyContractStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupplyContractStatus | Prisma.EnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SupplyContractStatus[] | Prisma.ListEnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SupplyContractStatus[] | Prisma.ListEnumSupplyContractStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSupplyContractStatusWithAggregatesFilter<$PrismaModel> | $Enums.SupplyContractStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSupplyContractStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSupplyContractStatusFilter<$PrismaModel>;
};
export type NestedEnumInspectorApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectorApplicationStatus | Prisma.EnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectorApplicationStatus[] | Prisma.ListEnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectorApplicationStatus[] | Prisma.ListEnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectorApplicationStatusFilter<$PrismaModel> | $Enums.InspectorApplicationStatus;
};
export type NestedEnumInspectorApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectorApplicationStatus | Prisma.EnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectorApplicationStatus[] | Prisma.ListEnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectorApplicationStatus[] | Prisma.ListEnumInspectorApplicationStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectorApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InspectorApplicationStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInspectorApplicationStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInspectorApplicationStatusFilter<$PrismaModel>;
};
export type NestedEnumInspectorStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectorStatus | Prisma.EnumInspectorStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectorStatus[] | Prisma.ListEnumInspectorStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectorStatus[] | Prisma.ListEnumInspectorStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectorStatusFilter<$PrismaModel> | $Enums.InspectorStatus;
};
export type NestedEnumInspectorStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InspectorStatus | Prisma.EnumInspectorStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InspectorStatus[] | Prisma.ListEnumInspectorStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InspectorStatus[] | Prisma.ListEnumInspectorStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInspectorStatusWithAggregatesFilter<$PrismaModel> | $Enums.InspectorStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInspectorStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInspectorStatusFilter<$PrismaModel>;
};
export type NestedEnumSubscriptionPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | Prisma.EnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionPlan[] | Prisma.ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionPlan[] | Prisma.ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionPlanFilter<$PrismaModel> | $Enums.SubscriptionPlan;
};
export type NestedEnumPlanIntervalNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanInterval | Prisma.EnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    in?: $Enums.PlanInterval[] | Prisma.ListEnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.PlanInterval[] | Prisma.ListEnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumPlanIntervalNullableFilter<$PrismaModel> | $Enums.PlanInterval | null;
};
export type NestedEnumSubscriptionSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionSource | Prisma.EnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionSource[] | Prisma.ListEnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionSource[] | Prisma.ListEnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionSourceFilter<$PrismaModel> | $Enums.SubscriptionSource;
};
export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | Prisma.EnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus;
};
export type NestedEnumSubscriptionPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionPlan | Prisma.EnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionPlan[] | Prisma.ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionPlan[] | Prisma.ListEnumSubscriptionPlanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionPlanWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionPlan;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSubscriptionPlanFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSubscriptionPlanFilter<$PrismaModel>;
};
export type NestedEnumPlanIntervalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanInterval | Prisma.EnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    in?: $Enums.PlanInterval[] | Prisma.ListEnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.PlanInterval[] | Prisma.ListEnumPlanIntervalFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumPlanIntervalNullableWithAggregatesFilter<$PrismaModel> | $Enums.PlanInterval | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPlanIntervalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPlanIntervalNullableFilter<$PrismaModel>;
};
export type NestedEnumSubscriptionSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionSource | Prisma.EnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionSource[] | Prisma.ListEnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionSource[] | Prisma.ListEnumSubscriptionSourceFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionSourceWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionSource;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSubscriptionSourceFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSubscriptionSourceFilter<$PrismaModel>;
};
export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | Prisma.EnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SubscriptionStatus[] | Prisma.ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSubscriptionStatusFilter<$PrismaModel>;
};
export type NestedEnumOutboundMessageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboundMessageStatus | Prisma.EnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OutboundMessageStatus[] | Prisma.ListEnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OutboundMessageStatus[] | Prisma.ListEnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOutboundMessageStatusFilter<$PrismaModel> | $Enums.OutboundMessageStatus;
};
export type NestedEnumOutboundMessageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboundMessageStatus | Prisma.EnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.OutboundMessageStatus[] | Prisma.ListEnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OutboundMessageStatus[] | Prisma.ListEnumOutboundMessageStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOutboundMessageStatusWithAggregatesFilter<$PrismaModel> | $Enums.OutboundMessageStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOutboundMessageStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOutboundMessageStatusFilter<$PrismaModel>;
};
export type NestedEnumLeadKindFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadKind | Prisma.EnumLeadKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadKind[] | Prisma.ListEnumLeadKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadKind[] | Prisma.ListEnumLeadKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadKindFilter<$PrismaModel> | $Enums.LeadKind;
};
export type NestedEnumLeadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | Prisma.EnumLeadStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel> | $Enums.LeadStatus;
};
export type NestedEnumLeadKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadKind | Prisma.EnumLeadKindFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadKind[] | Prisma.ListEnumLeadKindFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadKind[] | Prisma.ListEnumLeadKindFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadKindWithAggregatesFilter<$PrismaModel> | $Enums.LeadKind;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLeadKindFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLeadKindFilter<$PrismaModel>;
};
export type NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | Prisma.EnumLeadStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeadStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel>;
};
