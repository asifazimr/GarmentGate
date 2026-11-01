import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { ApiError } from './api';

/**
 * Puts server-side validation errors on the matching fields and returns a message for
 * anything that isn't field-specific (or null if every error was placed on a field).
 */
export function applyServerErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fields: readonly string[],
  fallback: string,
): string | null {
  if (!(error instanceof ApiError)) return fallback;
  let unplaced = error.fieldErrors.length === 0;
  for (const issue of error.fieldErrors) {
    const root = issue.path.split('.')[0] ?? '';
    if (fields.includes(root)) {
      setError(root as Path<T>, { type: 'server', message: issue.message });
    } else {
      unplaced = true;
    }
  }
  return unplaced ? error.message : null;
}
