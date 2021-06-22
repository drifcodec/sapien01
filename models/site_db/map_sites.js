const mongoose=require('mongoose')
var site_structure={ _id:mongoose.Schema.Types.ObjectId,
                       id:{type: String, required: true,unique: true},
                       name:{type: String, required: true,unique: true},
                       site_address:String,
                       region:String,
                       town:String,
                       lattiude:String,
                       longitude:String,
                       type:String,
                       status:String,
                       active:{type: String,required: false,default:1}}
const site_Schema=mongoose.Schema(site_structure) ; 
module.exports=mongoose.model('map_site',site_Schema);