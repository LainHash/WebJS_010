export default class InvoiceDetail {
  Id;
  InvoiceId;
  ProductType;
  ProductId;
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
    productType,
    productId,
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
    this.ProductType = productType;
    this.ProductId = productId;
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
      productType: row.ProductType,
      productId: row.ProductId,
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
      this.ProductType,
      this.ProductId,
      this.ProductName,
      this.UnitPrice,
      this.Quantity,
      this.DiscountPercent,
      this.LineTotal,
      this.CreatedAt,
      this.UpdatedAt,
    ];
  }

  toUpdateParams() {
    return [
      this.InvoiceId,
      this.ProductType,
      this.ProductId,
      this.ProductName,
      this.UnitPrice,
      this.Quantity,
      this.DiscountPercent,
      this.LineTotal,
      this.CreatedAt,
      this.UpdatedAt,
    ];
  }
}
