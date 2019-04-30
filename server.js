const express = require('express');
const helmet = require('helmet');

const zoosRouter = require('./api/zoos-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/zoos/', zoosRouter);

server.use('/', (req, res) => {
  res.send("Use the '/api/zoos' endpoint")
});

module.exports = server;
