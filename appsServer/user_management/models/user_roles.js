const mongoose = require('mongoose');

const user_role_Schema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      create_time: { type: Date },
      role_name: {type: String, required: true,  index: true},
      account_id: { type: String, required: true }
});

<<<<<<< HEAD
user_role_Schema.index({ "role_name": 1, "account_id": 1}, { "unique": true });

=======
>>>>>>> 0568fd7f1b1f4778a62e07092bc649d2b0db9028
module.exports = mongoose.model('user_role',user_role_Schema);