const knex = require('knex')
const db = knex(require('../knexfile').development)

module.exports = {
    register,
    login,
    list
}

function register(user) {
    return db('users')
    .insert(user, 'id')
}

function login(user){
    return db('users')
    .select('*')
    .where({username:user.username})
    .first()
}

function list(department) {
    return db('users')
    .select('*')
    .where({department})
}

// function findById(id) {

//     db('users')
//     .select('*')
//     .where({id})
//     .first()
// }