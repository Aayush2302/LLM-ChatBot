import express from "express";
import isAdmin from "../middleware/admin.protect.route.js";
import protectRoute from "../middleware/protectRoute.js";
import User from "../model/user.model.js";
import getUsersWithChatHistory from "../controller/adminController.js";
const router = express.Router();

// route for admins only
// router.get("/users", protectRoute, isAdmin, async (req, res) => {
//   try {
//     const users = await User.find().select("name email chatHistory"); // Fetch all users
//     res.status(200).json({ users });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.get("/users", protectRoute, isAdmin, getUsersWithChatHistory);

export default router;
