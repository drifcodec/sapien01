
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const email_server = require("../../../emails/user_confirmation_email");
const reset_email = require("../../../emails/user_forgotPass");
const { resolve } = require("path");

exports.user_getList = (req, res) => {
  start = req.body.start == undefined ? 0 : req.body.start;
  limit = req.body.limit == undefined ? 1000 : req.body.limit;
  User.find(req.body)
    .select("-password")
    .skip(start)
    .limit(limit)
    .exec()
    .then((result) => {
      //console.log(result)
      res.status(200).json({
        total: result.length,
        results: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
exports.user_getList_t = (req, res) => {
  var searchStr = req.body;
  var order = "";
  var dir =
    searchStr.order[0].dir === "asc"
      ? 1
      : searchStr.order[0].dir === "desc"
        ? -1
        : "";
  var drop_down_select = {};
  for (i = 0; i < searchStr.columns.length; i++) {
    var field = searchStr.columns[i].data;
    var seach_value = searchStr.columns[i].search.value;
    if (seach_value) {
      drop_down_select[field] = seach_value;
    }
    if (i == searchStr.order[0].column) {
      order = searchStr.columns[i].data;
    }
  }
  if (req.body.search.value) {
    var regex = new RegExp(req.body.search.value, "i");
    //searchStr = { $or: [{ 'operator': regex }, { 'current_status': regex }] };
  } else {
    searchStr = {};
  }
  var draw = req.body.draw;
  start = req.body.start == undefined ? 0 : req.body.start;
  limit = req.body.length == undefined ? 1000 : req.body.length;
  var recordsTotal = 0;
  User.countDocuments({}, function (err, total) {
    recordsTotal = total;
    User.countDocuments(drop_down_select, function (err, total_searched) {
      recordsFiltered = total_searched;

      //User.find(searchStr, '_id operator current_status') if i only want to return speficif fileds
      //User.find(searchStr) for globale search
      User.find(drop_down_select)
        .select("-password")
        .skip(Number(start))
        .limit(Number(limit))
        .sort({
          [order]: dir,
        })
        .exec()
        .then((results) => {
          if (results) {
            var data = {
              draw: draw,
              recordsFiltered: recordsFiltered,
              recordsTotal: recordsTotal,
              data: results,
            };
            res.status(200).json(data);
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });
  });
};

exports.user_get = (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          result: {
            id: result._id,
            roles: result.roles,
            user_id: result.user_id,
            name: result.name,
            surname: result.surname,
            phone: result.phone,
            email: result.email,
          },
        });
      } else {
        res.status(401).json({
          message: "User doesnt Exist",
        });
      }
    })
    .catch((err) => {
      res.status(401).json({
        message: "Error proccesing",
      });
    });
};
exports.user_update = (req, res) => {
  const id = req.params.id;
  var data = {};
  if (req.body.phone) {
    data.phone = req.body.phone;
  }
  if (req.body.email) {
    data.email = req.body.email;
  }
  if (req.body.user_status) {
    data.user_status = req.body.user_status;
  }
  if (req.body.valid_from) {
    data.valid_from = req.body.valid_from;
  }
  if (req.body.expire_from) {
    data.expire_from = req.body.expire_from;
  }
  if (req.body.name) {
    data.name = req.body.name;
  }
  if (req.body.surname) {
    data.surname = req.body.surname;
  }
  if (req.body.roles) {
    data.roles = req.body.roles;
  }
  User.update({ _id: id }, { $set: data }, { new: true, upsert: true })
    .exec()
    .then((result) => {
      if (result.nModified) {
        res.status(200).json({
          "Messaage": "yes " + result.nModified,
          "fileds updated ": req.body,
        });
      } else {
        res.status(400).json({
          "update_status": "No" + result.nModified,
          "fileds failed to update": req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.signup = (req, res) => {
  var default_password = ""//req.body.password//"CGOS123";
  //{ $or: [{ user_id: req.body.user_id }, { email: req.body.email }] })
  console.log("----------- email 1-----+");
  User.find({ user_id: req.body.user_id })
    .exec()
    .then((result) => {
      if (result.length >= 1) {
        return res.status(409).json({
          message: "User exists",
        });
      } else {
        console.log("----------- email 2-----+");
        bcrypt.hash(default_password, 10, (err, hash) => {
          console.log("----------- email 2-----+");
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            console.log("----------- email 3-----+");
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              user_id: req.body.user_id, //+"_"+(new Date()).getTime().toString(36),
              name: req.body.name,
              surname: req.body.surname,
              phone: req.body.phone,
              email: req.body.email,
              roles: req.body.roles ? req.body.roles : ["guest"],
              valid_from: req.body.valid_from,
              expire_from: req.body.expire_from,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                const token = jwt.sign(
                  {
                    _id: result._id,
                    user_id: result.user_id,
                    email: result.email,
                  },
                  "secret",
                  { expiresIn: "7d" }
                );

                email_server
                  .signup_confirmation_email(
                    result.email,
                    result.user_id,
                    token
                  )
                  .catch(console.error);

                res.status(201).json({
                  message: "User created please confirm email",
                });
              })
              .catch((err) => {
                if (err.code == 11000) {
                  res.json({
                    error: "user name or email have been taken",
                  });
                }
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};
exports.signup_confirmation_email = (req, res) => {
  var verification_token = req.params.token;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;
  var valid_pass = password.match(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (verification_token && valid_pass && password === confirm_password) {
    var token_get = jwt.verify(verification_token, "secret");
    var _id = token_get._id;
    bcrypt.hash(password, 10, (err, hash) => {
      User.updateOne(
        { _id },
        { $set: { user_status: "Active", password: hash } }
      )
        .exec()
        .then((result) => {
          res.status(200).json({
            message: "confirmation was succeessful / please LOGIN on System",
          });
        })
        .catch((err) => {
          res.status(401).json({
            message: "Date expired",
          });
        });
    });
  } else {
    res.status(401).json({
      message: " Error couldnt update !",
    });
  }
};
exports.change_password_email = async (req, res) => {
  var verification_token = req.params.token;
  var old_password = req.body.old_password;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;
  var token_get = jwt.verify(verification_token, "secret");
  var id = token_get.id;
  var valid_pass = password.match(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const isPassWord = await User.findById({ _id: id })
    .exec()
    .then((user) => {
      bcrypt.compare(old_password, user.password, async (err, result) => {
        if (
          result &&
          valid_pass &&
          verification_token &&
          password === confirm_password
        ) {
          var hashed_pass = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
              if (err) {
                reject(err);
              }
              resolve(hash);
            });
          });
          User.updateOne(
            { _id: id },
            { $set: { password: hashed_pass } },
            { new: true, upsert: true }
          )
            .exec()
            .then((result) => {
              res.status(200).json({
                message: "Password was successful updated",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        } else {
          res.status(401).json({
            message: " Error couldnt update !",
          });
        }
      });
    })
    .catch((err) => {
      reject(true);
      res.status(500).json({
        error: err,
      });
    });
};
exports.forgot_password = (req, res) => {
  User.findOne({ user_id: req.params.user_id })
    .exec()
    .then((result) => {
      if (result) {
        const token = jwt.sign(
          { _id: result._id, user_id: result.user_id, email: result.email },
          "secret",
          { expiresIn: "1h" }
        );
        reset_email
          .user_reset_password_email(result.email, token)
          .catch(console.error);

        res.status(200).json({
          message: "Please check ur Email to reset your password",
        });
      } else {
        res.status(401).json({
          message: "User doesnt Exist",
        });
      }
    })
    .catch((err) => {
      res.status(401).json({
        message: "Error proccesing",
      });
    });
};
exports.login = (req, res, next) => {
  if (req.body.user_id && req.body.password) {
    User.findOne({ user_id: req.body.user_id }).exec().then((user) => {
      var status = user.user_status;
      if (user.length < 1) {
        return res.status(401).json({ result: "user not found" });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
              userId: user._id,
              user_id: user.user_id,
              user_role: user.role,
            }, "secret", { expiresIn: req.body.source === "Mobile" ? "365d" : "1d" }
          );
          if (status == "Active") {
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              data: {
                id: user._id,
                role: user.role,
                user_id: user.user_id,
              },
            });
          } else if (status == "Pending") {
            res.status(401).json({
              message: "Login Pending for Approval by User",
            });
          } else if (status == "Frozen") {
            res.status(401).json({
              message: "Your Accunt have been frozen please contact Admin",
            });
          } else {
            res.status(401).json({
              message: "unexpected error, login failed Contact Admin",
            });
          }
        } else {
          res.status(401).json({
            message: "Wrong Password .",
          });
        }
      });
    })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    res.status(401).json({
      message: "ensure both username and password is filled",
    });
  }
};
exports.reset_password = (req, res) => {
  var token = req.params.Token;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    try {
      var password = hash;
      var token_get = jwt.verify(token, "secret");
      var _id = token_get._id;
      if (_id) {
        User.update({ _id }, { $set: { password } })
          .exec()
          .then((result) => {
            res.status(200).json({
              message:
                "Password reset was successful. Please log in with new password",
            });
          })
          .catch((err) => {
            res.status(401).json({
              message: "Date expired",
            });
          });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Auth failed error 401 exp token",
      });
    }
  });
};
exports.delete = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "User not found",
      });
    });
};
