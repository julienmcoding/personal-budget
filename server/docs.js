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