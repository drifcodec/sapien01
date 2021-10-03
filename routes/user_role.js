const express = require("express");
const router = express.Router();
const user_role = require("../controllers/user_role/user_role");
const tokenAuth = require('../middleware/user-auth');
const userAuth = require('../middleware/roles-auth');

router.post("/user_role_getList_table/", user_role.user_role_getList_table)
router.get("/user_role_getList", user_role.user_role_getList)
router.get("/user_role_get/:id", user_role.user_role_get)
router.post("/user_role_create", tokenAuth,userAuth.isAdmin, userAuth.isAllowed, user_role.user_role_create)
router.put('/user_role_update/:id',tokenAuth, userAuth.isAdmin, userAuth.isAllowed, user_role.user_role_update);
router.delete("/user_role_delete/:id",tokenAuth, userAuth.isAdmin, userAuth.isAllowed, user_role.user_role_delete)
module.exports = router;