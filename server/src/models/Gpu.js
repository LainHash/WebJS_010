export default class Gpu {
  Id;
  Code;
  Name;
  MemorySize;
  MemoryType;
  Clock;
  UnifiedShader;
  Tmu;
  Rop;
  Bus;
  Igpu;
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
    memorySize,
    memoryType,
    clock,
    unifiedShader,
    tmu,
    rop,
    bus,
    igpu,
    categoryId,
    supplierId,
    unitPrice,
    unitsInStock,
    discontinued,
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.Name = name;
    this.MemorySize = memorySize;
    this.MemoryType = memoryType;
    this.Clock = clock;
    this.UnifiedShader = unifiedShader;
    this.Tmu = tmu;
    this.Rop = rop;
    this.Bus = bus;
    this.Igpu = igpu;
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
    return new Gpu({
      id: row.GpuId,
      code: row.GpuCode,
      name: row.GpuName,
      memorySize: row.MemorySize,
      memoryType: row.MemoryType,
      clock: row.Clock,
      unifiedShader: row.UnifiedShader,
      tmu: row.Tmu,
      rop: row.Rop,
      bus: row.Bus,
      igpu: row.Igpu,
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
      this.Name,
      this.MemorySize,
      this.MemoryType,
      this.Clock,
      this.UnifiedShader,
      this.Tmu,
      this.Rop,
      this.Bus,
      this.Igpu,
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
      this.Name,
      this.MemorySize,
      this.MemoryType,
      this.Clock,
      this.UnifiedShader,
      this.Tmu,
      this.Rop,
      this.Bus,
      this.Igpu,
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
