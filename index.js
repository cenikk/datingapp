// Require (load) NPM Modules 
require('dotenv').config();
const port = process.env.PORT || 8000;
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadFolder = multer({
    dest: 'static/upload',
    limits: {fileSize: 5000000}
});

// Setting up Database
const mongo = require('mongodb');
let db = require('./models/db.js');
const url = `mongodb+srv://${db.username}:${db.password}@${db.cluster}-${db.host}/${db.name}`;

// Connect to Database
mongo.MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log('Failed to connect', err);
    } else {
        db = client.db(process.env.DB_NAME);
    }
});  

// Session settings
const session = require('express-session');
const sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: 'auto'
    }
};

// Require (load) controllers
const loginController = require('./controller/login.js');
const registerController = require('./controller/register.js');
const userController = require('./controller/user.js');
const indexController = require('./controller/index.js');
const movieController = require('./controller/movie.js');

// Adding methods to our app (express)
express()
    //Serve images, CSS files and JS in a directory called "static"
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json()) // parse application/json (radiobuttons value)
    .use(session(sess))
    
    // Configure settings for express
    .set('view engine', 'pug')
    .set('views', 'view')
    
    // Make different routes (Method(Path, Handler))
    .get('/', indexController.index)
    .get('/about', indexController.about)
    .get('/register', registerController.register)
    .get('/login', loginController.login)
    .get('/login/error', loginController.wrongCredentials)
    .get('/:id', loginController.redirectLogin, userController.profile) // Homepage after login
    .get('/:id/matches', loginController.redirectLogin, userController.matches)
    .get('/:id/logout', loginController.redirectLogin, userController.logout)
    .get('/:id/movie', loginController.redirectLogin, movieController.movie)
    
    .delete('/:id', userController.remove)
    
    .post('/login', loginController.loginValidation)
    .post('/register', uploadFolder.single('profilepicture'), userController.addUser)
    .post('/:id/movie', movieController.addMovie)
    
    .use(indexController.pageNotFound)
    
    // Listen for requests on port (8000)
    .listen(port);

// req is an object containing information about the HTTP request that raised the event. 
// In response to req, you use res to send back the desired HTTP response.