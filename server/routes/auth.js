const router = require('express').Router()

const { userExists, createUser } = require('../db/users')
const token = require('../auth/token')

router.post('/register', register, token.issue)

function register (req, res, next) {
  const { user_name, email_address, contact_details, password } = req.body
  userExists(user_name)
    .then(exists => {
      if (exists) return res.status(400).send({ message: "User Name Taken" })

      createUser(user_name, email_address, contact_details, password)
        .then(() => next())
        .catch(err => res.status(500).send({message: "Server Error"}))
    })
    .catch(err => res.status(500).send({message: "Server Error"}))
}

router.post('/login', token.issue)

module.exports = router
