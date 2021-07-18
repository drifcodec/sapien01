const mongoose = require('mongoose');
const ro_category = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: { type: String, required: false, unique: true },
    description: { type: String, required: false }
});
const ro_category_Schema = mongoose.Schema(ro_category);
module.exports = mongoose.model('ro_category', ro_category_Schema);