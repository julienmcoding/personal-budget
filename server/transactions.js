const transactionsRouter = require('express').Router();
const pool = require('../db/db');

module.exports = transactionsRouter;


const { Pool } = require('pg');


    // GET /api/transactions to get all transactions
transactionsRouter.get('/', async (req, res) => {
    try {
        const allTransactions = await pool.query('SELECT * FROM transactions');
        res.status(200).json(allTransactions.rows);
    } catch (err) {
        console.error(err.message);
    };
});

    // POST /api/transactions to create a new transaction
transactionsRouter.post('/', async (req, res) => {
    try {
        const { date, description, payment_amount, enveloppe_id } = req.body;
        const newTransaction = await pool.query('INSERT INTO transactions (date, description, payment_amount, enveloppe_id) VALUES ($1, $2, $3, $4) RETURNING *', 
        [date, description, payment_amount, enveloppe_id]);
        const updatingEnveloppe = await pool.query('UPDATE enveloppes SET budget = budget - $1 where id = $2',
        [payment_amount, enveloppe_id]);
        res.status(201).json(newTransaction.rows[0]);
    } catch (error) {
        console.error(error.message);
    };
});

    // GET /api/transactions/:transactionId to get a particular transaction
transactionsRouter.get('/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params;
        const transaction = await pool.query('SELECT * FROM transactions WHERE id = $1', [transactionId]);
        res.status(200).json(transaction.rows[0]);
    } catch (error) {
        console.error(error.message);
    };
});  

    // DELETE /api/transactions/:transactionId to delete an transaction
transactionsRouter.delete('/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params;
        const deletedTransaction = await pool.query('DELETE FROM transactions WHERE id = $1', [transactionId]);
        res.json(`Transaction number ${transactionId} has been successfully deleted! `); 
    } catch (error) {
        console.error(error.message);
    };
});   

