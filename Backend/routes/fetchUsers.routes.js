// routes/admin.route.js
import express from "express";
import User from "../model/user.model.js"; // Adjust the path as necessary
import isAdmin from "../middleware/admin.protect.route.js"; // Your admin middleware
const router = express.Router();

// Route to fetch all users
router.get("/", isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "name email"); // Fetch only the name and email fields
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.get("/admin/:userId/questions", isAdmin, async (req, res) => {
  try {
    const user = await User.find(req.params.userId).select("chatHistory");
    if (!user) {
      return resizeBy.status(404).json({ message: "User not found" });
    }

    res.json(user.chatHistory);
  } catch (error) {
    console.log("Error fetching chat history:", error.message);
    res.status(500).json({ message: "Error fetching chat history" });
  }
});

export default router;
