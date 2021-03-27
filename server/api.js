const apiRouter = require('express').Router();

const enveloppesRouter = require('./enveloppes');
apiRouter.use('/enveloppes', enveloppesRouter);


module.exports = apiRouter;
