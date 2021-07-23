const mongoose = require('mongoose')
var site_type_structure = {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false, unique: true },
}
const site_type_Schema = mongoose.Schema(site_type_structure);
module.exports = mongoose.model('site_type', site_type_Schema);