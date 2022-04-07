const mongoose = require('mongoose');

const role_Schema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      active_state: { type: Number, required: false, default: 1 },
      create_time: { type: Date },
      role_name: {type: String, required: true,  index: true},
      role_description: { type: String },
});

module.exports = mongoose.model('role',role_Schema);