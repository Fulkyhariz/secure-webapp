const {jwtConfig} = require("../config/jwt.config")
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, jwtConfig.jwtAccessSecret, (err, user) => {
            if (err) {
                res.status(403).json({message:"invalid token"});
                return
            }

            req.user = user;
            next();
        });

    } else {
        res.status(401).json({message:"invalid token"});
    }
};

const authenticateRefreshJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, jwtConfig.jwtRefreshSecret, (err, user) => {
            if (err) {
                res.status(403).json({message:"invalid token"});
                return
            }

            req.user = user;
            next();
        });

    } else {
        res.status(401).json({message:"invalid token"});
    }
};

module.exports = {authenticateJWT, authenticateRefreshJWT}