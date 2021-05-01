const mongoose=require('mongoose')
var site_structure={ _id:mongoose.Schema.Types.ObjectId,
                       site_id:{type: String, required: true,unique: true},
                       name:{type: String, required: true,unique: true},
                       address:String,
                       region:String,
                       town:String,
                       lattiude:String,
                       longitude:String,
                       record_date: {type: Date,default: Date.now,format: "%Y-%m-%d"},
                       active:{type: String,required: false,default:1}}
const site_Schema=mongoose.Schema(site_structure) ; 
module.exports=mongoose.model('all_site',site_Schema);