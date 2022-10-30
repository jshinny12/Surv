import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbars/Header";
import About from "./components/Abouts/About";
import Customer from "./components/Customers/Customer";
import Company from "./components/Abouts/Company";
import Home from './components/Home/Home';
import { Button, Box } from '@mui/material';
import Bottom from "./components/Footer/Bottom";
import {useState} from 'react';
import Login from './components/Users/Logins/Login'
import OldLogin from './components/Users/Logins/OldLogin'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import RecordList from "./components/Record/RecordList";
import Edit from "./components/Record/Edit";
import Create from "./components/Record/Create";
import Signup from "./components/Users/Signups/Signup";
import SignupAdmin from "./components/Users/Signups/SignupAdmin";
import SignupCustomer from "./components/Users/Signups/SignupCustomer";
import SignupMerchant from "./components/Users/Signups/SignupMerchant";
import UserList from "./components/Users/UserList";
import VerifySignup from "./components/Users/Signups/VerifySignup";
import LoginLanding from "./components/Users/Logins/LoginLanding";
import MerchantVerifyLanding from "./components/Users/Logins/MerchantVerifyLanding";
import CompanySetup from "./components/Companies/CompanySetup";
import CompanyJoin from "./components/Companies/CompanyJoin";
import MyCompany from "./components/Companies/MyCompany";
import IssueDiscounts from "./components/Companies/IssueDiscounts";


function App() {
    const [currentWallet, setCurrentWallet] = useState(null);

    const connectWallet = async() => {
          if (!window.ethereum) {
              alert('Please install Metamask!');
          } else {
            const accounts = await window.ethereum.request({
              method: 'eth_requestAccounts'
            });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an account! Address: ", accounts[0]);
                setCurrentWallet(account);
            } else {
                console.log('No authorized account found');
            }

          }
    }

    const connectWalletHandler = async() => {
    await connectWallet();
    }

    const walletButton = () => {
        return (
            <Box
                textAlign="center"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "grey",
                    height: "100vh",
                    width: 'auto'
                }}
            >
                <Button
                    variant="contained"
                    sx={{backgroundColor: 'black'}}
                    onClick={connectWalletHandler}
                >
                    Connect Your Wallet!
                </Button>
            </Box>
        )
    }

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/customer" element={<Customer/>}/>
                <Route path="/company" element={<Company/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route exact path="/records" element={<RecordList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
                <Route path="/admin-signup" element={<SignupAdmin />} />
                <Route path="/customer-signup" element={<SignupCustomer />} />
                <Route path="/merchant-signup" element={<SignupMerchant />} />
                <Route exact path="/verify" element={<VerifySignup />} />
                <Route exact path="/users" element={<UserList />} />
                <Route exact path="/login-landing" element={<LoginLanding />} />
                <Route exact path="/merchant-verify-landing" element={<MerchantVerifyLanding />} />
                <Route exact path="/company-setup" element={<CompanySetup />} />
                <Route exact path="/my-company" element={<MyCompany />} />
                <Route exact path="/issue-discounts" element={<IssueDiscounts />} />
                <Route exact path="/company-join" element={<CompanyJoin />} />
                <Route exact path="/signup" element={<Signup />} />

            </Routes>
            <Bottom />
        </div>
    )
}

// <div>{!currentWallet ? <div>{walletButton()}</div> : <div><p>"No Current Wallet"</p></div>}</div>

export default App;
