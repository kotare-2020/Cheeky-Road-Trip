const { generateHash } = require('authenticare/server')


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all(
        [
          {
            id: 1,
            username: 'admin',
            password: 'Krang',
            email_address: 'hello@devacademy.co.nz',
            contact_details: 'Ring the bell ;)',
          },
          {
            id: 2,
            username: 'wholesomewoof',
            password: 'woof123',
            email_address: 'wholesomewoof@yahoo.com',
            contact_details: '04 2548798',
          },
          {
            id: 3,
            username: 'pawspurrs',
            password: 'paws321',
            email_address: 'pawspurrs@xtra.co.nz',
            contact_details: '027 1234567',
          }, 
          {
            id: 4,
            username: 'cutiepurr',
            password: 'password123',
            email_address: 'cutiepurr95@gmail.com',
            contact_details: '021 3339876',
          }, 
          {
            id: 5,
            username: 'theHamsterMan',
            password: 'hamsterman4ever',
            email_address: 'hamsterman@yahoo.com',
            contact_details: 'Currently in Amsterdam',
          }, 
          {
            id: 6,
            username: 'P.Sherman',
            password: 'Nemo',
            email_address: 'sherman@.qualitydental.co.au',
            contact_details: '42 Wallaby Way Sydney',
          },          
        ].map(user => {
          return generateHash(user.password)
            .then(hash => {
              user.hash = hash
              delete user.password
              return user
            })
        }))
        .then(users => {
          return knex('users').insert(users)
        })
    })
}
