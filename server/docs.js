<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const swagger = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Portofolio Budget',
            version: '1.0.0',
            description: 'Simple REST API to manage budget, built with Node, Express, Postgresql.',
            license: {
                name: 'MIT',
                url: 'https://choosealicense.com/licenses/mit/',
            },
        },
    },
    apis: ['./routesEnveloppe.js', './routesTransactions.js'],
};

const specs = swagger(swaggerOptions);

router.use('/', swaggerUi.serve);
router.get(
    '/',
    swaggerUi.setup(specs, {
        explorer: true,
    })
);

module.exports = router;
=======
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const docsRouter = require('express').Router();

module.exports = docsRouter;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Personal-budget',
        version: '1.0.0',
        description: 'Small API to manage budget, build with Express, Node.js & Postgresql',
        license: {
            name: 'License MIT',
            url: 'https://spdx.org/licenses/MIT.html'
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./server/routeEnveloppes.js', './server/routeTransactions.js'],
};

const swaggerSpec = swaggerJSDoc(options);

docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
>>>>>>> goodwork
