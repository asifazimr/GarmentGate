/** A text field from a FormData (file inputs and missing fields read as ''). */
export function formString(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === 'string' ? value : '';
}
