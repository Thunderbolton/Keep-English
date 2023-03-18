const bcrypt = require('bcrypt')
const validator = require('validator')
const User = require('../models/userModel')

const signinUser = async (req, res) => {
    res.json({mssg: 'sign in user'})
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400).json({ mssg: 'Please enter all information' })
    }

    if(!validator.isEmail(email)) {
        res.status(400).json({mssg: 'Please enter a valid email'})
    }

    if(!validator.isStrongPassword(password)) {
        res.status(400).json({mssg: 'Please enter a stronger password of at least 8 characters including 1 lowercase character, 1 uppercase character, 1 number, and 1 symbol'})
    }

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw Error('User already registered')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({name, email, password: hashedPassword})

    if(newUser) {
        res.status(201).json({name: newUser.name, email: newUser.email})
    } else {
        res.status(400)
        throw Error('Could not create user')
    }
}


module.exports = { signinUser, registerUser }