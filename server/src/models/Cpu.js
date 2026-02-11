export default class Cpu {
  Id;
  Code;
  Name;
  Cores;
  Logicals;
  Tdp;
  Socket;
  Speed;
  Turbo;
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
    cores,
    logicals,
    tdp,
    socket,
    speed,
    turbo,
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
    this.Cores = cores;
    this.Logicals = logicals;
    this.Tdp = tdp;
    this.Socket = socket;
    this.Speed = speed;
    this.Turbo = turbo;
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
    return new Cpu({
      id: row.CpuId,
      code: row.CpuCode,
      name: row.CpuName,
      cores: row.Cores,
      logicals: row.Logicals,
      tdp: row.Tdp,
      socket: row.Socket,
      speed: row.Speed,
      turbo: row.Turbo,
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
      this.Cores,
      this.Logicals,
      this.Tdp,
      this.Socket,
      this.Speed,
      this.Turbo,
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
      this.Cores,
      this.Logicals,
      this.Tdp,
      this.Socket,
      this.Speed,
      this.Turbo,
      this.CategoryId,
      this.SupplierId,
      this.UnitPrice,
      this.UnitsInStock,
      this.Discontinued,
      this.CreatedAt,
      this.UpdatedAt,
    ];
  }

  validate() {
    return [];
  }
}
