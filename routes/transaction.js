const express = require("express");
const router = express.Router();
const Listing = require("../Models/listing");
const Transaction = require('../Models/Transaction');
const { isloggedIn } = require("../middleware");
const WrapAsync = require("../utils/WrapAsync");

// Buy route (GET)
router.get("/:id/buy", isloggedIn, WrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listing/buy.ejs", { listing });
}));

// POST Buy route
router.post("/:id/buy", isloggedIn, WrapAsync(async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        
        if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
        }

        const transaction = new Transaction({
            listing: listing._id,
            user: req.user._id,
            transactionType: "buy",
            amount: listing.price,
        });

        await transaction.save();

        req.flash("success", "Purchase successful!");
        res.redirect(`/listings/${listing._id}`);
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect(`/listings/${req.params.id}`);
    }
}));

// Rent route (GET)
router.get("/:id/rent", isloggedIn,WrapAsync( async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listing/rent.ejs", { listing });
}));

// POST Rent route
router.post("/:id/rent", isloggedIn,WrapAsync( async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
        }

        const transaction = new Transaction({
            listing: listing._id,
            user: req.user._id,
            transactionType: "rent",
            amount: listing.price,
        });

        await transaction.save();

        req.flash("success", "Rental request submitted!");
        res.redirect(`/listings/${listing._id}`);
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect(`/listings/${req.params.id}`);
    }
}));

module.exports = router;
