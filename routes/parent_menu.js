const express = require('express');
const router = express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const parent_menu_ctrl = require('../controllers/menuAndPages/parent_menu')
const tokenAuth = require('../middleware/user-auth');
const userAuth = require('../middleware/roles-auth');

//
//router.get('/',checkAuth,RoleAuth.isAdmin_role,(req,res)=>{
router.post('/parent_menu_getList_table', parent_menu_ctrl.parent_menu_getList_table)
router.get('/parent_menu_getList', parent_menu_ctrl.parent_menu_getList)
    //router.post('/getList',checkAuth,RoleAuth.isAdmin_role)      
router.get("/:id", parent_menu_ctrl.parent_menu_get);
router.post('/parent_menu_create', tokenAuth, userAuth.isAdmin, userAuth.isAllowed, parent_menu_ctrl.parent_menu_create)
router.put("/:id", tokenAuth, userAuth.isAdmin, userAuth.isAllowed, parent_menu_ctrl.parent_menu_update);
router.delete('/:id', tokenAuth, userAuth.isAdmin, userAuth.isAllowed, parent_menu_ctrl.parent_menu_delete)
    //router.post('/create_zip',zip_ctrl.create_zip)

module.exports = router;