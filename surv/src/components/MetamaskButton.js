import React from 'react'
import {useState} from 'react';


const MetamaskButton = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const getAccount = async() => {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const account = accounts[0];
        return account; 
    }
    const connectWallet = async () => {
        // Check if MetaMask is installed on user's browser
        if(window.ethereum) {
            getAccount().then((request) => {
                setWalletAddress(request);
            });
        }
      }
      
      return (
        <button onClick={connectWallet}> {!!walletAddress ? walletAddress: "connect"} </button>
      );
}

export default MetamaskButton
