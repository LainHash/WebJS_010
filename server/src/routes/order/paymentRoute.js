import express from "express";
import * as paymentController from "../../controllers/order/paymentController.js";

const router = express.Router();

router.get("/", paymentController.list);
router.get("/by-invoice/:invoiceId", paymentController.getByInvoice);
router.get("/:id", paymentController.getOne);
router.post("/", paymentController.create);
router.put("/:id", paymentController.update);
router.delete("/:id", paymentController.remove);

export default router;
