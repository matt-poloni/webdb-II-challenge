const knex = require('knex');
const router = require('express').Router();
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

router.get('/', (req, res) => {
  res.send('Welcome to the zoos api');
})

module.exports = router;