const mongoose = require("mongoose");

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
    role: { type: String, default: "user" },
    tokens: [],
  },
  { timestamps: true }
);

UserSchema.index({
  name: "text",
  });

const User = mongoose.model("User", UserSchema);

module.exports = User;
