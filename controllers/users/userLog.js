const user_log = require('../../models/user_db/user_log')
const mongoose = require("mongoose");

module.exports.user_log_create = (req, res) => {
  var ip = req.headers['x-forwarded-for'] ||req.socket.remoteAddress ||null;
  var post_data = {
    _id: new mongoose.Types.ObjectId(),
    user_id:req.body.user_id,
    log_type:req.body.log_type,
    ip_address:ip
  }
  const OrderObj_input = new user_log(post_data)
  OrderObj_input.save().then(data => {
    const message = {
      message: 'Role created',
      status: 201,
      created_data: post_data
    }
    res.status(200).json(message)
  }
  ).catch(err =>{
    console.log(err)
  res.status(400).json({ error: err });
  } 
  
  );
}

module.exports.user_log_getList = (req, res) => {
  start = req.body.start == undefined ? 0 : req.body.start
  limit = req.body.length == undefined ? 1000 : req.body.length

      //user_log.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
      //user_log.find(searchStr) for globale search 
      user_log.find()
        .skip(Number(start))
        .limit(Number(limit))
        .exec()
        .then(results => {
          if (results) {
            var data = {
              "results": results
            }
            res.status(200).json(results)
          }

        }
        ).catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
        });
  
}
module.exports.user_log_getList_table = (req, res) => {
  var searchStr = req.body;
  var order = ''
  var dir = searchStr.order[0].dir === 'asc' ? 1 : searchStr.order[0].dir === 'desc' ? -1 : ''
  var drop_down_select = {}
  for (i = 0; i < searchStr.columns.length; i++) {
    var field = searchStr.columns[i].data
    var seach_value = searchStr.columns[i].search.value
    if (seach_value) {
      drop_down_select[field] = seach_value
    }
    if (i == searchStr.order[0].column) {
      order = searchStr.columns[i].data

    }
  }
  if (req.body.search.value) {
    var regex = new RegExp(req.body.search.value, "i")
    //searchStr = { $or: [{ 'operator': regex }, { 'current_status': regex }] };
  }
  else {
    searchStr = {};
  }
  console.log("drop_down_select " + JSON.stringify(drop_down_select))
  console.log("searchStr " + JSON.stringify())
  var draw = req.body.draw
  start = req.body.start == undefined ? 0 : req.body.start
  limit = req.body.length == undefined ? 1000 : req.body.length
  var recordsTotal = 0
  user_log.countDocuments({}, function (err, total) {
    recordsTotal = total
    user_log.countDocuments(drop_down_select, function (err, total_searched) {
      recordsFiltered = total_searched;

      //user_log.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
      //user_log.find(searchStr) for globale search 
      user_log.find(drop_down_select)
        .skip(Number(start))
        .limit(Number(limit))
        .sort({ [order]: dir })
        .exec()
        .then(results => {
          if (results) {
            var data = {
              "draw": draw,
              "recordsFiltered": recordsFiltered,
              "recordsTotal": recordsTotal,
              "data": results
            }
            res.status(200).json(data)
          }

        }
        ).catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
  })
}


module.exports.user_log_get = (req, res) => {
  const _id = req.params.id;
  user_log.findById(_id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({ result: doc });
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "No valid entry found for provided ID" });
    });
}




