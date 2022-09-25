const mongoose = require('mongoose');

const user_role_Schema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      create_time: { type: Date },
      role_name: {type: String, required: true,  index: true},
      account_id: { type: String, required: true }
});

user_role_Schema.index({ "role_name": 1, "account_id": 1}, { "unique": true });

module.exports = mongoose.model('user_rolexx',user_role_Schema);