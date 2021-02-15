const mongoose = require("mongoose");
const keys = require("../config/config");

mongoose
  .connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("-~-~-~Database connected-~-~-~"))
  .catch((err) => console.error(err));

const db = mongoose.connection;

module.exports = db;
