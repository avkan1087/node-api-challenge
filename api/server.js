const express = require('express');
const helmet = require('helmet');

const projectRouter = require('../projects/projectRouter');
const actionRouter = require('../projects/actionRouter');


const server = express();

function logger(req, res, next) {
    console.log(`${req.method} to ${req.originalUrl} at ${new Date().toISOString()}`);
    next();
}


server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send(`Welcome from server.js`);
});




module.exports = server;