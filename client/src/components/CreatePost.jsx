import ImageUpload from "../components/ImageUpload";

const CreatePost = () => {
  const handleUpload = (formData) => {
    console.log("File:", formData.get("image"));
  };

  return (
    <div>
      <h1>Create Post</h1>
      <ImageUpload onUpload={handleUpload} />
    </div>
  );
};

export default CreatePost;