const Movie = require('../controllers/movieController')
const asyncMiddleware = require('../../middleware/asyncMiddleware')

module.exports = function(app) {
    app.route('/movies')
        .post( asyncMiddleware(Movie.addMovie))
        .get( asyncMiddleware(Movie.getMovies))
}

