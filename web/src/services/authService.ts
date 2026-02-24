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
