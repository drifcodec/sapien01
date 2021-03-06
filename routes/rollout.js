const express = require("express");
const router = express.Router();
const roll_out = require("../controllers/roll_out_ctrl/roll_out");
const category = require("../controllers/roll_out_ctrl/category");
const sub_category = require("../controllers/roll_out_ctrl/sub_category");
const tokenAuth = require('../middleware/user-auth');
const userAuth = require('../middleware/roles-auth');

//roll out
router.post("/roll_out_create", roll_out.roll_out_create)
router.get("/roll_out_get/:id", roll_out.roll_out_get)
router.get("/roll_out_distinct_List", roll_out.roll_out_distinct_List)
router.get("/roll_out_getList", roll_out.roll_out_getList)
router.get("/roll_out_getList_operator", roll_out.roll_out_getList_operator)
router.post("/roll_out_getList_table",tokenAuth,userAuth.isAllowed,roll_out.roll_out_getList_table)
router.patch('/roll_out_update/:id', roll_out.roll_out_update);
router.delete("/roll_out_delete/:id", roll_out.roll_out_delete)

//category
router.post("/category_create", category.category_create)
router.get("/category_get/:id", category.category_get)
router.post("/category_getList", category.category_getList)
router.post("/category_getList_table", category.category_getList_table)
router.patch('/category_update/:id', category.category_update);
router.delete("/category_delete/:id", category.category_delete)

//sub_category
router.post("/sub_category_create", sub_category.sub_category_create)
router.get("/sub_category_get/:id", sub_category.sub_category_get)
router.post("/sub_category_getList", sub_category.sub_category_getList)
router.post("/sub_category_getList_table", sub_category.sub_category_getList_table)
router.patch('/sub_category_update/:id', sub_category.sub_category_update);
router.delete("/sub_category_delete/:id", sub_category.sub_category_delete)
module.exports = router;