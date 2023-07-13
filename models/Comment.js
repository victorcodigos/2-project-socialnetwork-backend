const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: String,
    comment: String,
    date: Date(),
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;