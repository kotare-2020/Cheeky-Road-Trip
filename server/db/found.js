const knex = require("knex")
const config = require("../../knexfile")
const env = process.env.NODE_ENV || "development"
const connection = knex(config[env])

module.exports ={
  saveFound,
  getFoundAnimals 
}


function getFoundAnimals(db = connection) {
  return db('found').select()
}

  function saveFound (newFound , db = connection) {
    return db ('found')
    .insert ({
        species: newFound.species,
        photo: newFound.species,
        user_id: newFound.user_id
    })
}


