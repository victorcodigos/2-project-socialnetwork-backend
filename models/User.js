const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    lastName: {
        type: String,
    },
    DNI: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    tokens: [],
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

module.exports = User;