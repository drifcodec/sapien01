const jwt = require('jsonwebtoken');
const users=require('../appsServer/user_management/models/user')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verified_token = jwt.verify(token, "secret");
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed error 401 expired token XX'
        });
    }
};