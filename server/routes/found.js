const express = require('express')
const db = require('../db/found')
const router = express.Router()

router.get('/found', (req, res) => {
    console.log("here");
    
  db.getFoundAnimals()
      .then(animals => {
          res.send(animals)
      })
      .catch(err => {
          res.status(500).send(err.message)
      })
})

// add a pet to the found animal database
router.post('/', (req, res) => {
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