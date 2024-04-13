const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "bilalisagoodboi";


//Create a new user
router.post('/createUser', [
    body('email', 'Invalid Email').isEmail(),
    body('name', 'Name must be atleast 3 characters').isLength({min: 3}),
    body('password', 'Password must be at least 8 characters').isLength({min: 8})
], async (req, res)=>{
    const result = validationResult(req);
    
    //Return error array if invalid data is sent
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    
    try{
        //Check if email is available
        let user =  await User.findOne({email: req.body.email});
        if (user){
            return res.status(400).json({error: "Email already in use!"});
        }

        const salt = await bcrypt.genSalt();
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const data = {
            id: user.data
        };

        const authToken = jwt.sign(data, JWT_SECRET);

        

        res.send({authToken});
        // .catch(error => {
        //     console.log(error);
        //     res.json({error : "Email already in use!"});
        // })
    }
    catch(error){
        console.error(error.message);
        res.status(500).json("Unexpected error!");
    }
});

router.get('/', (req, res)=>{
    res.redirect('http://localhost:3000');
});

module.exports = router