const jwt = require('jsonwebtoken');
const SecretKey = require("../config/jwt.json").secretKey;

module.exports = {
    getToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
            next();
        } else {
            // Forbidden
            res.sendStatus(403);
        }
    },
    verifyToken(req, res, next) {
        console.log(req.token);
        jwt.verify(req.token, SecretKey, (err, authData) => {
            if (err) {
                // Forbidden
                res.sendStatus(403);
            } else {
                // save the user's data
                req.authData = authData;
                // Next middleware
                next();
            }
        });
    }
}
