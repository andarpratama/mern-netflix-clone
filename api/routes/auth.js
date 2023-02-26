const router = require('express').Router()
const User = require('../models/Users')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// Register
router.post('/register', async (req, res) => {
    console.log(process.env.SECRET_KEY)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    }) 

    try {
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }

})

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(401).json("wrong username or password!")
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        originalPassword !== req.body.password &&
            res.status(401).json("wrong username or password!")
        
        const accessToken = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin}, 
            process.env.SECRET_KEY, 
            {expiresIn: '1d'}
        )

        const {password, ...response} = user._doc
        res.status(200).json({...response, accessToken})
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router