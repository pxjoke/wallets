const mongoose = require('mongoose');
const Wallet = mongoose.model('Wallet');

exports.listAll = function (req, res) {
  Wallet.find({}, function (err, wallets) {
    if (err)
      return res.send(err);

    res.json(wallets);
  });
};

exports.create = function (req, res) {
  const wallet = new Wallet(req.body);
  wallet.save(function (err, wallet) {
    console.log('wallet', wallet);
    if (err) {
      return res.send(err);
    }
    res.json(wallet);
  });
};

exports.read = function (req, res) {
  Wallet.findById(req.params.walletId, function (err, task) {
    if (err)
      return res.send(err);

    res.json(task);
  });
};

exports.update = function (req, res) {
  Wallet.findOneAndUpdate(req.params.walletId, req.body, {new: true}, function (err, task) {
    if (err)
      return res.send(err);

    res.json(task);
  });
};

exports.delete = function (req, res) {
  Wallet.remove({_id: req.params.walletId}, function (err, task) {
    if (err)
      return res.send(err);

    res.json({message: 'Wallet successfully deleted'});
  });
};