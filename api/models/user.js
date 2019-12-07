const mongoose = require('mongoose')
const Joi = require('@hapi/joi');
const crypto = require('crypto'); 
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    name : { 
        type : String, 
        required : true,
        minlength: 5,
        maxlength: 50
    },
    email : { 
        type : String, 
        required : true,
        minlength: 5,
        maxlength: 255,
        
    },
    hash : {
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 255
    },
    salt : {
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 255
    },
    isAdmin : {
        type: Boolean
    }
    
});

// method for generating jwt token that includes users ID and isAdmin properties 
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin, name: this.name }, config.get('jwtPrivateKey'));
    return token;
}
userSchema.methods.setPassword = function(password) { 
     
    // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
       // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest 
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   }; 

userSchema.methods.validatePassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(user)
}

function validateLogin(user) {
    const schema = Joi.object({
        email: Joi.string().required().min(5).max(50).email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user)
}

const User = module.exports = mongoose.model('User', userSchema)
//module.exports.User = mongoose.model('Users', userSchema); 
module.exports.validate = validateUser;
module.exports.validateLogin = validateLogin;
