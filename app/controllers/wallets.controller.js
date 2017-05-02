const mongoose = require('mongoose');
const Wallet = mongoose.model('Wallet');
const User = mongoose.model('User');
const Transaction = mongoose.model('Transaction');

exports.listAll = function (req, res) {
    const user = req.user;

    Wallet.find({_user: user._id}, (err, wallets) => {
        if (err) {
            res.redirect('/error');
            return;
        }

        console.log(wallets);

        res.render('wallets', {title: 'Wallets', wallets})
    });
};

exports.newWalletPage = (req, res) => {
    res.render('new-wallet', {wallet: {}});
};

exports.create = function (req, res) {
    const user = req.user;

    User.findOne({_id: user._id}, (err, user) => {

        const walletParams = {
            name: req.body.name,
            balance: req.body.balance,
            _user: user._id
        };

        console.log(walletParams);

        const wallet = new Wallet(walletParams);

        wallet.save((err, wallet) => {
            console.log(err);
            console.log(wallet);
            res.redirect('/wallets');
        });

    });
};

exports.walletPage = function (req, res) {
    const user = req.user;

    Wallet.findById(req.params.walletId, function (err, wallet) {
        if (!wallet) {
            res.redirect('/404');
            return;
        }

        if (!wallet._user.equals(user._id)) {
            res.redirect('/wallets');
            return;
        }

        Transaction.find({wallet: wallet._id}, (err, transactions) => {

            res.render('wallet', {wallet, transactions})
        });

    });
};

