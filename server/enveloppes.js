const enveloppesRouter = require('express').Router();
const pool = require('../db/db');

module.exports = enveloppesRouter;

const { Pool } = require('pg');

//@info get all enveloppes
//@route GET /api/enveloppes
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

//@info create a new enveloppe
//@route POST /api/enveloppes
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

//@info get a specific enveloppe
//@route GET /api/enveloppes/:enveloppeId
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

//@info to update the budget of an enveloppe, by adding or substracting
//@route PUT /api/enveloppes/:enveloppeId
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

//@info to delete an enveloppe
//@route DELETE /api/enveloppes/:enveloppeId
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

//@info to transfer a budget from a specific enveloppe to another one
//@route POST /api/envelopes/transfer/:from/:to
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

