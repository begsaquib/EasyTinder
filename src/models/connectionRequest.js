const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "declined"],
        message: `{VALUES} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });//this will make my db work more efficiently although i have huge db,,this is "Compound Index"

connectionRequestSchema.pre("save", function (next) {
  const ConnectionRequest = this;
  if (ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)) {
    throw new Error("Cannot send request to yourself");
  }
  next();
});

module.exports = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
