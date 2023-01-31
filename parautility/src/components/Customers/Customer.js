import React from 'react'
import {useState, useEffect} from 'react'
import {Nav} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {useNavigate} from "react-router";

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
    const [preorders, setPreorders] = useState([]);

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

        async function getPreorders() {
            const response = await fetch('http://localhost:5000/customer-preorders/' + user_id, {
                method: "GET"
            });

            const preorders = await response.json();
            console.log(preorders);
            console.log(user_id);
            setPreorders(preorders);
            return preorders;
        }

        const all_discounts = getHeldDiscounts();
        const all_preorders = getPreorders();

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

    // This method will map out the users on the table
    function preorderList() {
        return preorders.map((discount) => {
            return (
                <PlacedPreorder
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

    const PlacedPreorder = (props) => (
        <tr>
            <td>{props.discount.preorder_info[0].company_name}</td>
            <td>{props.discount.preorder_info[0].nickname}</td>
            <td>{props.discount.preorder_date}</td>
            <td>{props.discount.preorder_info[0].percent}%</td>
            <td>${props.discount.preorder_info[0].price}</td>
            <td><button
                onClick={() => {

                    localStorage.setItem("discount_sell_id", props.discount._id);
                    navigate('/confirm-sell');

                }}>Cancel Preorder</button></td>
        </tr>
    );

    return (
      <>
          <div>
             <button onClick = {() => {navigate("/discounts");}}>Browse Discounts</button>
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


              <h3>My Preorders</h3>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                  <thead>
                  <th>Company</th>
                  <th>Discount Nickname</th>
                  <th>Preorder Date</th>
                  <th>Percent Discount</th>
                  <th>Price</th>
                  </thead>
                  <tbody>{preorderList()}</tbody>
              </table>
          </div>
      </>
    )
}

export default Customer