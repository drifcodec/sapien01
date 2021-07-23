const mongoose = require('mongoose')
var region_structure = {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    fullname: { type: String, required: true, unique: true },
}
const region_Schema = mongoose.Schema(region_structure);
module.exports = mongoose.model('region', region_Schema);