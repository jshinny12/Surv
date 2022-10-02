import React, { useState } from "react";
import { useNavigate } from "react-router";
import emailjs from "@emailjs/browser"

const admin_access_code = "314159"

const SignupAdmin = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "user@server.extension",
        phone: "###-###-####",
        admin: ""
    });

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

    // This function tests the email string against a regular expression
    function isValidAdmin() {
        return form.admin === admin_access_code;
    }

    function generateToken(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
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

        if (!isValidEmail(form.email)) {
            window.alert("Invalid Email Address. Please Correct and Try Again")
        }

        if (!isValidPhone(form.phone)) {
            window.alert("Invalid Phone Number Format. Please Correct and Try Again")
        }

        if (!isValidAdmin(form.admin)) {
            window.alert("Invalid Admin Code. Please Correct and Try Again")
        }

        const new_token = generateToken(28)
        console.log(new_token)

        var emailParams = {
            fname: form.fname,
            lname: form.lname,
            email: form.email,
            token: new_token
        }

        sendEmail(e, emailParams)

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };
        newPerson.token = new_token;
        console.log(newPerson.token)

        await fetch("http://localhost:5000/signup-admin", {
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
            <h3>Create New Admin Account</h3>
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
                        id="email"
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
                    <label htmlFor="admin">Admin Access Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="admin"
                        value={form.admin}
                        onChange={(e) => updateForm({ admin: e.target.value })}
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

export default SignupAdmin