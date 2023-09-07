const express = require('express');
const router = express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const mobile_access_ctrl = require('../controllers/menuAndPages/mobile_access')
const sysAuth = require('../middleware/user-auth');
const userAuth = require('../middleware/roles-auth');

//router.post('/getList',checkAuth,RoleAuth.admin_role)     
router.post('/mobile_access_getList_table', mobile_access_ctrl.Mobile_access_getList_table)
router.get('/mobile_access_getList', mobile_access_ctrl.Mobile_access_getList)
    //router.get('/getMenuList/:id', mobile_access_ctrl.getMenuList)
router.get("/:id", mobile_access_ctrl.Mobile_access_get);
router.post('/mobile_access_create', mobile_access_ctrl.Mobile_access_create)
router.put("/:id", mobile_access_ctrl.Mobile_access_update);
router.delete('/:id', mobile_access_ctrl.Mobile_access_delete)

module.exports = router;