const express=require('express');
const router=express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const page_auth=require('../middleware/page_auth')
router.get('/get_user_auth',page_auth)
module.exports=router;
