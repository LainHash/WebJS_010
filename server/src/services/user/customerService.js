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
  const customer = new Customer(data);
  const errors = customer.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await customerRepo.create([
    data.accountId,
    data.lastname,
    data.firstname,
    data.gender,
    data.birthday,
    data.city,
    data.country,
    data.address,
    data.phone,
    data.cic,
    new Date(),
    new Date(),
  ]);
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
  const affected = await customerRepo.updateById(id, [
    data.accountId || existing.AccountId,
    data.lastname || existing.Lastname,
    data.firstname || existing.Firstname,
    data.gender || existing.Gender,
    data.birthday || existing.Birthday,
    data.city || existing.City,
    data.country || existing.Country,
    data.address || existing.Address,
    data.phone || existing.Phone,
    data.cic || existing.CIC,
    existing.CreatedAt,
    new Date(),
  ]);
  return affected > 0 ? await getById(id) : null;
};

export const deleteCustomer = async (id) => {
  const affected = await customerRepo.removeById(id);
  return affected > 0;
};
