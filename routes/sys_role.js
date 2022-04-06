const express = require("express");
const router = express.Router();
const role = require("../controllers/users/roles");
const tokenAuth = require('../middleware/user-auth');
const userAuth = require('../middleware/roles-auth');

router.post("/sys_role_getList_table/", role.getList_table)
router.get("/sys_role_getList", role.getList)
router.get("/sys_role_get/:id", role.get)
router.post("/sys_role_create", role.create)
router.put('/sys_role_update/:id',tokenAuth, userAuth.isAdmin, userAuth.isAllowed, role.update);
router.delete("/sys_role_delete/:id",tokenAuth, userAuth.isAdmin, userAuth.isAllowed, role.delete)
module.exports = router;