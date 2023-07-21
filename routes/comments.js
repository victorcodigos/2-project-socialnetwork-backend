const express = require('express');
const CommentController = require('../controllers/CommentController');
const router = express.Router()
const { uploadCommentImages } = require('../middleware/multer');
const { authentication, isAuthorComment } = require("../middleware/authentication");


router.post("/:_id", authentication, uploadCommentImages.single('image'), CommentController.create);
router.put('/id/:_id', authentication, isAuthorComment, CommentController.update);
router.put('/likes/:_id', authentication, CommentController.like);
router.put('/dislikes/:_id', authentication, CommentController.dislike);
router.delete('/id/:_id', authentication, isAuthorComment, CommentController.delete)


module.exports = router;