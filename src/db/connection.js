require('dotenv').config()
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Connection is successful");
}).catch((e)=>{
    console.log(e);
    // console.log("error");

})