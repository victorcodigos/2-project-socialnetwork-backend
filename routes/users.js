const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router()
const { authentication } = require("../middleware/authentication");


router.post('/', UserController.register);
router.post('/login', UserController.login)
router.get('/id/:_id', UserController.getById)
router.delete('/logout',authentication, UserController.logout)

module.exports = router