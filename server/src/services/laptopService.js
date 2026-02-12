import * as laptopRepo from "../repos/laptopRepo.js";
import Laptop from "../models/Laptop.js";

export const getAll = async () => {
  const rows = await laptopRepo.findAll();
  return rows.map((r) => Laptop.fromDb(r));
};

export const getById = async (id) => {
  const row = await laptopRepo.findById(id);
  return Laptop.fromDb(row);
};

export const createLaptop = async (data) => {
  const laptop = new Laptop(data);
  const errors = laptop.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await laptopRepo.create([
    data.code,
    data.name,
    data.type,
    data.inches,
    data.screen,
    data.cpuId,
    data.gpuId,
    data.memory,
    data.os,
    data.weight,
    data.categoryId,
    data.supplierId,
    data.unitPrice,
    data.unitsInStock,
    new Date(),
    new Date(),
  ]);
  laptop.Id = insertId;
  return laptop;
};

export const updateLaptop = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Laptop({ ...existing, ...data, Id: id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await laptopRepo.updateById(id, [
    data.code || existing.Code,
    data.name || existing.Name,
    data.type || existing.Type,
    data.inches || existing.Inches,
    data.screen || existing.ScreenResolution,
    data.cpuId || existing.CpuId,
    data.gpuId || existing.GpuId,
    data.memory || existing.Memory,
    data.os || existing.OpSys,
    data.weight || existing.Weight,
    data.categoryId || existing.CategoryId,
    data.supplierId || existing.SupplierId,
    data.unitPrice || existing.UnitPrice,
    data.unitsInStock || existing.UnitsInStock,
    existing.CreatedAt,
    new Date(),
  ]);
  return affected > 0 ? await getById(id) : null;
};

export const deleteLaptop = async (id) => {
  const affected = await laptopRepo.removeById(id);
  return affected > 0;
};
