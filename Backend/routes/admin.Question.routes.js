import express from "express";
import User from "../model/user.model.js"; // Adjust the path as necessary
import isAdmin from "../middleware/admin.protect.route.js"; // Your admin middleware

const router = express.Router();

// Route to fetch questions for a specific user by their userId
router.get("/users/:userId/questions", isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("chatHistory");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.chatHistory);
  } catch (error) {
    console.error("Error fetching chat history:", error.message);
    res.status(500).json({ message: "Error fetching chat history" });
  }
});

export default router;
