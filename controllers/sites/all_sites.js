const site = require('../../models/site_db/all_sites')
const time=require('../../global_js_libs/time_format')
const mongoose = require("mongoose");

module.exports.site_create = (req, res) => {
    var post_data = {
        _id: new mongoose.Types.ObjectId(),
        site_id: req.body.site_id,
        name: req.body.name,
        address: req.body.address,
        region: req.body.region,
        town: req.body.town,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        site_type: req.body.site_type,
        record_date: time.current_local_time,
    }
    const OrderObj_input = new site(post_data)

    OrderObj_input.save().then(data => {
        const message = {
            message: 'Site created',
            status: 201,
            created_data: post_data
        }
        res.status(200).json(message)
    }).catch(err => console.log(err));

}

module.exports.site_getList = (req, res) => {
    console.log("-----------------------------------", req.query.region)
    var seach = {}
    req.query.region ? seach.region = req.query.region : ''
    start = req.body.start == undefined ? 0 : req.body.start
    limit = req.body.length == undefined ? 1000 : req.body.length
        //site.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
        //site.find(searchStr) for globale search 
    site.find(seach)
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
module.exports.site_getList_table = (req, res) => {
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
    console.log("drop_down_select " + JSON.stringify(drop_down_select))
    console.log("searchStr " + JSON.stringify())
    var draw = req.body.draw
    start = req.body.start == undefined ? 0 : req.body.start
    limit = req.body.length == undefined ? 1000 : req.body.length
    var recordsTotal = 0
    site.countDocuments({}, function(err, total) {
        recordsTotal = total
        site.countDocuments(drop_down_select, function(err, total_searched) {
            recordsFiltered = total_searched;

            //site.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
            //site.find(searchStr) for globale search 
            site.find(drop_down_select)
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


module.exports.site_get = (req, res) => {
    const _id = req.params.id;
    site.findById(_id)
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

module.exports.site_update = (req, res) => {
    const id = req.params.id;
    site.update({ _id: id }, { $set: req.body })
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

module.exports.site_delete = (req, res) => {
    var id = req.params.id
    console.log("###########################_>>>>>>>>>" + id)
    site.remove({ _id: id })
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