import express from "express";
import User from "../model/user.model.js";

const getUsersWithChatHistory = async (req, res) => {
  try {
    const users = await User.find().select("name email chatHistory");

    return res.status(200).json({ users });
  } catch (error) {
    console.log("Error fetching Users:", error.message);
    return res.status(500).json({ message: "Error fetching Users" });
  }
};

export default getUsersWithChatHistory;
