import express from "express";
import app from "./app.js";
import authRoutes from "./routes/auth.routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the auth routes

app.listen(5000, () => {
  console.log("Server is live on port 5000");
});
