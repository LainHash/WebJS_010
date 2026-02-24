import type {
  Product,
  ProductResponse,
  ProductListResponse,
} from "~/types/Product";
import type { Category } from "~/types/Category";
import type { Supplier } from "~/types/Supplier";
import { apiCall, buildUrl } from "~/ultis/api";

// Map database field names to frontend field names
const mapProductFromDb = (raw: any): Product => {
  return {
    Id: raw.ProductId ?? raw.Id,
    Name: raw.ProductName ?? raw.Name,
    Code: raw.ProductCode ?? raw.Code,
    CategoryId: raw.CategoryId,
    SupplierId: raw.SupplierId,
    CategoryName: raw.CategoryName,
    CompanyName: raw.CompanyName,
    UnitPrice: raw.UnitPrice,
    UnitsInStock: raw.UnitsInStock,
    Discontinued: raw.Discontinued,
  };
};

export const getProducts = async (
  page: number,
  pageSize: number,
): Promise<ProductListResponse> => {
  const url = await buildUrl("/products", { page, pageSize });
  const raw = await apiCall<any[]>(url);
  const products = raw.map(mapProductFromDb);
  return { products, success: true, totalCount: products.length };
};

export const getProduct = async (id: number): Promise<ProductResponse> => {
  const raw = await apiCall<any>(`/products/${id}`);
  const product = mapProductFromDb(raw);
  return { product, success: true };
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
