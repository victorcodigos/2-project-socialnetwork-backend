const express = require('express');
const PostController = require('../controllers/PostController');
const { authentication } = require('../middleware/authentication');
const router = express.Router()


router.post('/', authentication, PostController.create)
router.put('/id/:_id', authentication, PostController.update)
router.delete('/delete/:_id',authentication, PostController.delete)
router.get('/name/:name',PostController.getPostByName)
router.get('/id/:_id', PostController.getById)
router.get('/get_all/', PostController.getAll)




module.exports = router;