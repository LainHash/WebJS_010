import * as employeeService from "../services/employeeService.js";

export const list = async (req, res, next) => {
  try {
    const employees = await employeeService.getAll();
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const employee = await employeeService.getById(id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await employeeService.createEmployee(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await employeeService.updateEmployee(id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Employee not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await employeeService.deleteEmployee(id);
    if (!ok) return res.status(404).json({ message: "Employee not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
