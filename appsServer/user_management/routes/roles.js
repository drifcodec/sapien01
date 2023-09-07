const express = require("express");
const router = express.Router();
const role = require("../services/roles");
const tokenAuth = require('../../../middleware/user-auth');
const userAuth = require('../../../middleware/roles-auth');

router.post("/role_getList_table/", role.getList_table)
router.get("/role_getList", role.getList)
router.get("/role_get/:id", role.get)
router.post("/role_create", role.create)
//router.put('/user_role_update/:id',tokenAuth, userAuth.isAdmin, userAuth.isAllowed, role.update);
router.put('/role_update/:id', role.update);
//router.delete("/user_role_delete/:id",tokenAuth, userAuth.isAdmin, userAuth.isAllowed, role.delete)
router.delete("/role_delete/:id",role.delete)
module.exports = router;