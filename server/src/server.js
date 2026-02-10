import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;
const host = process.env.HOSTNAME || "localhost";

app.listen(port, () => {
  console.log(`Server starting at http://${host}:${port}`);
});
