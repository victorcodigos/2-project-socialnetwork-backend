const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({

    post: {
        type: String,
        required: [true, "Please, insert the title"],
    
    },
    likes: [{ type: ObjectId }],
    userId: { type: ObjectId, ref: "User" },
    commentIds: [{ type: ObjectId, ref: "Comment" }],


}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;