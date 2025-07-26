const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

export async function request<T = unknown>(
  path: string,
  options: RequestInit = {},
) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',          // ⬅️  send/receive session cookie
    headers: { Accept: 'application/json', ...options.headers },
    ...options,
  });

  // Let the caller handle non-2xx responses
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || res.statusText);
  }
  // Empty body? – return void
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const post = <T = unknown>(
  path: string,
  body: Record<string, unknown> = {},
  extra?: RequestInit,
) =>
  request<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...extra,
  });
