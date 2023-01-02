import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router";

const Company = (props) => (
    <tr>
        <td><input type={"radio"} value={props.company._id} name={"company"}/></td>
        <td>{props.company.name}</td>
        <td>{props.company.city}</td>
        <td>{props.company.state}</td>
        <td>{props.company.owner_email}</td>
    </tr>
);

export default function CompanyJoin() {
    const [companies, setCompanies] = useState([]);
    const [form, setForm] = useState({secret_word: ""});
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This method fetches the users from the database.
    useEffect(() => {
        async function getCompanies() {
            const response = await fetch(`http://localhost:5000/company/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const companies = await response.json();
            setCompanies(companies);
        }

        getCompanies();

        return;
    }, [companies.length]);

    // This method will map out the users on the table
    function companyList() {
        return companies.map((company) => {
            return (
                <Company
                    company={company}
                    key={company._id}
                />
            );
        });
    }

    const getCompanyByID = async (companyID) => {
        const response = await fetch('http://localhost:5000/company/' + companyID, {
            method: "GET"
        });

        const company = await response.json();
        console.log(company);
        return company;
    }

    const addUserToCompany = async (update_params) => {
        const response = await fetch('http://localhost:5000/add-employee', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(update_params)
        });

        const company = await response.json();
        console.log(company);
        return company;
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        console.log(form);

        // When a post request is sent to the "create" url, we'll add a new record to the database.
        const selectedCompanyID = document.querySelector('input[type="radio"][name="company"]:checked').value;

        console.log(selectedCompanyID);

        const company_results = await getCompanyByID(selectedCompanyID).then(db_company => {
            const db_secret = db_company.secret_word;
            console.log(db_secret);
            console.log(form.secret_word);
            if (db_secret !== form.secret_word) {
                console.log("Secret Word Mismatch");
                alert("Secret word does not match the one provided at company set up");
                return;
            }
            else {
                return db_company;
            }
        });

        console.log(company_results);
        localStorage.setItem("company", company_results.name);
        localStorage.setItem("company_id", company_results._id);

        const update_params = {company_id: company_results._id, user_id: ReactSession.get("user_id")}

        const update_results = await addUserToCompany(update_params).then(db_company => {
            navigate("/login-landing");
        });

    }

    // This following section will display the table with the users of individuals.
    return (
        <div>
            <h3>Company List</h3>
            <form onSubmit={onSubmit}>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Select</th>
                        <th>Company Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Account Creator Email</th>
                    </tr>
                    </thead>
                    <tbody>{companyList()}</tbody>
                </table>
                <label htmlFor={"secret_word"}>Secret Word to Join Your Company:</label>
                <input type={"text"} id={"secret_word"} onChange={(e) => updateForm({ secret_word: e.target.value }) }  />
                <input type={"submit"} value={"Join Selected Company"} />
            </form>
        </div>
    );
}