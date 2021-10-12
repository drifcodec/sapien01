
const jwt = require('jsonwebtoken');

exports.currentUser = (token) => {
    if (token && token != null && token != 'null') {
        const verified_token = jwt.verify(token, "secret");
        return verified_token.user_id
    }
    return null

}