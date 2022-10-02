const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
userRoutes.route("/user").get(function (req, res) {
    let db_connect = dbo.getDb("tradim");
    db_connect
        .collection("users")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a list of all the records.
userRoutes.route("/user-by-email").post(function (req, res) {
    let db_connect = dbo.getDb("tradim");
    console.log("Looking for user by email");
    db_connect
        .collection("users")
        .findOne({email: req.body.email}, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
userRoutes.route("/user/:id").get(function (req, res) {
    let db_connect = dbo.getDb("tradim");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("users")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
userRoutes.route("/signup-admin").post(function (req, response) {
    console.log("attempting to add user")
    let db_connect = dbo.getDb("tradim");
    let myobj = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        token: req.body.token,
        role: "admin"
    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you create a new record.
userRoutes.route("/signup-customer").post(function (req, response) {
    let db_connect = dbo.getDb("tradim");
    let myobj = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        role: "customer"
    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you create a new record.
userRoutes.route("/signup-merchant").post(function (req, response) {
    let db_connect = dbo.getDb("tradim");
    let myobj = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company,
        role: "merchant"
    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a record by id.
userRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb("tradim");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    db_connect
        .collection("users")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// This section will help you set a user's password given their email.
userRoutes.route("/set-password").post(function (req, response) {
    let db_connect = dbo.getDb("tradim");
    console.log("Attempt to set password")
    let myquery = { email: req.body.email };
    let newvalues = {
        $set: {
            pw_hash: req.body.pw_hash,
            salt: req.body.salt
        },
    };
    db_connect
        .collection("users")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// This section will help you delete a record
userRoutes.route("/user/:id").delete((req, response) => {
    let db_connect = dbo.getDb("tradim");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("users").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = userRoutes;