const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const populateUserInfoArray = [
  "firstName",
  "lastName",
  "gender",
  "about",
  "skill",
];
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedinUser._id,
      status: "interested",
    }).populate("fromUserId", populateUserInfoArray);

    const data = connectionRequests.map((request) => request.fromUserId);

    res.json({
      messege: "request fetched successfully",
      data,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.messege);
  }
});

userRouter.get("/get/connections", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedinUser, status: "accepted" },
        { fromUserId: loggedinUser, status: "accepted" },
      ],
    })
      .populate("fromUserId", populateUserInfoArray)
      .populate("toUserId", populateUserInfoArray);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedinUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.messege);
  }
});

userRouter.get("/get/feed", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const page = parseInt(req.query.page) || 1;

    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    console.log(limit);
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedinUser }, { toUserId: loggedinUser }],
    }).select("fromUserId toUserId");

    const hiddenUsers = new Set();
    connectionRequests.forEach((req) => {
      hiddenUsers.add(req.fromUserId.toString());
      hiddenUsers.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenUsers) } },
        { _id: { $ne: loggedinUser._id } },
      ],
    })
      .select(populateUserInfoArray)
      .skip(skip)
      .limit(limit);

    res.send({ users });
  } catch (err) {
    res.status(400).json({ messege: err.messege });
  }
});
module.exports = userRouter;
