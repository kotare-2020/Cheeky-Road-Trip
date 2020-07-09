const knex = require("knex")
const config = require("../../knexfile")
const env = process.env.NODE_ENV || "development"
const connection = knex(config[env])

module.exports ={
  getFoundAnimals 
}


function getFoundAnimals(db = connection) {
  return db('found').select()
}


