import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {useNavigate} from "react-router";

export default function BrowseDiscounts() {
    const [discounts, setDiscounts] = useState([]);
    const [preorders, setPreorders] = useState([]);
    const navigate = useNavigate();

    const current_id = localStorage.getItem("company_id");
    console.log(current_id);

    useEffect( () => {

        async function getAvailableDiscounts() {
            const response = await fetch('http://localhost:5000/customer-discounts', {
                method: "GET"
            });

            const db_discounts = await response.json();
            console.log(db_discounts);
            setDiscounts(db_discounts);
            return db_discounts;
        }

        async function getAvailablePreorders() {
            const response = await fetch('http://localhost:5000/preorders', {
                method: "GET"
            });

            const db_preorders = await response.json();
            console.log(db_preorders);
            setPreorders(db_preorders);
            return db_preorders;
        }

        const all_discounts = getAvailableDiscounts();
        getAvailablePreorders();

        return;
    }, []);

    // This method will map out the users on the table
    function discountList() {
        return discounts.map((discount) => {
            return (
                <AvailableDiscount
                    discount={discount}
                    key={discount._id.nickname}
                />
            );
        });
    }

    // This method will map out the users on the table
    function preorderList() {
        return preorders.map((discount) => {
            return (
                <AvailablePreorder
                    discount={discount}
                    key={discount._id.nickname}
                />
            );
        });
    }

    const AvailablePreorder = (props) => (
        <tr>
            <td>{props.discount.company_name}</td>
            <td>{props.discount.nickname}</td>
            <td>{props.discount.expiration_date}</td>
            <td>{props.discount.percent}%</td>
            <td>${props.discount.price}</td>

            <td><button
                onClick={() => {
                    console.log(props.discount._id.company);
                    console.log(props.discount._id.nickname);

                    localStorage.setItem("preorder_discount_id", props.discount._id);
                    navigate("/confirm-preorder");

                }}>Preorder</button></td>
        </tr>
    );

    const AvailableDiscount = (props) => (
        <tr>
            <td>{props.discount._id.company}</td>
            <td>{props.discount._id.nickname}</td>
            <td>{props.discount._id.expiration}</td>
            <td>{props.discount._id.percent}%</td>
            <td>${props.discount._id.price}</td>
            <td><button
                onClick={() => {
                    console.log(props.discount._id.company);
                    console.log(props.discount._id.nickname);

                    async function selectSingleDiscount(company, nickname) {
                        const response = await fetch('http://localhost:5000/get-available-discount', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({company_name: company, discount_nickname: nickname}),
                        });

                        const discount = await response.json();
                        console.log(discount._id);
                        localStorage.setItem("transaction_discount_id", discount._id);
                        navigate("/transaction");
                    }

                    const new_discount_id = selectSingleDiscount(props.discount._id.company, props.discount._id.nickname);

                }}>Buy</button></td>
        </tr>
    );

    // This following section will display the table with the users of individuals.
    return (
        <div>
            <h3>Available Discounts for Sale</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <th>Company</th>
                <th>Discount Nickname</th>
                <th>Expiration Date</th>
                <th>Percent Discount</th>
                <th>Price</th>
                </thead>
                <tbody>{discountList()}</tbody>
            </table>

            <h3>Available Discounts for Preorder</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <th>Company</th>
                <th>Discount Nickname</th>
                <th>Expiration Date</th>
                <th>Percent Discount</th>
                <th>Price</th>
                </thead>
                <tbody>{preorderList()}</tbody>
            </table>
        </div>
    );
}