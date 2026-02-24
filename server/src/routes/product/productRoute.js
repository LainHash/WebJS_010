import express from "express";
import * as productController from "../../controllers/product/productController.js";

const router = express.Router();

router.get("/", productController.list);
router.get("/:id", productController.getOne);
router.get("/laptop/:id", productController.getOneWithLaptop);
router.get("/cpu/:id", productController.getOneWithCpu);
router.get("/gpu/:id", productController.getOneWithGpu);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

export default router;
