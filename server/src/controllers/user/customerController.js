import * as customerService from "../../services/user/customerService.js";

export const list = async (req, res, next) => {
  try {
    const customers = await customerService.getAll();
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const customer = await customerService.getById(id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await customerService.createCustomer(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await customerService.updateCustomer(id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Customer not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await customerService.deleteCustomer(id);
    if (!ok) return res.status(404).json({ message: "Customer not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
