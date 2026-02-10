import * as supplierService from "../services/supplierService.js";

export const list = async (req, res, next) => {
  try {
    const suppliers = await supplierService.getAll();
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const supplier = await supplierService.getById(id);
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await supplierService.createSupplier(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await supplierService.updateSupplier(id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Supplier not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await supplierService.deleteSupplier(id);
    if (!ok) return res.status(404).json({ message: "Supplier not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
