const express = require("express");
const router = express.Router();
const role = require("../services/roles");
const tokenAuth = require('../../../middleware/user-auth');
const userAuth = require('../../../middleware/roles-auth');

router.post("/getList_table/", role.getList_table)
router.get("/getList", role.getList)
router.get("/get/:id", role.get)
router.post("/create", role.create)
router.put('/update/:id',tokenAuth, userAuth.isAdmin, userAuth.isAllowed, role.update);
router.delete("/delete/:id",tokenAuth, userAuth.isAdmin, userAuth.isAllowed, role.delete)
module.exports = router;