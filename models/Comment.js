const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: String,
    comment: String,
    created: { type: Date, default: Date.now },
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;