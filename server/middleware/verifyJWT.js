const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const token = req.cookies.key;
    console.log(req.cookies);
    if (!req.cookies.key) {
        res.sendStatus(401);
    }
    else {
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN,
            (err, decoded) => {
                if (err) res.sendStatus(403);// invalid token
                console.log(decoded);
                req.user = decoded.person['username'];
                next();
            }
        );
    }
}

module.exports = verifyJWT;
