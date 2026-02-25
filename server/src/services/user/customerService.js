import * as customerRepo from "../../repos/user/customerRepo.js";
import Customer from "../../models/user/Customer.js";

export const getAll = async () => {
  const rows = await customerRepo.findAll();
  return rows.map((r) => Customer.fromDb(r));
};

export const getById = async (id) => {
  const row = await customerRepo.findById(id);
  return Customer.fromDb(row);
};

export const createCustomer = async (data) => {
  const code = await customerRepo.generateCustomerCode();
  const now = new Date();
  const customer = new Customer({
    code,
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  const errors = customer.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await customerRepo.create(customer.toInsertParams());
  customer.Id = insertId;
  return customer;
};

export const updateCustomer = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Customer({ ...existing, ...data, Id: id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await customerRepo.updateById(id, updated.toUpdateParams());
  return affected > 0 ? await getById(id) : null;
};

export const deleteCustomer = async (id) => {
  const affected = await customerRepo.removeById(id);
  return affected > 0;
};
