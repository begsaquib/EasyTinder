const express = require("express");

const app = express();


app.use("/test", (req,res) => {
  res.send("only test");
});
app.use("/home", (req,res) => {
  res.send("only home page");
});
app.use("/", (req, res) => {
    res.send("only slash"); 
  });
app.listen(7777, () => {
  console.log("Server is running perfectly");
});
