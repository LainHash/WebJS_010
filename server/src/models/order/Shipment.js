export default class Shipment {
  Id;
  Code;
  InvoiceId;
  ShippingProvider;

  TrackingNumber;
  ShippingMethod;

  ShippingFee;

  Status;

  ShippedAt;
  DeliveredAt;

  CreatedAt;
  UpdatedAt;

  constructor({
    id,
    code,
    invoiceId,
    shippingProvider,
    trackingNumber,
    shippingMethod,
    shippingFee,
    status,
    shippedAt,
    deliveredAt,
    createdAt,
    updatedAt,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.InvoiceId = invoiceId;
    this.ShippingProvider = shippingProvider;
    this.TrackingNumber = trackingNumber;
    this.ShippingMethod = shippingMethod;
    this.ShippingFee = shippingFee;
    this.Status = status;
    this.ShippedAt = shippedAt;
    this.DeliveredAt = deliveredAt;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }

  static fromDb(row) {
    if (!row) return null;
    return new Shipment({
      id: row.ShipmentId,
      code: row.ShipmentCode,
      invoiceId: row.InvoiceId,
      shippingProvider: row.ShippingProvider,
      trackingNumber: row.TrackingNumber,
      shippingMethod: row.ShippingMethod,
      shippingFee: row.ShippingFee,
      status: row.Status,
      shippedAt: row.ShippedAt || null,
      deliveredAt: row.DeliveredAt || null,
      createdAt: row.CreatedAt || null,
      updatedAt: row.UpdatedAt || null,
    });
  }

  toInsertParams() {
    return [
      this.InvoiceId,
      this.ShippingProvider,
      this.TrackingNumber,
      this.ShippingMethod,
      this.ShippingFee,
      this.Status,
      this.ShippedAt || null,
      this.DeliveredAt || null,
      this.CreatedAt || null,
      this.UpdatedAt || null,
      this.Id,
    ];
  }

  toUpdateParams() {
    return [
      this.InvoiceId,
      this.ShippingProvider,
      this.TrackingNumber,
      this.ShippingMethod,
      this.ShippingFee,
      this.Status,
      this.ShippedAt || null,
      this.DeliveredAt || null,
      this.CreatedAt || null,
      this.UpdatedAt || null,
      this.Id,
    ];
  }
}
