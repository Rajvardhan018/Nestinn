if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
  
}


const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const  engine = require('ejs-mate');
const Expresserror = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listing.js")
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const User = require("./Models/user.js")
// const Transaction = require('../Models/Transaction.js');
const transactionRouter = require("./routes/transaction");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.engine("ejs",engine);
app.use(express.static(path.join(__dirname,"public")))
const dburl = "mongodb+srv://Rajvardhan18:Rajvardhan20@cluster0.un2cti1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

main().then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(`Error : ${err}`);
});
const store = MongoStore.create({
  mongoUrl: dburl,
  crypto : {
   secret: "SECRETWEBSITE"
  },
  touchAfter : 24*60*60
})
store.on("error",()=>{
  console.log("Error in MONGOSTORE",)
})
let sessionoption ={
  store,
  secret : "SECRETWEBSITE" ,
  resave : false ,
  saveUninitialized : true,
  cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxage :  7*24*60*60*1000,
        httpOnly : true,
  }
}

app.use(session(sessionoption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function main() {
    await mongoose.connect(dburl);
  
    
  };
  app.use((req,res,next) => {
     res.locals.success = req.flash("success");
     res.locals.error = req.flash("error");
     res.locals.currUser = req.user;
     next();
  })
  
//   app.get("/",(req,res) => {
//     res.send("Welcome to Our Project");
// });
  
//  app.get("/demouser",async(req,res) => {
//   let fakeuser = new User ({
//     email : "Student@gmail",
//     username : "REG@33"
//   })
//   let registeruser = await User.register(fakeuser, "Pass234444");
//   res.send(registeruser)
//  })   

  app.use("/listings",listingsRouter);   
  app.use("/listings/:id/reviews",reviewsRouter);
 
  app.use("/",userRouter);
  app.use("/listings", transactionRouter);

  
 
  

app.all("*",(req,res,next) => {
  next(new Expresserror(404,"Page Not Found"));
})
app.use((err,req,res,next) => {
  let{status =500,message = "Something Went Wrong"} = err;
  console.log(err)
  res.status(status).render("listing/Error.ejs",{message});
  // res.status(status).send(message);
})
app.listen(8080,() => {
    console.log("Server is Listining to 8080 port");
});