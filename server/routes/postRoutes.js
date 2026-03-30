import express from "express";
import { protect } from "../middlewares/auth.js";
import { createPost, getPosts } from "../controllers/postController.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);

export default router;