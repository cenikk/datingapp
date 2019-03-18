// Require (load) NPM Modules 
const express = require('express');
const slugify = require('slugify');
const bodyParser = require('body-parser');

const port = 8000;
const app = express();

// Added some test data to see how I can include it in my .ejs files.
let testData = [];

// Placed some basic methods to my app (express), with help from: https://www.npmjs.com/package/express
app
    // Use the following code to serve images, CSS files and JS in a directory called "static"
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({ extended: false }))
    
    // Configure settings for express
    .set('view engine', 'ejs')
    .set('views', 'view')

    // Makes different routes (Method(Path, Handler))
    .get('/', renderIndex)
    .get('/about', renderAbout)
    .get('/register', renderRegister)
    .get('/:id', renderUserList)
    .delete('/:id', removeUser)

    .post('/', addUser)

    // Use function pageNotFound when a route can't b`e found
    .use(renderPageNotFound)

    //Listen for requests on port (8000)
    .listen(port, listening);

// Handle the index request by rendering index.ejs. req = request, res = response
function renderIndex(req, res) {
    res.render('index.ejs', {testData: testData}); // render by combining templates with data, send the result
}

function renderAbout(req, res) {
    res.send('This is the about page');
}

function renderRegister(req, res) {
    res.render('register.ejs');
}

function renderPageNotFound(req, res) {
    res.status(404).render('not-found.ejs');
}

function addUser(req, res) {
    let id = slugify(req.body.voornaam).toLowerCase();
    testData.push({
        id: id,
        firstName: req.body.firstname,
        gender: req.body.gender,
        birthday: req.body.day,
        birthmonth: req.body.month,
        birthyear: req.body.year
    });

    res.redirect('/' + id);
}

function renderUserList(req, res) {
    res.render('userlist.ejs', {testData});
}

function removeUser(req, res) {
    let id = req.params.id;

    testData = testData.filter(function (value) {
        return value.id !== id;
    })

    res.json({status: 'ok'});
}

function listening() {
    console.log('Listening on port: ' + port);
}