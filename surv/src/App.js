import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/NavBar";
import About from "./components/About";
import Contact from "./components/Contact";
import Survey from "./components/Survey";
import Home from './components/Home';
import { Button, Box } from '@mui/material';
import Bottom from "./components/Bottom";
import MetamaskButton from "./components/MetamaskButton";
import {useState} from 'react';



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
              bgcolor: "#E8c5ff",
              height: "100vh",
              width: 'auto'
            }}
          >
      <Button 
      variant="contained" 
      sx={{backgroundColor: '#DAF' }} 
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/survey" element={<Survey />} />
        </Routes>
        <Bottom />
      </BrowserRouter>
      }
    </div>
  )
  

}

export default App;
