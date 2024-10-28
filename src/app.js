const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

//API to save a user
app.post("/signup", async (req, res) => {
  const data = req.body;
  //   // Below I created a new instance of the user Model
  const user = new User(req.body);
  try {
    if(data?.skill){
      if (data?.skill.length > 10) {
        throw new Error("Skills cant be more than 10");
      }
    }
    // Save the user to the database
    await user.save();
    res.status(200).send("Data saved successfully");
  } catch (err) {
    res.status(400).send("Error saving data: " + err.message);
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

//API to get a user by its id provided by the mongoose itself
app.get("/findingById", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findById(userId); // there is one more fumction that is findone()  it gets back the first document which matches
    res.send(user);
  } catch {
    res.status(400).send("Something went wrong");
  }
});

//API to get the feed that is all the users in the database
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch {
    res.status(400).send("Something went wrong");
  }
});

//API to get a user by its id and then delete it
app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    console.log(userId);

    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted succesfully");
  } catch {
    res.status(400).send("Something went wrong");
  }
});

//API to get a user by its id and then update according to the user
app.patch("/user/:userId", async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;

  try {
    const Allow_Update = [
      "userId",
      "age",
      "skill",
      "about",
      "password",
      "gender",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      Allow_Update.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update is not possible");
    }
    if(data?.skill){
    if (data?.skill.length > 10) {
      throw new Error("Skills cant be more than 10");
    }
  }

    await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User Updated succesfully");
  } catch (err) {
    res.status(400).send("Update Failed: " + err.message);
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
