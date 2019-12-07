const {Customer, validate} = require('../models/customer')
const mongoose = require('mongoose')

exports.getCustomers =  async function(req, res){
        const customers  = await Customer.find()

        return res.send(customers)
}   

exports.saveCustomer = async function(req, res) {
    // validate 
    const {error} = validate(req.body);
    if (error) { return res.status(400).send({'error': true, 'message': error}) }

    // create a new csutomer object 
    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })
    
    // check if customer exists
    const custExists = await Customer.findOne({phone: customer.phone})
    if(custExists) return res.status(400).send({'error': true, 'message': `phone : ${customer.phone} already exists`})
    const result = await customer.save()
    return res.status(201).send(result)
}

exports.deleteCustomerbyId = async function(req, res) {
    // validate id
    const isCustomerValid = mongoose.Types.ObjectId.isValid(req.params.custId)
    if(!isCustomerValid) { return res.status(404).send({'error': true, 'message': `${req.params.custId} is not valid` })}
    // get customer does it exist
    const customer = await Customer.findById(req.params.custId);
    
    if(customer) {
        // delete customer 
        const result = await Customer.deleteOne({_id: req.params.custId})
        return res.status(201).send(result)
        
    }
    // if no customer return not found 
    return res.status(404).send({'error': true,'message' :  `customer with Id of ${req.params.custId} does not exist`})

}