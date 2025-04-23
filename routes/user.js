const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/user.js")

// Signup Routes
console.log(usercontroller.signup);  // This should log the function definition if it's correctly imported

router
  .route("/signup")
  .get(usercontroller.rendersignupform)
  .post(WrapAsync(usercontroller.postsignupform));  // Should work if usercontroller.signup is defined correctly


// Login Routes
router
  .route("/login")
  .get(usercontroller.renderloginform)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usercontroller.login
  );

// Logout Route
router.get("/logout", usercontroller.logout);

module.exports = router;