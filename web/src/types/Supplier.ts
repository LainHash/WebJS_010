export interface Supplier {
  Id: number;
  CompanyName: string;
  Country: string;
}

export interface SupplierResponse {
  supplier: Supplier;
  success: boolean;
}

export interface SupplierListResponse {
  suppliers: Supplier[];
  success: boolean;
  totalCount: number;
}
