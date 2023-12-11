const { Signup, Login } = require('../controllers/authController')
const {userVerification } = require('../middleware/AuthMiddleware')
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/user',userVerification)

module.exports = router