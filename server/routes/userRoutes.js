const express = require('express')
const router =  express.Router()

const { signinUser, registerUser } = require('../controllers/userController')


router.post('/signin', signinUser)

router.post('/register', registerUser)

module.exports = router