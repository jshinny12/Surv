import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router";

const TransactionInfo = (props) => (
    <>
        <tr>
            <td>Company Name</td>
            <td>{props.discount.company_name}</td>
        </tr>
        <tr>
            <td>Discount Nickname</td>
            <td>{props.discount.nickname}</td>
        </tr>
        <tr>
            <td>Price</td>
            <td>{props.discount.price}</td>
        </tr>
        <tr><td>Unique Discount ID</td>
            <td>{props.discount._id}</td>
        </tr>
    </>
);

export default function TransactionSell() {
    const [discounts, setDiscounts] = useState([]);
    const navigate = useNavigate();

    const current_id = localStorage.getItem("discount_sell_id");
    console.log(current_id);

    useEffect( () => {
        async function getDiscount() {
            const response = await fetch('http://localhost:5000/discount/' + current_id, {
                method: "GET"
            });

            const discount = await response.json();
            console.log(discount);
            setDiscounts([discount]);
            return discount;
        }

        getDiscount();

        return;
    }, []);



    function discountInfo() {
        console.log(discounts);
        return discounts.map((discount) => {
            return (
                <TransactionInfo
                    discount={discount}
                    key={discount._id}
                />
            );
        });
    }

    async function confirmTransaction() {
        const transaction_info = {
            discount_id: localStorage.getItem("discount_sell_id"),
            seller_id: localStorage.getItem("user_id")
        };

        console.log(transaction_info)

        await fetch("http://localhost:5000/sell-discount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(transaction_info),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        navigate("/customer");
    }

    // This following section will display the table with the users of individuals.
    return (
        <div>
            <h3>Pending Sale</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <tbody>{discountInfo()}</tbody>
            </table>
            <button onClick={() => confirmTransaction()}>Confirm</button>
            <button onClick={() => {navigate("/customer");}}>Cancel</button>
        </div>
    );
}