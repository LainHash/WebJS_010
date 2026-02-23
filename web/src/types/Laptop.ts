export interface Laptop {
  Id: number;
  Type: string;
  Inches: number;
  ScreenResolution: string;
  CpuId: number;
  GpuId: number | null;
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
