const mongoose = require('mongoose');
const ro_scheduled_user = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uesr_id: { type: String, required: false },
    user_name: { type: String, required: false, unique: true }
});
const ro_scheduled_user_Schema = mongoose.Schema(ro_scheduled_user);
module.exports = mongoose.model('ro_scheduled_user', ro_scheduled_user_Schema);