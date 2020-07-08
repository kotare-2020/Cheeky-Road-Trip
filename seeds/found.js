
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
        species: 'cat',
        photo: 'https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF.jpg',
        user_id: 4},

        {id: 5,
        species: 'cat',
        photo: 'https://vetstreet.brightspotcdn.com/dims4/default/2a5cd80/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F50%2Ff6%2Fc9374cbb4cdb87ab1ef6470ff619%2FMaine-Coon-AP-3OLEOB-645sm3614.jpg',
        user_id: 5},

        {id: 6,
        species: 'cat',
        photo: 'https://www.aspca.org/sites/default/files/cat-care_meowing-and-yowling_main-image.jpg',
        user_id: 6},
      ]);
    });
};
