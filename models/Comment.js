const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userName: String,
    comment: String,    
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;