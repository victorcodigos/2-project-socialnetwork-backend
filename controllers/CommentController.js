const Comment = require("../models/Comment");

//modificar codigo para add extras

const CommentController ={
    async create(req, res){
        try {
            const comment = await Comment.create({
                ...req.body,
                userName: req.user.userName,
                userId: req.user._id,
            })
            res.status(201).send({message: "Comment posted", comment})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Error posting the comment' })
        }
    },
    async update(req, res){
        try {
            const comment = await Comment.findByIdAndUpdate(req.params._id, req.body, { new: true })
            res.send({message:"This comment has been updated successfully", comment});
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "Sorry! We could not updated this comment! You need to be authorized!", error })
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
    

}



module.exports = CommentController;


  