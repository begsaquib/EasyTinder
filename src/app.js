const express = require("express");
const  {connectDB}  = require("./config/database");
const user = require("./models/user");
const app = express();
// const User = require("./models/user");

app.post("/signup", async(req, res) => {
  const User = new user({
    firstName: "Tufel",
    lastName: "Beg",
    emailId: "Tufel@gmail.com",
    password: "Tufel@123",
  });
  try {
    // Save the user to the database
    await User.save();
    res.status(200).send("Data saved successfully");
  } catch (error) {
    console.error("Error saving user: ", error);
    res.status(500).send("Error saving data");
  }
});


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
