import express from "express";
import * as roleController from "../../controllers/user/roleController.js";

const router = express.Router();

router.get("/", roleController.list);
router.get("/:id", roleController.getOne);
router.post("/", roleController.create);
router.put("/:id", roleController.update);
router.delete("/:id", roleController.remove);

export default router;
