import * as employeeRepo from "../../repos/user/employeeRepo.js";
import Employee from "../../models/user/Employee.js";

export const getAll = async () => {
  const rows = await employeeRepo.findAll();
  return rows.map((r) => Employee.fromDb(r));
};

export const getById = async (id) => {
  const row = await employeeRepo.findById(id);
  return Employee.fromDb(row);
};

export const createEmployee = async (data) => {
  const employee = new Employee(data);
  const errors = employee.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const insertId = await employeeRepo.create([
    data.code,
    data.accountId,
    data.lastname,
    data.firstname,
    data.gender,
    data.birthday,
    data.phone,
    data.cic,
    data.address,
    data.businessEmail,
    data.department,
    data.position,
    data.hiredDate,
    data.salary,
    data.managerId,
    data.status !== undefined ? data.status : true,
    new Date(),
    new Date(),
  ]);
  employee.Id = insertId;
  return employee;
};

export const updateEmployee = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Employee({ ...existing, ...data, Id: id });
  const errors = updated.validate();
  if (errors.length) {
    const err = new Error("Validation failed");
    err.status = 400;
    err.details = errors;
    throw err;
  }
  const affected = await employeeRepo.updateById(id, [
    data.code || existing.Code,
    data.accountId || existing.AccountId,
    data.lastname || existing.Lastname,
    data.firstname || existing.Firstname,
    data.gender || existing.Gender,
    data.birthday || existing.Birthday,
    data.phone || existing.Phone,
    data.cic || existing.CIC,
    data.address || existing.Address,
    data.businessEmail || existing.BusinessEmail,
    data.department || existing.Department,
    data.position || existing.Position,
    data.hiredDate || existing.HiredDate,
    data.salary || existing.Salary,
    data.managerId || existing.ManagerId,
    data.status !== undefined ? data.status : existing.Status,
    existing.CreatedAt,
    new Date(),
  ]);
  return affected > 0 ? await getById(id) : null;
};

export const deleteEmployee = async (id) => {
  const affected = await employeeRepo.removeById(id);
  return affected > 0;
};
