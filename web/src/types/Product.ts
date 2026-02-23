export interface Product {
  Id: number;
  Name: string;
  CategoryId: number;
  SupplierId: number;
  CategoryName?: string;
  CompanyName?: string;
  UnitPrice: number;
  UnitsInStock: number;
  Discontinued: boolean;
}

export interface ProductResponse {
  product: Product;
  success: boolean;
}

export interface ProductListResponse {
  products: Product[];
  success: boolean;
  totalCount: number;
}
