
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
      tbl.increments()
      tbl.string('username', 32).unique().notNullable()
      tbl.string('password',32).notNullable()
      tbl.string('department').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
};
