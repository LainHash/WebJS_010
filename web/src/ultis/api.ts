const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:3000/api";

export async function apiCall<T = any>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("authToken");
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { ...defaultHeaders, ...(options?.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(body || res.statusText || "API Error");
  }

  if (res.status === 204) return null as unknown as T;
  return (await res.json()) as T;
}

export async function buildUrl(
  endpoint: string,
  params?: Record<string, any>,
): Promise<string> {
  if (!params) return endpoint;
  const url = new URL(endpoint, API_BASE_URL);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, String(value)),
  );
  return url.pathname + url.search;
}
