const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router()


router.post('/', UserController.register)

module.exports = router