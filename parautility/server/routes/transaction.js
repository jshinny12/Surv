const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const transactionRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Sell a discount - put it up for sale. insert a transaction record and update a discount record
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

// Buy a discount - update a transaction record and a discount record
// TODO: update the user record
// TODO: add most recent transaction to each discount
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

transactionRoutes.route("/preorder-discount").post(function (req, response) {
    console.log("attempting to add preorder")
    let db_connect = dbo.getDb("tradim");

    db_connect.collection("preorder_transactions").insertOne(
        {
            preorder_id: ObjectId(req.body.preorder_id),
            buyer_id: ObjectId(req.body.buyer_id),
            preorder_date: new Date(),
            is_filled: 0
        }
        , function (err, res) {
            console.log("preorder transaction recorded")
            if (err) throw err;
        });

    db_connect.collection("preorders").updateOne(
        {_id: ObjectId(req.body.preorder_id)},
        {$push: {preorder_users: ObjectId(req.body.buyer_id)}},
        function (err, res) {
            if (err) throw err;
            console.log("customer ID added to preorder list");
            response.json(res)
        });
});

module.exports = transactionRoutes;