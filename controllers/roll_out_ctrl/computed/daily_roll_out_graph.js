const roll_out = require('../../models/roll_out_db/roll_out')

module.exports.roll_out_distinct_List = (req, res) => {
    roll_out.aggregate([{ $group: { _id: null, current_status: { $addToSet: '$current_status' }, operator: { $addToSet: '$operator' }, priority: { $addToSet: '$priority' } } }],
        function(error, resp) {
            if (resp) {
                res.status(200).json({ results: resp });
            } else { res.status(404).json({}) }
        })

}
module.exports.roll_out_getList = (req, res) => {
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