import express from "express";
import { get } from "mongoose";

const router = express.Router();

router.get("/", getResponses);
router.post("/", saveResponse);

export default router;
