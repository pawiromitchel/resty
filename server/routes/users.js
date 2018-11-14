
const jwt = require('../middlewares/jwt');
const usersController = require('../controllers').users;

module.exports = (app) => {
  app.route('/users')
    .get([jwt.getToken, jwt.verifyToken], usersController.listAll)
    .post([jwt.getToken, jwt.verifyToken], usersController.create)
    .put([jwt.getToken, jwt.verifyToken], usersController.update);

  app.get('/users/:id', [jwt.getToken, jwt.verifyToken], usersController.listOne);

  app.post('/authenticate', usersController.auth)

  app.get('/secret', [jwt.getToken, jwt.verifyToken], function (req, res) {
    res.send(req.authData);
  });
};
