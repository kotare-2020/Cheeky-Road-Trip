const express = require("express")
const router = express.Router()

const db = require('../db/users')

Router.get("/", (req, res) => {
    db.getAnimals()
        .then((animals) => {
            res.send(animals)
        })
        .catch((err) => {
            res.status(500).send(err.message)
        })
})

module.exports = router