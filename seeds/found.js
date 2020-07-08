
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('found').del()
    .then(function () {
      // Inserts seed entries
      return knex('found').insert([
        {id: 1, species: 'dog', photo: '', user_id: 1},
        {id: 2, species: 'dog', photo: '', user_id: 2},
        {id: 3, species: 'dog', photo: '', user_id: 3},
        {id: 4, species: 'dog', photo: '', user_id: 4},
        {id: 5, species: 'dog', photo: '', user_id: 5},
        {id: 6, species: 'dog', photo: '', user_id: 6},
      ]);
    });
};
