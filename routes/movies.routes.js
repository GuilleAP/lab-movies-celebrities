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

router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .populate("cast")
        .then((response) => {
            console.log(response)
            res.render('movies/movie-details', {response});
        })
        .catch((err) => {
            next(err);
        });
})

router.get('/movies/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
    .then((movie) => {
        console.log(movie)
        res.render('movies/edit-movie', {movie});
    });
});

router.post('/create-movie', (req, res, next) => {
    Movie.create(req.body)
        .then((response) => {
            console.log(req.body.cast)
            res.redirect('/movies');
        })
        
})

router.post('/movies/:id/delete', (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
    .then((response) => {
        res.redirect('/movies');
    })
    .catch((err) => {
        next(err);
    });
})

module.exports = router;