const express = require('express');
const router = express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const notification_ctrl = require('../../controllers/notification/notification')
const checkAuth = require('../../middleware/user-auth');
const RoleAuth = require('../../middleware/roles-auth');

//
//router.get('/',checkAuth,RoleAuth.admin_role,(req,res)=>{
// 

router.post('/notification_create', notification_ctrl.notification_create) 
router.get('/notification_get/:id', notification_ctrl.notification_get)  
router.get('/notification_getList', notification_ctrl.notification_getList)
router.get('/notification_getListByUser', notification_ctrl.notification_getListByUser)
router.post('/notification_getList_table', notification_ctrl.notification_getList_table) 
router.post('/notification_getList_tableByUser', notification_ctrl.notification_getList_tableByUser) 
/* 
//router.post('/getList',checkAuth,RoleAuth.admin_role)      
router.get("/:id",notification_ctrl.site_get);
router.post('/site_create', notification_ctrl.site_create)
router.patch("/:id",notification_ctrl.site_update);
router.delete('/:id',notification_ctrl.site_delete) */

module.exports = router;
