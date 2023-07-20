const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router()
const { authentication } = require("../middleware/authentication");


router.post('/', UserController.register);
router.post('/login', UserController.login);
router.get("/getInfo",authentication, UserController.getInfoLogged);
router.get('/id/:_id', UserController.getById);
router.get('/name/:name',UserController.getUsersByName);
router.get("/confirmed/:emailToken", UserController.confirm);
router.put('/follow/:_id', authentication, UserController.follow);
router.delete('/logout',authentication, UserController.logout)

module.exports = router 