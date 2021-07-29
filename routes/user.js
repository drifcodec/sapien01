   const express = require("express");
   const router = express.Router();
   const User_ctrl = require("../controllers/users/users");
   const RoleAuth = require('../middleware/roles-auth');
   router.post("/signup", User_ctrl.signup)
   router.post('/signup_confirmation_email/:token', User_ctrl.signup_confirmation_email)
   router.post('/change_password_email/:token', User_ctrl.change_password_email);
   router.get("/user_getList/", User_ctrl.user_getList);
   router.post("/user_getList_table/", User_ctrl.user_getList_t);
   router.post("/login", User_ctrl.login);
   router.get("/user_get/:id", User_ctrl.user_get);
   router.get('/forgotPass/:user_id', User_ctrl.forgot_password)
   router.get('/ResetPass/:Token', User_ctrl.reset_password);
   router.delete("/user_delete/:id", RoleAuth.AdminAuth, User_ctrl.delete);
   router.put("/user_update/:id", RoleAuth.AdminAuth, User_ctrl.user_update);

   module.exports = router;