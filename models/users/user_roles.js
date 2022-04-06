const mongoose = require('mongoose');

const user_role_Schema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      create_time: { type: Date },
      role_name: {type: String, required: true,  index: true},
      account_id: { type: String, required: true }
});

module.exports = mongoose.model('user_role',user_role_Schema);