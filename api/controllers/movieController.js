
const {Movie, validate} = require('../models/movie')
const Joi = require('@hapi/joi');
const Genre = require('../models/genre')
const mongoose = require('mongoose')

exports.getMovies = async function(req, res){
    const pageNum = req.query.pageNum ;
    const pageSize = 10;

    console.log(pageNum)
    const movies = await Movie
        .find()
        .select('title genre.name numberInStock dailyRentalRate -_id')
        .skip( (pageNum - 1) * pageSize)
        .limit(pageSize)
        .sort('title')

    return res.status(200).send(movies)

}
exports.addMovie = async function(req, res) {
    // handle validation
    const {error} = validate(req.body);
    if( error ) { return res.status(400).send({'error': true, 'message': error})}
    // get genre if valid genreID and exists 
    const isGenreValid = mongoose.Types.ObjectId.isValid(req.body.genreId)
    if(!isGenreValid) { return res.status(400).send({'error': true, 'message' : `invalid genre with ID of: ${req.body.genreId}`}) }
    const genre = await Genre.Genre.findById(req.body.genreId)
    if(!genre) {return res.status(400).send({'error': true, 'message' : `no genre with ID of: ${req.body.genreId}`}) }

    // create a Movie object 
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    // save results and send response
    await movie.save();
    return res.status(201).send(movie)
}

