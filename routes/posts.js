const express = require('express');
const PostController = require('../controllers/PostController');
const { authentication, isAuthor } = require('../middleware/authentication');
const router = express.Router()





router.get('/name/:name',PostController.getPostByName)
router.get('/id/:_id', PostController.getById)
router.get('/get_all/', PostController.getAll)
router.get('/get_posts_comments/', PostController.getPostAndComments)
router.post('/', authentication, PostController.create)
router.put('/id/:_id', authentication, isAuthor, PostController.update)
router.put('/likes/:_id', authentication, PostController.like)
router.put('/dislike/:_id',authentication, PostController.dislike)
router.delete('/delete/:_id',authentication, isAuthor, PostController.delete)





module.exports = router;