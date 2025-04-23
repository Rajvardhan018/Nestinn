const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewschema = new Schema({
    comment : String,
    rate : {
        type : Number,
        min : 1,
        max : 5
    },
    createdat : {
        type : Date,
        default : Date.now()
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "user",
    },
});
module.exports = mongoose.model("review",reviewschema);