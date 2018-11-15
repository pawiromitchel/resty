const usersController = require('../controllers').users;

module.exports = (app) => {
    app.post('/authenticate', usersController.auth)
};
