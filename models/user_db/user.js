const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      active_state:{ type: Number,required:false,default:1},
      user_id:{  type: String, required: true},
      password: { type: String, required: true },
      name:{  type: String, required: false}, 
      surname:{ type: String,required: false},
      phone:{type: Number},
      roles:[],
      permission:[],
     // valid_from:{type: Date,required: true},
     // expire_from:{type: Date,required: true},
      user_status:{ type: String,required:false,default:'Active'},
      last_gps_last:{ type: String},
      last_gps_long:{ type: String},
      email: { type: String, required: true, unique: false, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/}
});

module.exports = mongoose.model('User', userSchema);