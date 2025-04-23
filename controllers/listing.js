const Listing = require("../Models/listing.js")
module.exports.index = async (req,res) => {

         const allListing  = await Listing.find({});
         res.render("listing/index.ejs",{allListing});

  }
module.exports.Rendernewform = (req,res) =>{
    
    res.render("listing/new.ejs")
  }
module.exports.showlisting = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate(
      {path : "reviews" , 
        populate : { path : "author"}
        ,}).populate("owner");
    if(!listing){
      req.flash("error","The Listing Doesn't Exist");
      res.redirect("/listings");
    }
    console.log(listing)
    res.render("listing/show.ejs",{listing});
  }
  module.exports.createlisting = async (req,res,next) => {
       
    let newListing =   new Listing(req.body.Listing);
    newListing.owner= req.user._id
    await newListing.save();
    req.flash("success","New Listing Created")
    res.redirect("/listings");
  
  
 
   
}
module.exports.editlisting = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","The Listing Doesn't Exist");
      res.redirect("/listings");
    }
        res.render("listing/edit.ejs",{listing});
  }
module.exports.updatelisting = async (req,res) => {
       
    let {id} = req.params;
    console.log(req.body)
    await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    
    req.flash("success"," Listing Updated")
   
    res.redirect(`/listings/${id}`);
  }
module.exports.deletelisting = async (req,res ) => {
    let {id} =  req.params;
    let deleteListing =  await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success"," Listing Deleted")
    res.redirect("/listings");
  }