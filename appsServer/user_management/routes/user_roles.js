const express = require("express");
const router = express.Router();
const role = require("../services/user_roles")
const tokenAuth = require('../../../middleware/user-auth');
const userAuth = require('../../../middleware/roles-auth');

router.post("/user_role_create", role.create)
//srouter.put('/user_role_update/:id', role.update);
router.post("/user_role_getList_table/", role.getList_table)
router.get("/user_role_getList", role.getList)
router.get("/user_role_get/:id", role.get)
//router.put('/user_role_update/:id',tokenAuth, userAuth.isAdmin, userAuth.isAllowed, role.update);
//router.delete("/user_role_delete/:id",tokenAuth, userAuth.isAdmin, userAuth.isAllowed, role.delete)
router.delete("/user_role_delete/:id",role.delete)
module.exports = router;