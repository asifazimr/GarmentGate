'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/patterns/error-state';

/** A page crashed while rendering: say so, keep the shell, and let the user try again. */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-16">
      <ErrorState onRetry={reset} />
    </div>
  );
}
