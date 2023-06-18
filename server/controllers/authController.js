const { MongoClient } = require('mongodb');

// const mysql = require('mysql2');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: process.env.SQL_PASSWORD,
//     database: "login"
// });

const jwt = require('jsonwebtoken');
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
const maxAge = '24h';
const uri = process.env.MONGODB_URI;
const createToken = (person) => {
    return jwt.sign(
        { person },
        process.env.ACCESS_TOKEN,
        { expiresIn: maxAge });
};
let nodeGeocoder = require('node-geocoder');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sms = require('twilio')(accountSid, authToken);


module.exports.login_post = async (req, res) => {
    const person = req.body;
    try {
        let client = new MongoClient(uri, options);
        const clientPromise = client.connect();
        const cl = await clientPromise;
        const db = cl.db("majorProject");
        const collection = db.collection("credsUses");
        console.log("connection made!!");
        const results = await collection.find({ $and: [{ username: person['username'] }, { password: person['password'] }] }).toArray();
        if (results.length === 0) {
            console.log("invalid");
            res.status(401).json({ message: 'invalid' });
        }
        else {
            const new_otp = Math.floor(Math.random() * 899991) + 100000;
            console.log(new_otp);
            sms.messages
                .create({ body: 'Your Otp is : ' + new_otp, from: '+16813256911', to: '+918699996848' })
                .then(message => console.log(message))
                .catch((err) => { console.log(err); });
            collection.updateOne({ $and: [{ username: person['username'] }, { password: person['password'] }] }, { $set: { otp: new_otp } });
            const accessToken = createToken(person);
            console.log(results, accessToken);
            res.clearCookie('key');
            res.cookie('key', accessToken, { httpOnly: true, maxAge: 30000 * 1000 });//maxAge is in ms
            res.status(200).json({ results, accessToken });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400);
    }

    // *** Below is for mysql ***
    // try {
    //     con.query('SELECT * FROM persons WHERE username=? and password=?', [person['username'], person['password']], function (err, result) {
    //         let user = [];
    //         if (err) { console.log(err); res.status(401); }
    //         console.log("res:", result);
    //         // res.send(result);
    //         // user.push(result[0]);
    //         // console.log(user, user.length);
    //         if (result.length === 0) {
    //             console.log("invalid");
    //             res.status(404).json({ message: 'invalid' });
    //         }
    //         else {
    //             const accessToken = jwt.sign(
    //                 { 'username': person['username'] },
    //                 process.env.ACCESS_TOKEN,
    //                 { expiresIn: '30s' });
    //             res.cookie('key', accessToken, { httpOnly: true, maxAge: 30*1000 });//maxAge is in ms
    //             console.log(result, accessToken);
    //             res.json({ result, accessToken });
    //         }
    //     })
    // }
    // catch (err) {
    //     console.log(err);
    //     res.status(400);
    // }
};


module.exports.searching_get = async (req, res) => {
    let opti = {
        provider: 'openstreetmap'
    };
    let geoCoder = nodeGeocoder(opti);
    try {
        const searched = req.params.search.toLowerCase();
        let search_loc;
        await geoCoder.geocode(searched)
            .then((res) => {
                search_loc = res[0];
                console.log(search_loc);
            })
            .catch((err) => {
                console.log(err);
                res.send(404);
            });
        console.log("reached");
        if (search_loc===undefined)
        {
            res.send([]);
            return;
        }
        let client = new MongoClient(uri, options);
        const clientPromise = client.connect();
        const cl = await clientPromise;
        const db = cl.db("majorProject");
        const collection = db.collection("loca");
        collection.createIndex({ location: "2dsphere" });
        let lat = search_loc["latitude"];
        let long = search_loc["longitude"];
        const results = await collection.aggregate([
            {
                $geoNear: {
                    near: { type: "point", coordinates: [lat, long] },
                    distanceField: "dist.calculated",
                    maxDistance: 100000,
                    key: "location",
                    includeLocs: "dist.location",
                    spherical: true
                }
            }
        ]).toArray();
        console.log("connection made!!");
        // const results = await collection.find({ state: searched }).toArray();
        console.log(results);
        res.send(results);
    }
    catch (err) {
        console.log(err);
        res.send(404);
    }
    // con.query('SELECT * FROM locations WHERE state=(?)', [searched], function (err, result) {
    //     if (err) console.log(err);
    //     res.send(result);
    // })
};

module.exports.logout_get = (req, res) => {
    console.log("logged_out: ");
    res.clearCookie('key');
    res.status(200).json({ message: "bye" });
};

module.exports.otp_post = async (req, res) => {
    try {
        let client = new MongoClient(uri, options);
        const per = req.body['per'];
        console.log("req", req.body);
        const clientPromise = client.connect();
        const cl = await clientPromise;
        const db = cl.db("majorProject");
        const collection = db.collection("credsUses");
        console.log("connection made!!");
        const result = await collection.find({ $and: [{ username: per['username'] }, { password: per['password'] }] }).toArray();
        const otp = result[0]['otp'];
        console.log(otp, req.body['otp']);
        if (otp.toString() === req.body['otp'].toString()) {
            res.status(200).json({ message: "correct" });
        }
        else {
            console.log('wrong otp');
            res.status(400).json({ message: "wrong otp" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400);
    }
};


module.exports.resend_post = async (req, res) => {
    try {
        let client = new MongoClient(uri, options);
        const per = req.body;
        console.log("req", req.body);
        const clientPromise = client.connect();
        const cl = await clientPromise;
        const db = cl.db("majorProject");
        const collection = db.collection("credsUses");
        console.log("connection made!!");
        const new_otp = Math.floor(Math.random() * 899991) + 100000;
        console.log(new_otp);
        sms.messages
            .create({ body: 'Your Otp is : ' + new_otp, from: '+16813256911', to: '+918699996848' })
            .then(message => console.log(message))
            .catch((err) => { console.log(err); });
        collection.updateOne({ $and: [{ username: per['username'] }, { password: per['password'] }] }, { $set: { otp: new_otp } });
        res.status(200);
    }
    catch (err) {
        console.log(err);
        res.status(400);
    }
};

module.exports.suggestion = async (req,res) => {
    try{

        console.log(req.params);
        const suggest = req.params.suggest.toLowerCase();
        sms.messages
            .create({ body: "Suggetion sent"+suggest, from: '+16813256911', to: '+918699996848' })
            .then(message => console.log(message))
            .catch((err) => { console.log(err); });
        res.status(200).json({ message: "Suggestion sent" });
    }
    catch (err) {
        res.send(400);
    }

}