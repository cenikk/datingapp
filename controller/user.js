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

function addUser(req, res) {
    db.collection('user').insertOne({
        username: req.body.username.toLowerCase(),
        password: req.body.password,
        gender: req.body.gender,
        birthday: req.body.day,
        birthmonth: req.body.month,
        birthyear: req.body.year,
        country: req.body.country,
        city: req.body.city,
        zipcode: req.body.zipcode,
        zipcodeletters: req.body.zipcodelet,
        profilepicture: req.file ? req.file.filename : null,
        movie: []
    }, function(err, data) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            req.session.user = {
                id: data.insertedId,
                username: req.body.username,
                password: req.body.password,
                picture: req.file.filename
            };
            // console.log(req.session.user);
            res.redirect('/' + data.insertedId);
        }
    });
}

function profile(req, res) {
    let id = req.params.id;
    db.collection('user').findOne({
        _id: mongo.ObjectID(id)
    }, function(err, data) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            res.render('profile.pug', {
                data,
                user: req.session.user
            });
        }
    });
}

function remove(req, res) {
    let id = req.params.id;
    db.collection('user').deleteOne({
        _id: mongo.ObjectID(id)
    }, function (err){
        if (err) {
            console.log('An error has occured', err);
        } else {
            res.json({status: 'ok'});
        }
    });
}


// Eerdere poging om users te laten matchen
// function matches(req, res) {
//     db.collection('user').find({ 'username': req.session.user.username }).toArray(function(err, data){
//         if (err) {
//             console.log('An error has occured', err);
//         } else {
//             let interest = data[0].interested;
//             let films = data[0].movie;
//             // for (var i = films.length - 1; i >= 0; i--) {
//             //     db.collection('user').find({'gender' : intrest ,'movie.${i}.title': films[i].title).toArray(function(err, data) {
//             //         if (err) {
//             //             console.log('An error has occured', err);
//             //         } else {
//             //             // console.log(data);
//             //             matches.concat(data);
//             //         }
//             //     });
//             // }
//             db.collection('user').find({'gender' : interest}).toArray(function(err, data) {
//                 res.render('matches.pug', {
//                     data,
//                     user: req.session.user,
//                     interest,
//                     films
//                 });
//             });
//         }
//     });
// }


// Door het gebruik van $in lukte het op halen van matches wel
async function matches(req, res) {
    db.collection('user').find({ 'username': req.session.user.username }).toArray(function(err, data){
        if (err) {
            console.log('An error has occured', err);
        } else {
            let interest = data[0].interested;
            let movies = data[0].movie;
            
            db.collection('user').find({
                gender: interest,
                movie: { $in : movies}
            }).toArray(function(err, data) {
                res.render('matches.pug', {
                    data,
                    user: req.session.user,
                    interest,
                    movies
                });
            });
        }
    });
}

function logout(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            res.redirect('/');
        }
    });
}

module.exports = {
    addUser,
    profile,
    remove,
    matches,
    logout
};