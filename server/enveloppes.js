const enveloppesRouter = require('express').Router();
const pool = require('../db/db');

module.exports = enveloppesRouter;

const enveloppes = require('./db');
const { Pool } = require('pg');

    // GET /api/enveloppes to get all enveloppes 
enveloppesRouter.get('/', async (req, res) => {
    try {
        const allEnveloppes = await pool.query('SELECT * FROM enveloppes');
        res.status(200).json(allEnveloppes.rows);
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
        res.status(201).json(newEnveloppe.rows[0]);
    } catch (error) {
        console.error(error.message);
    };
});

    // GET /api/enveloppes/:enveloppeId to get a particular enveloppe
enveloppesRouter.get('/:enveloppeId', async (req, res) => {
    try {
        const { enveloppeId } = req.params;
        const anEnveloppe = await pool.query('SELECT * FROM enveloppes WHERE id = $1', [enveloppeId]);
        res.status(200).json(anEnveloppe.rows[0]);
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
        res.status(200).json(`Enveloppe number ${enveloppeId} has been successfully updated!`);
    } catch (error) {
        console.error(error.message);
    };
});    

    // DELETE /api/enveloppes/:enveloppeId to delete an enveloppe
enveloppesRouter.delete('/:enveloppeId', async (req, res) => {
    try {
        const { enveloppeId } = req.params;
        const deletedEnveloppe = await pool.query('DELETE FROM enveloppes WHERE id = $1', [enveloppeId]);
        res.json(`Enveloppe number ${enveloppeId} has been successfully deleted! `); 
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

