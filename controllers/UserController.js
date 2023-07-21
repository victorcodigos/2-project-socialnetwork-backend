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

  async getInfoLogged(req, res) {
    try {
      const loggedUser = await User.findById(req.user._id)
      .populate("postIds", "post" )
      .populate("followers", "name" )
      .populate("following", "name" )

      const followers = loggedUser.followers.length
 
      res.send({message: "User Logged:", loggedUser, followers});
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

   async follow(req, res) {
    try {
      const user = await User.findById(req.params._id);
      const userLogged = await User.findById(req.user._id);
      const alreadyFollow = userLogged.following.includes(req.params._id);

      if (userLogged._id.toString() === user._id.toString()) {
        return res.status(400).send({ message: "You cannot follow yourself" });
      }

      if (alreadyFollow) {
        return res
          .status(400)
          .send({ message: "You already follow this user" });
      } else {
        const userFollowed = await User.findByIdAndUpdate(
          req.params._id,
          { $push: { followers: req.user._id } },
          { new: true }
        );
        const userFollowing = await User.findByIdAndUpdate(
          req.user._id,
          { $push: { following: req.params._id } },
          { new: true }
        );
         
        res.send({message: "You have followed succesfully this user",userFollowed, userFollowing});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your follow", error });
    }
  },

  async unfollow (req, res) {
    try {
      const userFollowed = await User.findByIdAndUpdate(
        req.params._id,
        { $pull: { followers: req.user._id } },
        { new: true }
      );
      const userFollowing = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: req.params._id } },
        { new: true }
      );
      res.send({message: "You have unfollowed succesfully this user",userFollowed, userFollowing});
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your unfollow", error });
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

  async recoverPassword(req, res) {

    try {
      const recoverToken = jwt.sign({ email: req.params.email }, jwt_secret, {
        expiresIn: "48h",
      });
      const url = "http://localhost:3000/users/resetPassword/" + recoverToken;
      await transporter.sendMail({
        to: req.params.email,
        subject: "Recover password",
        html: `<h3> Recover password </h3>,
    <a href="${url}">CLICK HERE TO RECOVER YOUR PASSWORD</a>,
    the link will expire in 48 hours!
    `,
      });
      res.send({ message: "An email to recovery your password was sent to your email address." });
    } catch (error) {
      console.error(error);
      res.status(404).send({ message: "Sorry, something went wrong! Please check if you insert the email correctly in the URL.", error });
    }
  },

  async resetPassword(req, res) {

    try {
      const recoverToken = req.params.recoverToken;
      const payload = jwt.verify(recoverToken, jwt_secret);
      await User.findOneAndUpdate(
        { email: payload.email },
        { password: req.body.password }
      );
      res.send({ message: "Password has changed successfully!" });
    } catch (error) {
      console.error(error);
      res.status(404).send({ message: "Sorry, we can not update your passoword!", error });
    }
  },


};

module.exports = UserController;
