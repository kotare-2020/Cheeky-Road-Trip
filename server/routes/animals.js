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




module.exports = router