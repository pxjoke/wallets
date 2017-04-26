const mongoose = require('mongoose');
const Wallets = mongoose.model('Wallets');

exports.listAll = function (req, res) {
  Wallets.find({}, function (err, wallets) {
    if (err)
      res.send(err);

    res.json(wallets);
  });
};

exports.create = function (req, res) {
  const wallet = new Wallets(req.body);
  wallet.save(function (err, task) {
    if (err)
      res.send(err);

    res.json(task);
  });
};

exports.read = function (req, res) {
  Wallets.findById(req.params.id, function (err, task) {
    if (err)
      res.send(err);

    res.json(task);
  });
};

exports.update = function (req, res) {
  Wallets.findOneAndUpdate(req.params.id, req.body, {new: true}, function (err, task) {
    if (err)
      res.send(err);

    res.json(task);
  });
};

exports.delete = function (req, res) {
  Wallets.remove({_id: req.params.id}, function (err, task) {
    if (err)
      res.send(err);

    res.json({message: 'Wallet successfully deleted'});
  });
};