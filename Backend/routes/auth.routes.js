import express from "express"; // Correct spelling
import { signup, login } from "../controller/authController.js";

const router = express.Router(); // Correct spelling
router.post("/signup", signup);
router.post("/login", login);
export default router;
