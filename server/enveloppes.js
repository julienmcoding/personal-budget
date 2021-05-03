const enveloppesRouter = require('express').Router();

module.exports = enveloppesRouter;

const {
    enveloppes
} = require('./db');

enveloppesRouter.get('/', (req, res) => {
    res.send(enveloppes);
})