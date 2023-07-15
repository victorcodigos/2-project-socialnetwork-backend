const mongoose = require('mongoose');
// const ObjectID = require('mongodb').ObjectID
// const ObjectId = mongoose.SchemaTypes.ObjectId;


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        // unique: true,  //validacion
        // required: true //validacion
    },
    lastName: {
        type: String,
        // required: true
    },
    DNI: {
        type: String,
        // unique: true,
        // required: true
    },
    email: {
        type: String,
        // unique: true,
        // required: true

    },
    password: {
        type: String,
        // required: true
    },
    // commentIds: [{ type: ObjectId, ref: 'Post' }],
    // postIds: [{ type: ObjectId, ref: 'Comment' }],
    // role: String,

    // tokens: [],

}, { timestamps: true });
// UserSchema.index({    //busqueda por indice
//     name: 'text'

// });
// UserSchema.methods.toJSON = function() {  
//     const user = this._doc;
//     delete user.tokens;
//     delete user.password;
//     return user;
// }

const User = mongoose.model('User', UserSchema);

module.exports = User;