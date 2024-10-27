const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 32,
  },
  lastName: {
    type: String,
    maxlength: 32,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["Male", "Female", "Others"].includes(value)) {
        throw new Error("Gender is not valid");
      }
    },
  },
  skill: {
    type: [String],
  },
  photoUrl: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
  },
  about: {
    type: String,
    default: "This is default description of the user",
  },
});

module.exports = mongoose.model("User", userSchema);
