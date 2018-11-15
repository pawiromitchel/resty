const rolesController = require('../controllers').roles;

module.exports = (app) => {
  app.route('/roles')
    .get(rolesController.listAll)
    .post(rolesController.create)
    .put(rolesController.update)
    .delete(rolesController.destroy);

  app.get('/roles/:id', rolesController.listOne);
};
