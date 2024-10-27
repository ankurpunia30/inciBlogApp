const { body, validationResult } = require('express-validator');
const BlogPost = require('../model/BlogPost');
// In your test setup file or at the beginning of your test file


// Validation rules for creating a blog post
const createPostValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('body').notEmpty().withMessage('Body is required'),
    body('shortDescription').notEmpty().withMessage('Short description is required'),
    body('tags').isArray().withMessage('Tags must be an array'),
    body('slug').notEmpty().withMessage('Slug is required'),
];

// Create a new blog post
const createPost = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, body, shortDescription, tags, slug } = req.body;

        // Check if slug already exists
        const existingPost = await BlogPost.findOne({ slug });
        if (existingPost) {
            return res.status(400).json({ message: "Slug already in use" });
        }

        const newPost = new BlogPost({
            title,
            body,
            shortDescription,
            tags,
            slug,
            isPublished: req.body.isPublished || false,
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
};

// Get all blog posts with pagination and sorting
const getAllPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'publishedAt', order = 'desc' } = req.query;

        const posts = await BlogPost.find()
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const count = await BlogPost.countDocuments();
        res.json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
};

// Get a single blog post by slug
const getPostBySlug = async (req, res) => {
    try {
        console.log(req.params.slug);
        const post = await BlogPost.findOne({ slug: req.params.slug });
        console.log(post);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Error fetching post", error });
    }
};

// Update a blog post
const updatePost = async (req, res) => {
    try {
        const updatedPost = await BlogPost.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Error updating post", error });
    }
};

// Delete a blog post
const deletePost = async (req, res) => {
    try {
        const deletedPost = await BlogPost.findOneAndDelete({ slug: req.params.slug });
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
};

// Export all controller functions and validation rules as an object
module.exports = {
    createPostValidation,
    createPost,
    getAllPosts,
    getPostBySlug,
    updatePost,
    deletePost
};
