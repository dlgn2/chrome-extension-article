const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv =require("dotenv");
const Cookies = require("universal-cookie");




router.post('/register', async (req, res) => {
    console.log(req.body)

    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await new User({
            email: req.body.email,
            password: hashedPassword,
            fullname: req.body.fullname,
            phoneNumber:req.body.phoneNumber,
            ilce:req.body.ilce,
            user_role:req.body.user_role,

        });
        const user = await newUser.save();
        const {
            password,
            ...other
        } = user._doc;
        return res.status(200).json(other);
    } catch (err) {
        return res.status(404).json(err);
    }
});


router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({
            email: req.body.email
        });
        !user && res.status(404).json("Email not found");
        if (!user && res.status(404).json("Email not found")) {
            return res.status(404).json("Email not found");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("wrong password");
    
        validPassword && res.status(200).json(user)
    

    } catch (err) {
        return console.log(err);
    }
});



module.exports = router