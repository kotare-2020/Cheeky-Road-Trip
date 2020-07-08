const express = require('express')
const db = require('../db/found')
const router = express.Router()

router.get('/', (req, res) => {
    db.getFound()
     .then(found => {
        res.send(found)
      })
      .catch(err => {
        res.status(500).send(err.message)
      })
  })