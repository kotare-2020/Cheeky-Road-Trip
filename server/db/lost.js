const connection = require('./connection')

function getLostAnimals (db = connection) {
  return db('lost').select()
}

module.exports = {

}
