import express from "express";
import protectRoute from "../middleware/protectRoute.js"; // Add .js
import chatHistory from "../controller/ChatHistory.js"; // Add .js

const router = express.Router();

router.get("/", protectRoute, chatHistory);

export default router;
