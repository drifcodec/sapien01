const express = require("express");
const router = express.Router();
const roll_out = require("../controllers/roll_out_ctrl/roll_out");
router.post("/roll_out_create",roll_out.roll_out_create)
router.get("/roll_out_get/:id",roll_out.roll_out_get)
router.get("/roll_out_distinct_List",roll_out.roll_out_distinct_List)
router.post("/roll_out_getList",roll_out.roll_out_getList)
router.patch('/roll_out_update/:id',roll_out.roll_out_update);
router.delete("/roll_out_delete/:id",roll_out.roll_out_delete)
module.exports = router;  