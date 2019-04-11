const mongo = require('mongodb');
let db = require('../models/db.js');
const url = `mongodb+srv://${db.username}:${db.password}@${db.cluster}-${db.host}/${db.name}`;

mongo.MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log('Failed to connect', err);
    } else {
        db = client.db(process.env.DB_NAME);
    }
});  

function index(req, res) {
    res.render('index.pug');
}

function about(req, res) {
    db.collection('team').find().toArray(function(err, team) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            res.render('about.pug', {team});
        }
    });
}

function pageNotFound(req, res) {
    res.status(404).render('not-found.pug');
}

module.exports = {
    index,
    about,
    pageNotFound
};