export default class Laptop {
  Id;
  Code;
  Name;
  Type;
  Inches;
  ScreenResolution;
  CpuId;
  GpuId = null;
  Memory;
  OpSys;
  Weight;
  CategoryId;
  SupplierId;
  UnitPrice;
  UnitsInStock;
  Discontinued;
  CreatedAt = null;
  UpdatedAt = null;
  constructor({
    id,
    code,
    name,
    type,
    inches,
    screen,
    cpuId,
    gpuId,
    memory,
    os,
    weight,
    categoryId,
    supplierId,
    unitPrice,
    unitsInStock,
    discontinued,
    createdAt,
    updatedAt,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.Name = name;
    this.Type = type;
    this.Inches = inches;
    this.ScreenResolution = screen;
    this.CpuId = cpuId;
    this.GpuId = gpuId;
    this.Memory = memory;
    this.OpSys = os;
    this.Weight = weight;
    this.CategoryId = categoryId;
    this.SupplierId = supplierId;
    this.UnitPrice = unitPrice;
    this.UnitsInStock = unitsInStock;
    this.Discontinued = discontinued;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Laptop({
      id: row.LaptopId,
      code: row.LaptopCode,
      name: row.LaptopName,
      type: row.LaptopType,
      inches: row.Inches,
      screen: row.ScreenResolution,
      cpuId: row.CpuId,
      gpuId: row.GpuId,
      memory: row.Memory,
      os: row.OpSys,
      weight: row.Weight,
      categoryId: row.CategoryId,
      supplierId: row.SupplierId,
      unitPrice: row.UnitPrice,
      unitsInStock: row.UnitsInStock,
      discontinued: row.Discontinued,
      createdAt: row.CreatedAt,
      updatedAt: row.UpdatedAt,
    });
  }
  toInsertParams() {
    return [
      this.Id,
      this.Code,
      this.Name,
      this.Type,
      this.Inches,
      this.ScreenResolution,
      this.CpuId,
      this.GpuId,
      this.Memory,
      this.OpSys,
      this.Weight,
      this.CategoryId,
      this.SupplierId,
      this.UnitPrice,
      this.UnitsInStock,
      this.Discontinued,
      this.CreatedAt,
      this.UpdatedAt,
    ];
  }
  toUpdateParams() {
    return [
      this.Id,
      this.Code,
      this.Name,
      this.Type,
      this.Inches,
      this.ScreenResolution,
      this.CpuId,
      this.GpuId,
      this.Memory,
      this.OpSys,
      this.Weight,
      this.CategoryId,
      this.SupplierId,
      this.UnitPrice,
      this.UnitsInStock,
      this.Discontinued,
      this.CreatedAt,
      this.UpdatedAt,
    ];
  }
}
