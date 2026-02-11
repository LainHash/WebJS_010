import * as categoryRepo from "../repos/categoryRepo.js";
import Category from "../models/Category.js";

export const getAll = async () => {
  const rows = await categoryRepo.findAll();
  return rows.map((r) => Category.fromDb(r));
};

export const getById = async (id) => {
  const row = await categoryRepo.findById(id);
  return Category.fromDb(row);
};

export const createCategory = async (data) => {
  const category = new Category(data);
  const errors = category.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await categoryRepo.create(category.toInsertParams());
  category.Id = insertId;
  return category;
};

export const updateCategory = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Category({ ...existing, ...data, Id: id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await categoryRepo.updateById(id, updated.toUpdateParams());
  return affected > 0 ? await getById(id) : null;
};

export const deleteCategory = async (id) => {
  const affected = await categoryRepo.removeById(id);
  return affected > 0;
};
