require('dotenv').config();
const axios = require('axios');
const slugify = require('slugify');
const mongo = require('mongodb');
let db =require('../models/db.js');
const url = `mongodb+srv://${db.username}:${db.password}@${db.cluster}-${db.host}/${db.name}`;

mongo.MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log('Failed to connect', err);
    } else {
        db = client.db(process.env.DB_NAME);
    }
});  

function addMovie(req, res) {
    let id = req.params.id;
    let movieId = slugify(req.body.movie).toLowerCase();
    let api = 'http://www.omdbapi.com/?t=' + movieId + '&apikey=' + process.env.API_KEY;

    axios.get(api)
        .then(function(resp) {
            db.collection('user').updateOne( { _id : mongo.ObjectID(id) }, {
                $push: {
                    movie: {
                        id: req.body.movie,
                        title: resp.data.Title,
                        poster: resp.data.Poster,
                    }
                }
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/' + id);
                }
            });
        });
}

module.exports = addMovie;