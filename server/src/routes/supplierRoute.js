import express from "express";
import * as supplierController from "../controllers/supplierController.js";

const router = express.Router();

router.get("/", supplierController.list);
router.get("/:id", supplierController.getOne);
router.post("/", supplierController.create);
router.put("/:id", supplierController.update);
router.delete("/:id", supplierController.remove);

export default router;
