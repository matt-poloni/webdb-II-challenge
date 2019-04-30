const knex = require('knex');
const router = require('express').Router();
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);
const q = db('zoos');

router.get('/', (req, res) => {
  q.then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => {
    res.status(500).json({ error: "Could not retrieve the zoos data." });
  })
})

module.exports = router;