const express = require('express');
const router = express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const devices_ctrl = require('../controllers/devices')
    //const zip_ctrl=require('../controllers/zip_ctl')
const checkAuth = require('../middleware/user-auth');
const RoleAuth = require('../middleware/roles-auth');
const PageAuth = require('../middleware/page_auth');
router.post('/getList', devices_ctrl.get_all_devices)
router.get("/:id", devices_ctrl.get_device_by_id);
router.post('/', devices_ctrl.create_device)
router.patch("/:id", devices_ctrl.patch_device);
router.delete('/:id', devices_ctrl.delete_device)

module.exports = router;