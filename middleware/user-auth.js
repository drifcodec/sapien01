const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        console.log("verified_token:  --------->xx", token)
        const verified_token = jwt.verify(token, "secret");
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed error 401 expired token XX'
        });
    }
};