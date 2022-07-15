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
      sx={{backgroundColor: 'black' }} 
      onClick = {connectWalletHandler}
      > 
      Connect Your Wallet! 
      </Button>
      </Box>
    )
  }



  return (
    <div>
      {!currentWallet ? <div>{walletButton()}</div> : 
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/company" element={<Company />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Bottom />
      </BrowserRouter>
      }
    </div>
  )
  

}

export default App;
