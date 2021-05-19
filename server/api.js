const apiRouter = require('express').Router();

const enveloppesRouter = require('./enveloppes');
apiRouter.use('/enveloppes', enveloppesRouter);

const transactionsRouter = require('./transactions');
apiRouter.use('/transactions', transactionsRouter);

const docsRouter = require('./docs');
<<<<<<< HEAD
apiRouter.use('/api-docs', docsRouter);
=======
apiRouter.use('/docs', docsRouter);
>>>>>>> goodwork


module.exports = apiRouter;
