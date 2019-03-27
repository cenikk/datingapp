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

function about(req, res) {
    db.collection('team').find().toArray(function(err, team) {
        if (err) {
            console.log('An error has occured', err);
        } else {
            res.render('about.ejs', {team});
        }
    });
}

module.exports = about;