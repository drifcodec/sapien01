const roll_out = require('../models/roll_out_db/roll_out')
const axios = require('axios')

module.exports.get_distancematrix= function (_id, depart_lat, depart_long, arrive_lat, arrive_long, status) {
    //console.log('https://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyB9ruoW9fo6I58xNlvaHUDn6Ejl9S04mXs&origins=' + depart_lat + ',' + depart_long + '&destinations=' + arrive_lat + ',' + arrive_long + '')
    axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyB9ruoW9fo6I58xNlvaHUDn6Ejl9S04mXs&origins=' + depart_lat + ',' + depart_long + '&destinations=' + arrive_lat + ',' + arrive_long + '')
    .then(resp => {
  
      var post_data = {}
      if (status === "departed") {
          post_data.id = _id
          post_data.origin_addresses = resp.data.origin_addresses[0] === undefined ? '' : resp.data.origin_addresses[0],
          post_data.destination_addresses = resp.data.destination_addresses[0] === undefined ? '' : resp.data.destination_addresses[0],
          post_data.duration_estimate = resp.data.rows[0].elements[0].duration.text === undefined ? '' : resp.data.rows[0].elements[0].duration.text,
          post_data.duration_estimate_in_minutes = resp.data.rows[0].elements[0].duration.value === undefined ? '' : (resp.data.rows[0].elements[0].duration.value / 60).toFixed(0),
          post_data.distance_estimate = resp.data.rows[0].elements[0].distance.text === undefined ? '' : resp.data.rows[0].elements[0].distance.text
        post_data.status = status
        roll_out_update(post_data)
      } else if (status = "back_to_office") {
        post_data.id = _id
        post_data.back_to_office_duration = resp.data.rows[0].elements[0].duration.text === undefined ? '' : resp.data.rows[0].elements[0].duration.text,
          post_data.back_to_office_estimate_in_minutes = resp.data.rows[0].elements[0].duration.value === undefined ? '' : (resp.data.rows[0].elements[0].duration.value / 60).toFixed(0),
          post_data.back_to_office_distance_estimate = resp.data.rows[0].elements[0].distance.text === undefined ? '' : resp.data.rows[0].elements[0].distance.text
        post_data.status = status
        roll_out_update(post_data)
      }
    }).catch((error) => {
      console.warn('cant get distance :(');
    });
  }
  
  function roll_out_update(data) {
    roll_out.findById(data.id)
      .exec()
      .then(result => {
        var current_status = result.current_status
        roll_out.updateOne({ _id: data.id }, { $set: data })
          .exec()
          .then(result => {
            if (result.nModified) {
              console.log({
                "Messaage": result,
                "your current phase is ": data.status
              });
            } else {
              console.log({
                "update_status": "No )------>",
                "your current phase is ": current_status
              });
            }
  
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "No valid entry found for provided ID" });
      });
  }


  /* 
  1. User management and page management
  2. clokcing
  3.Messaging
  4.GIS and GIS Dashboard
  5.WO creation and WO dashboard
  */
  