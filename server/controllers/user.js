const Messages = require("../config/messages.json");
const SecretKey = require("../config/jwt.json").secretKey;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);

const user = require("../models").user;
const role = require("../models").role;

module.exports = {
    create(req, res) {
        return user
            .create({
                id: req.body.id,
                role_id: req.body.role_id,
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, salt),
                created_at: req.body.created_at,
                updated_at: req.body.updated_at,

            })
            .then(user => res.status(201).send(user))
            .catch(e => res.status(400).send(e));
    },
    listAll(req, res) {
        return user
            .findAll({
                include: [{
                    model: role,
                    as: 'user_role'
                }, ]
            })
            .then(records => res.status(201).send(records))
            .catch(e => res.status(400).send(e));
    },
    listOne(req, res) {
        return user
            .findAll({
                include: [{
                    model: role,
                    as: 'user_role'
                }, ],
                where: {
                    id: req.params.id,

                }
            })
            .then(record => res.status(201).send(record))
            .catch(e => res.status(400).send(e));
    },
    update(req, res) {
        return user
            .update({
                id: req.body.id,
                role_id: req.body.role_id,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                active: req.body.active,
                created_at: req.body.created_at,
                updated_at: req.body.updated_at,

            }, {
                where: {
                    id: req.body.id,

                }
            })
            .then(result => res.status(201).send(result))
            .catch(e => res.status(400).send(e));
    },
    destroy(req, res) {
        return user
            .destroy({
                where: {
                    id: req.body.id,

                }
            })
            .then(result => res.status(201).send(result))
            .catch(e => res.status(400).send(e));
    },
    auth(req, res) {
        return user
            .findAll({
                where: {
                    username: req.body.username,
                    active: 1
                }
            })
            .then(user => {
                if (user[0]) {
                    bcrypt.compare(req.body.password, user[0].password, (err, bcryptResult) => {
                        if (bcryptResult) {
                            jwt.sign({
                                user
                            }, SecretKey, {
                                expiresIn: '28800s'
                            }, (err, token) => {
                                res.status(201).json({
                                    token
                                });
                            });
                        } else {
                            res.status(201).send({
                                message: Messages.authFailedMessage
                            });
                        }
                    })
                } else {
                    res.status(201).send({
                        message: Messages.authFailedMessage
                    });
                }
            })
            .catch(e => res.status(400).send(e));
    }
};
