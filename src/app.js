require('dotenv').config()
const express = require('express');
const path = require("path")
const app = express();
require("./db/connection");
const hbs = require('hbs');
const Signup = require('./models/signup');
const ContactUs = require('./models/contactUs');
const bcrypt = require('bcryptjs');

const hostname = '127.0.0.1';
const port = process.env.PORT || 8000 ;


const static_path = path.join(__dirname,"../public");
const views_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");


app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.set("view engine", "hbs");
app.set("views",views_path);
hbs.registerPartials(partials_path);  


app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/members",(req,res)=>{
    res.render("members");
});

app.get("/register",(req,res)=>{
    res.render("register")
});

app.get("/login",(req,res)=>{
    res.render("login")
});


//Post request at index page
app.post("/", async(req,res)=>{
        try {
            const msg = new ContactUs({
                name : req.body.name,
                email : req.body.email,
                message : req.body.message
            });
            const createMsg = await  msg.save();
            res.status(201).render("index",{
                formErr : "form submitted successfully"
            });
        } catch (err) {
            res.render("index",{
                formErr : "*Fill the Form properly and reload the page"
            });
        }  
    });


// Post request in register page
app.post("/register", async(req,res)=>{
    try {
        const passward = req.body.passward;
        const cpassward = req.body.confirmpassward;
        const ingamename = req.body.ingamename;
        if(passward === cpassward){
            const user = new Signup({
                ingamename : req.body.ingamename,
                passward : req.body.passward,
                confirmpassward : req.body.confirmpassward
            });


            const createUser = await  user.save();
            res.status(201).render("index",{
                Ingamename : ingamename
            });
        }else{
            res.render("register",{
                passerr : "*Passwards are not matching"
            });
        }
    } catch (err) {
        res.status(400).send("Server Error Please Reload The page");
        console.log(err)
    }  
});


//Post request for login page
app.post("/login", async(req,res)=>{
    try {
        const ingamename = req.body.ingamename;
        const passward = req.body.passward;
        console.log(ingamename);
        console.log(passward);

        const loginData = await Signup.findOne({ingamename: ingamename});

        const isMatch = await bcrypt.compare(passward,loginData.passward);

      
        if (isMatch) {
            res.render("index",{
                Ingamename : ingamename
            });
        } else {
            res.render("login",{
                passerr : "*Invalid Email or Passward"
            });
        }


    } catch (error) {
        res.render("login",{
            passerr : "*Invalid Email or Passward"
        });
    }
});



app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})