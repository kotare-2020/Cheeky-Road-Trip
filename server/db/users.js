const {generatePasswordHash} = require('../auth/hash')

const connection = require('./connection')

function createUser (username, email_address, contact_details, password, db = connection) {
  return generatePasswordHash(password)
    .then(hash => {
      return db('users').insert({username, email_address, contact_details, hash})
    })
}

function userExists (username, db = connection) {
  return db('users')
    .where('username', username)
    .then(users => users.length > 0)
}

function getUserByUsername (username, db = connection) {
  return db('users')
    .where('username', username)
    .first()
}

module.exports = {
  createUser,
  userExists,
  getUserByUsername
}
