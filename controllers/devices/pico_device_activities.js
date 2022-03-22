const device_activity = require('../../models/device_db/pico_device_activities')
const device = require('../../models/device_db/pico_device')
const mongoose = require("mongoose");


module.exports.create_device = async (req, res) => {
  var isPico = await authPico(req.body.device_id)
  console.log("*** ***", isPico)
  if (isPico) {
    req.body._id = new mongoose.Types.ObjectId()
    const OrderObj_input = new device_activity(req.body)
    OrderObj_input.save().then(data => {
      const message = {
        message: 'Activity was created',
        status: 201,
        data:data
      }
      res.status(200).json(message)
    }
    ).catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  } else {
    res.status(500).json({ message: "this device isnt registered please contact Admin" })
  }

}
async function authPico(pico_id) {
  return new Promise((resolve, reject) => {
    device.findOne({ "device_id": pico_id })
      .exec()
      .then(result => {
        if (result) {
          return resolve(true)
        } else {
          return resolve(false)
        }

      })
      .catch(err => {
        res.status(401).json({
          message: "Error proccesing"
        });
      });
  })

}
module.exports.get_all_devices = (req, res) => {
  sort_by = req.body.sort == '' ? 'activity_time' : req.body.sort
  start = req.body.start == undefined ? 0 : req.body.start
  limit = req.body.limit == undefined ? 1000 : req.body.limit
  device_activity.find(req.body)
    .skip(start)
    .limit(limit)
    .sort({ [sort_by]: "desc" })
    .exec()
    .then(results => {
      console.error("---results ########3---->",results)
      var data = {
        "total": results.length,
        "results": results
      }
      res.status(200).json(data)
    }
    ).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}
module.exports.get_device_by_id = (req, res, next) => {
  const id = req.params.id;
  device.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

module.exports.patch_device = (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of [req.body]) {
    //updateOps[ops.propName] = ops.value;
    //console.log("####################"+ JSON.stringify(ops));

    console.log("####################" + JSON.stringify(ops));
    device.updateOne({ _id: id }, { $set: ops })
      .exec()
      .then(result => {
        res.status(200).json({ "Messaage": "eayayays" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });


  }
}
module.exports.delete_device = (req, res, next) => {
  var id = req.params.id
  device.remove({ _id: id })
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
} 