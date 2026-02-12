import * as laptopService from "../services/laptopService.js";

export const list = async (req, res, next) => {
  try {
    const laptops = await laptopService.getAll();
    res.json(laptops);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const laptop = await laptopService.getById(id);
    if (!laptop) return res.status(404).json({ message: "Laptop not found" });
    res.json(laptop);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await laptopService.createLaptop(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await laptopService.updateLaptop(id, req.body);
    if (!updated) return res.status(404).json({ message: "Laptop not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await laptopService.deleteLaptop(id);
    if (!ok) return res.status(404).json({ message: "Laptop not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
