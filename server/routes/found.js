const express = require('express')
const db = require('../db/found')
const router = express.Router()

router.get('/found', (req, res) => {
  db.getFoundAnimals()
      .then(animals => {
          res.send(animals)
      })
      .catch(err => {
          res.status(500).send(err.message)
      })
})




module.exports = router