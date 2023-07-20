const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "You can't post an empty comment!"],
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    image: String,
    likes: [{ type: ObjectId }],
    postId: { type: ObjectId, ref: 'Post' },
    userId: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

