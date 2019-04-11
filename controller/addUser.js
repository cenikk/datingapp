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

module.exports = addUser;