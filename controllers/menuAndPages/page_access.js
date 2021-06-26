const Page_access = require('../../models/menuAndPages_db/pages_access')
const mongoose = require("mongoose");
const User = require("../../models/user_db/user");

module.exports.Page_access_create = (req, res) => {
  var lower = ''
  var upper = ''
  if (req.body.page) {
    lower = req.body.page;
    upper = lower.charAt(0).toUpperCase() + lower.substring(1);
  }
  var post_data = {
    _id: new mongoose.Types.ObjectId(),
    parent_menu: req.body.parent_menu,
    page: req.body.page,
    url: req.body.url,
    protocol: req.body.protocol,
    view: req.body.view,
    roles: req.body.roles,
  }
  const OrderObj_input = new Page_access(post_data)
  OrderObj_input.save().then(data => {
    const message = {
      message: 'Page_access created',
      status: 201,
      created_data: post_data
    }
    res.status(200).json(message)
  }
  ).catch(err => console.log(err));

}
module.exports.getMenuList = (req, res) => {
  _id = req.params.id
  User.findById({ _id })
    .exec()
    .then(doc => {
      if (doc) {
       // console.log("############-----Roles------>###############" + JSON.stringify(doc.roles))
        Page_access.find({status:'online'}).exec()
          .then(results => {
            if (results) {
              var menu_list = []
              for (i = 0; i < results.length; i++) {
                var menu_obj = {
                  parent_menu: results[i].parent_menu,
                  page: results[i].page,
                  url: results[i].protocol + results[i].url,
                  view: results[i].view,
                 // page_roles: results[i].roles
                }

                if (results[i].roles && doc.roles) {
                  var permitionallowed = permitionChecker(doc.roles, results[i].roles)
                  if (doc.roles.includes('admin')) {
                    menu_list.push(menu_obj)
                  } else if (permitionallowed) {
                    menu_list.push(menu_obj)
                  } else {
                  }
                }

              }

             // console.log("############-----results------>###############" + JSON.stringify(menu_list))
              function permitionChecker(array1, array2) {
                for (let i = 0; i < array1.length; i++) {
                  for (let j = 0; j < array2.length; j++) {
                    if (array1[i] === array2[j]) {
                      return true;
                    }
                  }
                }
                return false;
              }
              var data = {
                "results": menu_list
              }
              res.status(200).json(data)
            }

          }
          ).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
        //res.status(200).json({ result: doc });
      } else {
        // res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "No valid entry found for provided ID" });
    });

}
module.exports.Page_access_getList = (req, res) => {
  sort_by = req.body.sort == '' ? 'record_date' : req.body.sort
  start = req.body.start == undefined ? 0 : req.body.start
  limit = req.body.limit == undefined ? 1000 : req.body.limit
  Page_access.find(req.body)
    .skip(start)
    .limit(limit)
    .sort({ [sort_by]: -1 })
    .exec()
    .then(results => {
      if (results) {
        var data = {
          "results": results
        }
        res.status(200).json(data)
      }

    }
    ).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}
module.exports.Page_access_getList_table = (req, res) => {
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
  limit = 10//req.body.length == undefined ? 1000 : req.body.length
  var recordsTotal = 0
  Page_access.countDocuments({}, function (err, total) {
    recordsTotal = total
    Page_access.countDocuments(drop_down_select, function (err, total_searched) {
      recordsFiltered = total_searched;

      //user_role.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
      //user_role.find(searchStr) for globale search 
      Page_access.find(drop_down_select)
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
module.exports.Page_access_get = (req, res) => {
  const id = req.params.id;
  Page_access.find({ _id: id })
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
module.exports.Page_access_update = (req, res) => {
  const id = req.params.id;
  Page_access.update({ _id: id }, { $set: req.body })
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
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
module.exports.Page_access_delete = (req, res, next) => {
  var id = req.params.id
  Page_access.remove({ _id: id })
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

