const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const router = require("express").Router();

router.get('/movies/create-movie', (req, res, next) => {
    Celebrity.find()
        .then((dbCelebs) => {
            console.log(dbCelebs)
            res.render('movies/new-movie', {dbCelebs});
        })
        .catch((err) => console.log(err));
})

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then((response) => {
            res.render('movies/movies', {response})
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/create-movie', (req, res, next) => {
    Movie.create(req.body)
        .then((response) => {
            console.log(req.body.cast)
            res.redirect('/movies');
        })
        
})

module.exports = router;