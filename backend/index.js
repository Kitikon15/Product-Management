import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import productRouter from "./router/productRouter.js";

dotenv.config();
const PORT = process.env.BACKEND_PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);

connectDB();

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h> Welcome to Restful API Product Management App</h>");
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  return res.status(err.status || 500).json({
    message: err.message || "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});