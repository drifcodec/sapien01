const mongoose = require('mongoose');

var schemaOptions = {
      timestamps: true,
      toJSON: {
        virtuals: true
      },
      toObject: {
        virtuals: true
      }
    };
const rollOutSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      active_state:{ type: Number,required:false,default:1},
      creator:{type: String, required: true},
      device_id:{type: String, required: false}, 
      device_name:{ type: String, required: false}, 
      device_long:{type: Number,required: false},
      device_lat:{type: Number, required: false}, 
      operator:{type: String, required: false},
      acceptor:{type: String, required: false}, 
      title:{ type: String},
      current_status:{type: String},
      create_time: {type: Date},
      accept_time: {type: Date},
      depart_time: {type: Date},
      arrived_time: {type: Date},
      completed_time: {type: Date},
      back_to_office_time: {type: Date},
      cancel_time: {type: Date},
      depart_lat:{type: Number},
      depart_long:{type: Number},
      priority:{type: String},
      required_start_time: {type: Date},
      required_complete_time: {type: Date},
      operate_source:{ type: String},
      company_car:{ type: String},
      office:{ type: String},
      order_description:{ type: String},
      duration_estimate:{ type: String},
      duration_estimate_in_minutes:{ type: Number},
      distance_estimate:{ type: String},
      origin_addresses:{ type: String},
      destination_addresses:{ type: String},
      arrived_duration:{ type: String},
      late_duration:{ type: Number},
      ticket_id:{ type: String},
      ticket_status:{ type: String},
      category:{ type: String},
      sub_category:{ type: String},
      office_lat:{ type: String},
      office_long:{ type: String},
      back_to_office_duration:{ type: String},
      back_to_office_estimate_in_minutes:{ type: String},
      back_to_office_distance_estimate:{ type: String},
      total_distance:{ type: String},
      cancel_ticket_reason:{ type: String}, 
      
},schemaOptions);

module.exports = mongoose.model('roll_out', rollOutSchema);