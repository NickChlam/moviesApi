const Rental = require('../controllers/rentalController')
const asyncMiddleware = require('../../middleware/asyncMiddleware')

module.exports = function(app){
    app.route('/rentals')
        .get( asyncMiddleware(Rental.getRentals))
        .post( asyncMiddleware(Rental.saveRental))

}