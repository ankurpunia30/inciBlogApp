//Purpose: Model for BlogPost
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true
    },
    publishedAt:{
        type:Date,
        default:Date.now
    },
    tags:{
        type:[String],
        required:true
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    slug:{
        type:String,
        required:true
    }
});


const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
module.exports = BlogPost;