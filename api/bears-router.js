const router = require('express').Router();

const db = require('../data/helpers/bearsModel');
const mw = require('./middleware');

router.get('/', (req, res) => {
  db.get()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not retrieve the bears data." });
    })
});

router.post('/', mw.has('name'), (req, res) => {
  db.post(req.body)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not create the bear." })
    })
});

router.get('/:id', (req, res) => {
  db.get(req.params.id)
    .then(bear => {
      bear
        ? res.status(200).json(bear)
        : res.status(404).json({ error: "The specified ID does not exist in the bears database." })
    })
    .catch(err => {
      res.status(500).json({ error: "Could not retrieved the bear at the specified ID." });
    })
});

router.put('/:id', (req, res) => {
  db.put(req.params.id, req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not update the bear at the specified ID." });
    })
});

router.delete('/:id', (req, res) => {
  db.del(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not delete the bear at the specified ID." });
    })
});

module.exports = router;