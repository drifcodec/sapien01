const mongoose = require('mongoose');
const utc_time=require("../../../global_js_libs/time_format")

const user_log_Schema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      user_id: { type: String, required: true },
      log_type: { type: String, required: true },
      ip_address: { type: String, required: false },
      log_lat: { type: String, required: false },
      log_long: { type: String, required: false },
      log_time: {type: Date,default:utc_time.current_local_time,format: "%Y-%m-%d"},

});

module.exports = mongoose.model('User_Log', user_log_Schema);