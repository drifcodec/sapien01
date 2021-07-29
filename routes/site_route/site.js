const express = require('express');
const router = express.Router(); // this creates the router needed to handle http function(get,post,path,delete)
const site_ctrl = require('../../controllers/sites/all_sites')
const region_ctrl = require('../../controllers/sites/region')
const site_type_ctrl = require('../../controllers/sites/site_type')
const map_site_ctrl = require('../../controllers/sites/map_sites')
const sysAuth = require('../../middleware/user-auth');
const userAuth = require('../../middleware/roles-auth');

//Site
//router.post('/getList',checkAuth,RoleAuth.admin_role)   
router.get('/site_getList', site_ctrl.site_getList)
router.post('/getList_table', site_ctrl.site_getList_table)
router.get("/site_get/:id", site_ctrl.site_get);
router.post('/site_create', site_ctrl.site_create)
router.patch("/:id", site_ctrl.site_update);
router.delete('/:id', site_ctrl.site_delete)
    //Region Type
router.post('/region_create', region_ctrl.region_create)
router.get("/region_get/:id", region_ctrl.region_get);
router.get('/region_getList', region_ctrl.region_getList)
router.post('/region_getList_table', region_ctrl.region_getList_table)
router.patch("/region_update/:id", region_ctrl.region_update);
router.delete('/region_delete/:id', region_ctrl.region_delete)
    //Site Type
router.post('/site_type_create', site_type_ctrl.site_type_create)
router.get("/site_type_get/:id", site_type_ctrl.site_type_get);
router.get('/site_type_getList', site_type_ctrl.site_type_getList)
router.post('/site_type_getList_table', site_type_ctrl.site_type_getList_table)
router.patch("site_type_update/:id", site_type_ctrl.site_type_update);
router.delete('site_type_delete/:id', site_type_ctrl.site_type_delete)
    //map site
router.post('/map_site_create', map_site_ctrl.map_site_create)
router.get("/map_site_get/:id", map_site_ctrl.map_site_get);
router.post('/map_site_getList_table', map_site_ctrl.map_site_getList_table)
router.patch("/map_site_update/:id", sysAuth, map_site_ctrl.map_site_update);
router.get('/map_site_getList', sysAuth, userAuth.Allowed, map_site_ctrl.map_site_getList)
router.delete('/map_site_delete/:id', sysAuth, map_site_ctrl.map_site_delete)

module.exports = router;