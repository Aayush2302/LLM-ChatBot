// user.model.js
import mongoose from "mongoose";
import bcrypt from "bcrypt"; // For hashing passwords

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
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

const User = mongoose.model("User", userSchema); // Create the model

export default User; // Correctly export the model
