import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

// 🔥 Wrap routes inside a function that receives io
const postRoutes = (io) => {
  const router = express.Router();

  // CREATE POST (emit event after creation)
  router.post("/", protect, (req, res) => createPost(req, res, io));

  // READ
  router.get("/", protect, getPosts);
  router.get("/:id", protect, getPostById);

  // UPDATE
  router.put("/:id", protect, updatePost);

  // DELETE
  router.delete("/:id", protect, deletePost);

  return router;
};

export default postRoutes;