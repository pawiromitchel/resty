const jwt = require('jsonwebtoken');
const jwtMiddleware = require('../middlewares/jwt');
const SecretKey = require("../config/jwt.json").secretKey;

const usersController = require('../controllers').users;

module.exports = (app) => {
  // user block
  app.route('/users')
    .get(usersController.listAll)
    .post(usersController.create)
    .put(usersController.update);

  app.get('/users/:id', usersController.listOne);

  app.post('/authenticate', usersController.auth)

  app.get('/secret', jwtMiddleware.verifyToken, function (req, res) {
    jwt.verify(req.token, SecretKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.send(authData);
      }
    });
  });
};
