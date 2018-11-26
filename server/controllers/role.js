const role = require("../models").role;

module.exports = {
    create(req, res) {
        return role
            .create({
                id: req.body.id,
                name: req.body.name,

            })
            .then(user => res.status(201).send(user))
            .catch(e => res.status(400).send(e));
    },
    listAll(req, res) {
        return role
            .findAll({
                include: []
            })
            .then(records => res.status(201).send(records))
            .catch(e => res.status(400).send(e));
    },
    listOne(req, res) {
        return role
            .findAll({
                include: [],
                where: {
                    id: req.params.id,

                }
            })
            .then(record => res.status(201).send(record))
            .catch(e => res.status(400).send(e));
    },
    update(req, res) {
        return role
            .update({
                id: req.body.id,
                name: req.body.name,

            }, {
                where: {
                    id: req.body.id,

                }
            })
            .then(result => res.status(201).send(result))
            .catch(e => res.status(400).send(e));
    },
    destroy(req, res) {
        return role
            .destroy({
                where: {
                    id: req.body.id,

                }
            })
            .then(result => res.status(201).send(result))
            .catch(e => res.status(400).send(e));
    },
};