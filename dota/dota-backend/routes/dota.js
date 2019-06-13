var express = require('express')
var Dota = require('../controllers/dota')
var router = express.Router()

router.get('/matches', async function(req, res, next){
    await Dota.getMatches()
        .then(data => res.jsonp(data))
        .catch(err => console.log('Error: ' + err))
})

router.get('/match/:id', async function(req, res, next){
    await Dota.getMatch(req.params.id)
        .then(data => res.jsonp(data))
        .catch(err => console.log('Error: ' + err))
})

router.get('/performances/:id', async function(req, res, next){
    await Dota.getPerformances(req.params.id)
        .then(data => res.jsonp(data))
        .catch(err => console.log('Error: ' + err))
})

router.get('/heroes', async function(req, res, next){
    await Dota.getHeroes()
        .then(data => res.jsonp(data))
        .catch(err => console.log('Error: ' + err))
})

router.get('/heroes/:name', async function(req, res, next){
    await Dota.getHero(req.params.name)
        .then(data => res.jsonp(data))
        .catch(err => console.log('Error: ' + err))
})

router.get('/heroes/:name/items', async function(req, res, next){
    await Dota.getHeroItems(req.params.name)
        .then(data => res.jsonp(data))
        .catch(err => console.log('Error: ' + err))
})

router.get('/items', async function(req, res, next){
    await Dota.getItems()
        .then(data => res.jsonp(data))
        .catch(err => console.log('Error: ' + err))
})

router.get('/items/:name', async function(req, res, next){
    await Dota.getItem(req.params.name)
        .then(data => res.jsonp(data))
        .catch(err => console.log('Error: ' + err))
})

module.exports = router