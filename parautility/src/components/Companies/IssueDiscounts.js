import React, { useState } from "react";
import { useNavigate } from "react-router";
import emailjs from "@emailjs/browser"

const IssueDiscounts = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nickname: "",
        percent: 0,
        count: 0,
        price: 0,
        expire: Date()
    });

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
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

        // When a post request is sent to the create url, we'll add a new record to the database.
        const discounts = { ...form };
        discounts.company_id = localStorage.getItem("view_company_id");
        discounts.company_name = localStorage.getItem("view_company");

        console.log(discounts.company_id);
        discounts.percent = Number(discounts.percent);

        await fetch("http://localhost:5000/create-discounts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(discounts),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ nickname: "", percent: "0", count: "0", expire: Date()});
        navigate("/admin-one-company-view");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Issue New Discounts</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="nickname">Discount Nickname</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nickname"
                        value={form.nickname}
                        onChange={(e) => updateForm({ nickname: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="percent">Percent Discount</label>
                    <input
                        type="text"
                        className="form-control"
                        id="percent"
                        value={form.percent}
                        onChange={(e) => updateForm({ percent: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="count">Number of Discounts to Issue</label>
                    <input
                        type="text"
                        className="form-control"
                        id="count"
                        value={form.count}
                        onChange={(e) => updateForm({ count: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="count">Initial Offer Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        value={form.price}
                        onChange={(e) => updateForm({ price: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expire">Expiration Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="expire"
                        value={form.expire}
                        onChange={(e) => updateForm({ expire: e.target.value })}
                    />
                </div>
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