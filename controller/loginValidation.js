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

function loginValidation(req, res) {
    db.collection('user').find().toArray(function(err, data) {
        for (let i = 0; i < data.length; i++) {
            if (err) {
                console.log('An error has occured', err);
            } else if (req.body.username.toLowerCase() === data[i].username && req.body.password === data[i].password) {
                let id = data[i]._id;
                req.session.user = {
                    id: id,
                    username: req.body.username.toLowerCase(),
                    password: req.body.password,
                    picture: data[i].profilepicture
                };
                res.redirect('/' + id);
            }
        }
    });
}

module.exports = loginValidation;