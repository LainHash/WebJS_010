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
    categoryName,
    supplierId,
    companyName,
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
    this.CategoryName = categoryName;
    this.SupplierId = supplierId;
    this.CompanyName = companyName;
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
      categoryName: row.CategoryName,
      supplierId: row.SupplierId,
      companyName: row.CompanyName,
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
