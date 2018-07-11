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
          user_name: 'symesharr',
          email_address: 'harrison@devacademy.co.nz',
          contact_details: 'Ring the bell ;)',
          hash: hashSync('Krang', saltRounds)
        }
      ]);
    });
};
