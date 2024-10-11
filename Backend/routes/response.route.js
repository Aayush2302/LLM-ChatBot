import express from "express";
import protectRoute from "../middleware/protectRoute.js";

import sendQueryToGroqLLM from "../controller/responseController.js";

const router = express.Router();

router.post("/query", protectRoute, sendQueryToGroqLLM);

export default router;
