
const Page_access = require('../../models/menuAndPages_db/pages_access')
const mongoose = require("mongoose");
const UserRoles = require('../../appsServer/user_management/models/user_roles')
const User = require("../../appsServer/user_management/models/user");

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
        status: req.body.status,
        source: req.body.source
    }
    const OrderObj_input = new Page_access(post_data)
    OrderObj_input.save().then(data => {
        const message = {
            message: 'Page_access created',
            status: 201,
            created_data: post_data
        }
        res.status(200).json(message)
    }).catch(err => console.log(err));

}
module.exports.getMenuList = (req, res) => {
    User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
        { $lookup: { from: 'user_roles', localField: 'user_id', foreignField: 'account_id', as: 'RolesArr' } }
    ]).exec()
        .then(user_ => {
            let user = user_[0]
            if (user) {
                let roles = ["super_admin"]
                user.RolesArr.forEach(e => {
                    roles.push(e.role_name)
                });
                Page_access.find({ status: 'online', roles: { "$in": roles } })
                    //.select("-roles")
                    .sort({ ['position']: 'asc' }).exec()
                    .then(results => {
                        res.status(200).json({
                            "results": results
                        })
                    }).catch(err => {
                        res.status(500).json({ error: err });
                    });
            }
        })
        .catch(err => {
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
    } else {
        searchStr = {};
    }
    var draw = req.body.draw
    start = req.body.start == undefined ? 0 : req.body.start
    limit = 10 //req.body.length == undefined ? 1000 : req.body.length
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
            if (doc) {
                res.status(200).json({ result: doc });
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
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
            res.status(500).json({
                error: err
            });
        });
}

module.exports.Page_access_delete = (req, res) => {
    var id = req.params.id
    Page_access.find({ _id: id })
        .exec()
        .then(doc => {
            var deteteStattus = isDeletedStatus(doc[0].page)
            if (deteteStattus) {
                Page_access.remove({ _id: id })
                    .exec()
                    .then(doc => {
                        if (doc) {
                            res.status(200).json(doc);
                        } else {
                            res.status(404).json({ message: "No valid entry found for provided ID" });
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ error: err });
                    });
            } else {
                res.status(403).json({ message: "Cant Delete System Page(" + doc[0].page + ") from system" });

            }
        })
        .catch(err => {
            res.status(500).json({ error: "No valid entry found for provided ID" });
        });

}

function isDeletedStatus(data) {
    var notDeletable = ["Users", "Roles management", "Parent menu", "Mobile & Permissions", "Pages & Permissions"]
    if (notDeletable.includes(data)) {
        return false
    }
    return true
}