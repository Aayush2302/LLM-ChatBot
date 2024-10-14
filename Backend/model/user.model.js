// user.model.js
import mongoose from "mongoose";

const chatEntrySchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Role can only be 'user' or 'admin'
      default: "user", // Default role is 'user'
    },
    chatHistory: [chatEntrySchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
