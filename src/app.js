const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

//API to save a user
app.post("/signup", async (req, res) => {
  //   // Below I created a new instance of the user Model
  const user = new User(req.body);
  try {
    // Save the user to the database
    await user.save();
    res.status(200).send("Data saved successfully");
  } catch (error) {
    console.error("Error saving user: ", error);
    res.status(500).send("Error saving data");
  }
});

//API to get a user from the database with its emailid
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail }); // there is one more fumction that is findone()  it gets back the first document which matches
    res.send(user);
  } catch {
    res.status(400).send("Something went wrong");
  }
});

//API to get the feed that is all the users in the database
app.get("/feed", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({});
    res.send(user);
  } catch {
    res.status(400).send("Something went wrong");
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
