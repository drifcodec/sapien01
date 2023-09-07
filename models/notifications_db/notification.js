const mongoose = require('mongoose')
var notification_properties = {
    _id: mongoose.Schema.Types.ObjectId,
    category:[],//general //ows //
    cc: [],
    from: String,
    to: String,
    subject: String,
    description: String,
    attachment: String,
    sent_date: { type: Date, default: Date.now, format: "%Y-%m-%d" },
    viewed_date: { type: Date},
    status:{type:String,default:"created"}  //created or viewed
}
const notification_Schema = mongoose.Schema(notification_properties);
module.exports = mongoose.model('notification', notification_Schema);