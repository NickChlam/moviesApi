
const {Genre, validate} = require('../models/genre')


exports.getGenres = async function(req, res) {
        
        const genres = await Genre.find()
        return res.send(genres)
 
   
}

exports.saveGenre = async function(req, res) {
    
    const {error} = await validate(req.body)
    // validate and error 
    
    if (error) return res.status(400).send({"error": true, "message": `${error}`})
    const genre = new Genre(req.body)
    // save 
    const result = await genre.save(genre)
    res.status(201).send(result)
}

exports.deleteGenre = async function(req, res) {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if(!genre) return res.status(404).send({'error': `THe genre with id: ${req.params.id} does not exist`})

    res.send(genre)
}
