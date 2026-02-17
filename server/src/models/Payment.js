export default class Payment {
  Id;
  Code;

  InvoiceId;

  PaymentMethod;
  PaymentProvider;
  TransactionId;

  Amount;
  Currency;

  Status;
  PaidAt;

  CreatedAt;
  UpdatedAt;
  constructor({
    id,
    code,
    invoiceId,
    paymentMethod,
    paymentProvider,
    transactionId,
    amount,
    currency,
    status,
    paidAt,
    createdAt,
    updatedAt,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.InvoiceId = invoiceId;
    this.PaymentMethod = paymentMethod;
    this.PaymentProvider = paymentProvider;
    this.TransactionId = transactionId;
    this.Amount = amount;
    this.Currency = currency;
    this.Status = status;
    this.PaidAt = paidAt;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }

  static fromDb(row) {
    if (!row) return null;
    return new Payment({
      id: row.PaymentId,
      code: row.PaymentCode,
      invoiceId: row.InvoiceId,
      paymentMethod: row.PaymentMethod,
      paymentProvider: row.PaymentProvider,
      transactionId: row.TransactionId,
      amount: row.Amount,
      currency: row.Currency,
      status: row.Status,
      paidAt: row.PaidAt || null,
      createdAt: row.CreatedAt || null,
      updatedAt: row.UpdatedAt || null,
    });
  }

  toInsertParams() {
    return [
      this.InvoiceId,
      this.PaymentMethod,
      this.PaymentProvider,
      this.TransactionId,
      this.Amount,
      this.Currency,
      this.Status,
      this.PaidAt || null,
      this.CreatedAt || null,
      this.UpdatedAt || null,
    ];
  }
  toUpdateParams() {
    return [
      this.InvoiceId,
      this.PaymentMethod,
      this.PaymentProvider,
      this.TransactionId,
      this.Amount,
      this.Currency,
      this.Status,
      this.PaidAt || null,
      this.CreatedAt || null,
      this.UpdatedAt || null,
    ];
  }
}
