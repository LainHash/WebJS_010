import * as userRepo from "../repos/userRepo.js";
import User from "../models/User.js";

export const getAll = async () => {
  const rows = await userRepo.findAll();
  return rows.map((r) => User.fromDb(r));
};

export const getById = async (id) => {
  const row = await userRepo.findById(id);
  return User.fromDb(row);
};

export const createUser = async (data) => {
  const user = new User(data);
  const errors = user.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await userRepo.create(user.toInsertParams());
  user.Id = insertId;
  return user;
};

export const updateUser = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new User({ ...existing, ...data, Id: id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await userRepo.updateById(id, updated.toUpdateParams());
  return affected > 0 ? await getById(id) : null;
};

export const deleteUser = async (id) => {
  const affected = await userRepo.removeById(id);
  return affected > 0;
};
