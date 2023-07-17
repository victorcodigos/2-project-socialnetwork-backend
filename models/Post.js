const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

title: String,
user: String,
data: Date,
cool: Boolean,


}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;