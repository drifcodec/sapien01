const express = require('express');
const router = express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const page_access_ctrl = require('../controllers/menuAndPages/page_access')
const tokenAuth = require('../middleware/user-auth');
const userRole = require('../middleware/roles-auth');

//router.post('/getList',checkAuth,RoleAuth.isAdmin_role)     
router.post('/page_access_getList_table', page_access_ctrl.Page_access_getList_table)
router.get('/page_access_getList', page_access_ctrl.Page_access_getList)
router.get('/getMenuList/:id', page_access_ctrl.getMenuList)
router.get("/:id", page_access_ctrl.Page_access_get);
router.post('/page_access_create', userRole.isAdmin, userRole.isAllowed, page_access_ctrl.Page_access_create)
router.put("/:id", userRole.isAdmin, userRole.isAllowed, page_access_ctrl.Page_access_update);
router.delete('/:id', tokenAuth, userRole.isAdmin, userRole.isAllowed, page_access_ctrl.Page_access_delete)

module.exports = router;