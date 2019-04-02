function pageNotFound(req, res) {
    res.status(404).render('not-found.pug');
}

module.exports = pageNotFound;