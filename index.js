// Require (load) NPM Modules 
const express = require('express');
const app = express(); 
const ejs = require('ejs');

const port = 8000; 

// Added some test data to see how I can include it in my .ejs files.
let testData = [
    {
        name: "Kaan",
        age: 21,
    },
    {
        name: "Jaap",
        age: 22
    },
]

// Placed some basic methods to my app (express), with help from: https://www.npmjs.com/package/express
app
    // Configure settings for express
    .set('view engine', 'ejs') // use ejs for templating
    .set('views', 'view') // load templates from 'view'

    // Makes different routes (Method(Path, Handler))
    .get('/', index)
    .get('/about', about)
    .get('/register', register)

    // Use the following code to serve images, CSS files and JS in a directory called "static"
    .use('/static', express.static('static'))

    // Use function pageNotFound when a route can't be found
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