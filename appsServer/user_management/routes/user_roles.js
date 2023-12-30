const express = require("express");
const router = express.Router();
const user_role = require("../services/user_role");
const tokenAuth = require('../../../middleware/user-auth');
const userAuth = require('../../../middleware/roles-auth');
router.post("/user_roles_create",tokenAuth, userAuth.isAdmin, userAuth.isAllowed, user_role.create)
router.get("/user_roles_getList/",user_role.getList);
router.post("/user_roles_getList_table/",user_role.getList_table);
router.delete("/user_roles_get/:id", tokenAuth, userAuth.isAdmin, userAuth.isAllowed,user_role.delete);
router.put("/user_roles_update/:id", tokenAuth, userAuth.isAdmin, userAuth.isAllowed, user_role.update);
module.exports = router;