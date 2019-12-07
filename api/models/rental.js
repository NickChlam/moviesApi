const Joi = require('@hapi/joi')
const mongoose = require('mongoose')

const rentalSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema({
            name: {
                type: String, 
                minlength: 5,
                maxlength: 50, 
                required: true
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String, 
                required: true,
                minlength: 7,
                maxlength: 30
            }
        }),
        required: true
    },
    movie: {
        type: mongoose.Schema({
            title: {
                type: String,
                required: true, 
                trim: true,
                minlength: 5, 
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required : true,
                min: 0, 
                max: 255
            }
        }),
        required: true
    },
    dateOut : {
        type: Date,
        required: true, 
        default: Date.now
    },
    dateRetuned : {
        type: Date
    },
    rentalFee : {
        type: Number,
        min : 0
    }
})

function validateRental(rental){
    const schema = new Joi.object({
        custId : Joi.string()
            .min(5)
            .max(50)
            .required(),
        movieId : Joi.string()
            .min(5)
            .max(255)
            .required()
    })

    return schema.validate(rental)
}

module.exports.Rental = mongoose.model('Rental', rentalSchema)
exports.validate = validateRental


