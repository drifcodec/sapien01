const mongoose = require('mongoose');
const pages_access = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    parent_menu: { type: String, required: false },
    page: { type: String, required: true },
    url: { type: String, required: true },
    view: { type: String, required: true },
    protocol: { type: String, required: true },
    source: { type: String, required: true },
    status: { type: String, default: "pending" },
    position: { type: Number, default: 0 },
    roles: []

});
const pages_access_Schema = mongoose.Schema(pages_access);
module.exports = mongoose.model('Pages_access', pages_access_Schema);