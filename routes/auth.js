const router = require('express').Router();
const userController = require('../controllers/UserController');

router.post('/api/user/signup',userController.userSignup)
router.post('/api/user/signin',userController.signInUser)
router.get('/',userController.homePage)
router.get('/signup',userController.signupPage)
router.get('/signin',userController.signinPage)
router.get('/usermanagement',userController.allUsers)





module.exports = router;