import express from "express";
import * as shipmentController from "../controllers/shipmentController.js";

const router = express.Router();

router.get("/", shipmentController.list);
router.get("/by-invoice/:invoiceId", shipmentController.getByInvoice);
router.get("/:id", shipmentController.getOne);
router.post("/", shipmentController.create);
router.put("/:id", shipmentController.update);
router.delete("/:id", shipmentController.remove);

export default router;
