import express from "express";
import * as detailController from "../../controllers/order/invoiceDetailController.js";

const router = express.Router();

router.get("/", detailController.list);
router.get("/by-invoice/:invoiceId", detailController.getByInvoice);
router.get("/:id", detailController.getOne);
router.post("/", detailController.create);
router.put("/:id", detailController.update);
router.delete("/:id", detailController.remove);

export default router;
