
const roles = require("../models").roles;

module.exports = {
    create(req, res) {
        return roles
            .create({
                role_id: req.params.role_id,
                name: req.params.name,

            })
            .then(user => res.status(201).send(user))
            .catch(e => res.status(400).send(e));
    },
    listAll(req, res) {
        return roles
            .findAll()
            .then(records => res.status(201).send(records))
            .catch(e => res.status(400).send(e));
    },
    listOne(req, res) {
        return roles
            .findAll({
                where: {
                    role_id: req.params.role_id,

                }
            })
            .then(record => res.status(201).send(record))
            .catch(e => res.status(400).send(e));
    },
    update(req, res) {
        return roles
            .update(
                {
                    role_id: req.params.role_id,
                    name: req.params.name,

                },
                {
                    where: {
                        role_id: req.params.role_id,

                    }
                }
            )
            .then(result => res.status(201).send(result))
            .catch(e => res.status(400).send(e));
    },
    destroy(req, res) {
        return roles
            .update(
                {
                    where: {
                        role_id: req.params.role_id,

                    }
                }
            )
            .then(result => res.status(201).send(result))
            .catch(e => res.status(400).send(e));
    },
};
