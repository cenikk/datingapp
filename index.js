// Require (load) NPM Modules 
require('dotenv').config();
const port = process.env.PORT || 5000;
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadFolder = multer({
    dest: 'static/upload',
    limits: {fileSize: 5000000}
});

// Setting up Database
const mongo = require('mongodb');
const session = require('express-session');
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
const sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: 'auto'
    }
};

// Require (load) controllers
/* const index = require('controller/index.js');
const about = require('controller/about.js');
const register = require('controller/register.js');
const login = require('controller/login.js');
const profile = require('controller/profile.js');
const matches = require('controller/matches.js');
const logout = require('controller/logout.js');
const remove = require('controller/remove.js');
const loginValidation = require('controller/loginValidation.js');
const addUser = require('controller/addUser.js');
const pageNotFound = require('controller/pageNotFound.js'); */

// Adding methods to my app (express)
express()
    //S erve images, CSS files and JS in a directory called "static"
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json()) // parse application/json (radiobuttons value)
    .use(session(sess))
    
    // Configure settings for express
    .set('view engine', 'ejs')
    .set('views', 'view')
    
    // Make different routes (Method(Path, Handler))
    .get('/', index)
    .get('/about', about)
    .get('/register', register)
    .get('/login', login)
    .get('/:id', redirectLogin, profile) // Homepage after login
    .get('/:id/matches', redirectLogin, matches)
    .get('/:id/logout', redirectLogin, logout)
    
    .delete('/:id', remove)
    
    .post('/login', loginValidation)
    .post('/register', uploadFolder.single('profilepicture'), addUser)
    
    .use(pageNotFound)
    
    // Listen for requests on port (8000)
    .listen(port);

// req is an object containing information about the HTTP request that raised the event. 
// In response to req, you use res to send back the desired HTTP response.
function index(req, res) {
    res.render('index.ejs');
}

function redirectLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

function about(req, res) {
    db.collection('team').find().toArray(function(err, team) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            res.render('about.ejs', {team});
        }
    });
}

function login(req, res) {
    res.render('login.ejs');
}

function register(req, res) {
    res.render('register.ejs');
}

function pageNotFound(req, res) {
    res.status(404).render('not-found.ejs');
}

function addUser(req, res) {
    db.collection('user').insertOne({
        username: req.body.username.toLowerCase(),
        password: req.body.password,
        gender: req.body.gender,
        profilepicture: req.file ? req.file.filename : null
    }, function(err, data) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            req.session.user = {
                id: data.insertedId,
                username: req.body.username,
                password: req.body.password,
                picture: req.file.filename
            };
            // console.log(req.session.user);
            res.redirect('/' + data.insertedId);
        }
    });
}

function matches(req, res) {
    db.collection('user').find().toArray(function(err, data) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            res.render('matches.ejs', {
                data,
                user: req.session.user
            });
        }
    });
    }

function profile(req, res) {
    let id = req.params.id;
    db.collection('user').findOne({
        _id: mongo.ObjectID(id)
    }, function(err, data) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            res.render('profile.ejs', {
                data,
                user: req.session.user
            });
        }
    });
}

function remove(req, res) {
    let id = req.params.id;
    db.collection('user').deleteOne({
        _id: mongo.ObjectID(id)
    }, function (err){
        if (err) {
            console.log("An error has occured", err);
        } else {
            res.json({status: 'ok'});
        }
    });
}

function loginValidation(req, res) {
    db.collection('user').find().toArray(function(err, data) {
        for (let i = 0; i < data.length; i++) {
            if (err) {
                console.log('An error has occured', err);
            } else if (req.body.username.toLowerCase() === data[i].username && req.body.password === data[i].password) {
                let id = data[i]._id;
                req.session.user = {
                    id: data.insertedId,
                    username: req.body.username,
                    password: req.body.password,
                    picture: data[i].profilepicture
                };
                res.redirect('/' + id);
            }
        }
    });
}

function logout(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log("An error has occured", err);
        } else {
            res.redirect('/');
        }
    });
}