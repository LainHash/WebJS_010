import express from "express";
import * as employeeController from "../../controllers/user/employeeController.js";

const router = express.Router();

router.get("/", employeeController.list);
router.get("/:id", employeeController.getOne);
router.post("/", employeeController.create);
router.put("/:id", employeeController.update);
router.delete("/:id", employeeController.remove);

export default router;
