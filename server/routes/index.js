const usersController = require('../controllers').users;

module.exports = (app) => {
  // user block
  app.route('/users')
    .get(usersController.listAll)
    .post(usersController.create)
    .put(usersController.update);

  app.get('/users/:id', usersController.listOne);
};
