import React, {useState} from "react";
import {useNavigate} from "react-router";
import emailjs from "@emailjs/browser";
import {ReactSession} from "react-client-session";

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const VerifySignup = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        token: "",
        email: "user@server.extension",
        password1: "",
        password2: ""
    });

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    function generateSalt(length) {
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

    const getUserByEmail = async (query_person) => {
        const response = await fetch(`http://localhost:5000/user-by-email`, {
            method: "POST", headers: { "Content-Type": "application/json"}, body: JSON.stringify(query_person)
        });

        const user = await response.json();
        console.log(user);
        return user;
    }

    const setUserPassword = async (salt, pw_hash, email) => {
        console.log(salt);
        console.log(pw_hash);
        console.log(email);
        const response = await fetch("http://localhost:5000/set-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({pw_hash: pw_hash, salt: salt, email: email})
        })
            .catch(error => {
                alert(error);
                return;
            });

    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        if (form.password1 !== form.password2) {
            alert("Passwords do not match. Please Try Again");
            return;
        }

        // When a post request is sent to the "create" url, we'll add a new record to the database.
        const currentPerson = {...form};

        console.log(currentPerson);
        console.log(currentPerson.token);

        const user_results = await getUserByEmail(currentPerson).then(db_person => {
            const db_token = db_person.token
            console.log(currentPerson.token)
            if (db_token !== currentPerson.token) {
                console.log("Token mismatch");
                alert("Token does not match the email provided");
                return;
            }

            const salt = generateSalt(16);
            return {
                user_salt: salt,
                db_person: db_person
            };
        });

        const salt = user_results.user_salt;
        const db_person = user_results.db_person;
        const pw_hash = await sha256(form.password1 + salt);
        console.log(pw_hash);
        console.log(salt);

        localStorage.setItem("fname", db_person.fname);
        localStorage.setItem("lname", db_person.lname);
        localStorage.setItem("role", db_person.role);
        localStorage.setItem("email", db_person.email);
        localStorage.setItem("user_id", db_person._id);

        const password_set = await setUserPassword(salt, pw_hash, currentPerson.email).then(response => {
            if (localStorage.getItem("role") === "merchant") {
                navigate("/merchant-verify-landing");
            }
            else {
                navigate("/login-landing");
            }
        });

        // setForm({email: "", token: "", password1: "", password2: ""});
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Verify Your Email and Set Up Your Password</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Used for Signup</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="token">Token from Verification Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="token"
                        value={form.token}
                        onChange={(e) => updateForm({ token: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password1"
                        value={form.password1}
                        onChange={(e) => updateForm({ password1: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Retype Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password2"
                        value={form.password2}
                        onChange={(e) => updateForm({ password2: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Verify"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default VerifySignup