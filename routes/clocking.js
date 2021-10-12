const express = require("express");
const router = express.Router();
const clocking = require("../controllers/clockings/clocking");
const tokenAuth = require('../middleware/user-auth');
const userAuth = require('../middleware/roles-auth');

router.post("/clocking_getList_table/", clocking.clocking_getList_table)
router.post("/my_clocking_getList_table/", clocking.my_clocking_getList_table)
router.get("/clocking_getList", clocking.clocking_getList)
router.get("/clocking_get/:id", clocking.clocking_get) 
router.get("/clocking_today_checker", clocking.clocking_today_checker)
router.post("/clocking_create", tokenAuth , userAuth.isAllowed, clocking.clocking_create)
router.put('/clocking_update/:id',tokenAuth, userAuth.isAdmin, userAuth.isAllowed, clocking.clocking_update);
router.delete("/clocking_delete/:id",tokenAuth, userAuth.isAdmin, userAuth.isAllowed, clocking.clocking_delete)
module.exports = router;