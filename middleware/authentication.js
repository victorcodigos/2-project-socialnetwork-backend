const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js');

const Comment = require("../models/Comment");

const authentication = async (req, res, next) => {

    try {

        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = await User.findOne({ _id: payload._id, tokens: token });
        if (!user) {
            return res.status(401).send({ message: 'You are not authorized!' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There is some problem with the token!' })
    }
};

const isAuthor = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params._id);
        if (comment.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: "You are not the author. You are not authorizated to update/delete" });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Something went wrong checking the author' })
    }
};

module.exports = { authentication, isAuthor }