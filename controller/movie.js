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

function movie(req, res) {
    db.collection('user').find().toArray(function(err, data) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            res.render('movie.pug', {
                data,
                user: req.session.user
            });
        }
    });
}

module.exports = movie;