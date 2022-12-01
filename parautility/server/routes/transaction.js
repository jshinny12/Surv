const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const transactionRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you create a new record.
transactionRoutes.route("/sell-discount").post(function (req, response) {
    console.log("attempting to add transaction")
    let db_connect = dbo.getDb("tradim");
    let myobj = {
        seller_id: req.body.buyer_id,
        discount_id: req.body.discount_id,
        for_sale_date: new Date()
    };

    db_connect.collection("transactions").insertOne(myobj, function (err, res) {
        if (err) throw err;
    });

    db_connect.collection("discounts").updateOne(
        {_id: ObjectId(req.body.discount_id)},
        {$set: {is_for_sale: 1}},
        function (err, res) {
            if (err) throw err;
            console.log("put discount up for sale");
            response.json(res)
        });
});

// This section will help you create a new record.
transactionRoutes.route("/buy-discount").post(function (req, response) {
    console.log("attempting to add transaction")
    let db_connect = dbo.getDb("tradim");

    db_connect.collection("transactions").updateOne(
        {discount_id: ObjectId(req.body.discount_id)},
        {$set: {buyer_id: req.body.buyer_id, buy_date: new Date()}}
        , function (err, res) {
        if (err) throw err;
    });

    db_connect.collection("discounts").updateOne(
        {_id: ObjectId(req.body.discount_id)},
        {$set: {is_for_sale: 0, owner_id: req.body.buyer_id}},
        function (err, res) {
            if (err) throw err;
            console.log("discount sold, no longer for sale");
            response.json(res)
        });
});

module.exports = transactionRoutes;