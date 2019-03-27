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

function remove(req, res) {
    let id = req.params.id;
    db.collection('user').deleteOne({
        _id: mongo.ObjectID(id)
    }, function (err){
        if (err) {
            console.log("An error has occured", err);
        } else {
            res.json({status: 'ok'});
        }
    });
}

module.exports = remove;