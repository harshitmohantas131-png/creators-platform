import Post from '../models/Post.js';
// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, content, category, status } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title & content required" });
    }

    const post = await Post.create({
      title,
      content,
      category,
      status,
      author: req.user._id,
    });

    res.status(201).json({ success: true, data: post });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating post" });
  }
};
// Get Posts (with pagination)
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ author: req.user._id });

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
   console.log("REQ.BODY:", req.body);
   console.log("REQ.USER:", req.user);

  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};