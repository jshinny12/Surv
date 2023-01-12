import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import emailjs from "@emailjs/browser";

const IssueDiscounts = () => {
    const navigate = useNavigate();

    const [discount, setDiscount] = useState({
        nickname: "",
        percent: 0,
        price: 0,
        preorder_users: [],
        expiration_date: 0
    });

    const preorder_id = localStorage.getItem("preorder_to_fill_id");

    useEffect( () => {
        async function getPreorderToFill(current_id) {
            const response = await fetch('http://localhost:5000/preorder/' + current_id, {
                method: "GET"
            });

            const preorder = await response.json();
            console.log(preorder);
            setDiscount(preorder);
            return preorder;
        }

        getPreorderToFill(preorder_id);

        return;
    }, []);

    // These methods will update the state properties.
    function updateDiscount(value) {
        return setDiscount((prev) => {
            return { ...prev, ...value };
        });
    }

    const sendEmail = (e, templateParams) => {
        e.preventDefault();

        emailjs.init('Yhbs32kTTPFzp9TMU')
        emailjs.send('service_7xjki0g', 'template_gke6mby', templateParams)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // sendEmail(e, emailParams);

        await fetch("http://localhost:5000/create-discounts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(discount),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        navigate("/admin-one-company-view");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Issue New Discounts</h3>
            <div>
                <p>Discount Nickname: {discount.nickname}</p>
                <p>Percent Discount: {discount.percent}</p>
                <p>Number of Discounts to Issue: {discount.preorder_users.length}</p>
                <p>Initial Offer Price: {discount.price}</p>
                <p>Expiration Date: {discount.expiration_date}</p>
            </div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Discounts"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default IssueDiscounts;