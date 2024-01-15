const Blog = require('../Model/Blog.js')
const User = require('../Model/User.js')

const mongoose = require('mongoose')

const getAllBlogs = async(req, res) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (error) {
        return console.log(error);
    }    
    if(!blogs){
        return res.status(404).json({message:"No blogs found"})
    }
    return res.status(200).json({blogs});
}

const createBlog = async(req,res) => {
    const{title, description, image, user} = req.body;
    let existingUser;

    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser){
        return res.status(400).json({message:"No user found..."})
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session})
        existingUser.blogs.push(blog);
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (error) {
        return console.log(error);        
    }

    return res.status(200).json({blog});
}

const updateBlog = async(req, res) => {
    const blogId = req.params.id;
    const {title, description} = req.body;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title, description
        })
    } catch (error) {
        return console.log(error);
    }

    if(!blog){
        return res.status(500).json({message : "Unable to update the blog "})
    }
    return res.status(200).json({blog});
}

const getBlogByID = async(req, res) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogId);
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(400).json({message:"No blog found ..."})
    }
    return res.status(200).json({blog});
}


const deleteBlog = async (req, res) => {
    const blogId = req.params.id;

    try {
        // Find the blog document
        const blog = await Blog.findById(blogId).populate('user');

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Remove the blog from the user's blogs array
        const user = blog.user;
        user.blogs.pull(blogId);

        // Save the user document
        await user.save();

        // Delete the blog document
        await blog.deleteOne({_id:blogId});

        return res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const getBlogsByUserId = async(req, res) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate('blogs');
    } catch (error) {
       return console.log(error); 
    }
    if (!userBlogs) {
        return res.status(404).json({message:"No blog found"})
    }
    return res.status(200).json({blogs:userBlogs})
}

module.exports = {getAllBlogs, createBlog, updateBlog, getBlogByID, deleteBlog, getBlogsByUserId};