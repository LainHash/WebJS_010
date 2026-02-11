import * as categoryService from "../services/categoryService.js";

export const list = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const category = await categoryService.getById(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await categoryService.createCategory(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await categoryService.updateCategory(id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await categoryService.deleteCategory(id);
    if (!ok) return res.status(404).json({ message: "Category not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
