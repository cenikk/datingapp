require('dotenv').config();
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

function likes(req, res) {
    db.collection('user').find().toArray(function(err, data) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            res.render('likes.pug', {
                data,
                user: req.session.user
            });
        }
    });
}

function addLike(req, res) {
    let id = req.params.id;
    db.collection('user').updateOne( { _id : mongo.ObjectID(id) }, {
        $push: {
            like: {
                data,
                user: req.session.user,
            }
        }
    }, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/' + id);
        }
    });
};


module.exports = {
    addLike,
    likes
};