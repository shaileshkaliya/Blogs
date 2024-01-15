const express = require('express');
const {getAllBlogs, createBlog, updateBlog, getBlogByID, deleteBlog, getBlogsByUserId} = require('../Controllers/blog-controls.js');

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/add', createBlog);
router.put('/update/:id', updateBlog);
router.get('/:id', getBlogByID);
router.delete('/:id', deleteBlog);
router.get('/user/:id', getBlogsByUserId)

module.exports = router;