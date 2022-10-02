import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/NavBar";
import About from "./components/About";
import Customer from "./components/Customer";
import Company from "./components/Company";
import Home from './components/Home';
import { Button, Box } from '@mui/material';
import Bottom from "./components/Bottom";
import {useState} from 'react';
import Login from './components/Login'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Contact from "./components/Contact";
import RecordList from "./components/RecordList";
import Edit from "./components/Edit";
import Create from "./components/Create";
import SignupAdmin from "./components/SignupAdmin";
import SignupCustomer from "./components/SignupCustomer";
import SignupMerchant from "./components/SignupMerchant";
import UserList from "./components/UserList";


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
                <Route exact path="/users" element={<UserList />} />
            </Routes>
            <Bottom />
        </div>
    )
}

// <div>{!currentWallet ? <div>{walletButton()}</div> : <div><p>"No Current Wallet"</p></div>}</div>

export default App;
