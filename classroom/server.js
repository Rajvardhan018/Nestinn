const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const session = require('express-session');
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
let sessionoption ={secret : "SECRETWEBSITE" ,
    resave : false ,
    saveUninitialized : true,
}
app.use(session(sessionoption));
app.use(flash());
app.use((req,res,next) => {
    res.locals.success = req.flash("Success");
    res.locals.error = req.flash("error");
    next();
})
app.get("/register",(req,res) => {
    let {name = "Anonymous"} = req.query;
    
    req.session.name = name;
    if(name == "Anonymous"){
        req.flash("error","User Not Registered");
    }
    else{
        req.flash("Success", "You have registered successfully!");
    }
    res.redirect("/hello")
    
})
app.get("/hello",(req,res) => {
    
    res.render("show.ejs", { name: req.session.name});
})
// app.use(cookieparser("secretcode"));
// app.get("/getsignedcookie",(req,res) => {
//     res.cookie("madein","India",{signed : true});
//     res.send("Signed Cookie");
// });
// app.get("/verify" ,(req,res) => {
//     console.log(req.signedCookies);

//     res.send("verify cookie");
    
// })
// app.get("/getcookie",(req,res) => {
//      res.cookie("name","Rajvardhan");
//      res.cookie("greet","Namaste");
//      res.cookie("madaIn","India");
//      res.send("Send your  Cookies");
// });
// app.get("/greet",(req,res) => {
//       let {name = "Anonymous"} = req.cookies;
//       res.send(`Hi , ${name}`);
// })
// app.get("/",(req,res) => {
//     console.dir(req.cookies);
//     res.send("Hey I am a Root");
// })
app.listen(3000,() =>{
    console.log("Server is Connected");
})