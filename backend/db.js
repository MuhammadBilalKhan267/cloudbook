const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017";

const connectToDB = ()=>{
    mongoose.connect(mongooseURI).then(()=>{
        console.log("Connected to Database");
    })
}

module.exports = connectToDB;