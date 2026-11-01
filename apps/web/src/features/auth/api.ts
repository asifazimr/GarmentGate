'use client';

import {
  type AuthUser,
  AuthResponseSchema,
  type ForgotPasswordInput,
  homePathFor,
  type LoginInput,
  type RegisterInput,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiJson, apiSend } from '@/lib/api';

export const meQueryKey = ['auth', 'me'] as const;

export function useMe(options: { refetchInterval?: number } = {}) {
  return useQuery({
    queryKey: meQueryKey,
    queryFn: async () => (await apiJson('/auth/me', AuthResponseSchema)).user,
    ...options,
  });
}

export function homeFor(user: AuthUser): string {
  return homePathFor({ role: user.role, kycStatus: user.company?.kycStatus ?? null });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: LoginInput) =>
      (await apiJson('/auth/login', AuthResponseSchema, { method: 'POST', body: input })).user,
    onSuccess: (user) => queryClient.setQueryData(meQueryKey, user),
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: RegisterInput) =>
      (await apiJson('/auth/register', AuthResponseSchema, { method: 'POST', body: input })).user,
    onSuccess: (user) => queryClient.setQueryData(meQueryKey, user),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiSend('/auth/logout', { method: 'POST' }),
    onSettled: () => {
      queryClient.clear();
      // Full navigation (not router.push) so the proxy re-evaluates with the cookies gone
      // and no cached signed-in UI survives.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign('/login');
    },
  });
}

/** Re-issues the access token so routing picks up KYC / email changes, then returns the user. */
export async function refreshUser(): Promise<AuthUser | null> {
  try {
    return (await apiJson('/auth/refresh', AuthResponseSchema, { method: 'POST' })).user;
  } catch {
    return null;
  }
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (input: ForgotPasswordInput) =>
      apiSend('/auth/password/forgot', { method: 'POST', body: input }),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (input: { token: string; password: string }) =>
      apiSend('/auth/password/reset', { method: 'POST', body: input }),
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: () => apiSend('/auth/verify-email/resend', { method: 'POST' }),
  });
}
