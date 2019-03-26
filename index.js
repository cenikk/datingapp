// Require (load) NPM Modules 
require('dotenv').config();
const port = 8000;
const express = require('express');
// const slugify = require('slugify');
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadFolder = multer({
    dest: 'static/upload',
    limits: {fileSize: 5000000}
});
const mongo = require('mongodb');
const session = require('express-session');
const sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {}
};

let db = null;
const url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;
mongo.MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log("Failed to connect", err);
    } else {
        db = client.db(process.env.DB_NAME);
    }
});  

// Placed some basic methods to my app (express), with help from: https://www.npmjs.com/package/express
express()
    // Use the following code to serve images, CSS files and JS in a directory called "static"
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json()) //  parse application/json (radiobuttons value)
    .use(session(sess))

    // Configure settings for express
    .set('view engine', 'ejs')
    .set('views', 'view')

    // Makes different routes (Method(Path, Handler))
    .get('/', index)
    .get('/about', about)
    .get('/register', register)
    .get('/login', login)
    .get('/:id', profile) // Homepage after login
    .get('/:id/matches', matches)
    .get('/:id/logout', logout)

    // Delete users from db
    .delete('/:id', remove)

    // Post new data into db
    .post('/login', )
    .post('/register', uploadFolder.single('profilepicture'), add)

    // Use function pageNotFound when a route can't be found
    .use(pageNotFound)

    // Listen for requests on port (8000)
    .listen(port);

// req is an object containing information about the HTTP request that raised the event. 
// In response to req, you use res to send back the desired HTTP response.
function index(req, res) {
    console.log(req.session);
    res.render('index.ejs');
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

function register(req, res) {
    res.render('register.ejs');
}

function pageNotFound(req, res) {
    res.status(404).render('not-found.ejs');
}

function add(req, res) {
    db.collection('user').insertOne({
        firstName: req.body.voornaam,
        gender: req.body.gender,
        birthday: req.body.dag,
        birthmonth: req.body.maand,
        birthyear: req.body.jaar,
        profilepicture: req.file ? req.file.filename : null
    }, function(err, data) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            req.session.user = {
                id: data.insertedId,
                username: req.body.voornaam
            };
            console.log(req.session.user);
            res.redirect('/' + data.insertedId);
        }
    });
}

function matches(req, res) {
    console.log(req.session.user);
    db.collection('user').find().toArray(function(err, data) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            res.render('matches.ejs', {data});
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
            req.session.user;
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

function login() {

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