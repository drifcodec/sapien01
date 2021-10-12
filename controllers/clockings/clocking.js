const clocking = require('../../models/clocking/clocking')
const mongoose = require("mongoose");
const commonMethod=require("../../global_js_libs/common_methods")
var startDate = new Date(); // this is the starting date that looks like ISODate("2014-10-03T04:00:00.188Z")
startDate.setSeconds(0);
startDate.setHours(0);
startDate.setMinutes(0);

var dateMidnight = new Date(startDate);
dateMidnight.setHours(23);
dateMidnight.setMinutes(59);
dateMidnight.setSeconds(59);
module.exports.clocking_create = async (req, res) => {
    var isUser = await commonMethod.currentUser(req.headers.authorization.split(" ")[1])
    
    var post_data = {
        _id: new mongoose.Types.ObjectId(),
        user_id: isUser,
        clockin_time: req.body.clockin_time?new Date(req.body.clockin_time):req.body.clockin_time,
        clockout_time: req.body.clockout_time?new Date(req.body.clockout_time):req.body.clockout_time,
        current_status:"Clocked In",
    }
    const OrderObj_input = new clocking(post_data)
    OrderObj_input.save().then(data => {
        const message = {
            message: 'clocking created',
            status: 201,
            created_data: post_data
        }
        res.status(200).json(message)
    }).catch(err => console.log(err));

}

module.exports.clocking_getList = (req, res) => {
    start = req.body.start == undefined ? 0 : req.body.start
    limit = req.body.length == undefined ? 1000 : req.body.length
        //site.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
        //site.find(searchStr) for globale search 
    clocking.find(req.body)
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

        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

}
module.exports.clocking_getList_table = (req, res) => {
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
    } else {
        searchStr = {};
    }
    //console.log("drop_down_select " + JSON.stringify(drop_down_select))
   // console.log("searchStr " + JSON.stringify())
    var draw = req.body.draw
    start = req.body.start == undefined ? 0 : req.body.start
    limit = req.body.length == undefined ? 1000 : req.body.length
    var recordsTotal = 0
    clocking.countDocuments({}, function(err, total) {
        recordsTotal = total
        clocking.countDocuments(drop_down_select, function(err, total_searched) {
            recordsFiltered = total_searched;

            //site.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
            //site.find(searchStr) for globale search 
            clocking.find(drop_down_select)
                .skip(Number(start))
                .limit(Number(limit))
                .sort({
                    [order]: dir
                })
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

                }).catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });
        })
    })
}
module.exports.my_clocking_getList_table = async (req, res) => {
    var searchStr = req.body;
    var order = ''
    var dir = searchStr.order[0].dir === 'asc' ? 1 : searchStr.order[0].dir === 'desc' ? -1 : ''
    var drop_down_select = {}
    var isUser = await commonMethod.currentUser(req.headers.authorization.split(" ")[1])
    if (isUser){
        drop_down_select.user_id=isUser
    }
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
    } else {
        searchStr = {};
    }
    console.log("drop_down_select " + JSON.stringify(drop_down_select))
    console.log("searchStr " + JSON.stringify())
    var draw = req.body.draw
    start = req.body.start == undefined ? 0 : req.body.start
    limit = req.body.length == undefined ? 1000 : req.body.length
    var recordsTotal = 0
        clocking.countDocuments(drop_down_select, function(err, total_searched) {
            recordsFiltered = total_searched;

            //site.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
            //site.find(searchStr) for globale search 
            clocking.find(drop_down_select)
                .skip(Number(start))
                .limit(Number(limit))
                .sort({
                    [order]: dir
                })
                .exec()
                .then(results => {
                    if (results) {
                        var data = {
                            "draw": draw,
                            "recordsFiltered": recordsFiltered,
                            "recordsTotal": recordsFiltered,
                            "data": results
                        }
                        res.status(200).json(data)
                    }

                }).catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });
        })
  
}

module.exports.clocking_get = (req, res) => {
    const _id = req.params.id;
    clocking.findById(_id)
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
module.exports.clocking_today_checker = async  (req, res) => {
var isUser = await commonMethod.currentUser(req.headers.authorization.split(" ")[1])
var filter = {"clockin_time": { $gte: startDate,
                                $lte:dateMidnight },
              "user_id":isUser};           
    clocking.findOne(filter)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({ result: doc });
            } else {
                res.status(200).json({ result:{}});
            }
        })
        .catch(err => {
            res.status(500).json({ error: "No valid entry found for provided ID" });
        });
}

module.exports.clocking_update = async (req, res) => {
    var resp= await getClockingID(req)
        req.body.clockout_time= req.body.clockout_time?new Date(req.body.clockout_time):req.body.clockout_time
        req.body.current_status="Clocked Out"
        req.body.total_working_hours=commonMethod.twoTimeDiffence_HM(new Date(req.body.clockout_time),resp.clockin_time)
        req.body.totalInMinutes=commonMethod.twoTimeDiffence_M(new Date(req.body.clockout_time),resp.clockin_time)
        req.body.completion_status=commonMethod.twoTimeDiffence_M(new Date(req.body.clockout_time),resp.clockin_time)>=480?"completed":"incomplete"
        
    if (resp._id){
     clocking.update({ _id: resp._id }, { $set: req.body })
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
}

module.exports.clocking_delete = (req, res) => {
    var id = req.params.id
    console.log("###########################_>>>>>>>>>" + id)
    clocking.remove({ _id: id })
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
async function getClockingID(req) {
    var isUser = await commonMethod.currentUser(req.headers.authorization.split(" ")[1])
    var filter = {"clockin_time": { $gte: startDate,
        $lte:dateMidnight },
        "user_id":isUser};
    return new Promise((resolve, reject) => {
        clocking.findOne(filter)
            .exec()
            .then(result => {
                if (result) {
                    return resolve(result)
                } else {
                    return resolve(null)
                }

            })
            .catch(err => {
                return resolve(null)
            });
    })
}