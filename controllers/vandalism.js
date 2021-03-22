
const vandalism= require('../models/vandalism_db/vandalism');
const mongoose = require("mongoose");
module.exports.create_vandalism=(req,res)=>{
   console.log("##################################"+JSON.stringify(req.files.path))
    var post_data={_id:new mongoose.Types.ObjectId(),
                  report_by:req.body.report_by,
                  type:req.body.type,
                  description:req.body.description,
                  area:req.body.area,
                  priority:req.body.priority,
                  latitude:req.body.latitude,
                  longitude:req.body.longitude,
                  solved_by:req.body.solved_by, 
                  transformer_ID:req.body.transformer_ID,
                }//image_url:req.file.path
    const Vandalism_Obj_input= new vandalism(post_data)
    Vandalism_Obj_input.save().then(data =>{
    const message={message:'order was created',
                   status:201,
                   created_data:post_data}
           res.status(200).json(message)
    }
    ).catch(err => console.log(err));
    }
module.exports.get_all_vandalism= (req,res)=>{
    vandalism.find().exec().then( results=>{
          
           var data={"results": results}
              res.status(200).json(data)
            }
           ).catch(err => {
              console.log(err);
              res.status(500).json({ error: err });
            });
             }
module.exports.get_all_vandalism_by_user= (req,res)=>{
    var sort_by="report_date"
    vandalism.find({ report_by:'ninho'})
    .limit(1000)
    .sort({[sort_by]: -1}).exec()
    .then( results=>{                  
            var data={"data": results}
             res.status(200).json(data)
            }
            ).catch(err => {
                console.log(err);
                 res.status(500).json({ error: err });
                });
                             }
 