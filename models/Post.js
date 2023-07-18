const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Please, insert the title"],
    },

    user: {
        type: String,
        required: [true, "Please, insert your user"],
    },

    data: {
        type: Date,
        required: [true, "Please insert the data"],
    },
    cool: {
        type: Boolean,
        required: [true, "Please insert the type boolean (true or false)"],
    },


}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;