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

router.get('/:id', (req, res) => {
  zoos
    .where({ id: req.params.id })
    .first()
    .then(zoo => {
      zoo
        ? res.status(200).json(zoo)
        : res.status(404).json({ error: "The specified ID does not exist in the zoos database." })
    })
    .catch(err => {
      res.status(500).json({ error: "Could not retrieved the zoo at the specified ID." });
    })
});

module.exports = router;