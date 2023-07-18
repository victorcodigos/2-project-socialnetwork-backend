const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema(
  {
    comment: String,
    userName: {
      type: String,
      ref: "User", // no funciona, no me trae el nombre de usuario al crear comentario
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    likes: [{ type: ObjectId }],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

