module.exports.convertMinsToHrsAndMins = minutes => {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return h + ':' + m + " mins";
}
module.exports.current_local_time = () => {
    var today = new Date();
    today.setHours(today.getHours() + 2)
    return today
}
module.exports.common_date_format=()=>{
var seconds=current_local_time().getUTCSeconds()
var minutes=current_local_time().getUTCMinutes()
var hour=current_local_time().getUTCHours()
var date = current_local_time().getUTCDate();
var month = current_local_time().getUTCMonth() + 1; 
var year = current_local_time().getUTCFullYear();
var dateStr = date + "/" + month + "/" + year+" "+hour+":"+minutes+":"+seconds;
return dateStr
}