import express from "express";
import * as userController from "../../controllers/user/userController.js";

const router = express.Router();

router.get("/", userController.list);
router.get("/:id", userController.getOne);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

export default router;
