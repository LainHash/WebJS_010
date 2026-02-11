import express from "express";
import * as gpuController from "../controllers/gpuController.js";

const router = express.Router();

router.get("/", gpuController.list);
router.get("/:id", gpuController.getOne);
router.post("/", gpuController.create);
router.put("/:id", gpuController.update);
router.delete("/:id", gpuController.remove);

export default router;
