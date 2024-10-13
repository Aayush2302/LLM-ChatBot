import express from "express";
import User from "../model/user.model.js";

const chatHistory = async (req, res) => {
  //   console.log("Chat history route hit");

  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("chatHistory");
    // console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const history = user.chatHistory.map((entry) => ({
      _id: entry._id,
      question: entry.query,
      answer: entry.response,
    }));
    // console.log("Chat history:", history);

    res.status(200).json(history);
  } catch (error) {
    console.log("Error fetching chat history:", error.message);
    res.status(500).json({ message: "Error fetching chat history" });
  }
};

export default chatHistory;
