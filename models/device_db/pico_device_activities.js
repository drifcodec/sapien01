const mongoose = require('mongoose')
var device_structure = {
    _id: mongoose.Schema.Types.ObjectId,
    device_id: { type: String, required: true },
    unique_id:{ type: String, required: false },
    gps_lattiude: String,
    gps_longitude: String,
    sensor_oil: Number,
    sensor_current: Number,
    sensor_temp: Number,
    device_status: String,
    activity_time: { type: Date, default: Date.now }
}
const device_Schema = mongoose.Schema(device_structure);
module.exports = mongoose.model('pico_device_activitie', device_Schema);