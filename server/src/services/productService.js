import * as productRepo from "../repos/productRepo.js";
import Prodcut from "../models/Product.js";

export const getAll = async () => {
  const rows = await productRepo.findAll();
  return rows.map((r) => Prodcut.fromDb(r));
};

export const getById = async (id) => {
  const row = await productRepo.findById(id);
  return Prodcut.fromDb(row);
};

export const createProduct = async (data) => {
  const product = new Prodcut(data);
  const errors = product.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await productRepo.create([
    data.code,
    data.name,
    data.categoryId,
    data.supplierId,
    data.unitPrice,
    data.unitsInStock,
    new Date(),
    new Date(),
  ]);
  product.Id = insertId;
  return product;
};

export const updateProduct = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Prodcut({ ...existing, ...data, Id: id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await productRepo.updateById(id, [
    data.code || existing.Code,
    data.name || existing.Name,
    data.categoryId || existing.CategoryId,
    data.supplierId || existing.SupplierId,
    data.unitPrice || existing.UnitPrice,
    data.unitsInStock || existing.UnitsInStock,
    existing.CreatedAt,
    new Date(),
  ]);
  return affected;
};

export const deleteProduct = async (id) => {
  const affected = await productRepo.removeById(id);
  return affected > 0;
};
