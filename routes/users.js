const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router()
const { authentication } = require("../middleware/authentication");
const { uploadUserImages } = require('../middleware/multer');


router.post('/', uploadUserImages.single('image'), UserController.register);
router.post('/login', UserController.login);
router.get("/getInfo",authentication, UserController.getInfoLogged);
router.get('/id/:_id', UserController.getById);
router.get('/name/:name',UserController.getUsersByName);
router.get("/confirmed/:emailToken", UserController.confirm);
router.put('/follow/:_id', authentication, UserController.follow);
router.put('/unfollow/:_id', authentication, UserController.unfollow);
router.delete('/logout',authentication, UserController.logout)

router.get('/recoverPassoword/:email',UserController.recoverPassword)
router.put('/resetPassword/:recoverToken',UserController.resetPassword)

module.exports = router 