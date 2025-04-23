const express = require("express");
const router = express.Router({mergeParams : true});
const Wrapasync =require("../utils/WrapAsync.js");
const Expresserror = require("../utils/ExpressError.js");
const {ListingSchema,reviewschema} = require("../Schemavalidation.js");
const review = require("../Models/review.js");
const Listing = require("../Models/listing.js");
const { isloggedIn, isReviewAuthor } = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js")
const validatereview = (req,res,next)=>{
    let {error} = reviewschema.validate(req.body);

    if(error){
      let errmsg = error.details.map((el) => el.message).join(",");
      throw new Expresserror(400,errmsg);
    }
    else{
      next();
    }

  }
  //post Review
router.post("/",isloggedIn,validatereview ,Wrapasync(reviewcontroller.postreview));
//Delete Review
  router.delete("/:reviewid",isloggedIn,isReviewAuthor,Wrapasync(reviewcontroller.deletereview));
 module.exports =router;