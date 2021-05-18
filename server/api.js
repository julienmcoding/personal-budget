const apiRouter = require('express').Router();

const enveloppesRouter = require('./enveloppes');
apiRouter.use('/enveloppes', enveloppesRouter);

const transactionsRouter = require('./transactions');
apiRouter.use('/transactions', transactionsRouter);


module.exports = apiRouter;
