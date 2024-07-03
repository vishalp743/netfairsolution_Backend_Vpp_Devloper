const express = require('express');
const Transactions = require('../models/transection');
const router = express.Router();

router.get('/transactions', async (req, res) => {
    try {
        const transactionsData = await Transactions.find({}).populate('userId');
        res.status(200).json({ message: 'Transactions fetched successfully', transactionsData });
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
