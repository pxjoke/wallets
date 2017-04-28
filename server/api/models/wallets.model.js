const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  comment: String
});

const walletSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the wallet'
  },
  date: {
    type: Date,
    default: Date.now
  },
  balance: {
    type:Number
  },
  transactions: {
    type: [transactionSchema]
  }
});


exports.transactionModel = mongoose.model('Transaction', transactionSchema);
exports.walletModel = mongoose.model('Wallet', walletSchema);