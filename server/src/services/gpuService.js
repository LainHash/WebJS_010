import * as gpuRepo from "../repos/gpuRepo.js";
import Gpu from "../models/Gpu.js";

export const getAll = async () => {
  const rows = await gpuRepo.findAll();
  return rows.map((r) => Gpu.fromDb(r));
};

export const getById = async (id) => {
  const row = await gpuRepo.findById(id);
  return Gpu.fromDb(row);
};

export const createGpu = async (data) => {
  const gpu = new Gpu(data);
  const errors = gpu.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await gpuRepo.create(gpu.toInsertParams());
  gpu.Id = insertId;
  return gpu;
};

export const updateGpu = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Gpu({ ...existing, ...data, Id: id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await gpuRepo.updateById(id, updated.toUpdateParams());
  return affected > 0 ? await getById(id) : null;
};

export const deleteGpu = async (id) => {
  const affected = await gpuRepo.removeById(id);
  return affected > 0;
};
