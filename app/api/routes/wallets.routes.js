module.exports = function(app) {
  const walletsController = require('../controllers/wallets.controller');

  app.route('/wallets')
    .get(walletsController.listAll)
    .post(walletsController.create);


  app.route('/wallets/:id')
    .get(walletsController.read)
    .put(walletsController.update)
    .delete(walletsController.delete);
};