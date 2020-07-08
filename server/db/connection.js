const knex = require('knex')
const config = require('../../knexfile')
const env = process.env.NODE_ENV || 'development'
const connection = knex(config[env])

function getAnimals(db = connection) {
    return db('found').select()
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
    getAnimals,
    saveLost
}
