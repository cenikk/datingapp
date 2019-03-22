// Require (load) NPM Modules 
const express = require('express');
const slugify = require('slugify');
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadFolder = multer({dest: 'static/upload'});
const data = require("./models/data.js");
const mongo = require('mongodb');

require('dotenv').config();

const url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;
mongo.MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    
    if (err) {
        console.log("Failed to connect", err);
    } else {
        db = client.db(process.env.DB_NAME);
    }
})  

const port = 8000; 

// Placed some basic methods to my app (express), with help from: https://www.npmjs.com/package/express
express()
    // Use the following code to serve images, CSS files and JS in a directory called "static"
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json()) //  parse application/json (fixed my radiobuttons)

    // Configure settings for express
    .set('view engine', 'ejs')
    .set('views', 'view')

    // Makes different routes (Method(Path, Handler))
    .get('/', index)
    .get('/about', about)
    .get('/register', register)
    .get('/userlist', users)
    // .get('/:id', profile)
    .get('/:id/upload', upload)
    .get('/:id/userdetail', userDetail)

    .delete('/userlist', remove)

    .post('/register', add)
    .post('/register', uploadFolder.single('profilepicture'), add)

    // Use function pageNotFound when a route can't be found
    .use(pageNotFound)

    // Listen for requests on port (8000)
    .listen(port)

// Handle the index request by rendering index.ejs. req = request, res = response
function index(req, res) {
    res.render('index.ejs', {data}); // render by combining templates with data, send the result
}

function about(req, res) {
    const team = require("./models/team.js");
    res.render('about.ejs', {team});
}

function register(req, res) {
    res.render('register.ejs');
}

function pageNotFound(req, res) {
    res.status(404).render('not-found.ejs');
}

function add(req, res) {
    let id = slugify(req.body.voornaam).toLowerCase();
    db.collection('user').insertOne({
        id: id,
        firstName: req.body.voornaam,
        gender: req.body.gender,
        birthday: req.body.dag,
        birthmonth: req.body.maand,
        birthyear: req.body.jaar,
        profilepicture: req.file ? req.file.filename : null
    }, done)

    function done(err, data) {
        if (err) {
            connsole.log('An error has occured', err);
        } else {
            res.redirect('/' + id + '/upload');
        }
    }
}

function upload(req, res) {
    let id = req.params.id;
    db.collection('user').findOne({
        'id' : id
    }, done)
    
    function done(err, data) {
        if (err) {
            console.log('An error has occured', err)
        } else {
            res.render('upload.ejs', {data})
        }
    }
    // let filter = data.filter(function(value) {
    //     return value.id == id;
    // });
    // help from Thijs (github.com/iSirThijs)
}

function users(req, res, next) {
    db.collection('user').find().toArray(done);
    function done(err, data) {
        if (err) {
          next(err)
        } else {
          res.render('userlist.ejs', {data})
        }
      }
}

function remove(req, res) {
    let id = req.params.id;

    db.collection('user').deleteOne({
        _id: mongo.ObjectID(id)
    }, done)

    function done(err) {
        if (err) {
            next(err)
        } else {
            res.json({status: 'ok'})
        }
    }
}

function userDetail(req, res) {
    let id = req.params.id;
    db.collection('user').findOne({
        'id': id
    }, done)
    
    function done(err, data) {
        if (err) {
            console.log('An error has occured', err)
        } else {
            res.render('userdetail.ejs', {data})
        }
    }
}