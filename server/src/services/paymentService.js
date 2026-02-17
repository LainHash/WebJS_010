import * as paymentRepo from "../repos/paymentRepo.js";
import Payment from "../models/Payment.js";

export const getAll = async () => {
  const rows = await paymentRepo.findAll();
  return rows.map((r) => Payment.fromDb(r));
};

export const getById = async (id) => {
  const row = await paymentRepo.findById(id);
  return Payment.fromDb(row);
};

export const getByInvoiceId = async (invoiceId) => {
  const rows = await paymentRepo.findByInvoiceId(invoiceId);
  return rows.map((r) => Payment.fromDb(r));
};

export const createPayment = async (data) => {
  const payment = new Payment(data);
  const insertId = await paymentRepo.create([
    data.invoiceId || payment.InvoiceId,
    data.paymentMethod || payment.PaymentMethod,
    data.paymentProvider || payment.PaymentProvider,
    data.transactionId || payment.TransactionId,
    data.amount || payment.Amount,
    data.currency || payment.Currency,
    data.status || payment.Status,
    data.paidAt || payment.PaidAt || null,
    new Date(),
    new Date(),
  ]);
  payment.Id = insertId;
  return payment;
};

export const updatePayment = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Payment({ ...existing, ...data, Id: id });
  const affected = await paymentRepo.updateById(id, [
    data.invoiceId ?? existing.InvoiceId,
    data.paymentMethod ?? existing.PaymentMethod,
    data.paymentProvider ?? existing.PaymentProvider,
    data.transactionId ?? existing.TransactionId,
    data.amount ?? existing.Amount,
    data.currency ?? existing.Currency,
    data.status ?? existing.Status,
    data.paidAt ?? existing.PaidAt,
    existing.CreatedAt,
    new Date(),
  ]);
  return affected > 0 ? await getById(id) : null;
};

export const deletePayment = async (id) => {
  const affected = await paymentRepo.removeById(id);
  return affected > 0;
};
