import Post from '../models/Post.js';

// ================= CREATE POST =================
export const createPost = async (req, res, io) => {
  try {
    const { title, content, category, status, coverImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const post = await Post.create({
      title,
      content,
      category,
      status,
      coverImage: coverImage || null,
      author: req.user._id,
    });

    // Emit event
    io.emit("newPost", {
      message: `New post created by ${req.user.name}`, post: {
        _id: post._id,
        title: post.title,
      },
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });

  } catch (error) {
    console.error(err);
    res.status(500).json({
      message: "Error creating post"
    });
  }
};


// ================= GET POSTS (PAGINATION) =================
export const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Fetch posts of logged-in user
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count total posts
    const total = await Post.countDocuments({ author: req.user._id });

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });

  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};


// ================= GET SINGLE POST =================
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      return next(error);
    }

    if (post.author.toString() !== req.user._id.toString()) {
      const error = new Error("Not authorized to view this post");
      error.statusCode = 403;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: post,
    });

  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};


// ================= UPDATE POST =================
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      return next(error);
    }

    if (post.author.toString() !== req.user._id.toString()) {
      const error = new Error("Not authorized to update this post");
      error.statusCode = 403;
      return next(error);
    }

    const { title, content, category, status } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;
    if (status) post.status = status;

    const updated = await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updated,
    });

  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};


// ================= DELETE POST =================
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      return next(error);
    }

    if (post.author.toString() !== req.user._id.toString()) {
      const error = new Error("Not authorized to delete this post");
      error.statusCode = 403;
      return next(error);
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });

  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};
