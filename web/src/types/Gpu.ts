export interface Gpu {
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
  MemorySize: number;
  MemoryType: string;
  Clock: number;
  UnifiedShader: number;
  Tmu: number;
  Rop: number;
  Bus: string;
  Igpu: boolean;
}

export interface GpuResponse {
  gpu: Gpu;
  success: boolean;
}

export interface GpuListResponse {
  gpus: Gpu[];
  success: boolean;
  totalCount: number;
}
