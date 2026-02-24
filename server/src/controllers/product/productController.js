import e from "express";
import * as productService from "../../services/product/productService.js";

export const list = async (req, res, next) => {
  try {
    const items = await productService.getAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await productService.getById(id);
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getOneWithLaptop = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await productService.getByIdWithLaptop(id);
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getOneWithCpu = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await productService.getByIdWithCpu(id);
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getOneWithGpu = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await productService.getByIdWithGpu(id);
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await productService.createProduct(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await productService.updateProduct(id, req.body);
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await productService.deleteProduct(id);
    if (!ok) return res.status(404).json({ message: "Product not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
