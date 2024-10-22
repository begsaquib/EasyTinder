const express = require("express");
const { auth } = require("./middleware/auth");

const app = express();

app.use("/admin",auth)

app.get("/user",auth,(req,res)=>{
  res.send("user data send")
})

app.get("/admin/getdata",(req,res,next)=>{
  res.send("authorised user data recieved")
  
})
app.get("/admin/deletedata",(req,res)=>{
  res.send("authorised user data is deleted")
})

app.listen(7777, () => {
  console.log("Server is running perfectly");
});
