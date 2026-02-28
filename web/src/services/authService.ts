import { apiCall } from "../ultis/api";

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  // customer-specific fields
  firstname?: string;
  lastname?: string;
  gender?: string;
  birthday?: string;
  city?: string;
  country?: string;
  address?: string;
  phone?: string;
  cic?: string;
}

export async function register(data: RegisterData) {
  return apiCall<{ user: any; customer: any }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(email: string, password: string) {
  return apiCall<{ user: any; token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getCurrentUser(userId: number) {
  return apiCall<any>(`/users/${userId}`, {
    method: "GET",
  });
}

export async function getCustomerInfo(customerId?: number) {
  const endpoint = customerId ? `/customers/${customerId}` : "/customers/me";
  return apiCall<any>(endpoint, {
    method: "GET",
  });
}

export async function updateUserProfile(userId: number, data: any) {
  return apiCall<any>(`/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function updateCustomerProfile(customerId: number, data: any) {
  return apiCall<any>(`/customers/${customerId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
