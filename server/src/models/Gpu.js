export default class Gpu {
  ProductId;
  MemorySize;
  MemoryType;
  Clock;
  UnifiedShader;
  Tmu;
  Rop;
  Bus;
  Igpu;
  CreatedAt = null;
  UpdatedAt = null;

  constructor({
    productId,
    memorySize,
    memoryType,
    clock,
    unifiedShader,
    tmu,
    rop,
    bus,
    igpu,
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.ProductId = productId;
    this.MemorySize = memorySize;
    this.MemoryType = memoryType;
    this.Clock = clock;
    this.UnifiedShader = unifiedShader;
    this.Tmu = tmu;
    this.Rop = rop;
    this.Bus = bus;
    this.Igpu = igpu;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Gpu({
      productId: row.GpuId,
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
  static fromDb(row) {
    if (!row) return null;
    return new Gpu({
      productId: row.GpuId,
      memorySize: row.MemorySize,
      memoryType: row.MemoryType,
      clock: row.Clock,
      unifiedShader: row.UnifiedShader,
      tmu: row.Tmu,
      rop: row.Rop,
      bus: row.Bus,
      igpu: row.Igpu,
      createdAt: row.CreatedAt,
      updatedAt: row.UpdatedAt,
    });
  }

  toInsertParams() {
    return [
      this.MemorySize,
      this.MemoryType,
      this.Clock,
      this.UnifiedShader,
      this.Tmu,
      this.Rop,
      this.Bus,
      this.Igpu,
      this.CreatedAt,
      this.UpdatedAt,
      this.ProductId,
    ];
  }

  toUpdateParams() {
    return [
      this.MemorySize,
      this.MemoryType,
      this.Clock,
      this.UnifiedShader,
      this.Tmu,
      this.Rop,
      this.Bus,
      this.Igpu,
      this.CreatedAt,
      this.UpdatedAt,
      this.ProductId,
    ];
  }
}
