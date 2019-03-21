// Require (load) NPM Modules 
const express = require('express');
const slugify = require('slugify');
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadFolder = multer({dest: 'static/upload'});
const data = require("./models/data.js");

const port = 8000; 

// Placed some basic methods to my app (express), with help from: https://www.npmjs.com/package/express
express()
    // Use the following code to serve images, CSS files and JS in a directory called "static"
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({ extended: false }))
    
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

    .delete('/:id', remove)

    .post('/register', add)
    .post('/register', uploadFolder.single('profilepicture'), add)

    // Use function pageNotFound when a route can't b`e found
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
    data.push({
        id: id,
        firstName: req.body.voornaam,
        gender: req.body.gender,
        birthday: req.body.dag,
        birthmonth: req.body.maand,
        birthyear: req.body.jaar,
        profilepicture: req.file ? req.file.filename : null
    });
    console.log(data);
    res.redirect('/' + id + '/upload');
    return data;
}

function upload(req, res) {
    let id = req.params.id;
    let filter = data.filter(function(value) {
        return value.id == id;
    });
    res.render('upload.ejs', {data: filter});
    // help from Thijs (github.com/iSirThijs)
}

function users(req, res) {
    res.render('userlist.ejs', {data});
}

function remove(req, res) {
    let id = req.params.id;

    data = data.filter(function (value) {
        return value.id !== id;
    })

    res.json({status: 'ok'});
}