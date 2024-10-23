const express = require("express");
const { connectDB } = require("./config/database");

const app = express();

connectDB()
  .then(() => {
    console.log("database connection Established...");
    
    app.listen(7777, () => {
      console.log("Server is running perfectly...");
    });
  })
  .catch((err) => {
    console.log("database connection failed");
  });


