import * as detailService from "../../services/order/invoiceDetailService.js";

export const list = async (req, res, next) => {
  try {
    const items = await detailService.getAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await detailService.getById(id);
    if (!item)
      return res.status(404).json({ message: "Invoice detail not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getByInvoice = async (req, res, next) => {
  try {
    const invoiceId = parseInt(req.params.invoiceId, 10);
    const items = await detailService.getByInvoiceId(invoiceId);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await detailService.createInvoiceDetail(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await detailService.updateInvoiceDetail(id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Invoice detail not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await detailService.deleteInvoiceDetail(id);
    if (!ok)
      return res.status(404).json({ message: "Invoice detail not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
