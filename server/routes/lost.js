const express = require('express')
const db = require('../db/lost')
const router = express.Router()


// router.get('/', (req, res) => {
//   db.getLostAnimals()
//   .then(lost => {
//       res.json(lost)
//   })
//   .catch(err => {
//       res.status(500).send(err.message)
//   })
// })


// router.post('/', (req, res) => {
//   const newLost = req.body

//   db.saveLost(newLost)
//       .then(lostId => {
//           res.send(lostId)
//       })
//       .catch(err => {
//           res.status(500).send(err.message)
//       })
// })

module.exports = router