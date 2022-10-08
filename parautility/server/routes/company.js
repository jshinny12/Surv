const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const companyRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you create a new record.
companyRoutes.route("/setup-company").post(function (req, response) {
    console.log("attempting to add company")
    let db_connect = dbo.getDb("tradim");
    let myobj = {
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        secret_word: req.body.secret_word,
        owner: req.body.owner,
        owner_email: req.body.owner_email,
        employees: [ObjectId(req.body.owner)]
    };

    db_connect.collection("companies").insertOne(myobj, function (err, res) {
        if (err) throw err;
    });

    console.log(myobj._id);
    console.log(req.body.owner);

    db_connect.collection("users").updateOne(
        {_id: ObjectId(req.body.owner)},
        {$set: {company_id: ObjectId(myobj._id)}},
        function (err, res) {
            if (err) throw err;
            console.log("company added to owner");
            response.json(res)
        });
});

// This section will help you get a list of all the records.
companyRoutes.route("/company").get(function (req, res) {
    let db_connect = dbo.getDb("tradim");
    db_connect.collection("companies").find({}).toArray(
        function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
companyRoutes.route("/company/:id").get(function (req, res) {
    let db_connect = dbo.getDb("tradim");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("companies").findOne(myquery,
        function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
companyRoutes.route("/add-employee").post(function (req, response) {
    console.log("attempting to add company")
    let db_connect = dbo.getDb("tradim");
    db_connect.collection("companies").updateOne(
        {_id: ObjectId(req.body.company_id)},
        {$push: {employees: ObjectId(req.body.user_id)}},
        function (err, res) {
        if (err) throw err;
        response.json(res);
    });


    db_connect.collection("users").updateOne(
        {_id: ObjectId(req.body.user_id)},
        {$set: {company_id: ObjectId(req.body.company_id)}},
        function (err, res) {
            if (err) throw err;
            response.json(res);
        });
});

module.exports = companyRoutes;