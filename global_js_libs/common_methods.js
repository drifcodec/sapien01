
const jwt = require('jsonwebtoken');

exports.currentUser = (token) => {
    if (token && token != null && token != 'null') {
        const verified_token = jwt.verify(token, "secret");
        return verified_token.user_id
    }
    return null

}
exports.currentUserID = (token) => {
    if (token && token != null && token != 'null') {
        const verified_token = jwt.verify(token, "secret");
        return verified_token._id
    }
    return null

}


exports.twoTimeDiffence_M =(clockOut,clockIn)=> {
    newDate = new Date(clockOut);
    old_date = new Date(clockIn);
    var diff = Math.abs(newDate -old_date)
    var minutes = Math.floor((diff/1000)/60)
     return minutes;
}
exports.twoTimeDiffence_HM =(clockOut,clockIn)=> {
    newDate = new Date(clockOut);
    old_date = new Date(clockIn);

    seconds = Math.floor((newDate - (old_date))/1000);
    minutes = Math.floor(seconds/60);
    hours = Math.floor(minutes/60);
    days = Math.floor(hours/24);
    
    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);

     return " Hours: " + hours + " Minutes: " + minutes;
}