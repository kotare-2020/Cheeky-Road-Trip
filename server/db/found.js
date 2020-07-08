const connection = require('./connection')

function getAnimals(db = connection) {
  return db('found').select()
}

module.exports = {
  getAnimals
}