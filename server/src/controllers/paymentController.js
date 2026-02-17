import * as paymentService from "../services/paymentService.js";

export const list = async (req, res, next) => {
  try {
    const items = await paymentService.getAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await paymentService.getById(id);
    if (!item) return res.status(404).json({ message: "Payment not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getByInvoice = async (req, res, next) => {
  try {
    const invoiceId = parseInt(req.params.invoiceId, 10);
    const items = await paymentService.getByInvoiceId(invoiceId);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await paymentService.createPayment(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await paymentService.updatePayment(id, req.body);
    if (!updated) return res.status(404).json({ message: "Payment not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await paymentService.deletePayment(id);
    if (!ok) return res.status(404).json({ message: "Payment not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
