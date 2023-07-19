const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");
const { transporter } = require("../config/nodemailer");

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
      const newUser = await User.create({ ...req.body, password, confirmed: false });

      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '100h' })
      const url = "http://localhost:3000/users/confirmed/" + emailToken

      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirm your email!",
        html: `<h3>Welcome! you are just one step to access it! </h3> 
        <a href="${url}"> Please, click to confirm it!</a>
        `,
      });


      res.status(201).send({ message: "User created successfully", newUser });
    } catch (error) {
      next(error); //sustituye al status y el error porque ya esta en el middleware
    }
  },

  async confirm(req, res) {

    try {
      const token = req.params.emailToken

      console.log(token)
      const payload = jwt.verify(token, jwt_secret)
      console.log(payload)
      await User.findOneAndUpdate(
        { email: payload.email }, { confirmed: true })
      res.status(201).send("Congrats! User confirmed successfully!");
    } catch (error) {
      console.error(error)
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(400).send({ message: "Incorrect user or password" });
      }
      if (user.confirmed == false) {
        return res.status(400).send({ message: "Please, you need to confirm your email before access it! Thank you!" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Incorrect user or password" });
      }
      const token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      console.log(user._id);
      res.send({ message: "Welcome " + user.name, user, token });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getById(req, res) {
    try {
      const user = await User.findById(req.params._id);
      res.send({ message: "Yes! You found it!", user });
    } catch (error) {
      res
        .status(500)
        .send({
          message:
            "Sorry, we did not find this user! Check if the id number is correctly.",
        });
    }
  },

  // async getInfoLogged(req, res) {
  //   try {
  //     const user = await User.findById(req.user._id)
  //       // .populate({
  //       //   path: "orderIds",
  //       //   populate: {
  //       //     path: "productIds",
  //       //   },
  //       // })
  //       // .populate({
  //       //   path: "wishList",
  //       // })
  //       .populate("postIds");
  //     res.send(user);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },

  async getInfoLogged(req, res) {
    try {
      const user = await User.findById(req.user._id)
        .populate("postIds");
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },

  async getUsersByName(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send('Your search is too long.')
      }
      const name = new RegExp(req.params.name, "i");
      const users = await User.find({
        $text: {
          $search: req.params.name,
        },
      });
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },


  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        //req.user._id es el usuario loggeado
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
