const express = require('express');

module.exports = {
  hasName,
}

function hasName(req, res, next) {
  !req.body.name
  ? res.status(400).json({ error: 'Please provide a name for the zoo.' })
  : next();
}