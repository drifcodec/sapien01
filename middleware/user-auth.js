const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("token :"+token)
        const verified_token = jwt.verify(token, "secret");
        console.log("verified_token: "+verified_token)
        req.userData = verified_token; 
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed error 401 expired token'
        });
    }
}; 