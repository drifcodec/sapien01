const express = require("express");
const router = express.Router();
const role = require("../services/roles");
const tokenAuth = require('../../../middleware/user-auth');
const userAuth = require('../../../middleware/roles-auth');

router.post("/roles_getList_table/", role.getList_table)
router.get("/roles_getList", role.getList)
router.get("/roles_get/:id", role.get)
router.post("/roles_create", role.create)
router.put('/roles_update/:id',tokenAuth, userAuth.isAdmin, userAuth.isAllowed, role.update);
router.delete("/roles_delete/:id",tokenAuth, userAuth.isAdmin, userAuth.isAllowed, role.delete)
module.exports = router;