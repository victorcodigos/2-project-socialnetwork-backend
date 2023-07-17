const express = require('express');
const PostController = require('../controllers/PostController');
const { authentication } = require('../middleware/authentication');
const router = express.Router()


router.post('/',PostController.create)
router.put('/id/:_id', authentication, PostController.update)


module.exports = router;