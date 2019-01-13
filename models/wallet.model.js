const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    balance: {
        type: Number,
        default: 0
    },
    transactions: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'}]
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    }
});

exports.walletModel = mongoose.model('Wallet', walletSchema);