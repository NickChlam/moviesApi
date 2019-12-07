const User = require('../models/user')
const {validate, validateLogin} = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports.newUser = async function(req, res) {
    // validate 
    const {error} = await validate(req.body)
    if (error) return res.status(400).send({"error": true, "message": `${error}`})

    // does user exist 
    
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send({"error": true, "message": `${req.body.email} already registered`})

    // save user to database
    user = new User({
        name: req.body.name,
        email: req.body.email,
    })

    user.setPassword(req.body.password)
    // save 
    await user.save()
    const token = user.generateAuthToken();
    // add user and login - send token in header back to client 
    res.header('x-auth-token', token).status(201).send({name: user.name, email: user.email, id: user._id})
}

module.exports.login = async function(req, res) {
    // validate 
    const { error } = validateLogin(req.body);
    if (error) { return res.status(400).send({'error': true, 'message': error.details[0].message}) }
    // does user exist - if not return error 
    const user = await User.findOne({email: req.body.email})
    if(!user) { return res.status(400).send({'error': true, 'message': 'username or password invalid'})};

    // valdiate password
    const valid = user.validatePassword(req.body.password)
    if(!valid) { return res.status(400).send({'error': true, 'message': 'username or password invalid'})};

    // jwt
    const token = user.generateAuthToken();
    return res.status(200).send({'token': token})

}