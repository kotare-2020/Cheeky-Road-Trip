
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('lost').del()
    .then(function () {
      // Inserts seed entries
      return knex('lost').insert([
        {id: 1,  
        name: 'Harriet',
        species: 'Bull Terrier',
        photo: 'https://animals.net/wp-content/uploads/2018/07/Bull-Terrier-7-650x425.jpg',
        user_id: null,},
    
        {id: 2,
        name: 'Beans',
        species: 'Dalmatian',
        photo: 'https://thehappypuppysite.com/wp-content/uploads/2019/01/Dalmatian-Temperament-long.jpg',
        user_id: null,},

        {id: 2,
        name: 'Jarrod',
        species: 'Dachshund',
        photo: 'https://thehappypuppysite.com/wp-content/uploads/2018/12/fat-dachshund-long.jpg',
        user_id: null,},

        {id: 2,
        name: 'Cathy',
        species: 'Irish Wolfhound',
        photo: 'https://i.pinimg.com/originals/c9/9e/d7/c99ed77cb513a292e64dad5c2a966c5b.jpg',
        user_id: null,},
        
      ]);
    });
};
