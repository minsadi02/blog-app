const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        content: {
            type: String,
            required: true
        },

        tags: {
            type: String,
            default: ""
        },

        views: {
            type: Number,
            default: 0
        },

        likes: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);


const Blog = mongoose.model(
    "Blog",
    blogSchema
);


module.exports = Blog;