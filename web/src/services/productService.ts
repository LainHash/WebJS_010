import type {
  Product,
  ProductResponse,
  ProductListResponse,
} from "~/types/Product";
import { apiCall, buildUrl } from "~/ultis/api";

export const getProducts = async (
  page: number,
  pageSize: number,
): Promise<ProductListResponse> => {
  const url = await buildUrl("/products", { page, pageSize });
  // the server currently returns a plain array of products, so fetch that
  const products = await apiCall<Product[]>(url);
  // wrap the array into the expected shape; success and totalCount are derived
  return { products, success: true, totalCount: products.length };
};

export const getProduct = async (id: number): Promise<ProductResponse> => {
  return apiCall<ProductResponse>(`/products/${id}`);
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
