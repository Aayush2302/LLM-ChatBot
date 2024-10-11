import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/auth", authRoutes);
// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Could not connect to MongoDB", err));

export default app;
