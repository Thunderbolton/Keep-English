const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const signinUser = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ mssg: 'Please enter all information' })
    }

    const existingUser = await User.findOne({ email })

    if(existingUser && (await bcrypt.compare(password, existingUser.password))) {
        return res.json({ name: existingUser.name, email: existingUser.email, mssg: 'Success. User signed in', token: generateJWT(existingUser._id)})
    } else {
       return res.status(400).json({mssg: 'Email or password is incorrect. Please check and try again'})
    }
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
       return res.status(400).json({mssg: 'Please enter all information'})
    }

    if(!validator.isEmail(email)) {
        return res.status(400).json({mssg: 'Please enter a valid email'})
    }

    if(!validator.isStrongPassword(password)) {
        return res.status(400).json({mssg: 'Please enter a stronger password of at least 8 characters, including 1 lowercase character, 1 uppercase character, 1 number, and 1 symbol'})
    }

    const userExists = await User.findOne({ email })

    if(userExists) {
       return res.status(400).json({mssg: 'User already registered - please enter a different email'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({name, email, password: hashedPassword})

    if(newUser) {
        return res.status(201).json({name: newUser.name, email: newUser.email, token: generateJWT(newUser._id)})
    } else {
        return res.status(400).json({mssg: 'Could not create user'})
    }
}

const generateJWT = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {
        expiresIn: '10d'
    })
}

module.exports = { signinUser, registerUser }