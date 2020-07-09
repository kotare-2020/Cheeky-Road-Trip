
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('found').del()
    .then(function () {
      // Inserts seed entries
      return knex('found').insert([
        {id: 1,
        species: 'dog',
        photo: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg',
        user_id: 1},

        {id: 2,
        species: 'dog',
        photo: 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_1005/master/969.jpg?width=300&quality=85&auto=format&fit=max&s=26fe0a6479a2b57e12f31c39e6b1c1ef',
        user_id: 2},

        {id: 3,
        species: 'dog',
        photo: 'https://www.aaha.org/contentassets/3c00345bcc2d430b9f471734e8417d75/2019-6-6-istock-460588321-osu-mean-dog-blog.jpg',
        user_id: 3},

        {id: 4,
        species: 'dog',
        photo: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/german-shepherd-dog-1557314959.jpg?crop=0.615xw:1.00xh;0.197xw,0&resize=480:*',
        user_id: 4},
  
        {id: 5,
        species: 'dog',
        photo: 'https://resize.hswstatic.com/w_907/gif/dogs-embarrassed.jpg',
        user_id: 5},
  
        {id: 6,
        species: 'dog',
        photo: 'https://scx1.b-cdn.net/csz/news/800/2019/2-dog.jpg',
        user_id: 6},

        {id: 7,
        species: 'cat',
        photo: 'https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF.jpg',
        user_id: 7},

        {id: 8,
        species: 'cat',
        photo: 'https://vetstreet.brightspotcdn.com/dims4/default/2a5cd80/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F50%2Ff6%2Fc9374cbb4cdb87ab1ef6470ff619%2FMaine-Coon-AP-3OLEOB-645sm3614.jpg',
        user_id: 8},

        {id: 9,
        species: 'cat',
        photo: 'https://www.aspca.org/sites/default/files/cat-care_meowing-and-yowling_main-image.jpg',
        user_id: 9},

        {id: 10,
        species: 'cat',
        photo: 'https://i.dailymail.co.uk/i/pix/2016/11/05/19/3A18DF3100000578-0-image-m-84_1478375432230.jpg',
        user_id: 10},
  
        {id: 11,
        species: 'cat',
        photo: 'https://media14.s-nbcnews.com/j/MSNBC/Components/Video/201905/tdy_news_grumpy_cat_190517_1920x1080.focal-760x428.jpg',
        user_id: 11},
  
        {id: 12,
        species: 'cat',
        photo: 'https://i.insider.com/549489a1ecad042f60718e6b?width=1100&format=jpeg&auto=webp',
        user_id: 12},
      ]);
    });
};
