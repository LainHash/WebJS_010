import * as roleService from "../services/roleService.js";

export const list = async (req, res, next) => {
  try {
    const roles = await roleService.getAll();
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const role = await roleService.getById(id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await roleService.createRole(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await roleService.updateRole(id, req.body);
    if (!updated) return res.status(404).json({ message: "Role not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await roleService.deleteRole(id);
    if (!ok) return res.status(404).json({ message: "Role not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
