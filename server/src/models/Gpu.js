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
  Chip;
  CategoryId;
  SupplierId;
  UnitPrice;
  UnitsInStock;
  Discontinued;

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
    chip,
    categoryId,
    supplierId,
    unitPrice,
    unitsInStock,
    discontinued,
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
    this.Chip = chip;
    this.CategoryId = categoryId;
    this.SupplierId = supplierId;
    this.UnitPrice = unitPrice;
    this.UnitsInStock = unitsInStock;
    this.Discontinued = discontinued;
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
      chip: row.Chip,
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
      this.Chip,
      this.CategoryId,
      this.SupplierId,
      this.UnitPrice,
      this.UnitsInStock,
      this.Discontinued,
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
      this.Chip,
      this.CategoryId,
      this.SupplierId,
      this.UnitPrice,
      this.UnitsInStock,
      this.Discontinued,
    ];
  }

  validate() {
    return [];
  }
}
