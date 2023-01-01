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

module.exports = discountRoutes;