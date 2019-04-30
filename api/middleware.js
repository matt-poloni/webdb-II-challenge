const express = require('express');

module.exports = {
  has,
}

function has(prop) {
  return function(req, res, next) {
    !req.body[prop]
    ? res.status(400).json({ error: `Please provide a ${prop} for the entry you're creating.` })
    : next();
  }
}