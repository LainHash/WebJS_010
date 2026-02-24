export interface Cpu {
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
  Cores: number;
  Logicals: number;
  Tdp: number;
  Socket: string;
  Speed: number;
  Turbo: number;
}

export interface CpuResponse {
  cpu: Cpu;
  success: boolean;
}

export interface CpuListResponse {
  cpus: Cpu[];
  success: boolean;
  totalCount: number;
}
