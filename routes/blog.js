const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddlewear');
const {createPost,getAllPosts,getPostBySlug,updatePost,deletePost} = require('../controller/BlogPost');

router.post('/create',authMiddleware, createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:slug', getPostBySlug);
router.put('/posts/:slug', authMiddleware,updatePost);
router.delete('/posts/:slug',authMiddleware, deletePost);

module.exports = router;
