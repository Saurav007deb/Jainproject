const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwrSecret = "Qwertyuiop094";


router.post("/createuser", [
    body('email').isEmail(),
    body('password', 'password not valid. Min length should be').isLength({ min: 5 }),]


    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


router.post("/loginuser", async (req, res) => {
    let email = req.body.email;

    try {
        let validData = await User.findOne({ email });

        if (!validData) {
            return res.status(400).json({ errors: "Incorrect Email" })
        }

     
        

        const pwdCompare = await bcrypt.compare(req.body.password, validData.password);

        if (!pwdCompare) {
           
            return res.status(400).json({ errors: "Password not valid" })
        }

        const data = {
            user: {
                id: validData.id
            }
        }

        const authToken = jwt.sign(data, jwrSecret)
        return res.json({ success: true, authToken: authToken })

    } catch (error) {
        console.log(error)
        res.json({ success: false });
    }
})





module.exports = router;