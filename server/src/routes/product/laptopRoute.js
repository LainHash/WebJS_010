import express from "express";
import * as laptopController from "../../controllers/product/laptopController.js";

const router = express.Router();

router.get("/", laptopController.list);
router.get("/:id", laptopController.getOne);
router.post("/", laptopController.create);
router.put("/:id", laptopController.update);
router.delete("/:id", laptopController.remove);

export default router;
