const mongoose = require('mongoose')
const config = require('config')

mongoose.connect(config.get('connection'), {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('connected to mongoDB'))
    .catch('something went wrong')

const genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
    },
    date: {type: Date, default: Date.now},
    tags: {
        type: Array,
        validate: {
            validator: function  (v) {return v.length > 0;}
        },
        message: 'A genre should have min 1 tag'
    }
})

const Genre = mongoose.model('genres', genreSchema)

async function createCourse(genre, date, tags){
    //create a course object 
        const g = new Genre({
        genre : genre,
        date: date,
        tags: tags
    })
    
    const result = await g.save();
    console.log(result)
    }

    const date = Date.now
    const genres = [
        {tags: ['tag4', 'tag5', 'tag6'], genre: 'folk'},
        {tags: ['tag1', 'tag2', 'tag3'], genre: 'classic'},
        {tags: ['tag7', 'tag8', 'tag9'], genre: 'rock'},
        {tags: ['tag10', 'tag11', 'tag12'], genre: 'horror'},
        {tags: ['tag13', 'tag14', 'tag15'], genre: 'mystery'},
        {tags: ['tag16', 'tag17', 'tag18'], genre: 'history'},
        {tags: ['tag4', 'tag5', 'tag6'], genre: 'scary'},
        {tags: ['tag1', 'tag2', 'tag3'], genre: 'horror'},
        {tags: ['tag7', 'tag8', 'tag9'], genre: 'punk'},
        {tags: ['tag10', 'tag11', 'tag12'], genre: 'clasic'},
        {tags: ['tag13', 'tag14', 'tag15'], genre: 'disney'},
        {tags: ['tag16', 'tag17', 'tag18'], genre: 'mystery'}
    ]

    console.log(genres)

    genres.forEach(g => {
        createCourse(g.genre, g.date, g.tags)
    })
