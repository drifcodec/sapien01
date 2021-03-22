var jwtDecode = require('jwt-decode');

module.exports = {
    admin_role: (req, res, next) => {
        try {
            var decoded = jwtDecode(req.headers.authorization);
            var user_role = decoded.user_role;
            var expire_date = decoded.exp
            if (Date.now() <= expire_date * 1000) {
                if (user_role.includes('Admin')) {
                    next();
                } else {
                    return res.status(401).json({
                        message: 'Not Admin!'
                    });
                }
            }
            else {
                return res.status(401).json({
                    message: 'Permission Denied expired token!'
                });
            }

        } catch (error) {
            return res.status(401).json({
                message: 'Role auth  fail'
            });

        }

    }

}; 