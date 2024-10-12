import express from "express"; // Correct spelling
import { signup, login, logout } from "../controller/authController.js";
import isAdmin from "../middleware/admin.protect.route.js";
import protectRoute from "../middleware/protectRoute.js";
import getUsersWithChatHistory from "../controller/adminController.js";

const router = express.Router(); // Correct spelling
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// router.get("/users", protectRoute, isAdmin, getUsersWithChatHistory);
export default router;
