import express from "express";
import supplierRoute from "./routes/supplierRoute.js";

const app = express();

app.use(express.json());

app.use("/api/suppliers", supplierRoute);

app.get("/", (req, res) => {
  res.send("Hello, World");
});

export default app;
