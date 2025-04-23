const review = require("../Models/review.js");
const Listing = require("../Models/listing.js")
module.exports.postreview = async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newreview = new review(req.body.review);
    newreview.author = req.user._id
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success","New Review Created")
    console.log("new review saved");
    
    res.redirect(`/listings/${listing._id}`);
  }
module.exports.deletereview = async (req,res) => {
    let {id,reviewid} =req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewid}});
    await review.findByIdAndDelete(reviewid);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);

  }