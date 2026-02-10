export default class Cpu {
  constructor({
    Id,
    Code,
    Name,
    Cores,
    Logicals,
    Tdp,
    Socket,
    Speed,
    Turbo,
    CategoryId,
    SupplierId,
    UnitPrice,
    UnitsInStock,
    Discontinued,
  } = {}) {
    this.Id = Id;
    this.Code = Code;
    this.Name = Name;
    this.Cores = Cores;
    this.Logicals = Logicals;
    this.Tdp = Tdp;
    this.Socket = Socket;
    this.Speed = Speed;
    this.Turbo = Turbo;
    this.CategoryId = CategoryId;
    this.SupplierId = SupplierId;
    this.UnitPrice = UnitPrice;
    this.UnitsInStock = UnitsInStock;
    this.Discontinued = Discontinued;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Cpu({
      Id: row.CpuId,
      Code: row.CpuCode,
      Name: row.CpuName,
      Cores: row.Cores,
      Logicals: row.Logicals,
      Tdp: row.Tdp,
      Socket: row.Socket,
      Speed: row.Speed,
      Turbo: row.Turbo,
      CategoryId: row.CategoryId,
      SupplierId: row.SupplierId,
      UnitPrice: row.UnitPrice,
      UnitsInStock: row.UnitsInStock,
      Discontinued: row.Discontinued,
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
    ];
  }

  validate() {
    return [];
  }
}
