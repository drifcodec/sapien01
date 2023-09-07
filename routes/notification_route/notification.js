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
router.get('/notification_getList_pending', notification_ctrl.notification_getList_pending) 
router.put('/notification_update/:id', notification_ctrl.notification_update)  
router.get('/notification_getList', notification_ctrl.notification_getList)
router.get('/notification_getListByUser', notification_ctrl.notification_getListByUser)
router.post('/notification_getList_table', notification_ctrl.notification_getList_table) 
router.post('/notification_getList_tableByUser', notification_ctrl.notification_getList_tableByUser) 
router.post('/my_notification_getList_table', notification_ctrl.my_notification_getList_table) 


module.exports = router;
