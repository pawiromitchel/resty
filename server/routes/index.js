const jwtMiddleware = require('../middlewares/jwt');
const usersController = require('../controllers').users;

module.exports = (app) => {
  // user block
  app.route('/users')
    .get(usersController.listAll)
    .post(usersController.create)
    .put(usersController.update);

  app.get('/users/:id', usersController.listOne);

  app.post('/authenticate', usersController.auth)

  app.get('/secret', [jwtMiddleware.getToken, jwtMiddleware.verifyToken], function (req, res) {
    res.send(req.authData);
  });
};
