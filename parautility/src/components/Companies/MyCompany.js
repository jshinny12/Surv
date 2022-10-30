import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router";
import {ReactSession} from "react-client-session";

const Company = (props) => (
    <>
    <tr>
        <td>Company Name</td>
        <td>{props.company.name}</td>
    </tr>
    <tr>
        <td>City</td>
        <td>{props.company.city}</td>
    </tr>
    <tr>
        <td>State</td>
        <td>{props.company.state}</td>
    </tr>
    <tr><td>Company Account Creator Email</td>
        <td>{props.company.owner_email}</td>
    </tr>
        <tr>
            <td>Number of Employees with Tradim Accounts</td>
            <td>{props.company.employees.length}</td>
        </tr>
        <tr>
            <td>Total Number of Discounts Issued</td>
            <td>{typeof props.company.discounts === 'undefined' ? 0 : props.company.discounts.length}</td>
        </tr>
    </>
);

const DiscountGroup = (props) => (
        <tr>
            <td>{props.discount._id.nickname}</td>
            <td>{props.discount._id.expiration}</td>
            <td>{props.discount._id.percent}%</td>
            <td>{props.discount.group_count}</td>
            <td>{props.discount.number_outstanding}</td>
            <td>{props.discount.group_count - props.discount.number_outstanding}</td>
        </tr>
);

export default function MyCompany() {
    const [companies, setCompanies] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const navigate = useNavigate();

    const current_id = localStorage.getItem("company_id");
    console.log(current_id);

    useEffect( () => {
        async function getCompany() {
            const response = await fetch('http://localhost:5000/company/' + current_id, {
                method: "GET"
            });

            const company = await response.json();
            console.log(company);
            setCompanies([company]);
            return company;
        }

        async function getCompanyDiscounts() {
            const response = await fetch('http://localhost:5000/discounts/' + current_id, {
                method: "GET"
            });

            const discounts = await response.json();
            console.log(discounts);
            setDiscounts(discounts);
            return discounts;
        }

        getCompany();
        getCompanyDiscounts();

        return;
        }, []);



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

    // This method will map out the users on the table
    function discountList() {
        return discounts.map((discount) => {
            return (
                <DiscountGroup
                    discount={discount}
                    key={discount._id.nickname}
                />
            );
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        navigate("/issue-discounts");
    }

    // This following section will display the table with the users of individuals.
    return (
        <div>
            <h3>My Company</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <tbody>{companyList()}</tbody>
            </table>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <th>Discount Nickname</th>
                <th>Expiration Date</th>
                <th>Percent Discount</th>
                <th>Number Issued</th>
                <th>Number Outstanding</th>
                <th>Number Held</th>
                </thead>
                <tbody>{discountList()}</tbody>
            </table>
            <form onSubmit={onSubmit}>
                <input type="submit" value="Issue Discounts"/>
            </form>
        </div>
    );
}