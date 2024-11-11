const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { validatingSignUpData } = require("../utils/Validation");

const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
  try {
    validatingSignUpData(req);
    const { firstName, lastName, password, emailId } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.status(200).send("Data saved successfully");
  } catch (err) {
    res.status(400).send("ERR04 : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email");
    }
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credential");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      res.send("loggedin succesfully");
    } else {
      throw new Error("Invalid credential");
    }
  } catch (err) {
    res.status(400).send("ERR04 : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("logged out !!!");
});

module.exports = authRouter;
