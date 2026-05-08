import { useState } from "react";
import ImageUpload from "../components/ImageUpload";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleUpload = (formData) => {
    console.log("File:", formData.get("image"));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Create Post</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <ImageUpload onUpload={handleUpload} />
    </div>
  );
};

export default CreatePost;