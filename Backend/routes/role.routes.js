// routes/userRoute.js
import express from "express";
import checkAdmin from "../middleware/admin.protect.route.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/", protectRoute, checkAdmin, (req, res) => {
  // console.log("User role:", req.userRole);

  return res.status(200).json({ role: req.userRole });
});

export default router;
