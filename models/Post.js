const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({

    post: {
        type: String,
        required: [true, "Please, insert the post"],

    },
    image: String,
    likes: [{ type: ObjectId, ref: "User" }],
    userId: { type: ObjectId, ref: "User" },
    commentIds: [{ type: ObjectId, ref: "Comment" }],




}, { timestamps: true });

 PostSchema.methods.toJSON = function () {

    const post = this._doc;
    delete post.tokens;
    delete post.password;
    return post; 

}

PostSchema.index({
    post: "text",
});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;