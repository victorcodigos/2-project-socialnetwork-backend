const express = require('express');
const CommentController = require('../controllers/CommentController');
const router = express.Router()
const { authentication } = require("../middleware/authentication");


router.post('/', authentication, CommentController.create);
router.put('/id/:_id', authentication, CommentController.update)

module.exports = router;