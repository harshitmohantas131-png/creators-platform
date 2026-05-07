import { useState, useEffect } from "react";

const ImageUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  // ✅ Validate file
  const validateFile = (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return "Please select a valid image (JPEG, PNG, WEBP, GIF)";
    }

    if (file.size > maxSize) {
      return `File too large (${(file.size / (1024 * 1024)).toFixed(
        2
      )}MB). Max 5MB allowed`;
    }

    return null;
  };

  // ✅ Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);

    // cleanup old preview
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // ✅ Cleanup memory
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    if (onUpload) {
      onUpload(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
      />

      {/* ❌ Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 👁 Preview */}
      {previewUrl && (
        <div>
          <p>Preview:</p>
          <img
            src={previewUrl}
            alt="preview"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </div>
      )}

      <button type="submit" disabled={!selectedFile || !!error}>
        Upload Image
      </button>
    </form>
  );
};

export default ImageUpload;