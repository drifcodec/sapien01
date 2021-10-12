const mongoose = require('mongoose')

const clocking_Schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: String, required: true},
    user_name: { type: String },
    clockin_time: Date,
    clockout_time: Date,
    current_status:String,  
    total_working_hours: String,
});
module.exports = mongoose.model('clocking', clocking_Schema);