const {hashSync} = require('bcrypt')
const saltRounds = 10

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          user_name: 'admin',
          email_address: 'hello@devacademy.co.nz',
          contact_details: 'Ring the bell ;)',
          hash: hashSync('admin', saltRounds)
        }
      ])
    })
}
