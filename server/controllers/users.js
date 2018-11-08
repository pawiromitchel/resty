const User = require("../models").users;
const UserRoles = require("../models").roles;
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    create(req, res) {
        return User
            .create({
                role_id: 2,
                username: req.body.username,
                fullname: req.body.username,
                password: bcrypt.hashSync(req.body.password, salt),
            })
            .then(user => res.status(201).send({ message: `${user.get().username} has been created` }))
            .catch(e => res.status(400).send(e));
    },
    listAll(req, res) {
        return User
            .findAll({
                include: [UserRoles]
            })
            .then(users => res.status(201).send(users))
            .catch(e => res.status(400).send(e));
    },
    listOne(req, res) {
        return User
            .findAll({
                where: {
                    user_id: req.params.id
                }
            })
            .then(users => res.status(201).send(users))
            .catch(e => res.status(400).send(e));
    },
    update(req, res) {
        return User
            .update(
                {
                    role_id: req.body.username,
                    password: req.body.username,
                },
                {
                    where: {
                        user_id: req.body.user_id
                    }
                }
            )
            .then(users => res.status(201).send(users))
            .catch(e => res.status(400).send(e));
    },
};
