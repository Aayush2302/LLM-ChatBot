import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"; // Import cookie-parser
import authRoutes from "./routes/auth.routes.js";
import responseRoutes from "./routes/response.route.js";
import adminRoutes from "./routes/admin.routes.js";
import chatHistory from "./routes/chatHistory.route.js";
import role from "./routes/role.routes.js";
const app = express();

app.use(cookieParser()); // Use cookie-parser
// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/history", chatHistory);
app.use("/api/role", role);
// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Could not connect to MongoDB", err));

export default app;
