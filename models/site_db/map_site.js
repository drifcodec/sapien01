const mongoose = require('mongoose')
var map_site_structure = {
    _id: mongoose.Schema.Types.ObjectId,
    site_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    site_address: String,
    region: String,
    town: String,
    latitude: String,
    longitude: String,
    type: String,
    operator: String,
    operator_name: String,
    operator_type: String,
    operation_time: { type: Date, default: Date.now },
    status: { type: String, required: false, default: 1 },
    active: { type: String, required: false, default: 1 }
}
const map_site_Schema = mongoose.Schema(map_site_structure);
module.exports = mongoose.model('map_site', map_site_Schema);