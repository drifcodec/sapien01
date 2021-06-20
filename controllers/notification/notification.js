const notification = require('../../models/notifications_db/notification')
const User = require('../../models/user_db/user')
const email_server = require("../../emails/user_confirmation_email");
const local_time = require("../../global_js_libs/time_format");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const time_converter = require('../../global_js_libs/time_format');
module.exports.notification_create = async (req, res) => {
  var isReciever = await getUserID(req.body.to)
  var isSender = await getSender(req.headers.authorization.split(" ")[1])

  //console.log("sen d isSender---------------------------------->>>>>>>>>>>>>>.", isSender)
  if (isSender && isReciever && isReciever.status === true && req.body.category) {
    console.log(req.body.category.length)
    req.body._id = new mongoose.Types.ObjectId()
    req.body.from = isSender
    const OrderObj_input = new notification(req.body)
    OrderObj_input.save()
      .then(data => {
        for (i = 0; i < req.body.category.length; i++) {
          if (req.body.category[i] === 'Email') {
           // console.log("sen d Email---------------------------------->>>>>>>>>>>>>>.")
            email_server.notification(isSender, isReciever.email, req.body.subject, req.body.description).catch(console.error);
          } else if (req.body.category[i] === 'SMS') {
           // console.log("have SMS")
            // code for SMS here 
          }
        }
        const message = {
          message: 'Notification created',
          status: 201,
          created_data: req.body
        }
        res.status(200).json(message)
      }
      ).catch(err => console.log(err));
  }
  /* var post_data = {,
    from: req.body.site_id,
    to: req.body.name,
  } */
}
function getSender(token) {
  if (token && token !=null && token !='null') {
    const verified_token = jwt.verify(token, "secret");
    return verified_token.user_id
    console.log("token---------->", verified_token.user_id)
  }
  return null
}
async function getUserID(user) {
  return new Promise((resolve, reject) => {
    User.findOne({ user_id: user })
      .exec()
      .then(result => {
        if (result) {
          return resolve({
            status: true,
            email: result.email
          })
        }
        else {
          return resolve(null)
        }

      })
      .catch(err => {
        res.status(401).json({
          message: "Error proccesing"
        });
      });
  })
}

module.exports.notification_getListByUser = (req, res) => {
  start = req.body.start == undefined ? 0 : req.body.start
  limit = req.body.length == undefined ? 1000 : req.body.length
  //site.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
  //site.find(searchStr) for globale search
  let currentUser = ''
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const verified_token = jwt.verify(token, "secret");
    currentUser = verified_token.user_id
    //console.log("token---------->", verified_token.user_id)
  }
  notification.find({ from: currentUser })
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
module.exports.notification_getList = (req, res) => {
  start = req.body.start ? req.body.start: 0 
  limit = req.body.limit ? req.body.limit: 1000
  //site.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
  //site.find(searchStr) for globale search
  
  console.log("start ------------------->",start)
  console.log("limit ------------------->",limit)
  console.log("status ------------------->",req.body)
  notification.find()
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
module.exports.notification_getList_pending = async  (req, res) => {
  start = req.body.start ? req.body.start: 0 
  limit = req.body.limit ? req.body.limit: 1000
  //site.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
  //site.find(searchStr) for globale search
  console.log("start ------------------->",start)
  console.log("limit ------------------->",limit)
  console.log("status ------------------->",req.body)
  
  var isSender = await getSender(req.headers.authorization.split(" ")[1])
  notification.find({status:'created',to:isSender})
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
module.exports.notification_getList_table = (req, res) => {
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
 // console.log("drop_down_select " + JSON.stringify(drop_down_select))
 //0 console.log("searchStr " + JSON.stringify())
  var draw = req.body.draw
  start = req.body.start == undefined ? 0 : req.body.start
  limit = req.body.length == undefined ? 1000 : req.body.length
  var recordsTotal = 0
  notification.countDocuments({}, function (err, total) {
    recordsTotal = total
    notification.countDocuments(drop_down_select, function (err, total_searched) {
      recordsFiltered = total_searched;

      //site.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
      //site.find(searchStr) for globale search
      notification.find(drop_down_select)
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
          //console.log(err);
          res.status(500).json({ error: err });
        });
    })
  })
}
module.exports.notification_getList_tableByUser = async (req, res) => {

  var isSender = await getSender(req.headers.authorization.split(" ")[1])
  var searchStr = req.body;
  var order = ''
  var dir = searchStr.order[0].dir === 'asc' ? 1 : searchStr.order[0].dir === 'desc' ? -1 : ''
  var drop_down_select = {}
  drop_down_select.from = isSender

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
 // console.log("drop_down_select " + JSON.stringify(drop_down_select))

  //console.log("searchStr " + JSON.stringify())
  var draw = req.body.draw
  start = req.body.start == undefined ? 0 : req.body.start
  limit = req.body.length == undefined ? 1000 : req.body.length
  var recordsTotal = 0
  notification.countDocuments({}, function (err, total) {
    recordsTotal = total
    notification.countDocuments(drop_down_select, function (err, total_searched) {
      recordsFiltered = total_searched;

      //site.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
      //site.find(searchStr) for globale search
      notification.find(drop_down_select)
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
         // console.log(err);
          res.status(500).json({ error: err });
        });
    })
  })
}
module.exports.my_notification_getList_table = async (req, res) => {

  var isSender = await getSender(req.headers.authorization.split(" ")[1])
  var searchStr = req.body;
  var order = ''
  var dir = searchStr.order[0].dir === 'asc' ? 1 : searchStr.order[0].dir === 'desc' ? -1 : ''
  var drop_down_select = {}
  drop_down_select.to = isSender

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
 // console.log("drop_down_select " + JSON.stringify(drop_down_select))

 // console.log("searchStr " + JSON.stringify())
  var draw = req.body.draw
  start = req.body.start == undefined ? 0 : req.body.start
  limit = req.body.length == undefined ? 1000 : req.body.length
  var recordsTotal = 0
  notification.countDocuments({}, function (err, total) {
    recordsTotal = total
    notification.countDocuments(drop_down_select, function (err, total_searched) {
      recordsFiltered = total_searched;

      //site.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
      //site.find(searchStr) for globale search
      notification.find(drop_down_select)
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
          //console.log(err);
          res.status(500).json({ error: err });
        });
    })
  })
}
module.exports.notification_get = (req, res) => {
  const _id = req.params.id;
  notification.findById(_id)
    .exec()
    .then(doc => {
     // console.log("From database", doc);
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

module.exports.notification_update = (req, res) => {
  const id = req.params.id;
  req.body.viewed_date=local_time.current_local_time()
  notification.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      if (result.nModified) {
        res.status(200).json({
          "Messaage": result,
        });
      } else {
        res.status(200).json({
          "update_status": "No",
        });
      }

    })
    .catch(err => {
     // console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

module.exports.notification_delete = (req, res) => {
  var id = req.params.id
 // console.log("###########################_>>>>>>>>>" + id)
  notification.remove({ _id: id })
    .exec()
    .then(doc => {
      //console.log("From database", doc);
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


