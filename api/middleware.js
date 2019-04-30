const express = require('express');
const db = require('../data/dbConfig');

module.exports = {
  has,
  distinct,
}

function has(prop) {
  return function(req, res, next) {
    !req.body[prop]
      ? res.status(400).json({ error: `Please provide a ${prop} for the entry you're creating.` })
      : next();
  }
}

function distinct(prop,tbl) {
  return async function(req, res, next) {
    await db(tbl).where({ [prop]: req.body[prop] }).length
      ? next()
      : res.status(400).json({ error: `There is already an entry in the database with the ${prop} '${req.body[prop]}'. Please provide a distinct ${prop} for the entry you're submitting.` });
  }
}