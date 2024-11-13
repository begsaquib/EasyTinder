const express = require("express");
const { userAuth } = require("../middleware/auth");

const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userid",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userid;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "invalid status request",
        });
      }

      const isValidUser = await User.findById(toUserId);
      if (!isValidUser) {
        return res.status(400).json({ messege: "Invalid user!! Don't exist" });
      }

      const existingUser = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingUser) {
        return res.status(400).json({ message: "Request already Exist" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        messege: "Request connection saved successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("ERR04 : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedinUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(404).json({ message: "Status not Valid" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedinUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection Request not found" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.status(200).json({
        messege: "the request is " + status,
        data,
      });
    } catch (err) {
      res.status(400).send("ERR04 : " + err.message);
    }
  }
);

module.exports = requestRouter;
