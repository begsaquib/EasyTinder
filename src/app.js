const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    res.send({ name:"Saquib",lastname:"Beg"})
})
app.post("/user",(req,res)=>{
    res.send("Data Succesfully saved")
})
app.delete("/user",(req,res)=>{
    res.send("Data Succesfully Deleted")
})

//ORDER OF THE ROUTES MATTER A LOT!!!!
app.use("/test", (req,res) => {
  res.send("only test");
});

app.listen(7777, () => {
  console.log("Server is running perfectly");
});
