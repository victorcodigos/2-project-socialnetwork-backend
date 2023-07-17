const Post = require("../models/Post")


const PostController = {
    async create(req, res) {
        try {
            const post = await Post.create(req.body);
            res.status(201).send({ message: "Congrats! You have been created a new post!", post })
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Try again! something is not working well", error })
        }
    },
    async update(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
            res.send({ message: "This post has been updated successfully", post });
        } catch (error) {
            console.error({ message: "Sorry! We could not updated this post! You need to be authorized!", error })
        }
    },
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({ message: 'Post delected', post })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem trying to remove the post', error })
        }

    },

}

module.exports = PostController;