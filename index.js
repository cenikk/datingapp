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
let db = {
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    cluster: process.env.DB_CLUSTER,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
};
const url = `mongodb+srv://${db.username}:${db.password}@${db.cluster}-${db.host}/${db.name}`;

// Connect to Database
mongo.MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log("Failed to connect", err);
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
const index = require('./controller/index.js');
const about = require('./controller/about.js');
const register = require('./controller/register.js');
const login = require('./controller/login.js');
const redirectLogin = require('./controller/redirectLogin.js');
const profile = require('./controller/profile.js');
const matches = require('./controller/matches.js');
const logout = require('./controller/logout.js');
const remove = require('./controller/remove.js');
const loginValidation = require('./controller/loginValidation.js');
const addUser = require('./controller/addUser.js');
const pageNotFound = require('./controller/pageNotFound.js');
const movie = require('./controller/movie.js');
const addMovie = require('./controller/addMovie.js');
const wrongCredentials = require('./controller/wrongCredentials.js');

// Adding methods to my app (express)
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
    .get('/', index)
    .get('/about', about)
    .get('/register', register)
    .get('/login', login)
    .get('/:id', redirectLogin, profile) // Homepage after login
    .get('/:id/matches', redirectLogin, matches)
    .get('/:id/logout', redirectLogin, logout)
    .get('/:id/movie', redirectLogin, movie)
    .get('/login/error', wrongCredentials)
    
    .delete('/:id', remove)
    
    .post('/login', loginValidation)
    .post('/register', uploadFolder.single('profilepicture'), addUser)
    .post('/:id/movie', addMovie)
    
    .use(pageNotFound)
    
    // Listen for requests on port (8000)
    .listen(port);

// req is an object containing information about the HTTP request that raised the event. 
// In response to req, you use res to send back the desired HTTP response.