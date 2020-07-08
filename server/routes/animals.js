const express = require('express')
const db = require('../db/connection')
const router = express.Router()


router.get('/', (req, res) => {
    db.getAnimals()
        .then(animals => {
            res.send(animals)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
})

//add a pet to lost animal database
router.post('/lost', (req, res) => {
    const newLost = req.body

    db.saveLost(newLost)
        .then(lostId => {
            res.send(lostId)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
})

// add a pet to the found animal database
router.post('/found', (req, res) => {
    const newFound = req.body

    db.saveFound(newFound)
        .then(lostId => {
            res.send(lostId)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
})

module.exports = router