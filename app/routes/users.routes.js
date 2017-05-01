module.exports = function(app) {
  const usersController = require('../controllers/users.controller');
  app.route('/users')
    .post(usersController.create);

  app.route('/login')
    .post(usersController.login);

  app.route('/logout')
    .post(usersController.logout)
};