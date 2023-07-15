const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { jwt_secret } = require("../config/keys.js");

//modificar codigo para add extras

const UserController = {
  async register(req, res, next) {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).send({ message: "This email already exists" });
      }
      req.body.role = "user";
      const password = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({ ...req.body, password });
      res.status(201).send({ message: "User created successfully", newUser });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
      //   next(error) // conecta con middleware errors. borrar el console y el status.send al descomentar esto
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email
      });
      if (!user) {
        return res.status(400).send({ message: "Incorrect user or password" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Incorrect user or password" });
      }
      const token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      console.log(user._id)
      res.send({ message: "Welcome " + user.name, user, token });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getById(req, res) {
    try {
      const user = await User.findById(req.params._id)
      res.send({ message: "Yes! You found it!", user })
    } catch (error) {
      res.status(500).send({ message: "Sorry, we did not find this user! Check if the id number is correctly." });
    }
  },

  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Disconnected successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem trying to disconnect the user",
      });
    }
  },









};











module.exports = UserController;




