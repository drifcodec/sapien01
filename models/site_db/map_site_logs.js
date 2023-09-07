const mongoose = require('mongoose')
var site_structure = {
    _id: mongoose.Schema.Types.ObjectId,
    site_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    site_address: String,
    region: String,
    town: String,
    latitude: String,
    longitude: String,
    type: String,
    status: String,
    record_date: { type: Date, default: Date.now, format: "%Y-%m-%d" }
}
const site_Schema = mongoose.Schema(site_structure);
module.exports = mongoose.model('map_site_log', site_Schema);