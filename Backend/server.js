import express from "express";
import app from "./app.js"; // Ensure app is correctly imported if this file is named differently
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../Frontend/my-app/build")));

// The "catchall" handler: for any request that doesn't match one above, send back index.html.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/my-app/build/index.html"));
});

// Use the auth routes and any other routes here
// app.use("/api/auth", authRoutes); // Example route

app.listen(5000, () => {
  console.log("Server is live on port 5000");
});
