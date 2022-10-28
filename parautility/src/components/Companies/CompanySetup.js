import React, { useState } from "react";
import { useNavigate } from "react-router";
import emailjs from "@emailjs/browser"
import {ReactSession} from "react-client-session";

const CompanySetup = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        city: "",
        state: "",
        secret_word: ""
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

        if (form.state.length !== 2) {
            window.alert("Invalid Entry for State");
            return;
        }

        // sendEmail(e, emailParams);

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newCompany = { ...form };
        newCompany.owner = ReactSession.get("user_id");
        newCompany.owner_email = ReactSession.get("email");

        await fetch("http://localhost:5000/setup-company", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCompany),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ name: "", state: "", city: "", secret_word: "" });
        navigate("/");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Admin Account</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={form.city}
                        onChange={(e) => updateForm({ city: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">Two-Letter State</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        value={form.state}
                        onChange={(e) => updateForm({ state: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="secret-word">Secret Word for Other Employees to Join</label>
                    <input
                        type="text"
                        className="form-control"
                        id="secret-word"
                        value={form.secret_word}
                        onChange={(e) => updateForm({ secret_word: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Company"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default CompanySetup