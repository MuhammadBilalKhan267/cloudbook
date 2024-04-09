const express = require('express');
const User = require('../models/User');
const router = express.Router();



router.post('/', (req, res)=>{
    const user = User(req.body);
    user.save();
    console.log(req.body);
    res.send("hello");
})
router.get('/', (req, res)=>{
    res.redirect('http://localhost:3000');
})

module.exports = router