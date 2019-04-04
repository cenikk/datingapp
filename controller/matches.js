const mongo = require('mongodb');
let db = {
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    cluster: process.env.DB_CLUSTER,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
};
const url = `mongodb+srv://${db.username}:${db.password}@${db.cluster}-${db.host}/${db.name}`;

mongo.MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log("Failed to connect", err);
    } else {
        db = client.db(process.env.DB_NAME);
    }
});  

function matches(req, res) {
    // let matches = [];
    db.collection('user').find({ 'username': req.session.user.username }).toArray(function(err, data){
        if (err) {
            console.log('An error has occured', err);
        } else {
            var intrest = data[0].interested;
            var films = data[0].movie;
            // for (var i = films.length - 1; i >= 0; i--) {
            //     db.collection('user').find({'gender' : intrest ,'movie.${i}.title': films[i].title).toArray(function(err, data) {
            //         if (err) {
            //             console.log('An error has occured', err);
            //         } else {
            //             // console.log(data);
            //             matches.concat(data);
            //         }
            //     });
            // }
            db.collection('user').find({'gender' : intrest}).toArray(function(err, data) {
                res.render('matches.pug', {
                    data,
                    user: req.session.user,
                    intrest,
                    films
                });
            });
        }
    });

}

module.exports = matches;