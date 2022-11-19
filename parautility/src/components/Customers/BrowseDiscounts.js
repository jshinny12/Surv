import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {useNavigate} from "react-router";
import {ReactSession} from "react-client-session";

export default function BrowseDiscounts() {
    const [discounts, setDiscounts] = useState([]);
    const navigate = useNavigate();

    const current_id = localStorage.getItem("company_id");
    console.log(current_id);

    useEffect( () => {

        async function getAvailableDiscounts() {
            const response = await fetch('http://localhost:5000/customer-discounts', {
                method: "GET"
            });

            const discounts = await response.json();
            console.log(discounts);
            setDiscounts(discounts);
            return discounts;
        }

        const all_discounts = getAvailableDiscounts();

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
            <h3>Available Discounts</h3>
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
        </div>
    );
}