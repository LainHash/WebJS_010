export type Laptop = {
  Id: number;
  Code: string;
  Name: string;
  Type?: string | null;
  Inches?: number | null;
  ScreenResolution?: string | null;
  Memory?: number | null;
  OpSys?: string | null;
  Weight?: number | null;
  UnitPrice?: number | null;
  UnitsInStock?: number | null;
};

export type LaptopCreatePayload = {
  code: string;
  name: string;
  type?: string | null;
  inches?: number | null;
  screen?: string | null;
  cpuId?: number | null;
  gpuId?: number | null;
  memory?: number | null;
  os?: string | null;
  weight?: number | null;
  categoryId?: number | null;
  supplierId?: number | null;
  unitPrice?: number | null;
  unitsInStock?: number | null;
};
