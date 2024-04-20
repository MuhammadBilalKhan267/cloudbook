const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "bilalisagoodboi";
const fetchuser = require('../middleware/fetchuser');


// ROUTE 1: Creating a new user using: POST "api/auth/createUser"
router.post('/createUser', [
    body('email', 'Invalid Email').isEmail(),
    body('name', 'Name must be atleast 3 characters').isLength({ min: 3 }),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
], async (req, res) => {
    const result = validationResult(req);

    //Return error array if invalid data is sent
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        //Check if email is available
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Email already in use!" });
        }

        const salt = await bcrypt.genSalt();
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })




        res.status(200).json({ success: "User created successfully"});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Unexpected error!"});
    }
});




// ROUTE 2: Authenticating a user using: POST "api/auth/login"
router.post('/login', [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password can not be blank').exists()
], async (req, res) => {
    const result = validationResult(req);

    //Return error array if invalid data is sent
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);



        res.status(200).json({ authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Unexpected error!"});
    }

})


// ROUTE 3: Fetching user data using: POST "api/auth/getuser". Login Required!!!
router.post('/getuser', fetchuser
    , async (req, res) => {

        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({error: "Unexpected error!"});
        }

    })



router.get('/', (req, res) => {
    res.redirect('http://localhost:3000');
});

module.exports = router