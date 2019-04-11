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

function matches(req, res) {
    console.log(req.session.user.username);
    db.collection('user').find({ 'username': req.session.user.username }).toArray(function(err, data){
        if (err) {
            console.log('An error has occured', err);
        } else {
            let interest = data[0].interested;
            let films = data[0].movie;
            for (let i = films.length + 1; i >= 0; i--) {
                db.collection('user').find({'gender' : interest}).toArray(function(err, data) {
                    res.render('matches.pug', {
                        data,
                        user: req.session.user,
                        interest,
                        films
                    });
                });
            }  

        }
    });
}
module.exports = matches;