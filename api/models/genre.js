const mongoose = require('mongoose')
const Joi = require('@hapi/joi');

const genreSchema = new mongoose.Schema({
    name : { 
        type : String, 
        required : true
    }
})

function validateGenre(req) {
    const schema = Joi.object({
        name: Joi.string()
            .required()
       
    })

    return schema.validate(req)
}

module.exports.Genre = mongoose.model('Genre', genreSchema); 
module.exports.genreSchema = genreSchema;
module.exports.validate = validateGenre;
