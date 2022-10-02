import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function SignupAdmin() {
    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "user@server.extension",
        phone: "###-###-####",
        company: ""
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function tests the email string against a regular expression
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    // This function tests the email string against a regular expression
    function isValidPhone(phone) {
        return /([0-9]{3})-([0-9]{3})-([0-9]{4})/.test(phone);
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        if (!isValidEmail(form.email)) {
            window.alert("Invalid Email Address. Please Correct and Try Again")
        }

        if (!isValidPhone(form.phone)) {
            window.alert("Invalid Phone Number Format. Please Correct and Try Again")
        }

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };

        await fetch("http://localhost:5000/signup-merchant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ fname: "", lname: "", email: "", phone: "" });
        navigate("/");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Merchant Account</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fname"
                        value={form.fname}
                        onChange={(e) => updateForm({ fname: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lname"
                        value={form.lname}
                        onChange={(e) => updateForm({ lname: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={form.phone}
                        onChange={(e) => updateForm({ phone: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="company"
                        value={form.admin}
                        onChange={(e) => updateForm({ company: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}