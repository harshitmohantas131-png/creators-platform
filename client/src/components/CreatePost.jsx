import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import api from "../services/api";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [uploading, setUploading] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // 🔥 Upload image
  const handleUpload = async (formData) => {
    setUploading(true);
    setUploadError("");

    try {
      const res = await api.post("/api/upload", formData);

      setCoverImageUrl(res.data.url);
      toast.success("Image uploaded successfully 🎉");
    } catch (err) {
      const msg = err.response?.data?.message || "Upload failed";
      setUploadError(msg);
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  // 🔥 Create post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      return toast.error("Title & content required");
    }

    setSubmitting(true);

    try {
      await api.post("/api/posts", {
        title,
        content,
        coverImage: coverImageUrl,
      });

      toast.success("Post created 🚀");

      setTitle("");
      setContent("");
      setCoverImageUrl(null);

      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Post failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={container}>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textareaStyle}
        />

        {/* 🔥 Upload Component */}
        <ImageUpload onUpload={handleUpload} />

        {uploading && <p>Uploading image...</p>}
        {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

/* STYLES */
const container = { padding: "2rem" };

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "500px",
};

const inputStyle = {
  padding: "0.6rem",
};

const textareaStyle = {
  padding: "0.6rem",
  minHeight: "120px",
};

export default CreatePost;