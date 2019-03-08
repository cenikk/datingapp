const express = require('express');
const app = express(); // https://www.npmjs.com/package/express
const ejs = require('ejs')

const port = 8000;

const testData = [
    {
        name: "Kaan",
        age: 21,
    },
    {
        name: "Kris",
        age: 22
    },
]

app
    .set('view engine', 'ejs')
    .set('views', 'view')

    .get('/', helloWorld)
    .get('/about', about)

    .use(pageNotFound);

// app.use('/static', express.static('public'));

// http://localhost:8000/static/css/style.css

app.listen(port)

function helloWorld(req, res) {
    res.render('not-found.ejs', {testData: testData});
}

function about(req, res) {
    res.send('This is the about page');
}

function pageNotFound(req, res) {
    res.status(404).render('not-found.ejs');
}