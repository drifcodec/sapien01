const mongoose = require('mongoose');
const ro_sub_category = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: { type: String, required: false },
    sub_category: { type: String, required: false, unique: true },
    description: { type: String, required: false }
});
const ro_sub_category_Schema = mongoose.Schema(ro_sub_category);
module.exports = mongoose.model('ro_sub_category', ro_sub_category_Schema);