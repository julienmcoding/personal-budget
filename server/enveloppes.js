const enveloppesRouter = require('express').Router();

module.exports = enveloppesRouter;

const {
    enveloppes,
    addEnveloppe,
    getEnveloppeById,
    updateBudget,
    deleteEnveloppe,
    getIndexById,
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
    const enveloppe = req.query;
    const newEnveloppe = addEnveloppe(enveloppe);
    res.status(201).send(newEnveloppe);
});

    // GET /api/enveloppes/:enveloppeId to get a particular enveloppe
enveloppesRouter.get('/:enveloppeId', (req, res, next) => {
    res.send(req.enveloppe);
});

    // POST /api/enveloppes/:enveloppeId to update the amount of an enveloppe, by substracting
enveloppesRouter.post('/:enveloppeId', (req, res, next) => {
    const updateEnveloppe = updateBudget(req.enveloppe, req.query);
    res.send(updateEnveloppe);
});    

    // DELETE /api/enveloppes/:enveloppeId to delete an enveloppe
enveloppesRouter.delete('/:enveloppeId', (req, res, next) => {
    //deleteEnveloppe(req.enveloppe);
    //res.status(204).send(req.enveloppe);
    const enveloppeIndex = getIndexById(req.params.id)
    if(enveloppeIndex !== - 1) {
      enveloppes.splice(enveloppeIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).send();
    };
});

    // POST /api/envelopes/transfer/:from/:to to transfer budget
enveloppesRouter.post('/transfer/:from/:amount/:to', (req, res, next) => {
    const from = req.params.from;
    const amount = req.params.amount;
    const to = req.params.to;
    const transfer = transferEnveloppe(from, amount, to);
    res.status(200).send(transfer);
});    