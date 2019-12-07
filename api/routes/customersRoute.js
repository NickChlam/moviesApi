const Customer = require('../controllers/customersController')
const asyncMiddleware = require('../../middleware/asyncMiddleware')
module.exports = function(app) {
    app.route('/customers')
        .get( asyncMiddleware(Customer.getCustomers))
        .post( asyncMiddleware(Customer.saveCustomer))
    
    app.route('/customers/:custId')
        .post( asyncMiddleware(Customer.deleteCustomerbyId))

} 