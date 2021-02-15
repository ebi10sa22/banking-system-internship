const mongoose = require("mongoose");
const { Schema } = mongoose;

const transcation = new Schema({
  date: Object,
  sender_name: String,
  sender_account: String,
  amt_sent: Number,
  sender_balance: Number,
  reciver_name: String,
  reciver_account: String,
  amt_recived: Number,
  reciver_balance: Number,
});

module.exports = mongoose.model("histories", transcation);
