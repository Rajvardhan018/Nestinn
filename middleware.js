const Listing = require("./Models/listing");
const Review = require("./Models/review");

module.exports.isloggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error","You Must Be logged In to Create a new Listing")
        res.redirect("/login")
      }
      next();
}
module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
module.exports.isowner = async(req,res,next) =>{
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!res.locals.currUser || !listing) {
            req.flash("error", "Access denied. Please log in.");
            return res.redirect("/login"); // return stops further execution
        }

        if (!listing.owner.equals(res.locals.currUser._id)) {
            req.flash("error", "You don't have permission to make changes.");
            return res.redirect(`/listings/${id}`); // return is critical here
        }

        // All good
        next();
    } catch (err) {
        console.error("Error in isOwner middleware:", err);
        if (!res.headersSent) {
            req.flash("error", "Something went wrong.");
            return res.redirect("back");
        }
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    try {
        const { id, reviewid } = req.params;
        const review = await Review.findById(reviewid);

        if (!review) {
            req.flash("error", "Review not found.");
            return res.redirect(`/listings/${id}`);
        }

        if (!res.locals.currUser) {
            req.flash("error", "Access denied. Please log in.");
            return res.redirect("/login");
        }

        if (!review.owner || !review.owner.equals(res.locals.currUser._id)) {
            req.flash("error", "You can't delete this review.");
            return res.redirect(`/listings/${id}`);
        }

        //  All good: call next
        return next();
    } catch (err) {
        console.error("Error in isReviewAuthor middleware:", err);

        //  Catch safety: prevent further code
        if (!res.headersSent) {
            req.flash("error", "Something went wrong.");
            return res.redirect(req.get("Referrer") || "/");
        } else {
            return; // Prevent further execution
        }
    }
};
