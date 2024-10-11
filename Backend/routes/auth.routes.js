import express from "express"; // Correct spelling
import { signup, login, logout } from "../controller/authController.js";

const router = express.Router(); // Correct spelling
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
export default router;
