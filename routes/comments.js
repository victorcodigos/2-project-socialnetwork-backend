const express = require('express');
const CommentController = require('../controllers/CommentController');
const router = express.Router()


router.post('/', CommentController.create);
router.put('/id/:_id', CommentController.update)

module.exports = router;