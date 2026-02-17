import express from "express";
import cors from "cors";
import roleRoute from "./routes/roleRoute.js";
import userRoute from "./routes/userRoute.js";
import supplierRoute from "./routes/supplierRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import cpuRoute from "./routes/cpuRoute.js";
import gpuRoute from "./routes/gpuRoute.js";
import laptopRoute from "./routes/laptopRoute.js";
import customerRoute from "./routes/customerRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import invoiceRoute from "./routes/invoiceRoute.js";
import invoiceDetailRoute from "./routes/invoiceDetailRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import shipmentRoute from "./routes/shipmentRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/roles", roleRoute);
app.use("/api/users", userRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/cpus", cpuRoute);
app.use("/api/gpus", gpuRoute);
app.use("/api/laptops", laptopRoute);
app.use("/api/customers", customerRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/invoices", invoiceRoute);
app.use("/api/invoice-details", invoiceDetailRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/shipments", shipmentRoute);

app.get("/", (req, res) => {
  res.send("Hello, World");
});

export default app;
