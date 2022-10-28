import React from 'react'
import {Link, useNavigate} from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate();

  const onClickCustomer = event => {
    event.preventDefault();
    navigate('/customer-signup');
  };
  const onClickCompany = event => {
    event.preventDefault();
    navigate('/merchant-signup');
  };
  const onClickAdmin = event => {
    event.preventDefault();
    navigate('/comapny-signup');
  };

  const contentStyle = {
        height: '750px',
        background: '#181818',
        position: 'relative',

    };
    const boxStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

  return (
    <div style = {contentStyle}>
        <h1 style = {{color : 'white', position: 'relative', textAlign: 'center', top: '30%'}}> Sign up </h1>
    <div style= {boxStyle}>
    <div className="container">
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Customer Signup</h5>
                        <p className="card-text">Click the button below to sign up as a customer.</p>
                        <button className="btn btn-primary" onClick={onClickCustomer}>Customer Signup</button>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Merchant Signup</h5>
                        <p className="card-text">Click the button below to sign up as a merchant.</p>
                        <button className="btn btn-primary" onClick={onClickCompany}>Merchant Signup</button>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Admin Signup</h5>
                        <p className="card-text">Click the button below to sign up as a admin.</p>
                        <button className="btn btn-primary" onClick={onClickAdmin}>Admin Signup</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Signup