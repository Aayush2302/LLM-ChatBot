import express from "express";
import app from "./app.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the auth routes

app.listen(5000, () => {
  console.log("Server is live on port 5000");
});
