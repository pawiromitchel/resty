
const jwt = require('../middlewares/jwt');
const rolesController = require('../controllers').roles;

module.exports = (app) => {
  app.route('/roles')
    .get([jwt.getToken, jwt.verifyToken], rolesController.listAll)
    .post([jwt.getToken, jwt.verifyToken], rolesController.create)
    .put([jwt.getToken, jwt.verifyToken], rolesController.update)
    .delete([jwt.getToken, jwt.verifyToken], rolesController.destroy);

  app.get('/roles/:id', [jwt.getToken, jwt.verifyToken], rolesController.listOne);
};
