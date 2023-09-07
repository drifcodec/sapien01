const express = require('express');
const router = express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const vandalism_ctrl = require('../controllers/vandalism')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/user-auth');
const RoleAuth = require('../middleware/roles-auth');
const multer = require('multer');
var vandalism_upload = multer({ dest: 'uploads/vandalism' })


//router.get('/',checkAuth,RoleAuth.admin_role,(req,res)=>{
//router.post('/',upload.single ('files'),vandalism_ctrl.create_vandalism)
router.post('/', vandalism_upload.array('photos', 10), vandalism_ctrl.create_vandalism)
router.get('/byuser', vandalism_ctrl.get_all_vandalism_by_user)
router.get('/', vandalism_ctrl.get_all_vandalism)
    /*
      router.patch("/:id",vandalism_ctrl.patch_device);
      router.delete('/:id',vandalism_ctrl.delete_device);
      router.get('/',checkAuth,RoleAuth.admin_role,vandalism_ctrl.get_all_devices)      
      router.get("/:id",checkAuth,vandalism_ctrl.get_device_by_id);*/




module.exports = router;