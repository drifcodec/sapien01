const mongoose = require('mongoose');
//const local_time=require('../global_js_libs/time_format')
const vandalismSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      report_by:{  type: String},
      type:{ type: String},
      description:{type: String},
      area:{  type: String, required: false}, 
      latitude: { type: String, required: false },
      longitude:{  type: String, required: false}, 
      solved_by:{  type: String, required: false},
      transformer_ID:{ type: String},
      priority:{ type: String},
      //report_date: {type: Date,default: local_time.current_local_time() },
      created_date: {type: Date,default: Date.now,format: "%Y-%m-%d"},
      image_url:{ type: String}
      
});

module.exports = mongoose.model('Vandalism', vandalismSchema);