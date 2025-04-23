const express = require("express");
const router = express.Router();
const Listing = require("../Models/listing.js");
const Wrapasync =require("../utils/WrapAsync.js");
const Expresserror = require("../utils/ExpressError.js");
const {ListingSchema,reviewschema} = require("../Schemavalidation.js");
const { isloggedIn, isowner } = require("../middleware.js");
const User = require("../Models/user.js");
const listingcontroller = require("../controllers/listing.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

const validatelisting = (req,res,next)=>{
    let {error} = ListingSchema.validate(req.body);

    if(error){
      let errmsg = error.details.map((el) => el.message).join(",");
      throw new Expresserror(400,errmsg);
    }
    else{
      next();
    }

  }
  router
  .route("/")
  .get(Wrapasync(listingcontroller.index))
  .post(isloggedIn, validatelisting, Wrapasync(listingcontroller.createlisting));

  // .post(upload.single('Listing[image]'),(req,res) => {
  //   console.log(req.file.path)
  //   res.send(req.file)
  // })
  
//New Route
router.get("/new",isloggedIn,listingcontroller.Rendernewform)
 
  router
  .route("/:id") 
  .get(Wrapasync(listingcontroller.showlisting))
  .put(isloggedIn, isowner, validatelisting, Wrapasync(listingcontroller.updatelisting))
  .delete(isloggedIn, isowner, Wrapasync(listingcontroller.deletelisting));


  
  
   //edit route
   router.get("/:id/edit",isloggedIn,isowner,Wrapasync(listingcontroller.editlisting));
   
      
      module.exports = router;