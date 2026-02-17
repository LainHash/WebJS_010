import express from "express";
import * as invoiceController from "../controllers/invoiceController.js";

const router = express.Router();

router.get("/", invoiceController.list);
router.get("/:id", invoiceController.getOne);
router.post("/", invoiceController.create);
router.put("/:id", invoiceController.update);
router.delete("/:id", invoiceController.remove);

export default router;
