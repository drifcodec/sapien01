const express = require('express');
const router = express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const page_access_ctrl = require('../controllers/menuAndPages/page_access')
const checkAuth = require('../middleware/user-auth');
const RoleAuth = require('../middleware/roles-auth');

//router.post('/getList',checkAuth,RoleAuth.admin_role)     
router.post('/page_access_getList_table', page_access_ctrl.Page_access_getList_table)
router.get('/page_access_getList', page_access_ctrl.Page_access_getList)
router.get('/getMenuList/:id', page_access_ctrl.getMenuList)
router.get("/:id", page_access_ctrl.Page_access_get);
router.post('/page_access_create', page_access_ctrl.Page_access_create)
router.put("/:id", page_access_ctrl.Page_access_update);
router.delete('/:id', page_access_ctrl.Page_access_delete) 

module.exports = router;
