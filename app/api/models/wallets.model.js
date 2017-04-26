const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WalletSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the wallet'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  balance: {
    type: {
      type: Number
    }
  }
});

module.exports = mongoose.model('Wallets', WalletSchema);