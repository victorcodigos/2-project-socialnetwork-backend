const Post = require ("../models/Post")

const PostController = {
    async create(req, res) {
        try {
            const post = await Post.create(req.body);
            res.status(201).send({message: "Congrats! You have been created a new post!", post})
        } catch (error){
            console.error(error);
            res.status(500).send({message: "Try again! something is not working well", error})
        }
    }
}

module.exports = PostController;