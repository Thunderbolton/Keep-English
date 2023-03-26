const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const signinUser = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(400).json({ mssg: 'Please enter all information' })
    }

    const existingUser = await User.findOne({ email })

    if(existingUser && (await bcrypt.compare(password, existingUser.password))) {
        res.json({ name: existingUser.name, email: existingUser.email, mssg: 'Success. User signed in', token: generateJWT(existingUser._id)})
    } else {
        res.status(400)
        throw Error('Invalid information')
    }
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
        res.status(201).json({name: newUser.name, email: newUser.email, token: generateJWT(newUser._id)})
    } else {
        res.status(400)
        throw Error('Could not create user')
    }
}


const generateJWT = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {
        expiresIn: '10d'
    })
}

module.exports = { signinUser, registerUser }