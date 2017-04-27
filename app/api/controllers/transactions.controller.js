const mongoose = require('mongoose');
const Wallet = mongoose.model('Wallet');
const Transaction = mongoose.model('Transaction');


exports.listAll = function (req, res) {
  Wallet
    .findById(req.params.walletId, (err, wallet) => {
      if (err)
        return res.send(err);

      res.json(wallet.transactions);
    });
};

exports.create = function (req, res) {
  Wallet
    .findById(req.params.walletId, (err, wallet) => {
      if (err)
        return res.send(err);

      const transaction = new Transaction(req.body);

      if (transaction.operation === 'income') {
        wallet.balance += transaction.value;
      }

      if (transaction.operation === 'outcome') {
        wallet.balance -= transaction.value;
      }

      wallet.transactions.push(transaction);

      wallet.save((err) => {
        if (err)
          res.send(err);

        res.json(transaction);
      });

    });
};