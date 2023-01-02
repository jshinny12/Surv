import React, {useState} from "react";
import {useNavigate} from "react-router";
import emailjs from "@emailjs/browser";

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

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "user@server.extension",
        password: ""
    });

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the "create" url, we'll add a new record to the database.
        const currentPerson = {...form};

        const getUserByEmail = async () => {
            const response = await fetch(`http://localhost:5000/user-by-email`, {
                method: "POST", headers: { "Content-Type": "application/json"}, body: JSON.stringify(currentPerson)
            });

            const user = await response.json();
            return user;
        }

        const db_user = await getUserByEmail().then(user => {
            return user;
        });

        const pw_hash = await sha256(form.password + db_user.salt);
        console.log("Checking Hash:" + pw_hash);
        console.log("Stored Hash:" + db_user.pw_hash);
        console.log(db_user.role);

        localStorage.setItem("fname", db_user.fname);
        localStorage.setItem("lname", db_user.lname);
        localStorage.setItem("role", db_user.role);
        localStorage.setItem("email", db_user.email);
        localStorage.setItem("user_id", db_user._id);

        if (db_user.role === "merchant") {
            localStorage.setItem("company_id", db_user.company_id);
        }

        if (pw_hash === db_user.pw_hash) {
            navigate("/login-landing");
        }
        else {
            alert("Email or Password Incorect. Please Try Again");
            return;
        }
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Sign In</h3>
            <form onSubmit={onSubmit}>
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
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={form.password1}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Log In"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>

    );
}

export default Login