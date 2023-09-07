const mongoose = require('mongoose');
const parent_menu = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      parent_menu:{  type: String, required: false,unique: true},
      description:{  type: String, required: false}
});
const parent_menu_Schema=mongoose.Schema(parent_menu) ; 
module.exports=mongoose.model('Parent_menu',parent_menu_Schema);