
exports.up = function(knex) {
  return knex.schema.createTable("found", (table) => {
      table.increments("id").primary()
      table.string("species")
      table.string("photo")
      table.integer("user_id")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("found")
};
