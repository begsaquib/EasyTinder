const express=require("express")
const {userAuth}=require("../middleware/auth")
const requestRouter=express.Router()


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
      const { firstName } = req.user;
  
      res.send(firstName + "wants to send a friend request");
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  });

module.exports=requestRouter