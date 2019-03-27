function logout(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log("An error has occured", err);
        } else {
            res.redirect('/');
        }
    });
}

module.exports = logout;