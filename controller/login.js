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

function login(req, res) {
    res.render('login.pug');
}

function wrongCredentials(req, res) {
    res.render('wrongCredentials.pug');
}

function loginValidation(req, res) {
    let username = req.body.username.toLowerCase();
    let password = req.body.password;
    db.collection('user').findOne({
        username: username,
        password: password
    }, done);
    
    function done(err, data) {
        if(err) {
            res.json(err);
        }
        if (data) {
            let id = data._id;
            req.session.user = {
                id: id,
                username: req.body.username.toLowerCase(),
                password: req.body.password,
                picture: data.profilepicture
            };
            res.redirect('/' + id);
        } 
        else {
            res.redirect('/login/error');
        }
    }
}

function redirectLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = {
    login,
    wrongCredentials,
    loginValidation,
    redirectLogin
};