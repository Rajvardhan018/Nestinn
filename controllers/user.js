const User = require("../Models/user.js");
const WrapAsync = require("../utils/WrapAsync.js");
module.exports.rendersignupform = (req,res) => {
    res.render("users/signup.ejs")
}
module.exports.postsignupform = async(req,res) => {
    try{
        let{username , email , password} = req.body;
    let newUser = new User({email,username})
    const registeruser = await User.register(newUser,password)
    console.log(registeruser)
    req.login(registeruser, (err) => {
        if(err) {
            return next(err)
        }
        req.flash("success","Welcome To NestInn!")
        res.redirect("/listings")
    })
    
    }
    catch(err){
        req.flash("error",err.message)
        res.redirect("/signup")
    }
    
}
module.exports.renderloginform =  (req,res) => {
    res.render("users/login.ejs")
}
module.exports.login = WrapAsync( async(req,res) => {
    req.flash("success","Welcome To NestInn!You are Logged in")
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
})
module.exports.logout =(req,res,next) => {
    req.logOut((err) => {
      if(err){
        return next(err)
      }
      req.flash("success","You are Logged Out")
      res.redirect("/listings")
    })
   
   }