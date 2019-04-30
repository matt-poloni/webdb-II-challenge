const db = require('../dbConfig');

module.exports = {
  get,
  post,
  put,
  del
}

function get(id) {
  return id
    ? db('zoos').where({id}).first()
    : db('zoos');
}

function post(zoo) {
  return db('zoos').insert(zoo);
}

function put(id, changes) {
  return db('zoos').where({id}).update(changes);
}

function del(id) {
  return db('zoos').where({id}).del();
}