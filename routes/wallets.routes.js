module.exports = function (app) {
    const walletsController = require('../controllers/wallets.controller');
    const transactionsController = require('../controllers/transactions.controller');
    const usersController = require('../controllers/users.controller');

    app.route('/wallets')
        .get(usersController.checkUser, walletsController.listAll);

    app.route('/wallets/:walletName/new-transaction')
        .get(usersController.checkUser, transactionsController.newTransactionPage)
        .post(usersController.checkUser, transactionsController.create);

    app.route('/new-wallet')
        .get(usersController.checkUser, walletsController.newWalletPage)
        .post(usersController.checkUser, walletsController.create);

    app.route('/wallets/:walletName')
        .get(usersController.checkUser, walletsController.walletPage);

    app.route('/wallets/:walletName/delete')
        .get(usersController.checkUser, walletsController.delete);


};