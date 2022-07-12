const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/4_Snisters_Officials").then(()=>{
    console.log("Connection is successful");
}).catch((e)=>{
    console.log(e);
})