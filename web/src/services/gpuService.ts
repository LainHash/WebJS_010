import type { Gpu, GpuResponse } from "~/types/Gpu";
import { apiCall } from "~/ultis/api";

const mapGpuFromDb = (raw: any): Gpu => {
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
    MemorySize: raw.MemorySize,
    MemoryType: raw.MemoryType,
    Clock: raw.Clock,
    UnifiedShader: raw.UnifiedShader,
    Tmu: raw.Tmu,
    Rop: raw.Rop,
    Bus: raw.Bus,
    Igpu: raw.Igpu,
  };
};

export const getGpu = async (id: number): Promise<GpuResponse> => {
  const raw = await apiCall<any>(`/products/gpu/${id}`);
  const gpu = mapGpuFromDb(raw);
  return { gpu, success: true };
};
