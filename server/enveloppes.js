const enveloppesRouter = require('express').Router();

module.exports = enveloppesRouter;

const {
    enveloppes,
    addEnveloppe,
    getEnveloppeById,
    updateBudget,
    deleteEnveloppe,
    transferEnveloppe
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

    // GET /api/enveloppes to get all enveloppes 
enveloppesRouter.get('/', (req, res) => {
    res.send(enveloppes);
});

    // POST /api/enveloppes to create a new enveloppe
enveloppesRouter.post('/', (req, res) => {
    const title = req.body.title;
    const budget = parseInt(req.body.budget);
    const newEnveloppe = addEnveloppe(title, budget);
    res.status(201).send(newEnveloppe);
});

    // GET /api/enveloppes/:enveloppeId to get a particular enveloppe
enveloppesRouter.get('/:enveloppeId', (req, res, next) => {
    res.send(req.enveloppe);
});

    // POST /api/enveloppes/:enveloppeId to update the amount of an enveloppe, by adding or substracting
enveloppesRouter.post('/:enveloppeId', (req, res, next) => {
    const budget = req.body.budget;
    const updateEnveloppe = updateBudget(req.enveloppe, budget);
    res.send(updateEnveloppe);
});    

    // DELETE /api/enveloppes/:enveloppeId to delete an enveloppe
enveloppesRouter.delete('/:enveloppeId', (req, res, next) => {
    deleteEnveloppe(req.enveloppe);
    res.status(204).send(req.enveloppe);
});

    // POST /api/envelopes/transfer/:from/:to to transfer budget
enveloppesRouter.post('/transfer/:from/:to', (req, res, next) => {
    const from = parseInt(req.params.from);
    const to = parseInt(req.params.to);
    const amount = req.body.amount;
    const transfer = transferEnveloppe(from, amount, to);
    res.status(200).send(transfer);
});    

