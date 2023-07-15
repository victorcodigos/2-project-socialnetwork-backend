const Comment = require("../models/Comment");

//modificar codigo para add extras

const CommentController ={
    async create(req, res){
        try {
            const comment = await Comment.create(req.body)
            res.status(201).send(comment)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Error posting the comment' })
        }
    },

}
module.exports = CommentController;