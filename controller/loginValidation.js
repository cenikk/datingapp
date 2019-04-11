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
        console.log('Failed to connect', err);
    } else {
        db = client.db(process.env.DB_NAME);
    }
});  

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
                username: req.body.username,
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

module.exports = loginValidation;

