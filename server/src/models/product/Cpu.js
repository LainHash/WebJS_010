export default class Cpu {
  ProductId;
  Cores;
  Logicals;
  Tdp;
  Socket;
  Speed;
  Turbo;
  CreatedAt = null;
  UpdatedAt = null;

  constructor({
    productId,
    cores,
    logicals,
    tdp,
    socket,
    speed,
    turbo,
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.ProductId = productId;
    this.Cores = cores;
    this.Logicals = logicals;
    this.Tdp = tdp;
    this.Socket = socket;
    this.Speed = speed;
    this.Turbo = turbo;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Cpu({
      productId: row.CpuId,
      cores: row.Cores,
      logicals: row.Logicals,
      tdp: row.Tdp,
      socket: row.Socket,
      speed: row.Speed,
      turbo: row.Turbo,
      createdAt: row.CreatedAt,
      updatedAt: row.UpdatedAt,
    });
  }

  toInsertParams() {
    return [
      this.Cores,
      this.Logicals,
      this.Tdp,
      this.Socket,
      this.Speed,
      this.Turbo,
      this.CreatedAt,
      this.UpdatedAt,
      this.ProductId,
    ];
  }

  toUpdateParams() {
    return [
      this.Cores,
      this.Logicals,
      this.Tdp,
      this.Socket,
      this.Speed,
      this.Turbo,
      this.CreatedAt,
      this.UpdatedAt,
      this.ProductId,
    ];
  }

  validate() {
    return [];
  }
}
