const db = require('../data/dbConfig');

module.exports = function(tbl) {
  return {
    has: function(prop) {
      return function(req, res, next) {
        !req.body[prop]
          ? res.status(400).json({ error: `Please provide a ${prop} for the entry you're creating.` })
          : next();
      }
    },
    distinct: function(prop) {
      return async function(req, res, next) {
        const val = req.body[prop];
        await db(tbl).where({ [prop]: val }).length
          ? next()
          : res.status(400).json({ error: `There is already an entry in the database with the ${prop} '${val}'. Please provide a distinct ${prop} for the entry you're submitting.` });
      }
    }
  }
}
