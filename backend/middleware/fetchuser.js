var jwt = require('jsonwebtoken');
const JWT_SECRET = "bilalisagoodboi";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token){
        return res.status(401).send("Invalid Login!");
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    } catch (error) {
        return res.status(401).send("Invalid Token!");
    }
    
}

module.exports = fetchuser;