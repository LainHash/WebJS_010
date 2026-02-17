export default class InvoiceDetail {
  Id;
  InvoiceId;
  ProductId;
  CategoryId;
  ProductName;

  UnitPrice;
  Quantity;
  DiscountPercent;
  LineTotal;

  CreatedAt;
  UpdatedAt;

  constructor({
    id,
    invoiceId,
    productId,
    categoryId,
    productName,
    unitPrice,
    quantity,
    discountPercent,
    lineTotal,
    createdAt,
    updatedAt,
  } = {}) {
    this.Id = id;
    this.InvoiceId = invoiceId;
    this.ProductId = productId;
    this.CategoryId = categoryId;
    this.ProductName = productName;
    this.UnitPrice = unitPrice;
    this.Quantity = quantity;
    this.DiscountPercent = discountPercent;
    this.LineTotal = lineTotal;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }

  static fromDb(row) {
    if (!row) return null;
    return new InvoiceDetail({
      id: row.InvoiceDetailId,
      invoiceId: row.InvoiceId,
      productId: row.ProductId,
      categoryId: row.CategoryId,
      productName: row.ProductName,
      unitPrice: row.UnitPrice,
      quantity: row.Quantity,
      discountPercent: row.DiscountPercent,
      lineTotal: row.LineTotal,
      createdAt: row.CreatedAt || null,
      updatedAt: row.UpdatedAt || null,
    });
  }

  toInsertParams() {
    return [
      this.InvoiceId,
      this.ProductId,
      this.CategoryId,
      this.ProductName,
      this.UnitPrice,
      this.Quantity,
      this.DiscountPercent,
      this.LineTotal,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }

  toUpdateParams() {
    return [
      this.InvoiceId,
      this.ProductId,
      this.CategoryId,
      this.ProductName,
      this.UnitPrice,
      this.Quantity,
      this.DiscountPercent,
      this.LineTotal,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }
}
