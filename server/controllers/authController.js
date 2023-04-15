const { MongoClient } = require('mongodb');


const mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.SQL_PASSWORD,
    database: "login"
});

const jwt = require('jsonwebtoken');
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
const maxAge = 60;
const uri = process.env.MONGODB_URI
const createToken = (person) => {
    return jwt.sign(
        { person },
        process.env.ACCESS_TOKEN,
        { expiresIn: maxAge });
}

module.exports.login_post = async (req, res) => {
    console.log(req);
    const person = req.body;
    try {
        let client = new MongoClient(uri, options);
        const clientPromise = client.connect();
        const cl = await clientPromise;
        const db = cl.db("majorProject");
        const collection = db.collection("credsUses");
        console.log("connection made!!")
        const results = await collection.find({ $and: [{ username: person['username'] }, { password: person['password'] }] }).toArray();
        console.log("csdc",person);
        if (results.length === 0) {
            console.log("invalid");
            res.status(401).json({ message: 'invalid' });
        }
        else {
            const accessToken = createToken(person);
            console.log(results, accessToken);
            // res.cookie('token', accessToken, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ results, accessToken });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400);
    }

    // Below is for mysql
    // con.query('SELECT * FROM persons WHERE username=? and password=?', [person['username'], person['password']], function (err, result) {
    //     let user = [];
    //     if (err) { console.log(err); res.status(401); }
    //     console.log("res:", result);
    //     // res.send(result);
    //     // user.push(result[0]);
    //     // console.log(user, user.length);
    //     if (result.length === 0) {
    //         console.log("invalid");
    //         res.status(404).json({ message: 'invalid' });
    //     }
    //     else {
    //         const accessToken = jwt.sign(
    //             { 'username': person['username'] },
    //             process.env.ACCESS_TOKEN,
    //             { expiresIn: '30s' });
    //         console.log(result, accessToken);
    //         res.json({ result, accessToken });
    //     }
    // })
};


module.exports.searching_get = (req, res) => {
    console.log("reached");
    const searched = req.params.search.toLowerCase();
    con.query('SELECT * FROM locations WHERE state=(?)', [searched], function (err, result) {
        if (err) console.log(err);
        res.send(result);
    })
};