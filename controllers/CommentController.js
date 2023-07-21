const Comment = require("../models/Comment");
const Post = require("../models/Post");


const CommentController ={
    async create(req, res){
        try {
            const comment = await Comment.create({
              ...req.body, 
              userId: req.user._id, 
              postId: req.params._id, 
              image: req.file?.filename
            })
            const populatedComment = await Comment.findById(comment._id).populate("userId", "name");
            await Post.findByIdAndUpdate(req.params._id,{$push:{
              commentIds:comment._id
            }})
            res.status(201).send({message: "Comment posted", comment:populatedComment })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Error posting the comment', error })
        }
    },
    async update(req, res){
        try {
            const comment = await Comment.findByIdAndUpdate(req.params._id, req.body, { new: true })
            const populatedComment = await Comment.findById(comment._id).populate("userId", "name");
            res.send({message:"This comment has been updated successfully", comment:populatedComment});
        } catch (error) {
            console.error(error)
            next()
        }
    },
    async like(req, res) {
        try {
          const comment = await Comment.findById(req.params._id);
          const alreadyLiked = comment.likes.includes(req.user._id)
          if (alreadyLiked) {
            return res
              .status(400)
              .send({ message: "You have already liked this comment" });
          } else {
            const comment = await Comment.findByIdAndUpdate(
              req.params._id,
              { $push: { likes: req.user._id } },
              { new: true }
            );
            res.send(comment);
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem with your like" });
        }
      },  
      async dislike(req, res) {
        try {
          const comment = await Comment.findByIdAndUpdate(
            req.params._id,
            { $pull: { likes: req.user._id } },
            { new: true }
          );
          res.send(comment);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem with your dislike" });
        }
      },   
    async delete(req,res){
        try {
            const comment = await Comment.findByIdAndDelete(req.params._id)
           res.send({ message: 'Comment deleted succesfully', comment})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "there was a problem trying to remove the comment", error})
        }
    }, 
};


module.exports = CommentController;


  