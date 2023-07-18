const Post = require("../models/Post");
const { post } = require("../routes/posts");


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
            console.error(error);
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
    async getPostByName(req, res) {
        try {
            const title = new RegExp(req.params.name, "i");
            const post = await Post.find({ title });
            res.send({ message: "Yes! this is the post that you are looking for", post });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Sorry, we could not find this post", error })
        }
    },
    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send({ message: "Yes! You found your post that you are looking for!", post });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Sorry, we could not find this post", error })
        }
    },
    async getAll(req, res) {
        try {
            const { page = 1, limit = 2 } = req.query;
            const posts = await Post.find()
                .limit(limit)
                .skip((page - 1) * limit);
            res.send({ message: `Yes! You are seeing all the posts in the page n° ${page}!`, posts });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Sorry, something went wrong", error })
        }
    },
    async getPostAndComments(req, res) {
        try {
            const { page = 1, limit = 5 } = req.query;
            const post = await Post.find()
                .populate("userId")
                .populate("commentIds")
                .skip((page - 1) * limit)
            res.send({ message: "Yes! here are the comments that you are looking for", post });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Sorry, we can not get your request! Please check everything if is ok!", error });
        }
    },
    async like(req, res) {
        try {
            const post = await Post.findById(req.params._id);
            const Liked = post.likes.includes(req.user._id)
            if (Liked) {
                return res
                    .status(400)
                    .send({ message: "Sorry! You can not give two likes in the same post", post });
            } else {
                const post = await Post.findByIdAndUpdate(
                    req.params._id,
                    { $push: { likes: req.user._id } },
                    { new: true }
                );
                res.send(post);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Sorry! something is not working very well", error });
        }
    },
    async dislike(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { $pull: { likes: req.user._id } },
                { new: true }
            );
            res.send({message: "Yes! You dislike this post", post});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "We can not get your request, something is not working well!", error});
        }
    },


}



module.exports = PostController;