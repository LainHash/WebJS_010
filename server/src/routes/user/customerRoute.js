import express from "express";
import * as customerController from "../../controllers/user/customerController.js";

const router = express.Router();

router.get("/", customerController.list);
router.get("/:id", customerController.getOne);
router.post("/", customerController.create);
router.put("/:id", customerController.update);
router.delete("/:id", customerController.remove);

export default router;
