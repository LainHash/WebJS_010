import * as detailRepo from "../repos/invoiceDetailRepo.js";
import InvoiceDetail from "../models/InvoiceDetail.js";

export const getAll = async () => {
  const rows = await detailRepo.findAll();
  return rows.map((r) => InvoiceDetail.fromDb(r));
};

export const getById = async (id) => {
  const row = await detailRepo.findById(id);
  return InvoiceDetail.fromDb(row);
};

export const getByInvoiceId = async (invoiceId) => {
  const rows = await detailRepo.findByInvoiceId(invoiceId);
  return rows.map((r) => InvoiceDetail.fromDb(r));
};

export const createInvoiceDetail = async (data) => {
  const detail = new InvoiceDetail(data);
  const insertId = await detailRepo.create([
    data.invoiceId || detail.InvoiceId,
    data.productType || detail.ProductType,
    data.productId || detail.ProductId,
    data.productName || detail.ProductName,
    data.unitPrice || detail.UnitPrice,
    data.quantity || detail.Quantity,
    data.discountPercent || detail.DiscountPercent,
    data.lineTotal || detail.LineTotal,
    new Date(),
    new Date(),
  ]);
  detail.Id = insertId;
  return detail;
};

export const updateInvoiceDetail = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new InvoiceDetail({ ...existing, ...data, Id: id });
  const affected = await detailRepo.updateById(id, [
    data.invoiceId ?? existing.InvoiceId,
    data.productType ?? existing.ProductType,
    data.productId ?? existing.ProductId,
    data.productName ?? existing.ProductName,
    data.unitPrice ?? existing.UnitPrice,
    data.quantity ?? existing.Quantity,
    data.discountPercent ?? existing.DiscountPercent,
    data.lineTotal ?? existing.LineTotal,
    existing.CreatedAt,
    new Date(),
  ]);
  return affected > 0 ? await getById(id) : null;
};

export const deleteInvoiceDetail = async (id) => {
  const affected = await detailRepo.removeById(id);
  return affected > 0;
};
