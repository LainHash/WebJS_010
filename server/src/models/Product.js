export default class Product {
  Id;
  Code;
  Name;

  CategoryId;
  SupplierId;

  UnitPrice;
  UnitsInStock;
  Discontinued;

  CreatedAt;
  UpdatedAt;

  constructor({
    id,
    code,
    name,
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
    return new Product({
      id: row.ProductId,
      code: row.ProductCode,
      name: row.ProductName,
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
      this.CategoryId,
      this.SupplierId,
      this.UnitPrice,
      this.UnitsInStock,
      this.Discontinued,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }
  toUpdateParams() {
    return [
      this.Name,
      this.CategoryId,
      this.SupplierId,
      this.UnitPrice,
      this.UnitsInStock,
      this.Discontinued,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }
}
