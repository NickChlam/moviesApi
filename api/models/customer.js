const Joi = require('@hapi/joi')
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 50
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
})

function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .min(5)
            .max(50),
        isGold: Joi.boolean()
            .default(false),
        phone: Joi.string()
            .required()
            .min(7)
            .max(30)
    })

    return schema.validate(customer);
}


module.exports.Customer = mongoose.model('Customer', customerSchema);
module.exports.validate = validateCustomer;