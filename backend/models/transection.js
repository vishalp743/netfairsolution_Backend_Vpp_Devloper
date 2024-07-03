const mongoose = require('mongoose');

const transectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

const Transactions = mongoose.model('transactions', transectionSchema);

module.exports = Transactions;
