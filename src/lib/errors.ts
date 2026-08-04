/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** Normalizes an unknown thrown value into a human readable message. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message || error.name || String(error);
  if (typeof error === 'string' && error) return error;
  try {
    // JSON.stringify returns undefined for undefined/symbol/function values,
    // and '{}' for values whose own properties are all non-enumerable.
    const json = JSON.stringify(error);
    if (json !== undefined && json !== '{}') return json;
  } catch {
    // fall through
  }

  // If the object has no enumerable properties (JSON.stringify -> '{}')
  // prefer returning the constructor name (e.g. 'MyError') where helpful.
  if (error && typeof error === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctor = (error as any).constructor?.name;
    if (ctor && ctor !== 'Object') return ctor;
  }

  return String(error);
}

/** Logs an error with a stable context prefix so failures are never invisible. */
export function reportError(context: string, error: unknown): string {
  const message = getErrorMessage(error);
  console.error(`[${context}] ${message}`, error);
  return message;
}
