import type {
  Product,
  ProductResponse,
  ProductListResponse,
} from "~/types/Product";
import type { Category } from "~/types/Category";
import type { Supplier } from "~/types/Supplier";
import { apiCall, buildUrl } from "~/ultis/api";

export const getProducts = async (
  page: number,
  pageSize: number,
): Promise<ProductListResponse> => {
  const url = await buildUrl("/products", { page, pageSize });
  const products = await apiCall<Product[]>(url);
  return { products, success: true, totalCount: products.length };
};

export const getProduct = async (id: number): Promise<ProductResponse> => {
  const raw = await apiCall<Product>(`/products/${id}`);
  return { product: raw, success: true };
};

export const createProduct = async (
  payload: Omit<Product, "Id">,
): Promise<ProductResponse> => {
  return apiCall<ProductResponse>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const updateProduct = async (
  id: number,
  payload: Omit<Product, "Id">,
): Promise<ProductResponse> => {
  return apiCall<ProductResponse>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const deleteProduct = async (id: number): Promise<void> => {
  await apiCall<void>(`/products/${id}`, { method: "DELETE" });
};

// // convenience helpers for category/supplier lists used by the UI filters
export const getCategories = async (): Promise<Category[]> => {
  const raw = await apiCall<Category[]>("/categories");
  return raw;
};

export const getSuppliers = async (): Promise<Supplier[]> => {
  const raw = await apiCall<Supplier[]>("/suppliers");
  return raw;
};
