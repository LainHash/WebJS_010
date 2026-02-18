import * as invoiceRepo from "../../repos/order/invoiceRepo.js";
import Invoice from "../../models/order/Invoice.js";

export const getAll = async () => {
  const rows = await invoiceRepo.findAll();
  return rows.map((r) => Invoice.fromDb(r));
};

export const getById = async (id) => {
  const row = await invoiceRepo.findById(id);
  return Invoice.fromDb(row);
};

export const createInvoice = async (data) => {
  const invoice = new Invoice(data);
  const insertId = await invoiceRepo.create([
    data.customerId || invoice.CustomerId,
    data.employeeId || invoice.EmployeeId,
    data.orderDate || invoice.OrderDate,
    data.requiredDate || invoice.RequiredDate,
    data.shippedDate || invoice.ShippedDate || null,
    data.status || invoice.Status,
    data.paymentStatus || invoice.PaymentStatus,
    data.shipmentStatus || invoice.ShipmentStatus,
    data.subtotal || invoice.Subtotal,
    data.discountAmount || invoice.DiscountAmount,
    data.taxAmount || invoice.TaxAmount,
    data.shippingFee || invoice.ShippingFee,
    data.totalAmount || invoice.TotalAmount,
    data.shippingName || invoice.ShippingName,
    data.shippingPhone || invoice.ShippingPhone,
    data.shippingAddress || invoice.ShippingAddress,
    data.shippingCity || invoice.ShippingCity,
    data.shippingCountry || invoice.ShippingCountry,
    data.note || invoice.Note || null,
    new Date(),
    new Date(),
  ]);
  invoice.Id = insertId;
  return invoice;
};

export const updateInvoice = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Invoice({ ...existing, ...data, Id: id });
  const affected = await invoiceRepo.updateById(id, [
    data.customerId ?? existing.CustomerId,
    data.employeeId ?? existing.EmployeeId,
    data.orderDate ?? existing.OrderDate,
    data.requiredDate ?? existing.RequiredDate,
    data.shippedDate ?? existing.ShippedDate,
    data.status ?? existing.Status,
    data.paymentStatus ?? existing.PaymentStatus,
    data.shipmentStatus ?? existing.ShipmentStatus,
    data.subtotal ?? existing.Subtotal,
    data.discountAmount ?? existing.DiscountAmount,
    data.taxAmount ?? existing.TaxAmount,
    data.shippingFee ?? existing.ShippingFee,
    data.totalAmount ?? existing.TotalAmount,
    data.shippingName ?? existing.ShippingName,
    data.shippingPhone ?? existing.ShippingPhone,
    data.shippingAddress ?? existing.ShippingAddress,
    data.shippingCity ?? existing.ShippingCity,
    data.shippingCountry ?? existing.ShippingCountry,
    data.note ?? existing.Note,
    existing.CreatedAt,
    new Date(),
  ]);
  return affected > 0 ? await getById(id) : null;
};

export const deleteInvoice = async (id) => {
  const affected = await invoiceRepo.removeById(id);
  return affected > 0;
};
