const enveloppesRouter = require('express').Router();
const pool = require('../db/db');

module.exports = enveloppesRouter;

const { Pool } = require('pg');

    // GET /api/enveloppes to get all enveloppes 
enveloppesRouter.get('/', async (req, res) => {
    try {
        const allEnveloppes = await pool.query('SELECT * FROM enveloppes');
        if (allEnveloppes.rowCount < 1) {
            return res.status(404).send({
                message: "There are no enveloppes"
            });
        };
        res.status(200).send({
            status: 'Success',
            message: 'Enveloppes information retrieved!',
            data: allEnveloppes.rows,
        });
    } catch (err) {
        console.error(err.message);
    };
});

    // POST /api/enveloppes to create a new enveloppe
enveloppesRouter.post('/', async (req, res) => {
    try {
        const { title, budget } = req.body;
        const newEnveloppe = await pool.query('INSERT INTO enveloppes (title, budget) VALUES ($1, $2) RETURNING *', 
        [title, budget]);
        res.status(201).send({
            status: 'Sucess',
            message: 'New enveloppe created!',
            data: newEnveloppe.rows[0]
        });
    } catch (error) {
        console.error(error.message);
    };
});

    // GET /api/enveloppes/:enveloppeId to get a particular enveloppe
enveloppesRouter.get('/:enveloppeId', async (req, res) => {
    try {
        const { enveloppeId } = req.params;
        const anEnveloppe = await pool.query('SELECT * FROM enveloppes WHERE id = $1', [enveloppeId]);
        if (anEnveloppe.rowCount < 1) {
            return res.status(404).send({
                message: "There is no enveloppe with this id"
            });
        };
        res.status(200).send({
            status: 'Sucess',
            message: 'Enveloppe information retrieved!',
            data: anEnveloppe.rows[0]
        });
    } catch (error) {
        console.error(error.message);
    };
});

    // PUT /api/enveloppes/:enveloppeId to update the amount of an enveloppe, by adding or substracting
enveloppesRouter.put('/:enveloppeId', async (req, res) => {
    try {
        const { enveloppeId } = req.params;
        const { title, budget } = req.body;
        const updatedEnveloppe = await pool.query('UPDATE enveloppes SET title = $1, budget = $2 WHERE id = $3', 
        [title, budget, enveloppeId]);
        res.status(200).send({
            status: 'Sucess',
            message: 'The enveloppe has been updated!',
            data: updatedEnveloppe.rows[0]
        });
    } catch (error) {
        console.error(error.message);
    };
});    

    // DELETE /api/enveloppes/:enveloppeId to delete an enveloppe
enveloppesRouter.delete('/:enveloppeId', async (req, res) => {
    try {
        const { enveloppeId } = req.params;
        const findEnv = await pool.query('SELECT * FROM enveloppes WHERE id = $1', [enveloppeId]);
        if (findEnv.rowCount < 1) {
            return res.status(404).send({
                message: "There is no enveloppe with this id"
            });
        };
        const deletedEnveloppe = await pool.query('DELETE FROM enveloppes WHERE id = $1', [enveloppeId]);
        res.sendStatus(204); 
    } catch (error) {
        console.error(error.message);
    };
});

    // POST /api/envelopes/transfer/:from/:to to transfer budget
enveloppesRouter.post('/transfer/:from/:to', async (req, res) => {
    try {
        const { from, to } = req.params;
        const { amount } = req.body;
        console.log(amount);
        const transferFrom = await pool.query('UPDATE enveloppes SET budget = budget - $1 WHERE id = $2', [amount, from]);
        const transferTo = await pool.query('UPDATE enveloppes SET budget = budget + $1 WHERE id = $2', [amount, to]);
        res.json(`The budget of the enveloppes number ${from} and ${to} have been successfully updated`);
    } catch (error) {
        console.error(error.message);
    };
});    

