import express from "express";
import * as productController from "../../controllers/product/productController.js";

const router = express.Router();

router.get("/", productController.list);
router.get("/:id", productController.getOne);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

export default router;
