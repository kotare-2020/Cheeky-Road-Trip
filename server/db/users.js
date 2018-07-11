var hash = require('../auth/hash')

const db = require('./connection')

function createUser (user_name, contact_details, email_address, password) {
  return new Promise ((resolve, reject) => {
    hash.generate(password, (err, hash) => {
      if (err) reject(err)
      db('users')
        .insert({user_name, contact_details, email_address, hash})
        .then(user_id => resolve(user_id))
        .catch(err => reject(err))
    })
  })
}
function userExists (user_name) {
  return db('users')
    .where('user_name', user_name)
    .first()
    .then(user => !!user)
}

function getUserByName (user_name) {
  return db('users')
    .where('user_name', user_name)
    .first()
}

module.exports = {
  createUser,
  userExists,
  getUserByName
}
