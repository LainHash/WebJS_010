import express from "express";
import roleRoute from "./routes/roleRoute.js";
import userRoute from "./routes/userRoute.js";
import supplierRoute from "./routes/supplierRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import cpuRoute from "./routes/cpuRoute.js";
import gpuRoute from "./routes/gpuRoute.js";

const app = express();

app.use(express.json());

app.use("/api/roles", roleRoute);
app.use("/api/users", userRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/cpus", cpuRoute);
app.use("/api/gpus", gpuRoute);

app.get("/", (req, res) => {
  res.send("Hello, World");
});

export default app;
