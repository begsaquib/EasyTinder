const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

const populateUserInfoArray= [
    "firstName",
    "lastName",
    "gender",
    "about",
    "skill",
  ]
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedinUser._id,
      status: "interested",
    }).populate("fromUserId",populateUserInfoArray);

    res.json({
      messege: "request fetched successfully",
      data: connectionRequests,
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
    }).populate("fromUserId", populateUserInfoArray)
      .populate("toUserId",populateUserInfoArray);

    const data = connectionRequest.map((row) => {
        if(row.fromUserId._id.toString()===loggedinUser._id.toString()){
          return  row.toUserId ;
        }
       return row.fromUserId;
});
      
    res.json({data});
  } catch (err) {
    res.status(400).send("ERROR: " + err.messege);
  }
});
module.exports = userRouter;
