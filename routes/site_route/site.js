const express=require('express');
const router=express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const site_ctrl=require('../../controllers/all_sites/sites')
const checkAuth = require('../../middleware/user-auth');
const RoleAuth = require('../../middleware/roles-auth'); 

//
 //router.get('/',checkAuth,RoleAuth.admin_role,(req,res)=>{
  router.get('/site_getList',site_ctrl.site_getList)
  router.post('/getList_table',site_ctrl.site_getList_table)
  //router.post('/getList',checkAuth,RoleAuth.admin_role)      
  router.get("/:id",site_ctrl.site_get);
  router.post('/site_create', site_ctrl.site_create)
  router.patch("/:id",site_ctrl.site_update);
  router.delete('/:id',site_ctrl.site_delete)
  
module.exports=router;
