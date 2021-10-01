var jwtDecode = require('jwt-decode');
const users = require("../models/user_db/user")

module.exports = {
    gis: async(req, res, next) => {
        try {
            var decoded = jwtDecode(req.headers.authorization);
            var user = await getUser(decoded.id);
            if (user.roles.includes('gis') || user.roles.includes('super ffadmin')) {
                next();
            } else {
                return res.status(401).json({
                    message: 'Not Dont Have GIS rights!'
                });
            }

        } catch (error) {
            return res.status(401).json({
                message: 'Role auth  fail'
            });

        }

    },
    Admin: async(req, res, next) => {
        try { 
            var decoded = jwtDecode(req.headers.authorization);
            var user = await getUser(decoded.id);
            console.log("--------------------------->decoded ",decoded)
            if (user.roles.includes('admin') || user.roles.includes('super admin')) {
                next();
            } else {
                return res.status(401).json({
                    message: 'Not Dont Have right to Add Roles!'
                });
            }

        } catch (error) {
            return res.status(401).json({
                message: 'Role auth x fail'
            });

        }

    },
    Allowed: async(req, res, next) => {
        try {
            var decoded = jwtDecode(req.headers.authorization);
            var user = await getUser(decoded.id);
            if (user.user_status === 'Active' || user.roles.includes('super admin')) {
                next();
            } else {
                return res.status(401).json({
                    message: 'you are not Active User, Please contact Admin'
                });
            }

        } catch (error) {
            return res.status(401).json({
                message: 'Role auth  fail'
            });

        }

    }

};
async function getUser(id) {
    return new Promise((resolve, reject) => {
        users.findOne({ _id: id })
            .exec()
            .then(result => {
                if (result) {
                    return resolve(result)
                } else {
                    return resolve(null)
                }
            })
            .catch(err => {
                return resolve(null)
            });
    })
}