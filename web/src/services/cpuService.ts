import type { Cpu, CpuResponse } from "../types/Cpu";
import { apiCall } from "~/ultis/api";

const mapCpuFromDb = (raw: any): Cpu => {
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
    Cores: raw.Cores,
    Logicals: raw.Logicals,
    Tdp: raw.Tdp,
    Socket: raw.Socket,
    Speed: raw.Speed,
    Turbo: raw.Turbo,
  };
};

export const getCpu = async (id: number): Promise<CpuResponse> => {
  const raw = await apiCall<any>(`/products/cpu/${id}`);
  const cpu = mapCpuFromDb(raw);
  return { cpu, success: true };
};
