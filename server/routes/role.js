const roleController = require('../controllers').role;

module.exports = (app) => {
    app.route('/role')
        .get(roleController.listAll)
        .post(roleController.create)
        .put(roleController.update)
        .delete(roleController.destroy);

    app.get('/role/:id', roleController.listOne);
};