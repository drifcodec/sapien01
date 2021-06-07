const mongoose = require('mongoose')
var notification_properties = {
    _id: mongoose.Schema.Types.ObjectId,
    type: { type: String, required: true },//sms, email,internal
    category:String,//general //ows //
    cc: String,
    from: String,
    to: String,
    subject: String,
    description: String,
    attachment: String,
    sent_date: { type: Date, default: Date.now, format: "%Y-%m-%d" },
    status: String //created or viewed
}
const notification_Schema = mongoose.Schema(notification_properties);
module.exports = mongoose.model('notification', notification_Schema);