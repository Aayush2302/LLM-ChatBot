import express from "express";
import isAdmin from "../middleware/admin.protect.route.js";
import protectRoute from "../middleware/protectRoute.js";
import User from "../model/user.model.js";
import getUsersWithChatHistory from "../controller/adminController.js";
const router = express.Router();

router.get("/users", protectRoute, isAdmin, getUsersWithChatHistory);

export default router;
