const router = require('express').Router();

const tbl = 'zoos';
const db = require('../data/helpers/genericModel')(tbl);
const mw = require('./middleware')(tbl);

router.get('/', (req, res) => {
  db.get()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not retrieve the zoos data." });
    })
});

router.post('/', mw.has('name'), mw.distinct('name','zoos'), (req, res) => {
  db.post(req.body)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not create the zoo." })
    })
});

router.get('/:id', (req, res) => {
  db.get(req.params.id)
    .then(zoo => {
      zoo
        ? res.status(200).json(zoo)
        : res.status(404).json({ error: "The specified ID does not exist in the zoos database." })
    })
    .catch(err => {
      res.status(500).json({ error: "Could not retrieved the zoo at the specified ID." });
    })
});

router.put('/:id', mw.distinct('name','zoos'), (req, res) => {
  db.put(req.params.id, req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not update the zoo at the specified ID." });
    })
});

router.delete('/:id', (req, res) => {
  db.del(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not delete the zoo at the specified ID." });
    })
});

module.exports = router;