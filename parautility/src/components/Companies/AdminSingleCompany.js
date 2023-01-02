import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router";

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

const Owner = (props) => (
    <>
        <tr>
            <td>Full Name</td>
            <td>{props.owner.fname} {props.owner.lname}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>{props.owner.email}</td>
        </tr>
        <tr>
            <td>Phone Number</td>
            <td>{props.owner.phone}</td>
        </tr>
    </>
);

const DiscountGroup = (props) => (
        <tr>
            <td>{props.discount._id.nickname}</td>
            <td>{props.discount._id.expiration}</td>
            <td>{props.discount._id.percent}%</td>
            <td>${props.discount._id.price}</td>
            <td>TODO: Preorders</td>
            <td>{props.discount.group_count}</td>
            <td>{props.discount.number_for_sale}</td>
            <td>TODO: Most Recent Transaction</td>
            <td>TODO: Total Completed Transactions</td>
        </tr>
);

const PreorderGroup = (props) => (
    <tr>
        <td>{props.preorder.nickname}</td>
        <td>{props.preorder.expiration_date}</td>
        <td>{props.preorder.percent}%</td>
        <td>${props.preorder.price}</td>
        <td>{props.preorder.preorder_users.length}</td>
    </tr>
);

export default function AdminSingleCompany() {
    const [companies, setCompanies] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [preorders, setPreorders] = useState([]);
    const navigate = useNavigate();

    const current_id = localStorage.getItem("view_company_id");
    const current_name = localStorage.getItem("view_company");
    console.log(current_id);

    useEffect( () => {
        async function getCompanyAndOwner() {
            const response = await fetch('http://localhost:5000/company/' + current_id, {
                method: "GET"
            });

            const company = await response.json();
            console.log(company);
            console.log(company.owner);

            setCompanies([company]);
        }

        async function getCompanyDiscounts() {
            const response = await fetch('http://localhost:5000/discounts/' + current_id, {
                method: "GET"
            });

            const db_discounts = await response.json();
            console.log(db_discounts);
            setDiscounts(db_discounts);
        }

        async function getCompanyDiscountPreorders() {
            const response = await fetch('http://localhost:5000/preorders/' + current_id, {
                method: "GET"
            });

            const db_preorders = await response.json();
            console.log(db_preorders);
            setPreorders(db_preorders);
        }

        async function getCompanyOwner(owner_id) {

        }

        getCompanyAndOwner();
        getCompanyDiscounts();
        getCompanyDiscountPreorders();

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

    // This method will map out the users on the table
    function preorderList() {
        return preorders.map((preorder) => {
            return (
                <PreorderGroup
                    preorder={preorder}
                    key={preorder._id.nickname}
                />
            );
        });
    }

    // This function will handle the submission.
    async function onSubmitPreorder(e) {
        e.preventDefault();

        navigate("/issue-discount-preorder");
    }

    // This function will handle the submission.
    async function onSubmitIssue(e) {
        e.preventDefault();

        navigate("/issue-discounts");
    }

    // This following section will display the table with the users of individuals.
    return (
        <div>
            <h3>{localStorage.getItem("view_company")}</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <tbody>{companyList()}</tbody>
            </table>

            <h3>Preorder-Stage Discounts</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <th>Discount Nickname</th>
                <th>Expiration Date</th>
                <th>Percent Discount</th>
                <th>Price</th>
                <th>Preorder Count</th>
                </thead>
                <tbody>{preorderList()}</tbody>
            </table>

            <h3>Issued Discounts</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <th>Discount Nickname</th>
                <th>Expiration Date</th>
                <th>Percent Discount</th>
                <th>Price</th>
                <th>Preorder Count</th>
                <th>Number Issued</th>
                <th>Number Currently for Sale</th>
                <th>Datetime of Most Recent Transaction</th>
                </thead>
                <tbody>{discountList()}</tbody>
            </table>

            <form onSubmit={onSubmitPreorder}>
                <input type="submit" value="Create Preorder"/>
                <input type="submit" value="Issue Preordered Discounts"/>
            </form>
        </div>
    );
}