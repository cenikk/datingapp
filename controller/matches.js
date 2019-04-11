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

async function matches(req, res) {

    db.collection('user').find({ 'username': req.session.user.username }).toArray(function(err, data){
        if (err) {
            console.log('An error has occured', err);
        } else {
            var intrest = data[0].interested;
            var films = data[0].movie;
            for (var i = films.length + 1; i >= 0; i--) {
                db.collection('user').find({'gender' : intrest}).toArray(function(err, data) {
                    res.render('matches.pug', {
                        data,
                        user: req.session.user,
                        intrest,
                        films
                    });
                });
            }  

        }
    });
}
module.exports = matches;