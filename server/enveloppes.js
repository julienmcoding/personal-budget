const enveloppesRouter = require('express').Router();

module.exports = enveloppesRouter;

const {
    enveloppes,
    addEnveloppe,
    getEnveloppeById
} = require('./db');

enveloppesRouter.param('enveloppeId', (req, res, next, id) => {
    const enveloppe = getEnveloppeById(id);
    if(enveloppe) {
        req.enveloppe = enveloppe;
        next();
    } else {
        res.status(404).send('This id doesn\'t exist');
    };
});

enveloppesRouter.get('/', (req, res) => {
    res.send(enveloppes);
});

enveloppesRouter.post('/', (req, res) => {
    const enveloppe = req.query;
    const newEnveloppe = addEnveloppe(enveloppe);
    res.status(201).send(newEnveloppe);
});

enveloppesRouter.get('/:enveloppeId', (req, res, next) => {
    res.send(req.enveloppe);
});