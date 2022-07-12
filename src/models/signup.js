const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const signupSchema = new mongoose.Schema({

    ingamename : {
        type : String,
        required : true
    },
    passward : {
        type : String,
        required : true
    },

    confirmpassward : {
        type : String
    },
    tokens:[{
        token:{
            type : String,
            required : true
        }
    }]
});


//middleware passward hashing
signupSchema.pre("save", async function(next){

    if(this.isModified("passward")){
    this.passward = await bcrypt.hash(this.passward, 10);
    this.confirmpassward = undefined;
    }
next();
});


const Signup = new mongoose.model("Signup",signupSchema);

module.exports = Signup;