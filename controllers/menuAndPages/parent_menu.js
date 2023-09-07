const parent_menu = require('../../models/menuAndPages_db/parent_menu')
const mongoose = require("mongoose");
module.exports.parent_menu_create = (req, res) => {
    var lower = ''
    var upper = ''
    if (req.body.parent_menu) {
        lower = req.body.parent_menu;
        upper = lower.charAt(0).toUpperCase() + lower.substring(1);
        var post_data = {
            _id: new mongoose.Types.ObjectId(),
            parent_menu: upper,
            description: req.body.description,
            position: req.body.position
        }
        const OrderObj_input = new parent_menu(post_data)
        OrderObj_input.save().then(data => {
            const message = {
                message: 'parent_menu created',
                status: 201,
                created_data: post_data
            }
            res.status(200).json(message)
        }).catch(err => console.log(err));
    } else {
        res.status(500).json({ error: "", message: "please enter parent name" });
    }

}

module.exports.parent_menu_getList = (req, res) => {
    sort_by = req.body.sort == '' ? 'record_date' : req.body.sort
    start = req.body.start == undefined ? 0 : req.body.start
    limit = req.body.limit == undefined ? 1000 : req.body.limit
    parent_menu.find(req.body)
        .skip(start)
        .limit(limit)
        .sort({
            [sort_by]: -1
        })
        .exec()
        .then(results => {
            if (results) {
                var data = {
                    "results": results
                }
                res.status(200).json(data)
            }

        }).catch(err => {
            res.status(500).json({ error: err });
        });
}
module.exports.parent_menu_getList_table = (req, res) => {
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
        searchStr = { $or: [{ 'parent_menu': regex }] };
    } else {
        searchStr = {};
    }
    var draw = req.body.draw
    start = req.body.start == undefined ? 0 : req.body.start
    limit = req.body.length == undefined ? 1000 : req.body.length
    var recordsTotal = 0
    parent_menu.countDocuments({}, function(err, total) {
        recordsTotal = total
        parent_menu.countDocuments(searchStr, function(err, total_searched) {
            recordsFiltered = total_searched;

            //user_role.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
            //user_role.find(searchStr) for globale search 
            parent_menu.find(searchStr)
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


module.exports.parent_menu_get = (req, res) => {
    const id = req.params.id;
    parent_menu.find({ _id: id })
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

module.exports.parent_menu_update = (req, res) => {
    const id = req.params.id;
    parent_menu.update({ _id: id }, { $set: req.body })
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

module.exports.parent_menu_delete = (req, res) => {
    var id = req.params.id
    parent_menu.find({ _id: id })
        .exec()
        .then(doc => {
            var deteteStattus = isDeletedStatus(doc[0].parent_menu)
            console.log("From database", deteteStattus);
            if (deteteStattus) {
                parent_menu.remove({ _id: id })
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
            } else {
                res.status(403).json({ message: "Cant Delete System Page." });

            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "No valid entry found for provided ID" });
        });

}


function isDeletedStatus(data) {
    var notDeletable = ["Test", "Admin", "Configuration"]
    if (notDeletable.includes(data)) {
        return false
    }
    return true
}