const knex = require('knex');
const router = require('express').Router();
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);
const zoos = db('zoos');

router.get('/', (req, res) => {
  zoos
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not retrieve the zoos data." });
    })
})

router.post('/', (req, res) => {
  if(!req.body.name) {
    return res.status(400).json({ error: "Please include a name for the zoo." })
  }

  zoos
    .insert(req.body)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not create the zoo." })
    })
})

module.exports = router;