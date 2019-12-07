const Genres = require('../controllers/genresContoller')
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
const asyncMiddleware = require('../../middleware/asyncMiddleware')

module.exports = function(app) {
    app.route('/genres')
        .get( asyncMiddleware(Genres.getGenres))
        .post(auth, asyncMiddleware(Genres.saveGenre))
    
        // add auth and admin middleware authentication to process request from x-auth-token in header
    app.route('/genres/:id')
        .delete( [auth, admin], asyncMiddleware(Genres.deleteGenre))
}