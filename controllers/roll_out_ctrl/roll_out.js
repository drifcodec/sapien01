const roll_out = require('../../models/roll_out_db/roll_out')
const google_distance_matrix = require('../../google_api/distance_matrix')
const mongoose = require("mongoose");
const time_converter = require('../../global_js_libs/time_format')
const jwt = require("jsonwebtoken");
var today = time_converter.current_local_time()
module.exports.roll_out_create = (req, res) => {

    var creatorobj = jwt.verify(req.body.creator, "secret");

    console.log("UUUUUUUUUUUUUUUUU", creatorobj)
    var post_data = {
            _id: new mongoose.Types.ObjectId(),
            creator: creatorobj.user_id,
            create_time: today,
            device_id: req.body.device_id,
            device_name: req.body.device_name,
            device_type: req.body.device_type,
            device_region: req.body.device_region,
            device_address: req.body.device_address,
            device_long: req.body.device_long,
            device_lat: req.body.device_lat,
            operator: req.body.operator,
            acceptor: req.body.acceptor,
            title: req.body.title,
            current_status: 'created',
            accept_time: req.body.accept_time,
            depart_time: req.body.depart_time,
            arrived_time: req.body.arrived_time,
            completed_time: req.body.completed_time,
            back_to_office_time: req.body.back_to_office_time,
            priority: req.body.priority,
            required_start_time: req.body.required_start_time,
            required_complete_time: req.body.required_complete_time,
            operate_source: req.body.operate_source,
            company_car: req.body.company_car,
            office: req.body.office,
            order_description: req.body.order_description,
            category: req.body.category,
            sub_category: req.body.sub_category,
            ticket_id: "RO_" + req.body.category.replace(/ /g, '_').toUpperCase() + " " + today.getFullYear() + "_" + (today.getMonth() + 1) + "_" + today.getDate() + " " + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds() + "_" + today.getMilliseconds(),
            ticket_status: "created",
        }
        //res.status(200).json(post_data)
    const OrderObj_input = new roll_out(post_data)
    OrderObj_input.save().then(data => {
        const message = {
            message: 'order was created',
            status: 201,
            created_data: post_data
        }
        res.status(200).json(message)
    }).catch(err => console.log(err));
}
module.exports.roll_out_distinct_List = (req, res) => {
    roll_out.aggregate([{ $group: { _id: null, current_status: { $addToSet: '$current_status' }, operator: { $addToSet: '$operator' }, priority: { $addToSet: '$priority' } } }],
        function(error, resp) {
            if (resp) {
                res.status(200).json({ results: resp });
            } else { res.status(404).json({}) }
        })

}
module.exports.roll_out_getList_table = (req, res) => {
    var searchStr = req.body;
    var order = ''
    var dir = searchStr.order[0].dir === 'asc' ? 1 : searchStr.order[0].dir === 'desc' ? -1 : ''
    var drop_down_select = {}
    for (i = 0; i < searchStr.columns.length; i++) {
        var field = searchStr.columns[i].data // name of the field
        var seach_value = searchStr.columns[i].search.value //value of the feild
        var regex = new RegExp(seach_value, "i")
        if (seach_value) {
            console.log("field VALUE------------------->", field)
            console.log("SEARCH VALUE------------------->", seach_value)
        }
        if (seach_value) {
            drop_down_select[field] = regex
        }
        if (i == searchStr.order[0].column) {
            order = searchStr.columns[i].data

        }
    }
    /* 
        if (req.body.search.value) {
            var regex = new RegExp(req.body.search.value, "i")
            searchStr = { $or: [{ 'operator': regex }, { 'current_status': regex }] };
            //searchStr = { $or: [{ 'operator': regex }, { 'current_status': regex }] };
        } else {
            searchStr = {};
        } */
    console.log("drop_down_select " + JSON.stringify(drop_down_select))
    console.log("searchStr " + JSON.stringify(searchStr.data))
    var draw = req.body.draw
    start = req.body.start == undefined ? 0 : req.body.start
    limit = req.body.length == undefined ? 1000 : req.body.length
    var recordsTotal = 0
    roll_out.countDocuments({}, function(err, total) {
        recordsTotal = total
        roll_out.countDocuments(drop_down_select, function(err, total_searched) {
            recordsFiltered = total_searched;

            //roll_out.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
            //roll_out.find(searchStr) for globale search 
            roll_out.find(drop_down_select)
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

module.exports.roll_out_getList = (req, res) => {
    var searchStr = req.body;
    start = req.body.start == undefined ? 0 : req.body.start
    limit = req.body.length == undefined ? 1000 : req.body.length
    roll_out.find(searchStr)
        .skip(Number(start))
        .limit(Number(limit))
        .exec()
        .then(results => {
            if (results) {
                var data = {
                    "results": results,
                    "total": results.length
                }
                res.status(200).json(data)
            }

        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
module.exports.roll_out_getList_operator = (req, res) => {
    var searchStr = {}
        //req.body.current_status ? searchStr.current_status = { $in: [req.body.current_status] } : ''
    req.body.current_status ? searchStr.current_status = { $in: req.body.current_status } : ''
        //searchStr.operator = req.body.operator
    console.log("Current_status", searchStr)
    start = req.body.start == undefined ? 0 : req.body.start
    limit = req.body.length == undefined ? 1000 : req.body.length
    roll_out.find(searchStr)
        .skip(Number(start))
        .limit(Number(limit))
        .exec()
        .then(results => {
            if (results) {
                var data = {
                    "results": results,
                    "total": results.length,
                    "url": "roll_out_getList_operator"
                }
                res.status(200).json(data)
            }

        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
module.exports.roll_out_get = (req, res) => {
    const _id = req.params.id;
    roll_out.findById(_id)
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

module.exports.roll_out_update = (req, res) => {
    var today = new Date();
    const id = req.params.id;
    roll_out.findById(id)
        .exec()
        .then(result => {
            if (result.current_status == "created" && req.body.now_status == "accepted") {
                req.body.accept_time = today
                req.body.current_status = "accepted"
            } else if (result.current_status == "accepted" && req.body.now_status == "departed" && req.body.depart_lat && req.body.depart_long) {
                req.body.depart_time = today
                req.body.current_status = "departed"
                req.body.ticket_status = "running"
                if (id && result.device_lat && result.device_long && req.body.depart_lat && req.body.depart_long) {
                    google_distance_matrix.get_distancematrix(id, result.device_lat, result.device_long, req.body.depart_lat, req.body.depart_long, req.body.now_status)
                }
            } else if (result.current_status == "departed" && req.body.now_status == "arrived") {
                var depart_time = result.depart_time
                const arrived_time_minutes = parseInt(Math.abs(depart_time.getTime() - today.getTime()) / (1000 * 60) % 60);
                const duration_estimate_in_minutes = result.duration_estimate_in_minutes
                var late_duration = 0
                if ((arrived_time_minutes - duration_estimate_in_minutes) > 5) {
                    late_duration = arrived_time_minutes - duration_estimate_in_minutes
                }
                req.body.arrived_time = today
                req.body.current_status = "arrived"
                req.body.arrived_duration = time_converter.convertMinsToHrsAndMins(arrived_time_minutes)
                req.body.late_duration = late_duration
            } else if (result.current_status == "arrived" && req.body.now_status == "completed") {
                req.body.completed_time = today
                req.body.current_status = "completed"
                req.body.ticket_status = "close"
            } else if (result.current_status == "completed" && req.body.now_status == "back_to_office") {
                req.body.back_to_office_time = today
                req.body.current_status = "back_to_office"
                google_distance_matrix.get_distancematrix(id, result.device_lat, result.device_long, req.body.office_lat, req.body.office_long, req.body.now_status)

            } else if ((result.current_status !== "completed" || result.current_status !== "back_to_office" || result.current_status !== "canceled") && (req.body.now_status == "canceled" && req.body.cancel_ticket_reason)) {
                req.body.current_status = "canceled"
                req.body.cancel_time = today
                req.body.ticket_status = "canceled"
                    //req.body.cancel_ticket_reason = "canceled"
            }


            var current_status = result.current_status
            roll_out.updateOne({ _id: id }, { $set: req.body })
                .exec()
                .then(result => {
                    if (result.nModified) {
                        res.status(200).json({
                            "Messaage": result,
                            "your previous status phase is ": current_status
                        });
                    } else {
                        res.status(200).json({
                            "update_status": "No",
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

module.exports.roll_out_delete = (req, res) => {
    var id = req.params.id
    console.log(id)
    roll_out.remove({ _id: id }).exec()
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