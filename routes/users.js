const express = require('express')
const router = express.Router()
const bcyrpt = require("bcyrptjs")
// User model 
const User = require('../models/User')
//Login Page
router.get('/login', (req, res) => { res.render("login") });

// Register Page

router.get('/register', (req, res) => { res.render('register') });

// Register Handle 

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = []
    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all the fields" })
    }
    // Check password match 
    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" })
    }
    // check pass length 
    if (password.length < 6) {
        errors.push({ msg: "Password should be at least 6 characters" })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else {
        // Validation passes 
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: "Please use another email address" })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                }
                else {
                    // bcyrpt pass
                }
            })
            ;
    }

});

module.exports = router