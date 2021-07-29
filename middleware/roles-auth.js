var jwtDecode = require('jwt-decode');
const users = require("../models/user_db/user")

module.exports = {
    gisAuth: async(req, res, next) => {
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
    AdminAuth: async(req, res, next) => {
        try {
            var decoded = jwtDecode(req.headers.authorization);
            var user = await getUser(decoded.id);
            if (user.roles.includes('admin') || user.roles.includes('super admin')) {
                next();
            } else {
                return res.status(401).json({
                    message: 'Not Dont Have right to Add Roles!'
                });
            }

        } catch (error) {
            return res.status(401).json({
                message: 'Role auth  fail'
            });

        }

    },
    AllowedAuth: async(req, res, next) => {
        try {
            var decoded = jwtDecode(req.headers.authorization);
            var user = await getUser(decoded.id);
            console.log("---------> xx000000000000000000000000000", user)
            if (user.user_status === 'Active') {
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