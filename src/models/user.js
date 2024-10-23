const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    typeof: String,
  },
  lastName: {
    typeof: String,
  },
  emailId: {
    typeof: String,
  },
  password: {
    typeof: String,
  },
  age: {
    typeof: number,
  },
  gender: {
    typeof: String,
  },
});

module.exports = mongoose.model("user", userSchema);
