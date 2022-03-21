const mongoose = require('mongoose')
var device_structure = {
    _id: mongoose.Schema.Types.ObjectId,
    device_id: { type: String, required: true },
    device_name: String,
    device_type: String,
    parent_type: String,
    parent_id: String,
    call_interval: Number,// in seconds
    max_current: Number,
    active: { type: String, required: false, default: 1 },
}
const device_Schema = mongoose.Schema(device_structure);
module.exports = mongoose.model('pico_device', device_Schema);