const express = require('express');
const PostController = require('../controllers/PostController');
const router = express.Router()


router.post('/',PostController.create)


module.exports = router;