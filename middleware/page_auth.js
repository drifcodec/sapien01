const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

module.exports = (req, res,next) => {

    //console.log("-------------------->"+JSON.stringify(req.headers))
    try {
        if (req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];
            console.log("token :"+token)
            const verified_token = jwt.verify(token, "secret");
             var expire_date = verified_token.exp
             req.userData = verified_token; 
             console.log("verified_token: "+JSON.stringify(expire_date*1000))
             console.log("date: "+JSON.stringify(Date.now()))
             if (Date.now() <= expire_date * 1000) {
                 next();
                return res.status(200).json({
                    message: true
                }); 
             } else {
                return res.status(401).json({
                    message: 'Permission Denied expired token!'
                });
            }
        } else {
            return res.status(401).json({
                message: 'Unknow error!'
            });
        }
       
        
        //var decoded = jwtDecode(req.headers.authorization);
       
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed error 401 expired token'
        });
    }
}; 