import { Platform } from 'react-native';

/**
 * Base URL for the API.
 * - iOS simulator → localhost (shares host machine's network)
 * - Android emulator → 10.0.2.2 (special alias for host machine)
 * - Production build → live domain
 */
export const API_BASE = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:5173'
    : 'http://localhost:5173'
  : 'https://oocak.com';

/**
 * Custom error thrown by `http()`.
 * Carries the HTTP status + the request path for debugging.
 */
export class HttpError extends Error {
  status: number;
  path: string;
  constructor(status: number, path: string) {
    super(`HTTP ${status} — ${path}`);
    this.name = 'HttpError';
    this.status = status;
    this.path = path;
  }
}

/**
 * Thin wrapper around fetch.
 *
 * - Prefixes the API_BASE
 * - Parses JSON
 * - Throws HttpError on non-2xx
 *
 * Every API call in the app goes through this.
 * If you need auth headers, logging, or retries later,
 * add them here — one place, every endpoint benefits.
 */
export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new HttpError(res.status, path);
  }

  // 204 No Content — no body to parse
  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}
