
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    coverImage: {
      type: String,
      default: null
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);

