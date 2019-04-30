const db = require('../dbConfig');
const tbl = 'zoos';

module.exports = {
  get,
  post,
  put,
  del
}

function get(id) {
  return id
    ? db(tbl).where({id}).first()
    : db(tbl);
}

function post(zoo) {
  return db(tbl).insert(zoo).first();
}

function put(id, changes) {
  return db(tbl).where({id}).update(changes);
}

function del(id) {
  return db(tbl).where({id}).del();
}