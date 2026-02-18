import express from "express";
import roleRoute from "./user/roleRoute.js";
import userRoute from "./user/userRoute.js";
import supplierRoute from "./product/supplierRoute.js";
import categoryRoute from "./product/categoryRoute.js";
import cpuRoute from "./product/cpuRoute.js";
import gpuRoute from "./product/gpuRoute.js";
import laptopRoute from "./product/laptopRoute.js";
import customerRoute from "./user/customerRoute.js";
import employeeRoute from "./user/employeeRoute.js";
import invoiceRoute from "./order/invoiceRoute.js";
import invoiceDetailRoute from "./order/invoiceDetailRoute.js";
import paymentRoute from "./order/paymentRoute.js";
import shipmentRoute from "./order/shipmentRoute.js";
import productRoute from "./product/productRoute.js";

const router = express.Router();

router.use("/roles", roleRoute);
router.use("/users", userRoute);
router.use("/suppliers", supplierRoute);
router.use("/categories", categoryRoute);
router.use("/cpus", cpuRoute);
router.use("/gpus", gpuRoute);
router.use("/laptops", laptopRoute);
router.use("/customers", customerRoute);
router.use("/employees", employeeRoute);
router.use("/invoices", invoiceRoute);
router.use("/invoice-details", invoiceDetailRoute);
router.use("/payments", paymentRoute);
router.use("/shipments", shipmentRoute);
router.use("/products", productRoute);

export default router;
