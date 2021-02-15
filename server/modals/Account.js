const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema({
  name: String,
  email: String,
  mobile: String,
  balance: Number,
  date_of_birth: String,
});

module.exports = mongoose.model("user_accounts", accountSchema);
