const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();


router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((response) => {
        console.log(response);
        res.render('celebrities/celebrities', {response});
        })
        .catch((err) => {
        next(err);
        })
});

router.post('/create', (req, res, next) => {
    Celebrity.create(req.body)
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch((err) => {
            console.log(err)
            res.redirect('/create');
        })
})



module.exports = router;