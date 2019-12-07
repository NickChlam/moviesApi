const mongoose = require('mongoose')
const {Customer} = require('../models/customer')
const {Movie} = require('../models/movie')
const {Rental, validate} = require('../models/rental')
const Fawn = require('fawn')

// init fawn - for two phase commits 
Fawn.init(mongoose)

// get all rentals from database 
module.exports.getRentals = async function(req, res) {
    // get rentals 
    const rentals = await Rental.find()
    res.status(200).send(rentals)
}

module.exports.saveRental = async function(req, res) {
    // validate req 
    const {error} = validate(req.body)
    if(error) {return res.status(400).send({'error': true, 'message': error})}

    // validate customer id 
    const isCustValid = mongoose.Types.ObjectId.isValid(req.body.custId)
    if(!isCustValid) { return res.status(400).send({'error': true, 'message' : `invalid customer ID of: ${req.body.custId}`}) }

    // find customer 
    const customer = await Customer.findById(req.body.custId)
    if(!customer) { return res.status(400).send({'error': true, 'message' : `Invalid Customer`}) }
   
    // validate movie id 
    const isMovieValid = mongoose.Types.ObjectId.isValid(req.body.movieId)
    if(!isMovieValid) { return res.status(400).send({'error': true, 'message' : `invalid movie ID of: ${req.body.movieId}`}) }

    // find movie
    const movie = await Movie.findById(req.body.movieId)
    if(!movie) { return res.status(400).send({'error': true, 'message' : `Invalid Movie`}) }

    // is movie available
    if(movie.numberInStock < 1) {return res.status(400).send({'error': true, 'message': `${movie.title} is not available`})}

    // create Rental Object
        const rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                _id: movie.id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        })
    
    // use fawn to save to rentals database with rental object 
    // save - saves rental object to rentals collection
    // update - updates movie of movie._id prop numberInStock - increments - 1
    // run - runs Task - creates a temp database which holds state of transaction history
    try{
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id }, {
                $inc: { numberInStock: -1}
            })
            .run();
    }
    catch(ex){
        // TODO:  error logging
        return res.status(500).send('something failed')
    }
    
    return await res.status(201).send(rental)

}