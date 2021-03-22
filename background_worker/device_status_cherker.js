const device= require('../models/device_db/device')
const device_checker_email = require("../emails/device_checker");
const axios=require('axios')
module.exports=(req,res)=>{
axios.post('http://localhost:3000/api/device/getList').then(resp => {
                                  //console.log(resp.data)
          var today = new Date(); 
          today.setHours( today.getHours() + 2 )
          var diff = Math.abs(new Date(resp.data.data[0].record_date) - new Date(today));
          //var minutes = Math.floor((diff/1000)/60);
          var seconds = Math.floor((diff/1000));
          _id=resp.data.data[0]._id
          var interval=20
          var time=new Date(resp.data.data[0].record_date)
              time.toLocaleString()/* 
          console.log(time+"") */
          notified_email=resp.data.data[0].notified_email
          device_id=resp.data.data[0].device_id
          var get_email='mwarabudanny@gmail.com'
         if (seconds>interval && notified_email=='no'){
          device.updateOne({ _id: _id },{notified_email:'yes',device_status:'0'})
           .exec()
           .then(result => {
           device_checker_email.power_off_email(get_email,device_id,time).catch(console.error);
           res.status(200).json({"Messaage":"eayayays"});
           }).catch(err => {
           console.log(err);
           res.status(500).json({
             error: err
           });
         });/* 
            console.log("#########################################################################")
            console.log("power off")
            console.log("seconds :" +seconds)
            console.log("did more then 10 second off , by the Team Leader was already Nofitied") */
          }
          else if (seconds<interval && notified_email=='yes'){
           device.updateOne({ _id: _id },{notified_email:'no',device_status:'1'})
           .exec()
           .then(result => {
           device_checker_email.power_on_email(get_email,device_id,time).catch(console.error);
           res.status(200).json({"Messaage":"eayayays"});
           }).catch(err => {
           console.log(err);
           res.status(500).json({
             error: err
           });
         });/* 
            console.log("#########################################################################")
            console.log("power on")
            console.log("seconds :" +seconds)
            console.log("Electricity is Back on") */
             // here we need to update the device data model to notified_email no
           }else if (seconds>interval && notified_email=='yes'){
        /*     console.log("#########################################################################")
            console.log("device off but notification already sent to main office")
            console.log("seconds :" +seconds) */
           }else if (seconds<interval && notified_email=='no') {
     /*        console.log("#########################################################################")
            console.log("power on , notification off")
            console.log("device id :"+resp.data.data[0].device_id)
            console.log("notified_email :"+notified_email)
            console.log("seconds :" +seconds) */
          }
        }).catch((error) => {
          console.warn('cant conect to server please check internt or url'+error);
      });
     
}



