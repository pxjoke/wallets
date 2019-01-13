const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const transactionSchema = new Schema({
    operation: {
        type: String,
        enum: ['income', 'outcome'],
        default: 'outcome'
    },
    date: {
        type: Date,
        default: Date.now
    },
    value: Number,
    comment: String,
    wallet: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Wallet'
    }
});

transactionSchema
    .virtual('dateFormated')
    .get(function () {
        return moment(this.date).format('YYYY-MM-DD');
    });

exports.transactionModel = mongoose.model('Transaction', transactionSchema);