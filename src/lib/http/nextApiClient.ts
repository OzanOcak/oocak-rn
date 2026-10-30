import axios, { AxiosRequestConfig } from 'axios';
import { getDevHost } from './getDevHost';
import Config from 'react-native-config';

/**
 * Base URL for the API.
 * - iOS simulator → localhost (shares host machine's network)
 * - Android emulator → 10.0.2.2 (special alias for host machine)
 * - Production build → live domain
 */
export const API_BASE = __DEV__
  ? `http://${getDevHost()}:5173`
  : Config.BASE_URL;

/**
 * Custom error thrown by `http()`.
 * Carries the HTTP status + the request path for debugging.
 *
 * `status` is `null` when there was no HTTP response:
 *   - network failure (offline, DNS, server down)
 *   - request timeout
 *   - request aborted (AbortController)
 *   - malformed URL
 *
 * Distinguish `null` (no response) from `4xx/5xx` (server responded with error)
 * in the UI to show the right message.
 */
export class HttpError extends Error {
  status: number | null;
  path: string;
  constructor(status: number | null, path: string) {
    super(
      status != null ? `HTTP ${status} — ${path}` : `Network error — ${path}`,
    );
    this.name = 'HttpError';
    this.status = status;
    this.path = path;
  }
}

/**
 * Thin wrapper around axios.
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
  const config: AxiosRequestConfig = {
    url: path,
    baseURL: API_BASE,
    method: (init?.method as AxiosRequestConfig['method']) ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers as Record<string, string> | undefined),
    },
    data: init?.body,
  };

  try {
    const res = await axios.request<T>(config);

    // axios leaves data undefined for 204
    if (res.status === 204) {
      return undefined as T;
    }

    return res.data;
  } catch (err) {
    // axios throws on non-2xx and on network errors.
    // Map both into HttpError so callers get one error shape.
    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? null;
      throw new HttpError(status, path);
    }
    // Non-axios error (shouldn't happen, but don't swallow it)
    throw err;
  }
}
