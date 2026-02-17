export default class Laptop {
  ProductId;
  Type;
  Inches;
  ScreenResolution;
  CpuId;
  GpuId = null;
  Memory;
  OpSys;
  Weight;
  CreatedAt = null;
  UpdatedAt = null;
  constructor({
    productId,
    type,
    inches,
    screen,
    cpuId,
    gpuId,
    memory,
    os,
    weight,
    createdAt,
    updatedAt,
  } = {}) {
    this.ProductId = productId;
    this.Type = type;
    this.Inches = inches;
    this.ScreenResolution = screen;
    this.CpuId = cpuId;
    this.GpuId = gpuId;
    this.Memory = memory;
    this.OpSys = os;
    this.Weight = weight;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Laptop({
      productId: row.LaptopId,
      type: row.LaptopType,
      inches: row.Inches,
      screen: row.ScreenResolution,
      cpuId: row.CpuId,
      gpuId: row.GpuId,
      memory: row.Memory,
      os: row.OpSys,
      weight: row.Weight,
      createdAt: row.CreatedAt,
      updatedAt: row.UpdatedAt,
    });
  }
  toInsertParams() {
    return [
      this.Type,
      this.Inches,
      this.ScreenResolution,
      this.CpuId,
      this.GpuId,
      this.Memory,
      this.OpSys,
      this.Weight,
      this.CreatedAt,
      this.UpdatedAt,
      this.ProductId,
    ];
  }
  toUpdateParams() {
    return [
      this.Type,
      this.Inches,
      this.ScreenResolution,
      this.CpuId,
      this.GpuId,
      this.Memory,
      this.OpSys,
      this.Weight,
      this.CreatedAt,
      this.UpdatedAt,
      this.ProductId,
    ];
  }
}
