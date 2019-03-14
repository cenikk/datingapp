// Require (load) NPM Modules 
const express = require('express');
const app = express();
const slugify = require('slugify');
const bodyParser = require('body-parser');

const port = 8000; 

// Added some test data to see how I can include it in my .ejs files.
let testData = [];

// Placed some basic methods to my app (express), with help from: https://www.npmjs.com/package/express
app
    // Configure settings for express
    .set('view engine', 'ejs')
    .set('views', 'view')

    // Makes different routes (Method(Path, Handler))
    .get('/', index)
    .get('/about', about)
    .get('/register', register)
    .get('/:id', users)
    .delete('/:id', remove)

    // Use the following code to serve images, CSS files and JS in a directory called "static"
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({ extended: false }))
    .post('/', add)
    // Use function pageNotFound when a route can't b`e found
    .use(pageNotFound)

    // Listen for requests on port (8000)
    .listen(port)

// Handle the index request by rendering index.ejs. req = request, res = response
function index(req, res) {
    res.render('index.ejs', {testData: testData}); // render by combining templates with data, send the result
}

function about(req, res) {
    res.send('This is the about page');
}

function register(req, res) {
    res.render('register.ejs');
}

function pageNotFound(req, res) {
    res.status(404).render('not-found.ejs');
}

function add(req, res) {
    let id = slugify(req.body.voornaam).toLowerCase();
    testData.push({
        id: id,
        firstName: req.body.voornaam,
        gender: req.body.gender,
        birthday: req.body.dag,
        birthmonth: req.body.maand,
        birthyear: req.body.jaar
    });

    res.redirect('/' + id);
    return data;
}

function users(req, res) {
    res.render('userlist.ejs', {testData});
    console.log(testData);
}

function remove(req, res) {
    let id = req.params.id;

    testData = testData.filter(function (value) {
        return value.id !== id;
    })

    res.json({status: 'ok'});
}