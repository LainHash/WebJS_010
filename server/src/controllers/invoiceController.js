import * as invoiceService from "../services/invoiceService.js";

export const list = async (req, res, next) => {
  try {
    const items = await invoiceService.getAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await invoiceService.getById(id);
    if (!item) return res.status(404).json({ message: "Invoice not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await invoiceService.createInvoice(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await invoiceService.updateInvoice(id, req.body);
    if (!updated) return res.status(404).json({ message: "Invoice not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await invoiceService.deleteInvoice(id);
    if (!ok) return res.status(404).json({ message: "Invoice not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
