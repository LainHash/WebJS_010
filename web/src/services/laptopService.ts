import type {
  Laptop,
  LaptopResponse,
  LaptopListResponse,
} from "~/types/Laptop";
import { apiCall, buildUrl } from "~/ultis/api";

const mapLaptopFromDb = (raw: any): Laptop => {
  return {
    Id: raw.ProductId ?? raw.Id,
    Code: raw.ProductCode ?? raw.Code,
    Name: raw.ProductName ?? raw.Name,
    CategoryId: raw.CategoryId,
    SupplierId: raw.SupplierId,
    CategoryName: raw.CategoryName,
    CompanyName: raw.CompanyName,
    UnitPrice: raw.UnitPrice,
    UnitsInStock: raw.UnitsInStock,
    Discontinued: raw.Discontinued,
    Type: raw.LaptopType,
    Inches: raw.Inches,
    ScreenResolution: raw.ScreenResolution,
    CpuId: raw.CpuId,
    CpuName: raw.CpuName,
    GpuId: raw.GpuId,
    GpuName: raw.GpuName,
    Memory: raw.Memory,
    OpSys: raw.OpSys,
    Weight: raw.Weight,
  };
};

export const getLaptop = async (id: number): Promise<LaptopResponse> => {
  const raw = await apiCall<any>(`/products/laptop/${id}`);
  const laptop = mapLaptopFromDb(raw);
  return { laptop, success: true };
};
