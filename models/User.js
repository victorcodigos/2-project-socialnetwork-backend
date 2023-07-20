const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, insert your name"],
    },
    lastName: {
      type: String,
    },
    DNI: {
      type: String,
      required: [true, "Please, insert your DNI"],
    },
    birthdate: {
      type: Date,
      required: [true, "Please, insert your birthdate"],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Please, insert a valid email"],
      unique: true,
      required: [true, "Please, insert your email"],
    },
    password: {
      type: String,
      required: [true, "Please, insert your password"],
    },
    image:String,
    role: { type: String, default: "user" },
    tokens: [],
    followers: [{type: ObjectId, ref: "User"}],
    following: [{ type: ObjectId, ref: "User" }],
    postIds: [{ type: ObjectId, ref: "Post" }],


    confirmed: Boolean,
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function() { // Le decimos que no nos devuelva en el documento ni los tokens ni las contraseñas (Es solo para cuando hagas un get info del usuario no aparezcan pero sigue en base de datos)
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  return user;
}

UserSchema.index({
  name: "text",
  });

const User = mongoose.model("User", UserSchema);

module.exports = User;
