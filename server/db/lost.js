const connection = require('./connection')

function getLostAnimals (db = connection) {
  return db('lost').select()
}

function saveLost (lost, db = connection) {
  return db('lost')
      .insert({
          name: lost.name,
          species: lost.species,
          photo: lost.photo,
          user_id: lost.user_id
      })
}

module.exports = {
  getLostAnimals,
  saveLost,


}
