const mongoose = require("mongoose");
const review = require("./review");
const User = require("./user.js");

const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title :{type : String,
        required : true
    },
    description : String,
    image : {
        type : String,
        default : "https://images.unsplash.com/photo-1741557571786-e922da981949?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
        set: (v) => v === "" ?"https://images.unsplash.com/photo-1741557571786-e922da981949?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
        :v,
    },
    price : Number,
    location : String,
    country : String,
    reviews :[
        {
            type : Schema.Types.ObjectId,
            ref : "review"
        },
    ],
    owner : {
        type: Schema.Types.ObjectId,
        ref : "user"

    }

    
    
});
ListingSchema.post("findOneAndDelete",async () => {
        if(Listing){
            await review.deleteMany({_id : {$in : Listing.reviews}});
        }
})
const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;