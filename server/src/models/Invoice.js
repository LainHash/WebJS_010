export default class Invoice {
  Id;
  Code;
  CustomerId;
  EmployeeId;

  OrderDate;
  RequiredDate;
  ShippedDate = null;

  Status;
  PaymentStatus;
  ShipmentStatus;

  Subtotal;
  DiscountAmount;
  TaxAmount;
  ShippingFee;
  TotalAmount;

  ShippingName;
  ShippingPhone;
  ShippingAddress;
  ShippingCity;
  ShippingCountry;

  Note = null;

  CreatedAt = null;
  UpdatedAt = null;
  constructor({
    id,
    code,
    customerId,
    employeeId,
    orderDate,
    requiredDate,
    shippedDate,
    status,
    paymentStatus,
    shipmentStatus,
    subtotal,
    discountAmount,
    taxAmount,
    shippingFee,
    totalAmount,
    shippingName,
    shippingPhone,
    shippingAddress,
    shippingCity,
    shippingCountry,
    note,
    createdAt,
    updatedAt,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.CustomerId = customerId;
    this.EmployeeId = employeeId;
    this.OrderDate = orderDate;
    this.RequiredDate = requiredDate;
    this.ShippedDate = shippedDate;
    this.Status = status;
    this.PaymentStatus = paymentStatus;
    this.ShipmentStatus = shipmentStatus;
    this.Subtotal = subtotal;
    this.DiscountAmount = discountAmount;
    this.TaxAmount = taxAmount;
    this.ShippingFee = shippingFee;
    this.TotalAmount = totalAmount;
    this.ShippingName = shippingName;
    this.ShippingPhone = shippingPhone;
    this.ShippingAddress = shippingAddress;
    this.ShippingCity = shippingCity;
    this.ShippingCountry = shippingCountry;
    this.Note = note;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }

  static fromDb(row) {
    if (!row) return null;
    return new Invoice({
      id: row.InvoiceId,
      code: row.InvoiceCode,
      customerId: row.CustomerId,
      employeeId: row.EmployeeId,
      orderDate: row.OrderDate,
      requiredDate: row.RequiredDate,
      shippedDate: row.ShippedDate,
      status: row.Status,
      paymentStatus: row.PaymentStatus,
      shipmentStatus: row.ShipmentStatus,
      subtotal: row.Subtotal,
      discountAmount: row.DiscountAmount,
      taxAmount: row.TaxAmount,
      shippingFee: row.ShippingFee,
      totalAmount: row.TotalAmount,
      shippingName: row.ShippingName,
      shippingPhone: row.ShippingPhone,
      shippingAddress: row.ShippingAddress,
      shippingCity: row.ShippingCity,
      shippingCountry: row.ShippingCountry,
      note: row.Note || null,
      createdAt: row.CreatedAt || null,
      updatedAt: row.UpdatedAt || null,
    });
  }

  toInsertParams() {
    return [
      this.CustomerId,
      this.EmployeeId,
      this.OrderDate,
      this.RequiredDate,
      this.ShippedDate,
      this.Status,
      this.PaymentStatus,
      this.ShipmentStatus,
      this.Subtotal,
      this.DiscountAmount,
      this.TaxAmount,
      this.ShippingFee,
      this.TotalAmount,
      this.ShippingName,
      this.ShippingPhone,
      this.ShippingAddress,
      this.ShippingCity,
      this.ShippingCountry,
      this.Note,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }

  toUpdateParams() {
    return [
      this.CustomerId,
      this.EmployeeId,
      this.OrderDate,
      this.RequiredDate,
      this.ShippedDate,
      this.Status,
      this.PaymentStatus,
      this.ShipmentStatus,
      this.Subtotal,
      this.DiscountAmount,
      this.TaxAmount,
      this.ShippingFee,
      this.TotalAmount,
      this.ShippingName,
      this.ShippingPhone,
      this.ShippingAddress,
      this.ShippingCity,
      this.ShippingCountry,
      this.Note,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }
}
