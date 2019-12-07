const mongoose = require('mongoose')
const config = require('config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const error = require('./middleware/error')


if(!config.get('jwtPrivateKey')) {
    console.error('FATAL error: jwtPrivateKey is not defined');
    process.exit(1); // exit process if error 
}

// import routes
const genres = require('./api/routes/genreRoute')
const movies = require('./api/routes/movieRoute')
const customers = require('./api/routes/customersRoute')
const rentals = require('./api/routes/rentalRoute')
const users = require('./api/routes/userRoute')


//middleware
app.use(bodyParser.json())
// match routes 
genres(app)
movies(app)
customers(app)
rentals(app)
users(app)


// connect to database
// mongodb://localhost:27017/videoStore
mongoose.connect(config.get('connection'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongoDB'))
    .catch('something went wrong with MongoDB')

// pug 
app.set('view engine', 'pug')
app.set('views', './views')  // default 

// config 
console.log(`Application Name: ${config.get('name')} `)
console.log(`mail server: ${config.get('mail.host')} `)
//console.log(`mail password: ${config.get('mail.password')} `)


// error handling
app.use(error)

// listen! 
const port = 3001
app.listen( port, () => {
    console.log(`started listening on port ${port}`)
})
