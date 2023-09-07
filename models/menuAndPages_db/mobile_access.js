const mongoose = require('mongoose');
const mobile_access = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      parent_menu:{  type: String, required: true},
      page:{type: String, required: true},
      url:{type: String, required: true},
      img_path:{type: String, required: true},
      protocol:{type: String, required: true},
      status:{type: String,default:"pending"},
      roles:[],
      
});
const mobile_access_schema=mongoose.Schema(mobile_access) ; 
module.exports=mongoose.model('Mobile_access',mobile_access_schema);