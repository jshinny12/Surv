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
                    _id: {"nickname": "$nickname", "percent": "$percent", "expiration": "$expiration_date"},
                    group_count: {$count: {}},
                    number_outstanding: {$sum: "$is_outstanding"}
                    }
            },

            {
                $sort: { _id: 1}
            }
        ]);

    const results = await aggCursor.toArray();
    res.json(results);
});

module.exports = discountRoutes;