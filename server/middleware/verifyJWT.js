const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(req.cookies);
    if (!req.cookies.jwt) {
        res.sendStatus(401);
    }
    else {
        console.log("cdfnvv");
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN,
            (err, decoded) => {
                if (err) res.sendStatus(403);// invalid token
                req.user = decoded.username;
                next();
            }
        );
    }
}

module.exports = verifyJWT;