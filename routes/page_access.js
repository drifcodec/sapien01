const express = require('express');
const router = express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const page_access_ctrl = require('../controllers/menuAndPages/page_access')
const sysAuth = require('../middleware/user-auth');
const userAuth = require('../middleware/roles-auth');

//router.post('/getList',checkAuth,RoleAuth.admin_role)     
router.post('/page_access_getList_table', page_access_ctrl.Page_access_getList_table)
router.get('/page_access_getList', page_access_ctrl.Page_access_getList)
router.get('/getMenuList/:id', page_access_ctrl.getMenuList)
router.get("/:id", page_access_ctrl.Page_access_get);
router.post('/page_access_create', userAuth.Admin, userAuth.Allowed, page_access_ctrl.Page_access_create)
router.put("/:id", userAuth.Admin, userAuth.Allowed, page_access_ctrl.Page_access_update);
router.delete('/:id', sysAuth, userAuth.Admin, userAuth.Allowed, page_access_ctrl.Page_access_delete)

module.exports = router;