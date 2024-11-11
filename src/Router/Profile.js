const express = require("express");
const { userAuth } = require("../middleware/auth");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { validatingPatchData } = require("../utils/Validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    console.log(validatingPatchData(req));

    if (!validatingPatchData(req)) {
      throw new Error("Invalid Updation");
    }
    const loggedinUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedinUser[key] = req.body[key]));

    loggedinUser.save();
    res.json({
      messege: `${loggedinUser.firstName}, data has been updated succesfully!!`,
      data: loggedinUser,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = req.user;
    const isPasswordValid = await user.validatePassword(oldPassword);

    if (!isPasswordValid) {
      throw new Error("Wrong Password");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Enter a strong password :" + newPassword);
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    user.password = newPasswordHash;

    await user.save();

    res.send("password changed successfully");
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

module.exports = profileRouter;
