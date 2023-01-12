const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const discountRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a single record by id
discountRoutes.route("/discounts/:company_id").get(async function (req, res) {
    let db_connect = dbo.getDb("tradim");
    console.log("Aggregating company discounts");
    console.log(req.params.company_id);
    const aggCursor = db_connect.collection("discounts").aggregate([
            {
                $match: {company_id: ObjectId(req.params.company_id)}
            },

            {
                $group: {
                    _id: {"nickname": "$nickname", "percent": "$percent", "expiration": "$expiration_date", "price": "$price"},
                    group_count: {$count: {}},
                    number_outstanding: {$sum: "$is_outstanding"},
                    number_for_sale: {$sum: "$is_for_sale"}
                    }
            },

            {
                $sort: { _id: 1}
            }
        ]);

    // TODO: add most recent transaction in to results
    // TODO: add total number of transactions (completed/open)

    const results = await aggCursor.toArray();
    res.json(results);
});

// This section will help you get a single record by id
discountRoutes.route("/preorders/:company_id").get(async function (req, res) {
    let db_connect = dbo.getDb("tradim");
    console.log("Aggregating company discounts");
    console.log(req.params.company_id);
    const aggCursor = db_connect.collection("preorders").aggregate([
        {
            $match: {company_id: ObjectId(req.params.company_id)}
        },

        {
            $sort: { _id: 1}
        }
    ]);

    // TODO: add most recent transaction in to results
    // TODO: add total number of transactions (completed/open)

    const results = await aggCursor.toArray();
    res.json(results);
});

discountRoutes.route("/customer-discounts").get(async function (req, res) {
    let db_connect = dbo.getDb("tradim");

    console.log("Pulling available discounts");
    const aggCursor = db_connect.collection("discounts").aggregate([
        {
            $match: {is_for_sale: 1}
        },

        {
            $group: {
                _id: {"company": "$company_name", "nickname": "$nickname", "percent": "$percent", "expiration": "$expiration_date", "price": "$price"}
            }
        },

        {
            $sort: { _id: 1}
        }
    ]);

    const results = await aggCursor.toArray();
    res.json(results);
});

// This section will help you get a list of all the records.
discountRoutes.route("/preorders").get(function (req, res) {
    let db_connect = dbo.getDb("tradim");
    console.log("Pulling available preorders.")
    db_connect.collection("preorders").find({}).toArray(
        function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

discountRoutes.route("/customer-wallet/:id").get(async function (req, res) {
    let db_connect = dbo.getDb("tradim");

    console.log("Pulling customer's discounts");
    const aggCursor = db_connect.collection("discounts").aggregate([
        {
            $match: {owner_id: req.params.id}
        },

        {
            $sort: { company_name: 1}
        }
    ]);

    const results = await aggCursor.toArray();
    res.json(results);
});

discountRoutes.route("/customer-preorders/:id").get(async function (req, res) {
    let db_connect = dbo.getDb("tradim");

    console.log("Pulling customer's preorders");
    const aggCursor = db_connect.collection("preorder_transactions").aggregate([
        {
            $match: {buyer_id: ObjectId(req.params.id), is_filled: 0}
        },

        {
            $sort: { company_name: 1}
        },

        {
            $lookup: {
                from: "preorders",
                localField: "preorder_id",
                foreignField: "_id",
                as: "preorder_info"
            }
        }
    ]);

    const results = await aggCursor.toArray();
    res.json(results);
});

discountRoutes.route("/get-available-discount").post(async function (req, res) {
    let db_connect = dbo.getDb("tradim");

    console.log("Finding one discount ID");
    db_connect.collection("discounts").findOne(
        {company_name: req.body.company_name, nickname: req.body.discount_nickname, is_for_sale: 1}, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
discountRoutes.route("/discount/:id").get(function (req, res) {
    let db_connect = dbo.getDb("tradim");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("discounts").findOne(myquery,
        function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
discountRoutes.route("/preorder/:id").get(function (req, res) {
    let db_connect = dbo.getDb("tradim");
    let myquery = { _id: ObjectId(req.params.id) };
    console.log("Pulling info for one preorder type");
    db_connect.collection("preorders").findOne(myquery,
        function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

module.exports = discountRoutes;