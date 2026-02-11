import * as roleRepo from "../repos/roleRepo.js";
import Role from "../models/Role.js";

export const getAll = async () => {
  const rows = await roleRepo.findAll();
  return rows.map((r) => Role.fromDb(r));
};

export const getById = async (id) => {
  const row = await roleRepo.findById(id);
  return Role.fromDb(row);
};

export const createRole = async (data) => {
  const role = new Role(data);
  const errors = role.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await roleRepo.create(role.toInserParams());
  role.Id = insertId;
  return role;
};

export const updateRole = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Role({ ...existing, ...data, Id: id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await roleRepo.updateById(id, updated.toUpdateParams());
  return affected > 0 ? await getById(id) : null;
};

export const deleteRole = async (id) => {
  const affected = await roleRepo.removeById(id);
  return affected > 0;
};
