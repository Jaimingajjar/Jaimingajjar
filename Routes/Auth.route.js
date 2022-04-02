const express = require('express')
const router = express.Router()
const model = require('../Models/User.model')
const AuthController = require('../Controllers/Auth.Controller')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/addStudent' ,model.Student)

module.exports = router
