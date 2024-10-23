const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://saquib_beg:ECQkKibPIH2FFvQK@nodetut001.vpkm5.mongodb.net/EasyTinder"
  );
};

connectDB()
  .then(() => {
    console.log("database connection established");
  })
  .catch((err) => {
    console.log("database connection failed");
  });

  module.exports={
    connectDB
  }
