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

module.exports = router