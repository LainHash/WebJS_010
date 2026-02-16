const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000/api";

async function apiCall<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(body || res.statusText || "API Error");
  }

  if (res.status === 204) return null as unknown as T;
  return (await res.json()) as T;
}

export const getLaptops = () => apiCall<any[]>("/laptops");
export const getLaptop = (id: string | number) => apiCall<any>(`/laptops/${id}`);
export const createLaptop = (payload: any) => apiCall<any>("/laptops", { method: "POST", body: JSON.stringify(payload) });
export const updateLaptop = (id: string | number, payload: any) => apiCall<any>(`/laptops/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deleteLaptop = (id: string | number) => apiCall<void>(`/laptops/${id}`, { method: "DELETE" });

export default {
  apiCall,
  getLaptops,
  getLaptop,
  createLaptop,
  updateLaptop,
  deleteLaptop,
};
