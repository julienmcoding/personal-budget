const transactionsRouter = require('express').Router();
const pool = require('../db/db');

module.exports = transactionsRouter;


const { Pool } = require('pg');

//@info get all transactions
//@route GET /api/transactions
transactionsRouter.get('/', async (req, res) => {
    try {
        const allTransactions = await pool.query('SELECT * FROM transactions');
        if (allTransactions.rowCount < 1) {
            return res.status(404).send({
                message: "There are no transactions"
            });
        };
        res.status(200).send({
            status: 'Success',
            message: 'Transaction information retrieved!',
            data: allTransactions.rows,
        });
    } catch (err) {
        console.error(err.message);
    };
});

//@info to create a new transaction, which will impact the budget of a specific enveloppe
//@route POST /api/transactions
transactionsRouter.post('/', async (req, res) => {
    try {
        const { description, payment_amount, enveloppe_id } = req.body;
        const date = new Date();
        await pool.query('BEGIN');
        const enveloppe = await pool.query('SELECT * FROM enveloppes WHERE id = $1', [enveloppe_id]);
        if (enveloppe.rowCount < 1) {
            return res.status(404).send({
                message: "There is no enveloppe with this id."
            });
        };
        const newTransaction = await pool.query('INSERT INTO transactions (date, description, payment_amount, enveloppe_id) VALUES ($1, $2, $3, $4) RETURNING *', 
        [date, description, payment_amount, enveloppe_id]);
        const updatingEnveloppe = await pool.query('UPDATE enveloppes SET budget = budget - $1 where id = $2 RETURNING *',
        [payment_amount, enveloppe_id]);
        await pool.query('COMMIT');
        res.status(201).send({
            status: 'Sucess',
            message: 'New transaction created!',
            data: newTransaction.rows[0]
        });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
    };
});

//@info to get a specific transaction
//@route GET /api/transactions/:transactionId
transactionsRouter.get('/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params;
        const transaction = await pool.query('SELECT * FROM transactions WHERE id = $1', [transactionId]);
        if (transaction.rowCount < 1) {
            return res.status(404).send({
                message: "There is no transaction with this id"
            });
        };
        res.status(200).send({
            status: 'Sucess',
            message: 'Transaction information retrieved!',
            data: transaction.rows[0]
        });
    } catch (error) {
        console.error(error.message);
    };
});  

//@info to update the amount of an transaction, and updating the enveloppes
//@route PUT /api/transactions/:transactionId
transactionsRouter.put('/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { description, payment_amount } = req.body;
        await pool.query('BEGIN');
        const transaction = await pool.query('SELECT * FROM transactions WHERE id = $1', [transactionId]);
        if (transaction.rowCount < 1) {
            return res.status(404).send({
                message: 'There is no transaction with this id.'
            });
        };
        const prevAmount = await pool.query('SELECT payment_amount FROM transactions WHERE id = $1', [transactionId]);
        await pool.query('UPDATE enveloppes SET budget = (budget + $1) - $2 WHERE id in (SELECT enveloppe_id FROM transactions WHERE id = $3', 
        [prevAmount.rows[0], payment_amount, transactionId]);

        const updatedTransaction = await pool.query('UPDATE transactions SET description = $1, payment_amount = $2 WHERE id = $3', 
        [description, payment_amount, transactionId]);
        await pool.query('COMMIT');
        res.status(200).send({
            status: 'Sucess',
            message: 'The transaction has been updated!',
            data: updatedTransaction.rows[0]
        });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error.message);
    };
});  

//@info to delete a transaction
//@route DELETE /api/transactions/:transactionId
transactionsRouter.delete('/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params;
        const deletedTransaction = await pool.query('DELETE FROM transactions WHERE id = $1', [transactionId]);
        res.json(`Transaction number ${transactionId} has been successfully deleted! `); 
    } catch (error) {
        console.error(error.message);
    };
});   

