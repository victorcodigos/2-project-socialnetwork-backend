const User = require("../models/User")
const bcrypt = require("bcryptjs")


//modificar codigo para add extras

const UserController = {
    async register(req, res, next) {
        try {
          req.body.role = "user";
          const password = await bcrypt.hash(req.body.password, 10);
          const user = await User.create({ ...req.body, password });
          res.status(201).send({ message: "User created successfully", user });
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        //   next(error) // conecta con middleware errors. borrar el console y el status.send al descomentar esto
        }
      },

}

module.exports = UserController

// Repo Sofi para comparar e implementar
// async register(req, res) {
//     try {
//         const email = req.body.email;
//         const user = await User.findOne({ email: email })
//         if (user) {
//             return res.status(400).send({ message: 'Este correo ya existe' });
//         }
//         const hash = await bcrypt.hash(req.body.password, 10)
//         const newUser = await User.create({...req.body, password: hash, role: 'user' });
//         res.status(201).send({
//             newUser
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error, message: 'Hubo un problema al tratar de registar' })
//     }
// },