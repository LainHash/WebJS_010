import express from "express";
import * as cpuController from "../../controllers/product/cpuController.js";

const router = express.Router();

router.get("/", cpuController.list);
router.get("/:id", cpuController.getOne);
router.post("/", cpuController.create);
router.put("/:id", cpuController.update);
router.delete("/:id", cpuController.remove);

export default router;
