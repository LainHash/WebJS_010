import * as supplierRepo from "../repos/supplierRepo.js";
import Supplier from "../models/Supplier.js";

export const getAll = async () => {
  const rows = await supplierRepo.findAll();
  return rows.map((r) => Supplier.fromDb(r));
};

export const getById = async (id) => {
  const row = await supplierRepo.findById(id);
  return Supplier.fromDb(row);
};

export const createSupplier = async (data) => {
  const supplier = new Supplier(data);
  const errors = supplier.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await supplierRepo.create(supplier.toInsertParams());
  supplier.Id = insertId;
  return supplier;
};

export const updateSupplier = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Supplier({ ...existing, ...data, Id: id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await supplierRepo.updateById(id, updated.toUpdateParams());
  return affected > 0 ? await getById(id) : null;
};

export const deleteSupplier = async (id) => {
  const affected = await supplierRepo.removeById(id);
  return affected > 0;
};
