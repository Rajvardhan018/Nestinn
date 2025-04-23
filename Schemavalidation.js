const Joi = require('joi');
const review = require('./Models/review');
module.exports.ListingSchema = Joi.object({
    Listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(), 
        location : Joi.string().required(), 
        country : Joi.string().required(), 
        price : Joi.number().required().min(0),
        image :  Joi.string().allow("",null), 
    }).required(),
});
module.exports.reviewschema = Joi.object({
    review : Joi.object({
         rate : Joi.number().required().min(1).max(5),
         comment : Joi.string().required(),
    }).required(),
});