const express = require("express");

const app = express();

app.get(
  "/user",
  (req, res, next) => {
    console.log("logges 1");

    res.send("response 1");
    next();
  },
  (req, res, next) => {
    console.log("logges 2");
   // res.send("response 2");
    next();
  },
  (req, res, next) => {
    console.log("logges 3");
   // res.send("response 3");
    //next();
  }
);

app.listen(7777, () => {
  console.log("Server is running perfectly");
});
