const User = require('../controllers/usersController')
const asyncMiddleware = require('../../middleware/asyncMiddleware')

module.exports = function(app){
    app.route('/users/signup')
        .post( asyncMiddleware(User.newUser))
    app.route('/users/login') 
        .post( asyncMiddleware(User.login))

}