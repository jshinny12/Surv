import React from 'react'
import {useState, useEffect} from 'react'
import {Nav} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {useNavigate} from "react-router";
import {ReactSession} from "react-client-session";

const Customer = () => {
    const[cards, setCards] = useState([]);
    const navigate = useNavigate();

    const contentStyle = {
        height: '750px',
        color: '#fff',
        textAlign: 'center',
        background: '#181818',
      };

      const paragraphStyle = {
        position: 'relative',
        width: '100%',
        top: '50%',
        left: '50%',
        margin: '0px 0px 0px 0px',
        transform: 'translate(-50%, -50%)',
      }

    const [discounts, setDiscounts] = useState([]);

    useEffect( () => {
        const user_id = localStorage.getItem("user_id")

        async function getHeldDiscounts() {
            const response = await fetch('http://localhost:5000/customer-wallet/' + user_id, {
                method: "GET"
            });

            const discounts = await response.json();
            console.log(discounts);
            setDiscounts(discounts);
            return discounts;
        }

        const all_discounts = getHeldDiscounts();

        return;
    }, []);

    // This method will map out the users on the table
    function discountList() {
        return discounts.map((discount) => {
            return (
                <HeldDiscount
                    discount={discount}
                    key={discount._id}
                />
            );
        });
    }

    const HeldDiscount = (props) => (
        <tr>
            <td>{props.discount.company_name}</td>
            <td>{props.discount.nickname}</td>
            <td>{props.discount.expiration_date}</td>
            <td>{props.discount.percent}%</td>
            <td>${props.discount.price}</td>
            <td>{props.discount.is_for_sale == 1? "Yes": "No"}</td>
            <td>{props.discount._id}</td>
            <td><button
                onClick={() => {

                    localStorage.setItem("discount_sell_id", props.discount._id);
                    navigate('/confirm-sell');

                }}>Sell</button></td>
        </tr>
    );


    return (
      <>
          <div style = {contentStyle}>
              <h1 style = {paragraphStyle}>My Discounts</h1>
          </div>
          <div>
             <Nav.Link href="/discounts" style = {{color: 'black'}} onClick = {console.log("navigate to discounts")}>Browse Discounts</Nav.Link>
          </div>
          <div>
              <h3>My Discounts</h3>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                  <thead>
                  <th>Company</th>
                  <th>Discount Nickname</th>
                  <th>Expiration Date</th>
                  <th>Percent Discount</th>
                  <th>Price</th>
                  <th>Pending Sale?</th>
                  <th>Discount's Unique Identifier</th>
                  </thead>
                  <tbody>{discountList()}</tbody>
              </table>
          </div>
      </>
    )
}

export default Customer