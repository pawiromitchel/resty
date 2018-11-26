const userController = require('../controllers').user;

module.exports = (app) => {
    app.route('/user')
        .get(userController.listAll)
        .put(userController.update)
        .delete(userController.destroy);

    app.get('/user/:id', userController.listOne);

    app.post('/register', userController.create);
    app.post('/authenticate', userController.auth);
};
