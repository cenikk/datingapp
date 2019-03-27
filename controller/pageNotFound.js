function pageNotFound(req, res) {
    res.status(404).render('not-found.ejs');
}

module.exports = pageNotFound;