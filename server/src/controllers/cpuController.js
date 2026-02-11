import * as cpuService from "../services/cpuService.js";

export const list = async (req, res, next) => {
  try {
    const cpus = await cpuService.getAll();
    res.json(cpus);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const cpu = await cpuService.getById(id);
    if (!cpu) return res.status(404).json({ message: "CPU not found" });
    res.json(cpu);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await cpuService.createCpu(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await cpuService.updateCpu(id, req.body);
    if (!updated) return res.status(404).json({ message: "CPU not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ok = await cpuService.deleteCpu(id);
    if (!ok) return res.status(404).json({ message: "CPU not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
