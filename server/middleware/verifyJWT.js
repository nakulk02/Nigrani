const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    // This is for storing in localstorage
    /*const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });*/  
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
                req.user = decoded.person['username'];
                next();
            }
        );
    }
}

module.exports = verifyJWT;