import * as productRepo from "../../repos/product/productRepo.js";
import * as categoryRepo from "../../repos/product/categoryRepo.js";
import * as supplierRepo from "../../repos/product/supplierRepo.js";
import Product from "../../models/product/Product.js";

const mapBaseProduct = (row) => {
  if (!row) return null;
  return Product.fromDb(row);
};

export const getAll = async () => {
  const rows = await productRepo.findAllWithNames();
  return rows.map(mapBaseProduct);
};

export const getById = async (id) => {
  const row = await productRepo.findByIdBase(id);
  return mapBaseProduct(row);
};
export const createProduct = async (data) => {
  const product = new Product(data);
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
  const updated = new Product({ ...existing, ...data, Id: id });
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

export const createProductWithNames = async (data) => {
  // resolve category
  const categoryRow = await categoryRepo.findByName(data.categoryName);
  if (!categoryRow) {
    const err = new Error(`Category '${data.categoryName}' not found`);
    err.status = 400;
    throw err;
  }
  const supplierRow = await supplierRepo.findByName(data.companyName);
  if (!supplierRow) {
    const err = new Error(`Supplier '${data.companyName}' not found`);
    err.status = 400;
    throw err;
  }

  const product = new Product({
    code: data.code,
    name: data.name,
    categoryId: categoryRow.CategoryId || categoryRow.CategoryId,
    supplierId: supplierRow.SupplierId || supplierRow.SupplierId,
    unitPrice: data.unitPrice,
    unitsInStock: data.unitsInStock,
  });

  const errors = product.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }

  const insertId = await productRepo.create([
    product.Code,
    product.Name,
    product.CategoryId,
    product.SupplierId,
    product.UnitPrice,
    product.UnitsInStock,
    new Date(),
    new Date(),
  ]);
  product.Id = insertId;
  return product;
};
