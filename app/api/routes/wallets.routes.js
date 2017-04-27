module.exports = function(app) {
  const walletsController = require('../controllers/wallets.controller');
  const transactionsController = require('../controllers/transactions.controller');
  app.route('/wallets')
    .get(walletsController.listAll)
    .post(walletsController.create);


  app.route('/wallets/:walletId')
    .get(walletsController.read)
    .put(walletsController.update)
    .delete(walletsController.delete);

  app.route('/wallets/:walletId/transactions')
    .get(transactionsController.listAll)
    .post(transactionsController.create);
};