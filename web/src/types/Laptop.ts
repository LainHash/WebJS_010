export interface Laptop {
  Id: number;
  Code: string;
  Name: string;
  CategoryId: number;
  SupplierId: number;
  CategoryName?: string;
  CompanyName?: string;
  UnitPrice: number;
  UnitsInStock: number;
  Discontinued: boolean;
  Type: string;
  Inches: number;
  ScreenResolution: string;
  CpuId: number;
  CpuName?: string;
  GpuId: number | null;
  GpuName?: string;
  Memory: string;
  OpSys: string;
  Weight: string;
}

export interface LaptopResponse {
  laptop: Laptop;
  success: boolean;
}

export interface LaptopListResponse {
  laptops: Laptop[];
  success: boolean;
  totalCount: number;
}
