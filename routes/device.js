const express=require('express');
const router=express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const devices_ctrl=require('../controllers/devices')
//const zip_ctrl=require('../controllers/zip_ctl')
const checkAuth = require('../middleware/user-auth');
const RoleAuth = require('../middleware/roles-auth'); 

//
 //router.get('/',checkAuth,RoleAuth.admin_role,(req,res)=>{
  router.post('/getList',devices_ctrl.get_all_devices)
  //router.post('/getList',checkAuth,RoleAuth.admin_role)      
  router.get("/:id",devices_ctrl.get_device_by_id);
  router.post('/', devices_ctrl.create_device)
  router.patch("/:id",devices_ctrl.patch_device);
  router.delete('/:id',devices_ctrl.delete_device)
  //router.post('/create_zip',zip_ctrl.create_zip)
  
module.exports=router;
