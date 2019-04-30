const db = require('../dbConfig');
const tbl = 'bears';

module.exports = {
  tbl,
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

function post(bear) {
  return db(tbl).insert(bear);
}

function put(id, changes) {
  return db(tbl).where({id}).update(changes);
}

function del(id) {
  return db(tbl).where({id}).del();
}