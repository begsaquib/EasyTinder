const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://saquib:Pyh7Z2pe7IWM2iMz@easytinder.cs5py.mongodb.net/EasyTinder"
  );
};

connectDB()
  .then(() => {
    console.log("database connection established");
  })
  .catch((err) => {
    console.log("database connection failed");
  });

module.exports = {connectDB};
